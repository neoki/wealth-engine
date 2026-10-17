import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import test from 'node:test';

const token = 'test-only-private-access-token';
const protectedPaths = [
  '/', '/api/opportunities', '/opportunities.json', '/api/live-scan',
  '/api/voice-margin-index', '/voice-margin-index.json', '/usage', '/mcp',
  '/.well-known/agent-card.json', '/.well-known/agent.json',
  '/.well-known/agent-capabilities.json', '/capabilities',
  '/offers/voice-pricing-intelligence', '/offers/mcp-discovery-audit',
  '/api/offers/voice-pricing-intelligence', '/api/offers/mcp-discovery-audit'
];

async function startServer(t, configuredToken) {
  const env = { ...process.env, PORT: '0' };
  delete env.WEALTH_ENGINE_ACCESS_TOKEN;
  if (configuredToken !== undefined) env.WEALTH_ENGINE_ACCESS_TOKEN = configuredToken;
  const child = spawn(process.execPath, ['server.js'], {
    cwd: new URL('../', import.meta.url), env, stdio: ['ignore', 'pipe', 'pipe']
  });
  t.after(async () => {
    if (child.exitCode !== null) return;
    const exited = once(child, 'exit');
    child.kill();
    await exited;
  });
  return await new Promise((resolve, reject) => {
    let output = '';
    const timeout = setTimeout(() => reject(new Error('Server did not start')), 10000);
    child.once('error', error => { clearTimeout(timeout); reject(error); });
    child.once('exit', code => { clearTimeout(timeout); reject(new Error(`Server exited: ${code}`)); });
    child.stdout.on('data', chunk => {
      output += chunk;
      const match = output.match(/wealth-engine listening on (\d+)/);
      if (match) { clearTimeout(timeout); resolve(`http://127.0.0.1:${match[1]}`); }
    });
  });
}

test('no configured token denies every data surface, including MCP calls', async t => {
  const base = await startServer(t);
  for (const path of protectedPaths) {
    const response = await fetch(base + path);
    assert.equal(response.status, 401, path);
    assert.deepEqual(await response.json(), { error: 'unauthorized' });
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
  for (const name of ['economic_opportunities', 'live_market_scan', 'voice_margin_index']) {
    const response = await fetch(base + '/mcp', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name } })
    });
    assert.equal(response.status, 401, name);
  }
});

test('configured authorization protects data and cannot be bypassed by telemetry headers or URLs', async t => {
  const base = await startServer(t, token);
  for (const headers of [{}, { authorization: 'Bearer wrong-token' }, { 'x-wealth-internal': '1' }]) {
    const response = await fetch(base + '/api/opportunities', { headers });
    assert.equal(response.status, 401);
  }
  assert.equal((await fetch(base + '/api/opportunities?token=' + token)).status, 401);
  assert.equal((await fetch(base + '/mcp', { method: 'HEAD' })).status, 401);
  for (const path of ['/api/paid-intent', '/api/mcp-audit-intent']) {
    assert.equal((await fetch(base + path, { method: 'POST' })).status, 401);
  }
  const headers = { authorization: `Bearer ${token}` };
  const opportunities = await fetch(base + '/api/opportunities', { headers });
  assert.equal(opportunities.status, 200);
  assert.ok(Array.isArray((await opportunities.json()).opportunities));
  assert.equal(opportunities.headers.get('cache-control'), 'no-store');
  const mcp = await fetch(base + '/mcp', {
    method: 'POST', headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' })
  });
  assert.equal(mcp.status, 200);
  assert.equal((await mcp.json()).result.tools.length, 3);
});

test('public health and crawler responses contain no internal intelligence', async t => {
  const base = await startServer(t, token);
  const health = await fetch(base + '/health');
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), {
    ok: true, service: 'wealth-engine', version: '0.9.5', mode: 'private'
  });
  assert.equal(health.headers.get('cache-control'), 'no-store');
  assert.match(health.headers.get('x-robots-tag'), /noindex/);
  assert.equal(await (await fetch(base + '/robots.txt')).text(), 'User-agent: *\nDisallow: /\n');
  const preflight = await fetch(base + '/mcp', { method: 'OPTIONS' });
  assert.equal(preflight.status, 204);
  assert.match(preflight.headers.get('access-control-allow-headers'), /authorization/);
  assert.equal(await preflight.text(), '');
});

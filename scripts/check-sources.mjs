import { sourceChecks } from '../source-checks.js';

const timeoutMs = 20_000;
const results = [];

for (const check of sourceChecks) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(check.url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'WealthEngineSourceMonitor/1.2 (+https://wealth-engine-production-e178.up.railway.app/)'
      }
    });
    const body = await response.text();
    const minBytes = check.minBytes ?? 1;
    const healthy = response.ok && body.length >= minBytes;

    results.push({
      name: check.name,
      url: check.url,
      mode: check.mode ?? 'reachability',
      required: check.required !== false,
      status: response.status,
      bytes: body.length,
      ok: healthy,
      severity: healthy ? 'ok' : (check.required === false ? 'warning' : 'error')
    });
  } catch (error) {
    results.push({
      name: check.name,
      url: check.url,
      mode: check.mode ?? 'reachability',
      required: check.required !== false,
      ok: false,
      severity: check.required === false ? 'warning' : 'error',
      error: error.message
    });
  } finally {
    clearTimeout(timer);
  }
}

const blockingFailures = results.filter((result) => result.required && !result.ok);
const warnings = results.filter((result) => !result.required && !result.ok);
const report = {
  checkedAt: new Date().toISOString(),
  verificationScope: 'source-health-only',
  note: 'A successful run proves source reachability, not that published prices are unchanged. Pricing rows carry their own verifiedAt and verificationStatus metadata.',
  ok: blockingFailures.length === 0,
  blockingFailures: blockingFailures.length,
  warnings: warnings.length,
  results
};

console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;

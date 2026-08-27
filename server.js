import http from 'node:http';
import { getIndexData, lastUpdated, publicBenchmarks } from './margin-data.js';
import { landingPage, marginIndexPage } from './pages.js';

const port = Number(process.env.PORT || 3000);
const publicUrl = String(process.env.PUBLIC_URL || 'https://wealth-engine-production-e178.up.railway.app').replace(/\/$/, '');
const maxBodyBytes = 20_000;
const rateWindowMs = 15 * 60 * 1000;
const rateLimit = 8;
const attempts = new Map();

const securityHeaders = {
  'content-security-policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=()'
};

function send(res, status, type, body, cacheControl = 'no-store') {
  res.writeHead(status, { ...securityHeaders, 'content-type': type, 'cache-control': cacheControl });
  res.end(body);
}

function json(res, status, payload, cacheControl = 'no-store') {
  send(res, status, 'application/json; charset=utf-8', JSON.stringify(payload), cacheControl);
}

function clientKey(req) {
  return String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
}

function allowed(req) {
  const key = clientKey(req);
  const now = Date.now();
  const active = (attempts.get(key) || []).filter((stamp) => now - stamp < rateWindowMs);
  if (active.length >= rateLimit) return false;
  active.push(now);
  attempts.set(key, active);
  return true;
}

function clean(value, max = 500) {
  return String(value || '').trim().replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      raw += chunk;
      if (Buffer.byteLength(raw, 'utf8') > maxBodyBytes) {
        reject(new Error('too_large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/health') {
    return json(res, 200, { ok: true, service: 'ai-margin-autopsy', updated: lastUpdated });
  }

  if (req.method === 'GET' && url.pathname === '/robots.txt') {
    return send(res, 200, 'text/plain; charset=utf-8', `User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`, 'public, max-age=3600');
  }

  if (req.method === 'GET' && url.pathname === '/sitemap.xml') {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicUrl}/</loc><lastmod>${lastUpdated}</lastmod></url><url><loc>${publicUrl}/voice-margin-index</loc><lastmod>${lastUpdated}</lastmod></url></urlset>`;
    return send(res, 200, 'application/xml; charset=utf-8', xml, 'public, max-age=3600');
  }

  if (req.method === 'GET' && (url.pathname === '/voice-margin-index' || url.pathname === '/index')) {
    return send(res, 200, 'text/html; charset=utf-8', marginIndexPage(), 'public, max-age=300');
  }

  if (req.method === 'GET' && url.pathname === '/voice-margin-index.json') {
    return json(res, 200, {
      title: 'Voice Margin Index',
      lastUpdated,
      methodology: {
        targetGrossMargin: 0.7,
        revenuePerMinute: 'monthly price / included voice minutes',
        costCeiling: 'revenue per minute * (1 - target gross margin)'
      },
      plans: getIndexData(),
      publicBenchmarks
    }, 'public, max-age=300');
  }

  if (req.method === 'POST' && url.pathname === '/lead') {
    if (!allowed(req)) return json(res, 429, { error: 'Too many attempts. Please try again later.' });
    try {
      const body = await readJson(req);
      if (clean(body.website, 100)) return json(res, 200, { ok: true });

      const lead = {
        email: clean(body.email, 254).toLowerCase(),
        company: clean(body.company, 120),
        spend: clean(body.spend, 40),
        provider: clean(body.provider, 80),
        note: clean(body.note, 1000)
      };

      if (!validEmail(lead.email) || !lead.company || !lead.spend || !lead.provider) {
        return json(res, 400, { error: 'Please complete the required fields with a valid work email.' });
      }

      console.log(JSON.stringify({ event: 'qualified_lead', receivedAt: new Date().toISOString(), ...lead }));
      return json(res, 201, { ok: true });
    } catch (error) {
      if (error.message === 'too_large') return json(res, 413, { error: 'Submission is too large.' });
      return json(res, 400, { error: 'Invalid submission.' });
    }
  }

  if (req.method === 'GET' && url.pathname === '/') {
    return send(res, 200, 'text/html; charset=utf-8', landingPage(), 'public, max-age=300');
  }

  return json(res, 404, { error: 'Not found' });
});

server.listen(port, '0.0.0.0', () => console.log(`ai-margin-autopsy listening on ${port}`));

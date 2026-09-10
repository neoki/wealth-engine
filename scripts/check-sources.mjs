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
        'user-agent': 'WealthEngineSourceMonitor/1.1 (+https://wealth-engine-production-e178.up.railway.app/)'
      }
    });
    const body = await response.text();
    const missing = check.patterns
      .filter((pattern) => !pattern.test(body))
      .map((pattern) => pattern.source);
    const matched = response.ok && missing.length === 0;

    results.push({
      name: check.name,
      url: check.url,
      required: check.required !== false,
      status: response.status,
      ok: matched,
      severity: matched ? 'ok' : (check.required === false ? 'warning' : 'error'),
      missing
    });
  } catch (error) {
    results.push({
      name: check.name,
      url: check.url,
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
  ok: blockingFailures.length === 0,
  blockingFailures: blockingFailures.length,
  warnings: warnings.length,
  results
};

console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;

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
        'user-agent': 'VoiceMarginIndexSourceMonitor/1.0 (+https://wealth-engine-production-e178.up.railway.app/voice-margin-index)'
      }
    });
    const body = await response.text();
    const missing = check.patterns
      .filter((pattern) => !pattern.test(body))
      .map((pattern) => pattern.source);

    results.push({
      name: check.name,
      url: check.url,
      status: response.status,
      ok: response.ok && missing.length === 0,
      missing
    });
  } catch (error) {
    results.push({ name: check.name, url: check.url, ok: false, error: error.message });
  } finally {
    clearTimeout(timer);
  }
}

const report = {
  checkedAt: new Date().toISOString(),
  ok: results.every((result) => result.ok),
  results
};

console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;

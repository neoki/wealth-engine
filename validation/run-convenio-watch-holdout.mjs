import fs from 'node:fs/promises';
import { extractFromBoeUrl } from './convenio-watch-extractor-v2.mjs';

const spec = JSON.parse(await fs.readFile(new URL('./convenio-watch-holdout-v1.json', import.meta.url), 'utf8'));

function checks(result, expect) {
  return Object.entries(expect).map(([name, expected]) => ({ name, expected, actual: result[name] ?? null, ok: (result[name] ?? null) === expected }));
}

let passed = 0;
let total = 0;
const reports = [];
for (const item of spec.cases) {
  try {
    const result = await extractFromBoeUrl(item.url);
    const c = checks(result, item.expect);
    passed += c.filter(x => x.ok).length;
    total += c.length;
    reports.push({ id: item.id, ok: c.every(x => x.ok), checks: c, extracted: {
      sourceId: result.sourceId,
      publicationDate: result.publicationDate,
      agreementCode: result.agreementCode,
      effectiveFrom: result.effectiveFrom,
      retroactive: result.retroactive,
      changeTypes: result.changeTypes,
      deadline: result.deadline,
      obligations: result.obligations
    }});
  } catch (error) {
    total += Object.keys(item.expect).length;
    reports.push({ id: item.id, ok: false, error: String(error) });
  }
}
const score = total ? passed / total : 0;
console.log(JSON.stringify({ holdout: true, frozenExtractor: spec.frozenExtractor, score, passed, total, reports }, null, 2));
// Diagnostic only for now: do not gate CI until the untouched first-run baseline is recorded.

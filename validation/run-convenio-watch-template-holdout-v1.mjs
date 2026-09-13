import fs from 'node:fs/promises';
import { extractProceduralTemplatesFromText } from './convenio-watch-extractor-v3.mjs';

const fixture = JSON.parse(await fs.readFile(new URL('./convenio-watch-template-holdout-v1.json', import.meta.url), 'utf8'));
let expectedTemplates = 0;
let detectedExpectedTemplates = 0;
let falsePositives = 0;
const results = [];

for (const item of fixture.cases) {
  const templates = extractProceduralTemplatesFromText(item.evidence);
  if (item.label === 'negative') {
    if (templates.length) falsePositives += templates.length;
    results.push({ id: item.id, label: item.label, detected: templates.length });
    continue;
  }

  expectedTemplates += 1;
  const matching = templates.find(template =>
    template.trigger?.eventType === item.trigger &&
    template.instance?.action === item.action &&
    template.instance?.deadline?.offset?.value === item.deadline.value &&
    template.instance?.deadline?.offset?.unit === item.deadline.unit
  );
  if (matching) detectedExpectedTemplates += 1;
  results.push({
    id: item.id,
    label: item.label,
    expected: { trigger: item.trigger, action: item.action, deadline: item.deadline },
    detected: templates.map(template => ({
      trigger: template.trigger?.eventType,
      action: template.instance?.action,
      deadline: template.instance?.deadline?.offset
    })),
    matched: Boolean(matching)
  });
}

const recall = expectedTemplates ? detectedExpectedTemplates / expectedTemplates : 1;
const ok = detectedExpectedTemplates === expectedTemplates && falsePositives === 0;
const report = {
  ok,
  frozenExtractor: fixture.frozenExtractor,
  expectedTemplates,
  detectedExpectedTemplates,
  recall,
  falsePositives,
  results
};

console.log(JSON.stringify(report, null, 2));
if (!ok) process.exit(1);

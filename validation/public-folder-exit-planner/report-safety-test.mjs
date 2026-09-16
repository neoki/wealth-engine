import assert from 'node:assert/strict';
import { buildExitPlan, renderMarkdown } from './report.mjs';

const NOW = new Date('2026-09-16T00:00:00Z');

// Adversarial case 1: a folder can look technically simple while critical business evidence is absent.
const missingEvidence = buildExitPlan([
  { path:'\\Finance', itemCount:50, sizeGb:0.2, lastUserModified:'2026-09-15', mailItems:50 }
], { organisation:'Safety Test A', now:NOW });
assert.equal(missingEvidence.summary.migrationCandidates, 0);
assert.equal(missingEvidence.summary.reviewRequired, 1);
assert.equal(missingEvidence.folders[0].migrationSafety, 'review-required');

// Adversarial case 2: a lower execution-risk score must not silently turn into an autonomous migration decision.
const routeSensitive = buildExitPlan([
  { path:'\\PF-A', itemCount:120001, sizeGb:22, lastUserModified:'2026-09-15', mailEnabled:true, mailItems:120001, hasRules:true, totalPublicFolderCount:1500 },
  { path:'\\PF-B', itemCount:10, sizeGb:26, lastUserModified:'2026-09-15', documentItems:10, childFolderCount:1001, folderDepth:301, sourceValidationPassed:false }
], { organisation:'Safety Test B', now:NOW });
const md = renderMarkdown(routeSensitive);
assert.match(md, /Pre-flight preference:/);
assert.match(md, /scores only currently encoded technical execution risks/i);
assert.match(md, /Planning output only/i);
assert.doesNotMatch(md, /recommended migration tool/i);
assert.doesNotMatch(md, /safe to migrate/i);

// Adversarial case 3: compliance/application dependencies must remain in specialist wave regardless of route score.
const specialist = buildExitPlan([
  { path:'\\Legal', itemCount:100, sizeGb:1, lastUserModified:'2026-09-15', documentItems:100, complianceHold:true },
  { path:'\\CRMBridge', itemCount:100, sizeGb:1, lastUserModified:'2026-09-15', mailItems:100, applicationDependency:true }
], { organisation:'Safety Test C', now:NOW });
assert.deepEqual(new Set(specialist.waves.wave3Specialist), new Set(specialist.folders.map(f => f.id)));
assert.equal(specialist.waves.wave1LowRisk.length, 0);

console.log('PF planner report safety tests passed');

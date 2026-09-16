import assert from 'node:assert/strict';
import { classifyFolder } from './classifier.mjs';
import { compareExecutionProfiles } from './execution-profile-comparator.mjs';

const folders = [
  classifyFolder({ id:'PF-A', mailItems:120001, sizeGb:22, totalPublicFolderCount:1500, mailEnabled:true, hasRules:true }),
  classifyFolder({ id:'PF-B', documentItems:10, sizeGb:26, childFolderCount:1001, folderDepth:301, sourceValidationPassed:false }),
  classifyFolder({ id:'PF-C', mailItems:10, sizeGb:1, maxItemSizeMb:50, targetMaxReceiveSizeMb:35 })
];

const result = compareExecutionProfiles(folders);
assert.equal(result.profiles.length, 2);
const native = result.profiles.find(p => p.profile === 'microsoft-native');
const wiz = result.profiles.find(p => p.profile === 'migrationwiz');
assert.ok(native.high >= 3);
assert.ok(wiz.riskCount >= 4);
assert.equal(native.sharedTargetRisks, 1);
assert.equal(wiz.sharedTargetRisks, 1);
assert.ok(['microsoft-native','migrationwiz'].includes(result.recommendation.profile));
assert.match(result.recommendation.rationale, /pre-flight signal|Profiles are tied/);
console.log(JSON.stringify(result, null, 2));

import { classifyFolder } from './classifier.mjs';

// Cases deliberately outside the clean synthetic archetypes.
// The goal is to detect unsafe over-confidence, not maximize raw accuracy.
const cases = [
  ['mail-docs-app',{mailItems:200,documentItems:300,applicationDependency:true,itemsLast90Days:30},'crm-or-application',true],
  ['calendar-docs',{calendarItems:120,documentItems:500,itemsLast90Days:25},'manual-review',true],
  ['contacts-mail',{contactItems:400,mailItems:900,itemsLast90Days:40},'manual-review',true],
  ['calendar-mail',{calendarItems:200,mailItems:800,externalMailFlow:true,itemsLast90Days:30},'manual-review',true],
  ['docs-external-mail',{documentItems:700,mailItems:20,externalMailFlow:true,itemsLast90Days:12},'split-mail-sharepoint',true],
  ['mail-complex-acl',{mailItems:500,externalMailFlow:true,itemsLast90Days:30,uniqueAclCount:40},'shared-mailbox',true],
  ['docs-complex-acl',{documentItems:1000,itemsLast90Days:60,uniqueAclCount:50},'sharepoint-teams',true],
  ['archive-hold',{sizeGb:200,itemsLast90Days:0,complianceHold:true},'archive',true],
  ['empty-hold',{sizeGb:0,itemsLast90Days:0,complianceHold:true},'retire',true],
  ['app-hold-acl',{mailItems:500,applicationDependency:true,itemsLast90Days:50,complianceHold:true,uniqueAclCount:30},'crm-or-application',true],
  ['unknown-active',{sizeGb:5,itemsLast90Days:50},'manual-review',true],
  ['unknown-inactive-no-size',{itemsLast90Days:0},'retire',false],
  ['bittitan-large-item-count',{mailItems:120000,itemCount:120000,sizeGb:12,externalMailFlow:true,itemsLast90Days:50},'shared-mailbox',true,'bittitan-item-count-split'],
  ['bittitan-large-folder',{documentItems:40000,itemCount:40000,sizeGb:25,itemsLast90Days:50},'sharepoint-teams',true,'bittitan-folder-size-split'],
  ['target-item-limit',{mailItems:1000,itemCount:1000,sizeGb:2,externalMailFlow:true,itemsLast90Days:50,maxItemSizeMb:80,targetMaxReceiveSizeMb:35},'shared-mailbox',true,'target-item-size-limit']
].map(([id,f,expected,expectReview,expectedRisk])=>({id,...f,expected,expectReview,expectedRisk}));

let safe=0;
for (const c of cases) {
  const r=classifyFolder(c);
  const destinationOk = r.destination===c.expected;
  const reviewOk = !c.expectReview || r.manualReview;
  const riskOk = !c.expectedRisk || r.migrationRisks.some(x=>x.code===c.expectedRisk);
  const ok = destinationOk && reviewOk && riskOk;
  if (ok) safe++;
  console.log(`${ok?'PASS':'FAIL'} ${c.id}: dest=${r.destination} review=${r.manualReview} risk=${r.migrationRisks.map(x=>x.code).join('|')||'none'} expected=${c.expected}/${c.expectReview}/${c.expectedRisk||'none'}`);
}
const safetyRate=safe/cases.length;
console.log(JSON.stringify({cases:cases.length,safe,safetyRate,gate:safetyRate>=0.9?'PASS':'FAIL'},null,2));
if(safetyRate<0.9) process.exitCode=1;

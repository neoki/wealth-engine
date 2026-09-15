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
  ['unknown-inactive-no-size',{itemsLast90Days:0},'retire',false]
].map(([id,f,expected,expectReview])=>({id,...f,expected,expectReview}));

let safe=0;
for (const c of cases) {
  const r=classifyFolder(c);
  const destinationOk = r.destination===c.expected;
  const reviewOk = !c.expectReview || r.manualReview;
  const ok = destinationOk && reviewOk;
  if (ok) safe++;
  console.log(`${ok?'PASS':'FAIL'} ${c.id}: dest=${r.destination} review=${r.manualReview} expected=${c.expected}/${c.expectReview}`);
}
const safetyRate=safe/cases.length;
console.log(JSON.stringify({cases:cases.length,safe,safetyRate,gate:safetyRate>=0.9?'PASS':'FAIL'},null,2));
if(safetyRate<0.9) process.exitCode=1;

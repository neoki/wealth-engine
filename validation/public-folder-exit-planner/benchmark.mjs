import { classifyFolder } from './classifier.mjs';

const cases = [
['mail-ext-1',{mailItems:800,externalMailFlow:true,itemsLast90Days:50},'shared-mailbox'],
['mail-ext-2',{mailItems:20,externalMailFlow:true,itemsLast90Days:3},'shared-mailbox'],
['mail-ext-acl',{mailItems:200,externalMailFlow:true,itemsLast90Days:20,uniqueAclCount:15},'shared-mailbox'],
['docs-1',{documentItems:400,itemsLast90Days:30},'sharepoint-teams'],
['docs-2',{documentItems:20,itemsLast90Days:2},'sharepoint-teams'],
['docs-acl',{documentItems:900,itemsLast90Days:40,uniqueAclCount:30},'sharepoint-teams'],
['calendar-1',{calendarItems:200,itemsLast90Days:20},'m365-group-or-shared-mailbox'],
['calendar-2',{calendarItems:10,itemsLast90Days:1},'m365-group-or-shared-mailbox'],
['contacts-1',{contactItems:300,itemsLast90Days:12},'m365-group-or-shared-mailbox'],
['contacts-2',{contactItems:5,itemsLast90Days:1},'m365-group-or-shared-mailbox'],
['app-1',{mailItems:100,applicationDependency:true,itemsLast90Days:20},'crm-or-application'],
['app-2',{documentItems:10,applicationDependency:true,itemsLast90Days:1},'crm-or-application'],
['app-hold',{mailItems:100,applicationDependency:true,itemsLast90Days:20,complianceHold:true},'crm-or-application'],
['archive-1',{sizeGb:80,itemsLast90Days:0},'archive'],
['archive-2',{sizeGb:0.5,itemsLast90Days:0},'archive'],
['archive-hold',{sizeGb:30,itemsLast90Days:0,complianceHold:true},'archive'],
['empty-1',{sizeGb:0,itemsLast90Days:0},'retire'],
['empty-2',{mailItems:0,documentItems:0,sizeGb:0,itemsLast90Days:0},'retire'],
['mixed-1',{mailItems:300,documentItems:500,itemsLast90Days:40},'split-mail-sharepoint'],
['mixed-2',{mailItems:5,documentItems:20,itemsLast90Days:2},'split-mail-sharepoint'],
['mixed-acl',{mailItems:100,documentItems:100,itemsLast90Days:10,uniqueAclCount:25},'split-mail-sharepoint'],
['ambiguous-active',{mailItems:50,itemsLast90Days:20},'manual-review'],
['ambiguous-hold',{mailItems:50,itemsLast90Days:20,complianceHold:true},'manual-review'],
['ambiguous-acl',{mailItems:50,itemsLast90Days:20,uniqueAclCount:20},'manual-review']
].map(([id,f,expected])=>({id,...f,expected}));

let correct=0, explainable=0;
for (const c of cases) {
  const r=classifyFolder(c);
  const ok=r.destination===c.expected;
  if(ok) correct++;
  if(r.signals.length>0 || r.manualReview) explainable++;
  console.log(`${ok?'PASS':'FAIL'} ${c.id}: ${r.destination} expected=${c.expected} confidence=${r.confidence}`);
}
const accuracy=correct/cases.length;
const explanationRate=explainable/cases.length;
console.log(JSON.stringify({cases:cases.length,correct,accuracy,explanationRate,gate:accuracy>=0.9 && explanationRate>=0.9?'PASS':'FAIL'},null,2));
if(accuracy<0.9 || explanationRate<0.9) process.exitCode=1;

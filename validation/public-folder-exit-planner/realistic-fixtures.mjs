import { normalizeInventory } from './normalize-inventory.mjs';
import { classifyFolder } from './classifier.mjs';

const NOW = new Date('2026-09-15T00:00:00Z');
const fixtures = [
  {name:'mail-enabled-support',row:{path:'\\Support',itemCount:4200,sizeGb:6.8,lastUserModified:'2026-09-14',mailEnabled:true,mailItems:4200,uniqueAclCount:4},expected:'shared-mailbox',safety:'candidate'},
  {name:'legacy-document-library',row:{path:'\\Operations\\Procedures',itemCount:1800,sizeGb:22,lastUserModified:'2026-08-28',documentItems:1800,uniqueAclCount:7},expected:'sharepoint-teams',safety:'candidate'},
  {name:'inactive-records',row:{path:'\\Archive\\2018',itemCount:9300,sizeGb:74,lastUserModified:'2021-04-02',mailItems:9300,uniqueAclCount:3},expected:'archive',safety:'candidate'},
  {name:'mail-docs-mixed',row:{path:'\\Projects',itemCount:5000,sizeGb:31,lastUserModified:'2026-09-10',mailItems:2400,documentItems:2600,uniqueAclCount:5},expected:'split-mail-sharepoint',safety:'review-required'},
  {name:'app-dependent-mail',row:{path:'\\CRMBridge',itemCount:12000,sizeGb:18,lastUserModified:'2026-09-12',mailItems:12000,applicationDependency:true,uniqueAclCount:6},expected:'crm-or-application',safety:'review-required'},
  {name:'held-documents',row:{path:'\\Legal\\Matters',itemCount:8000,sizeGb:95,lastUserModified:'2026-09-01',documentItems:8000,complianceHold:true,uniqueAclCount:8},expected:'sharepoint-teams',safety:'review-required'},
  {name:'complex-acl-mail',row:{path:'\\Regional',itemCount:6100,sizeGb:14,lastUserModified:'2026-09-13',mailEnabled:true,mailItems:6100,uniqueAclCount:28},expected:'shared-mailbox',safety:'review-required'},
  {name:'calendar-only',row:{path:'\\RoomBookings',itemCount:3400,sizeGb:1.1,lastUserModified:'2026-09-14',calendarItems:3400,uniqueAclCount:4},expected:'m365-group-or-shared-mailbox',safety:'candidate'},
  {name:'contacts-only',row:{path:'\\SharedContacts',itemCount:2400,sizeGb:0.7,lastUserModified:'2026-09-09',contactItems:2400,uniqueAclCount:5},expected:'m365-group-or-shared-mailbox',safety:'candidate'},
  {name:'calendar-contacts-mixed',row:{path:'\\SalesShared',itemCount:4200,sizeGb:2.3,lastUserModified:'2026-09-12',calendarItems:1800,contactItems:2400,uniqueAclCount:6},expected:'manual-review',safety:'review-required'},
  {name:'empty-stale',row:{path:'\\OldEmpty',itemCount:0,sizeGb:0,lastUserModified:'2020-01-01',uniqueAclCount:1},expected:'retire',safety:'candidate'},
  {name:'unknown-active-content',row:{path:'\\Unknown',itemCount:900,sizeGb:4.2,lastUserModified:'2026-09-14',uniqueAclCount:2},expected:'manual-review',safety:'review-required'},
  {name:'large-active-docs',row:{path:'\\Engineering',itemCount:44000,sizeGb:380,lastUserModified:'2026-09-14',documentItems:44000,uniqueAclCount:9},expected:'sharepoint-teams',safety:'candidate'},
  {name:'external-mail-held',row:{path:'\\Complaints',itemCount:15000,sizeGb:42,lastUserModified:'2026-09-14',mailEnabled:true,mailItems:15000,complianceHold:true,uniqueAclCount:7},expected:'shared-mailbox',safety:'review-required'},
  {name:'docs-complex-acl',row:{path:'\\Finance',itemCount:7200,sizeGb:63,lastUserModified:'2026-09-11',documentItems:7200,uniqueAclCount:19},expected:'sharepoint-teams',safety:'review-required'}
];

let correct=0, unsafeCandidates=0, missingEvidence=0;
for(const f of fixtures){
  const normalized=normalizeInventory(f.row,NOW);
  const result=classifyFolder(normalized);
  const destinationOk=result.destination===f.expected;
  const safetyOk=result.migrationSafety===f.safety;
  const evidenceOk=normalized.evidenceMissing.length===0;
  if(destinationOk && safetyOk && evidenceOk) correct++;
  if(f.safety==='review-required' && result.migrationSafety==='candidate') unsafeCandidates++;
  if(!evidenceOk) missingEvidence++;
  console.log(`${destinationOk&&safetyOk&&evidenceOk?'PASS':'FAIL'} ${f.name}: destination=${result.destination}/${f.expected} safety=${result.migrationSafety}/${f.safety} missing=${normalized.evidenceMissing.join('|')||'none'}`);
}
const accuracy=correct/fixtures.length;
const gate=accuracy>=0.9 && unsafeCandidates===0 && missingEvidence===0 ? 'PASS':'FAIL';
console.log(JSON.stringify({fixtures:fixtures.length,correct,accuracy,unsafeCandidates,missingEvidence,gate},null,2));
if(gate!=='PASS') process.exitCode=1;

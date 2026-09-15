import { normalizeInventory } from './normalize-inventory.mjs';
import { classifyFolder } from './classifier.mjs';

const NOW = new Date('2026-09-15T00:00:00Z');
const fixtures = [
  {
    name:'mail-enabled-support',
    row:{path:'\\Support',itemCount:4200,sizeGb:6.8,lastUserModified:'2026-09-14',mailEnabled:true,mailItems:4200,uniqueAclCount:4},
    expected:'shared-mailbox'
  },
  {
    name:'legacy-document-library',
    row:{path:'\\Operations\\Procedures',itemCount:1800,sizeGb:22,lastUserModified:'2026-08-28',documentItems:1800,uniqueAclCount:7},
    expected:'sharepoint-teams'
  },
  {
    name:'inactive-records',
    row:{path:'\\Archive\\2018',itemCount:9300,sizeGb:74,lastUserModified:'2021-04-02',mailItems:9300,uniqueAclCount:3},
    expected:'archive'
  }
];

let correct=0;
for(const f of fixtures){
  const normalized=normalizeInventory(f.row,NOW);
  const result=classifyFolder(normalized);
  const ok=result.destination===f.expected && normalized.evidenceMissing.length===0;
  if(ok) correct++;
  console.log(`${ok?'PASS':'FAIL'} ${f.name}: ${result.destination} expected=${f.expected} missing=${normalized.evidenceMissing.join('|')||'none'}`);
}
console.log(JSON.stringify({fixtures:fixtures.length,correct,gate:correct===fixtures.length?'PASS':'FAIL'},null,2));
if(correct!==fixtures.length) process.exitCode=1;

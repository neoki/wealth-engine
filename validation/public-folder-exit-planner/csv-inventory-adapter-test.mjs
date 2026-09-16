import { parseInventoryCsv } from './csv-inventory-adapter.mjs';

const NOW=new Date('2026-09-16T00:00:00Z');
const cases=[
  {
    name:'powershell-like-comma',
    csv:'FolderPath,ItemCount,SizeGB,LastUserModified,MailEnabled,MailItems,UniqueAclCount\n\\Support,4200,6.8,2026-09-14,true,4200,4',
    check:r=>r.rows[0].normalized.id==='\\Support' && r.rows[0].normalized.itemCount===4200 && r.rows[0].normalized.externalMailFlow===true
  },
  {
    name:'semicolon-eu-export',
    csv:'Folder Path;Item Count;Folder Size GB;Last Modified;Document Items;ACL Count\n\\Operations\\Procedures;1800;22;2026-08-28;1800;7',
    check:r=>r.delimiter===';' && r.rows[0].normalized.documentItems===1800 && r.rows[0].normalized.sizeGb===22
  },
  {
    name:'tab-redacted-minimal',
    csv:'Identity\tItems\tSize GB\tItems Last 90 Days\n\\Archive\\2018\t9300\t74\t0',
    check:r=>r.delimiter==='tab' && r.rows[0].normalized.itemsLast90Days===0 && r.rows[0].normalized.evidenceMissing.length===0
  },
  {
    name:'missing-critical-columns-is-safe',
    csv:'Name,MailEnabled\n\\Unknown,false',
    check:r=>r.warnings.length>=2 && r.rows[0].normalized.evidenceMissing.includes('item count or workload counts') && r.rows[0].normalized.evidenceMissing.includes('folder size')
  }
];

let passed=0;
for(const c of cases){
  const result=parseInventoryCsv(c.csv,NOW);
  const ok=c.check(result);
  if(ok) passed++;
  console.log(`${ok?'PASS':'FAIL'} ${c.name}: mapped=${result.mappedFields.join('|')} warnings=${result.warnings.join('|')||'none'}`);
}
console.log(JSON.stringify({cases:cases.length,passed,gate:passed===cases.length?'PASS':'FAIL'},null,2));
if(passed!==cases.length) process.exitCode=1;

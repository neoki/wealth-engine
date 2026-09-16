import { normalizeInventory } from './normalize-inventory.mjs';

// Vendor-neutral adapter for customer/admin supplied exports.
// Deliberately dependency-free: accepts common PowerShell/CSV headings and
// preserves unknown fields without requiring tenant credentials.
const ALIASES = {
  id: ['id','identity','folderid'],
  path: ['path','folderpath','folder path','identitypath','name'],
  itemCount: ['itemcount','items','item count','totalitemcount'],
  sizeGb: ['sizegb','size gb','foldersizegb','folder size gb','totalitemsizegb'],
  lastUserModified: ['lastusermodified','last modified','lastmodified','lastusermodificationtime'],
  mailEnabled: ['mailenabled','mail enabled','ismailenabled'],
  mailAddress: ['mailaddress','primarysmtpaddress','smtpaddress','emailaddress'],
  uniqueAclCount: ['uniqueaclcount','aclcount','unique acl count','permissioncount'],
  hasExplicitPermissions: ['hasexplicitpermissions','explicitpermissions'],
  complianceHold: ['compliancehold','hold','onhold'],
  applicationDependency: ['applicationdependency','appdependency','application dependency'],
  externalMailFlow: ['externalmailflow','external mail flow'],
  mailItems: ['mailitems','mail items','mailcount'],
  documentItems: ['documentitems','document items','documentcount'],
  calendarItems: ['calendaritems','calendar items','calendarcount'],
  contactItems: ['contactitems','contact items','contactcount'],
  itemsLast90Days: ['itemslast90days','items last 90 days','recentitems'],
  largestItemMb: ['largestitemmb','largest item mb','maxitemmb']
};

function canonicalHeader(value) {
  return String(value ?? '').trim().toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
}

function parseCsvLine(line, delimiter) {
  const out=[]; let cur=''; let quoted=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"') {
      if(quoted && line[i+1]==='"'){cur+='"'; i++;}
      else quoted=!quoted;
    } else if(ch===delimiter && !quoted){out.push(cur); cur='';}
    else cur+=ch;
  }
  out.push(cur);
  return out.map(v=>v.trim());
}

function detectDelimiter(header) {
  const candidates=[',',';','\t'];
  return candidates.sort((a,b)=>(header.split(b).length-header.split(a).length))[0];
}

function aliasMap(headers) {
  const normalized=headers.map(canonicalHeader);
  const map={};
  for(const [target,aliases] of Object.entries(ALIASES)){
    const accepted=aliases.map(canonicalHeader);
    const idx=normalized.findIndex(h=>accepted.includes(h));
    if(idx>=0) map[target]=idx;
  }
  return map;
}

export function parseInventoryCsv(text, now=new Date()) {
  const lines=String(text ?? '').replace(/^\uFEFF/,'').split(/\r?\n/).filter(l=>l.trim());
  if(lines.length<2) return { rows:[], warnings:['CSV must contain a header and at least one data row'], mappedFields:[] };
  const delimiter=detectDelimiter(lines[0]);
  const headers=parseCsvLine(lines[0],delimiter);
  const mapping=aliasMap(headers);
  const mappedFields=Object.keys(mapping);
  const warnings=[];
  if(!mapping.path && !mapping.id) warnings.push('No folder identity/path column recognised');
  if(mapping.itemCount==null) warnings.push('No item-count column recognised; workload counts may be used instead');
  if(mapping.sizeGb==null) warnings.push('No folder-size-GB column recognised');

  const rows=lines.slice(1).map((line,index)=>{
    const cells=parseCsvLine(line,delimiter);
    const raw={};
    for(const [target,idx] of Object.entries(mapping)) raw[target]=cells[idx];
    const normalized=normalizeInventory(raw,now);
    return { sourceRow:index+2, raw, normalized };
  });
  return { rows, warnings, mappedFields, delimiter: delimiter==='\t'?'tab':delimiter };
}

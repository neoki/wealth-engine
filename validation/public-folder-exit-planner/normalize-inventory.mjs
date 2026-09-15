const DAY = 24 * 60 * 60 * 1000;

function number(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function bool(v) {
  if (typeof v === 'boolean') return v;
  return ['true','yes','1','y'].includes(String(v ?? '').trim().toLowerCase());
}

export function normalizeInventory(row, now = new Date()) {
  const last = row.lastUserModified ? new Date(row.lastUserModified) : null;
  const daysSinceModified = last && !Number.isNaN(last.valueOf())
    ? Math.max(0, Math.floor((now - last) / DAY))
    : null;

  const mailItems = number(row.mailItems);
  const documentItems = number(row.documentItems);
  const calendarItems = number(row.calendarItems);
  const contactItems = number(row.contactItems);
  const itemCount = number(row.itemCount, mailItems + documentItems + calendarItems + contactItems);

  const evidenceMissing = [];
  if (!row.id && !row.path) evidenceMissing.push('folder identity/path');
  if (row.itemCount == null && mailItems + documentItems + calendarItems + contactItems === 0) evidenceMissing.push('item count or workload counts');
  if (row.sizeGb == null) evidenceMissing.push('folder size');
  if (!row.lastUserModified && row.itemsLast90Days == null) evidenceMissing.push('activity evidence');

  return {
    id: row.id ?? row.path,
    itemCount,
    sizeGb: number(row.sizeGb),
    mailItems,
    documentItems,
    calendarItems,
    contactItems,
    itemsLast90Days: row.itemsLast90Days != null
      ? number(row.itemsLast90Days)
      : (daysSinceModified != null && daysSinceModified <= 90 ? Math.max(1, itemCount) : 0),
    externalMailFlow: bool(row.externalMailFlow) || bool(row.mailEnabled),
    applicationDependency: bool(row.applicationDependency),
    complianceHold: bool(row.complianceHold),
    uniqueAclCount: number(row.uniqueAclCount),
    largestItemMb: number(row.largestItemMb),
    evidenceMissing
  };
}

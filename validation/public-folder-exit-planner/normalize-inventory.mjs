const DAY = 24 * 60 * 60 * 1000;

function number(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// Exchange/PowerShell exports commonly expose TotalItemSize as a formatted
// ByteQuantifiedSize string rather than a numeric GB column, e.g.
// "1.25 GB (1,342,177,280 bytes)". Accept those exports directly so an MSP
// does not have to pre-clean inventory just to obtain a first-pass plan.
function sizeGb(v, fallback = 0) {
  if (v == null || v === '') return fallback;
  const direct = Number(v);
  if (Number.isFinite(direct)) return direct;

  const text = String(v).trim().replace(/\u00a0/g, ' ');
  const unitMatch = text.match(/([\d.,]+)\s*(B|KB|MB|GB|TB)\b/i);
  if (unitMatch) {
    let numeric = unitMatch[1];
    // Exchange normally formats the leading human-readable quantity with a
    // decimal point. If only a comma is present, treat it as decimal comma.
    if (numeric.includes(',') && !numeric.includes('.')) numeric = numeric.replace(',', '.');
    else numeric = numeric.replace(/,/g, '');
    const value = Number(numeric);
    if (Number.isFinite(value)) {
      const factors = { B: 1 / (1024 ** 3), KB: 1 / (1024 ** 2), MB: 1 / 1024, GB: 1, TB: 1024 };
      return value * factors[unitMatch[2].toUpperCase()];
    }
  }

  // Fallback for localized/awkward displays that still preserve the exact
  // byte count in parentheses: "(... bytes)".
  const bytesMatch = text.match(/\(([\d\s,.]+)\s*bytes?\)/i);
  if (bytesMatch) {
    const bytes = Number(bytesMatch[1].replace(/[\s,.]/g, ''));
    if (Number.isFinite(bytes)) return bytes / (1024 ** 3);
  }
  return fallback;
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
    sizeGb: sizeGb(row.sizeGb),
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

import { extractFromBoeUrl as extractV2 } from './convenio-watch-extractor-v2.mjs';
import { fetchBoeText } from './convenio-watch-extractor-v0.mjs';
import { canonicalizeObligations } from './convenio-watch-obligation-model.mjs';

const MONTHS = {
  enero:'01', febrero:'02', marzo:'03', abril:'04', mayo:'05', junio:'06',
  julio:'07', agosto:'08', septiembre:'09', setiembre:'09', octubre:'10', noviembre:'11', diciembre:'12'
};

const SPANISH_NUMBERS = {
  un:1, una:1, uno:1, dos:2, tres:3, cuatro:4, cinco:5, seis:6, siete:7, ocho:8, nueve:9,
  diez:10, once:11, doce:12, trece:13, catorce:14, quince:15, dieciseis:16, dieciséis:16,
  diecisiete:17, dieciocho:18, diecinueve:19, veinte:20, veinticuatro:24
};

function isoDate(raw) {
  if (!raw) return null;
  const cleaned = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const m = cleaned.match(/(\d{1,2})\s+de\s+([a-z]+)\s+(?:de|del)\s+(\d{4})/);
  if (!m || !MONTHS[m[2]]) return null;
  return `${m[3]}-${MONTHS[m[2]]}-${String(Number(m[1])).padStart(2, '0')}`;
}

function addMonths(iso, months) {
  if (!iso || !Number.isFinite(months)) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, lastDay));
  return d.toISOString().slice(0, 10);
}

function numberValue(raw) {
  const cleaned = String(raw).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/^\d+$/.test(cleaned)) return Number(cleaned);
  return SPANISH_NUMBERS[cleaned] ?? null;
}

function quarterWindow(q, year) {
  const starts = { 1:'01-01', 2:'04-01', 3:'07-01', 4:'10-01' };
  const ends = { 1:'03-31', 2:'06-30', 3:'09-30', 4:'12-31' };
  return {
    type: 'calendar_window',
    startDate: `${year}-${starts[q]}`,
    endDate: `${year}-${ends[q]}`,
    resolvedCalendarDate: null
  };
}

function extractInstallmentObligation(text) {
  const intro = text.match(/(?:importe|pago) extraordinario[\s\S]{0,900}?en\s+(\w+)\s+pagos?\s+no\s+consolidables?[\s\S]{0,250}?calendario\s*:/i);
  if (!intro) return null;

  const segmentStart = intro.index ?? 0;
  const segment = text.slice(segmentStart, segmentStart + 1800);
  const installments = [];

  const quarterRe = /(?:primer|segundo|tercer|cuarto|quinto)\s+pago\s*:\s*dentro\s+del\s+(primer|segundo|tercer|cuarto)\s+trimestre\s+de\s+(20\d{2})/gi;
  for (const m of segment.matchAll(quarterRe)) {
    const q = { primer:1, segundo:2, tercer:3, cuarto:4 }[m[1].toLowerCase()];
    installments.push({ sequence: installments.length + 1, deadline: quarterWindow(q, Number(m[2])) });
  }

  const fixedRe = /(?:primer|segundo|tercer|cuarto|quinto)\s+pago\s*:\s*antes\s+del\s+(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+(?:de|del)\s+20\d{2})/gi;
  for (const m of segment.matchAll(fixedRe)) {
    installments.push({
      sequence: installments.length + 1,
      deadline: { type:'fixed_date', resolvedCalendarDate: isoDate(m[1]), exclusive: true }
    });
  }

  installments.sort((a, b) => {
    const da = a.deadline.resolvedCalendarDate ?? a.deadline.startDate ?? '';
    const db = b.deadline.resolvedCalendarDate ?? b.deadline.startDate ?? '';
    return da.localeCompare(db);
  });
  installments.forEach((x, i) => { x.sequence = i + 1; });

  if (installments.length < 2) return null;
  return {
    type: 'extraordinary_payment_schedule',
    action: 'pay_extraordinary_amount',
    consolidable: /(?:pagos?|cantidades)[^.!?]{0,220}?no\s+(?:tendr[aá]n\s+car[aá]cter\s+)?consolidable|no\s+consolidables/i.test(segment) ? false : null,
    installments,
    status: 'active'
  };
}

function agreementSignatureDate(text) {
  const m = text.match(/(?:ha\s+sido|fue)\s+suscrit[oa]\s+(?:en\s+fecha\s+|el\s+)?(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+(?:de\s+)?20\d{2})/i);
  return isoDate(m?.[1] ?? null);
}

function publicationStartsCurrentText(text) {
  return /(?:periodo\s+de\s+)?vigencia[^.]{0,180}?desde\s+(?:el\s+momento\s+de\s+)?la\s+publicaci[oó]n\s+del\s+presente\s+texto\s+en\s+el\s+BOE/i.test(text);
}

function cleanDutyDescription(raw) {
  return raw
    .replace(/^\s*[–—-]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractImplementationDuties(text, base) {
  const obligations = [];
  const signatureDate = agreementSignatureDate(text);
  const planEntryDate = publicationStartsCurrentText(text) ? base.publicationDate : null;
  const numberPattern = '(?:\\d{1,2}|un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|veinte|veinticuatro)';
  const re = new RegExp(`([^\\n.]{18,520}?)\\s+en\\s+(?:un\\s+)?(?:m[aá]ximo\\s+de|plazo\\s+de)\\s+(${numberPattern})\\s+mes(?:es)?\\s+(?:a\\s+contar\\s+)?desde\\s+(la\\s+firma\\s+del\\s+presente\\s+acuerdo|la\\s+entrada\\s+en\\s+vigor\\s+del\\s+presente\\s+plan)`, 'gi');

  for (const m of text.matchAll(re)) {
    const months = numberValue(m[2]);
    if (!months) continue;
    const anchorText = m[3].toLowerCase();
    const anchorEvent = anchorText.includes('firma') ? 'signature_of_current_agreement' : 'entry_into_force_current_plan';
    const anchorDate = anchorEvent === 'signature_of_current_agreement' ? signatureDate : planEntryDate;
    const description = cleanDutyDescription(m[1]);

    // This extractor intentionally covers implementation duties born with the agreement/plan.
    // It does not convert recurring procedural triggers (complaint, assignment end, etc.) into live instances.
    obligations.push({
      type: 'implementation_duty',
      action: 'complete_required_measure',
      description,
      deadline: {
        type: 'event_relative',
        anchorEvent,
        offset: { value: months, unit: 'months' },
        resolvedCalendarDate: addMonths(anchorDate, months)
      },
      status: 'active',
      evidence: [m[0].replace(/\s+/g, ' ').trim()]
    });
  }
  return obligations;
}

export async function extractFromBoeUrl(url) {
  const [base, text] = await Promise.all([extractV2(url), fetchBoeText(url)]);
  const obligations = [...(base.obligations ?? [])];
  const installment = extractInstallmentObligation(text);
  if (installment) obligations.push(installment);
  obligations.push(...extractImplementationDuties(text, base));
  return canonicalizeObligations({ ...base, obligations });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) process.exit(2);
  console.log(JSON.stringify(await extractFromBoeUrl(url), null, 2));
}

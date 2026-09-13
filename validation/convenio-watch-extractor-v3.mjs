import { extractFromBoeUrl as extractV2 } from './convenio-watch-extractor-v2.mjs';
import { fetchBoeText } from './convenio-watch-extractor-v0.mjs';
import { canonicalizeObligations } from './convenio-watch-obligation-model.mjs';

const MONTHS = {
  enero:'01', febrero:'02', marzo:'03', abril:'04', mayo:'05', junio:'06',
  julio:'07', agosto:'08', septiembre:'09', setiembre:'09', octubre:'10', noviembre:'11', diciembre:'12'
};

function isoDate(raw) {
  if (!raw) return null;
  const cleaned = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const m = cleaned.match(/(\d{1,2})\s+de\s+([a-z]+)\s+(?:de|del)\s+(\d{4})/);
  if (!m || !MONTHS[m[2]]) return null;
  return `${m[3]}-${MONTHS[m[2]]}-${String(Number(m[1])).padStart(2, '0')}`;
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

export async function extractFromBoeUrl(url) {
  const [base, text] = await Promise.all([extractV2(url), fetchBoeText(url)]);
  const obligations = [...(base.obligations ?? [])];
  const installment = extractInstallmentObligation(text);
  if (installment) obligations.push(installment);
  return canonicalizeObligations({ ...base, obligations });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) process.exit(2);
  console.log(JSON.stringify(await extractFromBoeUrl(url), null, 2));
}

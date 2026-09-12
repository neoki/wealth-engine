import { extractFromBoeUrl as extractV0 } from './convenio-watch-extractor-v0.mjs';

const MONTHS = { enero:'01', febrero:'02', marzo:'03', abril:'04', mayo:'05', junio:'06', julio:'07', agosto:'08', septiembre:'09', setiembre:'09', octubre:'10', noviembre:'11', diciembre:'12' };

function num(raw) { return raw ? Number(raw.replace(',', '.')) : null; }
function date(raw) {
  if (!raw) return null;
  const m = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/(\d{1,2})\s+de\s+([a-z]+)\s+(?:de|del)\s+(\d{4})/);
  if (!m || !MONTHS[m[2]]) return null;
  return `${m[3]}-${MONTHS[m[2]]}-${String(Number(m[1])).padStart(2,'0')}`;
}

function enrich(base) {
  const text = (base.evidence ?? []).join(' ');
  let effectiveFrom = base.effectiveFrom;
  if (!effectiveFrom) {
    const m = text.match(/(?:vigencia|efectos? econ[oó]micos?)[^.!?]{0,120}?desde\s+(?:el\s+)?(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+(?:de|del)\s+\d{4})/i);
    effectiveFrom = date(m?.[1]);
  }

  const types = new Set(base.changeTypes ?? []);
  if (/incrementos? salariales?|revisi[oó]n salarial|subida salarial/i.test(text)) types.add('salary_review');
  if (/IPC[^.!?]{0,350}pago [uú]nico compensatorio|pago [uú]nico compensatorio[^.!?]{0,350}IPC/i.test(text)) types.add('ipc_contingent_payment');

  const obligations = [];
  const ipc = text.match(/(?:si|en el caso de que)[^.!?]{0,250}?IPC[^.!?]{0,250}?(?:superior|supere)[^.!?]{0,120}?(\d+[,.]\d+)\s*%[^.!?]{0,220}?(?:l[ií]mite|m[aá]ximo|tope)[^.!?]{0,80}?(\d+[,.]\d+)\s*%[^.!?]{0,500}?(?:pago [uú]nico compensatorio|compensaci[oó]n)[^.!?]{0,500}?(?:n[oó]mina siguiente)[^.!?]*/i);
  if (ipc) obligations.push({ type:'conditional_payment', condition:{ metric:'IPC', operator:'>', thresholdPercent:num(ipc[1]), capPercent:num(ipc[2]), period:'2026' }, action:'pay_compensatory_amount', consolidable:false, deadline:{ type:'event_relative', anchorEvent:'publication_of_final_2026_IPC', resolvedCalendarDate:null }, status:'latent' });

  return {
    ...base,
    effectiveFrom,
    effectiveDates: effectiveFrom && !(base.effectiveDates ?? []).includes(effectiveFrom) ? [effectiveFrom, ...(base.effectiveDates ?? [])].sort() : base.effectiveDates,
    retroactive: Boolean(base.publicationDate && effectiveFrom && effectiveFrom < base.publicationDate),
    changeTypes: [...types],
    obligations
  };
}

export async function extractFromBoeUrl(url) { return enrich(await extractV0(url)); }

if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) process.exit(2);
  console.log(JSON.stringify(await extractFromBoeUrl(url), null, 2));
}

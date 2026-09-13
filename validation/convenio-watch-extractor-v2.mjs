import { extractOperationalEvent, fetchBoeText } from './convenio-watch-extractor-v0.mjs';

const MONTHS = { enero:'01', febrero:'02', marzo:'03', abril:'04', mayo:'05', junio:'06', julio:'07', agosto:'08', septiembre:'09', setiembre:'09', octubre:'10', noviembre:'11', diciembre:'12' };

function num(raw) { return raw ? Number(raw.replace(',', '.')) : null; }
function date(raw) {
  if (!raw) return null;
  const cleaned = raw
    .replace(/(\d{1,2})\s*[.ºª°]+/g, '$1')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const m = cleaned.match(/(\d{1,2})\s+de\s+([a-z]+)\s+(?:de|del)\s+(\d{4})/);
  if (!m || !MONTHS[m[2]]) return null;
  return `${m[3]}-${MONTHS[m[2]]}-${String(Number(m[1])).padStart(2,'0')}`;
}

function enrich(base, fullText) {
  const text = fullText || (base.evidence ?? []).join(' ');
  let effectiveFrom = base.effectiveFrom;
  if (!effectiveFrom) {
    const m = text.match(/(?:vigencia|efectos? econ[oó]micos?)[^.!?]{0,180}?(?:desde\s+(?:el\s+)?|retrotra[ií]d[oa]s?\s+(?:al|a\s+el)\s+)(\d{1,2}(?:\s*[.ºª°]+)?\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+(?:de|del)\s+\d{4})/i);
    effectiveFrom = date(m?.[1]);
  }

  const types = new Set(base.changeTypes ?? []);
  if (/incrementos? salariales?|revisi[oó]n salarial|subida salarial/i.test(text)) types.add('salary_review');
  if (/IPC[\s\S]{0,450}pago [uú]nico compensatorio|pago [uú]nico compensatorio[\s\S]{0,450}IPC/i.test(text)) types.add('ipc_contingent_payment');

  const obligations = [];
  const ipcCondition = text.match(/(?:si|en el caso de que)[^.!?]{0,300}?IPC[^.!?]{0,300}?(?:superior|supere)[^.!?]{0,160}?(\d+[,.]\d+)\s*%[^.!?]{0,260}?(?:l[ií]mite|m[aá]ximo|tope)[^.!?]{0,100}?(\d+[,.]\d+)\s*%[^.!?]{0,350}?(?:pago [uú]nico compensatorio|compensaci[oó]n)/i);
  if (ipcCondition) {
    const period = text.match(/IPC\s+(?:correspondiente\s+)?(?:al\s+)?año\s+(20\d{2})/i)?.[1] ?? null;
    const deadlineDetected = /(?:este\s+)?pago [uú]nico[\s\S]{0,450}?n[oó]mina siguiente[\s\S]{0,220}?publicaci[oó]n del IPC definitivo/i.test(text);
    obligations.push({
      type:'conditional_payment',
      condition:{ metric:'IPC', operator:'>', thresholdPercent:num(ipcCondition[1]), capPercent:num(ipcCondition[2]), period },
      action:'pay_compensatory_amount',
      consolidable:/no consolidable/i.test(text) ? false : null,
      deadline: deadlineDetected
        ? { type:'event_relative', anchorEvent: period ? `publication_of_final_${period}_IPC` : 'publication_of_final_IPC', resolvedCalendarDate:null }
        : { type:'none_stated', anchorEvent:null, resolvedCalendarDate:null },
      status:'latent'
    });
  }

  return {
    ...base,
    effectiveFrom,
    effectiveDates: effectiveFrom && !(base.effectiveDates ?? []).includes(effectiveFrom) ? [effectiveFrom, ...(base.effectiveDates ?? [])].sort() : base.effectiveDates,
    retroactive: Boolean(base.publicationDate && effectiveFrom && effectiveFrom < base.publicationDate),
    changeTypes: [...types],
    obligations
  };
}

export async function extractFromBoeUrl(url) {
  const text = await fetchBoeText(url);
  return enrich(extractOperationalEvent({ text, sourceUrl: url }), text);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) process.exit(2);
  console.log(JSON.stringify(await extractFromBoeUrl(url), null, 2));
}

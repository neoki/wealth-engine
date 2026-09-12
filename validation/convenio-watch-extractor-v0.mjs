const MONTHS = {
  enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
  julio: '07', agosto: '08', septiembre: '09', setiembre: '09', octubre: '10', noviembre: '11', diciembre: '12'
};

function decodeHtml(s) {
  return s
    .replace(/&nbsp;|&#160;|\u00a0/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function htmlToText(html) {
  return decodeHtml(html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article)>/gi, '\n')
    .replace(/<[^>]+>/g, ' '))
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();
}

function spanishDateToIso(raw) {
  if (!raw) return null;
  const cleaned = raw.toLowerCase().replace(/\s+/g, ' ').trim();
  const m = cleaned.match(/(\d{1,2})\s+de\s+([a-záéíóúüñ]+)\s+de\s+(\d{4})/i);
  if (!m) return null;
  const month = MONTHS[m[2].normalize('NFD').replace(/[\u0300-\u036f]/g, '')];
  if (!month) return null;
  return `${m[3]}-${month}-${String(Number(m[1])).padStart(2, '0')}`;
}

function firstMatch(text, patterns, group = 1) {
  for (const re of patterns) {
    const m = text.match(re);
    if (m) return m[group]?.trim() ?? null;
  }
  return null;
}

function parsePublicationDate(text) {
  const raw = firstMatch(text, [
    /Publicado en:[\s\S]{0,120}?de\s+(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+de\s+\d{4})/i,
    /«BOE[^»]*»[^\n]{0,120}?de\s+(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+de\s+\d{4})/i
  ]);
  return spanishDateToIso(raw);
}

function parseAgreementCode(text) {
  return firstMatch(text, [
    /c[oó]digo\s+(?:de\s+)?convenio[^\d]{0,30}(\d{10,20})/i,
    /c[oó]digo\s+(\d{10,20})/i
  ]);
}

function parseAgreementName(text) {
  const title = firstMatch(text, [
    /por la que se registra y publica[^.]{0,1200}?(?:del|de la)\s+([^\.\n]*Convenio colectivo[^\.\n]*)\./i,
    /(?:ACTA[^\n]*\n)?([^\n]{10,500}CONVENIO COLECTIVO[^\n]{0,500})/i,
    /([^\n]{0,500}Convenio colectivo[^\n]{0,500})/i
  ]);
  return title?.replace(/\s+/g, ' ').trim() ?? null;
}

function parseEffectiveDates(text) {
  const out = [];
  const patterns = [
    /efectos?(?:\s+econ[oó]micos?)?\s+(?:desde|del|a partir de|el)?\s*(?:el\s*)?(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+del?|\s+de)\s+\d{4})/gi,
    /iniciar[aá]n?\s+sus\s+efectos\s+econ[oó]micos\s+(?:desde|el)?\s*(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+del?|\s+de)\s+\d{4})/gi,
    /vigencia\s+desde\s+(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+del?|\s+de)\s+\d{4})/gi
  ];
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      const iso = spanishDateToIso(m[1].replace(/\s+del\s+/i, ' de '));
      if (iso && !out.includes(iso)) out.push(iso);
    }
  }
  return out.sort();
}

function parseDeadline(text) {
  const fixedRaw = firstMatch(text, [
    /(?:antes del|hasta el|como m[aá]ximo el|fecha l[ií]mite[^\d]{0,40})(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+de\s+\d{4})/i
  ]);
  if (fixedRaw) {
    return { type: 'fixed_date', expression: fixedRaw, resolvedCalendarDate: spanishDateToIso(fixedRaw) };
  }

  const presentYear = text.match(/(?:antes del|hasta el|como m[aá]ximo el)\s*(\d{1,2})\s+de\s+([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)\s+del\s+presente\s+año\s*\((\d{4})\)/i);
  if (presentYear) {
    const resolved = spanishDateToIso(`${presentYear[1]} de ${presentYear[2]} de ${presentYear[3]}`);
    return { type: 'fixed_date', expression: presentYear[0], resolvedCalendarDate: resolved };
  }

  const eventRelative = firstMatch(text, [
    /((?:como m[aá]ximo,?\s+)?en la n[oó]mina siguiente a la del mes de publicaci[oó]n[^\.\n]*)/i,
    /((?:en|a m[aá]s tardar en) la n[oó]mina siguiente[^\.\n]*)/i
  ]);
  if (eventRelative) {
    return { type: 'event_relative', expression: eventRelative, resolvedCalendarDate: null };
  }

  const conditional = firstMatch(text, [
    /((?:si|en caso de que)[^\.\n]{0,500}?(?:IPC|[ií]ndice de precios)[^\.\n]{0,500}?(?:n[oó]mina|abonar|pago)[^\.\n]*)/i
  ]);
  if (conditional) {
    return { type: 'conditional_future_event', expression: conditional, resolvedCalendarDate: null };
  }

  return { type: 'none_stated', expression: null, resolvedCalendarDate: null };
}

function detectChangeTypes(text) {
  const types = new Set();
  if (/actualizaci[oó]n de (?:las )?tablas salariales|actualizar (?:las )?tablas salariales|nuevas tablas|tablas salariales[^.!?]{0,180}(?:se )?incrementar[aá]n?/i.test(text)) types.add('salary_tables');
  if (/revisi[oó]n salarial|incremento salarial|subida salarial|porcentaje.*salari/i.test(text)) types.add('salary_review');
  if (/salario m[ií]nimo interprofesional|\bSMI\b/i.test(text)) types.add('smi_trigger');
  if (/atrasos/i.test(text)) types.add('arrears');
  if (/convenio colectivo nacional|nuevo convenio|vigencia.*202[0-9].*202[0-9]/i.test(text)) types.add('new_agreement');
  if (/(?:IPC|índice de precios)[^\n]{0,300}(?:compensatorio|compensaci[oó]n|diferencia)/i.test(text)) types.add('ipc_contingent_payment');
  return [...types];
}

function detectTrigger(text) {
  const smi = firstMatch(text, [
    /(Real Decreto\s+\d+\/\d{4}[^\.\n]{0,250}salario m[ií]nimo interprofesional[^\.\n]*)/i
  ]);
  if (smi) return { type: 'external_rule_activation', description: smi };
  if (/(?:IPC|índice de precios)/i.test(text) && /(?:si|en caso de que)/i.test(text)) {
    return { type: 'conditional_future_event', description: 'IPC-linked condition detected; preserve source expression for later resolution.' };
  }
  return null;
}

function extractEvidence(text) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences
    .map(s => ({
      s: s.trim(),
      score: [/c[oó]digo de convenio/i, /efectos/i, /tablas salariales/i, /atrasos/i, /n[oó]mina siguiente/i, /SMI|salario m[ií]nimo interprofesional/i, /IPC/i]
        .reduce((n, re) => n + (re.test(s) ? 1 : 0), 0)
    }))
    .filter(x => x.score > 0 && x.s.length < 1200)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(x => x.s);
}

export function extractOperationalEvent({ text, sourceUrl = null, sourceId = null }) {
  const publicationDate = parsePublicationDate(text);
  const effectiveDates = parseEffectiveDates(text);
  const effectiveFrom = effectiveDates[0] ?? null;
  const deadline = parseDeadline(text);
  const retroactive = Boolean(publicationDate && effectiveFrom && effectiveFrom < publicationDate);
  const agreementCode = parseAgreementCode(text);

  return {
    sourceId: sourceId ?? firstMatch(text, [/Documento\s+(BOE-A-\d{4}-\d+)/i, /Referencia:\s*(BOE-A-\d{4}-\d+)/i]),
    sourceUrl,
    publicationDate,
    agreementCode,
    agreementName: parseAgreementName(text),
    changeTypes: detectChangeTypes(text),
    effectiveDates,
    effectiveFrom,
    retroactive,
    deadline,
    trigger: detectTrigger(text),
    evidence: extractEvidence(text),
    confidence: {
      sourceId: sourceId || /BOE-A-\d{4}-\d+/.test(text) ? 1 : 0,
      agreementCode: agreementCode ? 1 : 0,
      publicationDate: publicationDate ? 1 : 0,
      effectiveFrom: effectiveFrom ? 0.9 : 0,
      deadline: deadline.type === 'none_stated' ? 0.4 : 0.9
    }
  };
}

export async function fetchBoeText(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'wealth-engine-convenio-watch/0.1' } });
  if (!res.ok) throw new Error(`BOE fetch failed: ${res.status} ${res.statusText}`);
  return htmlToText(await res.text());
}

export async function extractFromBoeUrl(url) {
  const text = await fetchBoeText(url);
  return extractOperationalEvent({ text, sourceUrl: url });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node validation/convenio-watch-extractor-v0.mjs <BOE_URL>');
    process.exit(2);
  }
  console.log(JSON.stringify(await extractFromBoeUrl(url), null, 2));
}

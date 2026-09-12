import { extractFromBoeUrl as extractV0 } from './convenio-watch-extractor-v0.mjs';

function parseNumber(raw) {
  if (!raw) return null;
  return Number(raw.replace(',', '.'));
}

function parseConditionalObligations(evidence = []) {
  const text = evidence.join(' ');
  const obligations = [];

  const ipc = text.match(/(?:si|en el caso de que)[^.!?]{0,250}?IPC[^.!?]{0,250}?(?:superior|supere)[^.!?]{0,120}?(\d+[,.]\d+)\s*%[^.!?]{0,220}?(?:l[ií]mite|m[aá]ximo|tope)[^.!?]{0,80}?(\d+[,.]\d+)\s*%[^.!?]{0,500}?(?:pago [uú]nico compensatorio|compensaci[oó]n)[^.!?]{0,500}?(?:n[oó]mina siguiente)[^.!?]*/i);

  if (ipc) {
    obligations.push({
      type: 'conditional_payment',
      condition: {
        metric: 'IPC',
        operator: '>',
        thresholdPercent: parseNumber(ipc[1]),
        capPercent: parseNumber(ipc[2]),
        period: '2026'
      },
      action: 'pay_compensatory_amount',
      consolidable: false,
      deadline: {
        type: 'event_relative',
        anchorEvent: 'publication_of_final_2026_IPC',
        expression: 'nómina siguiente a la publicación del IPC definitivo de 2026',
        resolvedCalendarDate: null
      },
      status: 'latent'
    });
  }

  return obligations;
}

export async function extractFromBoeUrl(url) {
  const base = await extractV0(url);
  return {
    ...base,
    obligations: parseConditionalObligations(base.evidence)
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node validation/convenio-watch-extractor-v1.mjs <BOE_URL>');
    process.exit(2);
  }
  console.log(JSON.stringify(await extractFromBoeUrl(url), null, 2));
}

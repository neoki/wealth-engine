import { extractFromBoeUrl } from './convenio-watch-extractor-v2.mjs';

const CASES = [
  {
    id: 'BOE-A-2026-6383',
    url: 'https://www.boe.es/eli/es/res/2026/03/06/(5)',
    expect: {
      sourceId: 'BOE-A-2026-6383',
      publicationDate: '2026-03-18',
      agreementCode: '99004975011981',
      effectiveFrom: '2026-01-01',
      retroactive: true,
      deadlineType: 'fixed_date',
      deadlineDate: '2026-04-30',
      changeTypesAll: ['salary_tables']
    }
  },
  {
    id: 'BOE-A-2026-6736',
    url: 'https://www.boe.es/eli/es/res/2026/03/16/(2)',
    expect: {
      sourceId: 'BOE-A-2026-6736',
      publicationDate: '2026-03-23',
      agreementCode: '90012072011999',
      effectiveFrom: '2026-01-01',
      retroactive: true,
      changeTypesAll: ['salary_tables', 'smi_trigger']
    }
  },
  {
    id: 'BOE-A-2026-9024',
    url: 'https://www.boe.es/eli/es/res/2026/04/13/(3)',
    expect: {
      sourceId: 'BOE-A-2026-9024',
      publicationDate: '2026-04-24',
      agreementCode: '99001355011983',
      effectiveFrom: '2026-01-01',
      retroactive: true,
      deadlineType: 'event_relative',
      deadlineDate: null,
      changeTypesAll: ['salary_tables', 'smi_trigger', 'arrears']
    }
  },
  {
    id: 'BOE-A-2026-18631',
    url: 'https://www.boe.es/eli/es/res/2026/08/25/(11)',
    expect: {
      sourceId: 'BOE-A-2026-18631',
      publicationDate: '2026-09-04',
      agreementCode: '99016925012009',
      effectiveFrom: '2026-01-01',
      retroactive: true,
      changeTypesAll: ['new_agreement', 'salary_review', 'ipc_contingent_payment'],
      obligation: {
        type: 'conditional_payment',
        metric: 'IPC',
        thresholdPercent: 3.5,
        capPercent: 3.75,
        action: 'pay_compensatory_amount',
        deadlineType: 'event_relative',
        status: 'latent'
      }
    }
  },
  {
    id: 'BOE-A-2026-5850',
    url: 'https://www.boe.es/eli/es/res/2026/03/02/(3)',
    expect: {
      sourceId: 'BOE-A-2026-5850',
      publicationDate: '2026-03-12',
      agreementCode: '90014783012004',
      effectiveFrom: '2025-01-01',
      retroactive: true,
      changeTypesAll: ['new_agreement']
    }
  },
  {
    id: 'BOE-A-2026-8569',
    url: 'https://www.boe.es/eli/es/res/2026/04/08/(5)',
    expect: {
      sourceId: 'BOE-A-2026-8569',
      publicationDate: '2026-04-18',
      agreementCode: '99004615011982',
      effectiveFrom: '2026-01-01',
      retroactive: true,
      changeTypesAll: ['new_agreement']
    }
  }
];

function checks(result, expect) {
  const c = [];
  const eq = (name, actual, expected) => c.push({ name, ok: actual === expected, actual, expected });
  eq('sourceId', result.sourceId, expect.sourceId);
  eq('publicationDate', result.publicationDate, expect.publicationDate);
  eq('agreementCode', result.agreementCode, expect.agreementCode);
  eq('effectiveFrom', result.effectiveFrom, expect.effectiveFrom);
  eq('retroactive', result.retroactive, expect.retroactive);
  if ('deadlineType' in expect) eq('deadline.type', result.deadline?.type ?? null, expect.deadlineType);
  if ('deadlineDate' in expect) eq('deadline.resolvedCalendarDate', result.deadline?.resolvedCalendarDate ?? null, expect.deadlineDate);
  for (const t of expect.changeTypesAll ?? []) c.push({ name: `changeTypes includes ${t}`, ok: result.changeTypes.includes(t), actual: result.changeTypes, expected: t });
  if (expect.obligation) {
    const o = result.obligations?.[0] ?? null;
    eq('obligation.type', o?.type ?? null, expect.obligation.type);
    eq('obligation.metric', o?.condition?.metric ?? null, expect.obligation.metric);
    eq('obligation.thresholdPercent', o?.condition?.thresholdPercent ?? null, expect.obligation.thresholdPercent);
    eq('obligation.capPercent', o?.condition?.capPercent ?? null, expect.obligation.capPercent);
    eq('obligation.action', o?.action ?? null, expect.obligation.action);
    eq('obligation.deadline.type', o?.deadline?.type ?? null, expect.obligation.deadlineType);
    eq('obligation.status', o?.status ?? null, expect.obligation.status);
  }
  return c;
}

let passed = 0;
let total = 0;
const reports = [];
for (const item of CASES) {
  const result = await extractFromBoeUrl(item.url);
  const caseChecks = checks(result, item.expect);
  passed += caseChecks.filter(x => x.ok).length;
  total += caseChecks.length;
  reports.push({ id: item.id, result, checks: caseChecks });
}

const score = total ? passed / total : 0;
console.log(JSON.stringify({ score, passed, total, reports }, null, 2));
if (score < 0.95) process.exitCode = 1;

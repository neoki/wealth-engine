import { extractFromBoeUrl } from './convenio-watch-extractor-v3.mjs';
import { buildPortfolio } from './convenio-watch-portfolio-engine.mjs';

// End-to-end smoke test: authoritative BOE -> extractor v3 -> canonical obligations -> portfolio.
// This deliberately uses documents that exercise both multi-installment and event-driven obligations.
const cases = [
  {
    sourceId: 'BOE-A-2026-18419',
    url: 'https://www.boe.es/eli/es/res/2026/07/30/(11)',
    expectedObligationsAtLeast: 1
  },
  {
    sourceId: 'BOE-A-2026-18631',
    url: 'https://www.boe.es/eli/es/res/2026/08/25/(11)',
    expectedObligationsAtLeast: 1
  }
];

const extracted = [];
for (const testCase of cases) {
  const doc = await extractFromBoeUrl(testCase.url);
  if (doc.sourceId !== testCase.sourceId) {
    throw new Error(`wrong source id for ${testCase.url}: ${doc.sourceId}`);
  }
  if ((doc.obligations?.length ?? 0) < testCase.expectedObligationsAtLeast) {
    throw new Error(`no operational obligations extracted from ${testCase.sourceId}`);
  }
  extracted.push(doc);
}

const obligations = extracted.flatMap(doc => doc.obligations.map(obligation => ({
  ...obligation,
  sourceId: obligation.sourceId ?? doc.sourceId,
  sourceUrl: obligation.sourceUrl ?? doc.sourceUrl
})));

const portfolio = buildPortfolio(obligations, '2026-09-13', { events: {} }, { upcomingDays: 30 });

const advertising = portfolio.items.filter(item => item.sourceId === 'BOE-A-2026-18419');
if (advertising.length !== 3) {
  throw new Error(`expected 3 advertising installments end-to-end, got ${advertising.length}`);
}
if (advertising.some(item => item.category !== 'future')) {
  throw new Error(`advertising installments should be future on 2026-09-13: ${JSON.stringify(advertising)}`);
}

const ipc = portfolio.items.find(item => item.sourceId === 'BOE-A-2026-18631');
if (!ipc || ipc.category !== 'waiting_event') {
  throw new Error(`IPC obligation should be waiting_event end-to-end: ${JSON.stringify(ipc)}`);
}

console.log(JSON.stringify({
  ok: true,
  pipeline: 'BOE -> extractor-v3 -> canonical obligations -> portfolio',
  documents: extracted.length,
  obligations: obligations.length,
  portfolioItems: portfolio.totalPortfolioItems,
  counts: portfolio.counts
}, null, 2));

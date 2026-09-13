import fs from 'node:fs/promises';
import { extractFromBoeUrl } from './convenio-watch-extractor-v3.mjs';
import { buildPortfolio } from './convenio-watch-portfolio-engine.mjs';

const spec = JSON.parse(await fs.readFile(new URL('./convenio-watch-batch-v1.json', import.meta.url), 'utf8'));
const reports = [];
const allObligations = [];

for (const testCase of spec.cases) {
  const doc = await extractFromBoeUrl(testCase.url);
  if (doc.sourceId !== testCase.sourceId) {
    throw new Error(`wrong source id for ${testCase.label}: expected ${testCase.sourceId}, got ${doc.sourceId}`);
  }

  const obligations = (doc.obligations ?? []).map(obligation => ({
    ...obligation,
    sourceId: obligation.sourceId ?? doc.sourceId,
    sourceUrl: obligation.sourceUrl ?? doc.sourceUrl
  }));
  allObligations.push(...obligations);

  reports.push({
    sourceId: testCase.sourceId,
    label: testCase.label,
    agreementCode: doc.agreementCode ?? null,
    publicationDate: doc.publicationDate ?? null,
    obligations: obligations.length,
    obligationTypes: [...new Set(obligations.map(item => item.type ?? item.kind ?? 'unknown'))]
  });
}

const portfolio = buildPortfolio(allObligations, '2026-09-13', { events: {} }, { upcomingDays: 30 });
const documentsWithObligations = reports.filter(item => item.obligations > 0).length;
const actionableItems = portfolio.items.filter(item => !['terminal'].includes(item.category)).length;

const result = {
  batch: 'convenio-watch-batch-v1',
  frozenAgainstExtractorCommit: spec.extractorCommit,
  documents: reports.length,
  documentsWithObligations,
  documentYield: reports.length ? documentsWithObligations / reports.length : 0,
  obligations: allObligations.length,
  portfolioItems: portfolio.totalPortfolioItems,
  actionableItems,
  portfolioCounts: portfolio.counts,
  reports
};

console.log(JSON.stringify(result, null, 2));

// Gate transport/identity correctness, not semantic yield. Yield is a baseline metric for fresh cases,
// and must be recorded before any extractor changes are made against this batch.
if (reports.length !== spec.cases.length) {
  throw new Error(`batch incomplete: processed ${reports.length}/${spec.cases.length}`);
}

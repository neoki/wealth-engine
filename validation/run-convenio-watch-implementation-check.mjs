import { extractFromBoeUrl } from './convenio-watch-extractor-v3.mjs';
import { buildPortfolio } from './convenio-watch-portfolio-engine.mjs';

const sourceId = 'BOE-A-2026-18630';
const url = 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-18630';
const doc = await extractFromBoeUrl(url);
if (doc.sourceId !== sourceId) throw new Error(`wrong source id: ${doc.sourceId}`);

const duties = (doc.obligations ?? []).filter(item => item.type === 'implementation_duty');
if (duties.length !== 3) {
  throw new Error(`ALEH should expose exactly 3 bounded implementation duties, got ${duties.length}: ${JSON.stringify(duties)}`);
}

const dueDates = duties.map(item => item.deadline?.resolvedCalendarDate).sort();
const expected = ['2027-03-04', '2027-06-11', '2027-09-04'];
if (JSON.stringify(dueDates) !== JSON.stringify(expected)) {
  throw new Error(`ALEH implementation dates wrong: ${JSON.stringify(dueDates)} expected ${JSON.stringify(expected)}`);
}

const portfolio = buildPortfolio(duties, '2026-09-13', { events: {} }, { upcomingDays: 30 });
if (portfolio.totalPortfolioItems !== 3 || portfolio.items.some(item => item.category !== 'future')) {
  throw new Error(`ALEH implementation portfolio wrong: ${JSON.stringify(portfolio)}`);
}

console.log(JSON.stringify({
  ok: true,
  sourceId,
  implementationDuties: duties.map(item => ({
    obligationId: item.obligationId,
    description: item.description,
    anchorEvent: item.deadline.anchorEvent,
    offset: item.deadline.offset,
    dueDate: item.deadline.resolvedCalendarDate
  })),
  portfolioCounts: portfolio.counts
}, null, 2));

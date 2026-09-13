import fs from 'node:fs';
import { buildPortfolio } from './convenio-watch-portfolio-engine.mjs';

const fixture = JSON.parse(fs.readFileSync(new URL('./convenio-watch-real-portfolio-v1.json', import.meta.url), 'utf8'));
const portfolio = buildPortfolio(
  fixture.obligations,
  fixture.asOf,
  fixture.context,
  { upcomingDays: fixture.upcomingDays }
);

const expected = fixture.expected;

if (portfolio.totalObligations !== expected.totalObligations) {
  throw new Error(`wrong real portfolio obligation count: ${portfolio.totalObligations}`);
}
if (portfolio.totalPortfolioItems !== expected.totalPortfolioItems) {
  throw new Error(`wrong real portfolio item count: ${portfolio.totalPortfolioItems}`);
}
if (portfolio.attentionCount !== expected.attentionCount) {
  throw new Error(`wrong real portfolio attention count: ${portfolio.attentionCount}`);
}

for (const [category, count] of Object.entries(expected.counts)) {
  if ((portfolio.counts[category] ?? 0) !== count) {
    throw new Error(`wrong ${category} count: ${portfolio.counts[category] ?? 0}; expected ${count}`);
  }
}

const unexpectedCategories = Object.entries(portfolio.counts)
  .filter(([category, count]) => count > 0 && !(category in expected.counts));
if (unexpectedCategories.length > 0) {
  throw new Error(`unexpected categories: ${JSON.stringify(unexpectedCategories)}`);
}

if (portfolio.items[0]?.sourceId !== expected.highestPrioritySourceId) {
  throw new Error(`wrong highest-priority source: ${portfolio.items[0]?.sourceId}`);
}

const textile = portfolio.items.find(item => item.sourceId === 'BOE-A-2026-6383');
if (textile?.category !== 'overdue' || textile?.dueDate !== '2026-04-30') {
  throw new Error(`textile arrears not classified as overdue: ${JSON.stringify(textile)}`);
}

const consulting = portfolio.items.find(item => item.sourceId === 'BOE-A-2026-9024');
if (consulting?.category !== 'needs_context') {
  throw new Error(`consulting payroll-relative deadline should need context: ${JSON.stringify(consulting)}`);
}

const ipc = portfolio.items.find(item => item.sourceId === 'BOE-A-2026-18631');
if (ipc?.category !== 'waiting_event') {
  throw new Error(`IPC compensation should wait for final CPI publication: ${JSON.stringify(ipc)}`);
}

const advertising = portfolio.items.filter(item => item.sourceId === 'BOE-A-2026-18419');
if (advertising.length !== 3 || advertising.some(item => item.category !== 'future')) {
  throw new Error(`advertising installments should be three future items: ${JSON.stringify(advertising)}`);
}
if (advertising.find(item => item.installmentSequence === 2)?.dueDate !== '2027-03-31') {
  throw new Error('exclusive advertising installment deadline was not normalized to 2027-03-31');
}
if (advertising.find(item => item.installmentSequence === 3)?.dueDate !== '2027-09-30') {
  throw new Error('exclusive advertising installment deadline was not normalized to 2027-09-30');
}

console.log(JSON.stringify({
  ok: true,
  fixture: fixture.id,
  asOf: portfolio.asOf,
  totalObligations: portfolio.totalObligations,
  totalPortfolioItems: portfolio.totalPortfolioItems,
  attentionCount: portfolio.attentionCount,
  counts: portfolio.counts,
  queue: portfolio.items.map(({ sourceId, installmentSequence, category, dueDate, priority }) => ({
    sourceId,
    installmentSequence,
    category,
    dueDate,
    priority
  }))
}, null, 2));

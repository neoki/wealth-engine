import { buildPortfolio } from './convenio-watch-portfolio-engine.mjs';

const obligations = [
  {
    obligationId: 'BOE-A-TEST:overdue',
    sourceId: 'BOE-A-TEST',
    type: 'payment',
    action: 'pay_arrears',
    status: 'active',
    deadline: { type: 'fixed_date', resolvedCalendarDate: '2026-09-10' }
  },
  {
    obligationId: 'BOE-A-TEST:today',
    sourceId: 'BOE-A-TEST',
    type: 'filing',
    action: 'submit_report',
    status: 'active',
    deadline: { type: 'fixed_date', resolvedCalendarDate: '2026-09-13' }
  },
  {
    obligationId: 'BOE-A-TEST:window',
    sourceId: 'BOE-A-TEST',
    type: 'payment_schedule',
    action: 'pay_extraordinary_amount',
    status: 'active',
    installments: [
      { sequence: 1, deadline: { type: 'calendar_window', startDate: '2026-09-01', endDate: '2026-09-30' } },
      { sequence: 2, deadline: { type: 'fixed_date', resolvedCalendarDate: '2026-09-20' } },
      { sequence: 3, deadline: { type: 'fixed_date', resolvedCalendarDate: '2027-01-01' } }
    ]
  },
  {
    obligationId: 'BOE-A-TEST:event',
    sourceId: 'BOE-A-TEST',
    type: 'conditional_payment',
    action: 'pay_compensation',
    status: 'latent',
    deadline: { type: 'event_relative', anchorEvent: 'ipc_2026_final_publication' }
  },
  {
    obligationId: 'BOE-A-TEST:context',
    sourceId: 'BOE-A-TEST',
    type: 'payment',
    action: 'pay_next_payroll',
    status: 'triggered',
    deadline: { type: 'event_relative', anchorEvent: 'next_payroll_after_publication' }
  }
];

const portfolio = buildPortfolio(obligations, '2026-09-13', {
  events: {
    next_payroll_after_publication: { occurredAt: '2026-09-12T00:00:00Z' }
  }
}, { upcomingDays: 30 });

if (portfolio.totalObligations !== 5) throw new Error('wrong obligation count');
if (portfolio.totalPortfolioItems !== 7) throw new Error(`wrong item count: ${portfolio.totalPortfolioItems}`);
if (portfolio.counts.overdue !== 1) throw new Error('overdue bucket missing');
if (portfolio.counts.due_today !== 1) throw new Error('due-today bucket missing');
if (portfolio.counts.open_window !== 1) throw new Error('open-window bucket missing');
if (portfolio.counts.upcoming !== 1) throw new Error('upcoming bucket missing');
if (portfolio.counts.future !== 1) throw new Error('future bucket missing');
if (portfolio.counts.waiting_event !== 1) throw new Error('waiting-event bucket missing');
if (portfolio.counts.needs_context !== 1) throw new Error('needs-context bucket missing');
if (portfolio.attentionCount !== 5) throw new Error(`wrong attention count: ${portfolio.attentionCount}`);

const order = portfolio.items.map(item => item.category);
const expectedPrefix = ['overdue', 'due_today', 'open_window', 'needs_context', 'upcoming'];
if (order.slice(0, expectedPrefix.length).join(',') !== expectedPrefix.join(',')) {
  throw new Error(`priority order wrong: ${order.join(',')}`);
}

const installmentIds = portfolio.items
  .filter(item => item.obligationId === 'BOE-A-TEST:window')
  .map(item => item.itemId);
if (new Set(installmentIds).size !== 3) throw new Error('installments do not have unique portfolio identities');

const transitioned = portfolio.evaluatedObligations.find(item => item.obligationId === 'BOE-A-TEST:today');
if (transitioned.status !== 'due') throw new Error('portfolio evaluation did not preserve automatic due transition');

console.log(JSON.stringify({
  ok: true,
  asOf: portfolio.asOf,
  counts: portfolio.counts,
  attentionCount: portfolio.attentionCount,
  priorityOrder: portfolio.items.map(({ itemId, category, dueDate, priority }) => ({ itemId, category, dueDate, priority }))
}, null, 2));

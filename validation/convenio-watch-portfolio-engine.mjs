import { evaluateDeadline, evaluateInstallments, evaluateObligationDue } from './convenio-watch-deadline-engine.mjs';

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_UPCOMING_DAYS = 30;

function dateOnly(value) {
  if (!value) return null;
  const raw = String(value).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : null;
}

function daysBetween(from, to) {
  const a = Date.parse(`${from}T00:00:00Z`);
  const b = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / DAY_MS);
}

function classifyDeadline(deadlineState, asOf, upcomingDays) {
  const state = deadlineState?.state ?? 'unresolved';
  if (state === 'overdue') return 'overdue';
  if (state === 'due') return 'due_today';
  if (state === 'open_window') return 'open_window';
  if (state === 'waiting_event' || state === 'triggerable') return 'waiting_event';
  if (state === 'needs_context') return 'needs_context';
  if (state === 'periodic') return 'periodic';
  if (state === 'terminal') return 'terminal';
  if (state === 'none') return 'none';
  if (state === 'unresolved') return 'unresolved';
  if (state === 'future') {
    const today = dateOnly(asOf);
    const dueDate = dateOnly(deadlineState.dueDate);
    const daysUntilDue = today && dueDate ? daysBetween(today, dueDate) : null;
    return daysUntilDue !== null && daysUntilDue <= upcomingDays ? 'upcoming' : 'future';
  }
  return 'unresolved';
}

function priorityFor(category, deadlineState, asOf) {
  const today = dateOnly(asOf);
  const dueDate = dateOnly(deadlineState?.dueDate);
  const delta = today && dueDate ? daysBetween(today, dueDate) : null;

  if (category === 'overdue') return 100000 + Math.min(9999, Math.abs(delta ?? 0));
  if (category === 'due_today') return 90000;
  if (category === 'open_window') return 80000 + Math.max(0, 999 - (delta ?? 999));
  if (category === 'needs_context') return 70000;
  if (category === 'upcoming') return 60000 + Math.max(0, 999 - (delta ?? 999));
  if (category === 'waiting_event') return 50000;
  if (category === 'periodic') return 40000;
  if (category === 'unresolved') return 30000;
  if (category === 'future') return 20000 + Math.max(0, 999 - Math.min(delta ?? 999, 999));
  if (category === 'none') return 10000;
  return 0;
}

function portfolioItem({ obligation, deadlineState, asOf, upcomingDays, installment = null }) {
  const category = classifyDeadline(deadlineState, asOf, upcomingDays);
  return {
    itemId: installment
      ? `${obligation.obligationId}:installment:${installment.sequence}`
      : obligation.obligationId,
    obligationId: obligation.obligationId,
    sourceId: obligation.sourceId ?? null,
    sourceUrl: obligation.sourceUrl ?? null,
    type: obligation.type ?? null,
    action: obligation.action ?? null,
    status: obligation.status ?? null,
    installmentSequence: installment?.sequence ?? null,
    category,
    priority: priorityFor(category, deadlineState, asOf),
    dueDate: deadlineState?.dueDate ?? null,
    deadlineState
  };
}

export function buildPortfolio(obligations, asOf, context = {}, options = {}) {
  if (!Array.isArray(obligations)) throw new Error('obligations must be an array');
  const upcomingDays = Number.isInteger(options.upcomingDays) && options.upcomingDays >= 0
    ? options.upcomingDays
    : DEFAULT_UPCOMING_DAYS;

  const items = [];
  const evaluatedObligations = [];

  for (const obligation of obligations) {
    const evaluated = evaluateObligationDue(obligation, asOf, context);
    evaluatedObligations.push(evaluated.obligation);

    if ((obligation.installments ?? []).length > 0) {
      const installments = evaluateInstallments(obligation, asOf, context);
      for (const installmentState of installments) {
        const installment = obligation.installments.find(x => x.sequence === installmentState.sequence) ?? { sequence: installmentState.sequence };
        items.push(portfolioItem({
          obligation: evaluated.obligation,
          deadlineState: installmentState,
          asOf,
          upcomingDays,
          installment
        }));
      }
      continue;
    }

    items.push(portfolioItem({
      obligation: evaluated.obligation,
      deadlineState: evaluated.deadlineState,
      asOf,
      upcomingDays
    }));
  }

  items.sort((a, b) => b.priority - a.priority || String(a.itemId).localeCompare(String(b.itemId)));

  const counts = {};
  const buckets = {};
  for (const item of items) {
    counts[item.category] = (counts[item.category] ?? 0) + 1;
    (buckets[item.category] ??= []).push(item);
  }

  const attentionCategories = new Set(['overdue', 'due_today', 'open_window', 'needs_context', 'upcoming']);
  const attention = items.filter(item => attentionCategories.has(item.category));

  return {
    asOf: dateOnly(asOf),
    upcomingDays,
    totalObligations: obligations.length,
    totalPortfolioItems: items.length,
    attentionCount: attention.length,
    counts,
    buckets,
    attention,
    items,
    evaluatedObligations
  };
}

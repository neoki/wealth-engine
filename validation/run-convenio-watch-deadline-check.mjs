import {
  evaluateDeadline,
  evaluateInstallments,
  evaluateObligationDue
} from './convenio-watch-deadline-engine.mjs';

const fixedExclusive = evaluateDeadline({
  type: 'fixed_date',
  resolvedCalendarDate: '2027-04-01',
  exclusive: true
}, '2027-03-31');
if (fixedExclusive.state !== 'due' || fixedExclusive.dueDate !== '2027-03-31') {
  throw new Error(`exclusive deadline wrong: ${JSON.stringify(fixedExclusive)}`);
}

const fixedMissed = evaluateDeadline({
  type: 'fixed_date',
  resolvedCalendarDate: '2027-04-01',
  exclusive: true
}, '2027-04-01');
if (fixedMissed.state !== 'overdue') throw new Error('exclusive deadline should be overdue on stated date');

const quarter = evaluateDeadline({
  type: 'calendar_window',
  startDate: '2026-10-01',
  endDate: '2026-12-31'
}, '2026-11-15');
if (quarter.state !== 'open_window' || quarter.dueDate !== '2026-12-31') throw new Error('quarter window was not opened correctly');

const relativeWaiting = evaluateDeadline({
  type: 'event_relative',
  anchorEvent: 'ipc_2026_final_publication'
}, '2027-01-20', { events: {} });
if (relativeWaiting.state !== 'waiting_event') throw new Error('relative deadline should wait for anchor event');

const relativeNeedsContext = evaluateDeadline({
  type: 'event_relative',
  anchorEvent: 'next_payroll_after_publication'
}, '2026-05-10', {
  events: {
    next_payroll_after_publication: { occurredAt: '2026-04-24T00:00:00Z' }
  }
});
if (relativeNeedsContext.state !== 'needs_context') throw new Error('relative deadline should preserve missing payroll context');

const relativeResolved = evaluateDeadline({
  type: 'event_relative',
  anchorEvent: 'next_payroll_after_publication'
}, '2026-05-29', {
  events: {
    next_payroll_after_publication: {
      occurredAt: '2026-04-24T00:00:00Z',
      resolvedCalendarDate: '2026-05-30'
    }
  }
});
if (relativeResolved.state !== 'future' || relativeResolved.dueDate !== '2026-05-30') {
  throw new Error(`relative deadline context resolution failed: ${JSON.stringify(relativeResolved)}`);
}

const relativeSixMonths = evaluateDeadline({
  type: 'event_relative',
  anchorEvent: 'entry_into_force_current_plan',
  offset: { value: 6, unit: 'months' }
}, '2026-09-13', {
  events: {
    entry_into_force_current_plan: { occurredAt: '2026-09-04T00:00:00Z' }
  }
});
if (relativeSixMonths.state !== 'future' || relativeSixMonths.dueDate !== '2027-03-04') {
  throw new Error(`relative month offset failed: ${JSON.stringify(relativeSixMonths)}`);
}

const monthEndClamp = evaluateDeadline({
  type: 'event_relative',
  anchorEvent: 'month_end_anchor',
  offset: { value: 1, unit: 'months' }
}, '2026-01-31', {
  events: {
    month_end_anchor: { occurredAt: '2026-01-31T00:00:00Z' }
  }
});
if (monthEndClamp.dueDate !== '2026-02-28') {
  throw new Error(`relative month-end clamp failed: ${JSON.stringify(monthEndClamp)}`);
}

const active = {
  obligationId: 'BOE-A-TEST:due',
  type: 'payment',
  action: 'pay_amount',
  status: 'active',
  deadline: { type: 'fixed_date', resolvedCalendarDate: '2026-09-13' }
};
const dueResult = evaluateObligationDue(active, '2026-09-13');
if (dueResult.obligation.status !== 'due') throw new Error('active obligation did not become due');
if (dueResult.obligation.lifecycleHistory?.[0]?.reason !== 'deadline_reached') throw new Error('due transition reason missing');

const schedule = {
  installments: [
    { sequence: 1, deadline: { type: 'calendar_window', startDate: '2026-10-01', endDate: '2026-12-31' } },
    { sequence: 2, deadline: { type: 'fixed_date', resolvedCalendarDate: '2027-04-01', exclusive: true } },
    { sequence: 3, deadline: { type: 'fixed_date', resolvedCalendarDate: '2027-10-01', exclusive: true } }
  ]
};
const installments = evaluateInstallments(schedule, '2027-04-01');
if (installments.map(x => x.state).join(',') !== 'overdue,overdue,future') {
  throw new Error(`installment states wrong: ${JSON.stringify(installments)}`);
}

console.log(JSON.stringify({
  ok: true,
  exclusiveDeadline: fixedExclusive,
  missingContextPreserved: relativeNeedsContext.state,
  monthOffsetDeadline: relativeSixMonths.dueDate,
  monthEndClamp: monthEndClamp.dueDate,
  obligationStatus: dueResult.obligation.status,
  installmentStates: installments.map(({ sequence, state, dueDate }) => ({ sequence, state, dueDate }))
}, null, 2));

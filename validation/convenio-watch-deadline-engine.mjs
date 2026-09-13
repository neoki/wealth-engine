import { markDue, lifecycleStatus } from './convenio-watch-obligation-lifecycle.mjs';

const DAY_MS = 24 * 60 * 60 * 1000;

function dateOnly(value) {
  if (!value) return null;
  const raw = String(value).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const date = new Date(`${raw}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : raw;
}

function compareDate(a, b) {
  return a.localeCompare(b);
}

function previousDate(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Date(d.getTime() - DAY_MS).toISOString().slice(0, 10);
}

export function addOffset(iso, offset) {
  const value = Number(offset?.value);
  const unit = offset?.unit;
  if (!Number.isFinite(value) || value < 0 || !['days', 'weeks', 'months', 'years'].includes(unit)) return null;

  const d = new Date(`${iso}T00:00:00Z`);
  if (unit === 'days') d.setUTCDate(d.getUTCDate() + value);
  if (unit === 'weeks') d.setUTCDate(d.getUTCDate() + (value * 7));
  if (unit === 'years') d.setUTCFullYear(d.getUTCFullYear() + value);
  if (unit === 'months') {
    const day = d.getUTCDate();
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() + value);
    const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
    d.setUTCDate(Math.min(day, lastDay));
  }
  return d.toISOString().slice(0, 10);
}

export function evaluateDeadline(deadline, asOf, context = {}) {
  const today = dateOnly(asOf);
  if (!today) throw new Error('asOf must contain an ISO calendar date');
  if (!deadline?.type) return { state: 'none', dueDate: null, reason: 'deadline_not_stated' };

  if (deadline.type === 'fixed_date') {
    const statedDate = dateOnly(deadline.resolvedCalendarDate);
    if (!statedDate) return { state: 'unresolved', dueDate: null, reason: 'fixed_date_unresolved' };
    const dueDate = deadline.exclusive ? previousDate(statedDate) : statedDate;
    const cmp = compareDate(today, dueDate);
    return {
      state: cmp < 0 ? 'future' : cmp === 0 ? 'due' : 'overdue',
      dueDate,
      statedDate,
      exclusive: Boolean(deadline.exclusive),
      reason: deadline.exclusive ? 'exclusive_fixed_date' : 'fixed_date'
    };
  }

  if (deadline.type === 'calendar_window') {
    const startDate = dateOnly(deadline.startDate);
    const endDate = dateOnly(deadline.endDate);
    if (!startDate || !endDate) return { state: 'unresolved', dueDate: null, reason: 'calendar_window_incomplete' };
    if (compareDate(today, startDate) < 0) return { state: 'future', dueDate: endDate, startDate, endDate, reason: 'calendar_window_not_open' };
    if (compareDate(today, endDate) <= 0) return { state: 'open_window', dueDate: endDate, startDate, endDate, reason: 'calendar_window_open' };
    return { state: 'overdue', dueDate: endDate, startDate, endDate, reason: 'calendar_window_elapsed' };
  }

  if (deadline.type === 'event_relative') {
    const resolved = dateOnly(deadline.resolvedCalendarDate);
    if (resolved) return evaluateDeadline({ type: 'fixed_date', resolvedCalendarDate: resolved, exclusive: deadline.exclusive }, today, context);

    const event = context.events?.[deadline.anchorEvent] ?? null;
    if (!event) return { state: 'waiting_event', dueDate: null, anchorEvent: deadline.anchorEvent, reason: 'anchor_event_not_observed' };

    const contextDate = dateOnly(event.resolvedCalendarDate ?? event.deadlineDate);
    if (contextDate) {
      return {
        ...evaluateDeadline({ type: 'fixed_date', resolvedCalendarDate: contextDate, exclusive: deadline.exclusive }, today, context),
        anchorEvent: deadline.anchorEvent,
        reason: 'event_relative_resolved_from_context'
      };
    }

    const occurredAt = dateOnly(event.occurredAt);
    if (occurredAt && deadline.offset) {
      const dueDate = addOffset(occurredAt, deadline.offset);
      if (dueDate) {
        return {
          ...evaluateDeadline({ type: 'fixed_date', resolvedCalendarDate: dueDate, exclusive: deadline.exclusive }, today, context),
          anchorEvent: deadline.anchorEvent,
          eventOccurredAt: event.occurredAt,
          offset: deadline.offset,
          reason: 'event_relative_resolved_from_offset'
        };
      }
    }

    return {
      state: 'needs_context',
      dueDate: null,
      anchorEvent: deadline.anchorEvent,
      eventOccurredAt: event.occurredAt ?? null,
      reason: 'anchor_event_observed_but_deadline_requires_external_context'
    };
  }

  if (deadline.type === 'conditional_future_event') {
    const event = context.events?.[deadline.anchorEvent] ?? null;
    return event
      ? { state: 'triggerable', dueDate: null, anchorEvent: deadline.anchorEvent, reason: 'conditional_event_observed' }
      : { state: 'waiting_event', dueDate: null, anchorEvent: deadline.anchorEvent, reason: 'conditional_event_not_observed' };
  }

  if (deadline.type === 'periodic') return { state: 'periodic', dueDate: null, reason: 'periodic_requires_schedule_materialization' };
  if (deadline.type === 'none_stated') return { state: 'none', dueDate: null, reason: 'deadline_not_stated' };
  return { state: 'unresolved', dueDate: null, reason: `unsupported_deadline_type:${deadline.type}` };
}

export function evaluateObligationDue(obligation, asOf, context = {}) {
  const status = lifecycleStatus(obligation);
  if (['completed', 'superseded', 'cancelled'].includes(status)) {
    return { obligation, deadlineState: { state: 'terminal', dueDate: null, reason: `terminal:${status}` } };
  }

  const deadlineState = evaluateDeadline(obligation.deadline, asOf, context);
  if (!['due', 'overdue'].includes(deadlineState.state)) return { obligation, deadlineState };
  if (!['active', 'triggered', 'due'].includes(status)) return { obligation, deadlineState };

  return {
    obligation: markDue(obligation, {
      at: `${dateOnly(asOf)}T00:00:00Z`,
      reason: deadlineState.state === 'overdue' ? 'deadline_overdue' : 'deadline_reached'
    }),
    deadlineState
  };
}

export function evaluateInstallments(obligation, asOf, context = {}) {
  return (obligation.installments ?? []).map(installment => ({
    sequence: installment.sequence,
    ...evaluateDeadline(installment.deadline, asOf, context)
  }));
}

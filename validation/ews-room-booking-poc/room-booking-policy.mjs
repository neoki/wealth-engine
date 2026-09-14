export function evaluateBooking({ now, start, end, organizer, recurrence = null }, policy, busy = []) {
  const errors = [];
  const s = new Date(start);
  const e = new Date(end);
  const n = new Date(now);

  if (!(s < e)) errors.push('invalid_interval');

  const windowEnd = new Date(n.getTime() + policy.bookingWindowDays * 86400000);
  if (s > windowEnd) errors.push('outside_booking_window');

  if (recurrence && !policy.allowRecurringMeetings) {
    errors.push('recurrence_not_allowed');
  }

  const conflict = busy.some(
    (x) => new Date(x.start) < e && new Date(x.end) > s
  );
  if (conflict && !policy.allowConflicts) errors.push('conflict');

  const inPolicy =
    policy.allBookInPolicy || policy.bookInPolicy.includes(organizer);
  const needsApproval =
    !inPolicy &&
    (policy.requestInPolicy.includes(organizer) || policy.allRequestInPolicy);

  if (errors.length) return { decision: 'decline', errors };
  if (policy.automateProcessing === 'AutoAccept' && inPolicy) {
    return { decision: 'accept', errors: [] };
  }
  if (needsApproval) return { decision: 'pending_approval', errors: [] };
  return { decision: 'decline', errors: ['organizer_not_allowed'] };
}

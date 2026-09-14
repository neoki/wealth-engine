import assert from 'node:assert/strict';
import { evaluateBooking } from './room-booking-policy.mjs';
import { ewsToGraphOperation } from './graph-adapter.mjs';

const policy = {
  automateProcessing: 'AutoAccept',
  allowConflicts: false,
  allowRecurringMeetings: true,
  bookingWindowDays: 30,
  allBookInPolicy: true,
  bookInPolicy: [],
  allRequestInPolicy: false,
  requestInPolicy: []
};

const base = {
  now: '2026-09-14T10:00:00Z',
  organizer: 'u@example.com'
};

assert.equal(
  evaluateBooking(
    { ...base, start: '2026-09-15T10:00:00Z', end: '2026-09-15T11:00:00Z' },
    policy
  ).decision,
  'accept'
);

assert.equal(
  evaluateBooking(
    { ...base, start: '2026-09-15T10:00:00Z', end: '2026-09-15T11:00:00Z' },
    policy,
    [{ start: '2026-09-15T10:30:00Z', end: '2026-09-15T11:30:00Z' }]
  ).decision,
  'decline'
);

assert.equal(
  evaluateBooking(
    { ...base, start: '2026-11-20T10:00:00Z', end: '2026-11-20T11:00:00Z' },
    policy
  ).decision,
  'decline'
);

assert.equal(
  ewsToGraphOperation('CreateItem', {
    room: 'room@example.com',
    event: { subject: 'x' }
  }).method,
  'POST'
);

assert.equal(ewsToGraphOperation('Unknown', {}).unsupported, true);

console.log(
  JSON.stringify({
    ok: true,
    tests: 5,
    supportedOps: [
      'GetUserAvailability',
      'CreateItem',
      'UpdateItem',
      'DeleteItem'
    ]
  })
);

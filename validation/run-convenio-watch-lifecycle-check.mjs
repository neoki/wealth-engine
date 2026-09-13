import {
  applyTrigger,
  canTransition,
  completeObligation,
  markDue,
  supersedeObligation,
  validateLifecycle
} from './convenio-watch-obligation-lifecycle.mjs';

const latent = {
  obligationId: 'BOE-A-TEST:abc',
  type: 'conditional_payment',
  action: 'pay_compensatory_amount',
  status: 'latent'
};

const triggered = applyTrigger(latent, {
  eventId: 'INE-IPC-2026-FINAL',
  at: '2027-01-15T09:00:00Z'
});
if (triggered.status !== 'triggered') throw new Error('latent obligation was not triggered');
if (triggered.lifecycleHistory.length !== 1) throw new Error('trigger transition was not recorded');

const replayed = applyTrigger(triggered, {
  eventId: 'INE-IPC-2026-FINAL',
  at: '2027-01-15T09:00:00Z'
});
if (replayed.lifecycleHistory.length !== 1) throw new Error('trigger replay created duplicate transition');
if (replayed.appliedTriggerIds.length !== 1) throw new Error('trigger replay was not idempotent');

const due = markDue(replayed, { at: '2027-02-01T00:00:00Z', reason: 'deadline_reached' });
if (due.status !== 'due') throw new Error('triggered obligation was not marked due');

const completed = completeObligation(due, { at: '2027-02-03T10:00:00Z', reason: 'payment_confirmed' });
if (completed.status !== 'completed') throw new Error('due obligation was not completed');
if (completeObligation(completed) !== completed) throw new Error('completion replay should be idempotent');

if (canTransition('completed', 'due')) throw new Error('terminal status can transition back to due');
let rejected = false;
try { supersedeObligation(completed); } catch { rejected = true; }
if (!rejected) throw new Error('completed obligation was incorrectly superseded');

const errors = validateLifecycle(completed);
if (errors.length) throw new Error(`lifecycle validation failed: ${errors.join('; ')}`);

const active = { ...latent, obligationId: 'BOE-A-TEST:def', status: 'active' };
const superseded = supersedeObligation(active, { reason: 'replaced_by_later_agreement' });
if (superseded.status !== 'superseded') throw new Error('active obligation was not superseded');

console.log(JSON.stringify({
  ok: true,
  finalStatus: completed.status,
  transitions: completed.lifecycleHistory.map(({ from, to }) => `${from}->${to}`),
  appliedTriggers: completed.appliedTriggerIds
}, null, 2));

const TERMINAL = new Set(['completed', 'superseded', 'cancelled']);

const TRANSITIONS = {
  latent: new Set(['triggered', 'superseded', 'cancelled']),
  triggered: new Set(['due', 'completed', 'superseded', 'cancelled']),
  active: new Set(['due', 'completed', 'superseded', 'cancelled']),
  due: new Set(['completed', 'superseded', 'cancelled']),
  completed: new Set(),
  superseded: new Set(),
  cancelled: new Set()
};

export function lifecycleStatus(obligation) {
  return obligation.status ?? 'active';
}

export function canTransition(from, to) {
  if (from === to) return true;
  return Boolean(TRANSITIONS[from]?.has(to));
}

export function transitionObligation(obligation, to, metadata = {}) {
  const from = lifecycleStatus(obligation);
  if (!TRANSITIONS[from]) throw new Error(`unknown lifecycle status: ${from}`);
  if (!TRANSITIONS[to]) throw new Error(`unknown lifecycle status: ${to}`);
  if (!canTransition(from, to)) throw new Error(`invalid obligation transition: ${from} -> ${to}`);

  const history = [...(obligation.lifecycleHistory ?? [])];
  if (from !== to) {
    history.push({
      from,
      to,
      at: metadata.at ?? null,
      reason: metadata.reason ?? null,
      triggerEventId: metadata.triggerEventId ?? null
    });
  }

  return { ...obligation, status: to, lifecycleHistory: history };
}

export function applyTrigger(obligation, trigger) {
  if (!trigger?.eventId) throw new Error('trigger.eventId is required');
  const alreadyApplied = (obligation.appliedTriggerIds ?? []).includes(trigger.eventId);
  if (alreadyApplied) return obligation;

  const from = lifecycleStatus(obligation);
  let next = obligation;
  if (from === 'latent') {
    next = transitionObligation(obligation, 'triggered', {
      at: trigger.at ?? null,
      reason: trigger.reason ?? 'trigger_condition_satisfied',
      triggerEventId: trigger.eventId
    });
  }

  return {
    ...next,
    appliedTriggerIds: [...(next.appliedTriggerIds ?? []), trigger.eventId]
  };
}

export function markDue(obligation, metadata = {}) {
  const from = lifecycleStatus(obligation);
  if (TERMINAL.has(from) || from === 'due') return obligation;
  if (!['active', 'triggered'].includes(from)) throw new Error(`cannot mark ${from} obligation due`);
  return transitionObligation(obligation, 'due', metadata);
}

export function completeObligation(obligation, metadata = {}) {
  const from = lifecycleStatus(obligation);
  if (from === 'completed') return obligation;
  if (TERMINAL.has(from)) throw new Error(`cannot complete ${from} obligation`);
  return transitionObligation(obligation, 'completed', metadata);
}

export function supersedeObligation(obligation, metadata = {}) {
  const from = lifecycleStatus(obligation);
  if (from === 'superseded') return obligation;
  if (TERMINAL.has(from)) throw new Error(`cannot supersede ${from} obligation`);
  return transitionObligation(obligation, 'superseded', metadata);
}

export function validateLifecycle(obligation) {
  const errors = [];
  const status = lifecycleStatus(obligation);
  if (!TRANSITIONS[status]) errors.push(`unknown status ${status}`);

  const history = obligation.lifecycleHistory ?? [];
  for (const [i, entry] of history.entries()) {
    if (!TRANSITIONS[entry.from]) errors.push(`lifecycleHistory[${i}].from unknown`);
    if (!TRANSITIONS[entry.to]) errors.push(`lifecycleHistory[${i}].to unknown`);
    if (entry.from && entry.to && !canTransition(entry.from, entry.to)) {
      errors.push(`lifecycleHistory[${i}] invalid transition ${entry.from} -> ${entry.to}`);
    }
  }

  const triggerIds = obligation.appliedTriggerIds ?? [];
  if (new Set(triggerIds).size !== triggerIds.length) errors.push('appliedTriggerIds contains duplicates');
  return errors;
}

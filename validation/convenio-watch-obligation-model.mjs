import { createHash } from 'node:crypto';

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(k => [k, stable(value[k])]));
  }
  return value;
}

function identityPayload(obligation) {
  const { obligationId, sourceId, sourceUrl, evidence, ...semantic } = obligation;
  return stable(semantic);
}

export function obligationId(sourceId, obligation) {
  if (!sourceId) throw new Error('sourceId is required to create an obligation id');
  const digest = createHash('sha256')
    .update(JSON.stringify(identityPayload(obligation)))
    .digest('hex')
    .slice(0, 16);
  return `${sourceId}:${digest}`;
}

export function canonicalizeObligations(event) {
  const seen = new Set();
  const obligations = [];
  for (const raw of event.obligations ?? []) {
    const obligation = {
      ...raw,
      sourceId: event.sourceId ?? null,
      sourceUrl: event.sourceUrl ?? null
    };
    obligation.obligationId = obligationId(event.sourceId, obligation);
    if (seen.has(obligation.obligationId)) continue;
    seen.add(obligation.obligationId);
    obligations.push(obligation);
  }
  return { ...event, obligations };
}

export function validateObligationEvent(event) {
  const errors = [];
  const ids = new Set();
  if (!event.sourceId) errors.push('event.sourceId missing');
  for (const [i, o] of (event.obligations ?? []).entries()) {
    const p = `obligations[${i}]`;
    if (!o.obligationId) errors.push(`${p}.obligationId missing`);
    if (!o.type) errors.push(`${p}.type missing`);
    if (!o.action) errors.push(`${p}.action missing`);
    if (!o.sourceId) errors.push(`${p}.sourceId missing`);
    if (!o.sourceUrl) errors.push(`${p}.sourceUrl missing`);
    if (o.obligationId && ids.has(o.obligationId)) errors.push(`${p}.obligationId duplicate`);
    if (o.obligationId) ids.add(o.obligationId);

    if (o.deadline?.type === 'fixed_date' && !o.deadline.resolvedCalendarDate) {
      errors.push(`${p}.deadline fixed_date without resolvedCalendarDate`);
    }
    if (o.deadline?.type === 'event_relative' && !o.deadline.anchorEvent) {
      errors.push(`${p}.deadline event_relative without anchorEvent`);
    }
    if (o.type === 'conditional_payment' && !o.condition) errors.push(`${p}.condition missing`);
    if (o.installments) {
      const sequences = o.installments.map(x => x.sequence);
      const wanted = o.installments.map((_, j) => j + 1);
      if (JSON.stringify(sequences) !== JSON.stringify(wanted)) errors.push(`${p}.installments sequence is not contiguous`);
      for (const [j, installment] of o.installments.entries()) {
        const d = installment.deadline;
        if (!d?.type) errors.push(`${p}.installments[${j}].deadline.type missing`);
        if (d?.type === 'calendar_window' && (!d.startDate || !d.endDate)) errors.push(`${p}.installments[${j}] calendar_window incomplete`);
        if (d?.type === 'fixed_date' && !d.resolvedCalendarDate) errors.push(`${p}.installments[${j}] fixed_date unresolved`);
      }
    }
  }
  return errors;
}

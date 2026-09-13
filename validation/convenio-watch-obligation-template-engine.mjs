import { createHash } from 'node:crypto';
import { obligationId } from './convenio-watch-obligation-model.mjs';
import { addOffset } from './convenio-watch-deadline-engine.mjs';

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  }
  return value;
}

function templateSemantic(template) {
  const { templateId, sourceId, sourceUrl, evidence, ...semantic } = template;
  return stable(semantic);
}

export function obligationTemplateId(sourceId, template) {
  if (!sourceId) throw new Error('sourceId is required to create a template id');
  const digest = createHash('sha256')
    .update(JSON.stringify(templateSemantic(template)))
    .digest('hex')
    .slice(0, 16);
  return `${sourceId}:template:${digest}`;
}

export function canonicalizeObligationTemplates(event) {
  const seen = new Set();
  const templates = [];
  for (const raw of event.obligationTemplates ?? []) {
    const template = {
      ...raw,
      sourceId: event.sourceId ?? null,
      sourceUrl: event.sourceUrl ?? null
    };
    template.templateId = obligationTemplateId(event.sourceId, template);
    if (seen.has(template.templateId)) continue;
    seen.add(template.templateId);
    templates.push(template);
  }
  return { ...event, obligationTemplates: templates };
}

export function validateObligationTemplate(template) {
  const errors = [];
  if (!template.templateId) errors.push('templateId missing');
  if (!template.sourceId) errors.push('sourceId missing');
  if (!template.sourceUrl) errors.push('sourceUrl missing');
  if (!template.trigger?.eventType) errors.push('trigger.eventType missing');
  if (!template.instance?.type) errors.push('instance.type missing');
  if (!template.instance?.action) errors.push('instance.action missing');
  const deadline = template.instance?.deadline;
  if (deadline?.type === 'event_relative') {
    if (!deadline.anchorEvent) errors.push('instance.deadline.anchorEvent missing');
    if (!deadline.offset) errors.push('instance.deadline.offset missing');
  }
  return errors;
}

function materializeDeadline(deadline, event) {
  if (!deadline) return deadline;
  if (deadline.type !== 'event_relative') return { ...deadline };
  if (deadline.anchorEvent !== event.eventType || !deadline.offset || !event.occurredAt) return { ...deadline };
  const resolvedCalendarDate = addOffset(String(event.occurredAt).slice(0, 10), deadline.offset);
  return resolvedCalendarDate ? { ...deadline, resolvedCalendarDate } : { ...deadline };
}

export function materializeObligation(template, event) {
  if (!event?.eventId) throw new Error('event.eventId is required');
  if (!event?.eventType) throw new Error('event.eventType is required');
  if (!event?.occurredAt) throw new Error('event.occurredAt is required');
  if (template.trigger?.eventType !== event.eventType) return null;

  const obligation = {
    ...template.instance,
    deadline: materializeDeadline(template.instance.deadline, event),
    templateId: template.templateId,
    triggerEventId: event.eventId,
    triggerEventType: event.eventType,
    triggeredAt: event.occurredAt,
    status: 'triggered',
    sourceId: template.sourceId,
    sourceUrl: template.sourceUrl,
    evidence: template.evidence ?? template.instance.evidence ?? null,
    appliedTriggerIds: [event.eventId]
  };
  obligation.obligationId = obligationId(template.sourceId, obligation);
  return obligation;
}

export function applyEventToTemplates(templates, event, existingObligations = []) {
  const existingKeys = new Set(existingObligations
    .filter(item => item.templateId && item.triggerEventId)
    .map(item => `${item.templateId}::${item.triggerEventId}`));

  const created = [];
  for (const template of templates) {
    if (template.trigger?.eventType !== event.eventType) continue;
    const key = `${template.templateId}::${event.eventId}`;
    if (existingKeys.has(key)) continue;
    const obligation = materializeObligation(template, event);
    if (!obligation) continue;
    existingKeys.add(key);
    created.push(obligation);
  }

  return {
    created,
    obligations: [...existingObligations, ...created]
  };
}

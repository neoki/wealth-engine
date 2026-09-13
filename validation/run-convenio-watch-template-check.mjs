import {
  canonicalizeObligationTemplates,
  validateObligationTemplate,
  applyEventToTemplates
} from './convenio-watch-obligation-template-engine.mjs';
import { validateObligationEvent } from './convenio-watch-obligation-model.mjs';
import { buildPortfolio } from './convenio-watch-portfolio-engine.mjs';

const source = canonicalizeObligationTemplates({
  sourceId: 'BOE-A-2026-18629',
  sourceUrl: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-18629',
  obligationTemplates: [{
    trigger: { eventType: 'official_complaint_received' },
    instance: {
      type: 'complaint_resolution_duty',
      action: 'resolve_informational_file',
      description: 'Resolver el expediente informativo tras conocimiento oficial de una denuncia',
      deadline: {
        type: 'event_relative',
        anchorEvent: 'official_complaint_received',
        offset: { value: 30, unit: 'days' }
      }
    },
    evidence: ['En el plazo de 30 días naturales desde que se tenga conocimiento oficial de la denuncia, se resolverá dicho Expediente.']
  }]
});

if (source.obligationTemplates.length !== 1) throw new Error('expected one canonical template');
const template = source.obligationTemplates[0];
const templateErrors = validateObligationTemplate(template);
if (templateErrors.length) throw new Error(`invalid template: ${templateErrors.join('; ')}`);

// Two different normative clauses can impose the same semantic rule. They must
// not collapse onto one templateId merely because trigger/action/deadline match.
const collisionProbe = canonicalizeObligationTemplates({
  sourceId: 'BOE-A-TEST-COLLISION',
  sourceUrl: 'https://example.invalid/source',
  obligationTemplates: [
    {
      trigger: { eventType: 'request_received' },
      instance: { type: 'request_resolution_duty', action: 'resolve_request', deadline: { type: 'event_relative', anchorEvent: 'request_received', offset: { value: 1, unit: 'months' } } },
      evidence: ['Artículo 10. Resolver la solicitud en el plazo de un mes desde su recepción.']
    },
    {
      trigger: { eventType: 'request_received' },
      instance: { type: 'request_resolution_duty', action: 'resolve_request', deadline: { type: 'event_relative', anchorEvent: 'request_received', offset: { value: 1, unit: 'months' } } },
      evidence: ['Artículo 20. Resolver la solicitud en el plazo de un mes desde su recepción.']
    }
  ]
});
if (collisionProbe.obligationTemplates.length !== 2) throw new Error('distinct normative clauses were deduplicated');
if (collisionProbe.obligationTemplates[0].templateId === collisionProbe.obligationTemplates[1].templateId) throw new Error('distinct normative clauses collided on templateId');

const whitespaceProbe = canonicalizeObligationTemplates({
  sourceId: 'BOE-A-TEST-STABILITY',
  sourceUrl: 'https://example.invalid/source',
  obligationTemplates: [
    {
      trigger: { eventType: 'request_received' },
      instance: { type: 'request_resolution_duty', action: 'resolve_request', deadline: { type: 'event_relative', anchorEvent: 'request_received', offset: { value: 1, unit: 'months' } } },
      evidence: ['Resolver   la solicitud\n en el plazo de un mes.']
    },
    {
      trigger: { eventType: 'request_received' },
      instance: { type: 'request_resolution_duty', action: 'resolve_request', deadline: { type: 'event_relative', anchorEvent: 'request_received', offset: { value: 1, unit: 'months' } } },
      evidence: ['Resolver la solicitud en el plazo de un mes.']
    }
  ]
});
if (whitespaceProbe.obligationTemplates.length !== 1) throw new Error('whitespace-only evidence changes churned template identity');

const event1 = {
  eventId: 'goldcar-complaint-2026-09-10-A',
  eventType: 'official_complaint_received',
  occurredAt: '2026-09-10T09:00:00+02:00'
};
const first = applyEventToTemplates(source.obligationTemplates, event1);
if (first.created.length !== 1) throw new Error(`first event should create one obligation, got ${first.created.length}`);
const obligation1 = first.created[0];
if (obligation1.deadline?.resolvedCalendarDate !== '2026-10-10') {
  throw new Error(`wrong first deadline: ${obligation1.deadline?.resolvedCalendarDate}`);
}
if (obligation1.status !== 'triggered') throw new Error(`wrong first status: ${obligation1.status}`);

const validationErrors = validateObligationEvent({ sourceId: source.sourceId, obligations: first.obligations });
if (validationErrors.length) throw new Error(`materialized obligation invalid: ${validationErrors.join('; ')}`);

const replay = applyEventToTemplates(source.obligationTemplates, event1, first.obligations);
if (replay.created.length !== 0 || replay.obligations.length !== 1) {
  throw new Error(`event replay was not idempotent: ${JSON.stringify(replay)}`);
}

const event2 = {
  eventId: 'goldcar-complaint-2026-09-12-B',
  eventType: 'official_complaint_received',
  occurredAt: '2026-09-12T15:30:00+02:00'
};
const second = applyEventToTemplates(source.obligationTemplates, event2, replay.obligations);
if (second.created.length !== 1 || second.obligations.length !== 2) {
  throw new Error(`second distinct event should create a second obligation: ${JSON.stringify(second)}`);
}
if (second.created[0].deadline?.resolvedCalendarDate !== '2026-10-12') {
  throw new Error(`wrong second deadline: ${second.created[0].deadline?.resolvedCalendarDate}`);
}
if (second.obligations[0].obligationId === second.obligations[1].obligationId) {
  throw new Error('two complaint instances collided on obligationId');
}

const unrelated = applyEventToTemplates(source.obligationTemplates, {
  eventId: 'other-1', eventType: 'assignment_ended', occurredAt: '2026-09-13T00:00:00Z'
}, second.obligations);
if (unrelated.created.length !== 0 || unrelated.obligations.length !== 2) {
  throw new Error('unrelated event unexpectedly materialized the complaint template');
}

const portfolio = buildPortfolio(second.obligations, '2026-09-13', { events: {} }, { upcomingDays: 30 });
if (portfolio.totalPortfolioItems !== 2 || portfolio.items.some(item => item.category !== 'upcoming')) {
  throw new Error(`materialized obligations should be upcoming: ${JSON.stringify(portfolio)}`);
}

console.log(JSON.stringify({
  ok: true,
  sourceId: source.sourceId,
  templateId: template.templateId,
  identityRegression: {
    distinctClauses: collisionProbe.obligationTemplates.length,
    whitespaceStable: whitespaceProbe.obligationTemplates.length === 1
  },
  instances: second.obligations.map(item => ({
    obligationId: item.obligationId,
    triggerEventId: item.triggerEventId,
    dueDate: item.deadline.resolvedCalendarDate,
    status: item.status
  })),
  replayCreated: replay.created.length,
  portfolioCounts: portfolio.counts
}, null, 2));

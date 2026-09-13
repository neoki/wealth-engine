import { canonicalizeObligations, validateObligationEvent } from './convenio-watch-obligation-model.mjs';

const fixture = {
  sourceId: 'BOE-A-TEST-1',
  sourceUrl: 'https://www.boe.es/test',
  obligations: [
    {
      type: 'conditional_payment',
      condition: { metric: 'IPC', operator: '>', thresholdPercent: 3.5, capPercent: 3.75, period: '2026' },
      action: 'pay_compensatory_amount',
      deadline: { type: 'event_relative', anchorEvent: 'publication_of_final_2026_IPC', resolvedCalendarDate: null },
      status: 'latent'
    },
    {
      type: 'extraordinary_payment_schedule',
      action: 'pay_extraordinary_amount',
      consolidable: false,
      installments: [
        { sequence: 1, deadline: { type: 'calendar_window', startDate: '2026-10-01', endDate: '2026-12-31', resolvedCalendarDate: null } },
        { sequence: 2, deadline: { type: 'fixed_date', resolvedCalendarDate: '2027-04-01', exclusive: true } }
      ],
      status: 'active'
    }
  ]
};

const first = canonicalizeObligations(fixture);
const second = canonicalizeObligations(fixture);
const errors = validateObligationEvent(first);

if (errors.length) throw new Error(`model validation failed: ${errors.join('; ')}`);
if (first.obligations.length !== 2) throw new Error('expected two obligations');
if (first.obligations[0].obligationId !== second.obligations[0].obligationId) throw new Error('obligation id is not deterministic');
if (first.obligations[0].obligationId === first.obligations[1].obligationId) throw new Error('different obligations collided');
if (!first.obligations.every(o => o.sourceId === fixture.sourceId && o.sourceUrl === fixture.sourceUrl)) throw new Error('source provenance was not propagated');

const duplicated = canonicalizeObligations({ ...fixture, obligations: [fixture.obligations[0], fixture.obligations[0]] });
if (duplicated.obligations.length !== 1) throw new Error('duplicate semantic obligation was not removed');

console.log(JSON.stringify({ ok: true, obligationIds: first.obligations.map(o => o.obligationId) }, null, 2));

# Convenio Watch — first-signal extraction spec

## Why this exists
The first technical validation should prove that official publications can be converted into *operational payroll/advisory signals*, not merely summarized.

## Canonical signal schema

```json
{
  "source_id": "BOE-A-...",
  "publication_date": "YYYY-MM-DD",
  "agreement_name": "...",
  "regcon_code": "...",
  "territory": "national|galicia|province|company",
  "change_type": "salary_tables|salary_review|new_agreement|extension|correction|other",
  "effective_from": "YYYY-MM-DD|null",
  "retroactive": true,
  "payment_deadline": "YYYY-MM-DD|null",
  "salary_change_percent": 0.0,
  "action_required": "...",
  "confidence": 0.0,
  "evidence": [{"text":"...","source_url":"..."}],
  "needs_human_review": true
}
```

## Gold examples from BOE 2026

### Textile and clothing — BOE-A-2026-6383
- REGCON: 99004975011981
- change_type: salary_tables
- effective_from: 2026-01-01
- retroactive: true (publication was 2026-03-18)
- salary_change_percent: 3.3
- payment_deadline: 2026-04-30
- operational consequence: affected employers must apply the new tables and settle the increase by the deadline; later payment can trigger a 10% late-payment surcharge, subject to the stated exception.

### Large stores — BOE-A-2026-12012
- REGCON: 99002405011982
- change_type: salary_review
- salary consequence: 1% annual variable, non-consolidable complement calculated over 2025 tables
- operational consequence: payment timing is constrained by the agreement/publication and may require payroll action even though this is not a replacement salary table.

### Galicia youth reform / child protection — BOE-A-2026-10967
- change_type: salary_tables
- territory: galicia
- effective_from: 2026-05-22
- operational consequence: Galicia-specific remuneration tables/complements apply for 2026–2029; this is a useful test that geographic applicability is extracted separately from agreement identity.

## Validation protocol
1. Pull 50 known collective-agreement publications spanning BOE + Galicia/provincial sources.
2. Manually label the canonical fields above to create a gold set.
3. Run deterministic parsing first (metadata, REGCON, dates, percentages); use an LLM only for semantic fields and action_required.
4. Score field-level precision/recall. Treat false operational alerts as substantially more costly than missed low-impact notices.
5. Promote to a live shadow feed only if critical fields (agreement identity, change type, effective date/retroactivity, material payroll action) reach >=95% precision on the gold set.
6. Human review remains mandatory for ambiguous scope, company-level applicability and inferred company->agreement mappings.

## Product insight
The sellable object is not a document summary. It is an event with a deadline and a mapped set of affected client companies. The demo should therefore render a queue such as: `17 clients affected -> salary tables +3.3% -> effective 1 Jan -> settle by 30 Apr`, always linked to authoritative evidence.

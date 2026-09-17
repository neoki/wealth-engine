# Battery Passport Data Readiness — experiment v1

Status: DISCOVERY / MANUAL-FIRST
Date: 2026-09-17

## Signal

The EU Battery Passport becomes mandatory on 18 February 2027 for EV batteries, LMT batteries and industrial batteries above 2 kWh placed on the EU market. The European Commission's August 2026 preparation guidance consolidates 71 data points and explicitly tells operators to begin aligning internal processes, data systems and reporting practices.

The DPP Registry became operational on 20 July 2026. This creates a near-term implementation window rather than a distant regulatory thesis.

## Competition is validation, not a kill signal

Battery-passport publishing software is already competitive. Public offers include free pilots and paid plans around €149/month, €449/month and higher enterprise tiers. Some vendors already include CSV/Excel import, validation, supplier collection and ERP/API integration.

Therefore Wealth Engine should NOT build another QR/passport publishing SaaS unless evidence later reveals a differentiated gap.

The competitive market instead validates that companies are allocating budget to the problem.

## Wedge: Passport Data Preflight

Test the layer immediately before passport software implementation.

Promise:

> Give us one battery model and the data/evidence you currently have. We return a field-level readiness map showing what is usable, missing, contradictory, supplier-dependent or technically blocked before you choose or implement a passport platform.

This is implementation QA/data readiness, not legal certification and not a replacement for a DPP platform.

## Manual input

For one representative battery model:

- existing spreadsheet / ERP export / PIM extract;
- supplier data sheets and declarations;
- available lifecycle/carbon/material documentation;
- identifiers and model/category information;
- optional intended DPP vendor/schema.

Never request credentials or production-system write access for the initial experiment.

## Output

A 71-point-oriented evidence matrix, constrained to fields applicable to the battery/category:

- PRESENT + EVIDENCED
- PRESENT + UNVERIFIED
- FORMAT/SEMANTIC MISMATCH
- CONFLICTING SOURCES
- MISSING — INTERNAL OWNER
- MISSING — SUPPLIER DEPENDENCY
- NOT APPLICABLE / NEEDS CONFIRMATION

Plus:

1. readiness percentage with explicit denominator;
2. top blockers ranked P0/P1/P2;
3. supplier request queue;
4. internal owner queue;
5. transformation/mapping work needed before ingestion;
6. machine-readable CSV/JSON mapping suitable for handoff to the chosen DPP vendor where possible.

## What we are testing

Not whether companies need a battery passport. That obligation and vendor category already exist.

Test whether the expensive/frictional part is upstream data assembly and whether a vendor-neutral preflight saves enough implementation work to buy separately.

## Buyer hypotheses

Primary:
- battery manufacturers and importers with several models;
- BESS / industrial battery assemblers;
- e-bike / LMT manufacturers and importers.

Higher-leverage channel:
- DPP consultancies and implementation partners;
- ERP/PIM integrators serving battery manufacturers;
- conformity/compliance consultants who do not want to build data tooling.

Do not assume DPP software vendors are enemies. They may be the best distribution channel if dirty customer data increases onboarding cost.

## Price hypotheses — not published

- single-model preflight: €490
- portfolio sample / mapping sprint: €990–1,900
- partner repeatable kit / white-label workflow: €2,500+

Pricing is deliberately above cheap passport SaaS because the unit of value is implementation labour and data remediation, not passport hosting.

## Validation gate

PASS only with real external evidence:

- >=3 target buyers/implementers acknowledge upstream data readiness as a material implementation problem; AND
- >=1 provides an anonymised/representative model dataset for the preflight or expresses explicit willingness to pay; AND
- the preflight finds >=5 material field/evidence/mapping defects OR saves >=2 hours of implementation work.

STRONG PASS:

- a partner has >=5 client implementations where the same preflight can be repeated; OR
- recurring defect patterns make >=50% of the audit automatable.

KILL / PIVOT:

- existing DPP vendors ingest typical customer source material and resolve these issues as part of onboarding with negligible friction/cost;
- buyers will not share even representative/anonymised evidence;
- defects are mostly bespoke consulting questions with little repeatability.

If vendor onboarding already solves the problem well, investigate becoming a vendor/partner onboarding utility rather than competing with the vendor.

## Smallest next experiment

Do not build software or a public site yet.

1. Obtain one representative/anonymised battery-model data pack from a willing operator/implementer.
2. Map it manually against the Commission guidance/data-point structure.
3. Measure missing fields, conflicting evidence, supplier dependencies and elapsed analyst time.
4. Ask whether the resulting remediation queue would have been worth €490 before their DPP implementation.

Only after the gate passes, a public demand surface may be created at `battery-passport.rockrai.com`, preferably through `rockrai-experiment-factory` on Railway.

No domain purchase, paid service, paid advertising, critical DNS change, payment activation or irreversible action is authorized by this experiment.
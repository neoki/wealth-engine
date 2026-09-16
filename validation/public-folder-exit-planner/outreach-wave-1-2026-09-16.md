# PF Planner — buyer-validation wave 1 (2026-09-16)

Status: **READY FOR MANUAL OUTREACH, NOT SENT.**

Purpose: cross the willingness-to-pilot gate without treating public market evidence as buyer validation. No public site, paid service, DNS change or financial action is required.

## Offer under test

**White-label Public Folder Modernization Pre-flight for Microsoft 365 consultancies/MSPs.**

Input: existing PowerShell/tool CSV export; no tenant credentials.

Output: reviewable draft covering destination recommendations, evidence gaps, blockers/specialist-review queue, Microsoft-native vs MigrationWiz execution-risk comparison, migration waves and a scope-ready decision brief.

Promise to test: **turn a raw Public Folder inventory into a reviewable migration-scoping draft in minutes, while leaving sign-off with the engineer.**

## Wave 1 targets

| Priority | Prospect | Why this target is diagnostic | Desired signal |
|---|---|---|---|
| 1 | MSAdvance | Microsoft-focused consultancy whose published methodology already runs Assess → Design → Prepare → Prove → Execute → Validate. Tests whether PF Planner can compress a mature Spanish Microsoft consultancy's assessment/pre-sales stage. | Will compare sample against normal scoping workflow or run an anonymized PF export. |
| 2 | Inspizer | Senior direct-delivery Microsoft 365 consultancy; engineers who scope also deliver. Strong test of whether the artifact saves expert time rather than merely helping generalists. | Engineer identifies missing/unsafe checks and agrees/disagrees that the draft saves scoping time. |
| 3 | Essential Computing | Broader Microsoft 365/Exchange/SharePoint provider. Tests a Microsoft services/MSP profile rather than a PF-specialist vendor. | Will inspect the pack and say whether it could support migration discovery/pre-sales. |
| 4 | baseMSP | Offers Microsoft 365 migration and a free M365 review. Useful test because free assessment is already part of their funnel. | Does automation reduce unpaid assessment effort enough to matter? |
| 5 | Twin Technology | Explicit Assess → Plan → Migrate process and free migration assessment. | Whether PF-specific automation improves a free-assessment-to-paid-project funnel. |

Do **not** start with ExchangeSavvy or Priasoft. They are useful benchmarks but already own dedicated PF tooling; their response answers a different question from whether an MSP would use this pre-flight.

## Outreach payload — Spain

Subject: ¿Os ahorraría tiempo este pre-flight de Public Folders?

Estoy validando una herramienta muy concreta para equipos que hacen migraciones Microsoft 365: recibe un inventario CSV existente de Exchange Public Folders y genera un borrador revisable de modernización/scoping — destinos sugeridos, huecos de evidencia, blockers, oleadas y comparación de riesgo Microsoft-native vs MigrationWiz. No pide credenciales del tenant y la decisión final sigue siendo del ingeniero.

No quiero vender nada todavía. Quiero saber si realmente reduce trabajo de assessment/preventa o si estamos automatizando la parte equivocada.

Tenemos un ejemplo sintético reproducible (CSV + assessment). La prueba útil son 10–15 minutos de un especialista comparándolo con su proceso habitual y cuatro datos: tiempo normal, tiempo estimado con el borrador, checks importantes que falten y si probarían un inventario anonimizado real.

Una respuesta negativa también es evidencia útil.

## Outreach payload — English

Subject: Would this Public Folder pre-flight save your migration engineers time?

I'm validating a narrow tool for Microsoft 365 migration teams. It takes an existing Exchange Public Folder CSV inventory and produces a reviewable modernization/scoping draft: destination recommendations, evidence gaps, blockers, migration waves, and a Microsoft-native vs MigrationWiz risk comparison. It requires no tenant credentials and does not replace engineer sign-off.

I'm not trying to sell software at this stage. I want to find out whether this removes real assessment/pre-sales work or whether we're automating the wrong part of the process.

We have a reproducible synthetic sample (CSV + generated assessment). The useful test is 10–15 minutes from a migration engineer comparing it with the normal workflow: normal scoping time, estimated time with the draft, unsafe/missing checks, and whether they would run one anonymized real inventory through it.

A negative answer is useful too.

## Feedback ledger

Do not count politeness as validation.

| Prospect | Replied | Normal scoping time | Time with PF Planner | Material errors | Missing must-have checks | Real anonymized pilot? | Pay / live-opportunity signal? | Result |
|---|---:|---:|---:|---|---|---:|---:|---|
| MSAdvance | | | | | | | | |
| Inspizer | | | | | | | | |
| Essential Computing | | | | | | | | |
| baseMSP | | | | | | | | |
| Twin Technology | | | | | | | | |

## Decision rule

PASS: >=3 independent prospects report meaningful scoping/pre-sales savings and >=1 agrees to a real anonymized pilot, paid test, or introduction into a live opportunity.

REPOSITION: prospects recognize the problem but the generated artifact does not materially reduce expert work; use missing-check feedback to narrow/reframe before coding more.

STOP: repeated evidence says assessment is already cheap/automatic enough, output cannot be trusted from export metadata, or prospects will not test even anonymized inventory.

Until PASS, do not build `pfplanner.rockrai.com`.

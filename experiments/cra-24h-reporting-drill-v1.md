# CRA 24h Reporting Drill — validation v3

Status: RESHAPE — exact wedge is crowded; validate regulatory-collision drill instead

## Decision update — 2026-09-17

Fresh competitor discovery materially changes this experiment. Competition itself is positive evidence of demand, but several products now reproduce the *exact* low-end wedge rather than merely adjacent CRA compliance:

- cradrill.com: free 7-minute CRA incident drill plus a $39 Article 14 operations pack;
- CRA-Portal.eu: free self-service incident-response builder + tabletop drill;
- Tensetti: free 10-minute CRA 24h/72h reporting drill;
- CRAnotify: dedicated Article 14 workflow, deadline calculation, draft notification and evidence log;
- REGU: managed CRA reporting from EUR 490/year;
- Seentrix: CRA platform from EUR 59/month including Article 14 incident reporting;
- broader consultancies also explicitly sell tabletop exercises and reporting-process design.

This is strong validation that the pain is real, but weakens a standalone EUR 490 generic CRA tabletop offer. We should not abandon the market; we should move one layer up where the operational failure is harder.

## New wedge to validate: EU Regulatory Collision Drill

A single real security event can create several independent reporting duties. CRA, NIS2, GDPR and—where relevant—DORA do not collapse into one filing. They can have different triggers, recipients, clocks and evidence requirements.

The test is therefore no longer “can you file a CRA report?” It is:

> **If one incident triggers multiple EU regimes at once, can your organisation identify every applicable clock, route the right facts to the right owner and produce the separate filings without contradiction?**

Default synthetic scenario:
- an actively exploited vulnerability exists in a connected product;
- exploitation causes a material service incident;
- customer personal data may have been accessed;
- optionally, a regulated financial customer/service is affected.

The drill starts from one awareness event and builds a deterministic obligation matrix:

`event fact -> possible trigger -> regime -> clock anchor -> deadline -> recipient -> owner -> required facts -> filing status -> evidence`

Outputs:
1. incident fact sheet shared across regimes;
2. applicability/UNKNOWN matrix (no invented legal conclusions);
3. parallel clock map for CRA / NIS2 / GDPR / optional DORA;
4. owner + backup owner for each decision and filing;
5. contradiction test: facts/timestamps/severity statements that diverge between draft filings;
6. evidence gaps and missing access/credentials;
7. 60-minute tabletop log;
8. remediation queue;
9. one-page “collision readiness” evidence sheet.

This remains operational readiness support, not legal advice, certification, incident-response outsourcing or regulatory filing.

## Why this wedge may survive commoditisation

The low-end CRA-only workflow is already being commoditised to free/$39 tooling. The multi-regime problem is less about generating forms and more about orchestration across product security, IT/security, privacy/legal and possibly regulated-business teams.

Public evidence also shows vendors moving toward unified engines: ReportAct and Venvera explicitly cover multiple frameworks. That is competition, but also confirms the category. Our potential position is **independent acceptance testing of the organisation's existing incident stack**, including those platforms, rather than another GRC system.

## Pricing hypothesis

Do not publish or charge automatically.

- direct collision drill: test EUR 790 / 1,490 / 2,500 depending on number of regimes and teams;
- consultancy/MSP/DPO channel: EUR 2,500–5,000 white-label protocol + first supervised delivery, then determine economics from actual demand.

The higher anchor reflects cross-functional facilitation and independent testing. If buyers only value a generated deadline matrix, kill this: free/cheap software will win.

## Gate

PASS only if >=3 relevant organisations or advisers confirm that the *same incident* can require coordination across >=2 reporting regimes and at least one has not rehearsed the combined workflow.

Strong PASS if:
- one consultancy/MSP/DPO/security firm can repeat the drill across >=5 clients; OR
- one organisation agrees to run a synthetic collision scenario across >=2 real internal teams; OR
- a drill exposes a concrete contradiction/missed obligation that a CRA-only or NIS2-only process did not catch.

RESHAPE toward white-label independent QA if buyers already use multi-framework GRC but have never tested it end-to-end.

KILL if five qualified buyers already have rehearsed cross-regime workflows and see no value in independent testing, or if the only valued output is deadline calculation/template generation.

## Regulatory facts to preserve

CRA Article 14 reporting became applicable on 11 September 2026. The operational pattern includes a 24h early warning and 72h follow-up, with final-report timing depending on the event path. NIS2 has its own significant-incident reporting chain; GDPR can separately require supervisory-authority notification within 72 hours for qualifying personal-data breaches; DORA has its own major ICT-related incident reporting timetable for in-scope financial entities.

Do not imply that every incident triggers every regime. Trigger analysis must explicitly allow NOT APPLICABLE and UNKNOWN/escalate.

## Public deployment rule

No public web is required for manual validation. If the reshaped experiment earns a public surface, use `incident-collision.rockrai.com` and prefer `rockrai-experiment-factory` on Railway. Do not buy a domain, paid service, advertising, alter critical DNS or perform financial/irreversible actions without Pablo's explicit approval.

## Sources checked — 2026-09-17

Primary/regulatory sources should govern final client materials. Market discovery sources below are evidence of category/competition, not legal authority:
- https://cradrill.com/
- https://cra-portal.eu/cra-incident-response/
- https://tools.tensetti.io/cra
- https://cranotify.eu/
- https://reguproof.com/
- https://seentrix.com/
- https://reportact.com/
- https://venvera.com/frameworks/cra

Primary CRA references retained:
- https://digital-strategy.ec.europa.eu/en/policies/cra-reporting
- https://digital-strategy.ec.europa.eu/en/policies/cra-summary
- https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp

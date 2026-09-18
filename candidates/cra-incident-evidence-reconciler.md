# CRA Incident Evidence Reconciler

Status: **REJECTED as horizontal product — 2026-09-18**

## Thesis tested
A portfolio-oriented workflow could reconcile `security signal -> CRA trigger -> awareness timestamp -> 24h/72h/final deadlines -> evidence -> ENISA SRP submission proof`, sold to MSSPs/consultancies/manufacturers rather than becoming another generic CRA checklist/scanner.

## Evidence
The regulatory trigger is real and live. European Commission guidance states that Article 14 reporting obligations apply from 11 September 2026. Manufacturers must report actively exploited vulnerabilities and severe security incidents through the ENISA Single Reporting Platform: early warning within 24 hours, full notification within 72 hours, and a later final report. Legacy products already made available on the EU market are also subject to reporting obligations.

Official source: https://digital-strategy.ec.europa.eu/en/policies/cra-reporting

## Competition interpretation
Competition strongly validates willingness to spend on the workflow, but the proposed wedge is already covered unusually deeply:

- CRA Ready: incident case management, evidence collection, 24h/72h/final report generation, immutable audit trail and regulator workflow.
- Cramio: detection-to-proof workflow, awareness timestamp, human-approved filing packages, portal-confirmation capture, self-hosting and a white-label roadmap.
- BicPort Report: automatic Article 14 events, deadline timers, ENISA draft reports, audit trail, multi-tenant access and on-prem deployment.
- CRA Evidence / CRATrust / Attestra / Complaro: combinations of vulnerability monitoring, evidence, ENISA reporting and broader CRA compliance.
- Curator Pro: multi-tenant architecture plus CRA evidence linked to products/SBOMs/vulnerabilities.
- VulnTrack: multi-tenant manufacturer/client relationships and CRA evidence.

This is positive market evidence, not a reason by itself to kill. The rejection is because the exact proposed differentiation — incident clocks + evidence + submission pack + portfolio/multi-tenant/white-label operation — is already represented by multiple products. We currently have no proprietary data, acquisition channel or workflow advantage that makes another horizontal platform rational.

## Decision
**REJECT horizontal CRA Incident Evidence Reconciler. Do not build.**

## Lateral connections retained
1. `awareness-boundary evidence`: cross-system proof of *when the manufacturer became aware* may become a narrow forensic/control problem, but current CRA tools already timestamp cases and no paid gap is proven.
2. `submission-receipt reconciliation`: reconcile internal approved snapshot with what the ENISA SRP actually accepted/acknowledged. Cramio already advertises portal-confirmation capture, so this is not presently a clean wedge.
3. `third-party component -> affected-product decision provenance`: Article 14 can be triggered by an exploited third-party component when the final product is confirmed affected. Potentially useful across large product portfolios, but SBOM/VEX/CRA platforms already attack much of this chain. Retain as a signal, not a candidate.

## Re-entry condition
Only reconsider if buyer evidence shows a repeated expensive gap not covered by existing CRA platforms — especially an MSSP/consultancy portfolio workflow with demonstrated switching resistance or data advantage.

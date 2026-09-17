# API/Auth Change-Impact Reconciler

Status: **REJECTED — generic wedge saturated**
Date: 2026-09-18

## Thesis tested
Monitor upstream API and authentication changes and reconcile them against a company's integrations so teams know what will break, who owns it and what to change.

## Evidence
The pain is real, but the proposed value chain is already strongly covered. Current offerings include API Drift Sentinel (docs/spec monitoring, deadlines, service ownership and remediation routing), apidrift.co (vendor changelog monitoring, repository impact mapping and migration PRs), Versionly (repo-level impact plus auto-fix PRs), DriftGuard/DriftMonitor/Diffmon (contract drift), API Drift Alert (portfolio monitoring and impact mapping), and APIWatch (free changelog aggregation across many vendors).

Collectively these occupy source ingestion, diffing, classification, code impact, ownership, portfolio visibility, remediation and generated fixes.

## Decision
Do not build the generic product. We have not found proprietary data, privileged distribution, a buyer channel, a materially cheaper acquisition path, or an uncovered workflow sufficient to justify another entrant.

This is not rejection because competition exists. Competition validates the pain and spend; rejection is because differentiation is currently absent.

## Lateral residue
Retain as signals rather than incubating now:
- auth-semantic regression: scope, role, consent, CORS and policy behavior can change even when schemas remain stable;
- cross-SaaS operational change reconciliation for MSP portfolios, if existing RMM/ITAM tooling leaves a paid gap;
- agent-tool permission drift, already represented by the agent-permission-regression signal.

Reopen only if evidence reveals a repeatable uncovered workflow plus a plausible acquisition or data advantage.

## Next
Rotate to `vendor-eol-portfolio-reconciler` and test incumbent ITAM/SAM/RMM overlap before building anything.

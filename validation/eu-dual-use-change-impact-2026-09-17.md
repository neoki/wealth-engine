# EU Dual-Use Change-Impact Audit — 2026-09-17

## Signal
On 14 September 2026 the European Commission adopted the 2026 update to Annex I of Regulation (EU) 2021/821. The update adds controls covering semiconductor manufacturing/testing equipment and materials, advanced-computing ICs and assemblies, ceramic-matrix composites, inductive rotary encoders, additive-manufacturing equipment for energetic materials, SiC-fibre CVD equipment, axial-compressor development technology, and modifies technical parameters/definitions.

Primary source: https://policy.trade.ec.europa.eu/news/2026-update-eu-control-list-dual-use-items-2026-09-14_en

## Competition check
Automated classification itself is already crowded: TariffPilot, Nexantis, ECCN.io, Enthron, The Trade Hub/ClassifyAI, Sanctinel, Digicust and others classify products against EU/US control lists. Competition is positive evidence of spend, but makes a generic AI classifier a poor wedge.

## Wedge
**Dual-Use Change-Impact Audit**: answer a narrower operational question immediately after a control-list update:

> Which products in our existing catalogue need human re-review because the regulatory list changed?

Input: existing product master / previous ECN determinations + technical descriptions/specifications.

Output:
- `UNCHANGED` — no relevant changed entry detected;
- `REVIEW` — changed/new entry plausibly intersects product specs;
- `MISSING DATA` — cannot exclude applicability because a decisive technical parameter is absent;
- `ESCALATE` — evidence strongly suggests specialist/export-control review.

For every flagged product: old determination, potentially relevant 2026 change, decisive parameter(s), missing evidence, reason for flag and review queue. This is triage, not a binding legal classification or export authorisation.

## Why this may be better than classification
The installed base is the asset. Companies may already have hundreds/thousands of historical classifications in ERP/Excel. A list update creates a recurring reconciliation problem: identify what changed, map the delta onto the catalogue, and avoid reclassifying everything manually. Existing classification vendors may eventually absorb this feature; that is not a reason to reject the opportunity, but it changes the likely buyer/channel toward consultants and export teams with legacy portfolios.

## Commercial hypothesis
- €390: up to 100 historical SKUs, change-impact triage.
- €790: up to 500 SKUs + evidence/missing-parameter queue.
- €1,500–3,000: consultant/partner batch or white-label workflow.

These are test prices, not validated willingness-to-pay.

## Strong PASS
Any one of:
1. an export-control consultant offers >=5 client catalogues for repeated delta review;
2. a company supplies >=500 previously classified SKUs and confirms that list-change review is materially manual;
3. a representative dataset shows that >=70% of SKUs can be safely routed away from human re-review while preserving an explicit uncertainty/escalation bucket.

## Kill / evolve criteria
- Kill as standalone service if existing tools already ingest historical EU classifications and provide reliable list-version delta impact at negligible marginal effort.
- Evolve into a partner utility/API if consultants want the delta engine but own the final determination.
- Do not claim legal certainty, licence eligibility, or authority approval.

## Next experiment
Obtain or construct a non-sensitive representative catalogue of 50–100 industrial/electronic products with prior classifications, encode the 2026 Annex-I delta, and measure how many products can be routed to `UNCHANGED` vs `REVIEW/MISSING DATA` without attempting final legal classification.

## Public-web gate
No public web is justified yet. If demand evidence passes the gate, candidate: `dualuse-impact.rockrai.com`, preferably through `rockrai-experiment-factory` on Railway. Do not purchase a domain or alter critical DNS automatically.

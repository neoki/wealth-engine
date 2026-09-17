# EmpCo Old-Stock Triage — v1

Status: evidence-first / no-build
Date: 2026-09-17
Public web candidate only after gate: `green-stock.rockrai.com`

## Why now

Directive (EU) 2024/825 (Empowering Consumers for the Green Transition / EmpCo) applies from 27 September 2026. The European Commission states that Member States had to transpose by 27 March 2026 and the rules apply from 27 September 2026.

The obvious product — an AI green-claims website scanner — is already crowded (ContentBeak, Gilbert EmpCo, GreenGuard, Greenwashing Checker, DemoUp Cliplister, etc.). Do not build another scanner.

A narrower operational problem remains: physical old stock. The CPC Network's June 2026 Common Understanding explicitly covers products or packaging with environmental claims or sustainability labels manufactured, ordered, distributed or already on shelves before 27 September. Old stock is not exempt, but authorities may use phased/proportionate enforcement where genuine transition difficulties exist and expect timely, good-faith remediation.

## Wedge

**Old-Stock Green Claims Triage**: turn an inventory/SKU list plus packaging artwork/photos into a prioritized remediation plan for stock that cannot simply be rewritten in a CMS.

Not legal certification. Not a generic claim scanner. Not a replacement for counsel.

### Input
- SKU / product identifier
- units in stock and locations/channels
- packaging artwork/photo/PDF
- environmental/sustainability claims and labels present
- packaging order/manufacture/distribution dates where available
- estimated stock rotation / sell-through
- existing substantiation/certification references

### Output
For every SKU/claim:
- `REMOVE/RELABEL NOW`
- `DIGITAL CORRECTION FIRST`
- `EVIDENCE / COUNSEL REVIEW`
- `LOWER TRANSITION PRIORITY`
- exact physical/digital surface affected
- proposed mitigation: sticker/overlabel, shelf/POS notice, online correction, advertising withdrawal/update, next packaging revision
- evidence of good-faith remediation: owner, decision date, action, completion proof
- operational priority combining claim severity, online visibility, stock volume, rotation and feasibility

The valuable artifact is the **remediation queue + evidence log**, not an AI verdict.

## Why this may sell

Ten days before application, a brand can change a webpage quickly but may have thousands of units of printed packaging across warehouses/retailers. The CPC guidance creates an operational optimization problem: what can be corrected now, what requires relabelling, what is genuinely constrained, and how do we document reasonable action?

This is especially plausible for cosmetics, food/FMCG, apparel, household products and private-label retailers with many SKUs.

## Competition interpretation

Competition in green-claims scanning is positive evidence that companies spend on the problem. It is not a reason to abandon the market. It *is* a reason not to clone scanners whose value is merely finding phrases such as “eco”, “green” or “carbon neutral”.

Our test is whether the expensive pain is downstream: converting findings into a SKU-level physical remediation programme before/after 27 September.

## Manual pilot

1. Take 20–50 representative SKUs from one brand/retailer.
2. Inventory claims/labels from supplied packaging images/artwork; scanner tooling may assist but human review remains explicit.
3. Join claims to stock volume/location/rotation.
4. Classify surfaces and remediation options.
5. Produce a ranked 7-day action queue.
6. Generate an evidence log recording decisions/actions and unresolved counsel questions.
7. Measure hours saved versus spreadsheet/email coordination and number of previously unowned remediation actions surfaced.

## Pricing hypothesis — validation only

- €390: up to ~25 SKUs, triage + action queue
- €790: up to ~100 SKUs + evidence log
- €1,500–3,000: retailer/consultancy portfolio workflow or white-label first engagement

Do not publish or charge without normal approval/gate process.

## PASS gate

PASS if any of:
- >=3 brands/retailers explicitly say physical old stock is materially harder than updating online claims;
- >=1 buyer will provide a real SKU/packaging/stock sample for a pilot or expresses explicit willingness to pay;
- pilot finds >=10 actionable SKU-level remediation tasks that were not already centrally tracked;
- workflow cuts estimated coordination/review time by >=50%.

**Strong PASS:** a packaging/compliance consultancy, certification provider or retailer has >=5 client/brand portfolios where the workflow repeats.

## FAIL / pivot

Fail this wedge if brands have already remediated old stock, packaging volumes are too low, legal counsel owns the whole workflow cheaply, or existing product-information/packaging systems already generate the remediation queue and evidence trail.

If claim scanners are the acquisition channel but remediation is manual, integrate/partner rather than compete.

## Automation candidate after evidence

Only after PASS: ingestion of SKU spreadsheet + packaging assets, claim extraction, stock-weighted prioritization, remediation task export and evidence-log generation. A public surface, if needed, should be `green-stock.rockrai.com` and preferably use `rockrai-experiment-factory` on Railway.

## Sources checked 2026-09-17

- European Commission — Sustainable consumption: Directive adopted 28 Feb 2024; transposition deadline 27 Mar 2026; application 27 Sep 2026; Commission Q&A and CPC old-stock guidance.
- European Commission / CPC Network — Common Understanding on old stock: products/packaging manufactured, ordered, distributed or on shelves before application; timely good-faith compliance; phased/proportionate enforcement may be considered for genuine transition difficulties.
- EUR-Lex — Directive (EU) 2024/825, including sustainability-label and environmental-claim provisions and 27 Sep 2026 application date.
- Market scan — ContentBeak, Gilbert EmpCo, GreenGuard, Greenwashing Checker, DemoUp Cliplister and CLAIMTRUST show an already active scanner/audit market.

## Guardrails

No domain purchase. No paid services. No paid ads. No DNS changes. No financial action. No claim that this constitutes legal advice or guarantees compliance. Do not deploy until evidence justifies it.
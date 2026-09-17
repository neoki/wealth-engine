# EU Data Act Access Proof Test — validation v1

Status: manual-validation

## Signal
Article 3(1) access-by-design obligations now apply to connected products and related services placed on the EU market after 12 September 2026. This is an engineering obligation, not merely a policy/checklist problem: relevant product/service data and necessary metadata must be easily and securely accessible by default, free of charge, in a comprehensive, structured, commonly used, machine-readable format and, where relevant and technically feasible, directly accessible.

## Competition is validation, not a kill signal
The category is already real. Data Act Kit, Dativo, Data Act Software and Steelbridge offer infrastructure/APIs/portals for connected-product data sharing; Data Act Checker offers a free readiness assessment. This validates both demand and the fact that a generic checker or another data-sharing platform would be a weak entry wedge.

We should not abandon because competitors exist. We should test the gap between what a product says it supports and what a user can actually retrieve.

## Wedge: Access Proof Test
A fixed-scope black-box/grey-box acceptance test of one connected product's real user-data access path.

Instead of asking whether the company has a Data Act policy, create a synthetic/test user and attempt the journey a real user or nominated third party would perform.

### Inputs
- one product/service test account or sandbox;
- product telemetry/data dictionary if available;
- documented user-access/export/API path;
- optional sample of backend event/schema names;
- no production credentials or personal data required for the default test.

### Test protocol
1. Generate a small known synthetic interaction sequence with the product.
2. Record what data the product demonstrably generates/retains during the sequence.
3. Execute the documented user access route without privileged internal shortcuts.
4. Reconcile observed/generated fields against returned fields.
5. Check whether necessary metadata to interpret timestamps, units, identifiers and relationships is present.
6. Test format machine-readability and structural consistency.
7. Measure elapsed time, manual intervention, authentication friction and any fees/support dependency.
8. Where an API/stream is offered, test whether access behaves continuously/near-real-time as claimed; do not assert that real-time is legally mandatory in every case.
9. Optionally simulate a nominated third-party access request as a separate module.
10. Return evidence and remediation; flag legal/scope questions as UNKNOWN / COUNSEL REVIEW rather than deciding them.

### Deliverable
A concise evidence pack:
- `OBSERVED DATA -> EXPOSED DATA` reconciliation matrix;
- `PASS / PARTIAL / NOT OBSERVED / NEEDS SCOPE REVIEW` per test dimension;
- missing/ambiguous metadata list;
- access-friction timeline;
- reproducible test steps;
- engineering remediation queue with owner/priority;
- retest checklist.

This is technical acceptance testing, not legal advice, certification or a guarantee of Data Act compliance.

## Why this wedge may survive competition
Existing products mostly help implement the sharing layer. A manufacturer can still need independent acceptance evidence that its own implementation, vendor portal or API actually exposes the intended data end-to-end. That makes infrastructure vendors potential channels rather than only competitors: a proof test can verify implementations built with Data Act Kit/Dativo/etc.

The product is therefore analogous to QA for regulatory product behavior, not another compliance dashboard.

## Buyer hypotheses
Primary:
- connected-product manufacturers launching/releasing EU product lines after 12 Sep 2026;
- IoT/industrial software integrators implementing the access layer;
- legal/compliance consultancies that need technical evidence rather than another questionnaire.

Potential channel:
- Data Act infrastructure/API vendors wanting an independent or white-label acceptance test for customer implementations.

## Pricing hypotheses
Do not publish or charge automatically.
- one product/access path: EUR 490;
- product + API/stream + third-party sharing path: EUR 990;
- consultancy/integrator reusable white-label protocol + first supervised execution: EUR 2,500–5,000.

Competition suggests implementation budgets are larger than a low-hundreds checklist; the test should be priced as technical QA while remaining much smaller than a full implementation project.

## Validation gate
PASS only if:
- >=3 relevant buyers/integrators acknowledge that implemented access still needs end-to-end acceptance testing; and
- >=1 provides a sandbox/test product or explicit willingness to pay; and
- the test uncovers at least one concrete discrepancy not obvious from documentation/checklists.

Strong PASS if:
- an integrator/compliance partner can repeat it across >=5 client implementations; or
- one infrastructure vendor sees value in bundling/white-labelling the protocol.

RESHAPE if buyers want this only as an implementation sign-off module. That is potentially a stronger channel product, not failure.

KILL if 5 relevant implementations already have equivalent automated reconciliation/acceptance tests and buyers see no independent value.

## Automation potential after evidence
If repeated tests reveal stable patterns, automate only the repetitive layer:
`fixture generator -> access/API runner -> schema/metadata reconciliation -> evidence report`.

Do not build the platform before real test environments prove that this workflow catches valuable defects.

## Public deployment rule
No public web is required now. If validation earns a public experiment, use `data-access-test.rockrai.com` and prefer `rockrai-experiment-factory` on Railway. Do not buy domains, paid services, advertising, change critical DNS or perform financial/irreversible actions without Pablo's explicit approval.

## Sources checked 2026-09-17
Primary/current regulatory signal:
- European Commission / Data Act information and Regulation (EU) 2023/2854.
- DLA Piper, 11 Sep 2026 summary of the access-by-design deadline and technical implications.

Market evidence:
- https://dataactkit.eu/ — managed API/data-sharing layer and free assessment.
- https://www.dataactchecker.com/ — free readiness checker.
- https://www.dativo.dev/ — operational Data Act platform.
- https://dataactsoftware.com/ — data request/access/API platform.
- https://www.steelbridge.fi/ — managed compliance infrastructure.

Observed market implication: there is already competition at both free-checker and implementation-platform layers. The experiment deliberately targets acceptance evidence between them.
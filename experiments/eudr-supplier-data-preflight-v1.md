# EUDR Supplier-Data Preflight — experiment v1

Date: 2026-09-17
Status: manual experiment; public-evidence stage. No software build before buyer validation.

## Opportunity

EUDR software is already a competitive category. That is evidence of spend, not a reason to abandon the market. The weak position would be to build another generic compliance dashboard.

The narrower operational failure to test is **input readiness**: an importer may own EUDR software and still be unable to file because supplier/product/plot data is incomplete, inconsistent or structurally unusable.

A second, now-current failure mode is **scope drift**: Annex I itself changes. A compliance team may have already mapped thousands of SKUs against an older Annex and now need to determine which records can leave the 2026 programme, which remain, which require a narrower CN interpretation, and which newly added products need a 2027 onboarding plan.

## Promise

**“Before you migrate suppliers into an EUDR platform or prepare a DDS, send us a representative supplier-data sample. We return exactly what is usable, what will block the workflow, what changed in scope and what to ask each supplier to fix.”**

This is data-quality/change-impact preflight work, not legal advice, certification, satellite verification or filing on the customer's behalf.

## Why now

- European Commission guidance states EUDR applies from 30 December 2026 to large and medium enterprises, and from 30 June 2027 to most micro/small enterprises; micro/small businesses already covered by EUTR retain the earlier date.
- On 17 September 2026, Delegated Regulation (EU) 2026/2102 was published, replacing Annex I. The Commission's current guidance explicitly notes that newly added products — including soluble coffee, certain palm-oil derivatives and frozen cattle tongues — become subject from 30 December 2027.
- The recast also removes or narrows categories including cattle hides/leather, several vulcanised-rubber lines, soya for sowing and some seat classifications. That creates an immediate portfolio-reconciliation job for organisations that already scoped against the previous Annex.
- Current products demonstrate active willingness to pay: low-end EUDR software exists around €29–49/month, specialist workspaces around €149/month, timber-specific services around €200/month or €50/shipment, while public consultancy estimates are orders of magnitude higher.
- Existing products explicitly advertise supplier/plot collection, geodata checks and repair. That validates the job while making a generic SaaS clone unattractive.

## Buyer

Primary initial buyer:
- medium/large EU importer/operator of coffee, cocoa, rubber, palm oil, soy, cattle or wood-derived Annex I goods;
- has already begun EUDR preparation or selected a platform;
- has multiple suppliers and a spreadsheet/CSV/document corpus that must become filing-ready data.

Especially attractive now:
- organisations that already completed SKU scope mapping before the September 2026 Annex I recast;
- portfolios containing leather, rubber, soy, wooden seats, soluble coffee or palm-derived oleochemicals, where the new Annex can change inclusion status or timing.

Potential channel:
- EUDR consultant, customs/compliance adviser or implementation partner that repeatedly receives dirty supplier datasets or must recut client scope after Annex changes.

Avoid initially:
- businesses that do not know basic CN/HS classifications and therefore require predominantly legal/customs classification work;
- tiny downstream traders with mainly record-keeping obligations;
- customers asking us to certify deforestation-free status.

## Manual preflight v1

Input: a **representative, non-sensitive or suitably redacted sample** of supplier/product/plot records. Do not request credentials to TRACES or other production systems.

Checks:
1. inventory rows/files and identify missing expected fields;
2. normalize supplier/product identifiers and detect duplicates/conflicts;
3. validate coordinate/polygon syntax and basic geometry integrity where supplied;
4. identify records that cannot be joined supplier → product → plot/shipment;
5. flag missing provenance/evidence references without judging their legal sufficiency;
6. separate deterministic data defects from questions requiring an EUDR specialist;
7. produce a supplier-by-supplier repair queue and reusable request template;
8. estimate % READY / REPAIRABLE / BLOCKED and manual hours avoided;
9. when a previous scope mapping is supplied, reconcile each SKU against the current Annex and return a deterministic delta queue: `UNCHANGED / REMOVED_OR_NARROWED / NEW_2027 / CLASSIFICATION_REVIEW`;
10. quantify avoidable work: suppliers/plots/evidence collection that can be paused because a line left scope, and newly added lines that should enter the 2027 readiness backlog.

Never infer legal scope from product marketing names alone. CN/HS ambiguity, `ex` entries, feedstock-dependent wording or uncertain product composition must route to `CLASSIFICATION_REVIEW` rather than a compliance conclusion.

Deliverable: one spreadsheet/CSV-quality report + concise remediation/change-impact memo. No compliance badge.

## Economic hypotheses

Test rather than publish as facts:
- €290: representative dataset preflight / <=10 suppliers;
- €690: larger portfolio + supplier repair queue;
- €1,500+: partner batch / reusable white-label workflow.

The important metric is not report count. It is **supplier/SKU records made migration-ready or correctly removed from unnecessary work per expert hour**.

## Competitive interpretation

Competition is positive market evidence. Products such as EUDR Vault, Clearlane, Silvatrace and EUDRReady already automate broad EUDR workflows at roughly tens to hundreds of euros per month. Do not compete feature-for-feature.

Our wedge survives only if buyers have a meaningful dirty-data or change-impact problem *before or around* those platforms. If platforms ingest, repair and re-scope the buyer's real supplier/SKU data effortlessly, this experiment should fail or become a channel/service for those platforms rather than another SaaS.

The September 2026 Annex change gives us a particularly clean test: can we take an existing SKU mapping and reduce human review to the ambiguous delta instead of forcing a consultant to re-read the whole portfolio?

## PASS gate

At least one:
- 3 relevant buyers say supplier-data readiness or Annex-change reconciliation is a current problem + 1 provides a representative sample for preflight;
- 1 consultant/implementation partner wants to reuse the workflow across >=5 clients;
- 1 paid pilot.

And the preflight must find either:
- >=10% of sampled records with non-trivial deterministic repair/blocking/scope-delta issues; or
- >=2 hours of credible expert/manual work avoided per portfolio.

## Strong PASS

One partner with >=5 client portfolios **and** repeated defect/scope-delta patterns that can be automated safely.

For Annex reconciliation specifically, a strong technical signal is that >=70% of a real previously-scoped portfolio can be routed deterministically to `UNCHANGED` or an unambiguous delta state, leaving the specialist to inspect only the remainder.

## FAIL / pivot

- Real datasets arrive clean enough that preflight adds little value;
- incumbent EUDR platforms already repair/re-scope the same records with negligible friction/cost;
- Annex changes affect too few SKUs per buyer to create material saved work;
- most value requires legal judgment, satellite analysis or regulated representation rather than deterministic data QA.

If buyer pain exists but is commodity-specific, narrow to one vertical (e.g. timber, coffee/cocoa) instead of abandoning solely because competitors exist.

## Build gate

No public web or SaaS before PASS. If PASS later requires a public acquisition/upload surface, candidate is `eudr-preflight.rockrai.com` inside `rockrai-experiment-factory` where possible. Never upload customer production datasets to a public experiment by default.

No domain purchase, paid service, paid advertising, critical DNS change, financial action or irreversible action without Pablo's explicit approval.
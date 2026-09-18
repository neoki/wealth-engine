# Accounting Close Exception Router — falsification

Date: 2026-09-18
Status: **RETAIN / ROTATE (not promoted)**

## Thesis tested
Accounting firms repeatedly receive incomplete client inputs. Instead of another document-chasing portal, map each missing/invalid external input to the downstream work it blocks, deadline exposure and economic/capacity impact, then rank the smallest next action that unlocks the most production.

## What the market already covers
- Document collection is heavily commoditizing. BilagPilot groups missing evidence by client/period/deadline and tracks next actions; Reqora, Quire, ComplyChase and others automate recurring requests/reminders and missing-vs-received status.
- Practice-management products already represent the *other half* of the graph. Financial Cents supports task dependencies, capacity, deadlines, utilization and billable-hour/profitability views. Jetpack Workflow supports task dependencies, cascading deadlines, priorities, future workload and overdue work. Senta supports explicit task dependencies and due/start offsets.
- Therefore neither `missing input`, `workflow dependency`, `deadline`, nor `capacity/profitability` is a defensible product by itself.

## Gap found
In the products sampled, I did **not** find a native automatic join from a specific external exception (e.g. missing bank statement / rejected payroll input / missing VAT evidence) to *all downstream jobs blocked by that exception*, with a cross-client queue ranked by deadline + revenue/margin + staff capacity + unlock value.

That gap is plausible but dangerous: it may be only an integration/reporting feature between document collection and practice management rather than a standalone company.

## Independent workflow evidence
The same dependency pattern exists in at least three recurring accounting workflows:
1. monthly bookkeeping / month-end close — missing statements/invoices block reconciliation, review and reporting;
2. payroll — missing employee/payroll inputs block payroll processing and downstream submissions;
3. VAT/tax/year-end — missing evidence blocks preparation, review and filing.
Document-chasing vendors explicitly target these workflows, while practice-management vendors explicitly model their recurring tasks/dependencies/deadlines.

This passes the **workflow repetition** threshold, but not yet the buyer/pilot threshold.

## Economic hypothesis
The value is not `save reminder emails`; it is reducing idle/fragmented production and manager triage. Candidate score should depend on measurable `blocked paid work-hours unlocked`, `deadline risk avoided`, and `WIP aging reduced`, not number of reminders sent.

## Cheapest decisive experiment
Do **not** build a web app. Take one anonymized 2–4 week exception log from a real accounting/advisory operation and reconstruct:
`exception -> client -> service/job -> blocked tasks -> due date -> estimated work/revenue -> next action`.
Compare the router's top-10 daily ranking against the manager's actual priorities. Success requires materially better prioritization or fewer blocked hours, not merely a nicer dashboard.

A credible sample path exists through an accounting/advisory operation already accessible to Pablo, but autonomous runs cannot obtain/use that internal dataset or contact staff in Pablo's name. Under engine governance this is **buyer/sample blocked**, so rotate rather than spending more cycles or building.

## Decision
**Retain as a high-value signal; do not promote and do not reject. Rotate to candidate #2.**

Promotion gate: an anonymized real sample demonstrating repeated exception-to-blocked-work mappings plus evidence that ranking by unlock/economic impact changes daily action ordering. If that gate passes, test as a thin integration/decision layer before considering a standalone SaaS.

## Lateral connections
- This is structurally the same graph as CAE work-blocking exceptions and supplier-evidence propagation: `external evidence/exception -> dependent production objects -> economic/deadline impact -> smallest unlocking action`.
- Possible broader primitive: **Constraint-to-Production Graph**, but do not generalize until two verticals independently validate willingness to pay.

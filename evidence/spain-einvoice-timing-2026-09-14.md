# Spain B2B e-invoice timing signal — corrected 2026-09-17

## Verified regulatory state
Royal Decree 238/2026, published 31 March 2026 and in force since 20 April 2026, establishes the operating framework for mandatory B2B electronic invoicing in Spain.

The important timing fact is narrower than some secondary sources imply: **the statutory adoption clock starts when the implementing ministerial order enters into force**. Under the Royal Decree, obligations become applicable 12 months later for businesses/professionals above €8M turnover and 24 months later for the rest.

As of 17 September 2026, the implementing ministerial order has not been verified as published in the BOE. Therefore Wealth Engine must not present 1 October 2027 / 1 October 2028, or any other calendar dates derived from an expected order date, as legally fixed deadlines.

## Why this improves the experiment
The uncertainty is itself useful. Advisory firms managing hundreds or thousands of clients need two different capabilities:

1. **Portfolio readiness now** — determine which client workflows, invoice issuers, platforms and software stacks will require adaptation, without pretending the final deadline has already been triggered.
2. **Trigger-to-portfolio impact later** — when the ministerial order is actually published, recalculate every client's deadline and priority from one verified regulatory event rather than manually updating spreadsheets, circulars and client lists.

This turns the existing `spain-einvoice-readiness` experiment from a static compliance checklist into a potential portfolio operating tool for advisory/accounting firms.

## Target buyer
Spanish advisory/accounting firms managing many heterogeneous client invoicing stacks, especially firms using combinations of SAGE, A3, Holded, Excel/manual workflows and client-specific invoicing applications.

## Smallest valuable workflow
Input: client/entity list with turnover band, legal/person type, whether it issues B2B invoices, invoice-issuing software, accounting-only software, current e-invoice channel/platform and known exceptions.

Output today:
- `IN_SCOPE_LIKELY / OUT_OF_SCOPE_OR_EXCEPTION / NEEDS_REVIEW`
- current-stack gap
- turnover-based statutory phase (`T+12m` or `T+24m`, not an invented calendar date)
- evidence/missing-data field
- recommended preparation priority

Output after a verified ministerial-order trigger:
- exact applicable date calculated from the published order
- changed clients only
- migration/remediation queue
- evidence link to the triggering BOE publication

## Economic hypothesis
A portfolio-level impact map is more valuable to an advisory firm than another generic explainer because one regulatory change can be propagated across hundreds of clients. The monetizable unit may therefore be the **managed client portfolio**, not a €79 single-company diagnostic.

Keep the €79 one-time readiness offer as a purchase-intent probe, but test whether advisory firms prefer a portfolio pilot or white-label output. Do not build a full SaaS until repeated portfolio demand exists.

## Strong PASS
Any one of:
- an advisory/accounting firm provides an anonymized portfolio of >=50 clients for classification;
- a firm states it currently maintains the transition manually and would pay for portfolio reconciliation;
- a software/integration partner wants a repeatable white-label readiness map across >=5 advisory-firm customers.

## Kill / reshape gate
Kill the standalone diagnostic if incumbent ERP/accounting vendors make client-level classification effectively free and advisory firms do not value cross-vendor portfolio reconciliation. Do **not** treat vendor competition itself as a kill signal; test whether heterogeneity across vendors creates the wedge.

## Source discipline
Primary source for legal timing: BOE, Real Decreto 238/2026, de 25 de marzo (BOE-A-2026-7295), especially the phased applicability provisions. Secondary sources may be used for market interpretation but not to convert a proposed or expected ministerial-order date into a legal deadline.

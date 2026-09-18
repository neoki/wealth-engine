# Supplier Evidence Change Propagator

Status: rejected as standalone horizontal product (2026-09-18)

## Thesis tested
Supplier certificates/declarations/specifications change or expire; automatically propagate that change to affected components, SKUs, packaging, declarations/claims and customers, using PPWR as a forcing function rather than the product boundary.

## Falsification result
The workflow is real, but the proposed differentiator is already becoming an incumbent feature rather than a clean standalone gap.

Direct evidence:
- PAQR maps components, supplier documentation and declarations and says connected customers receive the latest version when a component changes.
- PPWR Connect models shared components reused across SKUs, provenance, supplier evidence, versions and expiry/status.
- Dcycle explicitly models one supplier declaration covering many packaging units.
- Emissa's RoHS/product-compliance model connects supplier evidence to components/products/requirements and explicitly exposes affected products when supplier/component/material/regulatory inputs change.
- PackR8 states that changing a supplier certificate updates downstream declarations, EPR filings and recyclability reports.
- General certificate tools (Evidash, Verivoo) already automate expiry tracking and supplier renewal workflows.

Conclusion: competition validates the pain, but here it also occupies the exact propagation primitive. Building a PPWR-specific graph would likely become a feature race against systems that already own the product/supplier/compliance data model.

## Retained lateral signal
Cross-system evidence propagation may still be interesting where the dependency graph spans systems incumbents do not own: supplier/QMS evidence -> ERP/PIM -> public claims/website -> customer commitments/contracts -> sales collateral. Do not promote this abstraction until a buyer demonstrates that cross-system propagation is materially painful and not solved by their PLM/QMS/PIM/compliance stack.

## Decision
Reject standalone candidate. No build, deployment, outreach or spend. Rotate to Professional Services Scope-Leak Ledger.

## Sources checked 2026-09-18
- https://paqr.com/
- https://ppwrconnect.com/features
- https://www.dcycle.io/novedades/link-suppliers-packaging-units-ppwr/
- https://www.emissa.tech/product-compliance/rohs
- https://landing.packr8.com/product/
- https://www.evidash.com/product/expiry-tracking
- https://www.verivoo.app/

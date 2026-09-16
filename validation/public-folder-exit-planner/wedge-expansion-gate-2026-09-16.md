# PF Planner — wedge expansion gate (2026-09-16)

Status: **KEEP PF WEDGE; DESIGN FOR EXCHANGE EXIT EXPANSION. DO NOT BUILD EXPANSION YET.**

## New evidence

The market evidence now shows that Public Folder handling is repeatedly sold as one component of a larger Exchange exit/decommission engagement rather than an isolated migration task:

- Pro IT NW explicitly scopes hybrid Exchange decommissioning around final mailbox migration, Public Folder migration/retirement, HCW removal, recipient-management transition, DNS cleanup and server decommission. Published labor ranges: $15k–$35k for hybrid decom and $25k–$60k for full EXO migration + decom (100–500 seats).
- Inspizer sells Exchange-to-Exchange Online migration, legacy Exchange decommissioning and Public Folder assessment/migration/decommissioning in the same practice.
- Network Squad describes final Public Folder and shared-mailbox migrations as issues that catch customers out during Exchange decommissioning.
- MSAdvance includes Public Folders as an optional workload in Exchange Server → Microsoft 365 migrations.
- ExchangeSavvy charges $3,500 for Public Folder migration planning alone and supports multiple modernization destinations.
- Priasoft provides the inventory layer for free, reinforcing that our moat should not be scanning.

## Strategic interpretation

PF Planner should remain the narrow validation wedge because it is concrete, testable and already implemented. But the product architecture and commercial language should avoid trapping us in a tiny single-workload category.

Potential product ladder if buyer validation succeeds:

1. **PF Planner** — Public Folder pre-flight/scoping accelerator.
2. **Exchange Exit Planner** — identify blockers to retiring Exchange: remaining mailboxes, Public Folders, SMTP/app dependencies, hybrid/HCW state, recipient management, connectors/certificates, DNS/Autodiscover and validation requirements.
3. **Exchange Exit OS / partner workflow** — repeatable white-label assessment → scope → quote → validation workflow for MSPs.

The larger opportunity is not necessarily migration execution. It may be automating the expensive discovery/scoping layer that allows an MSP to quote fixed-fee decommissioning work safely.

## Important anti-overreach rule

Do **not** add Exchange-wide collectors, tenant credentials, DNS changes, execution automation or a public website before PF buyer validation. Expansion is an option value, not permission to increase scope.

## Validation gate remains unchanged

Before deployment or expansion require:
- >=3 independent MSP/consultancy signals that the artifact materially reduces senior engineering/pre-sales work; and
- >=1 willingness-to-pilot / paid test / use on a real anonymized opportunity.

During those conversations add one discovery question: **“Is Public Folder scoping painful enough by itself, or is the valuable unit the whole Exchange decommission assessment?”**

That answer determines whether PF Planner remains standalone or becomes the first module of Exchange Exit Planner.

## Sources checked 2026-09-16

- https://www.proitnw.com/services/microsoft-365-migration/exchange-hybrid-decommission/
- https://www.proitnw.com/blog/exchange-esu-expired-april-2026-what-now/
- https://www.inspizer.com/exchange-server.html
- https://www.networksquad.co.uk/microsoft-exchange-online/
- https://msadvance.com/en/services/exchange-server-to-microsoft-365-migration/
- https://exchangesavvy.com/public-folder-migrator/
- https://exchangesavvy.com/public-folder-connector/
- https://www.priasoft.com/category/public-folders/

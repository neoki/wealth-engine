# Public Folder Exit Planner — prospect evidence set (2026-09-16)

## Gate result
**PASS TO OUTREACH VALIDATION, not yet PASS TO PUBLIC WEB.**

The channel hypothesis is now supported by enough independent market evidence to justify testing the report with real MSP/migration buyers. This is not evidence of willingness-to-pay yet.

## What changed
The prior gate required 20–50 plausible partner/channel signals and >=8 strong prospects before investing in a public Rockrai site. Fresh research shows a broad commercial ecosystem around Exchange/M365 migration, public-folder planning, migration tooling and decommission work. Competition is treated as spend/channel evidence, not as an automatic kill signal.

## Evidence set
Score uses the existing 0–10 partner rubric where enough public information exists. `benchmark` means useful market evidence but not an initial reseller/outreach target.

| # | Organisation / signal | Geography | Evidence relevant to PF Planner | Score / role |
|---|---|---|---|---|
| 1 | MSAdvance | Spain / international | Exchange Server→M365 service includes assessment/analysis and, when applicable, Public Folders. | 9/10 prospect |
| 2 | FuturaSP | Spain | M365 migration/support provider already identified in prior channel research. | 7/10 prospect |
| 3 | ITCM Solutions | Spain | M365 administration/migrations provider already identified in prior channel research. | 7/10 prospect |
| 4 | EJK Consultancy | UK | Explicit migration assessment covers Public Folder usage and application dependencies; says skipping discovery causes migration pain. | 9/10 prospect |
| 5 | Inspizer | UK | Migrates PFs to EXO, SharePoint or Teams; explicitly assesses usage patterns before recommending destination. Near-perfect fit with vendor-neutral planning wedge. | 9/10 prospect |
| 6 | Inventive HQ | US/international | Managed M365 migration advertises PF migration, BitTitan/AvePoint tooling and reconciliation reports. | 8/10 prospect |
| 7 | EPC Group | US | Exchange migration consultancy; discovery inventories Public Folders/configurations and planning produces roadmap. Large/enterprise profile. | 8/10 prospect |
| 8 | Pro IT NW | US | Sells Exchange discovery separately ($5k–$10k) and larger migration/decommission projects ($25k–$60k for 100–500 seats); PF handling sits inside delivery. | 9/10 prospect |
| 9 | Essential Computing | UK | Public Folder/archive migration service includes scope assessment and planning before migration. | 8/10 prospect |
| 10 | IT Partner LLC / O365HQ | EU | Productized on-prem Public Folder migration service; states method depends on hierarchy size, data, bandwidth and timeframe. | 7/10 prospect |
| 11 | Medha Cloud | US/international | Public Folder migration sold as a specialist service; public pricing includes $500 per PF hierarchy. | 7/10 prospect |
| 12 | ProActive / COWI case | Denmark | MSP executed a 20 TB / 32M-email PF modernization using MigrationWiz after first-party tooling did not fit scale. Strong proof that route selection matters. | benchmark / channel signal |
| 13 | ExchangeSavvy | US | Dedicated PF analyzer/migrator/connector; $3,500 one-time planning consulting plus $95/10GB migration licensing. | competitor benchmark |
| 14 | Priasoft | US/global | Free analyzer plus PF migration tooling/services; validates inventory demand while making generic scanning a weak wedge. | competitor benchmark |
| 15 | BitTitan MigrationWiz | global MSP channel | Explicitly markets PF migration as an MSP revenue add-on; supports PF→PF/shared mailbox but not all modern destinations. | ecosystem benchmark |
| 16 | SysTools | global | Commercial O365 PF migrator with CSV mapping, permission migration, validation and delta migration. | competitor benchmark |
| 17 | OnePlace Solutions | global | Explicit PF→SharePoint modernization proposition, demonstrating non-Exchange destination demand. | destination benchmark |
| 18 | Microsoft CSS-Exchange | global | Microsoft maintains multiple PF inventory, permission, validation and migration scripts; supports customer-supplied-export architecture. | ecosystem evidence |
| 19 | Microsoft migration guidance | global | Microsoft recommends inventory/cleanup and notes native migration constraints; validates pre-flight planning need. | ecosystem evidence |
| 20 | ExchangeSavvy Connector | US/global | Supports PF→Shared Mailbox, SharePoint, M365 Groups/Teams, file shares and PST, proving heterogeneous destination selection is commercial. | competitor benchmark |
| 21 | MigrationWiz current guide | global | PF endpoints should be configured early and destination support differs by route; supports execution-profile comparison. | ecosystem evidence |
| 22 | Exchange ESU/decommission market | US/EU | 2026 consulting market sells discovery separately from implementation, creating an economic place for faster assessment/scoping. | market signal |

### Strong prospect threshold
At least **9 named service providers score >=7/10** in this evidence set (MSAdvance, FuturaSP, ITCM, EJK, Inspizer, Inventive HQ, EPC Group, Pro IT NW, Essential Computing, IT Partner and Medha Cloud; conservative count exceeds the required 8).

This clears the *prospect availability* gate. It does **not** clear the willingness-to-pay gate.

## Economic interpretation
Two public price anchors are especially useful:

- ExchangeSavvy: **$3,500** one-time consulting fee for migration planning, alongside migration software priced at **$95 per 10 GB**.
- Pro IT NW: **$5k–$10k** standalone Exchange discovery and **$25k–$60k** full EXO migration + hybrid decommission for 100–500 seats.

A cheaper automated assessment does not need to replace those engagements. The more plausible MSP value proposition is to reduce unpaid/pre-sales engineering and make fixed-fee migration scopes safer and faster.

## Important negative evidence
- Free assessments are common. Therefore `we make an assessment` is not enough.
- Priasoft already gives away a PF analyzer. Therefore inventory collection itself is not the product.
- Strong consultancies such as Inspizer already reason about usage→destination manually. This is simultaneously competition and evidence for the exact workflow we want to automate.
- The CSV can reveal technical usage patterns but cannot infer every business dependency. The report must continue to expose missing evidence and specialist-review items.

## Sharpened offer to test
**White-label Public Folder Modernization Pre-flight for MSPs**

Input: existing PowerShell/tool CSV exports. No tenant credentials required.

Output: client-ready draft containing:
1. workload/destination recommendations with evidence gaps,
2. migration blockers and specialist-review queue,
3. Microsoft-native vs MigrationWiz execution-risk comparison,
4. migration waves,
5. scope-ready decision brief the MSP can review/brand before presenting.

Promise to test: **turn a raw PF inventory into a reviewable migration-scoping draft in minutes, without replacing the engineer who signs it off.**

## Next gate
Do not build `pfplanner.rockrai.com` yet. First create a compact sample pack (realistic CSV + generated report + one-page partner explanation) and use it for direct validation against the strongest named MSP profiles. Success condition: evidence from >=3 independent prospects that the artifact saves meaningful scoping/pre-sales time, with >=1 concrete willingness-to-pilot/pay/introduce it into a live opportunity.

If outreach cannot be executed with already-authorized tools, stop at a ready-to-send prospect pack rather than inventing traction.

## Sources checked 2026-09-16
- https://msadvance.com/en/services/exchange-server-to-microsoft-365-migration/
- https://www.ejkconsultancy.co.uk/services/exchange-to-microsoft-365-migration
- https://www.inspizer.com/exchange-server.html
- https://inventivehq.com/services/microsoft-365-migration
- https://www.epcgroup.net/exchange/migration
- https://www.proitnw.com/blog/exchange-esu-expired-april-2026-what-now/
- https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/513638860022228
- https://o365hq.com/eu/service/on-premises-public-folders-migration
- https://medhacloud.com/professional-services/migrations/exchange-server-to-microsoft-365-migration
- https://exchangesavvy.com/public-folder-migrator/
- https://exchangesavvy.com/public-folder-connector/
- https://www.priasoft.com/
- https://www.bittitan.com/migrationwiz/public-folder-migrations/
- https://help.bittitan.com/hc/en-us/articles/360019233334-Public-Folder-from-Microsoft-365-to-Microsoft-365-Migration-Guide
- https://www.systoolsgroup.com/office365-express-migrator/public-folder/
- https://www.oneplacesolutions.com/public-folder-migration.html
- https://microsoft.github.io/CSS-Exchange/PublicFolders/
- https://techcommunity.microsoft.com/t5/exchange-team-blog/best-practices-for-public-folder-preparation-before-migrations/ba-p/1909222

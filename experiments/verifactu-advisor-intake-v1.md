# VeriFactu advisor diagnostic — intake v1

Purpose: make the Spain VeriFactu Readiness experiment executable **manually** before any SaaS is built. An advisor can complete this once per client archetype or concrete anonymized workflow. The output is a red/amber/green decision pack, not tax advice.

## 1. Entity / obligation context

- Entity type: company / autónomo / other
- Main tax regime(s):
- Is the entity in SII or another potentially excluded/special invoicing regime? unknown / yes / no
- Does the entity actually issue invoices for the workflow being reviewed? yes / no / mixed
- Target deadline currently assumed: 2027-01-01 / 2027-07-01 / needs specialist review
- Reason for that assumption:

**Stop condition:** if applicability cannot be determined from supplied evidence, mark `AMBER — applicability evidence missing`; do not invent a compliance conclusion.

## 2. Map the real invoicing workflow

For each distinct workflow, capture:

| Field | Answer |
|---|---|
| Who creates the invoice? | |
| Which software/system creates it? | |
| Exact product + version | |
| Is that system issuing the invoice or only accounting/bookkeeping it? | |
| Is there another upstream POS/ERP/vertical app? | |
| Are invoices edited after creation? How? | |
| Are invoices created manually outside the system? | |
| Is billing delegated to advisor/third party? | |
| Approx. invoices/month | |
| B2C / B2B / mixed | |
| Any integrations/export-import steps | |

The issuing-vs-accounting distinction is mandatory. AEAT INFORMA 149526 (June 2026) states that an advisor that only performs accounting, invoice-register bookkeeping and tax filings is not thereby using a billing SIF for those activities.

## 3. Vendor evidence pack

Request evidence; do not accept `our vendor says it is compliant` as sufficient.

- product/version identification
- vendor/product URL
- current declaration responsible for the exact product/version, if applicable
- declaration date/version and evidence URL/file
- vendor statement of supported mode: VERI*FACTU / non-VERI*FACTU / both
- upgrade required? version / date / contractual dependency
- QR / invoice-output behaviour documented
- record generation / integrity / traceability behaviour documented
- AEAT submission path documented if using VERI*FACTU
- known integration or API dependencies
- test environment / validation procedure available
- vendor support contact and unresolved questions

AEAT publishes examples of the declaration responsible and technical SIF/VERI*FACTU material. Treat the declaration as evidence to inspect, not as a substitute for mapping the client's actual workflow.

## 4. Hidden-workflow checks

Explicitly ask whether any invoices originate in:

- Excel / Word / PDF templates
- POS / till
- sector-specific software
- ecommerce
- CRM
- recurring billing platform
- mobile app
- custom software
- marketplace
- advisor's own system
- legacy ERP instance

A client with a compliant accounting package can still have an unreviewed issuing workflow elsewhere.

## 5. RAG decision output

For every workflow produce:

### GREEN
Applicability reasonably established + issuing system identified + version-specific vendor evidence available + required operating path understood + no unresolved material workflow gap.

### AMBER
Potentially viable, but evidence is incomplete: unknown exact version, missing declaration/evidence, unclear issuing system, upgrade dependency, integration uncertainty, or specialist tax interpretation needed.

### RED
Known issuing workflow appears to depend on a system/version/process that is not ready for the applicable requirement/date, or vendor evidence explicitly says migration/replacement is required.

Never turn `unknown` into GREEN.

## 6. Advisor portfolio view

After 5+ client workflows, aggregate by **archetype**, not client name:

| Archetype | Clients approx. | Issuing stack | Deadline class | RAG | Common missing evidence | Repeatable remediation |
|---|---:|---|---|---|---|---|

This is the high-leverage commercial hypothesis: one advisor engagement should reveal repeatable clusters across dozens/hundreds of clients rather than selling isolated SME audits.

## 7. Validation metrics

Record after each advisor review:

- minutes advisor normally spends determining readiness
- minutes with this intake + generated decision pack
- wrong assumption prevented? yes/no + what
- missing vendor evidence surfaced? yes/no + what
- reusable across other clients? none / some / many
- would advisor provide another anonymized workflow? yes/no
- would advisor pay for: per-client diagnostic / portfolio triage / neither
- price reaction, unaided first; only then test ranges

### Buyer gate
Do not productize until >=3 independent advisors validate utility and >=1 supplies a real anonymized workflow/pilot or explicit willingness to pay.

## Current source anchors (verified 2026-09-16)

- AEAT SIF / VERI*FACTU hub: https://sede.agenciatributaria.gob.es/Sede/iva.html
- AEAT INFORMA June 2026, item 149526: advisor doing accounting/bookkeeping only is not thereby subject to RRSIF for a billing SIF.
- AEAT INFORMA May 2026, item 149486: sanctions tied to lack of certification can apply from the relevant 1 Jan / 1 Jul 2027 dates.
- AEAT declaration-responsible examples: https://sede.agenciatributaria.gob.es/static_files/Sede/Tema/IVA/Verifactu/EjemplosDeclaracionResponsable%28V0.5.1%29.pdf

## Infrastructure rule

Manual validation only. No public web is required. If buyer evidence later justifies one, use a descriptive `*.rockrai.com` subdomain and Rockrai experiment-factory infrastructure where possible. No domain purchase, paid service, paid advertising, critical DNS change, financial action or irreversible action without Pablo's explicit approval.

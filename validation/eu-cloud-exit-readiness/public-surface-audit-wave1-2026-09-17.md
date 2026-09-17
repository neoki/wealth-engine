# EU Cloud Exit Readiness — public surface audit, wave 1

Date: 2026-09-17
Status: evidence-building; no outreach, spend, deployment, DNS or irreversible action.

## Question
Can public documentation reveal enough exit-readiness friction or inconsistency to make a low-friction `Cloud Exit Surface Audit -> executed Cloud Exit Drill` funnel plausible?

## Method
Desk audit of public terms/help/compliance pages. This is not a legal-compliance verdict. `NOT FOUND` means only that the reviewed public surface did not expose the item clearly.

## Observations

| Provider | Public exit surface | Observation | Signal |
|---|---|---|---|
| Pipedrive | Dedicated EU Data Act FAQ | Strong surface: exportable data incl. metadata, machine-readable export, assistance, timing, erasure and no switching charge are described explicitly. | GREEN / benchmark |
| Manychat | Dedicated Data Act addendum | Explicit notice, transition and CSV/JSON export. Useful benchmark for what a buyer can understand before contacting support. | GREEN / benchmark |
| Axelion | Dedicated Data Act information | Very explicit switching, retrieval and erasure timing, including backups. | GREEN / benchmark |
| TimeChimp | Dedicated portability/switching terms | Defines exportable/excluded data, formats, restrictions and division of migration responsibility. | GREEN / benchmark |
| Exoscale | Dedicated portability page | Claims self-service export and standard formats/protocols across services. | GREEN-ish; execution still unverified |
| Holded | Cancellation + export help | Cancellation warning says deletion removes access and recommends exporting section-by-section to Excel; separate documentation shows some exports have exclusions (e.g. A3 export excludes manual/imported entries). Public homepage says no lock-in. This is exactly the kind of case where a real exit drill can test whether the practical export matches the customer's mental model of “all my data”. | AMBER / strong drill candidate |
| Teamleader Focus | EULA termination clause | Public EULA says user gets an opportunity to export account data for a period Teamleader considers reasonable, max 30 days, and places responsibility on user. In the reviewed public surface no dedicated Data Act switching procedure, exportable-data catalogue, formats or metadata treatment was found. | AMBER / surface gap; verify before any claim |
| Dropbox | Dedicated Data Act help | Explicitly maps switching to product tools/HTTP endpoints and warns to port data before deletion. | GREEN / benchmark |
| Uptimeify | DPA | Explicit CSV/JSON/API export plus retrieval and erasure periods. | GREEN / benchmark |
| OmniOps | Terms | Explicit switching period, assistance, no standard export charge and a concrete exportable-data list including embeddings/config/analytics. | GREEN / benchmark |

## What changed
The first wave does **not** support a thesis that most SaaS vendors have obvious public Data Act failures. In fact, mature providers increasingly publish strong exit documentation. That is useful falsification.

But it supports a narrower and better wedge: **public wording is insufficient to prove operational exitability**. Even apparently strong providers still require execution to answer: do exports complete, are files/attachments/metadata/config included, can another system consume them, how long does a realistic tenant take, and does deletion/retention behave as documented?

The strongest public lead in this wave is Holded: its marketing says “no lock-in”, while operational help tells customers to export important information from each section before deletion and at least one destination-specific export documents exclusions. This is not evidence of non-compliance; it is evidence that “can I actually leave cleanly?” is richer than a terms checklist.

## Decision
Do **not** build a generic Data Act compliance checker. Competition and strong provider documentation commoditise that layer.

Evolve the product to an **Exit Rehearsal / Portability QA**:
1. capture provider promises and export inventory;
2. execute export in a non-production/test tenant;
3. reconcile expected vs received objects/attachments/metadata/config;
4. measure elapsed time and manual steps;
5. test importability into a neutral representation or named destination where feasible;
6. produce an evidence pack + defects/remediation list;
7. optionally retest.

Buyer hypothesis broadens slightly: SaaS vendor Product/Engineering/Legal can use it before customers discover defects; enterprise procurement/IT can use it on critical SaaS; consultancies/MSPs can repeat it across portfolios.

## Next autonomous test
Build a provider-agnostic exit-rehearsal protocol and scoring rubric from the public evidence, without requiring credentials. Then stop this line at `buyer-blocked`: the next meaningful evidence requires a consenting test tenant/provider/customer, not more web research.

## Public evidence consulted
- Pipedrive EU Data Act FAQ: https://www.pipedrive.com/en/legal/eu-data-act
- Manychat Data Act Addendum: https://manychat.com/legal/eu-data-act
- Axelion Data Act information: https://axelion.ai/data-act/
- TimeChimp data portability & switching: https://terms.timechimp.com/en/data-portability-and-switching
- Exoscale data portability: https://www.exoscale.com/data-portability/
- Holded subscription/cancellation: https://help.holded.com/en/articles/6939258-your-holded-subscription
- Holded A3 export: https://help.holded.com/en/articles/6907973-holded-s-export-to-a3
- Teamleader Focus EULA: https://www.teamleader.eu/legal/eula-teamleader-focus
- Dropbox EU Data Act information: https://help.dropbox.com/security/eu-data-act-information
- Uptimeify DPA: https://uptimeify.io/dpa
- OmniOps terms: https://www.omniops.co.uk/terms

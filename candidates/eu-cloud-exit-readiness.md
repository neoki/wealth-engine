# EU Cloud Exit Readiness — candidate

Status: candidate / manual-validation first
Added: 2026-09-17

## Signal
The EU Data Act is already applicable and imposes concrete switching obligations on providers of data processing services. Article 25 requires contractual switching rights; Article 26 requires information about switching/porting procedures plus an up-to-date online register of data structures/formats; Article 30 requires open interfaces for many non-IaaS services and export of exportable data in a structured, commonly used, machine-readable format where no common specification/harmonised standard exists.

A second forcing function is close: Article 29 prohibits switching charges from **12 January 2027**. Until then reduced switching charges cannot exceed costs directly linked to switching. Data egress charges are explicitly within the definition of switching charges.

Primary source: https://eur-lex.europa.eu/eli/reg/2023/2854/oj (Articles 25–31, especially 26, 29 and 30).

## Buyer/problem hypothesis
Small and mid-sized EU SaaS/cloud/data-processing providers may have updated privacy/legal pages for the Data Act without having tested whether a customer can actually leave.

The operational failure is cross-functional: contract language, cancellation flow, export completeness, metadata, formats, API/interface documentation, retention/deletion, support procedure and fees can disagree.

## Wedge
**Cloud Exit Drill** — a fixed-scope evidence-based rehearsal, not generic Data Act consulting.

Simulate one representative customer saying: “I am leaving; give me everything I need to move.” Then trace the real workflow from request to export/deletion.

Manual deliverable:
1. contract/terms switching-clause check;
2. switching request → owner → acknowledgement → transition map;
3. exportable-data + metadata inventory;
4. actual export/API/interface test using a test tenant where available;
5. format and documentation gap list;
6. fee/egress/support-charge classification;
7. retrieval + deletion timeline;
8. evidence pack and P0/P1/P2 remediation list.

Never request production secrets or customer personal data for the validation experiment. A sandbox/test tenant or provider-supplied evidence is sufficient.

## Why not another checker
Generic Data Act checklists already exist. The differentiated unit is an **executed exit rehearsal** that can reveal contradictions between legal promises and technical reality.

## Pricing hypotheses
- EUR 490: one standard SaaS service / one exit path.
- EUR 990: multi-service or materially complex export/API path.
- EUR 2,500+: white-label partner pack + first supervised drill for MSP/compliance/cloud consultancies.

These are hypotheses only; do not publish checkout or take payment automatically.

## Validation gate
PASS only with:
- >=3 qualified SaaS/cloud providers or relevant consultancies confirming that customer exit is not already routinely rehearsed; and
- >=1 willing to run a real test-tenant drill or expressing explicit willingness to pay; and
- the drill exposes >=1 concrete contractual/technical/operational mismatch OR saves >=2 professional hours versus their current review.

Strong PASS: one consultancy/MSP has >=5 provider clients for whom the same drill could be repeated.

KILL/NARROW if providers can demonstrate a routine, evidenced exit test that already covers contract, export, metadata, interfaces, fees and deletion, or if buyers treat the issue as legal-only and will not pay for technical/operational verification.

## Portfolio relation
This is adjacent to Data Access-by-Design Gap Test but targets **providers of data processing services** and customer switching rather than connected-product manufacturers and product-generated data. Keep them separate until buyer evidence suggests a common engine.

## Public experiment rule
Do not build a web property yet. If the buyer gate passes, propose `cloud-exit.rockrai.com` and prefer deployment through `rockrai-experiment-factory` on Railway. No DNS, paid service, billing, domain purchase or irreversible infrastructure action without Pablo's explicit approval.

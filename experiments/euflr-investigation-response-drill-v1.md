# EUFLR Investigation Response Drill — experiment v1

Status: DISCOVERY / MANUAL-FIRST
Date: 2026-09-17

## Signal

Regulation (EU) 2024/3015 applies from 14 December 2027 and prohibits products made with forced labour from being placed/made available on, or exported from, the EU market. It applies across product sectors and company sizes.

The Commission's 2026 implementation guidance makes the enforcement workflow concrete. In the preliminary phase, an economic operator requested to provide information generally has 30 working days to respond. If a formal investigation is opened, the authority sets a further information deadline of 30–60 working days. The Forced Labour Single Portal and preparedness package launched on 30 June 2026.

This creates an operational question that generic compliance questionnaires do not answer:

> If an authority asked tomorrow about one specific product, could the company assemble a coherent, evidence-backed response across procurement, legal, sustainability, ERP and suppliers within the statutory window?

## Competition is validation, not a kill signal

There is already substantial software competition: Certivo, IntegrityNext, Prewave, TrusTrace, ERWAY and others map supply chains, collect supplier evidence and support forced-labour due diligence. A free EUFLR readiness tool also exists.

Therefore DO NOT build another generic EUFLR questionnaire, risk dashboard or supplier-attestation SaaS.

Competition validates budget and urgency. The wedge is execution testing: measure whether the organisation can actually answer an authority request for a selected real product using the systems and evidence it has today.

## Offer

**EUFLR 30-Day Response Drill**

A facilitated tabletop/data-retrieval exercise around one representative product/SKU.

Inputs:
- product/SKU and BOM or supplier map available today;
- supplier and production-site records available today;
- existing due-diligence policies, questionnaires, audits and remediation evidence;
- relevant ERP/procurement/document repositories;
- named internal owners.

Never request unnecessary worker personal data or sensitive allegations. Synthetic/redacted evidence can be used for the first drill.

### Scenario

At T0 the company receives a simulated preliminary-phase authority request concerning the selected product.

The drill asks the team to locate and assemble, rather than merely claim it possesses:
- product identification and scope;
- manufacturer/producer/supplier chain and production sites where known;
- relevant forced-labour due-diligence actions;
- risk identification and assessment evidence;
- prevention/mitigation/remediation actions and outcomes;
- supplier responses/audits and provenance;
- decision owners and chronology;
- explicit unknowns and evidence gaps.

## Deliverable

1. **Response readiness scorecard** — retrieval completeness, evidence provenance, ownership, consistency and elapsed time.
2. **Evidence index** — requested item → source → owner → freshness → status.
3. **Contradiction log** — e.g. supplier identity differs between ERP, questionnaire and audit.
4. **Unknowns register** — unknown is never silently converted to compliant/low risk.
5. **30-working-day action plan** — requests and remediation ordered by dependency and lead time.
6. **Retest pack** — same scenario can be rerun after remediation.

Verdicts: `READY / REPAIRABLE / BLOCKED`.

This is operational readiness testing, not legal advice, certification, or a determination that forced labour is or is not present.

## Why this wedge may survive existing software

Software can store evidence while the organisation still fails the drill because:
- the product-to-supplier relationship is incomplete;
- Tier-N provenance is missing;
- evidence lives in incompatible repositories;
- supplier records conflict;
- no one owns the response;
- evidence cannot be tied to the exact product under assessment;
- remediation claims lack dated proof;
- retrieval takes longer than expected.

If incumbent platforms already make the drill trivial for their customers, that is useful evidence: sell the drill to non-platform users, partner with implementers, or kill the wedge.

## Buyer hypotheses

Primary:
- EU importers/manufacturers with complex or high-risk supply chains;
- procurement/sustainability teams that already collect supplier evidence but have never rehearsed an authority request.

Distribution:
- ESG/supply-chain consultancies;
- compliance software implementers;
- trade/customs advisory firms.

A partner with >=5 affected clients is more valuable than five isolated direct buyers.

## Pricing hypotheses — do not publish or charge without approval

Test willingness-to-pay conversationally:
- €490: one product, remote drill, evidence-gap report;
- €990: one product + cross-functional facilitated drill + retest;
- €2,500–5,000: white-label partner kit + first supervised executions.

These are hypotheses, not current offers.

## Validation gate

PASS only if all are observed:
1. >=3 relevant buyers/partners acknowledge that assembling a product-specific response across systems is materially difficult;
2. >=1 agrees to run the drill on a real or representative product, or expresses explicit willingness to pay;
3. the drill discovers >=1 non-trivial operational gap not already obvious from a generic questionnaire;
4. remediation can be expressed as concrete actions rather than open-ended consulting.

STRONG PASS if a consultancy/platform implementer can repeat it across >=5 client environments, or if repeated drills reveal automatable evidence-reconciliation patterns.

KILL/PIVOT if:
- existing systems produce a complete product-specific response package with negligible effort;
- buyers perceive no value in rehearsal before an actual request;
- the work inevitably becomes bespoke legal investigation rather than repeatable operational QA.

## Automation path after evidence

Do not build before PASS.

If repeated gaps are machine-detectable, automate only the repeated layer: evidence inventory, product↔supplier reconciliation, freshness checks, contradiction detection and response-pack assembly.

Potential public experiment only after validation:
`forced-labour-drill.rockrai.com`

Prefer deployment through `rockrai-experiment-factory` on Railway. No domain purchase, paid service, critical DNS change, billing or ads without Pablo's explicit approval.

## Sources

- European Commission, Forced Labour Regulation preparedness / Single Portal: https://single-market-economy.ec.europa.eu/single-market/goods/forced-labour-regulation_en
- EUR-Lex, Regulation (EU) 2024/3015, Article 17 and Article 18: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R3015
- Commission Notice C/2026/4637, Guidelines on application of Regulation (EU) 2024/3015: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52026XC04637

## Next evidence action

Do not research another 30 vendors. Find one importer/manufacturer or one consultancy willing to run the drill against a representative SKU. The next valuable datum is retrieval performance under the scenario, not more desk research.

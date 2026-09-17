# CRA 24h Reporting Drill — validation v4

Status: RESHAPE — validate regulatory-collision acceptance test, not CRA filing software

## Decision update — 2026-09-17 (live-SRP correction)

The ENISA Single Reporting Platform is now operational, so the experiment can be constrained by the real workflow rather than pre-launch assumptions.

Verified operational facts:
- CRA Article 14 manufacturer reporting obligations have applied since 11 September 2026.
- ENISA's SRP is the mandatory single submission route for actively exploited vulnerabilities and severe incidents affecting products with digital elements.
- The CRA sequence is 24h early warning, 72h notification and a later final report whose deadline depends on the event path.
- The SRP deliberately routes one CRA submission to the appropriate authorities; do **not** model CRA itself as multiple Member-State filings.
- ENISA says voluntary reporting will arrive in a later platform phase.
- Current market documentation reports no SRP reporting API at this stage. Therefore do not promise automatic regulator filing or build an SRP integration unless ENISA later publishes a supported API.
- CRA reporting can apply to legacy products already placed on the EU market; the opportunity is not limited to products launched after the broader December 2027 CRA application date.

This changes the product boundary in a useful way: the valuable layer is **before and around the official portal**, not replacing it.

## New wedge to validate: EU Regulatory Collision Acceptance Test

A single real security event can create several independent reporting duties. CRA, NIS2, GDPR and—where relevant—DORA do not collapse into one filing. They can have different triggers, recipients, clocks and evidence requirements.

The test is:

> **If one incident triggers multiple EU regimes at once, can the organisation reach consistent decisions and assemble every filing package before each clock expires?**

Default synthetic scenario:
- an actively exploited vulnerability exists in a connected product, including an optional legacy product;
- exploitation causes a material service incident;
- customer personal data may have been accessed;
- optionally, a regulated financial customer/service is affected.

The drill starts from one awareness event and builds:

`event fact -> possible trigger -> regime -> clock anchor -> deadline -> recipient -> owner -> required facts -> filing package -> submission status -> evidence`

Outputs:
1. canonical incident fact sheet shared across regimes;
2. applicability/UNKNOWN matrix (no invented legal conclusions);
3. parallel clock map for CRA / NIS2 / GDPR / optional DORA;
4. owner + backup owner for each decision and filing;
5. contradiction test across timestamps, affected products/users, severity and remediation statements;
6. evidence/access gaps, including SRP readiness;
7. portal-ready CRA information package, but **no automated filing**;
8. 60-minute tabletop log;
9. remediation queue;
10. one-page collision-readiness evidence sheet.

This is operational readiness/acceptance testing, not legal advice, certification, incident-response outsourcing or regulatory filing.

## Why this wedge may survive commoditisation

The low-end CRA-only workflow is already commoditised by free/cheap drills and dedicated compliance products. ENISA itself now supplies the official submission surface. Building another CRA portal is therefore strategically weak.

The remaining failure surface is organisational: product security, IT/security, privacy/legal and possibly regulated-business teams may disagree on awareness time, scope, severity, affected users or remediation while separate statutory clocks run.

Our potential position is **independent acceptance testing of the organisation's existing incident stack**, including commercial GRC/CRA products. Competition is positive evidence of demand; we only reject a wedge when competitors eliminate the specific differentiated workflow or economics.

## Buyer expansion from legacy-product reporting

Do not restrict prospecting to companies actively preparing new products for December 2027. Include manufacturers/software vendors with older supported products already on the EU market, especially where:
- product ownership changed hands;
- incident response is centralised but product evidence is fragmented;
- legacy dependencies/SBOMs are incomplete;
- support teams, security teams and legal teams use different systems;
- an MSP/MSSP or product-security consultancy serves many such manufacturers.

This may be a better channel than generic direct outreach because one adviser can repeat the acceptance test across a portfolio.

## Pricing hypothesis

Do not publish or charge automatically.

- direct collision acceptance test: test EUR 790 / 1,490 / 2,500 depending on regimes and teams;
- consultancy/MSP/MSSP/DPO channel: EUR 2,500–5,000 white-label protocol + first supervised delivery, then determine economics from actual demand.

If buyers only value generated deadlines or templates, kill this: ENISA guidance and cheap software will win.

## Gate

PASS only if >=3 relevant organisations/advisers confirm that the *same incident* can require coordination across >=2 reporting regimes and at least one has not rehearsed the combined workflow.

Strong PASS if:
- one consultancy/MSP/MSSP/DPO/security firm can repeat the test across >=5 clients; OR
- one organisation agrees to run a synthetic collision across >=2 real internal teams; OR
- a test exposes a concrete contradiction/missed obligation that a single-regime process did not catch.

RESHAPE toward white-label independent QA if buyers already use multi-framework GRC but have never tested it end-to-end.

KILL if five qualified buyers already have rehearsed cross-regime workflows and see no value in independent testing, or if the only valued output is deadline calculation/template generation.

## Competition already discovered

CRA-only/adjacent: cradrill.com, CRA-Portal.eu, Tensetti, CRAnotify, REGU, Seentrix, CRA Ready, cramio, CRA Evidence and others. Multi-framework engines include ReportAct and Venvera. Their existence validates spend and urgency but means our wedge must remain independent QA rather than another compliance dashboard.

## Public deployment rule

No public web is required for manual validation. If the experiment earns a public surface, use `incident-collision.rockrai.com` and prefer `rockrai-experiment-factory` on Railway. Do not buy a domain, paid service, advertising, alter critical DNS or perform financial/irreversible actions without Pablo's explicit approval.

## Sources checked — 2026-09-17

Primary:
- https://digital-strategy.ec.europa.eu/en/policies/cra-reporting
- https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp
- https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp/frequently-asked-questions
- https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched

Operational/market evidence (not legal authority):
- https://crareport.eu/guides/enisa-single-reporting-platform/
- https://craevidence.com/cra-compliance/vulnerability-reporting
- https://www.hlc.com/en/publications/eu-cyber-resilience-act-vulnerability-and-incident-reporting-obligations-now-apply
- https://www.cramio.eu/
- https://www.cra-ready.io/
- https://cradrill.com/
- https://cra-portal.eu/cra-incident-response/
- https://tools.tensetti.io/cra
- https://cranotify.eu/
- https://reguproof.com/
- https://seentrix.com/
- https://reportact.com/
- https://venvera.com/frameworks/cra

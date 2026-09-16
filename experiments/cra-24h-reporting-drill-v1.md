# CRA 24h Reporting Drill — validation v2

Status: manual-validation

## Why now

CRA Article 14 reporting obligations became applicable to manufacturers on 11 September 2026. The operational problem is immediate: an actively exploited vulnerability or severe product-security incident can start a 24h / 72h reporting clock before a manufacturer has decided who owns triage, who records awareness, who can file, or what evidence must be preserved.

This experiment is deliberately narrower than generic CRA compliance.

Important nuance: do **not** sell this primarily through fine avoidance. European Commission guidance notes that microenterprises and small enterprises may not be fined for failures to meet the 24h reporting deadline. The stronger value proposition is operational readiness, customer/partner confidence, reduced incident chaos, evidence of a tested process, and a low-cost entry point into a much larger CRA readiness programme.

## Buyer hypothesis

Primary targets:
- EU software vendors distributing installable software/apps;
- IoT / connected-device manufacturers;
- hardware vendors whose products contain software;
- security/compliance consultancies serving those manufacturers, as a potentially higher-leverage channel.

Avoid pure browser-only SaaS until scope is confirmed. Do not imply that every software company is in CRA scope.

## Market/economic evidence — checked 2026-09-17

Fresh public pricing suggests the original EUR 149–299 anchor was probably underpriced rather than validated:
- cyberresilienceact.ai advertises a self-service CRA Exposure Check at GBP 99, then GBP 199/299 follow-on report/plan products;
- Vigilon Cyber advertises CRA readiness assessments from USD 4,000;
- Regulus advertises CRA software at EUR 2,500/year Basic and EUR 15,000/year Pro;
- iso-easy advertises full-service CRA programmes from EUR 7,500 to EUR 24,900 and explicitly includes the ENISA 24h/72h/14-day reporting process;
- UK G-Cloud public pricing includes CRA advisory/cyber-risk work around GBP 1,200.

Interpretation: competition is evidence of spend. The drill should not try to replace a EUR 4k–25k compliance engagement. It can be the fast, concrete diagnostic at the front of that market, or a repeatable white-label component inside consultancies.

## Offer to validate

**CRA 24h Reporting Drill**

A 45–60 minute tabletop exercise plus a tailored incident-reporting runbook and observed-failure report.

Manual deliverable:
1. Scope sanity-check and explicit UNKNOWN items requiring legal/specialist review.
2. Named reporting owner + backup owner.
3. Definition of the internal `awareness timestamp` and where it is recorded.
4. Intake path for vulnerability reports / product-security incidents.
5. Decision tree: potentially reportable / clearly not reportable / escalate for specialist review.
6. 24-hour early-warning checklist.
7. 72-hour notification checklist.
8. Final-report checklist and evidence retention list.
9. SRP access/readiness checklist (including EU Login / assigned representative readiness where relevant).
10. One tabletop scenario with timestamps, handoffs and missed-step log.
11. Remediation list: owner, priority, due date.
12. One-page readiness evidence sheet suitable for management/customer/compliance files, clearly describing what was tested and what remains unresolved.

This is operational readiness support, not legal advice, certification, incident-response outsourcing or a guarantee of compliance.

## Drill scenario

Default scenario: a customer reports credible evidence that a vulnerability in a currently supported product is being actively exploited.

Start clock at T+00:00 when the organisation's chosen awareness threshold is met.

Test whether the team can answer without improvisation:
- What product/version is affected?
- Who decides whether the event meets CRA reporting criteria?
- Who has authority and access to submit through the CRA Single Reporting Platform?
- What can be stated confidently at T+24h?
- Which facts must be collected by T+72h?
- Who owns corrective action and user/customer communications?
- Where is the evidence retained?

Record every unknown, delay, missing credential/access path and ownership ambiguity. Those failures are the primary output of the drill.

## Pricing hypotheses

Validation anchors only. Test willingness to pay rather than assuming the cheapest anchor wins:
- direct manufacturer: test EUR 490 as default anchor, with EUR 290 and EUR 790 as price-sensitivity alternatives;
- consultancy/MSP: test EUR 1,500–3,000 for a white-label reusable kit + facilitator guide + first supervised delivery, then per-client/licence economics only if demanded.

Rationale: a EUR 149 offer sits too close to automated/self-service CRA diagnostics despite requiring synchronous expert facilitation. Public market evidence shows much larger budgets for broader CRA assessments. We should capture some of the value of a tested operational workflow without pretending this is a full compliance engagement.

Do not publish pricing, create checkout, buy services or take payment automatically.

## Validation script

Ask 5 manufacturers or consultancies:
1. Who owns CRA Article 14 reporting today?
2. If an actively exploited vulnerability were confirmed at 10:00 tomorrow, could you identify the decision-maker and submit the early warning within 24 hours?
3. Have you tested that workflow end-to-end since the SRP became operational?
4. What would most likely delay you: scope/triage, internal ownership, facts, SRP access, approvals, or customer communications?
5. Would you run a 45–60 minute tabletop drill that leaves a tailored runbook, observed-failure report and evidence sheet?
6. Price sensitivity: EUR 290 / 490 / 790 — at which point does this become trivial, acceptable, painful or impossible?
7. Have you already bought, budgeted or been quoted a broader CRA assessment? Approximate range is enough.
8. For consultancies: would you prefer a white-label drill kit you can repeat with customers, and how many relevant customers do you have?

Do not lead with fines or fear. Validate operational friction and existing CRA spend.

## Gate

PASS only with:
- >=3 independent buyers acknowledging a real reporting-readiness gap, and
- >=1 buyer willing to run the drill on a real product/workflow OR explicit willingness to pay, and
- at least one concrete operational failure uncovered (ownership, awareness timestamp, SRP access, escalation, evidence collection, or deadline workflow).

Strong PASS if at least one consultancy identifies >=5 customer accounts to which it could resell/repeat the drill.

RESHAPE if manufacturers see the problem but only buy through an existing security/compliance partner. This is potentially positive channel evidence, not failure.

KILL if 5 relevant buyers already have tested incident-reporting workflows and see no value in an external drill.

## Expansion only after validation

Possible path, not roadmap:

CRA 24h Reporting Drill -> recurring reporting-readiness review -> broader CRA operational evidence workflow.

A second possible path is channel-first:

manual drill -> white-label consultancy kit -> repeatable partner workflow.

Do not build broad CRA compliance SaaS. Existing tools already cover scope checks, SBOM, documentation and general readiness, with public prices from low hundreds to five figures.

## Public deployment rule

No public web is required for manual validation. If this earns a public experiment later, use a descriptive subdomain such as `cra-drill.rockrai.com` and prefer `rockrai-experiment-factory` on Railway. Do not buy a domain, paid service, advertising, alter critical DNS or perform financial/irreversible actions without Pablo's explicit approval.

## Primary and market sources checked — 2026-09-17

Primary:
- European Commission, CRA reporting obligations: https://digital-strategy.ec.europa.eu/en/policies/cra-reporting
- European Commission, CRA summary: https://digital-strategy.ec.europa.eu/en/policies/cra-summary
- ENISA, Single Reporting Platform: https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp

Public market evidence (pricing is vendor-claimed, not independently audited):
- https://cyberresilienceact.ai/
- https://www.vigiloncyber.com/packages
- https://goregulus.com/
- https://iso-easy.de/full-service/

Verified regulatory facts used in this experiment:
- manufacturer Article 14 reporting applies from 11 September 2026;
- mandatory notifications are submitted through the CRA Single Reporting Platform;
- early warning: within 24 hours of awareness;
- full notification: within 72 hours;
- final report: no later than 14 days after a corrective measure is available for an actively exploited vulnerability, or within one month from the 72-hour notification for a severe incident;
- the SRP became operational on 11 September 2026;
- Commission CRA summary states that microenterprises and small enterprises may not be fined for failures to meet the 24h deadline.

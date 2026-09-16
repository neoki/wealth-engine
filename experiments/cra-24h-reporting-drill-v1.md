# CRA 24h Reporting Drill — validation v1

Status: manual-validation

## Why now

CRA Article 14 reporting obligations became applicable to manufacturers on 11 September 2026. The operational problem is immediate: an actively exploited vulnerability or severe product-security incident can start a 24h / 72h reporting clock before a small manufacturer has decided who owns triage, who records awareness, who can file, or what evidence must be preserved.

This experiment is deliberately narrower than generic CRA compliance.

## Buyer hypothesis

Primary targets:
- small EU software vendors distributing installable software/apps;
- IoT / connected-device manufacturers;
- small hardware vendors whose products contain software;
- security/MSP consultancies serving those manufacturers, as a possible channel.

Avoid pure browser-only SaaS until scope is confirmed. Do not imply that every software company is in CRA scope.

## Offer to validate

**CRA 24h Reporting Drill**

A 45–60 minute tabletop exercise plus a tailored incident-reporting runbook.

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

Validation anchors only:
- direct manufacturer drill: EUR 149–299 one-off;
- consultancy/MSP white-label reusable version: EUR 750–1,500 setup plus per-client delivery hypothesis.

Do not publish pricing, create checkout, buy services or take payment automatically.

## Validation script

Ask 5 manufacturers or consultancies:
1. Who owns CRA Article 14 reporting today?
2. If an actively exploited vulnerability were confirmed at 10:00 tomorrow, could you identify the decision-maker and submit the early warning within 24 hours?
3. Have you tested that workflow end-to-end since the SRP became operational?
4. What would most likely delay you: scope/triage, internal ownership, facts, SRP access, approvals, or customer communications?
5. Would you run a 45–60 minute tabletop drill that leaves a tailored runbook and gap list?
6. Would EUR 149–299 be trivial, acceptable, painful or impossible for that outcome?
7. For consultancies: would you prefer a white-label drill kit you can repeat with customers?

Do not lead with fines or fear. Validate operational friction.

## Gate

PASS only with:
- >=3 independent buyers acknowledging a real reporting-readiness gap, and
- >=1 buyer willing to run the drill on a real product/workflow OR explicit willingness to pay, and
- at least one concrete operational failure uncovered (ownership, awareness timestamp, SRP access, escalation, evidence collection, or deadline workflow).

RESHAPE if manufacturers see the problem but only buy through an existing security/MSP partner.

KILL if 5 relevant buyers already have tested incident-reporting workflows and see no value in an external drill.

## Expansion only after validation

Possible path, not roadmap:

CRA 24h Reporting Drill -> recurring reporting-readiness review -> broader CRA operational evidence workflow.

Do not build broad CRA compliance SaaS. Existing tools already cover scope checks, SBOM, documentation and general readiness.

## Public deployment rule

No public web is required for manual validation. If this earns a public experiment later, use a descriptive subdomain such as `cra-drill.rockrai.com` and prefer `rockrai-experiment-factory` on Railway. Do not buy a domain, paid service, advertising, alter critical DNS or perform financial/irreversible actions without Pablo's explicit approval.

## Primary sources checked — 2026-09-16

- European Commission, CRA reporting obligations: https://digital-strategy.ec.europa.eu/en/policies/cra-reporting
- ENISA, Single Reporting Platform launch (11 September 2026): https://www.enisa.europa.eu/news/the-cra-single-reporting-platform-is-launched
- ENISA, SRP FAQ (updated 12 September 2026): https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp/frequently-asked-questions

Verified facts used in this experiment:
- manufacturer Article 14 reporting applies from 11 September 2026;
- mandatory notifications are submitted through the CRA Single Reporting Platform;
- early warning: within 24 hours of awareness;
- full notification: within 72 hours;
- final report: no later than 14 days after a corrective measure is available for an actively exploited vulnerability, or within one month from the 72-hour notification for a severe incident;
- the SRP became operational on 11 September 2026.

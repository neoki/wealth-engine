# Cognitive Accessibility Employment Preflight — v1

Status: evidence-first / no-build
Date: 2026-09-17
Public web candidate only after gate: `cognitive-access.rockrai.com`

## Why now

Spain published Real Decreto 707/2026 on 3 September 2026. It enters into force on 2 January 2027. Article 14 creates concrete employment-related cognitive-accessibility duties when a worker has certified intellectual disability >=33%, plus requirements around recruitment accessibility and specific parameters for timekeeping/authentication systems.

This is unusually operational: it is not just a policy/document problem. Article 14.4 says timekeeping and corporate e-office authentication systems must support access without requiring password recall, allow the person to choose the access alternative best suited to cognitive capabilities, establish double-verification systems for sending information, and provide remote assistance plus indication/follow-up of steps performed.

## Competition signal

Spain already has mature accessibility-cognition providers (e.g. AMÁS Fácil, Es+Fácil, Plena Inclusión services) offering Easy Read, plain language, document adaptation, validation, space evaluation, training and consulting. This validates a buyer category but makes generic accessibility consulting unattractive.

## Wedge

Do not sell generic cognitive-accessibility consulting.

Sell a narrow **Employment Systems Preflight** before 2 January 2027:

> Can an employee/candidate who triggers the regulation actually complete the key employment journeys using the company's current systems and materials?

Test a synthetic/user-approved journey across:

1. job advert and requirements;
2. candidate application/interview instructions;
3. onboarding instructions;
4. timekeeping/clock-in;
5. corporate authentication / employee portal;
6. mandatory training;
7. occupational-risk and emergency materials;
8. request for adaptation/support;
9. important task-change communication.

For each step record: system/document owner, required memory/load, alternative access path, language complexity, visual/audio support, assistance path, failure mode, remediation and evidence.

Output: `READY / REPAIRABLE / BLOCKED`, defect queue P0-P3, screenshots/evidence, owner and exact retest.

## Critical boundary

This is not legal certification and must not claim that passing the preflight proves compliance. Easy Read validation is a specialist discipline and often appropriately involves people with intellectual disabilities; do not pretend an LLM replaces that validation. The product finds operational gaps and routes specialist adaptation/validation where required.

## Why this may be valuable

The interesting defect class is cross-system: HR may own the policy, a payroll vendor owns clock-in, Microsoft/another IdP owns authentication, PRL owns emergency training and recruiting uses an ATS. Generic accessibility consulting can identify principles; the preflight turns them into a reproducible systems test with accountable remediation.

Potential buyers: Spanish employers with affected workers, labour/HR consultancies, occupational-risk providers, payroll/timekeeping integrators, accessibility specialists that want a technical preflight layer.

## Price hypotheses — validation only

- single employer / <=5 journeys: EUR 390
- full employment journey: EUR 790
- partner/white-label first implementation: EUR 1,500-3,000

Do not publish prices or charge until buyer evidence exists.

## Gate

PASS if >=3 relevant buyers acknowledge concrete uncertainty/gaps and >=1 agrees to run a real preflight or pay.

STRONG PASS if a labour/PRL/payroll/accessibility partner has >=5 client organisations and wants a repeatable test.

FAIL/PIVOT if buyers already receive equivalent journey-level technical testing from existing providers or obligations rarely produce actionable defects.

## Automation opportunity

If repeated defects appear, automate only the evidence collection/checking that is deterministic: language complexity flags, authentication-flow inventory, document coverage, required alternative-path checklist, screenshot/evidence pack and remediation tracking. Human/specialist validation remains explicit.

## Next evidence

Do not build a website yet. The next useful evidence is one real employer journey or one channel partner conversation. Further generic competitor research has diminishing value.

If gate passes, use `cognitive-access.rockrai.com` and preferably `rockrai-experiment-factory` on Railway. No domain purchase, paid service, ads, critical DNS change or irreversible action without Pablo's explicit approval.

## Primary evidence

- BOE, Real Decreto 707/2026, especially Article 14; published 2026-09-03, effective 2027-01-02.
- AccessibleEU announcement 2026-09-14.
- Existing specialist-provider evidence: AMÁS Fácil / Es+Fácil / Plena Inclusión cognitive-accessibility services.

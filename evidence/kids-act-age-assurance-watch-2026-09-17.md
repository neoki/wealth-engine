# EU KIDS Act — age-assurance regression-testing watch

Date: 2026-09-17
Status: WATCH, not experiment

## Fresh signal

On 17 September 2026 the European Commission adopted/proposed the EU KIDS Act package. The Commission describes an EU-wide minimum age of 15 for autonomous account creation on specified social-networking and video-sharing services, restrictions concerning children under 13, and a reversal of the burden of proof toward providers showing services are age-appropriate and safe by design.

Primary sources:
- https://digital-strategy.ec.europa.eu/en/news/eu-kids-act-restrict-social-media-platforms-access-children-eu
- https://digital-strategy.ec.europa.eu/en/library/proposal-eu-kids-act-eu-keeping-internet-digital-spaces-accountable-and-trustworthy

Important: this is a legislative proposal, not a current compliance deadline. Do not market it as an existing legal obligation.

## Exact-wedge collision check

Age-verification infrastructure is already crowded. Current products include QikChek, Tessio.Cloud, AgeEvidence, Private AV, VerifyAge/Go.cam, Nexiel Age, AgeCheck API, Xident and others. Several already provide privacy-preserving checks, signed evidence/audit tokens, jurisdiction routing or EUDI-wallet support. This is positive demand evidence but makes another age-verification API a poor Wealth Engine target.

Examples:
- https://qikchek.com/
- https://tessio.eu/
- https://ageevidence.com/
- https://www.claimkit.org/
- https://nexiel.eu/age

## Potential complement, not yet a candidate

**Age-Assurance Regression Test**: independent QA over the platform's existing age-assurance stack rather than another verifier.

Possible test matrix:
- fresh signup at boundary ages;
- logged-out vs logged-in access;
- direct deep links bypassing the intended gate;
- mobile web/app differences;
- account recovery and device-change paths;
- uncertain-estimate fallback;
- provider outage/fail-open behaviour;
- region/jurisdiction routing;
- parental/guardian flow where applicable;
- deletion/revocation and repeat-access behaviour;
- evidence that the production configuration matches the policy configuration.

Output would be reproducible evidence of `PASS / BYPASS / FAIL-OPEN / INCONSISTENT / UNTESTED`, with screenshots/request traces where legally and technically appropriate. It must not claim legal certification.

## Why it may become valuable

The economic hypothesis is not that age checks are expensive. They are becoming cheap commodities. The hypothesis is that a platform integrating one or several cheap providers can still have implementation defects around routing, fallback, account state and protected surfaces. A reusable adversarial acceptance suite could be sold to platforms, integrators or age-assurance vendors as independent QA.

## Gate before promotion

Do not create a web experiment yet. Promote from WATCH only if at least one of these becomes true:
1. final/advanced legislative text creates testable implementation requirements substantially resembling the current proposal;
2. evidence appears of recurring production bypass/fail-open defects despite an installed age-verification provider;
3. an integrator/provider confirms this QA consumes meaningful manual engineering/compliance time across >=5 customer deployments;
4. a repeatable test suite can cover >=70% of the relevant journey without collecting minors' personal data or identity documents.

If promoted, proposed public location: `age-assurance-test.rockrai.com`, preferably through `rockrai-experiment-factory` on Railway. No domain purchase is required.

## Decision

WATCH. The signal is strategically interesting but too early to justify another public experiment. Wealth Engine should preserve the option while avoiding proposal-driven product spam.

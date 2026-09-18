# EU App Payment Decision Model

Status: **CANDIDATE / one evidence cycle complete / ROTATE**
Date: 2026-09-18

## Signal
Apple's EU business terms change materially on 2026-10-01. The August 18, 2026 DPLA introduces unified EU terms: Apple IAP 26% standard / 15% reduced; alternative in-app processing 20% / 10%; actionable external link 15% / 10% with a 7-day attribution window; alternative marketplace or Web Distribution 5% Core Technology Commission. Developers may combine Apple IAP and alternative payments but must maintain their selected payment options for 12 months.

Primary sources:
- https://developer.apple.com/support/apps-in-the-eu/
- https://developer.apple.com/support/payment-options-on-the-app-store-in-the-eu/
- https://developer.apple.com/support/terms/apple-developer-program-license-agreement/

## Important correction to the original signal
The previous CTF/install-based decision model is becoming obsolete. Apple's own CTF estimator and related reports explicitly say they cease to apply to developers on the latest DPLA starting 2026-10-01. Any product based mainly on first-annual-install/CTF arithmetic would be stale at launch.

## Economic decision that remains
The new terms simplify headline fee arithmetic but do not eliminate the business decision. A developer choosing alternatives must model at least:
- Apple commission and reduced-rate eligibility;
- PSP fees;
- conversion-rate differences by checkout route;
- refunds, disputes, subscription management and customer-support cost shifted from Apple;
- tax collection/remittance responsibility for non-Apple processing;
- monthly alternative-transaction reporting to Apple;
- 7-day attribution for actionable link-outs;
- distribution eligibility/operational cost for Web Distribution or alternative marketplaces;
- 12-month payment-option lock-in.

This makes the useful object a **decision + realized-economics reconciler**, not a fee calculator.

## Competition interpretation
Headline fee calculators/guides are easy and increasingly commoditized. Apple itself publishes the rate matrix and the old CTF estimator. Search also shows third-party guides/calculators around the new rates. This validates information demand but removes a generic calculator wedge.

Potential differentiated buyer: studios, app publishers, fractional CFOs and agencies managing a portfolio of revenue-generating EU apps where route choice, realized conversion and operating burden must be compared repeatedly.

## Smallest falsifiable test
Do not build a public app yet. Create a spreadsheet/CSV decision schema from public terms and test it against 3 synthetic app profiles (small-business subscription, standard-rate subscription, high-volume multi-app publisher). Determine whether plausible conversion/support/PSP assumptions can reverse the ranking implied by headline Apple commission alone.

## Success gate
Promote only if evidence shows BOTH:
1. route choice changes materially under realistic non-Apple costs/conversion assumptions; and
2. a repeat portfolio workflow exists that is cumbersome enough to justify paid recurring analysis rather than a one-off spreadsheet.

## Kill gate
Reject if the decision is dominated by simple fee arithmetic, if Apple/PSP tooling already reconciles realized economics adequately, or if portfolio buyers do not revisit the decision often enough to support recurring value.

## Lateral connections
- Alternative-payment operations readiness: support/refund/dispute/tax/reporting acceptance test before enabling a route.
- Realized leakage reconciliation: Apple report vs PSP transactions vs attribution window vs refunds.
- Cross-platform mobile commerce economics: normalize Apple/Google/web economics for app portfolios rather than Apple-only calculation.

## Decision
**Keep as candidate, but rotate after this evidence cycle.** The October 1 transition is a genuine tailwind and the 12-month lock-in raises decision cost, but there is not yet buyer evidence. The next autonomous discovery cycle should move to Agent Permission Regression Harness rather than spend another cycle polishing this thesis.

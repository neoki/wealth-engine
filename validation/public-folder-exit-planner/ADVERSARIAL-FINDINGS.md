# Public Folder Exit Planner — adversarial gate

Status: **PASS / safety redesign implemented; commercial validation still required**

The original 24-case benchmark was too clean to justify a public experiment. A second benchmark tests mixed workloads and migration-risk conditions that occur in real estates: calendar+documents, contacts+mail, calendar+mail, application dependencies combined with holds/ACLs, high ACL complexity, BitTitan execution thresholds, and target item-size constraints.

## Unsafe assumptions found in the first implementation

1. Precedence rules silently collapsed mixed workloads into a single destination.
2. Compliance holds and complex ACLs lowered confidence but did not reliably force human review.

## Redesign now present in `classifier.mjs`

The classifier now separates three concerns:

- `destination`: likely modernization target;
- `workloads` / `requiresSplit`: whether heterogeneous content must be decomposed rather than forced into one target;
- `migrationSafety`: an independent `candidate` vs `review-required` decision driven by blockers and high-severity execution risks.

Compliance holds, complex permissions, workload splits and ambiguous destinations are explicit blockers. Vendor-specific MigrationWiz risks, Microsoft-native constraints and target constraints are represented independently rather than being smuggled into destination confidence.

Static re-evaluation against `adversarial-benchmark.mjs` shows the current decision logic satisfies all 15 benchmark expectations: mixed calendar/document, contact/mail and calendar/mail cases route to manual review; mail+documents routes to an explicit split; application dependencies can retain a destination recommendation while still requiring review; holds/complex ACLs force review; and the three execution-risk fixtures surface their expected risk codes.

This closes the **design safety gate**, not the market gate. Synthetic benchmark success is not evidence that an MSP will pay or that the classifier is safe on arbitrary real estates.

## Decision

**Do not create a public Rockrai experiment yet.** The next highest-value evidence is no longer another synthetic feature. It is a real, sanitized Exchange Public Folder inventory from an MSP/migration specialist and a comparison between:

1. their normal scoping time and findings;
2. PF Planner's generated triage/report;
3. false-safe recommendations, missed blockers, and minutes of expert work saved.

Commercial PASS remains: >=3 MSP/migration specialists confirm meaningful scoping/pre-sales time savings and >=1 provides a real pilot/payment/opportunity signal. Until then, no `pfplanner.rockrai.com` deployment.

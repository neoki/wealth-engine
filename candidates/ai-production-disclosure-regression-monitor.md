# AI Production Disclosure Regression Monitor

Status: **REJECTED AS HORIZONTAL PRODUCT** (2026-09-18)

## Hypothesis
A production/model/workflow change can make an existing AI disclosure, notice, policy statement, or customer representation stale or missing. Product would detect the regression before/after release and preserve evidence.

## Forcing function
EU AI Act Article 50 transparency duties apply from 2 Aug 2026 (with a limited transition for certain Art. 50(2) pre-existing systems). The underlying need is real: delivered AI interfaces/content must continue to expose the required transparency controls as products change.

## Falsification result
The proposed horizontal wedge is already directly occupied, not merely adjacent:

- TickAI scans websites, detects AI content/disclosures and continuously monitors as sites change.
- DisclosureProof checks delivered production pages from an external browser and sells recurring monitoring plus timestamped/hash evidence.
- DiscloseKit verifies and monitors production disclosure installations and retains hash-chained evidence.
- Systima Comply scans AI Act obligations in CI/CD, comments on PRs and performs baseline diffing between releases.
- art50-ci is an open-source release/regression test specifically for declared Article 50 disclosures and C2PA delivery evidence, with real-page checks and release-gate positioning.
- AIDisclose and similar products also provide ongoing disclosure verification/evidence.

This is unusually strong falsification: both outside-in production monitoring and inside-out CI/CD regression testing already exist, including an open-source tool framed almost exactly as the candidate.

## Decision
Do not build another horizontal Article 50 disclosure regression monitor. Competition validates the forcing function, but the proposed differentiation has collapsed.

## Retained lateral signal
**Representation-to-reality drift** may be broader than Article 50: detect when an operational change makes any externally relied-upon representation false/stale (customer promise, security/compliance statement, contractual capability, SLA, certification scope, privacy statement). This is only a signal, not a product. It becomes interesting only if the same manual reconciliation pain appears independently in multiple buyer workflows and existing GRC/contract/change-management tools do not already own it.

## Engine implication
Sweep-03 queue is exhausted. Rotate immediately to broad discovery rather than extending this idea. Preserve the recurring primitive observed across prior candidates: `change/exception -> dependent production or representation -> economic/regulatory consequence -> minimum corrective action`, but do not force new signals into that pattern.

## Sources checked
- European Commission AI Act Service Desk, Article 50.
- TickAI.
- DisclosureProof.
- DiscloseKit.
- Systima Comply (GitHub).
- art50-ci (GitHub / project site).
- AIDisclose.

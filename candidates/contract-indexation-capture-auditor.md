# Contract Indexation Capture Auditor

Date: 2026-09-18
Status: REJECTED as horizontal product
Origin: sweep-04

## Hypothesis
Recover missed contractual indexation by reconciling contract entitlement (CPI/index/escalation clause) against prices actually billed, initially as a service-first historical audit.

## Falsification result
The horizontal loop is already occupied, including the exact service-first wedge.

Strongest evidence found:
- Indexerly explicitly identifies indexation clauses, calculates missed adjustments against official indices, and markets recovery of escalation never applied.
- AllCaps audits customer invoices against governing contracts, including overlooked contractual price adjustments, and offers a no-integration historical 100-invoice proof audit before continuous monitoring.
- Levee reconciles contracts, usage, billing and GL and explicitly lists annual price escalation not applied as recoverable leakage.
- Revenue Hunter reconstructs expected commercial revenue vs billed/collected and includes missed price increases.
- LedgerUp positions missed contract escalations as under-billing/revenue leakage.

This is not merely adjacent CLM or reminder competition. It reproduces our proposed chain: contract entitlement -> actual billed price -> variance -> recoverable revenue, and AllCaps already uses essentially the same service-first historical-audit entry motion.

## Decision
Reject horizontal Contract Indexation Capture Auditor. Do not build a landing page, audit tool, or Rockrai experiment for it.

Competition is positive evidence that the problem and willingness-to-pay exist, but here it removes the proposed differentiation rather than merely validating the market. Re-enter only with a genuinely different buyer, inaccessible data advantage, vertical workflow, distribution advantage, or recovery mechanism.

## Lateral learning
The broader `revenue-capture-before-optimization` thesis is strengthened, not rejected. Missed escalation is one instance of a larger expected-vs-actual commercial truth problem. Keep looking for narrow leakage classes where incumbents do not already reconcile entitlement to execution.

Next candidate: supplier-side-multi-portal-receivables-reconciler.

# Delegated Transaction Proof Reconciler — evaluation

Date: 2026-09-18
Decision: REJECT HORIZONTAL / RETAIN NARROW SIGNALS

## Hypothesis tested
Agent-initiated transactions might create a repeated reconciliation problem distinct from agent identity, payment authorization and generic audit logs: prove that what the human delegated, what the agent selected, what the merchant charged, and what was fulfilled/refunded are mutually consistent.

## What the market/protocol layer now covers
- AP2 mandates cryptographically bind user intent/checkout/payment and provide receipts and verification rules.
- AP2 explicitly specifies bringing Checkout Mandate + Receipt and Payment Mandate + Receipt together for dispute evidence. Its spec says automated retrieval of checkout mandates would be useful, while dispute-resolution/retention/retrieval details remain outside scope.
- Mastercard Verifiable Intent provides a protocol-agnostic cryptographic delegation chain and constraint enforcement.
- Commercial entrants already capture protocol proof and package it for disputes (e.g. ChargeGuard, CertNode); Truvera offers AP2 mandate issuance/verification and transaction evidence.
- KYE-like offerings position themselves as authority/state/decision/evidence layers around agent purchases.

## Decision
Do not build a generic `intent -> transaction -> proof` reconciler. The core proposition is being absorbed by protocols and emerging dispute/evidence products. Competition validates the need, but our proposed horizontal differentiation is insufficient.

## Important residual gap
AP2 itself leaves dispute resolution, retention and retrieval mechanics outside the core specification and explicitly notes utility in automated artifact retrieval. This is a real seam, but commercial entrants are already attacking merchant-side chargeback evidence. Do not promote without a sharper buyer/workflow wedge.

## Retained lateral signals
1. **Post-settlement fulfillment reconciliation for autonomous procurement** — not merely `was payment authorized?`, but `did supplier fulfillment, substitutions, quantities, delivery, refunds and credits remain within the delegated business outcome?`. Potential B2B/AP workflow; investigate separately only if evidence of manual reconciliation appears.
2. **Cross-protocol evidence portability / neutral dispute packet** — AP2/UCP/ACP/Verifiable Intent evidence may be fragmented across agent, merchant, credential provider, PSP/network. Potential neutral evidence retrieval/normalization layer, but ChargeGuard/CertNode make generic merchant chargeback packaging too crowded.
3. **Outcome-contract + delegated-payment reconciliation** — connect prior Outcome Contract signal with delegated transactions: verify both authorization and that the billable/paid outcome actually occurred. This may be more valuable in agent-to-agent services than retail checkout.

## Build gate
No web, deployment or code. Promote only after finding a repeated workflow where a buyer currently joins authorization evidence to downstream fulfillment/outcome evidence manually and where existing payment/dispute tooling does not own the workflow.

## Engine consequence
Sweep-02 candidate queue is exhausted. Return to broad discovery (>=40 heterogeneous signals), carrying retained lateral signals without privileging them. Avoid over-indexing on agentic commerce; next sweep must deliberately diversify buyer types, geographies and problem classes.

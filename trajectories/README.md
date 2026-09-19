# Trajectory Memory & Replay

Purpose: preserve enough exploration history to improve the policy that explores, not merely the opportunities discovered.

Inspired by Dream-RSI (arXiv:2609.14858v1), adapted cautiously: its empirical results are from algorithmic/reasoning domains, not business discovery. We borrow the architecture, not its claimed effect sizes.

## Storage
Create append-only-ish records under `trajectories/YYYY-MM-DD-<cycle-or-branch>.json`. Existing candidate evidence files remain valid; trajectory records link to them rather than duplicating all prose.

Recommended schema:

```json
{
  "schemaVersion": 1,
  "id": "unique-cycle-or-branch-id",
  "timestamp": "ISO-8601",
  "parentId": null,
  "rootObservation": "...",
  "candidateId": "...",
  "policy": {
    "mode": "world|copy|recombine|mature|falsify|channel|economics|other",
    "reason": "...",
    "evidenceDimension": "..."
  },
  "before": {
    "classification": "observation|possible|promising|brilliant|...",
    "confidence": null
  },
  "action": "...",
  "cost": {
    "searchCalls": null,
    "agentCalls": null,
    "elapsedMinutes": null,
    "tokens": null
  },
  "evidenceRefs": ["candidates/..."],
  "result": "...",
  "after": {
    "classification": "...",
    "confidence": null
  },
  "decision": "continue|branch|rotate|reject|promote|buyer-blocked",
  "nextGate": "...",
  "laterOutcome": null
}
```

Unknown costs remain null; never fabricate precision.

## Replay
Replay is initially analytical, not an automated simulator. Periodically sample completed trajectories and compare counterfactual policies:
- earlier stopping;
- broader branching;
- different evidence ordering;
- WORLD vs copy vs recombination source;
- candidate allocation under the active-slot constraint.

Record replay conclusions only when they imply a testable policy change. Prefer metrics such as useful promotions / search call, decision-changing evidence / round, cycles-to-terminal-classification, false-promotion rate, and concentration by domain/pattern.

## Anti-overfitting
A failed candidate does not prove its discovery policy is bad. A successful candidate does not prove its policy is good. Policy changes require repeated trajectories or a strong causal mechanism.

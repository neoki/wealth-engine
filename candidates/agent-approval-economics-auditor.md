# Agent Approval Economics Auditor

Date: 2026-09-19
Decision: REJECT horizontal candidate / retain human-attention economics primitive

## Hypothesis tested
As agent deployments scale, human approval capacity becomes scarce. Proposed wedge: ingest historical approval/event logs (CSV/JSON first), quantify wait/review cost, rubber-stamping, low-value gates and stale-context exposure, then recommend gates that can safely move to narrower policy, sampling, post-action review or higher autonomy.

## Falsification result
The core differentiated wedge is already occupied, not merely the surrounding HITL queue category. Runshift explicitly describes a decision model that learns from every approval: which actions are repeatedly approved unchanged, denied or edited; that signal then raises automation thresholds for routine decisions so fewer gates fire over time. This is substantially the proposed telemetry -> gate-policy -> increased-autonomy loop.

Other evidence shows the mechanism is becoming standard design guidance rather than an isolated implementation. all-agents says a gate that is always approved is not a control and recommends tracking whether review changes outcomes, removing learning gates once proven. Boomlex describes verdict feedback recalibrating confidence thresholds and expanding safe autonomy. OperOS frames the target architecture as autonomous execution inside policy with human approval only when policy triggers. Approval-fatigue guidance independently recommends measuring request volume/review time and removing routine asks through narrowly scoped permission. Existing developer tools also learn/cachе previously approved action patterns.

## What remains less occupied
A vendor-neutral offline audit that imports logs from many runtimes and puts explicit euro/dollar cost on approval latency and reviewer attention may still be less common. Stale-context risk also appears underdeveloped. But these are feature-level differences around an increasingly native control-plane capability. A standalone horizontal auditor would face rapid absorption by the systems that already own the approval telemetry and policy engine.

## Why reject rather than abandon the pattern
Competition strongly validates the underlying pain: agents scale faster than human attention, blanket HITL does not scale, and approval fatigue can turn formal oversight into rubber-stamping. But the best-positioned vendors already own both sides of the feedback loop: event telemetry and the policy gate they can retune. We should search for applications where scarce human attention is economically important but no incumbent owns both the decision history and the mechanism that can remove/restructure reviews.

## Retained lateral signals
- `agent human-attention economics` remains a strong primitive, not a standalone horizontal product.
- `approval stale-context risk` remains separately interesting: an action safe when proposed may be unsafe after waiting for approval because world state changed.
- Search for cross-system human-review bottlenecks where decisions span several tools and no single control plane can learn the whole pattern.
- Prefer measurable outcomes: review minutes, queue delay, opportunity cost, reversals/errors caught, and downstream value at risk.

## Sources checked
- runshift.ai/human-in-the-loop-ai — decision model learns from approve/deny/edit history and raises automation thresholds.
- all-agents.io/learn/human-in-the-loop-ai — track whether review changes outcomes; remove gates that add no control value.
- boomlex.com/agentic-ai/human-in-the-loop — verdicts recalibrate thresholds and expand safe autonomy.
- operos.ai/platform/human-on-the-loop — policy-driven autonomy with selective human checkpoints.
- able.ceo/resources/governance-controls/approval-fatigue-ai-agents — approval-fatigue metrics and narrowly shaped permission.
- max-gherman.dev/design/anatomy-of-ai-agent/human-in-the-loop — >99% approvals / very short review latency as fatigue signals and recommendation to reduce checkpoints.

## Decision
Reject `agent-approval-economics-auditor` as a horizontal product. Rotate immediately to `customer-contract-ai-use-restriction-mapper`; do not build or deploy the CSV-first audit.
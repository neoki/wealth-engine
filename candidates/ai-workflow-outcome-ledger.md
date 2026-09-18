# AI Workflow Outcome Ledger

Updated: 2026-09-18
Decision: REJECT HORIZONTAL / RETAIN NARROW SIGNALS

## Hypothesis tested
A cross-agent ledger could connect AI/agent execution telemetry and spend to realized business outcomes, giving CIO/CFO teams an answer to: what economic result did each workflow actually produce?

## Evidence of need
The economic measurement problem is real. Current market material increasingly emphasizes cost per successful outcome rather than tokens/calls, and enterprise commentary reports a large gap between agent adoption and ROI measurement. This validates the buyer question, not our product.

## Competition / falsification
The supposed whitespace is already directly occupied, not merely adjacent:
- Implement Agentic describes AI FinOps with workflow budgets, downstream business-result logging, outcome attribution and named business KPIs.
- DecisionLedger AI tracks agent cost/success rates and records actual outcomes against predictions, with cross-agent dashboards and an outcome loop.
- NewRocket Value Intelligence tracks realized business value, investment vs savings, ROI/NPV and operational efficiency.
- Workforce Hub explicitly includes ROI tracking in digital-agent operations.
- Observability vendors are moving upward from token telemetry toward cost per successful workflow/business impact.

Therefore a generic `agent traces + cost + business KPI + ROI dashboard` is not a sufficiently differentiated product. Competition is positive evidence that budgets exist, but we currently have no unique data source, distribution advantage, integration wedge or workflow moat that makes another horizontal ledger worth building.

## Lateral signals retained
1. **Counterfactual outcome attribution** — realized savings are often fictional because teams count hours 'saved' without proving that labor cost/capacity actually changed. A narrower product could reconcile baseline, intervention, realized outcome and confidence/counterfactual evidence rather than accept self-reported ROI.
2. **AI value assurance for professional-services portfolios** — consultancies/MSPs deploying many automations for clients may need independently defensible proof of value per client/workflow for renewals, gain-share or outcome pricing.
3. **Outcome contract reconciliation** — as vendors price per resolution/outcome, buyer and vendor need a shared definition and evidence that an outcome was actually achieved, not merely that an agent run succeeded. Potential analogy: billing reconciliation rather than observability.

These remain signals only. Do not build until evidence shows repeated buyer workflow and willingness to supply outcome/billing data.

## Decision rule
Reject horizontal candidate. Rotate immediately to candidate #5 `delegated-transaction-proof-reconciler`.

## Build status
No web, Railway deployment, DNS, paid service, outreach, financial action or irreversible action performed.
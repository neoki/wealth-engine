# Vendor EOL Portfolio Reconciler

Status: **REJECTED — generic wedge saturated**
Date: 2026-09-18

## Thesis tested
An MSP-facing cross-client workflow that reconciles hardware/software vendor end-of-life/end-of-support dates against managed inventories and turns them into prioritized refresh/remediation plans.

## Evidence cycle
The underlying job is real, but the proposed differentiated layer is already covered at several levels:

- Lansweeper discovers hardware/software and exposes lifecycle/EOL/EOS views using manufacturer lifecycle data.
- NinjaOne ITAM is explicitly multi-tenant for MSPs and maintains hardware, software, license and lifecycle inventory across clients.
- EOLTracking.com explicitly offers an MSP multi-client lifecycle dashboard, NetBox import, endoflife.date lookup and unlimited-client pricing.
- MSP Cadence syncs RMM inventory, flags approaching EOL, auto-suggests grouped roadmap items and estimates replacement cost.
- Propel Your MSP integrates ConnectWise inventory/warranty/OS support and automatically generates lifecycle budgets for QBRs.
- Apila targets MSP/DaaS lifecycle operations with multi-tenant deployment, EOL automation and return logistics.
- Free/open data is abundant: endoflife.ai/endoflife.date for software; eosl.ai/eosl.date for hardware, including bulk/API/MCP patterns.
- WYRE's MSP Claude plugin already frames cross-vendor EOL/EOS flagging and refresh-cycle planning across connected RMM/documentation tools.

## Competition interpretation
Competition strongly validates the pain and willingness to operationalize lifecycle management. It does **not** justify another generic EOL dashboard/reconciler because both the data layer and the MSP portfolio workflow are already represented, including QBR budgeting and refresh planning.

## Lateral signals retained
1. **EOL evidence provenance / contradiction QA** — lifecycle datasets can conflict; a decision-grade evidence layer that exposes source bulletin, verification date, conflicts and confidence may matter in procurement/compliance workflows. EOSL.ai already partially addresses this, so this remains only a signal.
2. **EOL-to-commercial-opportunity reconciliation** — identify refresh events that should become proposals/quotes and measure conversion/margin across an MSP portfolio. Existing QBR/lifecycle products partly cover this; only revisit with evidence of a cross-tool revenue leakage problem.
3. **Agent-consumable lifecycle evidence** — open MCP/API lifecycle sources exist already; no standalone opportunity without a higher-value decision workflow.

## Decision
Reject the generic candidate. Do not build a website, dashboard, lifecycle database or RMM integration.

## Re-entry condition
Only reopen if external evidence shows a repeated high-value workflow not handled by existing ITAM/RMM/QBR lifecycle products — especially provable revenue leakage, decision-grade provenance requirements, or a cross-tool action gap with a buyer willing to pay.

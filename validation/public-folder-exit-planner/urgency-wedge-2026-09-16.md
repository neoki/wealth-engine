# PF Planner — urgency wedge (2026-09-16)

Status: **TARGETING IMPROVEMENT; BUYER VALIDATION STILL REQUIRED.**

## New observation

Exchange Server 2016 and 2019 reached end of support on 2025-10-14. Microsoft explicitly recommends migrating to Microsoft 365 / Exchange Online or upgrading to Exchange Server Subscription Edition, and its roadmap includes public folders among the data that can be migrated.

This creates a stronger targeting wedge than generic "M365 migration MSPs":

> MSPs and Exchange consultancies handling post-EOS Exchange 2016/2019 estates where Public Folders complicate decommissioning or cloud migration.

The product should therefore be tested as an **Exchange decommissioning scoping accelerator**, with Public Folder modernization as the difficult subproblem, rather than as a standalone Public Folder reporting product.

## Why this may improve conversion

- EOS creates a dated, externally imposed reason for customers to act.
- Public Folders can block a clean Exchange retirement even when mailbox migration is otherwise straightforward.
- MSPs can use a low-cost assessment to qualify and scope a larger migration/decommissioning engagement.
- PF Planner remains complementary to Microsoft-native migration tooling and commercial migration tools: it helps decide and scope before execution.

## Targeting order for validation

1. Exchange 2016/2019 → Exchange Online / Microsoft 365 migration specialists.
2. Hybrid Exchange decommissioning specialists.
3. Microsoft CSP/MSPs offering migration assessments as lead generation.
4. Generic M365 MSPs only after the above cohorts.

## Message hypothesis

Do not lead with "AI", "Public Folder analyzer", or "migration tool".

Lead with the economic job:

**Turn an existing Exchange/Public Folder inventory into a reviewable modernization scope before a senior engineer spends hours deciding what can move, what must be redesigned, and what can block Exchange decommissioning.**

## Validation gate

This evidence increases urgency but does **not** satisfy willingness-to-pay. Existing gate remains:

- >=3 independent MSP/consultancy signals that the workflow saves meaningful senior engineering / presales time; and
- >=1 concrete willingness signal: real anonymized inventory pilot, paid pilot, or use in a live opportunity.

Do not build a public site until that gate is crossed.

## Product implication if validated

PF Planner can later become one module in a broader **Exchange Exit Planner** rather than remaining permanently constrained to Public Folders. Do not expand scope yet: first prove the Public Folder wedge.

## Sources checked

- Microsoft Exchange Team, 2025-10-14: Exchange Server 2016 and 2019 end of support; migration to Exchange Online or Exchange Server SE recommended.
- Microsoft Learn Exchange 2019/2016 End of Support Roadmap: migrate mailboxes, public folders and other data to Microsoft 365, then decommission on-premises Exchange.
- Microsoft Learn Public Folder documentation: folder size/item inventory is available through EAC/PowerShell, supporting PF Planner's existing strategy of ingesting exports rather than building another scanner.

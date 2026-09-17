# Public Folder Exit Planner — EWS dependency urgency wedge

Date: 2026-09-17

## Decision

KEEP / ADVANCE. Do not publish a web yet. Extend the validation target from **folder destination planning alone** to a sharper near-term question: **which Public Folder workloads will actually break when Exchange Online EWS retirement begins?**

This is not scope creep into a generic EWS scanner. It is a Public-Folder-specific dependency layer that can increase urgency and economic value of the existing assessment.

## Fresh external signal

Microsoft's Exchange team says phased EWS disablement in Exchange Online begins **2026-10-01**. For Public Folders, Microsoft will not provide Graph CRUD APIs after the retirement; programmatic Public Folder access is restricted to supported Outlook clients and bulk import/export scenarios. Microsoft also introduced `EWSAllowedAppIDs` as a controlled transition mechanism before final EWS retirement.

Operational evidence is now appearing: Druva documents that its Exchange Online Public Folder backup/restore capability will cease to function when EWS access is retired. Other vendors are publishing migration guidance for Public-Folder-dependent integrations.

This creates a buyer problem that is more urgent than generic 'modernise your Public Folders someday': a tenant may have folders that look healthy to users in Outlook while backup, sync, custom apps or automation silently depend on EWS and are on a retirement clock.

## Product implication

Add an optional **EWS dependency preflight** to the existing PF Planner report.

Inputs remain customer-supplied and read-only; no tenant credentials are required by the product. The administrator can provide:

- EWS usage/report export or a redacted list of EWS AppIDs touching Public Folders;
- known backup/archive/sync products;
- known custom applications/scripts/service accounts;
- Public Folder inventory already accepted by PF Planner;
- optionally vendor migration status declared by the customer.

For each dependency, output one of:

- `NO_PF_EWS_DEPENDENCY`
- `PF_EWS_DEPENDENCY_CONFIRMED`
- `PF_EWS_DEPENDENCY_SUSPECTED`
- `TEMPORARY_ALLOWLIST_CANDIDATE`
- `REPLACEMENT_OR_EXIT_REQUIRED`
- `UNKNOWN_VENDOR_PATH`
- `HUMAN_REVIEW`

Then reconcile dependency -> affected folder/workload -> business owner -> replacement/exit path -> evidence -> deadline risk.

## Why this improves the wedge

The original PF Planner answers **where should this folder/workload go?**

This layer answers **what stops working if we do nothing?**

The combination is more commercially useful to an MSP because it can turn a free migration assessment into a prioritised remediation opportunity while remaining vendor-neutral. It also gives the planner a concrete urgency event without building a migration engine.

## Important boundary

Do not claim that all Public Folders stop working on 2026-10-01. Supported Outlook access remains; the risk here is programmatic EWS-dependent access/integrations. Do not infer an application dependency merely because a folder is mail-enabled. Missing evidence must remain `UNKNOWN`/`HUMAN_REVIEW`.

## Next validation gate

Before public web or broader engineering, require at least one realistic redacted dependency fixture containing both:

1. a Public Folder that remains usable by Outlook users but has an EWS-dependent integration; and
2. a Public Folder with no programmatic dependency.

The report must distinguish them and identify the first as remediation-required without falsely escalating the second.

Commercial gate remains unchanged: >=3 MSP/migration buyers confirm meaningful scoping/time value and >=1 provides a real pilot, opportunity or willingness-to-pay signal.

## Infrastructure decision

No public deployment yet. If commercial validation later passes, keep the existing PF Planner experiment under a descriptive `*.rockrai.com` subdomain and, where possible, `rockrai-experiment-factory`; do not create a separate EWS product unless buyer evidence shows it deserves independent scope.

# Public Folder Exit Planner — Inventory Contract v0

Purpose: bridge the synthetic classifier to real Exchange inventory without requiring tenant credentials in the product.

## Customer-supplied exports

The assessment accepts CSV/JSON exports produced locally by an Exchange administrator. No tenant write access is required.

### Folder-level fields

- `id` / folder path
- `itemCount`
- `sizeGb`
- `lastUserModified`
- `mailEnabled`
- `mailAddress` (optional; may be redacted)
- `uniqueAclCount`
- `hasExplicitPermissions`
- `complianceHold` (when known)
- `applicationDependency` (customer-declared)
- `externalMailFlow` (customer-declared or inferred from mail-enabled workflow)

### Workload sample fields

Derived from `Get-PublicFolderItemStatistics` or equivalent customer-side export:

- counts by item type: mail / document-like / calendar / contact / other
- `itemsLast90Days`
- oldest/newest modification date
- largest item size
- attachment prevalence (optional)

## Why these fields

Microsoft documents that Public Folder statistics expose folder size, item count and modification/access information, and that item statistics expose item type, modification time, attachments and message size. Microsoft also recommends snapshots of structure, statistics and permissions for migration validation.

## Safety boundary

v0 is assessment-only:

1. Customer/admin runs collection commands locally.
2. Export is reviewed/redacted before upload.
3. Planner reads metadata, not message bodies or attachment contents.
4. Planner never changes Public Folders, permissions, mail flow or retention.
5. Any destination recommendation with compliance, application dependency, complex ACLs or ambiguous workload is flagged for human review.

## Gate to public experiment

Do not publish merely because the synthetic benchmark passes. Require all of:

- synthetic benchmark >= 90% expected destination accuracy;
- >= 90% explainability;
- parser successfully consumes at least 3 structurally different realistic inventory fixtures;
- recommendations identify missing evidence rather than guessing;
- no tenant credentials required for the assessment path.

Only then consider a Rockrai experiment under a descriptive `*.rockrai.com` subdomain.
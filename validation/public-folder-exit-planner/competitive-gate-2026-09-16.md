# Public Folder Exit Planner — competitive differentiation gate

Date: 2026-09-16

## Finding

The generic **inventory/analyzer** wedge is not defensible enough on its own.

Priasoft publicly offers a **free Public Folder Analyzer** that produces inventory including size, item count, permissions, mail-enablement and cleanup candidates. Priasoft also markets public-folder reporting/analytics, hierarchy optimization and migration tooling. ExchangeSavvy likewise markets analyzers plus a Public Folder Connector that scans environments, maps folders to multiple destinations and validates migrations.

This is not a reason to kill the experiment. It changes the product boundary.

## What remains differentiated

PF Planner should not be positioned as "analyze your public folders". The wedge is:

1. ingest an existing inventory (including output from free analyzers);
2. decide whether each workload should remain a Public Folder or modernize to Shared Mailbox / SharePoint / Teams / archive;
3. separate destination suitability from migration safety;
4. compare execution profiles (currently Microsoft-native vs MigrationWiz) using explicit technical rules;
5. expose evidence gaps, blockers and specialist-review requirements;
6. produce a client-deliverable decision brief and scope that an MSP can turn into effort and quotation.

In other words, **we sit above discovery and below execution**.

## Competitive evidence

- Priasoft, Apr 22 2026: Public Folder Analyzer is free and produces a complete inventory in about an hour.
- Priasoft product pages: analyzer/reporting plus Public Folder migration/synchronization products already cover discovery and execution.
- ExchangeSavvy: Public Folder Connector supports Shared Mailboxes, SharePoint, M365 Groups/Teams, file shares and PST; its workflow includes pre-migration scan, mapping, sync and validation.
- ExchangeSavvy separately prices migration planning consulting at $3,500 one-time.
- Pro IT NW publishes $5k–$10k for Exchange SE upgrade discovery and $25k–$60k for full Exchange Online migration + hybrid decommission for 100–500 seats.

The economic opportunity therefore appears to be **decision/scoping automation**, especially for MSP presales, rather than charging merely for inventory collection.

## Gate

**PASS WITH REPOSITIONING.** Do not invest in building our own deep scanner yet. Accept CSV/JSON exports from existing tools first.

Before public deployment, require one of these external-validation signals:

- an MSP says the generated decision brief would materially reduce presales/scoping work;
- an MSP provides a sanitized real inventory for comparison against its engineer's plan;
- an MSP agrees to run a no-cost shadow assessment on a live opportunity.

Until then, keep the experiment private and do not spend on domain, ads or paid services.

## Next product action

Build an **adapter/import layer** for analyzer exports rather than another crawler. First target: a generic normalized CSV mapping that can accept fields typically produced by Priasoft/PowerShell inventories. This lets PF Planner complement incumbent discovery tools instead of competing with free functionality.

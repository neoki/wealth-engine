# Public Folder Exit Planner — adversarial gate

Status: **FAIL / redesign required**

The original 24-case benchmark is too clean to justify a public experiment. A second benchmark now tests mixed workloads and migration-risk conditions that occur in real estates: calendar+documents, contacts+mail, calendar+mail, application dependencies combined with holds/ACLs, and high ACL complexity.

Static evaluation of the current classifier against these cases exposes two unsafe assumptions:

1. Precedence rules silently collapse mixed workloads into a single destination (for example calendar+documents becomes the calendar destination).
2. Compliance holds and complex ACLs lower confidence but do not necessarily force human review; confidence exactly 0.80 is currently treated as automatic.

Decision: do **not** create a public Rockrai experiment yet. The next implementation must separate `destination recommendation` from `migration safety`, explicitly detect multi-workload folders, and make compliance/permission risk an independent review gate.

Commercial implication: this is useful rather than fatal. A credible assessment product should sell safe triage and decomposition, not pretend every Public Folder has a one-click destination. The benchmark is therefore changed from an accuracy-only gate to a safety gate.

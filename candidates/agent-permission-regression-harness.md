# Agent Permission Regression Harness

Status: **REJECTED — generic wedge / lateral retained**
Date: 2026-09-18

## Thesis tested
Changes to agent tools, scopes, identities, policies or MCP servers can silently change what an agent is able to do. A regression harness could snapshot expected allow/deny behavior and continuously prove least-privilege boundaries across agent/tool combinations.

## Evidence
The underlying problem is real and expanding: agents increasingly receive scoped access to operational systems, while authorization products emphasize per-tool policy, inherited human identity, auditability and dynamic/revocable scopes.

However, the generic wedge is already crowded across all three layers needed for a harness:

- authorization/enforcement: Lelu, Permit MCP Gateway, Permission Protocol, APort and similar products implement per-action or per-tool authorization and audit;
- functional auth/access-control testing: TestSprite explicitly generates tests for auth flows, roles, permissions and access boundaries;
- agent/MCP regression and evaluation: Iris and MCPLab track agent behavior/regressions in CI, while reizan-mcpcheck and MCP compliance suites cover deterministic MCP authorization/conformance behavior.

Therefore a generic `permission regression harness for agents` would overlap several rapidly converging product categories rather than exploit a clear missing workflow.

## Decision
Reject the generic product. Competition is positive evidence that authorization and agent regression are valuable, but there is no demonstrated proprietary data, distribution advantage, unique buyer or missing workflow sufficient to justify another horizontal harness.

Do not build or deploy a public experiment.

## Lateral signals retained
1. **Delegated-authority chain invariant testing** — test not merely whether each individual call is authorized, but whether a multi-step sequence remains within the user's delegated intent/budget/scope. This is structurally different from single-call RBAC/ABAC checks and is worth resurfacing if evidence of repeated failures/buyer pain appears.
2. **Permission-diff acceptance test after connector/tool updates** — produce a human-readable diff of *effective* capabilities before/after a SaaS/MCP connector change, including actions newly reachable through composition. Only pursue if existing IAM/control planes fail to expose this as a repeatable acceptance workflow.
3. **Cross-agent effective-access inventory** — reconcile human identity, delegated identity, service credentials and actual reachable tools into evidence for audits. Existing control-plane vendors are already close; retain as signal, not candidate.

## Re-entry gate
Only reopen if external evidence shows a repeated paid workflow around *composed/delegated* authority that current authorization, observability and eval products do not cover.

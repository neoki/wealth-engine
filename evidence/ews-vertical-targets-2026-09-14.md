# EWS vertical target research — 2026-09-14

## Result

The strongest current commercial target found is **Fischer & Kerrn / Concierge Booking 365**.

Their current public technical documentation states that the Microsoft Exchange / Office 365 integration **currently uses Exchange Web Services (EWS)** because, in their view, Microsoft Graph **does not yet offer the required feature set** for their workflow.

This is strong evidence of a live, business-critical EWS dependency in a commercial workspace-booking product rather than abandoned sample code.

Source:
- https://fischerkerrn.com/platform/technical-insights/
- https://fischerkerrn.com/platform/booking-engine/

## Other vendors checked

### Door Tablet

Not a primary target. Door Tablet still documents EWS for Exchange and some Microsoft 365 cases, but its current Microsoft 365 documentation recommends and supports Microsoft Graph, and all Door Tablet functions are presented as supported in the Graph configuration.

Sources:
- https://www.door-tablet.com/door-app/microsoft-365
- https://www.door-tablet.com/doortablet/dthelp.nsf/0/0a56cbd264a0b27f80258943003f8467%21OpenDocument%26Click%3D

### AMX RMS-SCH-EWS

Not a primary target. The product historically uses EWS and still has an EWS-branded product, but its current documentation says Office 365 Modern Authentication is supported through Microsoft Graph.

Source:
- https://www.amx.com/en-US/products/rms-sch-ews

### Atlona Velocity

Not a target. Atlona already provides a current migration path from EWS to Microsoft Graph for Microsoft 365 room scheduling.

Source:
- https://support.atlona.com/hc/en-us/articles/47918193502363-Velocity-Microsoft-Room-Scheduling-Graph-API

### Zoom Rooms / Workspace Reservation

Not a target for a compatibility bridge. Zoom has an explicit migration workflow from EWS to Graph and is actively moving customers.

Source:
- https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0077079

## Strategic implication

The research invalidates the simplistic assumption that a generic four-operation room-booking bridge is automatically sufficient.

There are two distinct populations:

1. **Migratable vendors** — they already have a Graph path; little opportunity beyond migration services.
2. **Feature-gap-dependent vendors** — they remain on EWS because required behavior is not yet available in Graph. This is the more interesting population, but a proxy cannot manufacture missing Graph capabilities.

Therefore the product wedge should be narrower:

- identify the exact EWS feature(s) blocking migration;
- distinguish true Microsoft Graph parity gaps from historical/vendor implementation debt;
- if the missing behavior can be reproduced through a composition of Graph APIs, Exchange configuration, mailbox permissions, subscriptions, or a small sidecar service, package that compatibility layer;
- otherwise sell a fixed-scope migration/continuity engineering sprint rather than pretending a universal proxy can solve it.

## Next gate

Research **what exact EWS operations or semantics Fischer & Kerrn relies on that it believes Graph cannot provide**.

Pass if:
- the blocker can be identified from public docs, support material, code, protocol behavior, or reproducible product behavior; and
- it can plausibly be emulated with a small compatibility layer.

Fail if:
- the dependency is based on genuine Graph feature gaps that cannot be reproduced externally; or
- the required operation set is broad/unbounded.

## Commercial significance

This remains a high-value opportunity because the EWS retirement creates an unavoidable deadline for software vendors with installed Microsoft 365 customer bases. But the likely business is **targeted compatibility engineering / vendor licensing**, not a generic EWS-to-Graph proxy clone.

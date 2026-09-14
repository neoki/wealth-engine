# EWS room-booking vendor scan — 2026-09-14

## Objective
Test whether the EWS dependency in room-booking products is isolated or repeated across multiple commercial vendors, and whether the same migration pattern appears: Exchange Online should move to Microsoft Graph while Exchange on-premises may remain on EWS.

## Current EWS-exposed vendors / products

1. **AMX RMS-SCH-EWS**
   - Current AMX product page still exposes an Exchange Web Services scheduling interface and lists Office 365 among supported environments.
   - Current downloadable software was updated in July 2026.
   - Workflow: locate rooms, display schedules, create room bookings from panels, persist bookings to Exchange.
   - Signal strength: high; explicit current commercial product and current 2026 software release.

2. **Door Tablet**
   - Current product page says Exchange integration uses EWS to synchronize reservations, availability and meeting details in real time.
   - Signal strength: high for continued EWS use, but additional investigation is required to determine whether their Microsoft 365 path already supports Graph elsewhere in the product line.

3. **Flexopus**
   - Current room-booking page says bidirectional Outlook synchronization is performed via EWS.
   - Their Exchange on-premises documentation describes EWS synchronization for new reservations, edits, cancellations and recurring appointments.
   - Signal strength: high for EWS usage; need to distinguish Exchange Online path from on-premises path before treating as a commercial migration target.

4. **Crestron Room Scheduling**
   - Current documentation still contains an Exchange EWS schedule source with OAuth/Modern Authentication and explicit Office 365 tenant configuration.
   - Signal strength: high that EWS remains supported in current documentation. Need confirmation whether current firmware/product also has a separate Graph path before treating as a target.

5. **Sign In Solutions Planner**
   - March–May 2026 release notes mention EWS connectivity fixes caused by recent Microsoft changes in Exchange Online.
   - Same release notes mention fixes around Exchange room auto-decline behavior and buffer enforcement, demonstrating that room-mailbox booking policy semantics matter operationally.
   - Signal strength: very high that a live commercial installed base was still using EWS against Exchange Online in 2026.

6. **CONTEXUS Room Booking**
   - Current page says Microsoft 365/Outlook/Teams integration is bidirectional and uses Exchange Web Services and CalDAV protocols.
   - Signal strength: medium-high; marketing copy is explicit but technical details are limited.

## Migrated / comparison vendors

7. **Korbyt Booking**
   - Current documentation separates Exchange Online and on-premises cleanly: Exchange Online must use Graph; on-premises uses EWS.
   - Hybrid permutations are documented explicitly.
   - This is a strong reference architecture for the likely end state.

8. **Atlona Velocity**
   - Current 2026 documentation says Graph API is the supported method for Microsoft 365 room scheduling and explicitly tells customers upgrading from EWS to migrate to Graph.
   - Useful comparator showing the migration is feasible for standard room-scheduling workflows.

9. **Carrier MS Exchange Scheduling add-on**
   - 2025 documentation separates Exchange on-premises via EWS from Office 365 via Microsoft Graph/OAuth 2.0.
   - Another strong reference architecture for split EWS-on-prem / Graph-cloud support.

10. **Extron Room Scheduling**
   - Documentation shows EWS push notifications/subscriptions for Exchange room mailboxes and Office 365 support in older/current manuals.
   - More research needed to determine whether a newer Graph-specific path exists.

## Pattern
The market is split into two camps:

- **Migrated vendors**: Graph for Exchange Online, EWS retained only for Exchange on-premises/hybrid where needed.
- **Lagging vendors**: current docs/products still rely on EWS for Microsoft 365 or publish Exchange Online EWS remediation guidance in 2026.

This means the problem is not isolated. It is a migration wave across an identifiable vertical.

## Repeated technical semantics
Across the vendors and support material, the repeated functional surface is:

- read room availability / schedules
- create room bookings
- update or cancel bookings
- keep Outlook and the booking product synchronized bidirectionally
- receive or emulate change notifications
- preserve recurring appointment behavior
- preserve Exchange resource-mailbox policies: auto-accept/decline, conflict rules, buffers, delegates, booking windows and other CalendarProcessing semantics

The last category is the likely source of most non-trivial migration work. Graph covers standard calendar CRUD and availability, but Exchange resource-mailbox policy remains an Exchange workload concern rather than a simple calendar endpoint problem.

## Commercial interpretation
A generic EWS-to-Graph proxy is not the best wedge. Better product candidates are:

1. **Room Booking Graph Migration Kit** — reusable library/service for vendors migrating Exchange Online while retaining EWS on-prem support.
2. **Resource Mailbox Policy Compatibility Layer** — helpers around Graph plus Exchange Online policy configuration, conflict/buffer handling and migration validation.
3. **Vendor migration accelerator** — fixed-scope engagement plus reusable adapter, aimed at room-booking vendors/MSPs with installed EWS estates.

## Gate result
PASS for repeated market pattern.

We have more than five commercially plausible room-booking vendors/products with current or recent EWS evidence, including multiple cases tied specifically to Exchange Online/Microsoft 365. We also have several migrated vendors that expose the target architecture.

## Next gate
Do not build a public landing yet. First select one lagging vendor/workflow and produce a constrained technical PoC that demonstrates:

- Graph calendar availability and CRUD
- stable ID mapping
- recurring event behavior
- delta/change synchronization or equivalent polling
- room resource acceptance/conflict behavior
- policy configuration/validation through Exchange Online administration where Graph alone is insufficient

Promotion condition: reproduce the critical booking workflow without EWS against Exchange Online, while keeping the adapter surface small enough to reuse across at least 3 vendors.

# EWS room-booking Graph-gap investigation — 2026-09-14

## Finding
Fischer & Kerrn's Concierge Booking 365 publicly states that its Microsoft 365 integration still uses EWS because Microsoft Graph does not provide the required feature set. Their Booking Engine also advertises features beyond simple calendar CRUD: resource locking/guaranteed booking, no decline messages from resource mailboxes, user-by-room controls for recurring meetings, booking history, creation/cancellation on behalf of users, and resource administration.

## Important technical distinction
Microsoft Graph covers core room-booking primitives:
- free/busy via `calendar/getSchedule`
- create/update/delete events
- resource attendees / room mailbox invitations

However, advanced resource-mailbox policy is still managed in Exchange Online primarily via Exchange PowerShell / Exchange administration, notably `Get-CalendarProcessing` and `Set-CalendarProcessing`. These controls include:
- `AllowRecurringMeetings`
- `AllowConflicts`
- `AllBookInPolicy`
- `BookInPolicy`
- `AllRequestInPolicy`
- `RequestInPolicy`
- `ResourceDelegates`
- `AutomateProcessing`
- `BookingWindowInDays`
- conflict thresholds and related booking policies

Therefore the likely migration gap for sophisticated room-booking vendors is not calendar CRUD itself. It is orchestration across:
1. Microsoft Graph for availability and event operations.
2. Exchange Online administrative APIs / PowerShell for resource-mailbox policy and delegate behavior.
3. Product-side coordination for atomic/near-atomic resource locking, booking history, conflict handling and user-specific rules.

## Product implication
Do not build a generic EWS->Graph SOAP proxy as the primary wedge.

A stronger product hypothesis is a **Room Booking Graph Migration Kit / Compatibility Orchestrator** that exposes a narrow vendor-facing API and hides the split between Graph calendar APIs and Exchange Online resource administration.

Potential capabilities:
- discover current room/resource configuration
- translate EWS-style availability and booking workflows to Graph
- configure or validate room mailbox booking policy via Exchange Online administration
- preserve vendor-level guarantees such as no-double-booking and controlled recurring reservations
- provide migration test harness and before/after compatibility report
- support customer-controlled Entra application registration and least-privilege access

## Why this is more defensible
Generic EWS-to-Graph bridges already exist. The unresolved complexity in room booking sits above CRUD: policy, resource behavior and orchestration. Vendors that have already migrated demonstrate that the transition is feasible, while Fischer & Kerrn demonstrates that at least one established commercial vendor still publicly considers the Graph feature set insufficient for its requirements.

## Current confidence
- Existence of active commercial EWS dependency: high.
- Graph support for core calendar operations: high.
- Resource policy dependence outside Graph: high.
- Exact Fischer & Kerrn blocking operation(s): not proven from public evidence.
- Viability of a reusable compatibility/orchestration layer: medium-high, worth testing.

## Next gate
Identify 5-10 room-booking vendors still on EWS, classify their feature set, and determine whether the same policy/orchestration gaps recur. Promote to product experiment only if at least 3 share a common gap addressable by one reusable layer.

## Sources
- https://fischerkerrn.com/platform/technical-insights/
- https://fischerkerrn.com/platform/booking-engine/
- https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0
- https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0
- https://learn.microsoft.com/en-us/powershell/module/exchangepowershell/set-calendarprocessing?view=exchange-ps
- https://learn.microsoft.com/en-us/exchange/recipients-in-exchange-online/manage-resource-mailboxes

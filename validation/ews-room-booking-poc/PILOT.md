# Controlled Exchange Online pilot

Goal: reproduce one real room-booking workflow without EWS, constrained to a single pilot room mailbox.

## Current dry-run boundary

No tenant mutation is performed by the repository code. The pilot must remain read-only until the explicit write phase is approved and the application is scoped to exactly one room mailbox.

## Graph surface

- Discover/list the pilot room with Places where needed.
- Read free/busy using `getSchedule`.
- Create, update and delete one synthetic calendar event through Microsoft Graph.
- Required application permissions for the intended app-only pilot: `Calendars.ReadWrite`; `Place.Read.All` only if room discovery through Places is required.

## Exchange resource policy surface

The pilot must record and preserve observable resource-mailbox behavior for:

- `AutomateProcessing`
- `AllBookInPolicy` / scoped booking policy
- conflict handling
- recurring meetings
- booking window
- delegate approval if enabled

These policies are Exchange resource-mailbox behavior and are not replaced merely by Graph calendar CRUD.

## Access control

Use Exchange Online RBAC for Applications for new scoping. Scope the Graph application to the single pilot room mailbox. Do not introduce a new legacy Application Access Policy for this pilot.

## Test sequence

1. Capture current room policy and a baseline set of booking outcomes.
2. Verify Graph free/busy for the room.
3. Create one synthetic booking in an otherwise-free slot.
4. Confirm the resulting room behavior matches the baseline policy.
5. Attempt a conflicting booking and verify rejection/handling.
6. Test one recurring series inside policy limits.
7. Update the synthetic booking.
8. Delete all synthetic pilot events.
9. Compare observable outcomes with the original EWS workflow.

## Pass gate

PASS only if the critical room-booking workflow has the same observable outcome without EWS for the tested scenarios, with application access constrained to the pilot mailbox.

## Fail / narrow gate

Narrow or abandon the compatibility-product hypothesis if required behavior depends on EWS-only semantics that cannot be reproduced by Graph plus Exchange Online resource policy, or if each vendor requires materially different bespoke behavior.

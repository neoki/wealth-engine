# Operational Credential Revenue Blocker

Status: rejected as horizontal product (2026-09-18)

## Hypothesis
A missing/expired license, certification, permit, insurance proof, training record or payer credential can make a worker, provider, asset or subcontractor unable to perform already scheduled/billable work. A cross-industry layer could rank credential exceptions by booked revenue/margin or productive capacity at risk and recommend the minimum action that restores earning capacity.

## Evidence of independent manifestations

### Healthcare provider credentialing
This is the strongest manifestation and also the one that kills the proposed differentiation. Koru Credentialed frames credentialing delay as $150K+ lost revenue per provider. CredNet says missing/lapsed payer enrollment stalls revenue. CredTek explicitly sells predictable time-to-revenue and faster movement to billable status. Most importantly, ASP-RCM Credential OS already computes dollarized Revenue-at-Risk per provider and exposes blockers holding specific dollar amounts. Handled Healthcare also shows a licensing work queue with revenue-at-risk and follow-up actions.

Sources:
- https://koruhealthsolutions.com/products/credentialed
- https://credentialnetwork.com/for-health-systems
- https://www.cred-tek.com/
- https://asprcmsolutions.com/ai/for/credentialing/
- https://asprcmsolutions.com/credentialing/
- https://www.handled.healthcare/

### Field service / regulated trades
LicenseReq tracks employee/subcontractor licenses, insurance and bonds and notes that an expired subcontractor credential can stop an entire job. Fieldproxy blueprints integrate credential status with scheduling, automatically restrict assignment when a technician certification lapses, and explicitly position this as preventing lost revenue/rescheduling. FieldEquip connects skills, technician availability and dispatch and describes unqualified assignments as revenue loss. WorXflo connects job scheduling, engineer certification management and invoicing.

Sources:
- https://licensereq.com/
- https://www.fieldproxy.ai/blueprints/pest-control-license-tracking
- https://www.fieldproxy.ai/automations/septic-track-certifications
- https://www.fieldequip.com/field-service-scheduling-dispatch-software/
- https://worxflo.com/industry/plumbing-heating

### Staffing / shift work / transportation
NextCrew connects healthcare staffing credentialing, scheduling, timesheets and invoicing end-to-end and states that one missed credential can pull a clinician from a shift. Vars combines compliance with shift filling across healthcare, warehouse, hospitality, events and construction. MaxAccel SafeTrack Crew integrates certification/qualification status directly with railroad crew scheduling and assignment.

Sources:
- https://www.nextcrew.com/industries/healthcare-staffing-software
- https://joinvars.com/vars-ai-native-staffing-platform/
- https://maxaccel.com/safetrack-crew-management/

## Falsification result
Reject the horizontal product.

The causal chain is real across at least three independent vertical manifestations: credential state -> eligibility/readiness -> scheduled work -> revenue/productive capacity. However, the proposed differentiator is already exact in healthcare: ASP-RCM dollarizes Revenue-at-Risk per provider and identifies blockers holding specific dollar amounts. In field service and staffing, vertical operating systems already join qualifications/credentials to scheduling, dispatch and invoicing, giving incumbents the data required to add economic ranking cheaply.

A generic cross-industry dashboard would therefore sit above systems that already own the worker/job/revenue graph, with integration burden and weak system-of-record advantage. This is poor product geometry even though the pain is valid.

## Retained lateral signal
`credential-to-capacity economic triage` remains a useful discovery lens, especially where credential state and booked work live in separate systems. Do not build it horizontally. Reconsider only if a specific vertical is found where (1) credential failure directly blocks material revenue, (2) no incumbent joins credential state to booked work/economic impact, and (3) validation can start from exports rather than deep integrations.

## Data-light wedge assessment
A CSV audit could join workers/providers + credential expirations + next 30/60 days of scheduled jobs + job/provider revenue and rank preventable revenue at risk. This is technically easy, but healthcare already productizes the dollarization and field-service/staffing suites increasingly own both datasets. Ease of prototype is not enough to overcome weak differentiation.

## Decision
Rejected as horizontal product. Rotate to `grant-reimbursement-leakage-auditor`.

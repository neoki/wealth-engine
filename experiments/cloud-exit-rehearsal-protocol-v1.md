# Cloud Exit Rehearsal / Portability QA — protocol v1

Date: 2026-09-17
Status: manual experiment; buyer validation required before software build.

## Promise
“Before a customer discovers that leaving your SaaS is harder than your docs imply, rehearse one complete exit and show exactly what survives, what is missing and what needs fixing.”

Not a legal opinion and not a Data Act certification.

## Inputs
- test/non-production tenant with representative synthetic data;
- public/contractual switching promises;
- expected object inventory;
- documented export/API methods;
- optional named destination system.

Never request production credentials or secrets for initial validation.

## Rehearsal
1. **Promise map** — list promised exportable objects, metadata, attachments/files, formats, APIs, assistance, timing, retrieval and erasure.
2. **Fixture** — create a small synthetic dataset with known counts and edge cases: relationships, attachments, custom fields, timestamps, statuses, deleted/archived object where appropriate.
3. **Exit clock** — start from the documented customer action; record every click, support interaction, wait and manual transformation.
4. **Export** — use documented self-service/API/support route only.
5. **Reconcile** — expected vs received counts, relationships, attachments, metadata, custom fields, history/audit data and configuration.
6. **Portability check** — parse exported artefacts and verify machine readability. Where a destination is named and safe, perform a limited import or mapping dry-run.
7. **Lifecycle check** — document what happens to account access, retrieval window and stated deletion/backup retention. Do not destructively delete a real customer tenant.
8. **Evidence pack** — screenshots/log timestamps, export manifest, hashes where useful, mismatch table and remediation actions.

## Scoring
Score each 0–2.

- Discoverability: customer can find exit instructions.
- Completeness: expected business objects are present.
- Relationships: references/IDs permit reconstruction.
- Files: attachments/binaries are retrievable and mapped.
- Metadata/history: relevant generated metadata/history is represented.
- Machine readability: formats are parseable without proprietary UI.
- Self-service: routine exit does not depend unnecessarily on bespoke support.
- Time predictability: process has observable, bounded timing.
- Documentation parity: observed behaviour matches promises.
- Destination usability: output can realistically feed a successor/migration process.

Maximum: 20. Score is operational evidence, **not** a compliance grade.

## Defect severity
- P0 — exit cannot complete / material customer data inaccessible.
- P1 — material class missing, broken relationships/files, undocumented blocking dependency, or major promise/behaviour mismatch.
- P2 — manual friction, unclear docs, awkward formats or recoverable mapping issue.
- P3 — cosmetic/documentation improvement.

## Commercial hypotheses to test
Vendor-side rehearsal:
- €490: one simple product/test tenant.
- €990: richer product + evidence/remediation pack.
- €2,500+: consultancy/MSP white-label kit + first supervised rehearsal.

Enterprise-side critical-SaaS rehearsal may support similar or higher pricing, but do not infer willingness-to-pay without interviews/pilots.

## PASS gate
At least one of:
- 3 relevant buyers recognise the problem + 1 agrees to a real test-tenant rehearsal;
- 1 consultancy/MSP wants to repeat it across >=5 client/vendor environments;
- 1 paid pilot.

And the rehearsal must find at least one non-trivial P0/P1/P2 issue or save >=1 hour of expert work versus the buyer's current method.

## FAIL / pivot
- Buyers consider documentation alone sufficient and will not run a rehearsal;
- test exports consistently match promises with trivial effort and no meaningful defects;
- procurement/legal ownership makes operational testing too hard to sell.

If vendor-side demand is weak but enterprise IT/procurement values evidence, pivot buyer rather than killing the mechanism.

## Build gate
No SaaS/web application before PASS. If PASS requires a public web surface, candidate is `cloud-exit.rockrai.com` under the existing Rockrai experiment infrastructure where possible. No domain purchase, paid service, paid ads, critical DNS or financial/irreversible action without Pablo's explicit approval.

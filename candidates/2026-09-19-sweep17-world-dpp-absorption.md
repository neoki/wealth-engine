# Sweep 17 — DPP supplier-work absorption + unrelated WORLD

Date: 2026-09-19

## Maturation: dpp-supplier-evidence-operations-channel

### Question
Is upstream supplier evidence collection a sufficiently unserved operational layer to justify a standalone/channel-first business, distinct from generic DPP software?

### Evidence
- The EU battery passport becomes mandatory on 18 February 2027 for EV, LMT and industrial batteries >2 kWh. The economic operator placing the finished battery on the market is responsible for accuracy, completeness and currency of passport information. The Commission's August 2026 guidance enumerates 71 data points and explicitly tells operators to identify information they need to collect, assess and make available.
- This creates genuine data/evidence work, but the hypothesised wedge is already being integrated directly into DPP products. Current platforms explicitly advertise supplier portals, automated missing-data requests, document upload/extraction, audit trails and supplier-data reuse.
- Strongest falsification: DPP Fácil explicitly sells end-to-end service in which the customer sends existing data and the provider chases suppliers for the rest; suppliers upload PDFs and AI fills fields. Aura similarly includes automated supplier requests and self-service document extraction. Traceable positions DPP compliance itself as a supplier-data-collection problem and automates requests, chasing, structured submission and audit history. osapiens reports a supplier portal network exceeding 100k suppliers.

### Interpretation
The pain is real but our proposed upstream operational wedge is not separate enough from the platform layer. A services/implementation business could still exist for a privileged vertical or installed-base/channel, but desk research does not support building a generic independent supplier-evidence operation. Competition here is not merely adjacent: several incumbents describe almost exactly the proposed workflow.

### Decision
`POSSIBLE-ROTATED` after two materially different rounds.

Revisit only if we acquire one of:
1. privileged access to a battery/textile/importer portfolio whose chosen DPP stack leaves evidence chasing unsolved;
2. evidence that supplier response/verification remains a costly human bottleneck after portal deployment;
3. a category-specific evidence job that generic portals cannot perform economically.

Do not build a generic DPP platform or generic supplier-chasing layer.

## Unrelated problem-first WORLD scan

Purpose: prevent regulation/DPP from becoming the next attractor.

### Hotels: manual commercial/reporting work
A September 2026 industry report summary says 80% of hotel professionals still spend one to two days per week preparing reports manually, while fewer than 10% of hotel organisations using/buying generative AI have cut manual work by >30%. This is a useful pain signal, but not yet an opportunity: the likely causes include fragmented PMS/channel/revenue systems, and generic reporting/BI automation is heavily served. Keep as WORLD observation; next discovery should look for one narrow report/action loop with a buyer and measurable economic outcome rather than 'AI for hotel reporting'.

### Sports clubs: compliance layer above commodity club management
Spanish club-management software is crowded and already automates fees, registration, communication and documents. A newer entrant is positioning around compliance (labour/tax/child-protection) rather than club operations. This is a useful pattern signal: when workflow software commoditises, a liability-bearing assurance/service layer may remain monetisable. Do not create another sports-club SaaS from this single observation.

### Administrators of property: incumbent software expanding into AI and adjacent workflows
Multiple 2026 Spanish products now cover incidents, invoices/OCR, SEPA, voting, supplier controls and AI. This further weakens generic 'automate administrators' ideas. A viable entry would need a sharply bounded outcome or privileged distribution, not another dashboard/copilot.

## Engine learning
A regulatory wave can create real mandatory work while simultaneously causing vendors to integrate the obvious adjacent operational pain before the deadline. Therefore 'platforms exist but upstream work remains' must be tested against vendors' current service layer, not inferred from architecture diagrams.

## Next
Rotate DPP. Sweep 18 should start from unrelated WORLD observations and proven profitable models outside compliance/recovery/routes/DPP. Prefer mundane high-frequency jobs with observable spend or a distribution asymmetry. Keep the active queue empty rather than inventing a candidate.
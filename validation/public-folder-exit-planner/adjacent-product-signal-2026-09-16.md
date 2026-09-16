# PF Planner — adjacent product signal

Date: 2026-09-16

## New signal

A live adjacent offer, SHEV Software, sells fixed-scope **EWS retirement audits for Microsoft 365 MSPs** at a published EUR 500–1,500 price range. Its operating model is notably similar to the direction PF Planner has converged on:

- MSP/service-provider buyer rather than end-user-first;
- evidence in → reviewable decision pack out;
- local-first / no hosted upload;
- no standing tenant credentials;
- asynchronous written assessment;
- every decision traceable to source evidence.

Source checked 2026-09-16: https://www.shevsoftware.com/

This is not evidence that buyers will pay *us*, and it is not a reason to copy the EWS product. It is useful market evidence that the broader product shape — narrow Microsoft retirement problem + evidence normalization + decision pack for MSPs — is commercially plausible at hundreds to low-thousands of euros per assessment.

## Implication for Wealth Engine

The reusable asset may be larger than PF Planner without requiring a larger product today:

`customer export/evidence → normalized evidence model → missing-evidence detection → deterministic checks → expert-review queue → decision/scoping pack`

PF Planner is one vertical instance. EWS retirement, Exchange decommission readiness, tenant migration blockers, SMTP relay discovery, and other Microsoft transition problems could later reuse the same assessment engine.

This suggests a possible **MSP Evidence-to-Decision Engine** as shared infrastructure, not as a new public product. Do not market or build that abstraction yet. Extract shared primitives only when a second validated vertical actually needs them.

## Why this matters economically

PF Planner currently risks being judged as a niche Public Folder utility. The adjacent paid offer shows a different interpretation: narrow retirement audits can be products because they reduce scarce senior-engineer discovery/scoping work and create a defensible written artifact before a larger implementation engagement.

That strengthens the existing hypothesis that the economic unit is **engineering/pre-sales time and quoting risk removed**, not the report itself.

## Updated experiment rule

Keep PF Planner's current validation gate unchanged:

1. >=3 independent MSP signals that the workflow saves meaningful expert scoping time;
2. >=1 willingness signal involving a real opportunity, pilot, or payment;
3. ask whether Public Folders alone are the useful unit or whether the buyer wants the complete Exchange-exit assessment.

If PF Planner validates, preserve the evidence-to-decision primitives so Exchange Exit Planner can reuse them. If PF Planner fails because the wedge is too narrow but buyers explicitly ask for whole-estate Exchange exit scoping, widen the wedge rather than killing the underlying engine.

## Explicit non-actions

- Do not build an EWS audit clone.
- Do not build Exchange Exit Planner yet.
- Do not deploy a new public web experiment from this signal alone.
- Do not add paid infrastructure, billing, domains, ads, or external outreach automatically.

## Additional corroborating evidence

Microsoft's current decommission guidance explicitly makes Public Folder state a prerequisite/branch in hybrid decommissioning, supporting the thesis that PF assessment belongs inside a broader Exchange-exit workflow:
https://learn.microsoft.com/en-us/exchange/decommission-on-premises-exchange

A current fixed-fee Exchange SE readiness assessment is publicly offered at USD 1,950 for up to four servers, another example of a read-only Microsoft transition assessment being sold as a standalone product:
https://o365hq.com/services/exchange-server-se-upgrade-readiness-assessment

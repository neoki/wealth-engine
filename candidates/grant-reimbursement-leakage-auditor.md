# Grant Reimbursement Leakage Auditor

Date: 2026-09-18
Decision: REJECT horizontal candidate / retain market primitive

## Hypothesis tested
Organizations incur grant/subsidy-funded expenses that are economically eligible for reimbursement but fail to convert all of them into claims because actual spend, award rules, evidence, coding and reimbursement workflows are fragmented. Proposed wedge: retrospective, data-light audit from award terms + ledger/payroll/CSV + evidence to identify eligible incurred spend never claimed, quantify recoverable cash, and produce claim-ready actions.

## Falsification result
Exact occupation found. FullRecover positions itself as a revenue-assurance layer for grant-funded finance and explicitly claims to identify expenses that qualify for grant reimbursement but were never invoiced. Its flow is source expenses (Bill.com/payroll/CSV) -> configure grant eligibility rules -> normalize/validate/match -> invoice-ready exports and audit documentation. This is essentially the proposed mechanism and even the proposed CSV-first/data-light wedge.

GrantPipe independently shows posted grant costs that still need a reimbursement request, approval or payment and lets finance select eligible expenses into drawdown requests. Avila imports a grant expense ledger, screens every expense against federal/funder rules and drafts reimbursement requests. GrantLink syncs accounting actuals, supports expense allocation and prepares reimbursement claims. GrantableHQ tracks spend transactions, reimbursement events, evidence and unresolved balances. Workday and other grant-management suites further validate post-award reimbursement as an established software category.

## Market validation
The problem is commercially legible: FullRecover explicitly markets missed reimbursements as revenue leakage and claims grant-funded organizations leave eligible revenue unbilled. Treat vendor percentage claims as marketing, not independent evidence, but the existence of multiple products implementing spend-to-claim reconciliation strongly validates willingness to buy the workflow.

## Why reject rather than abandon the pattern
Competition is positive evidence of demand, but FullRecover removes our current differentiation: it already implements eligible incurred expense -> grant rules -> missed reimbursement -> invoice-ready recovery, with CSV-first onboarding. Building a horizontal clone would have poor geometry unless we discover a geography, grant regime, buyer segment or source-system edge where these products cannot operate.

## Retained lateral signals
- `money-that-exists-before-software` remains strongly supported: recoverable grant cash exists economically before the software intervention.
- `event/transaction -> entitlement/rule -> evidence -> unclaimed cash -> minimum recovery action` now appears as another concrete revenue-capture primitive.
- Search for *adjacent entitlement leakage* rather than generic grants: rebates, credits, allowances, claims, refunds, incentives, contractual recoveries, tax/non-tax reimbursements, or sector-specific schemes where the entitlement is fragmented across operational systems.
- Prefer markets where incumbent systems manage applications/compliance but do not reconcile actual transactions against unclaimed entitlement.

## Sources checked
- FullRecover, fullrecoverhq.com — exact missed eligible reimbursement detection and CSV-first recovery flow.
- GrantPipe, grantpipe.com — posted grant costs needing request/approval/payment and reimbursement cash-gap workflow.
- Avila, getavila.ai — expense ledger import, eligibility/compliance screening and reimbursement request drafting.
- GrantLink, grantlink.app — accounting sync, expense allocation and reimbursement claims.
- GrantableHQ, grantablehq.com — spend/reimbursement/evidence tracking.
- Workday Grants Management — established enterprise reimbursement/grant workflow.

## Decision
Reject `grant-reimbursement-leakage-auditor` as a horizontal product. Sweep-04 candidate queue is exhausted. Start sweep-05 with >=40 fresh signals, deliberately diversifying away from repeatedly rediscovering occupied revenue-leakage categories while retaining entitlement-leakage as one search lens among many.
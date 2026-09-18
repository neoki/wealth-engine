# Professional Services Scope-Leak Ledger

Status: rejected as horizontal product; retain vertical/cross-channel signal
Date: 2026-09-18

## Thesis tested
Intercept an incoming client request before work begins, compare it with the signed engagement/SOW, classify in/out of scope, estimate commercial impact, and turn out-of-scope work into an approval/change-order path rather than unbilled goodwill.

## Demand evidence
The economic pain is strong. Ignition's 2025 agency survey (273 managers/executives) reports 57% losing $1k-$5k/month to unbilled work, 30% losing >$5k/month, and 78% rarely/only sometimes charging for out-of-scope work. Accounting-specific evidence also exists: an earlier Ignition study reported 43% of firms absorb increased-scope work and average unrecovered revenue above $76k/year.

## Falsification result
The supposed horizontal gap is already directly occupied, including the exact request-to-contract comparison before work:
- Fenscope: upload SOW; paste client request; instant in/out-of-scope verdict tied to clauses; reply + change order; ledger of unbilled requests.
- ScopeGuard.pro: paste contract + client request for instant scope verdict; Chrome extension can verify requests from webpages.
- EasyScope: flags likely out-of-scope requests from client messages, estimates cost/delay, creates change order/quote before work.
- ScopeShield: claims inbox interception of out-of-scope client requests and change-order generation before unbilled work.
- Vinrova ScopeTrack / ScopePaid / Outscope: frozen scope baselines, priced changes, approval before work; Outscope additionally collects pre-agreed overages.
- UnitPulse: detects extra requests and turns them into approved change orders while showing live margin.

This is not merely generic project profitability software. Multiple products now implement the exact operational interception layer proposed. Competition validates demand but removes our horizontal product novelty.

## Decision
REJECT horizontal product. Do not build or deploy a Rockrai experiment.

## Retained lateral signal
The stronger unresolved variant is **cross-channel scope interception for regulated/professional firms**: client asks arrive via email, Teams, calls, meetings, tickets and documents; the signed scope may live in engagement letters/ERP/DMS. A useful system would passively identify candidate scope leakage across those channels, attach the relevant engagement clause, aggregate repeated micro-requests, and route only high-confidence/high-value exceptions for human commercial approval.

This is materially different from asking a freelancer to paste each request into another scope tool. It should not be promoted without evidence that existing accounting/legal practice-management systems fail to do this and that firms will permit a pilot over anonymized request + engagement data.

## New connection
This candidate reinforces the recurring primitive already seen in accounting-close routing: **incoming event -> governing constraint -> downstream economic consequence -> smallest approval/action before value leaks**. Keep as a cross-domain primitive, not a product thesis yet.

## Sources checked
- Ignition, 2025 Agency Pricing & Cash Flow Report
- Fenscope
- ScopeGuard.pro
- EasyScope
- ScopeShield
- Vinrova ScopeTrack
- ScopePaid
- Outscope
- UnitPulse
- accounting-industry reporting on Ignition scope-creep research

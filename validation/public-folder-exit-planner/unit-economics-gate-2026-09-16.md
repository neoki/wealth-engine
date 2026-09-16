# PF Planner — unit economics gate (2026-09-16)

Status: **ECONOMICALLY PLAUSIBLE; BUYER VALIDATION STILL REQUIRED.**

This gate asks a narrower question than market size: if PF Planner saves engineering/pre-sales time, is that time valuable enough for an MSP to care?

## Public pricing anchors

- ExchangeSavvy publishes a **$3,500 one-time consulting fee** for migration planning, separate from migration licensing at **$95 per 10 GB**. This is unusually direct evidence that PF planning itself can carry four-figure value.
- Essential Computing publishes Public Folder / archive migration services at **£1,250–£1,650 per unit/day**, with fixed-price engagements available. One avoided senior delivery/scoping day is therefore economically meaningful.
- Cloudswitched's 2026 worked example prices **discovery and assessment at £1,200 fixed** for a 50-user M365 migration.
- Medha Cloud publishes Public Folder work at **$500 per hierarchy** within Exchange-to-M365 migrations. This is a lower-end anchor and a warning: not every PF project supports premium standalone planning economics.
- Inspizer explicitly says its fixed migration price is based on a **detailed discovery and scoping process**. That makes scoping quality part of margin protection, even when assessment is not separately invoiced.

Sources:
- https://exchangesavvy.com/public-folder-migrator/
- https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/513638860022228
- https://www.cloudswitched.com/blog/microsoft-365-migration-cost-uk-2026
- https://medhacloud.com/professional-services/migrations/exchange-server-to-microsoft-365-migration
- https://www.inspizer.com/m365-migration.html

## Economic hypothesis

PF Planner should **not** be positioned primarily as a cheap report generator. The stronger B2B hypothesis is margin leverage for MSPs/consultancies:

`existing inventory -> automated first-pass scoping -> engineer review -> faster / safer fixed-price quote`

The customer keeps the migration revenue. PF Planner captures a fraction of the engineering time/risk removed from discovery and quoting.

## Pricing envelope to test — not a price decision

Do not enable billing yet. During validation, test willingness around these economic shapes rather than asking an abstract willingness-to-pay question:

1. **Per-assessment:** roughly EUR 99–299 for a bounded PF inventory assessment.
2. **Partner pack:** roughly EUR 299–799/month for an MSP doing repeated assessments, subject to usage limits.
3. **White-label / larger MSP:** custom only after repeated usage proves the workflow.

These are test anchors, not validated prices. They intentionally sit far below a published $3,500 planning engagement and below one published UK migration-consulting day, leaving room for the MSP to retain most captured value.

## Minimum ROI test for interviews

Ask for two numbers: normal senior-engineer time spent before a PF migration can be safely scoped/quoted, and review time after receiving the PF Planner draft.

Then calculate:

`hours_saved * prospect_internal_or_billable_hour_value`

A candidate price is only credible if it is a minority of that value and the artifact does not increase rework/risk.

### Economic PASS

Alongside the existing buyer-validation gate, require at least one real prospect where:

- measured/estimated time saved is >=2 senior-engineer hours per assessment; and
- the prospect accepts a concrete paid-test range or says the cost is immaterial relative to saved effort / quote risk.

### REPOSITION

If engineers save <2 hours but value consistency/QA, reposition toward **review checklist / evidence-gap QA** rather than productivity automation.

### STOP / DEPRIORITIZE

If normal PF scoping is already <1 hour for the target MSP, or the generated draft requires enough correction that net time saved is negligible, do not build a public product regardless of apparent market pricing.

## New timing risk worth monitoring

BitTitan's current Public Folder migration guidance says Exchange Online EWS requests begin phased blocking on **2026-10-01**, with final EWS retirement on **2027-04-01**, and documents migration-specific preparation. This may temporarily increase migration planning complexity and urgency, but it should be treated as a time-bounded catalyst rather than the product thesis.

Source: https://help.bittitan.com/hc/en-us/articles/115008258568-Public-Folder-Migration-Guide-From-On-Premises-Exchange-2007-to-Microsoft-365

## Decision

**PASS TO BUYER TEST, NOT TO PUBLIC DEPLOYMENT.**

There is enough public economic evidence to justify spending prospect time on PF Planner. There is still no direct evidence that our artifact saves those prospects enough time or that they will pay. Keep `pfplanner.rockrai.com` unbuilt until the existing outreach gate passes.

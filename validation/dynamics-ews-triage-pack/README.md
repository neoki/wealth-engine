# Dynamics EWS Cutoff Triage Pack

White-label, fixed-scope diagnostic for partners supporting Dynamics CRM / Dynamics 365 Customer Engagement on-premises connected to Exchange Online.

## Why now

Microsoft documents these dates for the built-in Dynamics on-premises ↔ Exchange Online integration:

- 2025-10-01: no new tenants / no new updates.
- 2026-10-01: recommended migration deadline or temporary EWS allow-list continuity.
- 2027-04-01: support for Dynamics CRM CE v9 on-premises with Exchange Online ends; EWS in Exchange Online is fully retired.

## Product boundary

This is not a Graph connector and does not claim to fix the integration. It produces a decision-ready exposure report cheaply enough for a Dynamics partner to resell before committing to a migration project.

### Inputs

Partner/customer completes `intake.example.json` with no credentials, secrets, mailbox content or PII required.

### Output

Run:

```bash
node validation/dynamics-ews-triage-pack/triage.mjs validation/dynamics-ews-triage-pack/intake.example.json
```

The tool returns:

- affected / not-affected / unknown classification;
- deadline severity;
- workflows likely to fail (email, appointments, contacts, tasks);
- evidence still required;
- recommended continuity route;
- commercial next action.

## Proposed economics

- single customer assessment: EUR 390–790 white-label;
- partner batch of five: EUR 1,490–2,490;
- implementation/migration explicitly out of scope and quoted separately.

## Safety

No tenant access, credentials, email bodies, contacts or customer data are collected by this diagnostic. Any future live EWS Usage Report analysis should be performed by the customer/partner in their own tenant and reduced to metadata before sharing.

## Gate

Do not build a public site yet. Promotion requires at least one of:

1. two Dynamics partners expressing interest;
2. one partner asking for pricing/pilot;
3. one real anonymized customer intake proving the report changes a migration/continuity decision.

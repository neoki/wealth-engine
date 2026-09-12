# Convenio Watch — shadow pilot

## Goal
Prove that official gazette publications can be converted into operational labor-advisory alerts with materially less work than manual reading.

## First wedge
Galicia. Watch BOE + DOG + four provincial BOP sources for collective-agreement publications, salary revisions/tables, corrections, extensions and related labor changes.

## Ingestion rule
Use the most structured official source available for discovery and metadata. BOE open-data APIs and DOG RSS/structured feeds come before PDF scraping. Fetch the authoritative document only when necessary. Normalize heterogeneous documents with Microsoft MarkItDown when useful; retain source text/link and send ambiguous cases to human review.

## Required extraction
- convenio / agreement identity and REGCON code when available
- publication type
- territorial/sector scope
- effective date
- retroactivity date or flag
- salary-table/revision flag
- material obligations or changes
- official source URL
- confidence + human-review flag

## Validation
Create a shadow feed from real current publications and manually audit the extracted alerts. The technical hypothesis passes only if the system finds actionable changes without requiring a human to reread every source document.

## Commercial validation
14-day concierge pilot for labor advisory firms. Customer gives 5–20 agreement codes and company labels. Deliver only alerts that affect watched agreements.

## Economic signal
Strong: prepayment or paid continuation after pilot.
Medium: customer supplies agreement codes and commits to pilot with explicit price discussion.
Weak: generic interest without supplying watched agreements.

## Stop conditions
Stop or redesign if either (a) 10 qualified conversations produce no willingness to supply watched codes/pay, or (b) extraction quality makes human review effectively equivalent to manual monitoring.

## Strategic extension
If convenio monitoring works, the same public-intelligence ingestion layer can spawn separate vertical products for subsidies, procurement, tax/regulatory changes and other official-publication workflows. Those extensions do not enter the active portfolio until independently validated.

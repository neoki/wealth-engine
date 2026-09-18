# CAE Work-Blocking Exception Router

Status: rejected-horizontal; retain contractor-side cross-platform signal
Date: 2026-09-18

## Hypothesis tested
A CAE/contractor-compliance layer could map a missing or expired document to the worker/site/work package it blocks, estimate production/deadline impact, rank exceptions economically, and propose the smallest action that unlocks work.

## Findings
Spanish CAE platforms already strongly cover document requirements, validation, expiries, worker/site eligibility and physical access blocking. Valida exposes blocking documents and authorised sites; CoordinaPlus, MetaContratas, WGM CAE, Twind/CTAIMA and others connect compliance to access.

The pain is economically real rather than merely administrative. EntraObra explicitly markets around workers being unable to access site and work being stopped; Enexa likewise sells resolution of documentation that blocks site work.

However, the proposed horizontal bridge from compliance evidence into operational work is not empty. Skillix connects work packages/jobs, sites, assigned workers, documents, competencies, rosters and access/readiness, explicitly targeting work stalled by missing proof and disconnected readiness. Advanced Work Packaging products independently model work-package readiness and constraint removal. This makes `compliance exception -> operational work blocked` a natural capability of broader construction operations/workforce platforms, not a clean standalone horizontal wedge.

## Decision
Reject the original horizontal product. Do not build a generic CAE dashboard or another site-access/compliance platform.

## Retained lateral signal: contractor-side cross-platform CAE revenue router
A potentially better geometry exists on the contractor/subcontractor side. Small contractors often must operate across many customer-selected CAE systems (Nalanda, Dokify, CTAIMA, e-coordina, MetaContratas, etc.). Existing services such as EntraObra/Enexa manually coordinate those platforms. A future candidate could aggregate exceptions across platforms and rank them by `crew/job start -> revenue or penalty at risk -> blocked worker/equipment -> missing evidence -> fastest unblock action`. The buyer would be the contractor, not the site owner, and the value proposition would be protecting billable production rather than compliance administration.

This is only a retained signal. Before promotion it needs evidence that (1) multi-platform fragmentation is recurrent, (2) firms manually choose which blocked access to solve first, (3) economic/job context is absent from their current CAE workflow, and (4) integration/credential constraints do not destroy the economics.

## Connection to emerging primitive
This is a third independent appearance of the pattern already seen in accounting-close routing and professional-services scope interception: `incoming constraint/exception -> productive object affected -> economic/time consequence -> minimum action before value is lost`. Keep accumulating evidence before generalising into a platform.

## Sources reviewed
- Valida: contractor documents, expiries, blocking documents, authorised sites, turnstile integration.
- CoordinaPlus: automatic missing-document requests, expiries, access control, ERP/access integrations.
- EntraObra: rejected/missing documentation -> worker not validated -> access denied -> work stopped; operates across multiple CAE platforms.
- Enexa: explicitly sells unblocking worksites and cross-platform CAE management.
- Skillix: work package/job/site/worker/document/competency/readiness graph; explicitly designed around work stalled by missing proof.
- WorkPacks/AWP market: work-package readiness and constraint management are already established construction-operations concepts.

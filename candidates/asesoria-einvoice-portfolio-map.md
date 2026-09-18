# Asesoría E-Invoice Portfolio Map

Status: **ROTATED / generic product rejected; transition-orchestration wedge retained as signal**

Date evaluated: 2026-09-18

## Original thesis
A Spanish asesoría with hundreds of clients needs a portfolio control plane mapping `client -> invoicing software -> readiness -> incompatibility -> migration route -> blocker -> deadline`, potentially giving distribution and workflow advantages that a standalone invoicing app lacks.

## Regulatory reality checked
- RD 238/2026 establishes the B2B e-invoicing architecture but application is deferred until 12 months after the ministerial order for businesses above EUR 8m turnover and 24 months for the rest.
- The public solution is free and private platforms must interoperate; invoices and payment/status information form part of the operating model.
- As of this evaluation, the decisive ministerial order is still the near-term trigger to watch; therefore 1 Oct 2027 / 1 Oct 2028 are planning dates only if the order enters into force on 1 Oct 2026, not unconditional statutory deadlines.

## Competition interpretation
Competition validates that asesorías are a valuable distribution/control point, but the generic `all clients in one dashboard + compliance + onboarding` proposition is already directly occupied by products including NovaFactura, FactuKey, ALMC, FaCloud, Contavle and broader asesoría operating platforms such as Akua.

This is not rejected because competitors exist. It is rejected because the original differentiator—portfolio visibility/readiness—is itself already a marketed feature, while free/public infrastructure will commoditize basic compliance further.

## Lateral wedge retained
**Heterogeneous transition orchestrator**, not invoicing software.

Potential job:
`client portfolio -> discover existing SIF/ERP/vendor/manual process -> classify B2B/VeriFactu obligations -> vendor capability evidence -> migration/interoperability route -> owner -> blocker -> client communication -> completion proof`

Why this may differ: an asesoría cannot realistically force every client onto one billing product. The difficult transition layer may be coordinating a heterogeneous installed base across Sage/A3/Excel/vertical ERPs/custom systems and proving that each client reached a valid route.

## Falsification gate before any build
Do not build unless evidence shows that asesorías with heterogeneous client stacks are currently maintaining this migration/readiness work manually (spreadsheet/email/tickets) and existing multi-client invoicing suites do not solve it without replacing the clients' software.

Minimum commercial evidence for promotion:
- 3 independent asesorías describe the heterogeneous migration inventory as a recurring material workload; and
- at least 1 provides an anonymized portfolio sample or agrees to pilot the mapping workflow; and
- the workflow saves measurable advisor/IT time without requiring clients to migrate to our own invoicing system.

## Decision
Rotate. Preserve `heterogeneous-installed-base transition orchestration` as a signal. Do not create a website or product yet.

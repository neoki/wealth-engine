# Supplier-Side Multi-Portal Receivables Reconciler

Date: 2026-09-18
Decision: REJECT as horizontal product

## Hypothesis
Suppliers serving enterprise customers are forced to operate many buyer-owned AP/procurement portals. A supplier-side product could aggregate `invoice submitted -> customer portal -> acceptance/rejection -> missing PO/attachment/data -> dispute -> approval -> remittance/payment` without buyer cooperation.

## Falsification result
The pain is real, but the proposed product is already directly occupied.

- **Lunica Invoice Upload** uploads AR invoices from the supplier ERP into customer payment portals including Coupa, SAP Ariba, Oracle and Tungsten; periodically checks status; centralizes disputes, rejections and update requests; surfaces portal-specific exception reasons; and can automatically fix safe exceptions or route them.
- **Tesorio Supplier Portal Automation** autonomously logs into customer procurement portals to submit invoices, check payment status, download remittance data and resolve disputes. This is an established AR platform rather than a speculative landing page.
- **Lunos AI AP Portal Upload Agent** explicitly sells against the supplier-side pain: customers require invoices through AP portals, each portal has different login/format/rules, and AR analysts manually upload and confirm them. It routes invoice delivery across email, API and portals using an AI agent.
- **Rindler** describes AR/collections teams rotating through customer AP and creditor portals and automates portal login, submission and status retrieval.
- APPortaluploads also advertises multi-portal automation across Ariba, Coupa, Tungsten, Tradeshift, Oracle and others.

This is not merely adjacent AR automation: incumbents cover the exact counterparty-side multi-portal workflow we proposed, including portal credentials, submission, status monitoring, exceptions/disputes and payment/remittance.

## Decision
Do not build a horizontal supplier portal reconciler. Competition strongly validates willingness to pay and confirms the multi-portal asymmetry, but removes the claimed differentiation.

## Lateral learning
`counterparty-side multi-portal fragmentation` remains a useful discovery lens, not a product thesis. Search for domains where one party is forced to operate many systems chosen by counterparties **and** where no Lunica/Tesorio-like automation layer exists yet. Particularly interesting are portals whose state gates revenue, reimbursement, authorization, compliance or work commencement rather than ordinary invoice submission.

The stronger recurring thesis remains `revenue-capture-before-optimization`: find money or production already earned/entitled but stranded by fragmented operational state.

Next candidate: construction-variation-to-cash-gap-auditor.

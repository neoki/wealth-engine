# External usage evidence — 2026-09-11

This file records externally observable usage signals separately from internal checks and known liveness monitors. It is evidence of discovery/use, **not evidence of willingness to pay**.

## Strongest current signal

- **Enerlio GmbH / FACTANKER user-agent** performed a coherent MCP session against `/mcp` at approximately 2026-09-11 01:09 UTC: HTTP sequence `200 → 202 → 200`.
- This pattern is consistent with initialize / initialized notification / follow-up MCP interaction rather than a simple HTTP probe.
- Treat this as **one externally attributable MCP-use signal**, not three users or three demand signals.
- No paid-intent event was observed from this session.

## Other useful signals

- A Windows Chrome browser requested `/offers/voice-pricing-intelligence`, then `/api/opportunities`, then `/mcp`. The offer URL returned 404 at the time while `/api/opportunities` returned 200. Origin is not attributable, so this is a **possible human exploration signal**, not counted as confirmed external demand.
- `GolemreachTrustBot/0.1` requested `/.well-known/agent-card.json` and `/.well-known/agent.json`; both returned 404 at the time. This showed a concrete discovery compatibility gap.
- Known liveness traffic from `SentinelOracle/0.1` and `mcpbeat/0.1` must be excluded from meaningful-use counts.

## Remediation triggered by this evidence

Commit `e096670477894fa486765ea41fd51e433adaf9d4` adds:

1. `/.well-known/agent-card.json`
2. `/.well-known/agent.json`
3. a real `/offers/voice-pricing-intelligence` landing route
4. voice-offer exposure in machine-readable capabilities

## Interpretation policy

- One coherent session = one usage signal, regardless of request count.
- Crawler discovery = discoverability evidence, not user demand.
- Browser traffic without attribution = exploration evidence only.
- Paid intent, explicit request, or purchase remains the threshold for commercial validation.

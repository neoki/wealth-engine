# External usage evidence — 2026-09-11

This file records externally observable usage signals separately from internal checks and known liveness monitors. It is evidence of discovery/use, **not evidence of willingness to pay**.

## Strongest current signal

- **Enerlio GmbH / FACTANKER user-agent** performed a coherent MCP session against `/mcp` at approximately 2026-09-11 01:09 UTC: HTTP sequence `200 → 202 → 200`.
- This pattern is consistent with initialize / initialized notification / follow-up MCP interaction rather than a simple HTTP probe.
- Treat this as **one externally attributable MCP-use signal**, not three users or three demand signals.
- No paid-intent event was observed from this session.

## Other useful signals

- After the agent-card fix deployed, `SaSameAgentAudit/0.1` requested `/.well-known/agent-card.json` and received HTTP 200. This is direct evidence that the newly added discovery surface is being found by an external agent-audit crawler.
- `GolemreachTrustBot/0.1` subsequently requested `/.well-known/agent-card.json` and also received HTTP 200.
- `EndpointAudit/0.1` completed a coherent three-request MCP sequence `200 → 202 → 200`. It is explicitly an audit bot, so this counts as protocol/discoverability evidence, not product demand.
- Known liveness traffic from `SentinelOracle/0.1` and `mcpbeat/0.1` repeatedly completed MCP liveness sequences and must be excluded from meaningful-use counts.
- A Windows Chrome browser requested `/offers/mcp-discovery-audit` and received HTTP 200 at approximately 2026-09-11 01:48 UTC. No paid-intent request followed in the observed window, so this is a **human-looking offer-view signal**, not commercial validation.
- A generic Node client repeatedly completed MCP initialize-style request sequences. Because it is unattributed, it is not counted as a distinct external user.

## Remediation triggered by this evidence

Commit `e096670477894fa486765ea41fd51e433adaf9d4` added:

1. `/.well-known/agent-card.json`
2. `/.well-known/agent.json`
3. a real `/offers/voice-pricing-intelligence` landing route
4. voice-offer exposure in machine-readable capabilities

Commit `f1e238c6c3a9f13240278361de5e9dde36f79e2a` then tightened MCP transport semantics and attribution:

1. `GET /mcp` now returns HTTP 405 with `Allow: POST, OPTIONS` instead of a generic 404 for the stateless Streamable HTTP endpoint.
2. Only POST traffic to `/mcp` is classified as MCP usage; GET probes are classified by user-agent instead.
3. audit/liveness user-agent patterns are separated from human-looking/browser traffic.

## Interpretation policy

- One coherent session = one usage signal, regardless of request count.
- Crawler discovery = discoverability evidence, not user demand.
- Browser traffic without attribution = exploration evidence only.
- Paid intent, explicit request, or purchase remains the threshold for commercial validation.

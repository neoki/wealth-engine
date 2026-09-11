# External usage evidence — 2026-09-11

This file records externally observable usage signals separately from internal checks and known liveness monitors. It is evidence of discovery/use, **not evidence of willingness to pay**.

## Strongest current signals

- **Enerlio GmbH / FACTANKER user-agent** performed a coherent MCP session against `/mcp` at approximately 2026-09-11 01:09 UTC: HTTP sequence `200 → 202 → 200`.
- This pattern is consistent with initialize / initialized notification / follow-up MCP interaction rather than a simple HTTP probe.
- Treat this as **one externally attributable MCP-use signal**, not three users or three demand signals.
- No paid-intent event was observed from this session.
- **Exorails-Gateway** performed a coherent four-request MCP sequence at approximately 2026-09-11 03:21 UTC, including successful HTTP 200/202 responses. This is independently attributable protocol use/discovery evidence, but not paid demand.
- **mcp-observatory/0.1.0** completed a coherent `200 → 202 → 200` MCP sequence at approximately 2026-09-11 03:22 UTC. Its user-agent explicitly identifies it as a public transparency/observability service, so it counts as ecosystem discovery evidence, not customer demand.
- **WellknownBot** reached `/mcp` successfully at approximately 2026-09-11 03:23 UTC and supplied a public listing/claim URL for Wealth Engine. This is meaningful distribution/discoverability evidence, not commercial validation.

## Human-looking exploration signals

- A Windows Edge browser requested `/api/opportunities` twice at approximately 2026-09-11 03:06 UTC and received HTTP 200.
- Multiple mobile-Chrome-looking requests from distinct network addresses requested `/api/opportunities` around 03:12 UTC and received HTTP 200. Because identical mobile user agents across several addresses can also be automation/proxy traffic, these are recorded as exploration signals only and are not counted as distinct human users without stronger attribution.
- A Windows Chrome browser previously requested `/offers/mcp-discovery-audit` and received HTTP 200. No paid-intent request followed in the observed window, so this remains a **human-looking offer-view signal**, not commercial validation.

## Other useful signals

- After the agent-card fix deployed, `SaSameAgentAudit/0.1` and `GolemreachTrustBot/0.1` requested `/.well-known/agent-card.json` and received HTTP 200.
- `EndpointAudit/0.1` completed a coherent three-request MCP sequence `200 → 202 → 200`. It is explicitly an audit bot, so this counts as protocol/discoverability evidence, not product demand.
- `PulseFeed contract crawler/0.1` and `mcp-checker/1.0` successfully POSTed to `/mcp`; these are compatibility evidence only.
- Known liveness traffic from `SentinelOracle/0.1` and `mcpbeat/0.1` repeatedly completed MCP liveness sequences and must be excluded from meaningful-use counts.
- A generic Node client repeatedly completed MCP initialize-style request sequences. Because it is unattributed, it is not counted as a distinct external user.
- **ReferenceSource MCP Health** (`referencesource-mcp-health/0.1`) completed a coherent `200 → 202 → 200` sequence at approximately 2026-09-11 04:10 UTC. Its user-agent explicitly identifies a daily liveness probe, so it is excluded from demand and meaningful-use counts.
- **MCPWatch** (`MCPWatch/0.1.0`) executed two multi-step MCP sequences at approximately 04:14–04:15 UTC, including several successful 200 responses after initialization. Its user-agent identifies longitudinal MCP security research, so this is useful independent compatibility/security-observability evidence but not customer demand.
- A previously unattributed generic `node` client completed another initialize-style sequence at approximately 04:16 UTC. It remains unattributed and is not promoted to a user signal.

## Remediation triggered by this evidence

Commit `e096670477894fa486765ea41fd51e433adaf9d4` added agent discovery aliases and a real Voice Margin offer landing route.

Commit `f1e238c6c3a9f13240278361de5e9dde36f79e2a` tightened MCP transport semantics and attribution: `GET /mcp` returns 405 with `Allow: POST, OPTIONS`, and only POST traffic to `/mcp` is classified as MCP usage.

Commit `51a355bb6e341bac6bde2caa9f477c3078e3da8c` added `/robots.txt`, correct `HEAD /mcp` semantics, favicon noise suppression, and additional crawler classification.

## Interpretation policy

- One coherent session = one usage signal, regardless of request count.
- Crawler/liveness/security-research discovery = discoverability or compatibility evidence, not user demand.
- Browser traffic without attribution = exploration evidence only.
- Multiple requests with identical generic browser user agents are not assumed to be distinct humans merely because source addresses differ.
- Paid intent, explicit request, or purchase remains the threshold for commercial validation.

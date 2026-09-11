# External usage evidence — 2026-09-11

This file records externally observable usage signals separately from internal checks and known liveness monitors. It is evidence of discovery/use, **not evidence of willingness to pay**.

## Strongest current signals

- **Enerlio GmbH / FACTANKER user-agent** performed a coherent MCP session against `/mcp` at approximately 2026-09-11 01:09 UTC: HTTP sequence `200 → 202 → 200`.
- This pattern is consistent with initialize / initialized notification / follow-up MCP interaction rather than a simple HTTP probe.
- Treat this as **one externally attributable MCP-use signal**, not three users or three demand signals.
- No paid-intent event was observed from this session.
- **Exorails-Gateway** performed a coherent four-request MCP sequence at approximately 2026-09-11 03:21 UTC, including successful HTTP 200/202 responses. This is independently attributable protocol use/discovery evidence, but not paid demand.
- **mcp-observatory/0.1.0** completed a coherent `200 → 202 → 200` MCP sequence at approximately 2026-09-11 03:22 UTC. Its user-agent explicitly identifies it as a public transparency/observability service, so it counts as ecosystem discovery evidence, not customer demand.
- **WellknownBot** reached `/mcp` successfully at approximately 2026-09-11 03:23 UTC and supplied a public listing/claim URL for Wealth Engine. Wellknown describes itself as a live, machine-queryable index of AI agents, MCP servers and tools. This is meaningful distribution/discoverability evidence, not commercial validation.

## Human-looking exploration signals

- A Windows Edge browser requested `/api/opportunities` twice at approximately 2026-09-11 03:06 UTC and received HTTP 200.
- Multiple mobile-Chrome-looking requests from distinct network addresses requested `/api/opportunities` around 03:12 UTC and received HTTP 200. Because identical mobile user agents across several addresses can also be automation/proxy traffic, these are recorded as exploration signals only and are not counted as distinct human users without stronger attribution.
- A Windows Chrome browser previously requested `/offers/mcp-discovery-audit` and received HTTP 200. No paid-intent request followed in the observed window, so this remains a **human-looking offer-view signal**, not commercial validation.

## Other useful signals

- After the agent-card fix deployed, `SaSameAgentAudit/0.1` requested `/.well-known/agent-card.json` and received HTTP 200. This is direct evidence that the newly added discovery surface is being found by an external agent-audit crawler.
- `GolemreachTrustBot/0.1` subsequently requested `/.well-known/agent-card.json` and also received HTTP 200.
- `EndpointAudit/0.1` completed a coherent three-request MCP sequence `200 → 202 → 200`. It is explicitly an audit bot, so this counts as protocol/discoverability evidence, not product demand.
- `PulseFeed contract crawler/0.1` successfully POSTed to `/mcp` after deployment. Because it identifies as a crawler, this is ecosystem reachability evidence only.
- `mcp-checker/1.0` successfully POSTed to `/mcp`; this is compatibility evidence only.
- Known liveness traffic from `SentinelOracle/0.1` and `mcpbeat/0.1` repeatedly completed MCP liveness sequences and must be excluded from meaningful-use counts.
- A generic Node client repeatedly completed MCP initialize-style request sequences. Because it is unattributed, it is not counted as a distinct external user.

## Remediation triggered by this evidence

Commit `e096670477894fa486765ea41fd51e433adaf9d4` added:

1. `/.well-known/agent-card.json`
2. `/.well-known/agent.json`
3. a real `/offers/voice-pricing-intelligence` landing route
4. voice-offer exposure in machine-readable capabilities

Commit `f1e238c6c3a9f13240278361de5e9dde36f79e2a` then tightened MCP transport semantics and attribution:

1. `GET /mcp` returns HTTP 405 with `Allow: POST, OPTIONS` instead of a generic 404 for the stateless Streamable HTTP endpoint.
2. Only POST traffic to `/mcp` is classified as MCP usage; GET probes are classified by user-agent instead.
3. audit/liveness user-agent patterns are separated from human-looking/browser traffic.

Commit `51a355bb6e341bac6bde2caa9f477c3078e3da8c` responds to newly observed crawlers:

1. adds `/robots.txt` with explicit crawling permission and machine-readable discovery hints;
2. makes `HEAD /mcp` return 405 + `Allow: POST, OPTIONS` rather than an ambiguous 404;
3. returns 204 for `/favicon.ico` to remove irrelevant browser/catalog 404 noise;
4. extends crawler classification to observatory, Exorails and Wellknown user agents.

## Interpretation policy

- One coherent session = one usage signal, regardless of request count.
- Crawler discovery = discoverability evidence, not user demand.
- Browser traffic without attribution = exploration evidence only.
- Multiple requests with identical generic browser user agents are not assumed to be distinct humans merely because source addresses differ.
- Paid intent, explicit request, or purchase remains the threshold for commercial validation.

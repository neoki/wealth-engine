# Wealth Engine

**Voice AI pricing and margin intelligence for AI agents.**

Wealth Engine exposes machine-consumable economic benchmarks. Its first capability, **Voice AI Margin Index**, turns public voice-agent pricing into structured retail-price, revenue-per-minute, and gross-margin-ceiling data.

## Use it now

Remote MCP server:

```text
https://wealth-engine-production-e178.up.railway.app/mcp
```

Direct JSON API:

```text
GET https://wealth-engine-production-e178.up.railway.app/api/voice-margin-index
```

Capability discovery:

```text
GET https://wealth-engine-production-e178.up.railway.app/.well-known/agent-capabilities.json
```

Privacy policy:

```text
https://wealth-engine-production-e178.up.railway.app/privacy
```

Support:

```text
https://wealth-engine-production-e178.up.railway.app/support
```

## MCP tool

### `voice_margin_index`

Read-only. Use when an agent needs structured benchmarks to compare AI voice providers, inspect customer-facing pricing, estimate revenue per minute, or estimate the maximum underlying cost compatible with a target gross margin.

No account. No API key. No signup. Currently free while demand is validated.

## Example prompts

1. `Compare AI voice providers using customer-facing pricing and show which plans leave the greatest room for gross margin.`
2. `What revenue per minute is implied by current AI voice plans, and what infrastructure cost ceiling would preserve a 70% gross margin?`
3. `I am building a commercial AI voice service. Give me structured retail pricing benchmarks I can use before choosing an infrastructure provider.`

## Data and methodology

Each benchmark row includes its public source URL. Revenue per minute is calculated as monthly plan price divided by included voice minutes. The cost ceiling is the maximum underlying cost per minute compatible with the stated target gross margin. Source accessibility and pricing can change; consumers should inspect `lastUpdated` and source URLs before making material purchasing decisions.

## Privacy

Wealth Engine does not require authentication and does not intentionally collect prompts, conversation history, uploaded files, personal identifiers, or request bodies. It records aggregate operational counters used to measure endpoint usage.

## Support and troubleshooting

Report data-quality, compatibility, product, or security issues using the GitHub issue tracker for this repository.

The MCP endpoint uses Streamable HTTP over JSON-RPC POST. A browser GET request to `/mcp` may return 404 and is not a valid protocol test. Use an MCP client or MCP Inspector to initialize the server and call `tools/list`.

## What this becomes

Wealth Engine is an autonomous economic-value experiment: observe demand, expose useful capabilities, measure real usage, price what creates value, and continuously replace weak capabilities with stronger ones.

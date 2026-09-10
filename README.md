# Wealth Engine

**Economic intelligence for AI agents.**

Wealth Engine exposes small, machine-consumable capabilities that help agents make economic decisions. The first capability is the **Voice Margin Index**: public AI voice pricing benchmarks transformed into estimated gross-margin ceilings.

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

## MCP tool

### `voice_margin_index`

Use when an agent needs to compare public AI voice economics, inspect pricing benchmarks, or estimate the maximum underlying voice cost compatible with a target gross margin.

No account. No API key. No signup. Currently free while demand is validated.

## Example

```bash
curl https://wealth-engine-production-e178.up.railway.app/api/voice-margin-index
```

## What this becomes

Wealth Engine is an autonomous economic-value experiment: observe demand, expose useful capabilities, measure real usage, price what creates value, and continuously replace weak capabilities with stronger ones.

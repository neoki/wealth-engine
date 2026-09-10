# Wealth Engine

**Economic opportunity intelligence for AI agents.**

Wealth Engine turns public market evidence into machine-consumable economic hypotheses, ranked experiments, pricing benchmarks, and explicit kill criteria. It is not a generic MCP directory and it does not claim to predict revenue. Its purpose is to shorten the path from observable market evidence to a falsifiable economic experiment.

## Use it now

Remote MCP server:

```text
https://wealth-engine-production-e178.up.railway.app/mcp
```

Economic opportunities API:

```text
GET https://wealth-engine-production-e178.up.railway.app/api/opportunities
```

Capability discovery:

```text
GET https://wealth-engine-production-e178.up.railway.app/.well-known/agent-capabilities.json
```

## Active commercial experiments

We run a small number of real demand tests at a time. Current offers are manually fulfilled while willingness to pay is validated.

### MCP Discovery & Reliability Audit — €49 one-time
For operators of public remote MCP servers who need evidence that agents can discover, connect to and use the service, plus prioritized remediation.

Live offer: https://exp-mcp-audit-live-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/3

### x402 Seller Readiness Audit — €39 one-time
For x402 sellers who need to know whether generic autonomous buyers can discover and enter a compatible payment flow, with prioritized remediation.

Live offer: https://exp-x402-readiness-live-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/4

### Voice-AI Margin Intelligence — €29/month founding price
For voice-AI agencies, integrators and procurement teams that need comparable all-in provider economics, pricing-change tracking and margin-oriented procurement notes.

Live offer: https://exp-voice-pricing-live-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/5

No automatic billing is enabled yet. Purchase intent is measured before payment infrastructure is added.

## MCP tools

### `economic_opportunities`

Read-only. Returns ranked economic opportunities. Each opportunity contains the thesis, evidence, monetization paths, scoring dimensions, next experiment, success condition, and kill condition.

Use it when an agent needs to decide **what economic experiment to run next**, not merely which software tool exists.

### `voice_margin_index`

Read-only. Returns structured AI-voice retail pricing, revenue-per-minute calculations, gross-margin cost ceilings, source URLs, and row-level verification metadata.

No account. No API key. No signup. Both tools are currently free while demand and willingness to pay are validated.

## Example prompts

1. `Find the highest-ranked economic opportunity in Wealth Engine and explain the smallest experiment that could falsify it.`
2. `Which current opportunity has the best combination of speed, margin potential and automation? Use the evidence, not intuition.`
3. `I want a business experiment that can reach paid-demand evidence before more infrastructure is built. Use Wealth Engine to choose one.`
4. `Compare current AI voice providers using customer-facing pricing and show where a commercial service could or could not preserve gross margin.`
5. `What revenue per minute is implied by current AI voice plans, and what underlying cost ceiling would preserve a 70% gross margin?`

## Evidence policy

Wealth Engine distinguishes **observations** from **hypotheses**.

Pricing rows expose a source URL, `verifiedAt`, and `verificationStatus`. Required source pages are checked automatically for reachability. Reachability proves that a source is accessible; it does **not** prove that the price has not changed. Pricing data is therefore separately verified and timestamped.

Opportunity scores are prioritization heuristics, not forecasts. Every opportunity must expose a concrete experiment and a kill condition so weak theses can be discarded quickly.

## Privacy

Wealth Engine does not require authentication and does not intentionally collect prompts, conversation history, uploaded files, personal identifiers, or request bodies. It records aggregate operational counters used to measure endpoint usage and paid-intent clicks.

## Support and troubleshooting

Report data-quality, compatibility, product, purchasing-interest, or security issues using this repository's GitHub issue tracker.

The MCP endpoint uses Streamable HTTP over JSON-RPC POST. A browser GET request to `/mcp` may return 404 and is not a valid protocol test. Use an MCP client or MCP Inspector to initialize the server and call `tools/list`.

## Direction

```text
market signals → economic hypotheses → ranked experiment → real demand evidence → monetization → keep/kill/scale
```

Wealth Engine should consume directories, APIs, marketplaces and public market signals rather than duplicate them. The target is increasing autonomous economic evidence and ultimately net capital generated — not feature count.

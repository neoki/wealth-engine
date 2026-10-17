# Wealth Engine

Private opportunity intelligence for Pablo's own businesses.

The internal engine, research and MCP are private by default. External products are a separate commercial decision. Do not publish internal opportunities or enable public access without Pablo's explicit decision.

Wealth Engine turns public market evidence into machine-consumable economic hypotheses, ranked experiments, pricing benchmarks, and explicit kill criteria. It is not a generic MCP directory and it does not claim to predict revenue. Its purpose is to shorten the path from observable market evidence to a falsifiable economic experiment.

## Internal access

Set a strong `WEALTH_ENGINE_ACCESS_TOKEN` in the service's environment and configure authorized clients to send `Authorization: Bearer <token>`. Keep the token out of Git, URLs, public issue trackers and logs. If no token is configured, all data access is denied.

Authentication protects MCP, APIs, discovery metadata, usage and HTML pages. Only a minimal `/health` response and a restrictive `/robots.txt` are public. Responses use `Cache-Control: no-store` and discourage search indexing.

Registry publishing is disabled. Deploying this code does not change GitHub repository visibility or erase material already indexed by third parties. Those are separate containment steps.

## Active commercial experiments

We run a small portfolio of real demand tests across different domains. Current offers are manually fulfilled while willingness to pay is validated.

### MCP Discovery & Reliability Audit — €49 one-time
For operators of public remote MCP servers who need evidence that agents can discover, connect to and use the service, plus prioritized remediation.

Live offer: https://exp-mcp-audit-live-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/3

### x402 Buyer Compatibility Fix — €39 one-time
For x402 sellers with live or near-live paid endpoints that need generic autonomous buyers to enter a compatible payment flow, with concrete remediation or adapter guidance.

Live offer: https://exp-x402-readiness-live-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/4

### Voice-AI Margin Intelligence — €29/month founding price
For voice-AI agencies, integrators and procurement teams that need comparable all-in provider economics, pricing-change tracking and margin-oriented procurement notes.

Live offer: https://exp-voice-pricing-live-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/5

### Spain B2B E-Invoice Readiness — €79 one-time
For Spanish SMEs and advisory firms that need to identify gaps between their current invoicing workflow and the mandatory B2B electronic-invoicing operating model before buying or changing software.

Live offer: https://exp-spain-einvoice-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/6

### Overdue Invoice Recovery Pack — €39 one-time
For freelancers and small businesses that want a professional staged recovery sequence for overdue invoices without improvising every reminder.

Live offer: https://exp-overdue-invoice-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/7

### Web Cognitive Accessibility Audit — €69 one-time
For Spanish digital-service providers that want a rapid public-surface review of cognitive-accessibility risks in websites, forms and transactional journeys, with prioritized remediation.

Live offer: https://exp-web-accessibility-production.up.railway.app/
Request thread: https://github.com/neoki/wealth-engine/issues/8

No automatic billing is enabled yet. Purchase intent is measured before payment infrastructure is added.

## MCP tools

### `economic_opportunities`

Read-only. Returns ranked economic opportunities. Each opportunity contains the thesis, evidence, monetization paths, scoring dimensions, next experiment, success condition, and kill condition.

Use it when an agent needs to decide **what economic experiment to run next**, not merely which software tool exists.

### `voice_margin_index`

Read-only. Returns structured AI-voice retail pricing, revenue-per-minute calculations, gross-margin cost ceilings, source URLs, and row-level verification metadata.

### `live_market_scan`

Fetches the configured market source and derives hypotheses using the discovery rules. All three tools require internal authorization.

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

Wealth Engine requires bearer-token authentication and does not intentionally collect prompts, conversation history, uploaded files, personal identifiers, or request bodies. Authorized requests can update aggregate operational counters. Health responses expose no pricing, source inventory, opportunity data or usage statistics.

## Support and troubleshooting

Report data-quality, compatibility, product, purchasing-interest, or security issues using this repository's GitHub issue tracker.

The MCP endpoint uses JSON-RPC POST. Without authorization, it returns 401. Configure an authorized MCP client to initialize the server and call `tools/list`. Run `npm run check:private` to verify private-by-default behavior locally.

## Direction

```text
market signals → economic hypotheses → ranked experiment → real demand evidence → monetization → keep/kill/scale
```

Wealth Engine should consume directories, APIs, marketplaces and public market signals rather than duplicate them. The target is increasing autonomous economic evidence and ultimately net capital generated — not feature count.

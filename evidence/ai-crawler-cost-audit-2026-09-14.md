# AI crawler cost / log-analysis signal — 2026-09-14

## Signal
AI crawlers can create a real infrastructure cost and referral imbalance for content-heavy or metered sites. Cloudflare has documented crawl-to-referral ratios orders of magnitude above classic search, including OpenAI around 1,000+:1 and Anthropic tens of thousands:1 in 2025, while Cloudflare's 2026 reporting says AI-training crawls represent a large share of crawler activity. AHosting published a September 2026 measurement of 65,044 AI/assistant fetches over 28 days against only 79 assistant referrals on its network. Community reports also include extreme request bursts that owners describe as costly.

## Candidate considered
A narrow fixed-price "AI Crawler Cost Audit" could parse access logs, identify GPTBot/ClaudeBot/Perplexity and related agents, estimate requests/bandwidth/backend cost, compare that cost with referrals, and generate Cloudflare / robots.txt recommendations.

Possible price: EUR 49-149 one-off for small publishers or documentation-heavy SaaS sites.

## Competition / substitution check
The diagnostic layer is already weakly monetizable:

- Scrawl offers a free browser-based AI Bot Log Analyzer that parses uploaded access logs locally and identifies AI crawlers, requested URLs, statuses and success rates.
- Multiple free robots.txt tools already report whether GPTBot, ClaudeBot, PerplexityBot and Google-Extended are allowed or blocked.
- Cloudflare itself provides increasingly rich AI crawler controls and analytics, and blocking is straightforward for many sites.
- Generic SEO/AEO suites are adding AI-crawler visibility as a feature.

## Wealth Engine decision
**Do not promote to a public experiment.**

The underlying pain can be real, especially on metered/dynamic backends, but the obvious analyzer is easy to reproduce, has strong free substitutes and weak standalone willingness-to-pay. Creating `crawlercost.rockrai.com` would currently add more product surface than market information.

## Re-open conditions
Reconsider only if a stronger wedge appears, for example:

1. automatic translation of crawler load into verified EUR/USD infrastructure savings;
2. one-click remediation for a costly platform such as Vercel, Netlify, Cloudflare Workers or a specific managed WordPress host;
3. agency-scale multi-site remediation where the buyer controls dozens or hundreds of domains;
4. evidence that publishers will pay for an outcome such as reducing bot-origin compute spend by a guaranteed amount, rather than for diagnostics;
5. a monetization layer around paid crawling / licensing that produces revenue instead of merely reducing cost.

## Strategic note
This reinforces the current Wealth Engine rule: avoid selling information that free tools can already expose. Prefer remediation, direct savings, revenue creation, or a distribution advantage.
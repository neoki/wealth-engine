# n8n-nodes-apiyi-wealth-engine

A minimal n8n community-node package for APIYI. It supports chat completions and image generation through APIYI's standard `base_url` + API key pattern.

## Features

- APIYI credential with configurable base URL and secret API key.
- Chat operation with GPT, Claude, Gemini and DeepSeek presets.
- Image generation with Nano Banana Pro, GPT Image 1 and Flux Pro presets.
- n8n `continueOnFail()` support and explicit 120-second request timeouts.
- No API keys are stored in workflows or source code.

## Install for local n8n development

```bash
cd experiments/apiyi-n8n
npm install
npm run build
npm link
cd ~/.n8n/custom
npm link n8n-nodes-apiyi-wealth-engine
n8n start
```

For a production community-node release, publish this package to npm and install it from **Settings → Community Nodes** in n8n.

## Configure

Create an **APIYI API** credential in n8n:

- Base URL: `https://vip.apiyi.com`
- API Key: your APIYI key

The key is handled as an n8n password credential and is sent only as `Authorization: Bearer <key>`.

## Minimal demo

1. Import `examples/chat-demo.workflow.json` into n8n.
2. Select your APIYI credential in the APIYI node.
3. Execute the workflow.
4. The node calls `/v1/chat/completions` and returns the API response as JSON.

For images, switch **Operation** to **Image**, choose a model and size, and enter a prompt. The node calls `/v1/images/generations`.

## Development checks

```bash
npm install
npm run lint
npm run build
```

Live API calls are intentionally not part of automated tests because the repository does not contain an APIYI credential. The demo is designed to run unchanged once the operator selects their own n8n credential.

## Security

- Never commit API keys.
- Prefer n8n credential storage instead of expressions containing secrets.
- Keep the Base URL on an APIYI-controlled endpoint unless you intentionally use a compatible proxy.

## License

MIT. See `LICENSE`.

## Bounty self-assessment

This experiment targets the APIYI 2026 Open Source Plugin Bounty standard tier. It provides a public GitHub implementation, MIT license, installation/configuration/usage documentation, a runnable n8n demo workflow, and APIYI-compatible base URL/API-key authentication. It currently implements two operations rather than the full six-node premium checklist, so it should be evaluated as a standard-tier MVP rather than represented as premium-ready.

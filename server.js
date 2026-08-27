import http from 'node:http';

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }

  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Wealth Engine</title><style>body{font-family:system-ui;max-width:760px;margin:15vh auto;padding:24px;background:#0b0b0b;color:#f4f4f4}h1{font-size:clamp(42px,8vw,84px);letter-spacing:-.05em;margin:0}p{font-size:22px;color:#aaa;line-height:1.5}.dot{color:#7cff6b}</style></head><body><h1>wealth engine<span class="dot">.</span></h1><p>One objective: create economic value autonomously.<br>The experiment has started.</p></body></html>`);
});

server.listen(port, '0.0.0.0', () => console.log(`wealth-engine listening on ${port}`));

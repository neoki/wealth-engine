import http from 'node:http';

const port = Number(process.env.PORT || 3000);
const maxBodyBytes = 20_000;
const rateWindowMs = 15 * 60 * 1000;
const rateLimit = 8;
const attempts = new Map();

const securityHeaders = {
  'content-security-policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=()'
};

function send(res, status, type, body) {
  res.writeHead(status, { ...securityHeaders, 'content-type': type, 'cache-control': 'no-store' });
  res.end(body);
}

function json(res, status, payload) {
  send(res, status, 'application/json; charset=utf-8', JSON.stringify(payload));
}

function clientKey(req) {
  return String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
}

function allowed(req) {
  const key = clientKey(req);
  const now = Date.now();
  const active = (attempts.get(key) || []).filter((stamp) => now - stamp < rateWindowMs);
  if (active.length >= rateLimit) return false;
  active.push(now);
  attempts.set(key, active);
  return true;
}

function clean(value, max = 500) {
  return String(value || '').trim().replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 254;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      raw += chunk;
      if (Buffer.byteLength(raw, 'utf8') > maxBodyBytes) {
        reject(new Error('too_large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="A no-savings, no-fee margin audit for AI products. Find expensive users, workflows and model calls before they erase gross margin.">
  <title>AI Margin Autopsy</title>
  <style>
    :root{--bg:#090b0f;--panel:#11151c;--line:#252b35;--text:#f7f8fa;--muted:#9aa4b2;--acid:#b9ff66;--danger:#ff6b6b;--max:1120px}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 80% 0,#182515 0,transparent 28%),var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    a{color:inherit}.wrap{width:min(var(--max),calc(100% - 40px));margin:auto}.nav{display:flex;justify-content:space-between;align-items:center;padding:24px 0;font-weight:800}.brand{letter-spacing:-.04em}.pill{font-size:13px;color:var(--acid);border:1px solid #40552d;border-radius:999px;padding:8px 12px;background:#11180d}
    .hero{display:grid;grid-template-columns:1.25fr .75fr;gap:56px;align-items:center;padding:78px 0 66px}.eyebrow{color:var(--acid);font-size:13px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.hero h1{font-size:clamp(52px,7.2vw,104px);line-height:.91;letter-spacing:-.075em;margin:18px 0 24px}.hero h1 em{font-style:normal;color:var(--acid)}.lede{max-width:730px;color:#c8ced7;font-size:clamp(19px,2vw,25px);line-height:1.45}.cta{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:34px}.btn{appearance:none;border:0;border-radius:12px;background:var(--acid);color:#11170a;padding:16px 22px;font-weight:900;font-size:16px;cursor:pointer;text-decoration:none}.sub{color:var(--muted);font-size:14px}
    .card{background:linear-gradient(180deg,#151a22,#0e1218);border:1px solid var(--line);border-radius:20px;padding:26px;box-shadow:0 26px 80px #0008}.card h2{margin:0 0 8px;font-size:22px}.metric{display:flex;justify-content:space-between;align-items:end;border-top:1px solid var(--line);padding:18px 0}.metric:first-of-type{margin-top:22px}.metric span{color:var(--muted)}.metric strong{font-size:27px;letter-spacing:-.04em}.bad{color:var(--danger)}.good{color:var(--acid)}
    .proof{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:25px 0;color:var(--muted);font-size:15px}.proof .wrap{display:flex;gap:30px;justify-content:center;flex-wrap:wrap}.proof b{color:var(--text)}
    section{padding:86px 0}.section-title{max-width:820px;font-size:clamp(38px,5vw,68px);letter-spacing:-.06em;line-height:1;margin:0 0 42px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.box{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:24px}.box b{display:block;color:var(--acid);font-size:13px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:15px}.box h3{font-size:24px;letter-spacing:-.04em;margin:0 0 12px}.box p{color:var(--muted);line-height:1.6;margin:0}
    .offer{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:start}.steps{counter-reset:step}.step{position:relative;padding:0 0 28px 56px;border-left:1px solid var(--line);margin-left:18px}.step:before{counter-increment:step;content:counter(step);position:absolute;left:-19px;top:-3px;width:37px;height:37px;border-radius:50%;display:grid;place-items:center;background:var(--acid);color:#11170a;font-weight:900}.step h3{margin:0 0 7px}.step p{margin:0;color:var(--muted);line-height:1.55}.step:last-child{border-left-color:transparent}
    form{display:grid;gap:13px}.row{display:grid;grid-template-columns:1fr 1fr;gap:13px}label{display:grid;gap:7px;color:#cbd2dc;font-size:14px;font-weight:700}input,select,textarea{width:100%;border:1px solid #303846;border-radius:10px;background:#0b0e13;color:var(--text);padding:13px 14px;font:inherit;outline:none}input:focus,select:focus,textarea:focus{border-color:var(--acid)}textarea{min-height:100px;resize:vertical}.hp{position:absolute;left:-9999px}.notice{min-height:22px;color:var(--muted);font-size:14px}.notice.ok{color:var(--acid)}.notice.err{color:var(--danger)}
    .calc{margin-top:18px;padding:18px;border:1px dashed #3a4655;border-radius:14px}.calc label{margin-bottom:10px}.calc input[type=range]{padding:0;accent-color:var(--acid)}.calc-result{font-size:34px;font-weight:950;letter-spacing:-.05em;margin-top:6px}.calc-small{color:var(--muted);font-size:13px}.terms{font-size:12px;color:#788391;line-height:1.5}
    footer{padding:35px 0 55px;color:#737e8d;border-top:1px solid var(--line);font-size:13px}.footer-row{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
    @media(max-width:850px){.hero,.offer{grid-template-columns:1fr}.hero{padding-top:45px}.grid{grid-template-columns:1fr}.row{grid-template-columns:1fr}.hero h1{font-size:58px}}
  </style>
</head>
<body>
  <header class="wrap nav"><div class="brand">AI Margin Autopsy</div><div class="pill">No savings. No fee.</div></header>

  <main>
    <section class="wrap hero">
      <div>
        <div class="eyebrow">For AI-native products</div>
        <h1>Your best users may be your <em>worst business.</em></h1>
        <p class="lede">We find the customers, features, prompts and model calls quietly eating your gross margin — then prove the saving against the next provider invoice.</p>
        <div class="cta"><a class="btn" href="#audit">Request a free autopsy</a><span class="sub">No API keys. No retainer. No slideware.</span></div>
      </div>
      <aside class="card" aria-label="Illustrative margin analysis">
        <h2>Illustrative margin leak</h2>
        <p class="sub">A flat-rate AI product with hidden inference whales.</p>
        <div class="metric"><span>Monthly revenue</span><strong>$42,000</strong></div>
        <div class="metric"><span>Inference cost</span><strong class="bad">−$17,600</strong></div>
        <div class="metric"><span>Recoverable waste</span><strong class="good">$6,100</strong></div>
        <div class="metric"><span>Margin after fixes</span><strong>72%</strong></div>
        <div class="calc">
          <label for="spend">Your monthly model spend: <span id="spendLabel">$20,000</span></label>
          <input id="spend" type="range" min="2000" max="250000" step="1000" value="20000">
          <div class="calc-result" id="saving">$4,000–$8,000</div>
          <div class="calc-small">Illustrative monthly opportunity at 20–40%. Your evidence decides the real number.</div>
        </div>
      </aside>
    </section>

    <div class="proof"><div class="wrap"><span><b>Input:</b> billing export + optional usage map</span><span><b>Output:</b> ranked savings ledger</span><span><b>Verification:</b> before/after invoices</span></div></div>

    <section class="wrap">
      <h2 class="section-title">We do not show you spend. We identify <em>avoidable spend.</em></h2>
      <div class="grid">
        <div class="box"><b>01 · Whales</b><h3>Loss-making users</h3><p>Find accounts whose token, image, audio or agent-loop cost exceeds the revenue attached to them.</p></div>
        <div class="box"><b>02 · Mismatch</b><h3>Wrong model, wrong job</h3><p>Locate routine work running on frontier models and rank substitutions by dollars saved and quality risk.</p></div>
        <div class="box"><b>03 · Waste</b><h3>Loops, retries and uncached context</h3><p>Surface duplicated context, runaway tool loops, avoidable outputs, missing batching and cache misses.</p></div>
      </div>
    </section>

    <section class="wrap offer" id="audit">
      <div>
        <div class="eyebrow">The engagement</div>
        <h2 class="section-title">One export. One ledger. One number that survives scrutiny.</h2>
        <div class="steps">
          <div class="step"><h3>Send evidence, not credentials</h3><p>Provider CSVs, invoices and — when available — a privacy-safe user or feature identifier.</p></div>
          <div class="step"><h3>Receive the margin autopsy</h3><p>Every finding includes the baseline, intervention, expected saving, implementation effort and verification method.</p></div>
          <div class="step"><h3>Pay only after the bill falls</h3><p>Our fee is tied to verified savings, not estimated opportunity. If the saving does not appear, the fee does not appear.</p></div>
        </div>
      </div>

      <div class="card">
        <h2>Request the free evidence review</h2>
        <p class="sub">We will tell you whether there is enough signal for a paid engagement. No sales theatre.</p>
        <form id="leadForm" novalidate>
          <div class="row">
            <label>Work email<input name="email" type="email" autocomplete="email" required placeholder="you@company.com"></label>
            <label>Company or product<input name="company" required maxlength="120" placeholder="Acme AI"></label>
          </div>
          <div class="row">
            <label>Monthly model spend<select name="spend" required><option value="">Select</option><option>$2k–$10k</option><option>$10k–$50k</option><option>$50k–$250k</option><option>$250k+</option><option>Not sure</option></select></label>
            <label>Main provider<select name="provider" required><option value="">Select</option><option>OpenAI</option><option>Anthropic</option><option>Google / Vertex</option><option>AWS Bedrock</option><option>Azure OpenAI</option><option>OpenRouter / multi-provider</option><option>Other</option></select></label>
          </div>
          <label>What is worrying you?<textarea name="note" maxlength="1000" placeholder="Example: flat-rate plan, rising agent costs, no per-user attribution..."></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <button class="btn" type="submit">Request review</button>
          <div id="formNotice" class="notice" role="status" aria-live="polite"></div>
          <p class="terms">Do not submit credentials, prompts, customer data or billing files here. This form only requests contact and high-level context.</p>
        </form>
      </div>
    </section>
  </main>

  <footer><div class="wrap footer-row"><span>AI Margin Autopsy · an evidence-first experiment</span><span>No cookies · no trackers · no credentials requested</span></div></footer>

  <script>
    const money = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
    const slider = document.getElementById('spend');
    const spendLabel = document.getElementById('spendLabel');
    const saving = document.getElementById('saving');
    function updateCalc(){const value=Number(slider.value);spendLabel.textContent=money.format(value);saving.textContent=money.format(value*.2)+'–'+money.format(value*.4)}
    slider.addEventListener('input',updateCalc);updateCalc();

    const form = document.getElementById('leadForm');
    const notice = document.getElementById('formNotice');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      notice.className='notice';notice.textContent='Sending…';
      const payload=Object.fromEntries(new FormData(form).entries());
      try{
        const response=await fetch('/lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
        const data=await response.json();
        if(!response.ok) throw new Error(data.error||'Unable to submit');
        form.reset();notice.className='notice ok';notice.textContent='Received. We will review the signal and contact you.';
      }catch(error){notice.className='notice err';notice.textContent=error.message||'Unable to submit. Please try again.'}
    });
  </script>
</body>
</html>`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/health') {
    return json(res, 200, { ok: true, service: 'ai-margin-autopsy' });
  }

  if (req.method === 'POST' && url.pathname === '/lead') {
    if (!allowed(req)) return json(res, 429, { error: 'Too many attempts. Please try again later.' });
    try {
      const body = await readJson(req);
      if (clean(body.website, 100)) return json(res, 200, { ok: true });

      const lead = {
        email: clean(body.email, 254).toLowerCase(),
        company: clean(body.company, 120),
        spend: clean(body.spend, 40),
        provider: clean(body.provider, 80),
        note: clean(body.note, 1000)
      };

      if (!validEmail(lead.email) || !lead.company || !lead.spend || !lead.provider) {
        return json(res, 400, { error: 'Please complete the required fields with a valid work email.' });
      }

      console.log(JSON.stringify({ event: 'qualified_lead', receivedAt: new Date().toISOString(), ...lead }));
      return json(res, 201, { ok: true });
    } catch (error) {
      if (error.message === 'too_large') return json(res, 413, { error: 'Submission is too large.' });
      return json(res, 400, { error: 'Invalid submission.' });
    }
  }

  if (req.method === 'GET' && url.pathname === '/') {
    return send(res, 200, 'text/html; charset=utf-8', page);
  }

  return json(res, 404, { error: 'Not found' });
});

server.listen(port, '0.0.0.0', () => console.log(`ai-margin-autopsy listening on ${port}`));

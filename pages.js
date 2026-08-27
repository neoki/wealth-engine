import { getIndexData, lastUpdated, publicBenchmarks } from './margin-data.js';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function base({ title, description, canonicalPath, body, extraHead = '', script = '' }) {
  const canonical = `https://wealth-engine-production-e178.up.railway.app${canonicalPath}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  ${extraHead}
  <style>
    :root{--bg:#080a0e;--panel:#11151c;--panel2:#171d26;--line:#29313d;--text:#f7f8fa;--muted:#9aa5b4;--acid:#b8ff65;--warn:#ffcb66;--red:#ff7b7b;--max:1160px}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 80% 0,#172413 0,transparent 27%),var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit}.wrap{width:min(var(--max),calc(100% - 36px));margin:auto}.nav{height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{font-size:18px;font-weight:950;letter-spacing:-.045em;text-decoration:none}.links{display:flex;align-items:center;gap:18px;color:var(--muted);font-size:14px}.links a{text-decoration:none}.links a:hover{color:var(--text)}.pill{display:inline-flex;border:1px solid #40572d;background:#11180d;color:var(--acid);border-radius:999px;padding:8px 12px;font-size:12px;font-weight:850;letter-spacing:.04em}.hero{padding:82px 0 68px}.eyebrow{color:var(--acid);font-size:12px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}.hero h1{max-width:1000px;font-size:clamp(52px,8vw,105px);line-height:.91;letter-spacing:-.077em;margin:18px 0 25px}.hero h1 em{font-style:normal;color:var(--acid)}.lede{max-width:800px;font-size:clamp(19px,2.1vw,26px);line-height:1.48;color:#c8ced8}.cta{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:34px}.btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:11px;background:var(--acid);color:#10150b;padding:15px 20px;font:inherit;font-weight:950;text-decoration:none;cursor:pointer}.btn.secondary{background:transparent;color:var(--text);border:1px solid var(--line)}.micro{font-size:13px;color:var(--muted)}.strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:22px 0;color:var(--muted)}.strip-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.strip strong{display:block;color:var(--text);font-size:23px;margin-bottom:4px}.section{padding:82px 0}.section h2{font-size:clamp(36px,5vw,66px);letter-spacing:-.06em;line-height:1;margin:0 0 36px}.section-intro{max-width:800px;color:var(--muted);font-size:18px;line-height:1.65;margin:-18px 0 36px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:17px}.card{background:linear-gradient(180deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:17px;padding:24px}.card .kicker{color:var(--acid);font-size:12px;font-weight:950;letter-spacing:.13em;text-transform:uppercase}.card h3{font-size:24px;letter-spacing:-.045em;margin:13px 0 10px}.card p{color:var(--muted);line-height:1.6;margin:0}.offer{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start}.steps{display:grid;gap:14px}.step{border:1px solid var(--line);border-radius:14px;padding:19px;background:#0e1218}.step b{color:var(--acid)}.step p{margin:6px 0 0;color:var(--muted);line-height:1.55}.form-card{background:linear-gradient(180deg,#161c24,#0e1218);border:1px solid var(--line);border-radius:18px;padding:25px}form{display:grid;gap:13px}.row{display:grid;grid-template-columns:1fr 1fr;gap:13px}label{display:grid;gap:7px;color:#cbd2dc;font-size:13px;font-weight:800}input,select,textarea{width:100%;border:1px solid #303846;border-radius:10px;background:#090c11;color:var(--text);padding:13px 14px;font:inherit;outline:none}input:focus,select:focus,textarea:focus{border-color:var(--acid)}textarea{min-height:100px;resize:vertical}.hp{position:absolute;left:-9999px}.notice{min-height:21px;color:var(--muted);font-size:13px}.notice.ok{color:var(--acid)}.notice.err{color:var(--red)}.terms{font-size:12px;color:#778292;line-height:1.5}.table-wrap{overflow:auto;border:1px solid var(--line);border-radius:16px;background:#0d1117}table{width:100%;border-collapse:collapse;min-width:930px}th,td{text-align:left;padding:16px 15px;border-bottom:1px solid var(--line);vertical-align:top}th{position:sticky;top:0;background:#141a22;color:#aeb8c5;font-size:11px;text-transform:uppercase;letter-spacing:.1em}td{font-size:14px}tbody tr:hover{background:#121821}.company{font-weight:900}.dim{color:var(--muted)}.number{font-variant-numeric:tabular-nums;white-space:nowrap}.ceiling{color:var(--acid);font-weight:950}.pressure{font-weight:900;color:var(--warn)}.source{font-size:12px;color:#aeb8c5}.source a{color:var(--acid)}.method{display:grid;grid-template-columns:1.1fr .9fr;gap:20px}.formula{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#090c11;border:1px solid var(--line);border-radius:13px;padding:20px;color:#dce3eb;line-height:1.7}.benchmark{display:grid;grid-template-columns:repeat(2,1fr);gap:17px}.benchmark strong{display:block;font-size:30px;color:var(--acid);margin:10px 0}.disclaimer{border-left:3px solid var(--warn);background:#17140d;padding:18px 20px;color:#c9c0ad;line-height:1.55}.footer{border-top:1px solid var(--line);padding:32px 0 52px;color:#748091;font-size:13px}.footer-row{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
    @media(max-width:850px){.links{display:none}.strip-grid,.grid3,.offer,.method,.benchmark{grid-template-columns:1fr}.row{grid-template-columns:1fr}.hero{padding-top:52px}.hero h1{font-size:58px}.section{padding:66px 0}}
  </style>
</head>
<body>
  <header class="wrap nav"><a class="brand" href="/">AI Margin Autopsy</a><nav class="links"><a href="/voice-margin-index">Voice Margin Index</a><a href="/#audit">Request audit</a><span class="pill">Evidence first</span></nav></header>
  ${body}
  <footer class="footer"><div class="wrap footer-row"><span>AI Margin Autopsy</span><span>No cookies · no trackers · no credentials requested</span></div></footer>
  ${script ? `<script>${script}</script>` : ''}
</body>
</html>`;
}

export function landingPage() {
  const body = `<main>
    <section class="wrap hero">
      <div class="eyebrow">Margin intelligence for AI products</div>
      <h1>Revenue grows. Your <em>margin disappears.</em></h1>
      <p class="lede">We identify the users, features, prompts and model calls that quietly turn growth into losses — then verify the saving against the next provider invoice.</p>
      <div class="cta"><a class="btn" href="#audit">Request a free evidence review</a><a class="btn secondary" href="/voice-margin-index">Open the Voice Margin Index</a></div>
    </section>
    <div class="strip"><div class="wrap strip-grid"><div><strong>No API keys</strong>Billing exports and privacy-safe usage maps.</div><div><strong>No retainer</strong>We charge only on verified savings.</div><div><strong>No theatre</strong>A ranked ledger, not a deck.</div></div></div>
    <section class="wrap section">
      <h2>Three places margin hides.</h2>
      <div class="grid3">
        <article class="card"><span class="kicker">Whales</span><h3>Loss-making accounts</h3><p>Find users whose token, image, audio or agent-loop cost exceeds the revenue attached to them.</p></article>
        <article class="card"><span class="kicker">Mismatch</span><h3>Wrong model, wrong job</h3><p>Locate routine work running on frontier models and rank substitutions by savings and quality risk.</p></article>
        <article class="card"><span class="kicker">Waste</span><h3>Retries, loops and context</h3><p>Surface duplicate context, runaway tools, avoidable outputs, missing batching and cache misses.</p></article>
      </div>
    </section>
    <section class="wrap section offer" id="audit">
      <div>
        <div class="eyebrow">The engagement</div>
        <h2>One export. One ledger. One number that survives scrutiny.</h2>
        <div class="steps">
          <div class="step"><b>1 · Evidence review</b><p>We inspect provider invoices and a privacy-safe usage export. No credentials.</p></div>
          <div class="step"><b>2 · Margin autopsy</b><p>Each finding has a baseline, intervention, expected saving, implementation effort and verification method.</p></div>
          <div class="step"><b>3 · Verified fee</b><p>If the saving does not appear in the bill, our fee does not appear either.</p></div>
        </div>
      </div>
      <div class="form-card">
        <h3>Request the free review</h3>
        <p class="micro">We will tell you whether the evidence contains enough signal for a paid engagement.</p>
        <form id="leadForm" novalidate>
          <div class="row"><label>Work email<input name="email" type="email" autocomplete="email" required placeholder="you@company.com"></label><label>Company or product<input name="company" required maxlength="120" placeholder="Acme AI"></label></div>
          <div class="row"><label>Monthly model spend<select name="spend" required><option value="">Select</option><option>$2k–$10k</option><option>$10k–$50k</option><option>$50k–$250k</option><option>$250k+</option><option>Not sure</option></select></label><label>Main provider<select name="provider" required><option value="">Select</option><option>OpenAI</option><option>Anthropic</option><option>Google / Vertex</option><option>AWS Bedrock</option><option>Azure OpenAI</option><option>OpenRouter / multi-provider</option><option>Other</option></select></label></div>
          <label>What is worrying you?<textarea name="note" maxlength="1000" placeholder="Flat-rate plan, rising agent costs, no per-user attribution..."></textarea></label>
          <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
          <button class="btn" type="submit">Request review</button>
          <div id="formNotice" class="notice" role="status" aria-live="polite"></div>
          <p class="terms">Do not submit credentials, prompts, customer data or billing files here.</p>
        </form>
      </div>
    </section>
  </main>`;

  const script = `const form=document.getElementById('leadForm');const notice=document.getElementById('formNotice');form.addEventListener('submit',async(event)=>{event.preventDefault();notice.className='notice';notice.textContent='Sending…';const payload=Object.fromEntries(new FormData(form).entries());try{const response=await fetch('/lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to submit');form.reset();notice.className='notice ok';notice.textContent='Received. We will review the signal and contact you.'}catch(error){notice.className='notice err';notice.textContent=error.message||'Unable to submit. Please try again.'}});`;

  return base({
    title: 'AI Margin Autopsy — Find avoidable AI spend',
    description: 'An evidence-first AI cost and margin audit. No API keys, no retainer, and fees tied to verified savings.',
    canonicalPath: '/',
    body,
    script
  });
}

function formatMoney(value, symbol, digits = 4) {
  return `${symbol}${value.toFixed(digits)}`;
}

function planRows() {
  return getIndexData()
    .sort((a, b) => a.currency.localeCompare(b.currency) || a.costCeiling - b.costCeiling)
    .map((item) => {
      const pressure = item.referenceCompression
        ? `${item.referenceCompression.toFixed(1)}× below $0.09`
        : 'Local-currency view';
      return `<tr>
        <td><div class="company">${escapeHtml(item.company)}</div><div class="dim">${escapeHtml(item.plan)}</div></td>
        <td class="number">${item.symbol}${item.price.toLocaleString('en-US')}</td>
        <td class="number">${item.minutes.toLocaleString('en-US')}</td>
        <td class="number">${formatMoney(item.revenuePerMinute, item.symbol)}</td>
        <td class="number ceiling">${formatMoney(item.costCeiling, item.symbol)}</td>
        <td class="pressure">${escapeHtml(pressure)}</td>
        <td class="source"><a href="${item.source}" rel="nofollow noopener" target="_blank">Source</a><br>${escapeHtml(item.note)}</td>
      </tr>`;
    })
    .join('');
}

export function marginIndexPage() {
  const data = getIndexData();
  const lowest = data.filter((item) => item.currency === 'USD').sort((a, b) => a.costCeiling - b.costCeiling)[0];
  const extraHead = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Voice Margin Index',
    description: 'A reproducible calculation of full-use revenue per included voice minute and the variable-cost ceiling compatible with a 70% gross margin.',
    dateModified: lastUpdated,
    creator: { '@type': 'Organization', name: 'AI Margin Autopsy' },
    license: 'https://creativecommons.org/licenses/by/4.0/'
  })}</script>`;

  const benchmarks = publicBenchmarks.map((item) => `<article class="card"><span class="kicker">Public infrastructure reference</span><h3>${escapeHtml(item.vendor)}</h3><strong>${escapeHtml(item.value)}</strong><p>${escapeHtml(item.detail)}</p><p class="source"><a href="${item.source}" rel="nofollow noopener" target="_blank">Open source</a></p></article>`).join('');

  const body = `<main>
    <section class="wrap hero">
      <div class="eyebrow">Public dataset · updated ${lastUpdated}</div>
      <h1>The <em>Voice Margin Index.</em></h1>
      <p class="lede">A plan can look profitable until every included minute gets used. This index turns public pricing into one hard number: the maximum all-in variable cost per minute compatible with a 70% gross margin.</p>
      <div class="cta"><a class="btn" href="#index">Open the index</a><a class="btn secondary" href="/#audit">Audit my real margin</a></div>
    </section>
    <div class="strip"><div class="wrap strip-grid"><div><strong>${data.length}</strong>public plan configurations</div><div><strong>${new Set(data.map((item) => item.company)).size}</strong>AI voice products</div><div><strong>${formatMoney(lowest.costCeiling, lowest.symbol)}</strong>lowest USD cost ceiling</div></div></div>
    <section class="wrap section method">
      <div><h2>One formula exposes the constraint.</h2><p class="section-intro">The calculation does not estimate a vendor's actual costs or utilization. It asks what must be true if a customer consumes the entire published allowance.</p></div>
      <div class="formula">revenue_per_minute = monthly_price / included_minutes<br><br>70%_margin_cost_ceiling = revenue_per_minute × 30%</div>
    </section>
    <section class="wrap section" id="index">
      <h2>Published plans, normalized.</h2>
      <p class="section-intro">“Pressure” compares USD cost ceilings with a conservative $0.09/min public all-in reference. A gap is not proof of weak economics: lower utilization, negotiated infrastructure, mixed credit use, setup fees and other revenue can change the result.</p>
      <div class="table-wrap"><table><thead><tr><th>Company / plan</th><th>Monthly price</th><th>Included voice min</th><th>Revenue / min at full use</th><th>Max variable cost / min at 70% margin</th><th>Reference pressure</th><th>Evidence</th></tr></thead><tbody>${planRows()}</tbody></table></div>
    </section>
    <section class="wrap section">
      <h2>The public cost reference.</h2>
      <p class="section-intro">These are supplier-side published figures, not assumptions invented by this index.</p>
      <div class="benchmark">${benchmarks}</div>
    </section>
    <section class="wrap section">
      <div class="disclaimer"><b>Read this correctly.</b> This dataset does not claim any listed company is unprofitable. It reveals the cost ceiling created by its public allowance under a full-use scenario. Actual gross margin requires private usage, telephony, provider, discount, support, setup-fee and revenue data.</div>
      <div class="cta"><a class="btn" href="/#audit">Replace the public estimate with your real ledger</a><a class="btn secondary" href="/voice-margin-index.json">Download JSON</a></div>
    </section>
  </main>`;

  return base({
    title: 'Voice Margin Index 2026 — AI voice plan economics',
    description: 'Public AI voice pricing normalized into revenue per minute and the cost ceiling compatible with a 70% gross margin.',
    canonicalPath: '/voice-margin-index',
    body,
    extraHead
  });
}

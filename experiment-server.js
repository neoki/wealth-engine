import http from 'node:http';

const port = Number(process.env.PORT || 3000);
const id = process.env.EXPERIMENT_ID || 'mcp-audit';
const startedAt = new Date().toISOString();
const metrics = { visits: 0, intents: 0 };

const experiments = {
  'mcp-audit': {
    title: 'MCP Discovery & Reliability Audit',
    price: '€49 one-time',
    promise: 'Find out whether agents can discover, connect to and use your public MCP server — with an evidence-backed remediation report.',
    buyer: 'Operators of public remote MCP servers',
    deliverable: ['MCP initialize/handshake test','tools/list compatibility','machine-readable discovery surface','registry/directory visibility','crawler/probe visibility signals','prioritized remediation actions'],
    cta: 'Request the €49 audit',
    issueNumber: 3
  },
  'x402-readiness': {
    title: 'x402 Buyer Compatibility Fix',
    price: '€39 one-time',
    promise: 'Find the interoperability issue that makes generic autonomous buyers bounce — and get the concrete remediation needed to enter a standard payment flow.',
    buyer: 'x402 API sellers with live or near-live paid endpoints',
    deliverable: ['buyer-facing 402 challenge check','PAYMENT-REQUIRED / PAYMENT-SIGNATURE compatibility review','discovery metadata and network checks','facilitator and quote consistency review','specific remediation or adapter guidance','post-fix public-surface recheck'],
    cta: 'Fix buyer compatibility — €39',
    issueNumber: 4
  },
  'voice-pricing': {
    title: 'Voice-AI Margin Intelligence',
    price: '€29/month founding price',
    promise: 'Know the all-in provider economics behind every client minute so pricing changes do not silently eat your agency margin.',
    buyer: 'Voice-AI agencies, integrators and procurement teams',
    deliverable: ['verified provider cost snapshot','normalized all-in cost comparison','pricing-change alerts','margin ceilings by client selling price'],
    cta: 'Request founding access',
    issueNumber: 5
  }
};

const exp = experiments[id] || experiments['mcp-audit'];
const issueUrl = `https://github.com/neoki/wealth-engine/issues/${exp.issueNumber}`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const page = () => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(exp.title)}</title><style>body{font-family:system-ui;max-width:760px;margin:60px auto;padding:0 20px;line-height:1.55;color:#161616}h1{font-size:2.4rem;line-height:1.05}.price{font-size:1.4rem;font-weight:700}.box{background:#f4f4f4;padding:20px;border-radius:14px;margin:24px 0}button{font:inherit;font-weight:700;padding:13px 18px;border:0;border-radius:10px;background:#111;color:white;cursor:pointer}small{color:#666}</style></head><body><small>Wealth Engine experiment · ${esc(id)}</small><h1>${esc(exp.title)}</h1><p>${esc(exp.promise)}</p><p class="price">${esc(exp.price)}</p><div class="box"><strong>For:</strong> ${esc(exp.buyer)}<ul>${exp.deliverable.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><button onclick="const b=this;b.disabled=true;fetch('/api/intent',{method:'POST'}).finally(()=>{window.location.href='${issueUrl}'})">${esc(exp.cta)}</button><p><small>Clicking records purchase intent and opens the request thread. No automatic charge yet; fulfilment is manual while demand is validated.</small></p></body></html>`;

const server = http.createServer((req,res)=>{
  const u = new URL(req.url || '/', 'http://localhost');
  if(req.method==='GET' && u.pathname==='/health') {res.writeHead(200,{'content-type':'application/json'});return res.end(JSON.stringify({ok:true,experiment:id,startedAt}));}
  if(req.method==='GET' && u.pathname==='/api/status') {res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'});return res.end(JSON.stringify({experiment:id,...exp,issueUrl,metrics,startedAt}));}
  if(req.method==='POST' && u.pathname==='/api/intent') {metrics.intents++;res.writeHead(202,{'content-type':'application/json','cache-control':'no-store'});return res.end(JSON.stringify({accepted:true,charged:false,experiment:id,price:exp.price,issueUrl}));}
  if(req.method==='GET' && u.pathname==='/') {metrics.visits++;res.writeHead(200,{'content-type':'text/html; charset=utf-8'});return res.end(page());}
  res.writeHead(404,{'content-type':'application/json'});res.end(JSON.stringify({error:'not_found'}));
});
server.listen(port,'0.0.0.0',()=>console.log(`experiment ${id} listening on ${port}`));

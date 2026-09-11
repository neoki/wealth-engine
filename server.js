import http from 'node:http';
import { getIndexData, lastUpdated, publicBenchmarks } from './margin-data.js';
import { getEconomicOpportunities } from './opportunities.js';
import { discoverOpportunities } from './discovery-engine.js';
import { ingestLiveSignals, liveSignalSources } from './live-signal-ingestion.js';
import { landingPage } from './pages.js';

const VERSION='0.9.1';
const port=Number(process.env.PORT||3000);
const publicUrl=String(process.env.PUBLIC_URL||'https://wealth-engine-production-e178.up.railway.app').replace(/\/$/,'');
const usage={startedAt:new Date().toISOString(),calls:0,capabilities:0,index:0,opportunities:0,liveScans:0,paidIntent:0,mcpAuditIntent:0,mcp:0,traffic:{humanBrowser:0,automationOrCrawler:0,mcp:0,unknown:0,internal:0}};
const headers={'access-control-allow-origin':'*','access-control-allow-headers':'content-type,mcp-session-id,x-wealth-internal','content-security-policy':"default-src 'self'; style-src 'self' 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",'x-content-type-options':'nosniff','x-frame-options':'DENY'};
function send(res,status,type,body,cache='no-store'){res.writeHead(status,{...headers,'content-type':type,'cache-control':cache});res.end(body)}
function json(res,status,payload,cache='no-store'){send(res,status,'application/json; charset=utf-8',JSON.stringify(payload),cache)}
function readJson(req){return new Promise((resolve,reject)=>{let raw='';req.setEncoding('utf8');req.on('data',c=>{raw+=c;if(raw.length>100000){reject(new Error('too_large'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'))}catch{reject(new Error('invalid_json'))}});req.on('error',reject);});}
function mcpResult(id,result){return{jsonrpc:'2.0',id,result}}function mcpError(id,code,message){return{jsonrpc:'2.0',id,error:{code,message}}}
function voiceIndexPayload(){return{title:'Voice Margin Index',lastUpdated,plans:getIndexData(),publicBenchmarks}}
async function liveScan(){const ingestion=await ingestLiveSignals();return{...ingestion,opportunities:discoverOpportunities(ingestion.signals),policy:'Live discoveries are hypotheses derived automatically from fetched machine-readable market signals; they are not revenue forecasts.'}}
function classifyTraffic(req,path){
  if(req.headers['x-wealth-internal']==='1') return 'internal';
  if(path==='/mcp') return 'mcp';
  const ua=String(req.headers['user-agent']||'').toLowerCase();
  if(/bot|crawler|spider|curl|wget|python|postman|insomnia|httpie|go-http-client|uptime|healthcheck|monitor/.test(ua)) return 'automationOrCrawler';
  if(/mozilla\//.test(ua)) return 'humanBrowser';
  return 'unknown';
}
function trackTraffic(req,path){
  if(path==='/health'||path==='/usage') return;
  usage.traffic[classifyTraffic(req,path)]++;
}

const voiceOffer={id:'voice-pricing-intelligence-founding',title:'Verified Voice-AI Pricing Intelligence — Founding Access',price:{amount:29,currency:'EUR',cadence:'month'},status:'paid-intent-test'};
const auditOffer={
 id:'mcp-discovery-audit',
 title:'MCP Discovery & Reliability Audit',
 price:{amount:49,currency:'EUR',cadence:'one-time'},
 status:'for-sale',
 buyer:'Remote MCP server operators',
 deliverable:['remote MCP handshake verification','tools/list compatibility check','machine-readable discovery review','registry/directory visibility check','basic crawler/probe visibility review','prioritized remediation report'],
 scope:'One public remote MCP endpoint. No credentials required.',
 fulfillment:'After purchase/request, provide the public MCP endpoint through the GitHub issue tracker. The audit is fulfilled as a concrete written report with evidence and fixes.',
 contact:'https://github.com/neoki/wealth-engine/issues'
};
const auditHtml=`<!doctype html><meta charset="utf-8"><title>${auditOffer.title}</title><main><h1>${auditOffer.title}</h1><p><strong>€49 one-time</strong></p><p>Find out whether machines can actually discover, initialize and understand your public remote MCP server.</p><ul>${auditOffer.deliverable.map(x=>`<li>${x}</li>`).join('')}</ul><p><strong>Scope:</strong> ${auditOffer.scope}</p><p>This is a real manually-fulfilled service, not a subscription or placeholder. No automatic charge is taken on this site yet.</p><form method="post" action="/api/mcp-audit-intent"><button type="submit">Request the €49 audit</button></form><p>To proceed, open an issue with your public MCP endpoint: <a href="${auditOffer.contact}">${auditOffer.contact}</a>.</p></main>`;

const tools=[
{name:'economic_opportunities',title:'Economic Opportunity Engine',description:'Rank economic opportunities from current structured evidence.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
{name:'live_market_scan',title:'Live Autonomous Market Scan',description:'Fetch machine-readable market data live and derive business opportunities without manually entering the signal.',inputSchema:{type:'object',properties:{},additionalProperties:false}},
{name:'voice_margin_index',title:'Voice AI Margin Index',description:'Structured AI voice pricing benchmarks.',inputSchema:{type:'object',properties:{},additionalProperties:false}}
];

const server=http.createServer(async(req,res)=>{const url=new URL(req.url||'/','http://localhost');trackTraffic(req,url.pathname);if(req.method==='OPTIONS'){res.writeHead(204,{...headers,'access-control-allow-methods':'GET,POST,OPTIONS'});return res.end()}
if(req.method==='GET'&&url.pathname==='/health')return json(res,200,{ok:true,service:'wealth-engine',version:VERSION,updated:lastUpdated,liveSignalSources,usage});
if(req.method==='GET'&&url.pathname==='/api/live-scan'){usage.calls++;usage.liveScans++;return json(res,200,await liveScan())}
if(req.method==='GET'&&(url.pathname==='/api/opportunities'||url.pathname==='/opportunities.json')){usage.calls++;usage.opportunities++;return json(res,200,getEconomicOpportunities())}
if(req.method==='GET'&&(url.pathname==='/api/voice-margin-index'||url.pathname==='/voice-margin-index.json')){usage.calls++;usage.index++;return json(res,200,voiceIndexPayload())}
if(req.method==='GET'&&url.pathname==='/api/offers/voice-pricing-intelligence')return json(res,200,{...voiceOffer,intentUrl:`${publicUrl}/api/paid-intent`});
if(req.method==='POST'&&url.pathname==='/api/paid-intent'){usage.calls++;usage.paidIntent++;return json(res,202,{accepted:true,charged:false,offer:voiceOffer.id,price:voiceOffer.price})}
if(req.method==='GET'&&url.pathname==='/offers/mcp-discovery-audit')return send(res,200,'text/html; charset=utf-8',auditHtml,'public, max-age=300');
if(req.method==='GET'&&url.pathname==='/api/offers/mcp-discovery-audit')return json(res,200,{...auditOffer,intentUrl:`${publicUrl}/api/mcp-audit-intent`,page:`${publicUrl}/offers/mcp-discovery-audit`},'public, max-age=300');
if(req.method==='POST'&&url.pathname==='/api/mcp-audit-intent'){usage.calls++;usage.mcpAuditIntent++;return json(res,202,{accepted:true,charged:false,offer:auditOffer.id,price:auditOffer.price,nextStep:'Open an issue at https://github.com/neoki/wealth-engine/issues with the public MCP endpoint to request the audit.'})}
if(req.method==='GET'&&(url.pathname==='/.well-known/agent-capabilities.json'||url.pathname==='/capabilities')){usage.calls++;usage.capabilities++;return json(res,200,{name:'Wealth Engine',version:VERSION,description:'Autonomous economic-opportunity discovery engine.',capabilities:[{id:'live-market-scan',method:'GET',url:`${publicUrl}/api/live-scan`,price:'free'},{id:'economic-opportunities',method:'GET',url:`${publicUrl}/api/opportunities`,price:'free'},{id:'mcp-discovery-audit',method:'GET',url:`${publicUrl}/api/offers/mcp-discovery-audit`,price:'EUR 49 one-time; manually fulfilled'},{id:'mcp',method:'POST',url:`${publicUrl}/mcp`,price:'free'}],mcp:`${publicUrl}/mcp`})}
if(req.method==='POST'&&url.pathname==='/mcp'){usage.calls++;usage.mcp++;try{const body=await readJson(req);const id=body.id??null;if(body.method==='initialize')return json(res,200,mcpResult(id,{protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'wealth-engine',version:VERSION},instructions:'Use live_market_scan to fetch current machine-readable market signals and derive opportunities autonomously.'}));if(body.method==='notifications/initialized')return send(res,202,'application/json; charset=utf-8','');if(body.method==='tools/list')return json(res,200,mcpResult(id,{tools}));if(body.method==='tools/call'&&body.params?.name==='live_market_scan'){const data=await liveScan();return json(res,200,mcpResult(id,{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}))}if(body.method==='tools/call'&&body.params?.name==='economic_opportunities'){const data=getEconomicOpportunities();return json(res,200,mcpResult(id,{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}))}if(body.method==='tools/call'&&body.params?.name==='voice_margin_index'){const data=voiceIndexPayload();return json(res,200,mcpResult(id,{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}))}return json(res,200,mcpError(id,-32601,'Unsupported MCP method'))}catch{return json(res,400,mcpError(null,-32700,'Invalid request'))}}
if(req.method==='GET'&&url.pathname==='/usage')return json(res,200,{...usage,telemetryNote:'Traffic classes are heuristic and reset on deploy. No IP addresses, request bodies or personal identifiers are stored.'});
if(req.method==='GET'&&url.pathname==='/')return send(res,200,'text/html; charset=utf-8',landingPage());
return json(res,404,{error:'Not found'})});server.listen(port,'0.0.0.0',()=>console.log(`wealth-engine listening on ${port}`));

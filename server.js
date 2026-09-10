import http from 'node:http';
import { getIndexData, lastUpdated, publicBenchmarks } from './margin-data.js';
import { getEconomicOpportunities } from './opportunities.js';
import { landingPage, marginIndexPage } from './pages.js';

const port = Number(process.env.PORT || 3000);
const publicUrl = String(process.env.PUBLIC_URL || 'https://wealth-engine-production-e178.up.railway.app').replace(/\/$/, '');
const usage = { startedAt: new Date().toISOString(), calls: 0, capabilities: 0, index: 0, opportunities: 0, mcp: 0 };

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type,mcp-session-id',
  'content-security-policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY'
};
function send(res,status,type,body,cache='no-store'){res.writeHead(status,{...headers,'content-type':type,'cache-control':cache});res.end(body)}
function json(res,status,payload,cache='no-store'){send(res,status,'application/json; charset=utf-8',JSON.stringify(payload),cache)}
function readJson(req){return new Promise((resolve,reject)=>{let raw='';req.setEncoding('utf8');req.on('data',c=>{raw+=c;if(raw.length>100000){reject(new Error('too_large'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'))}catch{reject(new Error('invalid_json'))}});req.on('error',reject);});}
function mcpResult(id,result){return {jsonrpc:'2.0',id,result};}
function mcpError(id,code,message){return {jsonrpc:'2.0',id,error:{code,message}};}
function voiceIndexPayload(){return {title:'Voice Margin Index',lastUpdated,dataQuality:{rowVerification:'Each plan exposes verifiedAt and verificationStatus.',sourceHealth:'Required pricing pages are checked daily for HTTP reachability; reachability does not prove prices are unchanged.'},methodology:{targetGrossMargin:0.7,revenuePerMinute:'monthly price / included voice minutes',costCeiling:'revenue per minute * (1 - target gross margin)'},plans:getIndexData(),publicBenchmarks};}

const tools=[
  {
    name:'voice_margin_index',
    title:'Voice AI Margin Index',
    description:'Structured AI voice retail pricing benchmarks with provenance metadata for comparing providers, revenue per minute, and gross-margin ceilings.',
    inputSchema:{type:'object',properties:{},additionalProperties:false},
    annotations:{title:'Voice AI Margin Index',readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false}
  },
  {
    name:'economic_opportunities',
    title:'Economic Opportunity Engine',
    description:'Rank falsifiable economic opportunities using available market evidence, margin potential, speed, automation and distribution.',
    inputSchema:{type:'object',properties:{},additionalProperties:false},
    annotations:{title:'Economic Opportunity Engine',readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false}
  }
];

const privacyHtml=`<!doctype html><meta charset="utf-8"><title>Wealth Engine Privacy Policy</title><main><h1>Privacy Policy</h1><p>Wealth Engine provides public, read-only economic benchmark data. It does not require accounts, authentication, personal data, conversation history, uploaded files, or user content.</p><p>The service records only aggregate operational counters needed to measure endpoint usage. It does not intentionally store request bodies, prompts, personal identifiers, or conversation content.</p><p>Public benchmark rows may link to third-party pricing pages. Those third parties have their own privacy policies.</p><p>For support or security concerns, use the public GitHub repository issue tracker: github.com/neoki/wealth-engine/issues.</p></main>`;
const supportHtml=`<!doctype html><meta charset="utf-8"><title>Wealth Engine Support</title><main><h1>Support</h1><p>Wealth Engine is a public read-only MCP server for economic opportunity and market intelligence.</p><p>Report product, data-quality, compatibility, or security issues at github.com/neoki/wealth-engine/issues.</p><h2>Troubleshooting</h2><p>The MCP endpoint is ${publicUrl}/mcp and uses Streamable HTTP with JSON-RPC POST requests. A browser GET to /mcp may return 404; that does not indicate MCP failure.</p></main>`;

const server=http.createServer(async(req,res)=>{
  const url=new URL(req.url||'/','http://localhost');
  if(req.method==='OPTIONS'){res.writeHead(204,{...headers,'access-control-allow-methods':'GET,POST,OPTIONS'});return res.end()}
  if(req.method==='GET'&&url.pathname==='/health') return json(res,200,{ok:true,service:'wealth-engine',version:'0.5.1',updated:lastUpdated,usage});
  if(req.method==='GET'&&url.pathname==='/privacy') return send(res,200,'text/html; charset=utf-8',privacyHtml,'public, max-age=3600');
  if(req.method==='GET'&&url.pathname==='/support') return send(res,200,'text/html; charset=utf-8',supportHtml,'public, max-age=3600');
  if(req.method==='GET'&&(url.pathname==='/.well-known/agent-capabilities.json'||url.pathname==='/capabilities')){
    usage.calls++; usage.capabilities++;
    return json(res,200,{name:'Wealth Engine',version:'0.5.1',description:'Economic opportunity intelligence for AI agents.',capabilities:[{id:'economic-opportunities',description:'Rank falsifiable economic opportunities from market evidence.',method:'GET',url:`${publicUrl}/api/opportunities`,price:'free'},{id:'voice-margin-index',description:'Compare AI voice retail pricing with row-level verification metadata, revenue per minute, and gross-margin ceilings.',method:'GET',url:`${publicUrl}/api/voice-margin-index`,price:'free'},{id:'mcp',description:'Remote MCP server for economic opportunity and market intelligence',method:'POST',url:`${publicUrl}/mcp`,price:'free'}],mcp:`${publicUrl}/mcp`,discovery:`${publicUrl}/.well-known/agent-capabilities.json`,privacy:`${publicUrl}/privacy`,support:`${publicUrl}/support`,usage:`${publicUrl}/usage`},'public, max-age=60');
  }
  if(req.method==='GET'&&(url.pathname==='/api/opportunities'||url.pathname==='/opportunities.json')){
    usage.calls++; usage.opportunities++;
    return json(res,200,getEconomicOpportunities(),'public, max-age=300');
  }
  if(req.method==='GET'&&(url.pathname==='/api/voice-margin-index'||url.pathname==='/voice-margin-index.json')){
    usage.calls++; usage.index++;
    return json(res,200,voiceIndexPayload(),'public, max-age=300');
  }
  if(req.method==='POST'&&url.pathname==='/mcp'){
    usage.calls++; usage.mcp++;
    try{
      const body=await readJson(req); const id=body.id??null; const method=body.method;
      if(method==='initialize') return json(res,200,mcpResult(id,{protocolVersion:'2025-06-18',capabilities:{tools:{}},serverInfo:{name:'wealth-engine',version:'0.5.1'},instructions:'Use economic_opportunities to identify ranked, falsifiable paths to economic value. Use voice_margin_index for AI voice pricing, provenance and gross-margin economics. This server is read-only.'}));
      if(method==='notifications/initialized') return send(res,202,'application/json; charset=utf-8','');
      if(method==='tools/list') return json(res,200,mcpResult(id,{tools}));
      if(method==='tools/call'&&body.params?.name==='economic_opportunities') {
        const data=getEconomicOpportunities();
        return json(res,200,mcpResult(id,{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}));
      }
      if(method==='tools/call'&&body.params?.name==='voice_margin_index') {
        const data=voiceIndexPayload();
        return json(res,200,mcpResult(id,{content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data}));
      }
      return json(res,200,mcpError(id,-32601,`Unsupported MCP method: ${String(method||'missing')}. Supported methods are initialize, notifications/initialized, tools/list, and tools/call.`));
    }catch(err){const message=err?.message==='too_large'?'Request body exceeds 100 KB.':err?.message==='invalid_json'?'Request body must be valid JSON-RPC JSON.':'Unable to parse MCP request.';return json(res,400,mcpError(null,-32700,message));}
  }
  if(req.method==='GET'&&url.pathname==='/usage') return json(res,200,usage);
  if(req.method==='GET'&&(url.pathname==='/voice-margin-index'||url.pathname==='/index')) return send(res,200,'text/html; charset=utf-8',marginIndexPage(),'public, max-age=300');
  if(req.method==='GET'&&url.pathname==='/robots.txt') return send(res,200,'text/plain; charset=utf-8',`User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`,'public, max-age=3600');
  if(req.method==='GET'&&url.pathname==='/sitemap.xml') return send(res,200,'application/xml; charset=utf-8',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicUrl}/</loc></url><url><loc>${publicUrl}/voice-margin-index</loc></url><url><loc>${publicUrl}/api/opportunities</loc></url><url><loc>${publicUrl}/privacy</loc></url><url><loc>${publicUrl}/support</loc></url></urlset>`,'public, max-age=3600');
  if(req.method==='GET'&&url.pathname==='/') return send(res,200,'text/html; charset=utf-8',landingPage(),'public, max-age=300');
  return json(res,404,{error:'Not found'});
});
server.listen(port,'0.0.0.0',()=>console.log(`wealth-engine listening on ${port}`));

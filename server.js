import http from 'node:http';
import { getIndexData, lastUpdated, publicBenchmarks } from './margin-data.js';
import { landingPage, marginIndexPage } from './pages.js';

const port = Number(process.env.PORT || 3000);
const publicUrl = String(process.env.PUBLIC_URL || 'https://wealth-engine-production-e178.up.railway.app').replace(/\/$/, '');
const usage = { startedAt: new Date().toISOString(), calls: 0, capabilities: 0, index: 0 };

const headers = {
  'access-control-allow-origin': '*',
  'content-security-policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY'
};
function send(res,status,type,body,cache='no-store'){res.writeHead(status,{...headers,'content-type':type,'cache-control':cache});res.end(body)}
function json(res,status,payload,cache='no-store'){send(res,status,'application/json; charset=utf-8',JSON.stringify(payload),cache)}

const server=http.createServer((req,res)=>{
  const url=new URL(req.url||'/','http://localhost');
  if(req.method==='OPTIONS'){res.writeHead(204,{...headers,'access-control-allow-methods':'GET,OPTIONS'});return res.end()}
  if(req.method==='GET'&&url.pathname==='/health') return json(res,200,{ok:true,service:'wealth-engine',updated:lastUpdated,usage});
  if(req.method==='GET'&&(url.pathname==='/.well-known/agent-capabilities.json'||url.pathname==='/capabilities')){
    usage.calls++; usage.capabilities++;
    return json(res,200,{name:'Wealth Engine',version:'0.3.0',description:'Machine-consumable economic intelligence. Experimental public API.',capabilities:[{id:'voice-margin-index',description:'Compare public AI voice pricing and estimate gross-margin ceilings.',method:'GET',url:`${publicUrl}/api/voice-margin-index`,price:'free'}],discovery:`${publicUrl}/.well-known/agent-capabilities.json`,usage:`${publicUrl}/usage`},'public, max-age=60');
  }
  if(req.method==='GET'&&(url.pathname==='/api/voice-margin-index'||url.pathname==='/voice-margin-index.json')){
    usage.calls++; usage.index++;
    return json(res,200,{title:'Voice Margin Index',lastUpdated,methodology:{targetGrossMargin:0.7,revenuePerMinute:'monthly price / included voice minutes',costCeiling:'revenue per minute * (1 - target gross margin)'},plans:getIndexData(),publicBenchmarks},'public, max-age=300');
  }
  if(req.method==='GET'&&url.pathname==='/usage') return json(res,200,usage);
  if(req.method==='GET'&&(url.pathname==='/voice-margin-index'||url.pathname==='/index')) return send(res,200,'text/html; charset=utf-8',marginIndexPage(),'public, max-age=300');
  if(req.method==='GET'&&url.pathname==='/robots.txt') return send(res,200,'text/plain; charset=utf-8',`User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`,'public, max-age=3600');
  if(req.method==='GET'&&url.pathname==='/sitemap.xml') return send(res,200,'application/xml; charset=utf-8',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicUrl}/</loc></url><url><loc>${publicUrl}/voice-margin-index</loc></url></urlset>`,'public, max-age=3600');
  if(req.method==='GET'&&url.pathname==='/') return send(res,200,'text/html; charset=utf-8',landingPage(),'public, max-age=300');
  return json(res,404,{error:'Not found'});
});
server.listen(port,'0.0.0.0',()=>console.log(`wealth-engine listening on ${port}`));

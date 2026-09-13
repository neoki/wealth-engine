import http from 'node:http';

const PORT = Number(process.env.PORT || 3000);
const asOf = '2026-09-13';
const pilotUrl = 'https://github.com/neoki/wealth-engine/issues/10';

const obligations = [
  {
    id: 'textil-2026-regularizacion',
    status: 'overdue',
    priority: 'critical',
    convenio: 'Industria textil y de la confección',
    regcon: '99004975011981',
    source: 'BOE',
    sourceId: 'BOE-A-2026-6383',
    published: '2026-03-18',
    title: 'Regularizar incremento salarial 3,3 %',
    summary: 'Aplicar el incremento salarial con efectos desde el 1 de enero de 2026 y regularizar atrasos.',
    effectiveFrom: '2026-01-01',
    deadline: '2026-04-30',
    timing: 'fixed_date',
    action: 'Recalcular nóminas afectadas y revisar atrasos.',
    evidence: 'Incremento del 3,3 % con efectos desde 01/01/2026. Pago antes del 30/04/2026.'
  },
  {
    id: 'consultoria-atrasos',
    status: 'needs_context',
    priority: 'high',
    convenio: 'Empresas de consultoría, tecnologías de la información y estudios de mercado',
    regcon: '99001355011983',
    source: 'BOE',
    sourceId: 'BOE-A-2026-9024',
    published: '2026-04-24',
    title: 'Pagar atrasos de actualización salarial',
    summary: 'La fecha exacta depende del calendario de nómina de la empresa; el sistema no inventa un día concreto.',
    effectiveFrom: '2026-01-01',
    deadline: 'Nómina siguiente al mes de publicación',
    timing: 'event_relative',
    action: 'Resolver la fecha con el calendario de nómina y regularizar importes.',
    evidence: 'Los atrasos deben abonarse como máximo en la nómina siguiente a la del mes de publicación.'
  },
  {
    id: 'publicidad-q4',
    status: 'upcoming',
    priority: 'medium',
    convenio: 'Empresas de publicidad',
    regcon: '99004225011981',
    source: 'BOE',
    sourceId: 'BOE-A-2026-18419',
    published: '2026-09-01',
    title: 'Primer pago extraordinario no consolidable',
    summary: 'Primera cuota del calendario extraordinario.',
    effectiveFrom: '2026-01-01',
    deadline: '2026-10-01 → 2026-12-31',
    timing: 'window',
    action: 'Preparar el primer pago dentro del cuarto trimestre de 2026.',
    evidence: 'El pago extraordinario se distribuye en tres hitos; el primero dentro del cuarto trimestre de 2026.'
  },
  {
    id: 'publicidad-2027-04',
    status: 'future',
    priority: 'low',
    convenio: 'Empresas de publicidad',
    regcon: '99004225011981',
    source: 'BOE',
    sourceId: 'BOE-A-2026-18419',
    published: '2026-09-01',
    title: 'Segundo pago extraordinario',
    summary: 'Segunda cuota del calendario extraordinario.',
    effectiveFrom: '2026-01-01',
    deadline: '2027-03-31',
    timing: 'fixed_date',
    action: 'Programar pago antes del 1 de abril de 2027.',
    evidence: 'Segundo pago antes del 1 de abril de 2027.'
  },
  {
    id: 'marketing-ipc',
    status: 'waiting_event',
    priority: 'watch',
    convenio: 'Servicios de campo, reposición y marketing operacional',
    regcon: '99016925012009',
    source: 'BOE',
    sourceId: 'BOE-A-2026-18631',
    published: '2026-09-04',
    title: 'Compensación condicionada al IPC 2026',
    summary: 'Obligación latente: sólo se activa si el IPC definitivo de 2026 supera el 3,5 %, con tope del 3,75 %.',
    effectiveFrom: '2026-01-01',
    deadline: 'Nómina posterior a la publicación del IPC definitivo',
    timing: 'conditional_future_event',
    action: 'Vigilar publicación del IPC definitivo de 2026 y activar el pago si se supera el umbral.',
    evidence: 'Si IPC 2026 > 3,5 %, hasta 3,75 %, nace un pago compensatorio no consolidable.'
  }
];

const counts = obligations.reduce((acc, item) => {
  acc[item.status] = (acc[item.status] || 0) + 1;
  return acc;
}, {});

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Convenio Watch · Rockrai</title>
<style>
:root{--bg:#0b1020;--panel:#121a2f;--panel2:#0f172a;--text:#edf2f7;--muted:#98a6bd;--line:#26324c;--accent:#66e3c4;--warn:#ffcf66;--bad:#ff7c8b;--blue:#7ab8ff;--violet:#b9a2ff}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top right,#16233f 0,#0b1020 42%,#070b14 100%);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}.wrap{max-width:1180px;margin:0 auto;padding:34px 20px 56px}.top{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:26px}.brand{display:flex;gap:14px;align-items:center}.logo{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#66e3c4,#7ab8ff);box-shadow:0 10px 30px rgba(102,227,196,.18)}h1{font-size:28px;margin:0 0 5px;letter-spacing:-.02em}.sub{color:var(--muted);font-size:14px}.badge{border:1px solid #2d3b59;background:rgba(18,26,47,.72);padding:8px 11px;border-radius:999px;color:#bfd0e8;font-size:12px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0 24px}.metric{background:rgba(18,26,47,.82);border:1px solid var(--line);border-radius:16px;padding:16px}.metric .k{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}.metric .v{font-size:28px;font-weight:750;margin-top:6px}.metric .hint{font-size:12px;color:#aebbd0;margin-top:4px}.section{background:rgba(11,16,32,.62);border:1px solid var(--line);border-radius:20px;overflow:hidden;backdrop-filter:blur(10px)}.section-head{padding:18px 20px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:20px;align-items:center}.section-head h2{font-size:16px;margin:0}.filters{display:flex;gap:8px;flex-wrap:wrap}.filter{font-size:12px;padding:7px 10px;border:1px solid #30405f;border-radius:999px;color:#b7c5dc;background:#11182a;cursor:pointer}.filter.active{background:#1b2c3c;border-color:#4e7c83;color:#ddfff7}.list{display:grid}.card{padding:20px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:150px 1fr 245px;gap:20px}.card:last-child{border-bottom:0}.status{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;padding:7px 9px;border-radius:999px;width:max-content}.status.overdue{background:rgba(255,124,139,.12);color:#ff9aa6}.status.needs_context{background:rgba(255,207,102,.12);color:#ffd97f}.status.upcoming{background:rgba(122,184,255,.12);color:#9ecaff}.status.future{background:rgba(185,162,255,.12);color:#c8b7ff}.status.waiting_event{background:rgba(102,227,196,.12);color:#91eed7}.meta{margin-top:11px;color:var(--muted);font-size:12px;line-height:1.6}.title{font-size:17px;font-weight:720;margin-bottom:5px}.summary{color:#bdc8d9;line-height:1.55;font-size:14px}.action{margin-top:12px;padding:11px 12px;border-left:3px solid var(--accent);background:#0f1a25;border-radius:8px;font-size:13px;color:#dce9f3}.right{font-size:12px;color:#aebbd0}.right strong{display:block;color:#eef5ff;font-size:13px;margin-bottom:4px}.evidence{margin-top:12px;color:#8392aa;font-size:11px;line-height:1.55}.foot{margin-top:16px;color:#718098;font-size:11px;text-align:center}.notice{margin:0 0 12px;padding:12px 14px;border-radius:12px;border:1px solid #294253;background:rgba(22,49,62,.42);font-size:12px;color:#c5e9e1}.pilot{display:flex;justify-content:space-between;gap:18px;align-items:center;margin:0 0 18px;padding:15px 16px;border-radius:14px;border:1px solid #35566c;background:rgba(25,52,68,.52);color:#dceaf7;text-decoration:none}.pilot strong{display:block;margin-bottom:3px}.pilot span{color:#a9bbce;font-size:12px}.pilot b{white-space:nowrap;background:var(--accent);color:#07130f;padding:9px 12px;border-radius:10px;font-size:12px}.dot{width:7px;height:7px;border-radius:99px;background:currentColor;display:inline-block}.hidden{display:none}@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}.card{grid-template-columns:1fr}.right{padding-top:2px}.top{flex-direction:column}}@media(max-width:520px){.grid{grid-template-columns:1fr}.wrap{padding:22px 14px}.card{padding:16px}.section-head{align-items:flex-start;flex-direction:column}.pilot{align-items:flex-start;flex-direction:column}}
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <div class="brand"><div class="logo"></div><div><h1>Convenio Watch</h1><div class="sub">Obligaciones laborales detectadas desde publicaciones oficiales · Rockrai</div></div></div>
    <div class="badge">Demo operativa · ${asOf}</div>
  </div>

  <div class="notice">Interfaz de validación sobre casos BOE. El motor distingue obligaciones activas de reglas latentes y no inventa fechas cuando faltan calendarios de nómina o calendarios de días hábiles. No sustituye revisión profesional.</div>
  <a class="pilot" href="${pilotUrl}"><div><strong>¿Gestionas convenios para varias empresas?</strong><span>Estamos validando un piloto con 5–20 códigos REGCON y una cola de obligaciones accionables.</span></div><b>Solicitar piloto →</b></a>

  <div class="grid">
    <div class="metric"><div class="k">Requiere atención</div><div class="v">${(counts.overdue||0)+(counts.needs_context||0)}</div><div class="hint">Vencidas o necesitan contexto</div></div>
    <div class="metric"><div class="k">Próximas</div><div class="v">${counts.upcoming||0}</div><div class="hint">Ventanas ya cercanas</div></div>
    <div class="metric"><div class="k">Futuras</div><div class="v">${counts.future||0}</div><div class="hint">Calendarizadas</div></div>
    <div class="metric"><div class="k">Latentes</div><div class="v">${counts.waiting_event||0}</div><div class="hint">Esperando un evento externo</div></div>
  </div>

  <div class="section">
    <div class="section-head"><h2>Qué requiere atención</h2><div class="filters"><button class="filter active" data-filter="all">Todo</button><button class="filter" data-filter="attention">Atención</button><button class="filter" data-filter="future">Futuro</button><button class="filter" data-filter="waiting_event">Latentes</button></div></div>
    <div class="list" id="list">
      ${obligations.map(o=>`<article class="card" data-status="${o.status}">
        <div><span class="status ${o.status}"><span class="dot"></span>${o.status.replaceAll('_',' ')}</span><div class="meta">${o.source}<br>${o.sourceId}<br>${o.published}</div></div>
        <div><div class="title">${o.title}</div><div class="summary">${o.summary}</div><div class="action"><strong>Acción:</strong> ${o.action}</div><div class="evidence">Evidencia: ${o.evidence}</div></div>
        <div class="right"><strong>${o.convenio}</strong>REGCON ${o.regcon}<br><br><strong>Vigencia</strong>${o.effectiveFrom}<br><br><strong>Plazo</strong>${o.deadline}<br><span style="color:#7f90aa">${o.timing}</span></div>
      </article>`).join('')}
    </div>
  </div>
  <div class="foot">Convenio Watch · experimento de Wealth Engine bajo el paraguas Rockrai</div>
</div>
<script>
const buttons=[...document.querySelectorAll('.filter')];const cards=[...document.querySelectorAll('.card')];
buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;cards.forEach(c=>{const s=c.dataset.status;const show=f==='all'||f===s||(f==='attention'&&(s==='overdue'||s==='needs_context'))||(f==='future'&&(s==='future'||s==='upcoming'));c.classList.toggle('hidden',!show)})}));
</script>
</body></html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'content-type':'application/json'});
    return res.end(JSON.stringify({ok:true, service:'convenio-watch-web'}));
  }
  if (req.url === '/api/obligations') {
    res.writeHead(200, {'content-type':'application/json; charset=utf-8','cache-control':'no-store'});
    return res.end(JSON.stringify({asOf, obligations}, null, 2));
  }
  res.writeHead(200, {'content-type':'text/html; charset=utf-8','cache-control':'no-store'});
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => console.log(`Convenio Watch listening on ${PORT}`));

import { extractFromBoeUrl } from './convenio-watch-extractor-v3.mjs';
import { validateObligationTemplate, applyEventToTemplates } from './convenio-watch-obligation-template-engine.mjs';
import { buildPortfolio } from './convenio-watch-portfolio-engine.mjs';

async function checkGoldcarComplaint(){
  const url='https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-18629';
  const extracted=await extractFromBoeUrl(url);
  const templates=extracted.obligationTemplates??[];
  if(templates.length!==1) throw new Error(`expected exactly one Goldcar template, got ${templates.length}`);
  const template=templates[0];
  const errors=validateObligationTemplate(template);
  if(errors.length) throw new Error(`invalid extracted Goldcar template: ${errors.join('; ')}`);
  if(template.trigger?.eventType!=='official_complaint_received') throw new Error(`wrong Goldcar trigger: ${template.trigger?.eventType}`);
  if(template.instance?.deadline?.offset?.value!==30||template.instance?.deadline?.offset?.unit!=='days') throw new Error(`wrong Goldcar deadline offset: ${JSON.stringify(template.instance?.deadline?.offset)}`);

  const event={eventId:'goldcar-live-regression-2026-09-13',eventType:'official_complaint_received',occurredAt:'2026-09-13T10:00:00+02:00'};
  const materialized=applyEventToTemplates(templates,event);
  if(materialized.created.length!==1) throw new Error(`expected one Goldcar materialized obligation, got ${materialized.created.length}`);
  if(materialized.created[0].deadline?.resolvedCalendarDate!=='2026-10-13') throw new Error(`wrong Goldcar materialized deadline: ${materialized.created[0].deadline?.resolvedCalendarDate}`);
  const portfolio=buildPortfolio(materialized.obligations,'2026-09-13',{events:{}},{upcomingDays:30});
  if(portfolio.totalPortfolioItems!==1||portfolio.items[0]?.category!=='upcoming') throw new Error(`wrong Goldcar portfolio: ${JSON.stringify(portfolio)}`);
  return {sourceId:extracted.sourceId,templateId:template.templateId,eventType:template.trigger.eventType,dueDate:materialized.created[0].deadline.resolvedCalendarDate,portfolioCategory:portfolio.items[0].category};
}

async function checkRequestResolution(){
  const url='https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-11688';
  const extracted=await extractFromBoeUrl(url);
  const templates=(extracted.obligationTemplates??[]).filter(item=>item.trigger?.eventType==='request_submitted');
  if(templates.length!==1) throw new Error(`expected exactly one request-resolution template, got ${templates.length}`);
  const template=templates[0];
  const errors=validateObligationTemplate(template);
  if(errors.length) throw new Error(`invalid request-resolution template: ${errors.join('; ')}`);
  if(template.instance?.type!=='request_resolution_duty'||template.instance?.action!=='resolve_request') throw new Error(`wrong request-resolution semantics: ${JSON.stringify(template.instance)}`);
  if(template.instance?.deadline?.offset?.value!==1||template.instance?.deadline?.offset?.unit!=='months') throw new Error(`wrong request-resolution deadline offset: ${JSON.stringify(template.instance?.deadline?.offset)}`);

  const event={eventId:'dispensa-request-2026-09-13-A',eventType:'request_submitted',occurredAt:'2026-09-13T11:00:00+02:00'};
  const materialized=applyEventToTemplates(templates,event);
  if(materialized.created.length!==1) throw new Error(`expected one request obligation, got ${materialized.created.length}`);
  if(materialized.created[0].deadline?.resolvedCalendarDate!=='2026-10-13') throw new Error(`wrong request-resolution materialized deadline: ${materialized.created[0].deadline?.resolvedCalendarDate}`);
  const portfolio=buildPortfolio(materialized.obligations,'2026-09-13',{events:{}},{upcomingDays:40});
  if(portfolio.totalPortfolioItems!==1||portfolio.items[0]?.category!=='upcoming') throw new Error(`wrong request-resolution portfolio: ${JSON.stringify(portfolio)}`);
  return {sourceId:extracted.sourceId,templateId:template.templateId,eventType:template.trigger.eventType,dueDate:materialized.created[0].deadline.resolvedCalendarDate,portfolioCategory:portfolio.items[0].category};
}

const goldcar=await checkGoldcarComplaint();
const requestResolution=await checkRequestResolution();
console.log(JSON.stringify({ok:true,families:2,goldcar,requestResolution},null,2));

import { extractFromBoeUrl as extractV2 } from './convenio-watch-extractor-v2.mjs';
import { fetchBoeText } from './convenio-watch-extractor-v0.mjs';
import { canonicalizeObligations } from './convenio-watch-obligation-model.mjs';
import { canonicalizeObligationTemplates } from './convenio-watch-obligation-template-engine.mjs';

const MONTHS = { enero:'01', febrero:'02', marzo:'03', abril:'04', mayo:'05', junio:'06', julio:'07', agosto:'08', septiembre:'09', setiembre:'09', octubre:'10', noviembre:'11', diciembre:'12' };
const SPANISH_NUMBERS = { un:1, una:1, uno:1, dos:2, tres:3, cuatro:4, cinco:5, seis:6, siete:7, ocho:8, nueve:9, diez:10, once:11, doce:12, trece:13, catorce:14, quince:15, dieciseis:16, dieciséis:16, diecisiete:17, dieciocho:18, diecinueve:19, veinte:20, veinticuatro:24, treinta:30 };

function isoDate(raw) { if (!raw) return null; const cleaned=raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); const m=cleaned.match(/(\d{1,2})\s+de\s+([a-z]+)\s+(?:de|del)\s+(\d{4})/); return (!m||!MONTHS[m[2]])?null:`${m[3]}-${MONTHS[m[2]]}-${String(Number(m[1])).padStart(2,'0')}`; }
function addMonths(iso, months) { if(!iso||!Number.isFinite(months)) return null; const d=new Date(`${iso}T00:00:00Z`); if(Number.isNaN(d.getTime())) return null; const day=d.getUTCDate(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth()+months); const lastDay=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate(); d.setUTCDate(Math.min(day,lastDay)); return d.toISOString().slice(0,10); }
function numberValue(raw) { const cleaned=String(raw).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); return /^\d+$/.test(cleaned)?Number(cleaned):(SPANISH_NUMBERS[cleaned]??null); }
function normalizedUnit(raw){const cleaned=String(raw).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');if(/dia(?:s)?\s+(?:habil|laborable)/.test(cleaned))return'business_days';if(cleaned.startsWith('dia'))return'days';if(cleaned.startsWith('semana'))return'weeks';if(cleaned.startsWith('mes'))return'months';if(cleaned.startsWith('ano'))return'years';return null;}
function quarterWindow(q,year){const starts={1:'01-01',2:'04-01',3:'07-01',4:'10-01'},ends={1:'03-31',2:'06-30',3:'09-30',4:'12-31'};return{type:'calendar_window',startDate:`${year}-${starts[q]}`,endDate:`${year}-${ends[q]}`,resolvedCalendarDate:null};}

function extractInstallmentObligation(text){const intro=text.match(/(?:importe|pago) extraordinario[\s\S]{0,900}?en\s+(\w+)\s+pagos?\s+no\s+consolidables?[\s\S]{0,250}?calendario\s*:/i);if(!intro)return null;const segment=text.slice(intro.index??0,(intro.index??0)+1800),installments=[];for(const m of segment.matchAll(/(?:primer|segundo|tercer|cuarto|quinto)\s+pago\s*:\s*dentro\s+del\s+(primer|segundo|tercer|cuarto)\s+trimestre\s+de\s+(20\d{2})/gi)){const q={primer:1,segundo:2,tercer:3,cuarto:4}[m[1].toLowerCase()];installments.push({sequence:installments.length+1,deadline:quarterWindow(q,Number(m[2]))});}for(const m of segment.matchAll(/(?:primer|segundo|tercer|cuarto|quinto)\s+pago\s*:\s*antes\s+del\s+(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+(?:de|del)\s+20\d{2})/gi)){installments.push({sequence:installments.length+1,deadline:{type:'fixed_date',resolvedCalendarDate:isoDate(m[1]),exclusive:true}});}installments.sort((a,b)=>(a.deadline.resolvedCalendarDate??a.deadline.startDate??'').localeCompare(b.deadline.resolvedCalendarDate??b.deadline.startDate??''));installments.forEach((x,i)=>{x.sequence=i+1;});if(installments.length<2)return null;return{type:'extraordinary_payment_schedule',action:'pay_extraordinary_amount',consolidable:/(?:pagos?|cantidades)[^.!?]{0,220}?no\s+(?:tendr[aá]n\s+car[aá]cter\s+)?consolidable|no\s+consolidables/i.test(segment)?false:null,installments,status:'active'};}
function agreementSignatureDate(text){const m=text.match(/(?:ha\s+sido|fue)\s+suscrit[oa]\s+(?:en\s+fecha\s+|el\s+)?(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+\s+(?:de\s+)?20\d{2})/i);return isoDate(m?.[1]??null);}
function publicationStartsCurrentText(text){return/(?:periodo\s+de\s+)?vigencia[^.]{0,180}?desde\s+(?:el\s+momento\s+de\s+)?la\s+publicaci[oó]n\s+del\s+presente\s+texto\s+en\s+el\s+BOE/i.test(text);}
function cleanDutyDescription(raw){return raw.replace(/^\s*[–—-]\s*/,'').replace(/\s+/g,' ').trim();}
function extractImplementationDuties(text,base){const obligations=[],signatureDate=agreementSignatureDate(text),planEntryDate=publicationStartsCurrentText(text)?base.publicationDate:null,numberPattern='(?:\\d{1,2}|un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|diecis[eé]is|diecisiete|dieciocho|diecinueve|veinte|veinticuatro)';const re=new RegExp(`([^\\n.]{18,520}?)\\s+en\\s+(?:un\\s+)?(?:m[aá]ximo\\s+de|plazo\\s+de)\\s+(${numberPattern})\\s+mes(?:es)?\\s+(?:a\\s+contar\\s+)?desde\\s+(la\\s+firma\\s+del\\s+presente\\s+acuerdo|la\\s+entrada\\s+en\\s+vigor\\s+del\\s+presente\\s+plan)`,'gi'),scanText=text.replace(/\betc\.\s*(?=[),])/gi,'etc');for(const m of scanText.matchAll(re)){const months=numberValue(m[2]);if(!months)continue;const anchorText=m[3].toLowerCase(),anchorEvent=anchorText.includes('firma')?'signature_of_current_agreement':'entry_into_force_current_plan',anchorDate=anchorEvent==='signature_of_current_agreement'?signatureDate:planEntryDate;obligations.push({type:'implementation_duty',action:'complete_required_measure',description:cleanDutyDescription(m[1]),deadline:{type:'event_relative',anchorEvent,offset:{value:months,unit:'months'},resolvedCalendarDate:addMonths(anchorDate,months)},status:'active',evidence:[m[0].replace(/\s+/g,' ').trim()]});}return obligations;}

function pushTemplate(templates,m,trigger,instanceType,action,description,value,unit){
  if(!value||!unit)return;
  templates.push({trigger:{eventType:trigger},instance:{type:instanceType,action,description,deadline:{type:'event_relative',anchorEvent:trigger,offset:{value,unit}}},evidence:[m[0].replace(/\s+/g,' ').trim()]});
}

// Extract rules that should remain dormant until a business event occurs.
// Deliberately narrow: false-positive templates are worse than missed templates because
// a template can later materialize operational tasks.
export function extractProceduralTemplatesFromText(text){
  const templates=[];
  const complaintRe=/(?:en\s+el\s+plazo\s+de|dentro\s+del\s+plazo\s+de)\s+(\d{1,3}|[a-záéíóú]+)\s+d[ií]as\s+naturales\s+desde\s+que\s+se\s+tenga\s+conocimiento\s+oficial\s+de\s+la\s+denuncia[^.]{0,220}?(?:se\s+resolver[aá]|resolver[aá])\s+(?:dicho\s+)?expediente/gi;
  for(const m of text.matchAll(complaintRe)){
    pushTemplate(templates,m,'official_complaint_received','complaint_resolution_duty','resolve_informational_file','Resolver el expediente informativo tras conocimiento oficial de una denuncia',numberValue(m[1]),'days');
  }

  const requestResolutionRe=/(?:resolviendo|resolver[aá])\s+en\s+el\s+plazo\s+de\s+(\d{1,3}|[a-záéíóú]+)\s+(d[ií]as?|semanas?|mes(?:es)?|a[nñ]os?)\s+desde\s+(?:la\s+fecha\s+de\s+)?(?:presentaci[oó]n\s+de\s+)?la\s+solicitud/gi;
  for(const m of text.matchAll(requestResolutionRe)){
    pushTemplate(templates,m,'request_submitted','request_resolution_duty','resolve_request','Resolver una solicitud dentro del plazo normativo',numberValue(m[1]),normalizedUnit(m[2]));
  }

  const commissionConstitutionRe=/(?:comisi[oó]n[^.]{0,120}?)se\s+constituir[aá]\s+en\s+el\s+plazo\s+m[aá]ximo\s+de\s+(\d{1,3}|[a-záéíóú]+)\s+d[ií]as\s+tras\s+la\s+solicitud\s+expresa/gi;
  for(const m of text.matchAll(commissionConstitutionRe)){
    pushTemplate(templates,m,'explicit_request_received','commission_constitution_duty','constitute_redaction_commission','Constituir la comisión tras solicitud expresa',numberValue(m[1]),'days');
  }

  const harassmentMeetingRe=/(?:comisi[oó]n[^.]{0,120}?)se\s+reunir[aá][^.]{0,240}?desde\s+la\s+fecha\s+de\s+recepci[oó]n\s+de\s+una\s+(?:queja|denuncia)[^.]{0,180}?plazo\s+superior\s+a\s+(\d{1,3}|[a-záéíóú]+)\s+d[ií]as\s+(laborables|h[aá]biles)/gi;
  for(const m of text.matchAll(harassmentMeetingRe)){
    pushTemplate(templates,m,'harassment_report_received','harassment_commission_meeting_duty','convene_harassment_commission','Reunir la comisión tras recepción de una queja o denuncia',numberValue(m[1]),'business_days');
  }

  const harassmentReportRe=/en\s+el\s+plazo\s+m[aá]ximo\s+de\s+(\d{1,3}|[a-záéíóú]+)\s+d[ií]as\s+(h[aá]biles|laborables)\s+desde\s+la\s+denuncia[^.]{0,160}?comisi[oó]n\s+debe\s+emitir\s+un\s+informe/gi;
  for(const m of text.matchAll(harassmentReportRe)){
    pushTemplate(templates,m,'harassment_report_filed','harassment_report_duty','issue_harassment_report','Emitir informe tras la denuncia',numberValue(m[1]),'business_days');
  }

  const harassmentResolutionRe=/resoluci[oó]n\s+final[^.]{0,140}?deber[aá]\s+realizarse\s+en\s+el\s+plazo\s+m[aá]ximo\s+de\s+(\d{1,3}|[a-záéíóú]+)\s+d[ií]as\s+(h[aá]biles|laborables)\s+desde\s+que\s+se\s+interpuso\s+la\s+denuncia/gi;
  for(const m of text.matchAll(harassmentResolutionRe)){
    pushTemplate(templates,m,'harassment_report_filed','harassment_procedure_resolution_duty','complete_harassment_procedure','Completar la resolución final del procedimiento tras la denuncia',numberValue(m[1]),'business_days');
  }
  return templates;
}

export async function extractFromBoeUrl(url){const[base,text]=await Promise.all([extractV2(url),fetchBoeText(url)]);const obligations=[...(base.obligations??[])];const installment=extractInstallmentObligation(text);if(installment)obligations.push(installment);obligations.push(...extractImplementationDuties(text,base));const withObligations=canonicalizeObligations({...base,obligations});return canonicalizeObligationTemplates({...withObligations,obligationTemplates:extractProceduralTemplatesFromText(text)});}

if(import.meta.url===`file://${process.argv[1]}`){const url=process.argv[2];if(!url)process.exit(2);console.log(JSON.stringify(await extractFromBoeUrl(url),null,2));}

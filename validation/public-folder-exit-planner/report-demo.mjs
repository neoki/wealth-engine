import { buildExitPlan, renderMarkdown } from './report.mjs';

const NOW = new Date('2026-09-15T00:00:00Z');
const rows = [
  {path:'\\Support',itemCount:4200,sizeGb:6.8,lastUserModified:'2026-09-14',mailEnabled:true,mailItems:4200,uniqueAclCount:4},
  {path:'\\Operations\\Procedures',itemCount:1800,sizeGb:22,lastUserModified:'2026-08-28',documentItems:1800,uniqueAclCount:7},
  {path:'\\Projects',itemCount:5000,sizeGb:31,lastUserModified:'2026-09-10',mailItems:2400,documentItems:2600,uniqueAclCount:5},
  {path:'\\CRMBridge',itemCount:12000,sizeGb:18,lastUserModified:'2026-09-12',mailItems:12000,applicationDependency:true,uniqueAclCount:6},
  {path:'\\Legal\\Matters',itemCount:8000,sizeGb:95,lastUserModified:'2026-09-01',documentItems:8000,complianceHold:true,uniqueAclCount:8},
  {path:'\\Regional',itemCount:6100,sizeGb:14,lastUserModified:'2026-09-13',mailEnabled:true,mailItems:6100,uniqueAclCount:28},
  {path:'\\RoomBookings',itemCount:3400,sizeGb:1.1,lastUserModified:'2026-09-14',calendarItems:3400,uniqueAclCount:4},
  {path:'\\OldEmpty',itemCount:0,sizeGb:0,lastUserModified:'2020-01-01',uniqueAclCount:1}
];

const plan = buildExitPlan(rows, { organisation: 'Contoso Manufacturing', now: NOW });
console.log(renderMarkdown(plan));

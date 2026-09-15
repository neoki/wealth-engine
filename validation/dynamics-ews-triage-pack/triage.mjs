import fs from 'node:fs';

const path = process.argv[2];
if (!path) {
  console.error('Usage: node triage.mjs <intake.json>');
  process.exit(2);
}

const x = JSON.parse(fs.readFileSync(path, 'utf8'));
const crmOnPrem = x.crm?.deployment === 'on-premises';
const exchangeOnline = x.exchange?.deployment === 'exchange-online';
const sync = x.crm?.server_side_sync_enabled === true;
const affected = crmOnPrem && exchangeOnline && sync;
const unknown = [x.crm?.deployment, x.exchange?.deployment, x.crm?.server_side_sync_enabled].some(v => v === undefined || v === null || v === 'unknown');

const workflowLabels = {
  incoming_email: 'incoming email synchronization',
  outgoing_email: 'outgoing email synchronization',
  appointments: 'appointment synchronization',
  contacts: 'contact synchronization',
  tasks: 'task synchronization'
};
const exposedWorkflows = Object.entries(x.workflows || {}).filter(([,v]) => v === true).map(([k]) => workflowLabels[k] || k);

let classification = 'not_affected_by_this_specific_integration_cutoff';
if (unknown) classification = 'unknown';
else if (affected) classification = 'affected';

const routes = [];
if (affected) {
  if (!x.exchange?.ews_allowlisted_until_2027) routes.push('Obtain/verify temporary EWS continuity for the transition window if still available and appropriate; this does not solve the April 2027 cutoff.');
  if (x.business?.crm_cloud_migration_planned_before_2027_04_01) routes.push('Validate that the planned Dynamics 365 online migration completes before the permanent cutoff and includes synchronization acceptance tests.');
  else routes.push('Evaluate Dynamics 365 online migration versus a Graph-based synchronization layer; do not assume a temporary EWS allow-list is a permanent fix.');
  if (x.business?.exchange_on_prem_option) routes.push('Exchange Server on-premises is a documented architectural alternative, but assess infrastructure/security cost before selecting it.');
  if (x.business?.third_party_graph_sync_layer) routes.push('Validate the third-party Graph sync layer against all required email/calendar/contact/task workflows and rollback requirements.');
}

const evidenceNeeded = [];
if (unknown) evidenceNeeded.push('Confirm CRM deployment/version, Exchange deployment and whether server-side synchronization is enabled.');
if (affected) {
  evidenceNeeded.push('Capture Dynamics mailbox/server-side-sync configuration and failure-critical workflows.');
  evidenceNeeded.push('Review Exchange Online EWS usage metadata to identify remaining EWS callers; share metadata only, not mailbox content.');
  evidenceNeeded.push('Confirm tenant EWS transition/allow-list state and owner for the April 2027 migration decision.');
}

const severity = !affected ? 'none_for_this_cutoff' :
  x.business?.sync_is_business_critical ? 'critical' :
  exposedWorkflows.length >= 3 ? 'high' : 'medium';

const commercialNextAction = affected
  ? (x.business?.users_affected >= 25 || x.business?.sync_is_business_critical
      ? 'Offer fixed-price assessment and continuity decision pack.'
      : 'Offer lightweight assessment; avoid custom engineering until dependency is confirmed.')
  : classification === 'unknown'
    ? 'Request only the missing technical metadata; do not sell migration yet.'
    : 'Do not sell this EWS/Dynamics assessment unless another EWS dependency is found.';

console.log(JSON.stringify({
  classification,
  severity,
  microsoft_deadlines: {
    recommended_action_or_temporary_continuity: '2026-10-01',
    permanent_exchange_online_ews_retirement: '2027-04-01'
  },
  exposed_workflows: affected ? exposedWorkflows : [],
  evidence_needed: evidenceNeeded,
  recommended_routes: routes,
  commercial_next_action: commercialNextAction
}, null, 2));

export function classifyFolder(f) {
  const signals = [];
  const workloads = [];
  const mail = (f.mailItems ?? 0) > 0;
  const docs = (f.documentItems ?? 0) > 0;
  const calendar = (f.calendarItems ?? 0) > 0;
  const contacts = (f.contactItems ?? 0) > 0;
  const external = Boolean(f.externalMailFlow);
  const app = Boolean(f.applicationDependency);
  const active = (f.itemsLast90Days ?? 0) > 0;
  const sizeGb = f.sizeGb ?? 0;

  if (mail) workloads.push('mail');
  if (docs) workloads.push('documents');
  if (calendar) workloads.push('calendar');
  if (contacts) workloads.push('contacts');
  if (app) workloads.push('application');

  let destination = 'manual-review';
  let confidence = 0.55;
  let requiresSplit = false;

  // Application dependencies are a distinct migration track even when content is mixed.
  if (app) {
    destination = 'crm-or-application'; confidence = 0.92; signals.push('application dependency');
    requiresSplit = workloads.length > 1;
  } else if (mail && docs && !calendar && !contacts) {
    destination = 'split-mail-sharepoint'; confidence = 0.86; signals.push('mixed mail/document workload'); requiresSplit = true;
  } else if (workloads.length > 1) {
    // Calendar/contact combinations do not have a universally safe one-target mapping.
    destination = 'manual-review'; confidence = 0.6; signals.push('heterogeneous workload'); requiresSplit = true;
  } else if (contacts || calendar) {
    destination = 'm365-group-or-shared-mailbox'; confidence = 0.84; signals.push('contacts/calendar workload');
  } else if (mail && external) {
    destination = 'shared-mailbox'; confidence = 0.91; signals.push('mail-centric external workflow');
  } else if (docs) {
    destination = 'sharepoint-teams'; confidence = 0.93; signals.push('document-centric workload');
  } else if (!active && sizeGb > 0) {
    destination = 'archive'; confidence = 0.88; signals.push('inactive retained content');
  } else if (!active && sizeGb === 0) {
    destination = 'retire'; confidence = 0.96; signals.push('empty inactive folder');
  }

  const blockers = [];
  if (f.complianceHold) blockers.push('compliance-hold');
  if ((f.uniqueAclCount ?? 0) > 10) blockers.push('complex-permissions');
  if (requiresSplit) blockers.push('workload-split');
  if (destination === 'manual-review') blockers.push('ambiguous-destination');

  if (f.complianceHold) { signals.push('compliance hold'); confidence = Math.min(confidence, 0.82); }
  if ((f.uniqueAclCount ?? 0) > 10) { signals.push('complex permissions'); confidence = Math.min(confidence, 0.8); }

  // Destination recommendation and migration safety are deliberately independent.
  const migrationSafety = blockers.length ? 'review-required' : 'candidate';
  const manualReview = migrationSafety === 'review-required' || confidence < 0.8;

  return { id: f.id, destination, confidence, workloads, requiresSplit, blockers, migrationSafety, signals, manualReview };
}

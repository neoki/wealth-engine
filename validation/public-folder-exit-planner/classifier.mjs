export function classifyFolder(f) {
  const signals = [];
  let destination = 'manual-review';
  let confidence = 0.55;

  const mail = (f.mailItems ?? 0) > 0;
  const docs = (f.documentItems ?? 0) > 0;
  const calendar = (f.calendarItems ?? 0) > 0;
  const contacts = (f.contactItems ?? 0) > 0;
  const external = Boolean(f.externalMailFlow);
  const app = Boolean(f.applicationDependency);
  const active = (f.itemsLast90Days ?? 0) > 0;
  const sizeGb = f.sizeGb ?? 0;

  if (app) {
    destination = 'crm-or-application'; confidence = 0.92; signals.push('application dependency');
  } else if (contacts || calendar) {
    destination = 'm365-group-or-shared-mailbox'; confidence = 0.84; signals.push('contacts/calendar workload');
  } else if (mail && external && !docs) {
    destination = 'shared-mailbox'; confidence = 0.91; signals.push('mail-centric external workflow');
  } else if (docs && !mail) {
    destination = 'sharepoint-teams'; confidence = 0.93; signals.push('document-centric workload');
  } else if (!active && sizeGb > 0) {
    destination = 'archive'; confidence = 0.88; signals.push('inactive retained content');
  } else if (!active && sizeGb === 0) {
    destination = 'retire'; confidence = 0.96; signals.push('empty inactive folder');
  } else if (mail && docs) {
    destination = 'split-mail-sharepoint'; confidence = 0.78; signals.push('mixed mail/document workload');
  }

  if (f.complianceHold) { signals.push('compliance hold'); confidence = Math.min(confidence, 0.82); }
  if ((f.uniqueAclCount ?? 0) > 10) { signals.push('complex permissions'); confidence = Math.min(confidence, 0.8); }

  return { id: f.id, destination, confidence, signals, manualReview: confidence < 0.8 || destination === 'manual-review' };
}

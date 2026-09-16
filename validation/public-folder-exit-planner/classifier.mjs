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
  const itemCount = f.itemCount ?? (f.mailItems ?? 0) + (f.documentItems ?? 0) + (f.calendarItems ?? 0) + (f.contactItems ?? 0);

  if (mail) workloads.push('mail');
  if (docs) workloads.push('documents');
  if (calendar) workloads.push('calendar');
  if (contacts) workloads.push('contacts');
  if (app) workloads.push('application');

  let destination = 'manual-review';
  let confidence = 0.55;
  let requiresSplit = false;

  if (app) {
    destination = 'crm-or-application'; confidence = 0.92; signals.push('application dependency');
    requiresSplit = workloads.length > 1;
  } else if (mail && docs && !calendar && !contacts) {
    destination = 'split-mail-sharepoint'; confidence = 0.86; signals.push('mixed mail/document workload'); requiresSplit = true;
  } else if (workloads.length > 1) {
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
  const migrationRisks = [];
  if (f.complianceHold) blockers.push('compliance-hold');
  if ((f.uniqueAclCount ?? 0) > 10) blockers.push('complex-permissions');
  if (requiresSplit) blockers.push('workload-split');
  if (destination === 'manual-review') blockers.push('ambiguous-destination');

  // MigrationWiz execution profile: vendor-specific preparation and non-migrated features.
  if (itemCount > 100000) migrationRisks.push({code:'bittitan-item-count-split',severity:'high',profile:'migrationwiz',detail:'BitTitan recommends splitting source Public Folders above 100,000 items for Exchange 2010+/M365 sources.'});
  if (sizeGb > 20) migrationRisks.push({code:'bittitan-folder-size-split',severity:'high',profile:'migrationwiz',detail:'BitTitan recommends splitting individual source Public Folders above 20 GB before migration.'});
  if (f.totalPublicFolderCount > 1000) migrationRisks.push({code:'bittitan-project-split-required',severity:'high',profile:'migrationwiz',detail:'MigrationWiz projects above 1,000 Public Folders require additional split-project steps and BitTitan Support involvement.'});
  if (f.mailEnabled && f.preserveSmtpAddresses !== false) migrationRisks.push({code:'bittitan-smtp-address-handoff',severity:'medium',profile:'migrationwiz',detail:'MigrationWiz does not migrate SMTP addresses for mail-enabled Public Folders; export/import scripts are required.'});
  if (f.hasRules) migrationRisks.push({code:'bittitan-rules-not-migrated',severity:'medium',profile:'migrationwiz',detail:'MigrationWiz does not migrate Public Folder rules.'});
  if (f.hasDelegatePermissions) migrationRisks.push({code:'bittitan-delegate-permissions-not-migrated',severity:'medium',profile:'migrationwiz',detail:'MigrationWiz does not migrate Full Access, Send As, or Send on Behalf delegate permissions in this Public Folder scenario.'});
  if (f.hasStandaloneDocuments) migrationRisks.push({code:'bittitan-standalone-documents-not-migrated',severity:'high',profile:'migrationwiz',detail:'MigrationWiz lists standalone IPM.Document items in Public Folders as not migrated.'});

  // Microsoft-native execution profile. These are Exchange Online target constraints/recommendations,
  // deliberately kept separate from MigrationWiz's vendor-specific thresholds.
  if (sizeGb > 25) migrationRisks.push({code:'ms-native-large-folder-autosplit-risk',severity:'high',profile:'microsoft-native',detail:'Microsoft recommends keeping an individual Exchange Online Public Folder at or below 25 GB because larger folders can have auto-split issues.'});
  if ((f.totalPublicFolderCount ?? 0) > 100000) migrationRisks.push({code:'ms-native-folder-count-limit',severity:'high',profile:'microsoft-native',detail:'Exchange Online supports up to 100,000 Public Folders in the hierarchy.'});
  if ((f.childFolderCount ?? 0) > 1000) migrationRisks.push({code:'ms-native-child-folder-limit',severity:'high',profile:'microsoft-native',detail:'Exchange Online supports up to 1,000 subfolders under an individual Public Folder.'});
  if ((f.folderDepth ?? 0) > 300) migrationRisks.push({code:'ms-native-hierarchy-depth-limit',severity:'high',profile:'microsoft-native',detail:'Exchange Online supports a Public Folder hierarchy depth up to 300 levels.'});
  if ((f.publicFolderMailboxCount ?? 0) > 1000) migrationRisks.push({code:'ms-native-mailbox-count-limit',severity:'high',profile:'microsoft-native',detail:'Exchange Online supports up to 1,000 Public Folder mailboxes.'});
  if (f.sourceValidationPassed === false) migrationRisks.push({code:'ms-native-source-validation-failed',severity:'high',profile:'microsoft-native',detail:'Microsoft requires source-side validation before batch migration; reported source validation issues should be remediated before proceeding.'});
  if (f.ageLimitRisk === true) migrationRisks.push({code:'ms-native-age-limit-retention-risk',severity:'high',profile:'microsoft-native',detail:'Public Folder age-limit settings can cause items to be treated as expired and deleted during or after batch migration; review retention settings before migration.'});

  // Destination constraint independent of the migration method selected by the MSP.
  if (f.maxItemSizeMb != null && f.targetMaxReceiveSizeMb != null && f.maxItemSizeMb > f.targetMaxReceiveSizeMb) migrationRisks.push({code:'target-item-size-limit',severity:'high',profile:'target',detail:'Largest observed item exceeds the supplied destination public-folder mailbox receive limit.'});

  if (f.complianceHold) { signals.push('compliance hold'); confidence = Math.min(confidence, 0.82); }
  if ((f.uniqueAclCount ?? 0) > 10) { signals.push('complex permissions'); confidence = Math.min(confidence, 0.8); }
  if (migrationRisks.length) signals.push('execution risk detected');

  const migrationSafety = blockers.length || migrationRisks.some(r => r.severity === 'high') ? 'review-required' : 'candidate';
  const manualReview = migrationSafety === 'review-required' || confidence < 0.8;

  return { id: f.id, destination, confidence, workloads, requiresSplit, blockers, migrationRisks, migrationSafety, signals, manualReview };
}

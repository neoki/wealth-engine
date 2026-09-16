import { normalizeInventory } from './normalize-inventory.mjs';
import { classifyFolder } from './classifier.mjs';
import { compareExecutionProfiles } from './execution-profile-comparator.mjs';

export function buildExitPlan(rows, { organisation = 'Customer', now = new Date() } = {}) {
  const folders = rows.map(row => {
    const normalized = normalizeInventory(row, now);
    const decision = classifyFolder(normalized);
    const evidenceMissing = normalized.evidenceMissing ?? [];
    const safe = decision.migrationSafety === 'candidate' && evidenceMissing.length === 0;
    return { ...normalized, ...decision, migrationSafety: safe ? 'candidate' : 'review-required', evidenceMissing };
  });

  const destinations = {};
  for (const f of folders) destinations[f.destination] = (destinations[f.destination] ?? 0) + 1;
  const candidates = folders.filter(f => f.migrationSafety === 'candidate');
  const review = folders.filter(f => f.migrationSafety !== 'candidate');
  const specialist = review.filter(f => f.complianceHold || f.applicationDependency);
  const executionComparison = compareExecutionProfiles(folders);

  const readiness = folders.length === 0 ? 0 : Math.round((candidates.length / folders.length) * 100);
  const evidenceGaps = [...new Set(folders.flatMap(f => f.evidenceMissing ?? []))];
  const blockers = [...new Set(folders.flatMap(f => f.blockers ?? []))];

  return {
    organisation,
    generatedAt: now.toISOString(),
    summary: {
      folders: folders.length,
      totalSizeGb: Number(folders.reduce((n, f) => n + (f.sizeGb ?? 0), 0).toFixed(2)),
      migrationCandidates: candidates.length,
      reviewRequired: review.length,
      specialistReview: specialist.length,
      readiness,
      destinations
    },
    assessment: {
      status: specialist.length ? 'specialist-review-required' : review.length ? 'discovery-incomplete' : 'ready-for-engineer-validation',
      evidenceGaps,
      blockers,
      nextActions: [
        ...(evidenceGaps.length ? ['Close missing inventory/evidence fields before final scoping.'] : []),
        ...(specialist.length ? ['Review compliance holds and application dependencies with the responsible specialist.'] : []),
        ...(executionComparison?.recommendation ? ['Engineer-validate the preferred execution route against licensing, throughput and unsupported edge cases.'] : []),
        'Confirm business ownership, retention and permissions before approving any migration or deletion.',
        'Convert the validated scope into effort, migration-wave dates and a commercial quotation.'
      ]
    },
    waves: {
      wave1LowRisk: candidates.map(f => f.id),
      wave2ReviewThenMigrate: review.filter(f => !f.complianceHold && !f.applicationDependency).map(f => f.id),
      wave3Specialist: specialist.map(f => f.id)
    },
    executionComparison,
    folders
  };
}

export function renderMarkdown(plan) {
  const s = plan.summary;
  const lines = [
    `# Public Folder Exit Assessment — ${plan.organisation}`,
    '',
    `Generated ${plan.generatedAt.slice(0, 10)}`,
    '',
    '## Executive decision brief',
    '',
    `The inventory contains **${s.folders}** public folders (${s.totalSizeGb} GB). **${s.migrationCandidates}** currently qualify as low-risk migration candidates; **${s.reviewRequired}** require review, including **${s.specialistReview}** requiring specialist/compliance/application review. Current evidence readiness is **${s.readiness}%**.`,
    '',
    `**Assessment status:** ${plan.assessment.status}.`,
    '',
    'This assessment is designed to turn discovery data into a reviewable migration scope. It does not authorize migration or deletion.',
    '',
    '## Proposed target architecture',
    ''
  ];
  for (const [target, count] of Object.entries(s.destinations)) lines.push(`- **${target}**: ${count} folders`);

  lines.push('', '## Execution route comparison', '');
  const comparison = plan.executionComparison;
  if (comparison?.profiles?.length) {
    lines.push('| Route | Risk score | High | Medium | Affected folders | Shared target risks |', '|---|---:|---:|---:|---:|---:|');
    for (const p of comparison.profiles) {
      lines.push(`| ${p.label} | ${p.score} | ${p.high} | ${p.medium} | ${p.affectedFolders} | ${p.sharedTargetRisks} |`);
    }
    if (comparison.recommendation) {
      const chosen = comparison.profiles.find(p => p.profile === comparison.recommendation.profile);
      lines.push('', `**Pre-flight preference:** ${chosen?.label ?? comparison.recommendation.profile} (${comparison.recommendation.confidence} confidence). ${comparison.recommendation.rationale}`);
    }
    lines.push('', '_Interpretation:_ this ranking compares only currently encoded technical execution risks. Licensing, throughput, unsupported edge cases, tenant-specific constraints and engineer judgement remain outside the score.');
  } else {
    lines.push('No execution-profile comparison is available for this inventory.');
  }

  lines.push('', '## Proposed migration waves', '',
    `1. **Low-risk candidates:** ${plan.waves.wave1LowRisk.length} folders`,
    `2. **Review before migration:** ${plan.waves.wave2ReviewThenMigrate.length} folders`,
    `3. **Specialist/compliance/application review:** ${plan.waves.wave3Specialist.length} folders`);

  lines.push('', '## Scope gaps and blockers', '');
  if (!plan.assessment.evidenceGaps.length && !plan.assessment.blockers.length) {
    lines.push('No encoded evidence gaps or blockers were detected. Engineer validation is still required.');
  } else {
    for (const gap of plan.assessment.evidenceGaps) lines.push(`- Missing evidence: ${gap}`);
    for (const blocker of plan.assessment.blockers) lines.push(`- Blocker/risk: ${blocker}`);
  }

  lines.push('', '## Recommended next actions', '');
  for (const action of plan.assessment.nextActions) lines.push(`- ${action}`);

  lines.push('', '## Folder decision register', '',
    '| Folder | Proposed destination | Safety | Confidence | Blockers / missing evidence |',
    '|---|---|---|---:|---|');
  for (const f of plan.folders) {
    const issues = [...f.blockers, ...f.evidenceMissing].join(', ') || '—';
    lines.push(`| ${f.id} | ${f.destination} | ${f.migrationSafety} | ${Math.round(f.confidence * 100)}% | ${issues} |`);
  }
  lines.push('', '## Scope boundary', '', '> Planning output only. Before migration or deletion, validate retention, permissions, business ownership, application dependencies, destination capacity and execution-tool suitability. Final effort and pricing should be produced only after those checks.');
  return lines.join('\n');
}

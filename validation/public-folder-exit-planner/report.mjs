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
  const executionComparison = compareExecutionProfiles(folders);

  return {
    organisation,
    generatedAt: now.toISOString(),
    summary: {
      folders: folders.length,
      totalSizeGb: Number(folders.reduce((n, f) => n + (f.sizeGb ?? 0), 0).toFixed(2)),
      migrationCandidates: candidates.length,
      reviewRequired: review.length,
      destinations
    },
    waves: {
      wave1LowRisk: candidates.map(f => f.id),
      wave2ReviewThenMigrate: review.filter(f => !f.complianceHold && !f.applicationDependency).map(f => f.id),
      wave3Specialist: review.filter(f => f.complianceHold || f.applicationDependency).map(f => f.id)
    },
    executionComparison,
    folders
  };
}

export function renderMarkdown(plan) {
  const s = plan.summary;
  const lines = [
    `# Public Folder Exit Plan — ${plan.organisation}`,
    '',
    '## Executive summary',
    '',
    `Analysed **${s.folders}** public folders (${s.totalSizeGb} GB). **${s.migrationCandidates}** are low-risk migration candidates and **${s.reviewRequired}** require review before cutover.`,
    '',
    '## Target architecture',
    ''
  ];
  for (const [target, count] of Object.entries(s.destinations)) lines.push(`- ${target}: ${count}`);

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
    lines.push('', 'This comparison scores only currently encoded technical execution risks. Commercial licensing, migration throughput, unsupported edge cases and engineer judgement remain outside the score.');
  } else {
    lines.push('No execution-profile comparison is available for this inventory.');
  }

  lines.push('', '## Migration waves', '',
    `1. Low risk: ${plan.waves.wave1LowRisk.length} folders`,
    `2. Review then migrate: ${plan.waves.wave2ReviewThenMigrate.length} folders`,
    `3. Specialist/compliance/application dependency: ${plan.waves.wave3Specialist.length} folders`,
    '', '## Folder decisions', '',
    '| Folder | Destination | Safety | Confidence | Blockers / missing evidence |',
    '|---|---|---|---:|---|');
  for (const f of plan.folders) {
    const issues = [...f.blockers, ...f.evidenceMissing].join(', ') || '—';
    lines.push(`| ${f.id} | ${f.destination} | ${f.migrationSafety} | ${Math.round(f.confidence * 100)}% | ${issues} |`);
  }
  lines.push('', '> Planning output only. Review retention, permissions, application dependencies, business ownership and execution-tool suitability before migration or deletion.');
  return lines.join('\n');
}

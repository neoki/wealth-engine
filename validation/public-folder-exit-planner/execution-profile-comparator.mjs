const PROFILE_META = {
  'microsoft-native': { label: 'Microsoft native', paidTooling: false },
  migrationwiz: { label: 'MigrationWiz', paidTooling: true }
};

const SEVERITY_WEIGHT = { high: 5, medium: 2, low: 1 };

export function compareExecutionProfiles(classifications, options = {}) {
  const profiles = options.profiles ?? ['microsoft-native', 'migrationwiz'];
  const rows = profiles.map(profile => {
    const specific = classifications.flatMap(c =>
      (c.migrationRisks ?? [])
        .filter(r => r.profile === profile)
        .map(r => ({ ...r, folderId: c.id }))
    );
    const shared = classifications.flatMap(c =>
      (c.migrationRisks ?? [])
        .filter(r => r.profile === 'target')
        .map(r => ({ ...r, folderId: c.id }))
    );
    const high = specific.filter(r => r.severity === 'high').length;
    const medium = specific.filter(r => r.severity === 'medium').length;
    const score = specific.reduce((sum, r) => sum + (SEVERITY_WEIGHT[r.severity] ?? 1), 0);
    const manualFolders = new Set(specific.map(r => r.folderId)).size;
    return {
      profile,
      ...PROFILE_META[profile],
      score,
      high,
      medium,
      riskCount: specific.length,
      affectedFolders: manualFolders,
      sharedTargetRisks: shared.length,
      risks: specific
    };
  });

  const ranked = [...rows].sort((a, b) => a.score - b.score || a.high - b.high || a.riskCount - b.riskCount);
  const best = ranked[0];
  const second = ranked[1];
  const recommendation = !best ? null : {
    profile: best.profile,
    confidence: second && second.score === best.score ? 'low' : second && second.score - best.score <= 2 ? 'medium' : 'high',
    rationale: second && second.score === best.score
      ? 'Profiles are tied on currently encoded execution risks; use cost, capabilities and engineer judgement.'
      : `${best.label} has the lowest encoded execution-risk score (${best.score}${second ? ` vs ${second.score}` : ''}). This is a pre-flight signal, not an autonomous migration decision.`
  };

  return { profiles: ranked, recommendation };
}

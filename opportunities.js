import { getIndexData, publicBenchmarks, lastUpdated } from './margin-data.js';

function round(value, digits = 3) {
  return Number(value.toFixed(digits));
}

function score({ evidence, marginPotential, speed, automation, distribution }) {
  return round(
    evidence * 0.25 +
    marginPotential * 0.25 +
    speed * 0.20 +
    automation * 0.15 +
    distribution * 0.15,
    3
  );
}

export function getEconomicOpportunities() {
  const plans = getIndexData();
  const rpm = plans.map((plan) => plan.revenuePerMinute).filter(Number.isFinite);
  const minRetail = Math.min(...rpm);
  const maxRetail = Math.max(...rpm);
  const medianRetail = [...rpm].sort((a, b) => a - b)[Math.floor(rpm.length / 2)];

  const opportunities = [
    {
      id: 'voice-ai-productized-implementation',
      title: 'Productized AI voice implementation for a narrow business workflow',
      thesis: 'Competing on implementation, integration and business outcome is more defensible than reselling voice minutes alone.',
      evidence: {
        type: 'derived-from-public-pricing',
        observedRetailRevenuePerMinute: {
          min: round(minRetail),
          median: round(medianRetail),
          max: round(maxRetail)
        },
        infrastructureBenchmarks: publicBenchmarks,
        interpretation: 'Published retail plan economics overlap with or undercut public all-in infrastructure benchmarks, weakening a pure per-minute resale thesis.'
      },
      monetization: ['fixed setup fee', 'monthly workflow fee', 'outcome/value-based fee'],
      experiment: {
        nextAction: 'Offer one narrowly defined voice workflow to 10 target businesses before building additional platform infrastructure.',
        success: 'At least 2 qualified buyers request a proposal and at least 1 accepts a paid pilot.',
        kill: 'No qualified proposal requests after 30 well-targeted outreaches or 10 live buyer conversations.'
      },
      dimensions: { evidence: 0.72, marginPotential: 0.82, speed: 0.86, automation: 0.72, distribution: 0.58 }
    },
    {
      id: 'voice-ai-economic-intelligence-api',
      title: 'Continuously verified voice-AI pricing and margin intelligence',
      thesis: 'Agents and builders can pay for normalized, provenance-rich pricing data when it saves repeated market research and supports procurement decisions.',
      evidence: {
        type: 'existing-working-capability',
        rows: plans.length,
        benchmarkRows: publicBenchmarks.length,
        lastUpdated,
        interpretation: 'A working structured dataset and MCP delivery path already exist; the unresolved questions are freshness, discovery and willingness to pay.'
      },
      monetization: ['free current snapshot', 'paid fresh/provenance-rich feed', 'paid alerts or procurement analysis'],
      experiment: {
        nextAction: 'Repair automated source verification, expose row-level verifiedAt/status, then test one paid freshness/provenance tier.',
        success: 'One independent external user requests fresh data or one buyer pays for verified/current intelligence.',
        kill: 'External users consistently prefer free web research and show no willingness to pay for freshness, normalization or provenance.'
      },
      dimensions: { evidence: 0.64, marginPotential: 0.9, speed: 0.78, automation: 0.94, distribution: 0.35 }
    }
  ];

  return {
    generatedAt: new Date().toISOString(),
    objective: 'Find the fastest falsifiable path from market evidence to autonomous economic value.',
    scoring: {
      formula: '25% evidence + 25% margin potential + 20% speed + 15% automation + 15% distribution',
      warning: 'Scores are prioritization heuristics, not forecasts.'
    },
    opportunities: opportunities
      .map((item) => ({ ...item, score: score(item.dimensions) }))
      .sort((a, b) => b.score - a.score)
  };
}

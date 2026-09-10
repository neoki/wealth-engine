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
  const directlyVerifiedRows = plans.filter((plan) => plan.verificationStatus === 'verified-direct').length;

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
        dataUpdated: lastUpdated,
        directlyVerifiedRows,
        interpretation: 'Published retail plan economics overlap with current infrastructure pricing, so a pure per-minute resale thesis can be margin-constrained. Outcome, setup and integration fees create a wider value-capture surface.'
      },
      monetization: ['fixed setup fee', 'monthly workflow fee', 'outcome/value-based fee'],
      experiment: {
        nextAction: 'Sell one narrowly defined voice workflow to 10 target businesses before building additional platform infrastructure.',
        success: 'At least 2 qualified buyers request a proposal and at least 1 accepts a paid pilot.',
        kill: 'No qualified proposal requests after 30 well-targeted outreaches or 10 live buyer conversations.'
      },
      dimensions: { evidence: 0.78, marginPotential: 0.82, speed: 0.86, automation: 0.72, distribution: 0.58 }
    },
    {
      id: 'voice-ai-economic-intelligence-api',
      title: 'Continuously verified voice-AI pricing and margin intelligence',
      thesis: 'Agents and builders may pay for normalized, provenance-rich pricing data when freshness and structured comparison save repeated market research or support procurement decisions.',
      evidence: {
        type: 'working-verified-capability',
        rows: plans.length,
        benchmarkRows: publicBenchmarks.length,
        lastUpdated,
        directlyVerifiedRows,
        interpretation: 'The dataset, MCP delivery path, row-level provenance and automated source-health checks now exist. The remaining economic uncertainty is willingness to pay and distribution, not basic product feasibility.'
      },
      monetization: ['free delayed/current snapshot', 'paid freshness and change alerts', 'paid procurement or margin analysis'],
      experiment: {
        nextAction: 'Expose a paid-intent offer for freshness/change alerts or procurement analysis and send it to qualified agent builders and voice-AI operators; do not build billing infrastructure until someone attempts to buy.',
        success: 'At least 1 independent prospect explicitly attempts to purchase or requests paid access after seeing the offer.',
        kill: 'No paid-intent signal after 50 qualified exposures or 15 direct buyer conversations.'
      },
      dimensions: { evidence: 0.72, marginPotential: 0.9, speed: 0.9, automation: 0.94, distribution: 0.4 }
    }
  ];

  return {
    generatedAt: new Date().toISOString(),
    objective: 'Find the fastest falsifiable path from market evidence to autonomous economic value.',
    evidencePolicy: 'Opportunities are hypotheses ranked from observed evidence. Scores are not revenue forecasts. Each opportunity must include an explicit next experiment and kill criterion.',
    scoring: {
      formula: '25% evidence + 25% margin potential + 20% speed + 15% automation + 15% distribution',
      warning: 'Scores are prioritization heuristics, not forecasts.'
    },
    opportunities: opportunities
      .map((item) => ({ ...item, score: score(item.dimensions) }))
      .sort((a, b) => b.score - a.score)
  };
}

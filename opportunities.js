import { getIndexData, publicBenchmarks, lastUpdated } from './margin-data.js';
import { marketSignals } from './market-signals.js';

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
  const agentCommerce = marketSignals.find((signal) => signal.id === 'agent402-marketplace-2026-09-10');

  const opportunities = [
    {
      id: 'voice-ai-productized-implementation',
      domain: 'voice-ai',
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
      domain: 'voice-ai',
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
        nextAction: 'Expose the €29/month founding paid-intent offer to qualified agent builders and voice-AI operators; do not build billing infrastructure until someone attempts to buy.',
        success: 'At least 1 independent prospect explicitly attempts to purchase or requests paid access after seeing the offer.',
        kill: 'No paid-intent signal after 50 qualified exposures or 15 direct buyer conversations.'
      },
      dimensions: { evidence: 0.72, marginPotential: 0.9, speed: 0.9, automation: 0.94, distribution: 0.4 }
    },
    {
      id: 'agent-commerce-prepurchase-verification',
      domain: 'agentic-commerce',
      title: 'Pre-purchase verification and economic trust layer for paid agent tools',
      thesis: 'As paid-agent marketplaces accumulate far more advertised tools than active buyers, buyers may value an independent layer that verifies whether a paid endpoint actually works, returns the promised output and is economically worth calling before autonomous spend is authorized.',
      evidence: {
        type: 'operator-published-market-signal',
        signal: agentCommerce,
        interpretation: 'Agent402 reports a large supply catalog and explicitly labels third-party descriptions as unverified, while third-party delivery risk remains with buyer and seller. This supports a trust-friction hypothesis, but does not yet prove willingness to pay for independent verification.'
      },
      monetization: ['per-endpoint verification report', 'buyer-side verified-tool feed', 'continuous reliability and value-for-money monitoring'],
      experiment: {
        nextAction: 'Manually verify 20 paid x402 endpoints across several categories, publish the results free, and expose a paid-intent offer for continuous verification before building a verifier network.',
        success: 'At least 3 independent buyers/operators consume the verification results and at least 1 requests paid continuous verification or a verified feed.',
        kill: 'No meaningful external use after 100 qualified exposures, or marketplace operators already provide equivalent independent execution-quality guarantees at no incremental cost.'
      },
      dimensions: { evidence: 0.52, marginPotential: 0.84, speed: 0.7, automation: 0.9, distribution: 0.62 }
    }
  ];

  return {
    generatedAt: new Date().toISOString(),
    objective: 'Find the fastest falsifiable path from market evidence to autonomous economic value.',
    domains: [...new Set(opportunities.map((item) => item.domain))],
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

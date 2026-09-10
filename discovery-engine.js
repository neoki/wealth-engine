const frictionRules = [
  {
    id: 'supply-demand-imbalance',
    title: 'Supply-demand imbalance',
    detects: (signal) => Number.isFinite(signal.metrics?.listings) && Number.isFinite(signal.metrics?.buyers30d) && signal.metrics.listings > 1000 && signal.metrics.buyers30d > 0,
    strength: (signal) => Math.min(1, Math.log10(signal.metrics.listings / Math.max(signal.metrics.buyers30d, 1)) / 4),
    opportunity: (signal) => ({
      title: 'Demand intelligence for crowded agent marketplaces',
      thesis: 'When supply vastly exceeds active buyers, sellers need better intelligence on what buyers actually purchase and buyers need better filtering of low-value supply.',
      buyer: 'tool sellers, marketplace operators, agent builders',
      model: ['market-intelligence subscription', 'qualified lead/routing fee', 'category demand reports'],
      firstExperiment: 'Publish one category-level report ranking observed buyer demand versus listed supply and ask 20 sellers/operators if they would pay for recurring demand intelligence.'
    })
  },
  {
    id: 'catalog-price-drift',
    title: 'Catalog price drift',
    detects: (signal) => Number.isFinite(signal.metrics?.priceDriftRate) && signal.metrics.priceDriftRate >= 0.02,
    strength: (signal) => Math.min(1, signal.metrics.priceDriftRate * 8),
    opportunity: () => ({
      title: 'Live price integrity layer for agent purchasing',
      thesis: 'If catalog prices differ materially from live payment quotes, autonomous buyers need authoritative pre-purchase price checks and sellers need drift monitoring.',
      buyer: 'buying agents, agent platforms, marketplaces, sellers',
      model: ['per-check API fee', 'buyer-side monitoring subscription', 'seller drift alerts'],
      firstExperiment: 'Offer a free batch audit for 100 endpoints and expose a paid continuous-monitoring tier only if operators request ongoing checks.'
    })
  },
  {
    id: 'delivery-verification-gap',
    title: 'Post-payment delivery gap',
    detects: (signal) => Number.isFinite(signal.metrics?.deliveryFailureRate) && signal.metrics.deliveryFailureRate >= 0.05,
    strength: (signal) => Math.min(1, signal.metrics.deliveryFailureRate * 4),
    opportunity: () => ({
      title: 'Outcome verification for paid agent APIs',
      thesis: 'When paid endpoints can settle yet fail to deliver advertised fields, buyers need execution-quality verification before trusting autonomous spend.',
      buyer: 'agent builders, procurement routers, marketplaces',
      model: ['verification API', 'verified-tool feed', 'continuous SLA monitoring'],
      firstExperiment: 'Verify a small paid sample in one valuable category and test whether buyers will pay for verified rankings or execution guarantees.'
    })
  },
  {
    id: 'payment-readiness-gap',
    title: 'Payment readiness gap',
    detects: (signal) => Number.isFinite(signal.metrics?.unpayableRate) && signal.metrics.unpayableRate >= 0.1,
    strength: (signal) => Math.min(1, signal.metrics.unpayableRate * 2),
    opportunity: () => ({
      title: 'Seller-side x402 payment readiness diagnostics',
      thesis: 'If many listed paid APIs cannot actually complete payment, sellers lose buyers despite being discoverable.',
      buyer: 'x402 API sellers and marketplaces',
      model: ['free diagnostic plus paid remediation', 'continuous readiness monitoring', 'marketplace certification'],
      firstExperiment: 'Run free diagnostics on 50 sellers and measure how many request paid remediation or continuous monitoring.'
    })
  }
];

function scoreCandidate(candidate) {
  const evidence = candidate.evidenceStrength;
  const monetization = candidate.monetizationClarity;
  const speed = candidate.experimentSpeed;
  const automation = candidate.automationPotential;
  return Number((evidence * 0.35 + monetization * 0.25 + speed * 0.2 + automation * 0.2).toFixed(3));
}

export function discoverOpportunities(signals = []) {
  const discoveries = [];
  for (const signal of signals) {
    for (const rule of frictionRules) {
      if (!rule.detects(signal)) continue;
      const proposed = rule.opportunity(signal);
      const candidate = {
        id: `discovered-${signal.id}-${rule.id}`,
        discovered: true,
        domain: signal.domain,
        title: proposed.title,
        thesis: proposed.thesis,
        buyer: proposed.buyer,
        monetization: proposed.model,
        experiment: {
          nextAction: proposed.firstExperiment,
          success: 'At least one independent buyer/operator requests a paid continuation or explicitly attempts to buy.',
          kill: 'No qualified paid-interest signal after the defined exposure/conversation test.'
        },
        sourceSignal: {
          id: signal.id,
          source: signal.source,
          observedAt: signal.observedAt,
          metrics: signal.metrics
        },
        friction: { id: rule.id, title: rule.title },
        evidenceStrength: Number(rule.strength(signal).toFixed(3)),
        monetizationClarity: 0.72,
        experimentSpeed: 0.82,
        automationPotential: 0.88
      };
      candidate.score = scoreCandidate(candidate);
      discoveries.push(candidate);
    }
  }
  return discoveries.sort((a, b) => b.score - a.score);
}

export const discoveryRules = frictionRules.map(({ id, title }) => ({ id, title }));

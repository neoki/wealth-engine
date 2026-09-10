export const marketSignals = [
  {
    id: 'agent402-marketplace-2026-09-10',
    domain: 'agentic-commerce',
    observedAt: '2026-09-10',
    source: 'https://agent402.tools/marketplace',
    sourceType: 'operator-published-marketplace-metrics',
    verificationStatus: 'verified-direct-source-self-reported',
    metrics: {
      distinctPayees: 3094,
      indexedEndpoints: 3954,
      advertisedToolListings: 101650,
      hostSettlements30d: 4355,
      hostDistinctBuyers30d: 137,
      hostSettlementsAllTime: 9709,
      hostDistinctBuyersAllTime: 330
    },
    observations: [
      'The marketplace is large on the supply side relative to the number of distinct buyers reported for the operator host.',
      'The operator states that third-party names, descriptions and tags are seller-supplied and unverified.',
      'The operator states that third-party listing is not endorsement, review or a security assessment.',
      'The operator states that if a third-party call is paid and the seller does not deliver, the dispute is between buyer and seller.'
    ],
    caveat: 'Metrics are published by Agent402 and were not independently audited by Wealth Engine. Counts can change rapidly.'
  }
];

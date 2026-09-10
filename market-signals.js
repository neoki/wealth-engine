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
      listings: 101650,
      buyers30d: 137,
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
  },
  {
    id: 'toll402-price-drift-2026-08-05',
    domain: 'agentic-commerce',
    observedAt: '2026-08-05',
    source: 'https://toll402.com/insights/x402-catalogued-price-vs-live-quote',
    sourceType: 'independent-measurement-report',
    verificationStatus: 'published-measurement',
    metrics: {
      comparedRoutes: 4251,
      mismatchedRoutes: 186,
      priceDriftRate: 186 / 4251,
      majorMismatches: 100,
      extremeMismatches: 47
    },
    observations: [
      'Catalogued and live x402 prices disagreed on 186 of 4,251 comparable routes.',
      'The report says the live 402 quote should be treated as authoritative at purchase time.'
    ],
    caveat: 'Third-party published measurement; Wealth Engine has not independently reproduced the full corpus.'
  },
  {
    id: 'whatagentsbuy-delivery-2026-08-12',
    domain: 'agentic-commerce',
    observedAt: '2026-08-12',
    source: 'https://whatagentsbuy.com/',
    sourceType: 'independent-paid-execution-test',
    verificationStatus: 'published-measurement',
    metrics: {
      judgedPaidEndpoints: 345,
      promisedFieldsDelivered: 306,
      deliveryShortfalls: 39,
      deliveryFailureRate: 39 / 345
    },
    observations: [
      '39 of 345 judged paid endpoints returned responses missing fields advertised by their listings.',
      'The operator says shortfalls were re-tested before being recorded.'
    ],
    caveat: 'Third-party execution study; methodology and sample selection may influence the measured failure rate.'
  },
  {
    id: 'x402-payability-audit-2026-08-20',
    domain: 'agentic-commerce',
    observedAt: '2026-08-20',
    source: 'https://www.reddit.com/r/agenticAI/comments/1vtqskk/we_checked_15020_paid_apis_listed_for_ai_agents/',
    sourceType: 'community-published-audit',
    verificationStatus: 'community-claim-needs-independent-reproduction',
    metrics: {
      auditedListings: 15020,
      payableRate: 0.687,
      unpayableRate: 0.313,
      malformedPaymentChallenges: 3127,
      cannotBePaid: 1522
    },
    observations: [
      'The audit claims 68.7% of sampled listings were payable and 31.3% were not.',
      'Malformed payment challenges and invalid receiving accounts were reported as major failure modes.'
    ],
    caveat: 'Community-published result; useful as a lead, not as conclusive evidence until independently reproduced.'
  }
];

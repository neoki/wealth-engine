export const lastUpdated = '2026-09-10';

const verifiedToday = {
  verifiedAt: '2026-09-10',
  verificationStatus: 'verified-direct'
};

export const plans = [
  {
    company: 'Atendy', plan: 'Starter', currency: 'EUR', symbol: '€', price: 75, minutes: 500,
    source: 'https://atendy.es/precios', ...verifiedToday,
    note: 'Published monthly plan. Phone number is separate; prices exclude VAT.'
  },
  {
    company: 'Atendy', plan: 'Crece', currency: 'EUR', symbol: '€', price: 210, minutes: 1500,
    source: 'https://atendy.es/precios', ...verifiedToday,
    note: 'Published monthly plan. Phone number is separate; prices exclude VAT.'
  },
  {
    company: 'Atendy', plan: 'Escala', currency: 'EUR', symbol: '€', price: 420, minutes: 3500,
    source: 'https://atendy.es/precios', ...verifiedToday,
    note: 'Published monthly plan. Phone number is separate; prices exclude VAT.'
  },
  {
    company: 'Zencia', plan: 'Pro', currency: 'USD', symbol: '$', price: 31, minutes: 500,
    source: 'https://zencia.ai/pricing', ...verifiedToday,
    note: 'Voice-agent minutes included in the published monthly plan.'
  },
  {
    company: 'Zencia', plan: 'Growth', currency: 'USD', symbol: '$', price: 105, minutes: 2000,
    source: 'https://zencia.ai/pricing', ...verifiedToday,
    note: 'Voice-agent minutes included in the published monthly plan.'
  },
  {
    company: 'Zencia', plan: 'Business', currency: 'USD', symbol: '$', price: 252, minutes: 6000,
    source: 'https://zencia.ai/pricing', ...verifiedToday,
    note: 'Voice-agent minutes included in the published monthly plan.'
  },
  {
    company: 'SuperMIA', plan: 'Launch', currency: 'USD', symbol: '$', price: 10, minutes: 84,
    source: 'https://supermia.ai/pricing/', ...verifiedToday,
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'SuperMIA', plan: 'Grow', currency: 'USD', symbol: '$', price: 49, minutes: 417,
    source: 'https://supermia.ai/pricing/', ...verifiedToday,
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'SuperMIA', plan: 'Scale', currency: 'USD', symbol: '$', price: 99, minutes: 917,
    source: 'https://supermia.ai/pricing/', ...verifiedToday,
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'SuperMIA', plan: 'Business', currency: 'USD', symbol: '$', price: 1300, minutes: 12500,
    source: 'https://supermia.ai/pricing/', ...verifiedToday,
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'Vendo AI', plan: 'Starter', currency: 'USD', symbol: '$', price: 99, minutes: 1000,
    source: 'https://www.vendo-ai.com/pricing/', verifiedAt: '2026-09-10', verificationStatus: 'verified-indexed-source',
    note: 'Voice-only equivalent if the full included credit allowance is used for calls; direct source fetch was not consistently reachable from automated clients.'
  },
  {
    company: 'Vendo AI', plan: 'Scale', currency: 'USD', symbol: '$', price: 199, minutes: 1666,
    source: 'https://www.vendo-ai.com/pricing/', verifiedAt: '2026-09-10', verificationStatus: 'verified-indexed-source',
    note: 'Voice-only equivalent if the full included credit allowance is used for calls; direct source fetch was not consistently reachable from automated clients.'
  },
  {
    company: 'Vendo AI', plan: 'Enterprise', currency: 'USD', symbol: '$', price: 1200, minutes: 13333,
    source: 'https://www.vendo-ai.com/pricing/', verifiedAt: '2026-09-10', verificationStatus: 'verified-indexed-source',
    note: 'Voice-only equivalent if the full included credit allowance is used for calls; direct source fetch was not consistently reachable from automated clients.'
  }
];

export const publicBenchmarks = [
  {
    vendor: 'Retell AI',
    value: '$0.07–$0.31/min',
    detail: 'Current published pay-as-you-go range for AI Voice Agents; exact cost depends on model, voice, telephony and add-ons. Retell also shows an example stack at $0.11/min.',
    source: 'https://www.retellai.com/pricing',
    ...verifiedToday
  },
  {
    vendor: 'Bland AI',
    value: '$0.12–$0.14/min',
    detail: 'Current published talk-time rates: Start at $0.14/min and Build at $0.12/min; Build also carries a $299/month platform fee.',
    source: 'https://www.bland.ai/pricing',
    ...verifiedToday
  }
];

export function enrichPlan(plan, targetMargin = 0.7) {
  const revenuePerMinute = plan.price / plan.minutes;
  const costCeiling = revenuePerMinute * (1 - targetMargin);
  const referenceCompression = plan.currency === 'USD' ? 0.09 / costCeiling : null;
  return { ...plan, targetMargin, revenuePerMinute, costCeiling, referenceCompression };
}

export function getIndexData() {
  return plans.map((plan) => enrichPlan(plan));
}

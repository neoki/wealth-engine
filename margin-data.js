export const lastUpdated = '2026-08-28';

export const plans = [
  {
    company: 'Atendy',
    plan: 'Starter',
    currency: 'EUR',
    symbol: '€',
    price: 59,
    minutes: 500,
    source: 'https://atendy.es/precios',
    note: 'Model, voice, telephony and platform presented as included.'
  },
  {
    company: 'Atendy',
    plan: 'Crece',
    currency: 'EUR',
    symbol: '€',
    price: 149,
    minutes: 1500,
    source: 'https://atendy.es/precios',
    note: 'Model, voice, telephony and platform presented as included.'
  },
  {
    company: 'Atendy',
    plan: 'Escala',
    currency: 'EUR',
    symbol: '€',
    price: 399,
    minutes: 4000,
    source: 'https://atendy.es/precios',
    note: 'Model, voice, telephony and platform presented as included.'
  },
  {
    company: 'Zencia',
    plan: 'Pro',
    currency: 'USD',
    symbol: '$',
    price: 31,
    minutes: 500,
    source: 'https://zencia.ai/pricing',
    note: 'Voice agent minutes included in the published monthly plan.'
  },
  {
    company: 'Zencia',
    plan: 'Growth',
    currency: 'USD',
    symbol: '$',
    price: 105,
    minutes: 2000,
    source: 'https://zencia.ai/pricing',
    note: 'Voice agent minutes included in the published monthly plan.'
  },
  {
    company: 'Zencia',
    plan: 'Business',
    currency: 'USD',
    symbol: '$',
    price: 252,
    minutes: 6000,
    source: 'https://zencia.ai/pricing',
    note: 'Voice agent minutes included in the published monthly plan.'
  },
  {
    company: 'SuperMIA',
    plan: 'Launch',
    currency: 'USD',
    symbol: '$',
    price: 10,
    minutes: 84,
    source: 'https://supermia.ai/pricing/',
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'SuperMIA',
    plan: 'Grow',
    currency: 'USD',
    symbol: '$',
    price: 49,
    minutes: 417,
    source: 'https://supermia.ai/pricing/',
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'SuperMIA',
    plan: 'Scale',
    currency: 'USD',
    symbol: '$',
    price: 99,
    minutes: 917,
    source: 'https://supermia.ai/pricing/',
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'SuperMIA',
    plan: 'Business',
    currency: 'USD',
    symbol: '$',
    price: 1300,
    minutes: 12500,
    source: 'https://supermia.ai/pricing/',
    note: 'Voice-minute equivalent of the included credit allowance.'
  },
  {
    company: 'Vendo AI',
    plan: 'Starter',
    currency: 'USD',
    symbol: '$',
    price: 99,
    minutes: 1000,
    source: 'https://www.vendo-ai.com/pricing/',
    note: 'Voice-only equivalent if the full included credit allowance is used for calls.'
  },
  {
    company: 'Vendo AI',
    plan: 'Scale',
    currency: 'USD',
    symbol: '$',
    price: 199,
    minutes: 1666,
    source: 'https://www.vendo-ai.com/pricing/',
    note: 'Voice-only equivalent if the full included credit allowance is used for calls.'
  },
  {
    company: 'Vendo AI',
    plan: 'Enterprise',
    currency: 'USD',
    symbol: '$',
    price: 1200,
    minutes: 13333,
    source: 'https://www.vendo-ai.com/pricing/',
    note: 'Voice-only equivalent if the full included credit allowance is used for calls.'
  }
];

export const publicBenchmarks = [
  {
    vendor: 'Retell AI',
    value: '$0.09–$0.19/min',
    detail: 'A realistic all-in range published by Retell for a voice agent after model and telephony choices.',
    source: 'https://www.retellai.com/es/use-cases/ai-concierge'
  },
  {
    vendor: 'Bland AI',
    value: '$0.11–$0.14/min',
    detail: 'Published AI talk-time rate including LLM, STT and TTS; telephony is separate.',
    source: 'https://www.bland.ai/pricing'
  }
];

export function enrichPlan(plan, targetMargin = 0.7) {
  const revenuePerMinute = plan.price / plan.minutes;
  const costCeiling = revenuePerMinute * (1 - targetMargin);
  const referenceCompression = plan.currency === 'USD' ? 0.09 / costCeiling : null;

  return {
    ...plan,
    targetMargin,
    revenuePerMinute,
    costCeiling,
    referenceCompression
  };
}

export function getIndexData() {
  return plans.map((plan) => enrichPlan(plan));
}

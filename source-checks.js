export const sourceChecks = [
  {
    name: 'Atendy pricing source',
    url: 'https://atendy.es/precios',
    required: true,
    mode: 'reachability',
    minBytes: 500
  },
  {
    name: 'Zencia pricing source',
    url: 'https://zencia.ai/pricing',
    required: true,
    mode: 'reachability',
    minBytes: 500
  },
  {
    name: 'SuperMIA pricing source',
    url: 'https://supermia.ai/pricing/',
    required: true,
    mode: 'reachability',
    minBytes: 500
  },
  {
    name: 'Vendo AI pricing source',
    url: 'https://www.vendo-ai.com/pricing/',
    required: false,
    mode: 'reachability',
    minBytes: 500
  }
];

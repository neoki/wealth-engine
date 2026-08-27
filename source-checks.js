export const sourceChecks = [
  {
    name: 'Atendy pricing',
    url: 'https://atendy.es/precios',
    patterns: [/59\s*€\/mes/i, /500\s+minutos/i, /149\s*€\/mes/i, /1[.,]?500\s+minutos/i, /399\s*€\/mes/i, /4[.,]?000\s+minutos/i]
  },
  {
    name: 'Zencia pricing',
    url: 'https://zencia.ai/pricing',
    patterns: [/\$\s*31\s*\/month/i, /500\s+minutes/i, /\$\s*105\s*\/month/i, /2[.,]?000\s+minutes/i, /\$\s*252\s*\/month/i, /6[.,]?000\s+minutes/i]
  },
  {
    name: 'SuperMIA pricing',
    url: 'https://supermia.ai/pricing/',
    patterns: [/\$10\/month/i, /84\s+mins/i, /\$49\/month/i, /417\s+mins/i, /\$99\/month/i, /917\s+mins/i]
  },
  {
    name: 'Vendo AI pricing',
    url: 'https://www.vendo-ai.com/pricing/',
    patterns: [/\$99\/month/i, /1[.,]?000\s+voice minutes/i, /\$199\/month/i, /1[.,]?666\s+voice minutes/i, /\$1200\/month/i, /13[.,]?333\s+voice minutes/i]
  }
];

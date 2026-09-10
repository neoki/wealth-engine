export const sourceChecks = [
  {
    name: 'Atendy pricing',
    url: 'https://atendy.es/precios',
    required: true,
    patterns: [/75\s*€\s*\/\s*mes/i, /500\s+minutos/i, /210\s*€\s*\/\s*mes/i, /1[.,]?500\s+minutos/i, /420\s*€\s*\/\s*mes/i, /3[.,]?500\s+minutos/i]
  },
  {
    name: 'Zencia pricing',
    url: 'https://zencia.ai/pricing',
    required: true,
    patterns: [/\$\s*31\s*\/\s*month/i, /500\s+minutes/i, /\$\s*105\s*\/\s*month/i, /2[.,]?000\s+minutes/i, /\$\s*252\s*\/\s*month/i, /6[.,]?000\s+minutes/i]
  },
  {
    name: 'SuperMIA pricing',
    url: 'https://supermia.ai/pricing/',
    required: true,
    patterns: [/\$\s*10\s*\/\s*month/i, /84\s+mins/i, /\$\s*49\s*\/\s*month/i, /417\s+mins/i, /\$\s*99\s*\/\s*month/i, /917\s+mins/i, /\$\s*1,?300\s*\/\s*month/i, /12\.5K\s+mins/i]
  },
  {
    name: 'Vendo AI pricing',
    url: 'https://www.vendo-ai.com/pricing/',
    required: false,
    patterns: [/\$\s*99\s*\/\s*month/i, /1[.,]?000\s+voice minutes/i, /\$\s*199\s*\/\s*month/i, /1[.,]?666\s+voice minutes/i, /\$\s*1,?200\s*\/\s*month/i, /13[.,]?333\s+voice minutes/i]
  }
];

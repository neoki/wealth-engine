import crypto from 'node:crypto';

const DEFAULT_EXPLORERS = [
  'wild-consumer',
  'money-hunter',
  'frontier-hacker',
  'boring-capitalist',
  'alien-explorer'
];

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${stable(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function digest(value, salt = '') {
  return crypto.createHash('sha256').update(`${salt}\n${stable(value)}`).digest('hex');
}

export function createSocietySession({
  id = `society-${new Date().toISOString()}`,
  explorers = DEFAULT_EXPLORERS,
  capitalPerExplorer = 1000,
  maxSelections = 3
} = {}) {
  if (new Set(explorers).size !== explorers.length) throw new Error('Explorer ids must be unique');
  return {
    id,
    status: 'independent-exploration',
    createdAt: new Date().toISOString(),
    rules: {
      independenceBeforeConversation: true,
      maxSelections,
      terminalMetric: 'net-capital-generated'
    },
    explorers: Object.fromEntries(explorers.map(name => [name, {
      name,
      initialCapital: capitalPerExplorer,
      remainingCapital: capitalPerExplorer,
      commitment: null,
      revealed: false,
      proposals: []
    }])),
    proposals: {},
    agora: [],
    allocations: [],
    selected: []
  };
}

export function commitIndependentSet(session, explorerId, commitment) {
  assertPhase(session, 'independent-exploration');
  const explorer = requireExplorer(session, explorerId);
  if (explorer.commitment) throw new Error(`${explorerId} already committed`);
  explorer.commitment = commitment;
  return session;
}

export function revealIndependentSet(session, explorerId, { proposals, salt }) {
  assertPhase(session, 'independent-exploration');
  const explorer = requireExplorer(session, explorerId);
  if (!explorer.commitment) throw new Error(`${explorerId} must commit before reveal`);
  if (explorer.revealed) throw new Error(`${explorerId} already revealed`);
  if (digest(proposals, salt) !== explorer.commitment) throw new Error(`Commitment mismatch for ${explorerId}`);

  for (const proposal of proposals) {
    validateProposal(proposal);
    if (session.proposals[proposal.id]) throw new Error(`Duplicate proposal id: ${proposal.id}`);
    const enriched = {
      ...proposal,
      origin: explorerId,
      lineage: [proposal.id],
      critiques: [],
      supporters: [],
      capital: 0
    };
    explorer.proposals.push(proposal.id);
    session.proposals[proposal.id] = enriched;
  }
  explorer.revealed = true;

  if (Object.values(session.explorers).every(x => x.revealed)) {
    session.status = 'agora';
    session.agora.push({ type: 'phase-change', to: 'agora', at: new Date().toISOString() });
  }
  return session;
}

export function critique(session, actor, proposalId, text) {
  assertPhase(session, 'agora');
  requireExplorer(session, actor);
  const proposal = requireProposal(session, proposalId);
  proposal.critiques.push({ actor, text, at: new Date().toISOString() });
  session.agora.push({ type: 'critique', actor, proposalId, text });
  return session;
}

export function mutate(session, actor, parentIds, proposal) {
  assertPhase(session, 'agora');
  requireExplorer(session, actor);
  validateProposal(proposal);
  if (session.proposals[proposal.id]) throw new Error(`Duplicate proposal id: ${proposal.id}`);
  for (const id of parentIds) requireProposal(session, id);
  session.proposals[proposal.id] = {
    ...proposal,
    origin: actor,
    lineage: [...new Set(parentIds.flatMap(id => session.proposals[id].lineage).concat(parentIds, proposal.id))],
    critiques: [],
    supporters: [],
    capital: 0,
    mutation: true
  };
  session.agora.push({ type: 'mutation', actor, parentIds, proposalId: proposal.id });
  return session;
}

export function invest(session, actor, proposalId, amount, reason = '') {
  assertPhase(session, 'agora');
  const explorer = requireExplorer(session, actor);
  const proposal = requireProposal(session, proposalId);
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('Investment amount must be positive');
  if (amount > explorer.remainingCapital) throw new Error(`${actor} lacks capital`);
  explorer.remainingCapital -= amount;
  proposal.capital += amount;
  proposal.supporters.push({ actor, amount, reason });
  session.allocations.push({ actor, proposalId, amount, reason });
  return session;
}

export function closeAgora(session) {
  assertPhase(session, 'agora');
  const ranked = Object.values(session.proposals)
    .map(p => ({
      ...p,
      diversityBonus: diversityBonus(session, p),
      allocationScore: p.capital * diversityBonus(session, p)
    }))
    .sort((a, b) => b.allocationScore - a.allocationScore || b.capital - a.capital);

  session.selected = ranked.slice(0, session.rules.maxSelections).map(p => ({
    proposalId: p.id,
    allocationScore: p.allocationScore,
    capital: p.capital,
    diversityBonus: p.diversityBonus,
    falsification: p.falsification,
    kill: p.kill,
    persist: p.persist,
    scale: p.scale
  }));
  session.status = 'selected-for-falsification';
  return session;
}

export function recordOutcome(session, proposalId, outcome) {
  const proposal = requireProposal(session, proposalId);
  if (!['kill', 'persist', 'scale'].includes(outcome.decision)) throw new Error('Outcome decision must be kill, persist or scale');
  proposal.outcome = {
    ...outcome,
    recordedAt: new Date().toISOString()
  };
  return session;
}

function diversityBonus(session, proposal) {
  const recentOrigins = Object.values(session.proposals).filter(p => p.id !== proposal.id && p.capital > 0);
  if (!recentOrigins.length) return 1;
  const sameCategory = recentOrigins.filter(p => p.category && p.category === proposal.category).length;
  return Math.max(0.75, 1.15 - sameCategory * 0.05);
}

function validateProposal(p) {
  const required = ['id', 'title', 'thesis', 'category', 'falsification', 'kill', 'persist', 'scale'];
  for (const key of required) if (!p?.[key]) throw new Error(`Proposal missing ${key}`);
}

function assertPhase(session, phase) {
  if (session.status !== phase) throw new Error(`Expected phase ${phase}, got ${session.status}`);
}

function requireExplorer(session, id) {
  const explorer = session.explorers[id];
  if (!explorer) throw new Error(`Unknown explorer: ${id}`);
  return explorer;
}

function requireProposal(session, id) {
  const proposal = session.proposals[id];
  if (!proposal) throw new Error(`Unknown proposal: ${id}`);
  return proposal;
}

export const explorerIds = DEFAULT_EXPLORERS;

import assert from 'node:assert/strict';
import {
  createSocietySession,
  digest,
  commitIndependentSet,
  revealIndependentSet,
  critique,
  mutate,
  invest,
  closeAgora,
  recordOutcome
} from '../society-engine.js';

const proposals = {
  a: [{
    id: 'consumer-1', title: 'Tiny social ritual', thesis: 'A repeatable consumer ritual can create voluntary daily attention.', category: 'consumer',
    falsification: 'No organic repeat use in a cheap closed test.', kill: 'Zero repeat behavior.', persist: 'Repeat use without prompting.', scale: 'Organic sharing plus repeat use.'
  }],
  b: [{
    id: 'money-1', title: 'Spread capture', thesis: 'A visible pricing discontinuity can be captured cheaply.', category: 'arbitrage',
    falsification: 'No executable spread after costs.', kill: 'Net spread <= 0.', persist: 'Positive repeatable spread.', scale: 'Repeatable net profit.'
  }]
};

const session = createSocietySession({ explorers: ['a', 'b'], maxSelections: 2 });
const saltA = 'salt-a';
const saltB = 'salt-b';

commitIndependentSet(session, 'a', digest(proposals.a, saltA));
commitIndependentSet(session, 'b', digest(proposals.b, saltB));
assert.equal(session.status, 'independent-exploration');

assert.throws(() => revealIndependentSet(session, 'a', { proposals: proposals.a, salt: 'wrong' }), /Commitment mismatch/);
revealIndependentSet(session, 'a', { proposals: proposals.a, salt: saltA });
assert.equal(session.status, 'independent-exploration');
revealIndependentSet(session, 'b', { proposals: proposals.b, salt: saltB });
assert.equal(session.status, 'agora');

critique(session, 'b', 'consumer-1', 'Distribution may dominate product quality.');
mutate(session, 'a', ['consumer-1', 'money-1'], {
  id: 'hybrid-1', title: 'Consumer spread game', thesis: 'Turn a real pricing discontinuity into a consumer participation loop.', category: 'hybrid',
  falsification: 'Users do not engage or no spread exists.', kill: 'Neither engagement nor positive economics.', persist: 'One side validates.', scale: 'Both engagement and economics validate.'
});

invest(session, 'a', 'money-1', 400, 'Simple economics');
invest(session, 'b', 'hybrid-1', 500, 'Unexpected recombination');
closeAgora(session);
assert.equal(session.status, 'selected-for-falsification');
assert.equal(session.selected.length, 2);
assert.equal(session.selected[0].proposalId, 'hybrid-1');

recordOutcome(session, 'hybrid-1', { decision: 'persist', netCapital: 3.2, evidence: 'Small real-world validation' });
assert.equal(session.proposals['hybrid-1'].outcome.netCapital, 3.2);

console.log('Cognitive society invariants OK');

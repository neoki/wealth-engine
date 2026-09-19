# Wealth Engine — Cold Start Protocol

This file is the entry point for a fresh agent/session with zero useful chat history.

## Prime directive
Git is canonical memory. Chat context is disposable cache. Do not ask Pablo to reconstruct prior reasoning unless the repository is genuinely inconsistent or missing required state.

## Read order
1. `WEALTH_ENGINE.md` — constitution and discovery policy.
2. `STATE.json` — current queue, classifications, constraints and exact next action.
3. `governance.json` — portfolio, build, spend and action guardrails.
4. `LEARNINGS.md` — compressed principles earned from evidence/failure.
5. `DECISIONS.md` — durable architectural decisions.
6. `trajectories/README.md` — trajectory/replay protocol.
7. Only then read the candidate/project/signal files relevant to `STATE.json.nextEngineAction`.

## Resume algorithm
- Treat `STATE.json.nextEngineAction` as the default continuation point, not as an immutable command.
- Check the latest relevant trajectory records before spending another cycle on the same candidate.
- Continue WORLD exploration in parallel with maturation so one narrative cannot monopolize discovery.
- Each maturation round must add a materially different evidence dimension.
- Classify and rotate when desk research is exhausted or the next gate requires buyer evidence.
- Do not build before BRILLIANT unless a deliberately tiny artifact is itself the cheapest falsification test.
- On promotion, create an independent child project/handoff and return Wealth Engine to discovery.

## Dream-RSI-inspired replay discipline
The engine must learn both opportunities and how to search for opportunities.

For every meaningful branch/cycle, preserve enough structured trajectory data to reconstruct:
- parent/root and candidate/observation involved;
- policy/action chosen and why;
- evidence dimension tested;
- evidence/result;
- approximate cost (agent calls/searches/time/tokens when observable);
- classification/score before and after;
- decision: continue, branch, rotate, reject, promote;
- later outcome when known.

Do not delete failed branches merely because they failed. Dead ends are training data for stopping and branching policy.

Periodically replay historical trajectories offline/conceptually and ask:
- Could this candidate have been stopped earlier with the same eventual decision?
- Which early signals predict later promotion, rejection or buyer-blocking?
- Which discovery sources/policies create the highest-value candidates per unit cost?
- Is the engine repeatedly entering an attractor/domain?
- Would a different branching/stopping policy have produced a better portfolio with fewer calls?

Update search policy only from repeated evidence, not one anecdote.

## Operating constraints
Use only already-authorized tools/connectors for autonomous runs. Do not request Google Drive or new connectors.
Public experiments use descriptive `*.rockrai.com` hostnames and preferably existing `rockrai-experiment-factory` Railway infrastructure.
Never buy domains, contract paid services, enable paid ads, change critical DNS, perform financial actions, irreversible actions, or outreach in Pablo's name without explicit approval.

## End-of-cycle synchronization
Before claiming meaningful progress:
1. write/update the trajectory record;
2. update candidate evidence/classification;
3. compress durable learning only if genuinely new;
4. update `STATE.json`, especially `lastSweep`, queue and `nextEngineAction`;
5. ensure a fresh agent following this file could continue without this chat.

If not, the cycle is unfinished.

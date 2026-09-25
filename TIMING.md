# Wealth Engine — Timing Gate

## Purpose
Prevent two expensive errors:
1. entering before enabling technology is reliable/economic enough;
2. entering after the commercial window has already commoditized.

Wealth Engine should not try to be technologically first. It should aim to be commercially early once enabling technology is usable.

Core principle:

> Arrive late technologically and early commercially.

A candidate is attractive when the enabling technology has crossed from research-risk into usable infrastructure, while the market consequences are still underexploited.

## Timing states

Every candidate that depends materially on a technology/platform shift must carry exactly one timing state:

- `TOO_EARLY` — enabling technology is not reliable, cheap or operational enough. Do not build. Preserve the option and define the observable trigger that would reopen it.
- `WINDOW_OPENING` — enabling technology works sufficiently for narrow real use, costs are falling, buyers are beginning to adopt, and obvious category winners are not yet entrenched. Highest-priority state for cheap market tests.
- `OPTIMAL` — technology is dependable and economically usable; buyer pain and willingness to pay are evidenced; the solution layer is not yet fully commoditized. Execute immediately if acquisition is plausible.
- `COMMODITIZING` — core capability is becoming a feature/API/default. Enter only if value can migrate to distribution, proprietary workflow/data, integration, trust, liability, network, brand or outcome ownership.
- `TOO_LATE` — the monetizable layer is broadly bundled/commoditized and no credible durable wedge exists. Reject or mutate up/down the stack.

Timing is not a score of idea quality. A strong idea can be TOO_EARLY today and excellent later.

## Five mandatory evidence dimensions

Assess each candidate on:

### 1. Reliability
Can the enabling capability complete the target job repeatedly without expert babysitting?

Evidence examples:
- repeated task success;
- stable APIs/tooling;
- bounded failure modes;
- manual fallback is cheap.

Red flag:
- value proposition depends on a future model release or perfect prompting.

### 2. Economics
Is the enabling technology cheap enough relative to customer value?

Use:
`enablement_cost / gross_value_created`

A useful default threshold for software/AI-enabled candidates is <=10%, preferably <=3%, unless the capability creates unusually high strategic value.

### 3. Pre-existing pain
Did the buyer spend money/time/risk on this problem before the new technology existed?

Strong evidence:
- payroll;
- outsourced service;
- manual staff hours;
- error/rework cost;
- compliance/risk cost;
- existing software spend.

If the pain exists only because the technology exists, demand risk is much higher.

### 4. Capability/solution gap
Do platform/model vendors provide the primitive while leaving the vertical outcome unsolved?

This is the preferred zone.

Examples:
- model can read invoices; product owns reconciliation, exceptions and SAGE workflow;
- agent can browse; product owns a legally accountable process;
- Copilot can summarize; solution owns firm-specific process, permissions and completion.

If the platform vendor already owns the full job-to-be-done and distribution, timing is usually COMMODITIZING or TOO_LATE unless a durable wedge exists.

### 5. Durable capture window
If the primitive becomes near-free within 12–24 months, what remains valuable?

At least one credible capture asset should accumulate:
- distribution/customer relationships;
- proprietary workflow data;
- integrations;
- switching cost;
- network effects;
- trusted brand;
- domain expertise/liability;
- operational density;
- regulatory approvals;
- outcome ownership.

If nothing accumulates, treat the opportunity as a short-lived arbitrage and cap investment accordingly.

## Decision logic

### TOO_EARLY
Default action: `WATCH`.
- no product build;
- no infrastructure;
- preserve a cheap option;
- record one or more reopening triggers.

Examples of reopening triggers:
- unit cost falls below X;
- task reliability exceeds Y;
- API/tool becomes generally available;
- first credible paid competitor appears;
- regulatory obligation becomes operative.

### WINDOW_OPENING
Default action: `TEST_NOW`.
- create sellable offer before product;
- test buyer/channel/payment;
- exploit manual fulfilment where necessary;
- keep technical commitments reversible.

### OPTIMAL
Default action: `EXECUTE`.
- prioritize exposure and revenue immediately;
- build only after payment evidence;
- begin accumulating durable assets before platform commoditization catches up.

### COMMODITIZING
Default action: `MUTATE_OR_KILL`.
Ask:
- Can we move up the stack to outcome ownership?
- Can we move down the stack to infrastructure/data?
- Do we own privileged distribution?
- Is there a vertical integration the platform is unlikely to build?
If all are no, kill.

### TOO_LATE
Default action: `KILL`.
Only reopen on a materially different wedge, geography, segment or business model.

## Candidate timing record

Use this structure in candidate JSON/Markdown when timing is material:

```json
{
  "timing": {
    "state": "TOO_EARLY|WINDOW_OPENING|OPTIMAL|COMMODITIZING|TOO_LATE",
    "confidence": 0.0,
    "reliability": {"status": "weak|adequate|strong", "evidence": []},
    "economics": {"status": "weak|adequate|strong", "evidence": []},
    "preExistingPain": {"status": "weak|adequate|strong", "evidence": []},
    "capabilitySolutionGap": {"status": "weak|adequate|strong", "evidence": []},
    "durableCapture": {"status": "weak|adequate|strong", "assets": []},
    "reopenTriggers": [],
    "platformAbsorptionRisk": "low|medium|high",
    "asOf": "YYYY-MM-DD"
  }
}
```

Confidence expresses evidence confidence, not attractiveness.

## Timing and the 24-hour revenue rule

The timing gate runs before activation.

- `TOO_EARLY`: do not start the 24h clock.
- `WINDOW_OPENING`: preferred state for a cheap 24h commercial test.
- `OPTIMAL`: start a 24h test as soon as exposure can be achieved.
- `COMMODITIZING`: require a durable wedge before starting a test.
- `TOO_LATE`: no test unless the hypothesis is materially mutated.

This avoids wasting the revenue loop on ideas whose failure is already explained by structural timing.

## Portfolio policy

Maintain intentional asymmetry:
- most active bets should be WINDOW_OPENING or OPTIMAL;
- a small watchlist may be TOO_EARLY when the option cost is near zero and upside is exceptional;
- COMMODITIZING opportunities require unusually strong distribution/outcome ownership;
- TOO_LATE candidates consume no cycles.

## Meta-learning

Track timing calibration in trajectories:
- state assigned at first review;
- evidence used;
- later state transitions;
- whether platform absorption occurred;
- whether waiting improved economics/reliability;
- whether waiting destroyed distribution advantage.

Add replay metric:
`timing-calibration-error` = costly false-early + costly false-late classifications.

The goal is not to predict technology perfectly. The goal is to make mistakes cheap while being positioned before commercial consequences become obvious.

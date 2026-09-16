# PF Planner validation sample pack

This directory is deliberately a **sales-validation artifact**, not a public website.

Contents:
- `customer-inventory.csv` — synthetic but realistic inventory containing active, oversized, stale, compliance-held and application-dependent folders. Addresses use `.invalid`; there is no customer data.
- `PARTNER-ONE-PAGER.md` — one-page explanation for an MSP/consultancy partner.

Generate the assessment locally from the repository root:

```bash
node --input-type=module -e "import fs from 'node:fs'; import {renderAssessmentFromCsv} from './validation/public-folder-exit-planner/csv-to-report.mjs'; const csv=fs.readFileSync('./validation/public-folder-exit-planner/sample-pack/customer-inventory.csv','utf8'); console.log(renderAssessmentFromCsv(csv,{organisation:'Example MSP Customer',now:new Date('2026-09-16T00:00:00Z')}));" > validation/public-folder-exit-planner/sample-pack/GENERATED-ASSESSMENT.md
```

The generated report is intentionally reproducible rather than hand-written. Before any external pilot, regenerate it from the current code so the sample reflects the latest rules.

## Validation protocol

Do not ask whether the idea is "interesting". Give the partner the sample and ask them to compare it with their normal scoping process. Capture:

1. approximate engineer/pre-sales time normally required for this stage;
2. estimated time with PF Planner;
3. incorrect or unsafe recommendations in the sample;
4. missing checks that would prevent them using it;
5. whether they would run one anonymized real opportunity through it;
6. whether value is best priced per assessment, per engineer/MSP, or as white-label tooling.

Gate: evidence from >=3 independent MSPs that it saves meaningful scoping/pre-sales effort, plus >=1 concrete real-opportunity pilot/pay/introduction signal. Failure to reach the gate means reposition, narrow or stop; it does not justify building a public site.

# Android Verification Portfolio Audit — validation v1

Status: manual-validation / deadline-driven
Promoted: 2026-09-17

## Why this survives the candidate gate

Google's 30 September 2026 enforcement is real, but the broad Play-developer market is mostly solved automatically: Google says >99% of Play apps are already registered. Therefore this is **not** a generic verification service and not another one-package checker.

The remaining operational wedge is portfolios with off-Play distribution, legacy packages, multiple signing certificates, white-label builds, delegated/store-managed signing, contested package names, or packages left in DRAFT / IN_REVIEW / PENDING_TRANSFER.

Google's Android Developer Console API makes portfolio-level status and remediation technically tractable: developer accounts expose verification state; packages expose registration state; keys expose SHA-256 fingerprints and registration state; existing package names can require proof of key ownership; non-eligible keys can require a business justification that Google reviews (documented as potentially taking up to 24 hours).

## Buyer

Primary: Android agencies, white-label app factories, enterprise mobility teams and independent publishers with multiple package names and distribution outside Google Play or across multiple stores.

Do **not** target ordinary single-app Play developers.

## Job to be done

> "Tell me which packages in our Android portfolio can become an installation problem, why, and exactly what must happen before enforcement — without taking custody of our signing keys."

## Manual input

Ask for a CSV/spreadsheet or screen-share-derived inventory containing only:

- package name
- friendly/app name
- distribution channels / stores
- launch-market exposure
- developer account used
- current package registration state if known
- SHA-256 **public certificate fingerprint** for each production signing key
- whether signing is self-managed, Play-managed or delegated to another store
- owner/team for remediation

Never request a private signing key, keystore file, password, production credential or custody of a signing secret.

## Output: portfolio rescue matrix

One row per package × production signing key:

| Field | Meaning |
|---|---|
| package | Android package name |
| channel | Play / partner store / direct / enterprise / other |
| account_state | VERIFIED / NOT_VERIFIED / UNKNOWN |
| package_state | REGISTERED / DRAFT / IN_REVIEW / PENDING_TRANSFER / UNKNOWN |
| key_fingerprint | SHA-256 public fingerprint |
| key_state | REGISTERED_ACTIVE / OWNERSHIP_VERIFIED / IN_REVIEW / DRAFT / PENDING_TRANSFER / UNKNOWN |
| signing_owner | self / Play / delegated store / unknown |
| exposure_2026_09_30 | YES / NO / UNCERTAIN |
| blocker | concise blocker or none |
| remediation | exact next action |
| human_owner | responsible team/person |
| urgency | P0 / P1 / P2 |
| evidence | console/API evidence timestamp |

### Priority semantics

- **P0**: launch-market exposure + unregistered/unknown package or account/key blocker; action now.
- **P1**: no immediate launch-market exposure but likely 2027 global exposure, or registration incomplete/ambiguous.
- **P2**: evidence shows account + package + required key registration complete; retain evidence and recheck before release/distribution change.

UNKNOWN never becomes P2.

## Remediation decision tree

1. Confirm developer identity/account state.
2. Confirm every shipped package name, including off-Play packages.
3. Confirm each relevant production signing certificate.
4. For an existing package requiring ownership proof, generate Google's verification token and have the **customer** create/sign the challenge APK locally with the matching private key.
5. If the key is ineligible or justification is required, prepare the factual business rationale and submit through the customer's account.
6. If signing is delegated to a store, follow the store-managed proof route rather than asking for its key.
7. Recheck package/key state after submission and retain timestamped evidence.

## Deliverable

Fixed-scope `Android Verification Portfolio Rescue Pack`:

1. executive one-page RED / AMBER / GREEN portfolio summary;
2. package × key rescue matrix;
3. P0 remediation queue for the 30 September launch markets;
4. 2027 backlog for packages not immediately exposed;
5. evidence ledger showing what was checked and when.

GREEN means evidence-backed registered state, not "probably fine".

## Commercial hypothesis

The previous EUR 149–399 hypothesis is probably too low for a multi-package engineering portfolio. Test fixed-scope tiers manually rather than publishing them:

- micro portfolio (<=5 packages): EUR 290 hypothesis
- portfolio (6–25): EUR 690 hypothesis
- agency / >25 / multiple signing arrangements: EUR 1,500+ hypothesis after scoping

These are validation anchors only. Do not publish checkout or collect money without the normal approval/gate.

## Evidence already found

- Google: enforcement begins 2026-09-30 in Brazil, Indonesia, Singapore and Thailand across seven participating stores; global expansion follows in 2027.
- Google: >99% of Play apps are already registered, so broad Play targeting is weak.
- Google: API supports account, package and key state plus programmatic registration workflows.
- Google: package names with multiple developers/keys have eligibility rules; some registrations require ownership proof and/or justification.
- Free one-package status tools already exist (AABReady, PkgReady), confirming that a checker itself is commoditized.
- Recent developer discussion shows confusion between warning emails and actual console registration state; the console/package/key state is the useful evidence.

## Validation gate before any public web

PASS only if all are true:

1. >=3 plausible portfolio owners confirm they have enough packages/signing complexity that a package-by-package audit saves meaningful work or risk.
2. >=1 supplies an anonymised real portfolio or accepts a live screen-share audit.
3. The audit finds >=1 non-obvious actionable state/blocker **or** saves >=1 hour of release/ops work.
4. >=1 expresses credible willingness to pay at least EUR 290, or an agency says it would reuse/white-label the workflow across clients.

STRONG PASS: one agency/MSP/mobile consultancy has >=5 client portfolios needing the same audit.

KILL / reshape if affected portfolios are routinely resolved in <30 minutes using Play/Android Developer Console alone, or if buyers only want a free single-package check.

## Infrastructure rule

No public web yet. If the validation gate passes, proposed public location: `android-verify.rockrai.com`, preferably through `rockrai-experiment-factory` on Railway. Do not buy a domain, paid service, ads, or change critical DNS without Pablo's explicit approval.

# Project Operating Manual

> Concise operating contract for contributors and automation agents in this repository.

## Roles

- **Product/design review**: Clarifies behavior, scope, safety, and release readiness.
- **Implementation**: Builds, debugs, runs checks, and reports results.
- **User**: Approves product decisions, releases, commits, and pushes.
- **Repo docs**: Shared memory and source of truth.

## Core Rules

- Keep one active feature at a time unless the user explicitly splits work.
- Track the active feature, state, blocker, and next step in `docs/STATUS.md`.
- Prefer the smallest safe change and stay within the active task.
- Start unclear or high-risk work with investigation/planning only.
- Follow existing patterns before inventing new ones.
- Preserve user work and unrelated files.
- Run relevant checks, or explain why checks were not run.
- Do not commit or push unless explicitly asked.

## Build Pass Discipline

- Large feature briefs are not build prompts.
- One build pass should target one clear implementation outcome.
- Build prompts should name the current pass and what is not included.
- Keep full feature details in `docs/features/*.md`, not build prompts.
- If a prompt has more than 5-7 meaningful implementation requirements, create a Build Pass Plan first.
- Use `docs/HANDOFFS.md` for Build Pass Plan and implementation prompt templates.

## Risk Rules

- **Low**: Small local edits may be implemented directly.
- **Medium**: Inspect first, then implement one focused pass.
- **High**: Auth, security, billing, data deletion, migrations, secrets, deployment, CI/CD, public APIs, broad refactors, or data-loss risk require a plan before edits.

## Never Without Explicit Approval

- Delete files or folders.
- Change unrelated files.
- Make broad rewrites.
- Add major dependencies or frameworks.
- Change schemas, localStorage keys, public APIs, migration behavior, or backup formats.
- Add auth, cloud sync, analytics, payment processing, bank/card import, OCR/email scanning, native app-store wrappers, paid services, push notifications, or sensitive-data handling.
- Delete user data.
- Commit or push.

## Stop and Report If

- User-visible behavior is ambiguous.
- Scope expands beyond the current pass.
- Required context is missing.
- Tests reveal unrelated failures.
- A change risks data loss, PWA continuity, backup compatibility, or privacy.
- Two focused bug-fix attempts fail.

## Documentation

- `docs/STATUS.md`: Current workflow state, blocker, and next step.
- `docs/VISION.md`: Product direction.
- `docs/DECISIONS.md`: Durable product, UX, technical, and workflow decisions.
- `docs/BACKLOG.md`: Future work and not-now ideas.
- `docs/BUGS.md`: Confirmed bugs, regressions, fixes, and regression checks.
- `docs/HANDOFFS.md`: Planning, prompt templates, and documentation sweep checklist.
- `docs/features/*.md`: Feature-specific scope, risks, QA, and history.
- `README.md`: Public user-facing capabilities, setup, privacy notes, and project summary.

After meaningful feature, bugfix, release, roadmap, process, or risk changes, run a documentation sweep using `docs/HANDOFFS.md` and report what changed.

## Release Bundling

- Bundle related small fixes into one local release package when safe.
- Split bundles into focused local passes.
- Keep separate releases when combining changes would increase risk.
- Do not commit or push between local passes unless explicitly asked.
- Run relevant checks and the documentation sweep before the final commit.

## Project Invariants

- Static app: plain HTML, CSS, and JavaScript.
- No framework or dependency unless explicitly approved.
- Phone-first, minimalist product direction.
- Manual data entry is the v1 source of truth.
- Default currency is TRY.
- Billing cycle values are weekly, monthly, quarterly, and yearly.
- Payment-related fields are labels/nicknames only, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.
- Allowed user data is limited to subscription or bill name, price/amount, currency, billing date, billing cycle, payment label/nickname, and optional category/notes/end date.
- Data stays local in browser/device storage. Do not add upload, cloud sync, data sale, analytics, payment authorization, or payment processing without explicit future review.
- Preserve existing localStorage keys unless an explicit backward-compatible migration is planned:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
- Preserve the supported plain text backup format unless an explicit versioned change is planned.
- Preserve installed/home-screen PWA continuity: live GitHub Pages URL, manifest `start_url: "./"`, manifest `scope: "./"`, root-level `service-worker.js` registration, offline app shell after first visit, existing saved records, and local-only privacy stance.
- Bump app shell/cache versions when runtime app assets change.
- If app naming or branding changes, preserve the same live URL and installed PWA continuity.
- Do not request, store, display, export, or imply users should enter sensitive payment data such as card numbers, CVV/CVC, bank account numbers, IBAN, passwords, payment provider login details, identity numbers, or data needed to make, authorize, or process a payment.
- Do not claim product features are built until implementation and checks have actually happened.

# Project Operating Manual

> Shared operating rules for contributors and automation agents in this repository.

## Roles

- **Product/design review**: Clarifies behavior, scope, safety, and release readiness.
- **Implementation**: Builds, debugs, runs checks, and reports results.
- **User**: Human-in-the-loop for product decisions and approvals.
- **Repo docs**: Shared memory.

## Core Loop

1. Clarify product behavior and scope.
2. Build the smallest safe implementation pass.
3. Review results against the intended behavior.
4. Review/fix until approved.

## Active Work Rules

- Keep one active feature at a time unless the user explicitly splits work.
- Track the active feature in `docs/STATUS.md`.
- Use a feature file in `docs/features/` for multi-step work.
- A feature is approved only when design intent matches shipped behavior.
- Tiny-task exception: for small, low-risk edits, automation agents may implement directly and briefly report what changed.

## Build Pass Discipline

- Large feature briefs are not build instructions.
- Work should be split into small, reviewable build passes.
- Each build pass should target one clear implementation outcome.
- Build instructions must name the current pass and what is not included in this pass.
- Unknown repos or unclear features should start with investigation-only work.
- Full feature details belong in the feature file; build instructions should contain only the current pass.
- If a handoff feels too large for one focused session, stop and propose a smaller Build Pass Plan.

Use `docs/HANDOFFS.md` for the full Build Pass Plan template.

## Risk Levels

- **Low**: Local low-risk change. Automation agents may implement directly.
- **Medium**: Multi-file feature or bug. Inspect first, then implement the smallest safe change.
- **High**: Auth, security, billing, data deletion, migrations, secrets, deployment, CI/CD, public APIs, broad refactors.

For high-risk work, investigate and report a plan before editing unless explicitly authorized.

## Safety Rules

- Prefer the smallest safe change.
- Stay within the active task.
- Do not rewrite, reorganize, or polish unrelated docs during active work.
- Follow existing patterns before inventing new ones.
- Run relevant checks, or explain why checks were not run.
- Preserve user work and unrelated files.

## Never Without Explicit Instruction

- Delete files or folders.
- Change unrelated files.
- Make broad rewrites.
- Add major dependencies or frameworks.
- Change public APIs.
- Modify auth/security, billing, migrations, secrets, deployment, or CI/CD.
- Delete user data.
- Push to remote.

## Stop Conditions

Stop and ask or report when:

- User-visible behavior is ambiguous.
- Implementation needs a product or design decision.
- Required context is missing.
- Tests reveal unrelated failures.
- The change is broader than expected.
- Two focused bug-fix attempts fail.

## Documentation Ownership

- `docs/STATUS.md`: Rotating current state.
- `docs/VISION.md`: Product north star.
- `docs/DECISIONS.md`: Durable decisions.
- `docs/BUGS.md`: Bug and root-cause memory. For any confirmed bug, regression, production issue, PWA cache issue, data compatibility issue, or user-reported defect, update `docs/BUGS.md` in the same bugfix or follow-up docs pass.
- `docs/BACKLOG.md`: Not-now work.
- `docs/HANDOFFS.md`: Copy-paste work templates.
- `docs/features/*.md`: Feature-specific design, build, and review history.
- `README.md`: Public user-facing capabilities, setup, privacy notes, and current project summary.

## Documentation Sweep

After any meaningful feature, bugfix, product decision, roadmap item, release state, workflow rule, or known risk changes, contributors and automation agents must inspect the relevant docs and update every affected file. Check whether updates are needed in `README.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/BACKLOG.md`, `docs/VISION.md`, `docs/BUGS.md`, `docs/HANDOFFS.md`, and relevant `docs/features/*.md` files.

- `docs/STATUS.md` reflects the current workflow state, blocker, and next step.
- `docs/DECISIONS.md` records durable decisions, not every idea.
- `docs/BACKLOG.md` records future ideas and candidates.
- `docs/VISION.md` records product direction and scope changes.
- `docs/BUGS.md` records confirmed bugs, regressions, fixes, and regression checks.
- `docs/features/*.md` records detailed per-feature scope, risks, QA, and release state.
- `README.md` records public user-facing capabilities and the current project summary.

Every report after a meaningful change must list which docs were updated, which docs were inspected but did not need changes, and why key docs were not changed when that context matters.

## Session Start

1. Read `AGENTS.md`.
2. Read `docs/STATUS.md`.
3. Read the active feature file if one is listed.
4. Read `docs/DECISIONS.md` and `docs/BUGS.md` only when relevant.
5. Read stable docs once per session; do not repeatedly reread unchanged docs unless needed.

## Session End

- Update `docs/STATUS.md` if state changed.
- Update the active feature file if active feature changed.
- Update `docs/DECISIONS.md` only for durable decisions.
- Update `docs/BUGS.md` for confirmed bugs and meaningful root-cause info. Entries should include symptom, affected version or context, root cause if known, fix, verification/regression checks, and status including fixed version or commit when available.
- Run the Documentation Sweep when any meaningful project state, product, workflow, roadmap, release, feature, risk, or bug information changed.
- If a bugfix is urgent, the runtime fix may be committed first, but `docs/BUGS.md` must be updated before the release is considered complete.

## Handoffs

- Use `docs/HANDOFFS.md` for copy-paste work templates.
- Default build instruction fields: Task, Context, Read first, Risk, Build pass, Not in this pass, Scope, Must preserve, Must not do, Acceptance, Tests/checks, Stop and report if, Report.

---

<!-- Everything above this line is reusable across projects. Everything below is project-specific. -->

## Project-Specific Settings

### Project Name

<!-- Add the project/product name. -->

- Subscription Tracker

### Tech Stack

<!-- Add languages, frameworks, package managers, test tools, and runtime versions. -->

- Static app: plain HTML, CSS, and JavaScript.
- No framework and no dependencies for the current v1 direction.

### Active Systems

<!-- List major app areas, services, packages, or domains. -->

- Subscription records: user-entered subscriptions with name, price, billing date, payment occurrence, payment label/nickname, optional category/notes/currency, activity log history, edit, and delete behavior.
- Upcoming payments: next-7-days view for near-term subscription charges.
- Spending summary: small infographic/pie chart for subscription distribution.
- Export: text and CSV data output.

### Naming Conventions

<!-- Add project-specific naming rules for files, branches, features, APIs, or tickets. -->

- Active v1 feature file: `docs/features/subscription-tracker-v1.md`.
- Use `subscription-tracker-v1` for the first app feature lifecycle unless explicitly renamed.

### Implementation Guardrails

<!-- Add only rules that are specific to this repository. Keep general agent rules above. -->

- Phone-first, minimalist product direction.
- Manual data entry is the v1 source of truth.
- Default currency is TRY.
- Billing cycle values are weekly, monthly, quarterly, and yearly.
- Installed/home-screen users must remain supported across future updates. Preserve the live GitHub Pages URL, manifest `start_url: "./"`, manifest `scope: "./"`, root-level `service-worker.js` registration, offline app shell behavior after first visit, existing saved records, and the local-only privacy stance.
- Preserve existing localStorage keys: `subscription-tracker-v1-subscriptions` and `subscription-tracker-v1-activity-log`.
- Storage or data model changes require backward-compatible migration. Cached app shell asset changes require a static service worker cache name bump.
- Preserve existing CSV compatibility unless an explicitly versioned export format is introduced.
- If app naming or branding changes, preserve the same live URL and installed PWA continuity.
- Payment-related fields must be treated as labels/nicknames only, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.
- Allowed user data is limited to subscription or bill name, price/amount, currency, billing date, billing cycle, payment label/nickname, and optional future category/notes.
- Do not request, store, display, export, or imply that users should enter sensitive payment data: credit card numbers, CVV/CVC, bank account numbers, IBAN, passwords, payment provider login details, identity numbers, or any data needed to make, authorize, or process a payment.
- Data should stay under user control in browser/device storage. Do not add upload, cloud sync, data sale, analytics, payment processing, or payment authorization without an explicit future feature brief and privacy/security review.
- Do not add auth, cloud sync, bank/card import, OCR/email scanning, push notifications, native app-store wrappers, or paid services without an explicit future feature brief.
- Do not claim product features are built until implementation and checks have actually happened.

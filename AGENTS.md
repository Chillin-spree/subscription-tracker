# ChatGPT + Codex Operating Manual

> Shared operating rules for using ChatGPT and Codex together in this repository.

## Role Split

- **ChatGPT**: Designer / Architect / Router / Prompt-writer / Reviewer / Safety Gate.
- **Codex**: Builder / Debugger / Implementer / Test runner.
- **User**: Human-in-the-loop / courier between systems.
- **Repo docs**: Shared memory.

## Core Loop

1. Design here with ChatGPT.
2. Build in Codex.
3. Paste Codex result back to ChatGPT.
4. Review/fix until approved.

## Active Work Rules

- Keep one active feature at a time unless the user explicitly splits work.
- Track the active feature in `docs/STATUS.md`.
- Use a feature file in `docs/features/` for multi-step work.
- A feature is approved only when design intent matches shipped behavior.
- Tiny-task exception: for small, low-risk edits, Codex may implement directly and briefly report what changed.

## Build Pass Discipline

- Large feature briefs are not Codex build prompts.
- Work should be split into small, reviewable build passes.
- Each Codex prompt should target one clear implementation outcome.
- Build prompts must name the current pass and what is not included in this pass.
- Unknown repos or unclear features should start with investigation-only work.
- Full feature details belong in the feature file; Codex build prompts should contain only the current pass.
- If a handoff feels too large for one focused session, stop and propose a smaller Build Pass Plan.

Use `docs/HANDOFFS.md` for the full Build Pass Plan template.

## Risk Levels

- **Low**: Local low-risk change. Codex may implement directly.
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
- `docs/BUGS.md`: Bug and root-cause memory.
- `docs/BACKLOG.md`: Not-now work.
- `docs/HANDOFFS.md`: Copy-paste prompt templates.
- `docs/features/*.md`: Feature-specific design, build, and review history.

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
- Update `docs/BUGS.md` only for meaningful bug/root-cause info.

## Handoffs

- Use `docs/HANDOFFS.md` for copy-paste prompt templates.
- Default Codex prompt fields: Task, Context, Read first, Risk, Build pass, Not in this pass, Scope, Must preserve, Must not do, Acceptance, Tests/checks, Stop and report if, Report.

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
- Use `subscription-tracker-v1` for the first app feature lifecycle unless ChatGPT explicitly renames it.

### Implementation Guardrails

<!-- Add only rules that are specific to this repository. Keep general agent rules above. -->

- Phone-first, minimalist product direction.
- Manual data entry is the v1 source of truth.
- Default currency is TRY.
- Billing cycle values are weekly, monthly, quarterly, and yearly.
- Payment-related fields must be treated as labels/nicknames only, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.
- Allowed user data is limited to subscription or bill name, price/amount, currency, billing date, billing cycle, payment label/nickname, and optional future category/notes.
- Do not request, store, display, export, or imply that users should enter sensitive payment data: credit card numbers, CVV/CVC, bank account numbers, IBAN, passwords, payment provider login details, identity numbers, or any data needed to make, authorize, or process a payment.
- Data should stay under user control in browser/device storage. Do not add upload, cloud sync, data sale, analytics, payment processing, or payment authorization without an explicit future feature brief and privacy/security review.
- Do not add auth, cloud sync, bank/card import, OCR/email scanning, push notifications, native app-store wrappers, or paid services without an explicit future feature brief.
- Do not claim product features are built until implementation and checks have actually happened.

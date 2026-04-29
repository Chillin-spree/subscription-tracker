# Handoffs

> Copy-paste work templates for moving work between planning, implementation, and review.

<!-- Keep templates concise. Add project-specific templates only when they are reused. -->

## Feature Brief

```text
Task:
Create or refine the feature spec for <feature>.

Context:

Read first, in this order:
- AGENTS.md
- docs/STATUS.md
- docs/VISION.md
- docs/DECISIONS.md, only if relevant
- docs/features/<feature>.md, if it exists

Risk:
Low | Medium | High

Scope:

Must preserve:

Must not do:

Acceptance:

Report:
- Proposed behavior
- Open questions
- Suggested build instructions
```

## Build Pass Plan

Use this when a feature brief is too large for one focused implementation pass.

Prompt sizing guidance:

- Large feature briefs are not Codex build prompts.
- A Codex prompt should target one focused implementation outcome.
- If a task combines more than 5-7 meaningful implementation requirements, first create a Build Pass Plan.
- Prefer investigation-only first when repo structure is unknown, behavior is unclear, or risk is high.
- Keep full feature details in feature files; keep build prompts limited to the current pass.

Split the work if it includes multiple of:

- New navigation/app shell.
- Provider/API abstraction.
- Real external API integration.
- Schema/data model changes.
- Persistence/local storage/database changes.
- Complex UI states.
- Settings/preferences.
- Export/print behavior.
- Tests across multiple layers.
- Docs updates.

```text
BUILD PASS PLAN — <feature-name>

Full feature:
<one sentence>

Risk:
Low | Medium | High

Recommended passes:
1. Investigation / repo map — no edits
2. <small build pass>
3. <small build pass>
4. <small build pass>
5. Docs/checks/final cleanup

Rules:
- Each pass should have one clear outcome.
- Do not combine shell, provider logic, persistence, and secondary features in one pass.
- Use investigation-first when repo structure is unknown.
- Report safe pass boundaries before implementation begins.
```

## Codex Implementation Prompt

```text
Task:
Implement <feature/change>.

Context:

Read first, in this order:
- AGENTS.md
- docs/STATUS.md
- docs/features/<feature>.md
- docs/DECISIONS.md, only if relevant
- docs/BUGS.md, only if debugging

Risk:
Low | Medium | High

Build pass:

Not in this pass:

Scope:
Current pass only; full feature details belong in the feature file.

Must preserve:

Must not do:

Acceptance:

Tests/checks:

Stop and report if:
- scope is ambiguous
- implementation requires risky changes outside this scope
- required context is missing
- tests reveal unrelated failures

Report:
- Summary
- Files changed
- Documentation sweep: updated docs; inspected docs with no changes; key docs intentionally unchanged
- Checks run
- Anything blocked or risky
```

## New Chat Startup

```text
Task:
Continue work on <project/feature>.

Startup rules:
- Use repo docs as the source of truth.
- Read AGENTS.md and docs/STATUS.md first.
- Read the active feature file if docs/STATUS.md lists one.
- Read docs/DECISIONS.md only when durable decisions matter.
- Read docs/BUGS.md only for bugfix/regression work.
- Do not rely on pasted history if repo docs conflict.

Report:
- Current state
- Active feature or pass
- Any mismatch between pasted context and repo docs
- Recommended next step
```

## Bug Investigation

```text
Task:
Investigate <bug/symptom> and identify the smallest safe fix.

Context:

Read first, in this order:
- AGENTS.md
- docs/STATUS.md
- docs/BUGS.md
- docs/features/<feature>.md, if relevant

Risk:
Low | Medium | High

Scope:
Investigate first. Do not edit yet, unless explicitly authorized.

Must preserve:

Must not do:

Acceptance:

Tests/checks:

Report:
- Reproduction steps
- Likely root cause
- Proposed fix
- Files likely involved
- Whether implementation is safe to proceed
- Proposed fix pass, if implementation is needed
```

## Review Memo

```text
Task:
Review implementation result for <feature/change>.

Context:

Implementation summary:

Files changed:

Tests/checks:

Risk:
Low | Medium | High

Acceptance:

Review focus:
- Correctness
- Scope control
- User-visible behavior
- Missing tests/checks
- Documentation updates

Report:
- Approved or not approved
- Required fixes
- Optional follow-ups
- Documentation sweep: updated docs; inspected docs with no changes; key docs intentionally unchanged
```

## Scope Question

```text
Task:
Resolve a scope or product question before implementation continues.

Context:

Question:

Options:
1.
2.
3.

Risk:

Must preserve:

Decision needed:

Report:
- Chosen direction
- Any change to acceptance criteria
- Whether docs need updating
- Documentation sweep: updated docs; inspected docs with no changes; key docs intentionally unchanged
```

## Fix Follow-up

```text
Task:
Apply the requested fix after review.

Context:

Read first, in this order:
- AGENTS.md
- docs/STATUS.md
- docs/features/<feature>.md

Review finding:

Risk:
Low | Medium | High

Scope:
Only fix the reviewed issue unless another change is required to complete it safely.

Must preserve:

Must not do:

Acceptance:

Tests/checks:

Stop and report if:
- scope is ambiguous
- implementation requires risky changes outside this scope
- required context is missing
- tests reveal unrelated failures

Report:
- What changed
- Files changed
- Documentation sweep: updated docs; inspected docs with no changes; key docs intentionally unchanged
- Checks run
- Any remaining risk
```

## Documentation Sweep Checklist

Use this after any meaningful feature, bugfix, product decision, roadmap item, release state, workflow rule, or known risk changes.

```text
Documentation sweep:
- README.md: public capabilities, setup, privacy notes, and current project summary.
- docs/STATUS.md: current workflow state, blocker, and next step.
- docs/DECISIONS.md: durable decisions only, not every idea.
- docs/BACKLOG.md: future ideas and candidates.
- docs/VISION.md: product direction and scope changes.
- docs/BUGS.md: confirmed bugs, regressions, fixes, and regression checks.
- docs/HANDOFFS.md: reusable workflow templates and checklists.
- docs/features/*: per-feature scope, risks, QA, and release state.

Update when:
- A feature, bugfix, release, roadmap item, process rule, durable decision, or known risk changes.
- A confirmed bug, regression, production issue, PWA cache issue, or data compatibility issue is found or fixed.
- The active feature, owner, blocker, current step, or next step changes.

Do not update when:
- The doc is unaffected by the current pass.
- The change is runtime-only and already captured by a more specific feature file or status note.
- The change is an idea that belongs in backlog rather than a decision.

Report:
- Docs updated:
- Docs inspected with no changes:
- Key docs intentionally unchanged and why:
```

## Refactor

```text
Task:
Refactor <area> for <specific reason>.

Context:

Read first, in this order:
- AGENTS.md
- docs/STATUS.md
- docs/DECISIONS.md, only if relevant
- docs/features/<feature>.md, if relevant

Risk:
Medium | High

Scope:

Must preserve:
- Current user-visible behavior
- Existing public APIs unless explicitly approved

Must not do:
- Add unrelated behavior
- Rewrite broader areas than scoped
- Change dependencies unless explicitly approved

Acceptance:

Tests/checks:

Stop and report if:
- scope is ambiguous
- implementation requires risky changes outside this scope
- required context is missing
- tests reveal unrelated failures

Report:
- Refactor summary
- Files changed
- Behavior preserved
- Checks run
- Any follow-up risk
```

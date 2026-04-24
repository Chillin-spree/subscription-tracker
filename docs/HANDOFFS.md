# Handoffs

> Copy-paste prompt templates for moving work between ChatGPT, Codex, and review.

<!-- Keep templates concise. Add project-specific prompts only when they are reused. -->

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
- Suggested Codex build prompt
```

## Build Pass Plan

Use this when a feature brief is too large for one focused Codex pass.

Split the prompt if it includes multiple of:

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
```

## Codex Build Prompt

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
- implementation requires risky changes outside this prompt
- required context is missing
- tests reveal unrelated failures

Report:
- Summary
- Files changed
- Checks run
- Anything blocked or risky
```

## Bug Investigation Prompt

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
Review Codex result for <feature/change>.

Context:

Codex summary:

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
```

## Fix Follow-up Prompt

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
- implementation requires risky changes outside this prompt
- required context is missing
- tests reveal unrelated failures

Report:
- What changed
- Files changed
- Checks run
- Any remaining risk
```

## Refactor Prompt

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
- implementation requires risky changes outside this prompt
- required context is missing
- tests reveal unrelated failures

Report:
- Refactor summary
- Files changed
- Behavior preserved
- Checks run
- Any follow-up risk
```

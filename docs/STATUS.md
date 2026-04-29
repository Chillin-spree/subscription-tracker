# Status

> Live control tower for the current project workflow. Keep this short.

<!-- Maintenance rules:
- Update when the active feature, owner, blocker, or next step changes.
- Keep this file skimmable; move details into feature files, DECISIONS.md, or BUGS.md.
- Session Log should keep only the most recent 5-8 entries.
-->

## Architecture

- Product/design review clarifies behavior, scope, safety, and release readiness.
- Implementation work builds, debugs, runs checks, and reports results.
- The user reviews outcomes and makes product decisions.
- Repo docs are shared memory.

## Workflow State

- **Mode**: v1.9.1 QA/docs baseline
- **Active feature**: Range/date helper verification baseline
- **Feature file**: none yet
- **Risk**: low to medium
- **Owned by**: Product/design review and implementation
- **Current step**: v1.9.1 Pass 2 range/date helper verification harness is implemented locally and ready for review.
- **Waiting on**: Review, then commit/push if approved.
- **Blockers**: none
- **Next recommended step**: Review the local v1.9.1 QA/docs baseline, then commit/push if approved before security hardening or new UI work.
- **Recent touch points**: v1.9.0 Range breakdown modes shipped in commit `310c1cf` and were pushed to `main`. Live GitHub Pages asset verification passed for `app.js?v=1.9.0` and `subscription-tracker-v1.9.0-static`; browser/PWA smoke was not performed. Local v1.9.1 adds a dependency-free range/date helper verification script. Runtime app shell/cache remains `v1.9.0`.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-29
- **Handoff type**: v1.9.1 QA/docs baseline
- **Summary**: Correct stale v1.9.0 release-state docs and add a focused range/date helper verification harness without changing runtime behavior.
- **Where full handoff lives**: this status file; v1.9.0 feature history remains in `docs/features/subscription-tracker-v1.9-range-breakdown-modes.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-29: Implemented local v1.9.1 range/date helper verification harness in `scripts/verify-range-helpers.js`. Coverage includes date validation, weekly/monthly/quarterly/yearly range occurrences, inclusive end dates, item/category/payment range breakdown rows, mixed-currency separation, and empty/invalid range behavior. Runtime app behavior and app shell/cache remain unchanged.
- 2026-04-29: Started v1.9.1 QA/docs baseline. Corrected stale v1.9.0 release-state docs after verifying they still described the release as local/pending review. v1.9.0 shipped in commit `310c1cf`, live asset verification passed, browser/PWA smoke was not performed, and the next recommended pass is a range/date helper verification harness.
- 2026-04-29: Completed v1.9.0 verification/documentation sweep before final review and push. Added the Range breakdown modes feature file, updated public/status/backlog docs, and confirmed backup parser/format/schema/storage behavior, localStorage keys, hidden CSV/JSON controls, and local-only behavior remained unchanged. Runtime app shell/cache moved to `v1.9.0`.
- 2026-04-29: Implemented local v1.9.0 Runtime Range breakdown sub-modes. The Range tab now offers non-persisted `By item`, `By category`, and `By payment` controls backed by existing selected-range helper rows. By item remains the default and matches the previous Range behavior. Top-level Items/Categories/Payment remain monthly normalized. Backup parser/format/schema/storage behavior, localStorage keys, hidden CSV/JSON controls, and local-only behavior remain unchanged. App shell versioning moved to `v1.9.0`.
- 2026-04-29: Applied local process-doc cleanup. `AGENTS.md` is now a concise operating contract, `docs/HANDOFFS.md` carries detailed prompt/checklist guidance, runtime app remains v1.8.8, v1.9 Range breakdown work has not started, and the next recommended app step remains v1.9 planning/implementation after this process cleanup is reviewed.
- 2026-04-29: Implemented local v1.8.8 copy-backup export. The Backup panel now offers `Copy backup text` beside `Download backup text`; copy uses the same plain text backup source as download and falls back to download guidance if the Clipboard API is unavailable or fails. Parser behavior, backup format, restore behavior, storage, CSV, JSON, and hidden legacy UI behavior remain unchanged. App shell versioning moved to `v1.8.8`.
- 2026-04-29: Implemented local v1.8.7 final backup-panel stabilization. The panel heading now reads `Backup`, pasted-restore safety copy states that restore replaces current subscriptions while keeping activity log and saved presets, and the preview result has status semantics. Parser behavior, backup format, restore behavior, storage, CSV, JSON, and hidden legacy UI behavior remain unchanged. App shell versioning moved to `v1.8.7`.
- 2026-04-29: Implemented local v1.8.6 backup accessibility polish. The pasted backup textarea now references its help text, and the preview/restore controls reference the preview result while preserving visible labels, restore gating, parser behavior, storage, CSV, JSON, and hidden legacy UI behavior. App shell versioning moved to `v1.8.6`.

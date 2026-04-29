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

- **Mode**: process-doc cleanup applied locally; runtime app remains v1.8.8
- **Active feature**: AGENTS.md trim and handoff template refinement
- **Feature file**: none for this docs/process pass
- **Risk**: low to medium
- **Owned by**: Product/design review and implementation
- **Current step**: Review the local process-doc cleanup: concise `AGENTS.md`, refined `docs/HANDOFFS.md` templates/checklists, and updated status.
- **Waiting on**: Process-doc cleanup review.
- **Blockers**: none
- **Next recommended step**: After process cleanup review, start v1.9 Range breakdown planning/implementation.
- **Recent touch points**: Runtime app remains v1.8.8. v1.9 Range breakdown work has not started. This pass changed only process documentation and did not touch runtime app files, backup parser/format/schema/storage behavior, or app shell/cache versions.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-29
- **Handoff type**: process-doc cleanup / AGENTS.md trim
- **Summary**: Rewrite `AGENTS.md` into a concise operating contract; move detailed build prompt, startup, and documentation sweep guidance into `docs/HANDOFFS.md`; do not start v1.9 app work.
- **Where full handoff lives**: current chat prompt

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-29: Applied local process-doc cleanup. `AGENTS.md` is now a concise operating contract, `docs/HANDOFFS.md` carries detailed prompt/checklist guidance, runtime app remains v1.8.8, v1.9 Range breakdown work has not started, and the next recommended app step remains v1.9 planning/implementation after this process cleanup is reviewed.
- 2026-04-29: Implemented local v1.8.8 copy-backup export. The Backup panel now offers `Copy backup text` beside `Download backup text`; copy uses the same plain text backup source as download and falls back to download guidance if the Clipboard API is unavailable or fails. Parser behavior, backup format, restore behavior, storage, CSV, JSON, and hidden legacy UI behavior remain unchanged. App shell versioning moved to `v1.8.8`.
- 2026-04-29: Implemented local v1.8.7 final backup-panel stabilization. The panel heading now reads `Backup`, pasted-restore safety copy states that restore replaces current subscriptions while keeping activity log and saved presets, and the preview result has status semantics. Parser behavior, backup format, restore behavior, storage, CSV, JSON, and hidden legacy UI behavior remain unchanged. App shell versioning moved to `v1.8.7`.
- 2026-04-29: Implemented local v1.8.6 backup accessibility polish. The pasted backup textarea now references its help text, and the preview/restore controls reference the preview result while preserving visible labels, restore gating, parser behavior, storage, CSV, JSON, and hidden legacy UI behavior. App shell versioning moved to `v1.8.6`.
- 2026-04-29: Implemented local v1.8.5 plain text backup helper verification. Added a dependency-free Node script that loads the current app helpers in a stubbed browser-like sandbox and verifies valid round trips, multiline notes, blank lines, escaped literal delimiters, optional end dates, and invalid input errors. Runtime app files and app shell versioning remain unchanged.
- 2026-04-29: Implemented local v1.8.4 pasted backup preview polish. Valid backup previews now show compact summaries for up to five parsed records, including price/currency, billing date, occurrence, and optional end date, while invalid previews show grouped validation errors. Parser, restore, storage, CSV, JSON, and hidden legacy UI behavior remain unchanged; app shell versioning moved to `v1.8.4`.
- 2026-04-29: Implemented local v1.8.3 main import/export UI simplification. The visible workflow is now plain text backup download, pasted text preview, and confirmed pasted text restore. Legacy summary text, CSV, and JSON backup/restore UI is hidden while code compatibility remains; app shell versioning moved to `v1.8.3`.

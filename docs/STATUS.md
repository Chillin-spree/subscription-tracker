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

- **Mode**: v1.8.3 implemented locally
- **Active feature**: simple text backup workflow
- **Feature file**: `docs/features/subscription-tracker-v1.8-simple-text-backup.md`
- **Risk**: medium
- **Owned by**: Product/design review and implementation
- **Current step**: v1.8.3 makes plain text backup export/restore the primary visible import/export workflow.
- **Waiting on**: Review. Later passes can decide whether to delete legacy code or add an advanced fallback surface.
- **Blockers**: none
- **Next recommended step**: Review v1.8.3 simplified import/export UI, then run final v1.8 QA and release docs.
- **Recent touch points**: v1.8.3 hides legacy summary text, CSV, JSON backup download, and JSON file restore from the main UI while preserving the legacy helpers/handlers internally. Plain text backup export/restore remains visible. LocalStorage keys, CSV header, JSON backup schema version 2, JSON restore code, and local-only behavior remain unchanged. App shell versioning moved to `v1.8.3`.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-28
- **Handoff type**: v1.8 pass 5 main UI simplification
- **Summary**: Make plain text backup/restore the single clear visible workflow; keep legacy summary text, CSV, JSON backup/restore code internally, with no storage, schema, parser, or CSV changes.
- **Where full handoff lives**: `docs/features/subscription-tracker-v1.8-simple-text-backup.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-29: Implemented local v1.8.3 main import/export UI simplification. The visible workflow is now plain text backup download, pasted text preview, and confirmed pasted text restore. Legacy summary text, CSV, and JSON backup/restore UI is hidden while code compatibility remains; app shell versioning moved to `v1.8.3`.
- 2026-04-29: Implemented local v1.8.2 confirmed pasted-text restore. Validated pasted plain text backups can replace current local subscriptions after explicit confirmation; activity log and saved presets are kept, stale previews are cleared after restore, and app shell versioning moved to `v1.8.2`.
- 2026-04-29: Implemented local v1.8.1 paste-based plain text backup preview. Pasted backup text can be validated locally with parsed record count, sample subscription names, and record-specific errors; no pasted text can restore or replace data yet. App shell versioning moved to `v1.8.1`.
- 2026-04-28: Implemented local v1.8.0 plain text backup export. Added a visible `Download backup text` action using the v1 human-readable backup format, kept the old summary text export visible as `Download summary text`, preserved CSV and JSON backup/restore behavior, and moved app shell versioning to `v1.8.0`.
- 2026-04-28: Implemented local v1.7.9 final selected-range overview stabilization. The visible range tab is labeled `Range`, row/header wording describes selected-range actual spending, range date inputs and reset control have clearer accessible labels, normalized Monthly/Yearly/Active stat cards are hidden in Range mode, reset-to-current-month behavior remains unchanged, and app shell versioning moves to `v1.7.9`.
- 2026-04-28: Implemented v1.7.6 custom date range controls for the existing `This month` Spending overview tab. The selected range is in-memory only, defaults to the current calendar month, updates actual item rows and summary from the same range rows, handles invalid/reversed ranges defensively, and moves app shell versioning to `v1.7.6`.
- 2026-04-28: Implemented v1.7 pass 6 compact `This month` range summary. The summary is visible only on the range tab, derives actual total(s) and occurrence count from the same current-month item rows, keeps multiple currencies separate, preserves existing normalized overview tabs and stats, and moves app shell versioning to `v1.7.5`.
- 2026-04-28: Implemented v1.7 pass 5 fixed `This month` Spending overview tab. The tab uses actual scheduled current-month item totals from range helpers, labels rows as current-month actual spending, keeps existing Items/Categories/Payment tabs normalized, and preserves Upcoming payments, active counts, CSV export, and JSON backup schema. App shell versioning moved to `v1.7.4`.

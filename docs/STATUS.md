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

- **Mode**: v1.7.6 implemented locally
- **Active feature**: custom date range spending overview controls
- **Feature file**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`
- **Risk**: medium
- **Owned by**: Product/design review and implementation
- **Current step**: v1.7.6 adds non-persisted custom start/end date controls to the existing item-only range overview.
- **Waiting on**: Review, commit, push, and live GitHub Pages verification.
- **Blockers**: none
- **Next recommended step**: Review and release v1.7.6, then plan category/payment range views or range helper validation as separate passes.
- **Recent touch points**: v1.7.6 includes optional `endDate` form/storage/display support, manual date-only validation, Upcoming payments filtering after inclusive end dates, pure actual-occurrence range helpers, internal range breakdown adapters, a `This month` item-range tab with non-persisted custom start/end date controls, a compact actual-total and occurrence summary, unchanged active counts, unchanged CSV header, unchanged JSON backup schema version 2, and app shell versioning moved to `v1.7.6`.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-28
- **Handoff type**: v1.7.6 implementation
- **Summary**: Add non-persisted custom date range controls to the existing item-only `This month` Spending overview tab; keep category/payment range tabs, persistence, active count changes, CSV changes, JSON schema changes, and ended-state behavior out of scope.
- **Where full handoff lives**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-28: Implemented v1.7.6 custom date range controls for the existing `This month` Spending overview tab. The selected range is in-memory only, defaults to the current calendar month, updates actual item rows and summary from the same range rows, handles invalid/reversed ranges defensively, and moves app shell versioning to `v1.7.6`.
- 2026-04-28: Implemented v1.7 pass 6 compact `This month` range summary. The summary is visible only on the range tab, derives actual total(s) and occurrence count from the same current-month item rows, keeps multiple currencies separate, preserves existing normalized overview tabs and stats, and moves app shell versioning to `v1.7.5`.
- 2026-04-28: Implemented v1.7 pass 5 fixed `This month` Spending overview tab. The tab uses actual scheduled current-month item totals from range helpers, labels rows as current-month actual spending, keeps existing Items/Categories/Payment tabs normalized, and preserves Upcoming payments, active counts, CSV export, and JSON backup schema. App shell versioning moved to `v1.7.4`.
- 2026-04-28: Implemented v1.7 pass 4 internal range breakdown adapters. Added item, category, and payment-label range helpers that adapt actual occurrence totals into the existing overview row shape for future UI use. Current Spending overview, Upcoming payments, active counts, CSV export, and JSON backup schema remain unchanged. App shell versioning moved to `v1.7.3`.
- 2026-04-28: Implemented v1.7 pass 3 pure range calculation helpers. Helpers count actual scheduled billing occurrences in an inclusive selected range, clamp monthly/quarterly/yearly dates from the original billing anchor, respect inclusive `endDate`, and return occurrence count, total amount, currency, and occurrence dates for future Spending overview use. Current UI behavior, CSV export, JSON backup schema, and active counts remain unchanged. App shell versioning moved to `v1.7.2`.
- 2026-04-28: Implemented v1.7 pass 2 Upcoming payments end-date filtering. Next payments after an optional inclusive `endDate` are excluded from Upcoming payments and Due soon totals; subscriptions without `endDate` remain ongoing. Active counts, Spending overview, CSV export, and JSON backup schema remain unchanged. App shell versioning moved to `v1.7.1`.
- 2026-04-28: Implemented v1.7 pass 1 optional absolute end-date foundation. Added optional form field, date-only validation, edit population, card display, backup validation compatibility, and app shell versioning `v1.7.0`; CSV header and JSON backup schema version remain unchanged.
- 2026-04-28: Completed v1.6 final QA and release documentation. Checks passed: `node --check app.js`, `node --check service-worker.js`, `git diff --check`, PWA version scan, runtime overview harness, CSV header check, JSON schema version 1 and 2 restore check, manifest start/scope scan, localStorage continuity scan, and local-only/privacy scan.

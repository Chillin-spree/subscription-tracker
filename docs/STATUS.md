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

- **Mode**: implementation
- **Active feature**: v1.12 grouped multi-currency totals, Pass 1
- **Feature file**: `docs/features/subscription-tracker-v1.12-grouped-multi-currency-totals.md`
- **Risk**: medium
- **Owned by**: Product/design review and implementation
- **Current step**: Implement Spending Overview Monthly/Yearly grouped totals by currency.
- **Waiting on**: User review of local v1.12.1 Pass 1 implementation.
- **Blockers**: none
- **Next recommended step**: Review v1.12.1 locally, then decide whether to commit or run a browser smoke pass.
- **Recent touch points**: v1.12.1 updates Spending Overview Monthly and Yearly totals to show separate currency groups without exchange rates, converted grand totals, storage changes, backup changes, or Range behavior changes. Preserve form field names/data attributes, subscription/activity/preset localStorage keys, the local-only notice acknowledgment key, text-only backup behavior, Range behavior, PWA continuity, and local-only data behavior.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-05-06
- **Handoff type**: v1.12 Pass 1 implementation
- **Summary**: Update Spending Overview Monthly and Yearly totals to display grouped totals by currency while preserving existing storage, backup, Range, and local-only behavior.
- **Where full handoff lives**: `docs/features/subscription-tracker-v1.12-grouped-multi-currency-totals.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-05-06: Implemented v1.12.1 Pass 1 locally. Spending Overview Monthly and Yearly totals now display grouped currency totals, single-currency totals stay compact, and app shell/cache references moved to v1.12.1. Backup format/parser/restore behavior, storage keys/schema, Range date/sub-mode behavior, upcoming totals, and local-only behavior remain unchanged.
- 2026-05-06: Completed v1.11.7 final accessibility/QA audit and docs wrap-up as a docs-only pass. Live v1.11.6 smoke passed for load, local-only notice reopen, add-form validation/cancel, collapsibles with refresh reset, Range, backup controls, and app console errors; keyboard Tab focus reporting was inconclusive in automation and remains a small human spot-check, not a runtime blocker.
- 2026-05-06: Pushed v1.11.5 and v1.11.6 package through commit `719e6b5`. GitHub Pages deployment succeeded, live assets reference `app.js?v=1.11.6`, the service worker uses `subscription-tracker-v1.11.6-static`, and live smoke passed.
- 2026-05-05: Implemented v1.11.6 final microcopy locally. Empty states now give shorter next-step guidance, the bottom privacy reopen control reads `Local-only privacy details`, and the link has a subtle pill affordance; app shell/cache references moved to v1.11.6.
- 2026-05-05: Implemented v1.11.5 form/input clarity locally. Clarified manual-entry helper copy, optional field guidance, payment-label safety wording, and moved the `Local-only privacy` reopen control to the bottom of the main app shell; app shell/cache references moved to v1.11.5.
- 2026-05-05: Implemented v1.11.4 local-only first-run notice locally. Added one acknowledgment key, `subscription-tracker-v1-local-only-notice-acknowledged`, kept the app usable if that write fails, and moved app shell/cache references to v1.11.4.
- 2026-04-30: Implemented v1.11.3 Subscriptions collapse and Add button polish locally. The Subscriptions panel now uses the existing non-persisted collapse pattern and the top add control is a rounded-square accent button; app shell/cache references moved to v1.11.3.
- 2026-04-30: Implemented v1.11.2 visual hierarchy/mobile spacing polish locally. CSS refinements improve panel rhythm, section action alignment, row/card readability, empty-state weight, and overview/collapse touch targets while preserving behavior.
- 2026-04-30: Implemented v1.11.1 collapsible Activity and Backup sections locally. Both sections remain expanded by default, collapse state is non-persisted, and app shell/cache references moved to v1.11.1.

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
- **Active feature**: v1.13.1 Bills GitHub repo/Pages identity migration
- **Feature file**: `docs/features/bills-v1.13.1-github-rename.md`
- **Risk**: medium
- **Owned by**: Product/design review and implementation
- **Current step**: Rename GitHub repo, update local remote, push v1.13.1, and verify the new Pages URL.
- **Waiting on**: GitHub repo rename and live Pages verification.
- **Blockers**: none
- **Next recommended step**: Complete v1.13.1 GitHub-facing identity migration, then verify `https://chillin-spree.github.io/bills/`.
- **Recent touch points**: v1.13.1 moves canonical GitHub-facing identity toward `Chillin-spree/bills` and `https://chillin-spree.github.io/bills/` while preserving the v1.13 runtime app identity, relative PWA paths, `subscription-tracker-v1-*` localStorage keys, text backup compatibility, ordinary subscription UI terminology, Range behavior, and multi-currency behavior.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-05-06
- **Handoff type**: v1.13.1 GitHub-facing identity migration
- **Summary**: Rename GitHub repo and Pages identity to Bills while preserving runtime behavior and compatibility contracts.
- **Where full handoff lives**: `docs/features/bills-v1.13.1-github-rename.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-05-06: Started v1.13.1 GitHub repo/Pages identity migration. Planned canonical repo is `Chillin-spree/bills`, planned live URL is `https://chillin-spree.github.io/bills/`, and the former `/subscription-tracker/` path remains historical. No runtime behavior, storage key, backup parser, Range, multi-currency, or ordinary UI terminology changes are in scope.
- 2026-05-06: Implemented v1.13 rename locally through docs pass. Runtime app/browser/PWA identity now says Bills, app shell/cache references moved to v1.13.0, generated text backups use `Bills Backup`, parser accepts both `Bills Backup` and historical `Subscription Tracker Backup`, generated backup filenames use `bills-backup-v1.13-YYYY-MM-DD.txt`, localStorage keys/schema and restore semantics remain unchanged, ordinary subscription UI terminology remains unchanged, and repo/Pages migration is deferred.
- 2026-05-06: Implemented v1.12.4 UI consistency polish locally. Spending Overview totals, Due soon chips, Actual range chips, and Upcoming payment amounts now share the same accent color, strong weight, and tabular numeric treatment. App shell/cache references moved to v1.12.4; calculations and data behavior remain unchanged.
- 2026-05-06: Implemented v1.12.3 final polish locally. Selected Range Actual range mixed-currency totals now render as compact grouped chips without plus signs, single-currency Actual range totals remain compact, and app shell/cache references moved to v1.12.3. Range calculations, Range dates/sub-modes, breakdown rows, storage, backup, and local-only behavior remain unchanged.
- 2026-05-06: Implemented v1.12.2 Pass 2 locally. Header Due soon totals now show mixed currencies as compact grouped chips without plus signs, single-currency due-soon totals remain compact, and the Active summary count includes a small `tracked records` detail. App shell/cache references moved to v1.12.2; calculations, storage, backup, Range, and local-only behavior remain unchanged.
- 2026-05-06: Implemented v1.12.1 Pass 1 locally. Spending Overview Monthly and Yearly totals now display grouped currency totals, single-currency totals stay compact, and app shell/cache references moved to v1.12.1. Backup format/parser/restore behavior, storage keys/schema, Range date/sub-mode behavior, upcoming totals, and local-only behavior remain unchanged.
- 2026-05-06: Completed v1.11.7 final accessibility/QA audit and docs wrap-up as a docs-only pass. Live v1.11.6 smoke passed for load, local-only notice reopen, add-form validation/cancel, collapsibles with refresh reset, Range, backup controls, and app console errors; keyboard Tab focus reporting was inconclusive in automation and remains a small human spot-check, not a runtime blocker.
- 2026-05-06: Pushed v1.11.5 and v1.11.6 package through commit `719e6b5`. GitHub Pages deployment succeeded, live assets reference `app.js?v=1.11.6`, the service worker uses `subscription-tracker-v1.11.6-static`, and live smoke passed.
- 2026-05-05: Implemented v1.11.6 final microcopy locally. Empty states now give shorter next-step guidance, the bottom privacy reopen control reads `Local-only privacy details`, and the link has a subtle pill affordance; app shell/cache references moved to v1.11.6.
- 2026-05-05: Implemented v1.11.5 form/input clarity locally. Clarified manual-entry helper copy, optional field guidance, payment-label safety wording, and moved the `Local-only privacy` reopen control to the bottom of the main app shell; app shell/cache references moved to v1.11.5.
- 2026-05-05: Implemented v1.11.4 local-only first-run notice locally. Added one acknowledgment key, `subscription-tracker-v1-local-only-notice-acknowledged`, kept the app usable if that write fails, and moved app shell/cache references to v1.11.4.
- 2026-04-30: Implemented v1.11.3 Subscriptions collapse and Add button polish locally. The Subscriptions panel now uses the existing non-persisted collapse pattern and the top add control is a rounded-square accent button; app shell/cache references moved to v1.11.3.

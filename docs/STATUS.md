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

- **Mode**: v1.5 release-ready
- **Active feature**: user-defined payment method and category presets
- **Feature file**: `docs/features/subscription-tracker-v1.5-presets.md`
- **Risk**: medium once implementation begins
- **Owned by**: Product/design review and implementation
- **Current step**: v1.5 final QA and release documentation completed locally.
- **Waiting on**: Review, commit, push, and live GitHub Pages verification.
- **Blockers**: none
- **Next recommended step**: Commit and release v1.5, verify GitHub Pages, then start v1.6 spending overview by item/category/payment method.
- **Recent touch points**: v1.5 is release-ready locally. Final QA passed for static syntax, preset add/remove behavior, malformed preset storage tolerance, CSV compatibility, JSON schema version 1 and 2 restore behavior, local-only privacy, and PWA consistency with `app.js?v=1.5.2` plus cache `subscription-tracker-v1.5.2-static`. v1.4 remains the current live release until v1.5 is committed, pushed, and verified on GitHub Pages.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-26
- **Handoff type**: v1.5 final QA and release docs
- **Summary**: Finalize v1.5 release readiness for local payment label/category presets and JSON backup compatibility.
- **Where full handoff lives**: `docs/features/subscription-tracker-v1.5-presets.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-26: Completed v1.5 final QA and release documentation. Checks passed: `node --check app.js`, `node --check service-worker.js`, `git diff --check`, runtime preset/backup harness, PWA version scan, CSV header scan, manifest start/scope scan, and local-only/privacy scan.
- 2026-04-26: Implemented v1.5 pass 4 JSON backup compatibility: new exports use schema version 2 with saved presets, schema version 1 backups still restore subscriptions/activity and keep current presets, and app-shell versioning moved to `1.5.2`.
- 2026-04-26: Implemented v1.5 pass 3 lightweight preset management UI for adding/removing saved payment label and category presets; subscription records, CSV, and JSON backup schema remain unchanged.
- 2026-04-26: Implemented v1.5 pass 2 preset storage foundation, derived form suggestions, and PWA app-shell version updates; no preset management UI or backup schema changes.
- 2026-04-26: Started v1.5 presets planning with a docs-only pass for reusable payment method and category presets; no runtime code changes.
- 2026-04-26: Captured outstanding roadmap and product-memory ideas: payment presets, categories, spending views, date ranges, end dates, privacy modal, customization, notifications investigation, and broader recurring-bills direction.
- 2026-04-26: Added documentation sweep discipline so meaningful feature, bugfix, roadmap, release, risk, decision, and workflow changes require checking affected docs.

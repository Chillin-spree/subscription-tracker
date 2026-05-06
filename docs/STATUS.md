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
- **Active feature**: v1.14 final-build readiness
- **Feature file**: `docs/features/bills-v1.14-final-build-readiness.md`
- **Risk**: low
- **Owned by**: Product/design review and implementation
- **Current step**: v1.14.1 final polish patch is implemented for release.
- **Waiting on**: User review or next requested pass after v1.14.1 release.
- **Blockers**: none
- **Next recommended step**: Review v1.14.1 live polish and decide whether any follow-up patch is needed.
- **Recent touch points**: v1.14 is pushed at `1f5efc707dc0a6e41ed0fe13f12f4a140d14299d`. v1.14.1 is a small final polish patch for privacy-modal access and footer project link only.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-05-06
- **Handoff type**: v1.14.1 final polish patch
- **Summary**: Make the centered header icon open the existing local-only privacy modal and add a bottom GitHub repository link.
- **Where full handoff lives**: `docs/features/bills-v1.14-final-build-readiness.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-05-06: Implemented v1.14.1 final polish patch from clean pushed v1.14. The centered header icon opens the existing local-only privacy modal, the footer includes a minimal GitHub repository link, and app-shell/cache references moved to `app.js?v=1.14.1` and `bills-v1.14.4-static` for changed cached files.
- 2026-05-06: Started v1.14 final verification, docs/file integrity, and release-readiness pass from clean local `main` ahead of `origin/main` by seven commits. Scope is verification-first; no new product features, storage/schema/key changes, backup behavior changes, Range changes, multi-currency changes, icon changes, or unrelated UI polish.
- 2026-05-06: Implemented and verified a corrective v1.14 summary-label alignment pass locally. Kept the summary strip as two peer columns at narrow widths and top-aligned summary card contents so `Due soon` and `Active` sit on the same visual level. Service-worker cache namespace moved to `bills-v1.14.3-static` because cached CSS changed.
- 2026-05-06: Implemented and verified v1.14 Pass 6 header/icon/copy/Activity polish locally. Rebuilt icon assets from the provided replacement PNG, removed the old unreferenced favicon SVG, centered the header icon with balanced side columns, removed the header `Next 7 days` eyebrow, removed requested multi-currency helper text, and capped visible Activity rendering to the latest 10 entries without truncating stored activity data. Service-worker cache namespace moved to `bills-v1.14.2-static` because cached app-shell/icon assets changed.
- 2026-05-06: Implemented and verified v1.14 Pass 5 icon/header branding update locally. Rebuilt favicon, PWA, and Apple touch PNG assets from the provided square source image, added a centered decorative header icon between the title and add button, and moved the service-worker cache namespace to `bills-v1.14.1-static` because cached app-shell/icon assets changed. No app behavior, storage, backup, Range, or multi-currency behavior changed.
- 2026-05-06: Implemented and verified v1.14 Pass 4 v1.13 rename-doc consolidation locally. `bills-v1.13-app-rename.md` is now the consolidated v1.13 rename-track summary, and the v1.13.1 GitHub rename and v1.13.2 final cleanup docs are focused addenda preserving unique patch scope, acceptance checks, compatibility rationale, and historical facts. No runtime files changed.
- 2026-05-06: Implemented and verified v1.14 Pass 3 README refresh locally. The README now presents Bills as a static, phone-first, local-only PWA with live link, principles, current capabilities, explicit non-goals, text-only backup/restore, offline/PWA behavior, development commands, project structure, release status, and documentation links. No runtime files, screenshots, icons, media, or new feature promises were added.
- 2026-05-06: Implemented v1.14 Pass 2 backlog/docs integrity cleanup locally. The pass removes future-feature roadmap noise from `docs/BACKLOG.md`, keeps final-build readiness items only, preserves compatibility warnings for storage keys, historical backup headers, old cache cleanup, local-only/manual-only behavior, PWA continuity, Range, and multi-currency behavior, and does not change runtime files.
- 2026-05-06: Started v1.14 final-build readiness locally from pushed v1.13.2. Scope is audit-first with no new features, no workflow redesign, no storage/schema/key changes, no CSV/JSON backup/restore, and no PWA contract changes. Found and fixed only obvious current-facing rename residue where billing-date labels said `Bills` instead of `Billed`; app shell/cache references moved to `v1.14.0`.

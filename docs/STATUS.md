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
- **Current step**: v1.14.2 final cleanup patch is implemented for release.
- **Waiting on**: Final verification, push, and live check for v1.14.2.
- **Blockers**: none
- **Next recommended step**: Push v1.14.2 after verification passes, then verify GitHub Pages.
- **Recent touch points**: v1.14.1 is pushed at `3d768b4e4a75b86f3c4a1ad11a34807fec46100b`. v1.14.2 removes the bottom privacy/minimal footer copy while preserving header-icon privacy access and the GitHub footer link.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-05-07
- **Handoff type**: v1.14.2 final cleanup patch
- **Summary**: Remove bottom privacy/minimal footer text, keep the GitHub footer link, preserve header-icon privacy access, and clean current docs/file integrity.
- **Where full handoff lives**: `docs/features/bills-v1.14-final-build-readiness.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-05-07: Implemented v1.14.2 final cleanup patch from clean pushed v1.14.1. Removed the bottom privacy-details control and minimal-design footer sentence, kept the footer GitHub repository link, preserved header-icon access to the existing local-only privacy modal, and moved app-shell/cache references to `app.js?v=1.14.2` and `bills-v1.14.5-static`.
- 2026-05-06: Implemented v1.14.1 final polish patch from clean pushed v1.14. The centered header icon opens the existing local-only privacy modal, the footer includes a minimal GitHub repository link, and app-shell/cache references moved to `app.js?v=1.14.1` and `bills-v1.14.4-static` for changed cached files.
- 2026-05-06: Started v1.14 final verification, docs/file integrity, and release-readiness pass from clean local `main` ahead of `origin/main` by seven commits. Scope is verification-first; no new product features, storage/schema/key changes, backup behavior changes, Range changes, multi-currency changes, icon changes, or unrelated UI polish.
- 2026-05-06: Implemented and verified a corrective v1.14 summary-label alignment pass locally. Kept the summary strip as two peer columns at narrow widths and top-aligned summary card contents so `Due soon` and `Active` sit on the same visual level. Service-worker cache namespace moved to `bills-v1.14.3-static` because cached CSS changed.
- 2026-05-06: Implemented and verified v1.14 Pass 6 header/icon/copy/Activity polish locally. Rebuilt icon assets from the provided replacement PNG, removed the old unreferenced favicon SVG, centered the header icon with balanced side columns, removed the header `Next 7 days` eyebrow, removed requested multi-currency helper text, and capped visible Activity rendering to the latest 10 entries without truncating stored activity data. Service-worker cache namespace moved to `bills-v1.14.2-static` because cached app-shell/icon assets changed.
- 2026-05-06: Implemented and verified v1.14 Pass 5 icon/header branding update locally. Rebuilt favicon, PWA, and Apple touch PNG assets from the provided square source image, added a centered decorative header icon between the title and add button, and moved the service-worker cache namespace to `bills-v1.14.1-static` because cached app-shell/icon assets changed. No app behavior, storage, backup, Range, or multi-currency behavior changed.
- 2026-05-06: Implemented and verified v1.14 Pass 4 v1.13 rename-doc consolidation locally. `bills-v1.13-app-rename.md` is now the consolidated v1.13 rename-track summary, and the v1.13.1 GitHub rename and v1.13.2 final cleanup docs are focused addenda preserving unique patch scope, acceptance checks, compatibility rationale, and historical facts. No runtime files changed.
- 2026-05-06: Implemented and verified v1.14 Pass 3 README refresh locally. The README now presents Bills as a static, phone-first, local-only PWA with live link, principles, current capabilities, explicit non-goals, text-only backup/restore, offline/PWA behavior, development commands, project structure, release status, and documentation links. No runtime files, screenshots, icons, media, or new feature promises were added.

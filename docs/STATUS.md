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
- **Current step**: v1.14.3 icon platform polish patch is implemented for release.
- **Waiting on**: Final verification, push, and live check for v1.14.3.
- **Blockers**: none
- **Next recommended step**: Push v1.14.3 after verification passes, then verify GitHub Pages.
- **Recent touch points**: v1.14.2 is pushed at `d3f41f6439e4f650b6527242f0dfe07f5caebd98`. v1.14.3 regenerates fuller platform icons and adds dedicated maskable PWA icons without changing app behavior.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-05-11
- **Handoff type**: v1.14.3 icon platform polish patch
- **Summary**: Regenerate fuller app icons, add dedicated maskable PWA icons, keep references/cache/docs consistent, and verify before push.
- **Where full handoff lives**: `docs/features/bills-v1.14-final-build-readiness.md`

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-05-11: Implemented v1.14.3 icon platform polish patch from clean pushed v1.14.2. Regenerated regular favicon, Apple touch, and PWA icons from the existing 512 source with a tighter centered crop, added separate maskable 192/512 PWA icons with safer margin, and moved app-shell/cache references to `app.js?v=1.14.3` and `bills-v1.14.6-static`.
- 2026-05-07: Implemented v1.14.2 final cleanup patch from clean pushed v1.14.1. Removed the bottom privacy-details control and minimal-design footer sentence, kept the footer GitHub repository link, preserved header-icon access to the existing local-only privacy modal, and moved app-shell/cache references to `app.js?v=1.14.2` and `bills-v1.14.5-static`.
- 2026-05-06: Implemented v1.14.1 final polish patch from clean pushed v1.14. The centered header icon opens the existing local-only privacy modal, the footer includes a minimal GitHub repository link, and app-shell/cache references moved to `app.js?v=1.14.1` and `bills-v1.14.4-static` for changed cached files.
- 2026-05-06: Implemented and verified a corrective v1.14 summary-label alignment pass locally. Kept the summary strip as two peer columns at narrow widths and top-aligned summary card contents so `Due soon` and `Active` sit on the same visual level. Service-worker cache namespace moved to `bills-v1.14.3-static` because cached CSS changed.
- 2026-05-06: Implemented and verified v1.14 Pass 6 header/icon/copy/Activity polish locally. Rebuilt icon assets from the provided replacement PNG, removed the old unreferenced favicon SVG, centered the header icon with balanced side columns, removed the header `Next 7 days` eyebrow, removed requested multi-currency helper text, and capped visible Activity rendering to the latest 10 entries without truncating stored activity data. Service-worker cache namespace moved to `bills-v1.14.2-static` because cached app-shell/icon assets changed.
- 2026-05-06: Implemented and verified v1.14 Pass 5 icon/header branding update locally. Rebuilt favicon, PWA, and Apple touch PNG assets from the provided square source image, added a centered decorative header icon between the title and add button, and moved the service-worker cache namespace to `bills-v1.14.1-static` because cached app-shell/icon assets changed. No app behavior, storage, backup, Range, or multi-currency behavior changed.
- 2026-05-06: Implemented and verified v1.14 Pass 4 v1.13 rename-doc consolidation locally. `bills-v1.13-app-rename.md` is now the consolidated v1.13 rename-track summary, and the v1.13.1 GitHub rename and v1.13.2 final cleanup docs are focused addenda preserving unique patch scope, acceptance checks, compatibility rationale, and historical facts. No runtime files changed.
- 2026-05-06: Implemented and verified v1.14 Pass 3 README refresh locally. The README now presents Bills as a static, phone-first, local-only PWA with live link, principles, current capabilities, explicit non-goals, text-only backup/restore, offline/PWA behavior, development commands, project structure, release status, and documentation links. No runtime files, screenshots, icons, media, or new feature promises were added.

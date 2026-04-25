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

- **Mode**: complete
- **Active feature**: none
- **Feature file**: `docs/features/subscription-tracker-v1.3-price-input-localization.md`
- **Risk**: low
- **Owned by**: Project/user
- **Current step**: v1.3.1 localized price form submission hotfix is live.
- **Waiting on**: Next feature handoff.
- **Blockers**: none
- **Next recommended step**: Choose the next backlog item or start a new feature brief.
- **Recent touch points**: v1.3.1 fixed a stale PWA/app-shell mix after localized price input; live users now get `app.js?v=1.3.1` through cache `subscription-tracker-v1.3.1-static`, preserving installed PWA continuity, manifest start/scope, root service worker registration, localStorage keys, saved records, CSV compatibility, offline shell behavior, and local-only privacy.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-25
- **Handoff type**: Build pass
- **Summary**: Document v1.3.1 localized price form submission hotfix.
- **Where full handoff lives**: Current project handoff; feature context in `docs/features/subscription-tracker-v1.3-price-input-localization.md`.

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-25: Released v1.3.1 hotfix for stale PWA/app-shell mismatch; localized prices now save for cached users while home-screen continuity and local-only storage remain preserved.
- 2026-04-25: Documented `subscription-tracker-v1.3-price-input-localization`; dot/comma price inputs are accepted, stored prices remain numeric and local-only, CSV export remains raw numeric, and PWA/home-screen continuity is preserved.
- 2026-04-25: Documented installed PWA continuity guardrails and v1.3-v1.9 roadmap; next planned feature is `subscription-tracker-v1.3-price-input-localization`.
- 2026-04-25: Released `subscription-tracker-v1.2-privacy-and-local-data-clarity` to GitHub Pages.
- 2026-04-25: Completed `subscription-tracker-v1.2-privacy-and-local-data-clarity` pass 2 UI privacy copy and safer visible wording.
- 2026-04-25: Completed `subscription-tracker-v1.2-privacy-and-local-data-clarity` pass 1 docs and guardrails.
- 2026-04-25: Verified and documented `subscription-tracker-v1.1-pwa-support`; app shell reloads offline after first successful HTTP visit.
- 2026-04-25: Added conservative service worker shell cache and relative service worker registration.
- 2026-04-25: Added PWA manifest metadata and phone home screen icons.

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

- **Mode**: release-ready
- **Active feature**: `subscription-tracker-v1.4-json-backup-restore`
- **Feature file**: `docs/features/subscription-tracker-v1.4-json-backup-restore.md`
- **Risk**: medium
- **Owned by**: Project/user
- **Current step**: v1.4 JSON backup/restore implementation and focused QA are complete; pending commit, push, and live verification.
- **Waiting on**: Release/commit decision.
- **Blockers**: none
- **Next recommended step**: Commit and release v1.4, then verify the live GitHub Pages app and installed-PWA continuity.
- **Recent touch points**: v1.4 adds local JSON backup download plus validated restore preview and explicit replace confirmation. It preserves the live URL, manifest start/scope, root service worker registration, localStorage keys, saved records unless the user confirms restore, CSV compatibility, offline shell behavior, and local-only privacy. The app shell now uses `app.js?v=1.4.2` through cache `subscription-tracker-v1.4.2-static`.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-26
- **Handoff type**: Docs/release readiness
- **Summary**: Document v1.4 JSON backup/restore after implementation and focused QA.
- **Where full handoff lives**: Current project handoff; feature context in `docs/features/subscription-tracker-v1.4-json-backup-restore.md`.

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-26: Documented v1.4 JSON backup/restore release readiness; implementation and focused QA are complete, pending commit/push/live verification.
- 2026-04-26: Completed focused QA for v1.4 backup export, restore preview/validation, confirmed replace restore, PWA continuity, and export compatibility with no release-blocking issues.
- 2026-04-26: Implemented confirmed JSON restore write; valid backups can replace local subscriptions and activity log only after explicit user confirmation.
- 2026-04-26: Implemented JSON backup restore preview and validation with local-only file handling and no restore writes.
- 2026-04-25: Implemented JSON backup download for subscriptions and activity log, with schema `subscription-tracker.backup` version 1 and app release `v1.4`.
- 2026-04-25: Released v1.3.1 hotfix for stale PWA/app-shell mismatch; localized prices now save for cached users while home-screen continuity and local-only storage remain preserved.

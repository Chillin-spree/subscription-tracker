# Bills v1.14 Final-Build Readiness

## Summary

Start v1.14 with an audit-only readiness pass and allow only obvious low-risk cleanup of current-facing residue.

## Current Release State

- **Status**: local
- **Latest pushed release/commit**: v1.13.2 at `116dca5613cd788f623f0ddf02d55b192e40302e`
- **Runtime/app shell**: `app.js?v=1.14.0`, `bills-v1.14.3-static`
- **Notes**: This pass fixes no product behavior beyond obvious presentation residue.

## Scope

- Audit old app-name references and classify them as compatibility, historical docs, ordinary domain terminology, or current residue.
- Audit readiness docs for contradictions around final-build scope, local-only/manual-only behavior, current app identity, repo URL, live URL, and backup support.
- Audit app and PWA metadata for current Bills identity and stable PWA contracts.
- Trim backlog content so v1.14 reads as final-build readiness work, not a future feature roadmap.
- Refresh the README into a polished public-facing finished-product overview without screenshots, media assets, or new feature promises.
- Consolidate duplicated v1.13 rename-track documentation where it improves clarity while preserving patch-specific release history.
- Update Bills icon assets and place the icon in the centered top header area using the provided source image.
- Polish the top header, remove requested helper text, and cap visible Activity entries without deleting stored activity data.
- Clean only obvious low-risk current-facing residue.

## Non-Goals

- New app features or workflow redesign.
- localStorage key, schema, backup format, or restore semantics changes.
- CSV or JSON backup/restore.
- Historical docs consolidation.
- Icon refresh or broader UI polish.
- Push or release without explicit approval.

## Compatibility / Preservation Rules

- Preserve existing `subscription-tracker-v1-*` localStorage keys.
- Preserve historical `Subscription Tracker Backup` restore support.
- Preserve local-only behavior and manual entry as the source of truth.
- Preserve manifest `start_url: "./"`, manifest `scope: "./"`, and root-level service worker registration.
- Preserve Range behavior, Range sub-mode behavior, and multi-currency behavior.

## Implementation Notes

- Fixed two current-facing billing-date labels from `Bills` to `Billed`.
- Bumped app shell and service worker cache references because `app.js` changed.
- Updated status and README shell-version wording to reflect the local v1.14.0 readiness pass.
- Pass 2 trims `docs/BACKLOG.md` to final-build readiness work only and preserves compatibility warnings instead of parked future-feature ideas.
- Pass 3 refreshes `README.md` structure and presentation while preserving local-only, backup, PWA, compatibility, and no-new-features boundaries.
- Pass 4 makes `docs/features/bills-v1.13-app-rename.md` the consolidated v1.13 rename-track summary and keeps v1.13.1/v1.13.2 docs as focused addenda.
- Pass 5 rebuilds icon PNG assets from the provided source image, adds a centered decorative header icon, and bumps the service-worker cache namespace for changed cached assets.
- Pass 6 rebuilds icon PNG assets from the replacement source image, removes the old unreferenced favicon SVG, balances the top header grid, removes requested visible helper text, and caps visible Activity entries to 10 without truncating storage.
- Corrective polish keeps the summary strip as two peer columns at narrow widths and top-aligns summary card contents so `Due soon` and `Active` remain on the same visual level.
- Final verification audits docs/file integrity, old-name residue, PWA/icon references, backup/storage compatibility, Range behavior, multi-currency behavior, Activity display capping, and release push readiness.

## QA Checklist

- [x] `node --check app.js`
- [x] `node --check service-worker.js`
- [x] `node scripts/verify-plain-text-backup.js`
- [x] `node scripts/verify-storage-safety.js`
- [x] `node scripts/verify-import-safety.js`
- [x] `node scripts/verify-range-helpers.js`
- [x] `node scripts/verify-grouped-currency-totals.js`
- [x] `git diff --check`
- [x] `git status --short`

## Risks

Low. The runtime change is copy-only and the cache/app-shell bump is required to avoid stale app shell behavior after changing `app.js`.

## Release History

- 2026-05-06: Performed final verification and docs/file-integrity cleanup. Removed stale readiness backlog wording, clarified completed versus active v1.13 decisions, trimmed `docs/STATUS.md` to current v1.14 state, and removed ignored `.DS_Store` local artifacts before rerunning the full verification suite. No app behavior, calculations, storage, backup, Range, Range sub-mode, or multi-currency behavior changed.
- 2026-05-06: Implemented corrective summary-label alignment. Kept the summary strip as two peer columns at narrow widths, top-aligned summary card contents, and moved the service-worker cache namespace to `bills-v1.14.3-static` because cached CSS changed. No app behavior, calculations, storage, backup, Range, Range sub-mode, or multi-currency behavior changed. Verification: syntax checks, app safety scripts, peer-label source checks, static narrow-width layout review, `git diff --check`, and `git status --short`.
- 2026-05-06: Implemented Pass 6 header/icon/copy/Activity polish. Rebuilt icon PNG assets from the provided replacement PNG, removed the old unreferenced favicon SVG, centered the header icon with balanced side columns, removed the header `Next 7 days` eyebrow, removed requested multi-currency helper text, capped visible Activity entries to the latest 10 without deleting stored activity log data, and moved the service-worker cache namespace to `bills-v1.14.2-static`. No localStorage key/schema, backup support, Range behavior, Range sub-mode behavior, or multi-currency calculations changed. Verification: syntax checks, manifest and icon reference checks, icon dimension checks, app safety scripts, requested copy searches, Activity cap source check, `git diff --check`, `git status --short`, and static narrow-header layout review.
- 2026-05-06: Implemented Pass 5 icon/header branding update. Rebuilt `icons/icon-512.png`, `icons/icon-192.png`, `icons/apple-touch-icon.png`, and `icons/favicon.png` from the provided square PNG; changed the favicon reference from SVG to PNG; added a centered decorative header icon using `icons/icon-192.png`; and moved the service-worker cache namespace to `bills-v1.14.1-static`. No app behavior, storage, backup, Range, or multi-currency behavior changed. Verification: syntax checks, icon reference checks, manifest JSON check, app safety scripts, `git diff --check`, `git status --short`, and static narrow-header layout review.
- 2026-05-06: Implemented Pass 4 v1.13 rename-doc consolidation. The main v1.13 rename doc now holds the final v1.13.2 state, compatibility guardrails, intentional legacy references, pass history, acceptance, and verification notes. The v1.13.1 and v1.13.2 docs now preserve patch-specific scope and checks without repeating the whole rename story. Verification: `git diff --check`, `git status --short`, and reference search for the consolidated docs.
- 2026-05-06: Implemented Pass 3 README refresh. The README now presents the live app, local-only principles, current capabilities, explicit non-goals, text-only backup/restore, offline/PWA behavior, development usage, project structure, current status, and documentation links. No runtime files, screenshots, icons, media, or new feature promises were added. Verification: `git diff --check` and `git status --short`.
- 2026-05-06: Implemented Pass 2 backlog/docs integrity cleanup. The backlog now focuses on README/public presentation, icon/brand asset review, small UI polish/fixes, docs integrity, rename residue cleanup, version-doc consolidation, final release verification, and explicit final-build boundaries. Verification: `git diff --check` and `git status --short`.
- 2026-05-06: Implemented local v1.14.0 readiness cleanup. Old-name audit found no unsafe compatibility changes needed. Fixed the current-facing billing-date label typo, updated app shell/cache references, and verified syntax, backup, storage, import/render, Range, grouped-currency totals, diff whitespace, and git status.

## Open Follow-Ups

- None currently.

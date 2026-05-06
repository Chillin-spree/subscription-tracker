# Bills v1.14 Final-Build Readiness

## Summary

Start v1.14 with an audit-only readiness pass and allow only obvious low-risk cleanup of current-facing residue.

## Current Release State

- **Status**: local
- **Latest pushed release/commit**: v1.13.2 at `116dca5613cd788f623f0ddf02d55b192e40302e`
- **Runtime/app shell**: `app.js?v=1.14.0`, `bills-v1.14.0-static`
- **Notes**: This pass fixes no product behavior beyond obvious presentation residue.

## Scope

- Audit old app-name references and classify them as compatibility, historical docs, ordinary domain terminology, or current residue.
- Audit readiness docs for contradictions around final-build scope, local-only/manual-only behavior, current app identity, repo URL, live URL, and backup support.
- Audit app and PWA metadata for current Bills identity and stable PWA contracts.
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

- 2026-05-06: Implemented local v1.14.0 readiness cleanup. Old-name audit found no unsafe compatibility changes needed. Fixed the current-facing billing-date label typo, updated app shell/cache references, and verified syntax, backup, storage, import/render, Range, grouped-currency totals, diff whitespace, and git status.

## Open Follow-Ups

- Consider a later README/public-presentation pass for final-build wording.
- Consider a later docs consolidation pass for the duplicated v1.13, v1.13.1, and v1.13.2 rename records.
- Consider whether backlog item identifiers should remain historical `subscription-tracker-*` ids or move to Bills-era ids in a separate docs-only pass.

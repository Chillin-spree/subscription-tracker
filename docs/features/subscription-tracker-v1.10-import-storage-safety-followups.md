# subscription-tracker-v1.10-import-storage-safety-followups

## Summary

Track v1.10 text-only backup simplification and final/simple storage safety stabilization after the narrow v1.9.2 import/render safety patch.

## Current Release State

Runtime Pass 1 shipped in v1.10.0. It removed legacy CSV export, JSON backup/restore, and the hidden old summary text export from runtime. Plain text backup copy/download and pasted-text restore are now the only supported backup/export/restore workflow.

Runtime Pass 2 shipped in v1.10.1. It adds defensive startup handling for corrupted localStorage values: malformed subscription and activity entries are ignored in memory, existing invalid JSON/non-array fallbacks remain empty, preset fallback behavior remains intact, and `scripts/verify-storage-safety.js` covers these cases.

v1.10.x is now treated as the final/simple stabilization line. Stop runtime work unless a real bug appears. Future product work should move to separate v1.11 UI/UX polish planning and later v1.12 grouped multi-currency totals planning.

## Relevant Safety Surfaces

- Startup storage loaders:
  - `loadSubscriptions()` parses `subscription-tracker-v1-subscriptions`, returns `[]` on parse failure or non-array values, and ignores malformed stored subscription entries.
  - `loadActivityLog()` parses `subscription-tracker-v1-activity-log`, returns `[]` on parse failure or non-array values, and ignores malformed stored activity entries.
  - `loadPresetList()` parses preset storage keys, normalizes arrays, and returns `[]` on parse failure.
- Pasted plain text backup preview and restore:
  - `parsePlainTextBackup()` validates the v1 readable text backup format and record fields.
  - `previewPlainTextBackupInput()` parses the full textarea value before showing restore.
  - `restoreValidatedPlainTextBackup()` replaces subscriptions only after confirmation and keeps activity log and saved presets.
- Removed legacy runtime surfaces:
  - CSV export controls, event listener, and helper functions were removed.
  - JSON backup download and JSON file restore controls, event listeners, schema constants, validation, preview, restore, and helper functions were removed.
  - The hidden old summary text export path was removed.
- Existing verifiers:
  - `scripts/verify-plain-text-backup.js` covers text backup round trips, notes, invalid dates, invalid occurrences, and required fields.
  - `scripts/verify-import-safety.js` covers escaped rendered fields and action `data-id` values.
  - `scripts/verify-storage-safety.js` covers corrupted localStorage startup cases.

## Non-Goals

- No further runtime implementation unless a real bug appears.
- No plain text backup parser, format, storage, copy, download, preview, or restore behavior changes in this docs pass.
- No localStorage key changes.
- No CSV/JSON legacy controls or helper paths restored.
- No Range behavior changes, Range date persistence, or Range sub-mode persistence.
- No top-level normalized overview behavior change.
- No broad dashboard redesign.
- No auth, cloud sync, analytics, payment processing, bank/card import, OCR/email scanning, paid services, upload, sync, or server behavior.

## Compatibility / Preservation Rules

- Preserve existing localStorage keys:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- Preserve the readable `Subscription Tracker Backup` v1 plain text format.
- Preserve pasted-text restore semantics: replace subscriptions only, keep activity log and saved presets.
- Preserve manifest `start_url: "./"`, manifest `scope: "./"`, root-level service worker registration, saved local records, and local-only privacy stance.

## Build Pass Plan

Risk: Medium. The work touches restore/storage safety and could affect user data if bundled too broadly.

Completed passes:

1. Text-only backup runtime simplification
   - Removed legacy CSV export, JSON backup/restore, and hidden summary text export runtime paths.
   - Preserved plain text backup copy/download/paste/preview/restore.
   - Bumped runtime app shell/cache to `v1.10.0`.

2. Storage corruption handling and verifier
   - Implemented in v1.10.1.
   - Add a dependency-free verifier for corrupted localStorage startup cases.
   - Define and implement the smallest safe behavior for invalid JSON, non-array stored values, and malformed records.
   - Preserve storage keys and avoid deleting or rewriting stored data unless explicitly approved in that pass.
   - Not in this pass: backup import limits, visible UI redesign, schema changes.

Deferred ideas:

3. Plain text size/count limits
   - Parked unless a real bug or concrete user need appears.
   - If revived, define conservative caps for pasted plain text backup size, parsed record count, and field lengths.
   - Not now: merge restore, alternate import formats, or a broader import system.

## Recommended Next Step

Stop v1.10.x runtime work unless a real bug appears. Use `docs/BACKLOG.md` for the future v1.11 UI/UX polish and v1.12 grouped multi-currency totals tracks.

## QA Checklist

- [x] Corrupted localStorage startup cases are covered by a dependency-free verifier.
- [x] Legacy CSV export, JSON backup/restore, and old summary text export runtime paths are removed.
- [ ] Plain text preview paths reject over-limit inputs before restore is exposed.
- [x] Existing plain text backup verifier still passes.
- [x] Existing import/render safety verifier still passes.
- [x] Existing localStorage keys remain unchanged.
- [x] CSV/JSON controls and helpers are not present in current runtime.
- [x] PWA app shell/cache versions are bumped when runtime assets change.
- [x] Live/manual smoke verification passed with no runtime bugs found.

## Open Questions

- Cancel-restore and installed PWA/home-screen remain manual human confirmations after automation smoke testing.

## Release History

- 2026-04-29: Created the v1.10 planning scope and build-pass plan. No runtime files changed.
- 2026-04-30: Runtime Pass 1 removed legacy CSV export, JSON backup/restore, and hidden summary text export. Plain text backup remains the only supported backup/export/restore workflow.
- 2026-04-30: Runtime Pass 2 added startup storage corruption handling and `scripts/verify-storage-safety.js`; app shell/cache moved to `v1.10.1`.
- 2026-04-30: Live/manual v1.10.1 smoke passed with no runtime bugs found. v1.10.x is now the final/simple stabilization line; future product work moves to separate v1.11 and v1.12 tracks.

# subscription-tracker-v1.10-import-storage-safety-followups

## Summary

Track v1.10 text-only backup simplification and storage/plain-text safety follow-ups after the narrow v1.9.2 import/render safety patch.

## Current Release State

Runtime Pass 1 shipped in v1.10.0. It removed legacy CSV export, JSON backup/restore, and the hidden old summary text export from runtime. Plain text backup copy/download and pasted-text restore are now the only supported backup/export/restore workflow.

Runtime Pass 2 is implemented locally. v1.10.1 adds defensive startup handling for corrupted localStorage values: malformed subscription and activity entries are ignored in memory, existing invalid JSON/non-array fallbacks remain empty, preset fallback behavior remains intact, and `scripts/verify-storage-safety.js` covers these cases.

v1.9.2 shipped the narrow import/render safety patch in commit `a55cac1`: generated subscription action `data-id` attributes are escaped, and `scripts/verify-import-safety.js` covers malicious imported/stored display fields. Broader import/storage hardening remains future work.

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

- No further runtime implementation in this docs finalization pass.
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

Remaining recommended passes:

3. Plain text size/count limits design and implementation
   - Define conservative caps for pasted plain text backup size, parsed record count, and field lengths.
   - Implement preview-time rejection before restore is exposed.
   - Add verifier coverage for over-limit text paths.
   - Not in this pass: merge restore or alternate import formats.

4. v1.10 documentation and final checks
   - Update README/status/feature docs only after implemented behavior actually ships.
   - Run relevant static checks and all safety verifiers.
   - Confirm runtime app shell/cache versions are bumped only when runtime assets change.

## Recommended First Pass

Next, review and commit the v1.10.1 storage corruption handling pass when approved, then design plain text size/count limits as a separate pass.

Reason: startup storage parsing is now guarded and covered, so the remaining higher-value safety work is preview-time rejection for oversized pasted backup text.

## QA Checklist

- [x] Corrupted localStorage startup cases are covered by a dependency-free verifier.
- [x] Legacy CSV export, JSON backup/restore, and old summary text export runtime paths are removed.
- [ ] Plain text preview paths reject over-limit inputs before restore is exposed.
- [x] Existing plain text backup verifier still passes.
- [x] Existing import/render safety verifier still passes.
- [x] Existing localStorage keys remain unchanged.
- [x] CSV/JSON controls and helpers are not present in current runtime.
- [x] PWA app shell/cache versions are bumped when runtime assets change.

## Open Questions

- What exact record count and byte-size limits are appropriate for the phone-first v1 app?
- Should future alternate import formats be treated as separate products rather than backup compatibility?

## Release History

- 2026-04-29: Created the v1.10 planning scope and build-pass plan. No runtime files changed.
- 2026-04-30: Runtime Pass 1 removed legacy CSV export, JSON backup/restore, and hidden summary text export. Plain text backup remains the only supported backup/export/restore workflow.
- 2026-04-30: Runtime Pass 2 added startup storage corruption handling and `scripts/verify-storage-safety.js`; app shell/cache moved to `v1.10.1`.

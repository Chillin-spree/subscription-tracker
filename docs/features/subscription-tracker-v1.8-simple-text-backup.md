# subscription-tracker-v1.8-simple-text-backup

## Summary

Make the normal user-facing backup workflow a simple, human-readable plain text copy/paste format while preserving existing data, CSV compatibility, legacy JSON backup/restore, PWA continuity, and the local-only privacy stance.

## Current Release State

v1.8.8 shipped as the simple text backup release with copy and download support for the same plain text backup content. Backup UX follow-ups and any future legacy code deletion remain separate future passes.

Later v1.9 and v1.9.2 work did not change the plain text backup parser, format, restore/write behavior, CSV compatibility, JSON schema, localStorage keys, or hidden legacy UI behavior.

## User-Facing Scope

- Add a visible `.txt` plain text backup export using the v1 backup template.
- Add clipboard copy for the same plain text backup while keeping download as the fallback.
- Add paste-based preview and validation for v1 plain text backups.
- Hide the older one-way summary text export from the main UI after the text backup workflow is proven.
- Hide CSV export from the main UI while preserving compatibility internally.
- Hide JSON backup download and JSON restore from the main UI while preserving legacy compatibility internally.
- Restore from validated pasted backup text only after explicit confirmation, replacing current local subscriptions while keeping activity log and saved presets.

## Non-Goals

- No text paste import UI in passes 1 or 2.
- No text restore/write behavior in passes 1, 2, or 3.
- No removal or hiding of CSV, JSON backup, JSON restore, or old summary text export in passes 2 or 3.
- No removal or hiding of CSV, JSON backup, JSON restore, or old summary text export in pass 4.
- No merge/import-append mode in pass 4.
- No deletion of legacy summary text, CSV, JSON backup, or JSON restore code in pass 5.
- No advanced options drawer in pass 5.
- No localStorage key changes.
- No JSON schema migration.
- No CSV format change.
- No cloud sync, upload, account, analytics, payment processing, or payment authorization behavior.

## Compatibility / Preservation Rules

- Preserve localStorage keys:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- Preserve CSV header exactly: `name,price,currency,billingDate,occurrence,paymentMethod,category,notes`.
- Preserve JSON backup `schemaVersion: 2`.
- Preserve schema version 1 and 2 JSON restore compatibility.
- Preserve `manifest.webmanifest` `start_url: "./"` and `scope: "./"`.
- Preserve root-level service worker registration.
- Keep payment-related fields as labels or nicknames only.

## Implementation Notes

The v1 plain text backup begins with:

```text
Subscription Tracker Backup
Version: 1
```

Records are separated by `---`. The first non-empty line after the separator is the subscription name. Supported fields are `Price`, `Currency`, `Billing date`, `Occurrence`, `Payment method`, `Category`, `End date`, and `Notes`.

`Notes` is last and may span multiple lines until the next record separator. A literal note line containing `---` is escaped as `\---`.

## Risks

- Confirmed restore replaces current local subscriptions after validation and confirmation.
- Invalid previews must never expose restore.
- Hidden legacy CSV/JSON code must remain compatible unless explicitly removed in a future planned pass.
- Notes and record separators must round-trip without corrupting user text.

## QA Checklist

- New plain text backup export produces the v1 text backup format.
- Users can copy or download the v1 text backup format.
- Download remains available when clipboard copy is unavailable or fails.
- Pasting valid backup text previews parsed records and count.
- Valid pasted backup preview shows compact summaries for up to five records, including name, price/currency, billing date, occurrence, and optional end date.
- Pasted backup preview rows do not show notes.
- Pasting invalid backup text shows clear record-specific errors.
- Invalid pasted backup preview groups validation errors in a readable list.
- Empty pasted text shows a clear message.
- Restore from pasted text is unavailable before a valid preview.
- Restore from pasted text requires explicit confirmation.
- Canceling restore confirmation leaves existing subscriptions unchanged.
- Confirming restore replaces current subscriptions with parsed text backup records.
- Restored records preserve name, price, currency, billing date, occurrence, payment label, category, notes, and end date.
- Activity log and saved presets are kept during pasted-text restore.
- Stale pasted-text preview cannot restore again after a successful restore.
- Existing summary text export still works as before.
- Existing CSV export still works and header remains unchanged.
- Existing JSON backup download still works.
- Existing JSON restore flow remains unchanged.
- Only plain text backup/restore is visible in the main import/export UI.
- Legacy summary text, CSV, JSON backup download, and JSON file restore UI are hidden.
- Legacy summary text, CSV, JSON backup, and JSON restore code remains internally available.
- Main visible panel heading reads `Backup`.
- Pasted restore safety copy states that restore replaces current subscriptions while keeping activity log and saved presets.
- Existing subscriptions are not modified by exporting.
- Existing subscriptions are not modified by previewing pasted text.
- App shell versions are all `v1.8.8`.
- Pasted backup textarea help is exposed through `aria-describedby`, preview/restore controls identify the preview result they affect, and the preview result exposes status semantics.
- JSON backup `schemaVersion` remains `2`.
- Plain text backup helper verification passes with `node scripts/verify-plain-text-backup.js`.

## Release History

- 2026-04-28 pass 1: Added helper-only plain text backup serializer/parser/validator functions. No UI, storage, CSV, JSON, or PWA shell behavior changed.
- 2026-04-28 pass 2: Added visible `Download backup text` export using the v1 plain text backup format. The old summary text export remains visible as `Download summary text`; CSV export and legacy JSON backup/restore remain visible and unchanged. Runtime app shell versioning moved to `app.js?v=1.8.0` and cache `subscription-tracker-v1.8.0-static`.
- 2026-04-29 pass 3: Added visible paste-based backup text preview and validation. Valid pasted backups show parsed subscription count and sample record names; invalid pasted backups show validation errors; empty pasted text shows a clear message. No restore button, localStorage write, CSV change, JSON schema change, or legacy option removal was added. Runtime app shell versioning moved to `app.js?v=1.8.1` and cache `subscription-tracker-v1.8.1-static`.
- 2026-04-29 pass 4: Added confirmed restore from validated pasted plain text backups. The restore action appears only after valid preview, requires browser confirmation, replaces current local subscriptions with normalized records using fresh local IDs/timestamps, keeps activity log and saved presets, clears stale pasted preview state after success, and leaves CSV/JSON/summary options visible. Runtime app shell versioning moved to `app.js?v=1.8.2` and cache `subscription-tracker-v1.8.2-static`.
- 2026-04-29 pass 5: Simplified the main import/export UI so plain text backup download, paste preview, and confirmed pasted restore are the only visible workflow. Legacy summary text, CSV export, JSON backup download, and JSON file restore UI are hidden, while the existing helpers/handlers remain internally available for compatibility and rollback. Runtime app shell versioning moved to `app.js?v=1.8.3` and cache `subscription-tracker-v1.8.3-static`.
- 2026-04-29 v1.8.4 polish: Improved pasted backup preview clarity. Valid previews now show compact summaries for up to five records with name, price/currency, billing date, occurrence, and optional end date while omitting notes; invalid previews show grouped validation errors. Parser, backup format, restore/write behavior, CSV, JSON schema, localStorage keys, and hidden legacy UI behavior remain unchanged. Runtime app shell versioning moved to `app.js?v=1.8.4` and cache `subscription-tracker-v1.8.4-static`.
- 2026-04-29 v1.8.5 QA: Added `scripts/verify-plain-text-backup.js`, a dependency-free Node verification harness for plain text backup helpers. It loads the current app code in a stubbed browser-like sandbox and verifies one-record and multi-record round trips, multiline notes, blank lines in notes, escaped literal `---` note lines, optional end dates, invalid dates, invalid occurrences, and missing required fields. No app runtime files, parser behavior, backup format, storage keys, CSV, JSON schema, restore behavior, visible UI, or app shell versioning changed.
- 2026-04-29 v1.8.6 accessibility polish: Connected the pasted backup textarea to its help text with `aria-describedby` and gave preview/restore controls explicit relationships to the preview result. Visible labels, restore gating, confirmation behavior, parser behavior, backup format, storage keys, CSV, JSON schema, and hidden legacy UI behavior remain unchanged. Runtime app shell versioning moved to `app.js?v=1.8.6` and cache `subscription-tracker-v1.8.6-static`.
- 2026-04-29 v1.8.7 stabilization: Finalized the backup panel by changing the visible heading from `Export` to `Backup`, clarifying that pasted restore replaces current subscriptions while keeping activity log and saved presets, and adding status semantics to the plain text backup preview result. Parser behavior, backup format, restore/write behavior, CSV, JSON schema, localStorage keys, and hidden legacy UI behavior remain unchanged. Runtime app shell versioning moved to `app.js?v=1.8.7` and cache `subscription-tracker-v1.8.7-static`.
- 2026-04-29 v1.8.8 copy-backup export: Added `Copy backup text` beside `Download backup text`. Copy uses the same v1 plain text backup content as download through the Clipboard API when available; unsupported or failed copy shows fallback guidance to use download. Parser behavior, backup format, restore/write behavior, CSV, JSON schema, localStorage keys, and hidden legacy UI behavior remain unchanged. Runtime app shell versioning moved to `app.js?v=1.8.8` and cache `subscription-tracker-v1.8.8-static`.

## Open Follow-Ups

- Backup UX follow-ups and any future legacy code deletion remain separate future passes.

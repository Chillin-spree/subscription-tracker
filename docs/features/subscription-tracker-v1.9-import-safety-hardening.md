# subscription-tracker-v1.9-import-safety-hardening

## Summary

Harden local import/render safety around stored or restored subscription data while preserving the local-only app model, backup compatibility, and installed PWA continuity.

## Scope

- Escape subscription IDs when rendering generated action button `data-id` attributes.
- Add dependency-free import/render safety verifier coverage for:
  - stored/imported subscription IDs containing quotes, angle brackets, and script-like content
  - HTML/script-like user fields such as name, notes, category, payment label, and currency
  - normal edit/delete `data-id` lookup behavior for normal IDs
- Move runtime app shell/cache versioning to `v1.9.2`.

## Non-Goals

- No backup parser, format, schema, storage, copy, download, preview, or restore behavior changes.
- No JSON backup schema version change.
- No localStorage key changes.
- No raw localStorage normalization yet.
- No import size/count limits yet.
- No CSV formula hardening yet.
- No CSV/JSON legacy controls restored to the visible UI.
- No broad renderer refactor.
- No auth, cloud sync, analytics, payment processing, bank/card import, OCR/email scanning, paid services, or push notifications.

## User-Facing Behavior

- Normal edit and delete actions continue to work for existing records.
- Imported or stored record IDs that contain special characters no longer risk breaking out of generated action button attributes.
- HTML/script-like user-entered or imported text continues to render as inert escaped text.
- Backup and restore behavior remains unchanged.

## Implementation Notes

- `renderSubscriptionCard` now escapes `subscription.id` before inserting it into action button `data-id` attributes.
- `scripts/verify-import-safety.js` loads `app.js` in a stubbed browser-like VM, matching the existing verifier pattern.
- Runtime app shell references are bumped to `app.js?v=1.9.2` and `subscription-tracker-v1.9.2-static`.

## QA Checklist

- [x] Malicious subscription IDs render as escaped `data-id` attribute values.
- [x] Normal subscription IDs remain available for edit/delete `data-id` lookup.
- [x] HTML/script-like name, notes, category, payment label, and currency values render as escaped/inert text.
- [x] Plain text backup restored records with HTML-like fields render as escaped/inert text.
- [x] `node --check app.js` passes.
- [x] `node --check service-worker.js` passes.
- [x] `node --check scripts/verify-plain-text-backup.js` passes.
- [x] `node scripts/verify-plain-text-backup.js` passes.
- [x] `node --check scripts/verify-range-helpers.js` passes.
- [x] `node scripts/verify-range-helpers.js` passes.
- [x] `node --check scripts/verify-import-safety.js` passes.
- [x] `node scripts/verify-import-safety.js` passes.

## Risks

- Attribute escaping must not break normal edit/delete lookup. Mitigation: verifier asserts normal IDs still render in action attributes.
- The verifier checks generated markup strings rather than running a full browser. Mitigation: this matches the app's existing dependency-free helper verification pattern and focuses on the exact rendering function changed.
- PWA stale shell behavior. Mitigation: app shell cache and script query string are bumped to `v1.9.2`.

## Follow-Ups

- Add defensive handling for corrupted localStorage records.
- Add import size/count and field-length limits for pasted text and JSON preview paths.
- Harden hidden legacy CSV export against spreadsheet formula interpretation before re-exposing CSV.
- Consider a broader import-safety verifier for hidden JSON restore validation cases.

## Release State

v1.9.2 Pass 1 is implemented locally and documented. It is pending review and has not been committed or pushed.

## Compatibility Confirmation

- Backup parser, format, schema, copy, download, preview, restore, and storage behavior are unchanged.
- JSON backup `schemaVersion` remains `2`.
- Existing localStorage keys remain unchanged:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- Legacy CSV/JSON controls remain hidden in the main UI.
- Range dates and Range sub-mode settings remain non-persisted.

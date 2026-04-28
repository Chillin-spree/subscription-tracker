# subscription-tracker-v1.5-presets

## Goal

Add user-defined payment method presets and user-defined category presets while preserving existing subscription records, local-only privacy, export compatibility, JSON backup/restore compatibility, and installed-PWA continuity.

## Planned User Outcome

Users can keep reusable payment label and category choices for faster manual entry, while still being able to type one-off values that are not saved as presets.

## Scope

- Add reusable payment method presets for labels such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.
- Add reusable category presets for labels such as `Rent`, `Music`, `Bills`, `Software`, or `Utilities`.
- Keep existing subscription records unchanged.
- Keep existing free-text `paymentMethod` values valid even when they are not saved as presets.
- Keep empty or missing `category` values valid.
- Derive form suggestions from both saved presets and existing subscription records.
- Store presets locally in browser `localStorage`.
- Preserve the local-only privacy stance; no upload, sync, account, analytics, payment processing, or payment authorization behavior is added.

## Non-Goals

- No app code in the documentation setup pass.
- No UI changes in the documentation setup pass.
- No subscription record migration.
- No rename of existing subscription fields.
- No CSV export format change.
- No JSON backup schema or restore behavior change in the documentation setup pass.
- No service worker, manifest, cache, or release version change in the documentation setup pass.
- No auth, cloud sync, bank/card import, OCR/email scanning, notifications, native wrapper, or paid service behavior.

## Hybrid Data Model

v1.5 should use a hybrid preset model:

- Preserve existing subscription storage keys:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
- Add new localStorage keys for user-defined preset preferences:
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- Keep existing subscription record fields unchanged:
  - `paymentMethod`
  - `category`
- Store preset preferences separately from subscription records.
- Derive form suggestions from saved preset arrays plus unique existing `paymentMethod` and non-empty `category` values in subscription records.
- Normalize and deduplicate preset labels in future implementation, while preserving the typed label stored on each subscription record.

This model avoids destructive data migration, keeps existing records readable, and lets current user-entered values become useful suggestions without forcing them into preferences.

## Compatibility Requirements

- Preserve the live GitHub Pages URL.
- Preserve `manifest.webmanifest` `start_url` as `"./"`.
- Preserve `manifest.webmanifest` `scope` as `"./"`.
- Preserve root-level service worker registration with `service-worker.js`.
- Preserve offline app shell behavior after first visit.
- Preserve existing saved subscription and activity data.
- Preserve existing localStorage keys for subscriptions and activity log.
- Preserve CSV export compatibility, including the `paymentMethod` and `category` headers.
- Preserve v1.4 JSON backup restore compatibility as a release requirement before v1.5 ships.
- Do not replace user data unless the existing restore confirmation flow is explicitly used.
- Keep payment-related fields as labels or nicknames only; do not request or imply sensitive payment details.

## PWA Cache Rule

This documentation setup pass does not change runtime app shell files, so no cache bump is required.

Future implementation passes that change `index.html` or `app.js` must:

- Update the script URL version in `index.html`.
- Update the `service-worker.js` cache name.
- Cache the versioned `app.js` URL.
- Preserve root-level `service-worker.js` registration.
- Preserve manifest `start_url: "./"` and `scope: "./"`.

## Compatibility Risks

- Existing records may contain payment labels that are not saved as presets; these must remain valid and appear as derived suggestions.
- Existing records may have empty, missing, or inconsistent category values; these must remain valid.
- Preset deletion must not edit or remove matching subscription values.
- Preset storage read/write failures should not block subscription CRUD.
- v1.4 JSON backups do not include preset preference keys; v1.5 restore must still accept those backups.
- Adding preset data to future JSON backups needs an explicit compatibility design before release.
- Stale PWA app shells can mix old and new app files if future runtime passes miss the script/cache versioning rule.
- Empty accounts should render cleanly with no subscription records and no preset keys.

## Build Pass Plan

```text
BUILD PASS PLAN — subscription-tracker-v1.5-presets

Full feature:
Add user-defined payment method presets and category presets for faster manual entry while preserving existing records, exports, backups, PWA continuity, and local-only privacy.

Risk:
Medium, because v1.5 touches localStorage preferences, form behavior, backup compatibility, and PWA cache continuity.

Recommended passes:
1. Documentation setup — create this feature file, update status/backlog/decision docs, no app code.
2. Preset storage foundation — add new preset localStorage helpers, normalization, dedupe, and derived suggestion helpers; no management UI yet.
3. Form suggestions — connect payment label and category suggestions to the existing add/edit form while preserving free-text entry.
4. Preset management UI — add focused controls to add/remove user-defined payment and category presets without editing existing subscriptions.
5. JSON backup compatibility design/implementation — preserve v1.4 restore acceptance and decide how preset preferences are represented in future backups.
6. Final QA, PWA cache, and docs — bump runtime cache/script versions if app shell files changed, verify compatibility, and update release docs.

Rules:
- Keep each pass small and reviewable.
- Do not combine preset management, backup schema changes, and PWA release checks in one pass.
- Do not rename `paymentMethod` or `category`.
- Do not migrate existing subscription records unless a later compatibility pass explicitly requires a backward-compatible migration.
```

## QA Checklist

- Existing subscriptions load without changes.
- Existing activity log entries load without changes.
- Existing free-text payment labels remain valid.
- Empty and missing categories remain valid.
- New preset keys can be absent without errors.
- Form suggestions include saved presets and unique existing record values.
- Users can still type values that are not presets.
- Deleting a preset does not modify subscription records.
- CSV export header and values remain compatible.
- v1.4 JSON backup restore remains accepted before release.
- Restore still requires explicit confirmation before replacing subscription and activity data.
- Local-only privacy copy remains accurate.
- No sensitive payment details are requested or implied.
- If runtime files change, `node --check app.js`, `node --check service-worker.js`, `git diff --check`, and PWA cache/version checks pass.

## Docs Impact

- `docs/STATUS.md`: active feature and next step should point to v1.5 presets.
- `docs/DECISIONS.md`: record the hybrid preset data model as a durable planned v1.5 decision.
- `docs/BACKLOG.md`: remove conflicting separate future category/payment preset entries while keeping later roadmap candidates.
- `docs/VISION.md`: may stay compact; the existing gradual recurring-bills direction already supports category/preset work.
- `README.md`: should not list presets as a current feature until v1.5 is released.
- `docs/BUGS.md`: no entry needed unless a confirmed bug is discovered.

## Release Status

Release-ready locally. Passes 1-5 are complete, including final QA and release documentation. v1.5 still needs commit, push, GitHub Pages deployment, and live verification before it is considered released.

## Build Notes

- 2026-04-26 pass 1: Created the v1.5 feature documentation foundation and recorded the hybrid preset model decision.
- 2026-04-26 pass 2: Added separate localStorage keys and safe string-array preset helpers for payment method and category presets. The add/edit form now uses non-restrictive datalist suggestions derived from saved presets plus existing subscription values. Existing subscription records, CSV export fields, JSON backup schema/version, and restore behavior remain unchanged. Runtime app shell versioning moved to `app.js?v=1.5.0` and cache `subscription-tracker-v1.5.0-static`.
- 2026-04-26 pass 3: Added compact saved preset management inside the existing add/edit dialog. Users can add and remove saved payment label and category presets, while free-text subscription entry remains available and removing presets does not mutate existing subscription records. Runtime app shell versioning moved to `app.js?v=1.5.1` and cache `subscription-tracker-v1.5.1-static`. CSV export fields, JSON backup schema/version, and restore behavior remain unchanged.
- 2026-04-26 pass 4: Updated JSON backup export to schema version 2, app release `v1.5`, and filename prefix `subscription-tracker-backup-v1.5`. Schema version 2 backups include normalized `data.paymentMethodPresets` and `data.categoryPresets`. Restore accepts schema versions 1 and 2: version 1 replaces subscriptions/activity and keeps current presets; version 2 replaces subscriptions/activity and saved presets after confirmation. Runtime app shell versioning moved to `app.js?v=1.5.2` and cache `subscription-tracker-v1.5.2-static`. CSV export fields remain unchanged.
- 2026-04-26 pass 5: Completed final QA and release documentation. Public README now documents saved presets and schema version 2 JSON backups; status now points to v1.6 spending overview by item/category/payment method as the next planned feature.

## Final QA Summary

- Static syntax checks passed:
  - `node --check app.js`
  - `node --check service-worker.js`
  - `git diff --check`
- PWA continuity checked:
  - `index.html` references `app.js?v=1.5.2`.
  - `service-worker.js` cache name is `subscription-tracker-v1.5.2-static`.
  - `service-worker.js` caches `app.js?v=1.5.2`.
  - Root-level service worker registration remains `navigator.serviceWorker.register("service-worker.js")`.
  - `manifest.webmanifest` keeps `start_url: "./"` and `scope: "./"`.
- Storage compatibility checked:
  - Existing keys remain `subscription-tracker-v1-subscriptions` and `subscription-tracker-v1-activity-log`.
  - New preset keys are `subscription-tracker-v1-payment-method-presets` and `subscription-tracker-v1-category-presets`.
  - Existing subscription record fields `paymentMethod` and `category` remain unchanged.
- Preset behavior checked with a runtime harness:
  - Adding/removing saved payment label presets works.
  - Adding/removing saved category presets works.
  - Blank, whitespace, duplicate, and malformed preset storage cases are handled safely.
  - Free-text payment label and category entry remains supported.
  - Suggestions include saved presets and existing subscription values.
  - Removing a saved preset does not alter existing subscriptions.
- JSON backup/restore checked with a runtime harness:
  - New backups use schema version 2.
  - New backups include `data.subscriptions`, `data.activityLog`, `data.paymentMethodPresets`, and `data.categoryPresets`.
  - Schema version 1 backups remain accepted and keep current saved presets during restore.
  - Schema version 2 backups replace subscriptions, activity log, and saved presets after confirmation.
  - Unsupported schema versions are rejected with a clear message.
  - Restore preview text communicates preset inclusion/replacement behavior.
- CSV compatibility checked:
  - Header remains exactly `name,price,currency,billingDate,occurrence,paymentMethod,category,notes`.
  - CSV exported fields remain unchanged.
- Local-only/privacy checked:
  - No upload, sync, account, server, analytics, payment processing, dependency, or payment authorization behavior was added.

## Next Pass

v1.5 was released and later followed by v1.6 Spending overview work. See `docs/STATUS.md` for the current release workflow.

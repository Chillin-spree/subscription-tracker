# Subscription Tracker v1.3 Price Input Localization

> Accept common localized price input while preserving numeric storage, local-only privacy, CSV compatibility, and installed PWA continuity.

## Summary

v1.3 lets users enter prices with common dot or comma decimal styles while preserving numeric storage and export compatibility.

## Current Release State

v1.3 shipped with a v1.3.1 hotfix for stale PWA app-shell behavior after the price input update.

## User-Facing Scope

- Accept `799`, `799.99`, `799,99`, `1.299,99`, and `1,299.99`.
- Store parsed prices as JavaScript numbers.
- Keep display formatting unchanged in this version.

## Non-Goals

- No storage key changes.
- No CSV export format change.
- No display-format redesign.
- No cloud, sync, account, upload, analytics, or payment-processing behavior.

## Compatibility / Preservation Rules

- Price input accepts the formats above and stores the result as a JavaScript number.
- Subscription records remain local to the browser through existing `localStorage` keys.
- CSV export remains compatible and continues writing raw numeric stored price values.
- Display formatting is unchanged in this version.
- Manifest `start_url` and `scope`, root-level service worker registration, saved records, and home-screen app continuity are preserved.

## Implementation Notes

- The price field changed to a text input with decimal input mode.
- Localized parsing was added in `app.js`.
- v1.3.1 uses a versioned `app.js` query string and refreshed service worker cache to avoid stale mixed shells.

## QA Checklist

- [x] Valid localized examples save successfully.
- [x] Invalid localized inputs are rejected.
- [x] Stored prices remain numeric.
- [x] CSV export keeps raw numeric stored values.
- [x] PWA script/cache versioning refreshed cached users.

## Risks

- Stale PWA shells can pair new markup with old parsing JavaScript.
- Ambiguous localized separators must parse consistently.

## Release History

- 2026-04-25 pass 2: Changed the price field to text input with decimal input mode, added localized price parsing in `app.js`, and bumped the static service worker cache name for updated app shell files.
- 2026-04-25 pass 3: QA checked valid and invalid parser examples; no code changes were needed.
- 2026-04-25 docs pass: Updated project docs for v1.3 behavior and continuity notes.
- 2026-04-25 v1.3.1 hotfix: Fixed stale PWA/app-shell behavior where cached users could see the new text price input while running old price parsing JavaScript. The fix uses `app.js?v=1.3.1`, cache `subscription-tracker-v1.3.1-static`, `skipWaiting()`, and `clients.claim()` while preserving home-screen/PWA continuity.

## Open Follow-Ups

- None currently tracked for localized price input.

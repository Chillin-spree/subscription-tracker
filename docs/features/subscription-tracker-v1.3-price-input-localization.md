# Subscription Tracker v1.3 Price Input Localization

> Accept common localized price input while preserving numeric storage, local-only privacy, CSV compatibility, and installed PWA continuity.

Status: released with v1.3.1 hotfix

## Goal

Users can enter prices with dot or comma decimal styles:

- `799`
- `799.99`
- `799,99`
- `1.299,99`
- `1,299.99`

## Behavior

- Price input accepts the formats above and stores the result as a JavaScript number.
- Subscription records remain local to the browser through existing `localStorage` keys.
- CSV export remains compatible and continues writing raw numeric stored price values.
- Display formatting is unchanged in this version.
- Manifest `start_url` and `scope`, root-level service worker registration, saved records, and home-screen app continuity are preserved.

## Build Notes

- 2026-04-25 pass 2: Changed the price field to text input with decimal input mode, added localized price parsing in `app.js`, and bumped the static service worker cache name for updated app shell files.
- 2026-04-25 pass 3: QA checked valid and invalid parser examples; no code changes were needed.
- 2026-04-25 docs pass: Updated project docs for v1.3 behavior and continuity notes.
- 2026-04-25 v1.3.1 hotfix: Fixed stale PWA/app-shell behavior where cached users could see the new text price input while running old price parsing JavaScript. The fix uses `app.js?v=1.3.1`, cache `subscription-tracker-v1.3.1-static`, `skipWaiting()`, and `clients.claim()` while preserving home-screen/PWA continuity.

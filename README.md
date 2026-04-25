# Subscription Tracker

A minimalist phone-first subscription tracker built with plain HTML, CSS, and JavaScript.

## Features

- Add, edit, and delete manual subscription records.
- Enter prices with dot or comma decimal styles, such as `799`, `799.99`, `799,99`, `1.299,99`, or `1,299.99`.
- Persist records in browser `localStorage`.
- See payments due in the next 7 days.
- Review an activity log for created, updated, and deleted subscriptions.
- View monthly/yearly spending totals and a small payment-label infographic.
- Export subscription data as plain text or CSV.
- Download and restore local JSON backups that include subscriptions and activity history.
- Install the app to a phone home screen with PWA metadata and app icons.
- Reload the app shell offline after a first successful online visit.
- Preserve installed/home-screen app continuity across updates.

## Run Locally

Open `index.html` in a browser. No build step, framework, backend, or dependencies are required.

To test installability or offline shell caching, serve the folder over local HTTP first, for example:

```sh
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

## Privacy

Subscription data stays in the user's browser/device storage through `localStorage`. Prices are stored as numeric values after entry. JSON backup files are downloaded from and restored into the browser locally; they are not uploaded or synced by the app. PWA support caches only static app shell files so the app can reopen offline after the first visit; subscription records remain in local browser storage.

The app has no account system, server, analytics, cloud sync, upload, data sale, payment processing, or payment authorization. Payment-related fields are labels/nicknames only, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.

Do not enter sensitive payment details such as credit card numbers, CVV/CVC, bank account numbers, IBAN, passwords, payment provider login details, identity numbers, or any data needed to make, authorize, or process a payment.

CSV exports keep the compatibility header `paymentMethod`, which means payment label/nickname only. Price values remain raw numeric values in CSV exports for compatibility. JSON restore is a full replacement of local subscriptions and activity log after explicit user confirmation.

## Project Status

`subscription-tracker-v1` is complete and approved. `subscription-tracker-v1.1-pwa-support` adds install metadata, phone home screen icons, and offline shell loading after first visit. `subscription-tracker-v1.3-price-input-localization` accepts common dot and comma price formats while preserving numeric local storage, CSV compatibility, and home-screen app continuity. v1.3.1 fixes stale PWA app-shell behavior after the price input update. `subscription-tracker-v1.4-json-backup-restore` adds local JSON backup download plus validated, confirmed local restore. Future not-now ideas are tracked in `docs/BACKLOG.md`.

## License

No license has been selected yet.

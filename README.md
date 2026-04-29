# Subscription Tracker

A minimalist phone-first subscription tracker built with plain HTML, CSS, and JavaScript.

## Features

- Add, edit, and delete manual subscription records.
- Add an optional end date to a subscription and keep Upcoming payments from showing charges after that date.
- Enter prices with dot or comma decimal styles, such as `799`, `799.99`, `799,99`, `1.299,99`, or `1,299.99`.
- Persist records in browser `localStorage`.
- See payments due in the next 7 days.
- Review an activity log for created, updated, and deleted subscriptions.
- View monthly/yearly spending totals, break monthly equivalent spending down by item, category, or payment label, and review actual selected-range charges by item, category, or payment label.
- Save local payment label and category presets for faster manual entry while keeping fields editable as free text.
- Copy or download readable plain text subscription backups, then restore pasted backup text after preview and confirmation.
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

Subscription data and saved presets stay in the user's browser/device storage through `localStorage`. Prices are stored as numeric values after entry. Plain text backup text can be copied or downloaded from the browser locally; download remains available when clipboard copy is unavailable or fails. Pasted plain text backup restores are checked locally and require confirmation before replacing local subscriptions. Backup data is not uploaded or synced by the app. PWA support caches only static app shell files so the app can reopen offline after the first visit; subscription records and presets remain in local browser storage.

The app has no account system, server, analytics, cloud sync, upload, data sale, payment processing, or payment authorization. Payment-related fields are labels/nicknames only, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.

Do not enter sensitive payment details such as credit card numbers, CVV/CVC, bank account numbers, IBAN, passwords, payment provider login details, identity numbers, or any data needed to make, authorize, or process a payment.

Plain text backups use a readable `Subscription Tracker Backup` v1 template and currently carry subscription records only; pasted text can replace local subscriptions after validation and explicit confirmation while keeping activity log and saved presets unchanged. CSV compatibility is preserved internally with the `paymentMethod` header, which means payment label/nickname only. Current JSON backup compatibility is preserved internally with schema version 2 for subscriptions, activity log, and saved presets.

## Project Status

Current stable app shell is v1.9.2. The app supports manual subscription tracking, local presets, selected-range spending breakdowns, plain text backup copy/download and confirmed pasted-text restore, PWA install/offline shell behavior, and narrow import/render safety hardening. Detailed version history lives in `docs/features/`; future not-now ideas are tracked in `docs/BACKLOG.md`.

## License

MIT License. See `LICENSE`.

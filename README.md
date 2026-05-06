# Bills

Bills is a static, phone-first, local-only PWA for manually tracking recurring bills and subscriptions. It is built with plain HTML, CSS, and JavaScript, and runs without a backend or build step.

Live app: https://chillin-spree.github.io/bills/

## Principles

- Manual entry is the source of truth.
- Data stays in the browser's local storage on the user's device.
- No account, cloud sync, analytics, payment processing, bank/card import, OCR, email scanning, or remote storage is used.
- Payment-related fields are labels or nicknames only, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.
- Users should keep text-only backups because browser/device storage can be cleared outside the app.

Do not enter sensitive payment details such as card numbers, CVV/CVC, bank account numbers, IBAN, passwords, payment provider login details, identity numbers, or anything needed to make, authorize, or process a payment.

## What Bills Does

- Add, edit, and delete manual subscription records.
- Track names, amounts, currencies, billing dates, billing cycles, payment labels, categories, notes, and optional end dates.
- Show payments due in the next 7 days.
- Show grouped due-soon currency totals as compact chips.
- Review monthly and yearly spending totals grouped by currency.
- Break spending down by item, category, or payment label.
- Review selected actual Range summaries and Range breakdowns.
- Keep multi-currency totals separate instead of converting or combining currencies.
- Save local payment-label and category presets while keeping fields editable as free text.
- Use collapsible sections for Subscriptions, Activity, and Backup.
- Show local-only privacy details in the app.
- Reopen the app shell offline after a first successful online load.

Ordinary UI language such as `Subscriptions`, `Add subscription`, and subscription records/items remains intentional domain wording.

## What Bills Does Not Do

- No accounts or sign-in.
- No cloud sync or remote backup.
- No analytics, tracking, ads, data sale, or paid services.
- No payment authorization, bill payment, card storage, bank connection, or transaction import.
- No OCR, receipt scanning, email scanning, or automatic discovery.
- No push notifications.
- No CSV or JSON backup/restore workflow.

## Backup And Restore

Bills supports one backup workflow: readable plain text.

- Current backups use the `Bills Backup` header.
- Historical text backups with the `Subscription Tracker Backup` header remain supported for restore.
- Backup text can be copied or downloaded from the browser.
- Pasted backup text is previewed and validated locally before restore.
- Restore requires confirmation and replaces local subscription records while keeping the activity log and saved presets.

Backups currently carry subscription records only. If browser local storage is cleared and no text backup exists, the app cannot recover those deleted local records.

## Offline And PWA Behavior

Bills can be installed to a phone home screen and uses a service worker to cache static app-shell files. After the first successful online load, the app shell can reopen offline. Subscription records and presets still live in browser local storage; they are not uploaded or synced.

The PWA uses relative manifest paths (`start_url: "./"`, `scope: "./"`) and a root-level `service-worker.js` to preserve installed/home-screen continuity at the live GitHub Pages URL.

## Development

Open `index.html` in a browser for basic local use. No framework, package install, build step, server, or dependency is required.

To test installability or offline shell caching, serve the folder over local HTTP:

```sh
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

Useful verification scripts:

```sh
node --check app.js
node --check service-worker.js
node scripts/verify-plain-text-backup.js
node scripts/verify-storage-safety.js
node scripts/verify-import-safety.js
node scripts/verify-range-helpers.js
node scripts/verify-grouped-currency-totals.js
```

## Project Structure

- `index.html`: static app shell and UI markup.
- `styles.css`: app styling.
- `app.js`: local app behavior, storage handling, backup parsing, and calculations.
- `manifest.webmanifest`: PWA metadata.
- `service-worker.js`: offline app-shell caching.
- `icons/`: favicon, app icons, and Apple touch icon.
- `scripts/`: local verification scripts.
- `docs/`: project memory, decisions, status, backlog, handoffs, bugs, and feature history.

## Current Status

Current app script is `app.js?v=1.14.2`, and the current service-worker cache is `bills-v1.14.5-static`.

The current app identity is Bills. The GitHub repository is `https://github.com/Chillin-spree/bills`, and the live app is served at `https://chillin-spree.github.io/bills/`. The project was formerly hosted at `https://chillin-spree.github.io/subscription-tracker/`.

Existing localStorage keys intentionally keep their `subscription-tracker-v1-*` names for compatibility with existing saved local data. The service worker cache namespace is Bills-based and keeps cleanup for older Subscription Tracker app-shell caches.

## Documentation

- `docs/STATUS.md`: current workflow state and next step.
- `docs/VISION.md`: product direction and boundaries.
- `docs/DECISIONS.md`: durable product, UX, technical, and workflow decisions.
- `docs/BACKLOG.md`: v1.14 final-build readiness checklist.
- `docs/BUGS.md`: confirmed bugs and regression checks.
- `docs/HANDOFFS.md`: reusable handoff and review templates.
- `docs/features/`: feature and release history, including historical pre-rename Subscription Tracker docs.

## License

MIT License. See `LICENSE`.

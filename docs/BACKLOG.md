# Backlog

> Not-now work. Use this file to prevent scope creep.

<!-- Move active work into docs/STATUS.md and a feature file. Keep backlog items short. -->

## Naming Rule

- Backlog items use `<system>-<focus>` without a version number.
- Feature files use `<system>-v<version>-<focus>.md` when versioning is useful.

## Hygiene Rules

- When an item becomes active, remove it from `BACKLOG.md`.
- Obsolete backlog ideas may be deleted.
- Do not let Parked / later grow unbounded.

## Ready for Design

<!-- Empty. -->

## Designed, Not Scheduled

<!-- Empty. -->

## Ready for Build

<!-- Empty. -->

## Roadmap

- `subscription-tracker-v1.4-json-backup-restore`: Manual backup/import for local-only data; preserve existing localStorage keys; include clear restore confirmation; backup files stay user-controlled and are not uploaded by the app.
- `subscription-tracker-v1.5-custom-categories`: Add user-defined categories such as Rent, Music, Bills, Software, and Utilities; safely migrate existing records with a default/empty category.
- `subscription-tracker-v1.6-spending-by-item-category`: Show spending by recurring item and category, not only payment label; keep old records visible even if they have no category.
- `subscription-tracker-v1.7-custom-payment-labels`: Let users define reusable payment label nicknames; preserve existing free-text `paymentMethod` values.
- `subscription-tracker-v1.8-bills-empty-wallet-rename`: Broaden identity from subscriptions to recurring bills with an empty wallet icon; preserve the same GitHub Pages URL and installed PWA continuity.
- `subscription-tracker-v1.9-security-hardening-import-safety`: Review input rendering, imported JSON safety, local-only protections, and future data migrations; avoid breaking existing data or offline behavior.

## Parked / Later

- `subscription-tracker-cloud-sync`: Sync records across devices.
- `subscription-tracker-bank-import`: Automatically import subscription charges from banks or cards; remains out of scope unless explicitly redesigned with privacy/security review.
- `subscription-tracker-auth`: Add accounts, sign-in, and user identity.
- `subscription-tracker-native-wrapper`: Package the app for app-store distribution.
- `subscription-tracker-ocr-email-scanning`: Detect subscriptions from screenshots, receipts, or email.
- `subscription-tracker-push-notifications`: Send reminders for upcoming payments.
- `subscription-tracker-pdf-export`: Export subscription records as PDF.
- `subscription-tracker-xlsx-export`: Export a real `.xlsx` workbook instead of CSV.
- `subscription-tracker-data-import`: Import subscription records from portable files.

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

- `subscription-tracker-import-safety-followups`: Continue import/storage hardening after v1.9.2. Candidate follow-ups include corrupted localStorage handling, pasted text/JSON size and count limits, hidden CSV formula hardening before any CSV re-exposure, and broader JSON restore verifier coverage.

## Parked / Later

- `subscription-tracker-recurring-bills-scope`: Broaden identity from subscriptions toward rent, bills, and other recurring payments; preserve the same GitHub Pages URL and installed PWA continuity.
- `subscription-tracker-local-storage-explainer`: Clarify what happens to local records when the app is removed from a phone, reinstalled, updated, opened offline, or restored from backup.
- `subscription-tracker-local-only-privacy-modal`: Turn the local-only privacy message into an accessible modal or detail view using the current wording as the source of truth.
- `subscription-tracker-general-customization`: Explore user customization for labels, display preferences, categories, and summary views.
- `subscription-tracker-bills-rename`: Consider renaming the app to Bills after broader recurring-payment scope is designed; not decided.
- `subscription-tracker-empty-wallet-icon`: Consider an empty wallet icon as part of any future visual identity change; not decided.
- `subscription-tracker-cloud-sync`: Sync records across devices.
- `subscription-tracker-bank-import`: Automatically import subscription charges from banks or cards; remains out of scope unless explicitly redesigned with privacy/security review.
- `subscription-tracker-auth`: Add accounts, sign-in, and user identity.
- `subscription-tracker-native-wrapper`: Package the app for app-store distribution.
- `subscription-tracker-ocr-email-scanning`: Detect subscriptions from screenshots, receipts, or email.
- `subscription-tracker-notifications`: Investigate browser/PWA notification feasibility, permission UX, and offline expectations before adding reminders.
- `subscription-tracker-pdf-export`: Export subscription records as PDF.
- `subscription-tracker-xlsx-export`: Export a real `.xlsx` workbook instead of CSV.
- `subscription-tracker-merge-restore`: Add an explicit merge/deduplicate restore mode instead of full replacement only.
- `subscription-tracker-empty-json-backup`: Allow downloading an empty JSON backup template when there is no subscription or activity data.
- `subscription-tracker-data-import`: Import subscription records from portable files beyond the v1.4 JSON backup schema.

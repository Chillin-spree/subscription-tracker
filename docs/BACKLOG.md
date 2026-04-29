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

<!-- v1.10.x is the final/simple stabilization line. Do not reopen runtime work unless a real bug appears. -->

### v1.11 UI/UX Polish

- `subscription-tracker-v1.11-ui-ux-polish`: Future UI/UX polish should be handled as a separate v1.11 track after v1.10.x final stabilization. v1.11 should be split into multiple focused passes and should preserve existing product behavior, text-only backup format, localStorage keys, Range logic, PWA continuity, and local-only data behavior.
- Candidate ideas: hideable/collapsible lower-frequency sections such as Activity/history and Backup, visual hierarchy polish, mobile spacing/readability polish, form/input clarity, backup workflow clarity, and an accessibility/focus/contrast pass.

### Bills Rename Compatibility

- `subscription-tracker-bills-rename-compatibility`: Consider renaming the app to Bills as a dedicated compatibility pass, not casual copy churn. Preserve the same live URL, installed PWA continuity, local data, and text backup restore compatibility. If a future backup header changes, the parser should support both the historical `Subscription Tracker Backup` header and any new `Bills Backup` header.

### v1.12 Grouped Multi-Currency Totals

- `subscription-tracker-v1.12-grouped-multi-currency-totals`: Explore grouped totals by currency as a separate v1.12 track. Chosen direction is Option A: no exchange rates, no live currency data, no converted grand total, and no base currency setting in the first pass. Show TRY, USD, EUR, and other entered-currency totals separately where relevant.
- Must preserve local-only behavior, text backup compatibility, localStorage keys, the existing per-subscription currency field, Range date/sub-mode behavior, PWA continuity, and current manual-entry privacy boundaries.

## Parked / Later

- `subscription-tracker-recurring-bills-scope`: Broaden identity from subscriptions toward rent, bills, and other recurring payments; preserve the same GitHub Pages URL and installed PWA continuity.
- `subscription-tracker-local-storage-explainer`: Clarify what happens to local records when the app is removed from a phone, reinstalled, updated, opened offline, or restored from backup.
- `subscription-tracker-local-only-privacy-modal`: Turn the local-only privacy message into an accessible modal or detail view using the current wording as the source of truth.
- `subscription-tracker-general-customization`: Explore user customization for labels, display preferences, categories, and summary views.
- `subscription-tracker-empty-wallet-icon`: Consider an empty wallet icon as part of any future visual identity change; not decided.
- `subscription-tracker-cloud-sync`: Sync records across devices.
- `subscription-tracker-bank-import`: Automatically import subscription charges from banks or cards; remains out of scope unless explicitly redesigned with privacy/security review.
- `subscription-tracker-auth`: Add accounts, sign-in, and user identity.
- `subscription-tracker-native-wrapper`: Package the app for app-store distribution.
- `subscription-tracker-ocr-email-scanning`: Detect subscriptions from screenshots, receipts, or email.
- `subscription-tracker-notifications`: Investigate browser/PWA notification feasibility, permission UX, and offline expectations before adding reminders.
- `subscription-tracker-pdf-export`: Export subscription records as PDF.
- `subscription-tracker-xlsx-export`: Explore a real `.xlsx` workbook as a separate future export.
- `subscription-tracker-merge-restore`: Add an explicit merge/deduplicate restore mode instead of full replacement only.
- `subscription-tracker-data-import`: Import subscription records from portable text-based formats beyond the supported plain text backup template.

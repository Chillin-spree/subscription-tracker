# Bills v1.13 App Rename

## Summary

Rename the app identity from Subscription Tracker to Bills while preserving local data, installed PWA continuity, and text backup compatibility.

## Current State

- Runtime/app shell: `v1.13.0`, local implementation pending user review.
- Browser title, visible app title, Apple mobile web app title, PWA manifest `name`, PWA manifest `short_name`, and favicon accessible label now use `Bills`.
- Service worker cache and app script references are bumped to `v1.13.0`.
- Newly generated plain text backups start with `Bills Backup`.
- Pasted restore accepts both `Bills Backup` and historical `Subscription Tracker Backup`.
- Generated backup filenames use `bills-backup-v1.13-YYYY-MM-DD.txt`.
- The GitHub repository remains `Chillin-spree/subscription-tracker`.
- The live GitHub Pages URL remains `https://chillin-spree.github.io/subscription-tracker/`.

## Product Direction

- Bills is the current app identity.
- Subscription Tracker remains the historical product name in older release docs and backup compatibility references.
- Ordinary UI terminology such as `Subscriptions`, `Add subscription`, `Upcoming payments`, `Spending overview`, `Activity`, and `Backup` remains unchanged by design.
- The rename does not broaden runtime behavior by itself; it only changes identity surfaces and backup identity compatibility.

## Compatibility Guardrails

- Preserve local-only behavior.
- Preserve existing localStorage keys and schema:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
  - `subscription-tracker-v1-local-only-notice-acknowledged`
- Preserve text-only backup as the only supported backup/export/restore workflow.
- Preserve historical `Subscription Tracker Backup` restore support.
- Preserve pasted restore semantics: replace subscriptions only, keep activity log and saved presets.
- Preserve manifest `start_url: "./"` and `scope: "./"`.
- Preserve root-level `service-worker.js` registration and installed/home-screen continuity as much as possible.
- Do not reintroduce CSV or JSON backup/restore.

## Pass History

### Pass 1: Rename inventory and Build Pass Plan

- Identified runtime identity, PWA, backup, docs, repo/Pages, localStorage, and verification-script rename surfaces.
- Classified compatibility-sensitive references and deferred repo/Pages migration.
- No files changed.

### Pass 2: Runtime app/PWA identity

- Updated browser title, visible app title, Apple mobile web app title, manifest name/short_name, and favicon accessible label to Bills.
- Bumped app shell/cache references to `v1.13.0`.
- Did not change backup behavior, localStorage keys, repo slug, Pages URL, or ordinary subscription UI terminology.

### Pass 3: Backup header dual-support

- Generated text backups now use `Bills Backup`.
- Parser accepts both `Bills Backup` and `Subscription Tracker Backup`.
- Backup placeholder and invalid-header error copy mention both accepted headers.
- Generated backup filename changed to `bills-backup-v1.13-YYYY-MM-DD.txt`.
- Verification now covers new generated header, legacy header parsing, invalid header failure, and restore preserving activity log and presets.

### Pass 4: Docs sweep/status update

- Current overview docs now describe Bills, formerly Subscription Tracker.
- Durable decision and status docs now capture compatibility guardrails.
- Historical feature docs were intentionally left unchanged.

## Not In v1.13 Local Rename

- GitHub repository rename.
- GitHub Pages URL migration.
- Redirect or installed-PWA migration strategy for a future Pages path change.
- Broader UI terminology rename from subscriptions to bills.
- Storage key or schema migration.
- Backup format version change beyond the accepted header identity.
- Range behavior, Range sub-mode behavior, multi-currency behavior, or recurrence changes.
- Cloud sync, accounts, analytics, payments, bank/card import, OCR/email scanning, notifications, paid services, or remote storage.

## Acceptance

- [x] Runtime app/browser/PWA identity says Bills.
- [x] Manifest `start_url` and `scope` remain `"./"`.
- [x] App shell/cache references are bumped for changed runtime assets.
- [x] New generated plain text backups start with `Bills Backup`.
- [x] Historical `Subscription Tracker Backup` text remains valid.
- [x] Invalid backup headers fail safely.
- [x] Pasted restore still replaces subscriptions only and preserves activity log and saved presets.
- [x] Existing localStorage keys/schema remain unchanged.
- [x] Ordinary subscription UI terminology remains unchanged.
- [x] GitHub repo and Pages URL remain unchanged.
- [x] CSV and JSON backup/restore remain absent from the runtime.

## QA Notes

- Automated checks should include syntax, plain text backup, storage safety, import/render safety, grouped currency totals, Range helpers, exact identity searches, manifest start/scope verification, and whitespace diff validation.
- Manual/browser QA should cover page title/app title, install metadata where practical, backup copy/download header and filename, legacy backup paste preview, confirmed restore, and a quick smoke of existing Range and subscription list behavior.

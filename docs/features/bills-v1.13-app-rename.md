# Bills v1.13 Rename Track

## Summary

The v1.13 track renamed the product identity from Subscription Tracker to Bills while preserving local data, installed PWA continuity, text-backup compatibility, and ordinary subscription-domain terminology.

This file is the consolidated v1.13 rename-track summary. Patch-specific addenda remain in:

- `docs/features/bills-v1.13.1-github-rename.md`
- `docs/features/bills-v1.13.2-final-rename-cleanup.md`

## Final v1.13.2 State

- Runtime app/browser/PWA identity says Bills.
- Browser title, visible app title, Apple mobile web app title, manifest `name`, and manifest `short_name` use Bills.
- Canonical GitHub repository is `Chillin-spree/bills`.
- Canonical live GitHub Pages URL is `https://chillin-spree.github.io/bills/`.
- Runtime app shell references use `app.js?v=1.13.2`.
- Service worker cache namespace is `bills-v1.13.2-static`.
- Service worker activation still clears old `subscription-tracker-*` app-shell caches.
- Generated plain text backups start with `Bills Backup`.
- Pasted restore accepts both `Bills Backup` and historical `Subscription Tracker Backup`.
- Generated backup filenames use `bills-backup-v1.13-YYYY-MM-DD.txt`.
- Existing localStorage keys intentionally remain `subscription-tracker-v1-*`.

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
- Preserve root-level `service-worker.js` registration and installed/home-screen continuity.
- Do not reintroduce CSV or JSON backup/restore.

## Intentional Legacy References

- `subscription-tracker-v1-*` remains a durable localStorage compatibility contract, not current app-name residue.
- `Subscription Tracker Backup` remains a supported historical plain-text backup header.
- `subscription-tracker-*` service-worker cache cleanup remains intentional so older app shells do not linger after the rename.
- Older `docs/features/subscription-tracker-*` files remain historical release records.
- Ordinary UI terms such as `Subscriptions`, `Add subscription`, `Upcoming payments`, `Spending overview`, `Activity`, and `Backup` remain domain terminology, not app identity.

## Pass History

### v1.13.0 Runtime App And Backup Identity

- Renamed runtime identity surfaces to Bills.
- Updated browser title, visible app title, Apple mobile web app title, manifest `name`, manifest `short_name`, and favicon accessible label.
- Bumped app shell/cache references to `v1.13.0`.
- Generated text backups now use `Bills Backup`.
- Parser accepts both `Bills Backup` and `Subscription Tracker Backup`.
- Backup placeholder and invalid-header error copy mention both accepted headers.
- Generated backup filename changed to `bills-backup-v1.13-YYYY-MM-DD.txt`.
- Left GitHub repository and Pages URL under the old project path until the dedicated v1.13.1 pass.

### v1.13.1 GitHub Repo And Pages Identity

- Renamed GitHub repository from `Chillin-spree/subscription-tracker` to `Chillin-spree/bills`.
- Updated local `origin` to `https://github.com/Chillin-spree/bills.git`.
- Moved canonical live Pages URL from `https://chillin-spree.github.io/subscription-tracker/` to `https://chillin-spree.github.io/bills/`.
- Verified live Pages under `/bills/` while keeping manifest `start_url` and `scope` relative.
- Runtime behavior, storage keys, backup parser, Range, multi-currency, and ordinary UI terminology remained unchanged.

### v1.13.2 Final Rename Cleanup

- Moved service worker cache namespace from the old app-name family to `bills-v1.13.2-static`.
- Updated app shell references to `app.js?v=1.13.2`.
- Kept old `subscription-tracker-*` cache cleanup.
- Reconfirmed localStorage keys are legacy compatibility keys and should not be migrated without a future explicit backward-compatible migration plan.
- Confirmed current canonical docs use `Chillin-spree/bills` and `https://chillin-spree.github.io/bills/`.

## Not In The v1.13 Track

- Broader UI terminology rename from subscriptions to bills.
- Storage key or schema migration.
- Backup format version change beyond accepted header identity.
- Range behavior, Range sub-mode behavior, multi-currency behavior, or recurrence changes.
- Cloud sync, accounts, analytics, payments, bank/card import, OCR/email scanning, notifications, paid services, or remote storage.

## Acceptance

- [x] Runtime app/browser/PWA identity says Bills.
- [x] Canonical GitHub repo is `Chillin-spree/bills`.
- [x] Canonical live Pages URL is `https://chillin-spree.github.io/bills/`.
- [x] Manifest `start_url` and `scope` remain `"./"`.
- [x] App shell/cache references reached `v1.13.2`.
- [x] Current service worker cache namespace is Bills-based.
- [x] Old `subscription-tracker-*` app-shell caches are still cleaned up.
- [x] New generated plain text backups start with `Bills Backup`.
- [x] Historical `Subscription Tracker Backup` text remains valid.
- [x] Invalid backup headers fail safely.
- [x] Pasted restore still replaces subscriptions only and preserves activity log and saved presets.
- [x] Existing localStorage keys/schema remain unchanged.
- [x] Ordinary subscription UI terminology remains unchanged.
- [x] CSV and JSON backup/restore remain absent from the runtime.

## Verification Notes

- v1.13.0 verification covered runtime identity, backup header generation, legacy header parsing, invalid header failure, restore preserving activity log and presets, syntax, storage safety, import/render safety, Range helpers, grouped currency totals, manifest start/scope, and whitespace diff checks.
- v1.13.1 verification covered renamed GitHub repo/origin, live Pages under `/bills/`, live HTML script reference, service worker reachability, manifest identity, and relative start/scope.
- v1.13.2 verification covered app shell/cache version consistency, Bills cache namespace, old cache cleanup, storage-key preservation, backup compatibility, and current canonical docs.

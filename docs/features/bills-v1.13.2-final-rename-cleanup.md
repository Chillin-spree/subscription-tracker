# Bills v1.13.2 Final Rename Cleanup

## Summary

Complete the safe remaining rename cleanup after v1.13 app/backup identity and v1.13.1 GitHub repo/Pages identity moved to Bills.

## Inventory Classification

- Safe to rename now: service worker cache namespace, versioned app shell references, current status docs, v1.13.1 completion notes, and current canonical project docs.
- Must remain for compatibility: `subscription-tracker-v1-*` localStorage keys, historical `Subscription Tracker Backup` parser support, backup validation copy that names both accepted headers, and storage verification fixtures.
- Historical documentation/reference, keep unchanged: older `docs/features/subscription-tracker-*` release docs, old cache names in historical release notes, former repo/Pages URLs when describing old releases, and historical CSV/JSON decisions.
- Ordinary UI/domain terminology, keep unchanged: `Subscriptions`, `Add subscription`, `Subscription name`, and subscription-related workflow language.
- Needs decision before implementation: any future migration from `subscription-tracker-v1-*` storage keys to Bills-based storage keys.

## LocalStorage Decision

Keep existing localStorage keys unchanged:

- `subscription-tracker-v1-subscriptions`
- `subscription-tracker-v1-activity-log`
- `subscription-tracker-v1-payment-method-presets`
- `subscription-tracker-v1-category-presets`
- `subscription-tracker-v1-local-only-notice-acknowledged`

These are legacy compatibility keys and remain part of the durable local data contract. This pass does not add `bills-v1-*` storage keys, does not migrate stored records, and does not delete old keys.

## Runtime Cleanup

- App shell references move to `app.js?v=1.13.2`.
- Service worker cache namespace moves to `bills-v1.13.2-static`.
- Service worker activation continues clearing old `subscription-tracker-*` caches so users do not keep stale pre-rename app shells.
- Service worker file path, manifest path, manifest `start_url`, and manifest `scope` remain unchanged.

## Not In This Pass

- App UI terminology changes.
- localStorage key/schema migration.
- Backup header/parser/restore behavior changes.
- Range behavior changes.
- Multi-currency behavior changes.
- GitHub repo or Pages URL changes beyond current docs.
- CSV or JSON backup/restore.
- Cloud sync, accounts, analytics, payments, import, OCR, notifications, paid services, or remote storage.

## Acceptance

- [x] Current canonical repo references point to `Chillin-spree/bills`.
- [x] Current canonical Pages references point to `https://chillin-spree.github.io/bills/`.
- [x] Manifest identity remains Bills.
- [x] Manifest `start_url` and `scope` remain `"./"`.
- [x] Generated backups still start with `Bills Backup`.
- [x] Parser still accepts `Subscription Tracker Backup`.
- [x] localStorage keys remain unchanged and documented as compatibility keys.
- [x] Service worker cache/app shell version is consistent at `v1.13.2`.
- [x] Old `subscription-tracker-*` app-shell caches are still cleaned up.

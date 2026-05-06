# Bills v1.13.2 Final Rename Cleanup Addendum

## Summary

v1.13.2 completed the safe remaining rename cleanup after v1.13 app/backup identity and v1.13.1 GitHub repo/Pages identity moved to Bills.

The consolidated rename-track summary lives in `docs/features/bills-v1.13-app-rename.md`.

## Unique Patch Scope

- Move app shell references to `app.js?v=1.13.2`.
- Move service worker cache namespace to `bills-v1.13.2-static`.
- Keep service worker cleanup for old `subscription-tracker-*` app-shell caches.
- Reconfirm current canonical docs point to `Chillin-spree/bills` and `https://chillin-spree.github.io/bills/`.
- Reconfirm `subscription-tracker-v1-*` localStorage keys are legacy compatibility keys and should not be migrated without a future explicit backward-compatible migration plan.

## Inventory Classification

- Safe to rename in this patch: service worker cache namespace, versioned app shell references, current status docs, v1.13.1 completion notes, and current canonical project docs.
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

These are legacy compatibility keys and remain part of the durable local data contract. This pass did not add `bills-v1-*` storage keys, migrate stored records, or delete old keys.

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

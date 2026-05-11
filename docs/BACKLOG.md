# Backlog

> v1.14 final-build readiness checklist. Use this file to prevent scope creep.

<!-- Move active work into docs/STATUS.md and a feature file. Keep backlog items short. -->

## Naming Rule

- Backlog items use `<system>-<focus>` without a version number.
- Feature files use `<system>-v<version>-<focus>.md` when versioning is useful.

## Hygiene Rules

- When an item becomes active, remove it from `BACKLOG.md`.
- Obsolete backlog ideas may be deleted.
- Do not let Parked / later grow unbounded.

## Current Direction

- v1.14 final-build readiness is closed through the v1.14.3 icon platform polish patch. No new product features are currently planned for v1.14.
- v1.13 rename work is complete through pushed v1.13.2: runtime app/PWA identity says Bills, generated text backups use `Bills Backup`, historical `Subscription Tracker Backup` text remains valid, canonical GitHub identity is `Chillin-spree/bills`, live Pages is `https://chillin-spree.github.io/bills/`, and `subscription-tracker-v1-*` localStorage keys remain unchanged for compatibility.

## Current Readiness State

- README/public presentation, icon/brand assets, small UI polish, rename residue cleanup, v1.13 doc consolidation, footer cleanup, icon platform polish, and docs integrity work are complete through v1.14.3.
- No active v1.14 readiness backlog items remain after final verification and release.
- Future work should start from a new scoped feature brief instead of reopening the v1.14 final-build checklist.

## Compatibility Warnings

- Keep `subscription-tracker-v1-*` localStorage keys unless a future explicit backward-compatible migration is designed and tested.
- Keep historical `Subscription Tracker Backup` restore support.
- Keep old `subscription-tracker-*` service-worker cache cleanup.
- Do not reintroduce CSV or JSON backup/restore.
- Preserve local-only/manual-only behavior, existing local data, PWA continuity, Range behavior, Range sub-mode behavior, and multi-currency behavior.

## Explicitly Out Of Scope For Final Build

- Accounts, auth, cloud sync, analytics, paid services, remote storage, payment processing, bank/card import, OCR/email scanning, push notifications, native app wrappers, new export formats, major dashboards, broad customization, and new tracking workflows.

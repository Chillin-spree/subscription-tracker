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

- v1.14 is final-build readiness only. No new product features are currently planned for v1.14.
- v1.13 rename work is complete through pushed v1.13.2: runtime app/PWA identity says Bills, generated text backups use `Bills Backup`, historical `Subscription Tracker Backup` text remains valid, canonical GitHub identity is `Chillin-spree/bills`, live Pages is `https://chillin-spree.github.io/bills/`, and `subscription-tracker-v1-*` localStorage keys remain unchanged for compatibility.

## Current Readiness State

- README/public presentation, icon/brand assets, small UI polish, rename residue cleanup, v1.13 doc consolidation, and docs integrity work have been completed locally for v1.14.
- Final release verification is the active readiness item. Before any v1.14 push, verify local-only behavior, PWA continuity, backup compatibility, Range behavior, Range sub-modes, multi-currency totals, docs/file integrity, and clean git state.
- No new product features are planned for v1.14.

## Compatibility Warnings

- Keep `subscription-tracker-v1-*` localStorage keys unless a future explicit backward-compatible migration is designed and tested.
- Keep historical `Subscription Tracker Backup` restore support.
- Keep old `subscription-tracker-*` service-worker cache cleanup.
- Do not reintroduce CSV or JSON backup/restore.
- Preserve local-only/manual-only behavior, existing local data, PWA continuity, Range behavior, Range sub-mode behavior, and multi-currency behavior.

## Explicitly Out Of Scope For Final Build

- Accounts, auth, cloud sync, analytics, paid services, remote storage, payment processing, bank/card import, OCR/email scanning, push notifications, native app wrappers, new export formats, major dashboards, broad customization, and new tracking workflows.

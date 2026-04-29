# Subscription Tracker v1.2 Privacy and Local Data Clarity

> Clarify that Subscription Tracker is local-only and that payment-related fields are labels/nicknames, not real payment details.

## Summary

Make the product and project docs clear that user records stay under user control in browser/device storage, and that the app does not collect, process, authorize, upload, sync, sell, or analyze payment data.

## Current Release State

v1.2 shipped as the privacy and local-data clarity release. Its privacy stance remains active and is also preserved in `AGENTS.md`, `README.md`, and later compatibility notes.

## User-Facing Scope

- Add local-only UI notice.
- Add form safety copy telling users to enter labels only.
- Replace older method/account visible wording with `Payment label`.
- Replace older occurrence visible wording with `Billing cycle`.
- Update human-readable text export labels to `Billing cycle` and `Payment label`.
- Preserve internal field names and storage/export compatibility.

## Non-Goals

- No localStorage key or data-field renames.
- No internal `paymentMethod` rename.
- No CSV header change.
- No CRUD, PWA, manifest, or service worker behavior changes.
- No dependencies or frameworks.

## Compatibility / Preservation Rules

This app must never collect or imply that users should enter real payment information.

Allowed user data:

- Subscription or bill name.
- Price/amount.
- Currency.
- Billing date.
- Billing cycle.
- Payment label/nickname, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.
- Category, when added in a future version.
- Notes, if added in a future version.

Disallowed user data:

- Credit card numbers.
- CVV/CVC.
- Bank account numbers.
- IBAN.
- Passwords.
- Payment provider login details.
- Identity numbers.
- Any data needed to make, authorize, or process a payment.

## Implementation Notes

- Subscription records are stored in browser `localStorage`.
- The app has no backend, account system, analytics, upload, cloud sync, payment processing, or payment authorization.
- Existing localStorage data uses the internal field name `paymentMethod`.
- CSV exports preserve the `paymentMethod` header for compatibility; it means payment label/nickname only.
- v1.2 should not rename localStorage keys or internal data fields. Preserve backward compatibility and clarify user-facing wording instead.
- PWA support caches only static app shell files; user records remain in browser storage.

## QA Checklist

- [x] Docs clearly state data stays in browser/device storage.
- [x] Docs clearly state the app does not upload, sync, sell, analyze, process, authorize, or make payments.
- [x] Docs clearly say not to enter card numbers, CVV/CVC, bank account numbers, IBAN, passwords, provider logins, identity numbers, or payment authorization details.
- [x] `AGENTS.md` includes durable guardrails so future passes do not request or store sensitive payment data.
- [x] No app files or runtime behavior are changed.
- [x] Existing documentation remains concise and consistent.

## Risks

- Wording must not imply the app can make, authorize, process, or verify payments.
- Internal `paymentMethod` naming must remain compatible while user-facing text says payment label/nickname.

## Release History

- 2026-04-25 pass 1: Documentation setup and project guardrails completed. No runtime app files were changed.
- 2026-04-25 pass 2: Added local-only UI notice, form safety copy, safer visible payment-label/billing-cycle wording, and matching validation copy. Internal `paymentMethod` and localStorage keys remain unchanged.
- 2026-04-25 pass 3: Updated human-readable text export labels to `Billing cycle` and `Payment label`; preserved CSV `paymentMethod`; ran final static checks and browser smoke checks.
- 2026-04-25 release: Published v1.2 to GitHub Pages from `main`.
- 2026-04-25 release fix: Bumped the static service worker cache name to refresh cached v1.2 app shell assets.

## Open Follow-Ups

- Keep local-only and label-only wording aligned across future public UI and docs.

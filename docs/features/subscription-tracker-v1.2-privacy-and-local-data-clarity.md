# Subscription Tracker v1.2 Privacy and Local Data Clarity

> Clarify that Subscription Tracker is local-only and that payment-related fields are labels/nicknames, not real payment details.

Status: complete / released

## Goal

Make the product and project docs clear that user records stay under user control in browser/device storage, and that the app does not collect, process, authorize, upload, sync, sell, or analyze payment data.

## Product Principle

This app must never collect or imply that users should enter real payment information.

## Allowed User Data

- Subscription or bill name.
- Price/amount.
- Currency.
- Billing date.
- Billing cycle.
- Payment label/nickname, such as `Main card`, `Work card`, `Bank transfer`, or `Cash`.
- Category, when added in a future version.
- Notes, if added in a future version.

## Disallowed User Data

- Credit card numbers.
- CVV/CVC.
- Bank account numbers.
- IBAN.
- Passwords.
- Payment provider login details.
- Identity numbers.
- Any data needed to make, authorize, or process a payment.

## Current Technical Notes

- Subscription records are stored in browser `localStorage`.
- The app has no backend, account system, analytics, upload, cloud sync, payment processing, or payment authorization.
- Existing localStorage data uses the internal field name `paymentMethod`.
- CSV exports preserve the `paymentMethod` header for compatibility; it means payment label/nickname only.
- v1.2 should not rename localStorage keys or internal data fields. Preserve backward compatibility and clarify user-facing wording instead.
- PWA support caches only static app shell files; user records remain in browser storage.

## Pass 1 Scope

- Add this feature file.
- Update `docs/STATUS.md` to mark v1.2 active.
- Strengthen README privacy/local-data wording.
- Add durable project guardrails to `AGENTS.md`.
- Keep `docs/VISION.md`, `docs/BACKLOG.md`, and `docs/features/subscription-tracker-v1.md` concise and consistent with the privacy principle.

## Not In Pass 1

- Runtime app changes.
- UI copy changes in `index.html`.
- JavaScript changes in `app.js`.
- Style changes in `styles.css`.
- Manifest or service worker changes.
- localStorage key or data-field renames.
- Export format changes.
- Dependencies or frameworks.

## Pass 2 Scope

- Add a compact local-only notice near the top of the app.
- Add form-specific safety copy that tells users to enter labels only.
- Replace older method/account visible wording with `Payment label`.
- Replace older occurrence visible wording with `Billing cycle`.
- Update matching validation and accessible text without changing storage or behavior.

## Not In Pass 2

- localStorage key or data-field renames.
- Internal `paymentMethod` renames.
- Export label or CSV header changes.
- CRUD, PWA, manifest, or service worker behavior changes.
- Dependencies or frameworks.

## Pass 3 Scope

- Update human-readable text export cycle labels to `Billing cycle`.
- Update human-readable text export label fields to `Payment label`.
- Preserve CSV headers, including `paymentMethod`.
- Verify no risky user-facing wording remains.
- Run final checks and smoke tests.

## Not In Pass 3

- localStorage key or data-field renames.
- Internal `paymentMethod` renames.
- CSV header changes.
- CRUD, PWA, manifest, or service worker behavior changes.
- Dependencies or frameworks.

## Recommended Follow-Up Passes

1. Review v1.2 privacy/local-data clarity for release.
2. If approved, close the feature and update status.

## Acceptance Criteria

- [x] Docs clearly state data stays in browser/device storage.
- [x] Docs clearly state the app does not upload, sync, sell, analyze, process, authorize, or make payments.
- [x] Docs clearly say not to enter card numbers, CVV/CVC, bank account numbers, IBAN, passwords, provider logins, identity numbers, or payment authorization details.
- [x] `AGENTS.md` includes durable guardrails so future passes do not request or store sensitive payment data.
- [x] No app files or runtime behavior are changed.
- [x] Existing documentation remains concise and consistent.

## Build Notes

- 2026-04-25 pass 1: Documentation setup and project guardrails completed. No runtime app files were changed.
- 2026-04-25 pass 2: Added local-only UI notice, form safety copy, safer visible payment-label/billing-cycle wording, and matching validation copy. Internal `paymentMethod` and localStorage keys remain unchanged.
- 2026-04-25 pass 3: Updated human-readable text export labels to `Billing cycle` and `Payment label`; preserved CSV `paymentMethod`; ran final static checks and browser smoke checks.
- 2026-04-25 release: Published v1.2 to GitHub Pages from `main`.

# Subscription Tracker v1

> Historical release summary for the first minimalist phone-first Subscription Tracker.

## Summary

v1 established the static, dependency-free app for manually tracking recurring subscriptions, reviewing upcoming payments, keeping a basic activity log, viewing a compact spending summary, and exporting records.

## Current Release State

v1 is complete, approved, and shipped. Later feature files document PWA support, privacy copy, localized price input, backups, presets, spending breakdowns, date ranges, text backup, range sub-modes, and import/render hardening.

## User-Facing Scope

- Manual subscription create, edit, and delete flows.
- Required fields: name, price, billing date, billing cycle, and payment label/nickname.
- Optional fields: category, notes, and currency.
- Default currency: TRY.
- Billing cycle values: weekly, monthly, quarterly, and yearly.
- Upcoming payments due in the next 7 days.
- Activity log entries for created, updated, and deleted subscriptions.
- Spending overview with monthly/yearly equivalents, active count, and payment-label infographic.
- Human-readable text export and spreadsheet-compatible CSV export.
- Phone-first, minimalist UI with local browser storage.

## Non-Goals

- Account creation, auth, and cloud sync.
- Automatic bank or card imports.
- OCR, receipt scanning, and email scanning.
- Push notifications.
- Native app-store wrappers.
- PDF export.
- Real `.xlsx` export.
- Data import.
- Billing, payment processing, or monetization.
- Billing cycle history.
- Archived subscriptions, unless required to keep deleted activity log entries readable.

## Compatibility / Preservation Rules

- Static app using plain HTML, CSS, and JavaScript.
- No framework or dependency.
- User data stays local in browser `localStorage`.
- Payment labels are nicknames only; users should not enter card, bank, login, identity, or authorization details.
- Export remains part of the product promise because user-entered data should stay portable.

## Implementation Notes

- v1 was implemented after an initial documentation setup and repository map.
- The app foundation added `index.html`, `styles.css`, and `app.js`.
- Final behavior included CRUD, localStorage persistence, upcoming payments, activity log, dependency-free spending infographic, text export, and CSV export.

## QA Checklist

- [x] Add, edit, and delete subscription records.
- [x] Validate required fields.
- [x] Persist records across refresh.
- [x] Show upcoming payments due in the next 7 days.
- [x] Update spending overview after record changes.
- [x] Record create, update, and delete activity entries.
- [x] Export text and CSV records.
- [x] Confirm narrow viewport layout and empty states.
- [x] Confirm no runtime dependency was added.

## Risks

- Manual data entry can become stale unless users keep records updated.
- Export compatibility matters because the app is local-only.
- Payment label wording must not imply real payment credentials.

## Release History

- 2026-04-25: Documentation setup captured v1 scope and exclusions.
- 2026-04-25: App foundation added the dependency-free static shell.
- 2026-04-25: v1 implementation completed with CRUD, localStorage, upcoming payments, activity log, spending overview, text export, and CSV export.
- 2026-04-25: Final QA and polish completed; user approved v1 closeout.

## Open Follow-Ups

- Later feature files track all post-v1 enhancements and compatibility changes.

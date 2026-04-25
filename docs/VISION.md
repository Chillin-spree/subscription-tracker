# Vision

> Product north star. Keep this durable and compact.

<!-- Update this when product direction changes, not for routine implementation details. -->

## Project Name

Subscription Tracker

## Problem

People often lose track of small recurring charges until they add up. Subscription Tracker should make those commitments visible without requiring bank access, account creation, or a heavy budgeting workflow.

## Target Users

- People who want a simple phone-first list of their recurring subscriptions.
- Users who prefer manual control over connecting financial accounts.
- Anyone who wants a quick weekly payment check and lightweight spending snapshot.

## v1 Goal

Create a minimalist subscription tracker where users manually add, edit, delete, review, summarize, and export subscription records.

## Out of Scope

- Account creation, auth, and cloud sync.
- Automatic bank/card import.
- OCR, receipt scanning, and email scanning.
- Push notifications.
- Native app-store wrappers.
- Advanced budgeting, forecasting, or investment/finance advice.

## Success Looks Like

- A user can open the app on a phone, record subscriptions quickly, see what is due in the next 7 days, understand spending distribution at a glance, and export their data when needed.

## Product Shape

### Should Become

- A calm, focused personal utility for recurring payment awareness.
- Fast to scan on a phone.
- Clear about manual records and historical changes.
- Useful without accounts, integrations, or setup friction.

### Should Never Become

- A full personal finance suite.
- A bank-connected data aggregator.
- A noisy dashboard packed with upsells, ads, or unnecessary metrics.

## Tradeoffs We Accept

- Manual entry is slower than automatic import, but keeps v1 private, transparent, and buildable.
- Minimal analytics are preferred over complex budgeting features.
- Export matters because user-entered data should be easy to take elsewhere.
- Local browser/device storage keeps user-entered records under user control.
- People who installed the app to their phone home screen must be able to keep using it after updates.

## Principles

<!-- Keep this list durable and compact. -->

- The app must never collect or imply that users should enter real payment authorization details.
- Payment-related fields are labels/nicknames only, not card, bank, login, identity, or authorization details.
- Preserve installed PWA continuity: same live URL, relative manifest start/scope, root service worker registration, offline shell behavior, saved local data, and CSV compatibility.
- Storage changes require backward-compatible migration; cached app shell changes require a static cache name bump.

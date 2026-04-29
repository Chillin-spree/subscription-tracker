# subscription-tracker-v1.7-date-ranges-end-dates

## Summary

Introduce optional absolute subscription end dates as a safe model foundation, then later design selected date-range spending review without breaking existing records, exports, backups, PWA continuity, or local-only privacy.

## Current Release State

v1.7.9 shipped as the date ranges and end-date release. Category/payment range tabs, persisted range state, CSV export changes, JSON schema changes, and ended-state behavior remained out of scope for v1.7.

Later v1.9 work added Range category/payment sub-modes without changing the v1.7 decisions that Range dates are non-persisted and top-level Items/Categories/Payment stay monthly normalized.

Historical note: CSV/JSON compatibility notes in this file describe the v1.7 release context. v1.10.0 later removed CSV export and JSON backup/restore from the current runtime.

## User-Facing Scope

- Add an optional `End date` field to manual subscription records.
- Store blank or missing end dates as empty values for newly saved records.
- Show an end date on subscription cards when present.
- Keep all subscriptions active for current counts and spending overview until a later pass explicitly designs ended-state behavior.
- Suppress Upcoming payments after an optional end date while keeping the end date inclusive.
- Provide pure date-range helpers for future Spending overview work without changing the current UI.
- Provide internal range breakdown adapters that match the existing overview row shape without changing the current UI.
- Add a fixed current-month Spending overview range tab that shows actual current-month scheduled item totals.
- Show a compact actual current-month total and occurrence summary on the range tab.
- Add non-persisted custom start/end date controls to the existing item-only range tab.
- Label the selected-range tab as `Range` while keeping `This month` for the reset-to-current-month control, adding clearer accessible names to range controls, and hiding normalized stat cards in Range mode.

## Non-Goals

- No date-range spending overview in passes 1, 2, 3, or 4.
- No custom date range inputs in passes 5 or 6.
- No persisted custom date range state in passes 7 or 8.
- No category or payment-label range tabs in passes 5, 6, 7, or 8.
- No visible occurrence totals by selected custom range in passes 3, 4, 5, or 6.
- No CSV end-date export.
- No JSON schema version 3.
- No ended, inactive, archived, or deletion state.
- No localStorage key rename or record migration.
- No auth, sync, upload, analytics, payment processing, or payment authorization behavior.

## Implementation Notes

- `endDate` is an optional absolute date-only field using `YYYY-MM-DD`.
- Empty or missing `endDate` values remain valid and are treated as blank.
- When present, `endDate` must be a valid calendar date and must not be before `billingDate`.
- Date-only parsing uses manual year/month/day validation instead of `new Date("YYYY-MM-DD")` to avoid timezone-sensitive behavior.
- `endDate` does not change active counts, spending overview totals, or export compatibility in v1.7 passes 1-2.
- Upcoming payments treats `endDate` as inclusive: a next payment exactly on the end date still appears; a next payment after the end date does not.
- Range helper calculations count actual scheduled billing occurrences inside an inclusive selected date range instead of monthly normalized estimates.
- Weekly occurrences repeat every 7 days from `billingDate`; monthly, quarterly, and yearly occurrences use calendar increments from the original billing date and clamp shorter months.
- Range breakdown adapters reuse the existing overview row shape with `currencyTotals`, `currencyBreakdown`, `sortAmount`, and row metadata, while adding occurrence count, total amount, and occurrence dates for future UI.
- The first visible range view is fixed to the current local calendar month and item rows only; Items, Categories, and Payment remain monthly normalized views.
- The range summary derives its total and occurrence count from the same selected-range item rows shown in the list so the summary and row breakdown stay aligned.
- Custom range controls are in-memory only. They default to the current local calendar month, do not persist to localStorage or backups, and use the `Range` tab label while the `This month` reset control restores the default current-month range.

## Compatibility / Preservation Rules

- Preserve localStorage keys:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- At v1.7 release time, CSV header and JSON backup schema compatibility were preserved.
- Older saved records and older backups without `endDate` remain valid.
- New JSON backups may include `endDate` inside subscription objects and activity snapshots without changing the backup envelope.
- Preserve `manifest.webmanifest` `start_url: "./"` and `scope: "./"`.
- Preserve root-level service worker registration.

## Risks

- Date-only parsing must avoid timezone-sensitive behavior.
- End dates must remain inclusive.
- Range totals must stay visually distinct from monthly normalized overview totals.
- Multiple currencies must stay separated.
- Backup/schema/storage compatibility must be preserved.

## Release History

- 2026-04-28 pass 1: Added optional `endDate` form handling, validation, card display, and manual date-only helpers. Existing records without `endDate` continue to load and edit with a blank end-date field. Runtime app shell versioning moved to `app.js?v=1.7.0` and cache `subscription-tracker-v1.7.0-static`. CSV export headers and JSON backup schema version remain unchanged.
- 2026-04-28 pass 2: Upcoming payments now respects optional end dates. Records without `endDate` remain ongoing; records with a next payment before or exactly on `endDate` still appear; records whose next payment is after `endDate` are excluded from Upcoming payments and Due soon totals. Active counts, Spending overview, CSV export, and JSON backup schema remain unchanged. Runtime app shell versioning moved to `app.js?v=1.7.1` and cache `subscription-tracker-v1.7.1-static`.
- 2026-04-28 pass 3: Added pure range calculation helpers for future selected-range Spending overview work. `getBillingOccurrencesInRange` returns actual scheduled occurrence dates inside an inclusive range, respecting `billingDate`, supported billing cycles, inclusive `endDate`, and defensive invalid-date handling. `getRangeSpendingForSubscription` returns occurrence count, total range amount, currency, and occurrence dates. Current Spending overview, Upcoming payments, active counts, CSV export, and JSON backup schema remain unchanged. Runtime app shell versioning moved to `app.js?v=1.7.2` and cache `subscription-tracker-v1.7.2-static`.
- 2026-04-28 pass 4: Added internal item, category, and payment-label range breakdown adapters for future selected-range Spending overview work. The adapters use actual occurrence totals from `getRangeSpendingForSubscription`, exclude zero-occurrence records, preserve zero-price records with occurrences, keep currencies separate, and return rows compatible with the existing overview breakdown render shape. Current Spending overview, Upcoming payments, active counts, CSV export, and JSON backup schema remain unchanged. Runtime app shell versioning moved to `app.js?v=1.7.3` and cache `subscription-tracker-v1.7.3-static`.
- 2026-04-28 pass 5: Added a fixed `This month` Spending overview tab using item-level actual scheduled charges for the current local calendar month. Existing Items, Categories, and Payment tabs remain monthly normalized. The range tab uses existing range breakdown adapters, shows actual current-month row labels, excludes subscriptions without current-month occurrences, keeps multiple currencies separate, and shows a clear empty state when there are no scheduled charges this month. Runtime app shell versioning moved to `app.js?v=1.7.4` and cache `subscription-tracker-v1.7.4-static`.
- 2026-04-28 pass 6: Added a compact `This month` range summary above the range breakdown. The summary appears only on the range tab, derives actual total(s) and occurrence count from the same current-month item rows used by the list, keeps multiple currencies separate, and shows the current local month date span. Existing Items, Categories, and Payment tabs, normalized overview stats, Upcoming payments, active counts, CSV export, and JSON backup schema remain unchanged. Runtime app shell versioning moved to `app.js?v=1.7.5` and cache `subscription-tracker-v1.7.5-static`.
- 2026-04-28 pass 7: Added non-persisted start/end date controls to the existing `This month` Spending overview tab. The selected range defaults to the current local calendar month, updates the same actual item rows and summary, includes a reset-to-current-month control, handles invalid or reversed ranges with a clear empty state, and keeps Items, Categories, and Payment tabs monthly normalized. Upcoming payments, active counts, CSV export, JSON backup schema, and localStorage keys remain unchanged. Runtime app shell versioning moved to `app.js?v=1.7.6` and cache `subscription-tracker-v1.7.6-static`.
- 2026-04-28 pass 8: Renamed the visible selected-range Spending overview tab to `Range`, kept the reset-to-current-month button labeled `This month`, adjusted range row/header copy to describe actual selected-range spending, added clearer accessible labels for range start, range end, and reset controls, and hid normalized Monthly/Yearly/Active stat cards while Range mode is active. No category/payment range modes, persistence, export, schema, Upcoming payments, or active-count behavior changed. Runtime app shell versioning moved to `app.js?v=1.7.9` and cache `subscription-tracker-v1.7.9-static`.

## QA Checklist

- Add a new subscription without an end date; it saves and displays as before.
- Add a new subscription with an end date; the card shows `Ends: Apr 30, 2026` style copy.
- Edit an existing subscription created before v1.7; end date is blank and saving preserves compatibility.
- Enter an end date before billing date; validation blocks save.
- Ongoing subscriptions without end dates still appear when due in the next 7 days.
- Subscriptions whose next payment is before or exactly on the end date appear.
- Subscriptions whose next payment is after the end date do not appear.
- Due soon total excludes payments suppressed by end date.
- Existing Spending overview still uses monthly/yearly normalized totals.
- Range helper code review confirms monthly `2026-01-31` clamps to shorter months.
- Range helper code review confirms yearly `2024-02-29` clamps in non-leap years.
- Range helper code review confirms selected ranges include start/end dates inclusively.
- Range helper code review confirms payments on `endDate` are included and payments after `endDate` are excluded.
- Range helper code review confirms invalid range dates, invalid billing dates, invalid cycles, invalid restored end dates, zero-price records, and multiple currencies are handled defensively for future consumers.
- Range adapter code review confirms item rows use actual occurrence totals, not monthly normalized estimates.
- Range adapter code review confirms category and payment rows group actual range totals by category and payment label.
- Range adapter code review confirms zero-occurrence records are excluded and zero-price records with occurrences are preserved.
- `Range` tab shows actual selected-range item totals using occurrence counts.
- `Range` shows a compact actual selected-range summary with total(s), occurrence count, and date span.
- `Range` summary derives totals and occurrence count from the same rows shown in the item list.
- `Range` hides normalized Monthly/Yearly/Active stat cards so actual range totals are visually distinct.
- Custom range controls default to the current local calendar month.
- Changing start/end dates updates actual item rows, summary total, occurrence count, note, and date span.
- Same-day ranges and occurrences exactly on range start or end are included.
- Reversed or invalid ranges show a clear empty state and no rows.
- Reset returns the selected range to the current local calendar month.
- Range start, range end, and reset controls have clear accessible names.
- Existing Items, Categories, and Payment tabs remain monthly normalized.
- `Range` excludes subscriptions with no selected-range occurrence.
- `Range` preserves zero-price subscriptions with selected-range occurrences.
- `Range` shows a clear empty state when there are no scheduled charges in the selected range.
- CSV header remains exactly `name,price,currency,billingDate,occurrence,paymentMethod,category,notes`.
- JSON backup schema notes above are historical; JSON backup/restore is not a current compatibility path after v1.10.0.
- App shell versions are all `v1.7.9`.

## Open Follow-Ups

- Persisted range state, CSV end-date export, JSON schema version 3, and ended/inactive subscription semantics remain future design topics.

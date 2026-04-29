# subscription-tracker-v1.6-spending-overview

## Summary

Improve Spending overview so users can understand monthly normalized recurring spending by individual item, category, and payment label while preserving existing records, exports, backups, PWA continuity, and the local-only privacy stance.

## Current Release State

Released to `main` in commit `03b64ff` (`Add spending overview breakdown tabs`). v1.7 date ranges and end dates built on this released v1.6 baseline.

## User-Facing Scope

- Keep the current Spending overview totals:
  - monthly normalized total,
  - yearly equivalent total,
  - active subscription count.
- Add breakdown views for:
  - individual item/subscription,
  - category,
  - payment method/payment label.
- Keep monthly equivalent spending as the primary comparison basis.
- Keep yearly equivalent as supporting context.
- Keep Upcoming payments as the place for next-payment timing and next-7-days totals.
- Keep the overview compact, phone-first, and easy to scan.

## Non-Goals

- No runtime app code in the documentation setup pass.
- No subscription record migration.
- No localStorage key changes.
- No CSV export format change.
- No JSON backup schema or restore behavior change.
- No new dependency, framework, charting library, build step, backend, analytics, upload, sync, or account behavior.
- No currency conversion.
- No date-range spending filters in v1.6.
- No inactive, archived, or ended subscription state unless a later feature designs that data model.
- No payment processing or payment authorization behavior.

## Implementation Notes

### Calculation Decision

Spending overview uses monthly normalized totals as the primary comparison basis:

- `weekly`: price multiplied by `52 / 12`.
- `monthly`: price as entered.
- `quarterly`: price divided by `3`.
- `yearly`: price divided by `12`.

Yearly equivalent remains derived from monthly equivalent multiplied by `12`.

Multiple currencies are displayed separately and are not converted or combined into a cross-currency total. If more than one currency is present, the overview should keep clear wording such as `Multiple currencies` and show grouped currency totals separately.

Next-payment timing, due dates, and next-7-days payment totals remain part of Upcoming payments, not Spending overview.

### Proposed UX and Layout

Use one Spending overview panel with a compact mode control near the existing totals:

- `Items`
- `Categories`
- `Payment`

Recommended default: `Items`, because it answers the most direct user question first: which recurring item costs the most.

Each mode should reuse the same visual pattern:

- The existing monthly/yearly/active stat cards remain at the top.
- A compact stacked bar represents the selected breakdown when useful.
- Ranked rows below the bar show label, monthly equivalent by currency, and supporting detail.
- Rows sort by monthly equivalent descending.
- The UI should stay lightweight and avoid becoming a full analytics dashboard.

### Grouping Behavior

### Items

- Show one row per subscription record.
- Sort by monthly equivalent descending.
- Keep duplicate names as separate rows because they represent distinct records.
- Use secondary detail to distinguish duplicate names, such as payment label, billing cycle, or category.
- Do not merge records with the same name.

### Categories

- Group by the existing `category` field.
- Empty, missing, or whitespace-only category values display as `Uncategorized`.
- Do not write `Uncategorized` back into subscription records.
- Show item count per category where space allows.
- Sort categories by monthly equivalent descending.

### Payment

- Group by the existing `paymentMethod` field.
- Keep user-facing wording as payment label or payment method label, not sensitive payment details.
- Preserve current behavior where payment labels are free text and may or may not come from saved presets.
- Show item count per payment label where space allows.
- Sort payment labels by monthly equivalent descending.

### Edge Cases

- Empty subscription list: show the existing overview empty state with no breakdown controls if needed.
- Missing category: show as `Uncategorized` without mutating saved records.
- Duplicate names: show separate item rows and use secondary details for clarity.
- Multiple currencies: display currency totals separately; do not convert, combine, or calculate misleading mixed-currency totals.
- Zero-price records: render without division errors and avoid misleading percentages.
- Unknown or invalid billing cycle values should not be introduced; current validation and restore behavior allow only weekly, monthly, quarterly, and yearly.
- Existing localized price entries are already stored as numeric values and should continue to be read as numbers.
- Existing saved payment label and category presets should not affect stored subscription values.
- There is no inactive or ended subscription state in the current model, so all saved subscription records remain active for v1.6 calculations.

## Compatibility / Preservation Rules

- Do not mutate existing subscription records.
- Existing localStorage keys must remain unchanged:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- Existing record fields must remain unchanged, including `paymentMethod` and `category`.
- CSV export headers and values must remain compatible, including `paymentMethod` and `category`.
- JSON backup schema version 2 export and restore behavior must remain compatible.
- Schema version 1 backup restore must remain accepted as legacy input.
- Multiple currencies must not be silently combined into one total.
- Preset deletion or absence must not change Spending overview calculations for existing records.
- Local-only privacy copy must remain accurate.

### PWA and Cache Notes

Runtime passes that change `index.html`, `app.js`, `styles.css`, or other app shell assets must:

- update the script URL version in `index.html` if `app.js` changes,
- update the `service-worker.js` cache name,
- cache the versioned `app.js` URL,
- preserve root-level `service-worker.js` registration,
- preserve manifest `start_url: "./"` and `scope: "./"`,
- preserve offline app shell behavior after first visit,
- preserve the live GitHub Pages URL.

## Risks

- Existing subscription records must not be mutated.
- Multiple currencies must not be silently combined into one total.
- Stale PWA app shells can mix old and new app files if runtime passes miss script/cache versioning.
- Preset deletion or absence must not affect Spending overview calculations for existing records.

## QA Checklist

- Existing subscriptions load without changes.
- Existing activity log entries load without changes.
- Existing payment label and category presets load without changing records.
- Spending overview still shows monthly total, yearly equivalent, and active count.
- Item breakdown shows one row per subscription and keeps duplicate names separate.
- Category breakdown groups blank or missing values as `Uncategorized` without saving that label to records.
- Payment breakdown preserves existing payment-label grouping behavior.
- Weekly, monthly, quarterly, and yearly records use monthly normalized equivalents.
- Multiple currencies are displayed separately and not converted or combined.
- Empty state renders cleanly.
- Zero-price records do not break percentages, sorting, or layout.
- CSV export header remains exactly `name,price,currency,billingDate,occurrence,paymentMethod,category,notes`.
- JSON backup export and restore behavior remains compatible with schema versions 1 and 2.
- Local-only privacy stance remains accurate.
- No sensitive payment data is requested or implied.
- If runtime files change, `node --check app.js`, `node --check service-worker.js`, `git diff --check`, and PWA cache/version checks pass.

## Release History

- 2026-04-28 pass 1: Created the v1.6 spending overview feature planning doc. No runtime files were changed.
- 2026-04-28 pass 2: Added shared data helpers for item, category, and payment-label spending breakdowns using the existing monthly equivalent calculation. Helper output keeps currency totals separated, avoids mixed-currency percentages, keeps duplicate item names separate, maps blank categories to display-only `Uncategorized`, and includes item counts for grouped breakdowns. Existing visible Spending overview behavior remains unchanged. Runtime app shell versioning moved to `app.js?v=1.6.0` and cache `subscription-tracker-v1.6.0-static`.
- 2026-04-28 pass 3: Added compact Spending overview tabs for Items and Payment. Items is the default selected view and shows one row per subscription using monthly normalized totals with secondary payment/cycle/category detail. Payment preserves grouped payment-label behavior with item counts. Mixed-currency overview rows keep amounts separated and suppress percentage/bar display to avoid misleading comparisons. Runtime app shell versioning moved to `app.js?v=1.6.1` and cache `subscription-tracker-v1.6.1-static`.
- 2026-04-28 pass 4: Added the Categories tab to Spending overview using the shared category breakdown helper. Categories groups records by existing `category`, displays blank or missing categories as `Uncategorized` without writing that value to records, shows item counts, keeps currencies separated, and preserves Items as the default tab. Runtime app shell versioning moved to `app.js?v=1.6.2` and cache `subscription-tracker-v1.6.2-static`.
- 2026-04-28 pass 5: Completed final QA and release documentation. Public README now documents item, category, and payment-label spending breakdowns. No runtime code changed in the release documentation pass.

### Final QA Summary

- Static syntax checks passed:
  - `node --check app.js`
  - `node --check service-worker.js`
  - `git diff --check`
- PWA continuity checked:
  - `index.html` references `app.js?v=1.6.2`.
  - `service-worker.js` cache name is `subscription-tracker-v1.6.2-static`.
  - `service-worker.js` caches `app.js?v=1.6.2`.
  - Root-level service worker registration remains `navigator.serviceWorker.register("service-worker.js")`.
  - `manifest.webmanifest` keeps `start_url: "./"` and `scope: "./"`.
- Spending overview behavior checked with a runtime harness:
  - Items, Categories, and Payment tabs render.
  - Items is the default selected view.
  - Items view shows one row per subscription record and keeps duplicate names separate.
  - Categories view groups by existing category and displays blank categories as `Uncategorized` without mutating records.
  - Payment view groups by existing `paymentMethod` payment labels.
  - Monthly normalized totals power breakdown rows.
  - Monthly/yearly summary cards and active count still render.
  - Multiple currencies remain separated and are not converted.
  - Mixed-currency bars and percentages are suppressed to avoid misleading comparisons.
  - Empty state renders with tabs hidden.
  - Zero-price records do not break rendering.
- Compatibility checked:
  - Existing localStorage keys remain unchanged:
    - `subscription-tracker-v1-subscriptions`
    - `subscription-tracker-v1-activity-log`
    - `subscription-tracker-v1-payment-method-presets`
    - `subscription-tracker-v1-category-presets`
  - Existing subscription records are not migrated or rewritten.
  - Free-text payment labels and categories remain valid.
  - CSV header remains exactly `name,price,currency,billingDate,occurrence,paymentMethod,category,notes`.
  - JSON backup export still uses schema version 2 with saved presets.
  - Schema version 1 backups remain accepted as legacy input.
  - No upload, sync, account, server, analytics, dependency, payment processing, or payment authorization behavior was added.

## Open Follow-Ups

- Later range-specific spending behavior is tracked in v1.7 and v1.9 feature files.

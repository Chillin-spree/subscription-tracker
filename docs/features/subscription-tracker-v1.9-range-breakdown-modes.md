# subscription-tracker-v1.9-range-breakdown-modes

## Summary

Add compact selected Range breakdown modes so users can review actual scheduled charges in the selected date range by item, category, or payment label.

## Current Release State

v1.9.0 shipped in commit `310c1cf` (`Release v1.9.0 range breakdown modes`) and was pushed to `main`.

Live GitHub Pages asset verification passed for `app.js?v=1.9.0`, the Range sub-mode code, `BACKUP_SCHEMA_VERSION = 2`, existing storage keys, `subscription-tracker-v1.9.0-static`, and the versioned cached app script. Browser/PWA smoke was not performed, so installed-app behavior remains a follow-up QA gap rather than a known issue.

v1.9.1 shipped in commit `16cec61` (`Add range helper verification`) and added a dependency-free range/date helper verification harness in `scripts/verify-range-helpers.js`. It did not change runtime behavior or app shell/cache versioning.

Current note: v1.10.0 later removed legacy CSV export and JSON backup/restore from runtime. The v1.9 release notes below describe preservation at the time v1.9 shipped.

## User-Facing Scope

- Add Range-only sub-mode controls:
  - `By item`
  - `By category`
  - `By payment`
- Keep `By item` as the default Range sub-mode.
- Use existing selected-range helper rows for item, category, and payment breakdowns.
- Keep top-level Spending overview tabs unchanged:
  - `Items`, `Categories`, and `Payment` use normalized monthly/yearly totals.
  - `Range` uses selected custom date ranges and actual scheduled occurrences.
- Keep Range totals and occurrence counts aligned with the currently displayed Range rows.
- Keep mixed currencies separate and suppress misleading aggregate percentages/bar behavior.
- Move runtime app shell versioning to `v1.9.0`.

## Non-Goals

- No persisted Range dates.
- No persisted Range sub-mode setting.
- No changes to top-level normalized overview behavior.
- No backup parser, format, storage, copy, download, preview, or restore changes.
- No localStorage key changes.
- No broad dashboard redesign.

## Compatibility / Preservation Rules

- Backup parser, format, copy, download, preview, restore, and storage behavior are unchanged.
- Existing localStorage keys remain unchanged:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- Range dates and Range sub-mode settings remain non-persisted.
- Top-level `Items`, `Categories`, and `Payment` remain normalized monthly/yearly views.

## User-Facing Behavior

- The top-level `Range` tab shows selected-range actual scheduled charges.
- Range mode shows compact sub-mode controls below the top-level overview tabs.
- `By item` shows the existing item-level selected-range rows.
- `By category` groups selected-range actual charges by category, using the existing helper behavior for blank categories.
- `By payment` groups selected-range actual charges by payment label.
- Range summary total(s), occurrence count, and date span update when the date range or Range sub-mode changes.
- Invalid or reversed ranges show the existing invalid range empty state.
- Valid ranges with no scheduled charges show the existing no-scheduled-charges empty state.
- Multiple currencies are shown separately instead of being converted or combined.

## Implementation Notes

- `selectedOverviewMode` still controls the top-level Spending overview tabs.
- `selectedOverviewRangeMode` is in-memory only and defaults to `items`.
- Range sub-mode controls render only when subscriptions exist and the top-level `Range` tab is active.
- Range rows are routed through:
  - `getRangeSpendingBreakdownByItem`
  - `getRangeSpendingBreakdownByCategory`
  - `getRangeSpendingBreakdownByPaymentMethod`
- Existing overview row rendering is reused where possible.
- Runtime app shell references are bumped to `app.js?v=1.9.0` and `subscription-tracker-v1.9.0-static`.

## QA Checklist

- [x] Range defaults to `By item`.
- [x] Range `By item` matches the previous item Range behavior.
- [x] Range `By category` groups actual selected-range charges by category, including `Uncategorized`.
- [x] Range `By payment` groups actual selected-range charges by payment label.
- [x] Range date changes update rows, total, and occurrence count.
- [x] Invalid or reversed range shows the existing invalid range empty state.
- [x] Valid range with no charges shows the existing no-scheduled-charges empty state.
- [x] Mixed-currency Range rows keep totals separate and suppress misleading aggregate percentages/bar.
- [x] Top-level `Items`, `Categories`, and `Payment` remain normalized monthly/yearly views.
- [x] Backup copy/download/paste/preview/restore behavior remains unchanged.
- [x] `node --check app.js` passes.
- [x] `node --check service-worker.js` passes.
- [x] `node --check scripts/verify-plain-text-backup.js` passes.
- [x] `node scripts/verify-plain-text-backup.js` passes.
- [x] `node --check scripts/verify-range-helpers.js` passes.
- [x] `node scripts/verify-range-helpers.js` passes.

## Risks

- Confusing top-level normalized modes with selected-range sub-modes. Mitigation: Range sub-mode controls appear only inside the top-level `Range` mode.
- Misleading mixed-currency percentages. Mitigation: existing single-currency percentage behavior is preserved, and mixed-currency rows keep separate currency totals.
- PWA stale shell behavior. Mitigation: app shell cache and script query string are bumped to `v1.9.0`.

## Release History

- 2026-04-29: v1.9.0 added non-persisted selected-range breakdown modes by item, category, and payment label.
- 2026-04-29: v1.9.1 added dependency-free range/date helper verification without changing runtime behavior.

## Open Follow-Ups

- Browser/PWA smoke was not performed during live asset verification and remains a QA gap rather than a known issue.

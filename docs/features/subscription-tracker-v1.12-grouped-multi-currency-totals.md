# subscription-tracker-v1.12-grouped-multi-currency-totals

## Summary

Show totals grouped by each subscription's entered currency anywhere a single mixed-currency total would be misleading.

## Current State

- Runtime/app shell: `v1.12.2`, local implementation pending user review.
- Pass 1 updates Spending Overview Monthly and Yearly totals to display currency groups instead of `Multiple currencies`.
- Pass 2 polishes the header summary cards so mixed-currency Due soon totals display as grouped chips instead of a plus-joined string.
- Existing upcoming due-soon totals, selected Range summary, and breakdown rows already group by currency.
- Backup format/parser/restore behavior, localStorage keys/schema, Range date/sub-mode behavior, and local-only behavior are unchanged.

## Product Direction

- No exchange rates.
- No live currency data.
- No converted grand total.
- No base currency setting in this track.
- Preserve the current per-subscription currency field.
- Missing or blank currency continues to fall back to `TRY`.
- Single-currency data should stay compact and familiar.
- Multi-currency totals should show each currency separately and never imply currencies can be summed into one meaningful total.

## Pass 1 Scope

- Add small helpers for monthly totals by currency, scaling currency totals, and line-based overview total formatting.
- Update Spending Overview Monthly and Yearly totals to use grouped currency totals.
- Keep existing `formatCurrencyBreakdown()` behavior for Range summaries and breakdown rows.
- Add focused VM verification for grouped overview totals.
- Bump app shell/cache references to `v1.12.1`.

## Pass 2 Scope

- Render mixed-currency Due soon totals as compact grouped chips while keeping single-currency totals compact.
- Add a small `tracked records` detail to the Active header summary card.
- Keep due-soon calculations and active count meaning unchanged.
- Bump app shell/cache references to `v1.12.2`.

## Not In This Track

- Exchange rates, conversion, or base currency settings.
- Backup format/parser/restore changes.
- localStorage key or schema changes.
- Range filtering, recurrence, or sub-mode logic changes.
- CSV/JSON backup restore.
- Cloud sync, accounts, analytics, payments, imports, OCR/email scanning, notifications, paid services, or remote storage.

## Acceptance

- [x] Single-currency Monthly and Yearly overview totals remain one compact line.
- [x] Multi-currency Monthly and Yearly overview totals show separate currency lines.
- [x] Missing/blank currency totals fall back to `TRY`.
- [x] Existing Range and breakdown currency formatting remains unchanged.
- [x] Text-only backup behavior remains unchanged.
- [x] App shell/cache references are bumped for runtime asset changes.
- [x] Header Due soon mixed-currency totals avoid plus signs and do not imply conversion.
- [x] Active summary count meaning remains unchanged.

## QA Notes

- Automated checks should include syntax, Range helpers, plain text backup, storage safety, import/render safety, grouped currency totals, and whitespace diff validation.
- Manual/browser QA should cover single-currency overview, multi-currency overview, upcoming payments, selected Range summary, Range breakdowns, backup copy/download/paste/preview/restore, saved presets/activity, and offline/PWA continuity.

## History

- 2026-05-06: Completed Pass 0 investigation. The main missing behavior was Spending Overview Monthly/Yearly totals; upcoming due-soon totals, selected Range summary, and breakdown rows already grouped currency totals.
- 2026-05-06: Implemented v1.12.1 Pass 1 locally. Monthly and Yearly overview totals now use grouped currency totals with line breaks for mixed currencies while preserving single-currency compact display and existing Range/backup/storage behavior.
- 2026-05-06: Implemented v1.12.2 Pass 2 locally. Header Due soon totals now render mixed currencies as compact grouped chips, single-currency due-soon totals stay compact, and the Active summary card includes a small descriptive detail without changing the count.

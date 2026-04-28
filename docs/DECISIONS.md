# Decisions

> Permanent decision log for durable product, UX, technical, and workflow decisions.

<!-- Rules:
- Most recent first.
- Do not rewrite old decisions; add a new entry when the decision changes.
- Keep entries short and link to feature files when details matter.
-->

## Entry Format

```text
### YYYY-MM-DD — Decision title

- **Type**: Product | UX | Technical | Workflow
- **Status**: active | superseded
- **Context**:
- **Decision**:
- **Why**:
- **Consequences**:
- **Related**:
```

## Type Guide

- **Product**: What the product is or is not.
- **UX**: User-visible behavior, flow, copy, or interaction model.
- **Technical**: Architecture, data, APIs, dependencies, or implementation direction.
- **Workflow**: How contributors and automation agents collaborate.

## Log

<!-- Add durable project decisions here, most recent first. -->

### 2026-04-28 — Keep custom range controls local to the overview session

- **Type**: UX
- **Status**: active
- **Context**: v1.7.6 adds custom start/end date controls to the existing item-only range Spending overview.
- **Decision**: Custom range selection is in-memory only, defaults to the current local calendar month, and does not write to localStorage or backup data. The existing `This month` tab label remains for now while the controls, note, and summary date span communicate the selected range.
- **Why**: This gives users immediate selected-range review while avoiding persistence, settings, backup, and migration decisions in the first custom-range pass.
- **Consequences**: Future range UX can revisit labels or persistence as a separate decision, but should preserve actual occurrence calculations and clear separation from normalized overview tabs.
- **Related**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`

### 2026-04-28 — Start visible range spending with current month

- **Type**: UX
- **Status**: active
- **Context**: v1.7 pass 5 introduces the first user-facing date-range Spending overview without adding custom range controls.
- **Decision**: The first visible range view is a fixed `This month` tab that shows actual scheduled item charges in the current local calendar month. Existing `Items`, `Categories`, and `Payment` tabs remain monthly normalized.
- **Why**: A fixed current-month view consumes the range helpers with minimal UI and state changes, while avoiding custom date input validation and broader range-control design in the first visible pass.
- **Consequences**: Future custom range controls should build on the current-month path and clearly distinguish actual range totals from monthly normalized totals.
- **Related**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`

### 2026-04-28 — Reuse overview row shape for range breakdowns

- **Type**: Technical
- **Status**: active
- **Context**: v1.7 pass 4 prepares actual date-range Spending overview data without adding UI.
- **Decision**: Range breakdown helpers adapt actual occurrence totals into the same overview row shape used by item, category, and payment-label breakdowns: `currencyTotals`, `currencyBreakdown`, `sortAmount`, row type/id/label metadata, and single-currency percentages. They also carry range-specific `totalAmount`, `occurrenceCount`, and `occurrenceDates`.
- **Why**: Reusing the existing row shape keeps the future date-range UI small and avoids duplicating grouping, sorting, color, and percentage behavior.
- **Consequences**: Future range UI should consume these adapter helpers instead of building a parallel breakdown model, while making user-facing labels clear that range totals are not monthly normalized values.
- **Related**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`

### 2026-04-28 — Count actual billing occurrences for selected ranges

- **Type**: Technical
- **Status**: active
- **Context**: v1.7 pass 3 adds range calculation helpers before any date-range Spending overview UI.
- **Decision**: Selected-range spending helpers count actual scheduled occurrences within an inclusive date range instead of monthly normalized estimates. Weekly cycles repeat every 7 days from `billingDate`; monthly, quarterly, and yearly cycles advance from the original billing date and clamp to shorter months. Optional `endDate` remains inclusive.
- **Why**: Future date-range views need concrete occurrence counts and dates, while the existing overview should continue using monthly normalized estimates until a UI pass explicitly changes it.
- **Consequences**: Future range UI should consume the occurrence helper output rather than reimplementing cycle math, and should keep multiple currencies separate.
- **Related**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`

### 2026-04-28 — Use inclusive end dates for Upcoming payments

- **Type**: UX
- **Status**: active
- **Context**: v1.7 pass 2 makes Upcoming payments respect optional subscription end dates before full date-range spending behavior is designed.
- **Decision**: Upcoming payments excludes a subscription only when its next payment date is after `endDate`. A next payment exactly on `endDate` still appears. Records without `endDate` remain ongoing.
- **Why**: Inclusive end dates match the idea that the record remains relevant through the named final date while avoiding surprise charges after that date in the next-7-days view.
- **Consequences**: Active counts and Spending overview still need a separate product decision before they use `endDate`; this decision applies only to Upcoming payments and Due soon totals.
- **Related**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`

### 2026-04-28 — Treat subscription end date as optional date-only metadata

- **Type**: Technical
- **Status**: active
- **Context**: v1.7 starts date-range and end-date work with a foundation pass before designing occurrence counting or ended-state behavior.
- **Decision**: Store `endDate` as an optional `YYYY-MM-DD` field on subscription records. Missing or blank values remain valid. Date-only validation and comparison use manual year/month/day parsing. In pass 1, `endDate` is display metadata only and does not change active counts, upcoming payments, spending overview totals, CSV exports, or JSON backup envelope/schema version.
- **Why**: A small compatible field lets future date-range behavior build on real user data without migrating existing records or introducing premature inactive-state semantics.
- **Consequences**: Future date-range or ended-state work must explicitly define calculation behavior before using `endDate` to filter, count, export, or migrate records.
- **Related**: `docs/features/subscription-tracker-v1.7-date-ranges-end-dates.md`

### 2026-04-28 — Use monthly normalized spending overview comparisons

- **Type**: UX
- **Status**: active
- **Context**: v1.6 will expand Spending overview from payment-label grouping to item, category, and payment-label breakdowns.
- **Decision**: Spending overview uses monthly normalized totals as the primary comparison basis, keeps yearly equivalent as supporting context, displays multiple currencies separately without conversion, and leaves next-payment timing and next-7-days totals in Upcoming payments.
- **Why**: Monthly normalization lets weekly, monthly, quarterly, and yearly recurring records be compared in one compact overview without mixing that purpose with due-date timing.
- **Consequences**: Future overview features should avoid silently combining currencies, should not use Upcoming payments totals as spending distribution data, and should document any future date-range spending mode as a separate feature.
- **Related**: `docs/features/subscription-tracker-v1.6-spending-overview.md`

### 2026-04-26 — Add backup schema version 2 for preset preferences

- **Type**: Technical
- **Status**: active
- **Context**: v1.5 adds saved payment method and category preset preferences, while v1.4 JSON backups contain only subscriptions and activity log under schema version 1.
- **Decision**: New JSON backups use schema version 2 and include normalized `data.paymentMethodPresets` and `data.categoryPresets`. Restore accepts schema versions 1 and 2. Schema version 1 restores subscriptions and activity log while keeping current presets unchanged; schema version 2 restores subscriptions, activity log, and saved presets after confirmation.
- **Why**: A versioned schema makes preset backup behavior explicit without breaking existing v1.4 backups.
- **Consequences**: Future backup schema changes must preserve clear restore semantics for older versions or provide a documented migration path.
- **Related**: `docs/features/subscription-tracker-v1.5-presets.md`, `docs/features/subscription-tracker-v1.4-json-backup-restore.md`

### 2026-04-26 — Use separate local preset preferences for v1.5

- **Type**: Technical
- **Status**: active
- **Context**: v1.5 will add reusable payment method and category presets, but existing subscription records, CSV exports, v1.4 JSON backups, and installed-PWA continuity must remain compatible.
- **Decision**: Store preset preferences in new localStorage keys, `subscription-tracker-v1-payment-method-presets` and `subscription-tracker-v1-category-presets`, while keeping subscription records unchanged. Keep existing `paymentMethod` and `category` fields, derive suggestions from both saved presets and existing records, and keep free-text values valid even when they are not presets.
- **Why**: Separate preference storage avoids destructive migration, preserves current records and exports, and lets existing user-entered labels become useful suggestions without forcing schema changes.
- **Consequences**: Future implementation must handle missing preset keys, dedupe suggestions, avoid editing subscription values when presets change, and preserve v1.4 JSON restore compatibility before release.
- **Related**: `docs/features/subscription-tracker-v1.5-presets.md`

### 2026-04-26 — Require documentation sweep after meaningful changes

- **Type**: Workflow
- **Status**: active
- **Context**: Project docs are shared memory, but feature ideas, release state, risks, and workflow changes can be missed if contributors rely on manual recall.
- **Decision**: After any meaningful feature, bugfix, product decision, roadmap item, release state, workflow rule, or known risk changes, contributors and automation agents must inspect the relevant docs and update every affected file.
- **Why**: The repository should preserve current state and durable decisions without depending on one person to remember every affected document.
- **Consequences**: Reports should name docs updated, docs inspected with no changes, and key docs intentionally left unchanged when relevant.
- **Related**: `AGENTS.md`, `docs/HANDOFFS.md`

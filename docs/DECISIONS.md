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

# subscription-tracker-v1.11-ui-ux-polish

## Summary

Plan a focused v1.11 UI/UX polish track for the current static, phone-first Subscription Tracker app. The goal is to make the existing product easier to scan, enter, review, and recover from backup without changing storage, backup compatibility, calculation behavior, or the local-only privacy model.

## Current Release Baseline

- Repo: `Chillin-spree/subscription-tracker`
- Branch baseline: `main`
- Planning baseline commit: `8088004412544174e16912affade84a77c0463c8` (`Document v1.10.x wrap-up roadmap`)
- Current runtime/app shell: `v1.11.3` locally after the Subscriptions collapse and Add button polish pass.
- Current stable state: v1.10.x is the final/simple stabilization line. Runtime work should stop unless a real bug appears.
- Current backup model: readable `Subscription Tracker Backup` v1 plain text copy/download and pasted-text preview/confirmed restore only.
- Current storage model: local browser/device storage only through existing localStorage keys.

## Current UI Inventory

### Header / Summary / Privacy Note

- Header shows `Next 7 days`, app title, and a rounded-square add button.
- Summary strip shows due-soon total and active subscription count.
- Privacy note states that records stay in browser storage and are not uploaded, synced, or used to process payments.

### Upcoming Payments

- Shows payments due in the next 7 days.
- Includes an empty state when no upcoming payments are due.
- Uses card rows with item name, price, due detail, and status.

### Spending Overview

- Shows normalized monthly/yearly totals and active count for the selected currency view.
- Supports breakdown tabs for items, categories, payment labels, and selected range.
- Range mode includes start/end date inputs, a `This month` reset, actual range total, occurrence count, and sub-modes by item/category/payment.
- Uses a segmented spending bar and rows for breakdown items.

### Subscriptions List

- Shows saved subscription records with price, billing details, optional category/payment tags, optional notes, and edit/delete actions.
- Includes an empty state and an inline Add button.
- Uses the same non-persisted collapse pattern as Activity and Backup.

### Activity / History

- Shows created, updated, and deleted activity entries.
- Includes a compact empty state.
- Currently remains visible as a full panel even though it is a lower-frequency review surface.

### Backup

- Shows export empty state when no data exists.
- Provides plain text backup download/copy actions when data exists.
- Provides a paste textarea, preview action, local validation result, and restore button only after valid preview.
- Explains that restore replaces subscriptions while keeping activity log and saved presets.

### Add / Edit Dialog

- Bottom-sheet dialog for manual record entry.
- Includes required field help, sensitive payment data warning, saved presets manager, and subscription form.
- Form fields: name, price, currency, billing date, optional end date, billing cycle, payment label, optional category, and optional notes.

### Saved Presets

- Presets live inside a `details` section in the add/edit dialog.
- Payment label and category presets can be added, removed, and used as datalist suggestions.
- Removing a preset does not change existing records.

### Status Messages

- A polite live status message appears near the bottom of the app shell.
- Used for add/update/delete, backup copy/download/preview/restore, preset changes, and validation-adjacent feedback.

## UI/UX Polish Opportunities

### Collapsible Low-Frequency Sections

- Make lower-frequency and long body sections easier to tuck away after the user has reviewed them.
- First implementation should use non-persisted collapsed state only.
- Keep section content, backup controls, activity rendering, and restore behavior unchanged.

### Visual Hierarchy / Mobile Spacing

- Reduce perceived panel weight where the app feels long on mobile.
- Tighten spacing and rhythm between high-frequency sections without hiding core information.
- Keep the phone-first single-column shell and current minimalist direction.

### Form / Input Clarity

- Improve label/help placement and scan order for the add/edit dialog.
- Clarify payment label, category, end date, and notes without inviting sensitive payment details.
- Preserve accepted fields, validation rules, storage shape, and manual entry flow.

### Backup Workflow Clarity

- Make copy/download, paste preview, restore risk, and local-only behavior easier to understand.
- Preserve the exact plain text backup format, parser, restore semantics, and validation behavior.
- Do not reintroduce CSV, JSON, hidden summary export, merge restore, or alternate import formats.

### Spending Overview Clarity

- Clarify the difference between normalized monthly/yearly totals and actual selected-range charges.
- Keep current top-level normalized overview behavior.
- Preserve selected Range date behavior and Range sub-mode behavior; do not add persistence.

### Empty States

- Make empty states more useful and less repetitive across upcoming payments, overview, subscriptions, activity, and backup.
- Avoid claiming unavailable features or implying cloud/account/payment functionality.

### Accessibility / Focus / Contrast

- Review focus-visible states, color contrast, aria labels, live regions, dialog behavior, and collapsed-section keyboard behavior.
- Keep controls reachable by keyboard and understandable to assistive technology.

## Strict Non-Goals and Preservation Rules

- Do not change runtime behavior in v1.11.0; it is a docs-only planning pass.
- Do not change storage keys:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
  - `subscription-tracker-v1-payment-method-presets`
  - `subscription-tracker-v1-category-presets`
- Do not change the text backup format, parser, copy/download behavior, preview behavior, or restore behavior.
- Do not reintroduce CSV export, JSON backup/restore, hidden summary text export, or alternate import formats.
- Do not change Range date behavior, Range sub-mode behavior, or add persistence for Range state.
- Do not change top-level normalized overview behavior.
- Do not change schema assumptions or stored subscription/activity/preset shapes.
- Do not add cloud sync, accounts, analytics, payment processing, bank/card import, OCR/email scanning, notifications, paid services, upload, sync, or remote storage.
- Do not request, store, display, export, or imply users should enter sensitive payment data.
- Preserve PWA installed/home-screen continuity: same live URL, root-level service worker registration, manifest `start_url: "./"`, manifest `scope: "./"`, offline app shell after first visit, existing saved records, and local-only stance.
- Runtime asset changes in later v1.11 passes must bump app shell/cache versions.

## v1.11 Build Pass Plan

Risk: Medium overall because later passes touch visible UI, backup presentation, accessibility, and PWA runtime assets. Keep each pass narrow and verify preservation rules before moving on.

1. v1.11.0 audit/planning docs pass
   - Create this feature file.
   - Update `docs/STATUS.md` and `docs/BACKLOG.md`.
   - No runtime behavior changes.
   - Not in this pass: HTML/CSS/JS edits, app shell/cache bumps, UI implementation.

2. v1.11.1 collapsible Activity and Backup sections, non-persisted
   - Implemented locally.
   - Add collapsible behavior for Activity and Backup only.
   - Do not persist collapsed state.
   - Keep all content, restore semantics, activity rendering, status messages, and backup text workflow unchanged.
   - Bump app shell/cache versions because runtime assets change.
   - Not in this pass: visual redesign, form changes, spending overview changes, persistence.

3. v1.11.2 visual hierarchy/mobile spacing
   - Implemented locally.
   - Refine spacing, panel rhythm, summary density, and mobile readability.
   - Keep current section order and core behaviors.
   - Not in this pass: form copy overhaul, backup workflow rewrite, spending calculation changes.

4. v1.11.3 Subscriptions collapse and Add button polish
   - Implemented locally.
   - Add non-persisted collapse/expand behavior to the Subscriptions panel.
   - Change the top add control from a dark circular plus to a rounded-square add button.
   - Preserve add/edit/delete behavior, list rendering, empty state behavior, storage keys, and app structure.
   - Not in this pass: form copy overhaul, backup workflow changes, spending calculation changes, persistence.

5. v1.11.4 form/input clarity
   - Polish add/edit dialog copy, labels, helper text placement, and preset manager clarity.
   - Preserve all fields, validation rules, storage shape, and sensitive-payment-data warnings.
   - Not in this pass: schema changes, new fields, import/export behavior.

6. v1.11.5 backup workflow polish
   - Improve clarity of copy/download, pasted preview, restore confirmation context, and local-only messaging.
   - Preserve exact plain text format/parser/restore behavior.
   - Not in this pass: CSV/JSON, merge restore, backup format changes, remote storage.

7. v1.11.6 spending overview polish
   - Clarify normalized totals versus actual selected-range charges.
   - Preserve current calculations, top-level normalized overview behavior, Range date behavior, and Range sub-mode behavior.
   - Not in this pass: multi-currency grouped totals; that belongs to v1.12 planning.

8. v1.11.7 accessibility/final QA
   - Run keyboard, focus, contrast, aria/live-region, dialog, collapse, backup, and PWA continuity checks.
   - Sweep docs and release notes after implementation passes.
   - Not in this pass: new feature scope beyond final QA fixes.

Optional separate planning track:

- Bills rename compatibility planning
  - Treat any rename toward Bills as a separate compatibility plan.
  - Preserve same live URL, installed PWA continuity, local data, localStorage keys, and text backup compatibility.
  - If a future backup header changes, parser compatibility must support the historical `Subscription Tracker Backup` header.

## Recommended First Implementation Pass

The next Codex prompt after v1.11.0 should target only v1.11.1 collapsible Activity and Backup sections, non-persisted.

Suggested scope:

- Edit only the files needed for the collapsible Activity and Backup behavior.
- Preserve all Activity and Backup content and behavior.
- Do not persist collapsed state.
- Do not change text backup format/parser/restore behavior.
- Do not change localStorage keys, Range behavior, spending calculations, or top-level overview behavior.
- Bump app shell/cache versions if runtime assets change.

## QA Checklist

- [ ] v1.11.0 docs-only pass changes only Markdown documentation.
- [ ] `git diff --check` passes.
- [ ] Runtime files remain unchanged in v1.11.0.
- [x] v1.11.1 verifies Activity and Backup collapse/expand by pointer activation.
- [ ] v1.11.1 verifies Activity and Backup collapse/expand by keyboard activation in a human browser pass.
- [x] v1.11.1 verifies collapsed state is not persisted across refresh.
- [x] v1.11.3 adds non-persisted Subscriptions collapse/expand behavior without changing list rendering or add/edit/delete behavior.
- [ ] Backup copy/download/preview/confirmed restore behavior remains unchanged.
- [ ] Plain text backup format and parser remain unchanged.
- [ ] LocalStorage keys remain unchanged.
- [ ] Range date and Range sub-mode behavior remain unchanged.
- [ ] Top-level normalized overview behavior remains unchanged.
- [ ] PWA installed/home-screen continuity is preserved.
- [x] v1.11.2 keeps visual changes CSS-first and behavior-preserving.
- [ ] Accessibility/focus/contrast pass completed before final v1.11 release wrap-up.

## Release / History

- 2026-04-30: Created v1.11.0 audit/planning docs pass from the v1.10.1 stable baseline. No runtime files changed.
- 2026-04-30: Implemented v1.11.1 collapsible Activity and Backup panels locally. Sections are expanded by default, collapse state is not persisted, and Activity/Backup body visibility changes without changing activity data, backup format/parser/restore semantics, storage keys, Range behavior, or PWA continuity. Pointer collapse/expand and refresh reset were smoke-tested in the browser; keyboard activation remains a human-browser QA item because automation keypresses did not activate the focused native buttons. Runtime app shell/cache moved to `v1.11.1`.
- 2026-04-30: Implemented v1.11.2 visual hierarchy and mobile spacing polish locally. CSS-only layout refinements tightened panel rhythm, balanced section-heading actions, improved row/card readability, reduced empty-state weight, and made overview/collapse segmented controls 44px touch targets. Behavior, storage keys, backup format/parser/restore semantics, Range behavior, and app structure remain unchanged. Runtime app shell/cache moved to `v1.11.2`.
- 2026-04-30: Implemented v1.11.3 Subscriptions collapse and Add button polish locally. The Subscriptions panel now uses the same non-persisted collapse pattern as Activity and Backup, defaults expanded after reload, and hides only the subscription panel body. The top add control is now a rounded-square accent button while preserving its aria label and `data-open-form` behavior. Runtime app shell/cache moved to `v1.11.3`.

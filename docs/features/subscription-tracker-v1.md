# Subscription Tracker v1

> First product feature file for the minimalist phone-first subscription tracker.

Status: complete / approved

## Spec — ChatGPT Owns

### Purpose

Give users a simple manual place to track recurring subscriptions, understand what is due soon, review historical records, and export their data.

### User Outcome

A user can keep a clear list of subscriptions on their phone, update it as services change, see payments due in the next 7 days, understand the rough spending split, and save or share the records in portable formats.

### Approved v1 Behavior

- Users manually create subscription records.
- Users can edit and delete existing subscriptions.
- Subscription records require name, price, billing date, payment occurrence, and payment method/account label.
- Subscription records may optionally include category, notes, and currency.
- Default currency is TRY.
- Payment occurrence values are weekly, monthly, quarterly, and yearly.
- Historical records mean an activity log for subscription created, updated, and deleted events.
- Payment occurrence history is not part of v1.
- Archived subscriptions are not part of v1 unless needed to keep deleted activity log entries readable.
- Users can see upcoming payments due in the next 7 days.
- Users can see a small infographic or pie chart summarizing subscription spending.
- Users can export subscription data as text and CSV.
- The app should be phone-first, minimalist, and usable without account setup.

### User Flow

1. User opens the app and sees the current subscription list plus payments due in the next 7 days.
2. User adds a subscription with required details: name, price, billing date, payment occurrence, and payment method/account label.
3. User edits a subscription when price, billing date, payment occurrence, payment method/account label, or notes change.
4. User deletes a subscription when it no longer applies.
5. User reviews activity log entries for created, updated, and deleted subscriptions.
6. User checks a small spending visual to understand distribution.
7. User exports records when they want a plain text or spreadsheet-compatible CSV copy.

### Final Included Behavior

- Static phone-first app using plain HTML, CSS, and JavaScript.
- Manual subscription CRUD with localStorage persistence.
- Required fields: name, price, billing date, payment occurrence, and payment method/account label.
- Optional fields: category, notes, and currency.
- Default currency: TRY.
- Supported payment occurrences: weekly, monthly, quarterly, and yearly.
- Upcoming payments view for charges due in the next 7 days.
- Activity log history for subscription created, updated, and deleted events.
- Spending overview with monthly/yearly equivalents, active count, and payment-method infographic.
- Text export and CSV export using browser-native downloads.
- Phone-width polish, empty states, validation messaging, and no-dependency implementation.

### Acceptance Criteria

- [x] The v1 product scope is documented before implementation begins.
- [x] Future build prompts can point to this file for shared context.
- [x] Manual subscription entry, edit, delete, activity log history, next-7-days upcoming payments, chart summary, and export are all represented in scope.
- [x] Auth, sync, automatic imports, OCR/email scanning, push notifications, and native wrappers are explicitly out of scope.
- [x] No app code, framework choice, dependencies, storage, chart, notification, or export implementation is included in this documentation setup pass.
- [x] Implemented v1 behavior matches the approved final product scope.
- [x] Final QA and polish completed with no dependencies added.

### Out of Scope

- Choosing or installing a framework.
- Implementing app UI, routing, storage, charting, notifications, or export logic.
- Account creation, auth, and cloud sync.
- Automatic bank or card imports.
- OCR, receipt scanning, and email scanning.
- Push notifications.
- Native app-store wrappers.
- PDF export.
- Real `.xlsx` export.
- Data import.
- Billing, payments, subscriptions for this app, or monetization.
- Payment occurrence history.
- Archived subscriptions, unless required to keep deleted activity log entries readable.

### Design Notes

- Phone-first means the core view should work well on small screens before desktop layouts are considered.
- Minimalist means fast data entry, low visual noise, and clear priority for records, upcoming payments, and export.
- The product should be honest that records are manually maintained.
- Export is part of the product promise because user-entered data should remain portable.
- The infographic should stay small and explanatory, not become a full analytics dashboard.
- Historical records should be implemented as an activity log for create, update, and delete events.
- Upcoming payments should mean payments due in the next 7 days, not calendar week.

## Recommended Build Pass Plan

```text
BUILD PASS PLAN — subscription-tracker-v1

Full feature:
Build a minimalist phone-first app for manually tracking subscriptions, next-7-days payments, spending summary, activity log history, and export.

Risk:
Medium once implementation begins, because v1 spans app shell, data model, persistence, charting, export, and user-facing workflows.

Recommended passes:
1. Investigation / repo map — no edits
2. App foundation — create a static HTML/CSS/JavaScript shell; no feature logic beyond a basic runnable screen
3. Subscription records — add/create/edit/delete manual records with required and optional fields
4. Upcoming payments and activity log — next-7-days due view plus create/update/delete activity entries
5. Spending summary — small pie chart or equivalent infographic using an existing project pattern or justified lightweight choice
6. Export — text first, then PDF and Excel-compatible formats in the smallest safe slices
7. Responsive polish and checks — phone-first usability review, accessibility basics, docs/status updates

Rules:
- Each pass should have one clear outcome.
- Do not combine framework selection, persistence, charting, and export in one pass.
- Keep auth, cloud sync, automatic imports, OCR/email scanning, push notifications, and native wrappers out of v1.
- Update this feature file when product behavior is clarified.
```

## Codex Build Handoff — ChatGPT Writes, Codex Reads

### Goal

Prepare future implementation passes without building app code in this documentation setup pass.

### Relevant Context

- Product is a minimalist phone-first subscription tracker.
- v1 uses manual data entry only.
- Current app foundation is static HTML, CSS, and JavaScript with no dependencies.

### Risk Level

Low for documentation setup. Medium for future implementation passes.

### Build pass

Documentation setup only.

### Not in this pass

- App code.
- Framework or dependency choices.
- UI, storage, charts, notifications, or export logic.

### Build Scope

- Configure project docs for Subscription Tracker.
- Capture v1 product scope and exclusions.
- Provide a recommended small-pass implementation sequence.

### Constraints to Preserve

- Existing template structure.
- Existing workflow rules.
- The ChatGPT, Codex, and user role split.
- Build Pass Discipline.

### Must Not Do

- Do not claim features are built.
- Do not over-specify technical implementation before repo inspection.
- Do not move not-now ideas into active scope.

### Implementation Rules

- Prefer the smallest safe change.
- Follow existing project patterns.
- Run relevant checks or explain why not.
- Report any scope expansion before continuing.
- If this handoff feels too large for one focused session, stop and propose a smaller Build Pass Plan.

### Assumptions

- No framework will be used for the current v1 direction.
- Storage and data behavior remain for later focused build passes.

<!-- Use docs/HANDOFFS.md for copy-paste Codex prompt templates. -->

## Tasks — Codex Owns

- [x] Inspect requested docs and existing template structure.
- [x] Update project-specific docs for Subscription Tracker.
- [x] Add this feature file.
- [x] Verify markdown files are readable and internally consistent.

## Build Notes — Codex Owns

- Documentation setup completed; no app code was changed or created.
- 2026-04-25 investigation: repo currently contains only `AGENTS.md` and `docs/`; no app code, package manager, framework config, lockfile, test command, or app entry point was found.
- 2026-04-25 app foundation: added dependency-free static files `index.html`, `styles.css`, and `app.js`. The first screen includes placeholder sections for upcoming payments, spending overview, subscription list, and add-subscription action. No CRUD, storage, charts, export, notifications, activity log, auth, sync, or imports were implemented.
- 2026-04-25 implementation complete: v1 now includes static phone-first UI, subscription CRUD, localStorage persistence, upcoming payments for the next 7 days, activity log history, spending overview with dependency-free infographic, text export, and CSV export.
- 2026-04-25 final QA/polish complete: checked empty state, add/edit/delete, validation, refresh persistence, upcoming payments, spending overview, activity log, text export, CSV export, narrow viewport layout, and console errors.
- 2026-04-25 closeout: user approved `subscription-tracker-v1`; feature marked complete.

## Review Notes — ChatGPT Owns

- User approved v1 closeout after final QA and polish.

## Definition of Done

- [x] Spec is clear enough to plan the next build pass.
- [x] Build scope stayed within this feature.
- [x] Design intent matches shipped behavior.
- [x] Acceptance criteria pass for documentation setup.
- [x] Relevant checks were run or explicitly skipped with reason.
- [x] Review completed.
- [x] `docs/STATUS.md` updated if workflow state changed.
- [x] `docs/DECISIONS.md` updated if durable decisions were made.
- [x] `docs/BUGS.md` updated if meaningful bugs were fixed.
- [x] Next step is clear.

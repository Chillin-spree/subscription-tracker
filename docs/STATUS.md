# Status

> Live control tower for the current ChatGPT + Codex workflow. Keep this short.

<!-- Maintenance rules:
- Update when the active feature, owner, blocker, or next step changes.
- Keep this file skimmable; move details into feature files, DECISIONS.md, or BUGS.md.
- Session Log should keep only the most recent 5-8 entries.
-->

## Architecture

- ChatGPT designs, reviews, routes, and writes handoffs.
- Codex implements, debugs, runs checks, and reports results.
- The user carries prompts/results between systems.
- Repo docs are shared memory.

## Workflow State

- **Mode**: complete
- **Active feature**: none
- **Feature file**: `docs/features/subscription-tracker-v1.2-privacy-and-local-data-clarity.md`
- **Risk**: low
- **Owned by**: User/ChatGPT
- **Current step**: `subscription-tracker-v1.2-privacy-and-local-data-clarity` released to GitHub Pages.
- **Waiting on**: Post-release review or next feature selection.
- **Blockers**: none
- **Next recommended step**: Review live v1.2, then choose the next backlog item or start a new feature brief.
- **Recent touch points**: v1.2 adds local-only privacy copy, safer payment-label/billing-cycle wording, text export label cleanup, and a service worker cache bump for refreshed app shell assets while preserving internal `paymentMethod`, localStorage keys, and CSV headers.

## Latest Handoff

- **From**: User
- **To**: Codex
- **Date**: 2026-04-25
- **Handoff type**: Build pass
- **Summary**: Release `subscription-tracker-v1.2-privacy-and-local-data-clarity` to GitHub Pages.
- **Where full handoff lives**: Current Codex conversation; feature context in `docs/features/subscription-tracker-v1.2-privacy-and-local-data-clarity.md`.

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-25: Released `subscription-tracker-v1.2-privacy-and-local-data-clarity` to GitHub Pages.
- 2026-04-25: Completed `subscription-tracker-v1.2-privacy-and-local-data-clarity` pass 2 UI privacy copy and safer visible wording.
- 2026-04-25: Completed `subscription-tracker-v1.2-privacy-and-local-data-clarity` pass 1 docs and guardrails.
- 2026-04-25: Verified and documented `subscription-tracker-v1.1-pwa-support`; app shell reloads offline after first successful HTTP visit.
- 2026-04-25: Added conservative service worker shell cache and relative service worker registration.
- 2026-04-25: Added PWA manifest metadata and phone home screen icons.
- 2026-04-25: Closed `subscription-tracker-v1` as approved and complete.
- 2026-04-25: Completed final QA polish for wrapping, focus states, and safe rendered value escaping.
- 2026-04-25: Implemented browser-native text and CSV export for current subscription records.
- 2026-04-25: Implemented monthly/yearly spending overview and payment-method infographic.

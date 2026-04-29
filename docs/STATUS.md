# Status

> Live control tower for the current project workflow. Keep this short.

<!-- Maintenance rules:
- Update when the active feature, owner, blocker, or next step changes.
- Keep this file skimmable; move details into feature files, DECISIONS.md, or BUGS.md.
- Session Log should keep only the most recent 5-8 entries.
-->

## Architecture

- Product/design review clarifies behavior, scope, safety, and release readiness.
- Implementation work builds, debugs, runs checks, and reports results.
- The user reviews outcomes and makes product decisions.
- Repo docs are shared memory.

## Workflow State

- **Mode**: documentation architecture cleanup
- **Active feature**: Documentation cleanup Pass 4
- **Feature file**: none
- **Risk**: low
- **Owned by**: Product/design review and implementation
- **Current step**: Final documentation consistency review and minimal polish are underway after Passes 1-3.
- **Waiting on**: Review of the local documentation cleanup diff.
- **Blockers**: none
- **Next recommended step**: If this final review is clean, commit the full documentation cleanup package when approved.
- **Recent touch points**: v1.9.2 import/render hardening shipped in commit `a55cac1`. Runtime app shell/cache is `v1.9.2`. Remaining security/import safety follow-ups stay separate from this docs cleanup.

## Latest Handoff

- **From**: User
- **To**: Implementation
- **Date**: 2026-04-29
- **Handoff type**: documentation cleanup Pass 4
- **Summary**: Final docs consistency review and minimal polish before the cleanup package is committed.
- **Where full handoff lives**: current local docs diff

## Session Log

<!-- Add future entries most recent first. Keep last 5-8 entries only. -->

- 2026-04-29: Started documentation cleanup Pass 4. Final consistency review is checking source-of-truth ownership, stale wording, feature-file structure, and runtime-file boundaries before the docs cleanup package is committed.
- 2026-04-29: Started documentation cleanup Pass 3. Cross-doc duplication is being reduced while preserving source-of-truth ownership, feature-specific compatibility details, QA notes, and release history. Runtime files remain unchanged.
- 2026-04-29: Started documentation cleanup Pass 2. Feature files are being normalized toward the shared structure while preserving meaningful compatibility details, QA notes, and release history. Runtime files remain unchanged.
- 2026-04-29: Started documentation cleanup Pass 1 after a documentation architecture audit. This pass only corrects stale/conflicting release-state wording and leaves runtime files unchanged.
- 2026-04-29: Shipped v1.9.2 import/render safety hardening in commit `a55cac1`. Subscription action `data-id` attributes now escape stored IDs, `scripts/verify-import-safety.js` covers malicious IDs and HTML-like user fields, and app shell/cache moved to `v1.9.2`. Backup parser/format/schema/storage behavior, localStorage keys, hidden CSV/JSON controls, and range behavior remain unchanged.
- 2026-04-29: Shipped v1.9.1 QA/docs baseline in commit `16cec61`. Added `scripts/verify-range-helpers.js` and updated v1.9 release-state docs without changing runtime behavior; app shell/cache remained `v1.9.0`.
- 2026-04-29: Completed v1.9.0 verification/documentation sweep before final review and push. Added the Range breakdown modes feature file, updated public/status/backlog docs, and confirmed backup parser/format/schema/storage behavior, localStorage keys, hidden CSV/JSON controls, and local-only behavior remained unchanged. Runtime app shell/cache moved to `v1.9.0`.
- 2026-04-29: Implemented local v1.9.0 Runtime Range breakdown sub-modes. The Range tab now offers non-persisted `By item`, `By category`, and `By payment` controls backed by existing selected-range helper rows. By item remains the default and matches the previous Range behavior. Top-level Items/Categories/Payment remain monthly normalized. Backup parser/format/schema/storage behavior, localStorage keys, hidden CSV/JSON controls, and local-only behavior remain unchanged. App shell versioning moved to `v1.9.0`.

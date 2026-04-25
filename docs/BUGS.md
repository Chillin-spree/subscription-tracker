# Bugs

> Permanent memory for confirmed bugs, root causes, fixes, and regression checks.

<!-- Add entries for confirmed bugs, regressions, production issues, PWA cache issues, data compatibility issues, and user-reported defects. If a runtime fix is urgent, it may land first, but this file must be updated before the release is considered complete. -->

## Status Guide

- **open**: Known issue that still needs a fix.
- **fixed**: Fixed and regression-checked.
- **needs-design**: Requires product or UX decision before implementation.

## Entry Format

```text
### YYYY-MM-DD — Bug title

- **Feature**:
- **Discovered by**:
- **Verified by**:
- **Status**: open | fixed | needs-design
- **Symptom**:
- **Affected version/context**:
- **Root cause**:
- **Fix**:
- **Regression check**:
- **Notes**:
```

## Log

<!-- Add meaningful project bug/root-cause entries here, most recent first. -->

### 2026-04-25 — Localized price save failed for cached PWA users

- **Feature**: `subscription-tracker-v1.3-price-input-localization`
- **Discovered by**: User after v1.3 release
- **Verified by**: Live/local smoke checks
- **Status**: fixed
- **Symptom**: Users could type localized prices such as `799,99` or `1.299,99`, but Save reported the price as required/invalid and did not create the subscription.
- **Affected version/context**: v1.3 live/PWA users with a stale cached app shell.
- **Root cause**: A stale PWA app-shell mix could pair the new `index.html` text price input with an older cached `app.js` that still parsed prices with `Number(...)`.
- **Fix**: v1.3.1 uses `app.js?v=1.3.1`, bumps the static cache to `subscription-tracker-v1.3.1-static`, caches the versioned script, and calls `skipWaiting()` plus `clients.claim()`.
- **Regression check**: Live/local form submits saved `799,99` and `1.299,99`; invalid localized inputs still rejected; manifest start/scope, root service worker registration, localStorage keys, CSV export, and local-only privacy stayed unchanged.
- **Notes**: Deployed in commit `2d78ef7` (`Fix localized price form submission`).

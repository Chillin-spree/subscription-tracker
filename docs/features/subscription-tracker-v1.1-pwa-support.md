# Subscription Tracker v1.1 PWA Support

> Install metadata, phone home screen icons, and offline app shell loading for the static Subscription Tracker app.

## Summary

v1.1 made the static app installable from a phone browser, added app metadata/icons, and enabled offline app-shell reload after a first successful visit.

## Current Release State

v1.1 shipped as the PWA support release. Later releases preserved the same live GitHub Pages URL, relative manifest scope/start URL, root service worker registration, and installed/home-screen continuity.

## User-Facing Scope

- Root `manifest.webmanifest` with relative `start_url` and `scope` values for GitHub Pages project hosting.
- App icons under `icons/` for install surfaces and favicon display.
- PWA metadata in `index.html`, including theme color and Apple mobile web app tags.
- Root `service-worker.js` registered from `app.js` with a relative path.
- Versioned static shell cache for the HTML, CSS, JavaScript, manifest, and icons.
- Offline navigation fallback to the cached app shell after a successful online load.
- Old Subscription Tracker caches are cleaned up during service worker activation.

## Non-Goals

- Push notifications.
- Background sync.
- In-app update messaging.
- Account creation, auth, cloud sync, or remote backup.
- Changes to CRUD, localStorage schema, export formats, spending overview, upcoming payments, or activity log behavior.

## Compatibility / Preservation Rules

- The live app is served from `/subscription-tracker/`, so PWA references use relative paths instead of absolute root paths.
- The service worker is registered as `service-worker.js`.
- Cached shell assets use entries such as `./`, `index.html`, `styles.css`, `app.js`, and `icons/icon-192.png`.
- User records remain local through browser `localStorage`.

## Implementation Notes

- Offline support covers the static shell only.
- A first successful online visit is required before offline shell reload can work.
- The app does not provide sync across devices or cloud backup.

## QA Checklist

- Manifest JSON parsed successfully.
- Icon files exist with expected dimensions: `192x192`, `512x512`, and `180x180`.
- No absolute root asset paths were found in app files.
- `node --check app.js` and `node --check service-worker.js` passed.
- Local HTTP verification confirmed service worker registration and cached offline shell reload.
- Browser smoke checks covered add, edit, delete, localStorage persistence after reload, upcoming payments, spending overview, text export, and CSV export.

## Risks

- Stale app-shell caches can serve old runtime files if later releases miss cache/script version bumps.
- Offline shell support does not protect user records from browser storage deletion.

## Release History

- v1.1 added manifest metadata, icons, service worker registration, static shell caching, and activation cleanup.

## Open Follow-Ups

- Future PWA behavior changes should preserve the same GitHub Pages URL and installed-app continuity.

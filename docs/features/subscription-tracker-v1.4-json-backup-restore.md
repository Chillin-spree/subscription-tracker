# subscription-tracker-v1.4-json-backup-restore

## Goal

Let users download and later restore a local JSON backup of their subscription records and activity log while preserving the app's local-only privacy stance and installed-PWA continuity.

## Released Behavior Planned for v1.4

- Download a JSON backup from the Export section.
- Include both subscription records and activity log entries in the backup.
- Preview and validate a selected JSON backup file locally before restore.
- Require explicit confirmation before replacing local data.
- Restore replaces both local subscriptions and local activity log as a full replace operation.
- Handle backup files locally in the browser; no upload, sync, account, server, or cloud behavior is added.

## Backup Schema Summary

```json
{
  "schema": "subscription-tracker.backup",
  "schemaVersion": 1,
  "app": {
    "name": "Subscription Tracker",
    "release": "v1.4"
  },
  "exportedAt": "<ISO timestamp>",
  "data": {
    "subscriptions": [],
    "activityLog": []
  }
}
```

- `schema`: `subscription-tracker.backup`
- `schemaVersion`: `1`
- `app.release`: `v1.4`
- `exportedAt`: ISO timestamp created at export time.
- `data.subscriptions`: current in-memory subscription records with existing field names preserved.
- `data.activityLog`: current in-memory activity log entries with existing field names preserved.

## Restore Validation

The restore preview accepts only schema version 1 backups. It rejects malformed JSON, unknown schemas, unsupported schema versions, missing data arrays, invalid subscription fields, invalid activity entries, invalid event types, invalid billing dates, and non-numeric prices.

Valid previews show the backup export date, schema version, subscription count, activity log count, and a clear note that no data has been restored yet.

Restore writes are gated behind explicit user confirmation. If confirmed, the app writes the validated backup arrays to the existing localStorage keys, updates in-memory arrays, rerenders the app, and clears the preview state. If the user cancels, no local data changes.

## Continuity Notes

- GitHub Pages URL remains unchanged.
- `manifest.webmanifest` `start_url` remains `"./"`.
- `manifest.webmanifest` `scope` remains `"./"`.
- Root-level service worker registration remains `navigator.serviceWorker.register("service-worker.js")`.
- localStorage keys remain unchanged:
  - `subscription-tracker-v1-subscriptions`
  - `subscription-tracker-v1-activity-log`
- CSV export headers and raw numeric price values remain unchanged.
- Existing saved records remain unchanged unless the user explicitly confirms restore replacement.
- App shell cache/script version is updated to `app.js?v=1.4.2` and `subscription-tracker-v1.4.2-static`.

## Known Risks

- Restore is destructive after confirmation: it fully replaces current local subscriptions and activity log.
- Malformed backups, unknown schemas, and future schema versions are rejected until a migration path is designed.
- Empty-account JSON backup export is not currently shown when there is no subscription or activity data.
- Merge restore, selective restore, and deduplication are not implemented.

## QA Summary

- Full diff reviewed; runtime changes are limited to `index.html`, `app.js`, `styles.css`, and `service-worker.js`.
- `manifest.webmanifest` has no diff and keeps relative start/scope values.
- No dependencies, framework, build tooling, upload, sync, account, or server behavior was added.
- JSON backup export includes subscriptions and activity log, keeps prices numeric, and includes no private device/user metadata.
- Text and CSV exports still work; CSV header remains `name,price,currency,billingDate,occurrence,paymentMethod,category,notes`.
- Valid backup preview shows exported date, schema version, subscription count, activity count, and no-restore-yet wording.
- Invalid backup files do not expose restore and do not write local data.
- Canceling restore confirmation writes nothing.
- Confirmed restore writes both existing localStorage keys, updates in-memory arrays, rerenders subscriptions/activity/totals, and clears preview state.
- Simulated write failure does not claim success and restores the previous storage snapshot.
- Static checks passed:
  - `node --check app.js`
  - `node --check service-worker.js`
  - `git diff --check`

## Release Status

Released to `main` in commit `8b50371` (`Add JSON backup and restore`). GitHub Pages deployment succeeded and live assets verified `app.js?v=1.4.2`, cache `subscription-tracker-v1.4.2-static`, manifest reachability, and unchanged manifest start/scope.

## Forward Compatibility

v1.4 backups use schema version 1 and include subscriptions plus activity log only. v1.5 restore keeps schema version 1 accepted as legacy input; restoring a v1.4 backup replaces subscriptions and activity log after confirmation while leaving v1.5 saved preset preferences unchanged.

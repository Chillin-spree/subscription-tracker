# Bills v1.13.1 GitHub Rename

## Summary

Moved the GitHub-facing project identity from Subscription Tracker to Bills after the v1.13 runtime app rename.

## Current State

- Runtime/app shell remained `v1.13.0` during this pass.
- App/browser/PWA identity already says Bills.
- Canonical GitHub repo moved from `Chillin-spree/subscription-tracker` to `Chillin-spree/bills`.
- Canonical live GitHub Pages URL moved from `https://chillin-spree.github.io/subscription-tracker/` to `https://chillin-spree.github.io/bills/`.
- The old repo and Pages path are historical references.

## Scope

- Rename the GitHub repository to `Chillin-spree/bills`.
- Update local `origin` to `https://github.com/Chillin-spree/bills.git`.
- Update current canonical docs to use `Chillin-spree/bills` and `https://chillin-spree.github.io/bills/`.
- Verify live Pages under `/bills/`.

## Not In This Pass

- Runtime UI terminology changes.
- localStorage key or schema migration.
- Backup header/parser/restore behavior changes.
- Range behavior changes.
- Multi-currency behavior changes.
- Service worker file rename or manifest path changes.
- CSV or JSON backup/restore.

## Compatibility Guardrails

- Keep manifest `start_url: "./"` and `scope: "./"`.
- Keep root-level `service-worker.js`.
- Keep relative app shell asset paths so Pages works under `/bills/`.
- Keep `subscription-tracker-v1-*` localStorage keys for existing saved data.
- Keep historical `Subscription Tracker Backup` restore support.
- Keep ordinary UI terminology such as `Subscriptions` and `Add subscription`.

## Acceptance

- [x] GitHub repo is renamed to `Chillin-spree/bills`.
- [x] Local `origin` points to `https://github.com/Chillin-spree/bills.git`.
- [x] v1.13.1 docs/config commit is pushed to the renamed repo.
- [x] GitHub Pages deploys successfully.
- [x] Live app works at `https://chillin-spree.github.io/bills/`.
- [x] Live HTML loads `app.js?v=1.13.0`.
- [x] Live `service-worker.js` is reachable under `/bills/`.
- [x] Live manifest says `Bills` for `name` and `short_name`.
- [x] Live manifest keeps `start_url` and `scope` as `"./"`.

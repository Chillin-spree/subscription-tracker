# Bills v1.13.1 GitHub Rename Addendum

## Summary

v1.13.1 moved the GitHub-facing project identity from Subscription Tracker to Bills after the v1.13 runtime app rename.

The consolidated rename-track summary lives in `docs/features/bills-v1.13-app-rename.md`.

## Unique Patch Scope

- Rename the GitHub repository from `Chillin-spree/subscription-tracker` to `Chillin-spree/bills`.
- Update local `origin` to `https://github.com/Chillin-spree/bills.git`.
- Move canonical live GitHub Pages URL from `https://chillin-spree.github.io/subscription-tracker/` to `https://chillin-spree.github.io/bills/`.
- Update current canonical docs to use `Chillin-spree/bills` and `https://chillin-spree.github.io/bills/`.
- Verify live Pages under `/bills/`.

## Preserved Contracts

- Runtime/app shell remained `v1.13.0` during this pass.
- App/browser/PWA identity already said Bills.
- Manifest `start_url` and `scope` remained `"./"`.
- Root-level `service-worker.js` remained in place.
- App shell paths stayed relative so Pages works under `/bills/`.
- `subscription-tracker-v1-*` localStorage keys remained unchanged.
- Historical `Subscription Tracker Backup` restore support remained unchanged.
- Ordinary UI terminology such as `Subscriptions` and `Add subscription` remained unchanged.
- Range behavior, multi-currency behavior, backup parser behavior, and CSV/JSON absence remained unchanged.

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

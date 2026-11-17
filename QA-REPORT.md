# Validation and handoff

Work performed only in the selected Dot cloud workspace. The original worktree
`../world-travel-map` remains on `feat/ten-cultural-routes`, with its existing
`scripts/check-browser.cjs` modification untouched.

Base: `888a1aaebf5ec1515d1b70d1166c5e8494409518` (origin/main fetched at start).
Implementation commit: `71a040e7ab973a9dd68e8cf0f62996b3052fb4ac`.
Branch: `feat/cultural-photo-editorial` in `world-travel-map-editorial`.

## Passed

- `node --test tests/*.test.cjs`: all 6 files pass. Official catalogue and old
  routes; walking collections; 20 themes; network and loop topology; dense map
  label collision; 16 asset licences, dimensions, byte counts and SHA-256 hashes;
  four paintings with distinct subject/museum place records.
- `node --check` for every root JavaScript file and every scripts/tests CJS file.
- `git diff --check`.
- `style.css`, `design.css`, `editorial.css`: parsed with css-tree, no parse errors.
- `JSDOM_MODULE=/tmp/atlas-dom-tools/node_modules/jsdom node scripts/check-dom.cjs`:
  20 gallery entries, all ten new theme/route/detail/next/back flows, duplicate
  saves and localStorage, full-image content, all four subject/museum pairs,
  source controls, and simulated image-error fallback.

The jsdom check stubs Canvas, animation, layout, ResizeObserver and native dialog
methods. It verifies DOM events/state only. It is NOT a browser rendering check.
The temporary jsdom/css-tree install did not change project dependencies.

## Blocked and not passed

- Real Chromium desktop / 390×844 checks did not execute. Launch failed before
  loading the app: `FATAL:chrome/browser/process_singleton_posix.cc:297 ...
  socket() failed: Operation not permitted (1)`. No UI screenshot was produced.
- The task cloud browser's localhost route did not reach the project preview;
  it returned `Missing or invalid bearer token.`
- The cloud browser file preview was explicitly denied by its URL security
  policy: requested protocol `file:` is not allowed; only `http:` and `https:`
  are permitted. This denied operation was not retried.
- Playwright's official headless-shell installation failed with an invalid /
  truncated download archive. No alternative local computer was used.
- Thus image decoding, visual polish, viewport bounds, real browser Back/Forward,
  focus trapping, canvas interaction and browser performance remain unverified.
  Browser scripts are ready, but none is claimed as passed in this run.

## Earlier terminal push result

Exactly one push was attempted:

`git push origin HEAD:refs/heads/feat/cultural-photo-editorial`

It failed with `fatal: could not read Username for 'https://github.com': No such
device or address`. This was a Git authentication failure, not a successful push
and not an auto-review rejection. No credentials were searched for, no alternate
write path was used, and the push was not repeated.

A subsequent read-only `git ls-remote` confirmed:
`refs/heads/main = 888a1aaebf5ec1515d1b70d1166c5e8494409518`, and the new remote
branch was absent. Main was not pushed or force-pushed.

Follow-up on 2026-11-17: the user requested submission to GitHub again. The
GitHub app successfully verified the connected account and `push: true` for
`raeqi/world-travel-map`. The earlier terminal credential failure does not mean
the GitHub app is disconnected. Submission can use that authenticated app; the
final action result and remote SHA must be verified separately.

Browser validation remains outstanding: an allowed Chromium / HTTP preview
runtime is still needed to run `node scripts/run-browser-suite.cjs` and inspect
the real desktop/mobile screenshots. DOM checks are not visual acceptance.

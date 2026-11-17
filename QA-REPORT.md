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

## Follow-up cloud preview verification (2026-11-17)

The original blockers above describe the first implementation run. A later
verification used the supported Sites managed preview in the same Dot cloud
computer, without using a local user computer or publishing the preview publicly.

- Actual Chromium UI: ten new themes at 1440 and 390 CSS-pixel viewport widths.
- No horizontal page overflow or failed fully loaded images were observed.
- Impressionist full-art viewer, depicted-place navigation, curated route,
  Giverny detail, next stop Rouen, close and return were exercised successfully.
- Mobile checks used a real browser iframe CSS viewport, not a physical phone.
- Some dense map labels still overlap; this is a known visual polish limitation.
- These are targeted UI checks, not a claim that the entire browser script suite ran.

The Git CLI credential limitation was resolved through the user's connected
GitHub API, preserving and verifying the complete Git tree before publication.


## Discovery and reading upgrade — 2026-11-17

Independent worktree: `world-travel-map-discovery`, branch
`feat/atlas-discovery-upgrade`, based on latest fetched main
`bb3a01e21a846b41ff59b7cfc40dea92478336e3`. Other worktrees and their
uncommitted changes were preserved. Only the selected Dot cloud computer was used.

### Actual coverage

- 21 themes, 1,595 unique records and 95 valid plans: one new Van Gogh theme,
  eight new place records and three added plans.
- Eight Impressionist-associated paintings (four added) and three Van Gogh
  paintings, with separately located depicted places and collection institutions.
- Seven added reusable images; 23 editorial image files total, 6,212,580 bytes.
- 25 selected place essays, 41 contextual paragraphs. The shared reading layout
  applies to all records; this does not claim fresh verification of all 1,595.

### Passed checks in this run

- `node --test tests/*.test.cjs`: all seven test files passed, including unique
  IDs, source links, plan membership, art geography, licences, dimensions,
  byte counts and SHA-256 hashes.
- `node --check`: every root JS and every scripts/tests CJS file.
- All four CSS files parsed by css-tree without parse errors; `git diff --check`.
- `JSDOM_MODULE=/tmp/atlas-dom-tools/node_modules/jsdom node scripts/check-dom.cjs`:
  all 21 theme entries, eleven edition flows, search and result switching,
  preserved query on return, route/detail/next/back, duplicate saves and storage,
  eight Impressionist subject/collection pairs and simulated image failure.
  Canvas/layout/animation/dialog methods are stubbed here; this is state testing.
- Real cloud Chromium via Sites managed preview, desktop 1440×1000 CSS iframe:
  all 21 theme entries, nonempty place lists and correct recommendations;
  keyboard activation and return. Eight route flows: Impressionism, Van Gogh,
  Nakasendo, Grand Canal, Camino, Viking, NC500 and cultural heritage.
  Details, facts/sources expansion, next, Escape, route preservation, duplicate
  saves and return passed. The preview wrapper can scroll outside the host
  viewport, so keyboard activation was used for the broad 21-theme pass;
  direct actual-app pointer interactions were checked separately.
- All eleven paintings opened in the real image viewer and decoded successfully
  (`complete` and positive `naturalWidth`), with correct depicted-place and
  institution captions and collection-location navigation.
- Mobile 390×844 CSS iframe: Van Gogh search, two route results, empty result,
  interest + Europe combination, clear filters and no horizontal overflow.
  Six route families (Nakasendo, Canal, Viking, NC500, Impressionism, Van Gogh)
  exercised detail/next/Escape/repeated saves. Bottom sheets stayed within the
  viewport; long content scrolls independently. Saint-Rémy drawer measured
  left 10, right 380, top 260.09, bottom 834. Escape returned focus to the
  selected route stop. The close button also worked with pointer activation.
- Direct app URL (outside the QA iframe): refresh restored selected Saint-Rémy
  and the Provence plan; Back returned to recommendations and Forward restored
  the route. Pointer activation opened theme, plan, stop and close control.
- Real screenshots were captured and displayed through the cloud browser tool:
  desktop home, Van Gogh route/detail, Viking Hedeby detail, mobile home and
  mobile art drawer. Captures after the camera transition show the selected
  mobile map label above the drawer. Test-only favourites were cleared through
  the UI after checks; no pre-existing favourites were present in this preview.

### Remaining limits

- These are targeted real-browser checks, not a claim that the full CLI browser
  script suite ran. It was not rerun after the earlier Chromium socket failure.
- Responsive iframe checks are not physical phone or touch-device tests.
- Dense map labels can still overlap and country-scale geography does not show
  streets, precise paths, altitude or venue boundaries. Drawer exclusion and
  selected-place centering reduce obstruction, not all collision cases.
- Screenshot file delivery is incomplete: `tab.screenshot()` successfully
  returned actual JPEG bytes and `nodeRepl.emitImage()` displayed the captures,
  but writing them to the task workspace from the browser runtime returned
  `EROFS: read-only file system`. No screenshot file was falsely substituted,
  no Library upload was attempted without a file, and no Library ID is claimed.
  The live app tab was marked for review. Prepared Library upload helpers are
  available in the task workspace for a supported screenshot file handoff.

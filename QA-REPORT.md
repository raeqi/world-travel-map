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


## Cross-theme hero carousel — 2026-11-17

Based on published PR #2 head `5db858d33ef80a71deae75ac4ced6b9d7e577a23`.
The previous equivalent local commit was preserved on
`feat/atlas-discovery-upgrade-local-preserved`; development continued on the
original PR branch tracking the published head. No other computer was used.

- Six source-specific recommendations: Nakasendo (Tsumago/Magome), Grand Canal
  (Jiangnan), Impressionism (theme map), Viking (Germany/Denmark network), NC500
  (west coast), and US national parks (Utah Five). All use existing licensed local
  images; no additional assets or content totals were introduced.
- Eight-second automatic rotation; stable previous/next, six current indicators,
  pause/play and Arrow/Home/End keyboard controls. Manual selection or focus
  entry pauses until explicit Play. Hover, hidden document and offscreen states
  suspend rotation. Reduced-motion preferences disable automatic playback.
- Automatic content changes have no live announcements and never move focus.
  Inactive slides are hidden. Manual selections report only the new title and
  position. This checks semantics, not a claim of testing with a physical screen
  reader. The current and next image are loaded ahead of automatic changes.

Passed after implementation:

1. All seven existing unit-test files, with added six-slide destination/licence
   integrity checks; every JS/CJS syntax check; `experience.css` parsing and
   `git diff --check`.
2. Existing DOM regression, preserving all 21 themes, 95 plans, image viewer,
   location/collection distinction, route details, favourites and return flows.
3. New `scripts/check-carousel.cjs` under jsdom with a controlled clock:
   7,999/8,000 ms transition, hover/resume, focus/manual/pointer pause,
   Arrow/Home/End wrap, all six destinations, reduced-motion changes, no
   automatic live-region content, hidden-page suspension, timer disposal and
   paused return state. Reduced-motion was exercised through this mocked media
   preference, not by changing the cloud desktop OS setting.
4. Real cloud Chromium via the supported Sites managed preview: automatic
   transition with unchanged height, pointer pause/play, hover pause and resume,
   keyboard focus pause and wrap, all six correct destination/return flows,
   and all seven image instances decoded after loading.
5. Real 1440×1000 iframe stage: carousel height 457 CSS px for every item. Real
   390×844 iframe: final carousel 339×379, caption 97 px for every item, no
   horizontal overflow; all nine control buttons measure 44×44. Mobile next,
   NC500 route/detail/close/home, and Nakasendo route/home passed. Manual pause
   remained in place during subsequent checks. Mobile checks are responsive
   browser checks, not physical-device testing.
6. Actual desktop Nakasendo/canal and mobile Viking screenshots were captured
   and displayed through the browser tool. This follow-up does not claim new
   persistent screenshot files or Library IDs; the earlier browser-runtime
   file-write isolation still limits that handoff.

The full CLI browser suite remains unrun; targeted live-browser checks above
were used. Browser log inspection showed extension metadata errors from
`chrome-extension://.../content-script.bundle.js`, not a reported app failure.

Latest user instruction authorizes completing this follow-up and merging PR #2
into main after checking its final diff and remote status. The final reply records
actual publication and merge SHAs after those operations are verified.


## Sidebar, route-media and content corrections — 2026-11-17

Base main: `2369d66fa2fcbd7f0ef1a7bb8a6a2bd8d56b8930`.
Independent branch: `fix/sidebar-layout`. Existing worktrees and commits preserved.
All actions remained in the selected Dot cloud computer.

### User-reported causes and corrections

- Place buttons inherited full borders while having zero inter-card spacing.
  Their list now uses 10px desktop / 8px mobile gaps; text can wrap, while icons
  and arrows retain their widths. No negative card margins or clipping were used.
- A real separator between sidebar and map supports pointer drag, arrows,
  Shift+arrows, Home/End and double-click/Enter reset. Width is persisted locally.
  Bounds preserve at least 440px of desktop map space; narrower desktop map panes
  use a proportionate reading drawer. Mobile hides the separator.
- Home route cards used `discoveryCover(theme)`, so every cultural itinerary
  inherited Kyoto's photograph. `routeCover(plan)` now admits only imagery tied
  to an actual stop, retains a location/work caption, and otherwise renders a
  neutral card. It never falls back to another theme image. Existing licences
  and original files remain unchanged; no new image assets were added.
- All six interest tabs and both theme/route views were audited. The 95 routes
  have 33 matched covers and 62 neutral covers. Kyoto images occur only in routes
  containing Kyoto. Search no longer promotes every route from a broad theme;
  exact country search and itinerary-region filtering use actual stop countries.
  Searching Japan gives eight Japanese itineraries, not the French itinerary
  whose painting happens to be titled The Japanese Footbridge.
- Playback explanation text was removed from the homepage, preserving default
  autoplay, hover pause, direct controls and accessible names.

### Content audit and bounded research

Reproducible command: `node scripts/audit-content.cjs --write`.
Machine-readable result: `qa/content-audit.json`.

- Scanned 1,595 records, all 95 plan memberships, and all 345 unique planned stops.
- Before corrections: two empty descriptions, two identical park descriptions,
  283 descriptions below 70 characters. After: zero empty descriptions, zero
  identical descriptions, 271 short-description review candidates (214 planned).
  Length is only a triage signal, not proof of error or poor content.
- Raw fields are preserved, but redundant region/type values and generic reading
  prompts are omitted in the detail table. This affects 1,532 records; the audit
  detects zero such fields still rendered through `meaningfulFacts`.
- Updated 14 descriptions: ten Andes points, Yellowstone, Sebastia, Sequoia and
  Kings Canyon. Added ten two-part Andes readings, bringing the atlas to 35
  selected essays / 61 contextual paragraphs. Original source links are retained
  alongside new specific primary references.
- Actual plan memberships provide useful direct related-itinerary links for all
  345 planned records. These are current editorial trip positions, not assertions
  about historical travel order.
- Desaguadero–Titijoni and Tiwanacu remain explicitly listed for further site-level
  research. Their distinct catalogue objects are clarified, but detailed surviving
  structures were not invented. The full 1,595 sources were not re-fetched or
  independently fact-checked in this pass.

Research references include Colombia Ministry of Culture resolutions 3317/2013
and 1593/2006 (Rumichaca), Ecuador INPC's Ingapirca site-museum description,
Peru Ministry of Culture's Huánuco Pampa storage study, UNESCO Cuzco / Sebastia /
Qhapaq Ñan maps, Argentina's Tastil entry, Mendoza's Ranchillos project record,
and NPS park-specific Sequoia / Kings Canyon / Yellowstone descriptions. Colombia
and Chile direct pages sometimes returned 403 in the web parser; official indexed
text and available official documents were used, not browser bypasses. No current
opening hours, border permissions or transport schedules were inferred.

### Passed verification

- Seven unit-test files; every JS/CJS syntax check; all four CSS files parsed;
  `git diff --check`.
- Existing DOM regression, carousel regression, and new sidebar/cover/content
  regression. New checks cover pointer and keyboard resize, bounds, persistence,
  reset, mobile visibility, all95 cover-to-stop relations, image-error neutral
  fallback, quiet carousel, meaningful facts and related-route opening.
- Real cloud Chromium through Sites managed preview: native pointer drag from
  390px to 580px sidebar. Map CSS width AND actual canvas pixel width became
  848px. Refresh restored a keyboard-set 406px width. Home/End/Enter bounds/reset
  worked; cards had 10px gaps and no text overflow even at 280px sidebar width.
- Real 900×800 CSS viewport: max sidebar 448px, map 440px, reading drawer 281px,
  within viewport. Real 390×844: separator hidden, 8px card gaps, no overflow,
  drawer left10/right380/bottom834, usable close and preserved route context.
- All six interest tabs, theme and itinerary views at desktop and mobile:
  counts 21/95 total; art5/19, paths6/17, exchange6/37, nature2/17, drives2/5.
  No fully loaded broken cover images observed. Exact Japan search and Europe
  region filtering were tested in the actual browser.
- Actual Rumichaca details show natural stone bridge / Carchi river / heritage
  context, without the old generic facts table. Huánuco Pampa retains both the
  original UNESCO map and specific research link. Related-route opening and
  Escape close passed. Mobile Van Gogh art viewer opened and closed while
  retaining the detail panel.
- Real screenshots of separated cards, corrected cover grid, revised Rumichaca
  and widened sidebar were captured and displayed in the browser tool. The live
  tab was marked for review; this pass claims no new persistent screenshot file
  or Library ID.

Limits remain: targeted live-browser verification rather than the complete CLI
browser suite; responsive CSS viewports rather than physical phones; structural
content audit rather than exhaustive historical verification; dense map labels
can still overlap. Neutral covers are deliberate until matching reusable images
are acquired and verified.


## 2026-11-17 · Matched imagery and first reading batch

Scope: 21 existing themes, 95 existing plans, 1,595 records retained. New-route drafts are excluded to avoid overlap with the separate cultural-route task; branding and deployment are unchanged by this batch.

- 57 new local WebP files: 52 exact-place photographs and 5 Met CC0 Van Gogh works. All 80 editorial assets pass byte-count, SHA-256, dimensions, local path and licence/source consistency checks. Images were inspected in contact sheets; signboard-heavy placeholders were replaced with actual forest/shrine photographs. Original theme files and original illustrations remain available.
- Route covers: 89 matched to an actual stop, 6 honest neutral cards. Choice spreads multiple available stop images across overlapping itineraries. No country/theme-wide photo fallback.
- Content: all 11 canal cities have a specific description, two expandable reading sections, place imagery and primary/local heritage references. Eighteen more researched places cover natural processes and existing theme sites. Total layered reading: 63 places. All 95 plans appear in `reading-coverage.csv`, including missing deep reading and short-description IDs; 38 plans contain at least one layered reading place. This is the first batch, not a complete historical check of every place.
- Van Gogh: 8 works, including Paris self-portrait, Arles portrait/shoes and Saint-Rémy flower still lifes. Creation associations are labeled separately from depicted scenery; all five new works point to the Met in New York for collections.
- Checks passed: 8 Node test files; JavaScript syntax; four CSS parsers; Python source compilation without bytecode; DOM route/sidebar checks; controlled-clock carousel tests (no visible navigation buttons, autoplay, hover/focus pause, keyboard, reduced motion, silent changes, hidden-page suspension).
- Real cloud Chromium via Sites managed preview: all six interest tabs rendered correct plan/photo/neutral counts; 95/89/6 total, nature 17/17/0 and paths 17/17/0. Every canal detail was opened and checked for its ID, image and two reading sections. The final Hangzhou item was activated by keyboard because the oversized QA iframe clipped its native pointer target in the outer browser viewport.
- Real UI: Van Gogh eight-card exhibit, self-portrait image decoding, Paris association jump, Ginoux New York collection jump, Roses label, mobile Provence route, first-stop detail, close/back and repeated save (2 remained 2). At 900px the sidebar clamped to448px; at390px the Suzhou drawer stayed within x10–380 and there was no horizontal overflow. The mobile separator was hidden. Default autoplay was observed playing; reduced-motion and hover details were verified with controlled DOM tests, not native OS setting emulation.
- Actual screenshots shown in the cloud browser: desktop Suzhou expanded reading, mobile Van Gogh, nature itinerary grid. No Library screenshot file/ID was created; the earlier cross-runtime file-write limitation remains. These screenshots are distinct from a full 95-route visual inspection. The complete CLI Chromium suite was not run in this restricted environment.
- Remaining: 6 neutral covers (`daning`, `tea-source`, `silk-coast`, `silk-winter`, `mozart-viennaprague`, `mozart-western`); 200 short descriptions in recommended places and 256 across the full catalogue. `andes-desaguadero` and `andes-tiwanacu` still need deeper site-specific research. Long original descriptions and a source link are not treated as proof of fresh research.


### Integration on latest scenic-road main

The batch was rebased by three-way merge onto `da7cbff`, retaining `roads.js`, `roads.css`, the 16 independently merged scenic-road plans, its workflow, sources and README evidence. `index.html` keeps both road registration and the new content/media scripts. The complete inventory now has22 themes,1,683 records,111 plans and433 unique planned places; route covers are105 matched/6 neutral. Existing-batch counts remain95 plans/89 matched and63 layered readings; the scenic-road task contributes88 already-existing expanded place readings, not research performed by this batch. Full backlog and coverage reports include both. Browser screenshots above were taken before this integration; the combined index receives a fresh DOM regression, while live preview port4173 has been released to the other task. Scenic-road remote media limitations remain unchanged.


Combined-state checks passed:9 Node test files, all three DOM regressions including the111-plan image binding check. The latest structural audit flags337 short summaries, but110 already have expanded reading;227 have a short summary and no layered reading,176 of those are used in plans. These are review candidates, not automatic factual-error labels. The full CSV distinguishes these states and retains specific evidence gaps separately.


### Integration with approved Terra Mosaic and focused road themes

A further three-way merge retains the approved Terra Mosaic name, icon, `terra.css`, homepage composition, `app.js` behaviour, and twelve focused road themes from `78154a1`. The complete inventory is now33 themes,1,683 places and111 plans. Carousel markup remains button-free per the newer user request; the Terra UI assertion checks this state instead of a visually hidden pause button. All9 Node test files and3 DOM regressions pass on the combined tree; current full coverage CSVs were regenerated. No visual screenshot from the pre-brand preview is presented as proof of this combined UI. The existing GitHub UI workflow is the additional combined-state browser check.

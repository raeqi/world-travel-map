# Vector overlay snapshot regression — 2026-11-22

This investigation is independent of raster-provider configuration. No MapTiler key, GitHub setting, release wiring, main merge or deployment is involved.

## Evidence before the fix

- At `c08b923`, [preservation attempt 1](https://github.com/raeqi/world-travel-map/actions/runs/45034723907/attempts/1) showed both Valencia application circles absent. All 12 input IDs were present, the camera and base were ready, 146 base features rendered, and both points were on the visible globe surface. The screenshot confirms actual absence, not label collision. Original archive: `14759127483`, SHA-256 `11794ae02301bbd4a80b8ef97e24678a598f3a36d2c844dadb6e9b508a98ba25`.
- The [unchanged failing job rerun](https://github.com/raeqi/world-travel-map/actions/runs/45034723907/attempts/2) passed; its screenshot shows Valencia again. Archive: `14760723385`, SHA-256 `91e18a060a71a1a3686272ba5d7ac5ef9c1f90f683aa07c2d5c4f4404c345ddd`. This established intermittence, not a permanent resolution.
- Diagnostic head `15d3f47` passed [216 strict vector frames](https://github.com/raeqi/world-travel-map/actions/runs/45039529611): default browser arguments and explicit SwiftShader, each 1440×1000 and 390×844, three replay rounds per viewport. Both Valencia circles appeared in all 12 full-catalogue samples. Default archive `14761815986` hash `f88c1847f5df6f6af43db709485a39ab6af92d3564d5c84fda33e58e9a6606ea`; SwiftShader archive `14761053515` hash `e4e8b3144b066fa5d9cb1e7eadeae42630b68892dd56439f1302a1929433a9de`.
- The wider [mobile preservation shard](https://github.com/raeqi/world-travel-map/actions/runs/45039529568/job/137260653664) captured the actionable related failure on `chinese-painters`. Input had all eight original points. The loaded, renderable z2/x3/y1 tile still contained precisely the two points of the preceding Taipei plan. Its neighbour contained the two valid buffered western points, but the main tile lacked the other six. Only Taipei's two circles rendered after the 30-second strict deadline, while the base and camera were ready. Archive `14760729831`, SHA-256 `e08c79690800d161e14f686e0d6425d04a89cd0012bf427c21a4273fed6af1ca`.

The observable defect is a stale rendered GeoJSON snapshot after a route-to-catalogue transition. Correct `getData()` and source-loaded flags do not prove its tiles reflect that snapshot. The trace does not instrument the exact internal worker-message ordering, so it does not establish a particular MapLibre upstream issue as the cause of every occurrence.

## Correction and regression method

Each changed overlay snapshot gets independent point/route source IDs, with the fixed application layer IDs reattached to the new sources. Old sources are retired after their layers detach. Late tile work from the previous snapshot cannot share the active source's worker/cache identity. Unchanged draws do not rebuild overlays. No coordinates, point IDs, route edges, geography, navigation, provider configuration or dependencies change.

Passive probes now resolve the active source from the actual circle/route layer, rather than assuming a permanent source ID. They continue to require actual circle IDs, front-surface projection, current basemap features and stable source/camera state. No longer timeout, sleep, retry or source-only acceptance was added.

A deterministic unit regression completes an old two-point tile after installing the full catalogue. It fails against the previous renderer by losing the third point; it passes with snapshot isolation and verifies selected state plus retirement of old sources. The browser replay also exercises every Chinese-painters plan and the full catalogue in both viewports and both renderer modes. CI results on the exact final head remain authoritative; the pre-fix 216-frame pass is not represented as verification of this correction.

## Boundaries

Cloud interactive Chromium has no usable WebGL in this environment; actual vector browser evidence comes from the linked GitHub Actions runs. Browser artifacts use the existing public vector provider. They are not evidence for live MapTiler raster authorization, China/user network access, or a production deployment. Real MapTiler 2D streets validation remains a separate unresolved task.

# 漫游 · World Travel Map

浅色交互式主题地球，Canvas 2D 球面正射投影，无地图密钥或运行时 CDN 依赖。

## 本地运行

```sh
python3 -m http.server 8000
```

浏览器打开 http://localhost:8000 。不要直接双击 HTML，否则浏览器会限制地图数据读取。

## 主题与数据

2026-10-07 下载的官方数据快照：

- UNESCO 世界遗产 1,273 项：991 文化、240 自然、42 双遗产。双遗产同时加入两个主题，因此自然主题 282 项、文化主题 1,033 项。
- 其中 38 项官方数据无坐标，保留搜索和详情，仅从地图与路线中排除。名录代表坐标不等于全部组成部分或导航入口。明清故宫使用北京组成部分的示意位置，行程不包含沈阳。
- 美国国家公园 63 个，与 NPS 官方名单逐项对应；红杉和国王峡谷从合并管理记录拆成两个地点。分区坐标为示意位置。
- 三峡库区及支流历史聚落 6 处，逐项附地方官方来源。包括沿江古镇、迁建古镇、盐业古镇、历史城镇和旧址记忆；并非完整官方名录，新滩旧址不作为常规景区推荐。

来源：
- https://data.unesco.org/explore/dataset/whc001/
- https://www.nps.gov/aboutus/national-park-system.htm
- https://www.nps.gov/subjects/developer/api-documentation.htm

原始名录快照在 `data/unesco-compact.json`、`data/nps.json`、`data/nps-system.html`。运行 `python3 scripts/build_catalog.py` 生成 `catalog.js`。UNESCO 描述保留其官方数据内容，遵循 CC BY-SA IGO 3.0 来源条款；官方链接随每条记录提供。国家边界底图来自 https://github.com/holtzy/D3-graph-gallery/blob/master/DATA/world.geojson ，仅作示意。

## 数据与主题配置

- `catalog.js`：统一地点、官方来源与数据覆盖信息。
- `themes.js`：每个主题的颜色、符号、默认视角、详情字段。地点可属于多个主题。
- 二级分类由名称关键词辅助整理，属于产品编辑分类，并非官方遗产分类；另支持按区域或国家筛选。
- 列表分页加载，地图仅给较少结果或选中点位显示标签。

## 推荐与我的行程

`planner.js`: 53 circuits (nature 8, culture 11, Three Gorges 6, parks 9, tea 9, Silk Roads 5, Marco Polo 5).

Selecting a month filters to its editorial seasonal window; selecting a duration filters the maximum days. Sources provide context, not live forecasts or guarantees of route access.

每条路线显示逐段球面直线距离、交通方式、建议天数与季节原因。尚未接入公路、铁路、水路里程及实时天气；不可把直线距离作为驾驶距离或时间。预览推荐不改变用户行程，只有主动点击加入才追加并去重，不覆盖已收藏地点。行程使用稳定地点 ID 存入浏览器 localStorage。

## 检查

```sh
node tests/catalog.test.cjs
node --check app.js
```

数据和规划检查覆盖名录数量、唯一 ID、来源、坐标范围、主题关联、月份排序、天数筛选、跨日界线距离和跨地系列遗产坐标。

`node scripts/check-browser.cjs` 使用本机 Chrome 与 Codex 打包的 Playwright 执行桌面/手机交互检查（路径按当前开发环境配置）。

## 交互

拖拽旋转，滚轮/双指/按钮缩放；方向键旋转，`+`/`-` 缩放。支持点位详情、主题切换、搜索、分类、区域筛选、推荐预览、添加和移除行程，以及逐站播放。

目前为三维地球浏览原型，不含城市街道、建筑模型、高程或精细遗产边界。

## 地图交互更新

- 一级主题入口保留在侧栏，移除了地图内重复的主题浮层。
- 推荐默认“全部行程（不限月份）”；预览一条行程时，绘制和点击命中仅包含这条路线的地点，可一键恢复主题全图。
- 缩放范围 0.65–60 倍，缩放目标以时间平滑插值；国家投影路径缓存用于减轻连续缩放的计算量。底图仍为国家级边界，不含街道或真实地形。
- 每个二级分类拥有颜色和几何符号，配套图例；差异不仅依赖颜色。
- Tea Horse Road: 20 historical nodes across China, Nepal and India, linked as a historical trading network rather than a navigable trail.
- 自然主题采用野外笔记样式，文化主题采用档案纸页样式，三峡主题采用水墨水系样式，国家公园采用野外手册样式，茶马主题采用马帮行旅纸卷样式；背景纹理是视觉装饰，不是地形数据。

## October 8 interaction and planning update

43 usable itineraries: nature 8, culture 11, Three Gorges 6, national parks 9,
Tea Horse Road 9. Includes 5-8 stop circuits lasting 12-21 days. Selecting a
month now filters plans rather than merely reordering the same list.
Regional catalogue circuits use nearest-neighbour representative coordinates;
they are draft suggestions, not verified driving routes. Seasonal windows are
editorial assumptions, not live climate forecasts.

The Tea Horse Road collection now contains 20 nodes, including related historic
Tibet-Nepal and Tibet-India trading networks. Cross-border historical lines do
not imply present-day visitor access. Nepal customs history and the Chinese
embassy's account of Nathu La are linked from the corresponding nodes.

Point selection exits an unrelated route preview and smoothly centers the
selected place. Rendered text labels have clickable hit boxes. Detail cards
are constrained within the map; on mobile the selected point is framed above
the compact bottom card. Long descriptions can be expanded.

Additional check: `node scripts/check-focus.cjs` verifies point focusing,
label clicking, preview exit, and desktop/mobile card bounds.

## Seven-theme photo atlas (2026-10-08)

The opening screen is now a full-width photographic theme gallery. Each theme
opens into three explicit views: map discovery, suggested itineraries, and a
saved personal journey. Selecting an itinerary opens its own ordered station
list; selecting a station keeps the route context and provides previous/next
controls. Closing the place card returns to the same route. Theme, view,
selected itinerary/place and filters are encoded in the URL fragment for
refresh and browser navigation. Saved points remain in localStorage.

New curated collections in `historical.js`:

- Silk Roads: 26 representative city nodes, with UNESCO background sources.
- Marco Polo: 23 modern geographic counterparts to the Yule–Cordier edition,
  with original place names, chapter groupings and separate reported/uncertain
  accounts. Book mentions are not treated as proof of a personal visit.
- Ten contemporary travel suggestions across these collections bring the total
  to 53. Historical links are illustrative, not exact reconstructed tracks or
  assurances of present-day travel access. These are curated starters, not
  exhaustive historical gazetteers.

Ten source photographs are served locally from `assets/photos/`. The in-app
credits dialog and `assets/photos/README.md` retain attribution and licence
links. CSS crops, colour treatments, masks and print textures provide the
artistic variants; no fabricated geography or terrain is implied. The map's
art layer can be disabled with the clear-map toggle. Photos in place details
are used only for matching places, not generic substitute destination photos.

Rendering changes include one cached filtered point list, removal of repeated
full-catalogue filtering from every culture marker, cached great-circle route
geometry, ResizeObserver-based detail dimensions, no map redraw on the gallery
screen, and fewer decorative animation updates. The small local photos are
resized, decoded asynchronously and lazy loaded where appropriate.

`node scripts/check-browser.cjs` now exercises all seven themes and the complete
catalogue → map → itinerary → station → saved journey flow, including browser
Back/reload, phone layout, photo decoding and a culture-map draw benchmark.

The globe base is cached in an offscreen canvas independently of animated routes. During drag, camera motion and playback, a simplified boundary mesh is used; detailed boundaries return after motion ends. Text widths are cached, and offscreen markers are culled.

`node scripts/check-performance.cjs` exercises actual pointer dragging, wheel
zooming, restoration of detailed boundaries, and the transition from automatic
journey playback to manual next-stop navigation. Draw timings measure Canvas
work on the local test machine; they are not an end-to-end frame-rate guarantee.

### 主题图形与无坐标收藏
地图集返回入口位于侧栏标题上方。七张地图有独立介绍，行程详情直接显示旅行思路与建议月份。主题采用不同的点位图形、边界与水域印刷样式；装饰纹理不代表真实地形。缺少官方坐标的地点可以收藏并持久保存，以“待补坐标”标识，地图连线与播放只使用有坐标的地点。

回归检查：`node scripts/check-unlocated.cjs` 验证无坐标收藏、刷新恢复、混合行程播放和顶部导航；`node scripts/check-browser.cjs` 验证七主题、季节筛选、路线与手机视图。

## 步行与游历主题（2026-11-15）

新增三个独立主题，保留原有七主题。`walking.js` 收录 38 个代表地点，
`planner.js` 新增 9 条全段／分段体验建议，共 62 条路线：

- **徐霞客游历**：13 个地点；1639 年滇西精选为鸡足山 → 丽江 → 剑川 →
  洱源 → 大理 → 保山 → 腾冲。另列天台、雁荡、黄山、武夷、嵩山、华山等
  不同年份足迹，不把一生游历拼成一次连续步行。推荐天数为当代探访建议。
- **熊野古道**：选择中边路的泷尻王子 → 高原 → 近露 → 继樱王子 →
  发心门王子 → 熊野本宫大社，提供全段、山村前段、发心门末段三种体验。
- **圣地亚哥朝圣之路**：选择法国之路西班牙段，从龙塞斯瓦列斯到圣地亚哥
  的 19 个主要节点；提供全段、莱昂向西、萨里亚末段建议。

这些是站点连线示意，不是 GPX 或步道导航。球面直线不等于真实徒步距离，
中间省略的住宿站不能理解为一天可走完。季节和天数是编辑建议；出发前须
核实实际路线、爬升、天气、关闭、住宿及接驳。证书资格不由地图判断。

来源（也随地点保留）：
- 徐霞客滇西：https://yn.yunnan.cn/system/2021/05/30/031482898.shtml
- 游历年表：https://cnxxk.com.cn/list_24/1457.html
- 中边路：https://www.tb-kumano.jp/en/kumano-kodo/nakahechi/
- 熊野官方步道地图：https://www.tb-kumano.jp/en/kumano-kodo/maps/
- 法国之路：https://www.spain.info/en/camino-santiago/french-way-camino-santiago/

新主题封面为 `assets/illustrations/` 中的原创 SVG 示意插画，明确标记非实景，
不挪用其他目的地照片。无需新依赖或地图 API key。

检查：`node tests/catalog.test.cjs`、`node tests/walking.test.cjs`。
浏览器回归：`node scripts/check-browser.cjs`、`node scripts/check-walking.cjs`。
两者支持 `PLAYWRIGHT_MODULE` 和 `CHROME_PATH` 环境变量（默认系统 Chromium）。

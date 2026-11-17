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
- **圣地亚哥朝圣之路**：现已扩展为从法国圣让皮耶德波尔至圣地亚哥的
  43 个站点；提供完整主线、莱昂向西、萨里亚末段建议，详见下方更新记录。

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

## 徐霞客全国游踪扩展（2026-11-16）

徐霞客主题现有 24 个代表地点、6 个独立旅次精选，默认按历史年份显示：
1613 天台—雁荡；1616 齐云—黄山—武夷；1618 庐山—黄山；
1623 开封—郑州—新密—嵩山—少林—洛阳龙门—华山—武当；1633 北京—五台—恒山；1639 滇西七站。
新增开封、郑州、新密、少林、洛阳龙门、齐云山、庐山、武当山、北京、五台山、恒山；中原不再只是地图上的零散点。
全国游踪仍为精选，并非所有省份、所有路段或日记停留点的完整复原。黄山
在两次旅程中共用地点 ID，保留不同年份；不同旅次不会自动拼成连续徒步线路。
现代建议天数不等于历史时长，跨省路线需城际接驳。地图继续保留 10 个主题；
步行与游历主题现共 49 个地点、12 条路线，全部主题共 65 条推荐。
年表来源：https://cnxxk.com.cn/list_24/1457.html
中国地质大学（北京）博物馆概述：https://bm.cugb.edu.cn/geoscience/c/2019/06/26/583271.shtml

中原原文：《游嵩山日记》https://m.gushiwen.cn/guwen/bookv_a776ea1bd3d8.aspx

## 法国之路完整主线（2026-11-16）

法国之路由原西班牙段扩展为圣让皮耶德波尔（法国）至圣地亚哥的完整起终点走廊，
共 43 个站点，补齐常用分段城镇。完整主线约五至六周仅为编辑建议，不是固定日程；
不是每村清单，也不包括 Somport/Jaca 等其他分支。莱昂和萨里亚子路线沿用同一站点顺序。

路线：
圣让皮耶德波尔 → 龙塞斯瓦列斯 → 苏维里 → 潘普洛纳 → 王后桥镇 → 埃斯特利亚 → 洛斯阿尔科斯 → 维亚纳 → 洛格罗尼奥 → 纳瓦雷特 → 纳赫拉 → 圣多明各-德拉卡尔萨达 → 贝洛拉多 → 圣胡安-德奥尔特加 → 阿塔普埃尔卡 → 布尔戈斯 → 奥尔尼略斯-德尔卡米诺 → 卡斯特罗赫里斯 → 弗罗米斯塔 → 卡里翁-德洛斯孔德斯 → 特拉迪略斯-德洛斯滕普拉里奥斯 → 萨阿贡 → 埃尔布尔戈拉内罗 → 曼西利亚-德拉斯穆拉斯 → 莱昂 → 圣马丁-德尔卡米诺 → 奥尔维戈医院镇 → 阿斯托尔加 → 拉瓦纳尔-德尔卡米诺 → 丰塞瓦东 → 莫利纳塞卡 → 蓬费拉达 → 比埃尔索自由镇 → 奥塞夫雷罗 → 特里亚卡斯特拉 → 圣希尔 → 萨里亚 → 波尔托马林 → 帕拉斯-德雷伊 → 梅利德 → 阿尔苏阿 → 奥佩德罗乌索 → 圣地亚哥-德孔波斯特拉

比利牛斯越境有拿破仑高线与 Valcarlos 谷线，二者不可连续串行。
纳瓦拉官方提示 11 月 1 日至 3 月 31 日须走谷线；其他日期仍应查天气和临时关闭。
Triacastela 至 Sarria 本图选 San Xil，Samos 为另一路径。地图不提供 GPX、精确步道距离或证书判断。

来源：
- 纳瓦拉官方越境路线与安全提示：https://www.visitnavarra.es/en/detalle-tramo/-/t/french-route-st-jean-pied-de-port-to-roncesvalles
- 卡斯蒂利亚-莱昂官方线路图：https://www.turismocastillayleon.com/es/lasedades2024.ficheros/382439-web_Apertura%20Monumentos%20Camino%20Franc%C3%A9s%202024.pdf
- 加利西亚官方 San Xil 段：https://www.caminodesantiago.gal/es/planifica/las-rutas/camino-frances/etapa-triacastela-sarria-por-san-xil
- 西班牙朝圣协会联合会中段：https://www.caminosantiago.org/cpperegrino/etapas/burgoscarrion.asp

镇级代表坐标是编辑取点，并非精确步道定位。

## 真实影像文化编辑版（2026-11-17）

十个新增主题采用 16 项明确可复用的真实摄影、画作、符文石与亲笔文献。
各主题以题材自己的构图展开：中山道版画/街景对读、运河全景、维京器物展签、
莫扎特亲笔谱、公路/路牌拼贴，以及可分别定位作品描绘地与馆藏地的印象派画廊。
完整图像阅览支持键盘 Escape 关闭，图片失败时保留来源、文字与操作。

`editorial.js` / `editorial.css` 管理编辑展示；`assets/editorial/README.md` 与
`sources.json` 保留逐项作者、原始地址、许可、处理说明、核验日期及压缩文件哈希。
图片保留完整构图与原色，卡面只作 CSS 裁切，阅览室可看完整图像。
新增素材约 3.86 MB，无运行时 CDN 依赖。

印象派四幅作品为莫奈《印象·日出》（1872）、《鲁昂主教座堂，西立面》（1894）、
《日本桥》（1899）与毕沙罗《冬日早晨的蒙马特大道》（1897）。
画中地点和现藏机构是分别定位的真实地点；艺术网络不画虚构的共同旅行线。
采用 NGA 的《日本桥》，未使用当前未提供开放图像的 Met 437127。

检查：`node --test tests/*.test.cjs`；`node scripts/run-browser-suite.cjs` 在同一
预览进程运行所有浏览器回归（需可运行 Chromium/Playwright，可配置 `CHROME_PATH`）。
`qa/preview.html` 提供真实 iframe 的 1440×1000 与 390×844 响应检查入口，仍需通过 HTTP 打开。

# 真实底图接入（本地审阅稿）

> 历史准备/实现记录；之后获准的测试分支与首次实际浏览器运行已执行且失败。最新状态见 [PR #60 首跑失败诊断](real-map-qa-diagnosis.md)。本页原先的“未推送/未运行”描述仅对应当时阶段。

当前续轮默认使用固定版本 VersaTiles 样式与独立 OSM 矢量服务，加上本地 Natural Earth 全球城市标注；详见[候选比较、实测与单次 CI](basemap-options.md)。下文保留首轮实现与未完成验收的历史范围。两轮均未发布。

基线：main `45e917fd2f8b3c92811a8eb32dc0b9626c0aaf0c`。原地图为本地 `countries.geo.json` 的 Canvas 正射地球，没有道路瓦片。

首轮方案（`a78e498`，本轮已替换供应源）：本地固定版本 MapLibre GL JS 6.19.0，OpenFreeMap Positron 矢量底图、原生 globe 投影；保留原 Canvas 地球作无 WebGL / 网络失败回退，保留画境、路线、地点、收藏及 `flow.js` 链接管理。MapLibre 不写 URL hash。第三方文件、许可证和哈希见 `assets/vendor/maplibre-6.19.0/source.json`。

## 首轮验收限制

2026-11-20，本云环境直连官方 `https://tiles.openfreemap.org/styles/positron` 返回 HTTP 403，正文 `error code: 1010`（Cloudflare）。未绕过服务限制。Chromium 156 启动因 `process_singleton_posix.cc:297 socket() failed: Operation not permitted (1)` 退出；当前没有可用的云浏览器工具。未获得真实底图截图，不能将单元/DOM 检查视为真实地图验收，也没有实测中国网络可用性。

本次不推送、合并或发布。后续验收清单和实际本地测试结果在本文件继续记录。

## 首轮实现范围

- 首次进入地图时才加载本地 ESM 和独立 worker；不增加地图密钥或 CDN 脚本依赖。固定版本目录随静态构建复制，第三方代码未改动。
- OpenFreeMap Positron 使用真实矢量底图，MapLibre 使用 globe 投影。保留原画境开关、主题色和地点文化符号；街道级缩放自动收起装饰照片。
- 地点选中、地图拖动、缩放按钮、侧栏调宽、推荐行程与收藏播放共享状态。按实际详情面板尺寸留出地图空间；同一地点重复点击仍重新定位。原 Canvas 的窄屏居中也避开实际详情面板。
- 图层使用原 WGS84 点位和原 `routeEdges`；主题网络不伪装成连续线路，闭环规则和泛美道路断点不变。线路是示意，不提供道路寻径；跨日期变更线用最短经度范围与展开后的大圆采样。
- `flow.js` 继续独立管理原有主题、地点、行程、筛选链接。MapLibre 固定 `hash:false`。
- 不支持 WebGL 2、初次加载超时、初始服务错误、连续瓦片错误或上下文丢失时，回到本地轮廓地球，保留当前选择、行程、收藏与链接，并提供手动重试。此回退不含离线街道瓦片，也不代表可完全离线加载整个网站。
- 原生底图署名始终保留 OpenFreeMap、OpenMapTiles 与 OpenStreetMap 链接。官方使用指引：[OpenFreeMap quick start](https://openfreemap.org/quick_start/)；投影与集成：[MapLibre 官方文档](https://maplibre.org/maplibre-gl-js/docs/)。

## 可复现检查

```sh
node --test tests/*.test.cjs
node scripts/check-docs.cjs
node scripts/build-site.cjs
# 需可选 jsdom；只检查 DOM/状态，布局与 Canvas 均为 mock
node scripts/check-real-map-dom.cjs
```

`tests/real-map.test.cjs` 覆盖桌面/窄屏面板留白、阿拉穆特→阿尔托→阿拉穆特与同点重复定位、异步加载后的最新选择、原生相机同步、网络失败保留状态、日期变更线，以及全部生产行程的原始边和端点。瓦片就绪要求来自 vector source 的已加载 tile，不把样式元数据或自己的 GeoJSON 当真实底图已成功。

`check-real-map-dom.cjs` 在1440×1000、390×844模型中，分别使用离线引擎和模拟的原生引擎验证 `#theme=culture&place=wh-1770`、刷新、前进后退、收藏恢复及命名行程恢复。它没有真实 CSS 排版、图像解码或 WebGL 像素，不能作为标记实际可见的证据。

## 发布前仍须通过

在可用的真实浏览器和官方底图网络下，运行：

```sh
node scripts/run-browser-suite.cjs check-real-map-browser.cjs
```

脚本使用1440×1000、390×844真实 CSS 视口，要求原生矢量底图与瓦片已加载，核对全球边界/标注、巴黎和北京街道/标注、实际渲染的选中标记、历史恢复、行程及网络失败回退，并生成真实截图。它会在底图不可用时失败，不能用旧轮廓回退冒充通过。输出默认 `/tmp/terra-real-map-qa/`，可通过 `ATLAS_QA_DIR` 更改；`ATLAS_URL`、`CHROME_PATH` 与 `PLAYWRIGHT_MODULE` 可指定已有支持环境。**本云环境没有执行成功该脚本，也没有产出截图或 Library 文件。**

仍须人工查看低缩放国界/城市可辨认度、高缩放街道/地标细节、画境融合、文化符号与密集标签、窄屏触摸和抽屉遮挡、真实键盘焦点。北京目标在脚本中，但中国境内网络访问未实测；地图内容和服务可用性以实际提供方及地区网络为准。

## 首轮本地结果（2026-11-20）

全部89项单元测试通过；129份 JS/CJS/MJS 语法检查通过，文档链接与目录统计检查通过。完整生产快照与基线逐项相同，包括主题、坐标、行程、阅读、作品、图片和原来源。现有 DOM 功能检查及新增的链接/回退状态检查通过。静态构建含56项哈希脚本/样式，release `f032d68155a42db3685a`；所有固定版本第三方文件原样复制。机器记录：[本地 QA JSON](../../qa/real-map-local-20261120.json)。以上均不包含真实地图渲染通过的结论。

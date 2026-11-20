# PR #60 首次浏览器失败：本地诊断

[地图资料](README.md) · [接入方案](real-basemap.md) · [候选与数据探针](basemap-options.md)

日期：2026-11-20。本次只读取已有产物、检查代码、保存本地 QA 改动并运行非浏览器检查；**未推送新提交，未再次启动 Actions，未合并或部署**。首次获准的实际浏览器运行已经用完；本轮改动没有获得真实浏览器验证。

## 已有证据

- 草稿 [PR #60](https://github.com/raeqi/world-travel-map/pull/60)，测试分支 `codex/real-basemap-20261120`。首跑远端 SHA `b26df488eb6ecc639425e85b8043e64a38eede16`；对应本地审阅提交 `4974b39ba421281a3ec3c5dbde252bcea71032b4`，二者 tree 都是 `51359da26e00639c2d5017777c7397b2785296e7`。
- [唯一实际浏览器运行](https://github.com/raeqi/world-travel-map/actions/runs/44767435980)失败；[原始 artifact](https://github.com/raeqi/world-travel-map/actions/runs/44767435980/artifacts/14646522018)包含 `qa-artifacts/real-map/results.json`、`failure.png`、数据探针与 release 清单。ZIP SHA256：`5101afa7263fbef7e1206ffe707f961325b5a88f6a06a81267642615c98cf4b3`；原始 PNG SHA256：`0a1e53c88a85f89888bd8cd73ebf69b8a5e39a9a4578c92df01ced0834a4a7ef`。
- 此前的 [workflow 验证失败](https://github.com/raeqi/world-travel-map/actions/runs/44766446296)没有分配浏览器 job，是 job-level `runner.temp` 上下文错误；已在首跑 SHA 修复。它不是第二次实际浏览器执行。
- 初始阿拉穆特 `wh-1770` 的原生标记断言通过。首次切换到阿尔托 `wh-1752` 时，选中 ID、经纬中心断言通过，随后 `queryRenderedFeatures` 找不到该 ID 的 circle，抛出 `Selected marker must actually be rendered`。它不是第一次阿拉穆特定位失败。
- 1440×1000 失败截图：阿尔托详情与 `61.60° N / 21.87° E` 坐标、VersaTiles 署名显示，**地图画布区域整体空白，底图与标记均未见**。JSON 只有 `fallback:false`、`provider:"versatiles"`、`baseTileSeen:true`，控制台数组为空。这个截面不能证明当时 WebGL/canvas/当前瓦片健康。
- 原始 `baseTileSeen` 是“曾有一个 vector tile 加载完成”的锁存；不是当前芬兰视窗的加载结果。6 个 HTTP/MVT/字库样本成功也不是芬兰当前视窗、全部字形或 GPU 绘制通过。
- 后续阿拉穆特返回/重复点击、历史恢复、全球/巴黎/北京街道、主题、路线和断网阶段未执行；390×844 未开始。`completed:[]` 是因为原脚本在整个视口检查末尾才添加报告，不代表初始阿拉穆特断言没有执行。

## 确认的缺陷与尚不能确定的原因

### 已确认：验收门槛可能早于新帧

原 `settled()` 只看 `!map.isMoving() && map.areTilesLoaded()`，然后采样一次。使用项目内固定版本 MapLibre 6.19.0 的**真实 `Map.prototype._update`、`loaded`、`areTilesLoaded` 方法**可在 Node 中复现：

1. 旧视窗 tile 缓存全部 loaded。
2. 调用与原生 `move`/`moveend` 相同的 `_update(false)`，新视窗 source 更新被排队，`_sourcesDirty=true`，触发下一次绘制。
3. 此时相机运动可以已结束，`areTilesLoaded()` 仍读到旧视窗并返回 true；真实 `loaded()` 返回 false。

首跑使用 reduced motion，相机跳转时间为 0；同时 `setData` 异步更新 GeoJSON。旧门槛因此不能证明新视窗和选中数据已经经过渲染更新。**这是确定的验收逻辑漏洞，尚不能据此认定它是截图整幅空白的唯一原因，更不能宣称产品空白已修复。**

独立 [Terra UI job](https://github.com/raeqi/world-travel-map/actions/runs/44767373598)也失败。定位脚本 `check-heritage-focus.cjs` 使用固定 1000ms 延迟；`check-terra-ui.cjs` 使用旧 Canvas 的 `camera===null`。原生 `realMapFocus()` 先把旧 camera 清空，再由 MapLibre `flyTo` 管理动画；这两种旧门槛都不代表原生加载/运动结束。本地把它们接到原生就绪检查，保留原坐标/详情/定位断言；**不能把此合同修复说成上述 job 的根因已由重跑证实**。

| 假设 | 现有独立检查与证据 | 仍缺少什么 |
| --- | --- | --- |
| 当前瓦片/字库失败 | 初始标记可查；独立6样本200；原JSON无请求时间线 | 切到阿尔托期间的 tile/glyph 请求、待处理状态、source事件及当前渲染底图计数 |
| WebGL context 丢失/渲染故障 | 初始原生标记可查；生产代码监听 contextlost 并回退；原结果未回退、控制台无记录 | 失败时既有 painter GL 的 `isContextLost`、绘图缓冲尺寸、renderer/version。没有 context 证据不能判定健康 |
| canvas 被换掉、移走、隐藏 | 全应用 jsdom 在两种宽度下执行实际 select 流程，原生 canvas 对象、父节点、连接状态、唯一 `#globe` 及 active class 保持；select 的详情更新未替换地图 | 真实 CSS、祖先 display/visibility/opacity、canvas CSS/缓冲尺寸与点下方 DOM。jsdom 不验证实际排版 |
| 相机/投影/遮挡 | 首跑阿尔托地理中心断言通过；坐标未改；原 padding/遮挡断言位于标记断言之后，未执行 | 同次采样的 projection/zoom/bearing/pitch/padding、projected 点、可见区域与 `elementFromPoint`。中心正确仍可能投影或遮挡异常 |
| GeoJSON/图层或断言选择 | 初始 Alamut 同一 source/circle 可查；原生 source 输入包含选中 ID 与原始坐标，两种宽度模型回归通过；选中 ring 不依赖字体碰撞 | 当前 source 是否就绪、选中输入、source query、每个实际图层 ID/visibility/filter/匹配数。未移除 circle 断言或改查无关图层 |

## 最小本地改动

没有修改生产 JS/CSS、地图数据、坐标、主题、路线、作品、图片或 URL 管理。

- [测试探针](../../scripts/map-render-probe.cjs)：自包含 Playwright 回调，**同一次同步 JS 采样**记录当前底图与选中 circle、每层计数、source输入/匹配/就绪、相机投影与留白、canvas 对象/父节点/唯一ID/祖先 CSS/尺寸、既有 WebGL context、选中点下方 DOM、fallback。只监听有界的 render/idle/source/error 日志，不强制 repaint，不发请求，不修改相机或链接。
- [真实底图验收](../../scripts/check-real-map-browser.cjs)：原超时保持 30s/20s，加入真实 `map.loaded()`；在选择前、选择后、就绪后和失败时保留截面及请求完成/失败/HTTP状态。**保留精确 ID 的 circle 渲染、原坐标和留白断言**，并增加当前真实矢量底图非空、canvas/GL健康与不被面板遮挡断言。`baseTileSeen` 不能代替当前底图。诊断值和随后截图可能属于不同绘制帧，因此判断以同步截面和原图分别为证，不能称截图与所有计数完全同帧。
- [定位旧检查](../../scripts/check-heritage-focus.cjs)、[整体 UI 旧检查](../../scripts/check-terra-ui.cjs)：原生加载/运动时不用旧 camera 或固定1s认定结束；离线 fallback 继续用原逻辑，不把 fallback 当真实底图验收通过。
- [DOM 检查](../../scripts/check-real-map-dom.cjs)：两种宽度都额外验证连续 select 不替换或移除原生 canvas，输入选中属性和原始坐标正确。
- [回归测试](../../tests/map-render-probe.test.cjs)：7项新增检查包含真实 MapLibre 就绪缺口；已 loaded 但 marker 不可见仍失败；仅旧 `baseTileSeen` 为真但当前底图空白仍失败；canvas隐藏/移除/遮挡及GL丢失分别失败；缺失证据保持 unknown。

这些改动修复验收条件并补足判因证据，**不冒充已经修复真实地图绘制问题**。`queryRenderedFeatures` 不等于 framebuffer 像素证明；即使将来所有断言通过，仍须查看截图确认地图实际画出且可读。

## 本地检查结果

- 全部103项单元测试通过，零失败（含7项新增）。
- 桌面1440×1000与窄屏390×844的离线/模拟原生 DOM/链接/收藏/刷新/前后退检查通过；它们不是浏览器或真实 CSS/GPU 验收。
- 完整生产 snapshot 与本地 `4974b39` 完全相同，所有主题、地点、坐标、路线、阅读、作品、图片及来源保留。
- JavaScript语法、文档与静态构建结果见[本轮机器记录](../../qa/real-map-diagnosis-20261120.json)。

未再次启动浏览器或 CI；没有新成功截图。旧浏览器的 socket/WebGL2 限制没有重试，也未使用用户本地电脑。本轮不刷新内容研究审计，不把103项测试等同于全站内容验收。

## 若后续再获准一次浏览器运行

当前仍需要一个受支持的真实 Chromium 环境；不要求部署、main 合并、付费或更换访问权限。需要在明确批准后把这批本地改动推到原测试分支，对**新 SHA** 单次执行现有 review-only 工作流：

1. 在1440×1000与390×844分别验证 Alamut直达→Aalto→Alamut→同点重复、刷新/前进后退及命名/收藏行程恢复；每次要求当前底图与精确选中点同时存在，记录同步诊断，保留真实截图。
2. 若再失败，先用失败同步截面的 `loaded/_sourcesDirty`、render/source事件、当前底图/每层匹配、GL、canvas与请求状态定位；不增加 sleep，不强制 repaint，不放宽断言。若已 loaded、健康可见canvas/GL而当前底图和 own circle 都为0，应继续研究投影/瓦片/相机更新，不能判“只有标记层”。若查询有要素但截图仍白，也须判为渲染未通过。
3. 成功后继续世界低缩放国界/国名/城市，巴黎与北京高缩放道路/地名，主题切换、键盘、画境、路线刷新，断网恢复原地球但保留路线/详情的各项强断言与截图。两种宽度任何未到达阶段明确标未测。
4. 原 Terra UI 浏览器检查另需针对新代码复验；如果复用同一获准 job，需先把该检查显式加入测试步骤。当前本地没有改工作流或承诺它自动运行。其他历史浏览器脚本仍可能假设旧 Canvas 的 `hits.box`、动画或缩放模型，本轮没有全部迁移；不能由独立 review job 推断全部旧浏览器检查通过。CI runner获取北京数据成功也不代表中国境内网络实测。

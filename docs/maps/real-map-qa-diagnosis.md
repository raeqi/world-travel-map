# PR #60 首次浏览器失败：本地诊断

> 上半部分保留本地 `7a4f417` 阶段的证据与边界；之后获准的实际续跑和具体修复见文末“续轮实测”。

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

## 续轮实测

获准后把本地 `7a4f417` 的同一代码 tree 推至现有测试分支：远端 `b76ca55cac78dfc596ac9f4988495852f3927414`，未改 main。第二次实际浏览器 [run 44773202345](https://github.com/raeqi/world-travel-map/actions/runs/44773202345) 已完成，整体仍失败；[artifact](https://github.com/raeqi/world-travel-map/actions/runs/44773202345/artifacts/14648975807) SHA256 为 `28ff8dd3d1125bfad1f3be411b724982e819cdcec635da6fae1fcdbbae95c898`。

- 103项单元测试、DOM、正式6请求探针和构建通过。
- 桌面直达阿拉穆特→阿尔托→阿拉穆特→同点重复、后退/前进/刷新和键盘缩放通过。阿尔托同次同步采样有2087个实际底图要素，`terra-points` 和 `terra-selected` 各匹配1个选中ID；GL未丢失，canvas连接、尺寸、CSS和点下方DOM均正确，没有失败请求。其余视窗转换后也都同时查到当前底图与精确标记。
- 记录捕捉到跳转后的短暂截面为底图0/标记0、source未完成；真正就绪后恢复。因此已有证据支持原首跑的验收时序漏洞；原来那张截图没有完整状态，不能倒推它唯一由该漏洞造成，也不能保证所有环境再无绘制故障。
- `1440-alamut.png` 实际能看到真实道路与选中标记，已人工查看。没有阿尔托截图（当时脚本只在返回/刷新后截阿拉穆特），后续加入其独立截图。
- 新失败与空白地图不同：`design.css` 有全局 `#art-toggle{display:none}` 及 `#scene-art{display:none!important}`，Playwright真实点击按钮超时。失败时底图仍有528要素、精确circle和健康GL。不能跳过此步骤或强制触发隐藏按钮来宣称通过。
- 本批在 `real-map.css` 中仅对 `.real-map-active` 恢复画境控件与低缩放装饰图层；街道级继续隐藏装饰，原事件、aria-pressed、地图和地点数据不变。DOM用实际 `design.css`/`real-map.css` 验证级联，并执行实际点击的开关状态回归。浏览器脚本增加低缩放的实际图层可见性、开关后不可见性和阿尔托独立截图。此具体修复的真实浏览器结果以之后的新SHA/run为准，不用前一run证明新代码。

此run尚未完成自然/公路/艺术主题、全球地名、巴黎/北京街道和失败回退；390×844尚未开始。仍不合并、不部署、不实测中国境内网络。

## 普通动画相机冲突与安装超时

`c194a76` 的独立 [run 44774700820](https://github.com/raeqi/world-travel-map/actions/runs/44774700820) 在安装阶段达到20分钟时限，被取消；浏览器未启动，未生成artifact。日志显示21.9MB系统依赖下载用时6分43秒，之后Chromium成功下载，而额外的61.2MB `fonts-noto-cjk` 包从16:41:56持续等待到16:54:31。没有手动取消，也没有把跳过的测试写成通过。此批将runner固定为项目其他浏览器检查使用的Ubuntu24.04，使用Playwright依赖已安装的CJK字体并通过 `fc-list :lang=zh` 强制检查，保留20分钟时限；不关闭中文覆盖检查或延长睡眠。

同一SHA的普通Terra UI检查实际上通过了62主题、桌面/窄屏导航与10张截图，但随后的heritage-focus在阿拉穆特出现默认文化地图中心的64.8585度偏差。几组旧投影检查也失败，不能称整套CI全绿。

本地使用**实际 `select()` 和 `frame()`** 重现了另一个确定的产品故障：普通650ms飞行尚未发出首个move事件时，`select()`遗留的Canvas缩放目标与当前native zoom不一致；较早执行的app RAF做旧缩放缓动，`drawRealMap()`因此以旧中心发 `jumpTo`，取消native flight。减少动态效果使飞行同步完成，所以之前的零时长测试没有暴露它。

最小生产修复只在 `realMapFocus()` 交给 `flyTo` 前读回当前native相机并同步旧共享缩放目标；没有全局禁用旧动画，也不破坏离线地球或“返回主题”缓动。回归先在旧实现失败（发生1次中断），修复后桌面/窄屏模型均没有中断，原生中间/最终move状态和离线缩放仍正确。后续浏览器检查必须从主题全图以**普通动画真实侧栏点击**阿拉穆特→阿尔托→阿拉穆特→重复，再执行既有减少动态效果、历史/街道/回退流程。

旧文化路线测试仍把MapLibre缩放换算后的数值套进Canvas正射投影，产生虚假像素越界。此批仅在native激活时改用实际 `map.project`、当前底图和精确渲染circle IDs来验证全部路线点；Canvas回退保留原半球/像素断言，选中点保留强渲染/GL/canvas/遮挡断言。生产脚本指纹只刷新 `real-map.js`，研究数据与人工审核覆盖不变。以上新修复的真实浏览器状态仍以新SHA/run为准。

## 普通动画实测与公开路线数据接口

[run 44779255972](https://github.com/raeqi/world-travel-map/actions/runs/44779255972)，SHA `392a16ae9af9086608180e92882f055ef3d4583b`：安装已恢复，108项测试、DOM、探针、构建通过。桌面普通动画的真实侧栏点击4步、减少动态效果下的定位/重复/历史/刷新/键盘、画境真实开关与低缩放显示、自然/NC500/艺术主题切换、全球边界/国名/城市、巴黎/北京实际道路和标签均已执行通过，产出9张成功阶段截图。人工查看了阿尔托实际标记与道路、三维全球视图和北京街道，确认并非只查到了缓存要素。全球截图也暴露主题点名过密；本批把主题地点名称推迟到4级出现，保留全部circle/路线/可点击地点，使全球国名和主要城市更易辨认。4级以上地点名称仍保留。

本run整体失败于后面的路线数据读取：脚本错误假设MapLibre私有 `_data.features` 存在；实际6.19使用 `{geojson:...}` / `{updateable:Map...}`。失败截面显示source已加载，公开serialize有7条边，source query也有7条。修复使用固定版本公开 `GeoJSONSource.getData()`，并额外逐项比对原路线from/to端点，未减少边数断言。新增回归直接调用实际固定版本getData，覆盖两种内部表示；不修改生产路线。artifact SHA256：`95f5ee66d028c34cf51fbd52fe09e41c8dfd443771ec3bc04941750dfbf80c7a`，见[实际产物](https://github.com/raeqi/world-travel-map/actions/runs/44779255972/artifacts/14651102018)。路线刷新/失败回退和窄屏仍未执行，不能把此前成功步骤当完整验收。

## 桌面完整通过与窄屏抽屉操作

[run 44780964406](https://github.com/raeqi/world-travel-map/actions/runs/44780964406)，SHA `1d2b560966faf6b8a20f749a8aede225bbd22a62`：109项测试、DOM、探针、构建通过；1440×1000 **整段浏览器验收完成**。世界视图有29个边界要素、11个国名标签、59个城市标签，主题地点名称为0（地点circle保留）。巴黎有1320个道路要素/7541个建筑/1655个符号标签，北京有519个道路要素/3198个建筑/286个符号标签。8站Italy方案的7条边、全部from/to端点相等，当前3条线段实际可查；刷新恢复方案和选中点、故意中断底图服务后保留详情与路线并恢复旧地球全部通过。

窄屏390×844已开始，普通动画的首个阿拉穆特定位通过；脚本随后没有关闭现有详情抽屉，就尝试点击它下面的阿尔托列表项。真实点击被“地点资料”summary拦截，不是坐标/底图/标记失败。这是测试没有遵循抽屉的操作路径：下一批仅在窄屏先点击现有关闭详情按钮，再查找并点击下一地点，不使用force、不点击被挡控件，后续全部地图强断言保留。生产抽屉和布局不因测试而改动。

[artifact](https://github.com/raeqi/world-travel-map/actions/runs/44780964406/artifacts/14653045684) SHA256：`bf5649a5519688456518970582a34aa1f516584d3940dee9f4338baeb559a401`，包含完整桌面report、10张桌面成功阶段截图和窄屏失败截图。该run整体仍失败，不能称窄屏整段验收完成；接续状态以新的test-branch SHA/run为准。

## 窄屏署名与画境控件

人工查看上述窄屏实际截图发现另一个真实布局缺陷：详情展开时，底图署名移到地图顶部52px，而新增画境按钮顶部48px，两者重叠，遮住按钮文字。本批仅把窄屏画境按钮移到地图顶部82px、与缩放工具所在行对齐，保留署名和原抽屉。浏览器用两个实际DOM矩形强制检查交集面积为0，并继续真实点击切换；不靠隐藏署名或强制点击绕开遮挡。此修复仍需以新SHA的实际窄屏截图和强断言确认。

续跑 [44782280291](https://github.com/raeqi/world-travel-map/actions/runs/44782280291) 的实际日志随后确认：窄屏真实点击 `#art-toggle` 被 `.basemap-attribution` 拦截，和人工截图发现一致。修复后的浏览器报告同时保存两个控件的实际矩形与交集面积，供交付核查。该失败没有被标成通过。

## 专项通过后的人工回退截图复查

[run 44783459874](https://github.com/raeqi/world-travel-map/actions/runs/44783459874)，SHA `f578c6497915424565ab0fb0314db109e0a3f71b`：109项测试及1440×1000/390×844整段真实浏览器验收均通过。两种视口的普通/减少动态效果定位、历史、画境、世界标签、巴黎/北京街道、主题、路线恢复与服务失败回退都完成；画境/署名实际矩形交集均为0。实际artifact SHA256：`da5156629d67a09d5833db72b9c2abd92131cbe4ed4413d9389565187831c75b`，见[23份产物](https://github.com/raeqi/world-travel-map/actions/runs/44783459874/artifacts/14654050130)。人工已查看全球视图、窄屏阿尔托、北京街道和回退截图。

人工复查发现原回退自动检查仍不够：它只要求选中点存在于旧Canvas命中表，窄屏失败提示条实际遮住了点的位置。此批仅将窄屏、详情展开、非native状态的提示条移到地图右上方，避开旧地图选中点、返回按钮和缩放工具，保留提示/重试和路线。浏览器新增实际选中命中坐标的 `elementFromPoint` 检查并保留结果，要求顶部元素就是旧Canvas，不以命中表存在冒充未遮挡。接续验收用新SHA验证这一实际布局修复。

## 保留路线的后续自动检查

回退提示修复后的 [run 44785387162](https://github.com/raeqi/world-travel-map/actions/runs/44785387162)，SHA `40d7af7e692a60c546c9e1c4f9f00484ee67ec1a`，已再次通过完整两视口专项验收，包括新增的回退点 `elementFromPoint` 未遮挡断言。其他自动套件暴露单站 `spain-prado-sorolla` 概览点未渲染，以及剩余旧测试使用即时旧缩放目标/Canvas正射像素的问题；没有据专项通过宣称全部CI全绿。

本批在native路线概览开始前立即发布当前路线数据、同步共享相机；零面积的单地点/同坐标概览显式飞到该点14级，不依赖退化bounds。此单站问题的精确GPU状态原日志不完整，未把“零面积bounds”直接冒充唯一已证根因；新增专项会实际打开保留的Prado单站和Dalí海岸方案，逐点要求当前basemap、原生投影范围及精确circle全部可查，并截图。旧自然路线检查先等native相机就绪再检验原有局部缩放要求；其余短主题改用实际投影与渲染ID，离线旧断言保持。新增单站回归、完整数据/审核覆盖保留检查继续执行。

## 单站范围的精确浮点根因

本地对**实际** `regional-prado` 坐标 `[-3.6922,40.4138]` 调用原范围函数，得到西界 `-3.692199999999957`、东界 `-3.692200000000014`，宽度 `-5.684341886080802e-14`。此前代表性测试坐标`-3.692`没有触发这一舍入路径；替换为实际坐标后，单站显式fly回归在修复前明确失败。这解释了零面积判断未命中，并向native fitting提交倒置范围的问题。

本批不修改地点坐标。最大间隔算法直接选择已排序数组中的原值作起点，终点从相对该起点展开的原值取最大值，不再用“start+360-gap”恢复端点，避免加减消差造成负宽度。新增实际Prado、重复点、极近点的非负/非全球范围回归；现有日期变更线、重合/对跖线及全部原路线边检查继续保留。

# 无 WebGL 的独立 2D 街道地图

[地图资料](README.md) · [既有真实地球与诊断](real-map-qa-diagnosis.md)

## 原因与这一版的边界

基线为 main `0d0b22a32ee8c7cb7e996bbe5c50a4c29bd56093`。既有真实地图是 MapLibre 6.19 的 WebGL 2 引擎；没有该对象、无法取得上下文或图形上下文失效时，只能退回原 Canvas 简图。此前支持的软件 WebGL CI 通过，不等于无 WebGL 环境也能显示真实街道。

这一版新增固定 Leaflet 1.9.4 的独立 DOM/SVG/图片路径。配置了已批准的 MapTiler 栅格来源后，专题页优先使用 2D；保留 3D 地球切换，以及原来的点位、展开阅读、收藏、路线、URL 片段、日期变更线与离线 Canvas。2D 不导入 MapLibre，也不探测 WebGL；移动、缩放和相机位置与既有应用状态同步。主题地点网络仍不增加虚构的旅行边。

**当前没有批准可用的 MapTiler key；默认配置不包含凭据，因此不会凭空获得真实 2D 街道图。** 未配置时仍保留原来可用的 3D/简图路径，2D 按钮显示不可用。本分支是可接入来源的修复实现，不能称为当前线上加载问题已经解决。

## 图源、许可与配置

- 只接文档化的 MapTiler 标准 XYZ：`https://api.maptiler.com/maps/{mapId}/256/{z}/{x}/{y}.png`。当前默认样式标识为 `streets-v4`；没有公开 demo key、任意外部 URL、OSM 标准公共瓦片默认值或自动跨服务跳转。[官方 API](https://docs.maptiler.com/cloud/api/maps/)
- 先验证 TileJSON 的鉴权、HTTP 成功及地图结构；401/403、错误 JSON、非地图响应会被拒绝。瓦片必须是实际解码的 256×256 图片，且与地图可见区域相交，才能将引擎标记为就绪；`load` 本身、屏外成功图或全部失败不算通过。图片成功仍不代表已人工确认真实道路/地名。
- 显示 MapTiler 与 OpenStreetMap 署名。浏览器直接请求服务，不做代理、不批量下载、不添加服务端/离线持久缓存。普通浏览器缓存遵从 HTTP 规则。部署方需确认用途符合其账户与订阅；免费计划不能泛称适用于商业生产。[Cloud 条款](https://www.maptiler.com/terms/cloud/)
- Leaflet 为 BSD-2-Clause，固定文件、来源和逐文件摘要在 [vendor 清单](../../assets/vendor/leaflet-1.9.4/source.json) 与 [许可](../../assets/vendor/leaflet-1.9.4/LICENSE.txt)。运行时文件随项目提供，不依赖第三方 CDN。[稳定版参考](https://leafletjs.com/reference-1.9.4.html)

操作方取得**获授权、限定站点 origin 的浏览器公开 key**后，在仓库外提供 `*.raster.local.json`：

```json
{
  "provider": "maptiler",
  "mapId": "streets-v4",
  "apiKey": "YOUR_APPROVED_BROWSER_KEY"
}
```

```sh
TERRA_RASTER_CONFIG_FILE=/absolute/path/approved.raster.local.json node scripts/build-site.cjs
```

构建只把该配置写入输出的版本化 `raster-runtime.js` 与兼容路径；不修改源文件。不要提供服务端秘密。浏览器公开 key 会出现在用户请求中，必须由部署方限制允许来源，不能把它当作隐藏的凭据。[官方 key 配置](https://docs.maptiler.com/guides/developer/credentials/api-key/) 本轮没有创建账户、查看秘密、开计费或填入实际 key，也没有修改发布工作流去注入凭据。

## 日志与失败退路

应用诊断只有 `source-auth`、`source-invalid`、`tile-load-failed`、`tiles-timeout` 等受控错误码；不保存原始异常、瓦片 URL、key 或 session token。TileJSON 被拒、瓦片全失败、初始/后续视图超时后移除栅格引擎，保留原图、选择、行程和详情，并可主动重试。2D 与 3D 由同一应用状态切换，URL 仍完全归 `flow.js` 管理。

## 验证口径

1. `tests/raster-config.test.cjs`：无凭据/错误服务拒绝、正确 XYZ 构造、401/403/错误响应、诊断去敏、固定依赖摘要、外部配置只进入构建输出。
2. `scripts/check-raster-dom.cjs`：实际 Leaflet 1.9.4 与完整应用 DOM；布局和图片完成事件是夹具。北京故宫、京都遗产、巴黎塞纳河、哥伦比亚马尔克斯专题，桌面与390宽，各自测试“无 WebGL 2 对象”和“有对象但取不到上下文”；点选、留白、平移、路线恢复与收藏，以及鉴权/瓦片全失败。它不是像素或真实街道验收。
3. `scripts/check-raster-browser.cjs`：实际 Chromium 布局、拖拽和点击；拦截服务请求，返回明确写有 `SYNTHETIC TEST TILE` 的自制测试图。不会调用真实 MapTiler 服务。覆盖同样四地/两视口/两种故障，另有路线历史、刷新、3D退路切回2D和失败截图。即使通过，也只能证明独立渲染/交互，不能证明当地道路或用户网络。
4. [不部署的分支 CI](../../.github/workflows/raster-map-review.yml) 只有 `contents: read`，无 Pages 权限、部署或推送步骤；PR 自动运行并保存夹具截图/JSON。现有 main 发布工作流未修改。

```sh
node --test tests/*.test.cjs
node scripts/check-docs.cjs
node scripts/build-site.cjs
# 需要测试用 jsdom / Playwright，运行时不需要 npm
node scripts/check-raster-dom.cjs
node scripts/run-browser-suite.cjs check-raster-browser.cjs
```

当前云容器的 Chromium 启动因 `socket() Operation not permitted` 被阻止；没有绕过该限制。浏览器夹具的实际结果以草稿 PR 对应精确 SHA 的 CI 为准。

## 仍待接入和实测

- 由用户/部署方提供批准可用、用途合规并限制 origin 的 key；没有它，不宣称真实街道源已接通。
- 获准后在北京、京都、巴黎、哥伦比亚的街道级实瓦片中人工确认道路/地名，排除鉴权提示图；不得用夹具、TileJSON 成功或解码尺寸替代。
- 中国境内网络、用户实际网络、实体手机、真实触摸和不同设备性能均未验证。
- 本轮可提交独立分支和草稿 PR；不合并 main、不更新线上。

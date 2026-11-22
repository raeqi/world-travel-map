# 无 WebGL 真实栅格人工审查：2026-11-22

[地图资料](README.md) · [2D 实现及接入条件](raster-compatibility.md)

## 结论与未完成项

PR #61 的 `770ac33ed0bc615b9c5a714aab4f67cbbec9e27d` 在云浏览器中通过了**真实 OSM 巴黎街区**的少量人工交互。两种故障注入分别令 WebGL 2 全局对象不存在、令对象存在但 canvas 无法取得 WebGL 上下文。两次独立 2D 加载均显示真实道路、地名、应用点位和原有详情；2D 阶段 WebGL 调用数均为 0。

这证明独立 Leaflet 引擎能够展示真实栅格，并非只会显示合成图片。**它没有验证 MapTiler 实瓦片，也没有配置可长期上线的默认图源。** 本轮不合并、不部署、不注册供应商账户、不更改账单或 GitHub 设置。原有 3D/离线默认行为未变。

本项目云端进程未设置地图配置文件变量或 MapTiler 变量，项目未发现 `*.raster.local.json`，源码 runtime 的 key 为空。只记录存在性；未查看 GitHub secrets 或其他项目凭据。

## 实际执行与可复核范围

通过 Sites 的受支持 managed preview 启动隔离本地副本；不是发布到公共站点。先打开无瓦片的说明页，再分别点击两个开始按钮。只查看巴黎同一片区域，未循环访问城市、批量下载、预取离线区域或把 OSM 接入自动化浏览器 CI。浏览器原生图片请求使用默认缓存，不增加 no-cache、代理或伪装 User-Agent；页面设置 `strict-origin-when-cross-origin` referrer policy。

临时适配器替换图源配置、URL、元数据预检与署名，复用 PR 的实际 Leaflet 引擎、原始地点和交互。由于 OSM 没有对应 TileJSON，适配器直接通过元数据阶段；**不能用这一点证明 MapTiler 鉴权/元数据有效**。为限制访问，预览固定巴黎初始中心、缩放 14–16，并将 Leaflet `keepBuffer` 设为 0。生产 provider allowlist 未扩展，临时标识不是真实 key。

| 人工场景 | 观察结果 |
| --- | --- |
| WebGL 2 全局对象不存在 | 2D ready；20 张当前可见、成功解码的 256×256 瓦片；WebGL 调用 0；`wh-600` 选中及详情可见 |
| 对象存在、canvas 上下文不可用 | 同上；关闭详情后点击地图上的原 SVG 标记，塞纳河详情重新打开 |
| 两种模式的真实图像 | 肉眼可辨 Quai d’Orsay、Pont de la Concorde、Opéra、塞纳河及街道路网；不是鉴权提示图片 |
| 显式切换 3D | WebGL 调用从 0 变为 1，显示离线地图和失败提示，塞纳河详情保留 |
| 再切回 2D | 再次显示 20 张当前可见解码瓦片，`wh-600` 和详情保留 |
| 署名 | 只显示 OpenStreetMap contributors 链接；没有错误加上 MapTiler logo |

20 是同一帧可见解码图片数，**不是网络请求总数**；未抓取瓦片请求头、缓存命中或全局服务可用性统计。缓存/referrer 条件根据页面配置与原生浏览器行为说明，未冒充报文级实测。

截图已通过云浏览器工具展示并保留最终审查标签页。浏览器工具运行区无法写入项目文件系统（绝对路径 ENOENT，文件写入 EROFS），因此本轮**没有持久截图文件、Library ID 或 GitHub 截图 artifact**；旧 CI 的 28 张截图仍是合成瓦片/中性署名布局，不能冒充本次实地图证据。预览 URL 是云端本地地址，不能当公网交付网址。

## 无密钥候选与上线条件

| 候选 | 官方规则核查 | 本轮判断 |
| --- | --- | --- |
| [OSM 标准瓦片](https://operations.osmfoundation.org/policies/tiles/) | 要求可见署名、有效 referrer、浏览器缓存；禁止批量/预取和默认 no-cache；best effort，无 SLA，可撤回服务 | 仅进行了上述少量交互。未评估未来流量、运营联系与长期依赖，不设为生产默认 |
| [CARTO](https://carto.com/basemaps/) | 当前官方栅格/矢量文档均使用 key；申请流程涉及邮箱，使用范围和额度按其条款 | 未申请 key；不以旧无 key URL 的可达性代替当前授权 |
| [Stadia](https://docs.stadiamaps.com/authentication/) | localhost 开发可免 key；生产域名需要认证配置 | 开发例外不能当作生产授权；未创建账户或改域名设置 |
| [Geofabrik](https://www.geofabrik.de/maps/rastertiles.html) | 正式栅格服务通过客户 key 和服务计划提供 | 未开户、购买或使用未经授权的 key |
| [OSM Deutschland](https://openstreetmap.de/nutzen/dienste-osm-de/) | 志愿服务，无持续可用保证；商业使用有额外限制 | 未将另一公众服务当作未经评估的默认退路 |

仍需维护者明确一种正式来源与用途：获批准且限制 origin 的 MapTiler/CARTO key、适用的供应商域名认证，或单独完成低流量公众图源的运营/使用政策评估及生产适配。未得到授权前不申请账户、不代填邮箱、不改线上。自托管也是选项，但需要真实的运行与存储方案，本轮未凭空开通服务。

## 重现方式：仅人工、仅本地

源码准备器只生成文件，**不请求任何瓦片**；CLI 在 `CI` 环境拒绝执行。输出必须是仓库外不存在的新目录，不覆盖现有工作。

```sh
node scripts/prepare-manual-raster-review.cjs /workspace/scratch/new-manual-review
sites-preview start /workspace/scratch/new-manual-review
```

在普通云浏览器打开 CLI 实际返回的地址，阅读说明，手动选择一个故障模式。不要把页面交给浏览器循环测试，不要扩大下载范围，不要关闭缓存；结束后停止预览。其他机器可用普通静态 HTTP 服务访问生成的 `dist`。此目录不是发布包，不允许作为生产版本上线。

准备器的离线单元测试只检验 CI 拒绝、默认配置不变、说明页显式开启及输出隔离，不访问 OSM。`770ac33` 的原 10 组自动 CI 已全部成功；它们仍主要证明合成夹具、数据和现有回归。新增提交的 CI 状态应以 PR 当前 Actions 为准。

尚未实测：MapTiler 真实鉴权/瓦片、真实栅格 390 窄屏、北京/京都/哥伦比亚的真实栅格、中国境内及用户网络，以及正式发布后的实际打包上传/公网校验。因此不能将 PR 宣称为完整上线验收结束。

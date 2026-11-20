# 真实底图：候选核查与单次验收

> 历史准备/实现记录；之后获准的测试分支与首次实际浏览器运行已执行且失败。最新状态见 [PR #60 首跑失败诊断](real-map-qa-diagnosis.md)。本页原先的“未推送/未运行”描述仅对应当时阶段。

[地图资料](README.md) · [首轮实现](real-basemap.md) · [数据层实测](../../qa/basemap-source-probe-20261120.json)

本轮从本地提交 `a78e498` 继续。**只有本地改动；没有推送分支、PR、Actions 运行、合并或上线。** 不重试已被拒绝的 OpenFreeMap 或本地浏览器路径，不使用用户的 Mac 或其他电脑。

## 已核查的候选

| 候选 | 官方依据与许可 | 实测/选择 |
| --- | --- | --- |
| VersaTiles | [公众服务规则](https://docs.versatiles.org/guides/use_tiles_versatiles_org)、[OSM 数据许可](https://docs.versatiles.org/basics/tilesets.html)。官方公众示例服务允许使用，不保证可用性，高流量建议自托管或自有 CDN；须遵守缓存与429等待要求。 | 本轮独立采样：四个矢量瓦片与两个字库范围均200/CORS可用，MVT解码有真实国名、街道和建筑。选为本地审阅默认；不能称为有 SLA 的生产保障。 |
| Natural Earth 5.1.2 | [官方公有领域条款](https://www.naturalearthdata.com/about/terms-of-use/)；作者维护的[固定版本数据](https://github.com/nvkelso/natural-earth-vector/tree/v5.1.2)。 | 243个城市点约46KB，本地固定文件，补足低缩放主要城市标注。只作地图背景，不加入旅行点位目录。 |
| Protomaps 固定 PMTiles | [下载规则](https://docs.protomaps.com/basemaps/downloads)：全球道路/地名数据可下载自托管，提供构建校验值，要求OSM署名；不鼓励热链下载桶。 | 合规的长期自托管候选，全球0–15级约120GB。未下载全量，未配置新存储、付费账号或热链为默认。不能把官方说明当作本项目的服务实测。 |
| CARTO | [当前条款](https://www.carto.com/legal/basemap-terms/)要求有效API key并按用途设请求限额。 | 仅文档核查；未申请账号/key、未接入。不把历史无key端点误当无条件可用服务。 |
| OpenFreeMap | [官方入口](https://openfreemap.org/quick_start/) | 保留首轮403/1010证据，本轮没有重试或换路径访问；当前运行配置不会自动尝试它。 |

这是小样本工程核查，不是法律意见或服务SLA承诺。中国境内网络尚未实测；“北京瓦片可从本云环境获取”不代表境内访问保证。

## 固定资源与实际显示内容

- `basemap-providers.js` 管理经过审核的来源；不接受任意外部URL、不读取或写入导航hash、不自动跨服务重试。
- MapLibre 6.19.0继续用原生globe；`hash:false`。主题、路线边、地点、收藏、画境与原Canvas回退保持。没有修改原2030个旅行地点、其坐标、阅读、作品、照片或旧链接。
- [VersaTiles资源清单](../../assets/basemaps/versatiles-9.1.0/source.json)固定官方9.1.0样式和同版本sprites，下载包SHA256与官方发布摘要一致。样式MIT、sprites CC0；修改范围逐项记录。去掉可选beta landcover源及9层，只保留稳定OSM矢量源；没有借用其图像再省略ESA署名。
- 固定样式的sprites在本地；资源URL按文档根目录解析，兼容GitHub Pages子目录。字体仍由VersaTiles在线提供，字体和瓦片更新不由本仓库锁定；需要完全固定数据时应另行自托管。
- OSM低级瓦片含国界/国名，城市标注在更高缩放出现。因此增加[Natural Earth清单](../../assets/basemaps/natural-earth-5.1.2/source.json)中的243个城市背景点，低于4级展示，随后交接OSM街道/地名；图层参与标签碰撞，最终密度仍需真实截图人工检查。
- 署名显示VersaTiles、©OpenStreetMap contributors与Natural Earth。路线仍为原有示意，不变成道路导航；高缩放是实际矢量街道和地标数据，未将原国界轮廓冒充街道。

## 实测证据与边界

[机器记录](../../qa/basemap-source-probe-20261120.json)保留URL、时间、HTTP状态、CORS、ETag、缓存期限、SHA256及MVT层计数。最终一次探针只有6个请求，不抓取全城或离线预下载：

- 0级全球瓦片：边界/海洋；没有声称此级原生提供城市文字。
- 2级区域瓦片：边界与10条国名标签；这是 `boundary_labels`，与城市的 `place_labels` 分开核验。
- 巴黎14级样本：306条街道要素、5106个建筑；北京14级样本：91条街道要素、1458个建筑，含“北京市”“外金水桥”等地名。
- 拉丁字库0–255和CJK字库19968–20223均200且有内容；没有据此宣称全球全部字符或渲染字形验收完成。

这些是**HTTP与数据解码通过，非WebGL像素或整城覆盖验收**。本云端可打开独立服务的官方演示页（HTTP200、没有失败请求），但页面空白；控制台明确报 `GPUInitializationError: WebGL2 is required to display this map`。没有调整该云浏览器参数或换回用户电脑，也没有把空白页当本项目截图。此前本地Chromium socket限制未重试。`sites-preview status`只读确认预览已停止，没有重复启动被拒绝的预览。

## 准备好的单次 GitHub Actions

[real-map-review.yml](../../.github/workflows/real-map-review.yml)只有 `contents: read` 权限，**没有部署步骤、Pages权限或Git推送**。默认不随push运行：

1. 获得后续推分支许可后，可在该分支的PR添加 `run-real-map-qa` 标签触发一次；不需要先合并产品功能。若之后有新提交，应重新触发，旧run不证明新SHA。
2. `workflow_dispatch`提供手动入口；[GitHub规定](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)该工作流必须先在默认分支登记，才能从Actions选择分支运行。当前仅本地文件，不能假称已可在GitHub点击。
3. 当前没创建PR或标签、没有触发Actions；GitHub允许执行情况、实际浏览器和正式瓦片结果仍待运行。

CI准备运行：全部单元测试/文档检查/DOM状态；官方6请求探针；构建实际`_site`；仅从构建目录启动同一runner内HTTP服务；Playwright 1.65.1 Chromium。为无GPU runner显式选用[Chromium支持的SwANGLE测试模式](https://github.com/chromium/chromium/blob/main/docs/gpu/swiftshader.md)，只供隔离CI验收，记录实际WebGL版本和renderer；没有在当前受限云浏览器中尝试。安装CJK字体以便检查中文UI。它不是实体手机或硬件GPU性能测试。

浏览器脚本覆盖1440×1000、390×844真实CSS视口：globe投影、全球国界/国名/城市标注、巴黎/北京街道和标签、阿拉穆特→阿尔托→阿拉穆特及重复点击、实际渲染的选中标记和面板外留白、直达/刷新/前进后退、推荐行程恢复、自然/NC500/梵高主题切换、键盘缩放、画境开关、断网后的原地球/路线/选中状态。底图不成功则失败，不拿mock或离线轮廓充数。

成功/失败都上传测试artifact，包含探针、结果JSON、release清单、已生成的真实截图及失败截图/控制台。文件默认`qa-artifacts/`，不会写入GitHub Pages或Library，也没有承诺预先存在的Library ID。

同时加固[原Pages工作流](../../.github/workflows/pages.yml)：只有main才可上传Pages产物、部署、核验线上。分支手动运行旧工作流也不会部署；main原先发布能力保留。本轮没有执行该工作流。

## 本地复现

```sh
node --test tests/*.test.cjs
node scripts/check-docs.cjs
node scripts/build-site.cjs
# 可选测试依赖装在独立目录后：
node scripts/check-real-map-dom.cjs
node scripts/check-basemap-source.cjs qa-artifacts/source-probe.json
# 只在具备受支持浏览器的环境执行；当前云端未执行：
node scripts/run-real-map-review.cjs
```

`NODE_PATH`指向安装了jsdom、@mapbox/vector-tile和pbf的测试工具目录；无运行时npm依赖或API key。完整浏览器验收需Playwright，workflow给出固定版本。实际完整结果以运行记录及其SHA为准。

## 本轮本地结果

95项单元测试、133份JS/CJS/MJS语法检查、两份workflow YAML解析、文档校验与DOM导航回归通过。完整生产快照与`a78e498`逐项相同。构建release `4779d12a4bc561d0cf56`、57项哈希脚本/样式，固定素材与许可文件原样进入构建。以上不包含真实WebGL验收。

[续轮QA记录](../../qa/basemap-followup-20261120.json)分别标记数据探针通过、云浏览器WebGL2不支持、CI已准备但未执行，以及剩余实机/网络范围；[首轮QA](../../qa/real-map-local-20261120.json)保留当时状态，不追改历史记录。没有真实应用截图或Library ID。

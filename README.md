# 经纬万象 · Terra Mosaic

探索自然与人共同塑造的世界。发现山川、海岸、城市、建筑与文化景观，把值得亲自去看的地方组成可探索的路线。

**[打开线上地图](https://raeqi.github.io/world-travel-map/)** · [使用指南](docs/product-guide.md) · [文档总览](docs/README.md) · [项目检查与发布](docs/development.md)

<!-- catalogue-stats:start -->
当前内容：**62个可见地图入口 · 2,030个地点记录**。全量注册包括 **356个不同方案ID**（含旧主题兼容方案），在135个内部主题中形成382条主题/方案关联记录；首页按推荐规则去重展示。[完整目录与计数口径](docs/reference/themes.md)由实际生产数据生成。
<!-- catalogue-stats:end -->

## 可以做什么

<a id="怎么使用"></a>
<a id="主题地图"></a>

- 按主题、地域、地点和文化兴趣查找地图与行程，在自然景观和人文创造之间探索。
- 拖拽地球，筛选地点，阅读有来源的介绍、相关作品与人物背景；艺术作品分别标明描绘地与现藏机构。
- 预览路线并逐站阅读，把地点或整条行程加入“我的旅程”。收藏保存在当前浏览器，不需要账户。
- 分享当前主题、地点和路线的链接，支持刷新与前进、后退；桌面侧栏可拖动调宽，手机使用抽屉详情。

地图连线和距离用于理解地点关系，距离是球面直线；历史走廊、文化网络与当代探访建议分别说明。交通、开放安排和实际通行需另行确认，产品不提供实时导航。

## 本地运行

<a id="快速开始"></a>

需要 Python 3。在仓库根目录运行：

```sh
python3 -m http.server 8000
```

打开 [http://localhost:8000](http://localhost:8000)。本地浏览无需安装前端依赖或地图 API 密钥；请通过 HTTP 访问，避免直接双击 HTML 导致数据读取受限。

## 数据与目录

<a id="数据来源与边界"></a>
<a id="开发与文件结构"></a>

| 目录 / 文件 | 内容 |
| --- | --- |
| [index.html](index.html)、根目录 JS / CSS | 静态应用入口、按顺序注册的数据与交互；本轮保持路径与加载顺序 |
| [assets/](assets/) | 照片、画作、文献和视觉资源；各素材包分别记录来源与许可 |
| [data/](data/) | 官方名录快照、主题策划、内容研究包与坐标补充 |
| [docs/](docs/README.md) | 产品说明、开发指南、主题研究、设计规范、内容质量与历史记录 |
| [scripts/](scripts/) / [tests/](tests/) | 数据生成、审计、构建、单元测试和浏览器检查 |
| [qa/](qa/) | 可核查的审计数据、覆盖清单和历史证据；生成物不等于人工事实验收 |
| [.github/workflows/](.github/workflows/) | CI、定向浏览器检查、GitHub Pages 发布和公网资产核验 |

数据来源以 UNESCO、NPS 及各地点的机构资料为主，名录快照不等于实时数据。图片逐文件适用各自许可，不把整个项目视为同一图像授权。详见[数据与素材维护](docs/data-and-media.md)。

地点信息仍在持续研究；当前覆盖与未验收清单统一看[内容质量报告](docs/content-quality/README.md)，各批说明保留当时的范围，不作为全站已经核实的声明。

## 开发与维护

<a id="运行检查"></a>
<a id="已完成的验证与已知限制"></a>

使用 Node.js 22（CI 使用版本）。无需安装 npm 依赖即可运行：

```sh
node scripts/check-docs.cjs
node --test tests/*.test.cjs
node scripts/build-site.cjs
```

构建输出为 `_site/`；它不需要提交。浏览器依赖、语法检查、各类数据更新和定向检查命令见[开发指南](docs/development.md)。

推送到 `main` 会触发 GitHub Actions：测试通过后构建并部署 GitHub Pages，再核验公网首页引用和全部版本化脚本、样式的真实字节。PR 会运行测试和构建，合并前不会部署生产。需要仓库的 Pages 已配置为 GitHub Actions；当前仓库已启用。

| 要维护的内容 | 入口 |
| --- | --- |
| 当前主题、地点与方案统计 | [数据目录](docs/reference/themes.md)、[可复核统计](docs/reference/catalogue.json) |
| 点位信息、来源与未验收范围 | [内容质量](docs/content-quality/README.md)、[研究批次](docs/content-quality/batches/README.md) |
| 图片、画作、作者与许可 | [数据与素材](docs/data-and-media.md) |
| 主题整合、原方案和旧链接 | [主题审查记录](docs/reviews/README.md) |
| 品牌、排版与主题视觉 | [设计规范](docs/design/README.md) |
| 当前测试依据与历史验证 | [验证说明](docs/validation/README.md) |

旧版根目录说明保留为兼容入口，实际文档统一在 `docs/` 维护。整理前的叙述与统计保存在[原 README 历史快照](docs/archive/readme-2026-11-18.md)；历史文件中的阶段数字不代表当前版本。

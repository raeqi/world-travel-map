# 数据与素材维护

[文档总览](README.md) · [开发指南](development.md)

## 生产数据从哪里来

页面按 [index.html](../index.html) 的 `defer` 脚本顺序注册经典脚本，不使用模块打包；多个文件共享词法变量，改变顺序可能改变主题、阅读与行程。根目录 JS / CSS 与全部素材路径本轮保持不动。

| 数据层 | 主要位置 |
| --- | --- |
| UNESCO、NPS 与三峡基础名录 | [catalog.js](../catalog.js)、[data/](../data/)；生成入口 [build_catalog.py](../scripts/build_catalog.py) |
| 古道与历史旅行 | [tea.js](../tea.js)、[historical.js](../historical.js)、[walking.js](../walking.js)、[journeys.js](../journeys.js) |
| 公路 | [roads.js](../roads.js)、[panamerican.js](../panamerican.js)、[公路资料](maps/README.md) |
| 文化与自然扩充 | [cultural-atlas.js](../cultural-atlas.js)、[cultural-routes.js](../cultural-routes.js)、[natural-atlas.js](../natural-atlas.js) |
| 地域主题与原入口整合 | [data/theme-review/](../data/theme-review/)、[cultural-theme-maps.js](../cultural-theme-maps.js)、[catalogue-consolidation.js](../catalogue-consolidation.js) |
| 带来源的点位补充 | [data/content-quality/](../data/content-quality/)、[quality-readings-data.js](../quality-readings-data.js)、[quality-readings.js](../quality-readings.js) |
| 原记录与作品地理关系 | [art-context.js](../art-context.js)、[reading.js](../reading.js)及主题阅读脚本 |

基础名录的抓取日期为2026-10-07，含1,273项 UNESCO 记录（991文化、240自然、42双遗产）、63个国家公园和6个三峡聚落。双遗产同时出现在自然和文化主题，主题地点数不能相加当成全站总数。此日期只描述基础快照，后续编辑与坐标补充另记来源，不称作实时名录。

<!-- coordinate-status:start -->
[unesco-coordinate-supplements.json](../data/unesco-coordinate-supplements.json)保留补充来源与组成部分说明。原始快照中缺坐标的38项已补充37项；当前生产数据剩1条未定位记录：`wh-1567` 第一次世界大战（西线）的墓葬和纪念场所。代表坐标不是完整边界或实际入口，最新计数以[可复核统计](reference/catalogue.json)为准。
<!-- coordinate-status:end -->

`python3 scripts/build_catalog.py`只重建基础名录；不要把它当成全站内容生成器。原始导入描述继续保留，经核实的展示层修订和主题阅读绑定各自来源与内容哈希。

## 图片与作品

| 素材范围 | 作者、许可与变更记录 |
| --- | --- |
| 原有地点摄影 | [assets/photos/README.md](../assets/photos/README.md) |
| 文化摄影、画作、文献 | [素材说明](../assets/editorial/README.md)、[sources.json](../assets/editorial/sources.json) |
| 四个文化路线包 | [photograph-sources.json](../assets/cultural-routes/photograph-sources.json)及[cultural-routes.js](../cultural-routes.js) |
| 文化地点扩充 | [assets/cultural-atlas/sources.json](../assets/cultural-atlas/sources.json) |
| 地域主题新增影像 | [素材说明](../assets/regional-expansion/README.md)、[sources.json](../assets/regional-expansion/sources.json) |
| 自然地图影像 | [assets/natural-atlas/sources.json](../assets/natural-atlas/sources.json) |
| 公路外链影像 | [roads.js](../roads.js)、[panamerican.js](../panamerican.js)中的逐项来源与许可 |

素材按逐文件许可复用，不能从作者年代或整个仓库的身份推断所有图片都可任意使用。原始文件、压缩、裁切与展示说明以相应记录为准；部分公路照片仍依赖 Wikimedia 外链，本地静态应用不保证第三方图像服务始终可达。

<!-- artwork-stats:start -->
印象派与梵高的作品数据分别保留8幅与8幅。作品分别记录画家、著录年代、描绘/创作关联地、馆藏地和来源；参见 [art-context.js](../art-context.js)、[depth-context.js](../depth-context.js)及应用中的作品资料。
<!-- artwork-stats:end -->

## 审计与质量边界

[qa/content-quality/latest.json](../qa/content-quality/latest.json)与[contexts.csv](../qa/content-quality/contexts.csv)按实际生产脚本枚举所有主题语境；[manual-reviews.json](../qa/content-quality/manual-reviews.json)绑定人工判断的文本/来源哈希。候选、无展开、已有长文与已经人工研究分别计数，自动审计不代替事实核实。

原始压缩基线、逐文件影像许可、收藏ID、旧链接和行程保全数据继续留在 `data/`、`assets/`、`qa/`，本轮未搬迁。[当前内容质量](content-quality/README.md)与[研究批次](content-quality/batches/README.md)是后续编辑入口。

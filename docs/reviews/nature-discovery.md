# 自然风景发现与地图候选

核查日期：2026-11-17。实施基线：main `1779d81`，包含已上线的文化合集整理。

## 已实现：三张自然地图

修订基线 main `377a6a9`。新增 39 个具体访问节点、11 条独立行程，全站为 1,921 个地点、215 个行程、61 个可见专题（127 个内部主题，包含隐藏人物原专题及关联合集）。自然兴趣显示 5 张地图、39 条行程；其中 11 条为已有公路路线的交叉发现入口。

| 新地图 | 地点 / 行程 | 真实路线与范围 |
| --- | --- | --- |
| 加拿大落基山 | 8 / 3 | 冰原大道四日公路、南段湖泊两日、路易斯湖—梦莲湖预约接驳；93N 主廊道 232 km 不含景点支路 |
| 新西兰南岛 · 三条 Great Walks | 17 / 3 | Milford 53.5 km 单向四日、Routeburn 33 km 单向三日、Kepler 60 km 环线四日；三条独立，不连成总路线 |
| 巴塔哥尼亚 · 冰川与塔峰 | 14 / 5 | 三湖、托雷湖、莫雷诺公共栈道公路、百内塔基、大瀑布—角峰；分区安排，不冒充 W/O 或跨国连续徒步 |

新增地图复用现有地图、阅读和行程卡组件。主题地图标签只显示地图；精选行程标签统一显示全部相关行程卡。地图概览不绘制跨区总路线，选择行程后才显示节点顺序连线。往返线说明原路返回，环线末段返回起点；地图直线不是实测步道轨迹。官方全线长度另列，分段直线值保留其明确标识。三张新图允许步道尺度的近景缩放；近景隐藏精度不足的全球海岸线，不假装提供当地地形或导航底图。

地点均有独立观察、访问说明和来源。定位公共湖岸、观景台、步道口和现址山屋；不以湖心、冰川中心或技术攀登山顶充作游客抵达点。Mintaro 使用 2021 年迁建后的 DOC 坐标；丢弃 Iris Burn 页面格式异常的坐标，使用 OSM 实体位置。DOC NZTM 坐标按 EPSG:2193 转换。OpenStreetMap 坐标注明 © OpenStreetMap contributors / ODbL，代表点非导航轨迹。

26 张地点影像保存在 `assets/natural-atlas/`，保留真实照片、作者、许可、原始记录链接与 SHA-256，元数据见 `sources.json` 和 `natural-atlas-media.js`。照片机位、历史年份或室内外在图注明示；未使用无关照片填补没有影像的节点。素材生成脚本会生成审核拼图，不在用户界面借用地图封面冒充路线站点。

主要资料核查日期：2026-11-17。

- [Parks Canada 冰原大道](https://parks.canada.ca/pn-np/ab/banff/visit/promenadedesglaciers-icefieldsparkway)、[两湖接驳](https://parks.canada.ca/pn-np/ab/banff/visit/parkbus/louise)。
- DOC [Milford](https://www.doc.govt.nz/milfordtrack)、[Routeburn](https://www.doc.govt.nz/routeburntrack)、[Kepler](https://www.doc.govt.nz/keplertrack) 及各山屋页面。
- 阿根廷国家公园 [北区官方步道图与表（2024）](https://www.argentina.gob.ar/sites/default/files/2019/06/folleto_senderos_zona_norte_pnlg_ingles_2024.pdf)、[莫雷诺栈道图（2024）](https://www.argentina.gob.ar/sites/default/files/2019/06/mapa_pasarelas_-_el_calafate_2024.pdf)。
- 百内管理方 [官方园区图](https://parquetorresdelpaine.cl/wp-content/uploads/2026/01/Mapa-Rutero-Ingles.pdf)、[2026—2027 季节公告](https://parquetorresdelpaine.cl/boletin-informativo-temporada-2026-2027/)。不推荐永久关闭的 CONAF Torres、Paso、Italiano 营地。

## 已有路线的交叉发现

| 原主题 | 同时从自然兴趣“精选行程”发现的原行程 |
| --- | --- |
| 苏格兰北海岸 500 | `nc500-full`、`nc500-west` |
| 北美公路旅行 | `roads-california1`、`roads-utah12`、`roads-utah5`、`roads-arctic` |
| 欧洲海岸与环岛公路 | `roads-atlantic`、`roads-iceland1` |
| 南半球海岸与峡湾 | `roads-greatocean`、`roads-milford`、`roads-garden` |

保留原公路入口、路线 ID、地点与收藏身份。混合公路主题不整体归入自然，中国沿边沿海总览及城市线路、佛罗里达海外公路、66 号公路等未自动打上自然标签。没有复制已有路线数据。

首页固定三张推荐已移除，轮播直接衔接分类发现。轮播的减少动态效果、悬停、焦点、失焦、页面隐藏与离屏只临时阻止定时器，不再污染用户主动暂停状态；默认 8 秒，无新增按钮或解释文案。

## 候选清单：尚未实现

以下仍是待研究方向，不计为已实现地图。上列加拿大落基山、三条 Great Walks 与巴塔哥尼亚已完成，不再列为候选。优先级是编辑判断：P1 优先补实质缺口，P2 在现有覆盖上深化，P3 暂后。

| 优先级 | 候选地图 | 当前覆盖 | 值得补充的内容与边界 | 可信来源 |
| --- | --- | --- | --- | --- |
| P1 | 挪威西部峡湾 | `wh-1195` 是两片峡湾的区域代表点；已有大西洋之路展示另一处海岸桥群 | 将盖朗厄尔、纳柔依峡湾等具体地点拆开，分别核实渡轮、道路与观景设施，避免把大西洋之路当作整个峡湾地区 | [挪威国家风景道路](https://www.nasjonaleturistveger.no/en/routes/geiranger--trollstigen/)、[UNESCO 1195](https://whc.unesco.org/en/list/1195/) |
| P1 | 东非草原与生态观察 | 已有塞伦盖蒂代表点 `wh-156`，没有专门的生态观察地图 | 以公园分区、栖息地和物种关系组织内容，不把迁徙描成固定日期或保证可见的路线 | [TANAPA 塞伦盖蒂](https://www.tanzaniaparks.go.tz/nationalparks/Serengeti)、[官方游客资料](https://www.tanzaniaparks.go.tz/serengeti/visitor-guide) |
| P2 | 新西兰南阿尔卑斯与西海岸冰川 | `wh-551` 区域代表点；米尔福德行程已有峡湾与 Eglinton 谷地 | 补 Westland Tai Poutini 的森林、冰川与海岸具体地点；不把米尔福德公路覆盖范围扩写成整个南岛 | [DOC Westland Tai Poutini](https://www.doc.govt.nz/parks-and-recreation/places-to-go/west-coast/places/westland-tai-poutini-national-park/) |
| P2 | 中国喀斯特：石林、峰林与地下水 | `wh-1248` 是复合遗产代表点；已有“中国西南山水与喀斯特”行程使用另一些遗产节点，未细分此遗产的组成区 | 研究石林、荔波、武隆、桂林等组成区，按地貌过程和各自基地展开；复用遗产关系，不复制区域点冒充新地点 | [UNESCO 南方喀斯特](https://whc.unesco.org/en/list/1248/) |
| P2 | 加拉帕戈斯：火山岛与演化 | `wh-1` 群岛代表点，没有分岛专题行程 | 分岛区分火山地貌、海洋生态与物种观察；具体访客点、许可和岛际交通需另核管理资料 | [UNESCO 加拉帕戈斯](https://whc.unesco.org/en/list/1/) |
| P3 | 冰岛自然过程专题 | 环岛路线已包含火山、瀑布与冰川，本次已改善自然入口 | 先补已有站点的地貌阅读，再判断是否需要独立专题，避免仅改标题重复做环岛地图 | [现有环岛路线与逐站来源](https://github.com/raeqi/world-travel-map/blob/main/roads.js) |

新增地图之前，应先补可核实的具体地点、坐标尺度、许可影像、现场观察和资料来源；候选名称不代表已确定路线、天数或可访问范围。

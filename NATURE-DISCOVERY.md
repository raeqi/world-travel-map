# 自然风景发现与地图候选

核查日期：2026-11-17。实施基线：main `1779d81`，包含已上线的文化合集整理。

## 本次实现

自然兴趣按路线交叉展示。两张原有主题地图（世界自然遗产、美国国家公园）保留；其 17 条行程之外，增加 11 条已有风景行程的发现入口。原公路主题、路线 ID、站点、资料来源和收藏身份不变。全站仍为 1,882 个地点、204 个行程、58 个可见专题入口（124 个内部主题，包括独立人物与合集）。

| 原主题 | 同时从自然入口发现的已有行程 |
| --- | --- |
| 苏格兰北海岸 500 | `nc500-full`、`nc500-west` |
| 北美公路旅行 | `roads-california1`、`roads-utah12`、`roads-utah5`、`roads-arctic` |
| 欧洲海岸与环岛公路 | `roads-atlantic`、`roads-iceland1` |
| 南半球海岸与峡湾 | `roads-greatocean`、`roads-milford`、`roads-garden` |

混合主题不整体归入自然。中国沿边沿海全国总览、鸭绿江城镇、胶东城市、佛罗里达海外公路与 66 号公路等本次未添加自然标签；同处一张地图不意味着每条路线具有相同兴趣。沿途城市可作为自然行程的住宿或接驳基地，但路线本身须以山地、海岸、冰川或生态景观为主要观看线索。

自然默认地图视图同时显示相关风景行程；只有行程匹配、没有主题地图匹配时仍显示行程。精选行程视图使用同一兴趣、搜索与地域逻辑。进入路线、刷新与返回时，首页条件随 URL 保留。首页固定三张推荐已移除，轮播与分类发现直接衔接。

轮播临时条件与用户暂停分开：减少动态效果、悬停、焦点、窗口失焦、页面隐藏和离屏只临时阻止定时器；用户通过键盘主动暂停仍保留。确认的旧问题是减少动态效果被写入持久暂停标记，关闭设置后没有定时器恢复。默认切换间隔仍为 8 秒，界面不增加轮播按钮或说明。

## 候选清单：尚未实现

以下是待研究和编辑的方向，不计为本次新增地图。优先级是编辑判断：P1 优先补实质缺口，P2 在现有覆盖上深化，P3 暂后。

| 优先级 | 候选地图 | 当前覆盖 | 值得补充的内容与边界 | 可信来源 |
| --- | --- | --- | --- | --- |
| P1 | 加拿大落基山：湖泊与冰原公路 | 世界自然遗产 `wh-304` 为区域代表点；已有加拿大公路是 Dempster 北极方向，未形成班夫—贾斯珀专图 | 围绕 Lake Louise、Bow Lake、Columbia Icefield、Athabasca Falls、Jasper 建立具体地点和地貌阅读，区分园区、道路与步道 | [Parks Canada 冰原公路](https://parks.canada.ca/pn-np/ab/banff/visit/promenadedesglaciers-icefieldsparkway)、[UNESCO 304](https://whc.unesco.org/en/list/304/) |
| P1 | 挪威西部峡湾 | `wh-1195` 是两片峡湾的区域代表点；已有大西洋之路展示另一处海岸桥群 | 将盖朗厄尔、纳柔依峡湾等具体地点拆开，分别核实渡轮、道路与观景设施，避免把大西洋之路当作整个峡湾地区 | [挪威国家风景道路](https://www.nasjonaleturistveger.no/en/routes/geiranger--trollstigen/)、[UNESCO 1195](https://whc.unesco.org/en/list/1195/) |
| P1 | 巴塔哥尼亚：山地与冰川 | `wh-145` 冰川国家公园代表点；泛美南段提供大区域公路节点，未形成公园与步道专图 | 分别策划 Los Glaciares 与 Torres del Paine；区域联读与 W/O 步道不能混同，预订与开放需逐项研究 | [Torres del Paine 管理机构](https://parquetorresdelpaine.cl/recomendaciones-para-su-viaje-2026/)、[UNESCO 145](https://whc.unesco.org/en/list/145/) |
| P1 | 东非草原与生态观察 | 已有塞伦盖蒂代表点 `wh-156`，没有专门的生态观察地图 | 以公园分区、栖息地和物种关系组织内容，不把迁徙描成固定日期或保证可见的路线 | [TANAPA 塞伦盖蒂](https://www.tanzaniaparks.go.tz/nationalparks/Serengeti)、[官方游客资料](https://www.tanzaniaparks.go.tz/serengeti/visitor-guide) |
| P2 | 新西兰南阿尔卑斯与西海岸冰川 | `wh-551` 区域代表点；米尔福德行程已有峡湾与 Eglinton 谷地 | 补 Westland Tai Poutini 的森林、冰川与海岸具体地点；不把米尔福德公路覆盖范围扩写成整个南岛 | [DOC Westland Tai Poutini](https://www.doc.govt.nz/parks-and-recreation/places-to-go/west-coast/places/westland-tai-poutini-national-park/) |
| P2 | 中国喀斯特：石林、峰林与地下水 | `wh-1248` 是复合遗产代表点；已有“中国西南山水与喀斯特”行程使用另一些遗产节点，未细分此遗产的组成区 | 研究石林、荔波、武隆、桂林等组成区，按地貌过程和各自基地展开；复用遗产关系，不复制区域点冒充新地点 | [UNESCO 南方喀斯特](https://whc.unesco.org/en/list/1248/) |
| P2 | 加拉帕戈斯：火山岛与演化 | `wh-1` 群岛代表点，没有分岛专题行程 | 分岛区分火山地貌、海洋生态与物种观察；具体访客点、许可和岛际交通需另核管理资料 | [UNESCO 加拉帕戈斯](https://whc.unesco.org/en/list/1/) |
| P3 | 冰岛自然过程专题 | 环岛路线已包含火山、瀑布与冰川，本次已改善自然入口 | 先补已有站点的地貌阅读，再判断是否需要独立专题，避免仅改标题重复做环岛地图 | [现有环岛路线与逐站来源](https://github.com/raeqi/world-travel-map/blob/main/roads.js) |

新增地图之前，应先补可核实的具体地点、坐标尺度、许可影像、现场观察和资料来源；候选名称不代表已确定路线、天数或可访问范围。

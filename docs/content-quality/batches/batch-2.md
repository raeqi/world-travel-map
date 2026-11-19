# 全站点位信息质量 · 2026-11-18第二批

生产基线：main `27bd4fe441008c13a05d34beaf725923575812d1`。审计实际载入index中的数据脚本，得到2010个地点、130个内部主题（77个可见入口）、330条方案、2218个地点/主题语境；766个不同地点出现在方案中。没有开放中的PR与本批重叠（开始核查时）。本批独立分支开发，合并状态和部署以对应GitHub PR、Actions为准。

## 本批实际改变

- 新增25处有逐项来源的阅读：三峡古镇6处、熊野古道6处、佛教四圣地4处、NC500的9处。22处原先没有展开，3处在原展开基础上补充具体内容；不是25个新地点。
- 解决11个语境串读：共享地点只显示当前主题适用的阅读。莫扎特布拉格不再显示卡夫卡、丝路威尼斯不再显示透纳；人物主题各自的内容仍在。
- 原目录文字、坐标、来源链接、图片和图片许可、行程与地点ID均保留。新概要作为展示层，新增阅读合并原段落与来源。本批未新增或替换任何图片。
- 对5条短而有用的原文作保留判断；另12处在本次人工阅读中确认内容薄弱，记录具体缺什么。研究完成、简洁有用、仍需研究三种判断分开，且绑定当前文本/来源哈希。

## 方法与边界

1. index驱动数据加载，包含泛美公路、76方向文化数据、地域整合、剩余30主题及自然地图。只排除不负责数据注册的app/flow界面脚本；记录每份脚本哈希。
2. 遍历所有主题的真实显示语境，含隐藏但可由旧链接/搜索访问的原主题；按当前主题读取共享地点的动态介绍、段落与来源，不把其他艺术家的阅读算作旧主题已补足。
3. 空文、来源缺失、70字以下概述且无地点专属展开、跨主题错误回退等只产生编辑候选。相同段落在多地点复用会单列提示；有长文、有来源URL、有两段展开都不等于正确。
4. 人工阅读核对名称、年代、地理和真实主题关系，增加具体对象与观察角度；原址、迁建、馆藏、传统纪念和当代设施分开。建议的观察方法不是现场考察结果；不固定票价、时刻和开放保证。
5. 自动审计不联网认证事实。本批来源逐项阅读并记录在资料包，手动评语绑定内容哈希；以后内容变化会显示stale-review，不沿用旧验收。

## 与历史226个候选对照

| 当前判断 | 数量 | 含义 |
| --- | ---: | --- |
| 本批已研究补足 | 22 | 原本无展开，本次增加有证据的具体阅读 |
| 原文简洁有用 | 5 | 不因字数短而灌水；并未声称已做完整访问研究 |
| 仍是待研究候选 | 199 | 包括7处在其他人物主题已有新阅读、但原路线仍薄弱的地点 |

所有旧地点仍存在。旧226不是今日全站范围；新基线发现229个不同地点的自动信号、11个跨主题回退语境。本批后自动信号仍涉及204个地点，其中5处人工判断可保留，故未排除候选为199；153处用于当前可见主题的行程。候选不等于已证实错误，也不是全部尚需研究的上限。

本次人工质量判断共42个语境：25处新研究、5处保留、12处明确缺口。其余2176个语境未在本批逐项人工验收；较长目录介绍与已有新主题资料也需后续抽查和分批复核。

## 逐项研究与来源

| 主题 | 地点 | 具体内容 | 首要证据 |
| --- | --- | --- | --- |
| 三峡古镇 | `dachang` | 搬迁之后，怎样读一座古城 | [重庆市民政局：巫山—大昌](https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202407/t20240715_13370821.html) |
| 三峡古镇 | `xituo` | 从长江码头拾级而上 | [重庆市民政局：石柱—西沱](https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202403/t20240312_13026556.html) |
| 三峡古镇 | `ningchang` | 盐泉怎样变成一座工业聚落 | [重庆市民政局：巫溪—宁厂](https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202405/t20240514_13203070.html) |
| 三峡古镇 | `yunan` | 在汤溪河边辨认盐业旧城 | [重庆市民政局：云阳—云安](https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202412/t20241225_14017557.html) |
| 三峡古镇 | `guizhou` | 归州、归州街与迁城记忆 | [湖北省住建厅：县城迁移与归州街](https://zjt.hubei.gov.cn/bmdt/dtyw/mtjj/201910/t20191028_99896.shtml) |
| 三峡古镇 | `xintan` | 一处旧镇，先读滑坡与撤离 | [湖北省政协文史：1985年新滩滑坡抢险亲历](https://www.hbzx.gov.cn/49/2014-09-15/5883.html) |
| 熊野古道 | `kumano-takijiri` | 河流边的界线与上山的第一段 | [田边市熊野旅游局：泷尻王子至高原](https://www.tb-kumano.jp/en/kumano-kodo/nakahechi/takijiri-oji-to-tsugizakura-oji/takijiri-oji-to-takahara/) |
| 熊野古道 | `kumano-takahara` | 山脊村落里的樟树与远山 | [田边市熊野旅游局：高原村与神社](https://www.tb-kumano.jp/en/places/takahara/) |
| 熊野古道 | `kumano-chikatsuyu` | 河谷宿场如何接住远行的人 | [田边市熊野旅游局：近露宿场](https://www.tb-kumano.jp/en/places/chikatsuyu/) |
| 熊野古道 | `kumano-tsugizakura` | 大杉、泉水与一间复原茶屋 | [田边市熊野旅游局：野中与继樱王子](https://www.tb-kumano.jp/en/places/nonaka/) |
| 熊野古道 | `kumano-hosshinmon` | 从礼仪门槛走入田园与森林 | [田边市熊野旅游局：近露至本宫的路段环境](https://www.tb-kumano.jp/en/kumano-kodo/nakahechi/tsugizakura-oji-to-kumano-hongu-taisha/chikatsuyu-oji-to-kumano-hongu-taisha/) |
| 熊野古道 | `kumano-hongu` | 现神社与河滩旧址，两处一起读 | [田边市熊野旅游局：本宫大社与大斋原](https://www.tb-kumano.jp/en/kumano-kodo/world-heritage/kumano-hongu-taisha/) |
| 佛教四大圣地 | `buddhist-lumbini` | 让出生传统落到考古证据上 | [UNESCO：蓝毗尼遗产地与考古证据](https://whc.unesco.org/en/list/666/) |
| 佛教四大圣地 | `buddhist-bodhgaya` | 砖塔、菩提树与成道纪念空间 | [UNESCO：摩诃菩提寺院群](https://whc.unesco.org/en/list/1056/) |
| 佛教四大圣地 | `buddhist-sarnath` | 把原柱遗迹与博物馆柱头对上 | [印度考古局鹿野苑：阿育王狮子柱头](https://asisarnathcircle.in/lion-capital.php) |
| 佛教四大圣地 | `buddhist-kushinagar` | 涅槃寺与荼毗塔各自纪念什么 | [拘尸那迦地区政府：涅槃寺与考古博物馆](https://kushinagar.nic.in/places-of-interest/) |
| 苏格兰北海岸 500 | `nc500-torridon` | 山体本身就是一部地质书 | [苏格兰国民信托：托里登自然保护区](https://www.nts.org.uk/visit/places/torridon) |
| 苏格兰北海岸 500 | `nc500-gairloch` | 海湾之外，看高地人怎样生活 | [Gairloch Museum：馆舍与地方收藏](https://www.gairlochmuseum.org/museum) |
| 苏格兰北海岸 500 | `nc500-ullapool` | 为鲱鱼业规划出来的港村 | [Ullapool Museum：渔业、航运与聚落收藏](https://www.ullapoolmuseum.co.uk/our-collection-2/) |
| 苏格兰北海岸 500 | `nc500-lochinver` | 从港口看阿辛特的独立山峰 | [VisitScotland：西北高地地质公园](https://www.visitscotland.com/places-to-go/unesco/geoparks/north-west-highlands) |
| 苏格兰北海岸 500 | `nc500-durness` | 在Smoo洞看水怎样改变石灰岩 | [Scottish Geology Trust：德内斯与Smoo洞地质](https://www.scottishgeologytrust.org/geology/51-best-places/smoo-cave-durness/) |
| 苏格兰北海岸 500 | `nc500-tongue` | 一座年代未明的塔楼与海湾 | [Historic Environment Scotland：Castle Varrich的保护与未解历史](https://blog.historicenvironment.scot/2018/12/caisteal-bharraich/) |
| 苏格兰北海岸 500 | `nc500-johnogroats` | 知名路标与真正最北点分开 | [VisitScotland：NC500的区域停留点](https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500) |
| 苏格兰北海岸 500 | `nc500-wick` | 从鲱鱼港读Pulteneytown | [Wick Heritage Centre：鲱鱼业与Pulteneytown](https://www.wickheritage.org/fishing.php) |
| 苏格兰北海岸 500 | `nc500-dornoch` | 仍在使用的教堂与小城中心 | [Dornoch Firth Church of Scotland：多诺赫教堂](https://www.dornoch-cathedral.com/) |

每段的sourceKeys、全部28份资料、改写概要及原文可复核于[batch-2.json](../../../data/content-quality/batch-2.json)。资料中存在传说、年代或数量争议时只采用有支持的范围；未采用宁厂资料中互相矛盾的早期年数，也不固定西沱台阶数量。新滩原来源404的旧链接仍保留，新增可读文史来源；归州镇与新县城归州街、云安与已迁陕西牮楼分开。

## 下一批优先队列

| 地点 | 主题 | 已读到的具体缺口 |
| --- | --- | --- |
| `tea-nanjian` | tea | 仅称商贸节点，缺少具体遗存、地方生产和可观察对象。 |
| `tea-dali` | tea | 仅称古城节点，需具体核对茶路与城内地点的关系。 |
| `tea-lijiang` | tea | 马帮与多元交流过于概括，缺少对应街巷、市场或证据。 |
| `tea-deqin` | tea | 当前以高原适应提醒为主，缺少地方本身值得看的内容。 |
| `tea-kangding` | tea | 有打箭炉旧称，但还没有具体商贸遗存或观察线索。 |
| `tea-litang` | tea | 只有高海拔和分段安排建议，未解释理塘特色。 |
| `tea-batang` | tea | 川边重镇是泛称，需实际地点和历史关系证据。 |
| `tea-changdu` | tea | 区域交流节点不能代替具体城镇内容。 |
| `silk-tashkent` | silk | 仅有交通商贸标签，缺少城市地景和可靠关联。 |
| `silk-bukhara` | silk | 未具体说明商贸、学术如何体现在可看的建筑或街区。 |
| `francigena-canterbury` | francigena | 已有起点和大教堂线索，仍缺锡杰里克史料与现场观察层次。 |
| `route66-springfield` | route66 | 未点名可核实的路边设施与历史路段；不能靠泛称餐厅补足。 |

此外，法国之路、徐霞客、丝路、66号公路和茶路还有较多候选。安第斯Desaguadero–Titijoni与Tiwanacu的现场构筑物资料仍需专门研究。本批并未把这些遗留项清零。

## 全主题覆盖表

下表的“审计覆盖”是生产数据枚举，“人工判断”才表示本批读过并记录结论。候选列为自动信号，仍含5处人工保留的短文。

| 主题ID | 名称 | 入口 | 审计语境 | 自动候选 | 本批人工判断 |
| --- | --- | --- | ---: | ---: | ---: |
| `nature` | 世界自然遗产 | 可见 | 282 | 4 | 1 |
| `culture` | 世界文化遗产 | 可见 | 1033 | 19 | 4 |
| `gorges` | 三峡古镇 | 可见 | 6 | 0 | 6 |
| `parks` | 美国国家公园 | 可见 | 63 | 0 | 0 |
| `tea` | 茶马古道 | 可见 | 20 | 19 | 8 |
| `silk` | 丝绸之路 | 可见 | 26 | 25 | 2 |
| `polo` | 马可波罗游记 | 可见 | 23 | 23 | 0 |
| `xu` | 徐霞客全国游踪 | 可见 | 24 | 24 | 0 |
| `kumano` | 熊野古道 | 可见 | 6 | 0 | 6 |
| `camino` | 圣地亚哥朝圣之路 | 可见 | 43 | 42 | 0 |
| `nakasendo` | 中山道 | 可见 | 9 | 7 | 0 |
| `francigena` | 弗兰奇杰纳之路 | 可见 | 16 | 16 | 1 |
| `andes` | 安第斯道路网 | 可见 | 10 | 0 | 0 |
| `buddhist` | 佛教四大圣地 | 可见 | 4 | 0 | 4 |
| `canal` | 中国大运河 | 可见 | 11 | 0 | 0 |
| `viking` | 维京文化网络 | 可见 | 8 | 4 | 0 |
| `impressionism` | 印象派的足迹 | 可见 | 15 | 0 | 0 |
| `mozart` | 莫扎特的欧洲之旅 | 可见 | 8 | 7 | 0 |
| `route66` | 美国 66 号公路 | 可见 | 15 | 14 | 1 |
| `nc500` | 苏格兰北海岸 500 | 可见 | 11 | 0 | 9 |
| `vangogh` | 梵高在法国 | 旧链接/搜索 | 6 | 0 | 0 |
| `hokusai` | 北斋 · 富士山的多种看法 | 旧链接/搜索 | 6 | 0 | 0 |
| `vermeer` | 维米尔 · 代尔夫特的光与日常 | 可见 | 4 | 0 | 0 |
| `bach` | 巴赫 · 中德音乐地景 | 旧链接/搜索 | 6 | 0 | 0 |
| `austen` | 简·奥斯汀 · 生活与小说地景 | 可见 | 6 | 0 | 0 |
| `drive-china` | 中国沿边沿海公路 | 可见 | 30 | 0 | 0 |
| `drive-northamerica` | 北美公路旅行 | 可见 | 28 | 0 | 0 |
| `drive-europe` | 欧洲海岸与环岛公路 | 可见 | 13 | 0 | 0 |
| `drive-southern` | 南半球海岸与峡湾 | 可见 | 17 | 0 | 0 |
| `panamerican` | 泛美公路 | 可见 | 31 | 0 | 0 |
| `gaudi` | 高迪的建筑世界 | 旧链接/搜索 | 3 | 0 | 0 |
| `wright` | 赖特的乡野与沙漠 | 旧链接/搜索 | 2 | 0 | 0 |
| `le-corbusier` | 勒·柯布西耶的跨国建筑 | 旧链接/搜索 | 3 | 0 | 0 |
| `aalto` | 阿尔瓦·阿尔托建筑路线 | 旧链接/搜索 | 3 | 0 | 0 |
| `ando` | 安藤忠雄的直岛 | 旧链接/搜索 | 3 | 0 | 0 |
| `rodin` | 罗丹的工作室与花园 | 旧链接/搜索 | 2 | 0 | 0 |
| `brancusi` | 布朗库西的城市雕塑与工作室 | 可见 | 4 | 0 | 0 |
| `hepworth` | 赫普沃斯的圣艾夫斯 | 旧链接/搜索 | 2 | 0 | 0 |
| `noguchi` | 野口勇的雕塑与庭园 | 旧链接/搜索 | 2 | 0 | 0 |
| `giacometti` | 贾科梅蒂的山谷与巴黎 | 可见 | 4 | 0 | 0 |
| `henry-moore` | 亨利·摩尔的雕塑景观 | 旧链接/搜索 | 2 | 0 | 0 |
| `utah-land-art` | 犹他大地艺术：史密森与霍尔特 | 旧链接/搜索 | 2 | 0 | 0 |
| `turner` | 透纳的意大利旅行 | 旧链接/搜索 | 3 | 0 | 0 |
| `cezanne` | 塞尚的普罗旺斯 | 旧链接/搜索 | 3 | 0 | 0 |
| `dali` | 达利三角 | 旧链接/搜索 | 3 | 0 | 0 |
| `matisse` | 马蒂斯的尼斯与旺斯 | 旧链接/搜索 | 2 | 0 | 0 |
| `munch` | 蒙克的海岸与居所 | 可见 | 3 | 0 | 0 |
| `okeeffe` | 奥姬芙的新墨西哥 | 旧链接/搜索 | 2 | 0 | 0 |
| `hiroshige` | 广重的东海道 | 旧链接/搜索 | 2 | 0 | 0 |
| `gauguin` | 高更的跨洋迁居 | 可见 | 4 | 0 | 0 |
| `chagall` | 夏加尔的故乡与南法 | 可见 | 5 | 0 | 0 |
| `sorolla` | 索罗亚的西班牙 | 旧链接/搜索 | 2 | 0 | 0 |
| `constable` | 康斯太勃尔乡野 | 旧链接/搜索 | 3 | 0 | 0 |
| `zhang-daqian` | 张大千的游历与园林 | 可见 | 4 | 0 | 0 |
| `picasso` | 毕加索的城市生活 | 旧链接/搜索 | 2 | 0 | 0 |
| `frida` | 弗里达的墨西哥与美国 | 旧链接/搜索 | 3 | 0 | 0 |
| `wu-guanzhong` | 吴冠中的游历与写生 | 旧链接/搜索 | 3 | 0 | 0 |
| `qi-baishi` | 齐白石的五出五归 | 可见 | 3 | 0 | 0 |
| `huang-binhong` | 黄宾虹的山水纪游 | 旧链接/搜索 | 2 | 0 | 0 |
| `feng-zikai` | 丰子恺的生活与迁徙 | 旧链接/搜索 | 3 | 0 | 0 |
| `higashiyama` | 东山魁夷的风景旅行 | 旧链接/搜索 | 3 | 0 | 0 |
| `rivera` | 里维拉的壁画地理 | 旧链接/搜索 | 4 | 0 | 0 |
| `ansel-adams` | 安塞尔·亚当斯的国家公园摄影 | 旧链接/搜索 | 2 | 0 | 0 |
| `cartier-bresson` | 布列松的城市摄影 | 可见 | 3 | 0 | 0 |
| `lee-miller` | 李·米勒的摄影与旅居 | 旧链接/搜索 | 2 | 0 | 0 |
| `sugimoto` | 杉本博司的观看与空间 | 旧链接/搜索 | 2 | 0 | 0 |
| `christo-jeanneclaude` | 克里斯托与珍妮-克劳德的临时作品 | 可见 | 4 | 0 | 0 |
| `turrell` | 特瑞尔的光与天空 | 旧链接/搜索 | 2 | 0 | 0 |
| `beethoven` | 贝多芬的居住地图 | 旧链接/搜索 | 2 | 0 | 0 |
| `chopin` | 肖邦与乔治·桑 | 可见 | 4 | 0 | 0 |
| `liszt` | 李斯特的欧洲居所 | 旧链接/搜索 | 2 | 0 | 0 |
| `schumanns` | 克拉拉与罗伯特·舒曼 | 旧链接/搜索 | 2 | 0 | 0 |
| `wagner` | 瓦格纳的琉森与拜罗伊特 | 旧链接/搜索 | 2 | 0 | 0 |
| `mahler` | 马勒的作曲小屋 | 旧链接/搜索 | 2 | 0 | 0 |
| `dvorak` | 德沃夏克的美国经历 | 可见 | 4 | 0 | 0 |
| `sibelius` | 西贝柳斯的芬兰 | 可见 | 3 | 0 | 0 |
| `grieg` | 卑尔根：格里格与近郊音乐家园 | 可见 | 3 | 0 | 0 |
| `mendelssohn` | 门德尔松：莱比锡与苏格兰 | 可见 | 4 | 0 | 0 |
| `puccini` | 普契尼的托斯卡纳 | 旧链接/搜索 | 5 | 0 | 0 |
| `handel` | 亨德尔的音乐城市 | 旧链接/搜索 | 2 | 0 | 0 |
| `su-shi` | 苏轼的任职与贬谪 | 可见 | 10 | 0 | 0 |
| `li-bai` | 李白的山川游历 | 旧链接/搜索 | 2 | 0 | 0 |
| `du-fu` | 杜甫的漂泊 | 旧链接/搜索 | 2 | 0 | 0 |
| `wang-wei` | 蓝田与终南：王维山水和附近古寺 | 可见 | 3 | 0 | 0 |
| `bai-juyi` | 白居易的城市与山水 | 旧链接/搜索 | 2 | 0 | 0 |
| `lu-you` | 陆游《入蜀记》 | 旧链接/搜索 | 2 | 0 | 0 |
| `shen-congwen` | 湘西：沿沅水读沈从文 | 可见 | 4 | 0 | 0 |
| `xiao-hong` | 呼兰与哈尔滨：萧红的生活与写作 | 可见 | 4 | 0 | 0 |
| `basho` | 芭蕉《奥之细道》 | 旧链接/搜索 | 2 | 0 | 0 |
| `kawabata` | 川端康成的文学地景 | 旧链接/搜索 | 2 | 0 | 0 |
| `soseki` | 夏目漱石的迁居与留学 | 旧链接/搜索 | 3 | 0 | 0 |
| `goethe` | 歌德《意大利游记》 | 旧链接/搜索 | 2 | 0 | 0 |
| `hugo` | 雨果的巴黎与流亡 | 旧链接/搜索 | 3 | 0 | 0 |
| `byron` | 拜伦的湖畔与希腊 | 可见 | 4 | 0 | 0 |
| `wordsworth` | 华兹华斯的湖区 | 旧链接/搜索 | 4 | 0 | 0 |
| `dickens` | 狄更斯的英国 | 旧链接/搜索 | 2 | 0 | 0 |
| `kafka` | 卡夫卡的城市与生活 | 可见 | 4 | 0 | 0 |
| `joyce` | 乔伊斯的城市网络 | 可见 | 4 | 0 | 0 |
| `proust` | 普鲁斯特的记忆地景 | 旧链接/搜索 | 4 | 0 | 0 |
| `hemingway` | 海明威的跨国生活 | 可见 | 4 | 0 | 0 |
| `steinbeck` | 斯坦贝克的加州与公路 | 旧链接/搜索 | 4 | 0 | 0 |
| `mark-twain` | 马克·吐温：河岸、书房与文学邻居 | 可见 | 4 | 0 | 0 |
| `neruda` | 智利中部：聂鲁达的房屋与港城海岸 | 可见 | 4 | 0 | 0 |
| `marquez` | 哥伦比亚加勒比：马尔克斯、家屋与湿地 | 可见 | 4 | 0 | 0 |
| `tagore` | 泰戈尔的孟加拉世界 | 可见 | 4 | 0 | 0 |
| `mahfouz` | 马哈福兹的开罗 | 旧链接/搜索 | 2 | 0 | 0 |
| `modern-architecture` | 现代建筑：居住与地景 | 可见 | 8 | 0 | 0 |
| `setouchi-art` | 日本艺境：山水、光与空间 | 可见 | 14 | 0 | 0 |
| `paris-sculpture` | 巴黎：艺术家的工作室、画院与收藏 | 可见 | 8 | 0 | 0 |
| `southern-france-painters` | 南法画境：从普罗旺斯到蔚蓝海岸 | 可见 | 9 | 0 | 0 |
| `barcelona-art` | 西班牙艺境：城市、海岸与家屋 | 可见 | 12 | 0 | 0 |
| `fuji-tokaido` | 富士与东海道：北斋、广重的风景 | 可见 | 7 | 0 | 0 |
| `jiangnan-painting` | 江南画家：水乡、山水与日常 | 可见 | 6 | 0 | 0 |
| `mexico-city-art` | 墨西哥城：弗里达与里维拉 | 可见 | 4 | 0 | 0 |
| `detroit-art` | 底特律：弗里达、里维拉与工业城市 | 可见 | 3 | 0 | 0 |
| `european-music-cities` | 欧洲音乐城市：房间、舞台与创作 | 可见 | 19 | 0 | 0 |
| `italian-art-journeys` | 意大利艺旅：城市、音乐与山水 | 可见 | 9 | 0 | 0 |
| `jiangnan-poetry` | 江南诗路：水城与山川 | 可见 | 5 | 0 | 0 |
| `american-west-art` | 美国西部：地貌、艺术与文学 | 可见 | 15 | 0 | 0 |
| `east-coast-art` | 纽约与华盛顿：跨洋艺术的收藏与庭园 | 可见 | 5 | 0 | 0 |
| `british-sculpture` | 英国雕塑：从约克郡到海岸与花园 | 可见 | 6 | 0 | 0 |
| `japan-literary-landscapes` | 日本文学：山寺、温泉与书斋 | 可见 | 8 | 0 | 0 |
| `southeast-england-creative` | 英格兰东南：创作的房间、花园与海岸 | 可见 | 7 | 0 | 0 |
| `cairo-city-stories` | 开罗：街巷、小说与摄影 | 可见 | 4 | 0 | 0 |
| `yangtze-writing` | 长江与入蜀：诗文、迁徙与城市 | 可见 | 6 | 0 | 0 |
| `english-landscapes` | 英格兰风景：河谷画境与湖区诗歌 | 可见 | 7 | 0 | 0 |
| `paris-normandy-writing` | 巴黎、诺曼底与根西岛：书房和海岸 | 可见 | 7 | 0 | 0 |
| `canadian-rockies` | 加拿大落基山 | 可见 | 8 | 0 | 0 |
| `nz-great-walks` | 新西兰南岛 · 三条 Great Walks | 可见 | 17 | 0 | 0 |
| `patagonia-nature` | 巴塔哥尼亚 · 冰川与塔峰 | 可见 | 14 | 0 | 0 |

## 可复核文件和检查

- [全量语境CSV](../../../qa/content-quality/contexts.csv)：2218行，主题、推荐关联、长度信号、来源、判断及内容哈希。
- [最新审计](../../../qa/content-quality/latest.json)：130主题和330方案均列出，不覆盖[PR #8旧快照](../../../qa/content-audit.json)。
- [不可覆盖的开始快照](../../../qa/content-quality/baseline-2026-11-18.json.gz)：压缩前的完整原始审计；gzip解压后可读取JSON。
- [旧候选原主题](../../../qa/content-quality/legacy-candidates.json)与[人工判断](../../../qa/content-quality/manual-reviews.json)：避免以无关的新语境冲销旧问题。
- `node scripts/audit-content.cjs --write`更新当前JSON/CSV；`node --test tests/content-quality.test.cjs`验证所有数据覆盖、判断过期、跨主题隔离和原数据保全。
- 本地48项项目测试和四组DOM回归通过。旧侧栏脚本适配当前隐藏主题需搜索、默认行程筛选的行为后通过。
- 容器Chromium实际启动报socket Operation not permitted；未把这次失败当浏览器通过。新增Place content quality checks工作流将真实检查25处详情、两段内容、原/新来源链接、返回、跨主题、路线前后站、重复收藏和刷新，桌面1440×1000与手机390×844。最终浏览器结果以本批PR CI为准。


保全检查补记：三组历史保全审计均通过，继续逐项比较原目录、图片字节、作品、来源和方案。只有旧快照中可证明来自无关人物的阅读回退被移出该主题；该人物本身的主题仍接受完整段落/来源保全。新增回归确认：丢失适用段落会失败，保留错误串读也会失败。同URL的新来源不会挤掉原来源对象。

浏览器CI环境补记：首次新工作流因ubuntu-latest升级到26.04与固定Playwright版本不兼容，尚未执行浏览器；已固定到受支持的ubuntu-24.04，重新验收。失败不计为通过。

# 全站点位信息质量 · 持续审查

生产数据基线：main `27bd4fe441008c13a05d34beaf725923575812d1`；每批另记开发起点。审计实际index加载的2010个地点、130个内部主题（77个可见入口）、330条方案、2218个地点/主题语境。766个不同地点出现在方案中。合并与线上状态以对应PR和Actions为准。

## 当前覆盖与边界

- 累计100处有本系列新增且逐项来源支持的阅读，5处保留简洁有用判断，3处记录人工读到的明确缺口。108个不同语境有当前人工判断；其余**2110个语境未在本系列逐项人工验收**。
- 当前**133个未排除自动候选**，其中94处用于可见主题行程。候选是编辑优先队列，不等于已证实错误，也不是全站剩余问题上限。零信号或已有长文的主题仍需后续人工审阅。
- 原始目录、坐标、来源链接、方案、收藏ID、图片字节及其许可保留；新增展开合并适用的原段落和原来源对象。此系列未替换图片，也未把别的艺术家阅读算成旧路线已补足。
- 观察建议依据所列资料，不是现场考察；历史道路关系不等于现代可通行线路，机构旧资料不作为当前开放保证。

## 分批研究记录

| 批次 | 开发起点 | 新研究阅读 | 来源记录 | 资料与具体范围 |
| --- | --- | ---: | ---: | --- |
| 第2批 | `27bd4fe441008c13a05d34beaf725923575812d1` | 25 | 28 | [逐项文字和依据](../../../data/content-quality/batch-2.json)：25 researched readings in four existing themes; original summaries, links, imagery and IDs retained. Site observations are editorial suggestions based on the named evidence, not a field visit or live access certification. |
| 第3批 | `043a6639b9ee363ab35643a861ba3c1dd2ccdd83` | 19 | 28 | [逐项文字和依据](../../../data/content-quality/batch-3.json)：19 tea/trade-network readings: 18 previously missing and one deepened; Rasuwagadhi remains a specific research gap. No media, original catalogue text, coordinates, routes or original source URLs replaced. |
| 第4批 | `cee6490bef782542632a0e902e9e4c22d7454208` | 24 | 33 | [逐项文字和依据](../../../data/content-quality/batch-4.json)：Eight Mozart city contexts and all sixteen existing Via Francigena nodes. Seven Mozart and sixteen Francigena candidate contexts newly receive specific readings; Salzburg is deepened with prior content retained. No photos or geographic records replaced. |
| 第5批 | `b2ee671336205206e9ab248e32e42439444e76d7` | 15 | 24 | [逐项文字和依据](../../../data/content-quality/batch-5.json)：All fifteen existing Route 66 city contexts, with fourteen previously unexpanded places and one Luna Lodge reading deepened. Distinguishes historic alignments, reused structures, present access and symbolic endpoints. No geographic or photo replacement. |
| 第6批 | `191d764ca979e2b07905c4efaf5b2d4dc53d5775` | 17 | 32 | [逐项文字和依据](../../../data/content-quality/batch-6.json)：Nine existing Nakasendo contexts and eight Viking network contexts. Eleven previously unexpanded candidates and six deepened readings, separating original evidence, reconstruction, later maintenance, separate institutions and season-bound access. No geographic or photo replacement. |

第二批三峡/熊野/佛教/NC500：25处，22处原无展开；第三批茶马及相关网络：19处，18处原无展开；第四批莫扎特8处与Via Francigena16处：24处，23处原无展开；第五批66号公路15处：14处原无展开；第六批中山道9处与维京8处：17处，11处原无展开。雅安、萨尔茨堡等原资料合并保留，不重复声称新地点。第二批[原报告](batch-2.md)、第三批[原报告](batch-3.md)、第四批[原报告](batch-4.md)、第五批[原报告](batch-5.md)作为历史快照保留。

第六批区分：1911年日本桥与江户木桥，轻井泽宿与近代避暑地，妻笼1995年本阵复原与1877年脇本阵，马笼火灾旧址与1947年纪念馆，须原宿洪水迁移与寺院修缮；维京网络区分原物与实验考古、不同机构和湖岛，Law Rock精确位置未确定，北欧营地并非原住民活动之前的空白世界。须原、Haithabu与Birka限制均带2026-11核查日期。

## 第六批逐点证据

| 主题与地点 | 阅读 | 主要依据 |
| --- | --- | --- |
| nakasendo / `nakasendo-tokyo` | 江户道路起点上的近代石桥 | [日本文化厅：1911年日本桥的结构与装饰](https://kunishitei.bunka.go.jp/bsys/maindetails/102/2073) |
| nakasendo / `nakasendo-karuizawa` | 从宿场街道走到近代礼拜堂 | [轻井泽旅游协会：宿场与现代避暑地的不同层次](https://karuizawa-kankokyokai.jp/about_karuizawa/498/) |
| nakasendo / `nakasendo-shimosuwa` | 两条街道交汇的温泉宿场 | [长野官方旅游：中山道与甲州道中交汇点](https://db.go-nagano.net/topics_detail6/id%3D4521) |
| nakasendo / `nakasendo-narai` | 漆梳商宅与人马调度的两种问屋 | [奈良井旅游协会：漆梳商中村邸](https://www.naraijuku.com/shop/post-51/) |
| nakasendo / `nakasendo-fukushima` | 关所与代官屋敷里的交通秩序 | [木曾町：福岛关所资料馆与通行检查](https://www.town-kiso.com/facility/100024/) |
| nakasendo / `nakasendo-suhara` | 水舟、洪水迁宿与正在修复的寺院 | [大桑村：须原宿洪水迁移、水舟与地方生活](https://www.vill.okuwa.lg.jp/kanko/okuwajiten/dictionary.html) |
| nakasendo / `nakasendo-tsumago` | 本阵、脇本阵与保存街道的不同年代 | [南木曾旅游协会：妻笼本阵1995年复原](https://nagiso.jp/topics/tsumago-juku-honjin/) |
| nakasendo / `nakasendo-magome` | 石坡、水车与藤村作品的出生地 | [岐阜官方旅游：马笼石坡、水车与惠那山](https://www.kankou-gifu.jp/spot/detail_1363.html) |
| nakasendo / `nakasendo-kyoto` | 从桥上铭文读京都道路门户 | [京都官方旅游：三条大桥铭文、1590年工程与1950年改造](https://ja.kyoto.travel/tourism/single02.php?category_id=9&tourism_id=173) |
| viking / `viking-hedeby` | 原始器物与复原港镇分开看 | [Haithabu馆方：原始出土物与七座复原房屋](https://haithabu.de/en/dauerausstellung) |
| viking / `viking-ribe` | 考古博物馆与活态复原中心是两处 | [Ribe Viking Museum：考古原件、贸易、手工业与信仰](https://ribesvikinger.dk/en/about-the-museum/) |
| viking / `viking-roskilde` | 原船残骸与可航复原船的对读 | [维京船博物馆：五艘原船与季节性港区](https://www.vikingeskibsmuseet.dk/en/visit-the-museum/) |
| viking / `viking-birka` | 湖岛上的遗存与缓冲区复原村 | [UNESCO：Birka与Hovgården的遗存、不同岛屿及复原区](https://whc.unesco.org/en/list/555) |
| viking / `viking-york` | 从湿土保存的鞋与梳读Jorvik | [JORVIK：1976—1981年Coppergate发掘与保存条件](https://www.jorvikvikingcentre.co.uk/about/jorvik-story/coppergate-dig/) |
| viking / `viking-dublin` | 木梳、银秤与港城的混合工艺 | [爱尔兰国家博物馆：都柏林维京考古与混合工艺](https://source.museum.ie/en-ie/collections-research/irish-antiquities-division-collections/collections-list-%281%29/viking) |
| viking / `viking-thingvellir` | 裂谷里读议会遗存与后世记忆 | [UNESCO：议会遗存、裂谷与多时期文化景观](https://whc.unesco.org/en/list/1152/) |
| viking / `viking-lans` | 草皮墙基与小型炼铁区的北大西洋证据 | [Parks Canada：草皮墙基、考古证据与更早地方居住史](https://www.parcs.canada.ca/lhn-nhs/nl/meadows/culture) |

已合并批次的CI、截图Library身份与公网字节核对见[交付证据](../../../qa/content-quality/deliveries.json)。该文件只记录已经验证的历史发布，未列入的本地/PR批次仍应查对应CI状态。

## 已明确仍需研究

- `tea-rasuwa`：官方海关史PDF本轮返回503；现有移民机关与灾情门户不能代替古道或堡垒遗存证据，继续待研究，不用通关提示凑篇幅。
- `silk-tashkent`、`silk-bukhara`：需要把贸易、学术关联落到具体建筑与街区。
- 徐霞客、马可波罗、圣地亚哥法国之路、丝路仍有较多候选，按可见行程与明确薄弱点优先继续。安第斯Desaguadero–Titijoni与Tiwanacu已有展开但构筑物证据仍欠专门研究，不能因字数或无信号视作完成。

## 质量方法与复核文件

1. 依index顺序载入生产注册数据，遍历全部主题（含隐藏旧入口）；原基线[压缩快照](../../../qa/content-quality/baseline-2026-11-18.json.gz)不可覆盖。按实际主题语境取共享城市阅读，不拿人物网络替代旧路线。
2. 空文、无HTTPS来源、短概要且无专属展开、跨主题回退、跨地点重复段落只产生信号。自动枚举不认证事实、许可或实时开放；这些需人工阅读。
3. 人工核对特色、年代、地理、主题关联、原址/迁建/馆藏/现代复原与可观察对象。[人工记录](../../../qa/content-quality/manual-reviews.json)绑定文本和来源指纹，变化即失效。机构页面也可能有错误，不因官网身份自动采用所有说法。
4. [逐语境CSV](../../../qa/content-quality/contexts.csv)列全部语境，[最新报告](../../../qa/content-quality/latest.json)列全部主题与方案；[旧候选原主题](../../../qa/content-quality/legacy-candidates.json)防止跨主题虚增完成量。
5. 独立批次经`node scripts/build-quality-readings.cjs`生成同一生产bundle；`--check`验证未漂移。原数据逐字段、原图逐字节核对，适用的原阅读逐段和逐来源对象保留；只有明确的旧错主题回退可被有证据的新主题阅读替代。
6. 真实Chromium检查每处新研究在桌面1440×1000和手机390×844的概要、两节、全部新来源与原链接、关闭返回及溢出；并回归主题隔离、前后站、收藏、刷新与旧链接。不等于实体手机实测或全站历史事实验收。

## 历史226个候选的当前对照

| 判断 | 数量 |
| --- | ---: |
| still-automatic-candidate | 133 |
| useful-concise | 5 |
| researched-batch-2 | 22 |
| researched-batch-3 | 18 |
| researched-batch-6 | 11 |
| researched-batch-4 | 23 |
| researched-batch-5 | 14 |

旧226只是历史清单，不是今日全站范围。其他人物主题已有展开不冲销原路线缺口。候选减少来自具体研究或有用短文判断，不以加字数、链接数量或测试通过替代事实核查。

## 全主题当前状态

“语境”仅证明程序已枚举；“人工判断”才是本系列读过并记录结论的范围。

| 主题ID | 名称 | 入口 | 语境 | 自动候选 | 人工判断 |
| --- | --- | --- | ---: | ---: | ---: |
| `nature` | 世界自然遗产 | 可见 | 282 | 4 | 1 |
| `culture` | 世界文化遗产 | 可见 | 1033 | 19 | 4 |
| `gorges` | 三峡古镇 | 可见 | 6 | 0 | 6 |
| `parks` | 美国国家公园 | 可见 | 63 | 0 | 0 |
| `tea` | 茶马古道 | 可见 | 20 | 1 | 20 |
| `silk` | 丝绸之路 | 可见 | 26 | 25 | 2 |
| `polo` | 马可波罗游记 | 可见 | 23 | 23 | 0 |
| `xu` | 徐霞客全国游踪 | 可见 | 24 | 24 | 0 |
| `kumano` | 熊野古道 | 可见 | 6 | 0 | 6 |
| `camino` | 圣地亚哥朝圣之路 | 可见 | 43 | 42 | 0 |
| `nakasendo` | 中山道 | 可见 | 9 | 0 | 9 |
| `francigena` | 弗兰奇杰纳之路 | 可见 | 16 | 0 | 16 |
| `andes` | 安第斯道路网 | 可见 | 10 | 0 | 0 |
| `buddhist` | 佛教四大圣地 | 可见 | 4 | 0 | 4 |
| `canal` | 中国大运河 | 可见 | 11 | 0 | 0 |
| `viking` | 维京文化网络 | 可见 | 8 | 0 | 8 |
| `impressionism` | 印象派的足迹 | 可见 | 15 | 0 | 0 |
| `mozart` | 莫扎特的欧洲之旅 | 可见 | 8 | 0 | 8 |
| `route66` | 美国 66 号公路 | 可见 | 15 | 0 | 15 |
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

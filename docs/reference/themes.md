# 当前主题目录

[项目首页](../../README.md) · [文档总览](../README.md) · [统计JSON](catalogue.json)

本表按生产 `index.html` 的实际脚本顺序读取，每次运行 `node scripts/check-docs.cjs --write` 更新。地点可属于多个主题，主题行不能相加当全站地点数。
全量2030个地点、135个内部主题、62个可见入口；382条主题/方案关联按稳定方案ID去重为356个。可见入口注册271个不同方案ID，首页还会按推荐规则筛选，不能把这份注册表当首页卡片数量。

隐藏原主题承接人物上下文、原方案和旧链接，不作为重复首页入口。审计中的“plans”字段采用主题/方案关联条目口径，独立方案按稳定ID去重。

## 可见地图入口

| 主题 | 稳定ID | 地点关联 | 方案关联 |
| --- | --- | ---: | ---: |
| 世界自然遗产 | `nature` | 282 | 8 |
| 世界文化遗产 | `culture` | 1033 | 11 |
| 三峡古镇 | `gorges` | 6 | 6 |
| 美国国家公园 | `parks` | 63 | 9 |
| 茶马古道 | `tea` | 20 | 9 |
| 丝绸之路 | `silk` | 26 | 5 |
| 马可波罗游记 | `polo` | 23 | 5 |
| 徐霞客全国游踪 | `xu` | 24 | 6 |
| 熊野古道 | `kumano` | 6 | 3 |
| 圣地亚哥朝圣之路 | `camino` | 43 | 3 |
| 中山道 | `nakasendo` | 9 | 3 |
| 弗兰奇杰纳之路 | `francigena` | 16 | 3 |
| 安第斯道路网 | `andes` | 10 | 3 |
| 佛教四大圣地 | `buddhist` | 4 | 2 |
| 中国大运河 | `canal` | 11 | 3 |
| 维京文化网络 | `viking` | 8 | 3 |
| 印象派的足迹 | `impressionism` | 15 | 3 |
| 美国 66 号公路 | `route66` | 15 | 3 |
| 苏格兰北海岸 500 | `nc500` | 11 | 2 |
| 荷兰黄金时代艺术：代尔夫特、海牙与阿姆斯特丹 | `vermeer` | 5 | 3 |
| 中国沿边沿海公路 | `drive-china` | 30 | 6 |
| 北美公路旅行 | `drive-northamerica` | 28 | 5 |
| 欧洲海岸与环岛公路 | `drive-europe` | 13 | 2 |
| 南半球海岸与峡湾 | `drive-southern` | 17 | 3 |
| 泛美公路 | `panamerican` | 31 | 7 |
| 高更的地方：布列塔尼、阿尔勒与太平洋 | `gauguin` | 5 | 3 |
| 夏加尔的故乡与南法 | `chagall` | 5 | 3 |
| 布列松的城市摄影 | `cartier-bresson` | 3 | 2 |
| 苏轼的任职与贬谪 | `su-shi` | 10 | 6 |
| 蓝田与终南：王维诗境和长安南郊 | `wang-wei` | 4 | 2 |
| 湘西：沈从文的故居、街巷与沅水 | `shen-congwen` | 5 | 3 |
| 呼兰与哈尔滨：萧红的生活、写作与纪念 | `xiao-hong` | 5 | 3 |
| 拜伦的湖畔与希腊 | `byron` | 4 | 3 |
| 布拉格的卡夫卡：街巷、书写与墓园 | `kafka` | 5 | 3 |
| 乔伊斯的城市网络 | `joyce` | 4 | 3 |
| 智利中部：聂鲁达的家、港城与艺术 | `neruda` | 5 | 4 |
| 哥伦比亚加勒比：马尔克斯与地方生活 | `marquez` | 5 | 4 |
| 孟加拉的泰戈尔：城市、校园与河流庄园 | `tagore` | 5 | 3 |
| 现代建筑：住宅、公共空间与地方实验 | `modern-architecture` | 10 | 3 |
| 日本艺境：山水、光与空间 | `setouchi-art` | 14 | 8 |
| 雕塑、装置与艺术空间 | `paris-sculpture` | 19 | 9 |
| 南法画境：普罗旺斯与蔚蓝海岸 | `southern-france-painters` | 10 | 4 |
| 西班牙艺境：城市、海岸与家屋 | `barcelona-art` | 12 | 5 |
| 富士与东海道：版画、箱根和山海地景 | `fuji-tokaido` | 9 | 3 |
| 墨西哥城艺术：住宅、原址与迁移的壁画 | `mexico-city-art` | 5 | 3 |
| 底特律地区：工业、艺术与设计 | `detroit-art` | 4 | 3 |
| 音乐家的足迹：城市、家园与跨洋回声 | `european-music-cities` | 37 | 11 |
| 意大利：画家与作家的城市 | `italian-art-journeys` | 11 | 5 |
| 美国西部：地貌、艺术与文学 | `american-west-art` | 15 | 6 |
| 纽约与华盛顿：收藏、庭园与艺术空间 | `east-coast-art` | 6 | 4 |
| 日本文学地景：山寺、温泉、书斋与诗馆 | `japan-literary-landscapes` | 9 | 4 |
| 开罗街巷：文学、住宅与宗教建筑 | `cairo-city-stories` | 5 | 3 |
| 长江与入蜀诗文：城市、祠庙与山峡 | `yangtze-writing` | 7 | 4 |
| 巴黎、诺曼底与根西岛：书房和海岸 | `paris-normandy-writing` | 7 | 4 |
| 江南诗画：水城、山川与日常 | `jiangnan-poetry-painting` | 11 | 6 |
| 北欧艺术家的家园与风景 | `nordic-art-homes` | 9 | 3 |
| 英格兰文学艺术与乡野 | `england-literature-art` | 27 | 11 |
| 中国画家的家园、行旅与收藏 | `chinese-painters` | 8 | 2 |
| 美洲文学地理：书房、河岸与城市 | `americas-literary-geography` | 10 | 3 |
| 加拿大落基山 | `canadian-rockies` | 8 | 3 |
| 新西兰南岛 · 三条 Great Walks | `nz-great-walks` | 17 | 3 |
| 巴塔哥尼亚 · 冰川与塔峰 | `patagonia-nature` | 14 | 5 |

## 原主题与兼容入口

| 主题 | 稳定ID | 地点关联 | 方案关联 |
| --- | --- | ---: | ---: |
| 莫扎特的欧洲之旅 | `mozart` | 8 | 3 |
| 梵高在法国 | `vangogh` | 6 | 2 |
| 北斋 · 富士山的多种看法 | `hokusai` | 6 | 3 |
| 巴赫 · 中德音乐地景 | `bach` | 6 | 2 |
| 简·奥斯汀 · 生活与小说地景 | `austen` | 6 | 3 |
| 高迪的建筑世界 | `gaudi` | 3 | 1 |
| 赖特的乡野与沙漠 | `wright` | 2 | 1 |
| 勒·柯布西耶的跨国建筑 | `le-corbusier` | 3 | 1 |
| 阿尔瓦·阿尔托建筑路线 | `aalto` | 3 | 1 |
| 安藤忠雄的直岛 | `ando` | 3 | 1 |
| 罗丹的工作室与花园 | `rodin` | 2 | 1 |
| 布朗库西的城市雕塑与工作室 | `brancusi` | 4 | 3 |
| 赫普沃斯的圣艾夫斯 | `hepworth` | 2 | 1 |
| 野口勇的雕塑与庭园 | `noguchi` | 2 | 1 |
| 贾科梅蒂的山谷与巴黎 | `giacometti` | 4 | 3 |
| 亨利·摩尔的雕塑景观 | `henry-moore` | 2 | 1 |
| 犹他大地艺术：史密森与霍尔特 | `utah-land-art` | 2 | 1 |
| 透纳的意大利旅行 | `turner` | 3 | 1 |
| 塞尚的普罗旺斯 | `cezanne` | 3 | 1 |
| 达利三角 | `dali` | 3 | 1 |
| 马蒂斯的尼斯与旺斯 | `matisse` | 2 | 1 |
| 蒙克的海岸与居所 | `munch` | 3 | 2 |
| 奥姬芙的新墨西哥 | `okeeffe` | 2 | 1 |
| 广重的东海道 | `hiroshige` | 2 | 1 |
| 索罗亚的西班牙 | `sorolla` | 2 | 1 |
| 康斯太勃尔乡野 | `constable` | 3 | 1 |
| 张大千的游历与园林 | `zhang-daqian` | 5 | 3 |
| 毕加索的城市生活 | `picasso` | 2 | 1 |
| 弗里达的墨西哥与美国 | `frida` | 3 | 1 |
| 吴冠中的游历与写生 | `wu-guanzhong` | 3 | 1 |
| 齐白石的五出五归 | `qi-baishi` | 3 | 2 |
| 黄宾虹的山水纪游 | `huang-binhong` | 2 | 1 |
| 丰子恺的生活与迁徙 | `feng-zikai` | 3 | 1 |
| 东山魁夷的风景旅行 | `higashiyama` | 3 | 2 |
| 里维拉的壁画地理 | `rivera` | 4 | 1 |
| 安塞尔·亚当斯的国家公园摄影 | `ansel-adams` | 2 | 1 |
| 李·米勒的摄影与旅居 | `lee-miller` | 2 | 1 |
| 杉本博司的观看与空间 | `sugimoto` | 2 | 1 |
| 克里斯托与珍妮-克劳德的临时作品 | `christo-jeanneclaude` | 4 | 2 |
| 特瑞尔的光与天空 | `turrell` | 2 | 1 |
| 贝多芬的居住地图 | `beethoven` | 2 | 1 |
| 肖邦与乔治·桑 | `chopin` | 4 | 2 |
| 李斯特的欧洲居所 | `liszt` | 2 | 1 |
| 克拉拉与罗伯特·舒曼 | `schumanns` | 2 | 1 |
| 瓦格纳的琉森与拜罗伊特 | `wagner` | 2 | 1 |
| 马勒的作曲小屋 | `mahler` | 2 | 1 |
| 德沃夏克的美国经历 | `dvorak` | 4 | 2 |
| 西贝柳斯的芬兰 | `sibelius` | 3 | 2 |
| 卑尔根：格里格与近郊音乐家园 | `grieg` | 3 | 2 |
| 门德尔松：莱比锡与苏格兰 | `mendelssohn` | 4 | 2 |
| 普契尼的托斯卡纳 | `puccini` | 5 | 1 |
| 亨德尔的音乐城市 | `handel` | 2 | 1 |
| 李白的山川游历 | `li-bai` | 2 | 1 |
| 杜甫的漂泊 | `du-fu` | 2 | 1 |
| 白居易的城市与山水 | `bai-juyi` | 2 | 1 |
| 陆游《入蜀记》 | `lu-you` | 2 | 1 |
| 芭蕉《奥之细道》 | `basho` | 2 | 1 |
| 川端康成的文学地景 | `kawabata` | 2 | 1 |
| 夏目漱石的迁居与留学 | `soseki` | 3 | 1 |
| 歌德《意大利游记》 | `goethe` | 2 | 1 |
| 雨果的巴黎与流亡 | `hugo` | 3 | 1 |
| 华兹华斯的湖区 | `wordsworth` | 4 | 1 |
| 狄更斯的英国 | `dickens` | 2 | 1 |
| 普鲁斯特的记忆地景 | `proust` | 4 | 1 |
| 海明威的跨国生活 | `hemingway` | 4 | 3 |
| 斯坦贝克的加州与公路 | `steinbeck` | 4 | 1 |
| 马克·吐温：河岸、书房与文学邻居 | `mark-twain` | 5 | 3 |
| 马哈福兹的开罗 | `mahfouz` | 2 | 1 |
| 江南画家：水乡、山水与日常 | `jiangnan-painting` | 6 | 3 |
| 江南诗路：水城与山川 | `jiangnan-poetry` | 5 | 2 |
| 英国雕塑：从约克郡到海岸与花园 | `british-sculpture` | 6 | 3 |
| 英格兰东南：创作的房间、花园与海岸 | `southeast-england-creative` | 7 | 3 |
| 英格兰风景：河谷画境与湖区诗歌 | `english-landscapes` | 7 | 3 |

# 文化地图扩充：已接入的76个方向

本目录中的76个方向现已在生产代码中注册为可打开的主题地图，每个主题提供一组首批精选地点、一个无固定顺序的探访方案，以及逐点内容与来源。另有北斋、维米尔、巴赫、简·奥斯汀四个主题已先行接入。

“已接入”指下表中的精选地点已实现，不表示某人的完整生平、全部作品、原候选表中的所有地点或完整历史旅行都已完成。旧候选记录仍保留在 [catalogue.json](./catalogue.json) 的 candidatePlaces 字段，实际接入以 selectedPlaces 与 [live-atlas.json](./live-atlas.json) 为准。

入口：[全部艺术与人物](https://raeqi.github.io/world-travel-map/#interest=art)。此前的 `#interest=drives` 只显示公路主题。

## 本批实现范围

- 76个主题、76个精选地点方案、160处人物/作品与地点关系；相同物理地点复用记录。
- 首批选点共158个地点键；是否复用旧地点由运行时精确名称和坐标共同判定。
- 132张本地可重用图片，逐项保存来源、作者、许可与SHA-256；未配图点位不借用别处照片。
- 地点按生活、创作、描绘关系、馆藏、临时作品或限制访问状态说明。跨年代地点默认网络，不虚构历史连续旅行。
- 天数只是分区探访预算，不包含跨洲转场；开放、预约、天气仍须查看各管理方。

## 已接入主题与点位

### 绘画与版画

| 地图 | 本批已接入地点 |
| --- | --- |
| [透纳的意大利旅行](https://raeqi.github.io/world-travel-map/#theme=turner) | 威尼斯、罗马、那不勒斯 |
| [塞尚的普罗旺斯](https://raeqi.github.io/world-travel-map/#theme=cezanne) | 洛夫画室、比贝米采石场、圣维克多山 |
| [达利三角](https://raeqi.github.io/world-travel-map/#theme=dali) | 达利剧院博物馆、波特利加特达利故居、普波尔加拉·达利城堡 |
| [马蒂斯的尼斯与旺斯](https://raeqi.github.io/world-travel-map/#theme=matisse) | 尼斯马蒂斯博物馆、旺斯玫瑰经礼拜堂 |
| [蒙克的海岸与居所](https://raeqi.github.io/world-travel-map/#theme=munch) | 奥斯戈斯特兰、奥斯陆蒙克博物馆 |
| [奥姬芙的新墨西哥](https://raeqi.github.io/world-travel-map/#theme=okeeffe) | 幽灵牧场、阿比丘 |
| [广重的东海道](https://raeqi.github.io/world-travel-map/#theme=hiroshige) | 日本桥、由比与广重美术馆 |
| [高更的跨洋迁居](https://raeqi.github.io/world-travel-map/#theme=gauguin) | 蓬塔旺、塔希提岛 |
| [夏加尔的故乡与南法](https://raeqi.github.io/world-travel-map/#theme=chagall) | 维捷布斯克、圣保罗德旺斯 |
| [索罗亚的西班牙](https://raeqi.github.io/world-travel-map/#theme=sorolla) | 瓦伦西亚、纽约西班牙裔协会博物馆 |
| [康斯太勃尔乡野](https://raeqi.github.io/world-travel-map/#theme=constable) | 弗拉特福德、迪德姆 |
| [张大千的游历与园林](https://raeqi.github.io/world-travel-map/#theme=zhang-daqian) | 莫高窟、摩耶精舍 |
| [毕加索的城市生活](https://raeqi.github.io/world-travel-map/#theme=picasso) | 巴塞罗那毕加索博物馆、巴黎毕加索博物馆 |
| [弗里达的墨西哥与美国](https://raeqi.github.io/world-travel-map/#theme=frida) | 弗里达蓝屋、底特律 |
| [吴冠中的游历与写生](https://raeqi.github.io/world-travel-map/#theme=wu-guanzhong) | 宜兴、巴黎国立高等美术学院 |
| [齐白石的五出五归](https://raeqi.github.io/world-travel-map/#theme=qi-baishi) | 湘潭、北京齐白石故居 |
| [黄宾虹的山水纪游](https://raeqi.github.io/world-travel-map/#theme=huang-binhong) | 黄山、杭州 |
| [丰子恺的生活与迁徙](https://raeqi.github.io/world-travel-map/#theme=feng-zikai) | 石门缘缘堂、重庆 |
| [东山魁夷的风景旅行](https://raeqi.github.io/world-travel-map/#theme=higashiyama) | 长野县立美术馆东山魁夷馆、唐招提寺 |
| [里维拉的壁画地理](https://raeqi.github.io/world-travel-map/#theme=rivera) | 底特律美术馆、墨西哥国民宫 |

### 音乐

| 地图 | 本批已接入地点 |
| --- | --- |
| [贝多芬的居住地图](https://raeqi.github.io/world-travel-map/#theme=beethoven) | 波恩贝多芬故居、维也纳海利根施塔特 |
| [肖邦与乔治·桑](https://raeqi.github.io/world-travel-map/#theme=chopin) | 诺昂乔治·桑故居、瓦尔德莫萨 |
| [李斯特的欧洲居所](https://raeqi.github.io/world-travel-map/#theme=liszt) | 雷丁李斯特出生地、魏玛李斯特故居 |
| [克拉拉与罗伯特·舒曼](https://raeqi.github.io/world-travel-map/#theme=schumanns) | 莱比锡舒曼故居、杜塞尔多夫 |
| [瓦格纳的琉森与拜罗伊特](https://raeqi.github.io/world-travel-map/#theme=wagner) | 特里布申瓦格纳博物馆、拜罗伊特节日剧院 |
| [马勒的作曲小屋](https://raeqi.github.io/world-travel-map/#theme=mahler) | 阿特湖作曲小屋、多比亚科作曲小屋 |
| [德沃夏克的美国经历](https://raeqi.github.io/world-travel-map/#theme=dvorak) | 布拉格德沃夏克博物馆、斯皮尔维尔 |
| [西贝柳斯的芬兰](https://raeqi.github.io/world-travel-map/#theme=sibelius) | 艾诺拉、赫尔辛基 |
| [格里格的卑尔根与峡湾](https://raeqi.github.io/world-travel-map/#theme=grieg) | 特罗尔豪根、卑尔根 |
| [门德尔松的苏格兰旅行](https://raeqi.github.io/world-travel-map/#theme=mendelssohn) | 荷里路德修道院、斯塔法岛与芬格尔洞 |
| [普契尼的托斯卡纳](https://raeqi.github.io/world-travel-map/#theme=puccini) | 卢卡普契尼故居、托雷德尔拉戈 |
| [亨德尔的音乐城市](https://raeqi.github.io/world-travel-map/#theme=handel) | 哈雷亨德尔故居、伦敦亨德尔故居 |

### 文学与游记

| 地图 | 本批已接入地点 |
| --- | --- |
| [苏轼的任职与贬谪](https://raeqi.github.io/world-travel-map/#theme=su-shi) | 黄州、儋州 |
| [李白的山川游历](https://raeqi.github.io/world-travel-map/#theme=li-bai) | 敬亭山、桃花潭 |
| [杜甫的漂泊](https://raeqi.github.io/world-travel-map/#theme=du-fu) | 成都杜甫草堂、岳阳楼 |
| [王维的山水与辋川](https://raeqi.github.io/world-travel-map/#theme=wang-wei) | 蓝田辋川区域、终南山 |
| [白居易的城市与山水](https://raeqi.github.io/world-travel-map/#theme=bai-juyi) | 杭州、苏州 |
| [陆游《入蜀记》](https://raeqi.github.io/world-travel-map/#theme=lu-you) | 绍兴、奉节与夔州区域 |
| [沈从文《湘行散记》](https://raeqi.github.io/world-travel-map/#theme=shen-congwen) | 凤凰古城、常德 |
| [萧红的流动人生](https://raeqi.github.io/world-travel-map/#theme=xiao-hong) | 呼兰、哈尔滨 |
| [芭蕉《奥之细道》](https://raeqi.github.io/world-travel-map/#theme=basho) | 松岛、山寺立石寺 |
| [川端康成的文学地景](https://raeqi.github.io/world-travel-map/#theme=kawabata) | 天城山与伊豆山地、越后汤泽 |
| [夏目漱石的迁居与留学](https://raeqi.github.io/world-travel-map/#theme=soseki) | 松山、伦敦 |
| [歌德《意大利游记》](https://raeqi.github.io/world-travel-map/#theme=goethe) | 罗马歌德之家、那不勒斯 |
| [雨果的巴黎与流亡](https://raeqi.github.io/world-travel-map/#theme=hugo) | 巴黎雨果故居、欧特维尔故居 |
| [拜伦的湖畔与希腊](https://raeqi.github.io/world-travel-map/#theme=byron) | 希永城堡、米索隆吉 |
| [华兹华斯的湖区](https://raeqi.github.io/world-travel-map/#theme=wordsworth) | 鸽舍、莱德尔山庄 |
| [狄更斯的英国](https://raeqi.github.io/world-travel-map/#theme=dickens) | 伦敦狄更斯博物馆、布罗德斯泰斯 |
| [卡夫卡的城市与生活](https://raeqi.github.io/world-travel-map/#theme=kafka) | 布拉格、克洛斯特新堡基尔灵 |
| [乔伊斯的城市网络](https://raeqi.github.io/world-travel-map/#theme=joyce) | 都柏林乔伊斯中心、的里雅斯特 |
| [普鲁斯特的记忆地景](https://raeqi.github.io/world-travel-map/#theme=proust) | 伊利耶-贡布雷、卡堡 |
| [海明威的跨国生活](https://raeqi.github.io/world-travel-map/#theme=hemingway) | 基韦斯特海明威故居、瞭望庄园 |
| [斯坦贝克的加州与公路](https://raeqi.github.io/world-travel-map/#theme=steinbeck) | 萨利纳斯国家斯坦贝克中心、蒙特雷罐头厂街 |
| [马克·吐温的密西西比河](https://raeqi.github.io/world-travel-map/#theme=mark-twain) | 汉尼拔马克·吐温童年故居、哈特福德马克·吐温故居 |
| [聂鲁达的三座房子](https://raeqi.github.io/world-travel-map/#theme=neruda) | 圣地亚哥拉查斯科纳、瓦尔帕莱索拉塞巴斯蒂亚纳、黑岛故居 |
| [马尔克斯的加勒比](https://raeqi.github.io/world-travel-map/#theme=marquez) | 阿拉卡塔卡、卡塔赫纳 |
| [泰戈尔的孟加拉世界](https://raeqi.github.io/world-travel-map/#theme=tagore) | 加尔各答乔拉桑科故居、圣蒂尼克坦 |
| [马哈福兹的开罗](https://raeqi.github.io/world-travel-map/#theme=mahfouz) | 汗哈利利与老开罗、马哈福兹博物馆 |

### 雕塑

| 地图 | 本批已接入地点 |
| --- | --- |
| [罗丹的工作室与花园](https://raeqi.github.io/world-travel-map/#theme=rodin) | 巴黎罗丹博物馆、默东罗丹故居与工作室 |
| [布朗库西的城市雕塑与工作室](https://raeqi.github.io/world-travel-map/#theme=brancusi) | 特尔古日乌雕塑群、巴黎布朗库西工作室收藏 |
| [赫普沃斯的圣艾夫斯](https://raeqi.github.io/world-travel-map/#theme=hepworth) | 赫普沃斯博物馆与雕塑花园、泰特圣艾夫斯 |
| [野口勇的雕塑与庭园](https://raeqi.github.io/world-travel-map/#theme=noguchi) | 纽约野口勇博物馆、野口勇庭园美术馆 |
| [贾科梅蒂的山谷与巴黎](https://raeqi.github.io/world-travel-map/#theme=giacometti) | 斯坦帕与布雷加利亚山谷、巴黎贾科梅蒂研究院 |
| [亨利·摩尔的雕塑景观](https://raeqi.github.io/world-travel-map/#theme=henry-moore) | 亨利·摩尔工作室与花园、利兹亨利·摩尔研究所 |

### 建筑

| 地图 | 本批已接入地点 |
| --- | --- |
| [高迪的建筑世界](https://raeqi.github.io/world-travel-map/#theme=gaudi) | 古埃尔公园、巴特罗之家、圣家堂 |
| [赖特的乡野与沙漠](https://raeqi.github.io/world-travel-map/#theme=wright) | 塔里埃森、西塔里埃森 |
| [勒·柯布西耶的跨国建筑](https://raeqi.github.io/world-travel-map/#theme=le-corbusier) | 萨伏伊别墅、马赛公寓、国立西洋美术馆 |
| [阿尔瓦·阿尔托建筑路线](https://raeqi.github.io/world-travel-map/#theme=aalto) | 阿尔托自宅、塞于奈察洛市政厅、帕伊米奥疗养院 |
| [安藤忠雄的直岛](https://raeqi.github.io/world-travel-map/#theme=ando) | 安藤博物馆、倍乐生之家美术馆、地中美术馆 |

### 摄影

| 地图 | 本批已接入地点 |
| --- | --- |
| [安塞尔·亚当斯的国家公园摄影](https://raeqi.github.io/world-travel-map/#theme=ansel-adams) | 优胜美地山谷、冰川点 |
| [布列松的城市摄影](https://raeqi.github.io/world-travel-map/#theme=cartier-bresson) | 北京、上海 |
| [李·米勒的摄影与旅居](https://raeqi.github.io/world-travel-map/#theme=lee-miller) | 开罗、法利农舍 |
| [杉本博司的观看与空间](https://raeqi.github.io/world-travel-map/#theme=sugimoto) | 江之浦测候所、直岛护王神社 |

### 装置与光

| 地图 | 本批已接入地点 |
| --- | --- |
| [克里斯托与珍妮-克劳德的临时作品](https://raeqi.github.io/world-travel-map/#theme=christo-jeanneclaude) | 柏林国会大厦、伊塞奥湖 |
| [特瑞尔的光与天空](https://raeqi.github.io/world-travel-map/#theme=turrell) | 直岛南寺、罗登火山口 |

### 大地艺术

| 地图 | 本批已接入地点 |
| --- | --- |
| [犹他大地艺术：史密森与霍尔特](https://raeqi.github.io/world-travel-map/#theme=utah-land-art) | 螺旋防波堤、太阳隧道 |

## 仍可扩展

这里是每个方向的首批地点集。尚未逐画建立关联的作品、未加入的旅行分站、未完成图片核验的点位，都没有被记作完成。详细研究、更多作品图像与精确历史旅次可在现有主题上继续扩充。

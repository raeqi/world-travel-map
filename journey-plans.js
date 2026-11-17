'use strict';
// Days and seasonal windows are editorial proposals, never live access guarantees.
// network = thematic selection; route = ordered corridor; loop = return to first stop.
const journeyPlans=[
  {
    "id": "nakasendo-kiso",
    "theme": "nakasendo",
    "name": "中山道 · 木曾五宿精选",
    "ids": [
      "nakasendo-narai",
      "nakasendo-fukushima",
      "nakasendo-suhara",
      "nakasendo-tsumago",
      "nakasendo-magome"
    ],
    "days": 5,
    "months": [
      4,
      5,
      6,
      9,
      10,
      11
    ],
    "transport": "铁路 / 公交接驳 + 分段步行",
    "reason": "由奈良井南行，逐站看木曾谷宿场。连线是节点顺序，不表示各宿之间全部存在连续保存的古步道，每日步行、熊出没信息及返程班次须查官方资料。",
    "topology": "route",
    "climate": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/"
  },
  {
    "id": "nakasendo-short",
    "theme": "nakasendo",
    "name": "中山道 · 妻笼与马笼",
    "ids": [
      "nakasendo-tsumago",
      "nakasendo-magome"
    ],
    "days": 2,
    "months": [
      4,
      5,
      6,
      9,
      10,
      11
    ],
    "transport": "宿场步行 + 公交接驳",
    "reason": "用两天看两座宿场并选择两者间的古道步行。地图连线不对应真实步道距离，雨雪、日落时间及交通须另查。",
    "topology": "route",
    "climate": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/"
  },
  {
    "id": "nakasendo-corridor",
    "theme": "nakasendo",
    "name": "中山道 · 东京到京都文化走廊",
    "ids": [
      "nakasendo-tokyo",
      "nakasendo-karuizawa",
      "nakasendo-shimosuwa",
      "nakasendo-narai",
      "nakasendo-fukushima",
      "nakasendo-suhara",
      "nakasendo-tsumago",
      "nakasendo-magome",
      "nakasendo-kyoto"
    ],
    "days": 12,
    "months": [
      4,
      5,
      10,
      11
    ],
    "transport": "现代铁路 + 区域接驳 + 宿场步行",
    "reason": "按历史走廊组织当代分段文化旅行，省略中间多数宿场，绝非全程徒步计划。地图连线仅作方向示意，十二天为编辑建议而非历史旅程用时。",
    "topology": "route",
    "climate": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/"
  },
  {
    "id": "francigena-north",
    "theme": "francigena",
    "name": "弗兰奇杰纳 · 坎特伯雷至罗马走廊",
    "ids": [
      "francigena-canterbury",
      "francigena-dover",
      "francigena-calais",
      "francigena-arras",
      "francigena-reims",
      "francigena-langres",
      "francigena-besancon",
      "francigena-lausanne",
      "francigena-martigny",
      "francigena-bernard",
      "francigena-aosta",
      "francigena-pavia",
      "francigena-lucca",
      "francigena-siena",
      "francigena-viterbo",
      "francigena-rome"
    ],
    "days": 85,
    "months": [
      6,
      7,
      8
    ],
    "transport": "长距离徒步 + 渡海接驳",
    "reason": "北段完整起终点的代表节点精选，不包含罗马以南延伸，也不是完整每日阶段表。约三个月仅是长途策划量级；地图连线不是真实步道，渡海和高山口必须单独确认，不能用所列月份推定全程适宜。",
    "topology": "route",
    "climate": "https://www.coe.int/en/web/cultural-routes/the-via-francigena"
  },
  {
    "id": "francigena-tuscany",
    "theme": "francigena",
    "name": "弗兰奇杰纳 · 托斯卡纳至罗马城市篇",
    "ids": [
      "francigena-lucca",
      "francigena-siena",
      "francigena-viterbo",
      "francigena-rome"
    ],
    "days": 10,
    "months": [
      4,
      5,
      9,
      10
    ],
    "transport": "城际交通 + 城内步行",
    "reason": "以四座城市为基地进行当代文化探访，不声称十天能徒步走完此段。连线省略正式步行阶段，想徒步者需按官方里程另作计划。",
    "topology": "route",
    "climate": "https://www.coe.int/en/web/cultural-routes/the-via-francigena"
  },
  {
    "id": "francigena-alpine",
    "theme": "francigena",
    "name": "弗兰奇杰纳 · 阿尔卑斯山口篇",
    "ids": [
      "francigena-lausanne",
      "francigena-martigny",
      "francigena-bernard",
      "francigena-aosta"
    ],
    "days": 7,
    "months": [
      7,
      8,
      9
    ],
    "transport": "铁路 / 公路接驳 + 经核实的山地步行",
    "reason": "从湖畔城市到历史山口分段体验；只有确认山口开放、天气和体力条件后才加入高山步行。连线不是导航，积雪或关闭时改用低地交通。",
    "topology": "route",
    "climate": "https://www.coe.int/en/web/cultural-routes/the-via-francigena"
  },
  {
    "id": "andes-bolivia",
    "theme": "andes",
    "name": "安第斯路网 · 玻利维亚高原阅读",
    "ids": [
      "andes-desaguadero",
      "andes-tiwanacu"
    ],
    "days": 4,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "当地公路接驳 + 获准范围内参访",
    "reason": "选择玻利维亚的两个 UNESCO 路段代表点，先安排高原适应与当地向导。地图不承诺遗产段可自由进入或连续徒步；区域联系不是精确古道路由。",
    "topology": "network",
    "climate": "https://whc.unesco.org/en/list/1459/maps/"
  },
  {
    "id": "andes-chile",
    "theme": "andes",
    "name": "安第斯路网 · 智利北部路段",
    "ids": [
      "andes-socoroma",
      "andes-zapahuira"
    ],
    "days": 4,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "当地接驳 + 获准范围内短程步行",
    "reason": "从索科罗马南段与萨帕维拉仓储段认识道路、聚落和物资网络。两点为遗产区域代表坐标，地图不是可直接行走的轨迹，须核实入口、许可与高原情况。",
    "topology": "network",
    "climate": "https://whc.unesco.org/en/list/1459/maps/"
  },
  {
    "id": "andes-peru",
    "theme": "andes",
    "name": "安第斯路网 · 秘鲁行政中心与古都",
    "ids": [
      "andes-huanuco",
      "andes-cusco"
    ],
    "days": 10,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "远距离航班 / 公路分段 + 城市基地",
    "reason": "把瓦努科潘帕与库斯科作为两个独立区域章节，中间预留长途转场和高原适应。不是两点之间的古道重走；地图连线不作导航，也不把马丘比丘徒步段代表整个六国网络。",
    "topology": "network",
    "climate": "https://whc.unesco.org/en/list/1459/maps/"
  },
  {
    "id": "buddhist-four",
    "theme": "buddhist",
    "name": "佛教四圣地 · 生平阅读图",
    "ids": [
      "buddhist-lumbini",
      "buddhist-bodhgaya",
      "buddhist-sarnath",
      "buddhist-kushinagar"
    ],
    "days": 12,
    "months": [
      1,
      2,
      11,
      12
    ],
    "transport": "跨境手续 + 当代公路 / 铁路接驳",
    "reason": "按诞生、成道、初转法轮与涅槃的故事顺序展示，不是交通最优顺序。实际探访应重新排序、核实印度与尼泊尔入境条件和开放。地图为主题网络，十二天仅是预留转场的初稿。",
    "topology": "network",
    "climate": "https://whc.unesco.org/document/185683"
  },
  {
    "id": "buddhist-india",
    "theme": "buddhist",
    "name": "佛教圣地 · 印度三地探访",
    "ids": [
      "buddhist-bodhgaya",
      "buddhist-sarnath",
      "buddhist-kushinagar"
    ],
    "days": 8,
    "months": [
      1,
      2,
      11,
      12
    ],
    "transport": "当地公路 / 铁路 + 分地住宿",
    "reason": "只选印度境内三处，不跨越国境；结合遗址与当代宗教生活，保留安静参访时间。地图按文化主题串联，具体交通、开放、节庆和雾天影响需另核实。",
    "topology": "network",
    "climate": "https://whc.unesco.org/document/185683"
  },
  {
    "id": "canal-jinghang",
    "theme": "canal",
    "name": "大运河 · 京杭城市精选",
    "ids": [
      "canal-beijing",
      "canal-tongzhou",
      "canal-tianjin",
      "canal-linqing",
      "canal-jining",
      "canal-huaian",
      "canal-yangzhou",
      "canal-zhenjiang",
      "canal-suzhou",
      "canal-jiaxing",
      "canal-hangzhou"
    ],
    "days": 20,
    "months": [
      4,
      5,
      9,
      10
    ],
    "transport": "城际铁路 / 公路 + 沿岸步行",
    "reason": "从北到南阅读京杭城市与漕运文化，包含现代交通转场，不是全程乘船路线。地图直线不代表河道，所选也不等同于包含隋唐与浙东水系的全部大运河遗产。",
    "topology": "route",
    "climate": "https://whc.unesco.org/en/list/1443/"
  },
  {
    "id": "canal-jiangnan",
    "theme": "canal",
    "name": "大运河 · 江南水城慢游",
    "ids": [
      "canal-yangzhou",
      "canal-zhenjiang",
      "canal-suzhou",
      "canal-jiaxing",
      "canal-hangzhou"
    ],
    "days": 8,
    "months": [
      4,
      5,
      9,
      10
    ],
    "transport": "城际交通 + 古城步行",
    "reason": "以江南城市为基地观察水运与街巷生活；长江跨越及城市之间使用当代交通，游船仅在核实运营的局部体验。地图连线不是实际水路。",
    "topology": "route",
    "climate": "https://whc.unesco.org/en/list/1443/"
  },
  {
    "id": "canal-north",
    "theme": "canal",
    "name": "大运河 · 都城与北方漕运",
    "ids": [
      "canal-beijing",
      "canal-tongzhou",
      "canal-tianjin"
    ],
    "days": 4,
    "months": [
      4,
      5,
      9,
      10
    ],
    "transport": "铁路 / 市内交通 + 滨水步行",
    "reason": "用都城、通州和天津的三组节点理解北方水路。地图上的河道关联不代表连续可通航的旅行线路。",
    "topology": "route",
    "climate": "https://whc.unesco.org/en/list/1443/"
  },
  {
    "id": "viking-northsea",
    "theme": "viking",
    "name": "维京遗产 · 德国与丹麦精选",
    "ids": [
      "viking-hedeby",
      "viking-ribe",
      "viking-roskilde"
    ],
    "days": 8,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "铁路 / 公路分段 + 博物馆参访",
    "reason": "由今天德国的海泽比到丹麦遗产地点，认识交易、船舶与定居。此为现代文化探访组合，不是考证后的单次维京航海路线；地图不绘制假想海上航迹。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/the-viking-routes"
  },
  {
    "id": "viking-islands",
    "theme": "viking",
    "name": "维京遗产 · 约克与都柏林",
    "ids": [
      "viking-york",
      "viking-dublin"
    ],
    "days": 7,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "城际铁路 + 跨海航班或经核实渡轮",
    "reason": "以两座城市阅读北欧定居、贸易、冲突与地方社会关系。各地是文化网络节点，地图不表示直达船班或真实历史航程。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/the-viking-routes"
  },
  {
    "id": "viking-atlantic",
    "theme": "viking",
    "name": "维京遗产 · 冰岛与纽芬兰两地",
    "ids": [
      "viking-thingvellir",
      "viking-lans"
    ],
    "days": 12,
    "months": [
      6,
      7,
      8
    ],
    "transport": "远程航班 + 两个区域基地",
    "reason": "两个独立区域的长距离组合，须留出多次转机与地面交通时间；不是沿某条维京航路的邮轮产品。地图仅示意主题关联，季节开放与跨国入境另行核实。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/the-viking-routes"
  },
  {
    "id": "impressionism-seine",
    "theme": "impressionism",
    "name": "印象派 · 从巴黎到塞纳河畔",
    "ids": [
      "impressionism-paris",
      "impressionism-chatou",
      "impressionism-giverny",
      "impressionism-rouen"
    ],
    "days": 6,
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "transport": "铁路 / 公路接驳 + 美术馆与花园步行",
    "reason": "把作品收藏、河畔生活、故居花园和城市取景相互对照，不把不同画家和年代硬接成一次旅行。地图为主题网络；吉维尼花园开放和展品须先查。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/impressionisms-routes"
  },
  {
    "id": "impressionism-coast",
    "theme": "impressionism",
    "name": "印象派 · 诺曼底海岸画境",
    "ids": [
      "impressionism-honfleur",
      "impressionism-lehavre",
      "impressionism-etretat"
    ],
    "days": 4,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "区域公路接驳 + 海岸与美术馆参访",
    "reason": "将三个海岸地点作为艺术网络的一组探索，翁弗勒尔与勒阿弗尔分处河口两岸。地图不代表画家连续旅行轨迹，也不代表沿崖可任意穿行。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/impressionisms-routes"
  },
  {
    "id": "mozart-early",
    "theme": "mozart",
    "name": "莫扎特 · 早年萨尔茨堡与慕尼黑",
    "ids": [
      "mozart-salzburg",
      "mozart-munich"
    ],
    "days": 5,
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "transport": "当代铁路 + 故居与音乐场所",
    "reason": "以早年从萨尔茨堡赴慕尼黑的历史联系为章节，只呈现两端城市。地图不复原中间道路，天数是现代参访建议而非莫扎特的旅行时长。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways"
  },
  {
    "id": "mozart-viennaprague",
    "theme": "mozart",
    "name": "莫扎特 · 维也纳与布拉格",
    "ids": [
      "mozart-vienna",
      "mozart-prague"
    ],
    "days": 6,
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "transport": "当代铁路 + 城市文化参访",
    "reason": "以维也纳与布拉格的往来为独立章节，不与童年巡演混为同一次出行。地图只示城市关系，具体生平时点按官方资料阅读；音乐会另查当期节目。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways"
  },
  {
    "id": "mozart-western",
    "theme": "mozart",
    "name": "莫扎特 · 巴黎与伦敦的童年巡演记忆",
    "ids": [
      "mozart-paris",
      "mozart-london"
    ],
    "days": 7,
    "months": [
      4,
      5,
      6,
      9,
      10
    ],
    "transport": "跨境铁路或航班 + 城市参访",
    "reason": "选取童年欧洲大巡演中的两座城市进行现代主题阅读，不把现代直达交通当成历史路径。地图示意文化联系，并非完整巡演次序或旅程复原。",
    "topology": "network",
    "climate": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways"
  },
  {
    "id": "route66-classic",
    "theme": "route66",
    "name": "66号公路 · 八州经典走廊",
    "ids": [
      "route66-chicago",
      "route66-springfield",
      "route66-stlouis",
      "route66-joplin",
      "route66-galena",
      "route66-tulsa",
      "route66-okc",
      "route66-amarillo",
      "route66-albuquerque",
      "route66-gallup",
      "route66-flagstaff",
      "route66-kingman",
      "route66-barstow",
      "route66-losangeles",
      "route66-santamonica"
    ],
    "days": 21,
    "months": [
      4,
      5,
      9,
      10
    ],
    "transport": "分段自驾 + 路边城镇住宿",
    "reason": "覆盖八州的代表城镇，采用经阿尔伯克基的较后期主走廊，不同时混入所有历史改线。地图连线不是可直接导航的公路；须核实保留路段、施工、高温及高处积雪，终点标志也有时代差异。",
    "topology": "route",
    "climate": "https://www.nps.gov/orgs/1453/route-66-history.htm"
  },
  {
    "id": "route66-midwest",
    "theme": "route66",
    "name": "66号公路 · 中西部城镇篇",
    "ids": [
      "route66-chicago",
      "route66-springfield",
      "route66-stlouis",
      "route66-joplin",
      "route66-galena",
      "route66-tulsa"
    ],
    "days": 8,
    "months": [
      4,
      5,
      9,
      10
    ],
    "transport": "分段自驾 + 城市停留",
    "reason": "从大城市到密苏里、堪萨斯和俄克拉何马的公路城镇。地图省略中间道路与替代线，不能由直线距离估算驾车时间。",
    "topology": "route",
    "climate": "https://www.nps.gov/orgs/1453/route-66-history.htm"
  },
  {
    "id": "route66-southwest",
    "theme": "route66",
    "name": "66号公路 · 西南高原到太平洋",
    "ids": [
      "route66-albuquerque",
      "route66-gallup",
      "route66-flagstaff",
      "route66-kingman",
      "route66-barstow",
      "route66-losangeles",
      "route66-santamonica"
    ],
    "days": 10,
    "months": [
      4,
      5,
      9,
      10
    ],
    "transport": "分段自驾 + 多地住宿",
    "reason": "将高原、荒漠与大都市分段安排。春秋仍有高海拔低温与荒漠热浪风险，地图只是历史走廊示意；圣莫尼卡码头不被视为历年唯一原始终点。",
    "topology": "route",
    "climate": "https://www.nps.gov/orgs/1453/route-66-history.htm"
  },
  {
    "id": "nc500-full",
    "theme": "nc500",
    "name": "NC500 · 苏格兰北海岸环线",
    "ids": [
      "nc500-inverness",
      "nc500-applecross",
      "nc500-torridon",
      "nc500-gairloch",
      "nc500-ullapool",
      "nc500-lochinver",
      "nc500-durness",
      "nc500-tongue",
      "nc500-johnogroats",
      "nc500-wick",
      "nc500-dornoch"
    ],
    "days": 10,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "自驾环线 + 海岸村镇慢住",
    "reason": "先西岸、再北岸与东岸，最后返回因弗内斯。地图连线不是道路导航，山路和单轨道路需按车型、天气调整；十天是慢游草案，不保证全部支路均开放。",
    "topology": "loop",
    "climate": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500"
  },
  {
    "id": "nc500-west",
    "theme": "nc500",
    "name": "NC500 · 西海岸山海精选",
    "ids": [
      "nc500-inverness",
      "nc500-applecross",
      "nc500-torridon",
      "nc500-gairloch",
      "nc500-ullapool"
    ],
    "days": 5,
    "months": [
      5,
      6,
      7,
      8,
      9
    ],
    "transport": "自驾分段 + 沿海基地",
    "reason": "只体验西半段，不宣称走完整个 500 英里环线。地图连线不能代替道路规划；Bealach na Bà 不适合所有车辆，恶劣天气选择替代道路。",
    "topology": "route",
    "climate": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500"
  }
];
planTemplates.push(...journeyPlans);

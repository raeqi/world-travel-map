'use strict';
// Pan-American cultural and road exploration: verified 2026-11-17; not navigation.
const panAmericanSources={
  "history": "https://academic.oup.com/edited-volume/61800/chapter-abstract/546406488?login=false",
  "gap": "https://www.unesco.org/en/mab/darien",
  "alaska": "https://www.travelalaska.com/explore-alaska/itineraries/dalton_highway_road_trip_from_fairbanks",
  "blm": "https://www.blm.gov/sites/blm.gov/files/documents/files/PublicRoom_Alaska_DaltonHwy_VisitorGuide-web.pdf",
  "yukon": "https://www.travelyukon.com/en/media/getting-here-around",
  "mexico": "https://whc.unesco.org/en/list/412/",
  "puebla": "https://whc.unesco.org/en/list/416/",
  "antigua": "https://whc.unesco.org/en/list/65/",
  "leon": "https://whc.unesco.org/en/list/1236/",
  "panama": "https://whc.unesco.org/en/list/790/",
  "quito": "https://whc.unesco.org/en/list/2/",
  "cuenca": "https://whc.unesco.org/en/list/863/",
  "nazca": "https://whc.unesco.org/en/list/700/",
  "arica": "https://chile.travel/destinos/arica/",
  "park": "https://www.argentina.gob.ar/parquesnacionales/patagonia-austral/parque-nacional-tierra-del-fuego/horarios-como-llegar",
  "lapataia": "https://turismoushuaia.com/zonas/parque-nacional/",
  "fireland": "https://www.argentina.travel/en/activities/roads-in-tierra-del-fuego",
  "tolhuin": "https://www.argentina.travel/en/activities/trekking-in-tolhuin",
  "williams": "https://chile.travel/en/attractions/puerto-williams/"
};
const panAmericanNodes=[
  [
    "deadhorse",
    "Deadhorse / 普鲁德霍湾区域",
    -148.46,
    70.2,
    "美国",
    "阿拉斯加",
    "北冰洋门户",
    "长途旅行者常把 Deadhorse 与普鲁德霍湾作为泛美长线的北端延伸。道路尽端仍是油田工作区域，不能自己把车开到所有海岸。",
    "先看苔原上低矮的建筑、运输车辆和油田设施如何共同构成这座道路尽端的工作聚落；这里的特别之处是基础设施与极地环境的关系。Dalton 公路与北冰洋海岸不是同一种访问权限。接近海岸需按当地授权活动安排，不能把抵达城镇等同于自由走上海滩。",
    "https://www.blm.gov/sites/blm.gov/files/documents/files/PublicRoom_Alaska_DaltonHwy_VisitorGuide-web.pdf"
  ],
  [
    "sukakpak",
    "Dalton 公路 · Sukakpak 山区域",
    -149.75,
    67.62,
    "美国",
    "阿拉斯加",
    "山地公路",
    "Coldfoot 北方的 Sukakpak 山地使运输公路、北极景观和工程尺度同时可见。所配 BLM 照片呈现 Dalton 走廊，代表坐标不定位到摄影停车位。",
    "山体、开阔谷地和长距离公路在同一视野中出现，适合观察道路如何穿过布鲁克斯山地。配图来自 BLM 的 Dalton 公路资料，代表坐标并非照片机位。沿路观景应使用正式开放停靠处；远程碎石路的车辆、燃油和通信准备另行核实。",
    "https://www.travelalaska.com/explore-alaska/itineraries/dalton_highway_road_trip_from_fairbanks"
  ],
  [
    "coldfoot",
    "Coldfoot",
    -150.18,
    67.25,
    "美国",
    "阿拉斯加",
    "偏远补给节点",
    "Coldfoot 是 Dalton 公路上的重要停留区域，可在继续穿越布鲁克斯山脉前后安排补给和信息核对。这里不是普通城市的服务密度。",
    "把这一站留给远程公路节奏本身：看补给点与周围辽阔山地之间的尺度差异，再决定接下来一天走多远。住宿、燃油和营业需先确认，也要为天气及道路延误留余量。这里的服务密度与普通城市不同，不宜用地图两点间的直线距离安排最后一箱油。",
    "https://www.blm.gov/sites/blm.gov/files/documents/files/PublicRoom_Alaska_DaltonHwy_VisitorGuide-web.pdf"
  ],
  [
    "fairbanks",
    "费尔班克斯",
    -147.72,
    64.84,
    "美国",
    "阿拉斯加",
    "北方城市基地",
    "费尔班克斯让极地公路接入城市生活。Dalton 从城外向北延伸，往南则通过其他公路接入阿拉斯加与加拿大道路网。",
    "在进入苔原和山地之前，给城市与河流留一个休整章节。可以把北方城市生活与之后 Dalton 走廊的稀疏聚落对照来看，而不是抵达后立即赶路。车辆、补给和租车使用范围在这里先落实；向加拿大南行还要通过其他道路，费尔班克斯并非一条同名公路的唯一出发点。",
    "https://www.travelalaska.com/explore-alaska/itineraries/dalton_highway_road_trip_from_fairbanks"
  ],
  [
    "tok",
    "Tok",
    -142.99,
    63.34,
    "美国",
    "阿拉斯加",
    "道路接续城镇",
    "Tok 是阿拉斯加公路网的重要接续基地，向加拿大育空继续行驶时会经过边境手续，而不只是换一个公路编号。",
    "这一站适合读道路网络：同为阿拉斯加行旅，去费尔班克斯、加拿大或其他地区意味着不同方向。旅行安排上可作为重新检查住宿、天气与下一段驾驶预算的节点。出入境条件按个人、车辆及租车合同分别核实，图上从一个国家连到另一个国家不代表已具备准入资格。",
    "https://www.travelyukon.com/en/media/getting-here-around"
  ],
  [
    "whitehorse",
    "怀特霍斯",
    -135.06,
    60.72,
    "加拿大",
    "育空",
    "河流城市",
    "怀特霍斯把阿拉斯加公路与育空城市生活衔接起来。Klondike 通向 Dawson City 的支线，与往南的 Alaska Highway 要分清。",
    "沿育空河认识城市，再决定是继续顺阿拉斯加公路南行，还是另开一章去 Dawson City。两条走向反映不同的地域故事，不能因为都在育空就拼成顺路的小绕行。怀特霍斯可以安排休整日；本图之后的 Dawson Creek 在不列颠哥伦比亚，与淘金城 Dawson City 是两座不同城镇。",
    "https://www.travelyukon.com/en/media/getting-here-around"
  ],
  [
    "dawsoncreek",
    "Dawson Creek",
    -120.24,
    55.76,
    "加拿大",
    "不列颠哥伦比亚",
    "历史道路起点",
    "Dawson Creek 是阿拉斯加公路常见的南端起点语境。这里标注的是不列颠哥伦比亚的城镇，并非育空淘金城 Dawson City。",
    "从市区的 Mile 0 道路记忆开始，再看当地提供的历史步行资料，让一条现代长途公路有具体的起点语境。这里的“零英里”属于阿拉斯加公路，不代表整个泛美网络从此正式编号。若继续穿越加拿大和美国本土，要另选走向；本区域章节到这里结束。",
    "https://www.tourismdawsoncreek.com/"
  ],
  [
    "mexicocity",
    "墨西哥城 · 历史中心",
    -99.13,
    19.43,
    "墨西哥",
    "墨西哥谷地",
    "城市与文明层积",
    "墨西哥城历史中心把阿兹特克旧城基础、殖民城市与现代都市叠在一起。泛美旅行在这里应停下读城市，而不是只沿大路穿过去。",
    "可以先选历史中心的一段步行，从广场、宗教建筑与城市街道的相互关系观察不同年代的叠加，再决定是否加入博物馆。Xochimilco 是另一片区，与历史中心共同列入遗产不意味着步行即可顺带游完；城市停留与下一段长途驾驶应分日安排。",
    "https://whc.unesco.org/en/list/412/"
  ],
  [
    "puebla",
    "普埃布拉",
    -98.2,
    19.04,
    "墨西哥",
    "普埃布拉州",
    "历史城市",
    "普埃布拉的城市格局、教堂和建筑装饰提供认识墨西哥高地城市的另一种入口。它可以作为跨洲长线中的文化停留，不只是一夜中转。",
    "看街道如何围绕广场展开，再近看教堂、建筑立面和装饰工艺；比把整座城当一张全景照片更能读出高地城市的性格。可先选择一个步行范围，留时间停下看细部。具体宗教建筑的开放另核实，不以世界遗产身份推断每个内部空间都可随时进入。",
    "https://whc.unesco.org/en/list/416/"
  ],
  [
    "antigua",
    "安提瓜危地马拉",
    -90.734,
    14.558,
    "危地马拉",
    "潘乔伊谷地",
    "地震与历史城市",
    "安提瓜的方格街道、火山背景与受地震影响的历史建筑，让自然环境如何塑造城市变得可见。它是从主要跨境通道接入的文化支线。",
    "沿方格街道观察建筑立面、开放庭院与受损结构，再把远处火山作为理解城市环境的背景。完整、修复和遗址状态可能同时存在，不能把所有墙体都归于一次地震。配图为 San Agustín 建筑；它是城市中的一个具体对象，不能代表所有街区或每一处遗址的当前状态。",
    "https://whc.unesco.org/en/list/65/"
  ],
  [
    "leon",
    "莱昂 · 主教座堂",
    -86.879,
    12.435,
    "尼加拉瓜",
    "莱昂省",
    "城市建筑",
    "莱昂主教座堂把中美洲城市中的建筑工艺、宗教生活与公共广场组织在一起。它是城市文化探访点，不是泛美公路上的边境检查站。",
    "主教座堂与周围公共广场适合一起看：先从外部体量、入口和街道尺度认识它在城中的位置，再按开放情况决定内部参访。这里可以停留看建筑工艺与日常宗教生活，不只拍一张正面。屋顶等特定区域是否开放及参访方式，以管理方当日安排为准。",
    "https://whc.unesco.org/en/list/1236/"
  ],
  [
    "sanjose",
    "圣何塞",
    -84.09,
    9.93,
    "哥斯达黎加",
    "中央谷地",
    "区域城市基地",
    "圣何塞是中央谷地的城市停留基地。中美洲长线常在城市之间换交通或休整，不应把每段都想成一条永不离开的同名公路。",
    "可以选择国家剧院与文化广场作一段城市步行，或把国家博物馆作为独立半日。剧院建筑、公共广场与博物馆让中央谷地的历史有具体对象，和周边自然景区是不同章节。文化设施开放另查，前后跨境路段也需另作车辆、保险与口岸安排。",
    "https://www.visitcostarica.com/things-to-do/culture/historical-walks/san-jose"
  ],
  [
    "panamacity",
    "巴拿马城 · 历史城区",
    -79.535,
    8.952,
    "巴拿马",
    "巴拿马省",
    "港口与历史城区",
    "巴拿马城的旧城与 Panamá Viejo 是不同的历史地点，反映城市迁移及太平洋港口的角色。它也可作为车辆绕过达连前的信息与运输安排基地。",
    "先分清现在要读的是 Casco Antiguo 旧城，还是 Panamá Viejo 遗址，两者呈现不同阶段的城市历史，不能当成同一片街区。适合把遗址阅读与旧城步行分开安排。车辆绕过达连的运输是另外一项计划，本图不承诺有固定汽车渡轮，也不把港口城市等同于可随到随运。",
    "https://whc.unesco.org/en/list/790/"
  ],
  [
    "yaviza",
    "Yaviza · 达连断点北侧",
    -77.7,
    8.16,
    "巴拿马",
    "达连省",
    "公路断点",
    "Yaviza 用来标识泛美公路北段在达连区域的道路尽端语境。这里不提供穿越达连的路线，也不把图上南侧的哥伦比亚点位连成可驾车通道。",
    "这一点用于解释地图为什么在此断开：道路尽端之外的达连森林并没有一条可继续开往哥伦比亚的公路。它是理解跨洲网络的地理标记，不作为探索无路区域的推荐目的地。人和车都要另行安排交通或运输，不能把南侧区域代表点当成下一站驾车导航。",
    "https://www.unesco.org/en/mab/darien"
  ],
  [
    "turbo",
    "Turbo · 达连南侧区域",
    -76.73,
    8.09,
    "哥伦比亚",
    "乌拉巴湾",
    "断点南侧区域",
    "乌拉巴湾一带的 Turbo 作为哥伦比亚侧区域代表，说明达连断点另一侧已进入南美道路网。它不是承诺有从 Yaviza 直达的渡轮或货运服务。",
    "从乌拉巴湾的区域位置理解达连断点南侧与南美道路网的关系；它与巴拿马侧隔着的不是地图缩放后就能忽略的一段空白。此点不指定车辆运输的起落港，也不意味着存在 Yaviza 直达船班。实际运输可以使用其他港口，图中完全不画横穿达连的驾驶线。",
    "https://www.unesco.org/en/mab/darien"
  ],
  [
    "pasto",
    "帕斯托",
    -77.28,
    1.21,
    "哥伦比亚",
    "纳里尼奥",
    "高地城市",
    "帕斯托是哥伦比亚南部高地的城市基地，让泛美长线从加勒比沿岸的断点概念转入安第斯的生活与地形。两地之间仍有很长的国内转场。",
    "从纳里尼奥广场与教堂街区开始，观察当地工艺与公共空间；若时间允许，再按开放情况选择 Casa Taminango 等文化设施。帕斯托也与黑人白人嘉年华传统有关，但六月至九月的区域选时不代表能看到一月庆典。周围湖泊、火山是额外支线，不一并塞入南向边境转场。",
    "https://colombia.travel/en/pasto"
  ],
  [
    "ipiales",
    "伊皮亚莱斯",
    -77.64,
    0.83,
    "哥伦比亚",
    "纳里尼奥",
    "跨境城镇",
    "伊皮亚莱斯是接近厄瓜多尔边境的高地城镇。旅人常把城市停留、附近宗教景观和国际过境放到同一日，但它们是不同活动。",
    "可把城镇作为独立停留基地，再另去 Las Lajas 看跨在峡谷上的新哥特式宗教建筑；城镇坐标不是圣所入口，两者也不能与过境手续混成一个点。参访安排可先留出建筑与峡谷观看时间，再核对个人、车辆和口岸的当前条件，不承诺同一天顺利完成所有活动。",
    "https://colombia.travel/en/ipiales"
  ],
  [
    "quito",
    "基多",
    -78.513,
    -0.22,
    "厄瓜多尔",
    "皮钦查",
    "安第斯历史城市",
    "基多的历史中心把宗教建筑、山地城市格局与多种工艺传统联系起来。这里的巴洛克并非简单复制欧洲，而包含本地艺术实践。",
    "可以从历史街区的道路、广场与宗教建筑观察山地城市如何展开，再细看建筑内外的工艺。所配圣母像影像提供城市全景角度，但高处观景与历史中心步行是不同的访问。地图采用城市代表坐标，并不指向某座教堂的入口；高地停留与长途驾驶之间应留出余量。",
    "https://whc.unesco.org/en/list/2/"
  ],
  [
    "cuenca",
    "昆卡",
    -79,
    -2.9,
    "厄瓜多尔",
    "阿苏艾",
    "河流与历史城市",
    "昆卡历史中心不仅是建筑立面，也包括与河流、古代遗址和进城通道相关的城市空间。它为安第斯行程提供比赶路更慢的尺度。",
    "让步行速度慢下来，分别读历史街道、河岸与建筑之间的关系；城市价值不只在一座教堂的立面，也在街区尺度和公共空间。可以先做一段城区步行，再决定是否加入具体文化设施。代表坐标不等于停车位或河岸步道起点，去下一座城的山地道路另行规划。",
    "https://whc.unesco.org/en/list/863/"
  ],
  [
    "lima",
    "利马",
    -77.03,
    -12.05,
    "秘鲁",
    "利马",
    "太平洋城市",
    "利马把太平洋海岸长线接入密集的都市与历史街区。历史中心和沿海片区距离、气质不同，不应把整个城市当成一个过路节点。",
    "先决定当天读历史中心还是海岸生活，两者的城市密度与空间感不同，不宜在一段短暂停车中草草都算“到过”。历史中心可从广场、街道与建筑关系展开；沿海片区另安排转场。向纳斯卡的南行是独立长途段，城市参访结束时间不应直接当作下一段道路的安全时间预算。",
    "https://whc.unesco.org/en/list/500/"
  ],
  [
    "nazca",
    "纳斯卡 · 地画区域",
    -75.15,
    -14.7,
    "秘鲁",
    "伊卡",
    "地景艺术",
    "纳斯卡与帕尔帕地画通过清除较深色表面砾石、显露较浅地面形成巨大图案。它把自然荒漠变成人类创造的景观，和普通公路风景完全不同。",
    "看图案如何借荒漠地表的颜色差形成线条，再对比其巨大尺度与人的日常观看距离，这正是地景艺术和普通路边风景的差别。所配蜂鸟图为空中视角，不承诺从路边能看到同一全貌。只采用获准观景方式，不能为靠近图案驶入或踩踏保护区域。",
    "https://whc.unesco.org/en/list/700/"
  ],
  [
    "arica",
    "阿里卡",
    -70.32,
    -18.48,
    "智利",
    "阿里卡和帕里纳科塔",
    "荒漠海岸城市",
    "阿里卡连接秘鲁南部与智利北部，海岸城市、荒漠和高原支线在这里交会。Morro 与 Chinchorro 文化提供海滩之外的观看线索。",
    "城市海岸、Morro 与 Chinchorro 文化可以作为几种不同的观看线索：先选文化历史或海岸散步，再决定是否额外进入高原。荒漠海岸和高原的海拔、道路与时间需求不能混算成一条短支线。此点是城市基地，具体遗址、博物馆与观景设施需要再选入口。",
    "https://chile.travel/destinos/arica/"
  ],
  [
    "antofagasta",
    "安托法加斯塔",
    -70.4,
    -23.65,
    "智利",
    "安托法加斯塔",
    "荒漠港口",
    "安托法加斯塔让智利北部荒漠与太平洋港口的关系进入长途路线。它位于海岸，和内陆 San Pedro de Atacama 不是同一个旅行基地。",
    "城市夹在太平洋与海岸山地之间，可以把狭长的沿海空间作为观看重点；北侧 La Portada 岩拱则是另一次具体停靠。它不同于内陆 San Pedro de Atacama 的高地旅行基地。盐湖、内陆荒漠和城市海岸需要各自安排道路与时间，不用“阿塔卡马”一个名称把它们全部包办。",
    "https://www.eso.org/public/images/pzidar_paranal_lv-6/"
  ],
  [
    "laserena",
    "拉塞雷纳",
    -71.25,
    -29.9,
    "智利",
    "科金博",
    "北部城市与河谷门户",
    "拉塞雷纳可调节智利北部长距离驾驶的节奏。海岸城市与向内陆延伸的河谷是不同章节，不是开着 Route 5 就全部看过。",
    "可以从武器广场与石造教堂看城市街区，再到 El Faro 灯塔一带读海岸空间；这是两种节奏，不只是长途路上的一夜住宿。Elqui 河谷与天文活动属于另行安排的内陆章节。先选少数目标，再留出转场和休息，不把长距离主路与所有河谷支线塞进同一天。",
    "https://chile.travel/en/itineraries/a-2-day-trip-in-la-serena-and-the-elqui-valley/"
  ],
  [
    "santiago",
    "圣地亚哥",
    -70.65,
    -33.44,
    "智利",
    "首都大区",
    "都市接续节点",
    "圣地亚哥是泛美道路网络中的重要都市节点；前往阿根廷或继续南下智利需要选择不同走向。这里不是整条跨洲路线唯一的正式终点。",
    "以历史城区、Lastarria 等街区或城市山丘作为一个独立都市章节，观察安第斯山脚下的现代生活，而不只把这里当换车地点。离开城市前再选下一章：跨安第斯去阿根廷、南下智利或进入海峡地区都需要具体走向，不能凭跨洲总览的直线随意拼接。",
    "https://chile.travel/en/destinations/santiago-capital/"
  ],
  [
    "riogrande",
    "里奥格兰德",
    -67.71,
    -53.79,
    "阿根廷",
    "火地岛",
    "岛上城市",
    "里奥格兰德是火地岛阿根廷段的城市节点。若从大陆自驾到这里，还涉及智利境内转场、边境和海峡交通；本区域行程从岛上开始。",
    "从火地岛东岸的城市环境开始，再向内陆湖区与南端海港移动，可以读出同一座岛上不同的地貌与生活尺度。本短线从岛上出发；大陆接入所需的智利转场、边境与海峡交通另外安排。不要因为后面标为3号国道，就把入岛过程也理解为没有渡运的连续公路。",
    "https://www.argentina.travel/en/activities/roads-in-tierra-del-fuego"
  ],
  [
    "tolhuin",
    "Tolhuin",
    -67.2,
    -54.51,
    "阿根廷",
    "火地岛",
    "湖区与森林城镇",
    "Tolhuin 位于火地岛中部湖区与森林环境，3 号国道把它与乌斯怀亚连接。它给行程增加独立于海港终点的湖岸与山地观看。",
    "可以把湖岸和森林作为一段独立停留，和里奥格兰德的城市环境、乌斯怀亚的海港对照看。先选择开放的短程活动，再按体力与天气决定是否加入更长步行；深度山地徒步不是这条公路短线自动包含的项目。城镇坐标也不代表所有湖岸及路径入口。",
    "https://www.argentina.travel/en/activities/trekking-in-tolhuin"
  ],
  [
    "ushuaia",
    "乌斯怀亚",
    -68.3,
    -54.81,
    "阿根廷",
    "火地岛",
    "海港城市",
    "乌斯怀亚让安第斯、森林和比格尔水道在城市边缘相遇，是常见泛美长途旅行的南端目的地。它在阿根廷，不是智利城市。",
    "把海港、背后的山地与森林分别看，能理解这座城市为何成为南端旅行的基地。城市步行、比格尔水道活动和火地岛国家公园需要不同安排，不宜只用一张终点照片代替。乌斯怀亚属于阿根廷；抵达城市港口之后，去3号国道真正尽端还要另行进入公园。",
    "https://turismoushuaia.com/zonas/parque-nacional/"
  ],
  [
    "lapataia",
    "拉帕塔亚湾 · 3 号国道尽端",
    -68.577,
    -54.856,
    "阿根廷",
    "火地岛国家公园",
    "道路尽端与海湾",
    "拉帕塔亚湾是阿根廷 3 号国道的尽端。与“到乌斯怀亚”的城市概念相比，这里把道路、南方森林和海湾收束到一个具体终点。",
    "从道路终点转向海湾和森林，使用开放的栈道与步行区域慢看水岸，终点标志只是整个空间中的一个对象。这里是3号国道尽端，不是继续越野的起点。公园道路、步道与骑行规则分别核对；配图是历史影像，不能据此推断现在的设施、收费或开放状态。",
    "https://www.argentina.gob.ar/parquesnacionales/patagonia-austral/parque-nacional-tierra-del-fuego/horarios-como-llegar"
  ],
  [
    "puntaarenas",
    "蓬塔阿雷纳斯",
    -70.91,
    -53.16,
    "智利",
    "麦哲伦",
    "海峡港口",
    "蓬塔阿雷纳斯位于麦哲伦海峡，是前往智利南端岛屿的重要港口基地。它不是从圣地亚哥只沿同一条连续沿岸道路就能无条件直达的终点。",
    "先把麦哲伦海峡与港口城市的关系看清，再决定是否加入更远岛屿的船行。它是一个大陆侧基地，和纳瓦里诺岛上的威廉斯港有不同地理角色。城市参访、航空与远程轮渡分别安排；本图不画两地之间的驾车线，也不把地图上的相邻视作固定汽车渡运服务。",
    "https://chile.travel/en/attractions/puerto-williams/"
  ],
  [
    "puertowilliams",
    "威廉斯港",
    -67.61,
    -54.93,
    "智利",
    "纳瓦里诺岛",
    "南端岛屿社区",
    "威廉斯港位于纳瓦里诺岛，是智利南端的社区与海上旅行基地。它比乌斯怀亚更南，但不是泛美公路能一路开到的经典终点。",
    "可以先认识纳瓦里诺岛上的社区与海上生活，再按开放情况选择博物馆或短程活动。多日山地徒步及合恩角船行需要独立准备，不包含在抵达社区的概念里。威廉斯港比乌斯怀亚更南，但来自大陆仍需按当前航空或轮渡安排接入，不作为泛美公路一路开到的终点。",
    "https://chile.travel/en/attractions/puerto-williams/"
  ]
];
const panAmericanPlans=[
  {
    "id": "pan-overview",
    "name": "泛美公路 · 从北冰洋到火地岛",
    "ids": [
      "pan-deadhorse",
      "pan-fairbanks",
      "pan-whitehorse",
      "pan-dawsoncreek",
      "pan-mexicocity",
      "pan-antigua",
      "pan-sanjose",
      "pan-panamacity",
      "pan-yaviza",
      "pan-turbo",
      "pan-pasto",
      "pan-quito",
      "pan-lima",
      "pan-nazca",
      "pan-arica",
      "pan-santiago",
      "pan-ushuaia",
      "pan-lapataia"
    ],
    "days": 180,
    "months": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    "topology": "network",
    "transport": "跨国分段交通；达连车辆运输另行安排",
    "roadScope": "跨洲地点网络，非连续驾车线路",
    "reason": "用代表节点阅读北美延伸线、中美洲、安第斯和火地岛。各国存在多种走向，没有一个全洲统一编号；总览不绘制道路连接。180 天只是长途停留预算示例，出发季节要按区域反向拆解。",
    "accessNote": "巴拿马与哥伦比亚之间的达连区域没有贯通公路。不要按地图穿越；人和车辆需分别安排合法交通及运输。跨洲总览既不是一条可一口气开完的路线，也不代表边境、签证和车辆许可已核验。",
    "sources": [
      {
        "title": "泛美道路历史与网络",
        "url": "https://academic.oup.com/edited-volume/61800/chapter-abstract/546406488?login=false"
      },
      {
        "title": "UNESCO · 达连道路断点",
        "url": "https://www.unesco.org/en/mab/darien"
      }
    ],
    "statusUrl": "https://www.unesco.org/en/mab/darien",
    "theme": "panamerican",
    "climate": "https://academic.oup.com/edited-volume/61800/chapter-abstract/546406488?login=false",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "pan-north",
    "name": "北美延伸 · Dalton 与阿拉斯加公路",
    "ids": [
      "pan-deadhorse",
      "pan-sukakpak",
      "pan-coldfoot",
      "pan-fairbanks",
      "pan-tok",
      "pan-whitehorse",
      "pan-dawsoncreek"
    ],
    "days": 18,
    "months": [
      6,
      7,
      8
    ],
    "topology": "route",
    "transport": "分段自驾 + 多地住宿",
    "roadScope": "阿拉斯加至加拿大西北的北方章节",
    "reason": "由 Deadhorse 南行，经布鲁克斯山地、费尔班克斯和 Tok，再接育空与 Dawson Creek。北美是常用旅行延伸线，不冒充所有道路都正式挂有泛美编号；图中省略大量途中站。",
    "accessNote": "Dalton 是工作道路，碎石、货车、补给间距和租车限制要先核实。海岸访问受油田管理，不能自由驾车进入北冰洋岸线；边境与当天道路状态另查。",
    "sources": [
      {
        "title": "BLM · Dalton 游客指南",
        "url": "https://www.blm.gov/sites/blm.gov/files/documents/files/PublicRoom_Alaska_DaltonHwy_VisitorGuide-web.pdf"
      },
      {
        "title": "育空旅游局 · 道路网",
        "url": "https://www.travelyukon.com/en/media/getting-here-around"
      }
    ],
    "statusUrl": "https://511.alaska.gov/",
    "theme": "panamerican",
    "climate": "https://www.blm.gov/sites/blm.gov/files/documents/files/PublicRoom_Alaska_DaltonHwy_VisitorGuide-web.pdf",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "pan-central",
    "name": "墨西哥与中美洲 · 城市文化章节",
    "ids": [
      "pan-mexicocity",
      "pan-puebla",
      "pan-antigua",
      "pan-leon",
      "pan-sanjose",
      "pan-panamacity",
      "pan-yaviza"
    ],
    "days": 35,
    "months": [
      1,
      2,
      3,
      11,
      12
    ],
    "topology": "route",
    "transport": "多国分段自驾或城际交通 + 城市支线",
    "roadScope": "墨西哥城至巴拿马的精选走廊；含支线与中间省略段",
    "reason": "在墨西哥高地、安提瓜、莱昂和巴拿马停下读城市。本图省略中间城镇和部分过境国家，也不把安提瓜支线当成始终沿着同一条主路；Yaviza 只标识道路断点，不推荐穿越无路区。",
    "accessNote": "跨国车辆手续、保险、租车跨境和口岸开放逐国核实。道路及治安随地区变化，不能由一个季节标签保证全程适合。到达巴拿马后，达连没有公路可继续开到哥伦比亚。",
    "sources": [
      {
        "title": "墨西哥城遗产",
        "url": "https://whc.unesco.org/en/list/412/"
      },
      {
        "title": "安提瓜遗产",
        "url": "https://whc.unesco.org/en/list/65/"
      },
      {
        "title": "达连断点",
        "url": "https://www.unesco.org/en/mab/darien"
      }
    ],
    "statusUrl": "https://www.unesco.org/en/mab/darien",
    "theme": "panamerican",
    "climate": "https://whc.unesco.org/en/list/412/",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "pan-andes",
    "name": "安第斯北段 · 哥伦比亚与厄瓜多尔",
    "ids": [
      "pan-pasto",
      "pan-ipiales",
      "pan-quito",
      "pan-cuenca"
    ],
    "days": 12,
    "months": [
      6,
      7,
      8,
      9
    ],
    "topology": "route",
    "transport": "高地公路分段 + 城市步行",
    "roadScope": "帕斯托—伊皮亚莱斯—基多—昆卡",
    "reason": "聚焦南美北部高地城市，用山地道路和历史城区理解安第斯。由哥伦比亚海港到帕斯托的接入不包含在此短线中；边境及城市支线也不以直线估时。",
    "accessNote": "山地雨雾、道路中断和跨境手续须临行核实；不同海拔天气不一。本段不以“泛美公路”名义保证单一道路始终可通行。",
    "sources": [
      {
        "title": "泛美网络",
        "url": "https://academic.oup.com/edited-volume/61800/chapter-abstract/546406488?login=false"
      },
      {
        "title": "基多遗产",
        "url": "https://whc.unesco.org/en/list/2/"
      },
      {
        "title": "昆卡遗产",
        "url": "https://whc.unesco.org/en/list/863/"
      }
    ],
    "statusUrl": "https://www.invias.gov.co/",
    "theme": "panamerican",
    "climate": "https://academic.oup.com/edited-volume/61800/chapter-abstract/546406488?login=false",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "pan-pacific",
    "name": "太平洋岸 · 秘鲁与智利北段",
    "ids": [
      "pan-lima",
      "pan-nazca",
      "pan-arica",
      "pan-antofagasta",
      "pan-laserena",
      "pan-santiago"
    ],
    "days": 24,
    "months": [
      3,
      4,
      5,
      9,
      10,
      11
    ],
    "topology": "route",
    "transport": "长距离公路分段 + 城市与遗产支线",
    "roadScope": "利马—纳斯卡—智利北部—圣地亚哥",
    "reason": "从大都市和荒漠地画走向智利的港口与河谷。海岸、高地支线和长途转场分开安排；不因同属荒漠就假定所有景点都在主路边。所列月份为区域策划参考。",
    "accessNote": "跨境、荒漠补给、城市交通和各段道路状态分别核实。纳斯卡地画只能用获准参访方式，空中影像不代表步行或驾车可进入地画表面。",
    "sources": [
      {
        "title": "利马历史中心",
        "url": "https://whc.unesco.org/en/list/500/"
      },
      {
        "title": "纳斯卡地画",
        "url": "https://whc.unesco.org/en/list/700/"
      },
      {
        "title": "智利旅游局 · 阿里卡",
        "url": "https://chile.travel/destinos/arica/"
      }
    ],
    "statusUrl": "https://www.mop.gob.cl/",
    "theme": "panamerican",
    "climate": "https://whc.unesco.org/en/list/500/",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "pan-fireland",
    "name": "火地岛末段 · 沿 3 号国道到尽头",
    "ids": [
      "pan-riogrande",
      "pan-tolhuin",
      "pan-ushuaia",
      "pan-lapataia"
    ],
    "days": 5,
    "months": [
      1,
      2,
      3,
      11,
      12
    ],
    "topology": "route",
    "transport": "火地岛境内自驾 + 公园短步行",
    "roadScope": "里奥格兰德—Tolhuin—乌斯怀亚—拉帕塔亚湾",
    "reason": "从岛上城市南行，经过湖区森林到比格尔水道和 3 号国道尽端。起点已经在火地岛；从南美大陆接入所需的智利境内转场、边境及海峡交通没有被隐藏成连续公路。",
    "accessNote": "岛上风、雨雪、道路和公园开放逐日核实。抵达乌斯怀亚市区不等于到达国道尽端；国家公园车辆、骑行和步道规则分别适用。",
    "sources": [
      {
        "title": "阿根廷旅游局 · 火地岛公路",
        "url": "https://www.argentina.travel/en/activities/roads-in-tierra-del-fuego"
      },
      {
        "title": "国家公园交通",
        "url": "https://www.argentina.gob.ar/parquesnacionales/patagonia-austral/parque-nacional-tierra-del-fuego/horarios-como-llegar"
      },
      {
        "title": "乌斯怀亚旅游部门 · 道路尽端",
        "url": "https://turismoushuaia.com/zonas/parque-nacional/"
      }
    ],
    "statusUrl": "https://www.argentina.gob.ar/obras-publicas/vialidad-nacional/estado-de-las-rutas",
    "theme": "panamerican",
    "climate": "https://www.argentina.travel/en/activities/roads-in-tierra-del-fuego",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "pan-chile-extension",
    "name": "智利南端延伸 · 蓬塔阿雷纳斯与威廉斯港",
    "ids": [
      "pan-puntaarenas",
      "pan-puertowilliams"
    ],
    "days": 6,
    "months": [
      1,
      2,
      3,
      11,
      12
    ],
    "topology": "network",
    "transport": "航空或轮渡接续 + 当地步行",
    "roadScope": "独立海峡与岛屿章节；非泛美公路连续路段",
    "reason": "回答“能否去智利更南端”：威廉斯港可以作为另外一章，但在岛屿上。用两个地点区分港口基地与纳瓦里诺岛，不画虚构驾车连接，也不把它替换成乌斯怀亚的公路终点。",
    "accessNote": "船班、航空与岛上服务按当前经营安排核实，不承诺固定频率或有汽车滚装服务。多日山地徒步和合恩角船行需另行规划，不包含在本六天示例里。",
    "sources": [
      {
        "title": "智利旅游局 · 威廉斯港",
        "url": "https://chile.travel/en/attractions/puerto-williams/"
      },
      {
        "title": "智利旅游局 · 南端行程",
        "url": "https://chile.travel/en/itineraries/puerto-williams-adventure-at-the-end-of-the-world/"
      }
    ],
    "statusUrl": "https://chile.travel/en/attractions/puerto-williams/",
    "theme": "panamerican",
    "climate": "https://chile.travel/en/attractions/puerto-williams/",
    "verifiedOn": "2026-11-17"
  }
];
const panAmericanPhotos=[
  {
    "id": "sukakpak",
    "file": "My Public Lands Roadtrip- Dalton Highway in Alaska (19123573838).jpg",
    "title": "Dalton 公路 · Sukakpak 山地走廊",
    "author": "Bureau of Land Management",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "path": "https://commons.wikimedia.org/wiki/Special:Redirect/file/My_Public_Lands_Roadtrip-_Dalton_Highway_in_Alaska_(19123573838).jpg?width=1280",
    "source": "https://commons.wikimedia.org/wiki/File:My_Public_Lands_Roadtrip-_Dalton_Highway_in_Alaska_(19123573838).jpg",
    "changes": "Wikimedia 等比例缩略图；界面可能裁切，未改色。",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "antigua",
    "file": "Church and Museum of San Agustin, Antigua Guatemala, in 2024 03.jpg",
    "title": "安提瓜 · San Agustín 建筑",
    "author": "Nerdoguate",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "path": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Church_and_Museum_of_San_Agustin%2C_Antigua_Guatemala%2C_in_2024_03.jpg?width=1280",
    "source": "https://commons.wikimedia.org/wiki/File:Church_and_Museum_of_San_Agustin,_Antigua_Guatemala,_in_2024_03.jpg",
    "changes": "Wikimedia 等比例缩略图；界面可能裁切，未改色。",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "quito",
    "file": "Quito banner Virgen de Quito.jpg",
    "title": "基多 · 圣母像与城市风景",
    "author": "Lion Hirth (Prissantenbär)",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "path": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Quito_banner_Virgen_de_Quito.jpg?width=1280",
    "source": "https://commons.wikimedia.org/wiki/File:Quito_banner_Virgen_de_Quito.jpg",
    "changes": "Wikimedia 等比例缩略图；界面可能裁切，未改色。",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "nazca",
    "file": "Líneas de Nazca, Nazca, Perú, 2015-07-29, DD 52.JPG",
    "title": "纳斯卡蜂鸟地画 · 空中视角",
    "author": "Diego Delso · delso.photo",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "path": "https://commons.wikimedia.org/wiki/Special:Redirect/file/L%C3%ADneas_de_Nazca%2C_Nazca%2C_Per%C3%BA%2C_2015-07-29%2C_DD_52.JPG?width=1280",
    "source": "https://commons.wikimedia.org/wiki/File:Líneas_de_Nazca,_Nazca,_Perú,_2015-07-29,_DD_52.JPG",
    "changes": "Wikimedia 等比例缩略图；界面可能裁切，未改色。图像及裁切呈现保留相同许可。空中拍摄，不代表公路观景点视野。",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "lapataia",
    "file": "Baia lapataia.jpg",
    "title": "拉帕塔亚湾 · 历史影像",
    "author": "Sylvio Martins / (WT-shared) Sylx100",
    "license": "Public domain",
    "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Public_domain",
    "path": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Baia_lapataia.jpg?width=1280",
    "source": "https://commons.wikimedia.org/wiki/File:Baia_lapataia.jpg",
    "changes": "Wikimedia 等比例缩略图；界面可能裁切，未改色。2007年历史影像，不推断当前设施或开放状态。",
    "verifiedOn": "2026-11-17"
  },
  {
    "id": "puertowilliams",
    "file": "Puerto Williams 4.jpg",
    "title": "威廉斯港 · 纳瓦里诺岛",
    "author": "Mirko Thiessen",
    "license": "CC BY-SA 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5/",
    "path": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Puerto_Williams_4.jpg?width=1280",
    "source": "https://commons.wikimedia.org/wiki/File:Puerto_Williams_4.jpg",
    "changes": "Wikimedia 等比例缩略图；界面可能裁切，未改色。图像及裁切呈现保留相同许可。",
    "verifiedOn": "2026-11-17"
  }
];

for(const p of panAmericanPhotos){const key='pan-photo-'+p.id;photoLibrary[key]={...p};editorialPlacePhotos['pan-'+p.id]=key;}
for(const [slug,name,lon,lat,country,region,type,desc,detail,source] of panAmericanNodes){
 const id='pan-'+slug,p={id,name,lon,lat,country,region,type,desc,themes:['panamerican'],icon:'◇',
  facts:{'观看线索':type,'网络角色':type==='公路断点'||type==='断点南侧区域'?'达连道路断点，无跨越公路':'跨洲主题精选，不代表单一正式编号'},
  source,sourceLabel:'地点管理、文化遗产与旅游资料',
  additionalSources:[{title:'泛美道路网络背景',url:panAmericanSources.history}],
  coordinateNote:'城市、景观或区域代表坐标，非道路轨迹、停车位或边境入口。连线不能估算驾驶里程。'};
 places.push(p);
 placeEssays[id]={title:'在这段旅程中',paragraphs:[{heading:'看什么，怎样安排',text:detail}],sources:[{title:p.sourceLabel,url:source}],related:[]};
}
planTemplates.push(...panAmericanPlans);
themes.push({id:'panamerican',name:'泛美公路',title:'从北冰洋，<br>读到火地岛',story:'以跨洲总览与六个区域章节，认识美洲道路沿途的自然、城市和人类创造。',
 scope:'7 个方案 · 31 个地点 · 达连公路断开',
 introduction:'泛美公路是一组道路网络；北美延伸线、不同国家走向和文化支线分别说明。总览不画连续连接，达连隘口没有贯通公路。可从阿拉斯加、中美洲、安第斯、太平洋岸或火地岛选一章；智利南端另列航空或轮渡延伸。',
 filters:[...new Set(panAmericanNodes.map(p=>p[6]))].sort(),view:{lon:-92,lat:8,zoom:1},symbol:'diamond',
 colors:{accent:'#98543c',ocean:'#e0eaf0',land:'#e7decd',edge:'#b3a086',point:'#98543c',route:'#98543c',wash:'#fff'},fields:['观看线索','网络角色']});
themeDesigns.panamerican={mode:'roadside',accent:'#98543c',ocean:'#e0eaf0',land:'#e7decd',edge:'#b3a086',route:'#98543c',dash:[9,4],width:2.3,lens:'一组道路，多个美洲',note:'先选区域再读道路。达连没有贯通公路；乌斯怀亚在阿根廷，威廉斯港是智利岛屿延伸。',line:'分段地点示意 · 非连续驾驶导航'};
themeGlyphs.panamerican=['mountain','house','gate','wave','book'];
themeMedia.panamerican={photo:'pan-photo-quito',en:'PAN-AMERICAN · CONTINENTS IN CHAPTERS',edition:'美洲纵贯行旅',motif:'极地 / 城市 / 荒漠 / 火地岛',symbol:'↝'};
discoveryMeta.panamerican=['drives',['美洲'],'泛美公路 Pan-American Panamericana Alaska 阿拉斯加 北冰洋 墨西哥 中美洲 安第斯 乌斯怀亚 火地岛 智利 达连 Darien Darién'];
itineraryAreas['美洲']=[...new Set([...itineraryAreas['美洲'],...panAmericanNodes.map(p=>p[4])])];
Object.assign(countrySearchNames,{'Argentina':'阿根廷','Colombia':'哥伦比亚','Ecuador':'厄瓜多尔','Guatemala':'危地马拉','Nicaragua':'尼加拉瓜','Costa Rica':'哥斯达黎加','Panama':'巴拿马','Chile':'智利','Peru':'秘鲁','Canada':'加拿大'});
scenicRoadThemeIds.add('panamerican');
discoveryIndex=null;readingPlans=null;
document.addEventListener('DOMContentLoaded',()=>{
 const panel=document.querySelector('#route-panel');if(!panel)return;
 const update=()=>{
  if(typeof activePlan==='undefined'||activePlan?.theme!=='panamerican'||panel.querySelector('.pan-gap-note'))return;
  const note=document.createElement('section');note.className='pan-gap-note';note.setAttribute('aria-label','达连道路断点');
  note.innerHTML='<strong>达连断点 · 这里没有贯通公路</strong><p>巴拿马与哥伦比亚之间不绘制驾车连接。人和车辆需另行安排交通与运输；总览不是全程导航。</p><div><button data-pan-gap="pan-yaviza">看巴拿马侧</button><button data-pan-gap="pan-turbo">看哥伦比亚侧</button><a href="'+panAmericanSources.gap+'" target="_blank" rel="noopener noreferrer">了解达连 ↗</a></div>';
  panel.querySelector('.route-introduction')?.after(note);
 };
 new MutationObserver(update).observe(panel,{childList:true,subtree:true});update();
});
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-pan-gap]');if(!b)return;
 const p=places.find(p=>p.id===b.dataset.panGap);
 if(p&&typeof activeTheme!=='undefined'){if(themes[activeTheme].id!=='panamerican')enterTheme(themes.findIndex(t=>t.id==='panamerican'));if(activePlan&&activePlan.id!=='pan-overview')openPlan(buildPlans('panamerican',0).find(p=>p.id==='pan-overview'));select(p);}
});

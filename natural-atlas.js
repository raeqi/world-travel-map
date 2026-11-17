'use strict';
// Real access nodes and independently documented routes. Lines connect nodes, never GPS tracks.
const naturalAtlasPack={
  "verifiedOn": "2026-11-17",
  "sources": {
    "parkway": {
      "title": "Parks Canada · 冰原公路沿线指南",
      "url": "https://parks.canada.ca/pn-np/ab/banff/visit/promenadedesglaciers-icefieldsparkway"
    },
    "lakes": {
      "title": "Parks Canada · 路易斯湖与梦莲湖接驳",
      "url": "https://parks.canada.ca/pn-np/ab/banff/visit/parkbus/louise"
    },
    "glacier": {
      "title": "Parks Canada · 阿萨巴斯卡冰川与冰原地区",
      "url": "https://parks.canada.ca/pn-np/ab/jasper/activ/itineraires-itineraries/glacier-athabasca"
    },
    "sunwapta": {
      "title": "Parks Canada · 桑瓦普塔瀑布",
      "url": "https://parks.canada.ca/pn-np/ab/jasper/activ/itineraires-itineraries/sunwapta"
    },
    "athabasca": {
      "title": "Parks Canada · 阿萨巴斯卡瀑布",
      "url": "https://parks.canada.ca/pn-np/ab/jasper/activ/itineraires-itineraries/athabasca"
    },
    "milford": {
      "title": "DOC · Milford Track 路线与分日说明",
      "url": "https://www.doc.govt.nz/milfordtrack"
    },
    "routeburn": {
      "title": "DOC · Routeburn Track 路线与分日说明",
      "url": "https://www.doc.govt.nz/routeburntrack"
    },
    "kepler": {
      "title": "DOC · Kepler Track 路线与分日说明",
      "url": "https://www.doc.govt.nz/keplertrack"
    },
    "clinton": {
      "title": "DOC · Clinton Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/clinton-hut/"
    },
    "mintaro": {
      "title": "DOC · 2021 年启用的新 Mintaro Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/mintaro-hut/"
    },
    "dumpling": {
      "title": "DOC · Dumpling Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/dumpling-hut/"
    },
    "routeburnFalls": {
      "title": "DOC · Routeburn Falls Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/mount-aspiring-national-park/things-to-do/huts/routeburn-falls-hut/"
    },
    "mackenzie": {
      "title": "DOC · Lake Mackenzie Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/lake-mackenzie-hut/"
    },
    "luxmore": {
      "title": "DOC · Luxmore Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/luxmore-hut/"
    },
    "iris": {
      "title": "DOC · Iris Burn Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/iris-burn-hut/"
    },
    "moturau": {
      "title": "DOC · Moturau Hut",
      "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/moturau-hut/"
    },
    "argNorth": {
      "title": "阿根廷国家公园管理局 · Los Glaciares 北区步道图",
      "url": "https://www.argentina.gob.ar/sites/default/files/2019/06/folleto_senderos_zona_norte_pnlg_ingles_2024.pdf"
    },
    "argMoreno": {
      "title": "阿根廷国家公园管理局 · 莫雷诺冰川栈道图",
      "url": "https://www.argentina.gob.ar/sites/default/files/2019/06/mapa_pasarelas_-_el_calafate_2024.pdf"
    },
    "argVisit": {
      "title": "阿根廷国家公园管理局 · Los Glaciares 探访资料",
      "url": "https://www.argentina.gob.ar/parquesnacionales/patagonia-austral/parque-nacional-los-glaciares/planea-tu-visita"
    },
    "paineMap": {
      "title": "Torres del Paine · 官方道路与步道图",
      "url": "https://parquetorresdelpaine.cl/wp-content/uploads/2026/01/Mapa-Rutero-Ingles.pdf"
    },
    "paineSeason": {
      "title": "Torres del Paine · 2026–2027 季节通告",
      "url": "https://parquetorresdelpaine.cl/boletin-informativo-temporada-2026-2027/"
    },
    "paine": {
      "title": "Torres del Paine · 步道与预约资料",
      "url": "https://parquetorresdelpaine.cl/recomendaciones-para-su-viaje-2026/"
    }
  },
  "themes": [
    {
      "id": "canadian-rockies",
      "name": "加拿大落基山",
      "title": "冰川的来路，<br>湖水的颜色",
      "story": "沿冰原大道与两湖接驳，看班夫和贾斯珀的冰川、湖泊与瀑布。",
      "scope": "8 个公共游览节点 · 3 条实际公路 / 接驳行程",
      "intro": "以冰原大道串联的公路廊道为主，另设路易斯湖—梦莲湖接驳线。三条参考行程独立选择；湖岸与观景台坐标不是冰川攀登入口。",
      "photo": "natural-peyto",
      "area": "美洲",
      "keywords": "加拿大 落基山 班夫 贾斯珀 冰原大道 路易斯湖 梦莲湖 Canadian Rockies Banff Jasper Icefields Parkway",
      "en": "CANADIAN ROCKIES"
    },
    {
      "id": "nz-great-walks",
      "name": "新西兰南岛 · 三条 Great Walks",
      "title": "翻过山口，<br>走回湖岸",
      "story": "米尔福德、路特本与开普勒，三条各自完整的南岛步道。",
      "scope": "17 个步道节点 · 3 条独立步道 · 非串联总路线",
      "intro": "精选 Milford、Routeburn、Kepler 三条 DOC Great Walks，分别展示实际入口、山屋、山口与出口。三条步道彼此独立，没有跨步道总连线；需分别预订山屋和交通，未收齐新西兰全部 Great Walks。",
      "photo": "natural-mackinnon-pass",
      "area": "大洋洲",
      "keywords": "新西兰 南岛 徒步 Great Walks Milford 米尔福德 密尔福德 Routeburn 路特本 Kepler 开普勒 Fiordland",
      "en": "SOUTH ISLAND GREAT WALKS"
    },
    {
      "id": "patagonia-nature",
      "name": "巴塔哥尼亚 · 冰川与塔峰",
      "title": "走到冰川前，<br>仰望花岗岩",
      "story": "分开探索埃尔查尔滕、莫雷诺冰川与百内的真实日行路线。",
      "scope": "14 个访问节点 · 5 条独立行程 · 跨区转场另排",
      "intro": "这是一张阿根廷、智利两侧的分区自然地图，不是一条跨国连续徒步。三湖、托雷湖、莫雷诺公共栈道、百内塔基、大瀑布—角峰各有独立路线；不冒充 W / O 全线，不把远处山峰或冰川中心当作可步行抵达点。",
      "photo": "natural-los-tres",
      "area": "美洲",
      "keywords": "巴塔哥尼亚 阿根廷 智利 冰川 百内 菲茨罗伊 托雷 埃尔查尔滕 埃尔卡拉法特 Patagonia Torres del Paine Los Glaciares Fitz Roy",
      "en": "PATAGONIA"
    }
  ],
  "points": [
    {
      "theme": "canadian-rockies",
      "id": "louise",
      "name": "路易斯湖 · 湖岸",
      "en": "Lake Louise Lakeshore",
      "country": "加拿大",
      "region": "班夫国家公园",
      "type": "冰川湖泊",
      "lon": -116.216464,
      "lat": 51.416285,
      "source": "lakes",
      "desc": "维多利亚冰川下的湖盆把雪峰、森林与冰川融水放在同一视野里。地图定位湖岸开放游览区，照片另从蜂巢山高处观看这片湖泊。",
      "reading": "先看山壁、冰川与湖水的相对位置，再沿湖岸辨认倒影怎样随光和风改变。高处全景不等于湖岸所见的同一机位，两种尺度适合对读。",
      "access": "湖岸步行可与梦莲湖分日或同日安排；Parks Canada 接驳车需预约，在 Park and Ride 报到，具体运营日期另核官方页面。",
      "geoSource": "https://www.openstreetmap.org/node/5168327021",
      "photo": "natural-louise"
    },
    {
      "theme": "canadian-rockies",
      "id": "moraine",
      "name": "梦莲湖 · 十峰山谷",
      "en": "Moraine Lake",
      "country": "加拿大",
      "region": "班夫国家公园",
      "type": "冰川湖泊",
      "lon": -116.179991,
      "lat": 51.327627,
      "source": "lakes",
      "desc": "十峰山谷环抱的梦莲湖，适合比较湖岸森林、冰碛和陡峭山峰的层次。地图标在湖岸观景区，而不是把湖心当作抵达点。",
      "reading": "这里的观看重点是湖盆与山群的关系。湖水颜色、积雪和倒影都会随季节改变；照片保留其拍摄时的状态，不代表全年都有同样景象。",
      "access": "梦莲湖道路全年不向普通私家车开放。选择已预约的公园接驳或持牌运营服务；两湖之间的 Lake Connector 需符合相应票务条件。",
      "geoSource": "https://www.openstreetmap.org/node/348002839",
      "photo": "natural-moraine"
    },
    {
      "theme": "canadian-rockies",
      "id": "bow",
      "name": "弓湖 · 北岸",
      "en": "Bow Lake North Shore",
      "country": "加拿大",
      "region": "班夫国家公园",
      "type": "冰川湖泊",
      "lon": -116.4643,
      "lat": 51.677891,
      "source": "parkway",
      "desc": "冰原公路旁的弓湖把冰川、湖泊与弓河源头联系起来。北岸可从主入口短距离抵达湖边，与南面的公路观景停车区是不同落点。",
      "reading": "沿湖看远山、冰川融水与岸线的关系。湖泊是地貌系统的一环，湖边短停与向弓冰川瀑布深入的山地徒步，应作为不同活动安排。",
      "access": "从 93N 接湖岸支路，在合法停车区停留并选择开放步道。本图不把弓冰川瀑布徒步自动加入这次湖岸短停。",
      "geoSource": "https://www.openstreetmap.org/node/5160023921",
      "photo": "natural-bow"
    },
    {
      "theme": "canadian-rockies",
      "id": "peyto",
      "name": "佩投湖 · 山顶观景区",
      "en": "Peyto Lake Viewpoint",
      "country": "加拿大",
      "region": "班夫国家公园",
      "type": "冰川湖泊",
      "lon": -116.509434,
      "lat": 51.713999,
      "source": "parkway",
      "desc": "从 Bow Summit 一带高处俯看，佩投湖与冰川山谷的轮廓一同展开。本点属于山顶观景区，不是陡峭下湖步道的湖岸终点。",
      "reading": "可先观察谷地的长轴，再看湖泊怎样嵌在森林与裸露山坡之间。冰川粉末与光线共同影响水色，照片中的明亮蓝色不是固定不变的属性。",
      "access": "从官方停车区步行进入观景步道；高处残雪、路面和开放状态需临行核实。不要把短距离观景台散步等同于下到湖岸的困难路线。",
      "geoSource": "https://www.openstreetmap.org/node/1647469449",
      "photo": "natural-peyto"
    },
    {
      "theme": "canadian-rockies",
      "id": "athabasca-glacier",
      "name": "哥伦比亚冰原中心 · 阿萨巴斯卡冰川",
      "en": "Columbia Icefield Centre / Athabasca Glacier",
      "country": "加拿大",
      "region": "贾斯珀国家公园",
      "type": "冰川与前缘",
      "lon": -117.224187,
      "lat": 52.220342,
      "source": "glacier",
      "desc": "阿萨巴斯卡冰川从高处冰原流入山谷，裸露冰碛记录着冰舌退缩。本点定位冰原中心的抵达区域，照片展示谷地中的冰川，而非可自由步入的冰面。",
      "reading": "从远处比较冰舌、两侧山壁与前缘碎石，可以把冰川理解为仍在变化的地貌。退冰后的新裸地与较成熟植被，也提供不同时间尺度的线索。",
      "access": "以冰原中心和正式开放的前缘步道组织参观。冰面活动需另选合法专业服务；地图没有把冰川裂隙区作为普通徒步站点。",
      "geoSource": "https://www.openstreetmap.org/way/282985047",
      "photo": "natural-athabasca-glacier"
    },
    {
      "theme": "canadian-rockies",
      "id": "sunwapta",
      "name": "桑瓦普塔瀑布",
      "en": "Sunwapta Falls",
      "country": "加拿大",
      "region": "贾斯珀国家公园",
      "type": "峡谷瀑布",
      "lon": -117.6453,
      "lat": 52.5322,
      "source": "sunwapta",
      "desc": "桑瓦普塔瀑布位于冰原公路旁的支线，河流从较高的悬谷跌入石灰岩峡谷。它让沿线风景从开阔冰原转为近距离的水与岩壁。",
      "reading": "看河道在上下游之间的高差，能理解冰川塑造的悬谷如何留下瀑布。桥上的全景与林中较低视角，展示不同尺度的冲刷地形。",
      "access": "自 93N 转入正式游览区，沿开放步道看瀑布。上下瀑布的步行用时不同，公路转场与林中步行分别留出时间。",
      "geoSource": "https://en.wikipedia.org/wiki/Sunwapta_Falls",
      "photo": "natural-sunwapta"
    },
    {
      "theme": "canadian-rockies",
      "id": "athabasca-falls",
      "name": "阿萨巴斯卡瀑布",
      "en": "Athabasca Falls",
      "country": "加拿大",
      "region": "贾斯珀国家公园",
      "type": "峡谷瀑布",
      "lon": -117.883611,
      "lat": 52.664167,
      "source": "athabasca",
      "desc": "大流量的阿萨巴斯卡河在这里越过坚硬岩层，继续切入较软的石灰岩，形成壶穴与狭窄峡谷。重点不只是瀑布高度，还有水对不同岩石的作用。",
      "reading": "可以比较主跌水、旧河道与峡谷中的磨蚀痕迹。项目照片摄于积雪环境，暖季的水量、色彩与步道观感会有所不同。",
      "access": "从官方停车和步道系统进入，在护栏内观看水流。这里适合作为冰原公路北段的独立停留，不包含峡谷下游的其他水上活动。",
      "geoSource": "https://en.wikipedia.org/wiki/Athabasca_Falls",
      "photo": "natural-athabasca-falls"
    },
    {
      "theme": "canadian-rockies",
      "id": "jasper",
      "name": "贾斯珀 · 山地旅行基地",
      "en": "Jasper",
      "country": "加拿大",
      "region": "贾斯珀国家公园",
      "type": "山地基地",
      "lon": -118.082222,
      "lat": 52.873056,
      "source": "parkway",
      "desc": "贾斯珀位于阿萨巴斯卡河谷，是冰原公路北端的旅行基地。镇区与周围山地共同呈现交通、住宿和国家公园探访之间的关系。",
      "reading": "从高处看镇区、河流与谷地，可以理解为什么服务设施集中在这里。所配俯瞰照片拍于 2008 年，是历史影像，不用来判断今天每一片林地或设施的状态。",
      "access": "将镇区作为住宿、补给和路线终点，另查当前公园开放信息。前往玛琳湖、缆车或其他支线需单独规划，不自动计入本图的冰原公路行程。",
      "geoSource": "https://en.wikipedia.org/wiki/Jasper,_Alberta",
      "photo": "natural-jasper"
    },
    {
      "theme": "nz-great-walks",
      "id": "glade-wharf",
      "name": "Glade Wharf · 湖上起点",
      "en": "Glade Wharf",
      "country": "新西兰",
      "region": "Milford Track",
      "type": "Milford Track",
      "lon": 167.930307,
      "lat": -44.932153,
      "source": "milford",
      "desc": "Milford Track 的独立步行从蒂阿瑙湖尽头的码头开始。这里没有公路直达，湖上接驳本身就是进入山谷的第一段交通。",
      "reading": "抵达后，观看尺度从宽阔湖面转为克林顿河谷的森林。码头与稍上游的 Glade House 是两个地点，本图采用独立步行者的 DOC 山屋安排。",
      "access": "先从 Te Anau Downs 乘预约船到码头，再步行至 Clinton Hut。船班与四日步道的住宿应一并安排。",
      "geoSource": "https://www.openstreetmap.org/node/1583602527",
      "photo": "natural-glade-wharf"
    },
    {
      "theme": "nz-great-walks",
      "id": "clinton-hut",
      "name": "克林顿山屋",
      "en": "Clinton Hut",
      "country": "新西兰",
      "region": "Milford Track",
      "type": "Milford Track",
      "lon": 167.908273,
      "lat": -44.905804,
      "source": "clinton",
      "desc": "独立步行的第一夜位于克林顿河谷林地中。山屋附近的河流与湿地，是理解峡湾地区降水、森林和排水关系的近距离入口。",
      "reading": "可以观察林下苔藓、湿地植被与河道的变化。照片展示山屋周边的停机坪和谷地环境，并不把停机设施当作徒步者的活动区域。",
      "access": "从 Glade Wharf 沿正式步道到达，Great Walks 季节须按预订入住。附近湿地短线是可选活动，是否开放以 DOC 当日信息为准。",
      "geoSource": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/clinton-hut/",
      "photo": "natural-clinton-hut"
    },
    {
      "theme": "nz-great-walks",
      "id": "mintaro-hut",
      "name": "明塔罗新山屋",
      "en": "Mintaro Hut (2021)",
      "country": "新西兰",
      "region": "Milford Track",
      "type": "Milford Track",
      "lon": 167.780882,
      "lat": -44.80784,
      "source": "mintaro",
      "desc": "2021 年启用的新明塔罗山屋位于旧屋上游约 1.5 公里，是越过麦金农山口前的第二夜。地图采用新屋坐标，没有继续定位旧屋。",
      "reading": "从谷底向上，森林、岩壁与开阔高处的比例逐渐改变。抵达山屋后，可把当天走过的河谷与次日山口的高差联系起来阅读。",
      "access": "从 Clinton Hut 按 DOC 路线前进至新山屋，预留完整步行日。此处未借用旧山屋照片，住宿与次日山口通行须按当前预订和现场通知安排。",
      "geoSource": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/mintaro-hut/",
      "photo": null
    },
    {
      "theme": "nz-great-walks",
      "id": "mackinnon-pass",
      "name": "麦金农山口",
      "en": "Omanui / McKinnon Pass",
      "country": "新西兰",
      "region": "Milford Track",
      "type": "Milford Track",
      "lon": 167.765782,
      "lat": -44.802491,
      "source": "milford",
      "desc": "山口连接克林顿河谷与西侧的亚瑟河谷，是 Milford 步道中地形和视野变化最鲜明的一段。这里是步道山口，不是周边山峰的攀登目标。",
      "reading": "在天气允许时比较两侧山谷与陡壁，可以看到冰川侵蚀留下的空间尺度。所配照片从步道另一侧望向山口，不能据此判断抵达当天的风雪。",
      "access": "从 Mintaro Hut 越过山口，再沿官方路线下降至 Dumpling Hut；山口休息与观景服从当日天气和 DOC 指示，地图不包含任何攀岩支线。",
      "geoSource": "https://www.openstreetmap.org/node/321539221",
      "photo": "natural-mackinnon-pass"
    },
    {
      "theme": "nz-great-walks",
      "id": "dumpling-hut",
      "name": "丹普林山屋",
      "en": "Dumpling Hut",
      "country": "新西兰",
      "region": "Milford Track",
      "type": "Milford Track",
      "lon": 167.764389,
      "lat": -44.768698,
      "source": "dumpling",
      "desc": "越过山口后，第三夜重新回到亚瑟河谷的森林环境。丹普林山屋将高处山行与最后一天的河谷步道分成两段。",
      "reading": "从山屋周围看林地、河谷与湿润地面，可对照前一段的裸露山口。山屋生活空间的照片补充了多日步行的实际尺度，而不是另一处峡湾的通用风景。",
      "access": "按 DOC 的四日安排在此入住，次日走到 Sandfly Point 并接预订船班。Sutherland Falls 是另行判断时间和开放情况的支线，不在本图主线中。",
      "geoSource": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/dumpling-hut/",
      "photo": "natural-dumpling-hut"
    },
    {
      "theme": "nz-great-walks",
      "id": "sandfly-point",
      "name": "Sandfly Point · 步道终点",
      "en": "Sandfly Point Shelter",
      "country": "新西兰",
      "region": "Milford Track",
      "type": "Milford Track",
      "lon": 167.90166,
      "lat": -44.68411,
      "source": "milford",
      "desc": "亚瑟河谷步道在 Milford Sound 内湾的终点结束。终点棚屋与接驳码头是徒步和船运之间的转换处，不能沿地图直线走到对岸公路。",
      "reading": "终点标牌、步行者留下的旧靴与附近水面，记录了这条山径的使用方式。它与湖上起点共同说明：四日徒步之外仍有两端接驳。",
      "access": "抵达后乘预约船前往 Milford Sound 一侧，再按预订交通离开。此处不是露营地，也不等同于可自由驾车抵达的 Milford Sound 游客码头。",
      "geoSource": "https://www.openstreetmap.org/way/1360316344",
      "photo": "natural-sandfly-point"
    },
    {
      "theme": "nz-great-walks",
      "id": "routeburn-shelter",
      "name": "Routeburn Shelter · 东端起点",
      "en": "Routeburn Shelter",
      "country": "新西兰",
      "region": "Routeburn Track",
      "type": "Routeburn Track",
      "lon": 168.278689,
      "lat": -44.718849,
      "source": "routeburn",
      "desc": "鲁特本步道的东端位于河谷道路尽头。从这里进入林地，逐渐沿河上升到开阔的高山湖泊与山口。",
      "reading": "沿线从森林到山顶草地的变化，比把整条步道理解成一个观景台更有意义。起点棚屋与路边停车区相邻，坐标标在棚屋区域。",
      "access": "从 Glenorchy 方向安排公路接送，向 Routeburn Falls Hut 开始多日徒步。东、西两端的公路转移很长，接驳应在出发前安排。",
      "geoSource": "https://www.openstreetmap.org/way/244432430",
      "photo": null
    },
    {
      "theme": "nz-great-walks",
      "id": "routeburn-falls",
      "name": "鲁特本瀑布山屋",
      "en": "Routeburn Falls Hut",
      "country": "新西兰",
      "region": "Routeburn Track",
      "type": "Routeburn Track",
      "lon": 168.199511,
      "lat": -44.725455,
      "source": "routeburnFalls",
      "desc": "山屋靠近林线上方的瀑布，是常见三日安排中的第一夜。河谷、林地与高处草甸在这里形成明显的过渡。",
      "reading": "可从山屋周边比较下方森林与上方山地的尺度。所配 1999 年照片展示山屋建筑，拍摄年代已注明，不代表当前设施的实时状态。",
      "access": "从 Routeburn Shelter 经 Routeburn Flats 上升抵达；Great Walks 季节需预约。次日到 Lake Mackenzie 的路段包含山口与暴露山坡，不能只按直线距离估时。",
      "geoSource": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/otago/places/mount-aspiring-national-park/things-to-do/huts/routeburn-falls-hut/",
      "photo": "natural-routeburn-falls"
    },
    {
      "theme": "nz-great-walks",
      "id": "harris-saddle",
      "name": "哈里斯山口",
      "en": "Harris Saddle / Tarahaka Whakatipu",
      "country": "新西兰",
      "region": "Routeburn Track",
      "type": "Routeburn Track",
      "lon": 168.170337,
      "lat": -44.726954,
      "source": "routeburn",
      "desc": "哈里斯山口是鲁特本主线从东侧河谷转向 Hollyford 山坡的高处节点。附近湖泊、草甸与山壁共同塑造了步道的开阔段。",
      "reading": "看湖盆与山口的相对高度，可理解这条横穿两座国家公园的山径。Conical Hill 是额外的高处支线，不因为地图经过山口就自动包含。",
      "access": "从 Routeburn Falls Hut 前行，过山口后按主线下降至 Lake Mackenzie Hut。日间棚屋用于短时避风，不能当作预约住宿山屋。",
      "geoSource": "https://en.wikipedia.org/wiki/Routeburn_Track",
      "photo": null
    },
    {
      "theme": "nz-great-walks",
      "id": "lake-mackenzie",
      "name": "麦肯齐湖山屋",
      "en": "Lake Mackenzie Hut",
      "country": "新西兰",
      "region": "Routeburn Track",
      "type": "Routeburn Track",
      "lon": 168.17453696196685,
      "lat": -44.76768183427165,
      "source": "mackenzie",
      "desc": "山屋位于亚高山湖泊边，是 Routeburn 常见三日行程的第二夜。湖岸、林线与先前横切的山坡构成不同观看层次。",
      "reading": "从湖边回看高处山坡，可以对照步道下降的地形。图片从山屋望向湖泊环境，保留窗框这一实际观看位置，没有借用别处高山湖泊。",
      "access": "按预订入住后，次日经 Earland Falls、Lake Howden 一带走向 The Divide。旧 Lake Howden Hut 已损毁，本图没有把它列作住宿点。",
      "geoSource": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/lake-mackenzie-hut/",
      "photo": "natural-lake-mackenzie"
    },
    {
      "theme": "nz-great-walks",
      "id": "divide",
      "name": "The Divide · 西端出口",
      "en": "The Divide Shelter",
      "country": "新西兰",
      "region": "Routeburn Track",
      "type": "Routeburn Track",
      "lon": 168.117564,
      "lat": -44.824845,
      "source": "routeburn",
      "desc": "鲁特本步道的西端落在 Milford 公路旁的山口。结束徒步后进入的是公路交通系统，而不是一条可直接返回东端起点的短路。",
      "reading": "这里适合回看山径怎样从森林下降到道路。Key Summit 是附近的独立往返支线，想加入时须重新核对时间与天气。",
      "access": "在此接预订车辆往 Te Anau 或其他目的地。DOC 提醒东西两端公路距离约 325 公里，因此三日徒步的两端接送要分开准备。",
      "geoSource": "https://www.openstreetmap.org/way/115655414",
      "photo": null
    },
    {
      "theme": "nz-great-walks",
      "id": "kepler-gates",
      "name": "蒂阿瑙控制闸 · Kepler 起终点",
      "en": "Lake Te Anau Control Gates",
      "country": "新西兰",
      "region": "Kepler Track",
      "type": "Kepler Track",
      "lon": 167.68972,
      "lat": -45.441806,
      "source": "kepler",
      "desc": "Kepler 环线从蒂阿瑙湖出口附近进入林地，完整步道最终沿河岸回到这里。湖泊、河流与山脊构成这条环线的三个地形层次。",
      "reading": "从低处湖岸开始，再在高处回望湖盆，可以把四日步行理解为一次地貌高度的转换，而不是把六个站点当成六个独立景区。",
      "access": "从 Te Anau 安排步行或短程公路接驳。走完整环线需预订山屋；只走湖岸短段时，应按实际返回点单独安排。",
      "geoSource": "https://en.wikipedia.org/wiki/Kepler_Track",
      "photo": null
    },
    {
      "theme": "nz-great-walks",
      "id": "brod-bay",
      "name": "布罗德湾",
      "en": "Brod Bay",
      "country": "新西兰",
      "region": "Kepler Track",
      "type": "Kepler Track",
      "lon": 167.67446,
      "lat": -45.40418,
      "source": "kepler",
      "desc": "布罗德湾位于蒂阿瑙湖边，是从控制闸走向高处山屋之前的低海拔节点。湖岸森林与沙砾岸线呈现出不同于山脊的环境。",
      "reading": "在开始持续上升之前，可观察湖泊边缘的植被与岸线变化。水上接驳能改变行程起点，但不意味着已经走过控制闸到这里的湖岸段。",
      "access": "本图完整环线选择从控制闸步行经过此处，再向 Luxmore Hut 上升。若另乘船抵达，须独立确认水上运营与后续住宿。",
      "geoSource": "https://www.goatmaps.com/races/kepler-challenge",
      "photo": null
    },
    {
      "theme": "nz-great-walks",
      "id": "luxmore",
      "name": "勒克斯莫尔山屋",
      "en": "Luxmore Hut",
      "country": "新西兰",
      "region": "Kepler Track",
      "type": "Kepler Track",
      "lon": 167.619159,
      "lat": -45.385232,
      "source": "luxmore",
      "desc": "山屋位于林线上方，面向蒂阿瑙湖盆与周围山地。它是四日 Kepler 环线的第一夜，也标志着从湖岸森林进入高处草坡。",
      "reading": "从建筑与山坡的比例，可以感受多日步行中住宿点的真实尺度。观察开阔草地、林线与远处湖面，比只看一座山峰更能理解沿线变化。",
      "access": "Luxmore Hut 全年均需按 DOC 规则预约。次日沿山脊走向 Iris Burn；Luxmore 峰顶与洞穴是可选支线，不在本图主线路径中。",
      "geoSource": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/luxmore-hut/",
      "photo": "natural-luxmore"
    },
    {
      "theme": "nz-great-walks",
      "id": "iris-burn",
      "name": "艾里斯伯恩山屋",
      "en": "Iris Burn Hut",
      "country": "新西兰",
      "region": "Kepler Track",
      "type": "Kepler Track",
      "lon": 167.50946,
      "lat": -45.399005,
      "source": "iris",
      "desc": "从暴露山脊下降后，山屋重新位于河谷林地与草地之间。它是从高处环境转入山谷步行的第二夜。",
      "reading": "比较抵达前的开阔坡地与山屋周围的森林，可看到海拔和湿度变化怎样影响植被。照片展示具体山屋与其所在林地。",
      "access": "从 Luxmore Hut 沿官方山脊主线抵达，之后向 Moturau Hut 继续。附近瀑布属于另行考虑的短支线；住宿仍按预订安排。",
      "geoSource": "https://www.openstreetmap.org/way/244431388",
      "photo": "natural-iris-burn"
    },
    {
      "theme": "nz-great-walks",
      "id": "moturau",
      "name": "莫图劳山屋",
      "en": "Moturau Hut",
      "country": "新西兰",
      "region": "Kepler Track",
      "type": "Kepler Track",
      "lon": 167.609828,
      "lat": -45.482101,
      "source": "moturau",
      "desc": "第三夜靠近马纳普里湖的湖岸，步道从河谷森林走向较低处的水边。这里与蒂阿瑙湖起点属于同一环线中的不同湖盆。",
      "reading": "湖岸的开阔水面与前几日狭窄谷地形成对照。此点采用 DOC 山屋坐标，没有用同名的斯图尔特岛花园或别处湖景代替。",
      "access": "在预订山屋过夜后，次日经 Rainbow Reach 沿河岸返回控制闸。选择在 Rainbow Reach 提前退出时，须改为约定的接送行程。",
      "geoSource": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/things-to-do/huts/moturau-hut/",
      "photo": null
    },
    {
      "theme": "nz-great-walks",
      "id": "rainbow-reach",
      "name": "Rainbow Reach · 吊桥与接驳点",
      "en": "Rainbow Reach Swing Bridge",
      "country": "新西兰",
      "region": "Kepler Track",
      "type": "Kepler Track",
      "lon": 167.6625,
      "lat": -45.49083,
      "source": "kepler",
      "desc": "吊桥附近把林中步道与河谷道路相接，是 Kepler 可选择的提前退出点。完整环线则继续沿 Waiau 河岸返回控制闸。",
      "reading": "可以在这里比较人工桥梁与河谷林地的尺度。它是接驳选择，不是把环线任意缩成直线横穿湖泊的理由。",
      "access": "本图六站环线继续走回控制闸；若在此乘车离开，实际徒步距离和天数会改变，需与交通及住宿预订一起调整。",
      "geoSource": "https://en.wikipedia.org/wiki/Kepler_Track",
      "photo": null
    },
    {
      "theme": "patagonia-nature",
      "id": "fitzroy-start",
      "name": "菲茨罗伊步道口",
      "en": "Fitz Roy Trailhead",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.894965,
      "lat": -49.320282,
      "type": "步道起点",
      "source": "argNorth",
      "desc": "从埃尔查尔滕北缘进入菲茨罗伊山群的步道，先爬升到河谷上方，再向冰川湖盆前进。这里是实际步行入口，不是远处山峰的坐标。",
      "reading": "把小镇、森林带和山前谷地看作同一剖面。前往三湖的最后爬升与前段林间路有明显强度差别。",
      "access": "三湖往返是一整天的长距离山地徒步；按天气、体力和日照决定是否继续，查官方步道状态。",
      "photo": null,
      "geoSource": "https://www.openstreetmap.org/node/7069713837"
    },
    {
      "theme": "patagonia-nature",
      "id": "capri",
      "name": "卡普里湖 · 湖岸",
      "en": "Laguna Capri",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.929679,
      "lat": -49.302854,
      "type": "冰川湖泊",
      "source": "argNorth",
      "desc": "低处的森林湖岸提供菲茨罗伊山群的远景，也是理解山前地形的停留点。湖岸支路与通往三湖的主线需在岔口辨认。",
      "reading": "在这里比较平静湖面与背后的锯齿状山壁。倒影受风影响，不能用明信片景色判断当天是否值得停留。",
      "access": "湖岸短支路会增加实际步行长度；可作为较短往返目的地，不必强行继续三湖。",
      "photo": "natural-capri",
      "geoSource": "https://www.openstreetmap.org/node/598214635"
    },
    {
      "theme": "patagonia-nature",
      "id": "poincenot",
      "name": "波因塞诺营地附近",
      "en": "Campamento Poincenot",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.960912,
      "lat": -49.281228,
      "type": "步道节点",
      "source": "argNorth",
      "desc": "步道穿过森林抵达布兰科河附近的营地区域，随后才是通向三湖的陡升段。这里是长线徒步中的判断节点。",
      "reading": "回看河谷与前方坡度的变化，能理解冰川退缩留下的地形台阶。营地位置不意味着任何季节均可住宿。",
      "access": "不把营地当作已预订住宿；露营规则、许可及开放状态查国家公园。日行路线应留足下撤时间。",
      "photo": null,
      "geoSource": "https://www.openstreetmap.org/node/598214616"
    },
    {
      "theme": "patagonia-nature",
      "id": "los-tres",
      "name": "三湖 · 菲茨罗伊观景岸",
      "en": "Laguna de los Tres",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.985718,
      "lat": -49.279791,
      "type": "冰川湖泊",
      "source": "argNorth",
      "desc": "最后陡坡把步行者带到菲茨罗伊山前的高位湖盆。地图定位可步行抵达的观景岸，而不是山顶或湖心。",
      "reading": "近处冰碛、湖水与花岗岩塔峰组成不同尺度的前后景。低云和强风可能遮蔽峰顶，抵达本身不保证全景。",
      "access": "从埃尔查尔滕出发的往返约二十公里级，湖岸绕行另计；冰雪、强风或体力不足时在前段折返。",
      "photo": "natural-los-tres",
      "geoSource": "https://www.openstreetmap.org/node/12644283701"
    },
    {
      "theme": "patagonia-nature",
      "id": "torre-start",
      "name": "托雷湖步道口",
      "en": "Laguna Torre Trailhead",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.895184,
      "lat": -49.331114,
      "type": "步道起点",
      "source": "argNorth",
      "desc": "埃尔查尔滕西侧的步道通往菲茨罗伊河谷，与北侧三湖线路分别组织。两条线各需独立安排时间。",
      "reading": "这条谷地路线从低处逐渐接近冰川和托雷峰群。它与三湖不是一条简单顺序的城市漫步。",
      "access": "按官方北区步道图寻找入口，天气窗口不足时选择较近的观景台折返。",
      "photo": null,
      "geoSource": "https://www.openstreetmap.org/node/2031899561"
    },
    {
      "theme": "patagonia-nature",
      "id": "torre-view",
      "name": "托雷峰观景台",
      "en": "Mirador Cerro Torre",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.9271,
      "lat": -49.332777,
      "type": "山谷观景",
      "source": "argNorth",
      "desc": "步道较早出现的山谷观景点，可以远望托雷峰群和河谷。它是有明确目的地的短线选择，也是湖泊长线的途中节点。",
      "reading": "看河流如何引导视线，再比较山前坡地与远处尖峰。远山是否显露取决于云层，照片不是实时状态。",
      "access": "与托雷湖共用前段步道；若天气或体力不宜继续，可从这里原路返回。",
      "photo": null,
      "geoSource": "https://www.openstreetmap.org/node/771456301"
    },
    {
      "theme": "patagonia-nature",
      "id": "torre",
      "name": "托雷湖 · 冰川前缘",
      "en": "Laguna Torre",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.988927,
      "lat": -49.330103,
      "type": "冰川湖泊",
      "source": "argNorth",
      "desc": "冰碛堤后的托雷湖位于山谷尽头，湖面、冰川与托雷峰群形成一条地形线索。地图点在公共步道可到的岸边。",
      "reading": "辨认漂浮冰块、冰碛和冰川舌之间的关系。冰川持续变化，历史照片只用来理解拍摄时的景观。",
      "access": "这条往返与三湖分日安排；不延伸为未说明的冰川穿越，也不把远处攀登线路算入观景步道。",
      "photo": "natural-torre",
      "geoSource": "https://www.openstreetmap.org/node/4753539121"
    },
    {
      "theme": "patagonia-nature",
      "id": "calafate",
      "name": "埃尔卡拉法特",
      "en": "El Calafate",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -72.26,
      "lat": -50.337778,
      "type": "公路门户",
      "source": "argVisit",
      "desc": "阿根廷湖畔的小镇是前往佩里托莫雷诺冰川公共栈道的公路门户。它与北区埃尔查尔滕相距甚远，不放进同一天徒步。",
      "reading": "把城镇视作交通与补给节点，再前往冰川前的观察空间。湖区尺度远大于地图上相邻的标签。",
      "access": "经省道 RP 11 前往冰川区；选择自驾、正规接驳或运营团队，核实国家公园门票与当日道路状态。",
      "photo": "natural-calafate",
      "geoSource": "https://en.wikipedia.org/wiki/El_Calafate"
    },
    {
      "theme": "patagonia-nature",
      "id": "moreno",
      "name": "佩里托莫雷诺 · 公共栈道",
      "en": "Perito Moreno Boardwalks",
      "country": "阿根廷",
      "region": "冰川国家公园",
      "lon": -73.032894,
      "lat": -50.468999,
      "type": "冰川观景",
      "source": "argMoreno",
      "desc": "公共栈道沿麦哲伦半岛的岸坡布置，隔水观看冰川前缘。地图定位中央栈道区域，未把游客放在冰川表面。",
      "reading": "从不同高度观察冰崖、湖水与半岛的关系。冰崩发生时间不可预测，照片并非现场冰川边界。",
      "access": "按官方栈道图选择开放回路与无障碍通道；冰川徒步和游船属于另行组织的活动，不包含在这条公路观景线。",
      "photo": "natural-moreno",
      "geoSource": "https://www.openstreetmap.org/way/41821342"
    },
    {
      "theme": "patagonia-nature",
      "id": "torres-start",
      "name": "百内塔步道 · 游客接待点",
      "en": "Las Torres Welcome Center",
      "country": "智利",
      "region": "百内国家公园",
      "lon": -72.863477,
      "lat": -50.965181,
      "type": "步道起点",
      "source": "paineSeason",
      "desc": "从拉斯托雷斯片区进入上阿森西奥山谷，沿实际步道往返百内塔基观景点。这里与公园西侧湖区短线分开安排。",
      "reading": "塔峰不是从入口就近抵达的景点。先理解谷地、山屋和末段冰碛坡的位置，才能判断一日步行的强度。",
      "access": "长距离往返须遵守当季登记、出发与折返要求；公园内通行和住宿均查官方规定。",
      "photo": null,
      "geoSource": "https://www.openstreetmap.org/node/5201266721"
    },
    {
      "theme": "patagonia-nature",
      "id": "chileno",
      "name": "智利人山屋附近",
      "en": "Refugio Chileno",
      "country": "智利",
      "region": "百内国家公园",
      "lon": -72.910648,
      "lat": -50.957245,
      "type": "步道节点",
      "source": "paineMap",
      "desc": "山屋区域位于上阿森西奥谷，连接入口步道与通往塔基的森林、冰碛坡段。它是实际路线中的中间节点。",
      "reading": "从河谷转入山前地形，能看见沿途环境由开阔坡面转为林地。山屋标记只表示位置，不代表床位可用。",
      "access": "住宿须独立确认；日行者按最新折返点与天气作决定，不把此处当作必定可补给的保证。",
      "photo": "natural-chileno",
      "geoSource": "https://www.openstreetmap.org/node/4057206327"
    },
    {
      "theme": "patagonia-nature",
      "id": "torres-base",
      "name": "百内塔基 · 湖岸观景点",
      "en": "Mirador Base Torres",
      "country": "智利",
      "region": "百内国家公园",
      "lon": -72.949663,
      "lat": -50.942668,
      "type": "山地观景",
      "source": "paineSeason",
      "desc": "冰川湖岸仰望三座花岗岩塔峰，是从东侧入口出发的一日往返目的地。定位在步道终点观景区，而不是技术攀登的峰顶。",
      "reading": "末段冰碛坡与湖岸让岩壁的尺度突然显现。天气和风会改变视野及行进条件，无法用照片代替现场判断。",
      "access": "中高强度山地往返，末段陡且暴露；根据官方季节公告与天气及时折返。此线不等同于完整 W 或 O 线。",
      "photo": "natural-torres-base",
      "geoSource": "https://www.openstreetmap.org/node/349097979"
    },
    {
      "theme": "patagonia-nature",
      "id": "salto-grande",
      "name": "大瀑布 · 湖区步道口",
      "en": "Salto Grande",
      "country": "智利",
      "region": "百内国家公园",
      "lon": -73.007778,
      "lat": -51.0675,
      "type": "瀑布与湖泊",
      "source": "paineSeason",
      "desc": "诺登舍尔德湖与佩奥埃湖之间的水流从狭口跌落。这里也是步行去库埃尔诺斯观景台的起点。",
      "reading": "在瀑布边看水如何连接两个湖盆，再沿湖区步道观察对岸的山体。水色与风浪会随天气变化。",
      "access": "从公路停车区步行进入，遵守开放时间和强风管理；这条短线不需要渡轮，也不属于跨湖连走的承诺。",
      "photo": "natural-salto-grande",
      "geoSource": "https://en.wikipedia.org/wiki/Salto_Grande,_Chile"
    },
    {
      "theme": "patagonia-nature",
      "id": "cuernos",
      "name": "库埃尔诺斯观景台",
      "en": "Mirador Cuernos",
      "country": "智利",
      "region": "百内国家公园",
      "lon": -73.012343,
      "lat": -51.048291,
      "type": "湖岸观景",
      "source": "paineMap",
      "desc": "从大瀑布沿湖岸步道来到诺登舍尔德湖对岸山群的观景点。短线以湖泊、角状山峰和风塑景观为主。",
      "reading": "比较深色上部岩层与浅色花岗岩山体，辨认著名角峰的轮廓。这里提供湖区尺度，不需要假设能沿直线横跨湖面。",
      "access": "由大瀑布原路往返，按当季公告检查步道开放和返程时间；不连接到 W 线营地。",
      "photo": null,
      "geoSource": "https://www.openstreetmap.org/node/349116507"
    }
  ],
  "plans": [
    {
      "id": "natural-icefields",
      "theme": "canadian-rockies",
      "name": "冰原大道 · 湖泊到冰川的四日公路",
      "ids": [
        "natural-louise",
        "natural-bow",
        "natural-peyto",
        "natural-athabasca-glacier",
        "natural-sunwapta",
        "natural-athabasca-falls",
        "natural-jasper"
      ],
      "days": 4,
      "months": [
        6,
        7,
        8,
        9
      ],
      "transport": "自驾 / 当地公路运营服务",
      "reason": "沿 93N 从路易斯湖区域北行至贾斯珀，分段停留湖泊、冰原观景区与瀑布。官方冰原大道主廊道为 232 km，湖岸、停车区及住宿接入另计；不含踏上冰川的活动。核实道路、停车区和火灾后开放状态。",
      "routeLabel": "公路慢游",
      "distanceText": "93N 主廊道 232 km · 景点接入另计",
      "climate": "https://parks.canada.ca/pn-np/ab/banff/visit/promenadedesglaciers-icefieldsparkway",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-southern-lakes",
      "theme": "canadian-rockies",
      "name": "班夫北部 · 弓湖与佩托湖两日停留",
      "ids": [
        "natural-louise",
        "natural-bow",
        "natural-peyto"
      ],
      "days": 2,
      "months": [
        6,
        7,
        8,
        9
      ],
      "transport": "自驾 + 湖岸 / 观景台短步行",
      "reason": "沿冰原大道南段安排三处湖泊，两天留出光线与短步行时间。佩托湖选择高处公共观景台，弓湖选择北岸，不延伸到冰川瀑布长线。停车和短径可能季节关闭。",
      "routeLabel": "公路与短步行",
      "distanceText": "沿冰原大道南段 · 下方连线为直线示意",
      "climate": "https://parks.canada.ca/pn-np/ab/banff/visit/promenadedesglaciers-icefieldsparkway",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-lake-connector",
      "theme": "canadian-rockies",
      "name": "两湖接驳 · 路易斯湖与梦莲湖",
      "ids": [
        "natural-louise",
        "natural-moraine"
      ],
      "days": 1,
      "months": [
        6,
        7,
        8,
        9
      ],
      "transport": "已预约公园接驳 + Lake Connector + 湖岸步行",
      "reason": "在 Park and Ride 报到后按有效票务条件搭乘两湖连接接驳，分别在湖岸停留再返回接驳站。梦莲湖道路不向普通私家车开放；需提前预约并核实当季运营日期，非两湖之间徒步穿越。",
      "routeLabel": "两湖接驳",
      "distanceText": "公园接驳连接两湖 · 非跨山徒步",
      "climate": "https://parks.canada.ca/pn-np/ab/banff/visit/parkbus/louise",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-milford",
      "theme": "nz-great-walks",
      "name": "米尔福德步道 · 四日单向穿越",
      "ids": [
        "natural-glade-wharf",
        "natural-clinton-hut",
        "natural-mintaro-hut",
        "natural-mackinnon-pass",
        "natural-dumpling-hut",
        "natural-sandfly-point"
      ],
      "days": 4,
      "months": [
        11,
        12,
        1,
        2,
        3,
        4
      ],
      "transport": "步行 + 两端船舶接驳",
      "reason": "按 DOC 独立徒步方向，从 Glade Wharf 入山，依次住 Clinton、现址 Mintaro、Dumpling 三间山屋，翻越 Mackinnon Pass 后到 Sandfly Point，终点乘船离开。53.5 km 是官方整条步道长度，地图节点直线不代表步道轨迹。需订山屋和两端船，季外条件不同。",
      "routeLabel": "单向徒步",
      "distanceText": "DOC 全线 53.5 km · 4 天 / 3 夜",
      "climate": "https://www.doc.govt.nz/milfordtrack",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-routeburn",
      "theme": "nz-great-walks",
      "name": "路特本步道 · 三日跨越哈里斯山口",
      "ids": [
        "natural-routeburn-shelter",
        "natural-routeburn-falls",
        "natural-harris-saddle",
        "natural-lake-mackenzie",
        "natural-divide"
      ],
      "days": 3,
      "months": [
        11,
        12,
        1,
        2,
        3,
        4
      ],
      "transport": "步行 + 两端公路接驳",
      "reason": "选 Routeburn Shelter 至 The Divide 的方向，分住 Routeburn Falls 与 Lake Mackenzie 山屋。DOC 全线 33 km，可反向行走；两端公路相距约 325 km，必须另行安排接驳。Lake Howden Hut 已毁，不列为住宿站。山屋预订、雪崩和天气查 DOC。",
      "routeLabel": "单向徒步",
      "distanceText": "DOC 全线 33 km · 两端公路约 325 km",
      "climate": "https://www.doc.govt.nz/routeburntrack",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-kepler",
      "theme": "nz-great-walks",
      "name": "开普勒步道 · 四日山脊与湖岸环线",
      "ids": [
        "natural-kepler-gates",
        "natural-brod-bay",
        "natural-luxmore",
        "natural-iris-burn",
        "natural-moturau",
        "natural-rainbow-reach"
      ],
      "days": 4,
      "months": [
        11,
        12,
        1,
        2,
        3,
        4
      ],
      "transport": "步行环线 + 起点交通",
      "reason": "从 Kepler Track car park 出发，经 Brod Bay 登 Luxmore，随后走山脊至 Iris Burn，再到 Moturau，沿湖岸经过 Rainbow Reach 后回到原起点。以三间山屋组织 4 天 / 3 夜，DOC 全环 60 km；图上末段闭环仅表示返回顺序，不是 GPS 轨迹。山屋与季节条件查官方。",
      "routeLabel": "环线徒步",
      "distanceText": "DOC 全环 60 km · 4 天 / 3 夜",
      "climate": "https://www.doc.govt.nz/keplertrack",
      "topology": "loop",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-fitzroy",
      "theme": "patagonia-nature",
      "name": "埃尔查尔滕 · 三湖一日往返",
      "ids": [
        "natural-fitzroy-start",
        "natural-capri",
        "natural-poincenot",
        "natural-los-tres"
      ],
      "days": 1,
      "months": [
        11,
        12,
        1,
        2,
        3
      ],
      "transport": "长距离山地徒步 · 原路返回",
      "reason": "从小镇北侧菲茨罗伊步道口进山，经卡普里湖支路、Poincenot 附近进入末段陡升，到三湖岸后原路返回。约二十公里级往返，湖岸绕行另计，需要一整天和适合的天气体力；不把三湖称为轻松短线，也不与托雷湖压进同一天。图中只画去程节点顺序。",
      "routeLabel": "往返徒步",
      "distanceText": "约 20 km 级往返 · 湖岸支路另计",
      "climate": "https://www.argentina.gob.ar/sites/default/files/2019/06/folleto_senderos_zona_norte_pnlg_ingles_2024.pdf",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-torre",
      "theme": "patagonia-nature",
      "name": "埃尔查尔滕 · 托雷湖河谷往返",
      "ids": [
        "natural-torre-start",
        "natural-torre-view",
        "natural-torre"
      ],
      "days": 1,
      "months": [
        11,
        12,
        1,
        2,
        3
      ],
      "transport": "山地徒步 · 原路返回",
      "reason": "从西侧托雷湖入口沿谷地经 Mirador Cerro Torre 到湖岸，原路回到同一入口。与三湖各用一天；不延伸到冰川攀登或跨谷捷径。按国家公园北区步道图和当日天气决定折返位置。图中只画去程节点顺序。",
      "routeLabel": "往返徒步",
      "distanceText": "独立河谷往返 · 去程节点示意",
      "climate": "https://www.argentina.gob.ar/sites/default/files/2019/06/folleto_senderos_zona_norte_pnlg_ingles_2024.pdf",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-moreno",
      "theme": "patagonia-nature",
      "name": "埃尔卡拉法特 · 冰川栈道一日公路",
      "ids": [
        "natural-calafate",
        "natural-moreno"
      ],
      "days": 1,
      "months": [
        10,
        11,
        12,
        1,
        2,
        3,
        4
      ],
      "transport": "公路接驳 / 自驾 + 公共观景栈道",
      "reason": "由埃尔卡拉法特沿 RP 11 前往冰川公共栈道区，按开放回路观景后原路返回城镇。属于一日公路观景安排；不含冰上徒步或游船，不与埃尔查尔滕长线徒步合成同日行程。",
      "routeLabel": "公路与栈道",
      "distanceText": "RP 11 往返 · 栈道回路另选",
      "climate": "https://www.argentina.gob.ar/sites/default/files/2019/06/mapa_pasarelas_-_el_calafate_2024.pdf",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-base-torres",
      "theme": "patagonia-nature",
      "name": "百内东侧 · 塔基观景点往返",
      "ids": [
        "natural-torres-start",
        "natural-chileno",
        "natural-torres-base"
      ],
      "days": 1,
      "months": [
        11,
        12,
        1,
        2,
        3
      ],
      "transport": "长距离山地徒步 · 原路返回",
      "reason": "从 Las Torres 游客接待区沿上阿森西奥谷经 Chileno，到 Base Torres 湖岸观景点后原路返回。它是一条独立的高强度日行线，不是完整 W 或 O 线；末段冰碛陡坡需充足时间。按 2026—2027 当季公告核对出发、折返和关闭要求，不预设营位。",
      "routeLabel": "往返徒步",
      "distanceText": "塔基独立日行往返 · 去程节点示意",
      "climate": "https://parquetorresdelpaine.cl/boletin-informativo-temporada-2026-2027/",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    },
    {
      "id": "natural-cuernos",
      "theme": "patagonia-nature",
      "name": "百内湖区 · 大瀑布至角峰观景台",
      "ids": [
        "natural-salto-grande",
        "natural-cuernos"
      ],
      "days": 1,
      "months": [
        10,
        11,
        12,
        1,
        2,
        3,
        4
      ],
      "transport": "湖区短徒步 · 原路返回",
      "reason": "从 Salto Grande 停车区步行看大瀑布，沿湖岸到 Mirador Cuernos，原路返回。无需渡轮，不连接 W 线营地；保留一天可与公路观景停留结合，按当季开放公告、强风与日照调整。图中为步道节点顺序。",
      "routeLabel": "往返短徒步",
      "distanceText": "大瀑布—角峰观景台 · 原路返回",
      "climate": "https://parquetorresdelpaine.cl/wp-content/uploads/2026/01/Mapa-Rutero-Ingles.pdf",
      "topology": "route",
      "verifiedOn": "2026-11-17"
    }
  ]
};
Object.assign(photoLibrary,naturalAtlasMedia);
Object.assign(countrySearchNames,{Argentina:'阿根廷',Chile:'智利','New Zealand':'新西兰'});
for(const [area,countries] of Object.entries({'美洲':['加拿大','阿根廷','智利'],'大洋洲':['新西兰']}))for(const country of countries)if(!itineraryAreas[area].includes(country))itineraryAreas[area].push(country);
for(const stop of naturalAtlasPack.points){
 const id='natural-'+stop.id,source=naturalAtlasPack.sources[stop.source];
 if(places.some(p=>p.id===id))throw Error('Duplicate natural place: '+id);
 places.push({id,name:stop.name,en:stop.en,lon:stop.lon,lat:stop.lat,country:stop.country,region:stop.region,type:stop.type,desc:stop.desc,themes:[stop.theme],icon:'◇',source:source.url,sourceLabel:source.title,coordinateNote:'公共游览区、步道或设施代表点；非 GPS 轨迹，照片机位可能不同。坐标参考：'+stop.geoSource,facts:{'所在分区':stop.region,'访问方式':stop.access}});
 if(stop.photo&&photoLibrary[stop.photo])editorialPlacePhotos[id]=stop.photo;
 placeEssays[id]={title:'在自然现场看什么',paragraphs:[{heading:'地形与观看',text:stop.reading},{heading:'怎样抵达',text:stop.access}],sources:[source,...(stop.geoSource?[{title:'代表点坐标 · '+(stop.geoSource.includes('openstreetmap')?'© OpenStreetMap contributors · ODbL':'地点地理资料'),url:stop.geoSource}]:[])],related:[]};
}
for(const definition of naturalAtlasPack.themes){
 const nodes=places.filter(p=>p.themes.includes(definition.id)),first=themes.find(t=>t.id==='nature'),view=culturalCollectionView(nodes);
 themes.push({id:definition.id,name:definition.name,title:definition.title,story:definition.story,introduction:definition.intro,scope:definition.scope,filters:[...new Set(nodes.map(p=>p.type))],fields:['所在分区','访问方式'],view,symbol:'circle',colors:{...first.colors}});
 themeMedia[definition.id]={photo:definition.photo,en:definition.en,edition:definition.name,motif:definition.story,symbol:'◇'};
 themeDesigns[definition.id]={...themeDesigns.nature,lens:definition.scope,note:definition.intro,line:'先选独立行程；连线仅表示节点顺序'};
 themeGlyphs[definition.id]=['mountain','leaf'];
 discoveryMeta[definition.id]=['nature',[definition.area],definition.keywords];
}
for(const plan of naturalAtlasPack.plans){
 if(planTemplates.some(p=>p.id===plan.id))throw Error('Duplicate natural route: '+plan.id);
 if(plan.ids.some(id=>!places.some(p=>p.id===id&&p.themes.includes(plan.theme))))throw Error('Invalid natural route: '+plan.id);
 planTemplates.push(plan);
 for(const id of plan.ids)placeEssays[id].related=[...new Set([...placeEssays[id].related,...plan.ids.filter(x=>x!==id)])].slice(0,4);
}
discoveryIndex=null;readingPlans=null;routeCoverAssignments=null;

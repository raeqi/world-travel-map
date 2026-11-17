'use strict';
// Editorial collections: representative coordinates, not GPX/navigation tracks.
const journeySources={
  "nakasendo": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
  "francigena": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
  "andes": "https://whc.unesco.org/en/list/1459/maps/",
  "buddhist": "https://whc.unesco.org/document/185683",
  "canal": "https://whc.unesco.org/en/list/1443/",
  "viking": "https://www.coe.int/en/web/cultural-routes/the-viking-routes",
  "impressionism": "https://www.coe.int/en/web/cultural-routes/impressionisms-routes",
  "mozart": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
  "route66": "https://www.nps.gov/orgs/1453/route-66-history.htm",
  "nc500": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500"
};
const journeyPlaces=[
  {
    "id": "nakasendo-tokyo",
    "name": "江户 · 日本桥",
    "lon": 139.774,
    "lat": 35.684,
    "country": "日本",
    "region": "东京都",
    "type": "古道起点",
    "desc": "日本桥是江户五街道的起点。这里以现代桥址作为中山道起点的代表，不复原出城的每一段旧街道。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "东京都",
      "地点性质": "古道起点",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-karuizawa",
    "name": "轻井泽宿",
    "lon": 138.635,
    "lat": 36.359,
    "country": "日本",
    "region": "长野县",
    "type": "宿场",
    "desc": "山地驿道上的宿场；现代度假小镇与历史中山道是不同层次的地方故事。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "长野县",
      "地点性质": "宿场",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-shimosuwa",
    "name": "下诹访宿",
    "lon": 138.085,
    "lat": 36.075,
    "country": "日本",
    "region": "长野县",
    "type": "宿场",
    "desc": "连接山间驿道与诹访地区的宿场节点；温泉聚落可以成为分段探索的基地。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "长野县",
      "地点性质": "宿场",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-narai",
    "name": "奈良井宿",
    "lon": 137.811,
    "lat": 35.968,
    "country": "日本",
    "region": "木曾谷",
    "type": "宿场",
    "desc": "木曾谷保存历史街巷的宿场之一，可从木构屋檐和临街商铺认识驿路生活。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "木曾谷",
      "地点性质": "宿场",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-fukushima",
    "name": "木曾福岛宿",
    "lon": 137.693,
    "lat": 35.846,
    "country": "日本",
    "region": "木曾谷",
    "type": "宿场",
    "desc": "木曾谷的宿场与交通节点，适合把铁路接驳和古街步行结合，而非宣称全程古步道连续保存。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "木曾谷",
      "地点性质": "宿场",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-suhara",
    "name": "须原宿",
    "lon": 137.691,
    "lat": 35.698,
    "country": "日本",
    "region": "木曾谷",
    "type": "宿场",
    "desc": "木曾谷南段的小型宿场；本图选取代表地点，省略相邻小站与现代道路绕行。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "木曾谷",
      "地点性质": "宿场",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-tsumago",
    "name": "妻笼宿",
    "lon": 137.596,
    "lat": 35.576,
    "country": "日本",
    "region": "木曾谷",
    "type": "宿场",
    "desc": "与马笼之间有广受欢迎的古道步行段。城镇保护与步道体验都值得留出时间。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "木曾谷",
      "地点性质": "宿场",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-magome",
    "name": "马笼宿",
    "lon": 137.568,
    "lat": 35.527,
    "country": "日本",
    "region": "岐阜县",
    "type": "宿场",
    "desc": "石板坡道上的宿场，与妻笼构成经典分段体验。实际步道、天气和接驳需查官方资料。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "岐阜县",
      "地点性质": "宿场",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nakasendo-kyoto",
    "name": "京都 · 三条大桥",
    "lon": 135.771,
    "lat": 35.009,
    "country": "日本",
    "region": "京都府",
    "type": "古道终点",
    "desc": "三条大桥作为京都一端的代表节点。东京至京都的宏观连线是历史走廊示意，不是可直接照走的完整轨迹。",
    "themes": [
      "nakasendo"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "京都府",
      "地点性质": "古道终点",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.japan.travel/en/japans-local-treasures/walk-historic-nakasendo-trail/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-canterbury",
    "name": "坎特伯雷",
    "lon": 1.083,
    "lat": 51.28,
    "country": "英国",
    "region": "肯特郡",
    "type": "朝圣城市",
    "desc": "北段线路的起点，坎特伯雷大教堂承接锡杰里克前往罗马的历史线索。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "肯特郡",
      "地点性质": "朝圣城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-dover",
    "name": "多佛",
    "lon": 1.313,
    "lat": 51.128,
    "country": "英国",
    "region": "肯特郡",
    "type": "海峡门户",
    "desc": "抵达英吉利海峡岸边；现代渡海交通必须单独预订，地图不表示可步行跨海。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "肯特郡",
      "地点性质": "海峡门户",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-calais",
    "name": "加来",
    "lon": 1.858,
    "lat": 50.951,
    "country": "法国",
    "region": "上法兰西",
    "type": "海峡门户",
    "desc": "法国岸的接续节点，历史通道在现代旅行中需借助渡轮或其他交通。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "上法兰西",
      "地点性质": "海峡门户",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-arras",
    "name": "阿拉斯",
    "lon": 2.777,
    "lat": 50.291,
    "country": "法国",
    "region": "上法兰西",
    "type": "历史城市",
    "desc": "法国北部的路线节点，向香槟地区继续前行；省略众多中间村落。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "上法兰西",
      "地点性质": "历史城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-reims",
    "name": "兰斯",
    "lon": 4.032,
    "lat": 49.258,
    "country": "法国",
    "region": "大东部",
    "type": "朝圣城市",
    "desc": "主教座堂城市与法国段的重要停留点，可把建筑参访和长距离行走分开安排。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "大东部",
      "地点性质": "朝圣城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-langres",
    "name": "朗格勒",
    "lon": 5.335,
    "lat": 47.863,
    "country": "法国",
    "region": "大东部",
    "type": "历史城市",
    "desc": "高地城镇节点，体现从法国平原逐渐走向汝拉山区的旅程。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "大东部",
      "地点性质": "历史城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-besancon",
    "name": "贝桑松",
    "lon": 6.024,
    "lat": 47.238,
    "country": "法国",
    "region": "勃艮第-弗朗什-孔泰",
    "type": "历史城市",
    "desc": "进入汝拉山区前后的重要城市节点，连线不是精确山地步道。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "勃艮第-弗朗什-孔泰",
      "地点性质": "历史城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-lausanne",
    "name": "洛桑",
    "lon": 6.632,
    "lat": 46.519,
    "country": "瑞士",
    "region": "沃州",
    "type": "湖畔城市",
    "desc": "日内瓦湖畔的朝圣通道节点，之后向阿尔卑斯山方向行进。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "沃州",
      "地点性质": "湖畔城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-martigny",
    "name": "马蒂尼",
    "lon": 7.073,
    "lat": 46.102,
    "country": "瑞士",
    "region": "瓦莱州",
    "type": "山地门户",
    "desc": "前往大圣伯纳山口的区域门户；高山路段的开放情况与低地不同。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "瓦莱州",
      "地点性质": "山地门户",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-bernard",
    "name": "大圣伯纳山口",
    "lon": 7.185,
    "lat": 45.869,
    "country": "瑞士 / 意大利",
    "region": "阿尔卑斯山",
    "type": "山口",
    "desc": "历史上的越山节点。山口积雪和季节关闭不可由地图判断，不应安排未经核实的冬季徒步穿越。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "阿尔卑斯山",
      "地点性质": "山口",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-aosta",
    "name": "奥斯塔",
    "lon": 7.321,
    "lat": 45.737,
    "country": "意大利",
    "region": "奥斯塔谷",
    "type": "历史城市",
    "desc": "越过山口后进入意大利的城市节点，可用当代交通衔接分段朝圣。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "奥斯塔谷",
      "地点性质": "历史城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-pavia",
    "name": "帕维亚",
    "lon": 9.159,
    "lat": 45.185,
    "country": "意大利",
    "region": "伦巴第",
    "type": "历史城市",
    "desc": "意大利北部历史城市；至托斯卡纳之间仍有许多未列出的正式阶段。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "伦巴第",
      "地点性质": "历史城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-lucca",
    "name": "卢卡",
    "lon": 10.503,
    "lat": 43.843,
    "country": "意大利",
    "region": "托斯卡纳",
    "type": "朝圣城市",
    "desc": "托斯卡纳段的重要城市，城市参访和徒步可以组合。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "托斯卡纳",
      "地点性质": "朝圣城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-siena",
    "name": "锡耶纳",
    "lon": 11.331,
    "lat": 43.318,
    "country": "意大利",
    "region": "托斯卡纳",
    "type": "朝圣城市",
    "desc": "中世纪城镇及朝圣服务传统的阅读节点；向南通往拉齐奥。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "托斯卡纳",
      "地点性质": "朝圣城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-viterbo",
    "name": "维泰博",
    "lon": 12.105,
    "lat": 42.418,
    "country": "意大利",
    "region": "拉齐奥",
    "type": "历史城市",
    "desc": "罗马以北的区域节点，适合作为意大利末段的分段基地。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "拉齐奥",
      "地点性质": "历史城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "francigena-rome",
    "name": "罗马",
    "lon": 12.453,
    "lat": 41.902,
    "country": "梵蒂冈",
    "region": "罗马都会区",
    "type": "朝圣终点",
    "desc": "北段以罗马为终点，代表位置位于圣彼得广场附近。官方南延至意大利南端的线路不包含在本精选中。",
    "themes": [
      "francigena"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "拉齐奥",
      "地点性质": "朝圣终点",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-via-francigena",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-rumichaca",
    "name": "Rumichaca · 鲁米查卡",
    "lon": -77.5833,
    "lat": 0.8,
    "country": "哥伦比亚",
    "region": "纳里尼奥",
    "type": "遗产路段",
    "desc": "UNESCO 安第斯道路网的哥伦比亚组成部分代表点；口岸与现代道路不等于遗产边界或自由通行的步道。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "纳里尼奥",
      "地点性质": "遗产路段",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-ingapirca",
    "name": "Ingapirca · 印加皮尔卡",
    "lon": -78.872,
    "lat": -2.544,
    "country": "厄瓜多尔",
    "region": "卡尼亚尔",
    "type": "遗址",
    "desc": "厄瓜多尔印加道路与遗址的文化阅读节点。使用遗址区域代表坐标，参观路线和开放须单独核实。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "卡尼亚尔",
      "地点性质": "遗址",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.patrimoniocultural.gob.ec/complejo-arqueologico-ingapirca/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-huanuco",
    "name": "Huánuco Pampa · 瓦努科潘帕",
    "lon": -76.815,
    "lat": -9.875,
    "country": "秘鲁",
    "region": "瓦努科",
    "type": "行政中心遗址",
    "desc": "安第斯道路体系中的大型行政中心遗址，从广场、储藏和道路联系认识帝国组织。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "瓦努科",
      "地点性质": "行政中心遗址",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-cusco",
    "name": "Cusco · 库斯科",
    "lon": -71.978,
    "lat": -13.517,
    "country": "秘鲁",
    "region": "库斯科",
    "type": "历史城市",
    "desc": "印加世界的重要中心，用作道路网文化背景与现代旅行基地；城市点本身不等同于 1459 号遗产路段。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "库斯科",
      "地点性质": "历史城市",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/273/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-desaguadero",
    "name": "Desaguadero–Titijoni 路段",
    "lon": -69.0167,
    "lat": -16.55,
    "country": "玻利维亚",
    "region": "拉巴斯",
    "type": "遗产路段",
    "desc": "UNESCO 所列玻利维亚段代表坐标，展示高原道路网的区域关系，不提供现场入口与通行承诺。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "拉巴斯",
      "地点性质": "遗产路段",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-tiwanacu",
    "name": "Tiwanacu 路段",
    "lon": -68.6667,
    "lat": -16.55,
    "country": "玻利维亚",
    "region": "拉巴斯",
    "type": "遗产路段",
    "desc": "安第斯道路网所列 Tiwanacu 路段，须与单独列入名录的蒂瓦纳库考古遗址区分。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "拉巴斯",
      "地点性质": "遗产路段",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-socoroma",
    "name": "Socoroma Sur · 索科罗马南段",
    "lon": -69.5833,
    "lat": -18.2833,
    "country": "智利",
    "region": "阿里卡和帕里纳科塔",
    "type": "遗产路段",
    "desc": "索科罗马至 Tantalcollo 段的 UNESCO 代表点，用于认识智利北部的安第斯道路遗存。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "阿里卡和帕里纳科塔",
      "地点性质": "遗产路段",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-zapahuira",
    "name": "Zapahuira · 萨帕维拉仓储段",
    "lon": -69.6167,
    "lat": -18.35,
    "country": "智利",
    "region": "阿里卡和帕里纳科塔",
    "type": "遗产路段",
    "desc": "Collcas de Zapahuira 所在路段，仓储设施让道路不仅是交通线，也成为组织物资的网络。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "阿里卡和帕里纳科塔",
      "地点性质": "遗产路段",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-tastil",
    "name": "Santa Rosa de Tastil · 塔斯蒂尔段",
    "lon": -65.95,
    "lat": -24.45,
    "country": "阿根廷",
    "region": "萨尔塔",
    "type": "遗产路段",
    "desc": "阿根廷北部的 UNESCO 组成路段，说明这张历史路网远超秘鲁境内的马丘比丘徒步线。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "萨尔塔",
      "地点性质": "遗产路段",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "andes-ranchillos",
    "name": "Ranchillos · 兰奇略斯段",
    "lon": -69.4667,
    "lat": -32.6,
    "country": "阿根廷",
    "region": "门多萨",
    "type": "遗产路段",
    "desc": "安第斯道路网在阿根廷的南部精选节点，不应与北部各点连接成一条可以连续徒步的现成线路。",
    "themes": [
      "andes"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "门多萨",
      "地点性质": "遗产路段",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1459/maps/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "buddhist-lumbini",
    "name": "蓝毗尼",
    "lon": 83.276,
    "lat": 27.469,
    "country": "尼泊尔",
    "region": "蓝毗尼省",
    "type": "诞生之地",
    "desc": "佛陀诞生地，阿育王柱与圣园使信仰记忆具有可见的历史载体。此点对应圣园区域。",
    "themes": [
      "buddhist"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "蓝毗尼省",
      "地点性质": "诞生之地",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/666/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "buddhist-bodhgaya",
    "name": "菩提伽耶",
    "lon": 84.991,
    "lat": 24.696,
    "country": "印度",
    "region": "比哈尔邦",
    "type": "成道之地",
    "desc": "摩诃菩提寺院群是理解佛陀成道传统的重要地点；安静参访与当地宗教活动应相互尊重。",
    "themes": [
      "buddhist"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "比哈尔邦",
      "地点性质": "成道之地",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1056/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "buddhist-sarnath",
    "name": "鹿野苑",
    "lon": 83.023,
    "lat": 25.381,
    "country": "印度",
    "region": "北方邦",
    "type": "初转法轮",
    "desc": "位于瓦拉纳西附近，佛陀初次说法的传统纪念地；遗迹、博物馆和当代寺院可分别阅读。",
    "themes": [
      "buddhist"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "北方邦",
      "地点性质": "初转法轮",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/927/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "buddhist-kushinagar",
    "name": "拘尸那迦",
    "lon": 83.888,
    "lat": 26.74,
    "country": "印度",
    "region": "北方邦",
    "type": "涅槃之地",
    "desc": "佛陀涅槃的传统纪念地。四地以生平主题联系，不代表一次按同样顺序完成的现代交通行程。",
    "themes": [
      "buddhist"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "北方邦",
      "地点性质": "涅槃之地",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/document/185683",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-beijing",
    "name": "北京 · 通惠河",
    "lon": 116.43,
    "lat": 39.9,
    "country": "中国",
    "region": "北京",
    "type": "都城水道",
    "desc": "京杭主线北端的都城水系线索，代表位置不等于单一游船码头；可结合漕运与都城供应阅读。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "北京",
      "地点性质": "都城水道",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-tongzhou",
    "name": "通州 · 运河起点区域",
    "lon": 116.66,
    "lat": 39.91,
    "country": "中国",
    "region": "北京",
    "type": "漕运枢纽",
    "desc": "北京东部的重要漕运区域，是从都城走向南北水路的阅读起点。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "北京",
      "地点性质": "漕运枢纽",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-tianjin",
    "name": "天津 · 三岔河口",
    "lon": 117.184,
    "lat": 39.162,
    "country": "中国",
    "region": "天津",
    "type": "水运交汇",
    "desc": "运河与城市发展的交汇区域，适合从水路关系理解天津，而非按连线安排连续航行。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "天津",
      "地点性质": "水运交汇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-linqing",
    "name": "临清",
    "lon": 115.71,
    "lat": 36.84,
    "country": "中国",
    "region": "山东",
    "type": "运河商埠",
    "desc": "山东运河商贸城市，关注漕运、商业和沿岸生活的相互联系。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "山东",
      "地点性质": "运河商埠",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-jining",
    "name": "济宁",
    "lon": 116.587,
    "lat": 35.415,
    "country": "中国",
    "region": "山东",
    "type": "运河城市",
    "desc": "京杭水路中段的重要城市，历史河道与今日水系需要分层阅读。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "山东",
      "地点性质": "运河城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-huaian",
    "name": "淮安 · 清江浦",
    "lon": 119.03,
    "lat": 33.6,
    "country": "中国",
    "region": "江苏",
    "type": "漕运枢纽",
    "desc": "淮河与运河关系复杂的区域，可从漕运管理和水工设施认识这条人工水系。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "江苏",
      "地点性质": "漕运枢纽",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-yangzhou",
    "name": "扬州",
    "lon": 119.42,
    "lat": 32.4,
    "country": "中国",
    "region": "江苏",
    "type": "运河商埠",
    "desc": "运河与长江交会区域的历史城市，盐业和城市生活构成丰富的文化线索。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "江苏",
      "地点性质": "运河商埠",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-zhenjiang",
    "name": "镇江",
    "lon": 119.45,
    "lat": 32.2,
    "country": "中国",
    "region": "江苏",
    "type": "江河交汇",
    "desc": "从长江进入江南运河的节点。过江交通需用当代方式安排，地图连线不是船班。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "江苏",
      "地点性质": "江河交汇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-suzhou",
    "name": "苏州",
    "lon": 120.62,
    "lat": 31.31,
    "country": "中国",
    "region": "江苏",
    "type": "江南水城",
    "desc": "江南运河与城市河网共同塑造聚落，适合把古城步行与水路历史结合。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "江苏",
      "地点性质": "江南水城",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-jiaxing",
    "name": "嘉兴",
    "lon": 120.75,
    "lat": 30.75,
    "country": "中国",
    "region": "浙江",
    "type": "江南水城",
    "desc": "江南运河沿线城市，展示水路对市镇生活的影响。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "浙江",
      "地点性质": "江南水城",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "canal-hangzhou",
    "name": "杭州 · 拱宸桥",
    "lon": 120.14,
    "lat": 30.32,
    "country": "中国",
    "region": "浙江",
    "type": "运河桥埠",
    "desc": "以拱宸桥区域代表京杭主线的南端文化体验。整个中国大运河还包含其他历史水系，不止本条精选。",
    "themes": [
      "canal"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "浙江",
      "地点性质": "运河桥埠",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://whc.unesco.org/en/list/1443/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-hedeby",
    "name": "海泽比 Hedeby",
    "lon": 9.565,
    "lat": 54.49,
    "country": "德国",
    "region": "石勒苏益格-荷尔斯泰因",
    "type": "贸易遗址",
    "desc": "位于今天德国的维京时代贸易中心遗址；不要因其历史丹麦关联而标成现代丹麦地点。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "石勒苏益格-荷尔斯泰因",
      "地点性质": "贸易遗址",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1553/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-ribe",
    "name": "里伯 Ribe",
    "lon": 8.763,
    "lat": 55.328,
    "country": "丹麦",
    "region": "南丹麦",
    "type": "贸易城镇",
    "desc": "从丹麦早期城镇和贸易遗存认识北海网络，是区域文化探访而非确证的一次维京航程。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "南丹麦",
      "地点性质": "贸易城镇",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-viking-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-roskilde",
    "name": "罗斯基勒 Roskilde",
    "lon": 12.08,
    "lat": 55.65,
    "country": "丹麦",
    "region": "西兰岛",
    "type": "船舶文化",
    "desc": "通过维京船舶与海事展示理解造船、航行和沿海生活；现代博物馆是解读历史的入口。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "西兰岛",
      "地点性质": "船舶文化",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-viking-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-birka",
    "name": "比尔卡 Birka",
    "lon": 17.546,
    "lat": 59.335,
    "country": "瑞典",
    "region": "梅拉伦湖",
    "type": "贸易遗址",
    "desc": "湖上岛屿的维京贸易遗址，提示海路与内陆水系如何相连。到岛交通具有季节性。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "梅拉伦湖",
      "地点性质": "贸易遗址",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/555/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-york",
    "name": "约克 · Jorvik",
    "lon": -1.08,
    "lat": 53.958,
    "country": "英国",
    "region": "英格兰",
    "type": "定居城市",
    "desc": "约克的维京时代名称 Jorvik 对应北欧定居与城市生活的历史，不能只用航海冒险来概括。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "英格兰",
      "地点性质": "定居城市",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-viking-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-dublin",
    "name": "都柏林",
    "lon": -6.26,
    "lat": 53.35,
    "country": "爱尔兰",
    "region": "都柏林",
    "type": "定居城市",
    "desc": "爱尔兰的维京城市历史节点，也承载贸易、冲突和地方社会互动。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "都柏林",
      "地点性质": "定居城市",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/the-viking-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-thingvellir",
    "name": "辛格韦德利 Thingvellir",
    "lon": -21.12,
    "lat": 64.255,
    "country": "冰岛",
    "region": "西南冰岛",
    "type": "议会遗址",
    "desc": "冰岛定居社会与议会传统的文化阅读点，展示北大西洋迁徙之后的共同体生活。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "西南冰岛",
      "地点性质": "议会遗址",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/1152/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "viking-lans",
    "name": "兰塞奥兹牧草地",
    "lon": -55.533,
    "lat": 51.596,
    "country": "加拿大",
    "region": "纽芬兰与拉布拉多",
    "type": "北欧遗址",
    "desc": "北美的北欧活动考古遗址，让地图展示北大西洋远航的地理尺度；不是可串成普通连续旅程的停靠港。",
    "themes": [
      "viking"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "纽芬兰与拉布拉多",
      "地点性质": "北欧遗址",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://whc.unesco.org/en/list/4/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "impressionism-paris",
    "name": "巴黎 · 奥赛博物馆",
    "lon": 2.3266,
    "lat": 48.86,
    "country": "法国",
    "region": "法兰西岛",
    "type": "作品收藏",
    "desc": "从收藏中的印象派绘画建立观看线索，再到画家生活和取景的地方。作品展出和借展状态须查博物馆。",
    "themes": [
      "impressionism"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "法兰西岛",
      "地点性质": "作品收藏",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.musee-orsay.fr/en",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "impressionism-chatou",
    "name": "沙图 Chatou",
    "lon": 2.158,
    "lat": 48.885,
    "country": "法国",
    "region": "法兰西岛",
    "type": "河畔画境",
    "desc": "塞纳河畔的休闲生活与雷诺阿等画家的创作相联系。这里是艺术地点网络，不是同一位画家的固定旅行顺序。",
    "themes": [
      "impressionism"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "法兰西岛",
      "地点性质": "河畔画境",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.seine-saintgermain.fr/les-belles-echappees/votre-plus-belle-seine/se-faire-une-toile/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "impressionism-giverny",
    "name": "吉维尼 Giverny",
    "lon": 1.534,
    "lat": 49.076,
    "country": "法国",
    "region": "诺曼底",
    "type": "画家故居",
    "desc": "莫奈的故居与花园让日常生活、园艺和绘画相连；花园开放具有季节性，不能全年保证可访。",
    "themes": [
      "impressionism"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "诺曼底",
      "地点性质": "画家故居",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://fondation-monet.com/en/",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "impressionism-rouen",
    "name": "鲁昂 Rouen",
    "lon": 1.094,
    "lat": 49.44,
    "country": "法国",
    "region": "诺曼底",
    "type": "画作取景",
    "desc": "主教座堂及其光线变化是莫奈系列绘画的题材之一，适合做同一地点、不同观看时刻的故事。",
    "themes": [
      "impressionism"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "诺曼底",
      "地点性质": "画作取景",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/impressionisms-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "impressionism-honfleur",
    "name": "翁弗勒尔 Honfleur",
    "lon": 0.233,
    "lat": 49.42,
    "country": "法国",
    "region": "诺曼底",
    "type": "海港画境",
    "desc": "诺曼底海港与布丹等艺术家的关联，为印象派的形成提供海岸艺术线索。",
    "themes": [
      "impressionism"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "诺曼底",
      "地点性质": "海港画境",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/impressionisms-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "impressionism-lehavre",
    "name": "勒阿弗尔 Le Havre",
    "lon": 0.108,
    "lat": 49.49,
    "country": "法国",
    "region": "诺曼底",
    "type": "海港画境",
    "desc": "莫奈《印象·日出》关联的港口城市；今天的港景并不等同于画中的历史视角。",
    "themes": [
      "impressionism"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "诺曼底",
      "地点性质": "海港画境",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/impressionisms-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "impressionism-etretat",
    "name": "埃特勒塔 Étretat",
    "lon": 0.204,
    "lat": 49.707,
    "country": "法国",
    "region": "诺曼底",
    "type": "海岸画境",
    "desc": "海蚀崖与自然光成为画家的题材。悬崖观景需遵守现场安全与开放范围，不按地图直接切线前往。",
    "themes": [
      "impressionism"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "诺曼底",
      "地点性质": "海岸画境",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/impressionisms-routes",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-salzburg",
    "name": "萨尔茨堡",
    "lon": 13.043,
    "lat": 47.8,
    "country": "奥地利",
    "region": "萨尔茨堡州",
    "type": "故乡",
    "desc": "莫扎特出生与成长的城市，可从故居、宫廷与音乐机构开启生平阅读。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "萨尔茨堡州",
      "地点性质": "故乡",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-munich",
    "name": "慕尼黑",
    "lon": 11.575,
    "lat": 48.137,
    "country": "德国",
    "region": "巴伐利亚",
    "type": "旅程城市",
    "desc": "早年巡演的重要目的地之一。这里只标城市代表点，不把一生多次往返合成一次出行。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "巴伐利亚",
      "地点性质": "旅程城市",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-vienna",
    "name": "维也纳",
    "lon": 16.373,
    "lat": 48.208,
    "country": "奥地利",
    "region": "维也纳",
    "type": "居住创作",
    "desc": "莫扎特成熟时期的重要生活与创作城市，可对照故居与音乐场所阅读；当代演出并非历史场景复原。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "维也纳",
      "地点性质": "居住创作",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-prague",
    "name": "布拉格",
    "lon": 14.42,
    "lat": 50.087,
    "country": "捷克",
    "region": "布拉格",
    "type": "音乐城市",
    "desc": "莫扎特多次到访的城市，与其作品演出史相关；维也纳至布拉格可作为独立旅程章节。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "布拉格",
      "地点性质": "音乐城市",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-paris",
    "name": "巴黎",
    "lon": 2.349,
    "lat": 48.854,
    "country": "法国",
    "region": "法兰西岛",
    "type": "巡演城市",
    "desc": "欧洲旅行与音乐交流的重要城市。莫扎特曾在不同时期到访，地图不将各次停留混成一条年表。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "法兰西岛",
      "地点性质": "巡演城市",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-london",
    "name": "伦敦",
    "lon": -0.128,
    "lat": 51.507,
    "country": "英国",
    "region": "英格兰",
    "type": "巡演城市",
    "desc": "童年欧洲巡演中的停留城市，可用书信与生平资料阅读，而非推定某条现代道路就是原路。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "英格兰",
      "地点性质": "巡演城市",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-milan",
    "name": "米兰",
    "lon": 9.19,
    "lat": 45.464,
    "country": "意大利",
    "region": "伦巴第",
    "type": "意大利旅程",
    "desc": "意大利旅程中的音乐城市，歌剧与跨地区学习是这一章节的线索。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "伦巴第",
      "地点性质": "意大利旅程",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "mozart-rome",
    "name": "罗马",
    "lon": 12.48,
    "lat": 41.895,
    "country": "意大利",
    "region": "拉齐奥",
    "type": "意大利旅程",
    "desc": "意大利旅行的重要节点；本主题以城市和作品背景为主，不声称所有选点都来自同一次巡演。",
    "themes": [
      "mozart"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "拉齐奥",
      "地点性质": "意大利旅程",
      "阅读提示": "主题地点网络，不代表一次连续历史旅程"
    },
    "source": "https://www.coe.int/en/web/cultural-routes/european-mozart-ways",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-chicago",
    "name": "芝加哥",
    "lon": -87.624,
    "lat": 41.879,
    "country": "美国",
    "region": "伊利诺伊州",
    "type": "东端城市",
    "desc": "66 号公路的芝加哥一端以市中心代表点呈现；历史起点街段有变化，不等同于地图坐标就是唯一原点。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "伊利诺伊州",
      "地点性质": "东端城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-springfield",
    "name": "斯普林菲尔德",
    "lon": -89.65,
    "lat": 39.8,
    "country": "美国",
    "region": "伊利诺伊州",
    "type": "公路城镇",
    "desc": "伊利诺伊段的城市停留点，可从路边餐厅与公路遗产认识汽车旅行文化。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "伊利诺伊州",
      "地点性质": "公路城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-stlouis",
    "name": "圣路易斯",
    "lon": -90.199,
    "lat": 38.627,
    "country": "美国",
    "region": "密苏里州",
    "type": "跨河城市",
    "desc": "穿越密西西比河的区域门户，历史桥梁与现代行车路线需区分。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "密苏里州",
      "地点性质": "跨河城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-joplin",
    "name": "乔普林",
    "lon": -94.514,
    "lat": 37.084,
    "country": "美国",
    "region": "密苏里州",
    "type": "公路城镇",
    "desc": "密苏里西南部的公路节点，之后可进入堪萨斯州短段。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "密苏里州",
      "地点性质": "公路城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-galena",
    "name": "加利纳 Galena",
    "lon": -94.639,
    "lat": 37.075,
    "country": "美国",
    "region": "堪萨斯州",
    "type": "公路城镇",
    "desc": "保留堪萨斯短段，让地图覆盖 66 号公路的八州走廊，而不是直接跳过。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "堪萨斯州",
      "地点性质": "公路城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-tulsa",
    "name": "塔尔萨",
    "lon": -95.992,
    "lat": 36.154,
    "country": "美国",
    "region": "俄克拉何马州",
    "type": "公路城市",
    "desc": "俄克拉何马州的重要停留城市，城市建筑和路边文化共同构成线路体验。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "俄克拉何马州",
      "地点性质": "公路城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-okc",
    "name": "俄克拉何马城",
    "lon": -97.516,
    "lat": 35.467,
    "country": "美国",
    "region": "俄克拉何马州",
    "type": "公路城市",
    "desc": "平原段的重要区域基地，分段自驾时应单独核实仍可行驶的历史路段。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "俄克拉何马州",
      "地点性质": "公路城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-amarillo",
    "name": "阿马里洛",
    "lon": -101.832,
    "lat": 35.222,
    "country": "美国",
    "region": "得克萨斯州",
    "type": "高原城市",
    "desc": "得州狭长地带的节点，荒野、公路广告和路边设施形成鲜明景观。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "得克萨斯州",
      "地点性质": "高原城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-albuquerque",
    "name": "阿尔伯克基",
    "lon": -106.65,
    "lat": 35.084,
    "country": "美国",
    "region": "新墨西哥州",
    "type": "公路城市",
    "desc": "本精选采用历史上较后期的东西向走廊，不同时串入经圣菲的早期改线。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "新墨西哥州",
      "地点性质": "公路城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-gallup",
    "name": "盖洛普",
    "lon": -108.743,
    "lat": 35.528,
    "country": "美国",
    "region": "新墨西哥州",
    "type": "公路城镇",
    "desc": "新墨西哥西部节点，阅读地方文化时应尊重原住民社区，不将其简化为路边装饰。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "新墨西哥州",
      "地点性质": "公路城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-flagstaff",
    "name": "弗拉格斯塔夫",
    "lon": -111.651,
    "lat": 35.198,
    "country": "美国",
    "region": "亚利桑那州",
    "type": "山地城市",
    "desc": "高海拔城镇与西南荒漠气候不同；冬季可能有雪，不能用荒漠印象判断道路。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "亚利桑那州",
      "地点性质": "山地城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-kingman",
    "name": "金曼",
    "lon": -114.053,
    "lat": 35.189,
    "country": "美国",
    "region": "亚利桑那州",
    "type": "公路城镇",
    "desc": "亚利桑那西段的公路遗产节点，可分支探访保留路段，不把全程简化为州际公路。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "亚利桑那州",
      "地点性质": "公路城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-barstow",
    "name": "巴斯托",
    "lon": -117.017,
    "lat": 34.895,
    "country": "美国",
    "region": "加利福尼亚州",
    "type": "荒漠节点",
    "desc": "莫哈韦荒漠边的转场城市，注意高温、补给和具体历史路段状况。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "加利福尼亚州",
      "地点性质": "荒漠节点",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-losangeles",
    "name": "洛杉矶",
    "lon": -118.243,
    "lat": 34.053,
    "country": "美国",
    "region": "加利福尼亚州",
    "type": "西端城市",
    "desc": "66 号公路抵达洛杉矶地区，历史终点和改线随时代变化。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "加利福尼亚州",
      "地点性质": "西端城市",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "route66-santamonica",
    "name": "圣莫尼卡",
    "lon": -118.491,
    "lat": 34.012,
    "country": "美国",
    "region": "加利福尼亚州",
    "type": "当代纪念终点",
    "desc": "以圣莫尼卡区域收束旅行。码头标志是当代象征，不声称码头是历年唯一法定终点。",
    "themes": [
      "route66"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "加利福尼亚州",
      "地点性质": "当代纪念终点",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.nps.gov/orgs/1453/route-66-history.htm",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-inverness",
    "name": "因弗内斯",
    "lon": -4.225,
    "lat": 57.477,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "环线门户",
    "desc": "NC500 的常用起终点，可顺时针或逆时针旅行。地图选择逆时针方向并显式回到起点。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "环线门户",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-applecross",
    "name": "阿普尔克罗斯",
    "lon": -5.81,
    "lat": 57.433,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "海岸村落",
    "desc": "西岸半岛停留点，Bealach na Bà 山路并非适合所有车辆或天气；可选择替代道路。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "海岸村落",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-torridon",
    "name": "托里登",
    "lon": -5.516,
    "lat": 57.546,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "山海景观",
    "desc": "山地与海湾相接的区域，宜留出步行或天气缓冲，而非只追求一日长距离驾驶。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "山海景观",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-gairloch",
    "name": "盖尔洛赫",
    "lon": -5.685,
    "lat": 57.726,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "海岸村落",
    "desc": "西岸海湾与聚落节点，可在周边分段探索，实际道路不沿地图直线。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "海岸村落",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-ullapool",
    "name": "阿勒浦",
    "lon": -5.16,
    "lat": 57.895,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "港口城镇",
    "desc": "西北海岸的港口基地，住宿与季节服务需预先确认。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "港口城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-lochinver",
    "name": "洛欣弗",
    "lon": -5.242,
    "lat": 58.15,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "海岸村落",
    "desc": "阿辛特地区的沿海停留点，周边狭窄道路应按车型和天气规划。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "海岸村落",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-durness",
    "name": "德内斯",
    "lon": -4.749,
    "lat": 58.57,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "北岸节点",
    "desc": "到达北部海岸的区域节点，海风、降雨和日照长度都会影响户外安排。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "北岸节点",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-tongue",
    "name": "滕格",
    "lon": -4.418,
    "lat": 58.477,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "北岸村落",
    "desc": "北海岸山海之间的小村，适合把长距离驾驶拆成有余量的日程。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "北岸村落",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-johnogroats",
    "name": "约翰奥格罗茨",
    "lon": -3.07,
    "lat": 58.637,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "东北海岸",
    "desc": "著名东北海岸地标，但不是英国大陆最北点；不要与 Dunnet Head 混淆。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "东北海岸",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-wick",
    "name": "威克",
    "lon": -3.094,
    "lat": 58.439,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "港口城镇",
    "desc": "东岸港口城市，为返回因弗内斯的南行段提供住宿与文化停留节点。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "港口城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  },
  {
    "id": "nc500-dornoch",
    "name": "多诺赫",
    "lon": -4.027,
    "lat": 57.881,
    "country": "英国",
    "region": "苏格兰高地",
    "type": "历史城镇",
    "desc": "东岸历史城镇节点，之后继续返回因弗内斯，形成完整旅行环线。",
    "themes": [
      "nc500"
    ],
    "icon": "◇",
    "facts": {
      "路线线索": "苏格兰高地",
      "地点性质": "历史城镇",
      "阅读提示": "精选站点顺序，非导航轨迹"
    },
    "source": "https://www.visitscotland.com/planning/travel-in-scotland/driving-road-trips/north-coast-500",
    "sourceLabel": "官方文化遗产与旅游资料",
    "coordinateNote": "地点或区域代表坐标，非精确入口；连线仅作文化阅读与旅行灵感，不是导航轨迹。"
  }
];
places.push(...journeyPlaces);

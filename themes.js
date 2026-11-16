'use strict';
// Theme configuration; points are normalized from official snapshots in catalog.js.
const themes=[
{id:'nature',name:'世界自然遗产',title:'走进大地的<br>自然奇迹',story:'从山地、湖泊到地热，探索自然遗产的不同面貌。',scope:'UNESCO 官方名录 · 含自然与文化双遗产',filters:['山地','湖泊','地热'],view:{lon:75,lat:25,zoom:1},symbol:'circle',colors:{accent:'#527747',ocean:'#d6e3d8',land:'#aabb8f',edge:'#7e966366',point:'#648b47',route:'#9b824d',wash:'#edf0e7'},legend:'自然遗产 · 圆形',fields:['名录类别','列入年份','遴选标准','所在区域']},
{id:'culture',name:'世界文化遗产',title:'循着文明的<br>时间足迹',story:'从木构庭园到大理石建筑，读懂地方背后的文化与历史。',scope:'UNESCO 官方名录 · 含自然与文化双遗产',filters:['建筑群','纪念建筑'],view:{lon:105,lat:26,zoom:1},symbol:'diamond',colors:{accent:'#a36c4d',ocean:'#e7dfd2',land:'#c8b393',edge:'#a1856866',point:'#ac6849',route:'#b17d52',wash:'#f2ede5'},legend:'文化遗产 · 菱形',fields:['名录类别','列入年份','遴选标准','所在区域']},
{id:'gorges',name:'三峡古镇',title:'一江山水，<br>几许旧时光',story:'沿着三峡地区的河流与聚落，寻找古镇的生活记忆。',scope:'三峡库区与支流 · 6 处可溯源历史聚落',filters:['迁建古镇','沿江古镇'],view:{lon:109.35,lat:31.1,zoom:20},symbol:'square',colors:{accent:'#427b80',ocean:'#d4e5e3',land:'#9ebdb2',edge:'#648d8566',point:'#427f89',route:'#5795a0',wash:'#e8efeb'},legend:'古镇 · 方形',fields:['探索线索','区域关联','地点性质']}
,{id:'parks',name:'美国国家公园',title:'荒野辽阔，<br>一路去发现',story:'从峡谷到雪山，从海岸到荒野，探索 63 个美国国家公园。',scope:'NPS 官方名录 · 63 个国家公园',filters:[],view:{lon:-108,lat:38,zoom:1.5},symbol:'triangle',colors:{accent:'#637d46',ocean:'#dae5dc',land:'#b9c69b',edge:'#82986b66',point:'#75873d',route:'#b28b4c',wash:'#eef0e2'},legend:'国家公园 · 三角形',fields:['所属州','管理类别','探索活动']}
,{id:'tea',name:'茶马古道',title:'循茶香，<br>重走马帮之路',story:'从川滇茶源到喜马拉雅，探索中国、尼泊尔与印度的历史贸易网络。',scope:'历史通道策展 · 20 个节点 · 含藏尼、藏印贸易网络',filters:[],view:{lon:94,lat:28,zoom:5},symbol:'diamond',colors:{accent:'#8b6942',ocean:'#ece3ce',land:'#c4b58c',edge:'#99835c66',point:'#795b37',route:'#9e673d',wash:'#f2ecdc'},legend:'茶马古道 · 历史通道示意',fields:['历史角色','所属支线','探索方式']}
,{id:'silk',name:'丝绸之路',title:'穿过绿洲，<br>遇见交汇的文明',story:'从长安到中亚，从绿洲到海港，沿贸易网络阅读文明的相遇。',scope:'历史城市策展 · 26 个节点 · 陆海贸易网络',filters:[],view:{lon:74,lat:35,zoom:1.8},symbol:'diamond',colors:{accent:'#a5683c',ocean:'#e5e7dc',land:'#d7c49e',edge:'#ad906d66',point:'#9a633b',route:'#b76d38',wash:'#f4ecd9'},fields:['历史角色','所属区域','阅读线索']}
,{id:'polo',name:'马可波罗游记',title:'翻开游记，<br>驶向东方的想象',story:'从威尼斯到刺桐港，按篇章探索城市、海路与书中见闻。',scope:'游记主题策展 · 23 个节点 · 区分记述与旁述',filters:[],view:{lon:77,lat:28,zoom:1.5},symbol:'star',colors:{accent:'#4b7283',ocean:'#d5e5e6',land:'#c8c6a7',edge:'#839d9866',point:'#577b8f',route:'#b08254',wash:'#edf1ea'},fields:['原书地名','篇章线索','记述性质']}

];
themes.push(...[{"id": "xu", "name": "徐霞客全国游踪", "title": "跟着游记，<br>走进山川深处", "story": "从浙皖闽赣到中原、关中、晋北与滇西，按旅次读游记。", "scope": "历史足迹精选 · 非完整生平路线 · 非连续徒步轨迹", "filters": [], "view": {"lon": 110, "lat": 33, "zoom": 2.6}, "symbol": "diamond", "colors": {"accent": "#687b58", "ocean": "#e1e9e4", "land": "#c5cdb3", "edge": "#687b5866", "point": "#687b58", "route": "#687b58", "wash": "#f0f1e8"}, "fields": ["路线线索", "地点性质", "阅读提示"], "introduction": "徐霞客的游历跨越多年。这里按 1613 浙东、1616 皖闽、1618 赣皖、1623 中原—关中—鄂西、1633 北游晋北、1639 滇西六个旅次精选呈现。全国游踪仍非穷尽，不把不同年份串成一次旅行。推荐天数是当代分段探访建议，连线仅表示站点顺序，不是考证后的精确古道。"}, {"id": "kumano", "name": "熊野古道", "title": "穿过杉林，<br>走向熊野本宫", "story": "沿中边路，从泷尻王子逐站认识山村与参诣道。", "scope": "中边路精选 · 站点示意 · 非步道导航", "filters": [], "view": {"lon": 135.62, "lat": 33.83, "zoom": 55}, "symbol": "diamond", "colors": {"accent": "#3d766b", "ocean": "#e1e9e4", "land": "#c5cdb3", "edge": "#3d766b66", "point": "#3d766b", "route": "#3d766b", "wash": "#f0f1e8"}, "fields": ["路线线索", "地点性质", "阅读提示"], "introduction": "熊野古道是一组参诣路线，而非一条路。本图选择中边路的泷尻王子至熊野本宫大社段，包含高原、近露、继樱王子与发心门王子。路线连线不沿真实步道；请使用官方地图核实每日距离、海拔、关闭路段和住宿。"}, {"id": "camino", "name": "圣地亚哥朝圣之路", "title": "循着贝壳，<br>走向圣地亚哥", "story": "从法国圣让跨越比利牛斯山，沿完整主线走向圣地亚哥。", "scope": "法国至西班牙完整主线 · 43 个站点 · 非步道导航", "filters": [], "view": {"lon": -4.2, "lat": 42.7, "zoom": 8}, "symbol": "diamond", "colors": {"accent": "#ad8250", "ocean": "#e1e9e4", "land": "#c5cdb3", "edge": "#ad825066", "point": "#ad8250", "route": "#ad8250", "wash": "#f0f1e8"}, "fields": ["路线线索", "地点性质", "阅读提示"], "introduction": "圣地亚哥朝圣之路有多条线路。这里展示从法国圣让皮耶德波尔到圣地亚哥的法国之路完整主线与 43 个城镇节点，也可从莱昂或萨里亚分段体验。不是所有支线或逐村清单。越境可选拿破仑高线或 Valcarlos 谷线；纳瓦拉官方提示 11 月 1 日至 3 月 31 日须走谷线，出发前仍须核对当日开放。Triacastela 后采用 San Xil 走向。连线仅示意站点顺序，不是实际步道或证书里程。"}]);
for(const theme of themes)theme.filters=[...new Set(places.filter(p=>p.themes.includes(theme.id)).map(p=>p.type))].sort();

const themeIntroductions={
nature:'这是一册关于地球的自然观察笔记。从山地冰川、森林生态到海洋岛屿，按景观类型认识世界自然遗产，也收录自然与文化双遗产。可以从一种自然环境出发，再按季节选择适合的旅行路线。',
culture:'把世界看作一座没有围墙的文明档案馆。古城、宗教建筑、工业遗迹与文化景观各有自己的阅读方式；先挑感兴趣的文明线索，再把邻近地点串成一次有节奏的探访。',
gorges:'沿长江与支流寻找三峡聚落的生活记忆。这张行旅图关注沿江古镇、迁建聚落与盐运往事，让水路成为理解地方的线索。地点之间可以组合探访，具体船班与陆路交通需另行安排。',
parks:'一本美国国家公园的野外旅行指南，收录 63 个国家公园。按区域认识峡谷、森林、海岸与高纬荒野，再结合月份和可用天数选择环线；把长途转场与园内停留都留在计划中。',
tea:'从川滇茶源出发，沿历史贸易网络认识藏地与南亚的驿站城市。地图包含中国、尼泊尔和印度的相关节点，用茶叶、山口与聚落串起交流故事。历史线路用于文化阅读，旅行建议以分段探访为主。',
silk:'丝绸之路是一组相互交织的交流网络。以绿洲、商贸城市与海港为节点，阅读沿途的建筑、信仰和日常生活；从一段区域行程开始，再逐步拼出横贯东西的文明地图。',
polo:'跟随《马可波罗游记》的章节翻开东方见闻。从威尼斯、波斯到中国城市，地图把书中地点与现代地名相对照，并区分游历、转述与存疑线索。推荐路线是当代旅行组合，适合带着文本逐站阅读。'
};for(const theme of themes)theme.introduction=theme.introduction||themeIntroductions[theme.id];


// Art direction is independent of travel data. Lines remain schematic, never navigation.
const themeDesigns={
 nature:{mode:'field',ocean:'#e5eff2',land:'#d3dfcf',edge:'#8fa692',accent:'#35634b',route:'#416f5c',dash:[3,5],width:1.7,lens:'按景观观察',note:'从山地、森林到水域，先看自然环境，再选择季节。',line:'地点组合 · 非实地轨迹'},
 culture:{mode:'archive',ocean:'#f3f0eb',land:'#e1d8ca',edge:'#b6a99a',accent:'#905441',route:'#905441',dash:[2,4],width:1.6,lens:'按文明阅读',note:'从名录类别、年代与遴选标准，阅读一处地方的价值。',line:'文化探访组合 · 非交通线路'},
 gorges:{mode:'river',ocean:'#daeaf1',land:'#e4e9e2',edge:'#a4babf',accent:'#27647e',route:'#27647e',dash:[],width:2.5,lens:'沿江看聚落',note:'区分原址与迁建聚落，从江流、支流和盐运理解地方。',line:'聚落连线 · 非航道或船班'},
 parks:{mode:'fieldguide',ocean:'#e8edf0',land:'#dce3d4',edge:'#94a28b',accent:'#405b39',route:'#b07a30',dash:[7,4],width:2.2,lens:'按区域进荒野',note:'把园内停留与公路转场分开考虑，结合月份挑选环线。',line:'公园串联 · 非步道轨迹'},
 tea:{mode:'caravan',ocean:'#f0ece4',land:'#dfd5c1',edge:'#b3a28a',accent:'#79593c',route:'#8e643e',dash:[5,4],width:2,lens:'从驿站读贸易',note:'区分茶源、山口与贸易城市，沿支线理解交流网络。',line:'历史通道示意 · 非复原古道'},
 silk:{mode:'network',ocean:'#e9eff1',land:'#eee0c4',edge:'#c1aa81',accent:'#9c602e',route:'#a56634',dash:[8,4,2,4],width:1.8,lens:'看陆海交汇',note:'从绿洲、商贸城市到海港，读一张网络，而非单一长路。',line:'历史网络示意 · 非复原商路'},
 polo:{mode:'voyage',ocean:'#dbe9ef',land:'#e2dfcf',edge:'#a0acac',accent:'#315f78',route:'#315f78',dash:[9,5],width:1.7,lens:'带着文本远行',note:'对照原书地名与现代城市，留意游历、转述与存疑线索。',line:'篇章地点连线 · 非确证全程'},
 xu:{mode:'journal',ocean:'#eeede8',land:'#deded4',edge:'#9caaa0',accent:'#675445',route:'#53675b',dash:[2,5],width:2,lens:'按旅次翻游记',note:'六个年份分段阅读，不把不同年代拼成一次连续旅行。',line:'旅次足迹示意 · 非古道复原'},
 kumano:{mode:'trail',ocean:'#e9eee9',land:'#cbd9cb',edge:'#93aa9a',accent:'#285646',route:'#bd6745',dash:[3,4],width:2.4,lens:'逐站认识参诣道',note:'由王子社、山村走向本宫；每日距离与高差须查官方步道图。',line:'中边路站点示意 · 非步道导航'},
 camino:{mode:'waymark',ocean:'#e6edf1',land:'#e9dfc9',edge:'#baac90',accent:'#284f73',route:'#bd8736',dash:[8,3],width:2.5,lens:'从法国走向终点',note:'完整主线与分段体验分开看，过山路段先核对季节开放。',line:'朝圣站点顺序 · 非步道导航'}
};
for(const theme of themes){const d=themeDesigns[theme.id];Object.assign(theme.colors,{accent:d.accent,ocean:d.ocean,land:d.land,edge:d.edge,route:d.route,wash:'#fff'});}

// Local trail uses geographic station positions without pretending the world coastline is a trail basemap.
themes.find(t=>t.id==='kumano').view.zoom=300;

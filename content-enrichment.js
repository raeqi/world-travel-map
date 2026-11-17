'use strict';
// Bounded corrections researched against the linked primary sources on 2026-11-17.
const contentCorrections=[
 ['andes-rumichaca','鲁米查卡的天然石桥横跨哥伦比亚与厄瓜多尔边界的卡尔奇河。这里既是山地通道，也是边境交往的地理节点；把天然石桥、旧海关建筑与现代过境桥分开看，才能读出同一处河谷不同时期的交通层次。','https://normograma.mincultura.gov.co/compilacion/docs/resolucion_mincultura_3317_2013.htm','天然石桥与边境交往',[
 ['先看哪一处','哥伦比亚文化部门将鲁米查卡—帕斯托线路列为国家文化遗产。鲁米查卡段的核心线索是河流侵蚀形成的天然石桥，而不是把现代公路桥当作全部古道。'],
 ['为什么值得停留','天然石桥和旧海关共同构成当地另一项保护对象。对读地貌与建筑，可以看到前西班牙时期、殖民时期及共和国时期通道持续被使用的关系；这比只把此地理解为一个过境口岸更完整。']]],
 ['andes-ingapirca','印加皮尔卡位于厄瓜多尔卡尼亚尔省，保存着卡尼亚里与印加文化的建筑遗存。遗址和场地博物馆适合一起阅读：前者看建筑与地形，后者通过考古器物认识当地社会以及它与安第斯道路网的关系。','https://www.patrimoniocultural.gob.ec/abrimos-a-la-ciudadania-el-museo-arqueologico-de-sitio-del-complejo-arqueologico-ingapirca/','在两种文化之间读遗址',[
 ['遗址之外还有什么','厄瓜多尔国家文化遗产研究所的场地博物馆介绍以卡尼亚里、印加及 Qhapaq Ñan 文化景观为线索，并包括服饰、饮食与声音遗产等主题。器物与生活内容帮助解释石构建筑背后的人。'],
 ['如何组织观看','可以先观察遗址中的建筑布局与高地环境，再把不易仅靠遗迹读懂的社会生活问题带到博物馆。这是观看次序的建议；当日展陈与参观安排以管理机构为准。']]],
 ['andes-huanuco','瓦努科潘帕是印加行政与仪式中心。中央广场中的 ushnu 平台、不同功能的建筑区与周边 colca 储藏设施，让道路网如何组织人员、物资和公共活动变得可见；它并不只是一段供人经过的道路。','https://qhapaqnan.cultura.pe/sites/default/files/articulos/179094598-Nuevos-Centros-de-Almacenamiento-Inca-en-Huanuco-Pampa.pdf','从广场走向储藏网络',[
 ['广场与仪式','秘鲁文化部门的研究将中央广场、ushnu 平台以及不同建筑分区分别讨论。看总平面与空间尺度，有助于理解这处行政中心如何把仪式和公共空间组织在一起。'],
 ['仓储为什么重要','研究还讨论了与中心相关的其他储藏地点。将仓储设施与干道联系起来看，能把“道路”理解为物资流通和供给体系，而非只寻找一条石铺小径。']]],
 ['andes-cusco','库斯科曾是印加的重要宗教与行政中心。16 世纪后，西班牙建筑沿用原有城市结构，在印加建筑遗存上形成教堂与宫殿。沿街观察石砌基础、街巷和上层建筑，能读出两种城市建造方式的叠合。','https://whc.unesco.org/en/list/273/','把道路放回城市中心',[
 ['看城市结构','UNESCO 对库斯科的介绍强调其宗教、行政及生产分区。城市在这张道路网中提供理解组织中心的背景，而不是一座孤立的纪念碑。'],
 ['观察建筑的上下关系','从石砌基部到后来的教堂与宫殿，可以比较不同时代如何使用同一处城市空间。库斯科城市遗产与 1459 号道路网分别列入名录，页面保留各自的来源。']]],
 ['andes-desaguadero','Desaguadero–Titijoni 是 UNESCO 安第斯道路网在玻利维亚列出的组成路段。阅读此处时，可把地名、路段图与同一国家的 Tiwanacu 路段并置，认识道路网是多个具体遗存单元的组合，而不是一条只有起终点的长线。','https://whc.unesco.org/en/list/1459/maps/','从组成路段读网络',[
 ['先对照路段图','官方地图目录将此段作为独立地理单元列示。这里的文化阅读依据是这一个单元，地图上的代表点不代替完整路段边界。'],
 ['与邻近单元对读','本主题也收录玻利维亚 Tiwanacu 路段，可在下方行程中查看两处节点的组合。具体道路构造、可见遗存与现场参访资料仍待进一步补充，不推测成一条现成徒步线路。']]],
 ['andes-tiwanacu','这里对应 UNESCO 道路网目录中的 Tiwanacu 路段；同名的蒂瓦纳库考古遗址另有独立遗产条目。区分道路路段与大型聚落遗址，有助于看清地图上的文化联系与不同保护对象。','https://whc.unesco.org/en/list/1459/maps/','先分清道路与考古遗址',[
 ['同名不等于同一对象','本点首先指向道路网的组成路段。若想研究蒂瓦纳库的建筑、广场和宗教中心，应同时查阅其独立遗产资料，而非把那里的所有遗迹归入印加道路。'],
 ['本轮资料边界','此处已明确名录对象及它在玻利维亚主题探访中的位置；路段的具体可见构筑物与现场解说仍待专门资料核对。']]],
 ['andes-socoroma','Socoroma Sur 的这一组成单元连接 Socoroma 与 Tantalcollo，位于智利北部的安第斯道路网络中。其价值在于把村落与高地通道放在同一地景里阅读，并与附近的 Zapahuira 储藏单元比较不同节点的作用。','https://whc.unesco.org/en/list/1459/maps/','村落、路段与储藏节点',[
 ['看清目录中的连接','UNESCO 将 Socoroma–Tantalcollo 和其他相邻路段分别列出。本图保留该段的明确名称，避免把“索科罗马”当成整条智利线路的代称。'],
 ['把问题带到下一站','与 Zapahuira 对看时，可以分别追问：哪些遗存体现移动，哪些体现物资停留与储存？这是比较不同道路节点的阅读线索，不预设所有构筑物都同样保存。']]],
 ['andes-zapahuira','Zapahuira 的 colcas 储藏设施是道路网中物资停留的节点。与只强调通行的路段相比，储藏建筑提醒人们：高地道路还连接供给与管理活动；相关官方资料同时记录当地 tambo 驿站。','https://www.monumentos.gob.cl/sites/default/files/2025-04/Tambo%20de%20Zapahuira.pdf','道路旁为什么会有仓储',[
 ['从功能认识节点','Colca 指储藏设施，tambo 则是另一种道路节点。先区分这些建筑的用途，再读官方场地说明，能避免把所有石砌遗存统称为“驿站”。'],
 ['与道路一起观察','本点按 UNESCO 的 Collcas de Zapahuira 单元定位；现场阅读可关注储藏建筑与周边道路的空间关系。具体保护边界以官方图件为依据。']]],
 ['andes-tastil','塔斯蒂尔考古聚落位于阿根廷萨尔塔省的山丘上。阿根廷国家文化部门记录了20世纪的系统考古工作；在道路主题中，这里适合观察聚落如何占据高地位置，再与道路网的组成路段作对照。','https://www.argentina.gob.ar/capital-humano/cultura/monumentos/sitio-arqueologico-tastil','道路之外，还有聚落',[
 ['为什么看聚落','国家文化部门的遗址条目把地形位置与考古研究放在一起介绍。看建筑群相对山丘、河谷的位置，比仅记住地图上的一个坐标更有帮助。'],
 ['保留两种尺度','本主题收录的是 Santa Rosa de Tastil 相关路段；聚落考古资料提供背景。道路遗存、聚落边界和今日参观路线需要分别核对。']]],
 ['andes-ranchillos','Ranchillos 位于阿根廷门多萨地区。当地政府的遗产项目将其称为印加 tambo 驿站；把这类停驻建筑与北部的道路、行政中心和仓储节点对看，可以认识安第斯道路网沿线功能的差异。','https://www.mendoza.gov.ar/prensa/gobierno-infraestructura-desarrollo-territorial/infraestructura-y-desarrollo-territorial/page/60/','用驿站读南段道路',[
 ['道路上的停驻设施','门多萨政府的相关项目围绕 Ranchillos 印加 tambo 的保护与展示展开。这里提供的是道路沿线设施的阅读入口，不是把整个地区视为同一座城市遗址。'],
 ['比较不同节点','可以把 Ranchillos 的驿站线索与瓦努科潘帕的行政中心、Zapahuira 的储藏设施并读：移动、停驻与供给共同构成网络。项目公告不被用作当前开放状态的保证。']]]
];
for(const [id,desc,source,title,paragraphs] of contentCorrections){const p=places.find(p=>p.id===id);p.additionalSources=[{title:p.sourceLabel||'原始遗产资料',url:p.source}];p.desc=desc;p.source=source;p.sourceLabel='地点文化遗产资料';addEssay(id,title,paragraphs);}
const missingDescriptions={
 'np-yell':'黄石于1872年成为国家公园，以地热景观及广阔的山地生态著称。阅读这片地方，可把间歇泉、热泉与山谷景观分开安排；本图的 Electric Peak 照片展示的是公园山景，不能当作所有地热区的现场图。',
 'wh-1809':'塞巴斯蒂亚位于约旦河西岸纳布卢斯附近，是叠合多个历史时期的考古遗址。其遗存体现至少自公元前9世纪以来的持续占用；UNESCO 资料中的罗马剧场、柱廊街与建筑群，为比较不同时期的城市空间提供具体线索。'
};
for(const [id,desc] of Object.entries(missingDescriptions))places.find(p=>p.id===id).desc=desc;

placeEssays['andes-rumichaca'].sources.push({title:'哥伦比亚文化部：天然石桥与旧海关保护对象',url:'https://normograma.mincultura.gov.co/compilacion/docs/resolucion_mincultura_1593_2006.htm'});
const contentPending=['andes-desaguadero','andes-tiwanacu'];
for(const [id,desc,source] of [
 ['np-kica','国王峡谷国家公园包含 Grant Grove 与 Cedar Grove 两种不同的景观体验：前者以巨杉林和格兰特将军树为线索，后者展示冰川塑造的谷地、峭壁与国王河。安排停留时可先区分林地与峡谷两个区域。','https://www.nps.gov/seki/planyourvisit/basicinfo.htm'],
 ['np-seki','红杉国家公园以保护巨杉而设立。Giant Forest 区的巨杉群、谢尔曼将军树，以及周边草甸与花岗岩地貌，是理解这座公园的主要入口；它与相邻的国王峡谷共同管理，但并非同一座公园。','https://www.nps.gov/seki/planyourvisit/sequoia-national-park.htm']
]){const p=places.find(p=>p.id===id);p.additionalSources=[{title:p.sourceLabel||'原始管理机构资料',url:p.source}];p.desc=desc;p.source=source;p.sourceLabel='美国国家公园管理局分区介绍'}

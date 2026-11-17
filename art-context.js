'use strict';
// Curated expansion. Subject coordinates and present collections are separate records.
const artSources={life:'https://archive.artic.edu/van-gogh-bedrooms/timeline',last:'https://www.vangoghmuseum.nl/en/art-and-stories/stories/the-last-days-of-vincent-van-gogh'};
function addArtPlace(id,name,lon,lat,region,type,desc,source,country='法国',theme='impressionism'){
 places.push({id,name,lon,lat,country,region,type,desc,themes:[theme],icon:'◇',facts:{'路线线索':region,'地点性质':type,'阅读提示':'作品描绘地与馆藏地分别定位；文化关系不代表连续旅行。'},source,sourceLabel:'博物馆作品与生平资料',coordinateNote:'城镇、街区或建筑的代表坐标，并非具体作画窗口、历史道路或导航入口。'});
}
addArtPlace('impressionism-villeneuve','维尔纳夫拉加雷讷',2.328,48.938,'法兰西岛','画作取景','西斯莱以塞纳河上的桥为题材，将现代工程与河畔生活放进同一幅风景。所选 1872 年作品现藏纽约大都会。','https://www.metmuseum.org/art/collection/search/437680');
addArtPlace('impressionism-pontoise','蓬图瓦兹 Pontoise',2.096,49.050,'法兰西岛','画作取景','毕沙罗《雅莱山》描绘蓬图瓦兹附近的乡野地景；这里与巴黎大道构成城市和田野的对照。','https://www.metmuseum.org/art/collection/search/437299');
addArtPlace('impressionism-argenteuil','阿让特伊 Argenteuil',2.247,48.947,'法兰西岛','画家交往','马奈以莫奈一家在花园中的日常为题，把艺术家的交往带入户外光线。所选画作并不收藏在这个花园。','https://www.metmuseum.org/art/collection/search/436965');
addArtPlace('impressionism-london','伦敦 · 威斯敏斯特河岸',-0.120,51.500,'英格兰','画作取景','莫奈以泰晤士河对岸的国会大厦研究光、雾与建筑轮廓。所选作品著录为 1903 年，不把这一年当作现场写生日期。','https://www.nga.gov/artworks/46523-houses-parliament-sunset','英国');
for(const [id,name,lon,lat,region,desc] of [
 ['vangogh-paris','巴黎 · 蒙马特生涯',2.335,48.886,'法兰西岛','1886 年梵高迁居巴黎，与弟弟提奥共同生活。这里是他法国创作阶段的开端之一，并非本主题三幅风景画的描绘地点。'],
 ['vangogh-arles','阿尔勒 Arles',4.632,43.683,'普罗旺斯','1888 年梵高来到阿尔勒，在南方的光线中探索色彩与画室生活。生涯阅读以城市为尺度，不把现今街景当作黄房子的完整复原。'],
 ['vangogh-saintremy','圣雷米 · 圣保罗德莫索尔',4.835,43.776,'普罗旺斯','1889 年梵高在圣雷米居住期间持续创作，丝柏、麦田与群山成为重要题材。画中风景并不精确等同于地图标记处的视线。'],
 ['vangogh-auvers','瓦兹河畔欧韦 Auvers-sur-Oise',2.173,49.071,'法兰西岛','1890 年梵高来到欧韦，短暂而密集地描绘村庄与田野。《欧韦的绿麦田》是本主题观看这一阶段的入口。']
])addArtPlace(id,name,lon,lat,region,'生涯地点',desc,id==='vangogh-auvers'?artSources.last:artSources.life,'法国','vangogh');
for(const id of ['impressionism-met','impressionism-nga'])places.find(p=>p.id===id).themes.push('vangogh');
const expandedImpressionistWorks=[
 {key:'pissarro-pontoise',title:'蓬图瓦兹的雅莱山',original:'Jalais Hill, Pontoise',artist:'卡米耶·毕沙罗',year:'1867',placeId:'impressionism-pontoise',subject:'蓬图瓦兹附近的雅莱山',context:'乡野、道路与人物同处一个地景。将它与毕沙罗三十年后的巴黎大道对看，可以比较画家观看乡村与城市的方式。',museumId:'impressionism-met',collection:'大都会艺术博物馆，纽约',record:'https://www.metmuseum.org/art/collection/search/437299'},
 {key:'sisley-villeneuve',title:'维尔纳夫拉加雷讷的桥',original:'The Bridge at Villeneuve-la-Garenne',artist:'阿尔弗雷德·西斯莱',year:'1872',placeId:'impressionism-villeneuve',subject:'维尔纳夫拉加雷讷，塞纳河桥',context:'桥梁结构、河流和休闲人物共同构成现代郊区风景。以城镇代表点定位，不冒充精确作画机位。',museumId:'impressionism-met',collection:'大都会艺术博物馆，纽约',record:'https://www.metmuseum.org/art/collection/search/437680'},
 {key:'manet-argenteuil',title:'阿让特伊花园中的莫奈一家',original:'The Monet Family in Their Garden at Argenteuil',artist:'爱德华·马奈',year:'1874',placeId:'impressionism-argenteuil',subject:'阿让特伊，莫奈家的花园',context:'这是马奈笔下的莫奈一家，不是莫奈自画。作品为画家交往与日常生活提供线索；地点按阿让特伊区域定位。',museumId:'impressionism-met',collection:'大都会艺术博物馆，纽约',record:'https://www.metmuseum.org/art/collection/search/436965'},
 {key:'monet-london',title:'国会大厦，日落',original:'The Houses of Parliament, Sunset',artist:'克洛德·莫奈',year:'1903',placeId:'impressionism-london',subject:'伦敦，泰晤士河畔的国会大厦',context:'画家在 1899–1901 年数次伦敦访问期间研究这一系列，之后继续整理与完成。1903 为这幅作品的著录年代，并不表示当年在河岸现场画成。',museumId:'impressionism-nga',collection:'美国国家美术馆，华盛顿',record:'https://www.nga.gov/artworks/46523-houses-parliament-sunset'}
];
impressionistWorks.push(...expandedImpressionistWorks);
const vanGoghWorks=[
 {key:'vangogh-cypresses',theme:'vangogh',title:'丝柏',original:'Cypresses',artist:'文森特·梵高',year:'1889',placeId:'vangogh-saintremy',subject:'圣雷米一带的普罗旺斯地景',context:'竖立的丝柏与旋转的天空形成不同的笔触节奏。作品关联圣雷米创作阶段，地图标记圣保罗德莫索尔区域，不提供确定的现场机位。',museumId:'impressionism-met',collection:'大都会艺术博物馆，纽约',record:'https://www.metmuseum.org/art/collection/search/437980'},
 {key:'vangogh-wheat',theme:'vangogh',title:'丝柏麦田',original:'Wheat Field with Cypresses',artist:'文森特·梵高',year:'1889',placeId:'vangogh-saintremy',subject:'圣雷米附近的麦田、丝柏与群山',context:'麦浪、树形与云层把同一片地方组织成多层节奏。本图采用 Met 的 1889 年版本；不要与其他机构的同题版本混淆。',museumId:'impressionism-met',collection:'大都会艺术博物馆，纽约',record:'https://www.metmuseum.org/art/collection/search/436535'},
 {key:'vangogh-auvers',theme:'vangogh',title:'欧韦的绿麦田',original:'Green Wheat Fields, Auvers',artist:'文森特·梵高',year:'1890',placeId:'vangogh-auvers',subject:'瓦兹河畔欧韦的田野',context:'绿色田野和路面在短促、弯曲的笔触中起伏。作品属于欧韦阶段；现藏华盛顿，不把美国馆藏城市标成画中地景。',museumId:'impressionism-nga',collection:'美国国家美术馆，华盛顿',record:'https://www.nga.gov/artworks/163323-green-wheat-fields-auvers'}
];
const artWorks=[...impressionistWorks,...vanGoghWorks];
const vgColors={accent:'#315e87',ocean:'#e2ebf1',land:'#e4dfc6',edge:'#a6b2ba',point:'#315e87',route:'#a27a32',wash:'#f1f3f5'};
themes.push({id:'vangogh',name:'梵高在法国',title:'在麦田与城镇间，<br>读梵高的法国岁月',story:'从巴黎到普罗旺斯，再到欧韦，把生涯、风景和作品分别读清。',introduction:'四座法国城镇，三个真实作品入口。生涯地点跨越不同年份，区域探访是当代建议，不复原一次连续旅程。',scope:'生涯地点网络 · 非历史旅行轨迹',filters:['生涯地点','作品收藏'],view:{lon:3.2,lat:46.8,zoom:5.8},symbol:'diamond',colors:vgColors,fields:['路线线索','地点性质','阅读提示']});
themeDesigns.vangogh={mode:'atelier',...vgColors,dash:[3,5],width:2,lens:'先看风景，再看笔触',note:'区分生涯地点、画中地景与现藏机构；四座城不是一条连续徒步路线。',line:'艺术生涯地点网络 · 非导航'};
themeGlyphs.vangogh=['leaf','house'];
themeMedia.vangogh={photo:'vangogh-wheat',en:'Van Gogh in France',edition:'麦田与城镇',motif:'生涯 / 风景 / 笔触',symbol:'✳'};
editionStories.vangogh={photo:'vangogh-wheat',second:'vangogh-cypresses',tag:'新策展 · 梵高在法国',headline:'把城镇与麦田，\n读进一生',caption:'梵高《丝柏麦田》，1889 年，纽约大都会藏。',body:'从巴黎的生活到阿尔勒、圣雷米与欧韦，沿不同年份的生涯地点理解风景与绘画。现藏机构另行定位，不将画家的生涯拼成一次步行。',detail:'三幅经官方开放许可核验的画作 / 四座法国城镇。'};
editionStories.impressionism.body='八幅作品、四位画家，从法国乡野到伦敦河岸。描绘地与馆藏地分别定位，让相互关联的艺术地点保持各自的历史。';
editionStories.impressionism.detail='八幅作品 / 四位画家 / 描绘地与馆藏地分别定位。';
planTemplates.push(
 {id:'impressionism-suburbs',theme:'impressionism',name:'塞纳河郊区 · 田野、桥与花园',ids:['impressionism-pontoise','impressionism-villeneuve','impressionism-argenteuil'],days:4,months:[4,5,6,9,10],transport:'城郊铁路与市内交通 · 分区探访',reason:'通过毕沙罗、西斯莱与马奈的三幅作品比较乡野、工程与家庭花园。三个地点不代表三位画家共同的旅行顺序；四天是当代分区探访建议，现场位置、交通和开放情况需另核实。',topology:'network',climate:'https://www.metmuseum.org/art/collection/search/437680'},
 {id:'vangogh-provence',theme:'vangogh',name:'普罗旺斯 · 阿尔勒与圣雷米',ids:['vangogh-arles','vangogh-saintremy'],days:3,months:[4,5,6,9,10],transport:'城际接驳 + 城镇步行',reason:'以阿尔勒的城市生活与圣雷米的创作地景对读梵高不同阶段。此为现代三日区域探访建议，连线仅连接城镇代表点，不是梵高实际道路或连续徒步轨迹；开放、接驳与预约另查。',topology:'route',climate:artSources.life},
 {id:'vangogh-paris-auvers',theme:'vangogh',name:'巴黎与欧韦 · 两段不同年份的生活',ids:['vangogh-paris','vangogh-auvers'],days:3,months:[4,5,6,9,10],transport:'城郊铁路 + 市内步行',reason:'从 1886–1888 年的巴黎生活，读到 1890 年欧韦阶段。今天可安排三个参考日分区探访，但这两个地点不等于一次完整历史旅程；地图连接城镇代表坐标，不提供现场机位与实时交通。',topology:'route',climate:artSources.last}
);

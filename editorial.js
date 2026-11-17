'use strict';
// Verified local assets; full provider evidence in assets/editorial/sources.json.
const editorialMedia={
 "nakasendo-print": {
  "path": "assets/editorial/nakasendo-print.webp",
  "title": "妻笼宿 / 木曾街道六十九次",
  "author": "Utagawa Hiroshige",
  "source": "https://commons.wikimedia.org/wiki/File:Kisokaido42_Tsumago.jpg",
  "license": "Public domain",
  "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Public_domain",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "nakasendo-photo": {
  "path": "assets/editorial/nakasendo-photo.webp",
  "title": "妻笼宿今日街景",
  "author": "おにく",
  "source": "https://commons.wikimedia.org/wiki/File:Tsumago-juku.jpg",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "viking-stone": {
  "path": "assets/editorial/viking-stone.webp",
  "title": "海泽比博物馆符文石（投影突出铭文）",
  "author": "Szilas",
  "source": "https://commons.wikimedia.org/wiki/File:Hedeby_Museum%2C_rune_stone.jpg",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "buddhist-temple": {
  "path": "assets/editorial/buddhist-temple.webp",
  "title": "菩提伽耶 / 摩诃菩提寺",
  "author": "Ineb-2553",
  "source": "https://commons.wikimedia.org/wiki/File:Mahabodhi_temple.jpg",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "nc500-pass": {
  "path": "assets/editorial/nc500-pass.webp",
  "title": "Bealach na Bà / 向卡伦湖眺望",
  "author": "Jooniur",
  "source": "https://commons.wikimedia.org/wiki/File:Bealach_na_ba.jpg",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "francigena-valley": {
  "path": "assets/editorial/francigena-valley.webp",
  "title": "奥尔恰谷 / San Quirico 至 Radicofani 之间",
  "author": "JP Vets",
  "source": "https://commons.wikimedia.org/wiki/File:Via_Francigena_in_Val_d%27Orcia.jpg",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "canal-bridge": {
  "path": "assets/editorial/canal-bridge.webp",
  "title": "杭州 / 拱宸桥",
  "author": "Zhangzhugang",
  "source": "https://commons.wikimedia.org/wiki/File:Hangzhou_Gongchen_Qiao_2015.08.01_07-28-03.jpg",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "mozart-score": {
  "path": "assets/editorial/mozart-score.webp",
  "title": "莫扎特 / 教堂奏鸣曲 K.329 亲笔谱首页，1779",
  "author": "Wolfgang Amadeus Mozart",
  "source": "https://commons.wikimedia.org/wiki/File:Mozart_-_Church_sonata_K._329_-_autograph%2C_Staatsbibliothek_zu_Berlin%2C_f._1r.png",
  "license": "Public domain",
  "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Public_domain",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "andes-document": {
  "path": "assets/editorial/andes-document.webp",
  "title": "Guaman Poma de Ayala / 王家道路管理者，约 1615–1616",
  "author": "Felipe Guaman Poma de Ayala",
  "source": "https://commons.wikimedia.org/wiki/File:Qhapaq_%C3%91an_Poma_de_Ayala.jpg",
  "license": "Public domain",
  "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Public_domain",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "route66-road": {
  "path": "assets/editorial/route66-road.webp",
  "title": "新墨西哥州 Cuervo / 历史 66 号公路",
  "author": "Ammodramus",
  "source": "https://commons.wikimedia.org/wiki/File:Route_66_in_Cuervo%2C_NM_from_W_1.JPG",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "route66-sign": {
  "path": "assets/editorial/route66-sign.webp",
  "title": "俄克拉何马 / 历史 66 号公路标志",
  "author": "William Jones",
  "source": "https://commons.wikimedia.org/wiki/File:HISTORIC_OKLAHOMA_ROUTE_66.png",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "monet-sunrise": {
  "path": "assets/editorial/monet-sunrise.webp",
  "title": "克洛德·莫奈 / 印象·日出，1872",
  "author": "Claude Monet",
  "source": "https://commons.wikimedia.org/wiki/File:Monet_-_Impression%2C_Sunrise.jpg",
  "license": "Public domain",
  "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Public_domain",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "monet-rouen": {
  "path": "assets/editorial/monet-rouen.webp",
  "title": "克洛德·莫奈 / 鲁昂主教座堂，西立面，1894",
  "author": "Claude Monet / National Gallery of Art, Washington",
  "source": "https://www.nga.gov/artworks/46524-rouen-cathedral-west-facade",
  "license": "Public domain",
  "licenseUrl": "https://www.nga.gov/terms-and-notices",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "monet-bridge": {
  "path": "assets/editorial/monet-bridge.webp",
  "title": "克洛德·莫奈 / 日本桥，1899",
  "author": "Claude Monet / National Gallery of Art, Washington",
  "source": "https://www.nga.gov/artworks/74796-japanese-footbridge",
  "license": "Public domain",
  "licenseUrl": "https://www.nga.gov/terms-and-notices",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "pissarro-paris": {
  "path": "assets/editorial/pissarro-paris.webp",
  "title": "卡米耶·毕沙罗 / 冬日早晨的蒙马特大道，1897",
  "author": "Camille Pissarro / The Metropolitan Museum of Art",
  "source": "https://www.metmuseum.org/art/collection/search/437310",
  "license": "CC0",
  "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 },
 "andes-trail": {
  "path": "assets/editorial/andes-trail.webp",
  "title": "秘鲁 / 印加步道山景",
  "author": "Cédric Servay cservay",
  "source": "https://commons.wikimedia.org/wiki/File:Inca%20Trail%20mountain%20%28Unsplash%29.jpg",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "changes": "EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence."
 }
};
Object.assign(photoLibrary,editorialMedia);
const editionStories={
 nakasendo:{photo:'nakasendo-print',second:'nakasendo-photo',tag:'浮世绘与驿站',headline:'画里的宿场，\n仍在山间',caption:'歌川广重《妻笼》与今日妻笼宿对读。',body:'木曾街道六十九次中的山路、行旅与驿站，在保存街区的木构屋檐下找到回声。版画是历史图像；今日实景并不复原画中每一处视角。',detail:'木曾街道六十九次 / 歌川广重，19 世纪；妻笼宿实景 / おにく。'},
 francigena:{photo:'francigena-valley',tag:'步行者的视角',headline:'一路走向罗马',caption:'奥尔恰谷，San Quirico 至 Radicofani 之间。',body:'石路、步行者与缓慢起伏的田野，是 Via Francigena 在托斯卡纳的一小段真实尺度。整张地图则从坎特伯雷展开，跨越山口与城市。',detail:'JP Vets，2019 / 奥尔恰谷实景。'},
 andes:{photo:'andes-trail',second:'andes-document',tag:'山路与历史文献',headline:'山脊之间，\n一张文明的网',caption:'秘鲁印加步道山景与 Guaman Poma 手稿。',body:'山地道路连接不同海拔的社区。约 1615–1616 年的 Guaman Poma 手稿描绘王家道路管理者，补充道路背后的组织与劳动；文献不是路线地图。',detail:'实景 / Cédric Servay；手稿 / Felipe Guaman Poma de Ayala，低清文献。'},
 buddhist:{photo:'buddhist-temple',tag:'四处圣地，四个生命时刻',headline:'从诞生到觉悟',caption:'菩提伽耶，摩诃菩提寺建筑细部。',body:'蓝毗尼、菩提伽耶、鹿野苑与拘尸那迦，以出生、成道、初转法轮和涅槃串起阅读线索。四地不是按此顺序推荐的交通行程。',detail:'Ineb-2553 / 摩诃菩提寺实景。'},
 canal:{photo:'canal-bridge',tag:'水岸城市志',headline:'桥下是运河，\n岸上是生活',caption:'杭州拱宸桥，京杭运河的南端城市记忆。',body:'拱桥、码头和沿河街巷让漕运史进入日常。本图从北京到杭州精选城市节点，水系关系用示意连接呈现。',detail:'Zhangzhugang，2015 / 拱宸桥东南侧。'},
 viking:{photo:'viking-stone',tag:'一件器物，展开北海',headline:'石头里的\n北海往事',caption:'海泽比博物馆符文石，铭文以现代投影突出。',body:'从一块留下文字的石头进入北海的贸易、定居与冲突。照片中的亮色文字来自博物馆展示投影，并非石头原有的彩绘。',detail:'Szilas，2015 / Wikinger Museum Haithabu。'},
 impressionism:{photo:'monet-bridge',second:'monet-sunrise',tag:'作品与地点',headline:'光有来处，\n画有归处',caption:'莫奈《日本桥》（1899）与《印象·日出》（1872）。',body:'从画中风景走向真实地点，再看作品今天收藏在哪里。莫奈与毕沙罗的四幅作品构成观看线索，不拼接成画家们的一次共同旅行。',detail:'四幅作品 / 两位画家 / 描绘地与馆藏地分别定位。'},
 mozart:{photo:'mozart-score',tag:'从亲笔谱读一段人生',headline:'把欧洲，\n读成乐章',caption:'《教堂奏鸣曲》K.329，1779 年亲笔谱首页。',body:'笔迹、谱线与声部留下创作的具体痕迹。这份亲笔谱现藏柏林国家图书馆，作为阅读入口；地图中的城市跨越莫扎特多次旅行与不同年龄。',detail:'Wolfgang Amadeus Mozart / Staatsbibliothek zu Berlin，Mus.ms.autogr. Mozart, W. A. 329，f. 1r。'},
 route66:{photo:'route66-road',second:'route66-sign',tag:'公路与路牌',headline:'下一站，\n公路上的美国',caption:'新墨西哥州 Cuervo 历史路段与俄克拉何马路牌。',body:'两张实物影像分别来自新墨西哥与俄克拉何马。它们共同指向汽车时代的沿线文化，不暗示路牌就位于这张道路照片中。',detail:'道路 / Ammodramus，2015；路牌 / William Jones，2011。'},
 nc500:{photo:'nc500-pass',tag:'高地海岸驾驶手记',headline:'越过山口，\n海就在前面',caption:'从 Bealach na Bà 向卡伦湖眺望。',body:'蜿蜒山路、湖湾和大西洋岸边的小镇，在因弗内斯起止的环线上交替展开。照片展示其中一处山口，地图不是精确驾驶轨迹。',detail:'Jooniur，2014 / Bealach na Bà。'}
};
for(const [id,s] of Object.entries(editionStories)){
 delete photoLibrary[id];themeMedia[id].photo=s.photo;themeMedia[id].edition=s.tag;
}
const impressionistWorks=[
 {key:'monet-sunrise',title:'印象·日出',original:'Impression, soleil levant',artist:'克洛德·莫奈',year:'1872',placeId:'impressionism-lehavre',subject:'勒阿弗尔港',context:'从港口看晨光；画名成为印象派命名的线索。',museumId:'impressionism-marmottan',collection:'玛摩丹莫奈博物馆，巴黎',record:'https://www.marmottan.fr/en/notice/4014/'},
 {key:'monet-rouen',title:'鲁昂主教座堂，西立面',original:'Rouen Cathedral, West Façade',artist:'克洛德·莫奈',year:'1894',placeId:'impressionism-rouen',subject:'鲁昂主教座堂',context:'取景于鲁昂；系列作品随后在画室继续修改。1894 为 NGA 馆藏著录年代。',museumId:'impressionism-nga',collection:'美国国家美术馆，华盛顿',record:'https://www.nga.gov/artworks/46524-rouen-cathedral-west-facade'},
 {key:'pissarro-paris',title:'冬日早晨的蒙马特大道',original:'The Boulevard Montmartre on a Winter Morning',artist:'卡米耶·毕沙罗',year:'1897',placeId:'impressionism-montmartre',subject:'巴黎蒙马特大道',context:'从巴黎旅馆高处俯看街景，观察现代城市的人流与光线。',museumId:'impressionism-met',collection:'大都会艺术博物馆，纽约',record:'https://www.metmuseum.org/art/collection/search/437310'},
 {key:'monet-bridge',title:'日本桥',original:'The Japanese Footbridge',artist:'克洛德·莫奈',year:'1899',placeId:'impressionism-giverny',subject:'吉维尼，莫奈水园',context:'莫奈营造的水园既是生活空间，也是反复描绘的题材。此幅为 NGA 藏品，并非 Met 的同题版本。',museumId:'impressionism-nga',collection:'美国国家美术馆，华盛顿',record:'https://www.nga.gov/artworks/74796-japanese-footbridge'}
];
for(const [id,name,lon,lat,country,region,type,desc,source] of [
 ['impressionism-montmartre','巴黎 · 蒙马特大道',2.342,48.871,'法国','法兰西岛','画作取景','毕沙罗 1897 年蒙马特大道组画的巴黎题材地点。这里不是奥赛博物馆；本图所选《冬日早晨的蒙马特大道》现藏纽约大都会艺术博物馆。','https://www.metmuseum.org/art/collection/search/437310'],
 ['impressionism-marmottan','巴黎 · 玛摩丹莫奈博物馆',2.2672,48.8594,'法国','法兰西岛','作品收藏','《印象·日出》现藏机构。作品描绘的是勒阿弗尔港，馆藏地点不等于画作的描绘或创作地点。','https://www.marmottan.fr/en/notice/4014/'],
 ['impressionism-nga','华盛顿 · 美国国家美术馆',-77.0199,38.8913,'美国','华盛顿哥伦比亚特区','作品收藏','本图所选莫奈《鲁昂主教座堂，西立面》和《日本桥》的现藏机构。馆藏地不是画家在这两幅画中的取景地。','https://www.nga.gov/'],
 ['impressionism-met','纽约 · 大都会艺术博物馆',-73.9632,40.7794,'美国','纽约州','作品收藏','本图所选毕沙罗《冬日早晨的蒙马特大道》的现藏机构，画作题材地点位于巴黎。','https://www.metmuseum.org/art/collection/search/437310']
])places.push({id,name,lon,lat,country,region,type,desc,themes:['impressionism'],icon:'◇',facts:{'路线线索':region,'地点性质':type,'阅读提示':'描绘地与馆藏地分别定位，不代表历史旅行或作品完整流转史。'},source,sourceLabel:'作品与馆藏官方资料',coordinateNote:'建筑或街区代表坐标，不是具体作画窗口或导航入口。'});
const editorialPlacePhotos={
 'nakasendo-tsumago':'nakasendo-photo','buddhist-bodhgaya':'buddhist-temple','canal-hangzhou':'canal-bridge','viking-hedeby':'viking-stone','mozart-salzburg':'mozart-score','nc500-applecross':'nc500-pass'
};
function mediaImage(key,extra=''){
 const m=photoLibrary[key];return `<img src="${photoPath(key)}" alt="${m.title}" decoding="async" ${extra||'loading="lazy"'}>`;
}
function editionCoverKeys(id){const story=editionStories[id];if(typeof culturalCollections!=='undefined'&&culturalCollections.has(id)&&culturalCollections.get(id).covers.length)return culturalCollections.get(id).covers.map(c=>c.key);return [...new Set([themeMedia[id].photo,...(story?.second&&['nakasendo','andes','impressionism','route66'].includes(id)?[story.second]:[])])]}
function editionCoverHTML(id,interactive=false){
 const s=editionStories[id];if(!s)return '';if(typeof culturalCollections!=='undefined'&&culturalCollections.has(id)&&culturalCollections.get(id).covers.length)return collectionCoverHTML(id,interactive);
 const image=key=>interactive?mediaOpenHTML(key,mediaImage(key),key===s.photo?'read-plate':'secondary-image-open'):mediaImage(key);
 const primary=image(s.photo),secondary=s.second?image(s.second):'';
 let content=primary;
 if(id==='nakasendo')content=`<div class="print-panel">${primary}</div><div class="street-panel">${secondary}<span>今日妻笼</span></div>`;
 if(id==='andes')content=`${primary}<div class="document-inset">${secondary}</div><span class="cover-note">Qhapaq Ñan<br>六国道路网络</span>`;
 if(id==='viking')content=`<div class="object-title">石头里的<br>北海往事<small>海泽比符文石</small></div>${primary}`;
 if(id==='impressionism')content=`<div class="painting-main">${primary}</div><div class="painting-second">${secondary}</div>`;
 if(id==='mozart')content=`${primary}<span class="score-label">K.329<small>亲笔谱 / 1779</small></span>`;
 if(id==='route66')content=`${primary}<div class="road-sign">${secondary}</div>`;
 if(id==='buddhist')content+=`<span class="life-events">出生　成道　说法　涅槃</span>`;
 return `<div class="edition-cover cover-${id}">${content}</div>`;
}
function artworkHTML(work){return `<figure class="artwork-card">${mediaOpenHTML(work.key,mediaImage(work.key,'loading="lazy"'),'artwork-image')}<figcaption><span class="artwork-date">${work.year}</span><h4>${work.title}</h4><p>${work.artist}</p><dl><div><dt>${work.locationLabel||'画中地点'}</dt><dd>${work.subject}</dd></div><div><dt>现藏</dt><dd>${work.collection}</dd></div></dl>${mediaCaptionHTML([work.key],'',false)}<div class="artwork-actions"><button data-art-place="${work.key}">定位${work.locationLabel?'关联地点':'画中地点'}</button><button data-art-museum="${work.key}">定位馆藏地</button></div></figcaption></figure>`}
function renderEditionExhibit(){
 let el=document.querySelector('#edition-exhibit');if(!el){el=document.createElement('section');el.id='edition-exhibit';document.querySelector('#discover-panel .panel-guide').after(el)}
 const id=themes[activeTheme].id,works=worksForTheme(id);el.hidden=!works.length;
 if(!works.length){el.innerHTML='';return}
 const artists=[...new Set(works.map(w=>w.artist))];
 el.innerHTML=`<div class="exhibit-heading"><h3>从一幅画出发</h3><p>${works.length} 幅作品，分别定位描绘或创作关联地与馆藏地。</p><label>画家<select id="art-artist"><option value="all">全部画家</option>${artists.map(a=>'<option>'+a+'</option>').join('')}</select></label></div><div class="artwork-grid"></div>`;
 const render=()=>{const artist=el.querySelector('select').value;el.querySelector('.artwork-grid').innerHTML=works.filter(w=>artist==='all'||w.artist===artist).map(artworkHTML).join('')};el.querySelector('select').onchange=render;render();
}
let imageRoomReturnFocus=null;
function openImageRoom(key,trigger=document.activeElement){
 const m=photoLibrary[key];if(!m)return;
 let dialog=document.querySelector('#image-room');if(!dialog){dialog=document.createElement('dialog');dialog.id='image-room';dialog.setAttribute('aria-labelledby','image-room-title');document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})}
 imageRoomReturnFocus=trigger?.closest?.('[data-read-image]')||trigger;
 if(!dialog.dataset.focusReturnBound){dialog.dataset.focusReturnBound='true';dialog.addEventListener('close',()=>{if(imageRoomReturnFocus?.isConnected)imageRoomReturnFocus.focus({preventScroll:true});imageRoomReturnFocus=null})}
 const work=artWorks.find(w=>w.key===key),story=Object.values(editionStories).find(s=>s.photo===key||s.second===key);
 dialog.innerHTML=`<button class="room-close" aria-label="关闭影像阅览">×</button><div class="room-image">${mediaImage(key)}</div><div class="room-copy"><h2 id="image-room-title">${work?work.title:m.title}</h2>${work?`<p class="room-byline">${work.artist}，${work.year}<br><span lang="en">${work.original}</span></p><p>${work.context}</p><dl class="work-locations"><div><dt>${work.locationLabel||'画中地点'}</dt><dd>${work.subject}</dd></div><div><dt>现藏机构</dt><dd>${work.collection}</dd></div></dl><div class="artwork-actions"><button data-art-place="${key}">在地图上看${work.locationLabel?'关联地点':'画中地点'}</button><button data-art-museum="${key}">在地图上看馆藏地</button></div><a class="record-link" href="${work.record}" target="_blank" rel="noopener noreferrer">作品官方著录</a>`:`<p>${story?.body||''}</p><p>${story?.detail||''}</p>`}<div class="room-credit">${photoCredit(key)}<p>${m.changes||'项目原有图像，界面中按比例缩放与裁切。'}</p></div></div>`;
 dialog.querySelector('.room-close').onclick=()=>dialog.close();if(!dialog.open)dialog.showModal();
}
function locateArtwork(key,role){
 const work=artWorks.find(w=>w.key===key);if(!work)return;
 imageRoomReturnFocus=null;document.querySelector('#image-room')?.close();const p=places.find(p=>p.id===(role==='museum'?work.museumId:work.placeId));select(p);
}
document.addEventListener('click',e=>{
 const read=e.target.closest('[data-read-image]');if(read){openImageRoom(read.dataset.readImage,read);return}
 const subject=e.target.closest('[data-art-place]');if(subject){locateArtwork(subject.dataset.artPlace,'subject');return}
 const museum=e.target.closest('[data-art-museum]');if(museum)locateArtwork(museum.dataset.artMuseum,'museum');
});
// A failed image keeps its caption, attribution and controls usable; no unrelated substitute.
document.addEventListener('error',e=>{
 const img=e.target;if(img.tagName!=='IMG'||img.dataset.failed)return;img.dataset.failed='true';img.hidden=true;
 const fallback=document.createElement('span');fallback.className='media-unavailable';fallback.setAttribute('role','img');fallback.setAttribute('aria-label',img.alt+'（图像暂不可用）');fallback.textContent='图像暂不可用 · '+(img.alt||'请查看来源说明');img.after(fallback);
},true);

'use strict';
// Added editorial context is explicitly bounded; original catalogue descriptions remain intact.
const placeEssays={};
for(const work of artWorks){
 const id=work.placeId;if(!placeEssays[id])placeEssays[id]={title:'把风景放回作品里',paragraphs:[],sources:[],related:[]};
 const entry=placeEssays[id];entry.paragraphs.push({heading:work.title+' · '+work.year,text:work.context});entry.sources.push({title:work.artist+'《'+work.title+'》官方著录',url:work.record});entry.related.push(work.museumId);
}
function addEssay(id,title,paragraphs,related=[]){const p=places.find(p=>p.id===id);if(!p)return;placeEssays[id]={title,paragraphs:paragraphs.map(([heading,text])=>({heading,text})),sources:[{title:p.sourceLabel||'地点背景资料',url:p.source}],related}}
addEssay('vangogh-paris','在巴黎改变观看的方式',[
 ['生涯里的巴黎','1886 年梵高来到巴黎，与提奥共同生活。蒙马特在这里首先是一段生活与学习的环境，本主题《戴草帽的自画像》可与这一阶段对照；它是一幅人物画，不是蒙马特街景。'],
 ['沿着城市读人物','可以把住居街区与艺术交往作为阅读入口，再比较南方与欧韦阶段的风景。这里标的是街区代表点，不判断某一幢建筑当日是否开放，也不把之后的不同年份压缩成一次巡游。']
],['vangogh-arles','vangogh-auvers']);
addEssay('vangogh-arles','南方的光与共同生活的理想',[
 ['1888 年的南方阶段','梵高于 1888 年从巴黎来到阿尔勒。黄房子与画室生活成为这段生涯的重要线索；理解城市的意义，也要看到居住与人与人相处的具体处境。'],
 ['作品与现场的距离','地图以阿尔勒城市为代表点。黄房子的历史图像、其他画室题材和今天的城市景观需要分开看；本主题的《阿尔勒女人》和《鞋》分别呈现当地人物与室内线索，可与南方风景和花束静物对读。']
],['vangogh-saintremy','vangogh-paris']);
for(const id of ['impressionism-met','impressionism-nga','impressionism-marmottan'])addEssay(id,'在馆藏地继续读作品',[
 ['馆藏不是画中地点','博物馆把不同地方、不同年份的作品带到同一座城市。本图的“现藏机构”表示收藏关系，不把作品中的欧洲风景移到美国，也不据此推断画家曾到访这座馆藏城市。'],
 ['看画之前','同题画和系列画可能有多个版本。请按本图列出的作品题名、年代与官方著录核对，实际展厅、借展与开放状态另查馆方；点击下方作品可返回相应描绘地点。']
],artWorks.filter(w=>w.museumId===id).map(w=>w.placeId));
addEssay('impressionism-paris','在奥赛建立观看线索',[
 ['博物馆的角色','奥赛以收藏与展览提供理解艺术史的入口。它在这张地图中属于馆藏机构，而非巴黎所有画作的统一创作地点。'],
 ['先确认是哪一幅','本轮展示的八幅印象派关联作品分藏玛摩丹、Met 与 NGA，并不因为从奥赛开始阅读就声称它们都在奥赛展出。作品按钮会单独标出正确馆藏。']
],['impressionism-montmartre','impressionism-marmottan']);
addEssay('impressionism-chatou','河岸休闲与画家相遇',[
 ['为什么看河岸','沙图所在的塞纳河环境与画家的户外创作、休闲生活相关。看桥、岛与河岸的关系，有助于理解风景画中的活动空间。'],
 ['保持作品的具体性','这里是主题背景地点。本轮尚未为沙图加入核验过开放图像的专属画作，因此不会借用另一座城镇的照片或画作，假装它就是沙图的现场。']
],['impressionism-villeneuve','impressionism-argenteuil']);
addEssay('impressionism-honfleur','海港成为观看天气的地方',[
 ['从海岸理解绘画','翁弗勒尔与布丹等艺术家的关联，为印象派形成之前的海岸绘画提供背景。港口既有建筑轮廓，也有不断变化的天空与水面。'],
 ['与勒阿弗尔对读','可将两座海港作为不同的艺术地点阅读。本图《印象·日出》的描绘地明确是勒阿弗尔，不把这幅画改挂到翁弗勒尔名下。']
],['impressionism-lehavre']);
addEssay('impressionism-etretat','在海蚀崖前理解构图',[
 ['看崖壁与留白','埃特勒塔的海岸形态是艺术家反复观看的题材。可以从崖体轮廓、海面和天空的比例理解风景画如何取舍现场。'],
 ['从作品回到地理','此处以海岸区域定位，没有把某一幅崖岸画作的机位当作导航入口。本轮不使用当前未提供开放图像的 Met 同题候选，悬崖现场也须遵守路径与开放范围。']
],['impressionism-lehavre','impressionism-rouen']);
addEssay('nakasendo-tsumago','版画里的宿场，今天的街道',[
 ['历史图像与生活空间','歌川广重的《妻笼》属于木曾街道六十九次中的宿场图像；与今日妻笼宿街景并置，可以观察山道、房屋和行旅人物如何成为地方的视觉记忆。'],
 ['从一座宿场走向另一座','保存街区适合慢读，木曾步道体验则需要单独安排。京都至江户的全线文化走廊包含现代交通段，不因封面出现古道就被当作一条连续可走的原始步道。']
],['nakasendo-magome','nakasendo-narai']);
addEssay('buddhist-bodhgaya','建筑与成道记忆',[
 ['在四地中的位置','菩提伽耶在本图承担“成道”的生平线索，与蓝毗尼、鹿野苑和拘尸那迦形成不同生命时刻的主题阅读。这样的编排不等于现实交通的最优顺序。'],
 ['看建筑，也看礼仪空间','摩诃菩提寺的建筑细部、树木与当代礼仪共同构成现场。照片是一段具体时间的记录，不代表当天的仪式、开放或参访安排。']
],['buddhist-lumbini','buddhist-sarnath']);
addEssay('viking-hedeby','从符文石读北海交流',[
 ['文字与器物','符文石把抽象的“维京文化”落到一件可观看的器物上。此照片摄于海泽比博物馆，亮色铭文为现代投影突出显示，并不表示石头原本就有这样的彩绘。'],
 ['贸易、定居与冲突','海泽比是本主题网络中的一处遗址，不是所有北海航海故事的起点。英国、爱尔兰、北欧和北美地点各有历史，地图不把它们串成一位航海者的完整航线。']
],['viking-ribe','viking-york']);
addEssay('canal-hangzhou','桥是水路与城市相遇的地方',[
 ['从拱宸桥看城市','拱桥、码头与沿河街巷让漕运历史进入城市日常。照片记录拱宸桥东南侧的视角，而地图点表示杭州的运河城市节点。'],
 ['一段主线，不是一切水系','本图串联北京到杭州的精选城市，不能代表大运河所有历史时期、隋唐与浙东水系，更不能从示意连线判断全线通航或沿岸连续步行条件。']
],['canal-jiaxing','canal-suzhou']);
addEssay('mozart-salzburg','从故乡读亲笔谱',[
 ['生活地点与乐谱','萨尔茨堡是莫扎特出生、成长与音乐生活的入口。主题采用的《教堂奏鸣曲》K.329 亲笔谱首页标注 1779 年，墨迹与声部提供另一种认识人物的方式。'],
 ['三种关系分开看','这里是生平城市，页面中的谱页是具体作品，原稿今天则藏于柏林国家图书馆。柏林馆藏并不把作品的所有创作活动搬到柏林，其他欧洲城市也不合并成一次巡演。']
],['mozart-vienna','mozart-prague']);
addEssay('nc500-applecross','山口之后，海湾之前',[
 ['把道路放回地形','Bealach na Bà 的照片展示山路与卡伦湖方向的关系。它帮助理解高地路段的尺度，不提供坡度、弯道、可会车处或精确驾驶路线。'],
 ['给停留留出空间','NC500 从因弗内斯起止；西岸的山口、海湾和小镇适合分段安排。车型、单车道、天气与现场限制须另核实，不能用地图上的直线距离估计开车时间。']
],['nc500-inverness']);
let detailReturnFocus=null;
function rememberDetailFocus(){if(!selected||document.querySelector('#detail').hidden){const a=document.activeElement;if(a&&!document.querySelector('#detail').contains(a))detailReturnFocus=a}}
function relatedArtHTML(p){const works=artWorks.filter(w=>w.placeId===p.id||w.museumId===p.id);if(!works.length)return '';return `<details class="reading-works" ${works.length<4?'open':''}><summary>相关作品 <span>${works.length} 幅</span></summary><div>${works.map(work=>`<div class="reading-work">${mediaOpenHTML(work.key,mediaImage(work.key,'loading="lazy"'))}<div><strong>${work.title}</strong><small>${work.artist}，${work.year}</small><p>${work.locationLabel||'描绘地'}：${work.subject}<br>现藏：${work.collection}</p>${mediaCaptionHTML([work.key],'',false)}<button data-art-place="${work.key}">${work.locationLabel?'关联地点':'画中地点'}</button>${work.museumId?`<button data-art-museum="${work.key}">馆藏地</button>`:''}</div></div>`).join('')}</div></details>`}
function meaningfulFacts(p){return Object.entries(p.facts||{}).filter(([key,value])=>value&&!['阅读提示'].includes(key)&&![p.type,p.region,p.country].includes(value))}
function placeFactsHTML(p){const facts=meaningfulFacts(p);return facts.length?`<details class="reading-facts"><summary>地点资料</summary><dl class="facts">${facts.map(([k,v])=>`<div><dt>${escapeHTML(k)}</dt><dd>${escapeHTML(v)}</dd></div>`).join('')}</dl>${p.weather?'<p>'+escapeHTML(p.weather)+'</p>':''}</details>`:''}
let readingPlans=null;
function placePlansHTML(p){if(!readingPlans)readingPlans=themes.flatMap(t=>buildPlans(t.id,0));const plans=readingPlans.filter(plan=>plan.stops.some(s=>s.id===p.id)).sort((a,b)=>(b.theme===themes[activeTheme].id)-(a.theme===themes[activeTheme].id)).slice(0,3);return plans.length?`<section class="reading-plan-links"><h3>相关行程</h3>${plans.map(plan=>`<button data-reading-plan="${plan.id}"><strong>${escapeHTML(plan.name)}</strong><small>${plan.topology==='network'?plan.stops.length+' 个关联地点': '第 '+(plan.stops.findIndex(s=>s.id===p.id)+1)+' 站 / '+plan.stops.length+' 站'} · ${plan.days} 天参考</small></button>`).join('')}</section>`:''}
function renderPlaceDetail(p,playback=false){
 const el=document.querySelector('#detail'),essay=placeEssays[p.id],works=artWorks.filter(w=>w.placeId===p.id||w.museumId===p.id),facts=p.facts||{},theme=themes[activeTheme];
 const summary=typeof researchedPlaceSummary==='function'?researchedPlaceSummary(p):p.desc;
 const sources=[...(essay?.sources||[]),...works.map(w=>({title:w.artist+'《'+w.title+'》',url:w.record})),...(p.additionalSources||[]),...(p.source?[{title:p.sourceLabel||'地点官方资料',url:p.source}]:[])].filter((s,i,a)=>s.url&&a.findIndex(x=>x.url===s.url)===i);
 el.hidden=false;el.dataset.place=p.id;el.innerHTML=`<div class="reading-header"><button aria-label="关闭详情" class="reading-close">×</button><small>${escapeHTML(p.country)} / ${escapeHTML(p.type)}</small><h2 id="reading-title">${escapeHTML(p.name)}</h2>${previewStops?`<p class="reading-context">${activePlan?escapeHTML(activePlan.name):'我的旅程'} · ${previewStops.indexOf(p)+1} / ${previewStops.length}</p>`:''}</div><div class="reading-body"><p class="place-summary">${escapeHTML(summary.slice(0,200))}${summary.length>200?'…':''}</p>${!works.length?placePhotoHTML(p):''}${p.desc.length>200?`<details class="full-description"><summary>展开完整介绍</summary><p>${escapeHTML(p.desc)}</p></details>`:''}${essay?`<section class="reading-essay"><h3>${essay.title}</h3>${essay.paragraphs.map((q,i)=>`<details ${i===0?'open':''}><summary>${escapeHTML(q.heading)}</summary><p>${escapeHTML(q.text)}</p></details>`).join('')}</section>`:''}${relatedArtHTML(p)}${placePlansHTML(p)}${placeFactsHTML(p)}${essay?.related?.filter(id=>placesById.has(id)).length?`<section class="reading-related"><h3>继续阅读</h3>${[...new Set(essay.related)].filter(id=>id!==p.id&&placesById.has(id)).map(id=>`<button data-related-place="${id}">${escapeHTML(placesById.get(id).name)}</button>`).join('')}</section>`:''}<details class="reading-sources"><summary>来源与进一步阅读 <span>${sources.length}</span></summary><ol>${sources.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.title)}</a></li>`).join('')}</ol><p>${escapeHTML(p.coordinateNote||p.note||'代表坐标，不是导航入口。')}</p><p>图片的逐项作者和许可可在完整图像阅览及“影像来源”中查看。</p></details></div><div class="detail-actions"><button class="add-trip" ${trip.includes(p)?'disabled':''}>${trip.includes(p)?'✓ 已加入旅程':'＋ 加入我的旅程'}</button></div>`;
 el.scrollTop=0;el.querySelector('.reading-close').onclick=closePlaceDetail;el.querySelector('.add-trip').onclick=e=>{if(!trip.some(x=>x.id===p.id)){trip.push(p);renderTrip()}e.currentTarget.textContent='✓ 已加入旅程';e.currentTarget.disabled=true;toast('已加入我的旅程')};
 el.querySelectorAll('[data-reading-plan]').forEach(b=>b.onclick=()=>{const plan=readingPlans.find(p=>p.id===b.dataset.readingPlan);if(plan.theme!==themes[activeTheme].id)enterTheme(themes.findIndex(t=>t.id===plan.theme));openPlan(plan)});
 el.querySelectorAll('[data-related-place]').forEach(b=>b.onclick=()=>{const next=placesById.get(b.dataset.relatedPlace);if(!next.themes.includes(themes[activeTheme].id)){const i=themes.findIndex(t=>next.themes.includes(t.id));enterTheme(i)}select(next)});
 if(!playback)requestAnimationFrame(()=>el.focus({preventScroll:true}));
}
function closePlaceDetail(){const closedId=selected?.id;const index=previewStops?.findIndex(p=>p.id===closedId);stopTrip();document.querySelector('#detail').hidden=true;selected=null;renderList();renderRoutePanel();writeNavigation(true);dirty=true;if(detailReturnFocus?.isConnected)detailReturnFocus.focus({preventScroll:true});else if(index>=0)document.querySelector('.route-stops [data-stop="'+index+'"]')?.focus({preventScroll:true});else document.querySelector('.place[data-place="'+closedId+'"]')?.focus({preventScroll:true})}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')&&!document.querySelector('#detail').hidden){e.preventDefault();closePlaceDetail()}});

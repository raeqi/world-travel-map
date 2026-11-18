'use strict';
const discoveryGroups=[['all','全部兴趣'],['art','艺术与人物'],['paths','古道与朝圣'],['exchange','水路与文明'],['nature','自然与风景'],['drives','公路旅行']];

const culturalDisciplines=[["painting","绘画与版画"],["music","音乐"],["literature","文学与游记"],["sculpture","雕塑"],["architecture","建筑"],["photography","摄影"],["installation","装置与光"],["land-art","大地艺术"]];
const culturalDisciplineByTheme={"turner":"painting","cezanne":"painting","dali":"painting","matisse":"painting","munch":"painting","okeeffe":"painting","hiroshige":"painting","gauguin":"painting","chagall":"painting","sorolla":"painting","constable":"painting","zhang-daqian":"painting","picasso":"painting","frida":"painting","beethoven":"music","chopin":"music","liszt":"music","schumanns":"music","wagner":"music","mahler":"music","dvorak":"music","sibelius":"music","grieg":"music","mendelssohn":"music","puccini":"music","handel":"music","su-shi":"literature","li-bai":"literature","du-fu":"literature","wang-wei":"literature","bai-juyi":"literature","lu-you":"literature","shen-congwen":"literature","xiao-hong":"literature","basho":"literature","kawabata":"literature","soseki":"literature","goethe":"literature","hugo":"literature","byron":"literature","wordsworth":"literature","dickens":"literature","kafka":"literature","joyce":"literature","proust":"literature","hemingway":"literature","steinbeck":"literature","mark-twain":"literature","neruda":"literature","marquez":"literature","tagore":"literature","mahfouz":"literature","wu-guanzhong":"painting","qi-baishi":"painting","huang-binhong":"painting","feng-zikai":"painting","higashiyama":"painting","rivera":"painting","rodin":"sculpture","brancusi":"sculpture","hepworth":"sculpture","noguchi":"sculpture","giacometti":"sculpture","henry-moore":"sculpture","gaudi":"architecture","wright":"architecture","le-corbusier":"architecture","aalto":"architecture","ando":"architecture","ansel-adams":"photography","cartier-bresson":"photography","lee-miller":"photography","sugimoto":"photography","christo-jeanneclaude":"installation","turrell":"installation","utah-land-art":"land-art","hokusai":"painting","vermeer":"painting","impressionism":"painting","vangogh":"painting","bach":"music","mozart":"music","austen":"literature","polo":"literature","xu":"literature"};
function themeDisciplines(theme){const ids=theme.disciplines||[theme.discipline||culturalDisciplineByTheme[theme.id]];return ids.filter(id=>culturalDisciplines.some(([key])=>key===id))}
function availableCulturalDisciplines(){return culturalDisciplines.filter(([id])=>themes.some(t=>themeDisciplines(t).includes(id)))}
function disciplineMatches(theme){return homeState.interest!=='art'||homeState.discipline==='all'||themeDisciplines(theme).includes(homeState.discipline)}
const discoveryMeta={
 nature:['nature',['亚洲','欧洲','美洲','非洲','大洋洲'],'自然遗产 山野 森林 湖泊'],culture:['exchange',['亚洲','欧洲','美洲','非洲','大洋洲'],'建筑 考古 城市 历史 日本 中国 意大利 法国'],gorges:['exchange',['亚洲'],'中国 长江 水岸 古镇'],parks:['nature',['美洲'],'美国 国家公园 荒野'],tea:['exchange',['亚洲'],'中国 尼泊尔 印度 茶 马帮'],silk:['exchange',['亚洲','欧洲','非洲'],'丝路 绿洲 贸易'],polo:['art',['亚洲','欧洲'],'游记 文学 马可波罗'],xu:['art',['亚洲'],'中国 徐霞客 游记 山川'],kumano:['paths',['亚洲'],'日本 熊野 参诣 山林'],camino:['paths',['欧洲'],'法国 西班牙 圣地亚哥 朝圣'],nakasendo:['paths',['亚洲'],'日本 木曾 宿场 中山道'],francigena:['paths',['欧洲'],'英国 法国 瑞士 意大利 罗马 朝圣'],andes:['paths',['美洲'],'安第斯 秘鲁 厄瓜多尔 印加 山路'],buddhist:['paths',['亚洲'],'印度 尼泊尔 佛教 生平'],canal:['exchange',['亚洲'],'中国 大运河 漕运 北京 杭州'],viking:['exchange',['欧洲','美洲'],'北欧 维京 符文 德国 英国 爱尔兰'],impressionism:['art',['欧洲','美洲'],'法国 英国 绘画 印象派 莫奈 毕沙罗 西斯莱 马奈 Claude Monet Camille Pissarro Alfred Sisley Edouard Manet'],mozart:['art',['欧洲'],'奥地利 欧洲 莫扎特 音乐 乐谱'],route66:['drives',['美洲'],'美国 66 公路 汽车'],nc500:['drives',['欧洲'],'英国 苏格兰 高地 海岸 自驾'],vangogh:['art',['欧洲','美洲'],'法国 梵高 Vincent van Gogh 绘画 普罗旺斯 欧韦']
};
const countrySearchNames={'Canada':'加拿大','Norway':'挪威','Iceland':'冰岛','New Zealand':'新西兰','South Africa':'南非','United Kingdom':'英国','Australia':'澳大利亚','China':'中国','Egypt':'埃及','France':'法国','India':'印度','Italy':'意大利','Japan':'日本','Mexico':'墨西哥','Spain':'西班牙','Switzerland':'瑞士','United States of America':'美国'};
const itineraryAreas={'亚洲':['中国','印度','日本','尼泊尔','乌兹别克斯坦'],'欧洲':['英国','法国','意大利','瑞士','梵蒂冈','丹麦','冰岛','奥地利','德国','捷克','爱尔兰','西班牙'],'美洲':['美国','加拿大','智利','玻利维亚','秘鲁','墨西哥'],'非洲':['埃及'],'大洋洲':['澳大利亚']};
function countrySearch(country){const alias=countrySearchNames[country]||Object.keys(countrySearchNames).find(en=>countrySearchNames[en]===country)||'';return country+' '+alias}
function placeRouteAreas(p){const names=p.country.split(' · ')[0].split(' / ').map(n=>countrySearchNames[n]||n);return Object.entries(itineraryAreas).filter(([,countries])=>names.some(n=>countries.includes(n))).map(([area])=>area)}
function countryQueryName(query){const q=normalizedSearch(query.trim()),pair=Object.entries(countrySearchNames).find(([en,zh])=>normalizedSearch(en)===q||normalizedSearch(zh)===q);return pair?.[1]||Object.values(itineraryAreas).flat().find(n=>normalizedSearch(n)===q)||null}
function placeCountryMatches(p,name){return p.country.split(' · ')[0].split(' / ').some(n=>(countrySearchNames[n]||n)===name)}
function discoveryRouteMatches({plan,theme}){const country=countryQueryName(homeState.query);if(country&&!plan.stops.some(p=>placeCountryMatches(p,country)))return false;if(homeState.area!=='all'&&!plan.stops.some(p=>placeRouteAreas(p).includes(homeState.area)))return false;if(country)return true;const terms=normalizedSearch(homeState.query.trim()).split(/\s+/).filter(Boolean),works=artWorks.filter(w=>plan.stops.some(p=>p.id===w.placeId)),aliases={'克洛德·莫奈':'Claude Monet','卡米耶·毕沙罗':'Camille Pissarro','阿尔弗雷德·西斯莱':'Alfred Sisley','爱德华·马奈':'Edouard Manet','文森特·梵高':'Vincent van Gogh'},text=normalizedSearch(plan.id+' '+plan.name+' '+plan.reason+' '+plan.stops.map(p=>p.name+' '+(p.en||'')+' '+countrySearch(p.country)).join(' ')+' '+works.map(w=>w.title+' '+w.original+' '+w.artist+' '+aliases[w.artist]).join(' ')),themeName=normalizedSearch(theme.name+' '+theme.id);return terms.every(t=>text.includes(t))||terms.every(t=>themeName.includes(t))}
let discoveryIndex=null;
const homeState={query:'',interest:'all',discipline:'all',area:'all',view:'themes'};
function readHomeState(){const q=new URLSearchParams(location.hash.slice(1));homeState.query=q.get('find')||'';homeState.interest=discoveryGroups.some(x=>x[0]===q.get('interest'))?q.get('interest'):'all';homeState.area=['亚洲','欧洲','美洲','非洲','大洋洲'].includes(q.get('area'))?q.get('area'):'all';homeState.discipline=homeState.interest==='art'&&culturalDisciplines.some(([id])=>id===q.get('discipline'))?q.get('discipline'):'all';homeState.view=q.get('show')==='routes'?'routes':'themes'}
readHomeState();
function normalizedSearch(text){return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function catalogueIndex(){if(discoveryIndex)return discoveryIndex;discoveryIndex=themes.map(t=>{const nodes=places.filter(p=>p.themes.includes(t.id)),plans=buildPlans(t.id,0),meta=discoveryMeta[t.id]||['exchange',[],''];return {theme:t,nodes,plans,group:meta[0],areas:meta[1],search:normalizedSearch([t.name,t.story,meta[2],...nodes.map(p=>p.name+' '+(p.en||'')+' '+countrySearch(p.country)),...plans.map(p=>p.name),...worksForTheme(t.id).map(w=>w.title+' '+w.original+' '+w.artist)].join(' '))}});return discoveryIndex}
function sourceCoveredByOneVisibleMap(id){
 if(typeof culturalSourceCoverage!=='function')return false;
 const rows=culturalSourceCoverage(id);return !!rows.length&&rows[0].maps.some(map=>rows.every(row=>row.maps.includes(map)));
}
function matchingDiscovery(includeHidden=false){const terms=normalizedSearch(homeState.query.trim()).split(/\s+/).filter(Boolean);return catalogueIndex().filter(x=>(includeHidden||homeState.view!=='themes'||!x.theme.catalogHidden||(terms.length&&x.theme.personSearch&&terms.every(q=>normalizedSearch(x.theme.personSearch).includes(q))&&!sourceCoveredByOneVisibleMap(x.theme.id)))&&(!countryQueryName(homeState.query)||x.nodes.some(p=>placeCountryMatches(p,countryQueryName(homeState.query))))&&(homeState.interest==='all'||x.group===homeState.interest)&&disciplineMatches(x.theme)&&(homeState.area==='all'||x.areas.includes(homeState.area))&&terms.every(q=>x.search.includes(q)))}
function routeDiscoveryInterests(plan,theme){
 return [...new Set([discoveryMeta[theme.id]?.[0],...(plan.interests||[])])].filter(id=>discoveryGroups.some(([key])=>key===id));
}
function matchingDiscoveryRoutes(){
 const rows=catalogueIndex().filter(x=>disciplineMatches(x.theme)&&(!x.theme.catalogHidden||homeState.query.trim())).flatMap(x=>x.plans.map(plan=>({plan,theme:x.theme}))).filter(x=>(homeState.interest==='all'||routeDiscoveryInterests(x.plan,x.theme).includes(homeState.interest))&&discoveryRouteMatches(x));
 if(homeState.query.trim())return rows;
 const unique=new Map();for(const row of rows){const map=typeof culturalThemeMaps==='undefined'?null:culturalThemeMaps.get(row.theme.id);if(!unique.has(row.plan.id)||map?.sharedPlans?.includes(row.plan.id))unique.set(row.plan.id,row);}return [...unique.values()];
}
function discoveryThemeCard(x){
 const t=x.theme;
 return `<button class="theme-card discovery-card" data-theme="${t.id}" data-open-theme="${t.id}"><div class="catalog-cover">${discoveryCover(t.id)}</div><div class="catalog-card-copy"><small>${discoveryGroups.find(g=>g[0]===x.group)?.[1]} <span>${x.areas.length>3?'全球':(['impressionism','vangogh'].includes(t.id)?'欧洲 / 海外馆藏':x.areas.join(' / '))}</span></small><strong>${t.name}</strong><p>${t.story}</p><span class="catalog-card-bottom">${x.nodes.length} 个地点 <i>${x.plans.length+' 条行程'}</i><b>打开地图</b></span></div></button>`;
}
function discoveryItineraryHTML({plan:p,theme:t}){
 return `<article class="catalog-itinerary" data-route-id="${p.id}"><div class="itinerary-image">${routeCover(p)}</div><div><small>${t.name} · ${escapeHTML(p.routeLabel||(p.topology==='network'?'主题地点精选':p.topology==='loop'?'闭环探访':'精选走廊'))}</small><h3>${escapeHTML(p.name)}</h3><p>${p.stops.map(s=>escapeHTML(s.name)).join(p.topology==='network'?' · ':' → ')}</p><span>${p.days} 天参考 · ${p.stops.length} 站</span><button data-home-plan="${p.id}" data-plan-theme="${t.id}">查看行程</button></div></article>`;
}
function bindDiscoveryPlans(el){
 el.querySelectorAll('[data-home-plan]').forEach(b=>b.onclick=()=>{
  const t=b.dataset.planTheme,plan=buildPlans(t,0).find(p=>p.id===b.dataset.homePlan);
  if(!plan)return;
  enterTheme(themes.findIndex(x=>x.id===t));openPlan(plan);
 });
}
function homeDiscoveryParameters(){
 const q=new URLSearchParams();
 if(homeState.query)q.set('find',homeState.query);
 if(homeState.interest!=='all')q.set('interest',homeState.interest);
 if(homeState.interest==='art'&&homeState.discipline!=='all')q.set('discipline',homeState.discipline);
 if(homeState.area!=='all')q.set('area',homeState.area);
 if(homeState.view!=='themes')q.set('show',homeState.view);
 return q;
}
function writeHomeNavigation(){const q=homeDiscoveryParameters();history.replaceState(null,'',q.size?'#'+q:location.pathname)}
function discoveryCover(id){return editionStories[id]?editionCoverHTML(id):`<img src="${photoPath(themeMedia[id].photo)}" alt="${escapeHTML(photoLibrary[themeMedia[id].photo].title)}" loading="lazy" decoding="async">`}
function renderDiscoveryCatalog(){
 destroyHeroCarousel();
 const el=document.querySelector('#theme-catalog'),all=catalogueIndex(),plans=all.filter(x=>!x.theme.catalogHidden).reduce((n,x)=>n+x.plans.length,0);
 el.innerHTML=`<div class="discovery-topline"><span>自然的造化 · 人的创造</span><button class="home-saved" ${trip.length?'':'disabled'}>我的收藏 <b>${trip.length}</b></button></div><section class="discovery-hero"><div class="discovery-hero-copy"><span class="terra-kicker" lang="en">TERRA MOSAIC — EXPLORE THE WORLD</span><h1>世界的万千模样，<br>都值得亲自看看。</h1><p>从山川、海岸到城市与作品，发现自然与人共同塑造的地方。沿着路线，找到下一次出发的方向。</p><div class="terra-collection-note"><span>${visibleCatalogueThemes().length} 个专题入口</span><span>${plans} 条精选路线</span></div><label class="global-search"><span aria-hidden="true">⌕</span><input id="catalog-search" type="search" autocomplete="off" value="${escapeHTML(homeState.query)}" aria-label="搜索主题、地点、画家或行程" placeholder="搜索主题、地点、画家或行程"><span class="search-hint" id="search-feedback">例如 国家公园、京都、莫奈</span><button type="button" class="jump-to-results">探索</button></label></div>${heroCarouselHTML()}</section><section class="discovery-browser" id="terra-discover" aria-label="查找地图和行程"><div class="discovery-browser-head"><div><span class="terra-kicker" lang="en">FIND YOUR NEXT JOURNEY</span><h2>从你的好奇出发</h2><p>选一种兴趣、一个目的地，找到值得亲自去看的地方。</p></div><label class="discovery-area">地域<select id="catalog-area"><option value="all">全部地域</option>${['亚洲','欧洲','美洲','非洲','大洋洲'].map(x=>`<option ${homeState.area===x?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="discovery-facets" aria-label="探索兴趣">${discoveryGroups.map(([id,name])=>`<button data-interest="${id}" aria-pressed="${homeState.interest===id}">${name}</button>`).join('')}</div><label class="discovery-area discovery-discipline" id="cultural-discipline-filter" ${homeState.interest==='art'?'':'hidden style="display:none"'}>创作领域<select id="catalog-discipline"><option value="all">全部领域</option>${availableCulturalDisciplines().map(([id,name])=>`<option value="${id}" ${homeState.discipline===id?'selected':''}>${name}</option>`).join('')}</select></label><div class="discovery-results-head"><div class="result-views"><button data-catalog-view="themes" aria-pressed="${homeState.view==='themes'}">主题地图</button><button data-catalog-view="routes" aria-pressed="${homeState.view==='routes'}">精选行程</button></div><p id="catalog-result-count" aria-live="polite"></p></div><div id="catalog-results"></div></section>`;
 document.querySelector('#theme-hero').hidden=true;if(document.querySelector('#theme-reading'))document.querySelector('#theme-reading').hidden=true;
 document.querySelector('#breadcrumbs').textContent='主题地图集';
 el.querySelector('#catalog-search').oninput=e=>{homeState.query=e.target.value;renderDiscoveryResults();writeHomeNavigation()};
 el.querySelector('#catalog-area').onchange=e=>{homeState.area=e.target.value;renderDiscoveryResults();writeHomeNavigation()};
 el.querySelector('#catalog-discipline').onchange=e=>{homeState.discipline=e.target.value;renderDiscoveryResults();writeHomeNavigation()};
 el.onclick=e=>{const button=e.target.closest('button');if(!button)return;if(button.classList.contains('jump-to-results')){el.querySelector('.discovery-browser').scrollIntoView({block:'start',behavior:'smooth'});return}if(button.dataset.openTheme){openDiscoveryTheme(button.dataset.openTheme);return}if(button.dataset.interest){homeState.interest=button.dataset.interest;homeState.discipline='all';el.querySelector('#catalog-discipline').value='all';el.querySelectorAll('[data-interest]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.interest===homeState.interest)));renderDiscoveryResults();writeHomeNavigation()}if(button.dataset.catalogView){homeState.view=button.dataset.catalogView;el.querySelectorAll('[data-catalog-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.catalogView===homeState.view)));renderDiscoveryResults();writeHomeNavigation()}if(button.classList.contains('home-saved')){const t=themes.findIndex(t=>trip[0]?.themes.includes(t.id));if(t>=0){enterTheme(t);switchPanel('trip')}}if(button.classList.contains('reset-discovery')){homeState.query='';homeState.interest='all';homeState.discipline='all';homeState.area='all';writeHomeNavigation();renderDiscoveryCatalog()}};
 renderDiscoveryResults();mountHeroCarousel();
}
function renderDiscoveryResults(){
 const disciplineFilter=document.querySelector('#cultural-discipline-filter');
 if(disciplineFilter){const visible=homeState.interest==='art';disciplineFilter.hidden=!visible;disciplineFilter.style.display=visible?'':'none'}
 const matched=matchingDiscovery(),el=document.querySelector('#catalog-results');if(!el)return;
 const routeResults=matchingDiscoveryRoutes(),themesView=homeState.view==='themes',count=themesView?matched.length:routeResults.length;
 const feedback=document.querySelector('#search-feedback');
 if(feedback)feedback.textContent=homeState.query?`找到 ${matched.length} 张地图 / ${routeResults.length} 条行程`:'例如 国家公园、京都、莫奈';
 document.querySelector('#catalog-result-count').textContent=`${count} ${themesView?'张主题地图':'条精选行程'}`+(homeState.query?' · “'+homeState.query+'”':'');
 el.className=themesView?'discovery-theme-grid':'discovery-route-grid';
 if(!count){
  el.className='';
  el.innerHTML=`<div class="discovery-empty"><h3>还没有符合这些条件的${themesView?'地图':'行程'}</h3><p>${themesView&&routeResults.length?'有 '+routeResults.length+' 条相关行程，可切换到精选行程查看。':'试试更短的关键词，或清除地域与兴趣筛选。'}</p>${themesView&&routeResults.length?'<button data-catalog-view="routes">查看精选行程</button>':''}<button class="reset-discovery">清除筛选</button></div>`;
  return;
 }
 if(themesView)el.innerHTML=matched.map(discoveryThemeCard).join('');
 else{el.innerHTML=routeResults.map(discoveryItineraryHTML).join('');bindDiscoveryPlans(el)}
}
function openDiscoveryTheme(id){const i=themes.findIndex(t=>t.id===id);if(i<0)return;enterTheme(i);writeNavigation()}
function worksForTheme(id){const theme=themes.find(t=>t.id===id);return artWorks.filter(w=>(w.theme||'impressionism')===id||(theme?.artThemes?.includes(w.theme)&&places.some(p=>p.id===w.placeId&&p.themes.includes(id))))}

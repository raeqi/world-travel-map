'use strict';
// Collection entrances organize existing research. They never generate a combined route.
const culturalCollectionDefinitions=[
 {id:'modern-architecture',name:'现代建筑：居住与地景',members:['wright','le-corbusier','aalto'],note:'按美国、法国、日本与芬兰的建筑分区阅读，不把跨国作品串成一次行程。'},
 {id:'setouchi-art',name:'濑户内艺术与空间',members:['ando',{id:'noguchi',keys:['noguchi-mure']},{id:'turrell',keys:['minamidera']},{id:'sugimoto',keys:['sugimoto-glass']}],note:'仅收录直岛与香川牟礼的现有地点；小田原、纽约和亚利桑那不属于本合集。建筑与艺术作品分别注明作者。'},
 {id:'sculpture-studios',name:'雕塑家的工作室与花园',members:['rodin','brancusi','hepworth','noguchi','giacometti','henry-moore'],note:'工作室、庭园、馆藏与公共雕塑分开阅读；同题铸本不默认是唯一原作。'},
 {id:'southern-france-painters',name:'南法画家的生活与风景',members:['cezanne','matisse',{id:'chagall',keys:['saint-paul-vence']}],related:['vangogh','impressionism'],note:'从普罗旺斯到尼斯与旺斯；夏加尔仅纳入南法地点，故乡维捷布斯克仍在完整人物专题。另可对读原有梵高与印象派主题。'},
 {id:'spanish-painters',name:'西班牙画家：城市与馆藏',members:['sorolla','picasso'],related:['dali','gaudi'],note:'按画家的西班牙生活与海外馆藏对读，不把巴黎或美国的馆藏归作西班牙现场。'},
 {id:'japanese-painting',name:'日本画与风景观看',members:['hiroshige','higashiyama'],related:['hokusai'],note:'版画、绘画关联地和收藏地分别定位；北斋原有多段主题可继续独立探索。'},
 {id:'chinese-painting',name:'中国画家的游历与生活',members:['zhang-daqian','wu-guanzhong','qi-baishi','huang-binhong','feng-zikai'],note:'山水、写生、园林与迁居按人物分读；吴冠中的巴黎阶段作为海外关联，不归入中国地理。'},
 {id:'frida-rivera',name:'弗里达与里维拉：生活与壁画',members:['frida','rivera'],note:'从墨西哥生活空间到美国壁画与馆藏，保留两位作者各自的地点关系。'},
 {id:'photography-places',name:'摄影家的观看与旅居',members:['ansel-adams','cartier-bresson','lee-miller','sugimoto'],note:'摄影地点、生活空间与观看装置按地区分读；不是摄影史全景或一次跨洲旅行。'},
 {id:'european-classical-music',name:'欧洲古典音乐：居所与创作',members:['beethoven','chopin','liszt','schumanns','wagner','mahler','dvorak','mendelssohn','handel'],related:['bach','mozart'],note:'欧洲音乐家的居住与创作网络；德沃夏克的美国经历明确为海外支线。巴赫与莫扎特原主题保留。'},
 {id:'nordic-music',name:'北欧音乐与地景',members:['sibelius','grieg'],note:'芬兰与挪威分别探索，不把北欧地景拼成固定音乐旅行路线。'},
 {id:'british-countryside',name:'英国乡野：画家与诗人',members:['constable','wordsworth'],related:['austen'],note:'萨福克与湖区是不同地区的两组观看线索；奥斯汀原有乡野行程另作对读。'},
 {id:'italian-art-journeys',name:'意大利艺术旅行与创作',members:['turner','goethe','puccini'],note:'透纳与歌德的旅行、普契尼的托斯卡纳生活形成不同叙事；不暗示三人同行或足迹同序。'},
 {id:'tang-song-poets',name:'唐宋诗人的山川与城市',members:['su-shi','li-bai','du-fu','wang-wei','bai-juyi','lu-you'],note:'按诗人、任职、贬谪与旅次认识地点，不把不同时代与年份拼成一条路。'},
 {id:'modern-chinese-literature',name:'中国现代文学的流动人生',members:['shen-congwen','xiao-hong'],note:'湘西、东北与迁居城市各自成线，保留作品阅读与人物生平的区别。'},
 {id:'japanese-literature',name:'日本文学的旅行与生活',members:['basho','kawabata','soseki'],note:'游记、小说地景与迁居分别阅读；夏目漱石的伦敦支线明确列作海外经历。'},
 {id:'european-writers',name:'欧洲作家的城市与记忆',members:['hugo','byron','dickens','kafka','joyce','proust'],related:['austen','italian-art-journeys','british-countryside'],note:'以城市、流亡与记忆为索引，各人物网络独立选择，不设跨国总行程。'},
 {id:'american-literature',name:'美洲文学的地方叙事',members:['hemingway','steinbeck','mark-twain','marquez'],related:['neruda'],note:'美国、古巴与哥伦比亚分别阅读；聂鲁达的智利住宅保留特色入口。'}
];
const culturalFeaturedIds=['gaudi','dali','utah-land-art','okeeffe','gauguin','christo-jeanneclaude','munch','neruda','tagore','mahfouz'];
const culturalCollections=new Map();
let collectionPerson='';
function collectionMembers(collection){return collection.members.map(m=>typeof m==='string'?{id:m}:m)}
function collectionMemberPlaces(member){const ids=atlasThemePlaceIds.get(member.id);return (ids||places.filter(p=>p.themes.includes(member.id)).map(p=>p.id)).map(id=>places.find(p=>p.id===id)).filter(p=>!member.keys||member.keys.some(key=>atlasContextByPlace.get(p.id)?.contexts.get(member.id)?.key===key))}
function collectionContexts(record,id){const collection=culturalCollections.get(id);return collection?collectionMembers(collection).filter(m=>collectionMemberPlaces(m).some(p=>p.id===record.place.id)).map(m=>record.contexts.get(m.id)).filter(Boolean):[]}
for(const definition of culturalCollectionDefinitions){
 const id='collection-'+definition.id,collection={...definition,id};culturalCollections.set(id,collection);
 const members=collectionMembers(collection),sources=members.map(m=>themes.find(t=>t.id===m.id)),nodes=[...new Set(members.flatMap(collectionMemberPlaces))];
 if(sources.some(t=>!t)||!nodes.length)throw Error('Invalid cultural collection: '+id);
 for(const p of nodes)if(!p.themes.includes(id))p.themes.push(id);
 const first=sources[0],disciplines=[...new Set(sources.flatMap(themeDisciplines))],intro=definition.note+' 这是关联合集；进入人物子线后分别安排探访。当前内容仍是首批精选，未因合并而补齐生平或全部作品。';
 themes.push({id,name:definition.name,title:definition.name,story:definition.note,introduction:intro,scope:'关联合集 · 按地区与人物分读 · 无总路线',collection:true,disciplines,filters:[],fields:['地点关系','现场观察'],view:definition.id==='setouchi-art'?{lon:134.04,lat:34.4,zoom:80}:first.view,symbol:first.symbol,colors:{...first.colors}});
 themeDesigns[id]={...themeDesigns[first.id],lens:'专题合集 · 先选地区或人物',note:'各子线独立探索，不设跨地区顺序、总天数或全年适游承诺。',line:'合集地点分布 · 无连续路线'};
 themeGlyphs[id]=themeGlyphs[first.id];themeMedia[id]={...themeMedia[first.id],en:'CULTURAL COLLECTION',edition:definition.name,motif:'关联合集 · 地区与人物索引'};
 const firstStory=editionStories[first.id];if(firstStory)editionStories[id]={...firstStory,headline:definition.name,body:intro,tag:'专题合集'};
 const areas=[...new Set(nodes.flatMap(placeRouteAreas))];
 discoveryMeta[id]=['art',areas,[definition.name,definition.note,...sources.map(t=>t.name+' '+t.id+' '+t.story)].join(' ')];
}
for(const t of culturalAtlasPack.themes)themes.find(x=>x.id===t.id).catalogHidden=!culturalFeaturedIds.includes(t.id);
function visibleCatalogueThemes(){return themes.filter(t=>!t.catalogHidden)}
function culturalCollectionPlaceMatches(p){const collection=culturalCollections.get(themes[activeTheme].id);return !collection||!collectionPerson||collectionMemberPlaces(collectionMembers(collection).find(m=>m.id===collectionPerson)||{id:''}).includes(p)}
function culturalCollectionSearchText(p){const collection=culturalCollections.get(themes[activeTheme].id);return collection?collectionContexts(atlasContextByPlace.get(p.id)||{place:p,contexts:new Map()},collection.id).map(c=>c.themeName).join(' '):''}
function collectionDirectoryHTML(collection){
 const members=collectionMembers(collection),all=members.flatMap(collectionMemberPlaces),regions=[...new Set(all.map(p=>p.country))].sort();
 return `<p class="collection-intro">${escapeHTML(collection.note)}</p><div class="collection-controls"><label>人物 / 子线<select id="collection-person"><option value="">全部人物</option>${members.map(m=>`<option value="${m.id}" ${collectionPerson===m.id?'selected':''}>${escapeHTML(themes.find(t=>t.id===m.id).name)}</option>`).join('')}</select></label><label>地区 / 国家<select id="collection-region"><option value="">全部地区</option>${regions.map(r=>`<option ${document.querySelector('#region-filter').value===r?'selected':''}>${escapeHTML(r)}</option>`).join('')}</select></label></div><div id="collection-members"></div>${collection.related?.length?`<div class="collection-related"><strong>继续对读</strong>${collection.related.map(id=>{const target=themes.find(t=>t.id===id)||themes.find(t=>t.id==='collection-'+id);return `<a href="#theme=${target.id}&view=places" data-collection-theme="${target.id}">${escapeHTML(target.name)} ↗</a>`}).join('')}</div>`:''}`;
}
function renderCollectionMembers(collection){
 const el=document.querySelector('#collection-members');if(!el)return;
 const region=document.querySelector('#region-filter').value;
 const members=collectionMembers(collection).filter(m=>!collectionPerson||collectionPerson===m.id).map(m=>({...m,nodes:collectionMemberPlaces(m).filter(p=>!region||p.country===region||p.region===region)})).filter(m=>m.nodes.length);
 el.innerHTML=members.map(m=>{const source=themes.find(t=>t.id===m.id),all=collectionMemberPlaces(m),partial=all.length<places.filter(p=>p.themes.includes(m.id)).length;return `<article class="collection-member"><h3>${escapeHTML(source.name)}</h3><p>${m.nodes.map(p=>`<button data-collection-place="${p.id}">${escapeHTML(p.name)} <small>${escapeHTML(p.country)}</small></button>`).join('')}</p><small>${partial?'本合集仅收录当地地点；完整人物专题另有其他地区。':'人物地点网络独立保留，按当地情况分区探访。'}</small><a href="#theme=${m.id}&view=plans" data-collection-theme="${m.id}" data-collection-view="plans">打开完整人物子线 ↗</a></article>`}).join('')||'<p>这个地区暂无符合的人物子线，试试全部人物或全部地区。</p>';
 el.querySelectorAll('[data-collection-place]').forEach(b=>b.onclick=()=>select(placesById.get(b.dataset.collectionPlace)));
 bindCollectionThemeLinks(el);
}
function bindCollectionThemeLinks(el){el.querySelectorAll('[data-collection-theme]').forEach(a=>a.onclick=e=>{e.preventDefault();enterTheme(themes.findIndex(t=>t.id===a.dataset.collectionTheme));if(a.dataset.collectionView==='plans')switchPanel('plans',false);writeNavigation()})}
function renderCulturalCollectionDirectory(){
 document.querySelector('#cultural-collection-directory')?.remove();
 const id=themes[activeTheme].id,collection=culturalCollections.get(id),parents=[...culturalCollections.values()].filter(c=>collectionMembers(c).some(m=>m.id===id));
 if(!collection&&!parents.length)return;
 const section=document.createElement('section');section.id='cultural-collection-directory';section.className='cultural-collection-directory';section.setAttribute('aria-label',collection?'合集地区与人物子线':'所属专题合集');
 section.innerHTML=collection?`<h2>按地区与人物找子线</h2>${collectionDirectoryHTML(collection)}`:`<p>所属专题合集</p>${parents.map(c=>`<a href="#theme=${c.id}&view=places" data-collection-theme="${c.id}">${escapeHTML(c.name)} ↗</a>`).join('')}`;
 document.querySelector('#theme-reading').after(section);bindCollectionThemeLinks(section);
 if(!collection)return;
 renderCollectionMembers(collection);
 section.querySelector('#collection-person').onchange=e=>{collectionPerson=e.target.value;leaveRoute(false);selected=null;document.querySelector('#detail').hidden=true;filterCacheKey='';renderList();renderCollectionMembers(collection);writeNavigation(true)};
 section.querySelector('#collection-region').onchange=e=>{document.querySelector('#region-filter').value=e.target.value;leaveRoute(false);selected=null;document.querySelector('#detail').hidden=true;filterCacheKey='';renderList();renderCollectionMembers(collection);writeNavigation(true)};
}
discoveryIndex=null;readingPlans=null;

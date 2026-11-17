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
const culturalCollectionLeads={"modern-architecture":"从赖特的乡野与沙漠，到柯布西耶的城市建筑与阿尔托的北欧日常。","setouchi-art":"在直岛和香川牟礼，走近建筑、雕塑与光的空间。","sculpture-studios":"走进工作室、花园和城市，观察雕塑怎样与周围空间相处。","southern-france-painters":"从塞尚的艾克斯，到马蒂斯与夏加尔生活的尼斯、旺斯。","spanish-painters":"从巴塞罗那、瓦伦西亚到相关馆藏，认识毕加索与索罗亚。","japanese-painting":"从东海道版画到山水风景，看看广重与东山魁夷眼中的日本。","chinese-painting":"跟着张大千、吴冠中、齐白石、黄宾虹与丰子恺，走进画家的生活与山水。","frida-rivera":"在蓝屋、壁画和城市中，对读弗里达与里维拉。","photography-places":"从优胜美地到城市街巷，寻找摄影家的观看线索。","european-classical-music":"在居所、作曲小屋与音乐城市里，认识作品之外的生活。","nordic-music":"在芬兰与挪威的居所和风景中，认识西贝柳斯与格里格。","british-countryside":"从康斯太勃尔的萨福克到华兹华斯的湖区，读英国乡野的两种目光。","italian-art-journeys":"看看透纳与歌德旅行中的意大利，再去普契尼生活的托斯卡纳。","tang-song-poets":"从山川到任职与旅居的城市，把诗人放回具体地方。","modern-chinese-literature":"从沈从文的湘西到萧红的东北，读地方与人生如何相遇。","japanese-literature":"在芭蕉、川端康成和夏目漱石的旅行与日常之间，读日本文学。","european-writers":"从雨果的巴黎到卡夫卡与乔伊斯的城市，寻找文字里的地方记忆。","american-literature":"从密西西比河到加勒比，走进海明威、斯坦贝克、马克·吐温与马尔克斯的地方世界。"};
const culturalFeaturedIds=['gaudi','dali','utah-land-art','okeeffe','gauguin','christo-jeanneclaude','munch','neruda','tagore','mahfouz'];
const culturalCollections=new Map();
let collectionPerson='';
function collectionMembers(collection){return collection.members.map(m=>typeof m==='string'?{id:m}:m)}
function collectionMemberPlaces(member){const ids=atlasThemePlaceIds.get(member.id);return (ids||places.filter(p=>p.themes.includes(member.id)).map(p=>p.id)).map(id=>places.find(p=>p.id===id)).filter(p=>!member.keys||member.keys.some(key=>atlasContextByPlace.get(p.id)?.contexts.get(member.id)?.key===key))}
function collectionMemberPhoto(member,nodes=collectionMemberPlaces(member)){
 for(const place of nodes){const context=atlasContextByPlace.get(place.id)?.contexts.get(member.id),key=context&&'atlas-'+context.key;if(key&&photoLibrary[key]&&!photoLibrary[key].illustration)return {key,place,member:member.id};}
 return null;
}
function collectionCountryName(place){return countrySearchNames[place.country]||place.country}
function collectionRegions(collection){return [...new Set(collectionMembers(collection).flatMap(collectionMemberPlaces).map(collectionCountryName))].sort()}
function collectionRegionMatches(place,region){return !region||place.region===region||place.country===region||collectionCountryName(place)===(countrySearchNames[region]||region)}
function collectionHasFilters(collection){const members=collectionMembers(collection);return members.length>=5||(members.length>=3&&collectionRegions(collection).length>=3);}
function collectionContexts(record,id){const collection=culturalCollections.get(id);return collection?collectionMembers(collection).filter(m=>collectionMemberPlaces(m).some(p=>p.id===record.place.id)).map(m=>record.contexts.get(m.id)).filter(Boolean):[]}
function culturalCollectionView(nodes){
 const reference=nodes[0].lon,lons=nodes.map(p=>reference+((p.lon-reference+540)%360)-180),lats=nodes.map(p=>p.lat);
 const lon=((Math.min(...lons)+Math.max(...lons))/2+540)%360-180,lat=(Math.min(...lats)+Math.max(...lats))/2;
 const radius=Math.max(1,...nodes.map(p=>distanceKm({lon,lat},p)));
 return {lon,lat,zoom:Math.max(.8,Math.min(60,.72/Math.sin(Math.min(Math.PI/2,radius/6371))))};
}
for(const definition of culturalCollectionDefinitions){
 const id='collection-'+definition.id,collection={...definition,id};culturalCollections.set(id,collection);
 const members=collectionMembers(collection),sources=members.map(m=>themes.find(t=>t.id===m.id)),nodes=[...new Set(members.flatMap(collectionMemberPlaces))];
 if(sources.some(t=>!t)||!nodes.length)throw Error('Invalid cultural collection: '+id);
 for(const p of nodes)if(!p.themes.includes(id))p.themes.push(id);
 const first=sources[0],disciplines=[...new Set(sources.flatMap(themeDisciplines))],intro=culturalCollectionLeads[definition.id];
 collection.covers=members.map(m=>collectionMemberPhoto(m)).filter(Boolean).filter((p,i,a)=>a.findIndex(x=>x.key===p.key)===i).slice(0,2);
 themes.push({id,name:definition.name,title:definition.name,story:intro,introduction:intro,scope:sources.length+'个人物故事 · '+nodes.length+'处地点',collection:true,disciplines,filters:[],fields:['地点关系','现场观察'],view:culturalCollectionView(nodes),symbol:first.symbol,colors:{...first.colors}});
 themeDesigns[id]={...themeDesigns[first.id],lens:'人物与地方',note:intro,line:'人物与地点分布'};
 themeGlyphs[id]=themeGlyphs[first.id];themeMedia[id]={...themeMedia[first.id],en:'PEOPLE & PLACES',edition:definition.name,motif:intro};
 const firstStory=editionStories[first.id],covers=collection.covers;if(covers.length){themeMedia[id].photo=covers[0].key;editionStories[id]={...firstStory,photo:covers[0].key,second:covers[1]?.key,headline:definition.name,caption:covers.map(c=>c.place.name).join(' / '),body:intro,detail:'',tag:'人物与地方'};}else if(firstStory)editionStories[id]={...firstStory,headline:definition.name,body:intro,tag:'人物与地方'};
 const areas=[...new Set(nodes.flatMap(placeRouteAreas))];
 discoveryMeta[id]=['art',areas,[definition.name,definition.note,...sources.map(t=>t.name+' '+t.id+' '+t.story)].join(' ')];
}
for(const t of culturalAtlasPack.themes)themes.find(x=>x.id===t.id).catalogHidden=!culturalFeaturedIds.includes(t.id);
function visibleCatalogueThemes(){return themes.filter(t=>!t.catalogHidden)}
function culturalCollectionPlaceMatches(p){const collection=culturalCollections.get(themes[activeTheme].id);return !collection||!collectionPerson||collectionMemberPlaces(collectionMembers(collection).find(m=>m.id===collectionPerson)||{id:''}).includes(p)}
function culturalCollectionSearchText(p){const collection=culturalCollections.get(themes[activeTheme].id);return collection?collectionContexts(atlasContextByPlace.get(p.id)||{place:p,contexts:new Map()},collection.id).map(c=>c.themeName).join(' '):''}
function collectionDirectoryHTML(collection){
 const members=collectionMembers(collection),all=[...new Set(members.flatMap(collectionMemberPlaces))],regions=collectionRegions(collection),active=collectionPerson||document.querySelector('#region-filter').value;
 return `<div class="collection-topline"><span>${members.length}个人物故事 · ${all.length}处地点</span>${collectionHasFilters(collection)?`<details class="collection-find" ${active?'open':''}><summary>筛选</summary><div class="collection-controls"><label>人物<select id="collection-person"><option value="">全部人物</option>${members.map(m=>`<option value="${m.id}" ${collectionPerson===m.id?'selected':''}>${escapeMediaText(themes.find(t=>t.id===m.id).name)}</option>`).join('')}</select></label>${regions.length>1?`<label>地区<select id="collection-region"><option value="">全部地区</option>${regions.map(r=>`<option ${document.querySelector('#region-filter').value===r?'selected':''}>${escapeMediaText(r)}</option>`).join('')}</select></label>`:''}</div></details>`:''}</div><div id="collection-filter-state"></div><div id="collection-members"></div>${collection.related?.length?`<div class="collection-related"><span>继续探索</span>${collection.related.map(id=>{const target=themes.find(t=>t.id===id)||themes.find(t=>t.id==='collection-'+id);return `<a href="#theme=${target.id}&view=places" data-collection-theme="${target.id}">${escapeMediaText(target.name)} ↗</a>`}).join('')}</div>`:''}`;
}
function collectionCoverHTML(id,interactive=false){
 const collection=culturalCollections.get(id);if(!collection?.covers.length)return '';
 return `<div class="collection-cover-images">${collection.covers.map(cover=>{const source=themes.find(t=>t.id===cover.member),image=mediaImage(cover.key);return `<div class="collection-cover-tile">${interactive?mediaOpenHTML(cover.key,image,'read-plate'):image}<span>${escapeMediaText(source.name)}<small>${escapeMediaText(cover.place.name)}</small></span></div>`}).join('')}</div>`;
}
function renderCollectionMembers(collection){
 const el=document.querySelector('#collection-members');if(!el)return;
 const region=document.querySelector('#region-filter').value;
 const members=collectionMembers(collection).filter(m=>!collectionPerson||collectionPerson===m.id).map(m=>({...m,nodes:collectionMemberPlaces(m).filter(p=>collectionRegionMatches(p,region))})).filter(m=>m.nodes.length);
 el.innerHTML=members.map(m=>{const source=themes.find(t=>t.id===m.id),pack=culturalAtlasPack.themes.find(t=>t.id===m.id),photo=collectionMemberPhoto(m,m.nodes);return `<article class="collection-member" data-member="${m.id}"><h3>${escapeMediaText(source.name)}</h3><div class="collection-person-content">${photo?`<div class="collection-person-image" data-image-place="${photo.place.id}">${mediaOpenHTML(photo.key)}</div>`:''}<div><p class="collection-person-story">${escapeMediaText(pack?.tagline||source.name)}</p><div class="collection-place-links">${m.nodes.map(p=>`<button type="button" data-collection-place="${p.id}">${escapeMediaText(p.name)}<small>${escapeMediaText(collectionCountryName(p))}</small></button>`).join('')}</div></div></div><a class="collection-person-map" href="#theme=${m.id}&view=plans" data-collection-theme="${m.id}" data-collection-view="plans">查看人物地图 ↗</a>${photo?`<div class="collection-photo-credit">${mediaCaptionHTML([photo.key],photo.place.name,false)}</div>`:''}</article>`}).join('')||'<p class="collection-empty">这里暂时没有匹配的人物，试试其他地区或清除筛选。</p>';
 el.querySelectorAll('[data-collection-place]').forEach(b=>b.onclick=()=>select(placesById.get(b.dataset.collectionPlace)));
 bindCollectionThemeLinks(el);
}
function renderCollectionFilterState(collection){
 const el=document.querySelector('#collection-filter-state');if(!el)return;
 const region=document.querySelector('#region-filter').value,person=themes.find(t=>t.id===collectionPerson)?.name;
 el.innerHTML=person||region?`<div class="collection-active-filter"><span>${[person,region].filter(Boolean).map(escapeMediaText).join(' · ')}</span><button type="button" data-clear-collection>清除筛选 ×</button></div>`:'';
 el.querySelector('[data-clear-collection]')?.addEventListener('click',()=>{collectionPerson='';document.querySelector('#region-filter').value='';const person=document.querySelector('#collection-person'),region=document.querySelector('#collection-region');if(person)person.value='';if(region)region.value='';updateCollectionResults(collection);(document.querySelector('.collection-find summary')||document.querySelector('[data-collection-place]'))?.focus({preventScroll:true})});
}
function updateCollectionResults(collection){leaveRoute(false);selected=null;document.querySelector('#detail').hidden=true;filterCacheKey='';renderList();renderCollectionMembers(collection);renderCollectionFilterState(collection);fitRoute(filtered());writeNavigation(true)}
function bindCollectionThemeLinks(el){el.querySelectorAll('[data-collection-theme]').forEach(a=>a.onclick=e=>{e.preventDefault();enterTheme(themes.findIndex(t=>t.id===a.dataset.collectionTheme));if(a.dataset.collectionView==='plans')switchPanel('plans',false);writeNavigation()})}
function renderCulturalCollectionDirectory(){
 document.querySelector('#cultural-collection-directory')?.remove();
 const id=themes[activeTheme].id,collection=culturalCollections.get(id),parents=[...culturalCollections.values()].filter(c=>collectionMembers(c).some(m=>m.id===id));document.body.dataset.collection=collection?'true':'false';
 if(!collection&&!parents.length)return;
 if(collection){const select=document.querySelector('#region-filter');for(const region of collectionRegions(collection)){if(![...select.options].some(o=>o.value===region)){const option=document.createElement('option');option.value=region;option.textContent=region;select.append(option)}}const normalized=countrySearchNames[select.value];if(normalized)select.value=normalized;}
 const section=document.createElement('section');section.id='cultural-collection-directory';section.className='cultural-collection-directory';section.setAttribute('aria-label',collection?'人物与地点':'相关专题');
 section.innerHTML=collection?collectionDirectoryHTML(collection):`<span class="collection-parent-label">相关专题</span>${parents.map(c=>`<a href="#theme=${c.id}&view=places" data-collection-theme="${c.id}">${escapeMediaText(c.name)} ↗</a>`).join('')}`;
 if(collection)document.querySelector('#discover-panel').prepend(section);else document.querySelector('#theme-reading').after(section);bindCollectionThemeLinks(section);
 if(!collection)return;
 renderCollectionMembers(collection);renderCollectionFilterState(collection);fitRoute(filtered());
 const person=section.querySelector('#collection-person'),region=section.querySelector('#collection-region');
 if(person)person.onchange=e=>{collectionPerson=e.target.value;updateCollectionResults(collection)};
 if(region)region.onchange=e=>{document.querySelector('#region-filter').value=e.target.value;updateCollectionResults(collection)};
}
discoveryIndex=null;readingPlans=null;

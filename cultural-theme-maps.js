'use strict';
// Every map owns physical places and concrete regional plans. Original person
// themes remain valid destinations for old URLs and specific person searches.
const culturalThemeMaps=new Map();
function culturalMapMembers(map){return map.members.map(m=>typeof m==='string'?{id:m}:m)}
function culturalMemberPlaces(member){
 return places.filter(p=>p.themes.includes(member.id)&&(!member.places||member.places.includes(p.id))&&(!member.country||p.country===member.country)&&(!member.keys||member.keys.includes(atlasContextByPlace.get(p.id)?.contexts.get(member.id)?.key)));
}
function culturalMapContexts(record,id){
 const map=culturalThemeMaps.get(id);
 return map?culturalMapMembers(map).filter(m=>culturalMemberPlaces(m).includes(record.place)).map(m=>record.contexts.get(m.id)).filter(Boolean):[];
}
function culturalMapView(nodes,maxZoom=4000){
 const reference=nodes[0].lon,lons=nodes.map(p=>reference+((p.lon-reference+540)%360)-180),lats=nodes.map(p=>p.lat);
 const lon=((Math.min(...lons)+Math.max(...lons))/2+540)%360-180,lat=(Math.min(...lats)+Math.max(...lats))/2;
 const radius=Math.max(1,...nodes.map(p=>distanceKm({lon,lat},p)));
 return {lon,lat,zoom:Math.max(.8,Math.min(maxZoom,.72/Math.sin(Math.min(Math.PI/2,radius/6371))))};
}
function culturalPlaceRef(ref){return places.find(p=>p.id===ref)||[...atlasContextByPlace.values()].find(r=>[...r.contexts.values()].some(c=>c.key===ref))?.place}
// The existing full-width Hiroshige image has a verified creator and licence,
// but its file page does not establish the owner of this particular impression.
artWorks.push({key:'atlas-yui',theme:'hiroshige',title:'东海道五十三次 · 由井 薩埵嶺',original:'Tōkaidō Gojūsan-tsugi: Yui, Satta Pass',artist:'歌川广重',year:'约1833–1834',placeId:culturalPlaceRef('yui').id,subject:'由比与萨埵岭一带',context:'广重以近处山坡、旅人、海湾和远处富士形成层层展开的风景，可与北斋《骏州江尻》的风势与留白对读。地图按由比区域定位，图片是历史版画。Commons文件页没有确立图示摺本的现藏机构，不把它归入由比美术馆或其他馆藏。',museumId:null,collection:'图示摺本的现藏机构尚未核实',record:'https://commons.wikimedia.org/wiki/File:Tokaido16_Yui.jpg',recordLabel:'图像文件与版本资料'});
// Independent maps are visible again when no strong regional/story connection
// justifies a merge (e.g. Hulan and Xiangxi, or Finland and Bergen).
for(const source of culturalAtlasPack.themes){const t=themes.find(t=>t.id===source.id);Object.assign(t,{catalogHidden:false,maxZoom:4000,view:culturalMapView(places.filter(p=>p.themes.includes(source.id)))});}
for(const definition of culturalMapDefinitions){
 const members=culturalMapMembers(definition),nodes=[...new Set([...members.flatMap(culturalMemberPlaces),...(definition.extraPlaces||[]).map(culturalPlaceRef)])],sources=members.map(m=>themes.find(t=>t.id===m.id));
 if(!nodes.length||sources.some(t=>!t))throw Error('Invalid cultural map '+definition.id);
 const first=sources[0],id=definition.id;
 culturalThemeMaps.set(id,definition);atlasThemePlaceIds.set(id,nodes.map(p=>p.id));
 for(const place of nodes)if(!place.themes.includes(id))place.themes.push(id);
 const filters=[...new Set(nodes.map(p=>{
  const contexts=culturalMapContexts(atlasContextByPlace.get(p.id)||{place:p,contexts:new Map()},id);
  return contexts.length?atlasRelationNames[contexts[0].relation]:p.type;
 }))];
 themes.push({id,maxZoom:40000,name:definition.name,title:definition.name,story:definition.intro,introduction:definition.intro,scope:'主题地点与区域探访',disciplines:[...new Set(sources.flatMap(themeDisciplines))],filters,fields:['地点关系','现场观察'],view:culturalMapView(nodes),symbol:first.symbol,colors:{...first.colors},artThemes:definition.artThemes||[]});
 themeDesigns[id]={...themeDesigns[first.id],lens:definition.lens,note:definition.intro,line:'区域探访 · 地点关系图'};
 themeGlyphs[id]=themeGlyphs[first.id];
 // Reuse only an image tied to a place actually on this map, retaining its credit.
 const hero=nodes.map(p=>editorialPlacePhotos[p.id]).find(key=>photoLibrary[key]&&!photoLibrary[key].illustration)||themeMedia[first.id].photo;
 if(!nodes.some(p=>editorialPlacePhotos[p.id]===hero))throw Error('No place-bound cover for '+id);
 themeMedia[id]={...themeMedia[first.id],photo:hero,en:id.toUpperCase().replaceAll('-',' '),edition:definition.name,motif:definition.lens};
 editionStories[id]={photo:hero,second:hero,headline:definition.name,body:definition.intro,caption:photoLibrary[hero].title,tag:'艺术与地方',detail:definition.lens};
 discoveryMeta[id]=['art',[...new Set(nodes.flatMap(placeRouteAreas))],[definition.name,definition.intro,...sources.map(t=>t.name+' '+t.id+' '+t.story)].join(' ')];
 for(const [key,name,refs,days,months,transport,reason] of definition.plans){
  const stops=refs.map(culturalPlaceRef);
  if(stops.some(p=>!p||!nodes.includes(p)))throw Error('Invalid regional plan '+key+': '+refs.join(', '));
  planTemplates.push({id:key,theme:id,name,ids:stops.map(p=>p.id),days,months,transport,reason,topology:'network',climate:stops[0].source});
 }
 for(const member of members){
  const source=themes.find(t=>t.id===member.id);
  if(culturalAtlasPack.themes.some(t=>t.id===member.id)){
   source.catalogHidden=true;
   // A full person map can still be found explicitly, including distant places
   // deliberately excluded from a regional map. No directory screen is involved.
   source.personSearch=source.name;
  }
 }
}
// A source map may leave the default catalogue only after *every* source
// context has a discoverable home. A name-only search or a valid old URL is
// insufficient: regional selections deliberately omit some distant places.
function culturalSourceCoverage(id){
 const nodes=places.filter(p=>p.themes.includes(id));
 const maps=[...culturalThemeMaps.values()].filter(d=>d.id!==id&&!themes.find(t=>t.id===d.id)?.catalogHidden&&(d.originMaps?.includes(id)||culturalMapMembers(d).some(m=>m.id===id)));
 return nodes.map(place=>({place,maps:maps.filter(d=>d.originMaps?.includes(id)?place.themes.includes(d.id):culturalMapMembers(d).some(m=>m.id===id&&culturalMemberPlaces(m).includes(place))).map(d=>d.id)}));
}
for(const source of culturalAtlasPack.themes){
 const theme=themes.find(t=>t.id===source.id);
 if(theme.catalogHidden&&culturalSourceCoverage(source.id).some(row=>!row.maps.length))theme.catalogHidden=false;
}
// Gaudí's three places and contexts are fully covered by Barcelona. The old
// edition and its itinerary remain available through search and existing links.
// The rejected Xiangxi + Northeast merge becomes two independent, useful maps.
for(const [id,name,intro,months,days] of [
 ['shen-congwen','湘西：沿沅水读沈从文','常德、桃源、浦市与凤凰，分别对应返乡的出发、登舟、水路终点与故乡。从码头、街巷与劳动生活读《湘行散记》，不把今天的公路连线称作历史水路。',[3,4,5,9,10,11],5],
 ['xiao-hong','呼兰与哈尔滨：萧红的生活与写作','童年宅院与后园、呼兰老城、哈尔滨的商市街街区，将《呼兰河传》的记忆与早期写作生活放回具体地方。故居的纪念陈列、小说场景与城市原址分别阅读。',[5,6,7,8,9],3]
]){
 const t=themes.find(t=>t.id===id),nodes=places.filter(p=>p.themes.includes(id));
 Object.assign(t,{name,title:name,story:intro,introduction:intro,view:culturalMapView(nodes)});
 Object.assign(themeDesigns[id],{lens:name,note:intro});Object.assign(themeMedia[id],{edition:name,motif:intro});
 Object.assign(editionStories[id],{headline:name,body:intro,detail:'从作品中的地方，走向可以观察的真实空间。'});
 discoveryMeta[id][2]+=' 中国现代文学 '+name+' '+intro;
 const plan=planTemplates.find(p=>p.id==='atlas-'+id+'-places');
 Object.assign(plan,{name,ids:nodes.map(p=>p.id),days,months,transport:'区域公共交通 / 当地接驳 + 分区步行',reason:intro+' 天数为当代探访参考；入室访问、交通与展览安排向当地机构确认。'});
}
planTemplates.push(
 {id:'shen-yuan-river',theme:'shen-congwen',name:'沅水三地 · 从常德到浦市',ids:['changde','taoyuan-river','pushi'].map(ref=>culturalPlaceRef(ref).id),days:4,months:[3,4,5,9,10,11],transport:'当代公路 / 公共交通 + 河岸分区步行',reason:'常德、桃源登舟与浦市上岸，是阅读1934年返湘水行的三个节点。今天分地探访，不承诺沿原水路有连续客船，更不把凤凰接成同一条河流上的下一站。',topology:'network',climate:'https://www.chinawriter.com.cn/n1/2020/0730/c419384-31803389.html'},
 {id:'xiaohong-home-writing',theme:'xiao-hong',name:'从呼兰后园到哈尔滨商市街',ids:['xiaohong-house','shangshi-street'].map(ref=>culturalPlaceRef(ref).id),days:2,months:[5,6,7,8,9],transport:'哈尔滨基地 + 呼兰往返接驳',reason:'第一天以呼兰故居与后园读童年记忆，第二天在哈尔滨红霞街一带读早期城市生活。两天为现代区域探访建议，街区不等于仍可入内的历史房间。',topology:'network',climate:'https://www.hljzx.gov.cn/contents/68/7406.html'}
);
function visibleCatalogueThemes(){return themes.filter(t=>!t.catalogHidden)}
function culturalPlaceSearchText(p){
 const record=atlasContextByPlace.get(p.id);if(!record)return '';
 const contexts=culturalMapContexts(record,themes[activeTheme].id);
 return (contexts.length?contexts:[record.contexts.get(themes[activeTheme].id)]).filter(Boolean).map(c=>c.themeName+' '+c.summary+' '+c.observe).join(' ');
}
function migrateCulturalMapHash(hash){
 const q=new URLSearchParams(hash.replace(/^#/,'')),old=q.get('theme');if(!culturalMapAliases[old])return null;
 let id=culturalMapAliases[old];const person=q.get('person'),place=places.find(p=>p.id===q.get('place'));
 if(person&&culturalAtlasPack.themes.some(t=>t.id===person))id=person;
 else if(place&&!place.themes.includes(id))id=place.themes.find(t=>culturalAtlasPack.themes.some(source=>source.id===t))||id;
 else if(q.get('route')&&!buildPlans(id,0).some(p=>p.id===q.get('route'))){const owner=planTemplates.find(p=>p.id===q.get('route'));if(owner)id=owner.theme;}
 q.set('theme',id);q.delete('person');return '#'+q.toString();
}
discoveryIndex=null;readingPlans=null;

applyRegionalConsolidation();

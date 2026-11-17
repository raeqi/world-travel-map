'use strict';
// Place-specific cultural contexts share physical places; no lifetime travel routes are inferred.
const atlasRelationNames={work:'原址作品',depicted:'作品关联地','life':'生活地点','life-work':'生活与创作',collection:'收藏与研究','life-memorial':'生活与纪念',temporary:'已结束的临时作品',restricted:'限制访问项目','fiction-life':'文学与生活','life-fiction':'生活与文学',memorial:'纪念与研究',restricted:'限制访问项目','fiction-life':'文学与生活','life-fiction':'生活与文学',restricted:'限制访问项目','fiction-life':'文学与生活','life-fiction':'生活与文学'};
const atlasAreas={'中国':'亚洲','日本':'亚洲','印度':'亚洲','法国':'欧洲','西班牙':'欧洲','英国':'欧洲','挪威':'欧洲','德国':'欧洲','奥地利':'欧洲','瑞士':'欧洲','意大利':'欧洲','芬兰':'欧洲','爱尔兰':'欧洲','捷克':'欧洲','白俄罗斯':'欧洲','罗马尼亚':'欧洲','希腊':'欧洲','根西岛':'欧洲','美国':'美洲','墨西哥':'美洲','古巴':'美洲','智利':'美洲','哥伦比亚':'美洲','埃及':'非洲','法属波利尼西亚':'大洋洲','法属波利尼西亚':'大洋洲'};
const atlasColors={painting:['#586c78','#e6ebed','#dedfda','gallery'],music:['#735a4d','#e9e7e2','#dfdacf','score'],literature:['#64715c','#e8ece5','#dedfd5','manuscript'],sculpture:['#6e675d','#e9e9e5','#dedcd6','gallery'],architecture:['#856448','#e9e8e2','#dfd9ce','gallery'],photography:['#4d646a','#e5ebec','#dce1dc','gallery'],installation:['#716180','#e9e7ee','#dfdce5','gallery'],'land-art':['#936a43','#e7e9e6','#e3d9c8','gallery']};
Object.assign(photoLibrary,culturalAtlasMedia);
const atlasContextByPlace=new Map(),atlasThemePlaceIds=new Map();
function atlasActiveId(){try{return typeof activeTheme==='number'?themes[activeTheme]?.id:null}catch{return null}}
function atlasContext(placeId){const record=atlasContextByPlace.get(placeId);return record?.contexts.get(atlasActiveId())||record?.contexts.values().next().value}
function atlasNormalizedName(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]+/g,'')}
function atlasSharedPlace(stop){
 const target=atlasNormalizedName(stop.en),name=atlasNormalizedName(stop.name);
 return places.find(p=>Math.abs(p.lon-stop.lon)<.12&&Math.abs(p.lat-stop.lat)<.12&&[p.name,p.en].some(n=>{const v=atlasNormalizedName(n);return v&&(v===target||v===name)}));
}
for(const theme of culturalAtlasPack.themes){
 const ids=[];
 for(const stop of theme.stops){
  const stableId='atlas-'+stop.key;
  let place=places.find(p=>p.id===stableId)||atlasSharedPlace(stop);
  if(!place){place={id:stableId,name:stop.name,en:stop.en,lon:stop.lon,lat:stop.lat,country:stop.country,region:stop.region,type:atlasRelationNames[stop.relation],desc:stop.summary,themes:[],icon:'◇',source:stop.source,sourceLabel:'人物、作品与地点资料',coordinateNote:'编辑选择的建筑、街区或地景代表点；不是历史机位、入口或可导航路线。'};places.push(place)}
  if(!place.themes.includes(theme.id))place.themes.push(theme.id);
  ids.push(place.id);
  let record=atlasContextByPlace.get(place.id);
  if(!record){
   record={place,base:{desc:place.desc,type:place.type,source:place.source,facts:place.facts,sourceLabel:place.sourceLabel,essay:placeEssays[place.id]},contexts:new Map()};atlasContextByPlace.set(place.id,record);
  }
  record.contexts.set(theme.id,{...stop,themeName:theme.name});
  const photoKey='atlas-'+stop.key;if(photoLibrary[photoKey])editorialPlacePhotos[place.id]=photoKey;
 }
 atlasThemePlaceIds.set(theme.id,[...new Set(ids)]);
}
for(const [id,record] of atlasContextByPlace){
 const current=()=>record.contexts.get(atlasActiveId()),base=record.base;
 Object.defineProperty(record.place,'desc',{enumerable:true,configurable:true,get(){return current()?.summary||base.desc}});
 Object.defineProperty(record.place,'type',{enumerable:true,configurable:true,get(){return atlasRelationNames[current()?.relation]||base.type}});
 Object.defineProperty(record.place,'source',{enumerable:true,configurable:true,get(){return current()?.source||base.source}});
 Object.defineProperty(record.place,'sourceLabel',{enumerable:true,configurable:true,get(){return current()?'人物、作品与地点资料':base.sourceLabel}});
 Object.defineProperty(record.place,'facts',{enumerable:true,configurable:true,get(){const c=current();return c?{'地点关系':atlasRelationNames[c.relation],'现场观察':c.observe}:base.facts}});
 Object.defineProperty(placeEssays,id,{enumerable:true,configurable:true,get(){
  const c=current()||(!base.essay?record.contexts.values().next().value:null);if(!c)return base.essay||{title:'人物与地方',paragraphs:[...record.contexts.values()].map(x=>({heading:x.themeName,text:x.summary+' '+x.observe})),sources:[...record.contexts.values()].map(x=>({title:x.themeName+' · 机构资料',url:x.source})),related:[]};
  return {title:c.themeName,paragraphs:[{heading:'到现场看什么',text:c.themeName+'：'+c.observe},{heading:'与其他地点怎样对读',text:culturalAtlasPack.themes.find(t=>t.id===atlasActiveId())?.focus||c.summary}],sources:[{title:'人物、作品与地点资料',url:c.source}],related:(atlasThemePlaceIds.get(atlasActiveId())||[]).filter(x=>x!==id).slice(0,4)};
 }});
}
for(const t of culturalAtlasPack.themes){
 if(themes.some(x=>x.id===t.id))throw Error('Duplicate cultural theme: '+t.id);
 const [accent,ocean,land,mode]=atlasColors[t.discipline],ids=atlasThemePlaceIds.get(t.id),nodes=ids.map(id=>places.find(p=>p.id===id));
 const candidates=t.stops.map(s=>'atlas-'+s.key).filter(key=>photoLibrary[key]),hero=candidates[0];
 const lons=nodes.map(p=>p.lon),lats=nodes.map(p=>p.lat),span=Math.max(Math.max(...lons)-Math.min(...lons),Math.max(...lats)-Math.min(...lats)),view={lon:(Math.min(...lons)+Math.max(...lons))/2,lat:(Math.min(...lats)+Math.max(...lats))/2,zoom:Math.max(1,Math.min(120,240/Math.max(2,span)))};
 const colors={accent,ocean,land,edge:'#a5ada9',point:accent,route:accent,wash:'#fff'};
 themes.push({id:t.id,name:t.name,title:t.tagline,story:t.tagline+' '+t.focus,introduction:t.focus,discipline:t.discipline,scope:'精选地点网络 · 非历史单次行程',filters:[...new Set(t.stops.map(s=>atlasRelationNames[s.relation]))],fields:['地点关系','现场观察'],view,symbol:'diamond',colors});
 themeDesigns[t.id]={mode,...colors,width:2,dash:[2,6],lens:t.tagline,note:'本图展示首批精选地点；生活、作品与馆藏关系分开阅读。',line:'无固定顺序的主题地点网络'};
 themeGlyphs[t.id]=t.discipline==='music'?['book','temple']:t.discipline==='architecture'?['house','pillar']:['house','leaf','mountain'];
 if(hero){
  themeMedia[t.id]={photo:hero,en:t.id.toUpperCase().replaceAll('-',' '),edition:t.name,motif:t.tagline,symbol:t.discipline==='music'?'♪':'◇'};
  editionStories[t.id]={photo:hero,second:candidates[1]||hero,tag:'地方与作品',headline:t.tagline,caption:photoLibrary[hero].title,body:t.focus,detail:'影像按具体地点绑定；原作、历史影像与当代照片在图注中区分。'};
 }else{
  // A dated media gap stays explicit; no unrelated image is borrowed.
  const key='atlas-cover-'+t.id;
  photoLibrary[key]={path:'assets/cultural-atlas/neutral.svg',title:t.name+' · 地点网络示意（待补对应影像）',author:'Terra Mosaic',source:'https://github.com/raeqi/world-travel-map',license:'项目原创示意图',licenseUrl:'https://github.com/raeqi/world-travel-map',illustration:true};
  themeMedia[t.id]={photo:key,en:t.id.toUpperCase(),edition:t.name,motif:t.tagline,symbol:'◇'};
 }
 const areas=[...new Set(t.stops.map(s=>s.region==='法属波利尼西亚'?'大洋洲':atlasAreas[s.country]).filter(Boolean))];
 discoveryMeta[t.id]=['art',areas,[t.name,t.tagline,t.focus,...t.stops.map(s=>s.name+' '+s.en+' '+s.country)].join(' ')];
 for(const s of t.stops){const area=s.region==='法属波利尼西亚'?'大洋洲':atlasAreas[s.country];if(area&&itineraryAreas[area]&&!itineraryAreas[area].includes(s.country))itineraryAreas[area].push(s.country)}
 planTemplates.push({id:'atlas-'+t.id+'-places',theme:t.id,name:t.name+' · 地点精选',ids,days:t.days,months:[1,2,3,4,5,6,7,8,9,10,11,12],transport:'分区访问 · 当代公共交通或当地接驳',reason:t.tagline+' '+t.focus+' 地点跨越不同年代或区域，不设固定行走顺序；天数仅为分区探访预算，未计跨国或跨洲转场。月份不代表全年适宜，按具体目的地另核天气、开放与预约。',topology:'network',climate:t.stops[0].source});
}
discoveryIndex=null;readingPlans=null;

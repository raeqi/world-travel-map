'use strict';
// Ordinary maps own the union of physical places. Source maps and their exact
// templates stay intact for people, original readings and existing links.
function consolidationMembers(id){
 const map=culturalThemeMaps.get(id);
 return map?map.members.map(m=>typeof m==='string'?m:{...m,keys:m.keys?.slice(),places:m.places?.slice()}):[id];
}
for(const group of catalogueConsolidationPack.groups){
 const prior=culturalThemeMaps.get(group.id),inherited=group.inherit.map(id=>culturalThemeMaps.get(id)).filter(Boolean);
 const members=group.inherit.flatMap(consolidationMembers).filter(m=>!(group.replaceMembers||[]).includes(typeof m==='string'?m:m.id));
 members.push(...(group.members||[]));
 const definition={...group,members:[...new Map(members.map(m=>[JSON.stringify(m),m])).values()],extraPlaces:[...new Set(inherited.flatMap(m=>m.extraPlaces||[]))],plans:[...(prior?.plans||[]),...group.plans.map(p=>[p.id,p.name,p.ids,p.days,p.months,p.transport,p.reason])],artThemes:[...new Set(inherited.flatMap(m=>m.artThemes||[]))],originMaps:group.sourceMaps};
 const nodes=[...new Set([...culturalMapMembers(definition).flatMap(culturalMemberPlaces),...definition.extraPlaces.map(culturalPlaceRef)])];
 if(!nodes.length||nodes.some(p=>!p))throw Error('Invalid consolidated map '+group.id);
 const first=themes.find(t=>t.id===group.inherit[0]),id=group.id;
 culturalThemeMaps.set(id,definition);
 if(prior)culturalMapDefinitions[culturalMapDefinitions.findIndex(d=>d.id===id)]=definition;else culturalMapDefinitions.push(definition);
 atlasThemePlaceIds.set(id,nodes.map(p=>p.id));for(const p of nodes)if(!p.themes.includes(id))p.themes.push(id);
 const disciplines=[...new Set(culturalMapMembers(definition).flatMap(m=>themeDisciplines(themes.find(t=>t.id===m.id))))];
 const filters=[...new Set(nodes.map(p=>{const cs=culturalMapContexts(atlasContextByPlace.get(p.id)||{place:p,contexts:new Map()},id);return cs.length?atlasRelationNames[cs[0].relation]:p.type}))];
 let theme=themes.find(t=>t.id===id);
 if(!theme){theme={id,symbol:first.symbol,colors:{...first.colors}};themes.push(theme);}
 Object.assign(theme,{name:group.name,title:group.name,story:group.intro,introduction:group.intro,scope:'分区探访 · 真实地点网络',catalogHidden:false,maxZoom:40000,disciplines,filters,fields:['地点关系','现场观察'],view:culturalMapView(nodes),artThemes:definition.artThemes});
 themeDesigns[id]={...themeDesigns[first.id],lens:group.lens,note:group.intro,line:'分区探访 · 地点关系图'};themeGlyphs[id]=themeGlyphs[first.id];
 const oldMedia=themeMedia[id],hero=oldMedia?.photo||nodes.map(p=>editorialPlacePhotos[p.id]).find(k=>photoLibrary[k]&&!photoLibrary[k].illustration);
 if(!nodes.some(p=>editorialPlacePhotos[p.id]===hero))throw Error('Unrelated consolidated cover '+id);
 themeMedia[id]={...(oldMedia||themeMedia[first.id]),photo:hero,en:id.toUpperCase().replaceAll('-',' '),edition:group.name,motif:(oldMedia?.motif?oldMedia.motif+' ':'')+group.lens};
 editionStories[id]={photo:hero,second:hero,headline:group.name,body:group.intro,caption:photoLibrary[hero].title,tag:'地方与作品',detail:group.lens};
 discoveryMeta[id]=['art',[...new Set(nodes.flatMap(placeRouteAreas))],[group.name,group.intro,...group.sourceMaps.map(s=>{const t=themes.find(t=>t.id===s);return t.name+' '+s+' '+t.story}),...culturalMapMembers(definition).map(m=>{const t=themes.find(t=>t.id===m.id);return t.name+' '+m.id+' '+t.story})].join(' ')];
 for(const p of group.plans){if(p.ids.length<2||p.ids.some(ref=>!nodes.some(n=>n.id===ref)))throw Error('Invalid regional itinerary '+p.id);if(planTemplates.some(t=>t.id===p.id))throw Error('Duplicate plan '+p.id);planTemplates.push({...p,theme:id});}
 for(const source of group.sourceMaps){if(source===id)continue;const t=themes.find(t=>t.id===source);t.catalogHidden=true;if(culturalAtlasPack.themes.some(s=>s.id===source)||['mozart','austen'].includes(source))t.personSearch=t.name+' '+source;else delete t.personSearch;}
}
for(const id of catalogueConsolidationPack.implemented){if(culturalSourceCoverage(id).some(r=>!r.maps.length))throw Error('Uncovered consolidation '+id);}
for(const group of catalogueConsolidationPack.groups)for(const source of group.sourceMaps)if(source!==group.id&&culturalThemeMaps.has(source))culturalMapAliases[source]=group.id;
Object.assign(culturalMapAliases,{'collection-chinese-painting':'jiangnan-poetry-painting','collection-tang-song-poets':'jiangnan-poetry-painting','collection-nordic-music':'nordic-art-homes','collection-british-countryside':'england-literature-art'});
remainingThirtyReview.expectedVisible=catalogueConsolidationPack.expectedVisible;
discoveryIndex=null;readingPlans=null;

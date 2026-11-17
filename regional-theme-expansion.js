'use strict';
// New places have their own institutional evidence; they are not assigned to an
// unrelated artist merely to reuse that artist's photograph or source reading.
Object.assign(photoLibrary,regionalExpansionMedia);
for(const row of regionalExpansionData.points){
 if(places.some(p=>p.id===row.id))throw Error('Duplicate expansion place '+row.id);
 const {wiki,mediaFile,observe,...data}=row;
 const place={...data,themes:[],icon:'◇',sourceLabel:'机构与作品资料',coordinateNote:'建筑、园区或地景的代表坐标；不是导航入口或精确作画位置。',facts:{'到现场看什么':observe}};
 places.push(place);
 placeEssays[place.id]={title:row.name,paragraphs:[{heading:'到现场看什么',text:observe},{heading:'地点与作品的关系',text:row.desc}],sources:[{title:'机构与作品资料',url:row.source}],related:[]};
 if(regionalExpansionMedia[row.id])editorialPlacePhotos[row.id]=row.id;
}
function applyRegionalConsolidation(){
 for(const expansion of typeof regionalStandaloneExpansions==='undefined'?[]:regionalStandaloneExpansions){
  const theme=themes.find(t=>t.id===expansion.id);
  for(const id of expansion.extraPlaces){const place=places.find(p=>p.id===id);place.themes.push(theme.id);if(!theme.filters.includes(place.type))theme.filters.push(place.type);}
  const nodes=places.filter(p=>p.themes.includes(theme.id));atlasThemePlaceIds.set(theme.id,nodes.map(p=>p.id));theme.view=culturalMapView(nodes);
  for(const [id,name,refs,days,months,transport,reason]of expansion.plans){const stops=refs.map(culturalPlaceRef);planTemplates.push({id,theme:theme.id,name,ids:stops.map(p=>p.id),days,months,transport,reason,topology:'network',climate:stops[0].source});}
 }
 for(const id of regionalConsolidatedSources){
  const theme=themes.find(t=>t.id===id),coverage=culturalSourceCoverage(id);
  if(!coverage.length||coverage.some(p=>!p.maps.length))throw Error('Incomplete consolidation '+id);
  theme.catalogHidden=true;theme.personSearch=theme.name+' '+theme.id;
 }
 discoveryIndex=null;readingPlans=null;
}

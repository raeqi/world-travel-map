'use strict';
// Context-specific reviewed layers preserve both static and dynamic original readings.
const qualityReadingsByContext=new Map(),qualityRowsByPlace=new Map();
for(const row of qualityReadingPack.readings){
 const place=places.find(p=>p.id===row.id);if(!place||!place.themes.includes(row.theme))throw Error('Unknown reviewed context: '+row.theme+'/'+row.id);
 const key=row.theme+'/'+row.id;if(qualityReadingsByContext.has(key))throw Error('Duplicate reviewed context: '+key);
 qualityReadingsByContext.set(key,row);if(!qualityRowsByPlace.has(row.id))qualityRowsByPlace.set(row.id,new Map());qualityRowsByPlace.get(row.id).set(row.theme,row);
}
function qualityCurrentTheme(){return typeof activeTheme==='number'?themes[activeTheme]?.id:null}
function qualityReadingsFor(place,theme=qualityCurrentTheme()){
 const direct=qualityReadingsByContext.get(theme+'/'+place.id);if(direct)return [direct];
 const map=typeof culturalThemeMaps==='undefined'?null:culturalThemeMaps.get(theme);if(!map)return [];
 return [...new Set(culturalMapMembers(map).filter(m=>culturalMemberPlaces(m).includes(place)).map(m=>qualityReadingsByContext.get(m.id+'/'+place.id)).filter(Boolean))];
}
function qualityReadingFor(place,theme=qualityCurrentTheme()){return qualityReadingsFor(place,theme)[0]}
function qualityMergeReading(row,prior){
 const sources=row.sourceKeys.map(key=>qualityReadingPack.sources[key]);
 return {title:row.title,paragraphs:[...row.paragraphs.map(({heading,text})=>({heading,text})),...(prior?.paragraphs||[])].filter((p,i,all)=>all.findIndex(q=>q.heading===p.heading&&q.text===p.text)===i),sources:[...sources,...(prior?.sources||[])].filter((s,i,all)=>all.findIndex(q=>JSON.stringify(q)===JSON.stringify(s))===i),related:[...new Set([...row.related,...(prior?.related||[])])].filter(id=>id!==row.id&&places.some(p=>p.id===id))};
}
for(const [id,rows]of qualityRowsByPlace){
 const descriptor=Object.getOwnPropertyDescriptor(placeEssays,id),prior=()=>descriptor?.get?descriptor.get.call(placeEssays):descriptor?.value;
 Object.defineProperty(placeEssays,id,{enumerable:true,configurable:true,get(){const original=prior(),matched=qualityReadingsFor(places.find(p=>p.id===id));return matched.reduceRight((essay,row)=>qualityMergeReading(row,essay),original)}});
}
function researchedPlaceSummary(place){const rows=qualityReadingsFor(place);return rows.length>1?rows.map(r=>themes.find(t=>t.id===r.theme).name+'：'+r.summary).join(' '):rows[0]?.summary||place.desc}

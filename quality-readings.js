'use strict';
// Add a reviewed reading layer without rewriting catalogue text, media, coordinates or links.
const qualityReadingsByPlace=new Map();
for(const row of qualityReadingPack.readings){
 const place=places.find(p=>p.id===row.id);if(!place||!place.themes.includes(row.theme))throw Error('Unknown reviewed context: '+row.theme+'/'+row.id);
 qualityReadingsByPlace.set(row.id,row);
 const prior=placeEssays[row.id],sources=row.sourceKeys.map(key=>qualityReadingPack.sources[key]);
 placeEssays[row.id]={title:row.title,paragraphs:[...row.paragraphs.map(({heading,text})=>({heading,text})),...(prior?.paragraphs||[])].filter((p,i,all)=>all.findIndex(q=>q.heading===p.heading&&q.text===p.text)===i),sources:[...sources,...(prior?.sources||[])].filter((s,i,all)=>all.findIndex(q=>JSON.stringify(q)===JSON.stringify(s))===i),related:[...new Set([...row.related,...(prior?.related||[])])].filter(id=>id!==row.id&&places.some(p=>p.id===id))};
}
function researchedPlaceSummary(place){const row=qualityReadingsByPlace.get(place.id);return row&&themes[activeTheme]?.id===row.theme?row.summary:place.desc}

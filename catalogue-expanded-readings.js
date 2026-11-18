'use strict';
// Supplement a physical place only in its evidenced person/region context.
const catalogueRegionalReadings=[
 {id:'vangogh-arles',theme:'gauguin',title:'阿尔勒：1888年的短暂共同生活',paragraphs:[{heading:'高更也曾在阿尔勒生活',text:'维多利亚州国立美术馆的梵高年表记载，高更在1888年10月下旬抵达阿尔勒，两位画家曾短暂共同生活和工作。这个真实生平关联，为布列塔尼与塔希提之外补上法国南部章节；它不代表今日某间复原室仍保留两人当年所有布置。'},{heading:'法国南部另作一段',text:'阿尔勒可以在南法停留时探访，与布列塔尼和太平洋群岛分别安排。地图保留梵高既有地点与作品资料，再补高更在此的明确时间关系；不把两人的合作延伸成未经证实的共同旅行，也不把欧洲和塔希提连成四日交通路线。'}],sources:[{title:'维多利亚州国立美术馆：梵高生平年表与1888年高更抵达阿尔勒',url:'https://www.ngv.vic.gov.au/ngv_timeline/vincent-van-gogh/'}]}
];
function catalogueRegionalReadingsFor(place,theme){return catalogueRegionalReadings.filter(r=>r.id===place.id&&(r.theme===theme||(typeof culturalThemeMaps!=='undefined'&&culturalThemeMaps.has(theme)&&culturalMapMembers(culturalThemeMaps.get(theme)).some(m=>m.id===r.theme&&culturalMemberPlaces(m).includes(place)))))}
for(const id of new Set(catalogueRegionalReadings.map(r=>r.id))){
 const descriptor=Object.getOwnPropertyDescriptor(placeEssays,id),previous=()=>descriptor?.get?descriptor.get.call(placeEssays):descriptor?.value;
 Object.defineProperty(placeEssays,id,{enumerable:true,configurable:true,get(){const prior=previous(),rows=catalogueRegionalReadingsFor(places.find(p=>p.id===id),typeof activeTheme==='number'?themes[activeTheme]?.id:null);if(!rows.length)return prior;return {title:prior?.title||rows[0].title,paragraphs:[...(prior?.paragraphs||[]),...rows.flatMap(r=>r.paragraphs)],sources:[...(prior?.sources||[]),...rows.flatMap(r=>r.sources)].filter((s,i,a)=>a.findIndex(x=>x.url===s.url)===i),related:prior?.related||[]}}});
}
discoveryIndex=null;readingPlans=null;

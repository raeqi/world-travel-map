'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto');
const {runtime,snapshot,assertReadingPreserved,assertPlaceDataPreserved}=require('../scripts/theme-audit-runtime.cjs'),pack=require('../data/theme-review/catalogue-consolidation.json');
test('approved consolidations preserve original places, readings, works and exact itinerary templates',()=>{
 const bytes=fs.readFileSync(pack.baselineSnapshot.file);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),pack.baselineSnapshot.sha256);const before=JSON.parse(require('node:zlib').gunzipSync(bytes)),after=snapshot(runtime());
 for(const old of before){const now=after.find(t=>t.id===old.id);assert.ok(now,old.id);for(const p of old.points){const n=now.points.find(x=>x.id===p.id);assert.ok(n,old.id+'/'+p.id);const {essay:oe,reviewedReading:or,essayApplies:oa,...op}=p,{essay:ne,reviewedReading:nr,essayApplies:na,...np}=n;assertPlaceDataPreserved(np,op,old.id+'/'+p.id+' original context');assertReadingPreserved(p,n,old.id);}for(const p of old.plans)assert.deepEqual(now.plans.find(n=>n.id===p.id),p,p.id);for(const w of old.works)assert.ok(now.works.some(n=>JSON.stringify(n)===JSON.stringify(w)),w.key);}
});
test('new ordinary maps cover every source place and keep travel regions separate',()=>{const c=runtime();c.assert=assert;vm.runInContext(`
 assert.equal(catalogueConsolidationPack.decisions.length,57);assert.equal(new Set(catalogueConsolidationPack.decisions.map(d=>d.id)).size,57);assert.equal(visibleCatalogueThemes().length,catalogueConsolidationPack.expectedVisible);
 for(const group of catalogueConsolidationPack.groups){const map=culturalThemeMaps.get(group.id),t=themes.find(t=>t.id===group.id);assert.ok(!t.collection&&!t.catalogHidden);for(const id of group.sourceMaps){if(id!==group.id)assert.ok(themes.find(t=>t.id===id).catalogHidden);for(const p of places.filter(p=>p.themes.includes(id))){assert.ok(p.themes.includes(group.id),id+'/'+p.id);assert.ok(culturalSourceCoverage(id).some(r=>r.place.id===p.id&&r.maps.includes(group.id))||id===group.id);}}for(const p of group.plans){assert.ok(p.ids.length>1);const route=buildPlans(group.id,0).find(x=>x.id===p.id);assert.ok(route);assert.equal(route.legs.length,0);assert.ok(Math.max(...route.stops.flatMap(a=>route.stops.map(b=>distanceKm(a,b))))<400,p.id);}}
 const music=places.filter(p=>p.themes.includes('european-music-cities'));assert.ok(music.some(p=>p.id==='atlas-spillville'&&p.country==='美国'));
 for(const id of ['atlas-spillville','atlas-nohant','atlas-valldemossa'])assert.ok(!buildPlans('european-music-cities',0).some(p=>p.ids.includes(id)),id+' independent visit');
 assert.ok(buildPlans('european-music-cities',0).find(p=>p.id==='consolidation-music-scotland').stops.every(p=>p.country==='英国'));
 assert.ok(buildPlans('nordic-art-homes',0).every(p=>new Set(p.stops.map(p=>p.country)).size===1));
 assert.ok(!buildPlans('england-literature-art',0).some(p=>p.ids.includes('atlas-dove-cottage')&&p.ids.includes('atlas-dickens-london')));
 for(const [query,area,id]of [['斯皮尔维尔','美洲','european-music-cities'],['肖邦','欧洲','european-music-cities'],['格里格','欧洲','nordic-art-homes'],['吴冠中','亚洲','jiangnan-poetry-painting'],['奥斯汀','欧洲','england-literature-art']]){homeState.query=query;homeState.area=area;assert.ok(matchingDiscovery().some(x=>x.theme.id===id),query);}
 `,c);});
test('shared route references preserve the merged map context and original links',()=>{const c=runtime();c.assert=assert;c.escapeHTML=s=>String(s);vm.runInContext(`
 for(const map of culturalThemeMaps.values())for(const id of map.sharedPlans||[]){const source=planTemplates.find(p=>p.id===id),shared=buildPlans(map.id,0).find(p=>p.id===id);assert.ok(source&&shared);assert.equal(shared.theme,map.id);assert.equal(source.theme,buildPlans(source.theme,0).find(p=>p.id===id).theme);activeTheme=themes.findIndex(t=>t.id===map.id);readingPlans=null;const html=placePlansHTML(shared.stops[0]);assert.ok(html.includes('data-reading-theme="'+map.id+'"'));}
 let q=new URLSearchParams(migrateCulturalMapHash('#theme=english-landscapes&view=plans&route=thirty-landscape-cockermouth').slice(1));assert.equal(q.get('theme'),'english-landscapes');assert.equal(q.get('route'),'thirty-landscape-cockermouth');
 q=new URLSearchParams(migrateCulturalMapHash('#theme=collection-nordic-music').slice(1));assert.equal(q.get('theme'),'nordic-art-homes');
 `,c);});
test('reviewed source readings follow their actual member into a merged map without foreign-person fallback',()=>{const c=runtime();c.assert=assert;vm.runInContext(`
 activeTheme=themes.findIndex(t=>t.id==='european-music-cities');for(const row of qualityReadingPack.readings.filter(r=>r.theme==='mozart')){const p=places.find(p=>p.id===row.id);assert.equal(researchedPlaceSummary(p),row.summary);assert.ok(placeEssays[p.id].paragraphs.some(x=>x.text===row.paragraphs[0].text));for(const key of row.sourceKeys)assert.ok(placeEssays[p.id].sources.some(s=>s.url===qualityReadingPack.sources[key].url));}
 assert.ok(!JSON.stringify(placeEssays['mozart-prague']).includes('卡夫卡'));activeTheme=themes.findIndex(t=>t.id==='england-literature-art');assert.ok(!qualityReadingsFor(places.find(p=>p.id==='mozart-london')).some(r=>r.theme==='mozart'));
 `,c);});
test('partial regional placements retain an entrance for every uncovered biography place',()=>{const c=runtime();c.assert=assert;vm.runInContext(`
 for(const id of ['cartier-bresson','chagall','byron','joyce']){assert.ok(!themes.find(t=>t.id===id).catalogHidden,id);assert.ok(culturalSourceCoverage(id).some(r=>r.maps.length===0),id+' still has a distinct region');}
 const covers=(id,point,map)=>culturalSourceCoverage(id).some(r=>r.place.id===point&&r.maps.includes(map));
 assert.ok(covers('cartier-bresson','atlas-shanghai','jiangnan-poetry-painting'));assert.ok(covers('cartier-bresson','thirty-hcb-paris','paris-sculpture'));assert.ok(!covers('cartier-bresson','polo-beijing','chinese-painters'));
 assert.ok(covers('chagall','thirty-vence-cathedral','southern-france-painters'));assert.ok(covers('byron','thirty-byron-newstead','england-literature-art'));assert.ok(covers('joyce','thirty-joyce-trieste-museum','italian-art-journeys'));
 `,c);});
test('default discovery deduplicates shared plans and explicit search retains each original owner',()=>{const c=runtime();c.assert=assert;vm.runInContext(`
 homeState.query='';homeState.interest='all';const rows=matchingDiscoveryRoutes();assert.equal(new Set(rows.map(r=>r.plan.id)).size,rows.length);assert.equal(rows.find(r=>r.plan.id==='thirty-joyce-trieste').theme.id,'italian-art-journeys');
 homeState.query=planTemplates.find(p=>p.id==='thirty-joyce-trieste').name;assert.ok(matchingDiscoveryRoutes().some(r=>r.plan.id==='thirty-joyce-trieste'&&r.theme.id==='joyce'));
 `,c);});
test('new nearby culture stops have precise source relationships and inspected licensed local assets',()=>{const p=require('../data/theme-review/catalogue-new-places.json');assert.equal(p.points.length,2);for(const row of p.points){assert.ok(row.essay.paragraphs.length>=2);assert.ok(row.essay.sources.length>=2);assert.ok(row.essay.sources.some(s=>s.url===row.source));assert.match(row.photo.license,/CC0|CC BY-SA/);assert.ok(row.photo.author&&row.photo.licenseUrl&&row.photo.visualCheck&&row.photo.changes);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(row.photo.path)).digest('hex'),row.photo.sha256);}assert.ok(p.points.find(p=>p.id==='consolidation-wadsworth').desc.includes('不声称'));assert.ok(p.points.find(p=>p.id==='consolidation-taipei-npm').photo.title.includes('外观'));});
test('complete map replacements avoid duplicate person cards and recommend only their own regional visits',()=>{const c=runtime();c.assert=assert;c.escapeHTML=s=>String(s);vm.runInContext(`
 homeState.view='themes';homeState.interest='all';homeState.area='all';homeState.query='莫扎特';assert.ok(matchingDiscovery().some(r=>r.theme.id==='european-music-cities'));assert.ok(!matchingDiscovery().some(r=>r.theme.id==='mozart'));assert.ok(sourceCoveredByOneVisibleMap('mozart'));
 homeState.query='吴冠中';assert.ok(matchingDiscovery().some(r=>r.theme.id==='wu-guanzhong'));assert.ok(!sourceCoveredByOneVisibleMap('wu-guanzhong'));
 activeTheme=themes.findIndex(t=>t.id==='european-music-cities');readingPlans=null;const prague=places.find(p=>p.id==='mozart-prague'),html=placePlansHTML(prague);assert.ok(!html.includes('data-reading-plan="atlas-dvorak-places"'));assert.ok(html.includes('data-reading-theme="european-music-cities"'));
 homeState.query=planTemplates.find(p=>p.id==='atlas-dvorak-places').name;assert.ok(matchingDiscoveryRoutes().some(r=>r.theme.id==='dvorak'&&r.plan.id==='atlas-dvorak-places'));
 `,c);});

test('place and work search includes the actual local reading without borrowing another biography',()=>{const c=runtime();c.assert=assert;vm.runInContext(`
 homeState.query='庐山图';homeState.area='all';homeState.interest='all';assert.ok(matchingDiscovery().some(r=>r.theme.id==='chinese-painters'));
 homeState.query='冰岛 1';homeState.interest='nature';homeState.area='欧洲';assert.equal(matchingDiscovery().length,0);assert.equal(matchingDiscoveryRoutes().length,1);homeState.query='庐山图';homeState.interest='all';homeState.area='all';const npm=places.find(p=>p.id==='consolidation-taipei-npm');assert.match(culturalPlaceSearchText(npm,'chinese-painters'),/庐山图/);
 assert.ok(!culturalPlaceSearchText(places.find(p=>p.id==='mozart-prague'),'european-music-cities').includes('卡夫卡'));
 assert.ok(!culturalPlaceSearchText(places.find(p=>p.id==='mozart-london'),'england-literature-art').includes('莫扎特'));
 `,c);});

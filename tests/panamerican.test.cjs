'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams});
for(const f of ["catalog.js","tea.js","historical.js","walking.js","journeys.js","media.js","themes.js","planner.js","journey-plans.js","map-style.js","journey-design.js","editorial.js","art-media.js","art-context.js","route-media.js","discovery.js","reading.js","content-enrichment.js","roads.js"])vm.runInContext(fs.readFileSync(f,'utf8'),context,{filename:f});
const before=vm.runInContext('({places:places.length,plans:planTemplates.length,themes:themes.length})',context);
vm.runInContext(fs.readFileSync('panamerican.js','utf8'),context,{filename:'panamerican.js'});
context.assert=assert;context.before=before;
vm.runInContext(`
assert.equal(places.length,before.places+31);
assert.equal(planTemplates.length,before.plans+7);
assert.equal(themes.length,before.themes+1);
assert.equal(new Set(places.map(p=>p.id)).size,places.length);
assert.equal(new Set(planTemplates.map(p=>p.id)).size,planTemplates.length);
const plans=buildPlans('panamerican',0),nodes=places.filter(p=>p.themes.includes('panamerican'));
assert.equal(plans.length,7);
assert.equal(nodes.length,31);
for(const p of plans){
 assert.ok(p.stops.length>=2);
 assert.equal(p.stops.length,p.ids.length,'no missing stops');
 assert.ok(p.stops.every(n=>n.themes.includes('panamerican')));
 assert.ok(p.sources.length>=2&&p.sources.every(s=>s.title&&s.url.startsWith('https://')));
 assert.ok(p.roadScope&&p.accessNote.length>30&&p.statusUrl.startsWith('https://'));
 assert.equal(p.verifiedOn,'2026-11-17');
 assert.ok(p.months.every(m=>m>=1&&m<=12));
 const media=routeMediaCandidates(p);assert.ok(media.length,'every chapter has its own relevant image');
 assert.ok(media.every(m=>p.ids.includes(m.placeId)));
 assert.ok(!routeEdges(p.stops,p).some(([a,b])=>new Set([a.id,b.id]).has('pan-yaviza')&&new Set([a.id,b.id]).has('pan-turbo')),'no road drawn across Darien');
}
for(const n of nodes){
 assert.ok(Number.isFinite(n.lon)&&Math.abs(n.lon)<=180&&Number.isFinite(n.lat)&&Math.abs(n.lat)<=90);
 assert.ok(n.source.startsWith('https://')&&n.coordinateNote);
 assert.ok(n.desc.length>20&&placeEssays[n.id].paragraphs[0].text.length>65,n.id+' useful independent detail');
 assert.notEqual(n.desc,placeEssays[n.id].paragraphs[0].text);
 assert.ok(placeRouteAreas(n).includes('美洲'));
}
const overview=plans.find(p=>p.id==='pan-overview');
assert.equal(overview.topology,'network');
assert.equal(overview.legs.length,0);
assert.equal(routeEdges(overview.stops,overview).length,0);
assert.ok(overview.ids.includes('pan-yaviza')&&overview.ids.includes('pan-turbo'));
const chile=plans.find(p=>p.id==='pan-chile-extension');
assert.equal(chile.topology,'network');assert.equal(chile.legs.length,0);
assert.match(chile.transport,/航空|轮渡/);
const fire=plans.find(p=>p.id==='pan-fireland');
assert.equal(fire.ids[0],'pan-riogrande');
assert.equal(fire.ids.at(-1),'pan-lapataia');
assert.ok(fire.stops.every(p=>p.country==='阿根廷'));
assert.match(fire.reason,/海峡|岛/);
assert.match(plans.find(p=>p.id==='pan-north').accessNote,/海岸|授权/);
assert.match(plans.find(p=>p.id==='pan-central').accessNote,/达连|无路/);
for(const image of panAmericanPhotos){
 assert.ok(image.author&&image.title&&image.license&&image.licenseUrl&&image.changes&&image.verifiedOn);
 assert.ok(image.source.startsWith('https://commons.wikimedia.org/wiki/File:'));
 assert.equal(editorialPlacePhotos['pan-'+image.id],'pan-photo-'+image.id);
}
assert.ok(nodes.some(n=>editorialPlacePhotos[n.id]===themeMedia.panamerican.photo));
homeState.interest='drives';homeState.area='美洲';homeState.query='泛美';
assert.ok(matchingDiscovery().some(x=>x.theme.id==='panamerican'));
homeState.query='厄瓜多尔';
const theme=themes.find(t=>t.id==='panamerican');
assert.ok(discoveryRouteMatches({plan:plans.find(p=>p.id==='pan-andes'),theme}));
assert.ok(!discoveryRouteMatches({plan:fire,theme}));
assert.ok(buildPlans('panamerican',0,14).every(p=>p.days<=14));
`,context);
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.indexOf('src="roads.js"')<html.indexOf('src="panamerican.js"'));
assert.ok(html.indexOf('src="panamerican.js"')<html.indexOf('src="flow.js"'));
console.log('PASS Pan-American: 31 detailed places, 7 chapters, Darien break, island extension without fictitious road, country discovery and matched open-license media.');

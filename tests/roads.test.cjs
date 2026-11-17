'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams});
const files=['catalog.js','tea.js','historical.js','walking.js','journeys.js','media.js','themes.js','planner.js','journey-plans.js','map-style.js','journey-design.js','editorial.js','art-media.js','art-context.js','route-media.js','discovery.js','reading.js','content-enrichment.js'];
for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),context,{filename:f});
const before=vm.runInContext('({places:places.length,plans:planTemplates.length,themes:themes.length})',context);
vm.runInContext(fs.readFileSync('roads.js','utf8'),context,{filename:'roads.js'});
context.assert=assert;context.before=before;
vm.runInContext(`
assert.equal(scenicRoads.length,13);
assert.equal(scenicRoadPlaceMap.size,79);
assert.equal(places.length,before.places+79);
assert.equal(themes.length,before.themes+1);
assert.equal(planTemplates.length,before.plans+13);
assert.equal(new Set(places.map(p=>p.id)).size,places.length);
assert.equal(new Set(planTemplates.map(p=>p.id)).size,planTemplates.length);
const plans=buildPlans('roads',0);
assert.equal(plans.length,13,'no invalid stop IDs silently omitted');
for(const p of plans){
 assert.ok(p.stops.length>=5);
 assert.equal(new Set(p.ids).size,p.ids.length);
 assert.ok(p.months.every(m=>m>=1&&m<=12));
 assert.ok(p.roadScope&&p.accessNote.length>60&&p.statusUrl.startsWith('https://'));
 assert.ok(p.sources.length>=2&&p.sources.every(s=>s.title&&s.url.startsWith('https://')));
 assert.equal(p.verifiedOn,'2026-11-17');
 const media=routeMediaCandidates(p);
 assert.ok(media.length,p.id+' has a matched photograph');
 for(const m of media){
  assert.ok(p.ids.includes(m.placeId));
  assert.ok(photoLibrary[m.key].author&&photoLibrary[m.key].license&&photoLibrary[m.key].licenseUrl);
 }
 if(p.topology==='loop')assert.equal(p.legs.at(-1).to.id,p.ids[0]);
 for(const n of p.stops){
  assert.ok(n.desc.trim()&&placeEssays[n.id].paragraphs[0].text.trim()&&placeEssays[n.id].paragraphs[0].text!==n.desc,n.id+' useful content');
  assert.ok(Number.isFinite(n.lon)&&Math.abs(n.lon)<=180&&Number.isFinite(n.lat)&&Math.abs(n.lat)<=90);
  assert.ok(n.coordinateNote.includes('非'));
  assert.ok(placeRouteAreas(n).length,n.id+' searchable continent');
  assert.ok(n.additionalSources.length>=2);
 }
}
for(const r of scenicRoads){
 assert.ok(scenicRoadPlans.some(p=>p.id==='roads-'+r.id));
 assert.ok(scenicRoadPlans.find(p=>p.id==='roads-'+r.id).ids.every(id=>scenicRoadPlaceMap.has(id)));
}
const loop=plans.find(p=>p.id==='roads-iceland1');
assert.equal(loop.topology,'loop');
assert.equal(plans.find(p=>p.id==='roads-milford').topology,'route','Milford is an out-and-back, not an invented loop');
assert.match(plans.find(p=>p.id==='roads-arctic').reason,/Yonge/);
assert.match(plans.find(p=>p.id==='roads-arctic').accessNote,/渡轮|冰桥/);
assert.match(plans.find(p=>p.id==='roads-california1').name,/SR1/);
assert.match(plans.find(p=>p.id==='roads-overseas').name,/US1/);
assert.match(plans.find(p=>p.id==='roads-utah5').accessNote,/多|SR9/);
for(const id of ['g219','g331','g228'])assert.ok(plans.find(p=>p.id==='roads-'+id).days>=60);
homeState.interest='drives';homeState.area='all';homeState.query='北冰洋';
assert.ok(matchingDiscovery().some(x=>x.theme.id==='roads'));
homeState.query='';homeState.area='非洲';
assert.ok(matchingDiscovery().some(x=>x.theme.id==='roads'));
const theme=themes.find(t=>t.id==='roads');
homeState.query='新西兰';homeState.area='all';
assert.ok(discoveryRouteMatches({plan:plans.find(p=>p.id==='roads-milford'),theme}));
assert.ok(!discoveryRouteMatches({plan:plans.find(p=>p.id==='roads-arctic'),theme}));
assert.equal(buildPlans('roads',0,7).some(p=>p.days>7),false);
for(const image of scenicRoadPhotos){
 assert.ok(image.source.startsWith('https://commons.wikimedia.org/wiki/File:'));
 assert.ok(image.path.startsWith('https://commons.wikimedia.org/wiki/Special:Redirect/file/'));
 assert.ok(image.changes.includes('CC BY-SA'));
}
`,context);
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.indexOf('src="reading.js"')<html.indexOf('src="roads.js"'));
assert.ok(html.indexOf('src="roads.js"')<html.indexOf('src="flow.js"'));
assert.ok(html.includes('href="roads.css"'));
console.log('PASS roads: 13 routes; 79 unique stops; source/permission metadata; matched photos; loop/return distinctions; continent/country discovery; date-bounded access notes.');

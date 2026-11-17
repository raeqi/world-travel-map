'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams});
const files=["catalog.js","tea.js","historical.js","walking.js","journeys.js","media.js","themes.js","planner.js","journey-plans.js","map-style.js","journey-design.js","editorial.js","art-media.js","art-context.js","depth-media.js","depth-context.js","route-photo-media.js","route-media.js","discovery.js","reading.js","cultural-routes.js","content-enrichment.js","canal-context.js","landscape-context.js"];
for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),context,{filename:f});
const before=vm.runInContext('({places:places.length,plans:planTemplates.length,themes:themes.length})',context);
vm.runInContext(fs.readFileSync('roads.js','utf8'),context,{filename:'roads.js'});
context.assert=assert;context.before=before;
vm.runInContext(`
assert.equal(scenicRoads.length,16);
assert.equal(scenicRoadPlaceMap.size,88);
assert.equal(places.length,before.places+88);
assert.equal(themes.length,before.themes+4);
assert.equal(planTemplates.length,before.plans+16);
assert.equal(new Set(places.map(p=>p.id)).size,places.length);
assert.equal(new Set(planTemplates.map(p=>p.id)).size,planTemplates.length);
const plans=scenicRoadThemes.flatMap(t=>buildPlans(t.id,0));
assert.equal(plans.length,16,'no invalid stop IDs silently omitted');
for(const p of plans){
 assert.ok(p.stops.length>=4);
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
 if(p.topology==='network'){assert.equal(p.legs.length,0);assert.equal(routeEdges(p.stops,p).length,0);}
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
for(const id of ['g219','g331','g228']){const p=plans.find(p=>p.id==='roads-'+id);assert.ok(p.days>=60);assert.equal(p.topology,'network');}
homeState.interest='drives';homeState.area='all';homeState.query='北冰洋';
assert.ok(matchingDiscovery().some(x=>x.theme.id==='drive-northamerica'));
homeState.query='';homeState.area='非洲';
assert.ok(matchingDiscovery().some(x=>x.theme.id==='drive-southern'));
const theme=themes.find(t=>t.id==='drive-southern');
homeState.query='新西兰';homeState.area='all';
assert.ok(discoveryRouteMatches({plan:plans.find(p=>p.id==='roads-milford'),theme}));
assert.ok(!discoveryRouteMatches({plan:plans.find(p=>p.id==='roads-arctic'),theme}));
assert.equal(scenicRoadThemes.flatMap(t=>buildPlans(t.id,0,7)).some(p=>p.days>7),false);

assert.equal(scenicRoadThemes.length,4);
assert.ok(!themes.some(t=>t.id==='roads'),'no all-world catch-all theme');
assert.ok([...scenicRoadPlaceMap.values()].every(p=>!p.themes.includes('roads')));
const memberships=scenicRoadThemes.flatMap(t=>t.roads);
assert.equal(memberships.length,16);
assert.equal(new Set(memberships).size,16,'every road has exactly one home');
for(const def of scenicRoadThemes){
 const theme=themes.find(t=>t.id===def.id);
 const nodes=[...scenicRoadPlaceMap.values()].filter(p=>p.themes.includes(def.id));
 assert.equal(buildPlans(def.id,0).length,def.roads.length);
 assert.ok(nodes.length);
 assert.ok(theme.view.zoom>=1&&Number.isFinite(theme.view.lon)&&Number.isFinite(theme.view.lat));
 assert.ok(nodes.some(p=>editorialPlacePhotos[p.id]===themeMedia[def.id].photo),'cover belongs to '+def.id);
 for(const plan of buildPlans(def.id,0))assert.ok(plan.stops.every(p=>p.themes.includes(def.id)));
}
assert.equal(buildPlans('drive-northamerica',0).length,5);
assert.ok(places.filter(p=>p.themes.includes('drive-northamerica')).every(p=>['美国','加拿大'].includes(p.country)));
const old=migrateScenicRoadHash('#theme=roads&view=places');
assert.ok(old.includes('interest=drives')&&!old.includes('theme=roads'));
assert.match(migrateScenicRoadHash('#theme=roads&view=plans&route=roads-arctic'),/theme=drive-northamerica/);
assert.match(migrateScenicRoadHash('#theme=roads&place=road-bixby'),/theme=drive-northamerica/);
for(const [oldTheme,newTheme] of Object.entries(scenicRoadThemeAliases)){
 const oldPlan=scenicRoadPlans.find(p=>p.theme===newTheme);
 const migrated=new URLSearchParams(migrateScenicRoadHash('#theme='+oldTheme+'&route='+oldPlan.id+'&place='+oldPlan.ids[0]).slice(1));
 assert.equal(migrated.get('theme'),newTheme);
 assert.equal(migrated.get('route'),oldPlan.id);
 assert.equal(migrated.get('place'),oldPlan.ids[0]);
}
assert.ok(scenicRoadThemes.every(t=>t.roads.length>=2),'avoid one-itinerary themes');
assert.equal(migrateScenicRoadHash('#theme=camino'),null);
homeState.query='';homeState.interest='drives';homeState.area='美洲';
const american=matchingDiscovery().filter(x=>scenicRoadThemeIds.has(x.theme.id));
assert.equal(american.length,1);
assert.ok(american.every(x=>x.areas.length===1&&x.areas[0]==='美洲'));
homeState.query='';homeState.area='欧洲';
assert.equal(matchingDiscovery().filter(x=>scenicRoadThemeIds.has(x.theme.id)).length,1);
for(const image of scenicRoadPhotos){
 assert.ok(image.source.startsWith('https://commons.wikimedia.org/wiki/File:'));
 assert.ok(image.path.startsWith('https://commons.wikimedia.org/wiki/Special:Redirect/file/'));
 assert.ok(image.changes&&image.verifiedOn);
}
`,context);
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.indexOf('src="reading.js"')<html.indexOf('src="roads.js"'));
assert.ok(html.indexOf('src="roads.js"')<html.indexOf('src="flow.js"'));
assert.ok(html.includes('href="roads.css"'));
console.log('PASS roads: 4 multi-itinerary collections; 16 routes; 88 unique stops; source/permission metadata; matched photos; loop/return distinctions; continent/country discovery; date-bounded access notes.');

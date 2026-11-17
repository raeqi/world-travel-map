'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams});
for(const file of ['catalog.js','tea.js','historical.js','walking.js','journeys.js','media.js','themes.js','planner.js','journey-plans.js','map-style.js','journey-design.js','editorial.js','art-media.js','art-context.js','depth-media.js','depth-context.js','route-photo-media.js','route-media.js','discovery.js','reading.js','content-enrichment.js','canal-context.js','landscape-context.js'])vm.runInContext(fs.readFileSync(file,'utf8'),c);
const data=vm.runInContext('({places,placeEssays,canalReadings,landscapeReadings,vanGoghWorks,photoLibrary,editorialPlacePhotos,plans:themes.flatMap(t=>buildPlans(t.id,0)),routeCoverChoice,routeMediaCandidates})',c);
assert.equal(data.canalReadings.length,11);assert.equal(data.landscapeReadings.length,18);
for(const [id] of [...data.canalReadings,...data.landscapeReadings]){const p=data.places.find(p=>p.id===id);assert.ok(p.source.startsWith('https://'));assert.ok(data.placeEssays[id].paragraphs.length>=2);assert.ok(new Set(data.placeEssays[id].paragraphs.map(p=>p.text)).size>=2);assert.ok(data.placeEssays[id].sources.some(s=>s.url===p.source));}
for(const [id] of data.canalReadings){const key=data.editorialPlacePhotos[id];assert.ok(key&&data.photoLibrary[key].path);assert.ok(fs.existsSync(data.photoLibrary[key].path));}
assert.equal(data.vanGoghWorks.length,8);
for(const [key,city] of [['vangogh-selfportrait','vangogh-paris'],['vangogh-ginoux','vangogh-arles'],['vangogh-shoes','vangogh-arles'],['vangogh-irises','vangogh-saintremy'],['vangogh-roses','vangogh-saintremy']]){const w=data.vanGoghWorks.find(w=>w.key===key);assert.equal(w.placeId,city);assert.ok(w.locationLabel);assert.equal(w.museumId,'impressionism-met');}
assert.equal(data.plans.filter(p=>data.routeMediaCandidates(p).length).length,89);
for(const plan of data.plans){const choice=data.routeCoverChoice(plan);assert.equal(!!choice,data.routeMediaCandidates(plan).length>0);if(choice)assert.ok(plan.stops.some(p=>p.id===choice.placeId));assert.equal(data.routeCoverChoice(plan)?.key,choice?.key);}
assert.equal(data.editorialPlacePhotos['wh-637'],'jiuzhaigou-photo');assert.equal(data.editorialPlacePhotos['wh-638'],'huanglong-photo');
assert.equal(data.places.length,1595);
console.log('PASS: eleven canal readings/photos, eighteen cross-theme readings, five precise Van Gogh associations, 89/95 exact-stop covers, stable varied selection, Jiuzhaigou/Huanglong separation, retained existing records.');

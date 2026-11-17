'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const context=vm.createContext({document:{addEventListener(){}}});
for(const f of ['catalog.js','tea.js','historical.js','walking.js','journeys.js','media.js','themes.js','planner.js','journey-plans.js','map-style.js','journey-design.js','editorial.js','art-media.js','art-context.js','depth-media.js','depth-context.js','route-photo-media.js'])vm.runInContext(fs.readFileSync(f,'utf8'),context);
const {works,stories,places,themes,photos,media}=vm.runInContext('({works:artWorks,stories:editionStories,places,themes,photos:photoLibrary,media:themeMedia})',context);
const sources=JSON.parse(fs.readFileSync('assets/editorial/sources.json'));
assert.equal(Object.keys(sources).length,80);assert.equal(themes.length,21);assert.equal(Object.keys(stories).length,11);
for(const [key,m] of Object.entries(sources)){
 assert.ok(['CC0','Public domain','CC BY 2.0','CC BY 2.5 cn','CC BY 3.0','CC BY 4.0','CC BY-SA 2.0','CC BY-SA 3.0','CC BY-SA 4.0'].includes(m.license),key);assert.ok(m.author&&m.source&&m.licenseUrl&&m.download&&m.changes);
 assert.ok(m.width<=1440&&m.height<=1200);const bytes=fs.readFileSync(m.path);assert.equal(bytes.length,m.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),m.sha256);
 assert.equal(photos[key].source,m.source);assert.equal(photos[key].license,m.license);assert.equal(photos[key].path,m.path);
}
for(const [id,s] of Object.entries(stories)){assert.ok(sources[media[id].photo]);assert.ok(s.caption&&s.body&&s.detail);assert.ok(!photos[id]?.illustration);if(s.second)assert.ok(sources[s.second]);}
assert.equal(works.length,16);assert.equal(new Set(works.map(w=>w.key)).size,16);
for(const w of works){
 const p=places.find(p=>p.id===w.placeId),museum=places.find(p=>p.id===w.museumId);assert.ok(p&&museum);assert.ok(w.placeId!==w.museumId);assert.equal(museum.type,'作品收藏');assert.ok(Math.abs(p.lon-museum.lon)+Math.abs(p.lat-museum.lat)>.01);assert.ok(w.artist&&/^(18|19)\d\d(?:–(?:18|19)\d\d)?$/.test(w.year)&&w.title&&w.collection&&w.record.startsWith('https://'));
}
assert.equal(works.find(w=>w.key==='pissarro-paris').placeId,'impressionism-montmartre');assert.ok(!JSON.stringify(works).includes('437127'));
assert.equal(new Set(places.map(p=>p.id)).size,places.length);
console.log('PASS: 80 local asset hashes/licences/dimensions, eleven authentic editions, sixteen unique paintings, distinct subject/museum geography, retained 21-theme atlas.');

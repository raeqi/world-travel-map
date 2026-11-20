'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),vm=require('node:vm');
const {provider,tileCoordinate,tileUrl,sampleSummary,sampleFailure}=require('../scripts/check-basemap-source.cjs'),{staticFile}=require('../scripts/run-real-map-review.cjs');
const base=provider(),style=JSON.parse(fs.readFileSync(base.style));
test('independent base uses only reviewed stable OSM source and pinned, hashed licensed local style/sprites',()=>{
 assert.equal(base.id,'versatiles');assert.equal(base.version,'9.1.0');assert.ok(!JSON.stringify(style.sources).includes('openfreemap'));assert.equal(Object.keys(style.sources).length,1);const vector=Object.values(style.sources)[0];assert.equal(vector.type,'vector');assert.equal(vector.maxzoom,14);assert.equal(new URL(vector.tiles[0]).hostname,'tiles.versatiles.org');assert.match(vector.attribution,/OpenStreetMap contributors/);
 const layers=new Set(style.layers.map(l=>l['source-layer']));for(const layer of ['boundaries','boundary_labels','streets','buildings','place_labels','pois'])assert.ok(layers.has(layer));assert.equal(layers.has('landcover'),false);
 for(const folder of ['versatiles-9.1.0','natural-earth-5.1.2']){const directory='assets/basemaps/'+folder+'/',manifest=JSON.parse(fs.readFileSync(directory+'source.json'));for(const [name,entry]of Object.entries(manifest.files)){const bytes=fs.readFileSync(directory+name);assert.equal(bytes.length,entry.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),entry.sha256);}}
 assert.match(fs.readFileSync('assets/basemaps/versatiles-9.1.0/LICENSE.md','utf8'),/MIT License/);
});
test('bundled sprites resolve at both a root and GitHub Pages subpath; label font matches the provider',()=>{
 const c=vm.createContext({URL});vm.runInContext(fs.readFileSync('basemap-providers.js','utf8'),c);c.style=style;
 for(const prefix of ['https://example.test/','https://example.test/world-travel-map/']){c.base=prefix;const resolved=vm.runInContext('resolveBasemapResources(style,base)',c);assert.equal(resolved.sprite[0].url,prefix+'assets/basemaps/versatiles-9.1.0/base');}
 assert.ok(style.layers.some(l=>l.layout?.['text-font']?.includes(base.labelFont[0])));const bridge=fs.readFileSync('real-map.js','utf8');assert.ok(!bridge.includes('Noto Sans Regular'));assert.match(bridge,/hash:false/);
});
test('243 licensed city context points include Beijing and Paris, without registering fake journey places',()=>{
 const data=JSON.parse(fs.readFileSync(base.cities)),source=JSON.parse(fs.readFileSync(path.join(path.dirname(base.cities),'source.json')));assert.equal(data.features.length,243);assert.equal(source.license,'Public domain');for(const f of data.features){assert.equal(f.geometry.type,'Point');const [lon,lat]=f.geometry.coordinates;assert.ok(Number.isFinite(lon)&&Math.abs(lon)<=180&&Number.isFinite(lat)&&Math.abs(lat)<=90);assert.ok(f.properties.name&&f.properties.nameEn);}
 for(const [name,x,y]of [['Beijing',116.4,39.9],['Paris',2.35,48.86]]){const point=data.features.find(f=>f.properties.nameEn===name);assert.ok(point);assert.ok(Math.abs(point.geometry.coordinates[0]-x)<.3&&Math.abs(point.geometry.coordinates[1]-y)<.3);}
 const bridge=fs.readFileSync('real-map.js','utf8');assert.match(bridge,/id:'basemap-city-labels'.*maxzoom:4/);assert.doesNotMatch(fs.readFileSync('basemap-providers.js','utf8'),/places\.push|planTemplates\.push|location\.hash|history\./);
});
test('source checks distinguish country labels from cities and actual streets from street-name labels',()=>{
 const world=sampleSummary('world',{z:2},{boundaries:4,boundary_labels:10},['France']);assert.equal(sampleFailure(world),null);assert.equal(world.placeLabels,0);assert.ok(sampleFailure({...world,countryLabels:0}));
 const paris=sampleSummary('paris',{z:14},{street_labels:600,streets:306,buildings:5106},['Paris']);assert.equal(paris.roads,306);assert.equal(sampleFailure(paris),null);assert.ok(sampleFailure({...paris,roads:0}));assert.equal(tileUrl('https://example.test/{z}/{x}/{y}',tileCoordinate(2.35,48.8566,14)),'https://example.test/14/8298/5636');
});
test('built-site QA serves module MIME correctly and refuses escape/symlink paths',()=>{
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'terra-map-server-'));try{const directory=path.join(temporary,'site');fs.mkdirSync(directory);fs.writeFileSync(path.join(directory,'map.mjs'),'export {};');fs.writeFileSync(path.join(temporary,'private.txt'),'outside');fs.symlinkSync(path.join(temporary,'private.txt'),path.join(directory,'link.txt'));assert.equal(staticFile(directory,'/map.mjs').type,'text/javascript; charset=utf-8');assert.equal(staticFile(directory,'/link.txt').status,403);assert.notEqual(staticFile(directory,'/..%2fprivate.txt').status,200);assert.equal(staticFile(directory,'/%not-valid').status,400);assert.equal(staticFile(directory,'/missing').status,404);}finally{fs.rmSync(temporary,{recursive:true,force:true})}
});
test('one-shot review cannot deploy; existing Pages deployment accepts main only, including manual runs',()=>{
 const review=fs.readFileSync('.github/workflows/real-map-review.yml','utf8');assert.match(review,/workflow_dispatch:/);assert.match(review,/types: \[labeled\]/);assert.match(review,/run-real-map-qa/);assert.match(review,/contents: read/);assert.doesNotMatch(review,/pages: write|id-token: write|deploy-pages|upload-pages-artifact|git push|pull_request_target/);assert.match(review,/if: always\(\)/);
 const pages=fs.readFileSync('.github/workflows/pages.yml','utf8'),conditions=[...pages.matchAll(/^\s+if: (.+)$/gm)].map(m=>m[1]);assert.equal(conditions.length,3);
 for(const expression of conditions)for(const [event,ref,expected]of [['push','refs/heads/main',true],['workflow_dispatch','refs/heads/main',true],['workflow_dispatch','refs/heads/review',false],['push','refs/heads/review',false],['pull_request','refs/pull/42/merge',false]]){const source=expression.replaceAll('github.event_name',JSON.stringify(event)).replaceAll('github.ref',JSON.stringify(ref));assert.equal(vm.runInNewContext(source),expected,event+' '+ref);}
});

test('job-level env uses only server-side contexts; runner tool paths are set after allocation',()=>{
 const source=fs.readFileSync('.github/workflows/real-map-review.yml','utf8'),jobEnv=source.match(/    env:\n([\s\S]*?)    steps:/)[1];assert.doesNotMatch(jobEnv,/\$\{\{\s*(runner|steps|job)\./);assert.match(source,/echo "NODE_PATH=\$RUNNER_TEMP/);assert.match(source,/echo "PLAYWRIGHT_MODULE=\$RUNNER_TEMP/);assert.ok(source.indexOf('echo "NODE_PATH=')<source.indexOf('name: Check code and application state'));
});

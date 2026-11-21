'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {normalizeRasterConfig,rasterTileTemplate,validateRasterSource,safeBasemapError}=require('../raster-config.js');
const config={provider:'maptiler',mapId:'streets-v4',apiKey:'fixture-not-a-service-key'};
test('raster provider requires an approved key and rejects arbitrary services and unsafe values',()=>{
 for(const c of [null,{}, {...config,apiKey:''}])assert.equal(normalizeRasterConfig(c).enabled,false);
 for(const c of [{...config,provider:'public-demo'}, {...config,mapId:'../secret'}, {...config,apiKey:'key&session_token=secret'}])assert.equal(normalizeRasterConfig(c).reason,'config-invalid');
 assert.equal(normalizeRasterConfig(config).enabled,true);assert.equal(rasterTileTemplate(config),'https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=fixture-not-a-service-key');
 assert.equal(safeBasemapError('https://example.org/tile?key=secret&session_token=secret'),'basemap-unavailable');
});
test('raster source rejects unauthorized, invalid and image-like metadata without logging raw request data',async()=>{
 for(const status of [401,403])await assert.rejects(validateRasterSource(config,{fetcher:async()=>({status,ok:false})}),/^Error: source-auth$/);
 await assert.rejects(validateRasterSource(config,{fetcher:async()=>{throw Error('https://host/?key=secret')}}),/^Error: source-unavailable$/);
 for(const json of [{error:'not a map'},{tiles:[]},{tiles:['https://other.example/tile']}])await assert.rejects(validateRasterSource(config,{fetcher:async()=>({status:200,ok:true,json:async()=>json})}),/^Error: source-invalid$/);
 assert.equal(await validateRasterSource(config,{fetcher:async()=>({status:200,ok:true,json:async()=>({tiles:[rasterTileTemplate(config)]})})}),true);
});
test('pinned Leaflet files have exact bytes and a redistribution license',()=>{
 const dir='assets/vendor/leaflet-1.9.4/',m=JSON.parse(fs.readFileSync(dir+'source.json'));assert.equal(m.version,'1.9.4');assert.equal(m.license,'BSD-2-Clause');
 for(const [file,row]of Object.entries(m.files)){const b=fs.readFileSync(dir+file);assert.equal(b.length,row.bytes);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),row.sha256);}
 assert.match(fs.readFileSync(dir+'LICENSE.txt','utf8'),/Redistribution/);
});
test('approved browser configuration is generated into output only, with consistent immutable and compatibility paths',()=>{
 const {buildSite}=require('../scripts/build-site.cjs'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'terra-raster-build-')),input=path.join(dir,'approved.raster.local.json'),source=fs.readFileSync('raster-runtime.js');
 try{fs.writeFileSync(input,JSON.stringify(config));const result=buildSite(path.join(dir,'site'),{rasterConfigFile:input}),asset=result.assets['raster-runtime.js'];const built=fs.readFileSync(path.join(result.output,asset.path));assert.match(built.toString(),/fixture-not-a-service-key/);assert.deepEqual(built,fs.readFileSync(path.join(result.output,'raster-runtime.js')));assert.deepEqual(fs.readFileSync('raster-runtime.js'),source);assert.ok(!source.includes(config.apiKey));fs.writeFileSync(input,'{"apiKey":"do-not-log-this-token",');assert.throws(()=>buildSite(path.join(dir,'bad'),{rasterConfigFile:input}),/^Error: Approved raster configuration is missing or invalid$/);}finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('date-line view changes recompute each original place world copy before a full 360 degree turn',()=>{
 const {rasterMapWrappedLongitude:wrap,rasterMapWorldKey:key}=require('../raster-map.js'),points=[{id:'east',lon:170,lat:10},{id:'west',lon:-175,lat:12}],before=JSON.stringify(points);
 assert.equal(Math.round(0/360),Math.round(177.5/360),'the former centre-only cache key missed this change');
 assert.notDeepEqual(key(points,0),key(points,177.5));assert.deepEqual(points.map(p=>wrap(p.lon,177.5)),[170,185]);assert.deepEqual(points.map(p=>wrap(p.lon,-182.5)),[-190,-175]);assert.equal(JSON.stringify(points),before,'source coordinates are never rewritten');
});

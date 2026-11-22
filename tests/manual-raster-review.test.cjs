'use strict';
// Offline preparation only. Never open a browser or request an OSM tile in CI.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawnSync}=require('node:child_process');
const {prepareReview}=require('../scripts/prepare-manual-raster-review.cjs');
test('manual live review CLI refuses CI before creating any files or network traffic',()=>{
 const destination=path.join(os.tmpdir(),'terra-never-created-'+process.pid),result=spawnSync(process.execPath,['scripts/prepare-manual-raster-review.cjs',destination],{env:{...process.env,CI:'true'},encoding:'utf8'});
 assert.equal(result.status,1);assert.match(result.stderr,/manual only/);assert.equal(fs.existsSync(destination),false);
});
test('offline preparation preserves default production configuration and requires an explicit browser start',()=>{
 const parent=fs.mkdtempSync(path.join(os.tmpdir(),'terra-manual-review-')),destination=path.join(parent,'preview'),before=fs.readFileSync('raster-runtime.js');
 try{
  const result=prepareReview(destination),dir=path.join(destination,'dist'),landing=fs.readFileSync(path.join(dir,'index.html'),'utf8'),adapter=fs.readFileSync(path.join(dir,'map/manual-review-adapter.js'),'utf8');
  assert.equal(result.tileNetworkRequestsByPreparation,0);assert.equal(result.productionChanges,false);assert.deepEqual(fs.readFileSync('raster-runtime.js'),before);
  assert.ok(!/<(?:iframe|img|script)[^>]+(?:src|href)=/i.test(landing),'landing must not initiate third-party or map loads');assert.match(landing,/button\.onclick/);assert.match(adapter,/Manual review consent missing/);assert.match(adapter,/keepBuffer:0/);assert.match(adapter,/maxZoom:16/);assert.ok(!adapter.includes('Cache-Control'));assert.ok(!adapter.includes('fetch('));
  assert.throws(()=>prepareReview(destination),/new absolute review directory/);assert.throws(()=>prepareReview(path.resolve('.manual-review-must-not-be-created')),/outside the repository/);
 }finally{fs.rmSync(parent,{recursive:true,force:true})}
});

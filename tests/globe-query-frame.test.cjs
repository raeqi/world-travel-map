'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const {runtime}=require('../scripts/theme-audit-runtime.cjs');
const pinned=import('../assets/vendor/maplibre-6.19.0/maplibre-gl.mjs');
// Capture the actual pinned CPU camera before DOM/GL initialization. No SDK
// source edits, tiles, browser mocks, or production use of private interfaces.
async function nativeCamera(width=1038,height=928,projection='globe'){
 const {Map:NativeMap,Style}=await pinned;let c;
 const original=NativeMap.prototype._resolveContainer,sentinel=Error('CPU camera captured');
 NativeMap.prototype._resolveContainer=function(){c=this._camera;throw sentinel};
 try{new NativeMap({renderWorldCopies:false,minZoom:0,maxZoom:19})}catch(e){if(e!==sentinel)throw e}finally{NativeMap.prototype._resolveContainer=original}
 Style.prototype._setProjectionInternal.call({_globalState:{},_applyProjection(p){c.migrateProjection(p.cameraProjection,p.projection.worldCoordinateHelper)}},projection);
 c.resize(width,height);c.setProjectionTransition(projection==='globe'?1:0);
 const map={_camera:c},project=p=>NativeMap.prototype.project.call(map,p),unproject=p=>NativeMap.prototype.unproject.call(map,p);
 return {c,project,unproject};
}
async function camera(projection='globe'){
 const {c,project,unproject}=await nativeCamera(1038,928,projection);
 const padding={top:70,bottom:78,left:32,right:32};c.jumpTo({center:[10,30],zoom:2,padding});
 const context=runtime(),points=JSON.parse(vm.runInContext("JSON.stringify(places.filter(p=>p.themes.includes('european-music-cities')))",context));
 const bounds=JSON.parse(vm.runInContext("JSON.stringify(realMapBounds(places.filter(p=>p.themes.includes('european-music-cities'))))",context));
 const fit=c.cameraForBounds(bounds,{padding,maxZoom:14});c.jumpTo({...fit,padding});
 return {c,points,fit,project,unproject};
}
test('actual 6.19 globe camera reproduces the failed music frame: all 37 places are on the visible surface',async()=>{
 const f=await camera();assert.equal(f.points.length,37);assert.ok(f.points.some(p=>p.id==='atlas-spillville'));
 for(const p of f.points){const q=f.project([p.lon,p.lat]),back=f.unproject(q);assert.ok(q.x>0&&q.x<1038&&q.y>0&&q.y<928,p.id);assert.ok(Math.abs(back.lng-p.lon)<.000001&&Math.abs(back.lat-p.lat)<.000001,p.id+' visible surface');}
 const salzburg=f.points.find(p=>p.id==='mozart-salzburg'),q=f.project([salzburg.lon,salzburg.lat]);
 assert.ok(Math.abs(q.x-920.6816476651336)<.000001);assert.ok(Math.abs(q.y-333.4412341989856)<.000001,'matches actual failed CI camera, not a convenient substitute');
 const corners=[[0,0],[1038,0],[1038,928],[0,928]].map(f.unproject);
 assert.ok(Math.max(...corners.map(p=>p.lat))<44);
 assert.ok(f.unproject([519,0]).lat>84,'curved screen top contains northern geography missed by corner polygon');
 assert.equal(f.points.filter(p=>p.lat<=Math.max(...corners.map(p=>p.lat))).length,3,'only Rome, Valldemossa and Spillville lie below that false northern edge');
});
test('controlled Mercator fit has no curved northern cap while preserving the identical 37 coordinates',async()=>{
 const f=await camera('mercator'),top=f.unproject([519,0]);assert.ok(top.lat>Math.max(...f.points.map(p=>p.lat)));
 for(const p of f.points){const q=f.project([p.lon,p.lat]),back=f.unproject(q);assert.ok(Math.abs(back.lng-p.lon)<.000001&&Math.abs(back.lat-p.lat)<.000001);}
});
test('actual globe can project a back-side point inside the screen, but inverse surface ray rejects it',async()=>{
 const f=await camera(),front=f.c.getCenter(),p=[front.lng+180,-front.lat],q=f.project(p),back=f.unproject(q);
 assert.ok(q.x>0&&q.x<1038&&q.y>0&&q.y<928);assert.ok(Math.abs(back.lat-p[1])>1||Math.abs(back.lng-p[0])>1);
});
test('actual native pixels preserve the 24px separation requirement for Naoshima and Paris in both viewports',async()=>{
 const context=runtime();
 for(const [width,height]of [[1038,928],[390,337]])for(const [theme,id]of [['setouchi-art','naoshima-honmura'],['paris-sculpture','paris-sculpture-left-bank']]){
  const {c,project}=await nativeCamera(width,height),points=JSON.parse(vm.runInContext(`JSON.stringify(buildPlans('${theme}',0).find(p=>p.id==='${id}').stops)`,context));
  // Native globe transitions to Mercator at street zoom. The old Canvas r and
  // screen(project(...)) are unrelated to these actual native pixel distances.
  c.setProjectionTransition(0);const padding={top:Math.min(70,height*.2),bottom:78,left:32,right:32};c.jumpTo({center:[points[0].lon,points[0].lat],zoom:14,padding});
  const bounds=JSON.parse(vm.runInContext(`JSON.stringify(realMapBounds(buildPlans('${theme}',0).find(p=>p.id==='${id}').stops))`,context)),fit=c.cameraForBounds(bounds,{padding,maxZoom:14});c.jumpTo({...fit,padding});
  const pixels=points.map(p=>project([p.lon,p.lat])),minimum=Math.min(...pixels.flatMap((p,i)=>pixels.slice(i+1).map(q=>Math.hypot(p.x-q.x,p.y-q.y))));assert.ok(minimum>=24,id+' '+width+' native pixels '+minimum);
 }
});

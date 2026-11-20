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
 const context=runtime();assert.equal(context.realMapGlobeCamera(f.points,f.fit,{width:1038,height:928},{top:70,bottom:78,left:32,right:32},f.c.getVerticalFieldOfView()),null,'already-visible music frame stays unchanged');
});
test('globe cap fitting keeps city fits and non-frameable antipodes unchanged without mutating coordinates',()=>{
 const context=runtime(),points=[{lon:0,lat:0},{lon:180,lat:0}],before=JSON.stringify(points),rect={width:1038,height:928},padding={top:70,bottom:78,left:32,right:32};
 assert.equal(context.realMapGlobeCamera(points,{center:{lng:90,lat:0},zoom:1},rect,padding,36.86989764584402),null);assert.equal(JSON.stringify(points),before);
 assert.equal(context.realMapGlobeCamera([{lon:2.3,lat:48.8},{lon:2.4,lat:48.9}],{center:{lng:2.35,lat:48.85},zoom:12},rect,padding,36.86989764584402),null);
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
  const bounds=JSON.parse(vm.runInContext(`JSON.stringify(realMapBounds(buildPlans('${theme}',0).find(p=>p.id==='${id}').stops))`,context)),fit=c.cameraForBounds(bounds,{padding,maxZoom:14,absolutePadding:true});c.jumpTo({...fit,padding});
  const pixels=points.map(p=>project([p.lon,p.lat])),minimum=Math.min(...pixels.flatMap((p,i)=>pixels.slice(i+1).map(q=>Math.hypot(p.x-q.x,p.y-q.y))));assert.ok(minimum>=24,id+' '+width+' native pixels '+minimum);
 }
});
test('original Gauguin France/Pacific comparison keeps every point on the visible globe and inside padding',async()=>{
 const context=runtime();
 for(const [width,height]of [[1038,928],[390,337.109375]])for(const scope of ['plan','theme']){
  const points=JSON.parse(vm.runInContext(scope==='plan'?"JSON.stringify(buildPlans('gauguin',0).find(p=>p.id==='atlas-gauguin-places').stops)":"JSON.stringify(places.filter(p=>p.themes.includes('gauguin')))",context));
  const {c,project,unproject}=await nativeCamera(width,height),padding={top:Math.min(70,height*.2),bottom:78,left:32,right:32};c.jumpTo({center:[0,20],zoom:2,padding});
  context.testPoints=points;const bounds=JSON.parse(vm.runInContext('JSON.stringify(realMapBounds(testPoints))',context)),candidate=c.cameraForBounds(bounds,{padding,maxZoom:14,absolutePadding:true});
  const adjust=typeof context.realMapGlobeCamera==='function'?context.realMapGlobeCamera(points,candidate,{width,height},padding,c.getVerticalFieldOfView()):null;c.jumpTo({...candidate,...adjust,padding});
  for(const p of points){const q=project([p.lon,p.lat]),back=unproject(q),delta=((back.lng-p.lon+540)%360)-180;assert.ok(Math.abs(delta)<.00001&&Math.abs(back.lat-p.lat)<.00001,scope+' '+width+' '+p.id+' visible surface');assert.ok(q.x>padding.left&&q.x<width-padding.right&&q.y>padding.top&&q.y<height-padding.bottom,scope+' '+width+' '+p.id+' padded viewport');}
 }
});
test('actual native overview after a detail view must replace its old padding, not add it twice',async()=>{
 for(const [width,height]of [[1038,928],[390,337.109375]]){
  const context=runtime(),points=JSON.parse(vm.runInContext("JSON.stringify(buildPlans('gauguin',0).find(p=>p.id==='atlas-gauguin-places').stops)",context)),{c,project,unproject}=await nativeCamera(width,height);
  c.setProjectionTransition(0);c.jumpTo({center:[points[0].lon,points[0].lat],zoom:14,padding:{top:Math.min(70,height*.2),bottom:width===390?154:78,left:32,right:width===390?32:435}});
  const rect={left:0,top:60,right:width,bottom:height+60,width,height},host={getBoundingClientRect:()=>rect,classList:{toggle(){}}},detail={hidden:true},sources={'terra-places':{setData(data){this.data=data}},'terra-routes':{setData(data){this.data=data}}};
  const map={getCenter:()=>c.getCenter(),getZoom:()=>c.getZoom(),getProjection:()=>({type:'globe'}),getVerticalFieldOfView:()=>c.getVerticalFieldOfView(),getContainer:()=>host,getSource:id=>sources[id],setPaintProperty(){},cameraForBounds:(bounds,opts)=>c.cameraForBounds(bounds,opts),flyTo:opts=>c.jumpTo(opts),fitBounds(bounds,opts){const fit=c.cameraForBounds(bounds,opts);if(fit)c.jumpTo({...fit,padding:opts.padding})}};
  Object.assign(context,{testMap:map,document:{querySelector:s=>s==='.map'?host:detail},innerWidth:width===390?390:1440,selected:null,previewStops:points,previewTheme:true,trip:[],activePlan:{id:'atlas-gauguin-places',topology:'network'},camera:null,lon:points[0].lon,lat:points[0].lat,zoom:8192,targetZoom:8192,dirty:false,mapPoints:()=>points,activeTheme:vm.runInContext("themes.findIndex(t=>t.id==='gauguin')",context)});
  vm.runInContext('realBasemap.map=testMap;realBasemap.ready=true;',context);context.realMapFit(points,false);c.setProjectionTransition(1);
  for(const p of points){const q=project([p.lon,p.lat]),back=unproject(q),delta=((back.lng-p.lon+540)%360)-180;assert.ok(Math.abs(delta)<.00001&&Math.abs(back.lat-p.lat)<.00001,width+' '+p.id+' after detail is on visible sphere');assert.ok(q.x>32&&q.x<width-32&&q.y>Math.min(70,height*.2)&&q.y<height-78,width+' '+p.id+' after detail is in overview padding');}
  assert.equal(sources['terra-routes'].data.features.length,0,'no invented France/Pacific travel edge');
 }
});

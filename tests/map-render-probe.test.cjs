'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const {mapViewReady,probeMapFrame,assertSelectionFrame,probeRouteFrame,routeFrameReady,probeRouteData}=require('../scripts/map-render-probe.cjs');
const pinned=import('../assets/vendor/maplibre-6.19.0/maplibre-gl.mjs');
function readiness(map,active=true,loading=false){return vm.runInNewContext('('+mapViewReady.toString()+')(requireNative)',{realMapActive:()=>active,realBasemap:{map,loading},selected:{id:'a'},camera:null,requireNative:true});}
test('actual pinned MapLibre update leaves previous tiles loaded while the new frame is pending',async()=>{
 const {Map}=await pinned,map={style:{_loaded:true,loaded:()=>true,tileManagers:{previousView:{areTilesLoaded:()=>true}}},_styleDirty:false,_sourcesDirty:false,repaints:0,triggerRepaint(){this.repaints++},isMoving:()=>false};
 map.loaded=Map.prototype.loaded;map.areTilesLoaded=Map.prototype.areTilesLoaded;
 assert.equal(readiness(map),true);
 Map.prototype._update.call(map,false); // exact operation in MapLibre move/moveend handlers
 assert.equal(map.areTilesLoaded(),true);assert.equal(map.isMoving(),false);assert.equal(map.loaded(),false);assert.equal(map.repaints,1);assert.equal(readiness(map),false);
 map._sourcesDirty=false;assert.equal(readiness(map),true);
});
test('legacy null camera cannot finish a native animation or initial style handoff',async()=>{
 const {Map}=await pinned,map={_styleDirty:false,_sourcesDirty:false,style:{loaded:()=>true,tileManagers:{}},isMoving:()=>true,loaded:Map.prototype.loaded,areTilesLoaded:Map.prototype.areTilesLoaded};
 const run=(active,loading)=>vm.runInNewContext('('+mapViewReady.toString()+')(false)',{realMapActive:()=>active,realBasemap:{map,loading},selected:{id:'a'},camera:null});
 assert.equal(run(true,false),false);assert.equal(run(false,true),false);assert.equal(run(false,false),true);assert.equal(readiness(null,false),false);
 map.isMoving=()=>false;map.style.loaded=()=>false;assert.equal(run(true,false),false);
});
function fixture(){
 const box={left:390,top:62,right:1440,bottom:1000,width:1050,height:938},host={tagName:'DIV',id:'real-map',className:'',isConnected:true,hidden:false,getBoundingClientRect:()=>box,parentElement:null,contains:el=>el===canvas},canvas={tagName:'CANVAS',id:'globe',className:'maplibregl-canvas',isConnected:true,hidden:false,width:1050,height:938,parentElement:host,getBoundingClientRect:()=>box};
 const point={id:'wh-1752',lon:21.87,lat:61.60},feature={type:'Feature',properties:{id:point.id,selected:true},geometry:{type:'Point',coordinates:[point.lon,point.lat]}},layers=[{id:'base-land',source:'osm',type:'fill'},{id:'terra-points',source:'terra-places',type:'circle'},{id:'terra-selected',source:'terra-places',type:'circle'}];
 const rendered=layers.map(layer=>({source:layer.source,layer,properties:layer.source==='terra-places'?feature.properties:{}})),events={},gl={isContextLost:()=>false,drawingBufferWidth:1050,drawingBufferHeight:938,VERSION:1,RENDERER:2,getParameter:key=>key===1?'WebGL 2':'fixture'};
 const map={on(type,fn){events[type]=fn},isMoving:()=>false,loaded:()=>true,areTilesLoaded:()=>true,isStyleLoaded:()=>true,getCenter:()=>({lng:point.lon,lat:point.lat}),getZoom:()=>14,getBearing:()=>0,getPitch:()=>0,getProjection:()=>({type:'globe'}),getPadding:()=>({left:24,right:440,top:24,bottom:24}),getCanvas:()=>canvas,getContainer:()=>host,painter:{context:{gl}},project:()=>({x:300,y:300}),getStyle:()=>({sources:{osm:{type:'vector'},'terra-places':{type:'geojson'}},layers}),getSource:id=>({serialize:()=>({data:id==='terra-places'?{features:[feature]}:'tiles'})}),isSourceLoaded:()=>true,querySourceFeatures:id=>id==='terra-places'?[feature]:[],queryRenderedFeatures(_box,options){return options?.layers?rendered.filter(f=>options.layers.includes(f.layer.id)):rendered}};
 const env={performance:{now:()=>42},window:{},realBasemap:{map,failed:false,loading:false,baseSeen:true},realMapActive:()=>true,currentBasemapProvider:()=>({id:'fixture'}),selected:point,placesById:new Map([[point.id,point]]),document:{querySelector:selector=>selector==='#globe'?canvas:null,querySelectorAll:()=>[canvas],elementFromPoint:()=>canvas},getComputedStyle:el=>({display:el.display||'block',visibility:'visible',opacity:'1',overflow:'hidden'})};
 return {map,canvas,host,point,rendered,events,gl,env,probe:()=>JSON.parse(JSON.stringify(vm.runInNewContext('('+probeMapFrame.toString()+')("wh-1752")',env)))};
}
test('one synchronous sample captures source input, actual point layers, current base, canvas, camera and GL',()=>{
 const f=fixture(),frame=f.probe();assertSelectionFrame(frame,f.point.id);assert.equal(frame.rendered.base,1);assert.equal(frame.layers.find(l=>l.id==='terra-selected').selectedAtPoint,1);assert.deepEqual(frame.sources.find(s=>s.id==='terra-places').inputMatches[0].geometry.coordinates,[21.87,61.6]);assert.equal(frame.canvas.activeGlobe,true);assert.equal(frame.context.lost,false);
 f.events.render({});f.events.sourcedata({sourceId:'terra-places',isSourceLoaded:true});const next=f.probe();assert.equal(next.events.renders,1);assert.equal(next.events.recent[1].sourceId,'terra-places');
});
test('a loaded map with missing exact marker still fails; unrelated point and source input cannot pass',()=>{
 const f=fixture();f.rendered.forEach(feature=>{if(feature.source==='terra-places')feature.properties={id:'other'}});const frame=f.probe();assert.equal(frame.ready.loaded,true);assert.equal(frame.sources.find(s=>s.id==='terra-places').inputMatches.length,1);assert.throws(()=>assertSelectionFrame(frame,f.point.id),/Selected marker must actually be rendered/);
});
test('historical baseTileSeen cannot pass a blank current base, even with a selected marker',()=>{
 const f=fixture();f.rendered.splice(0,1);const frame=f.probe();assert.equal(frame.baseTileSeen,true);assert.equal(frame.layers.find(l=>l.id==='terra-selected').selectedAtPoint,1);assert.throws(()=>assertSelectionFrame(frame,f.point.id),/Current viewport must contain rendered vector basemap/);
});
test('hidden, removed, or covered canvas and lost GL context fail independently of successful feature queries',()=>{
 for(const failure of ['hidden','removed','covered','lost']){const f=fixture();if(failure==='hidden')f.host.display='none';if(failure==='removed')f.canvas.isConnected=false;if(failure==='covered')f.env.document.elementFromPoint=()=>({tagName:'ASIDE',id:'detail'});if(failure==='lost')f.gl.isContextLost=()=>true;const frame=f.probe();assert.ok(frame.rendered.base>0&&frame.layers[0].selectedAtPoint>0);assert.throws(()=>assertSelectionFrame(frame,f.point.id));}
});
test('sparse or unavailable engines remain unknown in diagnostics, not fabricated context-loss/network diagnoses',()=>{
 const frame=vm.runInNewContext('('+probeMapFrame.toString()+')()', {performance:{now:()=>0},realBasemap:{map:null,failed:false,baseSeen:true}});assert.equal(frame.fallback,false);assert.equal(frame.active,null);assert.equal(frame.baseTileSeen,true);assert.equal(frame.context,undefined);assert.equal(frame.sources,undefined);assert.deepEqual(Array.from(frame.errors),[]);
});

test('route framing uses native projected pixels and actual circle IDs, retaining orthographic fallback',()=>{
 const f=fixture();f.map.unproject=()=>({lng:f.point.lon,lat:f.point.lat});f.env.mapPoints=()=>[f.point];const run=()=>JSON.parse(JSON.stringify(vm.runInNewContext('('+probeRouteFrame.toString()+')()',f.env)));
 let v=run();assert.equal(v.native,true);assert.equal(v.w,1050);assert.equal(v.base,1);assert.equal(v.points[0].rendered,true);assert.equal(v.points[0].x,300);
 f.rendered.forEach(x=>{if(x.source==='terra-places')x.properties={id:'other'}});assert.equal(run().points[0].rendered,false);
 const legacy=vm.runInNewContext('('+probeRouteFrame.toString()+')()', {realMapActive:()=>false,mapPoints:()=>[f.point],w:200,h:100,project:()=>[0,0,1],screen:()=>[100,50]});assert.equal(legacy.native,false);assert.equal(legacy.points[0].z,1);
});
test('local circle queries retain a globe-cap point missed by a whole-viewport geographic polygon',()=>{
 const f=fixture();f.env.mapPoints=()=>[f.point];f.map.unproject=()=>({lng:f.point.lon,lat:f.point.lat});
 const query=f.map.queryRenderedFeatures.bind(f.map);f.map.queryRenderedFeatures=(box,options)=>box?query(box,options):f.rendered.filter(x=>x.source!=='terra-places');
 const frame=vm.runInNewContext('('+probeRouteFrame.toString()+')()',f.env);
 assert.equal(frame.points[0].viewportQuery,false);assert.equal(frame.points[0].circleRendered,true);assert.equal(frame.points[0].rendered,true);
 f.map.queryRenderedFeatures=()=>f.rendered.filter(x=>x.source!=='terra-places');
 assert.equal(vm.runInNewContext('('+probeRouteFrame.toString()+')()',f.env).points[0].rendered,false,'source/input coordinates cannot substitute for an actual circle');
});
test('an in-bounds back-side projection fails even if a circle query returns its ID',()=>{
 const f=fixture();f.env.mapPoints=()=>[f.point];f.map.unproject=()=>({lng:f.point.lon+180,lat:-f.point.lat});
 const frame=vm.runInNewContext('('+probeRouteFrame.toString()+')()',f.env),p=frame.points[0];
 assert.ok(p.x>0&&p.x<frame.w&&p.y>0&&p.y<frame.h);assert.equal(p.circleRendered,true);assert.equal(p.onSurface,false);assert.equal(p.rendered,false);assert.ok(p.surfaceError>179);
});
test('route overview readiness allows no selection but excludes pending native motion and style handoff',()=>{
 const f=fixture(),run=()=>vm.runInNewContext('('+routeFrameReady.toString()+')()',f.env);assert.equal(run(),true);f.map.isMoving=()=>true;assert.equal(run(),false);
 const legacy={realMapActive:()=>false,realBasemap:{loading:true},camera:null,zoom:1,targetZoom:1};assert.equal(vm.runInNewContext('('+routeFrameReady.toString()+')()',legacy),false);legacy.realBasemap.loading=false;assert.equal(vm.runInNewContext('('+routeFrameReady.toString()+')()',legacy),true);
});

test('route data uses actual pinned GeoJSONSource getData for both tagged representations and preserves endpoints',async()=>{
 const {GeoJSONSource}=await pinned,features=[{type:'Feature',properties:{from:'a',to:'b'},geometry:{type:'LineString',coordinates:[[1,2],[3,4]]}}],stops=[{id:'a'},{id:'b'}];
 for(const tagged of [{geojson:{type:'FeatureCollection',features}},{updateable:new Map([['edge',features[0]]])}]){
  const source={_data:tagged,getData:GeoJSONSource.prototype.getData};assert.equal(source._data.features,undefined);
  const env={realBasemap:{map:{getSource:()=>source}},previewStops:stops,activePlan:{id:'kept'},selected:stops[0],validLocation:()=>true,routeEdges:()=>[[stops[0],stops[1]]]};
  const result=JSON.parse(JSON.stringify(await vm.runInNewContext('('+probeRouteData.toString()+')()',env)));assert.equal(result.edges,1);assert.deepEqual(result.endpoints,[['a','b']]);assert.deepEqual(result.endpoints,result.expectedEndpoints);
 }
});

'use strict';
// Test-only browser callbacks. No repaint, map mutation, network requests, or URL writes.
// Keep these functions self-contained: Playwright serializes them into the page.
function mapViewReady(requireNative=true){
 const active=typeof realMapActive==='function'&&realMapActive();
 if(active){const map=realBasemap.map;return !map.isMoving()&&map.loaded()&&map.areTilesLoaded();}
 if(requireNative)return false;
 // A null legacy camera does not mean a native flyTo/style handoff has finished.
 if(typeof realBasemap!=='undefined'&&realBasemap.loading)return false;
 return typeof selected!=='undefined'&&selected!==null&&typeof camera!=='undefined'&&camera===null;
}
function probeMapFrame(id){
 const errors=[],read=(name,fn)=>{try{return fn()}catch(e){errors.push({name,error:e.message});return null}},rect=el=>{if(!el)return null;const r=el.getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height,right:r.right,bottom:r.bottom}},describe=el=>el?{tag:el.tagName,id:el.id,class:typeof el.className==='string'?el.className:null}:null;
 const state=typeof realBasemap==='undefined'?null:realBasemap,map=state?.map;
 const result={at:performance.now(),selected:typeof selected==='undefined'?null:selected?.id,requested:id||null,fallback:state?.failed??null,loading:state?.loading??null,active:typeof realMapActive==='function'?realMapActive():null,provider:typeof currentBasemapProvider==='function'?currentBasemapProvider().id:null,baseTileSeen:state?.baseSeen??null,errors};
 if(!map)return result;
 result.bridge={focused:state.focused??null,cameraKey:state.cameraKey??null,currentCameraKey:typeof realMapCameraKey==='function'?realMapCameraKey():null,shared:{lon:typeof lon==='undefined'?null:lon,lat:typeof lat==='undefined'?null:lat,zoom:typeof zoom==='undefined'?null:zoom,targetZoom:typeof targetZoom==='undefined'?null:targetZoom,legacyCamera:typeof camera==='undefined'?null:camera}};
 // A bounded, passive event journal; frame/source ordering survives a later timeout.
 if(!window.__terraMapReview||window.__terraMapReview.map!==map){
  const journal=window.__terraMapReview={map,renders:0,idles:0,events:[]};
  for(const type of ['render','idle','sourcedata','error'])map.on(type,event=>{
   if(type==='render')journal.renders++;if(type==='idle')journal.idles++;
   journal.events.push({at:performance.now(),type,sourceId:event.sourceId||null,dataType:event.sourceDataType||null,sourceLoaded:event.isSourceLoaded??null,tileState:event.tile?.state||null,tile:event.tile?.tileID?.canonical?{z:event.tile.tileID.canonical.z,x:event.tile.tileID.canonical.x,y:event.tile.tileID.canonical.y}:null,error:event.error?.message||null});if(journal.events.length>80)journal.events.shift();
  });
 }
 result.events={renders:window.__terraMapReview.renders,idles:window.__terraMapReview.idles,recent:window.__terraMapReview.events.slice()};
 result.ready=read('readiness',()=>({moving:map.isMoving(),loaded:map.loaded(),tilesLoaded:map.areTilesLoaded(),styleLoaded:map.isStyleLoaded(),styleDirty:map._styleDirty??null,sourcesDirty:map._sourcesDirty??null}));
 result.camera=read('camera',()=>({center:map.getCenter(),zoom:map.getZoom(),bearing:map.getBearing(),pitch:map.getPitch(),padding:map.getPadding(),projection:map.getProjection()}));
 const canvas=map.getCanvas(),host=map.getContainer(),bounds=rect(host);
 const ancestors=[];for(let el=canvas;el;el=el.parentElement){const css=getComputedStyle(el);ancestors.push({...describe(el),hidden:el.hidden,display:css.display,visibility:css.visibility,opacity:css.opacity,overflow:css.overflow,rect:rect(el)});}
 result.canvas={...describe(canvas),connected:canvas.isConnected,inHost:host.contains(canvas),host:describe(host),hostRect:bounds,rect:rect(canvas),buffer:{width:canvas.width,height:canvas.height},activeGlobe:document.querySelector('#globe')===canvas,globeIds:document.querySelectorAll('#globe').length,ancestors};
 // Inspect the existing painter context; never create/change a GL context while probing.
 result.overlays=['#scene-art','#detail','.map-toolbar','.legend','.map .hint','#basemap-status'].flatMap(selector=>{const el=document.querySelector(selector);if(!el)return [];const css=getComputedStyle(el);return [{selector,hidden:el.hidden,display:css.display,visibility:css.visibility,opacity:css.opacity,pointerEvents:css.pointerEvents,zIndex:css.zIndex,rect:rect(el)}]});
 result.context=read('context',()=>{const gl=map.painter?.context?.gl;if(!gl)return {available:false,lost:null};return {available:true,lost:gl.isContextLost(),drawingBuffer:{width:gl.drawingBufferWidth,height:gl.drawingBufferHeight},version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER)}});
 const p=typeof placesById==='undefined'?null:placesById.get(id||result.selected),q=p&&read('project',()=>map.project([p.lon,p.lat]));
 if(p)result.expected={id:p.id,coordinates:[p.lon,p.lat]};
 if(q){const top=read('elementFromPoint',()=>document.elementFromPoint(bounds.left+q.x,bounds.top+q.y));result.projected={x:q.x,y:q.y,topElement:describe(top),canvasAtPoint:top===canvas,insideCanvas:q.x>=0&&q.x<bounds.width&&q.y>=0&&q.y<bounds.height};}
 const style=read('style',()=>map.getStyle());
 result.sources=Object.entries(style?.sources||{}).map(([sourceId,s])=>{
  const input=read(sourceId+'.serialize',()=>map.getSource(sourceId)?.serialize()?.data),features=input?.features;
  return {id:sourceId,type:s.type,loaded:read(sourceId+'.loaded',()=>map.isSourceLoaded(sourceId)),inputCount:features?.length??null,inputMatches:features?features.filter(f=>p&&f.properties?.id===p.id).map(f=>({id:f.properties.id,selected:f.properties.selected,geometry:f.geometry})):null,queried:read(sourceId+'.query',()=>{const f=map.querySourceFeatures(sourceId,s.type==='vector'?{sourceLayer:'boundaries'}:{});return {count:f.length,selectedMatches:f.filter(f=>p&&f.properties?.id===p.id).length}})};
 });
 const rendered=read('renderedFeatures',()=>map.queryRenderedFeatures())||[];
 const byLayer={};for(const f of rendered){const key=f.layer.id;byLayer[key]=(byLayer[key]||0)+1;}
 const base=rendered.filter(f=>!String(f.source).startsWith('terra-')&&f.source!=='basemap-cities');
 result.rendered={total:rendered.length,base:base.length,baseSymbols:base.filter(f=>f.layer.type==='symbol').length,byLayer};
 const ownIds=['terra-points','terra-selected','terra-icons','terra-labels','terra-order'];
 result.layers=ownIds.map(layerId=>{const layer=style?.layers.find(l=>l.id===layerId);return {id:layerId,exists:!!layer,type:layer?.type,source:layer?.source,visibility:layer?.layout?.visibility||'visible',minzoom:layer?.minzoom??null,maxzoom:layer?.maxzoom??null,filter:layer?.filter??null,paint:layer?.paint??null,rendered:byLayer[layerId]||0,selectedAtPoint:q&&layer?read(layerId+'.selected',()=>map.queryRenderedFeatures([[q.x-18,q.y-18],[q.x+18,q.y+18]],{layers:[layerId]}).filter(f=>f.properties.id===p.id).length):null}});
 return result;
}
function assertSelectionFrame(frame,id){
 const assert=require('node:assert/strict'),details=()=>JSON.stringify(frame);
 assert.equal(frame.selected,id,details());
 const [lng,lat]=frame.expected.coordinates,c=frame.camera.center;
 assert.ok(Math.abs(((c.lng-lng+540)%360)-180)<.001&&Math.abs(c.lat-lat)<.001,details());
 const gl=frame.context,canvas=frame.canvas,q=frame.projected,pad=frame.camera.padding;
 assert.ok(gl?.available&&gl.lost===false,'Existing WebGL context must be healthy: '+details());
 assert.ok(canvas?.connected&&canvas.inHost&&canvas.activeGlobe&&canvas.globeIds===1&&canvas.rect.width>0&&canvas.rect.height>0&&canvas.buffer.width>0&&canvas.buffer.height>0,'Active native canvas must be attached and measurable: '+details());
 assert.ok(canvas.ancestors.every(el=>!el.hidden&&el.display!=='none'&&el.visibility==='visible'&&Number(el.opacity)>0),'Native canvas must not be hidden: '+details());
 // Both the current base and the exact point must be present in this same sample.
 assert.ok(frame.rendered.base>0,'Current viewport must contain rendered vector basemap features: '+details());
 assert.ok(frame.layers.some(layer=>['terra-points','terra-selected'].includes(layer.id)&&layer.selectedAtPoint>0),'Selected marker must actually be rendered: '+details());
 assert.ok(q.x>pad.left&&q.x<canvas.hostRect.width-pad.right&&q.y>pad.top&&q.y<canvas.hostRect.height-pad.bottom,'Selected marker must be inside unobscured padded viewport: '+details());
 assert.ok(q.canvasAtPoint,'Selected marker must not be covered by a panel: '+details());
}
module.exports={mapViewReady,probeMapFrame,assertSelectionFrame};

// Framing checks must use the active geographic projection, not the old
// orthographic Canvas radius scaled by MapLibre's unrelated zoom units.
function probeRouteFrame(){
 const native=typeof realMapActive==='function'&&realMapActive(),points=mapPoints();
 if(!native)return {native:false,w,h,points:points.map(p=>{const q=project(p.lon,p.lat),s=screen(q);return {id:p.id,z:q[2],x:s[0],y:s[1]}})};
 const map=realBasemap.map,rect=map.getContainer().getBoundingClientRect(),features=map.queryRenderedFeatures(),ids=new Set(features.filter(f=>['terra-points','terra-selected'].includes(f.layer.id)).map(f=>f.properties.id));
 // A globe's screen rectangle is not a four-corner geographic polygon. Its
 // curved northern cap can lie outside that polygon even inside the viewport.
 // Query each actual marker locally, and reject back-side projections by
 // round-tripping its screen ray to the visible surface. Source data alone,
 // overlapping labels and an in-bounds screen coordinate cannot pass this.
 const input=map.getSource?.(map.getLayer('terra-points').source)?.serialize?.()?.data;
 return {native:true,w:rect.width,h:rect.height,camera:{center:map.getCenter(),zoom:map.getZoom(),padding:map.getPadding(),projection:map.getProjection()},ready:{moving:map.isMoving(),loaded:map.loaded(),tilesLoaded:map.areTilesLoaded()},navigation:{hash:typeof location==='undefined'?null:location.hash,theme:typeof themes==='undefined'?null:themes[activeTheme]?.id,plan:typeof activePlan==='undefined'?null:activePlan?.id||null,panel:typeof browsePanel==='undefined'?null:browsePanel},inputIds:input?.features?.map(f=>f.properties.id)||null,base:features.filter(f=>!String(f.source).startsWith('terra-')&&f.source!=='basemap-cities').length,points:points.map(p=>{
  const q=map.project([p.lon,p.lat]),back=map.unproject(q),rad=Math.PI/180,dlon=((back.lng-p.lon+540)%360)-180;
  const surfaceError=2*Math.asin(Math.min(1,Math.sqrt(Math.sin((back.lat-p.lat)*rad/2)**2+Math.cos(p.lat*rad)*Math.cos(back.lat*rad)*Math.sin(dlon*rad/2)**2)))/rad;
  const circleRendered=map.queryRenderedFeatures([[q.x-8,q.y-8],[q.x+8,q.y+8]],{layers:['terra-points','terra-selected']}).some(f=>f.properties.id===p.id),onSurface=surfaceError<.0001;
  return {id:p.id,x:q.x,y:q.y,rendered:circleRendered&&onSurface,circleRendered,onSurface,surfaceError,viewportQuery:ids.has(p.id)};
 })};
}
function routeFrameReady(matchNavigation=false){
 // A same-document page.goto(hash) can return while the previous map is still
 // perfectly loaded. Bind URL-driven checks to the restored application state.
 if(matchNavigation&&typeof location!=='undefined'){
  const q=new URLSearchParams(location.hash.slice(1)),route=activePlan?.id||(previewStops?'saved':null);
  if(themes[activeTheme]?.id!==q.get('theme')||browsePanel!==(q.get('view')||'places')||route!==q.get('route')||(selected?.id||null)!==q.get('place'))return false;
 }
 if(typeof realMapActive==='function'&&realMapActive()){
  const map=realBasemap.map;if(map.isMoving()||!map.loaded()||!map.areTilesLoaded())return false;
  // Do not accept the previous GeoJSON frame just because the basemap is idle.
  // Missing circles and back-side coordinates remain failures, never a pass.
  return mapPoints().every(p=>{
   const q=map.project([p.lon,p.lat]),back=map.unproject(q),rad=Math.PI/180,dlon=((back.lng-p.lon+540)%360)-180;
   const error=2*Math.asin(Math.min(1,Math.sqrt(Math.sin((back.lat-p.lat)*rad/2)**2+Math.cos(p.lat*rad)*Math.cos(back.lat*rad)*Math.sin(dlon*rad/2)**2)))/rad;
   return error<.0001&&map.queryRenderedFeatures([[q.x-8,q.y-8],[q.x+8,q.y+8]],{layers:['terra-points','terra-selected']}).some(f=>f.properties.id===p.id);
  });
 }
 return !(typeof realBasemap!=='undefined'&&realBasemap.loading)&&camera===null&&Math.abs(zoom-targetZoom)<.01;
}
module.exports.probeRouteFrame=probeRouteFrame;
module.exports.routeFrameReady=routeFrameReady;

async function probeRouteData(){
 // MapLibre 6 stores internal GeoJSON as a tagged/updateable representation.
 // Public getData() resolves that representation without assuming _data.features.
 const data=await realBasemap.map.getSource(realBasemap.map.getLayer('terra-route').source).getData(),expected=routeEdges(previewStops.filter(validLocation),activePlan);
 return {id:activePlan.id,place:selected.id,stops:previewStops.length,edges:data.features.length,expected:expected.length,endpoints:data.features.map(f=>[f.properties.from,f.properties.to]),expectedEndpoints:expected.map(([a,b])=>[a.id,b.id])};
}
module.exports.probeRouteData=probeRouteData;

// Passive source/tile evidence for missing circles. getData() reads the public
// GeoJSON representation; querying loaded tiles never refreshes or repairs them.
async function probePointSourceData(){
 const map=realBasemap.map,sourceId=map.getLayer('terra-points').source,source=map.getSource(sourceId),key=realBasemap.dataKey,camera=realBasemap.cameraKey;
 const input=await source.getData(),manager=map.style?.tileManagers?.[sourceId];
 const renderedIds=manager?.getRenderableIds?.()||[],allIds=manager?.getIds?.()||[];
 const tiles=allIds.map(id=>{const tile=manager.getTileByID(id),features=[],c=tile.tileID.canonical;let queryError=null;try{tile.querySourceFeatures(features,{})}catch(error){queryError=error.message}return {id:String(id),canonical:{z:c.z,x:c.x,y:c.y},overscaledZ:tile.tileID.overscaledZ,state:tile.state,renderable:renderedIds.includes(id),queryError,points:features.map(f=>({id:f.properties.id,coordinates:f.geometry.coordinates}))}});
 return {sourceId,input:input.features.map(f=>({id:f.properties.id,coordinates:f.geometry.coordinates,color:f.properties.color,selected:f.properties.selected})),sourceQuery:map.querySourceFeatures(sourceId).map(f=>({id:f.properties.id,coordinates:f.geometry.coordinates})),tiles,sourceLoaded:map.isSourceLoaded(sourceId),unchanged:sourceId===map.getLayer('terra-points').source&&key===realBasemap.dataKey&&camera===realBasemap.cameraKey};
}
module.exports.probePointSourceData=probePointSourceData;

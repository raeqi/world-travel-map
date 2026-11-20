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
  return {id:sourceId,type:s.type,loaded:read(sourceId+'.loaded',()=>map.isSourceLoaded(sourceId)),inputCount:features?.length??null,inputMatches:features?features.filter(f=>f.properties?.id===p?.id).map(f=>({id:f.properties.id,selected:f.properties.selected,geometry:f.geometry})):null,queried:read(sourceId+'.query',()=>{const f=map.querySourceFeatures(sourceId,s.type==='vector'?{sourceLayer:'boundaries'}:{});return {count:f.length,selectedMatches:f.filter(f=>p&&f.properties?.id===p.id).length}})};
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

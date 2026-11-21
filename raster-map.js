'use strict';
// Leaflet is an independent DOM/SVG + <img> engine. It never imports MapLibre,
// probes WebGL, or treats vector-source readiness as raster tile readiness.
const rasterBasemap={map:null,tiles:null,ready:false,loading:false,failed:false,epoch:0,timer:null,lib:null,mode:'auto',points:new Map(),route:null,dataKey:'',cameraKey:'',paddingKey:'',focused:null,loaded:0,errors:0,errorCode:null,controller:null,sourceValidated:false};
function rasterMapActive(){return !!rasterBasemap.map&&rasterBasemap.ready}
function rasterMapPreferred(){return rasterBasemap.mode!=='globe'&&currentRasterConfig().enabled}
function rasterMapControls(){
 const street=document.querySelector('#map-view-street'),globe=document.querySelector('#map-view-globe');if(!street||!globe)return;
 street.disabled=!currentRasterConfig().enabled;street.title=street.disabled?'真实街道底图尚未接入':'二维街道地图';
 street.setAttribute('aria-pressed',String(rasterMapActive()));globe.setAttribute('aria-pressed',String(!rasterMapActive()));
 document.querySelector('.map').setAttribute('aria-label',rasterMapActive()?'可交互二维街道地图':'可交互三维地球');
 document.querySelector('#rotate').hidden=rasterMapActive();
 const hint=document.querySelector('.hint');if(hint)hint.textContent=rasterMapActive()?'拖拽平移 · 滚轮 / 双指缩放 · 点击地点':'拖拽旋转 · 滚轮 / 双指缩放 · 点击点位探索';
}
function rasterMapCanvas(active){
 const host=document.querySelector('.map');host.classList.toggle('raster-map-active',active);host.classList.toggle('real-map-active',active||realBasemap.ready);
 document.querySelector('#raster-map').setAttribute('aria-hidden',String(!active));
 canvas.tabIndex=active?-1:0;canvas.setAttribute('aria-hidden',String(active));
 renderBasemapAttribution(active?{attribution:[{label:'© MapTiler',url:'https://www.maptiler.com/'},{label:'© OpenStreetMap contributors',url:'https://www.openstreetmap.org/copyright'}]}:currentBasemapProvider());
 rasterMapControls();
}
function rasterMapReadCamera(){
 if(!rasterMapActive())return;
 const map=rasterBasemap.map,c=map.getCenter();lon=realMapLongitude(c.lng);lat=c.lat;zoom=targetZoom=realMapLegacyZoom(map.getZoom());
 rasterBasemap.cameraKey=realMapCameraKey();dirty=true;document.querySelector('.map').classList.toggle('street-map',map.getZoom()>=8);
}
function rasterMapDispose(){
 const hadFocus=document.querySelector('#raster-map').contains(document.activeElement);
 clearTimeout(rasterBasemap.timer);rasterBasemap.controller?.abort();rasterBasemap.controller=null;rasterBasemap.epoch++;rasterBasemap.ready=false;rasterBasemap.loading=false;
 if(rasterBasemap.map)rasterBasemap.map.remove();rasterBasemap.map=null;rasterBasemap.tiles=null;rasterBasemap.points.clear();rasterBasemap.dataKey='';rasterBasemap.focused=null;
 rasterMapCanvas(false);if(hadFocus)canvas.focus({preventScroll:true});
}
function rasterMapFail(code){
 rasterBasemap.errorCode=safeBasemapError(code);rasterBasemap.failed=true;rasterMapDispose();camera=null;auto=false;
 zoom=targetZoom=Math.max(.8,Math.min(zoom,themeZoomLimit(),selected?5:2));
 if(selected&&validLocation(selected)){lon=selected.lon;lat=selected.lat;}else if(previewStops?.length)fitRoute(previewStops);
 realMapStatus('真实街道底图暂不可用，已保留离线地图和地点。',true);dirty=true;
 // Intentionally no error.message, request URL, tile src, key or session token.
 console.warn('Raster basemap unavailable.',{code:rasterBasemap.errorCode});
}
function rasterMapLoadLibrary(){
 if(globalThis.L)return Promise.resolve(globalThis.L);
 if(rasterBasemap.lib)return rasterBasemap.lib;
 rasterBasemap.lib=new Promise((resolve,reject)=>{
  const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('assets/vendor/leaflet-1.9.4/leaflet.css',document.baseURI).href;document.head.append(css);
  const script=document.createElement('script');script.src=new URL('assets/vendor/leaflet-1.9.4/leaflet.js',document.baseURI).href;
  script.onload=()=>globalThis.L?resolve(globalThis.L):reject(Error('engine-load-failed'));script.onerror=()=>reject(Error('engine-load-failed'));document.head.append(script);
 }).catch(()=>{rasterBasemap.lib=null;throw Error('engine-load-failed')});return rasterBasemap.lib;
}
function rasterMapLongitude(value){const c=rasterBasemap.map.getCenter().lng;return value+Math.round((c-value)/360)*360}
function rasterMapUpdateData(force=false){
 if(!rasterMapActive())return;
 const map=rasterBasemap.map,stops=(previewStops||(!previewTheme?trip:[])).filter(validLocation),order=new Map(stops.map((p,i)=>[p.id,i+1]));
 const points=[...new Map([...mapPoints(),...(selected?[selected]:[])].filter(validLocation).map(p=>[p.id,p])).values()];
 const key=JSON.stringify([activeTheme,points.map(p=>p.id),stops.map(p=>p.id),activePlan?.id,activePlan?.topology,selected?.id,Math.round(map.getCenter().lng/360)]);
 if(!force&&key===rasterBasemap.dataKey)return;
 for(const layer of rasterBasemap.points.values())layer.remove();rasterBasemap.points.clear();
 if(rasterBasemap.route)rasterBasemap.route.remove();
 const data=realMapRouteData(stops,activePlan);
 rasterBasemap.route=L.layerGroup(data.features.map(f=>{
  const shift=rasterMapLongitude(f.geometry.coordinates[0][0])-f.geometry.coordinates[0][0];
  return L.polyline(f.geometry.coordinates.map(([x,y])=>[y,x+shift]),{color:themes[activeTheme].colors.route,weight:3,opacity:.9,interactive:false});
 })).addTo(map);
 for(const p of points){
  const on=p===selected,n=order.get(p.id),layer=L.circleMarker([p.lat,rasterMapLongitude(p.lon)],{radius:on?9:n?7:5,color:on?'#173a46':'#ffffff',weight:on?3:2,fillColor:markerStyle(p).color,fillOpacity:1});
  layer.on('click',()=>select(p));layer.addTo(map);const el=layer.getElement();
  if(el){el.dataset.place=p.id;el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label',p.name);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(p)}});}
  layer.bindTooltip(p.name,{direction:'right',offset:[9,0],permanent:on});rasterBasemap.points.set(p.id,layer);
 }
 if(selected)rasterBasemap.points.get(selected.id)?.bringToFront();
 rasterBasemap.dataKey=key;
}
function rasterMapSetCenter(p,z,animate){
 const map=rasterBasemap.map,padding=realMapCurrentPadding();rasterBasemap.paddingKey=JSON.stringify(padding);
 const pixel=map.project([p.lat,rasterMapLongitude(p.lon)],z).subtract([(padding.left-padding.right)/2,(padding.top-padding.bottom)/2]);
 map.setView(map.unproject(pixel,z),z,{animate:animate&&realMapDuration()>0});
}
function rasterMapFocus(p,animate=true){
 if(!rasterMapActive()||!validLocation(p))return false;
 positionDetail();camera=null;auto=false;rasterBasemap.focused=p.id;rasterMapUpdateData();rasterMapReadCamera();
 const broad=/国家公园|自然保护|山脉|群岛|沙漠|峡谷|自然遗产/.test(p.name+' '+p.type);
 rasterMapSetCenter(p,Math.min(19,Math.max(rasterBasemap.map.getZoom(),broad?9:14)),animate);return true;
}
function rasterMapFit(points,animate=true){
 if(!rasterMapActive())return false;const bounds=realMapBounds(points);if(!bounds)return false;
 camera=null;auto=false;rasterBasemap.focused=null;rasterMapUpdateData();rasterMapReadCamera();const pad=realMapCurrentPadding();rasterBasemap.paddingKey=JSON.stringify(pad);
 if(bounds[0][0]===bounds[1][0]&&bounds[0][1]===bounds[1][1])rasterMapSetCenter({lon:bounds[0][0],lat:bounds[0][1]},14,animate);
 else rasterBasemap.map.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]],{paddingTopLeft:[pad.left,pad.top],paddingBottomRight:[pad.right,pad.bottom],maxZoom:14,animate:animate&&realMapDuration()>0});
 return true;
}
function rasterMapScale(value){if(!rasterMapActive())return false;camera=null;rasterBasemap.focused=null;rasterBasemap.map.setZoom(Math.max(0,Math.min(19,rasterBasemap.map.getZoom()+Math.log2(value))),{animate:false});return true}
function rasterMapStop(){if(rasterMapActive()){rasterBasemap.map.stop();rasterMapReadCamera()}}
function rasterMapResize(){
 if(!rasterMapActive())return;rasterBasemap.map.invalidateSize({pan:false});
 const key=JSON.stringify(realMapCurrentPadding());if(key!==rasterBasemap.paddingKey){rasterBasemap.paddingKey=key;if(selected&&rasterBasemap.focused===selected.id)rasterMapSetCenter(selected,rasterBasemap.map.getZoom(),false);}
}
function drawRasterMap(){
 if(!rasterMapActive())return;if(selected)positionDetail();rasterMapUpdateData();
 const key=realMapCameraKey();if(key!==rasterBasemap.cameraKey){rasterBasemap.map.setView([Math.max(-85,Math.min(85,lat)),lon],realMapZoom(zoom),{animate:false});rasterMapReadCamera();}
 rasterMapResize();hits=[...rasterBasemap.points].flatMap(([id])=>{const p=placesById.get(id),q=rasterBasemap.map.latLngToContainerPoint([p.lat,rasterMapLongitude(p.lon)]);return q.x>=0&&q.x<=w&&q.y>=0&&q.y<=h?[{p,x:q.x,y:q.y}]:[]});drawPointCount=hits.length;
 document.querySelector('#coords').textContent=`${Math.abs(lat).toFixed(2)}° ${lat>=0?'N':'S'} / ${Math.abs(lon).toFixed(2)}° ${lon>=0?'E':'W'}`;
}
function rasterMapEnterTheme(){
 if(rasterMapActive()){
  rasterBasemap.map.stop();camera=null;rasterBasemap.dataKey='';rasterMapUpdateData(true);
  rasterBasemap.map.setView([lat,lon],realMapZoom(zoom),{animate:false});rasterMapResize();rasterMapReadCamera();
 }else if(!rasterBasemap.failed)void rasterMapStart();
}
async function rasterMapStart(){
 if(rasterBasemap.map||rasterBasemap.loading)return;
 const config=currentRasterConfig();if(!config.enabled){rasterBasemap.errorCode=config.reason;return;}
 auto=false;document.querySelector('#rotate').setAttribute('aria-pressed','false');realMapVectorDispose();const epoch=++rasterBasemap.epoch;rasterBasemap.failed=false;rasterBasemap.loading=true;rasterBasemap.errorCode=null;rasterBasemap.sourceValidated=false;rasterBasemap.controller=new AbortController();
 realMapStatus('正在加载街道地图…');rasterBasemap.timer=setTimeout(()=>{if(epoch===rasterBasemap.epoch)rasterMapFail('tiles-timeout')},18000);
 try{
  const [lib]=await Promise.all([rasterMapLoadLibrary(),validateRasterSource(config,{signal:rasterBasemap.controller.signal})]);if(epoch!==rasterBasemap.epoch)return;rasterBasemap.sourceValidated=true;
  const reduced=realMapDuration()===0;
  const map=lib.map('raster-map',{center:[lat,lon],zoom:realMapZoom(zoom),minZoom:0,maxZoom:19,zoomSnap:0,zoomDelta:1,zoomControl:false,attributionControl:false,preferCanvas:false,zoomAnimation:!reduced,fadeAnimation:!reduced,markerZoomAnimation:!reduced});
  rasterBasemap.map=map;
  map.on('move',()=>{if(epoch===rasterBasemap.epoch)rasterMapReadCamera()});map.on('moveend',()=>{if(epoch===rasterBasemap.epoch)rasterMapUpdateData()});
  map.on('dragstart',()=>{stopTrip(true);auto=false;rasterBasemap.focused=null;document.querySelector('#rotate').setAttribute('aria-pressed','false')});
  const tiles=lib.tileLayer(rasterTileTemplate(config),{tileSize:256,minZoom:0,maxZoom:19,maxNativeZoom:19,keepBuffer:1,updateWhenIdle:true,noWrap:false,detectRetina:false});rasterBasemap.tiles=tiles;
  tiles.on('loading',()=>{if(epoch!==rasterBasemap.epoch)return;rasterBasemap.loaded=0;rasterBasemap.errors=0;clearTimeout(rasterBasemap.timer);rasterBasemap.timer=setTimeout(()=>{if(epoch===rasterBasemap.epoch)rasterMapFail('tiles-timeout')},18000)});
  tiles.on('tileerror',()=>{if(epoch===rasterBasemap.epoch)rasterBasemap.errors++});
  tiles.on('tileload',event=>{
   if(epoch!==rasterBasemap.epoch||!event.tile.complete||!event.tile.naturalWidth)return;
   rasterBasemap.loaded++;if(!rasterMapTileVisible(event.tile,document.querySelector('#raster-map').getBoundingClientRect()))return;clearTimeout(rasterBasemap.timer);
   if(!rasterBasemap.ready){
    rasterBasemap.ready=true;rasterBasemap.loading=false;rasterMapCanvas(true);rasterMapUpdateData(true);
    if(selected&&validLocation(selected))rasterMapFocus(selected,false);else if(previewStops?.length)rasterMapFit(previewStops,false);else if(atlasThemePlaceIds.has(themes[activeTheme].id))rasterMapFit(filtered(),false);else{rasterMapReadCamera();rasterMapResize();}
   }
   realMapStatus('');dirty=true;
  });
  tiles.on('load',()=>{if(epoch!==rasterBasemap.epoch||tiles.isLoading())return;const rect=document.querySelector('#raster-map').getBoundingClientRect(),visible=[...document.querySelectorAll('#raster-map .leaflet-tile')].some(t=>rasterMapTileVisible(t,rect));if((!rasterBasemap.loaded&&rasterBasemap.errors)||!visible)rasterMapFail('tile-load-failed');else clearTimeout(rasterBasemap.timer)});
  tiles.addTo(map);
 }catch(error){if(epoch===rasterBasemap.epoch)rasterMapFail(safeBasemapError(error?.message))}
}
function rasterMapTileVisible(tile,rect){
 if(!tile.complete||tile.naturalWidth!==256||tile.naturalHeight!==256)return false;
 const r=tile.getBoundingClientRect();return r.width>0&&r.height>0&&r.right>rect.left&&r.left<rect.right&&r.bottom>rect.top&&r.top<rect.bottom;
}
function rasterMapFrame(){
 const map=rasterBasemap.map,host=document.querySelector('#raster-map'),rect=host.getBoundingClientRect();
 const tiles=[...host.querySelectorAll('.leaflet-tile')].filter(t=>rasterMapTileVisible(t,rect));
 return {engine:'leaflet-raster',ready:rasterMapActive(),sourceValidated:rasterBasemap.sourceValidated,imageryVerified:false,tileImagesVisible:tiles.length,errorCode:rasterBasemap.errorCode,points:map?[...rasterBasemap.points].map(([id,layer])=>{const q=map.latLngToContainerPoint(layer.getLatLng());return {id,x:q.x,y:q.y,svg:!!layer.getElement(),inViewport:q.x>0&&q.x<rect.width&&q.y>0&&q.y<rect.height}}):[]};
}
function initializeRasterMap(){
 const street=document.querySelector('#map-view-street'),globe=document.querySelector('#map-view-globe');
 if(street)street.onclick=()=>{if(!currentRasterConfig().enabled)return;stopTrip();rasterBasemap.mode='street';rasterBasemap.failed=false;void rasterMapStart()};
 if(globe)globe.onclick=()=>{stopTrip();rasterBasemap.mode='globe';rasterMapStop();rasterMapDispose();realBasemap.failed=false;void realMapStart()};
 rasterMapControls();
}

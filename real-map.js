'use strict';
// MapLibre owns geographic rendering, never navigation or application data.
// Keep this file safe for the data-only VM loader (no eager browser access).
const realBasemap={map:null,ready:false,loading:false,failed:false,epoch:0,timer:null,errors:[],baseSeen:false,dataKey:'',cameraKey:'',paddingKey:'',focused:null,observer:null,controller:null};
const realMapAssets='assets/vendor/maplibre-6.19.0/';
const realMapStyle=currentBasemapProvider().style;
function realMapLongitude(value){return ((value+180)%360+360)%360-180}
function realMapZoom(value){return Math.max(0,Math.min(19,1+Math.log2(Math.max(.5,value))))}
function realMapLegacyZoom(value){return 2**(value-1)}
function realMapActive(){return realBasemap.ready&&!!realBasemap.map}
function realMapDuration(){return typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches?0:650}
function realMapCameraKey(){return [lon,lat,zoom].map(v=>v.toFixed(6)).join(',')}
// Smallest longitude interval, including routes crossing the date line.
function realMapBounds(points){
 const valid=points.filter(p=>Number.isFinite(p.lon)&&Number.isFinite(p.lat)&&Math.abs(p.lat)<=90);
 if(!valid.length)return null;
 const values=valid.map(p=>(p.lon%360+360)%360).sort((a,b)=>a-b);
 let gap=-1,start=values[0];
 for(let i=0;i<values.length;i++){const next=values[(i+1)%values.length]+(i===values.length-1?360:0),d=next-values[i];if(d>gap){gap=d;start=next%360}}
 let west=start,east=start+360-gap;if((west+east)/2>180){west-=360;east-=360}
 return [[west,Math.max(-85,Math.min(...valid.map(p=>p.lat)))],[east,Math.min(85,Math.max(...valid.map(p=>p.lat)))]];
}
// Great-circle samples; longitude unwrap prevents a false line across the world.
function realMapArc(a,b){
 const rad=Math.PI/180,vector=p=>[Math.cos(p.lat*rad)*Math.cos(p.lon*rad),Math.cos(p.lat*rad)*Math.sin(p.lon*rad),Math.sin(p.lat*rad)],A=vector(a),B=vector(b);
 const angle=Math.acos(Math.max(-1,Math.min(1,A.reduce((s,x,i)=>s+x*B[i],0))));
 if(angle<1e-7)return [[a.lon,a.lat],[b.lon+Math.round((a.lon-b.lon)/360)*360,b.lat]];
 // Antipodes have no unique shortest arc. Split honestly rather than invent one.
 if(Math.PI-angle<1e-5)return null;
 let previous=a.lon;
 return Array.from({length:65},(_,i)=>{const t=i/64,s=Math.sin(angle),aa=Math.sin((1-t)*angle)/s,bb=Math.sin(t*angle)/s,q=A.map((x,k)=>aa*x+bb*B[k]);let x=Math.atan2(q[1],q[0])/rad;x+=Math.round((previous-x)/360)*360;previous=x;return [x,Math.atan2(q[2],Math.hypot(q[0],q[1]))/rad]});
}
function realMapRouteData(stops,plan){return {type:'FeatureCollection',features:routeEdges(stops.filter(validLocation),plan).flatMap(([a,b])=>{const coordinates=realMapArc(a,b);return coordinates?[{type:'Feature',properties:{from:a.id,to:b.id},geometry:{type:'LineString',coordinates}}]:[]})}}
function realMapPadding(mapRect,detailRect,mobile){
 const padding={top:70,bottom:78,left:32,right:32};
 if(detailRect&&detailRect.width>0&&detailRect.height>0){
  if(mobile)padding.bottom=Math.max(padding.bottom,mapRect.bottom-detailRect.top+18);
  else padding.right=Math.max(padding.right,mapRect.right-detailRect.left+18);
 }
 // Always leave a usable viewport, even in a short landscape window.
 padding.top=Math.min(padding.top,Math.max(12,mapRect.height*.2));
 padding.bottom=Math.min(padding.bottom,Math.max(12,mapRect.height-padding.top-100));
 padding.right=Math.min(padding.right,Math.max(12,mapRect.width-padding.left-100));
 return padding;
}
function realMapCurrentPadding(){
 const rect=document.querySelector('.map').getBoundingClientRect(),detail=document.querySelector('#detail');
 return realMapPadding(rect,selected&&!detail.hidden?detail.getBoundingClientRect():null,innerWidth<=760);
}
function realMapStatus(message,retry=false){
 const el=document.querySelector('#basemap-status');if(!el)return;
 el.querySelector('span').textContent=message;el.hidden=!message;el.querySelector('button').hidden=!retry;
}
function realMapCanvas(active){
 const legacy=canvas,native=realBasemap.map?.getCanvas();
 legacy.id=active?'schematic-globe':'globe';legacy.tabIndex=active?-1:0;legacy.setAttribute('aria-hidden',String(active));
 if(native){native.id=active?'globe':'real-globe';native.tabIndex=active?0:-1;native.setAttribute('aria-hidden',String(!active));native.setAttribute('aria-label','真实地图：拖拽探索，滚轮或双指缩放，方向键移动，加减键缩放');}
 document.querySelector('.map').classList.toggle('real-map-active',active);document.querySelector('#real-map').setAttribute('aria-hidden',String(!active));
}
function realMapReadCamera(){
 const map=realBasemap.map;if(!map||!realBasemap.ready)return;
 const center=map.getCenter();lon=realMapLongitude(center.lng);lat=center.lat;zoom=targetZoom=realMapLegacyZoom(map.getZoom());
 realBasemap.cameraKey=realMapCameraKey();dirty=true;
 document.querySelector('.map').classList.toggle('street-map',map.getZoom()>=8);
}
function realMapFail(reason){
 if(!realBasemap.loading&&!realBasemap.map)return;
 clearTimeout(realBasemap.timer);realBasemap.controller?.abort();realBasemap.controller=null;realBasemap.epoch++;realBasemap.loading=false;realBasemap.ready=false;realBasemap.failed=true;
 const old=realBasemap.map,hadFocus=old&&document.activeElement===old.getCanvas();
 realMapCanvas(false);realBasemap.map=null;realBasemap.dataKey='';realBasemap.focused=null;realBasemap.paddingKey='';
 document.querySelector('.map').classList.remove('street-map');
 if(old)old.remove();stopTrip();camera=null;
 zoom=targetZoom=Math.max(.8,Math.min(zoom,themeZoomLimit(),selected?5:2));
 if(selected&&validLocation(selected)){lon=selected.lon;lat=selected.lat;}else if(previewStops?.length)fitRoute(previewStops);
 if(hadFocus)canvas.focus({preventScroll:true});dirty=true;
 realMapStatus('真实底图暂不可用，已使用离线地图。',true);
 console.warn('Real basemap unavailable; schematic globe retained:',reason);
}
function realMapIcon(map,p){
 if(typeof pictogram!=='function'||typeof map.hasImage!=='function')return '';
 const style=markerStyle(p),id='terra-'+style.shape+'-'+style.color.replace('#','');if(map.hasImage(id))return id;
 const tile=document.createElement('canvas');tile.width=tile.height=48;const paint=tile.getContext('2d');if(!paint)return '';
 const live=ctx;
 try{ctx=paint;paint.scale(2,2);paint.beginPath();paint.arc(12,12,10,0,Math.PI*2);paint.fillStyle='#ffffff';paint.fill();paint.strokeStyle=style.color;paint.lineWidth=1.5;paint.stroke();pictogram(style.shape,12,12,5.5);const image=paint.getImageData(0,0,48,48);map.addImage(id,{width:48,height:48,data:image.data},{pixelRatio:2});return id;}finally{ctx=live;}
}
function realMapInstallLayers(map){
 const empty={type:'FeatureCollection',features:[]};
 map.addSource('basemap-cities',{type:'geojson',data:new URL(currentBasemapProvider().cities,document.baseURI).href});
 map.addLayer({id:'basemap-city-dots',type:'circle',source:'basemap-cities',maxzoom:4,paint:{'circle-radius':2,'circle-color':'#667b83','circle-stroke-color':'#ffffff','circle-stroke-width':1}});
 map.addLayer({id:'basemap-city-labels',type:'symbol',source:'basemap-cities',maxzoom:4,layout:{'text-field':['get','name'],'text-font':currentBasemapProvider().labelFont,'text-size':11,'text-anchor':'left','text-offset':[.5,0],'text-padding':5,'symbol-sort-key':['-',['get','population']]},paint:{'text-color':'#50676f','text-halo-color':'#ffffff','text-halo-width':1.5}});
 map.addSource('terra-routes',{type:'geojson',data:empty});
 map.addSource('terra-places',{type:'geojson',data:empty});
 map.addLayer({id:'terra-route-halo',type:'line',source:'terra-routes',paint:{'line-color':'#ffffff','line-width':6,'line-opacity':.8}});
 map.addLayer({id:'terra-route',type:'line',source:'terra-routes',paint:{'line-color':themes[activeTheme].colors.route,'line-width':2.8,'line-opacity':.9}});
 map.addLayer({id:'terra-points',type:'circle',source:'terra-places',paint:{'circle-radius':['case',['get','selected'],9,['>',['get','order'],0],7,4.5],'circle-color':['get','color'],'circle-stroke-color':'#ffffff','circle-stroke-width':2}});
 // Selected ring is separate so it is never suppressed by label collisions.
 map.addLayer({id:'terra-selected',type:'circle',source:'terra-places',filter:['==',['get','selected'],true],paint:{'circle-radius':14,'circle-color':'#ffffff','circle-opacity':.12,'circle-stroke-color':'#173a46','circle-stroke-width':2}});
 map.addLayer({id:'terra-icons',type:'symbol',source:'terra-places',minzoom:3,filter:['!=',['get','icon'],''],layout:{'icon-image':['get','icon'],'icon-allow-overlap':false,'symbol-sort-key':['case',['get','selected'],-10000,1000]}});
 map.addLayer({id:'terra-labels',type:'symbol',source:'terra-places',minzoom:4,layout:{'text-field':['get','name'],'text-font':currentBasemapProvider().labelFont,'text-size':12,'text-anchor':'left','text-offset':[1.2,0],'text-max-width':12,'text-optional':true,'symbol-sort-key':['case',['get','selected'],-10000,['>',['get','order'],0],['get','order'],1000]},paint:{'text-color':'#23343b','text-halo-color':'#ffffff','text-halo-width':2}});
 map.addLayer({id:'terra-order',type:'symbol',source:'terra-places',filter:['>',['get','order'],0],layout:{'text-field':['get','badge'],'text-font':currentBasemapProvider().labelFont,'text-size':10,'text-allow-overlap':false,'symbol-sort-key':['get','order']},paint:{'text-color':'#ffffff','text-halo-color':'#23343b','text-halo-width':1}});
}
function realMapUpdateData(force=false){
 if(!realMapActive())return;
 const map=realBasemap.map,stops=(previewStops||(!previewTheme?trip:[])).filter(validLocation),order=new Map(stops.map((p,i)=>[p.id,i+1]));
 const points=[...new Map([...mapPoints(),...(selected?[selected]:[])].filter(validLocation).map(p=>[p.id,p])).values()];
 const key=JSON.stringify([activeTheme,points.map(p=>p.id),stops.map(p=>p.id),activePlan?.id,activePlan?.topology,selected?.id]);
 if(!force&&key===realBasemap.dataKey)return;
 const data={type:'FeatureCollection',features:points.map(p=>({type:'Feature',id:p.id,properties:{id:p.id,name:p.name,color:markerStyle(p).color,icon:realMapIcon(map,p),selected:p===selected,order:order.get(p.id)||0,badge:activePlan?.topology==='network'?'◇':String(order.get(p.id)||'')},geometry:{type:'Point',coordinates:[p.lon,p.lat]}}))};
 map.getSource('terra-places').setData(data);map.getSource('terra-routes').setData(realMapRouteData(stops,activePlan));
 map.setPaintProperty('terra-route','line-color',themes[activeTheme].colors.route);realBasemap.dataKey=key;
}
function realMapFocus(p,animate=true){
 if(!realMapActive()||!validLocation(p))return false;
 positionDetail();camera=null;realBasemap.focused=p.id;realMapUpdateData();
 const map=realBasemap.map,padding=realMapCurrentPadding();realBasemap.paddingKey=JSON.stringify(padding);
 // select() also sets the old Canvas zoom target. Reconcile that shared target
 // before an animated native flight, or the earlier app RAF can jumpTo the
 // previous center and cancel MapLibre before its first move event.
 realMapReadCamera();
 // Entries representing extensive landscapes use an area view, individual sites a street view.
 const broad=/国家公园|自然保护|山脉|群岛|沙漠|峡谷|自然遗产/.test(p.name+' '+p.type),z=Math.max(map.getZoom(),broad?9:14);
 map.flyTo({center:[p.lon,p.lat],zoom:Math.min(z,19),bearing:0,pitch:0,padding,duration:animate?realMapDuration():0});return true;
}
function realMapFit(stops,animate=true){
 if(!realMapActive())return false;
 const bounds=realMapBounds(stops);if(!bounds)return false;
 camera=null;realBasemap.focused=null;const padding=realMapCurrentPadding();realBasemap.paddingKey=JSON.stringify(padding);
 // Publish the current route roster before starting the native camera update.
 realMapUpdateData();realMapReadCamera();
 const options={padding,duration:animate?realMapDuration():0,bearing:0,pitch:0};
 if(bounds[0][0]===bounds[1][0]&&bounds[0][1]===bounds[1][1])realBasemap.map.flyTo({...options,center:bounds[0],zoom:14});
 else realBasemap.map.fitBounds(bounds,{...options,maxZoom:14});return true;
}
function realMapScale(value){
 if(!realMapActive())return false;
 camera=null;realBasemap.focused=null;realBasemap.map.zoomTo(Math.max(0,Math.min(19,realBasemap.map.getZoom()+Math.log2(value))),{duration:180});return true;
}
function realMapStop(){if(realMapActive()){realBasemap.map.stop();realBasemap.focused=null;realMapReadCamera();}}
function realMapResize(){
 if(!realMapActive())return;
 positionDetail();realBasemap.map.resize();
 const padding=realMapCurrentPadding(),key=JSON.stringify(padding);
 if(realBasemap.paddingKey!==key){
  realBasemap.paddingKey=key;
  const p=selected?.id===realBasemap.focused&&placesById.get(realBasemap.focused);
  realBasemap.map.jumpTo({...(p?{center:[p.lon,p.lat]}:{}),padding});
 }
}
function drawRealMap(){
 if(!realMapActive())return;
 if(selected)positionDetail();realMapUpdateData();
 if(auto||playing)realBasemap.focused=null;
 const map=realBasemap.map,key=realMapCameraKey();
 if(key!==realBasemap.cameraKey){map.jumpTo({center:[realMapLongitude(lon),Math.max(-85,Math.min(85,lat))],zoom:realMapZoom(zoom)});realBasemap.cameraKey=realMapCameraKey();}
 const padding=realMapCurrentPadding();if(JSON.stringify(padding)!==realBasemap.paddingKey)realMapResize();
 // Legacy hit telemetry remains available; native clicks use rendered features only.
 const center=map.getCenter();hits=mapPoints().filter(validLocation).flatMap(p=>{const dot=Math.sin(p.lat*Math.PI/180)*Math.sin(center.lat*Math.PI/180)+Math.cos(p.lat*Math.PI/180)*Math.cos(center.lat*Math.PI/180)*Math.cos((p.lon-center.lng)*Math.PI/180);if(map.getZoom()<6&&dot<0)return [];const q=map.project([p.lon,p.lat]);return q.x>=0&&q.x<=w&&q.y>=0&&q.y<=h?[{p,x:q.x,y:q.y}]:[]});drawPointCount=hits.length;
 document.querySelector('#coords').textContent=`${Math.abs(lat).toFixed(2)}° ${lat>=0?'N':'S'} / ${Math.abs(lon).toFixed(2)}° ${lon>=0?'E':'W'}`;
}
function realMapEnterTheme(){
 realBasemap.focused=null;realBasemap.dataKey='';
 if(realMapActive()){
  realBasemap.map.stop();camera=null;realBasemap.map.jumpTo({center:[lon,lat],zoom:realMapZoom(zoom),padding:{top:0,bottom:0,left:0,right:0},bearing:0,pitch:0});realBasemap.paddingKey='';realMapUpdateData(true);realMapResize();
 }else if(!realBasemap.failed)void realMapStart();
}
function realMapBind(map,epoch){
  map.on('error',event=>{
   if(epoch!==realBasemap.epoch)return;
   const now=Date.now();realBasemap.errors=realBasemap.errors.filter(t=>now-t<12000);realBasemap.errors.push(now);
   if(!realBasemap.ready||realBasemap.errors.length>=3)realMapFail(event.error?.message||'basemap error');
  });
  map.on('sourcedata',event=>{if(epoch!==realBasemap.epoch)return;if(event.source?.type==='vector'&&event.tile?.state==='loaded'){realBasemap.baseSeen=true;if(realBasemap.ready){clearTimeout(realBasemap.timer);realMapStatus('');}}});
  map.on('style.load',()=>{
   if(epoch!==realBasemap.epoch)return;
   try{
    map.setProjection({type:'globe'});realMapInstallLayers(map);realBasemap.ready=true;realBasemap.loading=false;realMapCanvas(true);realMapUpdateData(true);
    // Read the latest selection, which may have changed while style/fonts loaded.
    if(selected&&validLocation(selected))realMapFocus(selected,false);
    else if(previewStops?.length)realMapFit(previewStops,false);
    else if(atlasThemePlaceIds.has(themes[activeTheme].id))realMapFit(filtered(),false);
    else{map.jumpTo({center:[lon,lat],zoom:realMapZoom(zoom)});realMapReadCamera();realMapResize();}
    if(realBasemap.baseSeen){clearTimeout(realBasemap.timer);realMapStatus('');}dirty=true;
   }catch(error){realMapFail(error.message);}
  });
  map.on('move',()=>{if(epoch===realBasemap.epoch)realMapReadCamera();});
  map.on('movestart',event=>{if(!event.originalEvent)return;stopTrip(true);auto=false;realBasemap.focused=null;document.querySelector('#rotate').setAttribute('aria-pressed','false');});
  map.on('click',event=>{if(!realMapActive())return;const features=map.queryRenderedFeatures([[event.point.x-8,event.point.y-8],[event.point.x+8,event.point.y+8]],{layers:['terra-selected','terra-points','terra-icons','terra-labels','terra-order']});const point=features.map(f=>placesById.get(f.properties.id)).find(Boolean);if(point)select(point);});
  map.on('mousemove',event=>{if(!realMapActive())return;map.getCanvas().style.cursor=map.queryRenderedFeatures(event.point,{layers:['terra-points','terra-selected','terra-icons','terra-labels']}).length?'pointer':'grab';});
  map.getCanvas().addEventListener('webglcontextlost',event=>{event.preventDefault();if(epoch===realBasemap.epoch)realMapFail('WebGL context lost');},{once:true});
}
async function realMapStart(){
 if(realBasemap.loading||realBasemap.map)return;
 const epoch=++realBasemap.epoch;realBasemap.loading=true;realBasemap.failed=false;realBasemap.baseSeen=false;realBasemap.errors=[];
 realMapStatus('正在加载真实底图…');
 realBasemap.timer=setTimeout(()=>realMapFail('initial basemap timeout'),18000);
 try{
  if(typeof WebGL2RenderingContext==='undefined')throw Error('WebGL 2 unavailable');
  if(!document.querySelector('#maplibre-css')){const link=document.createElement('link');link.id='maplibre-css';link.rel='stylesheet';link.href=new URL(realMapAssets+'maplibre-gl.css',document.baseURI).href;document.head.append(link);}
  realBasemap.controller=new AbortController();
  const [lib,response]=await Promise.all([import(new URL(realMapAssets+'maplibre-gl.mjs',document.baseURI).href),fetch(new URL(realMapStyle,document.baseURI).href,{signal:realBasemap.controller.signal})]);
  if(!response.ok)throw Error('Basemap style HTTP '+response.status);
  const style=resolveBasemapResources(await response.json(),document.baseURI);
  if(epoch!==realBasemap.epoch)return;
  lib.setWorkerUrl(new URL(realMapAssets+'maplibre-gl-worker.mjs',document.baseURI).href);
  const map=new lib.Map({container:'real-map',style,center:[lon,lat],zoom:realMapZoom(zoom),minZoom:0,maxZoom:19,hash:false,attributionControl:false,renderWorldCopies:false,canvasContextAttributes:{antialias:true},keyboard:true});
  realBasemap.map=map;
  realMapBind(map,epoch);
 }catch(error){if(epoch===realBasemap.epoch)realMapFail(error.message);}
}
function initializeRealMap(){
 renderBasemapAttribution();
 const retry=document.querySelector('#basemap-retry');if(retry)retry.onclick=()=>{realBasemap.failed=false;void realMapStart();};
 if(typeof ResizeObserver!=='undefined'){
  realBasemap.observer=new ResizeObserver(()=>{if(realMapActive()){realMapResize();dirty=true;}});
  realBasemap.observer.observe(document.querySelector('.map'));realBasemap.observer.observe(document.querySelector('#detail'));
 }
 if(inTheme&&!realBasemap.map&&!realBasemap.failed)void realMapStart();
}
document.addEventListener('DOMContentLoaded',initializeRealMap);

'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const source=fs.readFileSync('real-map.js','utf8'),app=fs.readFileSync('app.js','utf8');
function node(rect={}){const classes=new Set();return {id:'',tabIndex:0,hidden:false,style:{},attributes:{},textContent:'',getBoundingClientRect:()=>rect,setAttribute(k,v){this.attributes[k]=v},addEventListener(){},focus(){},classList:{toggle(k,v){if(v)classes.add(k);else classes.delete(k)},remove(k){classes.delete(k)},contains:k=>classes.has(k)}}}
function fixture(mobile=false){
 const rect=mobile?{left:0,top:62,right:390,bottom:844,width:390,height:782}:{left:390,top:62,right:1440,bottom:1000,width:1050,height:938};
 const detail=node(mobile?{left:10,top:280,width:370,height:554,bottom:834}:{left:1023,top:138,width:400,height:800,bottom:938}),canvas=node(rect),native=node(rect),mapNode=node(rect),status=node(),message=node(),retry=node(),realNode=node();status.querySelector=s=>s==='span'?message:retry;canvas.id='globe';
 const elements={'.map':mapNode,'#detail':detail,'#real-map':realNode,'#basemap-status':status,'#rotate':node(),'#coords':node(),'#basemap-retry':retry};
 const c=vm.createContext({console:{warn(){}},setTimeout,clearTimeout,Date,URL,Number,Math,Map,Set,document:{querySelector:s=>elements[s],addEventListener(){},activeElement:null,baseURI:'http://localhost/'},matchMedia:()=>({matches:false}),innerWidth:mobile?390:1440,canvas,lon:85,lat:20,zoom:1,targetZoom:1,dirty:false,camera:null,selected:null,auto:false,playing:false,w:rect.width,h:rect.height,hits:[],drawPointCount:0,previewStops:null,previewTheme:true,trip:[],activePlan:null,activeTheme:0,themes:[{id:'culture',colors:{route:'#356879'}}],placesById:new Map(),atlasThemePlaceIds:new Set(),validLocation:p=>!!p&&Number.isFinite(p.lon)&&Number.isFinite(p.lat),routeEdges:(stops,plan)=>plan?.topology==='network'?[]:[...stops.slice(1).map((p,i)=>[stops[i],p]),...(plan?.topology==='loop'&&stops.length>2?[[stops.at(-1),stops[0]]]:[])],mapPoints:()=>[...c.placesById.values()],filtered:()=>[...c.placesById.values()],markerStyle:()=>({color:'#356879'}),themeZoomLimit:()=>60,positionDetail(){},stopTrip(){c.camera=null;c.playing=false},fitRoute(){c.fallbackFit=true}});
 vm.runInContext(fs.readFileSync('basemap-providers.js','utf8'),c);vm.runInContext(source,c);
 const events={},sources={},calls=[],layers=[];
 const map={center:{lng:85,lat:20},z:1,padding:{top:0,bottom:0,left:0,right:0},on(name,fn){(events[name]||=[]).push(fn)},emit(name,event={}){for(const fn of events[name]||[])fn(event)},getCenter(){return this.center},getZoom(){return this.z},getCanvas:()=>native,setProjection(p){this.projection=p},addSource(id,s){sources[id]={...s,setData(d){this.data=d}}},getSource:id=>sources[id],addLayer(l){layers.push(l)},setPaintProperty(){},jumpTo(options){calls.push({type:'jump',...options});if(options.center)this.center={lng:options.center[0],lat:options.center[1]};if(options.zoom!==undefined)this.z=options.zoom;if(options.padding)this.padding=options.padding;this.emit('move')},flyTo(options){calls.push({type:'fly',...options});this.jumpTo(options)},fitBounds(bounds,options){calls.push({type:'fit',bounds,...options});this.jumpTo({center:[(bounds[0][0]+bounds[1][0])/2,(bounds[0][1]+bounds[1][1])/2],zoom:Math.min(14,options.maxZoom),padding:options.padding})},zoomTo(z,options){calls.push({type:'scale',z,...options});this.jumpTo({zoom:z})},resize(){calls.push({type:'resize'})},stop(){},remove(){this.removed=true},queryRenderedFeatures(){return []},project([x,y]){return {x:rect.width/2+(x-this.center.lng),y:rect.height/2-(y-this.center.lat)}}};
 c.testMap=map;vm.runInContext('realBasemap.map=testMap;realBasemap.ready=true;',c);c.realMapInstallLayers(map);c.realMapBind(map,1);vm.runInContext('realBasemap.epoch=1;',c);
 return {c,map,canvas,native,detail,mapNode,realNode,sources,calls,layers,status,message,retry,run:code=>vm.runInContext(code,c)};
}
const plain=x=>JSON.parse(JSON.stringify(x));
function heritage(){const c=vm.createContext({});vm.runInContext(fs.readFileSync('catalog.js','utf8')+';globalThis.points=places.filter(p=>["wh-1770","wh-1752"].includes(p.id));',c);return plain(c.points)}
function prepareSelect(f){const c=f.c;for(const name of ['rememberDetailFocus','renderPlaceDetail','renderList','renderRoutePanel','addStopNavigation','writeNavigation','focusMapOnMobile'])c[name]=()=>{};c.performance={now:()=>0};vm.runInContext(app.slice(app.indexOf('function select(p)'),app.indexOf('function renderList()')),c)}
test('desktop and mobile repeat Alamut → Aalto → Alamut, including same-place click, using original coordinates',()=>{
 for(const mobile of [false,true]){const f=fixture(mobile),[aalto,alamut]=heritage().sort((a,b)=>a.id.localeCompare(b.id));for(const p of [aalto,alamut])f.c.placesById.set(p.id,p);prepareSelect(f);
  for(const p of [alamut,aalto,alamut,alamut]){f.c.select(p);const fly=f.calls.filter(x=>x.type==='fly').at(-1);assert.deepEqual(plain(fly.center),[p.lon,p.lat]);assert.ok(fly.zoom>=14);assert.equal(f.c.camera,null);assert.equal(f.c.selected.id,p.id);assert.equal(f.sources['terra-places'].data.features.find(x=>x.properties.selected).id,p.id);const pad=fly.padding;assert.ok(f.c.w-pad.left-pad.right>=100);assert.ok(f.c.h-pad.top-pad.bottom>=100);if(mobile)assert.ok(pad.bottom>=550);else assert.ok(pad.right>=400);}
  assert.equal(f.calls.filter(x=>x.type==='fly').length,4);assert.deepEqual([alamut.lon,alamut.lat],[50.5861805555,36.4447083333]);
 }
});
test('late style load uses the latest place/route, sets globe, retains selected marker and active canvas focus target',()=>{
 const f=fixture(),points=heritage();for(const p of points)f.c.placesById.set(p.id,p);f.run('realBasemap.ready=false;realBasemap.loading=true;');f.c.selected=points[0];f.c.selected=points[1];f.map.emit('style.load');
 assert.equal(f.map.projection.type,'globe');assert.equal(f.native.id,'globe');assert.equal(f.canvas.id,'schematic-globe');assert.equal(f.realNode.attributes['aria-hidden'],'false');assert.deepEqual(plain(f.calls.filter(x=>x.type==='fly').at(-1).center),[points[1].lon,points[1].lat]);f.c.realMapFail('test cleanup');
});
test('dateline bounds and arcs do not span 358 degrees; coincident and antipodal points remain finite',()=>{
 const f=fixture(),bounds=f.c.realMapBounds([{lon:179,lat:10},{lon:-179,lat:12}]);assert.equal(bounds[1][0]-bounds[0][0],2);
 for(const pair of [[{lon:179,lat:10},{lon:-179,lat:12}],[{lon:180,lat:0},{lon:-180,lat:0}],[{lon:0,lat:0},{lon:.000001,lat:0}]]){const line=f.c.realMapArc(...pair);assert.ok(line.flat().every(Number.isFinite));for(let i=1;i<line.length;i++)assert.ok(Math.abs(line[i][0]-line[i-1][0])<180);}
 assert.equal(f.c.realMapArc({lon:0,lat:0},{lon:180,lat:0}),null);assert.equal(f.c.realMapBounds([]),null);
});
test('theme networks keep no fictitious continuous path, loops and exact endpoint IDs remain',()=>{
 const f=fixture(),stops=[{id:'a',lon:20,lat:20},{id:'b',lon:21,lat:21},{id:'c',lon:22,lat:22}];assert.equal(f.c.realMapRouteData(stops,{topology:'network'}).features.length,0);assert.equal(f.c.realMapRouteData(stops,{topology:'loop'}).features.length,3);assert.deepEqual(plain(f.c.realMapRouteData(stops,{}).features.map(x=>x.properties)),[{from:'a',to:'b'},{from:'b',to:'c'}]);
});
test('native pan and zoom update shared camera; reset/close do not return to stale selection',()=>{
 const f=fixture(),p=heritage()[0];f.c.placesById.set(p.id,p);f.c.selected=p;f.c.realMapFocus(p);f.c.selected=null;f.c.lon=80;f.c.lat=20;f.c.zoom=f.c.targetZoom=1;f.c.drawRealMap();assert.equal(f.map.center.lng,80);assert.equal(f.map.center.lat,20);
 f.c.playing=true;f.c.auto=true;f.map.emit('movestart',{originalEvent:{type:'pointerdown'}});assert.equal(f.c.playing,false);assert.equal(f.c.auto,false);f.map.jumpTo({center:[120,30],zoom:16});assert.equal(f.c.lon,120);assert.equal(f.c.lat,30);assert.equal(f.c.zoom,f.c.realMapLegacyZoom(16));assert.ok(f.mapNode.classList.contains('street-map'));f.c.realMapScale(.5);assert.equal(f.map.z,15);
});
test('network/context failure restores offline canvas and keeps selection, route and saved places',()=>{
 const f=fixture(true),points=heritage();for(const p of points)f.c.placesById.set(p.id,p);f.c.selected=points[0];f.c.trip=points;f.c.previewStops=points;f.c.activePlan={id:'kept',topology:'network'};f.c.realMapCanvas(true);f.c.realMapFocus(points[0]);
 f.map.emit('error',{error:Error('tile denied')});f.map.emit('error',{error:Error('tile denied')});assert.equal(f.map.removed,undefined);f.map.emit('error',{error:Error('tile denied')});assert.equal(f.map.removed,true);assert.equal(f.c.realMapActive(),false);assert.equal(f.canvas.id,'globe');assert.equal(f.canvas.tabIndex,0);assert.equal(f.realNode.attributes['aria-hidden'],'true');assert.deepEqual(f.c.trip,points);assert.deepEqual(f.c.previewStops,points);assert.equal(f.c.activePlan.id,'kept');assert.equal(f.c.selected.id,points[0].id);assert.equal(f.c.lon,points[0].lon);assert.ok(Number.isFinite(f.c.zoom)&&f.c.zoom<=5);assert.equal(f.retry.hidden,false);assert.match(f.message.textContent,/离线地图/);
});
test('WebGL unavailable is a safe fallback; map never owns URL hash or writes history',async()=>{
 const f=fixture();f.run('realBasemap.map=null;realBasemap.ready=false;');await f.c.realMapStart();assert.equal(f.c.realMapActive(),false);assert.match(f.message.textContent,/离线地图/);assert.match(source,/hash:false/);assert.doesNotMatch(source,/history\.|location\.hash\s*=/);
});
test('globe assets are local, pinned, licensed and copied unchanged into static builds',()=>{
 const directory='assets/vendor/maplibre-6.19.0/',manifest=JSON.parse(fs.readFileSync(directory+'source.json'));assert.equal(manifest.version,'6.19.0');assert.equal(manifest.license,'BSD-3-Clause');for(const [name,entry]of Object.entries(manifest.files)){const bytes=fs.readFileSync(directory+name);assert.equal(bytes.length,entry.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),entry.sha256);}assert.ok(fs.readFileSync(directory+'LICENSE.txt','utf8').includes('Redistribution'));assert.ok(fs.readFileSync(directory+'maplibre-gl.mjs').length>1000000);assert.ok(fs.readFileSync(directory+'maplibre-gl-worker.mjs').length>500000);assert.match(fs.readFileSync('real-map.css','utf8'),/street-map #scene-art/);
});

test('readiness requires a loaded vector tile, not style/metadata or our own GeoJSON',()=>{
 const f=fixture();f.map.emit('sourcedata',{source:{type:'vector'},sourceDataType:'metadata'});assert.equal(f.run('realBasemap.baseSeen'),false);
 f.map.emit('sourcedata',{source:{type:'geojson'},tile:{state:'loaded'}});assert.equal(f.run('realBasemap.baseSeen'),false);
 // MapLibre 6 tile completion does not carry sourceDataType: content.
 f.map.emit('sourcedata',{source:{type:'vector'},tile:{state:'loaded'}});assert.equal(f.run('realBasemap.baseSeen'),true);
});
test('every registered production itinerary retains every original edge and endpoint',()=>{
 const c=require('../scripts/theme-audit-runtime.cjs').runtime();const result=vm.runInContext(`(()=>{let plans=0,edges=0;for(const t of themes)for(const p of buildPlans(t.id,0)){const old=routeEdges(p.stops,p),data=realMapRouteData(p.stops,p);if(data.features.length!==old.length)throw Error(p.id+' lost edge');data.features.forEach((f,i)=>{if(f.properties.from!==old[i][0].id||f.properties.to!==old[i][1].id)throw Error(p.id+' wrong endpoint');if(!f.geometry.coordinates.flat().every(Number.isFinite))throw Error(p.id+' nonfinite');});plans++;edges+=old.length;}return {plans,edges};})()`,c);assert.ok(result.plans>0);assert.ok(result.edges>0);
});

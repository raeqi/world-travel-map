'use strict';
// DOM/navigation regression with mocked layout and Canvas. NOT a browser or tile-render test.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require(process.env.JSDOM_MODULE||'jsdom'),root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script defer src="([^"]+)"><\/script>/g,(_,file)=>'<script>'+fs.readFileSync(path.join(root,file),'utf8')+'</script>');
const wait=()=>new Promise(r=>setTimeout(r,20));
async function session(width,hash,saved=[]){
 const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(html,{url:'https://atlas.test/'+hash,runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  Object.defineProperty(w,'innerWidth',{value:width,configurable:true});Object.defineProperty(w,'innerHeight',{value:width===390?844:1000,configurable:true});
  w.fetch=async()=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,'countries.geo.json'),'utf8'))});
  const gradient={addColorStop(){}},ctx=new Proxy({measureText:t=>({width:t.length*7}),createRadialGradient:()=>gradient,createLinearGradient:()=>gradient,createPattern:()=>null},{get:(o,k)=>k in o?o[k]:(()=>{}),set:(o,k,v)=>(o[k]=v,true)});
  w.HTMLCanvasElement.prototype.getContext=()=>ctx;w.Path2D=class{constructor(){return new Proxy({},{get:()=>()=>{}})}};w.ResizeObserver=class{observe(){}};w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};w.Element.prototype.setPointerCapture=()=>{};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};w.matchMedia=()=>({matches:true});
  w.localStorage.setItem('atlas-trip-v2',JSON.stringify(saved));
  w.HTMLElement.prototype.getBoundingClientRect=function(){const mobile=width===390,left=mobile?0:390,height=mobile?782:938;if(this.id==='detail')return {left:mobile?10:1023,top:mobile?280:138,right:mobile?380:1423,bottom:mobile?834:938,width:this.hidden?0:mobile?370:400,height:this.hidden?0:mobile?554:800};return {left,top:62,right:width,bottom:mobile?844:1000,width:width-left,height};};
 }});
 await new Promise(r=>dom.window.addEventListener('load',r,{once:true}));await wait();const w=dom.window,e=s=>w.eval(s);
 function settle(){e('frame(performance.now()+1000)')}
 function native(){
  const canvas=w.document.createElement('canvas');w.document.querySelector('#real-map').append(canvas);const events={},sources={};
  const map={testSources:sources,center:{lng:e('lon'),lat:e('lat')},z:1,getCanvas:()=>canvas,getCenter(){return this.center},getZoom(){return this.z},on(k,fn){(events[k]||=[]).push(fn)},setProjection(){},addSource(k,s){sources[k]={...s,setData(data){this.data=data}}},getSource:k=>sources[k],addLayer(){},setPaintProperty(){},resize(){},stop(){},queryRenderedFeatures:()=>[],project:()=>({x:150,y:140}),jumpTo(o){if(o.center)this.center={lng:o.center[0],lat:o.center[1]};if(o.zoom!==undefined)this.z=o.zoom;for(const fn of events.move||[])fn({})},flyTo(o){this.jumpTo(o)},fitBounds(b,o){this.jumpTo({center:[(b[0][0]+b[1][0])/2,(b[0][1]+b[1][1])/2],zoom:10,...o})},zoomTo(z){this.jumpTo({zoom:z})},remove(){}};
  w.testMap=map;e('realBasemap.map=window.testMap;realBasemap.ready=true;realMapInstallLayers(window.testMap);realMapBind(window.testMap,realBasemap.epoch);realMapCanvas(true);if(selected)realMapFocus(selected,false);');return map;
 }
 return {dom,w,e,errors,settle,native};
}
(async()=>{
 for(const width of [1440,390])for(const useNative of [false,true]){
  let s=await session(width,'#theme=culture&place=wh-1770');let nativeCanvas=null,nativeHost=null,map=null;if(useNative){map=s.native();nativeCanvas=map.getCanvas();nativeHost=nativeCanvas.parentElement;}assert.equal(s.e('selected.id'),'wh-1770');s.settle();assert.ok(Math.abs(s.e('lon')-50.5861805555)<1e-7);assert.equal(s.w.document.querySelector('#detail').hidden,false);
  for(const id of ['wh-1752','wh-1770','wh-1770']){s.e(`select(placesById.get('${id}'))`);s.settle();assert.equal(s.e('selected.id'),id);assert.ok(Math.abs(s.e('lon-selected.lon'))<1e-7);assert.equal(new URLSearchParams(s.w.location.hash.slice(1)).get('place'),id);if(useNative){assert.equal(map.getCanvas(),nativeCanvas);assert.equal(nativeCanvas.parentElement,nativeHost);assert.equal(nativeCanvas.isConnected,true);assert.equal(s.w.document.querySelector('#globe'),nativeCanvas);assert.equal(s.w.document.querySelectorAll('#globe').length,1);assert.equal(s.w.document.querySelector('.map').classList.contains('real-map-active'),true);const art=s.w.document.querySelector('#art-toggle');art.click();assert.equal(art.getAttribute('aria-pressed'),'false');assert.equal(s.w.document.querySelector('#scene-art').hidden,true);art.click();assert.equal(art.getAttribute('aria-pressed'),'true');assert.equal(s.w.document.querySelector('#scene-art').hidden,false);const f=map.testSources['terra-places'].data.features.find(f=>f.properties.id===id);assert.equal(f.properties.selected,true);assert.equal(JSON.stringify(f.geometry.coordinates),s.e('JSON.stringify([selected.lon,selected.lat])'));}}
  s.w.history.back();await wait();assert.equal(s.e('selected.id'),'wh-1752');s.w.history.forward();await wait();assert.equal(s.e('selected.id'),'wh-1770');
  s.e('trip=[placesById.get("wh-1770"),placesById.get("wh-1752")];renderTrip();viewSavedTrip();select(trip[0])');const hash=s.w.location.hash,saved=JSON.parse(s.w.localStorage.getItem('atlas-trip-v2'));assert.equal(new URLSearchParams(hash.slice(1)).get('route'),'saved');
  assert.deepEqual(s.errors,[]);s.dom.window.close();s=await session(width,hash,saved);if(useNative)s.native();s.settle();assert.equal(s.e('selected.id'),'wh-1770');assert.equal(s.e('previewStops.length'),2);assert.equal(s.e('trip.length'),2);assert.equal(new URLSearchParams(s.w.location.hash.slice(1)).get('route'),'saved');
  s.e('openPlan(buildPlans(themes[activeTheme].id,0)[0]);select(previewStops[0])');const plan=s.e('activePlan.id'),place=s.e('selected.id'),routeHash=s.w.location.hash;assert.deepEqual(s.errors,[]);s.dom.window.close();
  s=await session(width,routeHash);if(useNative)s.native();assert.equal(s.e('activePlan.id'),plan);assert.equal(s.e('selected.id'),place);assert.equal(s.e('previewStops.includes(selected)'),true);assert.deepEqual(s.errors,[]);s.dom.window.close();
 }
 const cssDOM=new JSDOM('<style>'+fs.readFileSync(path.join(root,'design.css'),'utf8')+'\n'+fs.readFileSync(path.join(root,'real-map.css'),'utf8')+'</style><section class="map real-map-active"><div id="scene-art"></div><button id="art-toggle">画境模式</button></section>');
 const d=cssDOM.window.document,css=el=>cssDOM.window.getComputedStyle(el),map=d.querySelector('.map'),art=d.querySelector('#scene-art'),toggle=d.querySelector('#art-toggle');
 assert.equal(css(toggle).display,'block');assert.equal(css(art).display,'block');art.hidden=true;assert.equal(css(art).display,'none');art.hidden=false;map.classList.add('street-map');assert.equal(css(art).visibility,'hidden');map.classList.remove('street-map');assert.equal(css(art).visibility,'visible');map.classList.remove('real-map-active');assert.equal(css(toggle).display,'none');cssDOM.window.close();
 console.log('PASS art DOM/cascade: native toggle remains reachable, actual click state changes, low-zoom artwork displays, hidden/street views suppress it. Layout/pixels not verified.');
 console.log('PASS DOM/state only: desktop + 390×844, offline + mocked native engine, direct Alamut URL, repeated clicks, back/forward, saved and named route refresh. No pixels, real layout or live tiles verified.');
})().catch(e=>{console.error(e);process.exitCode=1});

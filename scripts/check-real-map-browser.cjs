'use strict';
// Requires a supported real browser, HTTP server and the reviewed independent basemap service.
// Deliberately fails if the live vector map cannot render; mock/outline fallback is not a pass.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {mapViewReady,probeMapFrame,assertSelectionFrame,probeRouteData}=require('./map-render-probe.cjs');
let currentSteps=[],currentNetwork=[],currentStage='launch';
async function record(page,stage,id){currentStage=stage;const frame=await page.evaluate(probeMapFrame,id);currentSteps.push({stage,frame});return frame;}
let reportWritten=false;
const base=process.env.ATLAS_URL||'http://localhost:8000/',output=process.env.ATLAS_QA_DIR||'/tmp/terra-real-map-qa';
async function live(page){
 await page.waitForFunction(()=>typeof realMapActive==='function'&&realMapActive(),null,{timeout:30000});
 await record(page,'native-active');
 await page.waitForFunction(mapViewReady,true,{timeout:30000});
 assert.ok(await page.evaluate(()=>realBasemap.baseSeen),'A real vector tile must have loaded');
}
async function settled(page){await page.waitForFunction(mapViewReady,true,{timeout:20000});}
async function visibleSelection(page,id){
 await record(page,'selection-pending',id);await settled(page);
 const frame=await record(page,'selection-settled',id);assertSelectionFrame(frame,id);
}
(async()=>{
 fs.mkdirSync(output,{recursive:true});let currentPage=null,currentConsole=[];const softwareGL=process.env.ATLAS_CI_SOFTWARE_GL==='1';const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||chromium.executablePath(),headless:true,args:softwareGL?['--use-gl=angle','--use-angle=swiftshader']:[]}),report=[];
 try{
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce',hasTouch:viewport.width===390}),page=await context.newPage(),errors=[];currentPage=page;currentConsole=[];currentSteps=[];currentNetwork=[];
  const requests=new Map();page.on('request',request=>{const entry={url:request.url(),type:request.resourceType(),state:'pending'};requests.set(request,entry);currentNetwork.push(entry)});page.on('requestfailed',request=>{const entry=requests.get(request);if(entry)Object.assign(entry,{state:'failed',error:request.failure()?.errorText});requests.delete(request)});page.on('response',response=>{const entry=requests.get(response.request());if(entry)entry.status=response.status()});page.on('requestfinished',request=>{const entry=requests.get(request);if(entry)entry.state='finished';requests.delete(request)});page.on('console',message=>{if(['error','warning'].includes(message.type())&&currentConsole.length<40)currentConsole.push({type:message.type(),text:message.text()})});page.on('pageerror',e=>errors.push(e.message));
  // Exercise actual sidebar clicks with normal motion from the theme's wide
  // initial view. Reduced motion alone misses legacy/native camera contention.
  currentStage='normal-motion-sidebar';await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(base+'#theme=culture&view=places',{waitUntil:'load'});await live(page);
  for(const id of ['wh-1770','wh-1752','wh-1770','wh-1770']){await page.locator('#search').fill(id==='wh-1770'?'阿拉穆特':'阿尔托');await record(page,'normal-before-click',id);await page.locator('.place[data-place="'+id+'"]').click();await visibleSelection(page,id);}
  await page.screenshot({path:path.join(output,viewport.width+'-normal-motion-alamut.png')});await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(base+'#theme=culture&place=wh-1770',{waitUntil:'load'});await live(page);await visibleSelection(page,'wh-1770');
  for(const id of ['wh-1752','wh-1770','wh-1770']){await record(page,'before-select',id);await page.evaluate(id=>select(placesById.get(id)),id);await visibleSelection(page,id);if(id==='wh-1752')await page.screenshot({path:path.join(output,viewport.width+'-aalto.png')})}
  await page.goBack();await visibleSelection(page,'wh-1752');await page.goForward();await visibleSelection(page,'wh-1770');await page.reload({waitUntil:'load'});await live(page);await visibleSelection(page,'wh-1770');
  await page.screenshot({path:path.join(output,viewport.width+'-alamut.png')});
  const beforeKeyZoom=await page.evaluate(()=>realBasemap.map.getZoom());await page.locator('#globe').press('+');await settled(page);assert.ok(await page.evaluate(z=>realBasemap.map.getZoom()>z,beforeKeyZoom));await page.evaluate(()=>select(placesById.get('wh-1770')));await visibleSelection(page,'wh-1770');
  currentStage='art-toggle';const beforeArt=await page.locator('#art-toggle').getAttribute('aria-pressed');assert.ok(await page.locator('#art-toggle').isVisible(),'Art mode must remain reachable');
  await page.locator('#art-toggle').click();assert.notEqual(await page.locator('#art-toggle').getAttribute('aria-pressed'),beforeArt);assert.equal(await page.locator('#scene-art').evaluate(el=>el.hidden),beforeArt==='true');assert.ok(await page.locator('#art-toggle').isVisible());
  await page.locator('#art-toggle').click();assert.equal(await page.locator('#art-toggle').getAttribute('aria-pressed'),beforeArt);
  const renderer=await page.evaluate(()=>{const gl=realBasemap.map.getCanvas().getContext('webgl2');return gl?{version:gl.getParameter(gl.VERSION),renderer:gl.getParameter(gl.RENDERER)}:null});assert.ok(renderer);
  for(const theme of ['nature','nc500','vangogh']){const id=await page.evaluate(theme=>{enterTheme(themes.findIndex(t=>t.id===theme));const p=places.find(p=>p.themes.includes(theme)&&validLocation(p));select(p);return p.id},theme);await visibleSelection(page,id);await page.screenshot({path:path.join(output,viewport.width+'-'+theme+'.png')});}
  await page.goto(base+'#theme=culture&place=wh-1770',{waitUntil:'load'});await live(page);await visibleSelection(page,'wh-1770');

  currentStage='world';await page.evaluate(()=>{selected=null;document.querySelector('#detail').hidden=true;realBasemap.focused=null;realBasemap.map.jumpTo({center:[10,30],zoom:2,padding:{top:0,left:0,right:0,bottom:0}})});await settled(page);
  assert.ok(await page.locator('#scene-art').isVisible(),'Enabled art must display at globe scale');await page.locator('#art-toggle').click();assert.equal(await page.locator('#scene-art').isVisible(),false);await page.locator('#art-toggle').click();assert.ok(await page.locator('#scene-art').isVisible());
  const world=await page.evaluate(()=>{const features=realBasemap.map.queryRenderedFeatures().filter(f=>!f.source.startsWith('terra-'));return {projection:realBasemap.map.getProjection().type,features:features.length,borders:features.filter(f=>/boundar|admin/.test(f.layer['source-layer']||'')).length,labels:features.filter(f=>f.layer.type==='symbol').length,cities:features.filter(f=>f.layer.id==='basemap-city-labels').length,countryLabels:features.filter(f=>/boundary_labels/.test(f.layer['source-layer']||'')).length,placeLabels:realBasemap.map.queryRenderedFeatures({layers:['terra-labels']}).length}});assert.equal(world.projection,'globe');assert.equal(world.placeLabels,0,'Globe-scale place names must not obscure geographic labels');assert.ok(world.borders>0&&world.labels>0&&world.cities>0&&world.countryLabels>0,JSON.stringify(world));await page.screenshot({path:path.join(output,viewport.width+'-world.png')});
  const cities=[];
  for(const [name,center]of [['paris',[2.35,48.8566]],['beijing',[116.397,39.908]]]){
   currentStage='streets-'+name;await page.evaluate(center=>realBasemap.map.jumpTo({center,zoom:15,padding:{top:0,left:0,right:0,bottom:0}}),center);await settled(page);
   const detail=await page.evaluate(()=>{const features=realBasemap.map.queryRenderedFeatures().filter(f=>!f.source.startsWith('terra-'));return {roads:features.filter(f=>/transportation|road|street/.test(f.layer['source-layer']||'')).length,buildings:features.filter(f=>/building/.test(f.layer['source-layer']||'')).length,labels:features.filter(f=>f.layer.type==='symbol').length}});assert.ok(detail.roads>0&&detail.labels>0,JSON.stringify({name,...detail}));cities.push({name,...detail});await page.screenshot({path:path.join(output,viewport.width+'-'+name+'.png')});
  }
  currentStage='route-restore';await page.evaluate(()=>{openPlan(buildPlans('culture',0)[0]);select(previewStops[0])});await settled(page);const route=await page.evaluate(probeRouteData);assert.equal(route.edges,route.expected);assert.deepEqual(route.endpoints,route.expectedEndpoints);route.renderedEdges=await page.evaluate(()=>realBasemap.map.queryRenderedFeatures({layers:['terra-route']}).length);if(route.expected>0)assert.ok(route.renderedEdges>0,'The current route line must actually render');await page.reload({waitUntil:'load'});await live(page);await visibleSelection(page,route.place);assert.equal(await page.evaluate(()=>activePlan.id),route.id);
  currentStage='network-fallback';const tileOrigins=await page.evaluate(()=>[...new Set(Object.values(realBasemap.map.getStyle().sources).filter(s=>s.type==='vector').flatMap(s=>(s.tiles||[]).map(u=>new URL(u).origin)))]);for(const origin of tileOrigins)await page.route(origin+'/**',request=>request.abort());await page.reload({waitUntil:'load'});await page.waitForFunction(()=>realBasemap.failed&&!realMapActive());assert.equal(await page.evaluate(()=>selected.id),route.place);assert.equal(await page.evaluate(()=>activePlan.id),route.id);assert.equal(await page.locator('#globe').getAttribute('class'),'schematic-globe');assert.ok(await page.locator('#basemap-retry').isVisible());await page.waitForFunction(()=>land.length>0&&hits.some(q=>q.p===selected));await page.screenshot({path:path.join(output,viewport.width+'-offline-fallback.png')});assert.deepEqual(errors,[]);
  report.push({frames:currentSteps,network:currentNetwork,viewport,renderer,requestedSoftwareGL:softwareGL,world,cities,route,normalMotionSidebar:true,history:true,keyboardZoom:true,artToggle:true,themeSwitches:['nature','nc500','vangogh'],networkFallback:true});await context.close();
 }
 fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({kind:'live-browser',passed:true,report},null,2));reportWritten=true;console.log(JSON.stringify({passed:true,output,report},null,2));
 }catch(error){const result={kind:'live-browser',passed:false,error:error.message,completed:report,console:currentConsole,stage:currentStage,frames:currentSteps,network:currentNetwork};if(currentPage){result.url=currentPage.url();try{result.failureFrame=await currentPage.evaluate(probeMapFrame);await currentPage.screenshot({path:path.join(output,'failure.png')});result.state=await currentPage.evaluate(()=>({fallback:realBasemap.failed,provider:currentBasemapProvider().id,baseTileSeen:realBasemap.baseSeen}));}catch(captureError){result.captureError=captureError.message;}}fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(result,null,2));reportWritten=true;throw error;}finally{await browser.close()}
})().catch(e=>{if(!reportWritten){fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({kind:'live-browser',passed:false,stage:'launch-or-setup',error:e.message},null,2));}console.error(e);process.exitCode=1});

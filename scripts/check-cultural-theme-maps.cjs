'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const {routeFrameReady,probeRouteFrame}=require('./map-render-probe.cjs');
const {culturalBrowserScope,culturalShardThemes}=require('./cultural-browser-scope.cjs');
const scope=culturalBrowserScope();
const base=process.env.BASE_URL||'http://127.0.0.1:8000/',out='qa/cultural-theme-maps';
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage(),errors=[],images=[];page.on('pageerror',e=>errors.push(e.message));
 const open=async hash=>{await page.goto(base+hash);await page.waitForFunction(()=>document.body.dataset.ready==='true')};
 const overflow=async id=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),id+' overflow');
 const frame=async id=>{
  const before=await page.evaluate(probeRouteFrame);let result;
  try{await page.waitForFunction(routeFrameReady,true);result=await page.evaluate(probeRouteFrame)}catch(error){result=await page.evaluate(probeRouteFrame);fs.writeFileSync(out+'/'+deviceName+'-frame-failure.json',JSON.stringify({id,error:error.message,before,result},null,2));await page.screenshot({path:out+'/'+deviceName+'-frame-failure.png'});throw error}
  if(['fuji-tokaido','european-music-cities'].includes(id))fs.writeFileSync(out+'/'+deviceName+'-'+id+'-transition.json',JSON.stringify({before,result},null,2));
  if(id==='european-music-cities'){fs.writeFileSync(out+'/'+deviceName+'-music-frame.json',JSON.stringify(result,null,2));await page.screenshot({path:out+'/'+deviceName+'-music-overview.png'});}
  if(result.native)assert.ok(result.base>0,id+' current basemap');
  // Global comparison maps need more than one hemisphere. Local maps and plans fit.
  assert.ok(result.points.every(p=>(result.native?p.rendered:p.z>0)&&p.x>0&&p.x<result.w&&p.y>0&&p.y<result.h),id+' framing '+JSON.stringify(result));
 };
 let deviceName='unknown';
 try{
  await open('#interest=art');const ids=await page.evaluate(()=>[...culturalThemeMaps.keys()]);
  const reviewThemes=culturalShardThemes([...ids,'shen-congwen','xiao-hong','higashiyama','sibelius','grieg','wordsworth','constable'],scope);
  for(const device of scope.devices){
   deviceName=device.name;
   await page.setViewportSize(device);await open('#interest=art');
   assert.equal(await page.locator('[data-theme^="collection-"]').count(),0);
   for(const id of reviewThemes){
    await open('#theme='+id+'&view=places');
    assert.equal(await page.locator('#cultural-collection-directory,#collection-person,#collection-region,.collection-member').count(),0);
    assert.ok(await page.locator('#places .place').count()>1,id);
    assert.equal(await page.locator('#tab-plans').textContent(),'推荐行程');
    assert.ok(!/专题合集|找子线|打开完整人物/.test(await page.locator('#sidebar').innerText()));
    const hero=page.locator('#theme-hero [data-read-image]').first();await hero.scrollIntoViewIfNeeded();
    await page.locator('#theme-hero img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>null))));
    images.push(...await page.locator('#theme-hero img').evaluateAll(imgs=>imgs.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src)));
    await hero.click();assert.equal(await page.locator('#image-room').evaluate(d=>d.open),true);assert.ok((await page.locator('.room-credit').innerText()).length>10);await page.locator('.room-close').click();
    await page.locator('#tab-plans').click();assert.ok(await page.locator('.plan-card').count(),id);
    const plans=await page.evaluate(()=>buildPlans(themes[activeTheme].id,0).map(p=>p.id));
    for(const plan of plans){
     await open('#theme='+id+'&view=plans&route='+plan);
     assert.equal(await page.evaluate(()=>activePlan?.id),plan);assert.ok(await page.locator('.route-stops button').count()>=1);
     if(ids.includes(id)||['shen-yuan-river','xiaohong-home-writing'].includes(plan))await frame(id+'/'+plan);
     if(['naoshima-honmura','paris-sculpture-left-bank'].includes(plan)){
      const view=await page.evaluate(probeRouteFrame);fs.writeFileSync(out+'/'+deviceName+'-'+plan+'-distribution.json',JSON.stringify(view,null,2));await page.screenshot({path:out+'/'+deviceName+'-'+plan+'-distribution.png'});
      assert.ok(view.points.every((p,i)=>view.points.slice(i+1).every(q=>Math.hypot(p.x-q.x,p.y-q.y)>=24)),'local plan points must be distinguishable in active map pixels: '+JSON.stringify(view));
     }
     assert.equal(await page.evaluate(()=>activePlan.topology),'network');assert.equal(await page.evaluate(()=>routeEdges(previewStops,activePlan).length),0);
     await page.locator('.route-stops button').first().click();assert.ok((await page.locator('#detail').innerText()).length>100);
     await page.locator('#detail .reading-sources').click();assert.ok(await page.locator('#detail .reading-sources a').count());
     if(!await page.locator('#detail .add-trip').isDisabled())await page.locator('#detail .add-trip').click();assert.ok(await page.evaluate(()=>trip.some(p=>p.id===selected.id)));if(await page.locator('.route-stops button').count()>1){await page.locator('#detail [aria-label="下一站"]').click();assert.equal(await page.evaluate(()=>previewStops.indexOf(selected)),1);}
     await page.locator('#detail .reading-close').click();await page.locator('.route-overview').click();if(ids.includes(id))await frame(id+'/'+plan+' overview');await overflow(id);
     if(plan===plans[0])await page.screenshot({path:out+'/'+device.name+'-'+id+'-plan.png'});
     await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');assert.equal(await page.evaluate(()=>activePlan?.id),plan);
     await page.locator('.route-back').click();assert.ok(await page.locator('#plans-panel').isVisible());
    }
    await open('#theme='+id+'&view=places');
    if(!['modern-architecture','higashiyama'].includes(id))await frame(id);
    await page.locator('#places .place').first().scrollIntoViewIfNeeded();await overflow(id);
    await page.screenshot({path:out+'/'+device.name+'-'+id+'-places.png'});
   }
   // Search inside merged maps uses each author's contextual places, not a selector.
   await open('#theme=jiangnan-painting');await page.locator('#search').fill('吴冠中');assert.ok(await page.locator('#places .place').count()>=1);assert.ok(await page.evaluate(()=>filtered().every(p=>culturalPlaceSearchText(p).includes('吴冠中'))));
   await open('#interest=art&find='+encodeURIComponent('萧红'));assert.ok(await page.locator('[data-theme="xiao-hong"]').count());assert.equal(await page.locator('[data-theme="shen-congwen"]').count(),0);
   await open('#interest=art&find='+encodeURIComponent('吴冠中'));assert.ok(await page.locator('[data-theme="jiangnan-poetry-painting"]').count());assert.ok(await page.locator('[data-theme="wu-guanzhong"]').count());
   for(const [old,id]of Object.entries(await page.evaluate(()=>culturalMapAliases))){await open('#theme='+old+'&view=plans');assert.equal(await page.evaluate(()=>themes[activeTheme].id),id);assert.ok(await page.locator('.plan-card').count());}
   await open('#theme=collection-modern-chinese-literature&person=xiao-hong&view=plans&route=atlas-xiao-hong-places');assert.equal(await page.evaluate(()=>activePlan?.theme),'xiao-hong');
   await open('#theme=collection-chinese-painting&place=wh-440');assert.equal(await page.evaluate(()=>selected?.id),'wh-440');
   await open('#theme=fuji-tokaido');assert.ok(await page.locator('.artwork-card').count()>=5);assert.equal(await page.locator('[data-art-museum="atlas-yui"]').count(),0);await page.locator('#discover-panel [data-art-museum]').first().click();assert.equal(await page.evaluate(()=>selected?.id),'impressionism-met');assert.equal(await page.evaluate(()=>themes[activeTheme].id),'hokusai');
  }
  assert.deepEqual(errors,[]);assert.deepEqual(images,[]);
  fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,maps:reviewThemes,registeredMaps:ids,viewports:scope.devices.map(d=>d.width+'x'+d.height),shard:scope.shard,shards:scope.shards,legacyAliases:18,retainedPersonThemes:76,errors,failedImages:images},null,2));console.log('PASS cultural theme maps '+scope.devices.map(d=>d.name).join('/')+' shard '+scope.shard+'/'+scope.shards+': direct places, every assigned regional plan, detail, save, next/back, URL restoration, person search, image credits and legacy links.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8000/',out='qa/theme-review/short-browser';
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage(),errors=[],failedImages=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 const open=async hash=>{await page.goto(base+hash);await page.waitForFunction(()=>document.body.dataset.ready==='true')};
 try{
  for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   await page.setViewportSize(device);await open('');assert.equal(await page.locator('#catalog-results [data-theme="gaudi"]').count(),0);
   for(const id of ['barcelona-art','paris-sculpture','detroit-art']){
    await page.locator('#catalog-results [data-theme="'+id+'"]').click();
    assert.equal(await page.locator('#collection-person,#cultural-collection-directory').count(),0);
    const expected=id==='barcelona-art'?4:id==='paris-sculpture'?6:2;assert.ok(await page.locator('#places .place').count()>=expected);
    await page.locator('#tab-plans').click();const plans=await page.evaluate(()=>buildPlans(themes[activeTheme].id,0).map(p=>p.id));
    assert.ok(plans.length>=(id==='paris-sculpture'?4:1));
    for(const [index,plan]of plans.entries()){
     await page.locator('.plan-card [data-action="preview"]').nth(index).click();assert.equal(await page.evaluate(()=>activePlan?.id),plan);assert.equal(await page.evaluate(()=>routeEdges(previewStops,activePlan).length),0);
     await page.locator('.route-stops button').first().click();assert.ok(await page.locator('#detail .reading-sources a').count());
     if(!await page.locator('#detail .add-trip').isDisabled())await page.locator('#detail .add-trip').click();assert.ok(await page.evaluate(()=>trip.some(p=>p.id===selected.id)));
     await page.locator('#detail img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>null)})));failedImages.push(...await page.locator('#detail img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)));
     if(await page.locator('.route-stops button').count()>1){await page.locator('#detail [aria-label="下一站"]').click();assert.equal(await page.evaluate(()=>previewStops.indexOf(selected)),1);await page.locator('#detail [aria-label="上一站"]').click();assert.equal(await page.evaluate(()=>previewStops.indexOf(selected)),0);}
     if(plan===plans[0])await page.screenshot({path:out+'/'+device.name+'-'+id+'.png'});
     await page.locator('#detail .reading-close').click();await page.locator('.route-overview').click();await page.waitForFunction(()=>camera===null&&Math.abs(zoom-targetZoom)<.01);
     assert.ok(await page.evaluate(()=>mapPoints().every(p=>{const q=project(p.lon,p.lat),s=screen(q);return q[2]>0&&s[0]>0&&s[0]<w&&s[1]>0&&s[1]<h})),plan+' map fit');
     await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');assert.equal(await page.evaluate(()=>activePlan?.id),plan);await page.locator('.route-back').click();
     checks.push({device:device.name,theme:id,plan,map:true,saved:true,nextPrevious:true,refresh:true});
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));await page.locator('#back-themes').click();
   }
   await open('#show=routes');const retained=await page.evaluate(()=>themes.filter(t=>t.catalogHidden).flatMap(t=>buildPlans(t.id,0).map(p=>({theme:t.id,id:p.id,name:p.name}))));
   for(const p of retained){
    await page.locator('#catalog-search').fill(p.name);const button=page.locator('[data-home-plan="'+p.id+'"][data-plan-theme="'+p.theme+'"]');assert.equal(await button.count(),1,p.name+' search');await button.click();assert.equal(await page.evaluate(()=>activePlan?.id),p.id);await page.locator('#back-themes').click();
   }
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failedImages,[]);fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,viewports:['1440x1000','390x844'],checks,errors,failedImages},null,2));console.log('PASS short-theme review: city maps, original itinerary search, sources, image decoding, save, map fit, next/previous, refresh and no person directories on desktop/mobile.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8000/',out='qa/cultural-collections-browser';
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage(),errors=[],failedImages=[];page.on('pageerror',e=>errors.push(e.message));
 const open=async hash=>{await page.goto(base+hash);await page.waitForFunction(()=>document.body.dataset.ready==='true')};
 const noOverflow=async name=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),name+' overflow');
 try{
  await open('#interest=art');const ids=await page.evaluate(()=>[...culturalCollections.keys()]);assert.equal(ids.length,18);
  for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   await page.setViewportSize(device);await open('#interest=art');
   assert.equal(await page.locator('.discovery-card[data-theme^="collection-"]').count(),18);
   assert.equal(await page.evaluate(()=>culturalFeaturedIds.every(id=>!!document.querySelector('[data-theme="'+id+'"]'))),true);
   await page.locator('.discovery-browser').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/'+device.name+'-entrances.png'});
   for(const id of ids){
    await open('#theme='+id+'&view=places');
    assert.ok(await page.locator('.collection-member').count()>0);assert.equal(await page.evaluate(()=>buildPlans(themes[activeTheme].id,0).length),0);
    assert.equal(await page.evaluate(()=>previewStops),null);
    await page.locator('#theme-hero img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>null))));
    failedImages.push(...await page.locator('#theme-hero img').evaluateAll(imgs=>imgs.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src)));
    await page.locator('#cultural-collection-directory').scrollIntoViewIfNeeded();await noOverflow(id+'/'+device.name);
    await page.screenshot({path:out+'/'+device.name+'-'+id+'.png'});
    const source=await page.locator('#collection-person option').nth(1).getAttribute('value');
    await page.locator('#collection-person').selectOption(source);assert.equal(await page.locator('.collection-member').count(),1);
    assert.ok((await page.url()).includes('person='+source));await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');
    assert.equal(await page.locator('#collection-person').inputValue(),source);assert.equal(await page.locator('.collection-member').count(),1);
    const country=await page.locator('#collection-region option').nth(1).textContent();await page.locator('#collection-person').selectOption('');await page.locator('#collection-region').selectOption(country);
    assert.ok(await page.evaluate(country=>filtered().every(p=>p.country===country),country));
    if(await page.locator('[data-collection-place]').count()){
     await page.locator('[data-collection-place]').first().click();assert.ok((await page.locator('#detail').innerText()).length>100);
     await page.locator('#detail .reading-close').click();
    }
    await page.locator('#collection-region').selectOption('');
    const link=page.locator('.collection-member [data-collection-theme]').first(),target=await link.getAttribute('data-collection-theme');
    await link.click();assert.equal(await page.evaluate(()=>themes[activeTheme].id),target);assert.ok(await page.locator('.plan-card').count()>0);
    await page.locator('[data-action=preview]').first().click();assert.ok(await page.locator('.route-stops button').count()>=2);
    await page.goBack();assert.equal(await page.evaluate(()=>themes[activeTheme].id),target);
    await page.goBack();assert.equal(await page.evaluate(()=>themes[activeTheme].id),id);
   }
   await open('#interest=art&find='+encodeURIComponent('萧红'));assert.ok(await page.locator('[data-theme="collection-modern-chinese-literature"]').count());
   await page.locator('[data-catalog-view="routes"]').click();assert.ok(await page.locator('[data-plan-theme="xiao-hong"]').count());
   await open('#theme=collection-setouchi-art&view=places');
   assert.equal(await page.evaluate(()=>filtered().every(p=>p.country==='日本'&&p.lon>133&&p.lon<135&&p.lat>34&&p.lat<35)),true);
   await page.locator('#back-themes').click();assert.equal(await page.locator('#cultural-collection-directory').count(),0);
   // Switching from Hunan to Heilongjiang must move the map as well as the list.
   await open('#theme=collection-modern-chinese-literature&view=places');
   await page.locator('#collection-person').selectOption('xiao-hong');
   const checkFrame=async()=>{await page.waitForFunction(()=>camera===null&&Math.abs(zoom-targetZoom)<.01);assert.ok(await page.evaluate(()=>filtered().every(p=>{const q=project(p.lon,p.lat),s=screen(q);return q[2]>0&&s[0]>0&&s[0]<w&&s[1]>0&&s[1]<h})));assert.equal(await page.evaluate(()=>previewStops),null)};
   await checkFrame();await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');await checkFrame();
   await page.screenshot({path:out+'/'+device.name+'-filtered-map.png'});
   await open('#theme=collection-modern-architecture&view=places');await page.locator('#collection-region').selectOption('日本');await checkFrame();
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failedImages,[]);
  fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,collections:18,featured:10,retainedPersonThemes:76,viewports:['1440x1000','390x844'],errors,failedImages},null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

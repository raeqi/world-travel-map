'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
(async()=>{
 const out=process.env.SCREENSHOT_DIR||'qa/roads-browser';
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[],failedImages=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8000',{waitUntil:'load'});
  await page.waitForFunction(()=>document.body.dataset.ready==='true');
  await page.locator('.theme-card[data-theme="roads"]').click();
  await page.waitForFunction(()=>land.length>0&&w>0);
  await page.locator('#tab-plans').click();
  await page.locator('#travel-month').selectOption('0');
  assert.equal(await page.locator('.plan-card').count(),16);
  await page.screenshot({path:path.join(out,'road-atlas-desktop.png')});
  const ids=await page.evaluate(()=>scenicRoadPlans.map(p=>p.id));
  for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
   await page.setViewportSize(viewport);
   for(const id of ids){
    await page.evaluate(id=>openPlan(buildPlans('roads',0).find(p=>p.id===id)),id);
    await page.waitForFunction(()=>camera===null);
    await page.locator('.road-route-guide').waitFor();
    assert.equal(await page.locator('.route-stops button').count(),await page.evaluate(()=>activePlan.ids.length));
    assert.ok(!(await page.locator('.route-heading > p').textContent()).includes('直线合计'));
    await page.locator('.road-route-guide summary').click();
    assert.ok((await page.locator('.road-route-guide').textContent()).includes('没有实时路况'));
    await page.locator('.route-stops button').first().click();
    await page.waitForFunction(()=>camera===null);
    assert.equal(await page.locator('#detail').isVisible(),true);
    assert.ok((await page.locator('#detail .reading-essay').textContent()).length>20);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,id+' viewport overflow');
    await page.screenshot({path:path.join(out,id+'-'+viewport.width+'.png')});
    await page.locator('#detail .reading-close').click();
    await page.locator('.route-stops button').last().click();
    await page.waitForFunction(()=>camera===null);
    assert.equal(await page.evaluate(()=>selected.id===activePlan.ids.at(-1)),true);
    await page.locator('#detail .reading-close').click();
   }
  }
  // Decode actual source images. Existing local-photo checks remain in the main suite.
  const images=await page.evaluate(()=>scenicRoadPhotos.map(p=>({id:p.id,path:p.path})));
  for(const image of images){
   const result=await page.evaluate(async image=>{
    const img=new Image();
    const timer=new Promise(resolve=>setTimeout(()=>resolve({ok:false,error:'image timeout'}),25000));
    const decode=new Promise(resolve=>{img.onload=()=>resolve({ok:img.naturalWidth>0});img.onerror=()=>resolve({ok:false,error:'image request failed'});img.src=image.path});
    return Promise.race([timer,decode]);
   },image);
   if(!result.ok)failedImages.push({id:image.id,error:result.error});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#back-themes').click();
  await page.locator('[data-interest="drives"]').click();
  assert.equal(await page.locator('.theme-card[data-theme="roads"]').count(),1);
  await page.locator('[data-catalog-view="routes"]').click();
  await page.locator('#catalog-area').selectOption('非洲');
  assert.ok((await page.locator('#catalog-results').textContent()).includes('南非花园大道'));
  await page.locator('#catalog-area').selectOption('all');
  await page.locator('#catalog-search').fill('新西兰');
  assert.ok((await page.locator('#catalog-results').textContent()).includes('新西兰 SH94'));
  assert.ok(!(await page.locator('#catalog-results').textContent()).includes('加拿大'));
  await page.screenshot({path:path.join(out,'road-discovery-country.png')});
  await page.locator('#catalog-search').fill('北冰洋');
  assert.ok((await page.locator('#catalog-results').textContent()).includes('加拿大'));
  assert.deepEqual(errors,[],'No browser JS exceptions');
  assert.deepEqual(failedImages,[],'Real photographs must decode; no silent missing images');
  console.log('PASS roads browser: 16 routes × desktop/mobile; first/last stop; guide; search/continent filters; 13 real-image decodes; screenshots '+out);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

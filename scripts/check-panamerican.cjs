'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
(async()=>{
 const out=process.env.SCREENSHOT_DIR||'qa/roads-browser';
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8000/#interest=drives',{waitUntil:'load'});
  await page.waitForFunction(()=>document.body.dataset.ready==='true');
  assert.equal(await page.locator('.theme-card[data-theme="panamerican"]').count(),1);
  await page.locator('.theme-card[data-theme="panamerican"]').click();
  await page.waitForFunction(()=>camera===null);
  await page.locator('#tab-plans').click();
  await page.locator('#travel-month').selectOption('0');
  assert.equal(await page.locator('.plan-card').count(),7);
  await page.screenshot({path:path.join(out,'panamerican-chapters-desktop.png')});
  const ids=await page.evaluate(()=>panAmericanPlans.map(p=>p.id));
  for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
   await page.setViewportSize(viewport);
   for(const id of ids){
    await page.evaluate(id=>openPlan(buildPlans('panamerican',0).find(p=>p.id===id)),id);
    await page.waitForFunction(()=>camera===null);
    await page.locator('.pan-gap-note').waitFor();
    await page.locator('.road-route-guide').waitFor();
    assert.equal(await page.locator('.route-stops button').count(),await page.evaluate(()=>activePlan.ids.length));
    assert.ok(!(await page.locator('.route-heading > p').textContent()).includes('直线合计'));
    if(['pan-overview','pan-chile-extension'].includes(id))assert.equal(await page.evaluate(()=>routeEdges(previewStops,activePlan).length),0);
    await page.screenshot({path:path.join(out,id+'-'+viewport.width+'.png')});
    await page.locator('.route-stops button').first().click();
    await page.waitForFunction(()=>camera===null);
    assert.equal(await page.locator('#detail').isVisible(),true);
    assert.ok((await page.locator('#detail .reading-essay').textContent()).length>80);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,id+' overflow');
    await page.locator('#detail .reading-close').click();
    await page.locator('.route-stops button').last().click();
    await page.waitForFunction(()=>camera===null);
    assert.equal(await page.evaluate(()=>selected.id===activePlan.ids.at(-1)),true);
    await page.locator('#detail .reading-close').click();
   }
   // Gap links from any chapter must select their markers on the network overview.
   await page.evaluate(()=>openPlan(buildPlans('panamerican',0).find(p=>p.id==='pan-fireland')));
   for(const target of ['pan-yaviza','pan-turbo']){
    await page.locator('[data-pan-gap="'+target+'"]').click();
    await page.waitForFunction(()=>camera===null);
    assert.equal(await page.evaluate(()=>activePlan.id),'pan-overview');
    assert.equal(await page.evaluate(()=>selected.id),target);
    assert.equal(await page.evaluate(()=>routeEdges(previewStops,activePlan).length),0);
    await page.locator('#detail .reading-close').click();
   }
   await page.screenshot({path:path.join(out,'pan-darien-'+viewport.width+'.png')});
  }
  await page.setViewportSize({width:1440,height:1000});
  // Saved places, exact route, and selection remain stable on reload.
  await page.evaluate(()=>{openPlan(buildPlans('panamerican',0).find(p=>p.id==='pan-fireland'));addPlan(activePlan);select(previewStops.at(-1));});
  await page.reload({waitUntil:'load'});
  await page.waitForFunction(()=>document.body.dataset.ready==='true'&&camera===null);
  assert.equal(await page.evaluate(()=>activePlan.id),'pan-fireland');
  assert.equal(await page.evaluate(()=>selected.id),'pan-lapataia');
  assert.equal(await page.evaluate(()=>trip.filter(p=>p.id.startsWith('pan-')).length),4);
  await page.locator('#detail .reading-close').click();
  await page.locator('#back-themes').click();
  await page.locator('[data-interest="drives"]').click();
  await page.locator('[data-catalog-view="routes"]').click();
  await page.locator('#catalog-search').fill('厄瓜多尔');
  const results=await page.locator('#catalog-results').textContent();
  assert.ok(results.includes('安第斯北段'));
  assert.ok(!results.includes('火地岛末段'));
  // Decode actual Commons image endpoints; metadata alone does not establish availability.
  const photos=await page.evaluate(()=>panAmericanPhotos.map(p=>({id:p.id,path:p.path})));
  for(const p of photos){
   const decoded=await page.evaluate(p=>new Promise(resolve=>{
    const image=new Image(),timeout=setTimeout(()=>resolve(false),25000);
    image.onload=()=>{clearTimeout(timeout);resolve(image.naturalWidth>0)};
    image.onerror=()=>{clearTimeout(timeout);resolve(false)};image.src=p.path;
   }),p);
   assert.ok(decoded,p.id+' image decodes');
  }
  assert.deepEqual(errors,[],'No browser JS exceptions');
  console.log('PASS Pan-American browser: 7 chapters × desktop/mobile, gap links, no fictitious network edges, saved places/reload, country search and 6 real image decodes.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

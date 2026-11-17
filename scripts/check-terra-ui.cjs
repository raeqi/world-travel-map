'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const output=path.resolve(process.env.SCREENSHOT_DIR||'qa/terra-mosaic');
fs.mkdirSync(output,{recursive:true});
const origin=process.env.SITE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({headless:true});
 const errors=[],captures=[],checkedThemes=[];
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 page.setDefaultTimeout(25000);
 page.on('pageerror',e=>errors.push(e.message));
 async function ready(){
  await page.waitForFunction(()=>document.body.dataset.ready==='true'&&typeof land!=='undefined'&&land.length>0);
 }
 async function media(){
  await page.evaluate(async()=>{
   const imgs=[...document.images].filter(img=>img.closest('.brand,.hero-slide:not([hidden]),.catalog-cover,.curated-link,.itinerary-image,#theme-hero,#detail'));
   await Promise.allSettled(imgs.map(async img=>{img.loading='eager';if(img.decode)await Promise.race([img.decode(),new Promise(resolve=>setTimeout(resolve,12000))])}));
  });
 }
 async function noOverflow(label){
  const size=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth}));
  assert.ok(size.width<=size.viewport+1,label+' overflows: '+JSON.stringify(size));
 }
 async function capture(name,fullPage=false){
  await media();
  await noOverflow(name);
  await page.screenshot({path:path.join(output,name+'.jpg'),type:'jpeg',quality:82,fullPage});
  captures.push(name+'.jpg');
  if(process.env.INLINE_SCREENSHOTS==='1'&&['desktop-home','desktop-discovery','desktop-impressionism','desktop-place'].includes(name))console.log('TERRA_PREVIEW_'+name.toUpperCase().replaceAll('-','_')+':'+((await page.screenshot({type:'jpeg',quality:60})).toString('base64')));
 }
 try{
  await page.goto(origin,{waitUntil:'load'});await ready();
  assert.equal(await page.title(),'经纬万象 · Terra Mosaic');
  assert.equal(await page.locator('.brand strong').textContent(),'经纬万象');
  assert.equal(await page.locator('.brand small').textContent(),'Terra Mosaic');
  assert.ok(await page.locator('.brand-mark').evaluate(img=>img.complete&&img.naturalWidth>0));
  const allThemes=await page.evaluate(()=>themes.map(t=>t.id));
  assert.equal(await page.locator('.theme-card').count(),allThemes.length);
  assert.ok(await page.locator('.curated-discovery').evaluate(el=>el.nextElementSibling.classList.contains('discovery-browser')));
  assert.equal(await page.locator('.hero-controls,.hero-play,[data-hero-step],[data-hero-dot]').count(),0);
  assert.equal(await page.locator('.hero-carousel').getAttribute('tabindex'),'0');
  const firstRecommendations=await page.evaluate(()=>heroSlides.map(s=>s.theme));
  assert.ok(await page.evaluate(()=>heroRecommendationPool().length)>6);
  await page.reload({waitUntil:'load'});await ready();
  const currentRecommendations=await page.evaluate(()=>heroSlides.map(s=>s.theme));
  assert.ok(currentRecommendations.some(id=>!firstRecommendations.includes(id)),'new visits rotate the recommendation set');
  assert.equal(await page.evaluate(()=>new Set(heroSlides.map(s=>s.mediaKey)).size),6);
  assert.equal(await page.evaluate(()=>new Set(heroSlides.map(s=>s.group)).size),5);
  await capture('desktop-home',true);
  await page.locator('.discovery-browser').scrollIntoViewIfNeeded();
  await capture('desktop-discovery');
  await page.locator('[data-interest="nature"]').click();
  assert.ok(await page.locator('.theme-card').count()>0);
  assert.ok(await page.evaluate(()=>matchingDiscovery().every(x=>x.group==='nature')));
  await page.locator('[data-interest="all"]').click();
  await page.locator('#catalog-search').fill('莫奈');
  assert.ok(await page.locator('.theme-card[data-theme="impressionism"]').count());
  await page.locator('#catalog-search').fill('');
  await page.locator('[data-catalog-view="routes"]').click();
  assert.equal(await page.locator('.catalog-itinerary').count(),await page.evaluate(()=>planTemplates.length));
  await capture('desktop-route-discovery',true);
  await page.locator('[data-catalog-view="themes"]').click();
  // Every theme retains its actual map, route list and return navigation.
  for(const id of allThemes){
   await page.locator('.theme-card[data-theme="'+id+'"]').click();
   await page.waitForFunction(id=>document.body.dataset.theme===id&&w>0&&h>0,id);
   assert.equal(await page.locator('#discover-panel').isVisible(),true,id);
   await page.locator('#tab-plans').click();
   assert.ok(await page.locator('.plan-card').count(),id+' has no routes');
   if(['parks','impressionism','canal'].includes(id))await capture('desktop-'+id);
   checkedThemes.push(id);
   await page.locator('#back-themes').click();
   assert.deepEqual(await page.evaluate(()=>heroSlides.map(s=>s.theme)),currentRecommendations,'return navigation preserves this visit');
  }
  await page.locator('.theme-card[data-theme="parks"]').click();
  await page.locator('#tab-plans').click();
  await page.locator('.plan-actions [data-action="preview"]').first().click();
  assert.equal(await page.locator('#route-panel').isVisible(),true);
  await page.locator('.route-stops button').first().click();
  await page.waitForFunction(()=>camera===null&&selected!==null);
  assert.equal(await page.locator('#detail').isVisible(),true);
  assert.ok(Number.parseFloat(await page.locator('#detail .place-summary').evaluate(el=>getComputedStyle(el).fontSize))>=14);
  await capture('desktop-place');
  await page.locator('#detail .add-trip').click();
  assert.ok(await page.evaluate(()=>trip.length>0));
  const selectedId=await page.evaluate(()=>selected.id);
  await page.reload({waitUntil:'load'});await ready();
  assert.equal(await page.evaluate(()=>selected.id),selectedId);
  assert.ok(await page.evaluate(id=>trip.some(p=>p.id===id),selectedId));
  await page.locator('.brand').click();
  assert.equal(await page.locator('#theme-catalog').isVisible(),true);
  // Actual Chromium mobile emulation, not a physical-phone claim.
  await context.close();
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
  const mobilePage=await mobile.newPage();
  mobilePage.on('pageerror',e=>errors.push(e.message));
  await mobilePage.goto(origin,{waitUntil:'load'});
  await mobilePage.waitForFunction(()=>document.body.dataset.ready==='true'&&land.length>0);
  async function mobileCapture(name){
   await mobilePage.evaluate(async()=>{await Promise.allSettled([...document.images].map(async img=>{img.loading='eager';if(img.decode)await img.decode()}))});
   const size=await mobilePage.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(size.width<=size.viewport+1,name+' overflows: '+JSON.stringify(size));
   await mobilePage.screenshot({path:path.join(output,name+'.jpg'),type:'jpeg',quality:82,fullPage:name==='mobile-home'});
   captures.push(name+'.jpg');
   if(process.env.INLINE_SCREENSHOTS==='1'&&['mobile-home','mobile-place'].includes(name))console.log('TERRA_PREVIEW_'+name.toUpperCase().replaceAll('-','_')+':'+((await mobilePage.screenshot({type:'jpeg',quality:60})).toString('base64')));
  }
  await mobileCapture('mobile-home');
  await mobilePage.locator('.theme-card[data-theme="impressionism"]').click();
  await mobilePage.locator('#tab-plans').click();
  await mobilePage.locator('.plan-actions [data-action="preview"]').first().click();
  assert.equal(await mobilePage.locator('#route-panel').isVisible(),true);
  await mobileCapture('mobile-route');
  await mobilePage.locator('.route-stops button').first().click();
  await mobilePage.waitForFunction(()=>camera===null&&selected!==null);
  assert.equal(await mobilePage.locator('#detail').isVisible(),true);
  await mobileCapture('mobile-place');
  await mobilePage.locator('.reading-close').click();
  assert.equal(await mobilePage.locator('#route-panel').isVisible(),true);
  await mobilePage.locator('.brand').click();
  assert.equal(await mobilePage.title(),'经纬万象 · Terra Mosaic');
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({brand:'经纬万象 · Terra Mosaic',checkedThemes,captures,viewports:['1440x1000','390x844 (Chromium mobile emulation)'],errors},null,2));
  console.log('PASS Terra Mosaic: '+checkedThemes.length+' themes, discovery, routes, reading, saved places, reload, mobile overflow and '+captures.length+' real screenshots.');
  await mobile.close();
 }catch(error){
  try{if(!page.isClosed())await page.screenshot({path:path.join(output,'failure.jpg'),type:'jpeg',quality:80,fullPage:true})}catch{}
  throw error;
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

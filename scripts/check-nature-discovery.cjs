'use strict';
(async function checkNatureBrowser(){
 const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
 const origin=process.env.SITE_URL||'http://127.0.0.1:8000',out=path.resolve(process.env.NATURE_SCREENSHOT_DIR||'qa/nature-discovery');
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true}),errors=[],timings=[],captures=[];
 const expected=['nc500-full','nc500-west','roads-california1','roads-utah12','roads-utah5','roads-arctic','roads-atlantic','roads-iceland1','roads-greatocean','roads-milford','roads-garden'].sort();
 async function ready(page){await page.waitForFunction(()=>document.body.dataset.ready==='true'&&typeof land!=='undefined'&&land.length>0)}
 async function capture(page,label){
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label+' horizontal overflow');
  await page.screenshot({path:path.join(out,label+'.jpg'),type:'jpeg',quality:80});captures.push(label+'.jpg');
  if(process.env.INLINE_SCREENSHOTS==='1')console.log('NATURE_PREVIEW_'+label.toUpperCase().replaceAll('-','_')+':'+(await page.screenshot({type:'jpeg',quality:58})).toString('base64'));
 }
 async function playing(page){await page.waitForFunction(()=>document.querySelector('.hero-carousel').dataset.autoplay==='playing')}
 async function cycle(page,label){
  const before=await page.evaluate(()=>heroPreferences.index),start=Date.now();
  await page.waitForFunction(before=>heroPreferences.index!==before,before,{timeout:11000});
  const after=await page.evaluate(()=>heroPreferences.index);
  assert.equal(after,(before+1)%6,label+' advances one slide');
  timings.push({label,before,after,elapsedMs:Date.now()-start});
 }
 async function held(page,label,ms=9000){
  const before=await page.evaluate(()=>heroPreferences.index);await page.waitForTimeout(ms);
  assert.equal(await page.evaluate(()=>heroPreferences.index),before,label+' holds the slide');
 }
 async function discovery(page,label){
  await page.goto(origin,{waitUntil:'load'});await ready(page);
  assert.equal(await page.locator('.curated-discovery,.curated-links').count(),0);
  assert.ok(await page.locator('.discovery-hero').evaluate(el=>el.nextElementSibling.classList.contains('discovery-browser')));
  const gap=await page.locator('.discovery-browser').evaluate(el=>el.getBoundingClientRect().top-document.querySelector('.discovery-hero').getBoundingClientRect().bottom);
  assert.ok(gap>=24&&gap<=65,label+' hero/discovery gap: '+gap);
  assert.equal(await page.locator('.hero-controls,.hero-play,[data-hero-step],[data-hero-dot]').count(),0);
  for(const id of ['parks','impressionism','canal','european-music-cities'])assert.ok(await page.locator('.theme-card[data-theme="'+id+'"]').count(),id+' remains discoverable');
  await page.locator('[data-interest="nature"]').click();
  assert.equal(await page.locator('.theme-card').count(),5);
  assert.equal(await page.locator('.catalog-itinerary,.nature-route-discovery').count(),0,'map tab contains maps only');
  assert.match(await page.locator('#catalog-result-count').textContent(),/5 张主题地图/);
  await page.locator('#catalog-results').scrollIntoViewIfNeeded();await capture(page,label+'-nature-maps');
  for(const id of ['canadian-rockies','nz-great-walks','patagonia-nature']){
   await page.locator('.theme-card[data-theme="'+id+'"]').click();
   await page.waitForFunction(id=>document.body.dataset.theme===id,id);
   assert.equal(await page.evaluate(()=>activePlan),null,'overview starts without invented route');
   const metadata=await page.evaluate(id=>({nodes:places.filter(p=>p.themes.includes(id)).length,plans:buildPlans(id,0).map(p=>p.id)}),id);
   assert.ok(metadata.nodes>=8);assert.ok(metadata.plans.length>=3);
   await page.locator('#tab-plans').click();
   await page.locator('#travel-month').selectOption('7');
   assert.equal(await page.locator('.plan-card').count(),id==='canadian-rockies'?3:0,'July uses each route seasonal window');
   await page.locator('#travel-month').selectOption('0');
   await page.locator('#travel-days').selectOption('3');
   assert.equal(await page.locator('.plan-card').count(),id==='canadian-rockies'?2:id==='nz-great-walks'?1:5,'day budget filters actual routes');
   await page.locator('#travel-days').selectOption('0');await page.locator('#travel-month').selectOption('0');
   await page.locator('.plan-actions [data-action="preview"]').first().click();
   await page.waitForFunction(()=>activePlan!==null);
   assert.ok(metadata.plans.includes(await page.evaluate(()=>activePlan.id)));
   if(id!=='canadian-rockies')assert.ok(await page.evaluate(()=>targetZoom>60),'local trail route fits beyond the old global zoom cap');
   await page.locator('.route-stops button').first().click();
   await page.waitForFunction(()=>selected!==null&&camera===null&&Math.abs(zoom-targetZoom)<.01);
   assert.ok(await page.locator('#detail').isVisible());
   const images=await page.locator('#detail img').count();if(images)await page.locator('#detail img').first().evaluate(img=>img.decode());
   await capture(page,label+'-'+id);
   await page.locator('#detail .reading-close').click();await page.locator('#back-themes').click();
  }
  await page.locator('[data-catalog-view="routes"]').click();
  assert.equal(await page.locator('.catalog-itinerary').count(),39);
  const cross=await page.locator('.catalog-itinerary [data-home-plan]').evaluateAll(ns=>ns.map(n=>n.dataset.homePlan).filter(id=>!id.startsWith('natural-')&&!id.startsWith('nature-')&&!id.startsWith('parks-')));
  assert.ok(expected.every(id=>cross.includes(id)));
  await page.locator('#catalog-area').selectOption('欧洲');await page.locator('#catalog-search').fill('冰岛');
  assert.equal(await page.locator('.catalog-itinerary').count(),1);
  const stopIds=await page.evaluate(()=>buildPlans('drive-europe',0).find(p=>p.id==='roads-iceland1').ids);
  await page.locator('[data-home-plan="roads-iceland1"]').click();
  await page.waitForFunction(()=>activePlan?.id==='roads-iceland1');
  assert.deepEqual(await page.evaluate(()=>activePlan.ids),stopIds);
  assert.ok(new URL(page.url()).hash.includes('interest=nature'));
  await page.locator('.route-stops button').first().click();await page.waitForFunction(()=>selected!==null&&camera===null);
  const place=await page.evaluate(()=>selected.id);await page.locator('#detail .add-trip').click();
  await page.reload({waitUntil:'load'});await ready(page);
  assert.equal(await page.evaluate(()=>activePlan.id),'roads-iceland1');assert.equal(await page.evaluate(()=>selected.id),place);
  assert.ok(await page.evaluate(id=>trip.some(p=>p.id===id),place));
  await page.locator('#detail .reading-close').click();await page.locator('#back-themes').click();
  assert.equal(await page.locator('#catalog-search').inputValue(),'冰岛');
  await page.locator('#catalog-search').fill('冰岛 1');
  await page.locator('[data-catalog-view="themes"]').click();
  assert.equal(await page.locator('.theme-card,.catalog-itinerary').count(),0);
  assert.equal(await page.locator('.discovery-empty [data-catalog-view="routes"]').count(),1);
  await page.locator('.discovery-empty [data-catalog-view="routes"]').click();
  assert.equal(await page.locator('.catalog-itinerary').count(),1);
  await page.locator('[data-interest="drives"]').click();assert.equal(await page.locator('[data-home-plan="roads-iceland1"]').count(),1);
  await page.locator('[data-interest="nature"]').click();await page.locator('#catalog-area').selectOption('大洋洲');await page.locator('#catalog-search').fill('米尔福德');
  assert.equal(await page.locator('.catalog-itinerary').count(),2);
  await page.locator('[data-catalog-view="themes"]').click();assert.equal(await page.locator('.theme-card').count(),1);
  assert.equal(await page.locator('.catalog-itinerary').count(),0);
  await page.locator('#catalog-search').fill('no-such-nature-qwerty');assert.equal(await page.locator('.discovery-empty').count(),1);
  await page.locator('.reset-discovery').click();
  assert.equal(await page.locator('.theme-card').count(),await page.evaluate(()=>visibleCatalogueThemes().length));
  const decoded=await page.evaluate(async()=>{let failures=[];for(const m of Object.values(naturalAtlasMedia)){const img=new Image();img.src=m.path;try{await img.decode();if(img.naturalWidth<600)failures.push(m.path)}catch{failures.push(m.path)}}return failures});
  assert.deepEqual(decoded,[],'all 26 local licensed images decode');
 }
 try{
  const desktop=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'}),page=await desktop.newPage();
  page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(25000);
  await page.goto(origin,{waitUntil:'load'});await ready(page);await page.mouse.move(5,5);
  await playing(page);await capture(page,'desktop-home');await cycle(page,'desktop default autoplay');
  await page.locator('.hero-carousel').hover();await page.waitForFunction(()=>document.querySelector('.hero-carousel').dataset.autoplay==='hover-paused');
  await held(page,'hover');await page.mouse.move(5,5);await playing(page);await cycle(page,'mouseleave resumes autoplay');
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('.hero-carousel').dataset.autoplay==='reduced');
  assert.equal(await page.evaluate(()=>heroPreferences.paused),false);await held(page,'reduced motion');
  await page.emulateMedia({reducedMotion:'no-preference'});await playing(page);await cycle(page,'motion preference recovery');
  await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>renderDiscoveryCatalog());
  assert.equal(await page.locator('.hero-carousel').getAttribute('data-autoplay'),'reduced');
  await page.emulateMedia({reducedMotion:'no-preference'});await playing(page);await cycle(page,'remount from reduced motion');
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.waitForFunction(()=>document.querySelector('.hero-carousel').dataset.autoplay==='window-paused');
  await held(page,'window blur event');await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await playing(page);await cycle(page,'window focus event recovery');
  await page.evaluate(()=>renderDiscoveryCatalog());await playing(page);await cycle(page,'homepage rerender');
  await discovery(page,'desktop');await desktop.close();
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference'}),mp=await mobile.newPage();
  mp.on('pageerror',e=>errors.push(e.message));mp.setDefaultTimeout(25000);
  await mp.goto(origin,{waitUntil:'load'});await ready(mp);await mp.locator('.hero-carousel').scrollIntoViewIfNeeded();
  await playing(mp);await cycle(mp,'mobile default autoplay');
  await mp.evaluate(()=>window.scrollTo(0,0));await capture(mp,'mobile-home');
  await discovery(mp,'mobile');await mobile.close();
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({timings,captures,errors,viewports:['1440x1000','390x844 Chromium mobile emulation'],windowFocusTest:'Browser window events dispatched in Chromium; real timers, not a simulated clock.'},null,2));
  console.log('NATURE_BROWSER_REPORT '+JSON.stringify({timings,captures,errors}));
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

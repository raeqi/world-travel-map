'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const output=process.env.SCREENSHOT_DIR||'/tmp/atlas-editorial';fs.mkdirSync(output,{recursive:true});const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8000');await page.waitForFunction(()=>document.body.dataset.ready==='true');
 await page.locator('.theme-card img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode()})));
 assert.equal(await page.locator('.theme-card').count(),20);
 await page.screenshot({path:path.join(output,'gallery-full-desktop.png'),fullPage:true});
 await page.locator('.cultural-heading').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,'cultural-collection-desktop.png')});
 for(const id of ['nakasendo','francigena','andes','buddhist','canal','viking','impressionism','mozart','route66','nc500']){
  await page.locator(`.theme-card[data-theme=${id}]`).click();await page.locator('#theme-hero img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  await page.screenshot({path:path.join(output,id+'-edition-desktop.png')});
  await page.locator('#theme-hero .read-plate').click();assert.equal(await page.locator('#image-room').isVisible(),true);
  await page.locator('#image-room img').evaluate(img=>img.decode());
  assert.ok(await page.locator('#image-room .room-credit a').count()>=2);
  await page.screenshot({path:path.join(output,id+'-reading-desktop.png')});
  await page.keyboard.press('Escape');assert.equal(await page.locator('#image-room').isVisible(),false);
  await page.locator('#back-themes').click();
 }
 await page.locator('.theme-card[data-theme=impressionism]').click();assert.equal(await page.locator('.artwork-card').count(),4);
 const works=await page.evaluate(()=>impressionistWorks.map(w=>({key:w.key,placeId:w.placeId,museumId:w.museumId})));
 for(const work of works){
  await page.locator(`.artwork-card [data-read-image="${work.key}"]`).click();
  await page.locator('#image-room img').evaluate(img=>img.decode());await page.screenshot({path:path.join(output,work.key+'-painting-desktop.png')});
  await page.locator(`#image-room [data-art-place="${work.key}"]`).click();await page.waitForFunction(()=>camera===null);assert.equal(await page.evaluate(()=>selected.id),work.placeId);
  assert.equal(await page.locator('.artwork-detail').count()>=1,true);await page.locator('#detail .add-trip').click();const n=await page.evaluate(()=>trip.length);assert.equal(await page.locator('#detail .add-trip').isDisabled(),true);
  await page.locator('#detail [aria-label="关闭详情"]').click();
  await page.locator(`.artwork-card [data-art-museum="${work.key}"]`).click();await page.waitForFunction(()=>camera===null);assert.equal(await page.evaluate(()=>selected.id),work.museumId);assert.match(await page.locator('#detail').textContent(),/现藏/);
  await page.locator('#detail [aria-label="关闭详情"]').click();assert.equal(await page.evaluate(()=>trip.length),n);
 }
 await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');assert.equal(await page.evaluate(()=>trip.length),4);
 await page.setViewportSize({width:390,height:844});
 for(const id of ['nakasendo','francigena','andes','buddhist','canal','viking','impressionism','mozart','route66','nc500']){
  await page.goto('http://127.0.0.1:8000/#theme='+id+'&view=places');await page.waitForFunction(()=>document.body.dataset.ready==='true');
  await page.locator('#theme-hero img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:path.join(output,id+'-edition-mobile.png')});
  await page.locator('#theme-hero .read-plate').click();await page.locator('#image-room img').evaluate(img=>img.decode());
  assert.equal(await page.evaluate(()=>{const r=document.querySelector('#image-room').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth}),true);
  await page.screenshot({path:path.join(output,id+'-reading-mobile.png')});await page.keyboard.press('Escape');
 }
 // Intentional failed source: the subject caption and controls must survive.
 await page.route('**/assets/editorial/monet-bridge.webp',route=>route.abort());
 await page.goto('http://127.0.0.1:8000/#theme=impressionism&view=places');await page.waitForFunction(()=>document.body.dataset.ready==='true');
 await page.locator('#theme-hero .media-unavailable').waitFor();assert.match(await page.locator('#theme-reading').textContent(),/日本桥/);
 await page.locator('#theme-hero .read-plate').click();await page.locator('#image-room .media-unavailable').waitFor();assert.equal(await page.locator('#image-room [data-art-place]').isEnabled(),true);await page.screenshot({path:path.join(output,'image-failure-mobile.png')});
 assert.deepEqual(errors,[]);console.log('PASS: sixteen licensed images decode, ten source-led editions, four paintings/subject and collection locations, full image room, Escape, persistent saves, 390×844 bounds, deliberate image failure fallback. Screenshots: '+output);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});

'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
const output=process.env.SCREENSHOT_DIR||'/tmp/atlas-journeys';fs.mkdirSync(output,{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(process.env.ATLAS_URL||'http://localhost:8765',{waitUntil:'load'});await page.waitForFunction(()=>document.body.dataset.ready==='true');
assert.equal(await page.locator('.theme-card').count(),20);
const ids=['nakasendo','francigena','andes','buddhist','canal','viking','impressionism','mozart','route66','nc500'];
for(const id of ids){
 await page.locator('.theme-card[data-theme='+id+']').click();await page.waitForFunction(()=>land.length>0&&w>0);await page.locator('#theme-hero img').evaluate(img=>img.decode());
 assert.ok(await page.locator('#places .place').count());await page.locator('#tab-plans').click();assert.ok(await page.locator('.plan-card').count());
 await page.locator('[data-action=preview]').first().click();assert.ok(await page.locator('#route-panel').isVisible());
 await page.waitForFunction(()=>camera===null);await page.screenshot({path:output+'/'+id+'-desktop.png'});
 await page.locator('.route-stops button').first().click();await page.waitForFunction(()=>camera===null);assert.ok(await page.locator('#detail').isVisible());await page.locator('#detail [aria-label="关闭详情"]').click();assert.ok(await page.locator('#route-panel').isVisible());
 await page.locator('.route-save').click();const count=await page.evaluate(()=>trip.length);await page.locator('.route-save').click();assert.equal(await page.evaluate(()=>trip.length),count);
 await page.locator('.route-back').click();assert.ok(await page.locator('#plans-panel').isVisible());await page.locator('#back-themes').click();
}
for(const id of ids){await page.setViewportSize({width:390,height:844});await page.locator('.theme-card[data-theme='+id+']').click();await page.locator('#tab-plans').click();await page.locator('[data-action=preview]').first().click();await page.waitForFunction(()=>camera===null);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:output+'/'+id+'-mobile.png'});await page.locator('.route-stops button').first().click();assert.ok(await page.locator('#detail').isVisible());await page.locator('#detail [aria-label="关闭详情"]').click();await page.locator('#back-themes').click();}
await page.setViewportSize({width:1440,height:1000});await page.locator('.theme-card[data-theme=nc500]').click();await page.locator('#tab-plans').click();await page.locator('[data-action=preview]').first().click();const hash=await page.evaluate(()=>location.hash);await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');assert.equal(await page.evaluate(()=>location.hash),hash);assert.ok(await page.locator('#route-panel').isVisible());
await page.locator('.route-stops button').first().click();await page.goBack();assert.equal(await page.locator('#detail').isVisible(),false);await page.goForward();assert.equal(await page.locator('#detail').isVisible(),true);
assert.deepEqual(errors,[]);console.log('PASS: 20-card catalog, all 10 new desktop/mobile routes, artwork, detail/close, duplicate-save, Back/Forward/reload. Screenshots: '+output);
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});

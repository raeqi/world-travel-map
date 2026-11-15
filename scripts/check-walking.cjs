const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
 const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8000');await page.waitForFunction(()=>typeof flowReady!=='undefined'&&flowReady);
 for(const [theme,count,route] of [['xu',13,'xu-west-yunnan'],['kumano',6,'kumano-nakahechi'],['camino',19,'camino-frances']]){
  await page.locator(`.theme-card[data-theme=${theme}]`).click();await page.waitForFunction(()=>land.length>0);
  assert.equal(await page.locator('#count').textContent(),count+' 个地点');
  await page.locator('#tab-plans').click();assert.equal(await page.locator('.plan-card').count(),3);
  await page.locator('.plan-actions [data-action=preview]').first().click();
  assert.equal(await page.evaluate(()=>activePlan.id),route);
  await page.locator('.route-stops button').first().click();await page.waitForFunction(()=>camera===null);
  assert.equal(await page.locator('#detail').isVisible(),true);
  await page.locator('#detail [aria-label="下一站"]').click();await page.waitForFunction(()=>camera===null);
  assert.equal(await page.evaluate(()=>previewStops.indexOf(selected)),1);
  await page.reload();await page.waitForFunction(()=>typeof flowReady!=='undefined'&&flowReady&&camera===null);
  assert.equal(await page.evaluate(()=>activePlan.id),route);
  assert.equal(await page.evaluate(()=>previewStops.indexOf(selected)),1);
  await page.locator('#detail [aria-label="关闭详情"]').click();
  await page.locator('.route-save').click();const saved=await page.evaluate(()=>trip.length);await page.locator('.route-save').click();assert.equal(await page.evaluate(()=>trip.length),saved);
  await page.screenshot({path:`/tmp/wtm-${theme}-${viewport.width}.png`,fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.locator('#back-themes').click();
 }
 assert.deepEqual(errors,[]);await page.close();
}
console.log('PASS: three walking themes desktop/mobile, ordered stations, reload restoration, close, repeated save, no JS errors or horizontal overflow');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});

'use strict';
const assert=require('node:assert/strict');
const {mapViewReady}=require('./map-render-probe.cjs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:8000/#theme=culture&view=places',{waitUntil:'load'});
  await page.waitForFunction(()=>document.body.dataset.ready==='true');
  for(const size of [{width:1440,height:1000},{width:390,height:844}]){
   await page.setViewportSize(size);
   // Real sidebar clicks, including repeat and cross-country selections.
   for(const id of ['wh-1770','wh-1752','wh-1770']){
    await page.locator('#search').fill(id==='wh-1770'?'阿拉穆特':'阿尔托');
    await page.locator('.place[data-place="'+id+'"]').click();
    await page.waitForFunction(mapViewReady,false);
    const state=await page.evaluate(()=>({id:selected?.id,located:validLocation(selected),delta:validLocation(selected)?Math.abs(((lon-selected.lon+540)%360)-180)+Math.abs(lat-selected.lat):null,visible:hits.some(h=>h.p.id===selected?.id)}));
    assert.equal(state.id,id);assert.equal(state.located,true,JSON.stringify(state));assert.ok(state.delta<.01,JSON.stringify(state));assert.ok(state.visible,JSON.stringify(state));
    await page.locator('#detail [aria-label="关闭详情"]').click();
   }
  }
  // Unknown location must stay saveable and give immediate, honest feedback.
  await page.evaluate(()=>{const p=placesById.get('wh-1770');p.lon=null;p.lat=null;select(p)});
  await page.locator('.location-unavailable').waitFor({state:'visible'});
  assert.equal(await page.locator('#detail .add-trip').isEnabled(),true);
  assert.deepEqual(errors,[]);
  console.log('PASS: UNESCO sidebar clicks center the map on desktop/mobile; repeat clicks and missing-coordinate feedback');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

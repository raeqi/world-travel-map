'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const pack=require('../data/cultural-expansion/live-atlas.json');
(async()=>{
 const out='qa/cultural-atlas-browser';fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']}),errors=[],failedImages=[];
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8000/#interest=art');await page.waitForFunction(()=>document.body.dataset.ready==='true');
  assert.ok(await page.evaluate(()=>[...culturalThemeMaps.keys()].every(id=>visibleCatalogueThemes().some(t=>t.id===id)||(culturalSourceCoverage(id).length&&culturalSourceCoverage(id).every(r=>r.maps.length)))));
  const disciplines=[...new Set(pack.themes.map(t=>t.discipline))];
  for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   await page.setViewportSize(device);
   for(const discipline of disciplines){
    await page.goto('http://127.0.0.1:8000/#interest=art&discipline='+discipline);
    await page.waitForFunction(()=>document.body.dataset.ready==='true');
    const expected=await page.evaluate(d=>visibleCatalogueThemes().filter(t=>themeDisciplines(t).includes(d)).map(t=>t.id),discipline);
    const shown=await page.locator('.discovery-card').evaluateAll(cards=>cards.map(c=>c.dataset.theme));
    assert.ok(expected.every(id=>shown.includes(id)),discipline+' missing from discovery');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,'home overflow '+device.name+'/'+discipline);
    await page.locator('.discovery-browser').scrollIntoViewIfNeeded();
    await page.screenshot({path:out+'/'+device.name+'-'+discipline+'-discovery.png'});
   }
   for(const [index,theme] of pack.themes.entries()){
    await page.evaluate(id=>{enterTheme(themes.findIndex(t=>t.id===id));writeNavigation()},theme.id);
    assert.equal(await page.evaluate(()=>themes[activeTheme].id),theme.id);
    await page.locator('#theme-hero img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode().catch(()=>null)})));
    assert.ok(await page.locator('.place[data-place]').count()>=2,theme.id+' places missing');
    await page.locator('#tab-plans').click();assert.ok(await page.locator('.plan-card').count()>=1);
    await page.locator('[data-action=preview]').first().click();
    assert.ok(await page.locator('.route-stops button').count()>=2);
    await page.locator('.route-stops button').first().click();
    assert.ok((await page.locator('#detail').innerText()).length>120,theme.id+' reading too thin');
    assert.ok(await page.locator('#detail .reading-sources a').count()>0);
    await page.locator('#detail img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode().catch(()=>null)})));
    failedImages.push(...await page.locator('#theme-hero img,#detail img').evaluateAll(imgs=>imgs.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src)));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,'detail overflow '+device.name+'/'+theme.id);
    if(index%10===0||['gaudi','li-bai','giacometti','utah-land-art','mahfouz'].includes(theme.id))await page.screenshot({path:out+'/'+device.name+'-'+theme.id+'-detail.png'});
   }
  }
  for(const id of ['gaudi','beethoven','su-shi','utah-land-art']){
   await page.goto('http://127.0.0.1:8000/#theme='+id+'&view=plans');await page.waitForFunction(()=>document.body.dataset.ready==='true');
   assert.equal(await page.evaluate(()=>themes[activeTheme].id),id);assert.ok(await page.locator('.plan-card').count()>=1);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failedImages,[]);
  fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,themes:pack.themes.length,disciplines,viewports:['1440x1000','390x844'],errors,failedImages},null,2));
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

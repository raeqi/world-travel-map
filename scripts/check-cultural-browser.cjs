'use strict';
const {chromium}=require('playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const output='qa/cultural-browser';fs.mkdirSync(output,{recursive:true});
 const browser=await chromium.launch({headless:true});const errors=[];let page;
 try{
  page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const [device,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
   await page.setViewportSize({width,height});

   const added=require('../data/cultural-expansion/live-atlas.json').themes;
   const shown=async()=>(await page.locator('.discovery-card').evaluateAll(cards=>cards.map(x=>x.dataset.theme))).sort();
   await page.goto('http://127.0.0.1:8000/#interest=art&discipline=music');
   await page.waitForFunction(()=>document.body.dataset.ready==='true');
   assert.equal(await page.locator('#catalog-discipline').inputValue(),'music');
   const music=await page.evaluate(()=>visibleCatalogueThemes().filter(t=>themeDisciplines(t).includes('music')).map(t=>t.id).sort());
   const paintingAsia=await page.evaluate(()=>visibleCatalogueThemes().filter(t=>themeDisciplines(t).includes('painting')&&discoveryMeta[t.id][1].includes('亚洲')).map(t=>t.id).sort());
   assert.deepEqual(await shown(),music);
   await page.locator('#catalog-discipline').selectOption('painting');
   await page.locator('#catalog-area').selectOption('亚洲');
   assert.deepEqual(await shown(),paintingAsia);
   await page.reload();
   await page.waitForFunction(()=>document.body.dataset.ready==='true');
   assert.equal(await page.locator('#catalog-discipline').inputValue(),'painting');
   assert.deepEqual(await shown(),paintingAsia);
   await page.screenshot({path:`${output}/cultural-discovery-${device}.png`});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,`discovery/${device} horizontal overflow`);
   await page.locator('[data-interest="paths"]').click();
   assert.equal(await page.locator('#cultural-discipline-filter').isVisible(),false);
   for(const theme of ['hokusai','vermeer','bach','austen']){
    await page.goto('http://127.0.0.1:8000/#theme='+theme+'&view=places');
    await page.waitForFunction(()=>document.body.dataset.ready==='true');
    await page.locator('#theme-hero img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
    assert.equal(await page.evaluate(()=>themes[activeTheme].id),theme);
    await page.screenshot({path:`${output}/${theme}-${device}-theme.png`});
    await page.locator('#tab-plans').click();
    assert.ok(await page.locator('.plan-card').count()>0);
    await page.locator('[data-action=preview]').first().click();
    await page.locator('.route-stops button').first().click();
    await page.waitForFunction(()=>camera===null);
    await page.locator('#detail img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode()})));
    assert.ok((await page.locator('#detail').innerText()).length>180);
    await page.screenshot({path:`${output}/${theme}-${device}-detail.png`});
    if(['hokusai','vermeer'].includes(theme)){
     await page.locator('#detail [data-read-image]').first().click();
     await page.locator('#image-room img').evaluate(img=>img.decode());
     assert.ok(await page.locator('#image-room .room-credit a').count()>=2);
     await page.screenshot({path:`${output}/${theme}-${device}-painting.png`});
     await page.locator('#image-room [data-art-museum]').first().click();
     await page.waitForFunction(()=>camera===null);
     assert.ok((await page.locator('#detail').innerText()).includes('现藏'));
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,`${theme}/${device} horizontal overflow`);
   }
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(output+'/result.json',JSON.stringify({passed:true,viewports:['1440x1000','390x844'],themes:['hokusai','vermeer','bach','austen'],errors},null,2));
 }catch(e){if(page)await page.screenshot({path:output+'/failure.png'}).catch(()=>{});throw e}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});

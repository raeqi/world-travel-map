'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8000/',out='qa/media-presentation';
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage(),errors=[],axeResults=[];page.on('pageerror',e=>errors.push(e.message));
 const theme=async id=>{await page.evaluate(id=>{enterTheme(themes.findIndex(t=>t.id===id));writeNavigation()},id)};
 const overflow=async id=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' horizontal overflow');
 const axe=async selector=>{const results=await page.evaluate(async selector=>(await window.axe.run({include:[selector]},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),selector);axeResults.push({selector,violations:results});assert.deepEqual(results,[],JSON.stringify(results))};
 try{
  await page.goto(base+'#theme=vangogh&view=places');await page.waitForFunction(()=>document.body.dataset.ready==='true');
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const ids=await page.evaluate(()=>themes.map(t=>t.id));
  for(const id of ids){await theme(id);const result=await page.evaluate(()=>{const hero=document.querySelector('#theme-hero'),keys=editionCoverKeys(themes[activeTheme].id);return {keys,buttons:[...hero.querySelectorAll('[data-read-image]')].map(b=>b.dataset.readImage),credits:[...document.querySelectorAll('#theme-reading [data-credit-key]')].map(e=>e.dataset.creditKey),nested:hero.querySelectorAll('button button').length,images:[...hero.querySelectorAll('img')].every(i=>!!i.closest('button[data-read-image]'))}});assert.deepEqual([...new Set(result.buttons)].sort(),result.keys.slice().sort(),id);assert.deepEqual(result.credits.sort(),result.keys.slice().sort(),id);assert.equal(result.nested,0);assert.equal(result.images,true)}
  for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   await page.setViewportSize(device);
   for(const id of ['vangogh','impressionism','nakasendo','viking','mozart','parks','xu','collection-modern-architecture']){
    await theme(id);const button=page.locator('#theme-hero [data-read-image]').first();await button.scrollIntoViewIfNeeded();
    await page.locator('#theme-hero img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode()})));
    const layout=await button.evaluate(b=>{const c=getComputedStyle(b),r=b.getBoundingClientRect();return {position:c.position,bg:c.backgroundColor,width:r.width,height:r.height,label:b.getAttribute('aria-label'),popup:b.getAttribute('aria-haspopup')}});
    assert.equal(layout.position,'relative');assert.ok(layout.width>40&&layout.height>40);assert.ok(layout.label.includes('查看完整图像'));assert.equal(layout.popup,'dialog');
    if(id==='vangogh'){assert.equal(await button.innerText(),'');assert.ok(await button.evaluate(b=>Math.abs(b.getBoundingClientRect().width-document.querySelector('#theme-hero').getBoundingClientRect().width)<2));}
    if(id==='vangogh'){await button.locator('img').click({position:{x:8,y:8}});await page.locator('#image-room').waitFor({state:'visible'});await page.keyboard.press('Escape');}
    await overflow(id);await axe('#theme-hero');await axe('#theme-reading');
    await page.screenshot({path:out+'/'+device.name+'-'+id+'.png'});
    const key=await button.getAttribute('data-read-image');await button.focus();await page.keyboard.press('Enter');await page.locator('#image-room').waitFor({state:'visible'});
    assert.equal(await page.locator('#image-room img').getAttribute('src'),await page.evaluate(key=>photoPath(key),key));
    const expected=await page.evaluate(key=>photoLibrary[key],key);assert.ok((await page.locator('#image-room .room-credit').innerText()).includes(expected.author));assert.ok((await page.locator('#image-room .room-credit').innerText()).includes(expected.license));
    await axe('#image-room');await page.keyboard.press('Escape');await page.locator('#image-room').waitFor({state:'hidden'});assert.equal(await button.evaluate(b=>document.activeElement===b),true);
    await page.keyboard.press('Space');await page.locator('#image-room').waitFor({state:'visible'});await page.locator('#image-room .room-close').click();await page.locator('#image-room').waitFor({state:'hidden'});assert.equal(await button.evaluate(b=>document.activeElement===b),true);
    const summary=page.locator('#theme-reading .media-source summary');await summary.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#theme-reading .media-source').getAttribute('open'),'');
    for(const creditKey of await page.evaluate(()=>editionCoverKeys(themes[activeTheme].id))){const m=await page.evaluate(k=>photoLibrary[k],creditKey),links=page.locator('#theme-reading [data-source-key="'+creditKey+'"] a');assert.equal(await links.nth(0).getAttribute('href'),m.source);assert.equal(await links.nth(1).getAttribute('href'),m.licenseUrl);}
    await overflow(id+' credits');if(id==='vangogh')await page.screenshot({path:out+'/'+device.name+'-vangogh-sources.png'});
    await summary.click();
    const secondary=page.locator('#theme-hero .secondary-image-open');if(await secondary.count()){const sk=await secondary.first().getAttribute('data-read-image');await secondary.first().click();assert.equal(await page.locator('#image-room img').getAttribute('src'),await page.evaluate(k=>photoPath(k),sk));await page.keyboard.press('Escape');}
   }
   // A place photograph uses the same full-image control and local credit caption.
   await theme('parks');await page.evaluate(()=>select(placesById.get('np-yell')));const detailButton=page.locator('#detail .place-photo .media-open');assert.equal(await detailButton.count(),1);await detailButton.click();await page.locator('#image-room').waitFor({state:'visible'});await page.keyboard.press('Escape');assert.equal(await detailButton.evaluate(b=>document.activeElement===b),true);await axe('#detail .place-photo');await overflow(device.name+' place photo');await page.locator('#detail .reading-close').click();
  }
  await page.locator('#back-themes').click();await page.locator('#site-footer .credits-button').click();await page.locator('#credits').waitFor({state:'visible'});assert.equal(await page.locator('#credit-list figure').count(),await page.evaluate(()=>Object.keys(photoLibrary).length));await page.locator('#close-credits').click();
  assert.deepEqual(errors,[]);fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,themes:ids.length,viewports:['1440x1000','390x844'],keyboard:['Enter','Space','Escape','focus return'],axe:axeResults,errors},null,2));
 }catch(e){await page.screenshot({path:out+'/failure.png'}).catch(()=>{});throw e}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

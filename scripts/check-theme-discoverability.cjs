'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const audit=require('../qa/theme-review/preservation.json');
const base=process.env.BASE_URL||'http://127.0.0.1:8000/',out='qa/theme-review/browser';
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage(),errors=[],failedImages=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 const open=async hash=>{await page.goto(base+hash);await page.waitForFunction(()=>document.body.dataset.ready==='true')};
 const images=async()=>{await page.locator('#theme-hero img,#detail img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>null)})));failedImages.push(...await page.locator('#theme-hero img,#detail img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)))};
 try{
  const restored=audit.themes.filter(t=>t.hiddenBefore&&!t.hiddenAfter);
  const missing=restored.flatMap(t=>{const coverage=audit.contextCoverage.find(c=>c.id===t.id);return coverage.points.filter(p=>!p.maps.length).map(p=>({theme:t,point:t.points.find(x=>x.id===p.id)}))});
  for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   await page.setViewportSize(device);
   for(const {theme,point}of missing){
    await open('#interest=art');await page.locator('#catalog-search').fill(point.name);
    const card=page.locator('#catalog-results [data-theme="'+theme.id+'"]');assert.equal(await card.count(),1,point.name+' catalogue search');await card.click();
    await page.locator('#search').fill(point.name);assert.ok(await page.locator('#places [data-place="'+point.id+'"]').count(),point.name+' map list');await page.locator('#places [data-place="'+point.id+'"]').click();
    assert.equal(await page.evaluate(()=>selected?.id),point.id);assert.ok((await page.locator('#detail').innerText()).length>100);assert.ok(await page.locator('#detail .reading-sources a').count());await images();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
    await page.waitForFunction(()=>camera===null);assert.ok(await page.evaluate(()=>project(selected.lon,selected.lat)[2]>.9),'selected map location');
    if(['atlas-enoura','atlas-picasso-paris','atlas-detroit'].includes(point.id))await page.screenshot({path:out+'/'+device.name+'-'+point.id+'.png'});
    await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');assert.equal(await page.evaluate(()=>selected?.id),point.id);
    await open('#area='+encodeURIComponent(point.country==='美国'?'美洲':point.country==='日本'||point.country==='中国'?'亚洲':'欧洲'));
    assert.ok(await page.locator('#catalog-results [data-theme="'+theme.id+'"]').count(),point.name+' region browse');
    checks.push({device:device.name,theme:theme.id,place:point.id,search:true,region:true,detail:true,map:true,refresh:true});
   }
   for(const t of audit.themes.filter(t=>t.hiddenBefore)){
    for(const plan of t.plans){await open(plan.legacyHash);assert.equal(await page.evaluate(()=>activePlan?.id),plan.id);assert.deepEqual(await page.evaluate(()=>previewStops.map(p=>p.id)),plan.ids);await page.locator('.route-stops button').first().click();assert.equal(await page.evaluate(()=>selected.id),plan.ids[0]);await page.locator('#detail [aria-label="下一站"]').click();assert.equal(await page.evaluate(()=>selected.id),plan.ids[1]);await page.locator('#detail [aria-label="上一站"]').click();assert.equal(await page.evaluate(()=>selected.id),plan.ids[0]);}
    for(const p of t.points){await open(p.legacyHash);assert.equal(await page.evaluate(()=>selected?.id),p.id);assert.equal(await page.evaluate(()=>themes[activeTheme].id),t.id);assert.ok(await page.locator('#detail .reading-sources a').count());await images();}
   }
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failedImages,[]);
  fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,baseline:audit.baseline,viewports:['1440x1000','390x844'],restoredThemes:restored.length,recoveredPoints:missing.length,legacyThemes:audit.themes.filter(t=>t.hiddenBefore).length,checks,errors,failedImages},null,2));console.log('PASS discovery recovery on desktop/mobile: '+restored.length+' themes, '+missing.length+' uncovered points, all 33 hidden source themes and their original plan/place URLs.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

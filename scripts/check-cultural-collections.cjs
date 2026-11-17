'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:8000/',out='qa/cultural-collections-browser';
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage(),errors=[],failedImages=[],accessibility=[];page.on('pageerror',e=>errors.push(e.message));
 const open=async hash=>{await page.goto(base+hash);await page.waitForFunction(()=>document.body.dataset.ready==='true')};
 const noOverflow=async label=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),label+' overflow');
 const checkFrame=async()=>{await page.waitForFunction(()=>camera===null&&Math.abs(zoom-targetZoom)<.01);const f=await page.evaluate(()=>({w,h,points:filtered().map(p=>{const q=project(p.lon,p.lat),s=screen(q);return {z:q[2],x:s[0],y:s[1]}})}));assert.ok(f.points.length&&f.points.every(p=>p.z>0&&p.x>0&&p.x<f.w&&p.y>0&&p.y<f.h),JSON.stringify(f));assert.equal(await page.evaluate(()=>previewStops),null)};
 try{
  await open('#interest=art');const ids=await page.evaluate(()=>[...culturalCollections.keys()]);assert.equal(ids.length,18);
  assert.equal(await page.locator('.discovery-card[data-theme^="collection-"]').count(),18);
  for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   await page.setViewportSize(device);
   for(const id of ids){
    await open('#theme='+id+'&view=places');
    const metadata=await page.evaluate(()=>{const c=culturalCollections.get(themes[activeTheme].id),members=collectionMembers(c);return {members:members.map(m=>m.id),filter:collectionHasFilters(c),countries:[...new Set(members.flatMap(collectionMemberPlaces).map(collectionCountryName))]}});
    assert.equal(await page.locator('.collection-member').count(),metadata.members.length);assert.equal(await page.locator('#theme-hero').isVisible(),false);assert.equal(await page.locator('#theme-reading').isVisible(),false);
    assert.equal(await page.locator('#tab-plans').isVisible(),false);assert.equal(await page.evaluate(()=>buildPlans(themes[activeTheme].id,0).length),0);assert.equal(await page.evaluate(()=>previewStops),null);
    assert.ok(!/未因合并|首批精选|按地区与人物找子线|无总路线/.test(await page.locator('#sidebar').innerText()));
    assert.equal(await page.locator('.collection-find').count(),metadata.filter?1:0);
    if(metadata.filter){assert.equal(await page.locator('.collection-find').getAttribute('open'),null);assert.equal(await page.locator('#collection-person').isVisible(),false)}else assert.equal(await page.locator('#collection-person,#collection-region').count(),0);
    assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.collection-person-image')].every(el=>{const row=el.closest('.collection-member'),member=collectionMembers(culturalCollections.get(themes[activeTheme].id)).find(m=>m.id===row.dataset.member),place=collectionMemberPlaces(member).find(p=>p.id===el.dataset.imagePlace),key=el.querySelector('[data-read-image]').dataset.readImage;return place&&key==='atlas-'+atlasContextByPlace.get(place.id).contexts.get(member.id).key})));
    await page.locator('.collection-person-image img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode()})));
    failedImages.push(...await page.locator('.collection-person-image img').evaluateAll(imgs=>imgs.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src)));
    if(['collection-chinese-painting','collection-modern-chinese-literature'].includes(id)){
     const first=await page.locator('.collection-member h3').first().boundingBox();assert.ok(first.y>=0&&first.y+first.height<device.height,id+' people buried below opening screen');
     await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const violations=await page.evaluate(async()=>(await axe.run({include:['#cultural-collection-directory']},{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));accessibility.push({id,device:device.name,violations});assert.deepEqual(violations,[]);
    }
    await noOverflow(id);await page.screenshot({path:out+'/'+device.name+'-'+id+'.png'});
    if(metadata.filter){
     await page.locator('.collection-find summary').click();await page.locator('#collection-person').selectOption(metadata.members[0]);assert.equal(await page.locator('.collection-member').count(),1);
     await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');assert.equal(await page.locator('#collection-person').inputValue(),metadata.members[0]);assert.equal(await page.locator('.collection-member').count(),1);
     if(await page.locator('#collection-region').count()){const country=await page.evaluate(()=>collectionCountryName(filtered()[0]));await page.locator('#collection-region').selectOption(country);assert.ok(await page.evaluate(c=>filtered().every(p=>collectionRegionMatches(p,c)),country));}
     await page.locator('[data-clear-collection]').click();assert.equal(await page.locator('.collection-member').count(),metadata.members.length);
    }else{
     await open('#theme='+id+'&view=places&person='+metadata.members[0]);assert.equal(await page.locator('.collection-member').count(),1);assert.equal(await page.locator('#collection-person').count(),0);await page.locator('[data-clear-collection]').click();assert.equal(await page.locator('.collection-member').count(),metadata.members.length);
    }
    await page.locator('#tab-places').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#tab-trip').evaluate(el=>document.activeElement===el),true);assert.equal(await page.locator('#cultural-collection-directory').isVisible(),false);await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#tab-places').evaluate(el=>document.activeElement===el),true);assert.equal(await page.locator('#cultural-collection-directory').isVisible(),true);
    const photo=page.locator('.collection-person-image [data-read-image]').first();if(await photo.count()){const key=await photo.getAttribute('data-read-image');await photo.click();assert.equal(await page.locator('#image-room img').getAttribute('src'),await page.evaluate(k=>photoPath(k),key));await page.keyboard.press('Escape');}
    await page.locator('[data-collection-place]').first().click();assert.ok((await page.locator('#detail').innerText()).length>100);await page.locator('#detail .reading-close').click();
    const link=page.locator('.collection-person-map').first(),target=await link.getAttribute('data-collection-theme');await link.click();assert.equal(await page.evaluate(()=>themes[activeTheme].id),target);assert.ok(await page.locator('.plan-card').count()>0);await page.locator('[data-action=preview]').first().click();assert.ok(await page.locator('.route-stops button').count()>=2);await page.goBack();await page.goBack();assert.equal(await page.evaluate(()=>themes[activeTheme].id),id);
   }
   await open('#theme=collection-modern-chinese-literature&view=plans&person=xiao-hong');assert.equal(await page.locator('#discover-panel').isVisible(),true);await checkFrame();await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');await checkFrame();
   await open('#theme=collection-modern-architecture&view=places');await page.locator('.collection-find summary').click();await page.locator('#collection-region').selectOption('日本');await checkFrame();
   await open('#theme=collection-setouchi-art&view=places');assert.ok(await page.evaluate(()=>filtered().every(p=>p.country==='日本'&&p.lon>133&&p.lon<135&&p.lat>34&&p.lat<35)));
   await page.locator('#back-themes').click();assert.equal(await page.locator('#cultural-collection-directory').count(),0);await page.locator('#catalog-search').fill('萧红');assert.ok(await page.locator('[data-theme="collection-modern-chinese-literature"]').count());await page.locator('[data-catalog-view="routes"]').click();assert.ok(await page.locator('[data-plan-theme="xiao-hong"]').count());
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failedImages,[]);fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,collections:18,retainedPersonThemes:76,viewports:['1440x1000','390x844'],accessibility,errors,failedImages},null,2));
 }catch(e){await page.screenshot({path:out+'/failure.png'}).catch(()=>{});throw e}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

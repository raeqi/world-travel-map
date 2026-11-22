'use strict';
// Public vector renderer only: no credentials, raster service or deployment.
const fs=require('node:fs'),assert=require('node:assert/strict'),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {probeRouteFrame,routeFrameReady,probePointSourceData}=require('./map-render-probe.cjs');
const base=process.env.BASE_URL||'http://127.0.0.1:8000/',out='qa-artifacts/valencia',reports=[];
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true,args:process.env.VALENCIA_RENDERER==='swiftshader'?['--use-gl=angle','--use-angle=swiftshader']:['--no-sandbox']});let stage='launch',page;const errors=[];
 async function frame(label){
  stage=label;let failure=null;try{await page.waitForFunction(routeFrameReady,true,{timeout:30000})}catch(error){failure=error.message}
  const view=await page.evaluate(probeRouteFrame),source=await page.evaluate(probePointSourceData),report={stage:label,view,source,failure};reports.push(report);fs.writeFileSync(out+'/frames.json',JSON.stringify(reports,null,2));
  if(failure){await page.screenshot({path:out+'/failure.png'});throw Error(label+': '+failure)}
  assert.ok(view.native&&view.base>0,label+' actual vector base required');assert.ok(source.unchanged,label+' source sample must be stable');
  assert.ok(view.points.every(p=>p.rendered&&p.x>0&&p.x<view.w&&p.y>0&&p.y<view.h),label+' every point must actually render');console.log('PASS '+label+'; '+view.points.length+' actual points');
 }
 async function open(hash){await page.goto(base+hash);await page.waitForFunction(()=>document.body.dataset.ready==='true')}
 async function replay(theme,iteration){
  await open('#theme='+theme+'&view=places');if(theme==='barcelona-art')await frame(iteration+' initial');
  const plans=await page.evaluate(theme=>buildPlans(theme,0).map(p=>p.id),theme);
  for(const plan of plans){
   await open('#theme='+theme+'&view=plans&route='+plan);await frame(iteration+' '+plan);
   await page.locator('.route-stops button').first().click();if(!await page.locator('#detail .add-trip').isDisabled())await page.locator('#detail .add-trip').click();
   if(await page.locator('.route-stops button').count()>1)await page.locator('#detail [aria-label="下一站"]').click();
   await page.locator('#detail .reading-close').click();await page.locator('.route-overview').click();await frame(iteration+' '+plan+' overview');
   await page.reload();await page.waitForFunction(()=>document.body.dataset.ready==='true');await page.locator('.route-back').click();
  }
  await open('#theme='+theme+'&view=places');if(theme==='barcelona-art'){await frame(iteration+' full catalogue');await page.screenshot({path:out+'/'+iteration+'-overview.png'})}
 }
 try{
  for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
   const context=await browser.newContext({viewport}),p=await context.newPage();page=p;page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>{window.TERRA_RASTER_CONFIG={provider:'maptiler',apiKey:''}});
   for(let round=1;round<=3;round++){const id=viewport.width+'-'+round;await replay('modern-architecture',id+' architecture');await replay('barcelona-art',id+' barcelona')}
   await context.close();
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(out+'/result.json',JSON.stringify({passed:true,renderer:process.env.VALENCIA_RENDERER||'default',reports:reports.length,viewports:[1440,390],roundsPerViewport:3,errors},null,2));
 }catch(error){if(page&&!page.isClosed())await page.screenshot({path:out+'/failure.png'}).catch(()=>{});fs.writeFileSync(out+'/result.json',JSON.stringify({passed:false,stage,error:error.message,reports:reports.length,errors},null,2));throw error}finally{await browser.close()}
})().catch(error=>{console.error(error.message);process.exitCode=1});

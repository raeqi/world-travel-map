'use strict';
// Real Chromium HTTP-cache regression plus optional direct public-site checks.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),{chromium}=require('playwright');
const {buildSite}=require('./build-site.cjs'),root=path.resolve(__dirname,'..'),out=path.join(root,'qa/startup');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'};
(async()=>{
 fs.mkdirSync(out,{recursive:true});const built=buildSite(path.join(out,'site')),legacy=fs.readFileSync(path.join(root,'tests/fixtures/legacy-app-377a6a9.js'));
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const results=[];let published=false,legacyRequests=0;
 const server=http.createServer((req,res)=>{
  const name=new URL(req.url,'http://test').pathname.slice(1)||'index.html';
  if(name==='prime.html'){res.setHeader('Content-Type',types['.html']);return res.end('<!doctype html><canvas id="globe"></canvas><script src="app.js"></script>')}
  if(name==='app.js'){legacyRequests++;res.setHeader('Cache-Control','public,max-age=3600,immutable');res.setHeader('Content-Type',types['.js']);return res.end(legacy)}
  const file=path.resolve(name==='index.html'&&!published?root:built.output,name);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
  fs.readFile(file,(error,bytes)=>{if(error){res.writeHead(404);return res.end()}res.setHeader('Cache-Control',name==='index.html'?'no-store':'public,max-age=3600,immutable');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(bytes)});
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port+'/';
 const ready=page=>page.waitForFunction(()=>document.body.dataset.ready==='true',{timeout:20000});
 async function exercise(page,url,label){
  const errors=[];const listener=e=>errors.push(e.message);page.on('pageerror',listener);
  await page.goto(url);await ready(page);assert.ok(await page.locator('#places .place').count()>=2);assert.ok(await page.locator('#globe').isVisible());
  await page.locator('#tab-plans').click();assert.ok(await page.locator('.plan-card').count());await page.locator('[data-action=preview]').first().click();await page.locator('.route-stops button').first().click();assert.ok(await page.locator('#detail').isVisible());
  await page.screenshot({path:path.join(out,label+'.png')});await page.locator('#detail .reading-close').click();await page.locator('#back-themes').click();
  await page.locator('.theme-card[data-theme="fuji-tokaido"]').click();assert.equal(await page.evaluate(()=>document.body.dataset.theme),'fuji-tokaido');
  await page.reload();await ready(page);assert.deepEqual(errors,[],label);page.off('pageerror',listener);
 }
 try{
  if(!process.env.LIVE_ONLY)for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   published=false;legacyRequests=0;const context=await browser.newContext({viewport:device}),page=await context.newPage();
   await page.goto(base+'prime.html');await page.waitForLoadState('load');assert.equal(legacyRequests,1);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'#theme=fuji-tokaido');await page.waitForLoadState('load');
   assert.ok(errors.some(e=>e.includes('culturalCollectionPlaceMatches')),JSON.stringify(errors));assert.equal(await page.locator('.catalog-loading').count(),1);assert.equal(await page.evaluate(()=>document.body.dataset.ready||''),'');assert.equal(legacyRequests,1,'old app is really served from browser HTTP cache');
   await page.screenshot({path:path.join(out,device.name+'-reproduced-old-cache.png')});published=true;
   await exercise(page,base+'?updated=1#theme=fuji-tokaido',device.name+'-old-cache-recovered');assert.equal(legacyRequests,1,'new release never requests the stale mutable app.js');
   await context.close();
   const clean=await browser.newContext({viewport:device}),cleanPage=await clean.newPage();await exercise(cleanPage,base+'#theme=fuji-tokaido',device.name+'-clean');
   // A missing startup dependency must recover once and then show a real retry UI.
   await cleanPage.route('**/catalog.*.js',route=>route.abort());await cleanPage.goto(base+'#theme=fuji-tokaido');await cleanPage.locator('.startup-error').waitFor({state:'visible'});assert.ok(new URL(cleanPage.url()).searchParams.has('_fresh'));
   await cleanPage.unroute('**/catalog.*.js');await cleanPage.locator('.startup-error button').click();await ready(cleanPage);assert.equal(await cleanPage.evaluate(()=>document.body.dataset.theme),'fuji-tokaido');
   await clean.close();results.push({device:device.name,oldHttpCacheReproduced:true,oldCacheRecovered:true,clean:true,missingScriptRecovered:true});
  }
  if(process.env.SITE_URL)for(const device of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}]){
   const context=await browser.newContext({viewport:device}),page=await context.newPage(),site=process.env.SITE_URL.replace(/\/$/,'')+'/';
   await page.goto(site);await ready(page);assert.ok(await page.locator('.theme-card').count()>50);assert.ok(await page.locator('meta[name=terra-release]').count(),'public HTML uses immutable assets');
   await page.locator('.theme-card[data-theme="fuji-tokaido"]').click();assert.equal(await page.evaluate(()=>document.body.dataset.theme),'fuji-tokaido');
   await exercise(page,site+'#theme=fuji-tokaido',device.name+'-LIVE-direct');
   await page.goto(site);await ready(page);await page.screenshot({path:path.join(out,device.name+'-LIVE-home.png')});
   const scripts=await page.locator('script[src]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('src')));assert.ok(scripts.length&&scripts.every(src=>/\.[a-f0-9]{16}\.js$/.test(src)));
   results.push({device:device.name,liveSite:site,liveHome:true,liveDirect:true,liveHomeEntrance:true,warmReload:true,scripts});await context.close();
  }
  fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({passed:true,results},null,2));console.log('PASS startup:',JSON.stringify(results.map(({scripts,...r})=>r)));
 }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);process.exitCode=1});

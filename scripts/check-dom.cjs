'use strict';
// DOM/state regression only. Canvas, layout, image decoding and native dialogs are NOT verified here.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM,VirtualConsole}=require(process.env.JSDOM_MODULE||'jsdom');const root=path.resolve(__dirname,'..');
(async()=>{const errors=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script defer src="([^"]+)"><\/script>/g,(_,file)=>'<script>'+fs.readFileSync(path.join(root,file),'utf8')+'</script>');
const dom=new JSDOM(html,{url:'http://atlas.test/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
 w.fetch=async()=>({json:async()=>JSON.parse(fs.readFileSync(path.join(root,'countries.geo.json'),'utf8'))});
 const ctx=new Proxy({measureText:t=>({width:t.length*7})},{get:(t,p)=>p in t?t[p]:(()=>{}),set:(t,p,v)=>(t[p]=v,true)});
 w.HTMLCanvasElement.prototype.getContext=()=>ctx;w.Path2D=class{};w.ResizeObserver=class{observe(){}};w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
 }});
await new Promise(resolve=>dom.window.addEventListener('load',resolve,{once:true}));const w=dom.window,d=w.document,$=s=>{const e=d.querySelector(s);assert.ok(e,'Missing '+s);return e},click=s=>$(s).click(),state=s=>w.eval(s);
assert.equal(d.body.dataset.ready,'true');assert.equal(d.querySelectorAll('.theme-card').length,state('visibleCatalogueThemes().length'));
$('#catalog-search').value='梵高';$('#catalog-search').dispatchEvent(new w.Event('input'));assert.ok(d.querySelector('.theme-card[data-theme=vangogh]'));click('.theme-card[data-theme=vangogh]');click('#back-themes');assert.equal($('#catalog-search').value,'梵高');click('[data-catalog-view="routes"]');assert.equal(d.querySelectorAll('.catalog-itinerary').length,state('matchingDiscoveryRoutes().length'));assert.ok(state("matchingDiscoveryRoutes().some(x=>x.plan.id==='vangogh-provence')"));click('[data-home-plan]');assert.ok(state('activePlan'));click('#back-themes');$('#catalog-search').value='';$('#catalog-search').dispatchEvent(new w.Event('input'));click('[data-catalog-view="themes"]');
for(const id of ['nakasendo' ,'francigena','andes','buddhist','canal','viking','impressionism','european-music-cities','route66','nc500','vangogh']){
 $('#catalog-search').value=state("themes.find(t=>t.id==='"+id+"').name");$('#catalog-search').dispatchEvent(new w.Event('input'));click('.theme-card[data-theme='+id+']');assert.equal(d.body.dataset.view,'map');assert.ok(d.querySelector('#theme-hero .edition-cover'));click('#theme-hero .read-plate');assert.equal($('#image-room').open,true);assert.ok($('#image-room .room-credit').textContent.length);click('.room-close');assert.equal($('#image-room').open,false);
 click('#tab-plans');assert.ok(d.querySelectorAll('.plan-card').length);click('[data-action=preview]');assert.equal($('#route-panel').hidden,false);const routeId=state('activePlan.id');
 click('.route-stops button');assert.ok(state('selected'));assert.equal(state('activePlan.id'),routeId);assert.equal($('#detail').hidden,false);click('#detail [aria-label="下一站"]');assert.equal(state('previewStops.indexOf(selected)'),1);click('#detail [aria-label="关闭详情"]');assert.equal($('#detail').hidden,true);
 click('.route-save');const count=state('trip.length');click('.route-save');assert.equal(state('trip.length'),count);assert.equal(JSON.parse(w.localStorage.getItem('atlas-trip-v2')).length,count);click('.route-back');assert.equal($('#plans-panel').hidden,false);click('#back-themes');
}
$('#catalog-search').value='';$('#catalog-search').dispatchEvent(new w.Event('input'));click('.theme-card[data-theme=impressionism]');assert.equal(d.querySelectorAll('.artwork-card').length,8);
const works=state('impressionistWorks.map(w=>({key:w.key,placeId:w.placeId,museumId:w.museumId}))');
for(const work of works){click('[data-read-image="'+work.key+'"]');click('#image-room [data-art-place="'+work.key+'"]');assert.equal(state('selected.id'),work.placeId);assert.equal($('#image-room').open,false);click('#detail [aria-label="关闭详情"]');click('[data-art-museum="'+work.key+'"]');assert.equal(state('selected.id'),work.museumId);assert.match($('#detail').textContent,/现藏/);click('#detail [aria-label="关闭详情"]');}
click('#theme-hero .read-plate');const img=$('#image-room img');img.dispatchEvent(new w.Event('error'));assert.equal(img.hidden,true);assert.match($('#image-room .media-unavailable').textContent,/图像暂不可用/);assert.ok($('#image-room [data-art-place]'));click('.room-close');
assert.equal(new URLSearchParams(w.location.hash.slice(1)).get('theme'),'impressionism');
for(const row of require('./content-quality-packs.cjs').combinedPack().readings.filter(r=>r.catalogueDescription)){state("enterTheme(themes.findIndex(t=>t.id==='"+row.theme+"'));select(placesById.get('"+row.id+"'))");const body=$('#detail .reading-body').textContent;for(const wrong of ['924 500平方公里','占世界数量百分之十','位于默哈拉杰'])assert.ok(!body.includes(wrong),row.id+' still displays known old translation error');assert.equal(state('researchedPlaceDescription(selected)'),row.catalogueDescription);click('#detail [aria-label="关闭详情"]');}
assert.deepEqual(errors,[]);dom.window.close();
console.log('PASS DOM/state only: all registered themes, eleven edition/route/detail/next/back flows, duplicate saves and localStorage, eight Impressionist subject/museum pairs, full-image content and failed-image fallback. Browser rendering remains unverified.');
})().catch(e=>{console.error(e);process.exit(1)});

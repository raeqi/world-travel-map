'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function app(hash=''){
 const location={hash,pathname:'/'},history={replaceState(_state,_title,url){location.hash=url.startsWith('#')?url:''}};
 const context=vm.createContext({document:{addEventListener(){}},location,history,URLSearchParams,assert});
 for(const file of ['catalog.js','tea.js','historical.js','walking.js','journeys.js','media.js','themes.js','planner.js','journey-plans.js','map-style.js','journey-design.js','editorial.js','art-media.js','art-context.js','route-media.js','discovery.js','hero-carousel.js','reading.js','cultural-routes.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
 return context;
}
test('cultural discovery combines discipline, place, and keyword without mixing music into painting',()=>{
 const c=app();vm.runInContext(`
  homeState.interest='art';homeState.discipline='painting';homeState.area='亚洲';
  assert.deepEqual(matchingDiscovery().map(x=>x.theme.id),['hokusai']);
  homeState.area='all';homeState.query='维米尔';
  assert.deepEqual(matchingDiscovery().map(x=>x.theme.id),['vermeer']);
  homeState.query='';homeState.discipline='music';
  assert.deepEqual(matchingDiscovery().map(x=>x.theme.id).sort(),['bach','mozart']);
  homeState.discipline='literature';homeState.area='欧洲';
  assert.ok(matchingDiscovery().some(x=>x.theme.id==='austen'));
  assert.ok(matchingDiscovery().every(x=>themeDisciplines(x.theme).includes('literature')));
  assert.deepEqual(availableCulturalDisciplines().map(([id])=>id),['painting','music','literature']);
 `,c);
});
test('discipline is restored from shared URLs and ignored outside art discovery',()=>{
 const c=app('#interest=art&discipline=music&area=欧洲&show=routes');
 vm.runInContext(`
  assert.equal(homeState.discipline,'music');assert.equal(homeState.view,'routes');
  assert.ok(matchingDiscovery().every(x=>themeDisciplines(x.theme).includes('music')));
  writeHomeNavigation();assert.equal(new URLSearchParams(location.hash.slice(1)).get('discipline'),'music');
  location.hash='#interest=paths&discipline=painting';readHomeState();
  assert.equal(homeState.discipline,'all');assert.ok(matchingDiscovery().every(x=>x.group==='paths'));
  location.hash='#interest=art&discipline=unknown';readHomeState();assert.equal(homeState.discipline,'all');
 `,c);
});
test('planning catalogue does not register unfinished themes or unverified coordinates',()=>{
 const pack=require('../data/cultural-expansion/catalogue.json'),c=app();
 assert.equal(pack.entries.length,76);assert.equal(new Set(pack.entries.map(e=>e.id)).size,76);
 assert.equal(pack.scope.discussionTotal,80);
 assert.equal(pack.existingBatch.status,'merged');
 for(const e of pack.entries){
  assert.ok(e.sources.length,e.id);assert.ok(e.candidatePlaces.length,e.id);
  assert.ok(e.sources.every(s=>s.url.startsWith('https://')),e.id);
  assert.ok(e.candidatePlaces.every(p=>p.coordinate===null&&p.coordinateStatus==='pending'),e.id);
  assert.equal(e.status,'research');assert.equal(e.readiness.interface,false);
 }
 c.candidateIds=pack.entries.map(e=>e.id);
 vm.runInContext('assert.ok(candidateIds.every(id=>!themes.some(t=>t.id===id)))',c);
});

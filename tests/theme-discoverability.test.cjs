'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const {runtime}=require('../scripts/theme-audit-runtime.cjs');
test('every source context has a default catalogue destination, with place and region discovery',()=>{
 const c=runtime();c.assert=assert;vm.runInContext(`
 for(const t of culturalAtlasPack.themes){
  for(const {place,maps}of culturalSourceCoverage(t.id)){
   const destinations=themes.find(x=>x.id===t.id).catalogHidden?maps:[t.id,...maps];
   assert.ok(destinations.length,t.id+'/'+place.id+' lacks a default map');
   for(const query of [place.name,place.en].filter(Boolean)){homeState.query=query;homeState.area='all';homeState.interest='all';assert.ok(matchingDiscovery().some(x=>destinations.includes(x.theme.id)),t.id+'/'+query+' search');}
   homeState.query='';homeState.area=placeRouteAreas(place)[0]||'all';
   assert.ok(matchingDiscovery().some(x=>destinations.includes(x.theme.id)),t.id+'/'+place.id+' region');
  }
 }
 for(const t of themes.filter(t=>t.catalogHidden))assert.ok(culturalSourceCoverage(t.id).every(p=>p.maps.length),t.id);
 `,c);
});
test('the short-theme review covers the whole baseline and every retained itinerary remains searchable',()=>{
 const {snapshot}=require('../scripts/theme-audit-runtime.cjs'),review=require('../data/theme-review/decisions.json');
 const original=require('../qa/theme-review/recovery.json').themes;
 assert.deepEqual(review.decisions.map(t=>t.id),original.map(t=>t.id));
 assert.equal(review.decisions.length,107);assert.equal(new Set(review.decisions.map(t=>t.reason)).size,107);
 const c=runtime();c.assert=assert;c.review=review;vm.runInContext(`
 homeState.query='';const defaults=matchingDiscoveryRoutes();
 for(const decision of review.decisions){
  assert.ok(decision.reason.length>20,decision.id);assert.ok(buildPlans(decision.id,0).length>=decision.currentItineraryCount);
  for(const id of decision.destinations)assert.ok(themes.some(t=>t.id===id),id);
 }
 for(const t of themes.filter(t=>t.catalogHidden)){
  assert.ok(!defaults.some(x=>x.theme.id===t.id),t.id+' duplicate default');
  for(const plan of buildPlans(t.id,0))for(const query of [plan.name,plan.id]){
   homeState.query=query;assert.ok(matchingDiscoveryRoutes().some(x=>x.theme.id===t.id&&x.plan.id===plan.id),query+' lost itinerary search');
  }
 }
 const detroit=places.filter(p=>p.themes.includes('detroit-art'));
 assert.deepEqual(detroit.map(p=>p.id).sort(),['atlas-detroit','atlas-dia-detroit']);assert.ok(detroit.every(p=>p.country==='美国'));assert.equal(buildPlans('detroit-art',0)[0].topology,'network');
 assert.ok(themes.find(t=>t.id==='gaudi').catalogHidden);assert.ok(themes.find(t=>t.id==='picasso').catalogHidden);assert.ok(themes.find(t=>t.id==='wu-guanzhong').catalogHidden);
 `,c);
});

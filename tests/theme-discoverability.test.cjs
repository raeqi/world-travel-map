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

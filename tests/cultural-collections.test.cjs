'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function runtime(){const c=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams,assert});for(const [,file] of fs.readFileSync('index.html','utf8').matchAll(/<script defer src="([^"]+)"><\/script>/g)){if(!['app.js','flow.js'].includes(file))vm.runInContext(fs.readFileSync(file,'utf8'),c,{filename:file})}return c}
test('76 originals remain reachable through 18 collections and 10 featured entrances without invented plans',()=>vm.runInContext(`
 assert.equal(culturalCollections.size,18);assert.equal(culturalFeaturedIds.length,10);
 const grouped=new Set([...culturalCollections.values()].flatMap(c=>collectionMembers(c).map(m=>m.id)));
 for(const source of culturalAtlasPack.themes){
  assert.ok(grouped.has(source.id)||culturalFeaturedIds.includes(source.id),source.id);
  assert.ok(themes.find(t=>t.id===source.id));assert.equal(buildPlans(source.id,0).length,1);
 }
 assert.equal(visibleCatalogueThemes().filter(t=>t.collection||culturalFeaturedIds.includes(t.id)).length,28);
 for(const [id,c] of culturalCollections){assert.equal(buildPlans(id,0).length,0);assert.ok(themes.find(t=>t.id===id).scope.includes('无总路线'));assert.ok(collectionMembers(c).every(m=>collectionMemberPlaces(m).length));}
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
`,runtime()));
test('regional collections exclude distant stops while retaining complete person networks',()=>vm.runInContext(`
 const setouchi=culturalCollections.get('collection-setouchi-art'),nodes=collectionMembers(setouchi).flatMap(collectionMemberPlaces);
 assert.ok(nodes.every(p=>p.country==='日本'&&p.lon>133&&p.lon<135&&p.lat>34&&p.lat<35));
 assert.ok(!nodes.some(p=>p.id==='atlas-roden-crater'||p.id==='atlas-enoura'||p.id==='atlas-noguchi-new-york'));
 assert.ok(buildPlans('turrell',0)[0].stops.some(p=>p.id==='atlas-roden-crater'));
 const south=culturalCollections.get('collection-southern-france-painters');assert.ok(collectionMembers(south).flatMap(collectionMemberPlaces).every(p=>p.country==='法国'));
 assert.ok(buildPlans('chagall',0)[0].stops.some(p=>p.country==='白俄罗斯'));
`,runtime()));
test('person search returns collections; route search retains all original plans and geographic filters',()=>vm.runInContext(`
 homeState.interest='art';homeState.query='萧红';assert.ok(matchingDiscovery().some(x=>x.theme.id==='collection-modern-chinese-literature'));assert.ok(!matchingDiscovery().some(x=>x.theme.id==='xiao-hong'));
 homeState.view='routes';assert.ok(matchingDiscovery().some(x=>x.theme.id==='xiao-hong'));
 homeState.view='themes';homeState.query='';homeState.discipline='architecture';homeState.area='亚洲';assert.ok(matchingDiscovery().some(x=>x.theme.id==='collection-setouchi-art'));assert.ok(!matchingDiscovery().some(x=>x.theme.id==='collection-european-classical-music'));
 globalThis.activeTheme=themes.findIndex(t=>t.id==='collection-italian-art-journeys');
 const naples=buildPlans('turner',0)[0].stops.find(p=>p.name==='那不勒斯'),essay=placeEssays[naples.id];assert.ok(essay.paragraphs.some(p=>p.heading.includes('透纳')));assert.ok(essay.paragraphs.some(p=>p.heading.includes('歌德')));assert.ok(essay.sources.length>=2);
 activeTheme=themes.findIndex(t=>t.id==='goethe');assert.ok(naples.desc.includes('歌德'));assert.ok(!naples.desc.includes('透纳'));
`,runtime()));

test('collection default framing covers the full regional membership',()=>vm.runInContext(`
 const view=themes.find(t=>t.id==='collection-modern-chinese-literature').view;
 assert.ok(view.lat>35&&view.lat<42);assert.ok(view.zoom<6);
 const globalView=themes.find(t=>t.id==='collection-modern-architecture').view;assert.ok(globalView.zoom<1.5);
 const wrapped=culturalCollectionView([{lon:179,lat:30},{lon:-179,lat:32}]);assert.ok(Math.abs(wrapped.lon)>175);assert.ok(wrapped.zoom>5);
`,runtime()));

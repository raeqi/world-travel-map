'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function runtime(){const c=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams,assert});for(const [,file]of fs.readFileSync('index.html','utf8').matchAll(/<script defer src="([^"]+)"><\/script>/g))if(!['app.js','flow.js'].includes(file))vm.runInContext(fs.readFileSync(file,'utf8'),c,{filename:file});return c}
test('regional maps own real, source-backed places and working plans instead of person directories',()=>vm.runInContext(`
 for(const [id,map] of culturalThemeMaps){
  const t=themes.find(t=>t.id===id),nodes=places.filter(p=>p.themes.includes(id)),plans=buildPlans(id,0);
  assert.ok(nodes.length>=2,id);assert.equal(plans.length,map.plans.length);assert.ok(plans.length);
  assert.ok(!t.collection);assert.ok(t.filters.length);assert.ok(t.maxZoom>=4000);assert.ok(!/合集|子线|先选/.test(themeDesigns[id].lens));
  assert.ok(nodes.every(p=>p.source?.startsWith('https://')));assert.ok(nodes.some(p=>editorialPlacePhotos[p.id]===themeMedia[id].photo));
  for(const p of plans){assert.ok(p.stops.length>=2);assert.equal(p.topology,'network');assert.equal(p.legs.length,0);assert.ok(p.months.length<12);assert.ok(p.stops.every(p=>p.themes.includes(id)));assert.ok(!p.stops.some(p=>p.country==='美国')||['modern-architecture','detroit-art'].includes(id));}
 }
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
 for(const t of culturalAtlasPack.themes){assert.ok(themes.some(x=>x.id===t.id));assert.ok(buildPlans(t.id,0).some(p=>p.id==='atlas-'+t.id+'-places'));}
`,runtime()));
test('merges follow geography, while unrelated stories remain independent and searchable',()=>vm.runInContext(`
 const nodes=id=>places.filter(p=>p.themes.includes(id));
 assert.ok(nodes('setouchi-art').every(p=>p.country==='日本'&&p.lon>133&&p.lon<135&&p.lat>34&&p.lat<35));
 assert.ok(nodes('southern-france-painters').every(p=>p.country==='法国'&&p.lat<45));
 assert.ok(nodes('fuji-tokaido').every(p=>p.country==='日本'));assert.ok(worksForTheme('fuji-tokaido').length>=5);assert.ok(worksForTheme('fuji-tokaido').some(w=>w.artist==='歌川广重'));assert.equal(artWorks.find(w=>w.key==='atlas-yui').museumId,null);assert.ok(culturalPlaceRef('yui').desc.includes('休馆'));
 assert.ok(nodes('jiangnan-painting').every(p=>(countrySearchNames[p.country]||p.country)==='中国'&&p.lon>117&&p.lon<123&&p.lat>29&&p.lat<33));
 assert.ok(nodes('mexico-city-art').every(p=>p.country==='墨西哥'));
 assert.ok(nodes('shen-congwen').every(p=>p.region==='湖南'));assert.ok(nodes('xiao-hong').every(p=>p.country==='中国'&&p.lat>45));
 for(const id of ['shen-congwen','xiao-hong','wordsworth','constable','sibelius','grieg','puccini','higashiyama'])assert.ok(visibleCatalogueThemes().some(t=>t.id===id));assert.ok(themes.find(t=>t.id==='grieg').view.zoom>60);assert.ok(themes.find(t=>t.id==='mahfouz').view.zoom>120);
 homeState.interest='art';homeState.query='萧红';assert.ok(matchingDiscovery().some(x=>x.theme.id==='xiao-hong'));assert.ok(!matchingDiscovery().some(x=>x.theme.id==='shen-congwen'));
 homeState.query='吴冠中';assert.ok(matchingDiscovery().some(x=>x.theme.id==='jiangnan-painting'));assert.ok(matchingDiscovery().some(x=>x.theme.id==='wu-guanzhong'));
 homeState.query='';homeState.discipline='architecture';homeState.area='亚洲';assert.ok(matchingDiscovery().some(x=>x.theme.id==='setouchi-art'));assert.ok(!matchingDiscovery().some(x=>x.theme.id==='european-music-cities'));
`,runtime()));
test('shared sites retain each author, evidence and related regional context',()=>vm.runInContext(`
 globalThis.activeTheme=themes.findIndex(t=>t.id==='italian-art-journeys');const naples=culturalPlaceRef('naples'),essay=placeEssays[naples.id];
 assert.ok(essay.paragraphs.some(p=>p.heading.includes('透纳')));assert.ok(essay.paragraphs.some(p=>p.heading.includes('歌德')));assert.ok(essay.sources.length>=2);
 activeTheme=themes.findIndex(t=>t.id==='goethe');assert.ok(naples.desc.includes('歌德'));assert.ok(!naples.desc.includes('透纳'));
 activeTheme=themes.findIndex(t=>t.id==='mexico-city-art');const studio=culturalPlaceRef('frida-rivera-studio');assert.equal(culturalMapContexts(atlasContextByPlace.get(studio.id),'mexico-city-art').length,2);assert.ok(placeEssays[studio.id].sources.length>=2);assert.ok(placeEssays[studio.id].related.length);assert.ok(placeEssays[studio.id].related.every(id=>places.find(p=>p.id===id).themes.includes('mexico-city-art')));
 for(const p of culturalPlaceAdditions){const record=atlasContextByPlace.get(culturalPlaceRef(p.key).id);assert.ok(record.contexts.get(p.theme).observe);assert.ok(record.contexts.get(p.theme).source===p.source);}
`,runtime()));
test('all old directory URLs resolve, preserving more specific person, place and route links',()=>vm.runInContext(`
 for(const [old,id] of Object.entries(culturalMapAliases)){const q=new URLSearchParams(migrateCulturalMapHash('#theme='+old+'&view=plans').slice(1));assert.equal(q.get('theme'),id);assert.ok(themes.some(t=>t.id===id));assert.ok(buildPlans(id,0).length);}
 let q=new URLSearchParams(migrateCulturalMapHash('#theme=collection-modern-chinese-literature&person=xiao-hong&view=plans&route=atlas-xiao-hong-places').slice(1));assert.equal(q.get('theme'),'xiao-hong');assert.equal(q.get('route'),'atlas-xiao-hong-places');assert.ok(!q.has('person'));
 q=new URLSearchParams(migrateCulturalMapHash('#theme=collection-chinese-painting&place=wh-440').slice(1));assert.equal(q.get('theme'),'zhang-daqian');assert.equal(q.get('place'),'wh-440');
 assert.equal(migrateCulturalMapHash('#theme=parks'),null);
 const wrapped=culturalMapView([{lon:179,lat:30},{lon:-179,lat:32}]);assert.ok(Math.abs(wrapped.lon)>175);assert.ok(wrapped.zoom>5);
`,runtime()));

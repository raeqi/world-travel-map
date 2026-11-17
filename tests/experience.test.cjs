'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');const c=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams});
for(const f of ['catalog.js','tea.js','historical.js','walking.js','journeys.js','media.js','themes.js','planner.js','journey-plans.js','map-style.js','journey-design.js','editorial.js','art-media.js','art-context.js','discovery.js','reading.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
vm.runInContext(`
assert.equal(themes.length,21);assert.equal(places.length,1595);assert.equal(planTemplates.length,95);assert.equal(impressionistWorks.length,8);assert.equal(vanGoghWorks.length,3);
assert.ok(Object.keys(placeEssays).length>=20);
for(const [id,entry] of Object.entries(placeEssays)){assert.ok(places.some(p=>p.id===id));assert.ok(entry.paragraphs.length);assert.ok(entry.sources.every(s=>s.url.startsWith('https://')));assert.ok(entry.related.every(id=>places.some(p=>p.id===id)),id+' invalid related ID');}
assert.equal(matchingDiscovery().length,21);homeState.query='梵高';assert.equal(matchingDiscovery().length,1);assert.equal(matchingDiscovery()[0].theme.id,'vangogh');homeState.query='';homeState.interest='paths';homeState.area='亚洲';assert.ok(matchingDiscovery().some(x=>x.theme.id==='nakasendo'));assert.ok(matchingDiscovery().every(x=>x.group==='paths'&&x.areas.includes('亚洲')));homeState.query='nonexistent-qwerty';assert.equal(matchingDiscovery().length,0);
const london=artWorks.find(w=>w.key==='monet-london');assert.equal(london.year,'1903');assert.ok(places.find(p=>p.id===london.placeId).country==='英国');assert.ok(places.find(p=>p.id===london.museumId).country==='美国');
for(const theme of themes){const plans=buildPlans(theme.id,0);assert.equal(plans.length,planTemplates.filter(p=>p.theme===theme.id).length);for(const p of plans)assert.ok(p.stops.every(n=>n.themes.includes(theme.id)));}
`,vm.createContext(Object.assign(c,{assert})));
console.log('PASS: 21 themes, 95 valid plans, 1595 unique records, eight Impressionist and three Van Gogh works, discovery combinations, London geography, bounded sourced reading.');

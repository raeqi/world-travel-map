'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({document:{addEventListener(){}}});
for(const file of ['catalog.js','tea.js','historical.js','walking.js','journeys.js','media.js','themes.js','planner.js','journey-plans.js','map-style.js','journey-design.js','editorial.js','art-media.js','art-context.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
const result=vm.runInContext(`({themes,themeDesigns,themeMedia,photoLibrary,places,planTemplates,buildPlans,routeEdges})`,context);
const {themes,places,planTemplates,buildPlans,routeEdges,themeDesigns,themeMedia,photoLibrary}=result;
assert.equal(themes.length,21);
assert.equal(new Set(places.map(p=>p.id)).size,places.length);
assert.equal(new Set(planTemplates.map(p=>p.id)).size,planTemplates.length);
for(const t of themes.slice(10)){
 const nodes=places.filter(p=>p.themes.includes(t.id));
 assert.ok(nodes.length>=(t.id==='buddhist'?4:6),t.id+' node coverage');
 for(const p of nodes){assert.ok(Number.isFinite(p.lat)&&Math.abs(p.lat)<=90);assert.ok(Number.isFinite(p.lon)&&Math.abs(p.lon)<=180);assert.ok(p.source.startsWith('https://'));assert.ok(p.country&&p.region&&p.desc&&p.coordinateNote);}
 const plans=buildPlans(t.id,0);assert.ok(plans.length,t.id+' has plans');
 assert.equal(plans.length,planTemplates.filter(p=>p.theme===t.id).length,'no invalid IDs silently skipped');
 for(const plan of plans){assert.ok(['route','network','loop'].includes(plan.topology));assert.ok(plan.days>0);assert.ok(plan.months.length);assert.ok(plan.months.every(m=>m>=1&&m<=12));assert.equal(new Set(plan.ids).size,plan.ids.length);assert.ok(plan.climate.startsWith('https://'));assert.ok(plan.reason.length>40);assert.ok(plan.stops.every(p=>p.themes.includes(t.id)));if(plan.topology==='network'){assert.equal(plan.legs.length,0);assert.equal(routeEdges(plan.stops,plan).length,0);}if(plan.topology==='loop'){assert.equal(plan.legs.length,plan.stops.length);assert.equal(plan.legs.at(-1).to.id,plan.ids[0]);}}
 assert.equal(buildPlans(t.id,0,1).some(p=>p.days>1),false);
 const d=themeDesigns[t.id];assert.ok(d.lens&&d.note&&d.line);assert.match(d.line,/非/);
 const path=photoLibrary[themeMedia[t.id].photo].path;assert.ok(fs.existsSync(path),path);assert.match(path,/\.webp$/);assert.ok(photoLibrary[themeMedia[t.id].photo].licenseUrl);
 assert.ok((fs.readFileSync('design.css','utf8')+fs.readFileSync('experience.css','utf8')).includes('data-map-style='+d.mode));
}
assert.equal(new Set(places.filter(p=>p.themes.includes('andes')).map(p=>p.country)).size,6,'Andean network spans six countries');
assert.equal(places.filter(p=>p.themes.includes('buddhist')).length,4);
const hedeby=places.find(p=>p.themes.includes('viking')&&/海泽比|Hedeby/i.test(p.name+' '+p.desc));assert.ok(hedeby);assert.equal(hedeby.country,'德国');
assert.ok(buildPlans('nc500',0).some(p=>p.topology==='loop'));
console.log('PASS: 21 themes; all new nodes, unique IDs, valid plans, network/loop topology, six-country Andes, sources, licensed local images and distinct editions.');

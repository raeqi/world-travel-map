const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({document:{querySelector:()=>({innerHTML:''})}});
for(const file of ['catalog.js','tea.js','historical.js','walking.js','media.js','themes.js','planner.js','map-style.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
vm.runInContext(`
let activeTheme=0;
for(const [id,count] of [['xu',13],['kumano',6],['camino',19]]){
 activeTheme=themes.findIndex(t=>t.id===id);
 if(places.filter(p=>p.themes.includes(id)).length!==count)throw Error('Walking coverage '+id);
 renderSceneIdentity();
 if(!markerStyle(places.find(p=>p.themes.includes(id))).shape)throw Error('Marker missing');
 if(!themeMedia[id]||!photoLibrary[id].illustration||!themes[activeTheme].introduction)throw Error('Theme presentation missing');
 for(const plan of buildPlans(id,0))if(!plan.reason.includes('直线')&&!plan.reason.includes('地图')&&!plan.reason.includes('古路')&&!plan.reason.includes('连线'))throw Error('Route caveat missing');
}
const allIds=planTemplates.map(p=>p.id);if(new Set(allIds).size!==allIds.length)throw Error('Duplicate plan ID');
if(buildPlans('camino',0,30).some(p=>p.id==='camino-frances'))throw Error('Long route incorrectly fits 30 days');
if(buildPlans('kumano',0,1).length!==1)throw Error('One-day route filter');
if(buildPlans('xu',0).find(p=>p.id==='xu-west-yunnan').stops.length!==7)throw Error('Xu route sequence');
`,context);
for(const id of ['xu','kumano','camino'])assert.ok(fs.existsSync(vm.runInContext(`photoPath('${id}')`,context)));
console.log('PASS: new node counts, theme identity, markers, assets, caveats, unique route IDs and duration filters');

const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({document:{querySelector:()=>({innerHTML:''})}});
for(const file of ['catalog.js','tea.js','historical.js','walking.js','media.js','themes.js','planner.js','map-style.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
vm.runInContext(`
let activeTheme=0;
for(const [id,count] of [['xu',24],['kumano',6],['camino',43]]){
 activeTheme=themes.findIndex(t=>t.id===id);
 if(places.filter(p=>p.themes.includes(id)).length!==count)throw Error('Walking coverage '+id);
 renderSceneIdentity();
 if(!markerStyle(places.find(p=>p.themes.includes(id))).shape)throw Error('Marker missing');
 if(!themeMedia[id]||!photoLibrary[id].illustration||!themes[activeTheme].introduction)throw Error('Theme presentation missing');
 for(const plan of buildPlans(id,0))if(!plan.reason.includes('直线')&&!plan.reason.includes('地图')&&!plan.reason.includes('古路')&&!plan.reason.includes('连线'))throw Error('Route caveat missing');
}
const xuPlans=buildPlans('xu',0);
if(xuPlans.length!==6)throw Error('Six distinct Xu journeys');
if(xuPlans.map(p=>p.historicalYear).join(',')!=='1613,1616,1618,1623,1633,1639')throw Error('Chronological journey groups');
for(const [id,expected] of [['xu-central','xu-kaifeng,xu-zhengzhou,xu-xinmi,xu-songshan,xu-shaolin,xu-longmen,xu-huashan,xu-wudang'],['xu-north','xu-beijing,xu-wutai,xu-hengshan'],['xu-jiangxi-anhui','xu-lushan,xu-huangshan'],['xu-mountains','xu-qiyun,xu-huangshan,xu-wuyi']]){const p=xuPlans.find(p=>p.id===id);if(p.ids.join(',')!==expected)throw Error('Incorrect historical sequence '+id);if(p.climate!==(id==='xu-central'?walkingSources.xuSongshan:walkingSources.xuChronology))throw Error('Wrong journey source');}
if(places.find(p=>p.id==='xu-huangshan').facts['路线线索']!=='1616 / 1618 皖南游历')throw Error('Repeat visit lost');
const main=buildPlans('camino',0).find(p=>p.id==='camino-frances');
if(main.stops.length!==43||main.stops[0].id!=='camino-saint-jean'||main.stops.at(-1).id!=='camino-santiago')throw Error('Complete cross-border corridor');
if(main.stops[0].country!=='法国'||main.stops.slice(1).some(p=>p.country!=='西班牙'))throw Error('Camino country attribution');
for(const id of ['zubiri','los-arcos','hornillos','castrojeriz','carrion','sahagun','mansilla','foncebadon','villafranca','triacastela','san-xil','pedrouzo'])if(!main.ids.includes('camino-'+id))throw Error('Missing stage town '+id);
for(const id of ['leon','sarria']){const sub=buildPlans('camino',0).find(p=>p.id==='camino-'+id);if(sub.ids.join(',')!==main.ids.slice(main.ids.indexOf('camino-'+id)).join(','))throw Error('Subroute order diverges');}
if(!main.reason.includes('Valcarlos')||!themes.find(t=>t.id==='camino').introduction.includes('11 月 1 日'))throw Error('Mountain-route guidance');
const allIds=planTemplates.map(p=>p.id);if(new Set(allIds).size!==allIds.length)throw Error('Duplicate plan ID');
if(buildPlans('camino',0,30).some(p=>p.id==='camino-frances'))throw Error('Long route incorrectly fits 30 days');
if(buildPlans('kumano',0,1).length!==1)throw Error('One-day route filter');
if(buildPlans('xu',0).find(p=>p.id==='xu-west-yunnan').stops.length!==7)throw Error('Xu route sequence');
`,context);
for(const id of ['xu','kumano','camino'])assert.ok(fs.existsSync(vm.runInContext(`photoPath('${id}')`,context)));
console.log('PASS: new node counts, theme identity, markers, assets, caveats, unique route IDs and duration filters');

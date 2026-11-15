const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({});for(const file of ['catalog.js','tea.js','historical.js','walking.js','themes.js','planner.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
vm.runInContext(`
if(themes.length!==10)throw Error('Ten themes');
const ids=new Set(places.map(p=>p.id));if(ids.size!==places.length)throw Error('Duplicate point IDs');
if(places.filter(p=>p.themes.includes('parks')).length!==63)throw Error('NPS coverage');
if(places.filter(p=>p.id.startsWith('wh-')).length!==catalogMeta.unesco)throw Error('UNESCO coverage');
for(const p of places){if(!p.source.startsWith('https://'))throw Error('Missing official source');if(validLocation(p)&&(Math.abs(p.lat)>90||Math.abs(p.lon)>180))throw Error('Invalid coordinates')}
for(const theme of themes){const all=buildPlans(theme.id,0);if(all.length<3)throw Error('Insufficient plans: '+theme.id);for(const plan of all){if(!Number.isFinite(plan.totalKm))throw Error('Invalid distance');for(const p of plan.stops)if(!p.themes.includes(theme.id))throw Error('Wrong membership')};for(const month of [1,7,10]){const plans=buildPlans(theme.id,month);let off=false;for(const p of plans){if(!p.months.includes(month))throw Error('Month filtering')}}}
if(buildPlans('parks',1,3).length!==0)throw Error('Duration filter');
if(!buildPlans('parks',1).some(p=>p.id==='desert'))throw Error('Winter desert preference');
if(buildPlans('culture',10).find(p=>p.id==='beijing').totalKm>80)throw Error('Serial property representative coordinate error');
if(!places.some(p=>p.themes.includes('tea')&&p.country==='尼泊尔')||!places.some(p=>p.themes.includes('tea')&&p.country==='印度'))throw Error('Himalayan extensions');
if(!buildPlans('culture',0).some(p=>p.stops.length>=7))throw Error('Long circuits');
if(Math.abs(distanceKm({lat:0,lon:179},{lat:0,lon:-179})-222.39)>1)throw Error('Antimeridian distance');
`,context);console.log('PASS: official coverage, source links, coordinate bounds, ten themes, expanded circuits, month filtering, duration filter, serial-property and antimeridian distances');

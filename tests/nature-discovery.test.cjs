'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function runtime(hash=''){const location={hash,pathname:'/'},c=vm.createContext({document:{addEventListener(){}},location,history:{replaceState(_s,_t,url){location.hash=url.startsWith('#')?url:''}},URLSearchParams,assert});for(const [,file] of fs.readFileSync('index.html','utf8').matchAll(/<script defer src="([^"]+)"><\/script>/g)){if(!['app.js','flow.js'].includes(file))vm.runInContext(fs.readFileSync(file,'utf8'),c,{filename:file})}return c}
test('nature shares eleven selected routes without reclassifying mixed themes or copying records',()=>vm.runInContext(`
 const original={places:places.length,plans:planTemplates.length,themes:themes.length};
 homeState.interest='nature';
 assert.deepEqual(matchingDiscovery().map(x=>x.theme.id).sort(),['canadian-rockies','nature','nz-great-walks','parks','patagonia-nature']);
 const rows=matchingDiscoveryRoutes(),cross=rows.filter(x=>discoveryMeta[x.theme.id][0]!=='nature');
 const expected=['nc500-full','nc500-west','roads-california1','roads-utah12','roads-utah5','roads-arctic','roads-atlantic','roads-iceland1','roads-greatocean','roads-milford','roads-garden'].sort();
 assert.deepEqual(cross.map(x=>x.plan.id).sort(),expected);
 assert.equal(rows.length,39);assert.equal(new Set(rows.map(x=>x.plan.id)).size,rows.length);
 for(const x of cross){assert.ok(routeDiscoveryInterests(x.plan,x.theme).includes('drives'));assert.ok(x.plan.stops.every(p=>places.includes(p)));}
 for(const id of ['roads-g219','roads-g331','roads-g228','roads-g331-yalu','roads-g228-shandong','roads-overseas'])assert.ok(!rows.some(x=>x.plan.id===id),id);
 homeState.interest='drives';const drives=matchingDiscoveryRoutes();
 assert.ok(expected.every(id=>drives.some(x=>x.plan.id===id)));
 assert.ok(drives.some(x=>x.plan.id==='roads-overseas'),'the original road entrance retains other routes');
 homeState.interest='all';const visiblePlans=planTemplates.filter(p=>!themes.find(t=>t.id===p.theme).catalogHidden);assert.equal(matchingDiscoveryRoutes().length,visiblePlans.length);
 assert.equal(new Set(matchingDiscoveryRoutes().map(x=>x.plan.id)).size,visiblePlans.length);
 assert.deepEqual({places:places.length,plans:planTemplates.length,themes:themes.length},original);
 assert.equal(discoveryMeta['drive-northamerica'][0],'drives');
 assert.equal(discoveryMeta['drive-china'][0],'drives');
`,runtime()));
test('route interest, exact-country search and geography filter the route itself',()=>vm.runInContext(`
 homeState.interest='nature';homeState.query='冰岛';
 assert.deepEqual(matchingDiscoveryRoutes().map(x=>x.plan.id),['roads-iceland1']);
 homeState.area='欧洲';assert.equal(matchingDiscoveryRoutes().length,1);
 homeState.area='大洋洲';assert.equal(matchingDiscoveryRoutes().length,0);
 homeState.area='all';homeState.query='Norway';assert.deepEqual(matchingDiscoveryRoutes().map(x=>x.plan.id),['roads-atlantic']);
 homeState.query='New Zealand';assert.deepEqual(matchingDiscoveryRoutes().map(x=>x.plan.id).sort(),['roads-milford','natural-milford','natural-routeburn','natural-kepler'].sort());
 homeState.query='米尔福德';assert.equal(matchingDiscovery().length,1);assert.equal(matchingDiscoveryRoutes().length,2);
 homeState.query='犹他';assert.ok(matchingDiscoveryRoutes().some(x=>x.plan.id==='roads-utah12'));
 homeState.query='no-such-landscape-qwerty';assert.equal(matchingDiscoveryRoutes().length,0);
 homeState.query='';homeState.area='非洲';assert.ok(matchingDiscoveryRoutes().some(x=>x.plan.id==='roads-garden'));
 assert.ok(matchingDiscoveryRoutes().every(x=>x.plan.stops.some(p=>placeRouteAreas(p).includes('非洲'))));
`,runtime()));
test('nature discovery URLs preserve interest, view, area and query',()=>vm.runInContext(`
 assert.equal(homeState.interest,'nature');assert.equal(homeState.area,'欧洲');assert.equal(homeState.view,'routes');assert.equal(homeState.query,'冰岛');
 assert.deepEqual(matchingDiscoveryRoutes().map(x=>x.plan.id),['roads-iceland1']);
 writeHomeNavigation();readHomeState();
 assert.equal(homeState.interest,'nature');assert.equal(homeState.query,'冰岛');assert.equal(homeState.view,'routes');
`,runtime('#interest=nature&area=欧洲&show=routes&find=冰岛')));

test('three researched nature maps have real routes, access nodes and licensed local images',()=>vm.runInContext(`
 assert.equal(naturalAtlasPack.themes.length,3);assert.equal(naturalAtlasPack.points.length,39);assert.equal(naturalAtlasPack.plans.length,11);
 const ids=new Set(places.map(p=>p.id));assert.equal(ids.size,places.length);
 for(const theme of naturalAtlasPack.themes){
  const nodes=places.filter(p=>p.themes.includes(theme.id)),plans=buildPlans(theme.id,0);
  assert.ok(nodes.length>=8);assert.ok(plans.length>=3);
  assert.ok(photoLibrary[theme.photo].path.startsWith('assets/natural-atlas/'));
  assert.equal(routeEdges(nodes,{topology:'network'}).length,0);
  for(const plan of plans){
   assert.ok(plan.stops.length>=2);assert.equal(new Set(plan.stops.map(p=>p.country)).size,1,'independent routes stay in one country');
   assert.ok(plan.climate.startsWith('https://'));assert.ok(plan.routeLabel&&plan.distanceText);
   assert.ok(plan.legs.every(x=>x.km<150));assert.ok(routeCoverChoice(plan));
   assert.ok(plan.stops.some(p=>p.id===routeCoverChoice(plan).placeId));
  }
 }
 for(const stop of naturalAtlasPack.points){
  const p=places.find(p=>p.id==='natural-'+stop.id);assert.ok(p.source.startsWith('https://'));
  assert.ok(p.coordinateNote&&stop.geoSource);assert.ok(placeEssays[p.id].paragraphs.every(p=>p.text.length>30));
  if(stop.photo){const media=photoLibrary[stop.photo];assert.ok(media&&media.author&&media.license&&media.source&&media.sha256)}
 }
 const milford=buildPlans('nz-great-walks',0).find(p=>p.id==='natural-milford');
 assert.equal(milford.ids[0],'natural-glade-wharf');assert.equal(milford.ids.at(-1),'natural-sandfly-point');
 assert.ok(milford.reason.includes('53.5'));assert.ok(places.find(p=>p.id==='natural-mintaro-hut').lat>-44.81);
 assert.equal(buildPlans('nz-great-walks',0).find(p=>p.id==='natural-kepler').topology,'loop');
 assert.ok(naturalAtlasPack.plans.every(p=>p.topology!=='network'));
 for(const query of ['加拿大','Great Walks','巴塔哥尼亚','Patagonia']){
  homeState.query=query;homeState.interest='nature';homeState.view='themes';assert.ok(matchingDiscovery().length,query);
 }
`,runtime()));
test('natural image files and audit metadata are present',()=>{
 const c=runtime();const media=vm.runInContext('naturalAtlasMedia',c);
 assert.equal(Object.keys(media).length,26);
 for(const item of Object.values(media)){assert.ok(fs.statSync(item.path).size>1000);assert.ok(item.width>=600);assert.ok(item.licenseUrl.startsWith('https://'))}
});

'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const {culturalBrowserScope,culturalShardThemes}=require('../scripts/cultural-browser-scope.cjs');
const {runtime}=require('../scripts/theme-audit-runtime.cjs');
test('unsharded local review retains both original viewports and rejects ambiguous scope',()=>{
 assert.deepEqual(culturalBrowserScope({}),{devices:[{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}],shard:1,shards:1});
 for(const env of [{CULTURAL_QA_VIEWPORT:'phone'},{CULTURAL_QA_SHARD:'2'},{CULTURAL_QA_SHARDS:'4'},{CULTURAL_QA_SHARD:'0',CULTURAL_QA_SHARDS:'4'},{CULTURAL_QA_SHARD:'5',CULTURAL_QA_SHARDS:'4'},{CULTURAL_QA_SHARD:'1.5',CULTURAL_QA_SHARDS:'4'}])assert.throws(()=>culturalBrowserScope(env));
});
test('eight CI shards cover every original theme/plan iteration exactly once per viewport',()=>{
 const c=runtime(),rows=JSON.parse(JSON.stringify(vm.runInContext(`[...[...culturalThemeMaps.keys()],'shen-congwen','xiao-hong','higashiyama','sibelius','grieg','wordsworth','constable'].map((id,index)=>({id,index,plans:buildPlans(id,0).map(p=>p.id)}))`,c)));
 assert.equal(rows.length,42);
 for(const viewport of ['desktop','mobile']){const combined=[];for(let i=1;i<=4;i++){const scope=culturalBrowserScope({CULTURAL_QA_VIEWPORT:viewport,CULTURAL_QA_SHARD:String(i),CULTURAL_QA_SHARDS:'4'}),assigned=culturalShardThemes(rows,scope);assert.equal(scope.devices.length,1);assert.equal(scope.devices[0].name,viewport);assert.ok(assigned.length>=10);combined.push(...assigned);}combined.sort((a,b)=>a.index-b.index);assert.deepEqual(combined,rows,'no lost/duplicated original iteration or itinerary');}
 const workflow=fs.readFileSync('.github/workflows/theme-review.yml','utf8');for(const viewport of ['desktop','mobile'])for(let i=1;i<=4;i++)assert.ok(workflow.includes('suite: cultural-maps-'+viewport+'-'+i));assert.match(workflow,/timeout-minutes: 30/);
});

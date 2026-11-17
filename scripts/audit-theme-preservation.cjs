'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto'),vm=require('node:vm');
const {runtime,snapshot}=require('./theme-audit-runtime.cjs');
const baseline='e5050a499ab4f648d97ec58082e53e430afa8ad3',before=snapshot(runtime(baseline)),c=runtime(),after=snapshot(c);
const sha=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const checks=before.map(old=>{
 const current=after.find(t=>t.id===old.id);assert.ok(current,'Removed theme '+old.id);
 for(const point of old.points)assert.deepEqual(current.points.find(p=>p.id===point.id),point,old.id+'/'+point.id+' data changed');
 for(const plan of old.plans)assert.deepEqual(current.plans.find(p=>p.id===plan.id),plan,old.id+'/'+plan.id+' plan changed');
 for(const work of old.works)assert.ok(current.works.some(w=>JSON.stringify(w)===JSON.stringify(work)),old.id+' lost artwork');
 assert.deepEqual(current.media,old.media,old.id+' source cover changed');
 return {id:old.id,name:old.name,itineraryCount:old.plans.length,hiddenBefore:old.hidden,hiddenAfter:current.hidden,points:old.points.map(p=>({id:p.id,name:p.name,country:p.country,region:p.region,source:p.source,contextSource:p.context?.source,dataSha256:sha(p),photo:p.photo||null,image:p.media?{path:p.media.path,source:p.media.source,license:p.media.license,sha256:p.media.path&&fs.existsSync(p.media.path)?crypto.createHash('sha256').update(fs.readFileSync(p.media.path)).digest('hex'):null}:null,legacyHash:'#theme='+old.id+'&place='+p.id,verified:true})),plans:old.plans.map(p=>({id:p.id,name:p.name,ids:p.ids,sha256:sha(p),legacyHash:'#theme='+old.id+'&view=plans&route='+p.id,verified:true})),artworks:old.works.map(w=>({key:w.key,sha256:sha(w),record:w.record})),sourceCoverPreserved:true};
});
const coverage=JSON.parse(vm.runInContext(`JSON.stringify(culturalAtlasPack.themes.map(t=>({id:t.id,points:culturalSourceCoverage(t.id).map(({place,maps})=>({id:place.id,maps})),visible:!themes.find(x=>x.id===t.id).catalogHidden})))`,c));
for(const row of coverage)assert.ok(row.visible||row.points.every(p=>p.maps.length),row.id+' has undiscoverable contexts');
const report={baseline,phase:process.env.AUDIT_PHASE||'discovery-recovery',counts:{themes:before.length,points:JSON.parse(vm.runInContext('JSON.stringify(places.length)',c)),itineraries:before.reduce((n,t)=>n+t.plans.length,0),shortThemes:before.filter(t=>t.plans.length<=3).length,restoredThemes:checks.filter(t=>t.hiddenBefore&&!t.hiddenAfter).length},themes:checks.filter(t=>t.itineraryCount<=3),contextCoverage:coverage};
fs.mkdirSync('qa/theme-review',{recursive:true});fs.writeFileSync('qa/theme-review/preservation.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:true,...report.counts,restored:checks.filter(t=>t.hiddenBefore&&!t.hiddenAfter).map(t=>t.id)}));

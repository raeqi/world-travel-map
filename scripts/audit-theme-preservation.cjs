'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto'),vm=require('node:vm');
const {runtime,snapshot}=require('./theme-audit-runtime.cjs');
const {execFileSync}=require('node:child_process');
const imageHashes=new Map();
function imageEvidence(media){if(!media)return null;const path=media.path||'assets/photos/'+media.file+'.jpg';if(!imageHashes.has(path)){let hash=null;if(fs.existsSync(path)){const bytes=fs.readFileSync(path);const original=execFileSync('git',['show',baseline+':'+path],{maxBuffer:16*1024*1024});assert.ok(bytes.equals(original),'Image bytes changed: '+path);hash=crypto.createHash('sha256').update(bytes).digest('hex')}imageHashes.set(path,hash)}return {path,source:media.source,license:media.license,sha256:imageHashes.get(path),originalBytesVerified:!!imageHashes.get(path)}}
const baseline='e5050a499ab4f648d97ec58082e53e430afa8ad3',before=snapshot(runtime(baseline)),c=runtime(),after=snapshot(c);
const sha=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const checks=before.map(old=>{
 const current=after.find(t=>t.id===old.id);assert.ok(current,'Removed theme '+old.id);
 for(const point of old.points){
  const now=current.points.find(p=>p.id===point.id);assert.ok(now,old.id+'/'+point.id+' missing');
  if(old.id==='paris-sculpture'){
   const {essay:oldEssay,...oldData}=point,{essay:newEssay,...newData}=now;assert.deepEqual(newData,oldData,old.id+'/'+point.id+' source data');
   for(const paragraph of oldEssay?.paragraphs||[])assert.ok(newEssay.paragraphs.some(p=>p.heading===paragraph.heading&&p.text.includes(paragraph.text)),'Paris lost original paragraph');
   for(const source of oldEssay?.sources||[])assert.ok(newEssay.sources.some(s=>JSON.stringify(s)===JSON.stringify(source)),'Paris lost source');
   for(const related of oldEssay?.related||[])assert.ok(newEssay.related.includes(related),'Paris lost related place');
  }else assert.deepEqual(now,point,old.id+'/'+point.id+' data changed');
 }
 for(const plan of old.plans)assert.deepEqual(current.plans.find(p=>p.id===plan.id),plan,old.id+'/'+plan.id+' plan changed');
 for(const work of old.works)assert.ok(current.works.some(w=>JSON.stringify(w)===JSON.stringify(work)),old.id+' lost artwork');
 if(old.id==='paris-sculpture'){
  const {edition:oldEdition,motif:oldMotif,...oldMedia}=old.media,{edition:newEdition,motif:newMotif,...newMedia}=current.media;
  assert.deepEqual(newMedia,oldMedia,'Paris image/credit changed');assert.ok(newMotif.includes(oldMotif));
 }else assert.deepEqual(current.media,old.media,old.id+' source cover changed');
 return {id:old.id,name:old.name,itineraryCount:old.plans.length,hiddenBefore:old.hidden,hiddenAfter:current.hidden,points:old.points.map(p=>({id:p.id,name:p.name,country:p.country,region:p.region,source:p.source,contextSource:p.context?.source,dataSha256:sha(p),currentDataSha256:sha(current.points.find(x=>x.id===p.id)),narrativeExpanded:old.id==='paris-sculpture',photo:p.photo||null,image:imageEvidence(p.media),legacyHash:'#theme='+old.id+'&place='+p.id,verified:true})),plans:old.plans.map(p=>({id:p.id,name:p.name,ids:p.ids,sha256:sha(p),legacyHash:'#theme='+old.id+'&view=plans&route='+p.id,verified:true})),artworks:old.works.map(w=>({key:w.key,sha256:sha(w),record:w.record})),sourceCoverPreserved:true};
});
const coverage=JSON.parse(vm.runInContext(`JSON.stringify(culturalAtlasPack.themes.map(t=>({id:t.id,points:culturalSourceCoverage(t.id).map(({place,maps})=>({id:place.id,maps})),visible:!themes.find(x=>x.id===t.id).catalogHidden})))`,c));
for(const row of coverage)assert.ok(row.visible||row.points.every(p=>p.maps.length),row.id+' has undiscoverable contexts');
const report={baseline,phase:process.env.AUDIT_PHASE||'discovery-recovery',counts:{themes:before.length,points:JSON.parse(vm.runInContext('JSON.stringify(places.length)',c)),itineraries:before.reduce((n,t)=>n+t.plans.length,0),shortThemes:before.filter(t=>t.plans.length<=3).length,restoredThemes:checks.filter(t=>t.hiddenBefore&&!t.hiddenAfter).length,currentThemes:after.length,currentItineraries:after.reduce((n,t)=>n+t.plans.length,0),currentVisibleThemes:after.filter(t=>!t.hidden).length},themes:checks.filter(t=>t.itineraryCount<=3),contextCoverage:coverage};
fs.mkdirSync('qa/theme-review',{recursive:true});fs.writeFileSync('qa/theme-review/preservation.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:true,...report.counts,restored:checks.filter(t=>t.hiddenBefore&&!t.hiddenAfter).map(t=>t.id)}));

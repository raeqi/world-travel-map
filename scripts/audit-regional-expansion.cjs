'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {runtime,snapshot}=require('./theme-audit-runtime.cjs');
const baseline='125c988f086c95b523be88683a12635a6d61d3f4',before=snapshot(runtime(baseline)),c=runtime(),after=snapshot(c),hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const baselineOne=before.filter(t=>t.plans.length===1),priorReview=require('../data/theme-review/decisions.json');
const details=JSON.parse(vm.runInContext(`JSON.stringify({hidden:themes.filter(t=>t.catalogHidden).map(t=>t.id),coverage:themes.filter(t=>t.catalogHidden).map(t=>({id:t.id,points:culturalSourceCoverage(t.id).map(r=>({id:r.place.id,maps:r.maps}))})),maps:[...culturalThemeMaps.keys()],newPlaces:regionalExpansionData.points})`,c));
const changes={
 'ansel-adams':'优胜美地的摄影场所加入美国西部地貌与艺术图，并补实际画廊及分区探访。',
 'okeeffe':'阿比丘和幽灵牧场与新增圣菲馆藏构成新墨西哥章节，加入美国西部艺术图。',
 'utah-land-art':'两件犹他地景作品在美国西部艺术图完整承接，保留偏远道路限制与独立三日方案。',
 'turrell':'直岛由日本空间图承接、罗登火山口由美国西部图保留受限项目阅读；新增ASU天空空间。',
 'sugimoto':'直岛与江之浦均进入日本光与空间图，关东另设独立探访，不再遗漏小田原。',
 'noguchi':'牟礼由日本图承接，纽约庭园由美国东岸图承接，并新增札幌公园。',
 'dali':'三座机构在西班牙艺术图完整承接，增加克雷乌斯角环境观察和独立地区方案。',
 'sorolla':'瓦伦西亚在西班牙图，纽约馆藏在美国东岸图；增加瓦伦西亚与普拉多的收藏阅读。',
 'barcelona-art':'由单条城市方案扩为西班牙分区艺术图；保留巴塞罗那原方案，新增住宅、达利海岸与索罗亚馆藏章节。'
};
const decisions=baselineOne.map(old=>{
 const current=after.find(t=>t.id===old.id);assert.ok(current,old.id);
 for(const point of old.points){const now=current.points.find(p=>p.id===point.id);assert.ok(now,old.id+'/'+point.id);const {essay:oldEssay,...oldData}=point,{essay:newEssay,...newData}=now;assert.deepEqual(newData,oldData,old.id+'/'+point.id+' changed source data');for(const paragraph of oldEssay?.paragraphs||[])assert.ok(newEssay?.paragraphs.some(p=>p.heading===paragraph.heading&&p.text.includes(paragraph.text)),old.id+' lost paragraph');for(const source of oldEssay?.sources||[])assert.ok(newEssay?.sources.some(s=>JSON.stringify(s)===JSON.stringify(source)),old.id+' lost source');}
 for(const plan of old.plans)assert.deepEqual(current.plans.find(p=>p.id===plan.id),plan,plan.id);
 const coverage=details.coverage.find(r=>r.id===old.id);
 return {id:old.id,name:old.name,beforeItineraries:1,afterItineraries:current.plans.length,beforeVisible:!old.hidden,afterVisible:!current.hidden,action:old.hidden?'already-integrated':current.hidden?'integrated':current.plans.length>1?'expanded':'retained',destinations:current.hidden?[...new Set(coverage.points.flatMap(p=>p.maps))]:[old.id],reason:changes[old.id]||priorReview.decisions.find(d=>d.id===old.id)?.reason||'现有同城艺术图保留，后续补充分区现场资料。',points:old.points.map(p=>({id:p.id,name:p.name,source:p.source,sha256:hash(p),legacyHash:'#theme='+old.id+'&place='+p.id,destinations:current.hidden?coverage.points.find(x=>x.id===p.id).maps:[old.id]})),plans:old.plans.map(p=>({id:p.id,name:p.name,sha256:hash(p),legacyHash:'#theme='+old.id+'&view=plans&route='+p.id})),artworks:old.works.map(w=>({key:w.key,sha256:hash(w)}))};
});
for(const old of before)for(const plan of old.plans)assert.deepEqual(after.find(t=>t.id===old.id).plans.find(p=>p.id===plan.id),plan,plan.id+' lost');
for(const row of details.coverage)assert.ok(row.points.every(p=>p.maps.length),row.id+' hidden but uncovered');
const report={baseline,before:{visible:before.filter(t=>!t.hidden).length,themes:before.length,itineraries:before.reduce((n,t)=>n+t.plans.length,0),oneItineraryThemes:baselineOne.length,visibleOneItineraryThemes:baselineOne.filter(t=>!t.hidden).length},after:{visible:after.filter(t=>!t.hidden).length,themes:after.length,itineraries:after.reduce((n,t)=>n+t.plans.length,0),visibleOneItineraryThemes:after.filter(t=>!t.hidden&&t.plans.length===1).length},decisions,newPlaces:details.newPlaces.map(p=>({id:p.id,name:p.name,source:p.source,wiki:p.wiki||null})),coverage:details.coverage};
fs.mkdirSync('qa/theme-review',{recursive:true});fs.writeFileSync('qa/theme-review/regional-review.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:true,before:report.before,after:report.after,newPlaces:report.newPlaces.length}));

'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {runtime,snapshot,assertReadingPreserved}=require('./theme-audit-runtime.cjs');
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
 'hepworth':'与摩尔共享约克郡成长背景；圣艾夫斯两点和新增韦克菲尔德、雕塑公园由英国雕塑图完整承接。',
 'henry-moore':'佩里格林和利兹完整进入英国雕塑地图，分约克郡、工作室园区与海岸方案。',
 'basho':'松岛与山寺完整进入日本文学图，保持东北山海独立探访和作品年代区别。',
 'kawabata':'伊豆与越后汤泽由日本文学图直接呈现，原作品地景与原方案保留。',
 'soseki':'松山、东京由日本文学图承接，伦敦由英格兰东南图承接，并新增温泉与疗养纪念资料。',
 'dickens':'伦敦与布罗德斯泰斯由英格兰东南创作图完整承接，城市与肯特海岸各自探访。',
 'handel':'哈雷在欧洲音乐图、伦敦故居在英格兰东南图；跨国原方案继续可搜，全点覆盖后去重。',
 'lee-miller':'萨塞克斯住宅在英格兰图、埃及城市背景在开罗图，两段生活全部可发现后去重。',
 'mahfouz':'老开罗和纪念馆完整进入开罗街巷、小说与摄影图，补住宅空间资料，但不臆定小说地址。',
 'du-fu':'成都和岳阳在长江及支流城市文学图完整承接，分地住宿与历史阶段分清。',
 'lu-you':'绍兴由江南图承接、奉节由入蜀与长江图承接，不再因江南筛选隐藏夔州。',
 'feng-zikai':'石门与上海由江南画家图承接、重庆迁居由长江写作图承接；三地点完整保全。',
 'munch':'保留挪威独立故事，增加有机构资料的埃克利画室园地与奥斯陆分区方案，区分当代驻留和历史生活。',
 'sibelius':'保留芬兰独立故事，新增海门林纳出生地博物馆及与艾诺拉分期阅读，不和挪威音乐家硬拼。',
 'detroit-art':'新增鲁日工厂参访，与壁画原址分地对读；历史生产与现代工厂分清，采用正规接驳。',
 'barcelona-art':'由单条城市方案扩为西班牙分区艺术图；保留巴塞罗那原方案，新增住宅、达利海岸与索罗亚馆藏章节。'
};
const decisions=baselineOne.map(old=>{
 const current=after.find(t=>t.id===old.id);assert.ok(current,old.id);
 for(const point of old.points){const now=current.points.find(p=>p.id===point.id);assert.ok(now,old.id+'/'+point.id);const {essay:oldEssay,...oldData}=point,{essay:newEssay,...newData}=now;assert.deepEqual(newData,oldData,old.id+'/'+point.id+' changed source data');assertReadingPreserved(point,now,old.id);}
 for(const plan of old.plans)assert.deepEqual(current.plans.find(p=>p.id===plan.id),plan,plan.id);
 const coverage=details.coverage.find(r=>r.id===old.id);
 return {id:old.id,name:old.name,beforeItineraries:1,afterItineraries:current.plans.length,beforeVisible:!old.hidden,afterVisible:!current.hidden,action:old.hidden?'already-integrated':current.hidden?'integrated':current.plans.length>1?'expanded':'retained',destinations:current.hidden?[...new Set(coverage.points.flatMap(p=>p.maps))]:[old.id],reason:changes[old.id]||priorReview.decisions.find(d=>d.id===old.id)?.reason||'现有同城艺术图保留，后续补充分区现场资料。',points:old.points.map(p=>({id:p.id,name:p.name,source:p.source,sha256:hash(p),legacyHash:'#theme='+old.id+'&place='+p.id,destinations:current.hidden?coverage.points.find(x=>x.id===p.id).maps:[old.id]})),plans:old.plans.map(p=>({id:p.id,name:p.name,sha256:hash(p),legacyHash:'#theme='+old.id+'&view=plans&route='+p.id})),artworks:old.works.map(w=>({key:w.key,sha256:hash(w)}))};
});
for(const old of before)for(const plan of old.plans)assert.deepEqual(after.find(t=>t.id===old.id).plans.find(p=>p.id===plan.id),plan,plan.id+' lost');
for(const row of details.coverage)assert.ok(row.points.every(p=>p.maps.length),row.id+' hidden but uncovered');
const report={baseline,before:{visible:before.filter(t=>!t.hidden).length,themes:before.length,itineraries:before.reduce((n,t)=>n+t.plans.length,0),oneItineraryThemes:baselineOne.length,visibleOneItineraryThemes:baselineOne.filter(t=>!t.hidden).length},after:{visible:after.filter(t=>!t.hidden).length,themes:after.length,itineraries:after.reduce((n,t)=>n+t.plans.length,0),visibleOneItineraryThemes:after.filter(t=>!t.hidden&&t.plans.length===1).length},decisions,newPlaces:details.newPlaces.map(p=>({id:p.id,name:p.name,source:p.source,wiki:p.wiki||null})),coverage:details.coverage};
fs.mkdirSync('qa/theme-review',{recursive:true});fs.writeFileSync('qa/theme-review/regional-review.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:true,before:report.before,after:report.after,newPlaces:report.newPlaces.length}));

'use strict';
const fs=require('node:fs'),vm=require('node:vm'),{execFileSync}=require('node:child_process');
function runtime(ref){
 const read=file=>ref?execFileSync('git',['show',ref+':'+file],{encoding:'utf8',maxBuffer:8*1024*1024}):fs.readFileSync(file,'utf8');
 const c=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams});
 for(const [,file]of read('index.html').matchAll(/<script defer src="([^"]+)"><\/script>/g))if(!['app.js','flow.js','startup.js'].includes(file))vm.runInContext(read(file),c,{filename:file});
 return c;
}
function snapshot(c){return JSON.parse(vm.runInContext(`JSON.stringify(themes.map((t,i)=>{
 globalThis.activeTheme=i;
 return {id:t.id,name:t.name,hidden:!!t.catalogHidden,plans:buildPlans(t.id,0).map(({stops,legs,...p})=>p),works:worksForTheme(t.id),points:places.filter(p=>p.themes.includes(t.id)).map(p=>({id:p.id,name:p.name,en:p.en,lon:p.lon,lat:p.lat,country:p.country,region:p.region,desc:p.desc,type:p.type,source:p.source,facts:p.facts,sourceLabel:p.sourceLabel,coordinateNote:p.coordinateNote,essay:placeEssays[p.id],reviewedReading:typeof qualityReadingFor==='function'&&qualityReadingFor(p,t.id)?{id:p.id,theme:t.id,title:qualityReadingFor(p,t.id).title,paragraphs:qualityReadingFor(p,t.id).paragraphs.map(({heading,text})=>({heading,text})),sources:qualityReadingFor(p,t.id).sourceKeys.map(k=>qualityReadingPack.sources[k])}:null,essayApplies:(typeof qualityReadingFor==='function'&&!!qualityReadingFor(p,t.id))||!(typeof atlasContextByPlace!=='undefined'&&atlasContextByPlace.has(p.id))||!!atlasCurrentContext(atlasContextByPlace.get(p.id))||!!atlasContextByPlace.get(p.id)?.base.essay,context:atlasContextByPlace.get(p.id)?.contexts.get(t.id),photo:editorialPlacePhotos[p.id],media:photoLibrary[editorialPlacePhotos[p.id]]})),media:themeMedia[t.id]};
}))`,c));}
function assertReadingPreserved(old,now,theme){
 const assert=require('node:assert/strict'),label=theme+'/'+old.id;
 // The original artist context is still independently compared in its own theme.
 // Only the demonstrably unrelated getter fallback is removed from this theme.
 if(old.essayApplies===false&&old.essay){
  if(now.reviewedReading){
   const row=now.reviewedReading;assert.equal(row.id,now.id,label+' wrong reviewed place');assert.equal(row.theme,theme,label+' wrong reviewed theme');assert.equal(now.essayApplies,true,label+' research must apply');assert.equal(now.essay?.title,row.title,label+' wrong researched title');
   for(const p of row.paragraphs)assert.ok(now.essay?.paragraphs.some(q=>q.heading===p.heading&&q.text===p.text),label+' missing researched paragraph');
   for(const s of row.sources)assert.ok(now.essay?.sources.some(q=>JSON.stringify(q)===JSON.stringify(s)),label+' missing research evidence');
  }else{assert.equal(now.essayApplies,false,label+' changed context applicability');assert.equal(now.essay,undefined,label+' unrelated reading still displayed');}
  return;
 }
 for(const p of old.essay?.paragraphs||[]){
  const kept=now.essay?.paragraphs.some(q=>q.heading===p.heading&&q.text.includes(p.text));
  if(kept)continue;
  // A region map's generated overview is editorial framing, not an artist's
  // source paragraph. Approved replacements retain its exact prior text in the
  // consolidation record and must display the new, complete region overview.
  const file='data/theme-review/catalogue-consolidation.json',pack=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)):null;
  const reframed=pack?.groups.find(g=>g.id===theme&&g.previousOverviews?.includes(p.text));
  assert.ok(p.heading==='与其他地点怎样对读'&&reframed&&now.essay?.paragraphs.some(q=>q.heading===p.heading&&q.text.includes(reframed.intro)),label+' lost applicable paragraph');
 }
 for(const s of old.essay?.sources||[])assert.ok(now.essay?.sources.some(q=>JSON.stringify(q)===JSON.stringify(s)),label+' lost applicable source');
 if(old.essayApplies===true&&old.essay)assert.equal(now.essayApplies,true,label+' applicable reading lost');
 for(const id of old.essay?.related||[])assert.ok(now.essay?.related.includes(id),label+' lost related place');
}
module.exports={runtime,snapshot,assertReadingPreserved};

// Source-bound coordinate repairs are additive corrections, not lost content.
// Every other field remains subject to the original strict preservation check.
function assertPlaceDataPreserved(now,old,label){
 const assert=require('node:assert/strict'),s=require('../data/unesco-coordinate-supplements.json')[old.id.replace(/^wh-/, '')];
 const expected={...old};
 if(s&&old.lon==null&&old.lat==null){
  assert.equal(now.lon,s.lon,label+' verified longitude');assert.equal(now.lat,s.lat,label+' verified latitude');
  assert.equal(now.coordinateNote,'按 UNESCO '+s.retrieved+' 数据，以'+(s.component||'首个组成部分')+'示意定位；共 '+s.componentCount+' 个官方坐标，不代表完整遗产边界或导航入口。',label+' coordinate provenance');
  Object.assign(expected,{lon:now.lon,lat:now.lat,coordinateNote:now.coordinateNote});
 }
 assert.deepEqual(now,expected,label);
}
module.exports.assertPlaceDataPreserved=assertPlaceDataPreserved;

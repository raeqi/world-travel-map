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
 return {id:t.id,name:t.name,hidden:!!t.catalogHidden,plans:buildPlans(t.id,0).map(({stops,legs,...p})=>p),works:worksForTheme(t.id),points:places.filter(p=>p.themes.includes(t.id)).map(p=>({id:p.id,name:p.name,en:p.en,lon:p.lon,lat:p.lat,country:p.country,region:p.region,desc:p.desc,type:p.type,source:p.source,facts:p.facts,sourceLabel:p.sourceLabel,coordinateNote:p.coordinateNote,essay:placeEssays[p.id],context:atlasContextByPlace.get(p.id)?.contexts.get(t.id),photo:editorialPlacePhotos[p.id],media:photoLibrary[editorialPlacePhotos[p.id]]})),media:themeMedia[t.id]};
}))`,c));}
module.exports={runtime,snapshot};

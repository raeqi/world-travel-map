'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('hero-carousel.js','utf8');
function fixture(storage){
 const groups=['nature','art','paths','exchange','drives'];
 const themes=groups.flatMap(group=>Array.from({length:4},(_,i)=>({id:group+'-'+i,name:group+' '+i,story:'A registered place to explore.'})));
 const themeMedia=Object.fromEntries(themes.map(t=>[t.id,{photo:t.id}]));
 const photoLibrary=Object.fromEntries(themes.map(t=>[t.id,{license:'CC0',path:'assets/'+t.id+'.webp'}]));
 const discoveryMeta=Object.fromEntries(themes.map(t=>[t.id,[groups.find(g=>t.id.startsWith(g)),[],'']]));
 const c=vm.createContext({themes,themeMedia,photoLibrary,discoveryMeta,discoveryGroups:groups.map(g=>[g,g]),artWorks:[],photoPath:key=>photoLibrary[key].path,buildPlans:()=>[],localStorage:storage});
 vm.runInContext(source,c);return c;
}
function evaluate(c,expression){return JSON.parse(vm.runInContext('JSON.stringify('+expression+')',c))}
test('recommendations balance interests and avoid duplicate source images',()=>{
 const c=fixture({getItem:()=>null,setItem(){}}),pool=evaluate(c,'heroRecommendationPool()');
 c.pool=pool;c.previous=[];
 const chosen=evaluate(c,'chooseHeroRecommendations(pool,previous,6,()=>.37)');
 assert.equal(chosen.length,6);assert.equal(new Set(chosen.map(x=>x.theme)).size,6);
 assert.equal(new Set(chosen.map(x=>x.mediaKey)).size,6);
 assert.equal(new Set(chosen.map(x=>x.group)).size,5);
 c.previous=chosen.map(x=>x.theme);
 const next=evaluate(c,'chooseHeroRecommendations(pool,previous,6,()=>.37)');
 assert.ok(next.every(x=>!c.previous.includes(x.theme)),'fresh options exist in every group');
 assert.notEqual(next[0].theme,chosen[0].theme);
 assert.equal(pool.length,20,'selection does not mutate the candidate pool');
});
test('shared photographs are selected only once, with graceful small/empty pools',()=>{
 const c=fixture({getItem:()=>null,setItem(){}});
 c.pool=[{theme:'a',photo:'same',group:'nature'},{theme:'b',photo:'same',group:'art'},{theme:'c',photo:'other',group:'paths'}];
 assert.equal(evaluate(c,'chooseHeroRecommendations(pool,[],6,()=>.2)').length,2);
 assert.equal(evaluate(c,'chooseHeroRecommendations([],[],6)').length,0);
 assert.equal(evaluate(c,'chooseHeroRecommendations(pool,null,1)').length,1);
});
test('one document keeps its selection; the next document rotates away from history',()=>{
 let value=null,writes=0;
 const storage={getItem:()=>value,setItem:(key,next)=>{value=next;writes++}};
 const first=fixture(storage);vm.runInContext('prepareHeroRecommendations()',first);
 const before=evaluate(first,'heroSlides.map(s=>s.theme)');
 vm.runInContext('prepareHeroRecommendations()',first);
 assert.deepEqual(evaluate(first,'heroSlides.map(s=>s.theme)'),before);assert.equal(writes,1);
 const second=fixture(storage);vm.runInContext('prepareHeroRecommendations()',second);
 const after=evaluate(second,'heroSlides.map(s=>s.theme)');
 assert.equal(after.length,6);assert.ok(after.some(id=>!before.includes(id)));assert.equal(writes,2);
});
test('missing licences, illustrations and inaccessible browser storage are safe',()=>{
 const c=fixture({getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}});
 delete c.photoLibrary['nature-0'].license;c.photoLibrary['art-0'].illustration=true;
 const pool=evaluate(c,'heroRecommendationPool()');assert.equal(pool.length,18);
 assert.ok(!pool.some(s=>['nature-0','art-0'].includes(s.theme)));
 assert.doesNotThrow(()=>vm.runInContext('prepareHeroRecommendations()',c));
 assert.equal(evaluate(c,'heroSlides.length'),6);
});

'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),zlib=require('node:zlib');
const {runtime}=require('../scripts/theme-audit-runtime.cjs'),{snapshot,audit}=require('../scripts/content-quality-runtime.cjs');
const {combinedPack,loadPacks,generatedData}=require('../scripts/content-quality-packs.cjs');
const pack=combinedPack(),reviews=require('../qa/content-quality/manual-reviews.json').reviews;
const legacy={...require('../qa/content-audit.json'),originalContexts:require('../qa/content-quality/legacy-candidates.json').entries};
test('audit includes every production dataset and all theme-specific contexts, including hidden legacy routes',()=>{
 const r=audit({reviews,legacy}),expected=require('../data/theme-review/catalogue-consolidation.json').expectedRuntime;for(const key of ['places','internalThemes','visibleThemes','plans','placeThemeContexts'])assert.equal(r.summary[key],expected[key],key);
 for(const file of ['panamerican.js','cultural-atlas.js','regional-theme-expansion.js','remaining-thirty-data.js','natural-atlas.js','quality-readings.js'])assert.ok(r.scripts.some(s=>s.file===file&&s.executed),file);
 assert.ok(r.plans.some(p=>!p.visible));assert.ok(r.entries.some(p=>p.theme==='patagonia-nature'));assert.ok(r.entries.some(p=>p.id==='tea-rasuwa'));
 assert.equal(r.summary.staleReviews,0);assert.equal(r.summary.manualResearchedPlaces,143);assert.equal(r.summary.manualUsefulConcisePlaces,5);
 const venice=r.legacyComparison.find(p=>p.id==='silk-venice');assert.equal(venice.assessment,'still-automatic-candidate');assert.deepEqual(venice.originalThemes,['silk']);assert.ok(venice.otherExpandedThemes.includes('turner'));
});
test('a manual review expires when its source/text fingerprint differs',()=>{
 const altered=reviews.map((r,i)=>i? r:{...r,contentHash:'0'.repeat(64)}),r=audit({reviews:altered,legacy});assert.equal(r.summary.staleReviews,1);assert.equal(r.entries.find(p=>p.id===reviews[0].id&&p.theme===reviews[0].theme).status,'stale-review');
});
test('shared cities show only relevant readings while every original cultural context remains available',()=>{
 const c=runtime();vm.runInContext(`globalThis.activeTheme=themes.findIndex(t=>t.id==='mozart');`,c);assert.match(vm.runInContext("placeEssays['mozart-prague'].title",c),/等级剧院/);assert.ok(!vm.runInContext("JSON.stringify(placeEssays['mozart-prague'])",c).includes('卡夫卡'));
 vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='kafka')",c);assert.match(vm.runInContext("placeEssays['mozart-prague'].title",c),/卡夫卡/);
 vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='nature')",c);assert.equal(vm.runInContext("placeEssays['wh-547']",c),undefined);
 vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='huang-binhong')",c);assert.match(vm.runInContext("placeEssays['wh-547'].title",c),/黄宾虹/);
 assert.equal(audit({legacy}).summary.foreignThemeFallbackContexts,0);
});
test('research is source-bound and preserves catalogue summaries, links, media and itinerary IDs',()=>{
 const original=JSON.parse(zlib.gunzipSync(fs.readFileSync('qa/content-quality/baseline-2026-11-18.json.gz'))),now=snapshot(),key=r=>r.theme+'/'+r.id,byKey=new Map(now.contexts.map(r=>[key(r),r]));
 for(const old of original.entries){const row=byKey.get(key(old));assert.ok(row,key(old));assert.equal(row.originalSummary,old.summary,key(old)+' catalogue text');assert.equal(row.source,old.source);assert.equal(row.imageKey,old.imageKey);assert.ok(old.routeIds.every(id=>row.routeIds.includes(id)),key(old)+' retained itinerary IDs');if(!old.foreignThemeFallback)for(const source of old.essay?.sources||[])assert.ok(row.essay?.sources.some(s=>JSON.stringify(s)===JSON.stringify(source)),key(old)+' original source object');}
 assert.equal(new Set(pack.readings.map(r=>r.id)).size,143);assert.equal(new Set(pack.readings.map(r=>r.theme)).size,11);

 for(const r of pack.readings){assert.ok(r.summary&&r.paragraphs.length>=2);for(const p of r.paragraphs)for(const key of p.sourceKeys)assert.ok(r.sourceKeys.includes(key)&&pack.sources[key]?.url.startsWith('https://'));const row=byKey.get(key(r));assert.equal(row.summary,r.summary);assert.ok(row.essay.sources.every(s=>s.title&&s.url));}
 assert.ok(pack.readings.find(r=>r.id==='xintan').summary.includes('1985'));assert.ok(pack.readings.find(r=>r.id==='kumano-hongu').summary.includes('1889'));assert.ok(pack.readings.find(r=>r.id==='nc500-johnogroats').summary.includes('Dunnet Head'));
 const literal=fs.readFileSync('quality-readings-data.js','utf8');assert.equal(literal,generatedData());
});

test('preservation guards reject loss of applicable text while removing only a proven foreign-theme fallback',()=>{
 const {assertReadingPreserved}=require('../scripts/theme-audit-runtime.cjs');
 const essay={paragraphs:[{heading:'local',text:'original detail'}],sources:[{title:'evidence',url:'https://example.org'}],related:['next']};
 assert.throws(()=>assertReadingPreserved({id:'p',essayApplies:true,essay},{id:'p'},'original'),/lost applicable paragraph/);
 assert.doesNotThrow(()=>assertReadingPreserved({id:'p',essayApplies:false,essay},{id:'p',essayApplies:false},'unrelated'));
 assert.throws(()=>assertReadingPreserved({id:'p',essayApplies:false,essay},{id:'p',essayApplies:false,essay},'unrelated'),/unrelated reading still displayed/);
});

test('tea batch is factual in scope and cannot silently clear a deferred research gap',()=>{
 const batch=loadPacks().find(p=>p.batch.endsWith('-3'));assert.equal(batch.readings.length,19);
 assert.ok(batch.readings.every(r=>r.theme==='tea'));
 assert.ok(batch.readings.find(r=>r.id==='tea-nuwakot').summary.includes('预备清单'));
 assert.ok(batch.readings.find(r=>r.id==='tea-kalimpong').summary.includes('则里拉'));
 assert.ok(batch.readings.find(r=>r.id==='tea-nanjian').summary.includes('另行前往'));
 const r=audit({reviews,legacy});assert.equal(r.summary.unresolvedCandidatePlaces,91);
 assert.equal(r.entries.find(p=>p.id==='tea-rasuwa'&&p.theme==='tea').status,'needs-research');
 assert.equal(r.summary.staleReviews,0);
});

test('shared research layers preserve every other person context and allow only source-bound replacements',()=>{
 const c=runtime();
 vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='mozart')",c);assert.match(vm.runInContext("placeEssays['mozart-prague'].title",c),/等级剧院/);
 vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='kafka')",c);assert.match(vm.runInContext("placeEssays['mozart-prague'].title",c),/卡夫卡/);assert.ok(!vm.runInContext("JSON.stringify(placeEssays['mozart-prague'])",c).includes('1787年10月29日'));
 const fourth=loadPacks().find(p=>p.batch.endsWith('-4'));assert.equal(fourth.readings.filter(r=>r.theme==='mozart').length,8);assert.equal(fourth.readings.filter(r=>r.theme==='francigena').length,16);
 assert.ok(fourth.readings.find(r=>r.id==='francigena-canterbury').summary.includes('返程'));assert.ok(fourth.readings.find(r=>r.id==='francigena-lausanne').paragraphs[1].text.includes('2027'));
 const {assertReadingPreserved}=require('../scripts/theme-audit-runtime.cjs'),essay={title:'researched',paragraphs:[{heading:'place',text:'specific'}],sources:[{title:'evidence',url:'https://example.org'}]},row={id:'p',theme:'topic',title:essay.title,paragraphs:essay.paragraphs,sources:essay.sources};
 assert.doesNotThrow(()=>assertReadingPreserved({id:'p',essayApplies:false,essay:{title:'wrong author'}},{id:'p',essayApplies:true,essay,reviewedReading:row},'topic'));
 assert.throws(()=>assertReadingPreserved({id:'p',essayApplies:false,essay:{title:'wrong author'}},{id:'p',essayApplies:true,essay,reviewedReading:{...row,theme:'other'}},'topic'),/wrong reviewed theme/);
});


test('Route 66 distinguishes original structures, later artworks, present housing and symbolic endpoints',()=>{
 const fifth=loadPacks().find(p=>p.batch.endsWith('-5')),byId=new Map(fifth.readings.map(r=>[r.id,r]));assert.equal(fifth.readings.length,15);assert.ok(fifth.readings.every(r=>r.theme==='route66'));
 assert.match(byId.get('route66-springfield').summary,/伊利诺伊/);assert.match(byId.get('route66-springfield').paragraphs[1].text,/桥已移除/);
 assert.match(byId.get('route66-joplin').paragraphs[1].text,/Anthony Benton Gude/);assert.match(byId.get('route66-joplin').paragraphs[1].text,/2010年/);
 assert.match(byId.get('route66-albuquerque').summary,/不对公众开放/);assert.match(byId.get('route66-santamonica').summary,/象征性/);
 const c=runtime();vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='route66')",c);assert.match(vm.runInContext("JSON.stringify(placeEssays['route66-albuquerque'])",c),/建筑也会改变用途/);
});


test('Nakasendo and Viking readings separate reconstructions, institutions, maintenance and seasonal access',()=>{
 const sixth=loadPacks().find(p=>p.batch.endsWith('-6')),byId=new Map(sixth.readings.map(r=>[r.id,r]));assert.equal(sixth.readings.length,17);assert.equal(sixth.readings.filter(r=>r.theme==='nakasendo').length,9);assert.equal(sixth.readings.filter(r=>r.theme==='viking').length,8);
 assert.match(byId.get('nakasendo-tsumago').summary,/1995/);assert.match(byId.get('nakasendo-tsumago').summary,/1877/);assert.match(byId.get('nakasendo-suhara').paragraphs[1].text,/2027年秋/);
 assert.match(byId.get('viking-birka').summary,/Adelsö/);assert.match(byId.get('viking-birka').paragraphs[1].text,/2027年5月5日/);assert.match(byId.get('viking-thingvellir').paragraphs[1].text,/确切位置并未确定/);
 const c=runtime();vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='hokusai')",c);assert.ok(!vm.runInContext("JSON.stringify(placeEssays['nakasendo-tokyo'])",c).includes('妻木赖黄'));vm.runInContext("activeTheme=themes.findIndex(t=>t.id==='nakasendo')",c);assert.match(vm.runInContext("JSON.stringify(placeEssays['nakasendo-tokyo'])",c),/妻木赖黄/);
});


test('French Way research distinguishes a reliquary legend, relocated stonework and preserved route alternatives',()=>{
 const seventh=loadPacks().find(p=>p.batch.endsWith('-7')),byId=new Map(seventh.readings.map(r=>[r.id,r]));assert.equal(seventh.readings.length,12);assert.ok(seventh.readings.every(r=>r.theme==='camino'));
 assert.match(byId.get('camino-roncesvalles').summary,/圣物匣/);assert.match(byId.get('camino-roncesvalles').summary,/14世纪/);assert.match(byId.get('camino-navarrete').summary,/1887/);
 assert.match(byId.get('camino-saint-jean').paragraphs[1].text,/Valcarlos/);assert.match(byId.get('camino-logrono').paragraphs[0].text,/市政府重要文书/);
 assert.ok(pack.sources['cf-najera'].method.includes('does not adopt that date'));
});


test('Castilla y León separates living villages, moved collections, archaeological access and later industry',()=>{
 const p=loadPacks().find(p=>p.batch.endsWith('-8')),by=new Map(p.readings.map(r=>[r.id,r]));assert.equal(p.readings.length,21);
 assert.match(by.get('camino-burgo-ranero').summary,/现藏莱昂/);assert.match(by.get('camino-ponferrada').summary,/1920—1971/);assert.match(by.get('camino-atapuerca').summary,/CAREX/);
 assert.match(by.get('camino-fromista').paragraphs[1].text,/四个连续椭圆闸室/);assert.match(by.get('camino-san-martin').paragraphs[1].text,/Mazarife是另一走向/);
 assert.ok(!by.get('camino-ponferrada').paragraphs[0].text.includes('12世纪初'));
});
test('Galicia keeps relocation, reused medieval fabric, regional food and museum entrances distinct',()=>{
 const p=loadPacks().find(p=>p.batch.endsWith('-9')),by=new Map(p.readings.map(r=>[r.id,r]));assert.equal(p.readings.length,10);
 assert.match(by.get('camino-melide').summary,/1949/);assert.match(by.get('camino-portomarin').summary,/1960年代/);assert.match(by.get('camino-cebreiro').paragraphs[1].text,/Campelo作储藏/);
 assert.match(by.get('camino-santiago').paragraphs[1].text,/原西班牙银行/);assert.match(by.get('camino-pedrouzo').paragraphs[0].text,/底部封闭/);
 assert.ok(by.get('camino-triacastela').related.includes('camino-arzua'));assert.ok(by.get('camino-arzua').related.includes('camino-triacastela'));
 const base=JSON.parse(zlib.gunzipSync(fs.readFileSync('qa/content-quality/baseline-2026-11-18.json.gz'))),now=snapshot();
 for(const old of base.plans.filter(r=>r.theme==='camino'))assert.deepEqual(now.plans.find(r=>r.id===old.id)?.stops,old.stops);
});

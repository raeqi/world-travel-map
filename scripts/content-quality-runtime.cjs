'use strict';
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {runtime}=require('./theme-audit-runtime.cjs');
const isResearched=state=>/^researched-batch-\d+$/.test(state||'');
const resolved=state=>state==='useful-concise'||isResearched(state);
const hash=v=>crypto.createHash('sha256').update(typeof v==='string'?v:JSON.stringify(v)).digest('hex');
function snapshot(){
 const html=fs.readFileSync('index.html','utf8');
 const scripts=[...html.matchAll(/<script defer src="([^"]+)"><\/script>/g)].map(m=>m[1]);
 const c=runtime();
 const data=JSON.parse(vm.runInContext(`JSON.stringify((()=>{
  const contexts=[],plans=[];
  for(let ti=0;ti<themes.length;ti++){
   globalThis.activeTheme=ti;const theme=themes[ti],routes=buildPlans(theme.id,0);plans.push(...routes.map(p=>({id:p.id,theme:theme.id,name:p.name,visible:!theme.catalogHidden,stops:p.stops.map(s=>s.id)})));
   for(const p of places.filter(p=>p.themes.includes(theme.id))){
    const essay=placeEssays[p.id],record=typeof atlasContextByPlace!=='undefined'?atlasContextByPlace.get(p.id):null;
    const relevant=record?!!atlasCurrentContext(record):false;
    const fallback=!!(record&&!relevant&&!record.base.essay&&essay);
    contexts.push({id:p.id,theme:theme.id,name:p.name,visible:!theme.catalogHidden,summary:(typeof researchedPlaceSummary==='function'?researchedPlaceSummary(p):p.desc)||'',originalSummary:p.desc||'',source:p.source||'',essay:essay?{title:essay.title,paragraphs:essay.paragraphs,sources:essay.sources}:null,foreignThemeFallback:fallback,routeIds:routes.filter(r=>r.stops.some(s=>s.id===p.id)).map(r=>r.id),coordinateAvailable:Number.isFinite(p.lon)&&Number.isFinite(p.lat),imageKey:editorialPlacePhotos[p.id]||null});
   }
  }
  return {places:places.map(p=>({id:p.id,name:p.name,themes:p.themes})),themes:themes.map(t=>({id:t.id,name:t.name,visible:!t.catalogHidden})),contexts,plans};
 })())`,c));
 const paragraphUses=new Map();for(const row of data.contexts)for(const p of row.essay?.paragraphs||[]){const k=(p.text||'').trim();if(k)paragraphUses.set(k,new Set([...(paragraphUses.get(k)||[]),row.id]));}
 for(const row of data.contexts){
  row.contentHash=hash({summary:row.summary,source:row.source,essay:row.essay});
  const paragraphs=row.essay?.paragraphs||[];
  row.summaryCharacters=row.summary.trim().length;row.essayCharacters=paragraphs.reduce((n,p)=>n+(p.text||'').length,0);
  row.repeatedParagraphs=paragraphs.filter(p=>(paragraphUses.get((p.text||'').trim())?.size||0)>3).length;
  row.placeSpecificEssayCharacters=row.foreignThemeFallback?0:paragraphs.filter(p=>(paragraphUses.get((p.text||'').trim())?.size||0)<=3).reduce((n,p)=>n+(p.text||'').length,0);
  row.signals=[...(!row.summary.trim()?['empty-summary']:[]),...(!/^https:\/\//.test(row.source)?['missing-https-source']:[]),...(row.summaryCharacters<70?['short-summary']:[]),...(!row.essay?['no-expanded-reading']:[]),...(row.foreignThemeFallback?['foreign-theme-reading-fallback']:[]),...(row.repeatedParagraphs?['shared-paragraph-review']:[])];
  row.automaticCandidate=!!(!row.summary.trim()||!/^https:\/\//.test(row.source)||row.foreignThemeFallback||(row.summaryCharacters<70&&row.placeSpecificEssayCharacters===0));
 }
 return {scripts:scripts.map(file=>({file,sha256:hash(fs.readFileSync(file,'utf8')),executed:!['app.js','flow.js','startup.js'].includes(file)})),...data};
}
function audit({reviews=[],legacy,baseline='27bd4fe441008c13a05d34beaf725923575812d1'}={}){
 const data=snapshot(),byKey=new Map(reviews.map(r=>[r.theme+'/'+r.id,r]));
 const entries=data.contexts.map(row=>{
  const review=byKey.get(row.theme+'/'+row.id),current=review?.contentHash===row.contentHash;
  return {...row,manualReview:review?{state:current?review.state:'stale-review',reason:review.reason,checked:review.checked,sources:review.sources||[],contentHash:review.contentHash}:null,priority:row.routeIds.length?(row.visible?'visible-itinerary':'legacy-itinerary'):'catalogue',status:review&&!current?'stale-review':current?review.state:row.automaticCandidate?'candidate-not-manually-verified':'not-manually-verified'};
 });
 const unique=filter=>new Set(entries.filter(filter).map(r=>r.id)).size;
 const old=(legacy?.entries||[]).filter(r=>r.flags?.includes('short-description-review')&&!r.deepReading).map(r=>r.id);
 const legacyComparison=old.map(id=>{const originalThemes=legacy?.originalContexts?.find(r=>r.id===id)?.themes;const allRows=entries.filter(r=>r.id===id),rows=allRows.filter(r=>!originalThemes||originalThemes.includes(r.theme));return {id,present:rows.length>0,originalThemes:originalThemes||null,otherExpandedThemes:allRows.filter(r=>!rows.includes(r)&&r.placeSpecificEssayCharacters>0).map(r=>r.theme),contexts:rows.map(r=>({theme:r.theme,status:r.status,expandedInThisTheme:r.placeSpecificEssayCharacters>0,short:r.summaryCharacters<70,foreignThemeFallback:r.foreignThemeFallback})),assessment:!rows.length?'missing-from-runtime':rows.some(r=>isResearched(r.status))?rows.find(r=>isResearched(r.status)).status:rows.some(r=>r.status==='useful-concise')?'useful-concise':rows.some(r=>r.foreignThemeFallback)?'theme-relevance-needs-review':rows.some(r=>r.placeSpecificEssayCharacters>0)?'expanded-since-old-snapshot-not-manually-reverified':rows.some(r=>r.automaticCandidate)?'still-automatic-candidate':'no-longer-short-not-manually-reverified'};});
 const plans=data.plans.map(p=>({...p,contexts:p.stops.map(id=>{const r=entries.find(r=>r.id===id&&r.theme===p.theme);return {id,status:r?.status,expanded:r?.placeSpecificEssayCharacters>0,candidate:r?.automaticCandidate,foreignThemeFallback:r?.foreignThemeFallback};})}));
 const summary={visibleItineraryUnresolvedCandidatePlaces:unique(r=>r.visible&&r.routeIds.length&&r.automaticCandidate&&!resolved(r.status)),unresolvedCandidatePlaces:unique(r=>r.automaticCandidate&&!resolved(r.status)),places:data.places.length,internalThemes:data.themes.length,visibleThemes:data.themes.filter(t=>t.visible).length,plans:plans.length,placeThemeContexts:entries.length,plannedPlaces:new Set(plans.flatMap(p=>p.stops)).size,automaticCandidatePlaces:unique(r=>r.automaticCandidate),automaticCandidateContexts:entries.filter(r=>r.automaticCandidate).length,visibleItineraryCandidatePlaces:unique(r=>r.visible&&r.routeIds.length&&r.automaticCandidate),foreignThemeFallbackContexts:entries.filter(r=>r.foreignThemeFallback).length,manualReviewedContexts:entries.filter(r=>r.manualReview&&r.status!=='stale-review').length,manualResearchedPlaces:unique(r=>isResearched(r.status)),manualUsefulConcisePlaces:unique(r=>r.status==='useful-concise'),manualNeedsResearchPlaces:unique(r=>r.status==='needs-research'),staleReviews:entries.filter(r=>r.status==='stale-review').length,legacyCandidates:old.length,legacyComparisonCounts:Object.fromEntries([...new Set(legacyComparison.map(r=>r.assessment))].map(k=>[k,legacyComparison.filter(r=>r.assessment===k).length]))};
 return {schemaVersion:3,baseline,method:'All production data scripts in index order; every registered place/theme context. UI-only app/flow excluded. Signals are triage, not factual verdicts. Manual reviews are content-hash bound; sources not fetched automatically.',summary,scripts:data.scripts,themes:data.themes.map(t=>({...t,contexts:entries.filter(r=>r.theme===t.id).length,automaticCandidates:entries.filter(r=>r.theme===t.id&&r.automaticCandidate).length,manuallyReviewed:entries.filter(r=>r.theme===t.id&&r.manualReview&&r.status!=='stale-review').length})),legacyComparison,plans,entries};
}
module.exports={snapshot,audit,hash,isResearched};

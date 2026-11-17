'use strict';
// A route cover must depict one of its own stops. Theme covers are never fallbacks.
function routeMediaCandidates(plan){
 const candidates=[];
 for(const p of plan.stops){const key=placePhoto(p);if(key&&photoLibrary[key]&&!photoLibrary[key].illustration)candidates.push({key,placeId:p.id,caption:photoLibrary[key].title});for(const work of artWorks.filter(w=>w.placeId===p.id))candidates.push({key:work.key,placeId:p.id,caption:work.artist+'《'+work.title+'》 · '+work.subject})}
 return candidates.filter((x,i,a)=>a.findIndex(y=>y.key===x.key)===i);
}
let routeCoverAssignments=null;
function routeCoverChoice(plan){
 if(!routeCoverAssignments){
  routeCoverAssignments=new Map();const usage=new Map();
  const entries=themes.flatMap(t=>buildPlans(t.id,0)).map(p=>({id:p.id,candidates:routeMediaCandidates(p)}));
  // Give scarce, exact-stop images priority, then spread multi-image routes across their own stops.
  entries.sort((a,b)=>a.candidates.length-b.candidates.length||a.id.localeCompare(b.id));
  for(const entry of entries){const options=entry.candidates.slice().sort((a,b)=>(usage.get(a.key)||0)-(usage.get(b.key)||0)||a.key.localeCompare(b.key));if(options.length){routeCoverAssignments.set(entry.id,options[0]);usage.set(options[0].key,(usage.get(options[0].key)||0)+1)}}
 }
 return routeCoverAssignments.get(plan.id)||routeMediaCandidates(plan)[0];
}
function routeCover(plan){const m=routeCoverChoice(plan);if(m)return `<figure class="route-cover-photo" data-cover-place="${m.placeId}" data-cover-key="${m.key}">${mediaImage(m.key)}<figcaption>${escapeHTML(m.caption)}</figcaption></figure>`;const countries=[...new Set(plan.stops.map(p=>p.country))];return `<div class="route-cover-placeholder" role="img" aria-label="此行程暂未配对应地点影像"><small>地点导览</small><strong>${escapeHTML(countries.slice(0,2).join(' / '))}</strong><span>${plan.stops.length} 个地点</span><i aria-hidden="true">${plan.topology==='network'?'◇ · ◇ · ◇':'○ ─ ○ ─ ○'}</i></div>`}

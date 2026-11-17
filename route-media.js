'use strict';
// A route cover must depict one of its own stops. Theme covers are never fallbacks.
function routeMediaCandidates(plan){
 const candidates=[];
 for(const p of plan.stops){const key=placePhoto(p);if(key&&photoLibrary[key]&&!photoLibrary[key].illustration)candidates.push({key,placeId:p.id,caption:photoLibrary[key].title});for(const work of artWorks.filter(w=>w.placeId===p.id))candidates.push({key:work.key,placeId:p.id,caption:work.artist+'《'+work.title+'》 · '+work.subject})}
 return candidates.filter((x,i,a)=>a.findIndex(y=>y.key===x.key)===i);
}
function routeCover(plan){const candidates=routeMediaCandidates(plan);if(candidates.length){const hash=[...plan.id].reduce((n,c)=>n+c.charCodeAt(0),0),m=candidates[hash%candidates.length];return `<figure class="route-cover-photo" data-cover-place="${m.placeId}" data-cover-key="${m.key}">${mediaImage(m.key)}<figcaption>${escapeHTML(m.caption)}</figcaption></figure>`}const countries=[...new Set(plan.stops.map(p=>p.country))];return `<div class="route-cover-placeholder" role="img" aria-label="此行程暂未配对应地点影像"><small>地点导览</small><strong>${escapeHTML(countries.slice(0,2).join(' / '))}</strong><span>${plan.stops.length} 个地点</span><i aria-hidden="true">${plan.topology==='network'?'◇ · ◇ · ◇':'○ ─ ○ ─ ○'}</i></div>`}

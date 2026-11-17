'use strict';
// Recommendations only reuse registered themes, source images and existing routes.
const heroDefaultSlides=[
 {theme:'nakasendo',route:'nakasendo-short',photo:'nakasendo-photo',second:'nakasendo-print',label:'古道与宿场',title:'走进木曾的宿场',text:'妻笼与马笼，在版画与今日街道之间',action:'打开两宿行程'},
 {theme:'canal',route:'canal-jiangnan',photo:'canal-bridge',label:'水岸与城市',title:'沿运河，读江南',text:'从拱宸桥出发，认识水路与城市生活',action:'打开江南行程'},
 {theme:'impressionism',photo:'monet-london',label:'画作与风景',title:'光的旅行',text:'从画中地点，到作品的归处',action:'打开印象派地图'},
 {theme:'viking',route:'viking-northsea',photo:'viking-stone',label:'器物与交流',title:'石头里的北海往事',text:'海泽比、里伯与罗斯基勒的遗产网络',action:'打开遗产地点网络'},
 {theme:'nc500',route:'nc500-west',photo:'nc500-pass',label:'山海与公路',title:'在高地海岸停留',text:'山口、海湾与小镇，分段认识西海岸',action:'打开西海岸行程'},
 {theme:'parks',route:'utah-five',photo:'np-zion',label:'自然与地景',title:'走向犹他的红岩',text:'从锡安到峡谷，在国家公园之间慢游',action:'打开五园行程'}
];
const heroSlides=heroDefaultSlides.slice();
const heroHistoryKey='terra-mosaic-hero-v1';
let heroSelectionReady=false;
function heroRecommendationPool(){
 const curated=new Map(heroDefaultSlides.map(s=>[s.theme,s]));
 return themes.flatMap(theme=>{
  const specific=curated.get(theme.id),photo=specific?.photo||themeMedia[theme.id]?.photo,media=photoLibrary[photo];
  if(!photo||!media?.license||media.illustration)return [];
  const group=discoveryMeta[theme.id]?.[0]||'exchange';
  const slide=specific?{...specific}:{
   theme:theme.id,photo,
   label:discoveryGroups.find(([id])=>id===group)?.[1]||'探索世界',
   title:theme.name,text:theme.story,action:'打开主题地图'
  };
  if(slide.route&&!buildPlans(theme.id,0).some(p=>p.id===slide.route))delete slide.route;
  return [{...slide,group,mediaKey:photoPath(photo),artwork:typeof artWorks!=='undefined'&&artWorks.some(w=>w.key===photo)}];
 });
}
function chooseHeroRecommendations(pool,previous=[],limit=6,random=Math.random){
 const history=Array.isArray(previous)?previous:[],prior=new Set(history),candidates=pool.slice(),chosen=[];
 for(let i=candidates.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[candidates[i],candidates[j]]=[candidates[j],candidates[i]]}
 function take(group){
  const available=candidates.filter(s=>(!group||s.group===group)&&!chosen.some(x=>x.theme===s.theme||(x.mediaKey||x.photo)===(s.mediaKey||s.photo)));
  const next=available.find(s=>!prior.has(s.theme))||available[0];
  if(next)chosen.push(next);
 }
 for(const group of ['nature','art','paths','exchange','drives']){if(chosen.length<limit)take(group)}
 while(chosen.length<limit){const count=chosen.length;take();if(chosen.length===count)break}
 for(let i=chosen.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[chosen[i],chosen[j]]=[chosen[j],chosen[i]]}
 if(chosen.length>1&&chosen[0].theme===history[0]){[chosen[0],chosen[1]]=[chosen[1],chosen[0]]}
 return chosen;
}
function prepareHeroRecommendations(){
 if(heroSelectionReady)return;
 let previous=[];
 try{const stored=JSON.parse(localStorage.getItem(heroHistoryKey)||'[]');if(Array.isArray(stored))previous=stored.filter(x=>typeof x==='string').slice(0,6)}catch{}
 const next=chooseHeroRecommendations(heroRecommendationPool(),previous);
 if(next.length){heroSlides.splice(0,heroSlides.length,...next);heroPreferences.index=0}
 heroSelectionReady=true;
 try{localStorage.setItem(heroHistoryKey,JSON.stringify(heroSlides.map(s=>s.theme)))}catch{}
}

const heroPreferences={index:0,paused:false};
let heroCleanup=null;
function destroyHeroCarousel(){if(heroCleanup){heroCleanup();heroCleanup=null}}
function heroCarouselHTML(){prepareHeroRecommendations();return `<section class="hero-carousel" role="region" aria-roledescription="轮播" aria-label="不同主题的旅行推荐"><div class="hero-slides" aria-live="off">${heroSlides.map((s,i)=>`<div class="hero-slide hero-slide-${s.theme}${s.artwork?' hero-slide-artwork':''}" role="group" aria-roledescription="幻灯片" aria-label="${i+1} / ${heroSlides.length}：${escapeHTML(s.title)}" ${i===heroPreferences.index?'':'hidden'}><button class="discovery-feature" data-hero-open="${i}" aria-label="${escapeHTML(s.action)}：${escapeHTML(s.title)}"><div class="hero-visual">${mediaImage(s.photo,i===heroPreferences.index?'fetchpriority="high"':'loading="lazy"')}${s.second?`<div class="hero-archival">${mediaImage(s.second)}<small>广重笔下的妻笼</small></div>`:''}${s.theme==='viking'?'<span class="hero-object-label" aria-hidden="true">海泽比<br>符文石</span>':''}</div><span class="hero-caption"><small>${escapeHTML(s.label)}<b>${String(i+1).padStart(2,'0')} / ${String(heroSlides.length).padStart(2,'0')}</b></small><strong>${escapeHTML(s.title)}</strong><i>${escapeHTML(s.text)}</i><em>${escapeHTML(s.action)} ↗</em></span></button></div>`).join('')}</div><div class="hero-controls"><button class="hero-play" type="button" aria-label="暂停自动播放">Ⅱ</button><div class="hero-dots" role="group" aria-label="选择推荐">${heroSlides.map((s,i)=>`<button type="button" data-hero-dot="${i}" aria-label="显示第 ${i+1} 项：${escapeHTML(s.title)}" ${i===heroPreferences.index?'aria-current="true"':''}><span></span></button>`).join('')}</div><div class="hero-arrows"><button type="button" data-hero-step="-1" aria-label="上一项推荐">←</button><button type="button" data-hero-step="1" aria-label="下一项推荐">→</button></div></div><span class="hero-announcement sr-only" role="status" aria-live="polite" aria-atomic="true"></span></section>`}
function mountHeroCarousel(){
 destroyHeroCarousel();const root=document.querySelector('.hero-carousel');if(!root)return;
 const motion=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
 const slides=[...root.querySelectorAll('.hero-slide')],dots=[...root.querySelectorAll('[data-hero-dot]')],play=root.querySelector('.hero-play');
 let timer=null,hovered=false,onscreen=true,disposed=false,keyboardFocus=false,lastInput="keyboard";
 function cancel(){if(timer!==null){clearTimeout(timer);timer=null}}
 function schedule(){cancel();if(!disposed&&!heroPreferences.paused&&!motion.matches&&!hovered&&!keyboardFocus&&onscreen&&!document.hidden&&document.body.dataset.view==='catalog')timer=setTimeout(()=>{timer=null;show(heroPreferences.index+1,false)},8000)}
 function update(){
  // Warm the current and following image before the next automatic change.
  for(const index of [heroPreferences.index,(heroPreferences.index+1)%slides.length])slides[index].querySelectorAll('img').forEach(img=>{img.loading='eager'});
  root.dataset.autoplay=motion.matches?'reduced':heroPreferences.paused?'paused':hovered?'hover-paused':keyboardFocus?'focus-paused':'playing';
  play.disabled=motion.matches;play.textContent=heroPreferences.paused?'▷':'Ⅱ';play.setAttribute('aria-label',motion.matches?'系统已设置减少动态效果，自动播放已关闭':heroPreferences.paused?'播放自动轮播':'暂停自动播放');
 }
 function announce(text){root.querySelector('.hero-announcement').textContent=text}
 function show(index,manual){
  heroPreferences.index=(index+slides.length)%slides.length;
  slides.forEach((s,i)=>s.hidden=i!==heroPreferences.index);dots.forEach((d,i)=>{if(i===heroPreferences.index)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current')});
  if(manual)announce(`第 ${heroPreferences.index+1} 项，共 ${slides.length} 项：${heroSlides[heroPreferences.index].title}`);
  update();schedule();
 }
 root.onclick=e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b===play){heroPreferences.paused=!heroPreferences.paused;keyboardFocus=false;announce(heroPreferences.paused?'自动播放已暂停':'自动播放已开启');update();schedule()}
  if(b.dataset.heroStep)show(heroPreferences.index+Number(b.dataset.heroStep),true);
  if(b.dataset.heroDot!==undefined)show(Number(b.dataset.heroDot),true);
  if(b.dataset.heroOpen!==undefined){const s=heroSlides[Number(b.dataset.heroOpen)];openDiscoveryTheme(s.theme);if(s.route){const plan=buildPlans(s.theme,0).find(p=>p.id===s.route);if(plan)openPlan(plan)}}
 };
 root.onkeydown=e=>{lastInput='keyboard';keyboardFocus=true;if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();show(e.key==='Home'?0:e.key==='End'?slides.length-1:heroPreferences.index+(e.key==='ArrowRight'?1:-1),true)}};
 root.onmouseenter=()=>{hovered=true;update();schedule()};root.onmouseleave=()=>{hovered=false;update();schedule()};
 // Keyboard focus pauses rotation; pointer selection resumes after hover ends.
 root.addEventListener('focusin',()=>{keyboardFocus=lastInput!=='pointer';update();schedule()});
 root.addEventListener('focusout',e=>{if(!root.contains(e.relatedTarget)){keyboardFocus=false;lastInput='keyboard';update();schedule()}});
 root.addEventListener('pointerdown',()=>{lastInput='pointer';keyboardFocus=false;update();schedule()});
 const visibility=()=>schedule(),changedMotion=()=>{update();schedule()};
 document.addEventListener('visibilitychange',visibility);motion.addEventListener?.('change',changedMotion);
 const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;schedule()}):null;observer?.observe(root);
 heroCleanup=()=>{disposed=true;cancel();observer?.disconnect();document.removeEventListener('visibilitychange',visibility);motion.removeEventListener?.('change',changedMotion)};
 update();schedule();
}

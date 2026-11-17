'use strict';
// Source-specific compositions, all using the atlas's existing local licensed media.
const heroSlides=[
 {theme:'nakasendo',route:'nakasendo-short',photo:'nakasendo-photo',second:'nakasendo-print',label:'古道与宿场',title:'走进木曾的宿场',text:'妻笼与马笼，在版画与今日街道之间',action:'打开两宿行程'},
 {theme:'canal',route:'canal-jiangnan',photo:'canal-bridge',label:'水岸与城市',title:'沿运河，读江南',text:'从拱宸桥出发，认识水路与城市生活',action:'打开江南行程'},
 {theme:'impressionism',photo:'monet-london',label:'画作与风景',title:'光的旅行',text:'从画中地点，到作品的归处',action:'打开印象派地图'},
 {theme:'viking',route:'viking-northsea',photo:'viking-stone',label:'器物与交流',title:'石头里的北海往事',text:'海泽比、里伯与罗斯基勒的遗产网络',action:'打开遗产地点网络'},
 {theme:'nc500',route:'nc500-west',photo:'nc500-pass',label:'山海与公路',title:'在高地海岸停留',text:'山口、海湾与小镇，分段认识西海岸',action:'打开西海岸行程'},
 {theme:'parks',route:'utah-five',photo:'np-zion',label:'自然与地景',title:'走向犹他的红岩',text:'从锡安到峡谷，在国家公园之间慢游',action:'打开五园行程'}
];
const heroPreferences={index:0,paused:false};
let heroCleanup=null;
function destroyHeroCarousel(){if(heroCleanup){heroCleanup();heroCleanup=null}}
function heroCarouselHTML(){return `<section class="hero-carousel" role="region" aria-roledescription="轮播" tabindex="0" aria-label="不同主题的旅行推荐；空格暂停或恢复，方向键切换"><div class="hero-slides" aria-live="off">${heroSlides.map((s,i)=>`<div class="hero-slide hero-slide-${s.theme}" role="group" aria-roledescription="幻灯片" aria-label="${i+1} / ${heroSlides.length}：${s.title}" ${i===heroPreferences.index?'':'hidden'}><button class="discovery-feature" data-hero-open="${i}" aria-label="${s.action}：${s.title}"><div class="hero-visual">${mediaImage(s.photo,i===heroPreferences.index?'fetchpriority="high"':'loading="lazy"')}${s.second?`<div class="hero-archival">${mediaImage(s.second)}<small>广重笔下的妻笼</small></div>`:''}${s.theme==='viking'?'<span class="hero-object-label" aria-hidden="true">海泽比<br>符文石</span>':''}</div><span class="hero-caption"><small>${s.label}<b>${String(i+1).padStart(2,'0')} / ${String(heroSlides.length).padStart(2,'0')}</b></small><strong>${s.title}</strong><i>${s.text}</i><em>${s.action} ↗</em></span></button></div>`).join('')}</div><span class="hero-announcement sr-only" role="status" aria-live="polite" aria-atomic="true"></span></section>`}
function mountHeroCarousel(){
 destroyHeroCarousel();const root=document.querySelector('.hero-carousel');if(!root)return;
 const motion=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
 const slides=[...root.querySelectorAll('.hero-slide')];
 let timer=null,hovered=false,onscreen=true,disposed=false,focused=false;
 if(motion.matches)heroPreferences.paused=true;
 function cancel(){if(timer!==null){clearTimeout(timer);timer=null}}
 function schedule(){cancel();if(!disposed&&!heroPreferences.paused&&!motion.matches&&!hovered&&!focused&&onscreen&&!document.hidden&&document.body.dataset.view==='catalog')timer=setTimeout(()=>{timer=null;show(heroPreferences.index+1,false)},8000)}
 function update(){
  // Warm the current and following image before the next automatic change.
  for(const index of [heroPreferences.index,(heroPreferences.index+1)%slides.length])slides[index].querySelectorAll('img').forEach(img=>{img.loading='eager'});
  root.dataset.autoplay=motion.matches?'reduced':heroPreferences.paused?'paused':hovered?'hover-paused':focused?'focus-paused':'playing';

 }
 function announce(text){root.querySelector('.hero-announcement').textContent=text}
 function show(index,manual){
  heroPreferences.index=(index+slides.length)%slides.length;
  if(manual)heroPreferences.paused=true;
  slides.forEach((s,i)=>s.hidden=i!==heroPreferences.index);
  if(manual)announce(`第 ${heroPreferences.index+1} 项，共 ${slides.length} 项：${heroSlides[heroPreferences.index].title}`);
  update();schedule();
 }
 root.onclick=e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.heroOpen!==undefined){const s=heroSlides[Number(b.dataset.heroOpen)];openDiscoveryTheme(s.theme);if(s.route){const plan=buildPlans(s.theme,0).find(p=>p.id===s.route);if(plan)openPlan(plan)}}
 };
 root.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();show(e.key==='Home'?0:e.key==='End'?slides.length-1:heroPreferences.index+(e.key==='ArrowRight'?1:-1),true)}else if(e.key===' '&&e.target===root){e.preventDefault();heroPreferences.paused=!heroPreferences.paused;announce(heroPreferences.paused?'自动播放已暂停':'自动播放已开启');update();schedule()}else if(e.key==='Escape'){heroPreferences.paused=true;update();cancel()}};
 root.onmouseenter=()=>{hovered=true;update();schedule()};root.onmouseleave=()=>{hovered=false;update();schedule()};
 // Focus holds the image stable while its destination is being read.
 root.addEventListener('focusin',()=>{focused=true;update();cancel()});
 root.addEventListener('focusout',e=>{if(!root.contains(e.relatedTarget)){focused=false;update();schedule()}});
 const visibility=()=>schedule(),changedMotion=()=>{if(motion.matches)heroPreferences.paused=true;update();schedule()};
 document.addEventListener('visibilitychange',visibility);motion.addEventListener?.('change',changedMotion);
 const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;schedule()}):null;observer?.observe(root);
 heroCleanup=()=>{disposed=true;cancel();observer?.disconnect();document.removeEventListener('visibilitychange',visibility);motion.removeEventListener?.('change',changedMotion)};
 update();schedule();
}

'use strict';
// Behavioural DOM regression with a controlled clock; no rendering claims.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM,VirtualConsole}=require(process.env.JSDOM_MODULE||'jsdom');
const root=path.resolve(__dirname,'..');let now=0,nextId=0;const timers=new Map(),errors=[];let motion;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script defer src="([^"]+)"><\/script>/g,(_,file)=>'<script>'+fs.readFileSync(path.join(root,file),'utf8')+'</script>');
const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
(async()=>{const dom=new JSDOM(html,{url:'http://atlas.test/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
 w.fetch=async()=>({json:async()=>JSON.parse(fs.readFileSync(path.join(root,'countries.geo.json'),'utf8'))});
 const ctx=new Proxy({measureText:t=>({width:t.length*7})},{get:(t,p)=>p in t?t[p]:(()=>{}),set:(t,p,v)=>(t[p]=v,true)});w.HTMLCanvasElement.prototype.getContext=()=>ctx;w.Path2D=class{};w.ResizeObserver=class{observe(){}};w.requestAnimationFrame=()=>0;w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
 motion=new w.EventTarget();motion.matches=false;w.matchMedia=()=>motion;
 w.setTimeout=(fn,delay)=>{const id=++nextId;timers.set(id,{fn,due:now+delay});return id};w.clearTimeout=id=>timers.delete(id);
 }});await new Promise(r=>dom.window.addEventListener('load',r,{once:true}));
 const w=dom.window,d=w.document,$=s=>{const e=d.querySelector(s);assert.ok(e,s);return e};const carousel=()=>$('.hero-carousel');const index=()=>Number($('[data-hero-dot][aria-current=true]').dataset.heroDot);
 function advance(ms){const until=now+ms;for(;;){const entry=[...timers].filter(([,t])=>t.due<=until).sort((a,b)=>a[1].due-b[1].due)[0];if(!entry)break;now=entry[1].due;timers.delete(entry[0]);entry[1].fn()}now=until}
 assert.equal(index(),0);assert.equal(d.querySelectorAll('.hero-slide:not([hidden])').length,1);assert.equal($('.hero-slides').getAttribute('aria-live'),'off');
 advance(7999);assert.equal(index(),0);advance(1);assert.equal(index(),1);assert.equal($('.hero-announcement').textContent,'');
 carousel().dispatchEvent(new w.Event('mouseenter'));advance(16000);assert.equal(index(),1);carousel().dispatchEvent(new w.Event('mouseleave'));advance(8000);assert.equal(index(),2);

 // Pointer selection does not leave automatic rotation permanently paused.
 const pointerClick=selector=>{const el=$(selector);el.dispatchEvent(new w.Event('pointerdown',{bubbles:true}));el.focus();el.click()};
 pointerClick('[data-hero-step="1"]');assert.equal(index(),3);assert.match($('.hero-announcement').textContent,/第 4 项/);advance(8000);assert.equal(index(),4);
 carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(index(),5);advance(16000);assert.equal(index(),5);assert.equal(carousel().dataset.autoplay,'focus-paused');
 carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(index(),0);
 carousel().dispatchEvent(new w.FocusEvent('focusout',{bubbles:true,relatedTarget:d.body}));advance(8000);assert.equal(index(),1);
 pointerClick('.hero-play');assert.equal(carousel().dataset.autoplay,'paused');advance(16000);assert.equal(index(),1);
 pointerClick('.hero-play');advance(8000);assert.equal(index(),2);
 motion.matches=true;motion.dispatchEvent(new w.Event('change'));assert.equal($('.hero-play').disabled,true);advance(16000);assert.equal(index(),2);pointerClick('[data-hero-dot="5"]');assert.equal(index(),5);assert.equal(carousel().dataset.autoplay,'reduced');
 const slides=w.eval('heroSlides.map(s=>({theme:s.theme,route:s.route}))');
 for(let i=0;i<slides.length;i++){pointerClick('[data-hero-dot="'+i+'"]');pointerClick('[data-hero-open="'+i+'"]');assert.equal(d.body.dataset.theme,slides[i].theme);if(slides[i].route)assert.equal(w.eval('activePlan.id'),slides[i].route);advance(16000);$('#back-themes').click();assert.equal(d.body.dataset.view,'catalog');assert.equal(index(),i);assert.equal(d.querySelectorAll('.hero-slide:not([hidden])').length,1)}
 motion.matches=false;motion.dispatchEvent(new w.Event('change'));assert.equal($('.hero-play').disabled,false);assert.equal(carousel().dataset.autoplay,'playing');
 let pageHidden=false;Object.defineProperty(d,'hidden',{configurable:true,get:()=>pageHidden});pageHidden=true;d.dispatchEvent(new w.Event('visibilitychange'));advance(16000);assert.equal(index(),5);pageHidden=false;d.dispatchEvent(new w.Event('visibilitychange'));advance(8000);assert.equal(index(),0);
 pointerClick('[data-hero-open="0"]');const beforeLeave=w.eval('heroPreferences.index');advance(16000);assert.equal(w.eval('heroPreferences.index'),beforeLeave);$('#back-themes').click();assert.equal(carousel().dataset.autoplay,'playing');advance(8000);assert.equal(index(),1);
 assert.deepEqual(errors,[]);dom.window.close();console.log('PASS carousel DOM/state: six destinations, timed autoplay, hover/focus/explicit pause, pointer resume, keyboard wrap, reduced-motion changes, silent automatic updates, hidden-page suspension, timer cleanup and preserved return state.');
})().catch(e=>{console.error(e);process.exit(1)});

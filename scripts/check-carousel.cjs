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
 const w=dom.window,d=w.document,$=s=>{const e=d.querySelector(s);assert.ok(e,s);return e};const carousel=()=>$('.hero-carousel');const index=()=>Number($('.hero-slide:not([hidden]) [data-hero-open]').dataset.heroOpen);
 function advance(ms){const until=now+ms;for(;;){const entry=[...timers].filter(([,t])=>t.due<=until).sort((a,b)=>a[1].due-b[1].due)[0];if(!entry)break;now=entry[1].due;timers.delete(entry[0]);entry[1].fn()}now=until}
 assert.equal(index(),0);assert.equal(d.querySelectorAll('.hero-slide:not([hidden])').length,1);assert.equal($('.hero-slides').getAttribute('aria-live'),'off');assert.equal(d.querySelectorAll('.hero-controls,.hero-play,[data-hero-step],[data-hero-dot]').length,0);
 advance(7999);assert.equal(index(),0);advance(1);assert.equal(index(),1);assert.equal($('.hero-announcement').textContent,'');
 carousel().dispatchEvent(new w.Event('mouseenter'));advance(16000);assert.equal(index(),1);carousel().dispatchEvent(new w.Event('mouseleave'));advance(8000);assert.equal(index(),2);
 carousel().dispatchEvent(new w.FocusEvent('focusin',{bubbles:true}));assert.equal(carousel().dataset.autoplay,'focus-paused');advance(16000);assert.equal(index(),2);carousel().dispatchEvent(new w.FocusEvent('focusout',{bubbles:true,relatedTarget:$('#catalog-search')}));advance(8000);assert.equal(index(),3);
 carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(index(),5);assert.match($('.hero-announcement').textContent,/第 6 项/);advance(16000);assert.equal(index(),5);carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(index(),0);
 carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:' ',bubbles:true}));advance(8000);assert.equal(index(),1);carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));advance(16000);assert.equal(index(),1);
 motion.matches=true;motion.dispatchEvent(new w.Event('change'));assert.equal(carousel().dataset.autoplay,'reduced');advance(16000);assert.equal(index(),1);motion.matches=false;motion.dispatchEvent(new w.Event('change'));assert.equal(carousel().dataset.autoplay,'paused');
 // Reduced motion must not become a sticky user pause.
 carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:' ',bubbles:true}));
 assert.equal(w.eval('heroPreferences.paused'),false);
 motion.matches=true;motion.dispatchEvent(new w.Event('change'));advance(16000);assert.equal(index(),1);
 assert.equal(w.eval('heroPreferences.paused'),false);
 motion.matches=false;motion.dispatchEvent(new w.Event('change'));advance(8000);assert.equal(index(),2);
 carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 const slides=w.eval('heroSlides.map(s=>({theme:s.theme,route:s.route}))');
 for(let i=0;i<slides.length;i++){carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));for(let n=0;n<i;n++)carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));$('[data-hero-open="'+i+'"]').click();assert.equal(d.body.dataset.theme,slides[i].theme);if(slides[i].route)assert.equal(w.eval('activePlan.id'),slides[i].route);const before=w.eval('heroPreferences.index');advance(16000);assert.equal(w.eval('heroPreferences.index'),before);$('#back-themes').click();assert.equal(index(),i)}
 let pageHidden=false;Object.defineProperty(d,'hidden',{configurable:true,get:()=>pageHidden});carousel().dispatchEvent(new w.KeyboardEvent('keydown',{key:' ',bubbles:true}));pageHidden=true;d.dispatchEvent(new w.Event('visibilitychange'));advance(16000);assert.equal(index(),5);pageHidden=false;d.dispatchEvent(new w.Event('visibilitychange'));advance(8000);assert.equal(index(),0);
 w.dispatchEvent(new w.Event('blur'));assert.equal(carousel().dataset.autoplay,'window-paused');advance(16000);assert.equal(index(),0);
 w.dispatchEvent(new w.Event('focus'));advance(8000);assert.equal(index(),1);
 w.eval('renderDiscoveryCatalog()');advance(8000);assert.equal(index(),2);
 // Mounting with reduced motion enabled must also recover without reloading.
 motion.matches=true;w.eval('renderDiscoveryCatalog()');assert.equal(carousel().dataset.autoplay,'reduced');
 advance(16000);assert.equal(index(),2);motion.matches=false;motion.dispatchEvent(new w.Event('change'));advance(8000);assert.equal(index(),3);
 assert.deepEqual(errors,[]);dom.window.close();console.log('PASS carousel DOM/state: button-free UI, default autoplay, hover pause/resume, focus pause/resume, keyboard navigation/pause, reduced motion, silent automatic updates, hidden-page suspension and all six destinations.');
})().catch(e=>{console.error(e);process.exit(1)});

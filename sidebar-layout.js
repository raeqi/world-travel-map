'use strict';
const sidebarSizing={ready:false,preferred:null,drag:null,frame:null};
function sidebarBounds(width=innerWidth){return {min:280,max:Math.max(280,Math.min(680,width-452))}}
function sidebarWidth(value,width=innerWidth){const b=sidebarBounds(width);return Math.round(Math.max(b.min,Math.min(b.max,value)))}
function repaintSidebarMap(){if(sidebarSizing.frame!==null)return;sidebarSizing.frame=requestAnimationFrame(()=>{sidebarSizing.frame=null;resize()})}
function applySidebarWidth(value){const handle=document.querySelector('#sidebar-resizer'),actual=sidebarWidth(value);document.body.style.setProperty('--sidebar-width',actual+'px');handle.setAttribute('aria-valuenow',actual);handle.setAttribute('aria-valuetext',actual+' 像素');repaintSidebarMap();return actual}
function persistSidebarWidth(){try{if(sidebarSizing.preferred===null)localStorage.removeItem('atlas-sidebar-width-v1');else localStorage.setItem('atlas-sidebar-width-v1',String(sidebarSizing.preferred))}catch{}}
function resetSidebarWidth(){sidebarSizing.preferred=null;persistSidebarWidth();syncSidebarResize()}
function syncSidebarResize(){if(!sidebarSizing.ready)return;const handle=document.querySelector('#sidebar-resizer'),enabled=document.body.dataset.view==='map'&&innerWidth>760;handle.hidden=!enabled;document.querySelector('#sidebar-resize-help').hidden=!enabled;if(!enabled)return;const bounds=sidebarBounds();handle.setAttribute('aria-valuemin',bounds.min);handle.setAttribute('aria-valuemax',bounds.max);applySidebarWidth(sidebarSizing.preferred??(innerWidth<=1100?340:390))}
function initializeSidebarResize(){
 if(sidebarSizing.ready)return;sidebarSizing.ready=true;try{const raw=localStorage.getItem('atlas-sidebar-width-v1'),value=Number(raw);if(raw!==null&&Number.isFinite(value)&&value>0)sidebarSizing.preferred=value}catch{}
 const handle=document.querySelector('#sidebar-resizer');
 function end(){if(!sidebarSizing.drag)return;sidebarSizing.drag=null;document.body.classList.remove('sidebar-resizing');persistSidebarWidth()}
 handle.addEventListener('pointerdown',e=>{if(e.button!==0||handle.hidden)return;e.preventDefault();handle.focus({preventScroll:true});sidebarSizing.drag={id:e.pointerId,x:e.clientX,width:document.querySelector('#sidebar').getBoundingClientRect().width};handle.setPointerCapture(e.pointerId);document.body.classList.add('sidebar-resizing')});
 handle.addEventListener('pointermove',e=>{const d=sidebarSizing.drag;if(!d||d.id!==e.pointerId)return;sidebarSizing.preferred=applySidebarWidth(d.width+e.clientX-d.x)});
 handle.addEventListener('pointerup',end);handle.addEventListener('pointercancel',end);handle.addEventListener('lostpointercapture',end);handle.addEventListener('dblclick',resetSidebarWidth);
 handle.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End','Enter'].includes(e.key))return;e.preventDefault();if(e.key==='Enter'){resetSidebarWidth();return}const b=sidebarBounds(),current=Number(handle.getAttribute('aria-valuenow'));sidebarSizing.preferred=applySidebarWidth(e.key==='Home'?b.min:e.key==='End'?b.max:current+(e.key==='ArrowRight'?1:-1)*(e.shiftKey?48:16));persistSidebarWidth()});
 window.addEventListener('resize',()=>{end();syncSidebarResize()});syncSidebarResize();
}

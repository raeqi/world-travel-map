(function(){
 'use strict';
 var release='__TERRA_RELEASE__',failed=false;
 function ready(){return document.body&&document.body.dataset.ready==='true'}
 function reopen(){var url=new URL(location.href);url.searchParams.set('_fresh',release);location.replace(url.href)}
 function failure(){
  if(ready()||failed)return;failed=true;
  // Retry the document once, preserving the requested theme and saved journey.
  if(new URL(location.href).searchParams.get('_fresh')!==release){reopen();return}
  function show(){
   if(ready())return;
   var host=document.querySelector('#theme-catalog');if(!host)return;
   host.hidden=false;host.replaceChildren();
   var panel=document.createElement('section');panel.className='startup-error';panel.setAttribute('role','alert');
   var title=document.createElement('h2');title.textContent='页面暂时未能完整打开';
   var text=document.createElement('p');text.textContent='请检查网络后重新打开。你的收藏会保留。';
   var button=document.createElement('button');button.textContent='重新打开';button.onclick=function(){var url=new URL(location.href);url.searchParams.set('_retry',Date.now());location.replace(url.href)};
   panel.append(title,text,button);host.append(panel);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',show,{once:true});else show();
 }
 window.addEventListener('error',function(event){if(event.error||(event.target&&event.target.tagName==='SCRIPT'))failure()},true);
 window.addEventListener('unhandledrejection',failure);
 window.setTimeout(failure,30000);
})();

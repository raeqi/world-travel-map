const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const src=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const layout=src.slice(src.indexOf('hits=[];const filteredPoints='),src.indexOf('ctx.restore();ctx.beginPath();ctx.arc(cx,cy,r+2'));
const points=Array.from({length:43},(_,i)=>({name:'站点 '+i,lon:50+i*8,lat:180+Math.sin(i)*8}));
for(const selected of [null,points[20]]){
 const ctx=new Proxy({},{get:()=>()=>{},set:()=>true});
 const sandbox={hits:[],mapPoints:()=>[...points],drawPointCount:0,previewStops:points,selected,validLocation:()=>true,project:(x,y)=>[x,y,1],screen:q=>q,ctx,w:500,h:350,markerStyle:()=>({color:'#123456'}),labelWidth:s=>s.length*7};
 vm.createContext(sandbox);vm.runInContext(layout+';globalThis.result={labelBoxes,badgeBoxes,visible};',sandbox);
 const {labelBoxes,badgeBoxes,visible}=sandbox.result;
 const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
 assert.equal(sandbox.hits.length,43,'all stops remain hit targets');
 assert.ok(badgeBoxes.length<43,'dense route is decluttered');
 for(const boxes of [badgeBoxes,labelBoxes])boxes.forEach((a,i)=>boxes.slice(i+1).forEach(b=>assert.ok(!overlap(a,b))));
 labelBoxes.forEach(a=>badgeBoxes.forEach(b=>assert.ok(!overlap(a,b))));
 if(selected)assert.ok(visible.find(h=>h.p===selected).numbered,'selected stop keeps its numbered marker');
}
console.log('PASS: dense 43-stop labels, badge collision, selected priority, all hit targets');

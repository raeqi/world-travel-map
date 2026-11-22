'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function prepareReview(project){
 if(!path.isAbsolute(project)||fs.existsSync(project))throw Error('Choose a new absolute review directory outside the repository');
 const relative=path.relative(root,project);if(!relative.startsWith('..'+path.sep)&&!path.isAbsolute(relative))throw Error('Review output must stay outside the repository');
 const dist=path.join(project,'dist');
fs.mkdirSync(path.join(project,'.openai'),{recursive:true});
fs.writeFileSync(path.join(project,'.openai/hosting.json'),JSON.stringify({static:{directory:'dist'}}));
const build=require('./build-site.cjs').buildSite(path.join(dist,'map'),{rasterConfigFile:null});
let html=fs.readFileSync(path.join(dist,'map/index.html'),'utf8');
html=html.replace('</head>','<meta name="referrer" content="strict-origin-when-cross-origin"></head>');
html=html.replace(/(<script defer src="real-map\.[a-f0-9]+\.js"><\/script>)/,'<script defer src="manual-review-adapter.js"></script>$1');
fs.writeFileSync(path.join(dist,'map/index.html'),html);
fs.writeFileSync(path.join(dist,'map/manual-review-adapter.js'),`'use strict';
// Temporary local review adapter. NOT a production provider or MapTiler test.
if(sessionStorage.getItem('manual-osm-review')!=='explicit-low-volume-consent')throw Error('Manual review consent missing');
const reviewMode=new URLSearchParams(location.search).get('mode')||'missing';
Object.defineProperty(globalThis,'WebGL2RenderingContext',{value:reviewMode==='missing'?undefined:class{},configurable:true});
let reviewWebglCalls=0;const originalContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(type,...args){if(/webgl/i.test(type)){reviewWebglCalls++;return null}return originalContext.call(this,type,...args)};
globalThis.TERRA_RASTER_CONFIG={provider:'maptiler',mapId:'streets-v4',apiKey:'manual-review-not-a-key'};
rasterTileTemplate=()=> 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
validateRasterSource=async()=>true; // No TileJSON/auth endpoint exists for OSM; not evidence about MapTiler.
rasterMapProviderAttribution=()=>({attribution:[{label:'© OpenStreetMap contributors',url:'https://www.openstreetmap.org/copyright'}]});
const originalLibrary=rasterMapLoadLibrary;
rasterMapLoadLibrary=async()=>{const lib=await originalLibrary();if(!lib.reviewPatched){lib.reviewPatched=true;const makeMap=lib.map,makeTiles=lib.tileLayer;lib.map=(id,options)=>makeMap(id,{...options,center:[48.859,2.34],zoom:14,minZoom:14,maxZoom:16});lib.tileLayer=(url,options)=>makeTiles(url,{...options,keepBuffer:0,noWrap:true,updateWhenIdle:true});}return lib;};
window.addEventListener('DOMContentLoaded',()=>{const panel=document.createElement('div');panel.id='manual-review-proof';panel.setAttribute('role','status');Object.assign(panel.style,{position:'fixed',left:'4px',top:'4px',zIndex:'9999',padding:'4px',background:'#fff',border:'1px solid #436',font:'10px sans-serif',maxWidth:'440px'});document.body.append(panel);setInterval(()=>{const f=rasterMapFrame();panel.textContent='LOCAL MANUAL OSM · '+reviewMode+' · WebGL calls '+reviewWebglCalls+' · visible tiles '+f.tileImagesVisible+' · selected '+(selected?.id||'none')+' · '+(f.ready?'2D ready':'not ready')+' · '+(f.errorCode||'');},600);});
`);
fs.writeFileSync(path.join(dist,'index.html'),`<!doctype html><meta charset="utf-8"><meta name="referrer" content="strict-origin-when-cross-origin"><title>World Travel Map — manual live raster review</title><style>body{font:16px/1.6 system-ui;max-width:900px;margin:32px auto;padding:16px}button{font:inherit;padding:12px;margin:8px}a{color:#245a69}</style><h1>真实栅格地图：仅限本地少量人工审查</h1><p>供应商是 OpenStreetMap 标准瓦片，不是 MapTiler。此页尚未请求任何瓦片。只查看巴黎附近一小片区域；不遍历城市、不批量下载、不自动循环、不关闭浏览器缓存。</p><p>临时适配器复用 PR #61 的实际 Leaflet 引擎、原始地点和交互；限制缩放 14–16、关闭瓦片预留。它未注册为生产图源，不证明 MapTiler 凭据或生产方案已就绪。</p><p><a href="https://operations.osmfoundation.org/policies/tiles/">OSM tile usage policy</a> · <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a></p><button id="missing">手动开始：WebGL 2 对象不存在</button><button id="context-null">手动开始：取不到 WebGL 上下文</button><script>for(const button of document.querySelectorAll('button'))button.onclick=()=>{sessionStorage.setItem('manual-osm-review','explicit-low-volume-consent');location.href='map/index.html?mode='+button.id+'#theme=culture&place=wh-600'}</script>`);
return {project,sourceRelease:build.release,productionChanges:false,provider:'OSM standard manual review only',tileNetworkRequestsByPreparation:0};
}
if(require.main===module){
 try{if(process.env.CI)throw Error('Live OSM review is manual only; never run it in CI');if(process.argv.length!==3)throw Error('Usage: prepare-manual-raster-review.cjs <new absolute directory outside repo>');console.log(JSON.stringify(prepareReview(process.argv[2]),null,2));}
 catch(error){console.error(error.message);process.exitCode=1;}
}
module.exports={prepareReview};

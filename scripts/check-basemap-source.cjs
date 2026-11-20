'use strict';
// Bounded official-source probe. Decoding proves data contents, never rendered pixels.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
function provider(){const c=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(root,'basemap-providers.js'),'utf8')+';globalThis.result=currentBasemapProvider();',c);return JSON.parse(JSON.stringify(c.result))}
function tileCoordinate(lon,lat,z){const n=2**z,r=Math.max(-85,Math.min(85,lat))*Math.PI/180;return {z,x:Math.floor((lon+180)/360*n),y:Math.floor((1-Math.asinh(Math.tan(r))/Math.PI)/2*n)}}
function tileUrl(template,{z,x,y}){return template.replace('{z}',z).replace('{x}',x).replace('{y}',y)}
async function request(url){
 const response=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!response.ok){const error=Error('HTTP '+response.status+' from '+new URL(url).hostname);error.status=response.status;error.retryAfter=response.headers.get('retry-after');throw error}
 const bytes=Buffer.from(await response.arrayBuffer());return {bytes,evidence:{url,status:response.status,bytes:bytes.length,cors:response.headers.get('access-control-allow-origin'),cacheControl:response.headers.get('cache-control'),etag:response.headers.get('etag'),sha256:crypto.createHash('sha256').update(bytes).digest('hex')}};
}
function sampleSummary(name,coord,layers,labels){
 const count=pattern=>Object.entries(layers).filter(([id])=>pattern.test(id)).reduce((n,[,v])=>n+v,0);
 return {name,coord,layers,labels,borders:count(/^boundar/),roads:count(/^(streets|roads|transportation)$/),placeLabels:count(/place.*label/),countryLabels:count(/boundary.*label/),buildings:count(/building/)};
}
function sampleFailure(sample){if(sample.name==='world'&&(!sample.borders||!sample.countryLabels))return 'World tile lacks boundaries or country labels';if(['paris','beijing'].includes(sample.name)&&(!sample.roads||!sample.buildings))return sample.name+' lacks streets or buildings';return null;}
async function probe(){
 const selected=provider(),style=JSON.parse(fs.readFileSync(path.join(root,selected.style),'utf8')),source=Object.values(style.sources).find(s=>s.type==='vector'),template=source.tiles[0];
 const {VectorTile}=await import(pathToFileURL(require.resolve('@mapbox/vector-tile')).href),{default:Pbf}=await import(pathToFileURL(require.resolve('pbf')).href);
 const cities=JSON.parse(fs.readFileSync(path.join(root,selected.cities),'utf8'));
 const result={localGlobalCityCount:cities.features.length,kind:'http-and-mvt-decoding-only',date:new Date().toISOString(),provider:selected.id,styleVersion:selected.version,policy:selected.servicePolicy,attribution:source.attribution,rendered:false,requests:[],samples:[],failures:[]};
 try{
 for(const [name,lon,lat,z]of [['planet',0,0,0],['world',10,30,2],['paris',2.35,48.8566,14],['beijing',116.397,39.908,14]]){
  const coord=tileCoordinate(lon,lat,z),{bytes,evidence}=await request(tileUrl(template,coord));result.requests.push(evidence);const tile=new VectorTile(new Pbf(bytes)),layers={},names=[];
  for(const [id,layer]of Object.entries(tile.layers)){layers[id]=layer.length;for(let i=0;i<Math.min(layer.length,3000);i++){const feature=layer.feature(i),label=feature.properties.name;if(label&&names.length<14&&!names.includes(label))names.push(label)}}
  const sample=sampleSummary(name,coord,layers,names);result.samples.push(sample);const failure=sampleFailure(sample);if(failure)result.failures.push(failure);
 }
 for(const range of ['0-255','19968-20223']){const url=style.glyphs.replace('{fontstack}',encodeURIComponent(selected.labelFont.join(','))).replace('{range}',range),{bytes,evidence}=await request(url);if(bytes.length<50)throw Error('Empty glyph range '+range);result.requests.push({...evidence,kind:'glyph',range});}
 }catch(error){error.probeResult=result;throw error;}
 result.passed=!result.failures.length;return result;
}
if(require.main===module){const output=process.argv[2];(async()=>{let result;try{result=await probe();if(!result.passed)process.exitCode=1;}catch(error){result={...error.probeResult,kind:'http-and-mvt-decoding-only',passed:false,rendered:false,date:new Date().toISOString(),error:error.message,status:error.status,retryAfter:error.retryAfter};process.exitCode=1}if(output){fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n')}console.log(JSON.stringify(result,null,2))})()}
module.exports={provider,tileCoordinate,tileUrl,sampleSummary,sampleFailure,probe};

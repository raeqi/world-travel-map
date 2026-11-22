'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function validateReleaseManifest(value){
 const invalid=()=>{throw Error('Invalid packaged release manifest')};
 if(!value||typeof value!=='object'||Object.keys(value).sort().join(',')!=='assets,release'||!/^\w{20}$/.test(value.release)||!value.assets||typeof value.assets!=='object'||Array.isArray(value.assets))invalid();
 const entries=Object.entries(value.assets);if(!entries.length)invalid();
 for(const [name,asset]of entries){
  if(!/^[a-zA-Z0-9_-]+\.(js|css)$/.test(name)||!asset||Object.keys(asset).sort().join(',')!=='path,sha256'||!/^[a-f0-9]{64}$/.test(asset.sha256))invalid();
  const extension=name.slice(name.lastIndexOf('.')),expected=name.slice(0,-extension.length)+'.'+asset.sha256.slice(0,16)+extension;
  if(asset.path!==expected)invalid();
 }
 if(value.release!==digest(JSON.stringify(value.assets)).slice(0,20))invalid();
 return value;
}
function readPackagedManifest(archive){
 // upload-pages-artifact@v3 uploads artifact.tar. Read only the one regular
 // manifest member; never extract paths or rebuild a differently configured site.
 const {spawnSync}=require('node:child_process');
 const tar=args=>{const result=spawnSync('tar',args,{encoding:'utf8',maxBuffer:8*1024*1024});if(result.status!==0||result.error)throw Error('Cannot read the uploaded Pages package');return result.stdout;};
 const members=tar(['-tf',archive]).split('\n').filter(name=>/^(\.\/)?release\.json$/.test(name));
 if(members.length!==1)throw Error('Pages package must contain exactly one release manifest');
 const kind=tar(['-tvf',archive,members[0]]);if(!kind.startsWith('-'))throw Error('Packaged release manifest must be a regular file');
 const raw=tar(['-xOf',archive,members[0]]);if(Buffer.byteLength(raw)>1024*1024)throw Error('Packaged release manifest is too large');
 let value;try{value=JSON.parse(raw)}catch{throw Error('Invalid packaged release manifest')}
 return validateReleaseManifest(value);
}
async function verifyPublished(expected,{baseUrl='https://raeqi.github.io/world-travel-map/',fetcher=fetch}={}){
 validateReleaseManifest(expected);
 const get=async path=>{const r=await fetcher(new URL(path,baseUrl),{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(20000)});assert.ok(r.ok,'Published request failed: '+path+' ('+r.status+')');return r;};
 const manifest=await (await get('release.json')).json();
 assert.deepEqual(manifest,expected,'Published manifest differs from the tested package');
 const html=await (await get('')).text();
 assert.ok(html.includes('content="'+expected.release+'"'),'Published document has the wrong release');
 for(const asset of Object.values(expected.assets))assert.ok(html.includes(asset.path),'Missing published asset reference: '+asset.path);
 const assets=Object.values(expected.assets);
 for(let i=0;i<assets.length;i+=8)await Promise.all(assets.slice(i,i+8).map(async asset=>{
  const bytes=Buffer.from(await (await get(asset.path)).arrayBuffer());
  assert.equal(digest(bytes),asset.sha256,'Published asset bytes differ: '+asset.path);
 }));
 return {release:expected.release,actualAssetBytesMatched:assets.length,indexAssetReferencesMatched:true};
}
async function main(){
 const args=process.argv.slice(2);
 if(args.length!==2||args[0]!=='--pages-artifact')throw Error('Usage: check-published-release.cjs --pages-artifact <uploaded artifact.tar>');
 const expected=readPackagedManifest(args[1]);
 for(let attempt=1;attempt<=4;attempt++){
  try{const proof=await verifyPublished(expected);console.log(JSON.stringify({mainCommit:process.env.GITHUB_SHA||null,baseUrl:'https://raeqi.github.io/world-travel-map/',expectedSource:'uploaded-pages-package',...proof},null,2));return;}
  catch(error){if(attempt===4)throw error;console.log('Public release not yet verified (attempt '+attempt+'/4)');await new Promise(resolve=>setTimeout(resolve,15000));}
 }
}
if(require.main===module)main().catch(()=>{console.error('Published release verification failed. Check the uploaded package, release, document and asset bytes.');process.exitCode=1;});
module.exports={verifyPublished,readPackagedManifest,validateReleaseManifest};

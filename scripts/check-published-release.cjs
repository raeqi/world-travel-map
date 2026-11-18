'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
async function verifyPublished(expected,{baseUrl='https://raeqi.github.io/world-travel-map/',fetcher=fetch}={}){
 const get=async path=>{const r=await fetcher(new URL(path,baseUrl),{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(20000)});assert.ok(r.ok,'Published request failed: '+path+' ('+r.status+')');return r;};
 const manifest=await (await get('release.json')).json();
 assert.deepEqual(manifest,expected,'Published manifest differs from the tested source');
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
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{buildSite}=require('./build-site.cjs');
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'terra-public-release-'));
 try{
  const {release,assets}=buildSite(temporary),expected={release,assets};
  for(let attempt=1;attempt<=4;attempt++){
   try{const proof=await verifyPublished(expected);console.log(JSON.stringify({mainCommit:process.env.GITHUB_SHA||null,baseUrl:'https://raeqi.github.io/world-travel-map/',...proof},null,2));return;}
   catch(error){if(attempt===4)throw error;console.log('Public release not yet verified (attempt '+attempt+'/4): '+error.message);await new Promise(resolve=>setTimeout(resolve,15000));}
  }
 }finally{fs.rmSync(temporary,{recursive:true,force:true});}
}
if(require.main===module)main().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={verifyPublished};

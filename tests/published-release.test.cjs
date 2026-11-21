'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {verifyPublished}=require('../scripts/check-published-release.cjs');
function fixture({badAsset=false,oldManifest=false,missingReference=false}={}){
 const source='window.example=1;',hash=crypto.createHash('sha256').update(source).digest('hex'),file='app.'+hash.slice(0,16)+'.js';
 const assets={'app.js':{path:file,sha256:hash}},expected={release:crypto.createHash('sha256').update(JSON.stringify(assets)).digest('hex').slice(0,20),assets};
 const fetcher=async url=>{
  let body;
  if(url.pathname.endsWith('/release.json'))body=JSON.stringify(oldManifest?{release:'old',assets:{}}:expected);
  else if(url.pathname.endsWith('/'+file))body=badAsset?'window.example=2;':source;
  else body='<meta name="terra-release" content="'+expected.release+'">'+(missingReference?'':'<script src="'+file+'"></script>');
  return new Response(body,{status:200});
 };
 return {expected,fetcher};
}
test('public verification checks the manifest, document and actual asset bytes',async()=>{
 const f=fixture();assert.deepEqual(await verifyPublished(f.expected,{baseUrl:'https://example.test/app/',fetcher:f.fetcher}),{release:f.expected.release,actualAssetBytesMatched:1,indexAssetReferencesMatched:true});
});
test('public verification rejects altered bytes even with matching manifest and filenames',async()=>{
 const f=fixture({badAsset:true});await assert.rejects(()=>verifyPublished(f.expected,{fetcher:f.fetcher}),/Published asset bytes differ/);
});
test('public verification rejects an old release or a document missing a versioned reference',async()=>{
 const old=fixture({oldManifest:true});await assert.rejects(()=>verifyPublished(old.expected,{fetcher:old.fetcher}),/Published manifest differs/);
 const missing=fixture({missingReference:true});await assert.rejects(()=>verifyPublished(missing.expected,{fetcher:missing.fetcher}),/Missing published asset reference/);
});

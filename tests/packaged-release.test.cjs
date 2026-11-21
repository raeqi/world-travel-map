'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{execFileSync}=require('node:child_process');
const {buildSite}=require('../scripts/build-site.cjs'),{readPackagedManifest,verifyPublished,validateReleaseManifest}=require('../scripts/check-published-release.cjs');
test('the exact uploaded configured package verifies without reconstructing a default build',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'terra-release-package-'));
 try{
  const config=path.join(dir,'synthetic.raster.local.json');fs.writeFileSync(config,JSON.stringify({provider:'maptiler',mapId:'streets-v4',apiKey:'synthetic-not-a-real-key'}));
  const configured=buildSite(path.join(dir,'configured'),{rasterConfigFile:config}),plain=buildSite(path.join(dir,'plain'),{rasterConfigFile:undefined}),archive=path.join(dir,'artifact.tar');
  assert.notEqual(configured.release,plain.release,'the previous no-config rebuild was wrong');
  execFileSync('tar',['--dereference','--hard-dereference','--directory',configured.output,'-cf',archive,'.']);
  const expected=readPackagedManifest(archive);assert.equal(expected.release,configured.release);
  assert.ok(!JSON.stringify(expected).includes('synthetic-not-a-real-key'),'expected artifact contains no configuration value');
  const requests=[];let root=configured.output,tamper=false,missing=false,oldDocument=false;
  const fetcher=async(url,options)=>{requests.push({url,options});const file=decodeURIComponent(url.pathname.replace(/^\/app\//,''))||'index.html';if(missing&&file.endsWith('.js'))return new Response('',{status:404});let bytes=fs.readFileSync(path.join(root,file));if(tamper&&file===expected.assets['raster-runtime.js'].path)bytes=Buffer.from('changed');if(oldDocument&&file==='index.html')bytes=fs.readFileSync(path.join(plain.output,file));return new Response(bytes,{status:200});};
  const proof=await verifyPublished(expected,{baseUrl:'https://example.test/app/',fetcher});assert.equal(proof.actualAssetBytesMatched,Object.keys(expected.assets).length);assert.ok(requests.every(r=>r.options.headers['Cache-Control']==='no-cache'&&r.options.signal instanceof AbortSignal));
  root=plain.output;await assert.rejects(verifyPublished(expected,{fetcher,baseUrl:'https://example.test/app/'}),/Published manifest differs/);root=configured.output;
  tamper=true;await assert.rejects(verifyPublished(expected,{fetcher,baseUrl:'https://example.test/app/'}),/Published asset bytes differ/);tamper=false;
  oldDocument=true;await assert.rejects(verifyPublished(expected,{fetcher,baseUrl:'https://example.test/app/'}),/wrong release/);oldDocument=false;
  missing=true;await assert.rejects(verifyPublished(expected,{fetcher,baseUrl:'https://example.test/app/'}),/Published request failed/);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('package selection fails closed on missing, duplicate and linked manifests and unsafe assets',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'terra-bad-package-'));
 try{
  fs.writeFileSync(path.join(dir,'release.json'),'{}');const archive=path.join(dir,'artifact.tar');
  execFileSync('tar',['-cf',archive,'--files-from','/dev/null']);assert.throws(()=>readPackagedManifest(archive),/exactly one/);
  execFileSync('tar',['-cf',archive,'-C',dir,'release.json','release.json']);assert.throws(()=>readPackagedManifest(archive),/exactly one/);
  fs.symlinkSync('release.json',path.join(dir,'link.json'));execFileSync('tar',['-cf',archive,'-C',dir,'--transform=s/link.json/release.json/','link.json']);assert.throws(()=>readPackagedManifest(archive),/regular file/);
  assert.throws(()=>readPackagedManifest('/nonexistent/pages.tar'),/Cannot read/);
  for(const name of ['../app.js','https://bad.test/app.js','app.js?key=secret'])assert.throws(()=>validateReleaseManifest({release:'a'.repeat(20),assets:{[name]:{path:'app.js',sha256:'b'.repeat(64)}}}),/^Error: Invalid packaged release manifest$/);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('Pages verification selects this run\'s upload artifact ID and never rebuilds expected output',()=>{
 const workflow=fs.readFileSync('.github/workflows/pages.yml','utf8'),script=fs.readFileSync('scripts/check-published-release.cjs','utf8');
 assert.match(workflow,/pages-artifact-id: \$\{\{ steps\.pages-artifact\.outputs\.artifact_id \}\}/);assert.match(workflow,/artifact-ids: \$\{\{ needs\.test\.outputs\.pages-artifact-id \}\}/);assert.match(workflow,/--pages-artifact release-package\/artifact\.tar/);assert.ok(!script.includes('buildSite('));
});

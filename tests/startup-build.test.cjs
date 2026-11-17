'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
const {buildSite}=require('../scripts/build-site.cjs');
test('published documents pin every classic script and stylesheet to exact content, retaining order',()=>{
 const output=fs.mkdtempSync(path.join(os.tmpdir(),'terra-build-'));
 try{
  const {release,assets}=buildSite(output),html=fs.readFileSync(path.join(output,'index.html'),'utf8'),source=fs.readFileSync('index.html','utf8');
  const scripts=[...source.matchAll(/<script defer src="([^"]+)"><\/script>/g)].map(m=>m[1]);
  assert.deepEqual([...html.matchAll(/<script defer src="([^"]+)"><\/script>/g)].map(m=>m[1]),scripts.map(file=>assets[file].path));
  assert.ok(html.includes('name="terra-release" content="'+release+'"'));assert.ok(html.includes('window.addEventListener(\'error\''));
  assert.ok(html.indexOf('window.addEventListener')<html.indexOf('<script defer'));
  for(const [file,asset]of Object.entries(assets)){
   assert.match(asset.path,/\.[a-f0-9]{16}\.(js|css)$/);assert.notEqual(asset.path,file);
   const bytes=fs.readFileSync(path.join(output,asset.path));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.sha256);
   assert.deepEqual(bytes,fs.readFileSync(file));
  }
  assert.ok(!html.includes('src="app.js"'));assert.ok(!html.includes('__TERRA_RELEASE__'));
  assert.ok(fs.existsSync(path.join(output,'assets/cultural-atlas/atlas-yui.webp')));assert.ok(fs.existsSync(path.join(output,'assets/natural-atlas/natural-bow.webp')));
 }finally{fs.rmSync(output,{recursive:true,force:true})}
});

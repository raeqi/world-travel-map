'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function runtime(){const c=vm.createContext({document:{addEventListener(){}},location:{hash:''},URLSearchParams,assert});for(const [,file] of fs.readFileSync('index.html','utf8').matchAll(/<script defer src="([^"]+)"><\/script>/g)){if(!['app.js','flow.js'].includes(file))vm.runInContext(fs.readFileSync(file,'utf8'),c,{filename:file})}return c}
test('all displayed theme images have complete credit keys and gallery covers avoid nested controls',()=>vm.runInContext(`
 for(const theme of themes){
  const keys=editionCoverKeys(theme.id);assert.ok(keys.length);assert.ok(keys.every(k=>photoLibrary[k]?.author&&photoLibrary[k]?.source&&photoLibrary[k]?.license&&photoLibrary[k]?.licenseUrl),theme.id);
  if(editionStories[theme.id]){const cover=editionCoverHTML(theme.id,true);for(const k of keys)assert.ok(cover.includes('data-read-image="'+k+'"'));assert.ok(!editionCoverHTML(theme.id).includes('<button'),'catalogue cards keep one navigation target');}
  const caption=mediaCaptionHTML(keys);for(const k of keys)assert.ok(caption.includes('data-credit-key="'+k+'"'));
 }
 assert.equal(editionCoverKeys('impressionism').length,2);assert.equal(editionCoverKeys('vangogh').length,1);
`,runtime()));
test('caption markup escapes metadata and retains source, licence and derivative notices',()=>vm.runInContext(`
 photoLibrary.fixture={path:'assets/test.jpg',title:'<title>',author:'A & B',source:'https://example.com/source?a=1&b=2',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',changes:'缩放 & 裁切'};
 const caption=mediaCaptionHTML(['fixture','fixture'],'<title>');assert.equal((caption.match(/data-credit-key=/g)||[]).length,1);
 assert.ok(caption.includes('A &amp; B'));assert.ok(caption.includes('&lt;title&gt;'));assert.ok(caption.includes('source?a=1&amp;b=2'));assert.ok(caption.includes('处理版本沿用 CC BY-SA 4.0'));
 const button=mediaOpenHTML('fixture');assert.ok(button.startsWith('<button type="button"'));assert.ok(button.includes('aria-haspopup="dialog"'));assert.ok(button.includes('查看完整图像：&lt;title&gt;'));
`,runtime()));

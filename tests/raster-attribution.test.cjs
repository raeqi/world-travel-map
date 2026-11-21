'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
function context(hostname='atlas.example',synthetic=false){
 class Element{constructor(tag){this.tag=tag;this.children=[]}append(...items){this.children.push(...items)}replaceChildren(){this.children=[]}}
 const el=new Element('div'),c=vm.createContext({document:{querySelector:()=>el,createElement:tag=>new Element(tag)},location:{hostname},TERRA_RASTER_QA_SYNTHETIC:synthetic});
 vm.runInContext(fs.readFileSync('basemap-providers.js','utf8'),c);vm.runInContext(fs.readFileSync('raster-map.js','utf8'),c);return {c,el};
}
test('MapTiler attribution uses the official unchanged clickable logo and both copyright links',()=>{
 const {c,el}=context();vm.runInContext('renderBasemapAttribution(rasterMapProviderAttribution())',c);
 const [logo,text]=el.children;assert.equal(logo.href,'https://www.maptiler.com/');assert.equal(logo.children[0].src,'assets/vendor/maptiler/logo.svg');assert.equal(logo.children[0].alt,'MapTiler logo');assert.equal(logo.children[0].width,67);assert.equal(logo.children[0].height,20);
 assert.equal(text.children[0].href,'https://www.maptiler.com/copyright/');assert.equal(text.children[2].href,'https://www.openstreetmap.org/copyright');
 const source=JSON.parse(fs.readFileSync('assets/vendor/maptiler/source.json')),bytes=fs.readFileSync('assets/vendor/maptiler/logo.svg');assert.equal(bytes.length,source.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),source.sha256);
});
test('synthetic localhost evidence and other providers never inherit the MapTiler brand',()=>{
 for(const host of ['127.0.0.1','localhost']){const {c,el}=context(host,true);vm.runInContext('renderBasemapAttribution(rasterMapProviderAttribution())',c);assert.equal(el.children.length,1);assert.match(el.children[0].children[0].textContent,/合成测试图/);}
 const {c,el}=context();vm.runInContext('renderBasemapAttribution(maptilerRasterAttribution());renderBasemapAttribution(currentBasemapProvider())',c);assert.equal(el.children.length,1);assert.equal(el.children[0].children[0].textContent,'VersaTiles');
});
test('a test flag cannot remove attribution on a production origin',()=>{
 const {c,el}=context('raeqi.github.io',true);vm.runInContext('renderBasemapAttribution(rasterMapProviderAttribution())',c);assert.equal(el.children[0].className,'basemap-provider-logo');
});

'use strict';
// Keep classic-script boundaries and order: several files intentionally share
// lexical state. Immutable filenames prevent a new document using cached old JS.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
function digest(bytes){return crypto.createHash('sha256').update(bytes).digest('hex')}
function buildSite(output=path.join(root,'_site')){
 fs.mkdirSync(output,{recursive:true});
 let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const assets={};
 const version=(name)=>{
  if(assets[name])return assets[name].path;
  const bytes=fs.readFileSync(path.join(root,name)),hash=digest(bytes),extension=path.extname(name),target=name.slice(0,-extension.length)+'.'+hash.slice(0,16)+extension;
  fs.writeFileSync(path.join(output,target),bytes);assets[name]={path:target,sha256:hash};return target;
 };
 html=html.replace(/(<script defer src=")([^"]+\.js)("><\/script>)/g,(_,a,file,b)=>a+version(file)+b);
 html=html.replace(/(<link rel="stylesheet" href=")([^"]+\.css)(">)/g,(_,a,file,b)=>a+version(file)+b);
 const release=digest(JSON.stringify(assets)).slice(0,20);
 const guard=fs.readFileSync(path.join(root,'startup-guard.js'),'utf8').replaceAll('__TERRA_RELEASE__',release);
 html=html.replace('</head>',`<meta name="terra-release" content="${release}"><script>${guard}</script></head>`);
 // Original paths remain for documents cached before immutable asset URLs existed.
 for(const file of fs.readdirSync(root))if(/\.(js|css)$/.test(file)||file==='countries.geo.json')fs.copyFileSync(path.join(root,file),path.join(output,file));
 fs.cpSync(path.join(root,'assets'),path.join(output,'assets'),{recursive:true});
 fs.writeFileSync(path.join(output,'index.html'),html);
 fs.writeFileSync(path.join(output,'release.json'),JSON.stringify({release,assets},null,2));
 fs.writeFileSync(path.join(output,'.nojekyll'),'');
 return {release,assets,output};
}
if(require.main===module)console.log(JSON.stringify(buildSite(process.argv[2]),null,2));
module.exports={buildSite};

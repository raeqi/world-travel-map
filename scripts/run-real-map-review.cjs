'use strict';
// For a supported CI/local browser host, never a tunnel or production deployment.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const repository=path.resolve(__dirname,'..');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml'};
function staticFile(directory,url){
 let pathname;try{pathname=decodeURIComponent(new URL(url,'http://localhost').pathname)}catch{return {status:400}}
 const file=path.resolve(directory,'.'+pathname.replace(/\/$/,'/index.html'));
 if(!file.startsWith(directory+path.sep))return {status:403};
 try{const real=fs.realpathSync(file);if(!real.startsWith(fs.realpathSync(directory)+path.sep))return {status:403};if(!fs.statSync(real).isFile())return {status:404};return {status:200,file:real,type:mime[path.extname(real)]||'application/octet-stream'}}catch{return {status:404}}
}
async function run(){
 const directory=path.join(repository,'_site');if(!fs.existsSync(path.join(directory,'release.json')))throw Error('Build _site with scripts/build-site.cjs first');
 const server=http.createServer((req,res)=>{const result=staticFile(directory,req.url);res.writeHead(result.status,{'Content-Type':result.type||'text/plain','Cache-Control':'no-store'});if(result.status!==200)return res.end(String(result.status));fs.createReadStream(result.file).pipe(res)});
 await new Promise((resolve,reject)=>server.listen(8000,'127.0.0.1',resolve).once('error',reject));
 try{await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[path.join(__dirname,'check-real-map-browser.cjs')],{cwd:repository,stdio:'inherit',env:{...process.env,ATLAS_URL:'http://127.0.0.1:8000/'}});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error('Real basemap browser QA failed: '+code)))})}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve))}
}
if(require.main===module)run().catch(error=>{console.error(error.message);process.exitCode=1});
module.exports={staticFile,mime};

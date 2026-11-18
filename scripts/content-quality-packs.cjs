'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../data/content-quality');
function loadPacks(){return fs.readdirSync(root).filter(f=>/^batch-\d+\.json$/.test(f)).sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0])).map(f=>require(path.join(root,f)))}
function combinedPack(){
 const packs=loadPacks(),sources={},readings=[],seen=new Set();
 for(const pack of packs){
  for(const [key,source]of Object.entries(pack.sources)){if(sources[key]&&JSON.stringify(sources[key])!==JSON.stringify(source))throw Error('Conflicting research source: '+key);sources[key]=source;}
  for(const row of pack.readings){if(seen.has(row.id))throw Error('Place has multiple research layers: '+row.id);seen.add(row.id);readings.push({...row,batch:pack.batch});}
 }
 return {schemaVersion:2,baseline:packs[0].baseline,batches:packs.map(({batch,baseline,checked,scope,readings})=>({batch,baseline,checked,scope,readings:readings.length})),sources,readings};
}
function generatedData(){return "'use strict';\n// Generated from data/content-quality/batch-*.json by scripts/build-quality-readings.cjs.\nconst qualityReadingPack="+JSON.stringify(combinedPack())+';\n'}
module.exports={loadPacks,combinedPack,generatedData};

'use strict';
const fs=require('node:fs');
const {audit}=require('./content-quality-runtime.cjs');
const reviewPath='qa/content-quality/manual-reviews.json';
const reviews=fs.existsSync(reviewPath)?JSON.parse(fs.readFileSync(reviewPath,'utf8')).reviews:[];
const legacy=JSON.parse(fs.readFileSync('qa/content-audit.json','utf8'));
legacy.originalContexts=JSON.parse(fs.readFileSync('qa/content-quality/legacy-candidates.json','utf8')).entries;
const report=audit({reviews,legacy});
if(process.argv.includes('--write')){
 fs.mkdirSync('qa/content-quality',{recursive:true});
 const {entries,...overview}=report;overview.entriesFile='contexts.csv';overview.entriesCount=entries.length;
 fs.writeFileSync('qa/content-quality/latest.json',JSON.stringify(overview,null,2)+'\n');
 const cols=['id','theme','name','visible','priority','summaryCharacters','placeSpecificEssayCharacters','automaticCandidate','status','signals','routeIds','source','contentHash'];
 const quote=v=>'"'+String(Array.isArray(v)?v.join(' | '):v??'').replaceAll('"','""')+'"';
 fs.writeFileSync('qa/content-quality/contexts.csv',cols.join(',')+'\n'+report.entries.map(r=>cols.map(k=>quote(r[k])).join(',')).join('\n')+'\n');
}
if(process.argv.includes('--baseline')){
 fs.mkdirSync('qa/content-quality',{recursive:true});
 const file='qa/content-quality/baseline-2026-11-18.json.gz';if(fs.existsSync(file))throw Error('Baseline already exists; never overwrite the before snapshot.');
 fs.writeFileSync(file,require('node:zlib').gzipSync(JSON.stringify(report,null,2)+'\n',{mtime:0}));
}
console.log(JSON.stringify({baseline:report.baseline,method:report.method,...report.summary},null,2));

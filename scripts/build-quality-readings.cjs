'use strict';
const fs=require('node:fs'),{generatedData}=require('./content-quality-packs.cjs');
const expected=generatedData(),file='quality-readings-data.js';
if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==expected)throw Error('Research bundle is stale; run node scripts/build-quality-readings.cjs');console.log('PASS research bundle matches all source packs');}
else{fs.writeFileSync(file,expected);console.log('Built '+file)}

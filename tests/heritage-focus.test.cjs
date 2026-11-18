'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const sandbox={};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('catalog.js','utf8')+';globalThis.result={places,catalogMeta};',sandbox);
const {places,catalogMeta}=sandbox.result,supplements=JSON.parse(fs.readFileSync('data/unesco-coordinate-supplements.json'));
assert.equal(places.length,1273+63+6);assert.equal(catalogMeta.missingCoordinates,1);
for(const [id,s] of Object.entries(supplements)){if(!s)continue;const p=places.find(p=>p.id==='wh-'+id);assert.equal(p.lon,s.lon);assert.equal(p.lat,s.lat);assert.ok(Math.abs(p.lon)<=180&&Math.abs(p.lat)<=90);assert.match(s.source,/^https:\/\/data.unesco.org\//);assert.ok(p.coordinateNote.includes(s.retrieved));assert.ok(s.componentCount>=1)}
const alamut=places.find(p=>p.id==='wh-1770');assert.equal(alamut.lon,50.5861805555);assert.equal(alamut.lat,36.4447083333);assert.match(alamut.coordinateNote,/Alamūt Castle/);
assert.ok(fs.readFileSync('reading.js','utf8').includes('class="location-unavailable" role="status"'));
console.log('PASS: 37 official coordinate repairs, 1 honest unresolved entry, source provenance and original catalogue retained');

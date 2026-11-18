'use strict';
const fs=require('node:fs'),{points}=require('../data/theme-review/catalogue-new-places.json');
const data="'use strict';\nconst catalogueNewPlaces="+JSON.stringify(points)+';\n';
if(process.argv.includes('--check')){if(fs.readFileSync('catalogue-place-data.js','utf8')!==data)throw Error('Regenerate catalogue-place-data.js');}
else fs.writeFileSync('catalogue-place-data.js',data);

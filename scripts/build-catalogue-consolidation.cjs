'use strict';
const fs=require('node:fs'),pack=require('../data/theme-review/catalogue-consolidation.json');
const text="'use strict';\nconst catalogueConsolidationPack="+JSON.stringify(pack)+';\n';
if(process.argv.includes('--check')){if(fs.readFileSync('catalogue-consolidation-data.js','utf8')!==text)throw Error('Regenerate catalogue-consolidation-data.js');}
else fs.writeFileSync('catalogue-consolidation-data.js',text);

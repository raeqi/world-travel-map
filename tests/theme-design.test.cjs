const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const path=require('node:path');const root=path.join(__dirname,'..');
const context={places:[]};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'themes.js'),'utf8')+';this.result={themes,themeDesigns};',context);
const {themes,themeDesigns}=context.result;
assert.equal(themes.length,10);assert.equal(new Set(Object.values(themeDesigns).map(d=>d.mode)).size,10);
for(const t of themes){const d=themeDesigns[t.id];assert.ok(d.lens&&d.note&&d.line);assert.match(d.line,/非/);for(const key of ['ocean','land','edge','accent','route'])assert.match(d[key],/^#[a-f0-9]{6}$/i);assert.ok(d.dash.every(n=>n>0));assert.equal(t.colors.land,d.land);}
const css=fs.readFileSync(path.join(root,'design.css'),'utf8');for(const d of Object.values(themeDesigns))assert.ok(css.includes('data-map-style='+d.mode));
for(const id of ['xu','kumano','camino']){const svg=fs.readFileSync(path.join(root,'assets/illustrations/'+id+'.svg'),'utf8');assert.ok(svg.includes('1000 600'));assert.ok(svg.includes('<title'));assert.ok(!svg.includes('href="http'));}
console.log('PASS: ten regional editions, distinct modes, mapped palettes, explicit schematic legends, original accessible illustrations');

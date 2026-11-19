"use strict";
// Generated report producers keep one canonical document and a stable old entry.
const fs=require('node:fs'),path=require('node:path');
const manifest=require('../docs/legacy-paths.json').documents;
function compatibilityGuide(legacy){const entry=manifest[legacy];if(!entry?.compatibility)throw Error('No compatibility guide required: '+legacy);let text='# '+entry.title+'\n\n此文档已迁移至 ['+entry.path+']('+entry.path+')。旧路径保留为主要维护入口；请在新位置阅读和维护。\n\n[文档总览](docs/README.md) · [迁移对照](docs/migration.md) · [项目首页](README.md)\n';if(entry.anchors?.length)text+='\n## 主要章节入口\n\n'+entry.anchors.map(a=>'- <a id="'+a.id+'"></a>['+a.title+']('+entry.path+'#'+a.id+')').join('\n')+'\n';return text;}
function relocateRootLinks(text,target){return text.replace(/(\]\()([^\s)]+)(\))/g,(all,start,url,end)=>{if(/^[a-z][\w+.-]*:|^\/\/|^#/i.test(url))return all;const match=url.match(/^([^?#]*)(.*)$/),local=path.posix.normalize(match[1]),destination=manifest[local]?.path||local;return start+path.posix.relative(path.posix.dirname(target),destination)+match[2]+end;});}
function writeProjectDocument(legacy,text){const target=manifest[legacy]?.path;if(!target)throw Error('No canonical path for '+legacy);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,relocateRootLinks(text,target));if(manifest[legacy].compatibility)fs.writeFileSync(legacy,compatibilityGuide(legacy));}
module.exports={compatibilityGuide,relocateRootLinks,writeProjectDocument};

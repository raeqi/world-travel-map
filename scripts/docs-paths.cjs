"use strict";
// Generated report producers keep one canonical document and a stable old entry.
const fs=require('node:fs'),path=require('node:path');
const manifest=require('../docs/legacy-paths.json').documents;
function compatibilityGuide(legacy){const entry=manifest[legacy];if(!entry)throw Error('Unknown legacy document: '+legacy);return '# '+entry.title+'\n\n此文档已迁移至 ['+entry.path+']('+entry.path+')。旧路径保留为兼容入口；请在新位置阅读和维护。\n\n[文档总览](docs/README.md) · [项目首页](README.md)\n';}
function relocateRootLinks(text,target){return text.replace(/(\]\()([^\s)]+)(\))/g,(all,start,url,end)=>{if(/^[a-z][\w+.-]*:|^\/\/|^#/i.test(url))return all;const match=url.match(/^([^?#]*)(.*)$/),local=path.posix.normalize(match[1]),destination=manifest[local]?.path||local;return start+path.posix.relative(path.posix.dirname(target),destination)+match[2]+end;});}
function writeProjectDocument(legacy,text){const target=manifest[legacy]?.path;if(!target)throw Error('No canonical path for '+legacy);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,relocateRootLinks(text,target));fs.writeFileSync(legacy,compatibilityGuide(legacy));}
module.exports={compatibilityGuide,relocateRootLinks,writeProjectDocument};

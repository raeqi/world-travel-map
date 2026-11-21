'use strict';
const devices=[{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844}];
function culturalBrowserScope(env=process.env){
 const viewport=env.CULTURAL_QA_VIEWPORT||'',part=env.CULTURAL_QA_SHARD||'',parts=env.CULTURAL_QA_SHARDS||'';
 if(viewport&&!devices.some(d=>d.name===viewport))throw Error('Unknown CULTURAL_QA_VIEWPORT: '+viewport);
 if(Boolean(part)!==Boolean(parts))throw Error('Both cultural shard index and count are required');
 const shard=part?Number(part):1,shards=parts?Number(parts):1;
 if(!Number.isInteger(shard)||!Number.isInteger(shards)||shard<1||shards<1||shard>shards)throw Error('Invalid cultural shard index/count');
 return {devices:devices.filter(d=>!viewport||d.name===viewport),shard,shards};
}
function culturalShardThemes(themes,scope){return themes.filter((_,index)=>index%scope.shards===scope.shard-1)}
module.exports={culturalBrowserScope,culturalShardThemes};

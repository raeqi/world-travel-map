'use strict';
// Seasonal windows are editorial planning rules, linked to destination climate pages;
// they are not forecasts. No claim of a measured driving distance is made here.
const planTemplates=[
{id:'sichuan',theme:'nature',name:'川北彩池与高山',ids:['wh-637','wh-638'],days:5,months:[5,6,9,10],transport:'成都接驳 + 山区公路',reason:'两处遗产集中在川北；预留高海拔适应与转场时间。春秋与初夏可作为初步窗口，山区雨雪需按临行天气调整。',climate:'https://whc.unesco.org/en/list/638/'},
{id:'alps',theme:'nature',name:'阿尔卑斯山地之旅',ids:['wh-1237','wh-1037'],days:10,months:[7,8,9],transport:'铁路接驳 + 山地步道',reason:'以两处山地遗产为主，跨境转场留出一天。夏季高山探索窗口仍受海拔与残雪影响。',climate:'https://www.myswitzerland.com/en/planning/about-switzerland/general-facts/general-information/climate/'},
{id:'western-wh',theme:'nature',name:'美国西部自然遗产长线',ids:['wh-75','wh-308','wh-134'],days:14,months:[5,6,9,10],transport:'长途自驾，分段住宿',reason:'峡谷、山地与海岸森林差异明显；这是长距离路线，至少安排两周，优胜美地高山道路可能季节关闭。',climate:'https://www.nps.gov/yose/planyourvisit/seasons.htm'},
{id:'kansai',theme:'culture',name:'关西古都与寺院',ids:['wh-688','wh-870','wh-660'],days:6,months:[3,4,5,10,11],transport:'城际铁路 + 市内步行',reason:'京都、奈良与法隆寺地理集中；春秋通常较温和，赏花与红叶季需预留人流和预约时间。',climate:'https://kyoto.travel/en/see-and-do/kyoto-weather.html'},
{id:'tuscany',theme:'culture',name:'托斯卡纳古城慢游',ids:['wh-174','wh-395','wh-550'],days:6,months:[4,5,6,9,10],transport:'铁路 + 乡村接驳',reason:'佛罗伦萨、比萨与圣吉米尼亚诺相对集中，采用两处住宿基地，避免每天搬行李。春秋作为策划优先窗口。',climate:'https://www.italia.it/en/italy/seasons'},
{id:'beijing',theme:'culture',name:'北京皇家建筑与园林',ids:['wh-439','wh-880','wh-881'],days:4,months:[4,5,9,10],transport:'公共交通 + 步行',reason:'选择同城遗产减少长途转场；故宫条目包含沈阳组成部分，本路线仅游览北京部分。春秋为策划窗口。',climate:'https://english.beijing.gov.cn/travellinginbeijing/'},
{id:'daning',theme:'gorges',name:'大宁河古镇与盐业',ids:['dachang','ningchang'],days:3,months:[3,4,5,9,10,11],transport:'巫山 / 巫溪公路接驳',reason:'围绕大宁河流域探索迁建与盐业历史。山路不可按直线距离估时；宁厂部分建筑残损，仅在确认开放范围后游览。',climate:'https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202405/t20240514_13203070.html'},
{id:'salt',theme:'gorges',name:'库区盐运记忆',ids:['xituo','yunan'],days:4,months:[3,4,5,9,10,11],transport:'沿江公路分段转场',reason:'两地以盐运历史相连，分段留宿；春秋为区域策划窗口，夏季高温与强降雨会增加转场不确定性。',climate:'https://www.yunyang.gov.cn/zjyy_257/yyxq/xzjdmp/202210/t20221010_11174937.html'},
{id:'gorges-long',theme:'gorges',name:'三峡古镇分段长线',ids:['xituo','yunan','dachang','guizhou'],days:7,months:[3,4,5,9,10,11],transport:'公路 + 经核实的水路接驳',reason:'把库区主线拆成多日行程，不把历史旧址新滩作为常规景区。跨山跨江道路与船班须另查。',climate:'https://whlyw.cq.gov.cn/zjwl/yzq/cqwlzy/zqlswhmjmz/201303/t20130312_3706094.html'},
{id:'utah',theme:'parks',name:'犹他红岩三园',ids:['np-zion','np-brca','np-care'],days:7,months:[4,5,9,10],transport:'自驾，分园住宿',reason:'减少跨州长距离转场；锡安夏季炎热，布莱斯海拔较高，春秋仍可能遇到雪与昼夜温差。',climate:'https://www.nps.gov/zion/planyourvisit/seasons.htm'},
{id:'wyoming',theme:'parks',name:'黄石与大提顿',ids:['np-grte','np-yell'],days:6,months:[6,7,8,9],transport:'自驾 + 园内步道',reason:'相邻公园适合联游，园内尺度大仍需多日；暖季安排较灵活，任何月份都需留意低温与道路状况。',climate:'https://www.nps.gov/yell/planyourvisit/weather.htm'},
{id:'pnw',theme:'parks',name:'太平洋西北山海',ids:['np-olym','np-mora','np-noca'],days:10,months:[7,8,9],transport:'自驾，三个住宿基地',reason:'海岸雨林与高山差异明显；夏末通常较适合高山步道，但残雪、山火与道路开放情况会改变计划。',climate:'https://www.nps.gov/mora/planyourvisit/weather.htm'},
{id:'desert',theme:'parks',name:'冬季荒漠双园',ids:['np-jotr','np-deva'],days:5,months:[1,2,3,11,12],transport:'自驾，备足饮水',reason:'将低海拔荒漠安排在较凉的月份，避开死亡谷极端夏热；冬季风雨、洪水与高处积雪仍需核查。',climate:'https://www.nps.gov/deva/planyourvisit/weather.htm'}
,{id:'tea-yunnan',theme:'tea',name:'滇西古城与马帮',ids:['tea-dali','tea-lijiang'],days:5,months:[3,4,5,9,10,11],transport:'城际接驳 + 古城步行',reason:'以相邻古城为基地，分段认识马帮文化；季节窗口为区域策划假设。',climate:teaSource}
,{id:'tea-source',theme:'tea',name:'从茶源到滇西',ids:['tea-puer','tea-nanjian','tea-dali'],days:8,months:[3,4,5,10,11],transport:'公路分段接驳',reason:'从茶源集散到古城，预留跨区域转场；历史通道不等于现存可徒步路线。',climate:teaSource}
,{id:'tea-sichuan',theme:'tea',name:'川藏茶路前段',ids:['tea-yaan','tea-kangding','tea-litang','tea-batang'],days:9,months:[5,6,9,10],transport:'高原公路分段接驳',reason:'按海拔逐段适应，不把高海拔节点安排为快速打卡；月份为策划假设，需核实高原天气和道路。',climate:teaSource}

];
function validLocation(p){return p&&Number.isFinite(p.lon)&&Number.isFinite(p.lat)}
function distanceKm(a,b){if(!validLocation(a)||!validLocation(b))return null;const rad=Math.PI/180,dlat=(b.lat-a.lat)*rad,dlon=(b.lon-a.lon)*rad,x=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlon/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(Math.max(0,1-x)))}
function buildPlans(theme,month,maxDays=0){return planTemplates.filter(p=>p.theme===theme&&(!month||p.months.includes(month))&&(!maxDays||p.days<=maxDays)).map(p=>{const stops=p.ids.map(id=>places.find(x=>x.id===id));if(stops.some(x=>!validLocation(x)||!x.themes.includes(theme)))return null;const legs=stops.slice(1).map((stop,i)=>({from:stops[i],to:stop,km:distanceKm(stops[i],stop)}));return {...p,stops,legs,totalKm:Math.round(legs.reduce((s,x)=>s+x.km,0)),seasonMatch:!month||p.months.includes(month)}}).filter(Boolean).sort((a,b)=>Number(b.seasonMatch)-Number(a.seasonMatch)||b.stops.length-a.stops.length||a.totalKm-b.totalKm)}

// Longer regional circuits use official catalogue coordinates. Nearest-neighbour
// ordering is a draft for review, not a road routing or access calculation.
function addRegionalPlan(id,theme,name,country,box,months,days,limit=7){
 const pool=places.filter(p=>p.themes.includes(theme)&&validLocation(p)&&p.country===country&&p.lon>=box[0]&&p.lon<=box[2]&&p.lat>=box[1]&&p.lat<=box[3]);
 if(pool.length<4)return;pool.sort((a,b)=>a.lat-b.lat);const stops=[pool.shift()];while(pool.length&&stops.length<limit){pool.sort((a,b)=>distanceKm(stops.at(-1),a)-distanceKm(stops.at(-1),b));stops.push(pool.shift())}
 planTemplates.push({id,theme,name,ids:stops.map(p=>p.id),days,months,transport:'区域分段交通 + 多地住宿',reason:'按相邻点位编排的多站探索草案，建议每站留出游览时间与转场余量。月份为区域季节策划窗口；需逐站核实开放、预约与实际交通。',climate:stops[0].source});
}
for(const row of [
 ['cn-south','nature','中国西南山水与喀斯特','China',[98,21,112,33],[4,5,9,10,11],18,7],
 ['cn-east','nature','中国东南名山长线','China',[112,24,123,35],[4,5,9,10,11],14,6],
 ['au-east','nature','澳大利亚东岸雨林与海洋','Australia',[142,-42,155,-15],[4,5,9,10],21,6],
 ['us-nature','nature','美国西部遗产大环线','United States of America',[-125,30,-105,49],[6,7,8,9],21,6],
 ['japan','culture','日本古都与历史聚落纵贯','Japan',[130,30,141,38],[3,4,5,10,11],16,8],
 ['italy','culture','意大利古城与文艺复兴长线','Italy',[9,41,13,46],[4,5,6,9,10],18,8],
 ['spain','culture','西班牙文明交汇之旅','Spain',[-7,36,3,43],[3,4,5,9,10,11],18,8],
 ['france','culture','法国历史城市与建筑','France',[-2,43,7,50],[5,6,7,8,9],18,8],
 ['china','culture','华北古都与建筑长线','China',[108,34,120,41],[4,5,9,10],16,7],
 ['india','culture','印度北部历史城市','India',[72,24,85,30],[1,2,3,10,11,12],18,7],
 ['egypt','culture','埃及文明沿线','Egypt',[25,22,35,32],[1,2,3,10,11,12],14,6],
 ['mexico','culture','墨西哥高原古城','Mexico',[-103,17,-96,22],[1,2,3,4,11,12],16,7]
])addRegionalPlan(...row);
function circuit(id,theme,name,ids,days,months,reason,source){planTemplates.push({id,theme,name,ids:ids.map(x=>theme==='tea'?'tea-'+x:theme==='parks'?'np-'+x:x),days,months,reason,transport:'分段旅行 · 多个住宿基地',climate:source||teaSource})}
circuit('utah-five','parks','犹他五大国家公园环线',['zion','brca','care','cany','arch'],12,[4,5,9,10],'按西南到东北串联五园，每园安排一至两天，增加转场和天气缓冲。高海拔仍可能有雪。','https://www.nps.gov/zion/planyourvisit/seasons.htm');
circuit('california','parks','加州七园山海长线',['jotr','chis','pinn','seki','kica','yose','redw'],21,[5,6,9,10],'串联荒漠、岛屿、山地与红杉林。海峡群岛需单独预订船班，山地道路季节开放；采用分段基地。','https://www.nps.gov/yose/planyourvisit/seasons.htm');
circuit('rockies','parks','落基山与科罗拉多高原',['grca','pefo','meve','blca','grsa','romo'],18,[6,7,8,9],'峡谷到高山逐段探索，夏季优先高海拔活动，低海拔避开午后酷热与雷暴。','https://www.nps.gov/romo/planyourvisit/weather.htm');
circuit('winter-southwest','parks','冬日西南荒漠六园',['jotr','deva','sagu','whsa','gumo','cave'],18,[1,2,3,11,12],'分为加州与亚利桑那—新墨西哥两段，预留长途转场。荒漠冬季亦有低温、风与洪水；洞穴预约另查。','https://www.nps.gov/deva/planyourvisit/weather.htm');
circuit('east','parks','阿巴拉契亚与东部森林',['shen','neri','grsm','maca','cong'],14,[4,5,9,10],'山地步道与森林按多日基地安排，春秋温度通常较适合活动，秋季红叶时间随海拔变化。','https://www.nps.gov/grsm/planyourvisit/weather.htm');
circuit('gorges-all','gorges','三峡古镇与大宁河全景',['xituo','yunan','ningchang','dachang','guizhou'],10,[3,4,5,9,10,11],'五处聚落分段停留，保留沿江生活与盐业主题；宁厂先确认开放范围，不把新滩历史旧址作为常规景区。', 'https://whlyw.cq.gov.cn/');
circuit('tea-yunnan-long','tea','从普洱茶源到滇西北',['puer','nanjian','dali','lijiang','deqin'],12,[3,4,5,9,10,11],'茶源、驿站与古城串成十二日长线；德钦单独安排高原适应，不把历史连线当徒步轨迹。');
circuit('tea-sichuan-long','tea','川藏马帮文化长线',['yaan','kangding','litang','batang','changdu'],14,[5,6,9,10],'由低向高逐段适应，理塘与昌都留出休整日；行程长短随海拔适应和公路条件调整。');
circuit('tea-nepal','tea','尼泊尔古商路文化探索',['kathmandu','nuwakot','rasuwa'],7,[3,4,5,10,11],'尼泊尔境内分段探索藏尼贸易记忆；热索瓦为口岸区域，需要提前核实可达范围，不安排跨境穿越。',himalayaNepal);
circuit('tea-india','tea','噶伦堡与锡金商贸记忆',['kalimpong','gangtok','nathula'],8,[3,4,5,10,11],'印度境内古商贸文化之旅，乃堆拉山口受许可、国籍与开放限制；无法访问时增加甘托克文化停留，不穿越边境。',himalayaIndia);
addRegionalPlan('south-africa','nature','南非山海与自然保护区','South Africa',[16,-35,33,-22],[1,2,3,4,9,10,11,12],18,6);
addRegionalPlan('india-nature','nature','印度自然保护区冬季探索','India',[72,18,94,29],[1,2,3,11,12],18,6);
circuit('tea-winter','tea','冬日滇西茶源与古城',['puer','nanjian','dali','lijiang'],10,[1,2,12],'避开更高海拔的山口，以茶源、城镇文化和室内参观为主；丽江早晚寒冷，山区积雪时调整交通。');
circuit('tea-summer','tea','夏季滇西古城慢住',['nanjian','dali','lijiang'],9,[6,7,8],'雨季采用城镇基地慢住，不安排高原穿越；雷雨天转为博物馆与茶文化活动，强降雨时推迟转场。');
circuit('gorges-winter','gorges','冬日沿江古镇文化停留',['xituo','yunan','dachang','guizhou'],8,[1,2,12],'以聚落文化参访为主，冬季湿冷、雾与道路条件可能影响转场，不包含未核实船班。','https://whlyw.cq.gov.cn/');
circuit('gorges-summer','gorges','夏季古镇避暑慢游',['xituo','yunan','dachang','guizhou'],9,[6,7,8],'夏季不是优先旅行窗口：安排清晨短步行与午后室内活动，强降雨或高温预警时取消当天活动。','https://whlyw.cq.gov.cn/');
function historicalCircuit(id,theme,name,ids,days,months,reason){planTemplates.push({id,theme,name,ids:ids.map(x=>theme+'-'+x),days,months,reason,transport:'当代区域交通 + 分段住宿',climate:theme==='silk'?silkSource:poloSource})}
historicalCircuit('silk-hexi','silk','长安至河西：关城与绿洲',['xian','wuwei','zhangye','jiayuguan','dunhuang'],12,[4,5,6,9,10],'五座城市分段住宿，安排石窟与历史城市参观。夏季避开荒漠午后，石窟预约与城际交通单独核实。');
historicalCircuit('silk-oasis','silk','新疆绿洲与石窟文化',['turpan','kuqa','kashgar','hotan'],14,[4,5,9,10],'按两个区域基地分段探索，长距离转场采用经核实的铁路或航班；低海拔绿洲优先春秋。');
historicalCircuit('silk-uzbek','silk','乌兹别克斯坦四城慢游',['tashkent','samarkand','bukhara','khiva'],12,[3,4,5,9,10,11],'以四城建筑与市场为主，不跨越国境；夏热冬冷，春秋作为编辑优先窗口。');
historicalCircuit('silk-coast','silk','东南海港与运河城市',['hangzhou','quanzhou','guangzhou'],10,[3,4,5,10,11],'按城市基地探索海上丝路文化，远距离转场单独留日；不是历史船路的重走。');
historicalCircuit('silk-winter','silk','冬日海上丝路港市',['quanzhou','guangzhou'],7,[1,2,12],'以博物馆、宗教建筑与港市街区为主，避开长距离户外活动。');
historicalCircuit('polo-jiangnan','polo','游记中的江南与刺桐',['yangzhou','suzhou','hangzhou','quanzhou'],12,[3,4,5,9,10,11],'按篇章寻找当代城市中的历史线索；扬州任职等叙述存在争议，旅行不作为历史事实验证。');
historicalCircuit('polo-china','polo','从大都到江南：城市阅读长线',['beijing','xian','yangzhou','suzhou','hangzhou','quanzhou'],18,[4,5,9,10],'串联六座书中城市，采用当代铁路与城市基地；这是一条主题旅行，不声称是马可波罗的原始行走次序。');
historicalCircuit('polo-hexi','polo','沙州与甘州：绿洲见闻',['dunhuang','zhangye'],7,[5,6,7,8,9,10],'用两处住宿基地慢读河西篇章，夏季把户外安排在清晨与傍晚。');
historicalCircuit('polo-italy','polo','威尼斯与热那亚：从出发到成书',['venice','genoa'],8,[3,4,5,6,9,10,11],'两座海港城市分别承接出发与成书背景，加入档案馆与博物馆参观日。');
historicalCircuit('polo-winter','polo','冬季江南游记文化之旅',['yangzhou','suzhou','hangzhou'],8,[1,2,12],'以城市博物馆和街区为主，江南冬季湿冷，留出室内活动与天气调整空间。');

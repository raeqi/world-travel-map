'use strict';
// Historical corridor nodes, not surveyed hiking tracks or an exhaustive site inventory.
const teaSource='https://m.ccdi.gov.cn/content/60/5a/77322.html';
for(const [id,name,lon,lat,type,region,desc] of [
['puer','普洱',100.97,22.78,'茶源集散','滇藏线','从产茶与集散地出发，理解茶叶进入高原的贸易网络。'],
['nanjian','南涧',100.51,25.04,'商贸驿站','滇藏线','滇藏线上的交通与商贸节点。'],
['dali','大理',100.16,25.7,'古城聚落','滇藏线','连接滇西不同道路与文化的古城节点。'],
['lijiang','丽江',100.23,26.87,'古城聚落','滇藏线','在古城街巷间认识马帮商贸和多元文化交流。'],
['deqin','德钦',98.91,28.49,'高原通道','滇藏线','滇西北进入高原的历史节点，旅行需留出海拔适应时间。'],
['yaan','雅安',103,29.98,'茶源集散','川藏线','川藏茶贸易的重要起点之一。'],
['kangding','康定',101.96,30.05,'商贸驿站','川藏线','历史上的打箭炉，川藏商贸交流的重要节点。'],
['litang','理塘',100.27,30,'高原通道','川藏线','高海拔交通节点，路线应按适应情况分段安排。'],
['batang','巴塘',99.11,30,'商贸驿站','川藏线','川边重镇与历史通道节点。'],
['changdu','昌都',97.18,31.14,'古城聚落','藏东交流节点','藏东不同历史通道交流的区域节点。']
])places.push({id:'tea-'+id,name,lon,lat,type,region,country:'中国',themes:['tea'],icon:type==='茶源集散'?'🍃':type==='高原通道'?'🏔️':'🐎',desc,facts:{'历史角色':type,'所属支线':region,'探索方式':'城市与聚落节点分段探索'},source:teaSource,sourceLabel:'茶马古道历史背景',coordinateNote:'城镇区域示意坐标；历史通道示意不是测绘古道，也不是徒步导航轨迹。'});
// The Himalayan extensions are a related historical trade network, not a
// claim that every segment was one continuous, currently open tea trail.
const himalayaIndia='https://in.china-embassy.gov.cn/sgxw/201906/t20190604_1674011.htm';
const himalayaNepal='https://giwmscdntwo.gov.np/media/pdf_upload/History%20of%20Nepal%20Customs%20English%20Final%20printed_2020-03-11-20-40-18_jdjs7lz.pdf';
for(const [id,name,lon,lat,country,region,type,desc,source] of [
['lhasa','拉萨',91.13,29.65,'中国','跨喜马拉雅贸易','商贸驿站','连接川滇茶路与跨喜马拉雅商贸的集散城市。',himalayaIndia],
['shigatse','日喀则',88.88,29.27,'中国','藏尼贸易网络','商贸驿站','藏尼交流网络上的城市节点；与川滇茶路通过高原贸易网络联系。',himalayaNepal],
['gyirong','吉隆',85.3,28.39,'中国','藏尼贸易网络','高原通道','连接尼泊尔热索瓦方向的历史贸易通道。',himalayaNepal],
['rasuwa','热索瓦加迪',85.38,28.28,'尼泊尔','藏尼贸易网络','边境通道','尼泊尔与西藏历史贸易路线上的口岸区域。',himalayaNepal],
['nuwakot','努瓦科特',85.16,27.92,'尼泊尔','藏尼贸易网络','古城聚落','加德满都经热索瓦通往西藏的历史贸易路线节点。',himalayaNepal],
['kathmandu','加德满都',85.32,27.71,'尼泊尔','藏尼贸易网络','商贸驿站','纽瓦尔商人的贸易中心，连接尼泊尔、印度与西藏的交换网络。',himalayaNepal],
['yadong','亚东',88.91,27.49,'中国','藏印贸易网络','商贸驿站','经乃堆拉与锡金连接的历史贸易节点。',himalayaIndia],
['nathula','乃堆拉山口',88.83,27.39,'中国 / 印度','藏印贸易网络','边境通道','喜马拉雅历史贸易山口；示意连线不表示游客可以直接穿越国境。',himalayaIndia],
['gangtok','甘托克',88.61,27.33,'印度','藏印贸易网络','商贸驿站','锡金城市节点，连接乃堆拉方向的历史交流通道。',himalayaIndia],
['kalimpong','噶伦堡',88.47,27.06,'印度','藏印贸易网络','商贸驿站','历史上的印藏贸易集散地，现属印度西孟加拉邦。',himalayaIndia]
])places.push({id:'tea-'+id,name,lon,lat,country,region,type,desc,themes:['tea'],icon:type==='边境通道'?'⛰️':'🐎',facts:{'历史角色':type,'所属支线':region,'探索方式':'历史网络；跨境段单独核实开放与手续'},source,sourceLabel:'历史贸易网络资料',coordinateNote:'城镇 / 山口示意坐标；连线是历史关系，不是可直接通行的旅游线路。'});

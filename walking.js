'use strict';
// Editorial station coordinates, rounded to landmark/town scale. Not GPS tracks.
const walkingSources={xu:'https://yn.yunnan.cn/system/2021/05/30/031482898.shtml',xuChronology:'https://cnxxk.com.cn/list_24/1457.html',xuSongshan:'https://m.gushiwen.cn/guwen/bookv_a776ea1bd3d8.aspx',xuOverview:'https://bm.cugb.edu.cn/geoscience/c/2019/06/26/583271.shtml',kumano:'https://www.tb-kumano.jp/en/kumano-kodo/nakahechi/',kumanoMaps:'https://www.tb-kumano.jp/en/kumano-kodo/maps/',camino:'https://www.spain.info/en/camino-santiago/french-way-camino-santiago/'};
walkingSources.caminoPyrenees='https://www.visitnavarra.es/en/detalle-tramo/-/t/french-route-st-jean-pied-de-port-to-roncesvalles';
walkingSources.caminoCastile='https://www.turismocastillayleon.com/es/lasedades2024.ficheros/382439-web_Apertura%20Monumentos%20Camino%20Franc%C3%A9s%202024.pdf';
walkingSources.caminoGalicia='https://www.caminodesantiago.gal/es/planifica/las-rutas/camino-frances/etapa-triacastela-sarria-por-san-xil';
const walkingNodes={
 xu:[
 ['jizu','鸡足山',100.39,25.96,'云南','1639 滇西精选','名山','滇西游历的重要节点；本图省略沿途小站及回访，不代表完整日记轨迹。'],
 ['lijiang','丽江',100.23,26.87,'云南','1639 滇西精选','城镇','徐霞客在丽江与木氏往来；使用现代古城区代表位置。'],
 ['jianchuan','剑川',99.91,26.54,'云南','1639 滇西精选','城镇','从丽江继续南行的滇西游历节点；具体旧路不在图上复原。'],
 ['eryuan','洱源',99.95,26.11,'云南','1639 滇西精选','城镇','以现代洱源县城表示洱源地区游历，非精确住宿点。'],
 ['dali','大理',100.16,25.70,'云南','1639 滇西精选','城镇','苍山洱海区域的考察节点，图中定位古城区域。'],
 ['baoshan','保山',99.17,25.12,'云南','1639 滇西精选','城镇','滇西向西旅行的区域节点，省略途中驿站与支线。'],
 ['tengchong','腾冲',98.49,25.02,'云南','1639 滇西精选','城镇','徐霞客考察滇西山川、地热的区域；此处为城镇示意点。'],
 ['tiantai','天台山',121.10,29.25,'浙江','1613 浙东游历','名山','1613 年游天台山；与其他名山分属不同旅次，不连成一次徒步。'],
 ['yandang','雁荡山',121.07,28.37,'浙江','1613 浙东游历','名山','1613 年游雁荡山；图中为山地区域代表位置。'],
 ['huangshan','黄山',118.16,30.14,'安徽','1616 / 1618 皖南游历','名山','1616 年及 1618 年两游黄山；此点仅记录足迹，不复原登山轨迹。'],
 ['wuyi','武夷山',117.96,27.66,'福建','1616 皖闽游历','名山','1616 年游武夷山；与滇西游历相隔多年。'],
 ['songshan','嵩山',113.02,34.48,'河南','1623 中原·关中·鄂西','名山','1623 年游嵩山，随后游华山；点位是山地区域代表坐标。'],
 ['huashan','华山',110.08,34.48,'陕西','1623 中原·关中·鄂西','名山','1623 年游华山，随后游武当山；不把本图连线作为古代山路或当代登山路线。'],
 ['kaifeng','开封',114.31,34.80,'河南','1623 中原·关中·鄂西','城市','《游嵩山日记》自汴城（今开封）西行写起，以现代城市中心标识出发区域。',walkingSources.xuSongshan],
 ['zhengzhou','郑州',113.63,34.75,'河南','1623 中原·关中·鄂西','城市','1623 年嵩山行前途经郑州；使用现代城市代表位置，不复原旧驿路。',walkingSources.xuSongshan],
 ['xinmi','新密',113.39,34.54,'河南','1623 中原·关中·鄂西','城镇','日记中的密县，今新密；从郑州向嵩山行进的途经区域。',walkingSources.xuSongshan],
 ['shaolin','少林寺与少室山',112.94,34.51,'河南','1623 中原·关中·鄂西','名山','游嵩山期间到少林寺、少室山，地点合并为一处区域标记；不表示单一登山入口。',walkingSources.xuSongshan],
 ['longmen','洛阳龙门',112.48,34.56,'河南','1623 中原·关中·鄂西','山水古迹','《游嵩山日记》记赴洛阳并游龙门；使用龙门区域代表坐标，非旧路轨迹。',walkingSources.xuSongshan],
 ['wudang','武当山',111.00,32.40,'湖北','1623 中原·关中·鄂西','名山','1623 年继嵩山、华山后游太和山，即今武当山。省略其间经过的地点。'],
 ['qiyun','齐云山',118.03,29.81,'安徽','1616 皖闽游历','名山','1616 年游白岳，即齐云山，之后游黄山、武夷山；山地代表点并非具体登山入口。'],
 ['lushan','庐山',115.97,29.55,'江西','1618 赣皖游历','名山','1618 年先游庐山，随后再次登黄山；与 1616 年首游黄山分开呈现。'],
 ['beijing','北京',116.40,39.90,'北京','1633 北游·晋北名山','城市','1633 年北游先至北京，再赴五台山、恒山；此点表示现代北京城市区域，不推定具体旧居或景点。'],
 ['wutai','五台山',113.59,39.01,'山西','1633 北游·晋北名山','名山','1633 年北游的重要节点，位于北京之后、恒山之前；各台顶路线未在图中复原。'],
 ['hengshan','恒山',113.74,39.67,'山西','1633 北游·晋北名山','名山','1633 年游五台山后赴恒山，记于《游恒山日记》；图上是景区代表位置。']
 ],
 kumano:[
 ['takijiri','泷尻王子',135.51,33.79,'和歌山县','中边路','王子社','中边路山地段的经典起点 Takijiri-oji。'],
 ['takahara','高原',135.52,33.81,'和歌山县','中边路','山村','俯瞰山谷的村落 Takahara；住宿容量有限，步行前需安排。'],
 ['chikatsuyu','近露',135.61,33.82,'和歌山县','中边路','山村','Chikatsuyu 村与近露王子是中边路的重要停留区域。'],
 ['tsugizakura','继樱王子',135.63,33.83,'和歌山县','中边路','王子社','Tsugizakura-oji，位于近露以东的参诣道上。'],
 ['hosshinmon','发心门王子',135.73,33.86,'和歌山县','中边路','王子社','Hosshinmon-oji；可作为到本宫的末段步行起点，公交班次须另查。'],
 ['hongu','熊野本宫大社',135.77,33.84,'和歌山县','中边路','大社','Kumano Hongu Taisha；本图所选中边路段的终点，不等于熊野古道全部路线。']
 ],
 camino:[
 ["saint-jean", "圣让皮耶德波尔", -1.237, 43.164, "法国巴斯克地区", "法国之路完整主线", "城镇", "Saint-Jean-Pied-de-Port；本图完整主线的起点。到龙塞斯瓦列斯有拿破仑高线与 Valcarlos 谷线，不能当作两段串行路线。",walkingSources.caminoPyrenees],
 ["zubiri", "苏维里", -1.505, 42.93, "纳瓦拉", "法国之路完整主线", "城镇", "Zubiri；龙塞斯瓦列斯与潘普洛纳之间的常用分段节点。",walkingSources.camino],
 ["los-arcos", "洛斯阿尔科斯", -2.193, 42.57, "纳瓦拉", "法国之路完整主线", "城镇", "Los Arcos；埃斯特利亚至洛格罗尼奥之间的分段城镇。",walkingSources.camino],
 ["viana", "维亚纳", -2.372, 42.515, "纳瓦拉", "法国之路完整主线", "城镇", "Viana；接近拉里奥哈边界的历史城镇。",walkingSources.camino],
 ["navarrete", "纳瓦雷特", -2.561, 42.43, "拉里奥哈", "法国之路完整主线", "城镇", "Navarrete；洛格罗尼奥至纳赫拉途中的节点。",walkingSources.camino],
 ["belorado", "贝洛拉多", -3.191, 42.42, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Belorado；进入布尔戈斯省后的常用分段城镇。",walkingSources.caminoCastile],
 ["ortega", "圣胡安-德奥尔特加", -3.436, 42.376, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "San Juan de Ortega；途经蒙特斯德奥卡山区后的节点。",walkingSources.caminoCastile],
 ["atapuerca", "阿塔普埃尔卡", -3.508, 42.377, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Atapuerca；圣胡安-德奥尔特加至布尔戈斯之间的村落。",walkingSources.caminoCastile],
 ["hornillos", "奥尔尼略斯-德尔卡米诺", -3.925, 42.338, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Hornillos del Camino；布尔戈斯以西的高原分段节点。",walkingSources.caminoCastile],
 ["castrojeriz", "卡斯特罗赫里斯", -4.139, 42.289, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Castrojeriz；高原城镇，之后继续前往弗罗米斯塔。",walkingSources.caminoCastile],
 ["carrion", "卡里翁-德洛斯孔德斯", -4.601, 42.339, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Carrión de los Condes；高原步行段的重要服务节点。",walkingSources.caminoCastile],
 ["terradillos", "特拉迪略斯-德洛斯滕普拉里奥斯", -4.89, 42.365, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Terradillos de los Templarios；卡里翁与萨阿贡之间的常用停留地。",walkingSources.caminoCastile],
 ["sahagun", "萨阿贡", -5.029, 42.371, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Sahagún；本图随后选经 El Burgo Ranero 的主线，不叠加其他并行支线。",walkingSources.caminoCastile],
 ["burgo-ranero", "埃尔布尔戈拉内罗", -5.22, 42.422, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "El Burgo Ranero；高原分段节点，向曼西利亚继续行进。",walkingSources.caminoCastile],
 ["mansilla", "曼西利亚-德拉斯穆拉斯", -5.417, 42.499, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Mansilla de las Mulas；抵达莱昂前的常用停留地。",walkingSources.caminoCastile],
 ["san-martin", "圣马丁-德尔卡米诺", -5.808, 42.496, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "San Martín del Camino；本图采用经此地与奥尔维戈的走向，不把 Mazarife 支线串入。",walkingSources.caminoCastile],
 ["orbigo", "奥尔维戈医院镇", -5.883, 42.463, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Hospital de Órbigo；莱昂与阿斯托尔加之间的历史桥镇。",walkingSources.caminoCastile],
 ["rabanal", "拉瓦纳尔-德尔卡米诺", -6.285, 42.481, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Rabanal del Camino；向山地攀升前的分段停留地。",walkingSources.caminoCastile],
 ["foncebadon", "丰塞瓦东", -6.342, 42.491, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Foncebadón；山地节点，之后经铁十字一带下降，须另核实高山天气。",walkingSources.caminoCastile],
 ["molinaseca", "莫利纳塞卡", -6.519, 42.538, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Molinaseca；山地下行后、蓬费拉达之前的桥镇。",walkingSources.caminoCastile],
 ["villafranca", "比埃尔索自由镇", -6.811, 42.607, "卡斯蒂利亚-莱昂", "法国之路完整主线", "城镇", "Villafranca del Bierzo；向 O Cebreiro 进山前的重要分段节点。",walkingSources.caminoCastile],
 ["triacastela", "特里亚卡斯特拉", -7.24, 42.756, "加利西亚", "法国之路完整主线", "城镇", "Triacastela；本图选经 San Xil 通往萨里亚，Samos 为另一条可选支线，不在主线中混连。",walkingSources.caminoGalicia],
 ["san-xil", "圣希尔", -7.28, 42.779, "加利西亚", "法国之路完整主线", "城镇", "San Xil；特里亚卡斯特拉至萨里亚所选线路的途经村落。",walkingSources.caminoGalicia],
 ["pedrouzo", "奥佩德罗乌索", -8.362, 42.905, "加利西亚", "法国之路完整主线", "城镇", "O Pedrouzo；阿尔苏阿与圣地亚哥之间的常用末段停留地。",walkingSources.caminoGalicia],
 ['roncesvalles','龙塞斯瓦列斯',-1.32,43.01,'纳瓦拉','法国之路西班牙段','山地村镇','Roncesvalles；从法国越过比利牛斯山后进入西班牙的主要停留点。'],
 ['pamplona','潘普洛纳',-1.64,42.82,'纳瓦拉','法国之路西班牙段','城市','Pamplona；法国之路西班牙段的重要城市。'],
 ['puente','王后桥镇',-1.81,42.67,'纳瓦拉','法国之路西班牙段','城镇','Puente la Reina；朝圣路线汇合的历史城镇。'],
 ['estella','埃斯特利亚',-2.03,42.67,'纳瓦拉','法国之路西班牙段','城镇','Estella-Lizarra，纳瓦拉段的主要站点。'],
 ['logrono','洛格罗尼奥',-2.45,42.47,'拉里奥哈','法国之路西班牙段','城市','Logroño；路线进入拉里奥哈。'],
 ['najera','纳赫拉',-2.73,42.42,'拉里奥哈','法国之路西班牙段','城镇','Nájera；法国之路沿线城镇。'],
 ['domingo','圣多明各-德拉卡尔萨达',-2.95,42.44,'拉里奥哈','法国之路西班牙段','城镇','Santo Domingo de la Calzada；朝圣传统与城镇历史相连。'],
 ['burgos','布尔戈斯',-3.70,42.34,'卡斯蒂利亚-莱昂','法国之路西班牙段','城市','Burgos；长线中可留出休整的城市，实际住宿按分段计划安排。'],
 ['fromista','弗罗米斯塔',-4.41,42.27,'卡斯蒂利亚-莱昂','法国之路西班牙段','城镇','Frómista；高原段主要节点之一。'],
 ['leon','莱昂',-5.57,42.60,'卡斯蒂利亚-莱昂','法国之路西班牙段','城市','León；高原段的重要城市，可按个人计划留出休整时间。'],
 ['astorga','阿斯托尔加',-6.05,42.46,'卡斯蒂利亚-莱昂','法国之路西班牙段','城镇','Astorga；朝圣之路的重要历史城镇。'],
 ['ponferrada','蓬费拉达',-6.59,42.55,'卡斯蒂利亚-莱昂','法国之路西班牙段','城市','Ponferrada；向加利西亚山地前进的区域节点。'],
 ['cebreiro','奥塞夫雷罗',-7.04,42.71,'加利西亚','法国之路西班牙段','山地村镇','O Cebreiro；山地天气与低海拔不同，应提前核实风雪和步道状况。'],
 ['sarria','萨里亚',-7.41,42.78,'加利西亚','法国之路末段','城镇','Sarria；常见的末段步行出发地，证书规则及印章要求应向朝圣者办公室确认。'],
 ['portomarin','波尔托马林',-7.62,42.81,'加利西亚','法国之路末段','城镇','Portomarín；从萨里亚继续西行的主要停留点。'],
 ['palas','帕拉斯-德雷伊',-7.87,42.87,'加利西亚','法国之路末段','城镇','Palas de Rei；末段的主要城镇。'],
 ['melide','梅利德',-8.01,42.92,'加利西亚','法国之路末段','城镇','Melide；按体力可作为住宿或途经节点，并非每个节点都对应一天。'],
 ['arzua','阿尔苏阿',-8.16,42.93,'加利西亚','法国之路末段','城镇','Arzúa；经 O Pedrouzo 继续前往圣地亚哥，日程按体力与住宿安排。'],
 ['santiago','圣地亚哥-德孔波斯特拉',-8.54,42.88,'加利西亚','法国之路末段','城市','Santiago de Compostela；本路线终点，代表坐标在主教座堂附近。']
 ]
};
const caminoMainOrder=["saint-jean", "roncesvalles", "zubiri", "pamplona", "puente", "estella", "los-arcos", "viana", "logrono", "navarrete", "najera", "domingo", "belorado", "ortega", "atapuerca", "burgos", "hornillos", "castrojeriz", "fromista", "carrion", "terradillos", "sahagun", "burgo-ranero", "mansilla", "leon", "san-martin", "orbigo", "astorga", "rabanal", "foncebadon", "molinaseca", "ponferrada", "villafranca", "cebreiro", "triacastela", "san-xil", "sarria", "portomarin", "palas", "melide", "arzua", "pedrouzo", "santiago"];
walkingNodes.camino.sort((a,b)=>caminoMainOrder.indexOf(a[0])-caminoMainOrder.indexOf(b[0]));
// Browse the dated national journeys before the western-Yunnan chapter.
const xuBrowseOrder=['tiantai','yandang','qiyun','huangshan','wuyi','lushan','kaifeng','zhengzhou','xinmi','songshan','shaolin','longmen','huashan','wudang','beijing','wutai','hengshan','jizu','lijiang','jianchuan','eryuan','dali','baoshan','tengchong'];
walkingNodes.xu.sort((a,b)=>xuBrowseOrder.indexOf(a[0])-xuBrowseOrder.indexOf(b[0]));
for(const [theme,rows] of Object.entries(walkingNodes))for(const [id,name,lon,lat,region,route,type,desc,sourceOverride] of rows)places.push({id:theme+'-'+id,name,lon,lat,region,country:theme==='xu'?'中国':theme==='kumano'?'日本':id==='saint-jean'?'法国':'西班牙',type,desc,themes:[theme],icon:'◇',facts:{'路线线索':route,'地点性质':type,'阅读提示':'站点示意，非步道导航；详情与开放情况请查来源'},source:sourceOverride||(theme==='xu'&&route!=='1639 滇西精选'?walkingSources.xuChronology:walkingSources[theme]),sourceLabel:theme==='xu'?'游历背景与年表':theme==='kumano'?'田边市熊野旅游局':'官方旅游与路线资料',coordinateNote:'城镇或景区代表坐标，非入口、精确古路或逐步导航轨迹。'});

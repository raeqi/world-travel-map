'use strict';
// Additions are researched places, not extra copies of an artist or an invented route.
// Building/quarter coordinates are editorial representatives, never navigation entrances.
const culturalPlaceAdditions=[
 {theme:'shen-congwen',key:'taoyuan-river',name:'桃源 · 沅江登舟地',en:'Taoyuan, Yuan River',lon:111.485,lat:28.903,country:'中国',region:'湖南',relation:'life-work',summary:'沈从文1934年返湘，先经常德抵桃源，再换小船沿沅江上行。这里将散文中的登舟与沿河观察落到桃源县城的河岸范围。',observe:'读《湘行散记》时留意码头、船工与岸上生计；此点是河岸区域，不能用来寻找仍在运营的历史船班。',source:'https://www.chinawriter.com.cn/n1/2020/0730/c419384-31803389.html'},
 {theme:'shen-congwen',key:'pushi',name:'浦市古镇',en:'Pushi',lon:110.106,lat:27.956,country:'中国',region:'湖南',relation:'life-work',summary:'浦市是沈从文返乡途中结束这一段水行、转向陆路的重要地方。《湘行散记》中的码头歌声把古镇放回沅水贸易和劳动生活。',observe:'沿古镇与码头区域观察河流和街巷的联系，再读有关浦市的篇章；凤凰是故乡章节，不冒充同一段水路的下一站。',source:'https://www.chinawriter.com.cn/n1/2018/1105/c404018-30381456.html'},
 {theme:'xiao-hong',key:'xiaohong-house',name:'萧红故居与后园',en:'Xiao Hong Childhood Home',lon:126.592,lat:45.984,country:'中国',region:'黑龙江',relation:'life-fiction',summary:'呼兰的童年宅院与后园，为阅读《呼兰河传》提供具体的生活空间。小说中的记忆经过文学组织，不能把每一处场景都按故居今天的陈设复原。',observe:'比较宅院、后园与小说中的观看尺度；与旁边纪念馆的生平陈列分开阅读。',source:'https://wlt.hlj.gov.cn/wlt/c114172/202305/c00_31635973.shtml'},
 {theme:'xiao-hong',key:'shangshi-street',name:'哈尔滨 · 商市街旧居街区',en:'Former Shangshi Street, Harbin',lon:126.619,lat:45.775,country:'中国',region:'黑龙江',relation:'life-work',summary:'萧红与萧军1932年冬迁到商市街25号院的半地下房间，清贫生活与初期写作成为《商市街》的重要背景。商市街对应今天的红霞街。',observe:'以红霞街街区认识城市生活与写作背景；坐标不指认已经变迁的半地下室入口，也不承诺旧居开放。',source:'https://www.hljzx.gov.cn/contents/68/7406.html'},
 {theme:'wu-guanzhong',key:'hangzhou-art-school',name:'杭州 · 南山路画院与西湖',en:'China Academy of Art, Nanshan Road',lon:120.153,lat:30.242,country:'中国',region:'浙江',relation:'life-work',summary:'吴冠中在杭州国立艺术专科学校学习，江南水乡也是他长期回返的题材。以今天的南山路美术学院与西湖环境作为认识这段艺术教育的入口。',observe:'从湖岸、白墙、树影与城市边缘观察点线面；今天的校园建筑不等于1930年代的完整校舍，校园访问以校方安排为准。',source:'https://gmfz.caa.edu.cn/info/1024/1313.htm'},
 {theme:'feng-zikai',key:'riyuelou',name:'上海 · 丰子恺日月楼街区',en:'Feng Zikai Riyue Lou, Shanghai',lon:121.461,lat:31.218,country:'中国',region:'上海',relation:'life-work',summary:'丰子恺1954年迁入长乐邨，在被他称作日月楼的住居继续写作、翻译与绘画。它与石门缘缘堂呈现乡居和上海城市生活的不同尺度。',observe:'看长乐邨的里弄空间，并把缘缘堂时期与上海时期的作品对读；此为居住街区，不保证可入室参观。',source:'https://www.shhuangpu.gov.cn/fw/003001/20231129/0af41720-0301-46b4-8af4-5d6139bbf72e.html'},
 {theme:'chagall',key:'chagall-nice',name:'尼斯国立夏加尔博物馆',en:'Marc Chagall National Museum',lon:7.2685,lat:43.7092,country:'法国',region:'普罗旺斯-阿尔卑斯-蓝色海岸',relation:'collection',summary:'尼斯的国家博物馆让夏加尔的绘画、彩窗与其他媒介在同一空间相互对照；与圣保罗德旺斯的晚年生活地形成不同的艺术关系。',observe:'先看画面色彩与宗教叙事，再比较建筑中的光；馆藏地不能替代每件作品的创作地点。',source:'https://musees-nationaux-alpesmaritimes.fr/chagall/en/practical-information'},
 {theme:'rivera',key:'anahuacalli',name:'阿纳瓦卡利博物馆',en:'Museo Anahuacalli',lon:-99.143,lat:19.297,country:'墨西哥',region:'墨西哥城',relation:'collection',summary:'里维拉收藏的前西班牙时期艺术在阿纳瓦卡利得到专门展示。建筑和收藏一起展开他对墨西哥艺术传统的认识。',observe:'比较石材、展陈与器物造型，再回看国民宫壁画中的历史叙事；这里是收藏与建筑空间，不是弗里达蓝屋。',source:'https://museoanahuacalli.org.mx/coleccion/'},
 {theme:'frida',also:['rivera'],key:'frida-rivera-studio',name:'圣安赫尔 · 里维拉与弗里达工作室',en:'Museo Casa Estudio Diego Rivera y Frida Kahlo',lon:-99.1975,lat:19.3504,country:'墨西哥',region:'墨西哥城',relation:'life-work',summary:'圣安赫尔的双工作室由胡安·奥戈尔曼设计，保留两位艺术家各自工作和生活的空间关系。它与科约阿坎蓝屋是不同的住宅。',observe:'观察相邻体量、连桥、采光和工作室尺度，分别理解弗里达与里维拉的创作；不要把建筑作者写成居住的画家。',source:'https://sic.gob.mx/ficha.php?table=museo&table_id=805'},
 {theme:'mendelssohn',key:'mendelssohn-leipzig',name:'莱比锡门德尔松故居',en:'Mendelssohn House Leipzig',lon:12.382,lat:51.334,country:'德国',region:'萨克森',relation:'life-work',summary:'莱比锡门德尔松故居是他晚年的居所，与城市里的音乐工作相联系。它让苏格兰旅行的音乐想象回到日常工作的房间。',observe:'将故居的家庭空间与舒曼故居、圣托马斯教堂对看；三位音乐家的生活属于不同年代，不是同行故事。',source:'https://www.mendelssohn-stiftung.de/en/museum'},
 {theme:'soseki',key:'soseki-sanbo',name:'东京 · 漱石山房纪念馆',en:'Natsume Soseki Memorial Museum',lon:139.7266,lat:35.7031,country:'日本',region:'东京',relation:'life-memorial',summary:'新宿的漱石山房纪念馆建立在漱石晚年生活与创作的地方，展示他与新宿的关系。馆内复原空间与原有住宅遗存需分别理解。',observe:'从书斋、书信与地方资料读写作日常，再与松山任教时期比较；伦敦则另属留学阶段。',source:'https://soseki-museum.jp/eng/soseki-natsume/soseki-and-shinjuku/'}
];
for(const addition of culturalPlaceAdditions){
 const {theme,also=[],...stop}=addition;
 for(const id of [theme,...also])culturalAtlasPack.themes.find(t=>t.id===id).stops.push({...stop});
}
const yuiProfile=culturalAtlasPack.themes.find(t=>t.id==='hiroshige').stops.find(s=>s.key==='yui');
yuiProfile.summary+=' 2026年11月核查：广重美术馆自2026年6月1日起休馆，官网计划2027年4月初重开；期间由比宿交流馆提供卫星展示，展品包括复刻版画。';
yuiProfile.observe+=' 当前探访应先核实休馆与交流馆安排，不将复刻展示称为江户原摺。';
yuiProfile.source='https://tokaido-hiroshige.jp/whatsnew/2026/05/post-316.html';
const mendelssohnProfile=culturalAtlasPack.themes.find(t=>t.id==='mendelssohn');
Object.assign(mendelssohnProfile,{name:'门德尔松：莱比锡与苏格兰',tagline:'从城市工作空间，听见旅行中的山海。',focus:'莱比锡的晚年居所，与苏格兰荷里路德和斯塔法岛的旅行印象，属于不同的生活阶段。音乐城市与海岛分别探访，不将它们复原成一次旅程。'});
const culturalMapDefinitions=[
 {id:'modern-architecture',name:'现代建筑：居住与地景',lens:'从住宅的尺度，看现代建筑如何回应地方',members:['wright','le-corbusier','aalto'],intro:'草原与沙漠中的工作室、法国的住宅实验、芬兰的公共建筑，呈现现代建筑对居住、材料与地形的不同回答。先从法国或芬兰的一组建筑开始探访，再对照其他地区的作品。',plans:[
  ['architecture-france','法国 · 别墅与集合住宅',['villa-savoye','unite-marseille'],5,[4,5,6,9,10],'城际铁路 + 当地公交','萨伏伊别墅与马赛公寓对读独栋住宅和集体居住。两地之间安排现代交通，属于建筑比较，不复原建筑师一次旅程。'],
  ['architecture-finland','芬兰 · 自宅、疗养院与市政厅',['aalto-house','paimio','saynatsalo'],6,[5,6,7,8,9],'城际交通 + 区域接驳','以赫尔辛基、图尔库附近和于韦斯屈莱附近为三个基地，比较家庭、医疗与公共生活的建筑尺度。六天包含区域转场，室内参观和导览另向各机构确认。']
 ]},
 {id:'setouchi-art',name:'濑户内：直岛的光、建筑与雕塑',lens:'在同一座岛上，比较建筑怎样安放艺术',members:['ando',{id:'noguchi',keys:['noguchi-mure']},{id:'turrell',keys:['minamidera']},{id:'sugimoto',keys:['sugimoto-glass']}],intro:'从本村的老聚落到岛南的美术馆，安藤忠雄的建筑、特瑞尔的光与杉本博司的神社改造，可以在直岛的真实空间中一起观看。隔海的牟礼则保留野口勇的工作室和石材庭园。',plans:[
  ['naoshima-honmura','直岛本村 · 暗室、神社与建筑',['ando-museum','minamidera','sugimoto-glass'],1,[3,4,5,6,9,10,11],'本村步行 + 岛内巴士','以本村聚落为基地，对照安藤博物馆、特瑞尔《南寺》与护王神社。建筑、艺术与改造作者分别阅读；特殊作品的预约和入场时段向倍乐生艺术站确认。'],
  ['naoshima-south','直岛南部 · 地下采光与海边美术馆',['chichu','benesse-house'],1,[3,4,5,6,9,10,11],'岛内巴士 + 美术馆步行','比较地中美术馆引入自然光的方式与倍乐生之家在海岸的展开。可与本村篇合成两天；牟礼需另行安排渡船与陆地交通，不画成跨海步行。']
 ]},
 {id:'paris-sculpture',name:'巴黎：艺术家的工作室、画院与收藏',lens:'从工作室的尺度，走向雕塑与身体，再对读画院与收藏',members:['rodin',{id:'brancusi',keys:['brancusi-paris']},{id:'giacometti',keys:['giacometti-institut']},{id:'picasso',keys:['picasso-paris']},{id:'wu-guanzhong',keys:['beaux-arts-paris']}],intro:'罗丹的花园与默东工作室、贾科梅蒂的工作空间、布朗库西留给巴黎的工作室收藏，让雕塑从展台回到制作、摆放与观看的环境。收藏与复原陈列各有开放安排，先选巴黎南岸，再安排默东。毕加索博物馆的作品与档案、吴冠中求学的美术学院，补充同一城市里收藏、学习与制作的不同关系；不把几位艺术家写成同期同行。',plans:[
  ['paris-art-collections','巴黎两馆 · 从绘画到雕塑',['picasso-paris','rodin-paris'],2,[3,4,5,6,9,10,11],'地铁 + 馆内步行','分两天阅读毕加索博物馆的作品与档案、罗丹博物馆的雕塑和花园。它们是收藏、研究与展陈地点，不等于艺术家同一次旅行或全部作品的制作现场。'],
  ['paris-art-learning','巴黎左岸 · 画院与雕塑工作空间',['beaux-arts-paris','rodin-paris','giacometti-institut'],2,[3,4,5,6,9,10,11],'地铁 + 分街区步行','以吴冠中的巴黎求学为起点，对读罗丹与贾科梅蒂的工作空间。学院周边可以作为城市观察范围，校园与室内展览的访问按校方安排；几位艺术家的经历属于不同年代。'],
  ['paris-sculpture-left-bank','巴黎左岸 · 花园与工作室',['rodin-paris','giacometti-institut'],2,[3,4,5,6,9,10,11],'地铁 + 街区步行','比较罗丹花园中雕塑与户外空间的关系，以及贾科梅蒂工作室陈列的紧密尺度。两天留给预约与细看，布朗库西收藏另查蓬皮杜中心的迁移与开放信息。'],
  ['rodin-paris-meudon','罗丹 · 巴黎与默东两种生活空间',['rodin-paris','rodin-meudon'],2,[4,5,6,9,10],'市郊铁路 / 公交 + 园内步行','巴黎的展陈花园与默东的居住、制作和纪念空间互相补充。默东的参访日程独立确认，不按地图直线当作步行路线。']
 ]},
 {id:'southern-france-painters',name:'南法画境：从普罗旺斯到蔚蓝海岸',lens:'从山的轮廓，到礼拜堂里的光',members:['cezanne','matisse',{id:'chagall',keys:['saint-paul-vence','chagall-nice']},{id:'vangogh',places:['vangogh-arles','vangogh-saintremy']}],intro:'艾克斯的画室与采石场、阿尔勒和圣雷米的生活地景、尼斯与旺斯的美术馆和礼拜堂，把南法的自然光转成不同的色彩语言。三个区域可分别出发，作品现藏地点在详情中另列。',plans:[
  ['aix-cezanne','艾克斯 · 塞尚的山与画室',['cezanne-studio','bibemus','sainte-victoire'],3,[4,5,6,9,10],'艾克斯基地 + 公交 / 当地接驳','从洛夫画室到比贝米采石场，再观察圣维克多山的轮廓。山体为地景代表点，不是登山入口；按实际开放与天气选择获准观景位置。'],
  ['nice-vence-colour','尼斯与旺斯 · 马蒂斯和夏加尔',['matisse-nice','chagall-nice','matisse-vence','saint-paul-vence'],4,[3,4,5,6,9,10,11],'尼斯基地 + 区域巴士 / 公路接驳','先在尼斯对看两座美术馆，再分别安排旺斯礼拜堂与圣保罗德旺斯。旺斯和圣保罗是不同城镇；比较色彩与光，不把几位画家的经历写成同次出游。'],
  ['south-vangogh','阿尔勒与圣雷米 · 梵高的麦田与城镇',['vangogh-arles','vangogh-saintremy'],3,[4,5,6,9,10],'区域接驳 + 城镇步行','比较阿尔勒的城市生活与圣雷米的丝柏、麦田题材；详情中的作品为各自现藏机构提供的图像，不声称原作仍在这些城镇。']
 ]},
 {id:'barcelona-art',name:'巴塞罗那：高迪建筑与毕加索的城市',lens:'看街区、建筑与艺术如何共同塑造一座城',members:['gaudi',{id:'picasso',keys:['picasso-barcelona']}],intro:'从老城的毕加索博物馆到扩展区的住宅与圣家堂，再到山坡上的古埃尔公园，用同一座城市的街区尺度理解两种艺术语言。巴黎馆藏留在毕加索的跨城地图。',plans:[
  ['barcelona-modern','巴塞罗那 · 老城到现代主义街区',['picasso-barcelona','casa-batllo','sagrada-familia','park-guell'],3,[3,4,5,6,9,10,11],'地铁 / 公交 + 分区步行','一天读老城与毕加索，另两天分别安排扩展区建筑和古埃尔公园。三天为当代城市探访参考，各馆与建筑门票独立预约。']
 ]},
 {id:'fuji-tokaido',name:'富士与东海道：北斋、广重的风景',lens:'从江户的桥，到骏河海岸的富士',members:[{id:'hokusai',country:'日本'},'hiroshige'],intro:'日本桥的行旅、江尻的风、由比的山海与三坂水面的倒影，把北斋和广重的版画放回关东与富士周边。地点表示题名区域或美术馆，不能当作复原机位；纽约的原作收藏通过作品卡另行定位。',artThemes:['hokusai','hiroshige'],plans:[
  ['fuji-suruga','骏河海岸 · 江尻与由比',['hokusai-ejiri','yui'],2,[3,4,5,10,11],'区域铁路 + 当地接驳','以静冈和清水一带为基地，对读北斋《骏州江尻》与广重的由比图像，由比广重美术馆2026年6月起休馆，官方计划2027年4月初重开；期间可向由比宿交流馆查询复刻版画展示，不能按原馆正常开放安排。风景代表点不标作古代作画位置，海岸天气与交通另查。'],
  ['fuji-views','富士北麓与诹访湖 · 水面的两种构图',['hokusai-kawaguchi','hokusai-suwa'],4,[4,5,10,11],'两地住宿 + 区域铁路 / 当地接驳','从御坂题名区域的倒影到诹访湖的远景，比较北斋怎样安排水面与山体。两地需安排转场；这里是画中区域，非具体历史机位，天气与山路开放另查。']
 ]},
 {id:'jiangnan-painting',name:'江南画家：水乡、山水与日常',lens:'从家乡与画院，看山水怎样进入日常',members:[{id:'wu-guanzhong',country:'中国'},'huang-binhong',{id:'feng-zikai',keys:['yuanyuantang','riyuelou']}],intro:'吴冠中的宜兴与杭州求学、黄宾虹的黄山与杭州生活、丰子恺的石门乡居和上海日月楼，放在江南共同的水乡与城市环境中对看。可以从杭州或石门出发，黄山另留山地行程；巴黎求学和重庆迁居各自保留在人物地图。',plans:[
  ['jiangnan-hangzhou','杭州 · 画院、西湖与山水记忆',['hangzhou-art-school','hangzhou'],2,[3,4,5,9,10,11],'杭州基地 + 市内交通 / 湖岸步行','从吴冠中的画院经历读到黄宾虹的杭州生活，沿西湖周边观察山体、树影与水面怎样化为绘画结构。杭州点表示城市生活范围，不能当成黄宾虹故居的导航地址。'],
  ['jiangnan-feng','石门与上海 · 丰子恺的乡居与日月楼',['yuanyuantang','riyuelou'],3,[3,4,5,9,10,11],'城际铁路 + 石门当地接驳','缘缘堂与日月楼对照乡镇家庭日常和上海写作翻译生活。此为两地当代探访，里弄仍有居民，室内访问和具体门址按机构信息确认。'],
  ['jiangnan-huangshan','黄山与杭州 · 黄宾虹的山水观看',['huangshan','hangzhou'],5,[4,5,9,10],'城际铁路 + 山区接驳','把黄山地形与杭州晚年生活分成两个停留基地，对看山体层次与笔墨密度。山地步道和缆车须另行规划，地图不复原画家某次完整游历。']
 ]},
 {id:'mexico-city-art',name:'墨西哥城：弗里达与里维拉',lens:'从房间里的生活，走向城市里的壁画',members:[{id:'frida',country:'墨西哥'},{id:'rivera',country:'墨西哥'}],intro:'科约阿坎蓝屋、圣安赫尔双工作室、里维拉的古代艺术收藏与国民宫壁画，构成墨西哥城可以分区探索的艺术地图。住宅、收藏和原址壁画各有自己的观看方式；底特律另保留美国阶段的资料。',plans:[
  ['mexico-homes','墨西哥城南部 · 蓝屋、双工作室与收藏',['frida-blue-house','frida-rivera-studio','anahuacalli'],3,[2,3,4,10,11],'市内交通 + 各馆步行','三个不同城区的艺术空间分别安排停留，比较弗里达的生活物件、双工作室的建筑与里维拉的收藏。三天为预留交通和预约的建议，不设三馆步行直达线。'],
  ['mexico-murals','墨西哥城 · 从蓝屋看向国民宫壁画',['frida-blue-house','mexico-palace'],2,[2,3,4,10,11],'市内交通 + 预约参访','把个人生活空间与里维拉的公共历史叙事并读。国民宫的参访安排需单独确认；若不可入内，先通过官方资料读壁画，不承诺现场开放。']
 ]},
 {id:'detroit-art',name:'底特律：弗里达、里维拉与工业城市',lens:'从城市经历，到庭院里的工业壁画',members:[{id:'frida',keys:['detroit']},{id:'rivera',keys:['dia-detroit']}],intro:'弗里达的底特律经历与里维拉在美术馆的《底特律工业》壁画属于同一城市的艺术故事。城市代表点提供生活背景，美术馆是原址作品，两者不能混作同一间画室或病房；墨西哥时期通过墨西哥城地图另读。',plans:[
  ['detroit-industry-art','底特律 · 城市背景与工业壁画',['detroit','dia-detroit'],2,[5,6,7,8,9,10],'市内交通 + 美术馆步行','第一天从底特律的城市背景读弗里达的经历，第二天细看美术馆庭院的多面壁画。城市点是范围示意，不能导航到历史病房或私人住所；不承诺任何特定作品当下展出，开放与预约向机构确认。']
 ]},
 {id:'european-music-cities',name:'欧洲音乐城市：房间、舞台与创作',lens:'选一座音乐城市，从真实空间开始聆听',members:['beethoven','liszt','schumanns','wagner','mahler',{id:'dvorak',country:'捷克'},{id:'mendelssohn',keys:['mendelssohn-leipzig']},{id:'handel',country:'德国'},{id:'bach',places:['bach-thomaskirche','bach-eisenach','bach-weimar','bach-kothen','bach-arnstadt']}],intro:'莱比锡的故居与教堂、魏玛的工作房间、波恩与杜塞尔多夫的城市生活，再到湖畔作曲小屋，让音乐史落到可以参访的地方。地图按本地探访安排，肖邦、北欧和苏格兰保留独立的地域故事。',plans:[
  ['music-leipzig','莱比锡 · 巴赫、舒曼与门德尔松',['bach-thomaskirche','schumann-leipzig','mendelssohn-leipzig'],2,[4,5,6,9,10],'市内交通 + 故居与教堂步行','在同一座城对读教会工作、家庭生活和音乐职业。三处属于不同音乐家与年代，音乐会节目和故居开放须分别查询。'],
  ['music-weimar','图林根 · 魏玛与艾森纳赫',['bach-weimar','liszt-weimar','bach-eisenach'],3,[4,5,6,9,10],'区域铁路 + 城内步行','比较魏玛的巴赫纪念地、李斯特故居和艾森纳赫巴赫博物馆。博物馆所称巴赫故居不作为已确认的出生屋；不同年代的音乐工作各自阅读。'],
  ['music-rhine','莱茵地区 · 波恩与杜塞尔多夫',['beethoven-bonn','dusseldorf'],3,[4,5,6,9,10],'区域铁路 + 城内步行','从波恩的贝多芬故居出发，再以杜塞尔多夫为基地了解克拉拉与罗伯特·舒曼。城市代表点不是精确工作室地址，具体展馆和音乐活动向当地机构确认。'],
  ['music-alpine-huts','阿尔卑斯两地 · 马勒的夏日作曲',['mahler-attersee','mahler-dobbiaco'],5,[6,7,8,9],'两地住宿 + 山区公路 / 铁路接驳','阿特湖与多比亚科是不同夏季的作曲空间，预留山地交通，不将两座小屋画成一段步行路线。开放季、预约和高地天气逐站核实。']
 ]},
 {id:'italian-art-journeys',name:'意大利：透纳与歌德的旅行目光',lens:'把旅行中的观看，放回城市的尺度',members:['turner','goethe'],intro:'从威尼斯的水城到罗马的旅居，再到那不勒斯，透纳的图像与歌德的文字提供不同的旅行目光。两位作者不曾同行；当代探访从罗马与南方一段开始，托斯卡纳的普契尼另作独立故事。',plans:[
  ['italy-rome-naples','罗马与那不勒斯 · 文字与风景',['goethe-rome','rome','naples'],5,[3,4,5,9,10,11],'城际铁路 + 城内步行','先在歌德之家读罗马旅居，再把两位旅行者的城市观察与那不勒斯对看。罗马城市点与具体住宅是不同尺度，没有把它们标成独立的跨城转场。']
 ]},
 {id:'jiangnan-poetry',name:'江南诗路：水城与山川',lens:'在城与山之间，读诗歌里的地方',members:['li-bai','bai-juyi',{id:'lu-you',keys:['shaoxing']}],intro:'宣城的敬亭山与桃花潭、杭州和苏州的水城生活、陆游故乡绍兴，让江南诗歌落到真实地域。山水题咏与任职、家乡是不同关系，先选宣城山川或苏杭水城的一段；奉节不拼进江南行程。',plans:[
  ['poetry-xuancheng','宣城 · 敬亭山与桃花潭',['jingting','taohuatan'],3,[3,4,5,9,10,11],'区域公路接驳 + 当地步行','两处属于宣城区域不同方向的诗歌地景，分别留出探访时间；《独坐敬亭山》与《赠汪伦》不是同一段旅程的游记，连线不复原古道。'],
  ['poetry-water-cities','杭州与苏州 · 白居易的水城',['hangzhou','suzhou'],4,[3,4,5,9,10,11],'城际铁路 + 城内步行','从两次任职的城市生活阅读白居易的诗歌与地方关系。两城不是同年同次出行；城内具体遗迹按地方档案另查。']
 ]}
];
// Former directory URLs now open ordinary maps. A person/place in an old URL wins
// over these broad defaults, preserving the reader's more specific destination.
const culturalMapAliases={
 'collection-modern-architecture':'modern-architecture','collection-setouchi-art':'setouchi-art',
 'collection-sculpture-studios':'paris-sculpture','collection-southern-france-painters':'southern-france-painters',
 'collection-spanish-painters':'barcelona-art','collection-japanese-painting':'fuji-tokaido',
 'collection-chinese-painting':'jiangnan-painting','collection-frida-rivera':'mexico-city-art',
 'collection-photography-places':'ansel-adams','collection-european-classical-music':'european-music-cities',
 'collection-nordic-music':'sibelius','collection-british-countryside':'constable',
 'collection-italian-art-journeys':'italian-art-journeys','collection-tang-song-poets':'jiangnan-poetry',
 'collection-modern-chinese-literature':'shen-congwen','collection-japanese-literature':'basho',
 'collection-european-writers':'hugo','collection-american-literature':'steinbeck'
};

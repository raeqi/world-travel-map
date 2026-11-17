"""Exact-place photo additions selected after reading Commons descriptions."""
import concurrent.futures,json,runpy,urllib.parse
from pathlib import Path
h=runpy.run_path(str(Path(__file__).with_name('fetch-editorial.py')));fetch,save,ROOT,clean=(h[k] for k in ['fetch','save','ROOT','clean'])
MANIFEST={
 'huanglong-photo':('1 huanglong pools aerial 2011.jpg','黄龙 / 钙华彩池，2011','wh-638'),
 'carcassonne-photo':('Carcassonne Cite.jpg','卡尔卡松 / 城墙要塞','wh-345'),
 'florence-photo':('Florence from the Duomo terrace (61408p).jpg','佛罗伦萨 / 从主教座堂露台看历史城区','wh-174'),
 'terracotta-photo':('Qin Terracotta Army, Pit 1 03.jpg','西安 / 秦兵马俑一号坑','wh-441'),
 'montealban-photo':('Monte Alban Oaxaca 1976 - Oaxaca Valley.jpg','阿尔班山 / 遗址与瓦哈卡谷地，1976','wh-415'),
 'bluemountains-photo':('Blue Mountains National Park (AU), Three Sisters -- 2019 -- 1987-9.jpg','大蓝山 / 三姐妹岩，2019','wh-917'),
 'chicago66-photo':('Begin Route 66 sign in Chicago (June 2025).jpg','芝加哥 / 历史66号公路起点标志，2025','route66-chicago'),

 'xituo-photo':('西沱镇 - panoramio.jpg','西沱 / 山城与江岸','xituo'),
 'sarria-photo':('Puente medieval sobre el río Celeiro, Sarria, Camino de Santiago, Lugo, España, 2015-09-19, DD 07.jpg','萨里亚 / 塞莱罗河上的中世纪桥','camino-sarria'),
 'aletsch-photo':('Aletsch Glacier Panorama - panoramio.jpg','阿雷奇冰川 / 山地全景','wh-1037'),
 'sydney-photo':('Sydney (AU), Opera House -- 2019 -- 3054.jpg','悉尼 / 歌剧院，2019','wh-166'),
 'sundarbans-photo':('Blue-tailed Bee-eater in Sundarbans National Park July 2025 by Tisha Mukherjee 03.jpg','印度孙德尔本斯国家公园 / 蓝尾蜂虎，2025','wh-452'),
 'huangshan-photo':('Huangshan Yingkesong.jpg','黄山 / 迎客松','wh-547|xu-huangshan'),
 'dolomites-photo':('Passo Pordoi-bops 01.jpg','多洛米蒂 / 波尔多伊山口','wh-1237'),
 'alhambra-photo':('Alhambra in the evening.jpg','格拉纳达 / 阿尔罕布拉宫暮色','wh-314'),
 'forbidden-photo':('Sunset of the Forbidden City 2006.JPG','北京 / 紫禁城日落，2006','wh-439|xu-beijing'),
 'abusimbel-photo':('Templo de Ramsés II, Abu Simbel, Egipto, 2022-04-02, DD 26-28 HDR.jpg','阿布辛拜勒 / 拉美西斯二世神庙','wh-88'),
 'shenandoah-photo':('2005-05-21 13-40-05 Riprap Overlook looking west Shenandoah National Park VA.jpg','谢南多厄 / Riprap 观景点向西','np-shen'),
 'olympic-photo':('Hoh Rain Forest Olympic June 2018 001.jpg','奥林匹克国家公园 / 霍河雨林','np-olym'),
 'kalimpong-photo':('View of Kalimpong, India.jpg','噶伦堡 / 今日山城景观','tea-kalimpong'),
 'kathmandu-photo':('Saddhu at Durbar Square, Kathmandu (edited).jpg','加德满都 / 杜巴广场的苦行者','tea-kathmandu'),
 'xian-photo':("City wall of Xi'an 51550-Xian (27959363326).jpg",'西安 / 城墙','silk-xian'),
 'jiaohe-photo':('Jiaohe City(Yarkhoto),Turpan,Xinjiang HY8.jpg','吐鲁番 / 交河故城','silk-turpan'),
 'dunhuang-photo':('Dunhuang Mogao Ku 2013.12.31 12-30-18.jpg','敦煌 / 莫高窟外景，2013','polo-dunhuang'),
 'tiantai-photo':('Tiantai Guoqing Temple (a Bridge).jpg','天台 / 国清寺桥景','xu-tiantai'),
 'kaifeng-photo':('20250622 Dragon Pavilion 01.jpg','开封 / 龙亭，2025','xu-kaifeng'),
 'jizu-photo':('Jizu Mountain 20180218.jpg','鸡足山 / 山地景观','xu-jizu'),
 'hosshinmon-photo':('HOSSHINMON-oji.JPG','熊野古道 / 发心门王子社','kumano-hosshinmon'),
 'lucca-photo':('Lucca.city walls01.jpg','卢卡 / 城墙','francigena-lucca'),
 'desaguadero-photo':('Río Desaguadero (Frontera Perú - Bolivia).jpg','德萨瓜德罗 / 秘鲁与玻利维亚边界河景，非古道路面','andes-desaguadero'),
 'socoroma-photo':('2012 at Socoroma.jpg','索科罗马 / 村落，2012','andes-socoroma'),
 'huanuco-photo':('2017.08 Huanuco Pampa.jpg','瓦努科潘帕 / 考古遗址','andes-huanuco'),
 'york-photo':('Jorvik Centre York - geograph.org.uk - 5565661.jpg','约克 / JORVIK 维京中心外观（当代展馆）','viking-york'),
 'thingvellir-photo':('Roca de la Ley, Parque Nacional de Þingvellir, Suðurland, Islandia, 2014-08-16, DD 022.JPG','辛格维利尔 / 法律岩与议会地景','viking-thingvellir'),
 'albuquerque-photo':('Luna Lodge, Albuquerque NM.jpg','阿尔伯克基 / 历史66号公路的 Luna Lodge','route66-albuquerque'),
 'takijiri-photo':('Kumano Kodo pilgrimage route Nakahechi From Takijiri-Oji To Gyuba-Doji World heritage 熊野古道 中辺路 滝尻王子～牛馬童子06.JPG','熊野古道 / 泷尻王子至牛马童子区间（区域定位）','kumano-takijiri'),
 'lausanne-photo':('Lausanne Cathedral (february 2025).jpg','洛桑 / 主教座堂，2025','francigena-lausanne'),
 'yaan-photo':('Picking tea yaan.jpg','雅安 / 采茶','tea-yaan'),
}
ALLOWED={'CC0','Public domain','CC BY 2.0','CC BY 2.5','CC BY 3.0','CC BY 4.0','CC BY-SA 2.0','CC BY-SA 3.0','CC BY-SA 4.0'}
if __name__=='__main__':
 sourcesPath=ROOT/'assets/editorial/sources.json';sources=json.loads(sourcesPath.read_text());entries=[]
 # Small batches keep the exact selected file identity visible and avoid query limits.
 lookup={}
 for offset in range(0,len(MANIFEST),15):
  selected=list(MANIFEST.values())[offset:offset+15]
  q=urllib.parse.urlencode(dict(action='query',format='json',prop='imageinfo',titles='|'.join('File:'+v[0] for v in selected),iiprop='url|extmetadata',iiurlwidth=1440))
  for p in json.loads(fetch('https://commons.wikimedia.org/w/api.php?'+q))['query']['pages'].values():lookup[p['title'].removeprefix('File:')]=p
 for key,(filename,title,ids) in MANIFEST.items():
  p=lookup.get(filename);assert p and 'imageinfo' in p,filename
  i=p['imageinfo'][0];m=i['extmetadata'];lic=clean(m['LicenseShortName']['value']);assert lic in ALLOWED,(key,lic)
  entries.append((key,dict(title=title,author=clean(m.get('Artist',{}).get('value','作者未署名（Commons 元数据未列 Artist）')),source=i['descriptionurl'],license=lic,licenseUrl=m.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Public_domain'),download=i.get('thumburl',i['url']),originalDownload=i['url'],verified='2026-11-17',providerMetadata=m,relatedPlaceIds=ids.split('|'),verification='Specific Commons file and description reviewed; licensed image matched to the named place, not to its country or theme.')))
 def cached(item):
  k,m=item
  if k in sources and (ROOT/sources[k]['path']).exists() and sources[k]['source']==m['source']:return k,sources[k]
  result=save(item);sources[k]=result[1];return result
 added=dict(concurrent.futures.ThreadPoolExecutor(3).map(cached,entries));sources.update(added);sourcesPath.write_text(json.dumps(sources,ensure_ascii=False,indent=2)+'\n')
 runtime={k:{field:m[field] for field in ['path','title','author','source','license','licenseUrl','changes']} for k,m in added.items()}
 mappings={id:k for k,m in added.items() for id in m['relatedPlaceIds']}
 (ROOT/'route-photo-media.js').write_text("'use strict';\nObject.assign(photoLibrary,"+json.dumps(runtime,ensure_ascii=False,indent=1)+");\nObject.assign(editorialPlacePhotos,"+json.dumps(mappings,ensure_ascii=False,indent=1)+");\n")
 print('Verified',len(added),'files;',sum(m['bytes'] for m in added.values()),'bytes',flush=True)

"""Reproducible, explicit media manifest. Fail closed when permission is missing."""
import concurrent.futures, json, runpy, urllib.parse
from pathlib import Path
helpers=runpy.run_path(str(Path(__file__).with_name('fetch-editorial.py')))
fetch,save,ROOT,clean=(helpers[k] for k in ['fetch','save','ROOT','clean'])
COMMONS={
 'canal-beijing-photo':('Tonghui River west of Guanghui Br, Xidawang Rd (20240308112511).jpg','北京 / 今日通惠河，广惠桥西'),
 'canal-tongzhou-photo':('Stone Boat docking Tongzhou Grand Canal Park.jpg','通州 / 运河公园今日河岸与石舫'),
 'canal-tianjin-photo':('三岔河口in河北区.jpg','天津 / 三岔河口'),
 'canal-linqing-photo':('临清运河钞关.webp','临清 / 运河钞关'),
 'canal-jining-photo':('A Ship in Jining 0787.jpg','济宁 / 运河河段，船与水岸（非南旺工程现场）'),
 'canal-huaian-photo':('清江浦大闸口.JPG','淮安 / 清江浦大闸口'),
 'canal-yangzhou-photo':('Yangzhou-Old-Grand-Canal-3301.JPG','扬州 / 古运河'),
 'canal-zhenjiang-photo':('Jiangsu Zhenjiang Dantu - Dashancun - Jinghang Canal IMG 6719.jpg','镇江丹徒 / 今日京杭运河（非京口闸遗址）'),
 'canal-suzhou-photo':('Precious Belt Bridge -- Suzhou, China -- Oct 2001.jpg','苏州 / 宝带桥，2001'),
 'canal-jiaxing-photo':('20240120 The Grand Canal in Jiaxing.jpg','嘉兴 / 大运河，2024'),
 'jiuzhaigou-photo':('1 jiuzhaigou valley wu hua hai 2011b.jpg','九寨沟 / 五花海'),
 'wuyi-photo':('Wuyi Mountains Sea of clouds 4.jpg','武夷山 / 九曲溪与玉女峰'),
 'joshua-photo':('Joshua Tree National Park 2013.jpg','约书亚树国家公园 / 沙漠植被与岩石'),
 'khangchendzonga-photo':('Khangchendzonga National Park banner.jpg','干城章嘉国家公园 / 山地全景')
}
MET={
 'vangogh-selfportrait':(436532,'梵高 / 戴草帽的自画像，1887'),
 'vangogh-ginoux':(436529,'梵高 / 阿尔勒女人：吉努夫人，1888–1889'),
 'vangogh-irises':(436528,'梵高 / 鸢尾花，1890'),
 'vangogh-shoes':(436533,'梵高 / 鞋，1888'),
 'vangogh-roses':(436534,'梵高 / 玫瑰，1890'),
}
def metadata():
 query=urllib.parse.urlencode(dict(action='query',format='json',prop='imageinfo',titles='|'.join('File:'+v[0] for v in COMMONS.values()),iiprop='url|extmetadata',iiurlwidth=1440))
 pages=json.loads(fetch('https://commons.wikimedia.org/w/api.php?'+query))['query']['pages'].values()
 lookup={p['title'].removeprefix('File:'):p for p in pages}
 entries=[]
 for key,(filename,title) in COMMONS.items():
  p=lookup.get(filename);assert p and 'imageinfo' in p,filename
  i=p['imageinfo'][0];m=i['extmetadata'];lic=clean(m['LicenseShortName']['value'])
  assert lic in ['CC0','Public domain','CC BY 2.0','CC BY 2.5 cn','CC BY 3.0','CC BY 4.0','CC BY-SA 3.0','CC BY-SA 4.0'],(key,lic)
  entries.append((key,dict(title=title,author=clean(m['Artist']['value']),source=i['descriptionurl'],license=lic,licenseUrl=m.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Public_domain'),download=i.get('thumburl',i['url']),originalDownload=i['url'],verified='2026-11-17',providerMetadata=m,verification='Specific Commons file imageinfo and extmetadata; no inferred thematic fallback.')))
 for key,(id,title) in MET.items():
  j=json.loads(fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+str(id)));assert j['isPublicDomain'] and j['primaryImage'],id
  entries.append((key,dict(title=title,author=j['artistDisplayName']+' / The Metropolitan Museum of Art',source=j['objectURL'],license='CC0',licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/',download=j['primaryImage'],verified='2026-11-17',providerMetadata=j,verification='Met object API isPublicDomain=true and primaryImage available; Met Open Access CC0.')))
 return entries
if __name__=='__main__':
 sourcePath=ROOT/'assets/editorial/sources.json';sources=json.loads(sourcePath.read_text());entries=metadata()
 def cached(item):
  key,m=item
  if key in sources and (ROOT/sources[key]['path']).exists() and sources[key]['source']==m['source']:return key,sources[key]
  return save(item)
 added=dict(concurrent.futures.ThreadPoolExecutor(3).map(cached,entries));sources.update(added);sourcePath.write_text(json.dumps(sources,ensure_ascii=False,indent=2)+'\n')
 runtime={k:{field:m[field] for field in ['path','title','author','source','license','licenseUrl','changes']} for k,m in added.items()}
 (ROOT/'depth-media.js').write_text("'use strict';\n// Per-file permission and verification evidence: assets/editorial/sources.json.\nObject.assign(photoLibrary,"+json.dumps(runtime,ensure_ascii=False,indent=1)+");\n")
 print('Verified and saved',len(added),'assets',sum(m['bytes'] for m in added.values()),flush=True)

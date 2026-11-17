"""Verified museum images for the discovery edition; never infer permission from artist dates."""
import concurrent.futures,json,runpy,urllib.request
from pathlib import Path
helpers=runpy.run_path(str(Path(__file__).with_name('fetch-editorial.py')))
ROOT=helpers['ROOT'];fetch=helpers['fetch'];save=helpers['save']
MET=[('sisley-villeneuve',437680,'阿尔弗雷德·西斯莱 / 维尔纳夫拉加雷讷的桥，1872'),('pissarro-pontoise',437299,'卡米耶·毕沙罗 / 蓬图瓦兹的雅莱山，1867'),('manet-argenteuil',436965,'爱德华·马奈 / 阿让特伊花园中的莫奈一家，1874'),('vangogh-cypresses',437980,'文森特·梵高 / 丝柏，1889'),('vangogh-wheat',436535,'文森特·梵高 / 丝柏麦田，1889')]
entries=[]
for key,id,title in MET:
 j=json.loads(fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+str(id)))
 assert j['isPublicDomain'] and j['primaryImage'],(id,'not currently an open image')
 entries.append((key,dict(title=title,author=j['artistDisplayName']+' / The Metropolitan Museum of Art',source=j['objectURL'],license='CC0',licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/',download=j['primaryImage'],verified='2026-11-17',verification='Met Collection API isPublicDomain=true and a primary image; Met Open Access CC0 policy.',providerMetadata=j)))
for key,id,slug,uuid,title,author in [('vangogh-auvers',163323,'green-wheat-fields-auvers','b479275a-4f8a-4702-83c2-9dcc4cbe60ce','文森特·梵高 / 欧韦的绿麦田，1890','Vincent van Gogh'),('monet-london',46523,'houses-parliament-sunset','9eae6258-ec1c-442f-b353-a89cff510113','克洛德·莫奈 / 国会大厦，日落，1903','Claude Monet')]:
 entries.append((key,dict(title=title,author=author+' / National Gallery of Art, Washington',source=f'https://www.nga.gov/artworks/{id}-{slug}',license='Public domain',licenseUrl='https://www.nga.gov/terms-and-notices',download=f'https://api.nga.gov/iiif/{uuid}/full/!1440,1200/0/default.jpg',verified='2026-11-17',verification='NGA object page explicitly states media is free and in the public domain.')))
results=dict(concurrent.futures.ThreadPoolExecutor(3).map(save,entries))
p=ROOT/'assets/editorial/sources.json';j=json.loads(p.read_text());j.update(results);p.write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n')
small={k:{x:v[x] for x in ['path','title','author','source','license','licenseUrl','changes']} for k,v in results.items()}
(ROOT/'art-media.js').write_text("'use strict';\n// Verified museum evidence is retained in assets/editorial/sources.json.\nObject.assign(photoLibrary,"+json.dumps(small,ensure_ascii=False,indent=1)+");\n")
print('Verified and saved',len(results),'new museum images.')

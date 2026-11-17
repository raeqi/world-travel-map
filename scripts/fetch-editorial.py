"""Fetch verified reusable sources; resize only, never recolour artworks. Pillow required."""
import concurrent.futures, hashlib, html, io, json, re, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image, ImageOps
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/editorial'
COMMONS={
 'andes-trail':('Inca Trail mountain (Unsplash).jpg','秘鲁 / 印加步道山景'),
 'nakasendo-print':('Kisokaido42_Tsumago.jpg','妻笼宿 / 木曾街道六十九次'),
 'nakasendo-photo':('Tsumago-juku.jpg','妻笼宿今日街景'),
 'viking-stone':('Hedeby_Museum,_rune_stone.jpg','海泽比博物馆符文石（投影突出铭文）'),
 'buddhist-temple':('Mahabodhi_temple.jpg','菩提伽耶 / 摩诃菩提寺'),
 'nc500-pass':('Bealach_na_ba.jpg','Bealach na Bà / 向卡伦湖眺望'),
 'francigena-valley':("Via_Francigena_in_Val_d'Orcia.jpg",'奥尔恰谷 / San Quirico 至 Radicofani 之间'),
 'canal-bridge':('Hangzhou_Gongchen_Qiao_2015.08.01_07-28-03.jpg','杭州 / 拱宸桥'),
 'mozart-score':('Mozart_-_Church_sonata_K._329_-_autograph,_Staatsbibliothek_zu_Berlin,_f._1r.png','莫扎特 / 教堂奏鸣曲 K.329 亲笔谱首页，1779'),
 'andes-document':('Qhapaq_Ñan_Poma_de_Ayala.jpg','Guaman Poma de Ayala / 王家道路管理者，约 1615–1616'),
 'route66-road':('Route_66_in_Cuervo,_NM_from_W_1.JPG','新墨西哥州 Cuervo / 历史 66 号公路'),
 'route66-sign':('HISTORIC_OKLAHOMA_ROUTE_66.png','俄克拉何马 / 历史 66 号公路标志'),
 'monet-sunrise':('Monet_-_Impression,_Sunrise.jpg','克洛德·莫奈 / 印象·日出，1872')}
UA={'User-Agent':'WorldTravelMap/1.0 (cultural atlas, reusable media attribution)'}
def fetch(u):
 with urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60) as r:return r.read()
def clean(s):return html.unescape(re.sub('<[^>]+>','',s)).strip()
def commons(item):
 key,(file,title)=item
 query=urllib.parse.urlencode({'action':'query','format':'json','prop':'imageinfo','titles':'File:'+file,'iiprop':'url|extmetadata'})
 raw=json.loads(fetch('https://commons.wikimedia.org/w/api.php?'+query))
 i=next(iter(raw['query']['pages'].values()))['imageinfo'][0];m=i['extmetadata']
 license=m['LicenseShortName']['value']
 assert license in ['Public domain','CC0','CC BY-SA 4.0'],(file,license)
 return key,{'title':title,'author':clean(m['Artist']['value']),'source':'https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(file),'license':license,'licenseUrl':m.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Public_domain'),'download':i['url'].split('?')[0],'verified':'2026-11-17','providerMetadata':m}
def save(item):
 key,meta=item
 data=fetch(meta['download']);im=ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert('RGB');original=im.size
 im.thumbnail((1440,1200),Image.Resampling.LANCZOS)
 path=OUT/(key+'.webp');im.save(path,'WEBP',quality=84,method=6)
 meta.update(path='assets/editorial/'+path.name,width=im.width,height=im.height,bytes=path.stat().st_size,originalDimensions=list(original),sha256=hashlib.sha256(path.read_bytes()).hexdigest(),changes='EXIF orientation applied; proportional downsize; WebP compression. Full image retained in file; responsive cover crops in UI; no colour changes. CC BY-SA derivatives retain source licence.')
 print(key,im.size,path.stat().st_size,flush=True)
 return key,meta
if __name__=='__main__':
 OUT.mkdir(exist_ok=True)
 entries=list(concurrent.futures.ThreadPoolExecutor(4).map(commons,COMMONS.items()))
 for key,id,slug,uuid,title in [('monet-rouen',46524,'rouen-cathedral-west-facade','413faf9b-5d86-468a-8363-eea43c7fe9ba','克洛德·莫奈 / 鲁昂主教座堂，西立面，1894'),('monet-bridge',74796,'japanese-footbridge','0b9cefb5-1ee4-401a-8154-8d4039191a28','克洛德·莫奈 / 日本桥，1899')]:
  entries.append((key,dict(title=title,author='Claude Monet / National Gallery of Art, Washington',source=f'https://www.nga.gov/artworks/{id}-{slug}',license='Public domain',licenseUrl='https://www.nga.gov/terms-and-notices',download=f'https://api.nga.gov/iiif/{uuid}/full/!1440,1200/0/default.jpg',verified='2026-11-17',verification='Object page explicitly states media is free and in the public domain.')))
 j=json.loads(fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/437310'));assert j['isPublicDomain']
 entries.append(('pissarro-paris',dict(title='卡米耶·毕沙罗 / 冬日早晨的蒙马特大道，1897',author='Camille Pissarro / The Metropolitan Museum of Art',source=j['objectURL'],license='CC0',licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/',download=j['primaryImage'],verified='2026-11-17',verification='Met API isPublicDomain=true; Met Open Access CC0 policy.',providerMetadata=j)))
 results=dict(concurrent.futures.ThreadPoolExecutor(4).map(save,entries))
 (OUT/'sources.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
 print('Total',sum(m['bytes'] for m in results.values()))

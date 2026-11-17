"""Materialize place-matched Commons media; never substitute another place."""
import concurrent.futures, hashlib, html, io, json, re, time, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image, ImageOps
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/cultural-atlas'; OUT.mkdir(exist_ok=True)
PACK=json.loads((ROOT/'data/cultural-expansion/live-atlas.json').read_text())
UA={'User-Agent':'TerraMosaic/1.0 (https://github.com/raeqi/world-travel-map; geographic cultural atlas)'}
def get(url):
 for attempt in range(4):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=45) as r:return r.read()
  except Exception:
   if attempt==3:raise
   time.sleep(1+attempt*2)
def api(host,params):return json.loads(get('https://'+host+'/w/api.php?'+urllib.parse.urlencode({'format':'json',**params})))
def clean(text):return html.unescape(re.sub('<[^>]+>','',text)).strip()
OVERRIDES={"liszt-weimar":"Liszthaus in Weimar (Südostansicht).jpg","mahler-attersee":"Steinbach Gustav Mahler Komponierhäuschen 2.JPG","mahler-dobbiaco":"Composing hut Gustav Mahler Toblach.jpg","taohuatan":"Jingxian Taohuatan 2017.08.19 06-47-25.jpg","stampa":"Stampa Brücke.jpg","moore-institute":"Henry Moore Institute, Leeds (8th February 2018).jpg","sun-tunnels":"Nancy Holt, Sun Tunnels, 1973-1976.jpg","farleys":"Farley Farm House, Chiddingly - geograph.org.uk - 3561603.jpg","tahiti":"Paul Gauguin 011.jpg","hangzhou":"West Lake Panorama at Dusk.jpg","suzhou":"2017-04-17 Shantang River, Suzhou 02.jpg","hulan":"Harbin Scenes 哈爾濱景色 (1792346014).jpg","xiangtan":"Third Xiangjiang Bridge in Xiangtan.jpg","sugimoto-glass":"Art House Project Go o Shrine・ Appropriate Proportion 2002 Hiroshi Sugimoto (8953326989).jpg"}
DISABLED=["lantian","huangzhou"]
existing=json.loads((OUT/'sources.json').read_text()) if (OUT/'sources.json').exists() else {}
def image(stop):
 key='atlas-'+stop['key']; title=stop['wiki']
 if stop['key'] in DISABLED:return key,None,'Lead image rejected after place-content review; no unrelated substitute'
 expected=OVERRIDES.get(stop['key'])
 if key in existing and (ROOT/existing[key]['path']).exists() and (not expected or urllib.parse.unquote(existing[key]['source'].split('File:')[-1]).replace('_',' ')==expected.replace('_',' ')):return key,existing[key],None
 try:
  if stop['key'] in OVERRIDES:
   file=OVERRIDES[stop['key']]
  else:
   wiki=api('en.wikipedia.org',{'action':'query','prop':'pageimages','titles':title,'piprop':'name|original','redirects':1})
   p=next(iter(wiki['query']['pages'].values()));file=p.get('pageimage')
  if not file:raise ValueError('No lead image for exact article '+title)
  raw=api('commons.wikimedia.org',{'action':'query','prop':'imageinfo','titles':'File:'+file,'iiprop':'url|size|extmetadata','iiurlwidth':1440})
  page=next(iter(raw['query']['pages'].values()))
  if 'imageinfo' not in page:raise ValueError('Image is not an openly licensed Commons file: '+file)
  info=page['imageinfo'][0];meta=info.get('extmetadata',{});license=clean(meta.get('LicenseShortName',{}).get('value',''))
  if not re.match(r'^(Public domain|CC0|CC BY(?:-SA)? (?:[1-4]\.0|2\.5)(?: [a-z]{2})?|CC-BY(?:-SA)?-[1-4]\.0)$',license):raise ValueError('Licence requires individual review: '+license)
  if any(x in file.lower() for x in ['logo','signature','coat of arms','locator','map.svg','flag of','chinaxian','chinaharbin']):raise ValueError('Lead image is a symbol/map, not a place photograph')
  url=info.get('thumburl') or info['url']
  im=ImageOps.exif_transpose(Image.open(io.BytesIO(get(url)))).convert('RGB')
  if min(im.size)<200:raise ValueError('Image too small')
  im.thumbnail((1440,1200),Image.Resampling.LANCZOS);path=OUT/(key+'.webp');im.save(path,'WEBP',quality=83,method=6)
  result={'path':str(path.relative_to(ROOT)),'title':stop['name']+' · '+file.rsplit('.',1)[0].replace('_',' '),'author':clean(meta.get('Artist',{}).get('value','Wikimedia Commons contributor')),'source':'https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(file),'license':license,'licenseUrl':meta.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Public_domain'),'changes':'按比例缩小并压缩为 WebP，文件保留全幅；界面封面可能裁切，未重绘或调色。衍生图片保留原许可。','placeKey':stop['key'],'article':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(title.replace(' ','_')),'providerDescription':clean(meta.get('ImageDescription',{}).get('value','')),'width':im.width,'height':im.height,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
  if stop['key']=='xiangtan':result['title']='湘潭湘江城市环境 · 第三湘江大桥，2020年（非齐白石旧居）'
  if stop['key']=='sugimoto-glass':result['title']='杉本博司 · 直岛护王神社《适当的比例》'
  if stop['key']=='tahiti':result['title']='保罗·高更《塔希提风景》，1891（画作，非现场照片）'
  if stop['key']=='hulan':result['title']='呼兰萧红童年故居，2007年修缮中的现场照片'
  print('OK',key,license,flush=True);return key,result,None
 except Exception as error:
  print('PENDING',key,str(error),flush=True);return key,None,str(error)
stops={s['key']:s for t in PACK['themes'] for s in t['stops']}
results=list(concurrent.futures.ThreadPoolExecutor(2).map(image,stops.values()))
media={key:value for key,value,error in results if value}
pending={key:error for key,value,error in results if error}
(OUT/'sources.json').write_text(json.dumps(media,ensure_ascii=False,indent=2)+'\n')
(OUT/'pending.json').write_text(json.dumps(pending,ensure_ascii=False,indent=2)+'\n')
(ROOT/'cultural-atlas-data.js').write_text("'use strict';\nconst culturalAtlasPack="+json.dumps(PACK,ensure_ascii=False,separators=(',',':'))+";\n")
(ROOT/'cultural-atlas-media.js').write_text("'use strict';\nconst culturalAtlasMedia="+json.dumps(media,ensure_ascii=False,separators=(',',':'))+";\n")
print(json.dumps({'themes':len(PACK['themes']),'places':len(stops),'images':len(media),'pendingImages':len(pending)}),flush=True)

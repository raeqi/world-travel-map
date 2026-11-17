"""Download reviewable exact-place Commons photographs; fail rather than invent media."""
import base64, concurrent.futures, hashlib, html, io, json, re, time, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
from pyproj import Transformer
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/natural-atlas'; OUT.mkdir(parents=True,exist_ok=True)
SEEDS=json.loads((ROOT/'data/natural-maps/media-seeds.json').read_text())
UA={'User-Agent':'TerraMosaic/1.0 (https://github.com/raeqi/world-travel-map; sourced natural-place photographs)'}
def get(url):
 for attempt in range(4):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=40) as r:return r.read()
  except Exception:
   if attempt==3:raise
   time.sleep(2+attempt*3)
def api(host,params):
 return json.loads(get('https://'+host+'/w/api.php?'+urllib.parse.urlencode({'format':'json',**params})))
def clean(s):return html.unescape(re.sub('<[^>]+>','',s or '')).strip()
def candidate(info,page):
 meta=info.get('extmetadata',{}); license=clean(meta.get('LicenseShortName',{}).get('value',''))
 if not re.match(r'^(Public domain|CC0|CC BY(?:-SA)? (?:[1-4]\.0|2\.5)(?: [a-z]{2})?|CC-BY(?:-SA)?-[1-4]\.0)$',license):return None
 title=page['title'].removeprefix('File:')
 if any(t in title.lower() for t in ['.svg','.pdf','logo','signature','coat of arms','map of','locator','flag of','painting','1967','helipad','interior','lithograph','diagram','map.png','map.jpg']):return None
 if min(info.get('width',0),info.get('height',0))<400:return None
 return title,license,meta
existing=json.loads((OUT/'sources.json').read_text()) if (OUT/'sources.json').exists() else {}
def image(seed):
 key='natural-'+seed['id']
 if seed.get('skipImage'):return key,None,{'id':seed['id'],'skipped':True}
 if key in existing and (ROOT/existing[key]['path']).exists() and not seed.get('file') and not seed.get('refresh'):
  item=dict(existing[key]);item['title']=seed.get('caption',item['title']);return key,item,{'id':seed['id'],'cached':True}
 record={'id':seed['id']}
 try:
  file=seed.get('file')
  if seed.get('wiki'):
   w=api('en.wikipedia.org',{'action':'query','titles':seed['wiki'],'prop':'pageimages|coordinates','piprop':'name','coprimary':'primary','colimit':1,'redirects':1})
   p=next(iter(w['query']['pages'].values()))
   record['wikiCoordinates']=p.get('coordinates',[])
   record['article']='https://en.wikipedia.org/wiki/'+urllib.parse.quote(p.get('title',seed['wiki']).replace(' ','_'))
   if not file:file=p.get('pageimage')
  params={'action':'query','prop':'imageinfo','iiprop':'url|size|extmetadata','iiurlwidth':1280}
  if file:params['titles']='File:'+file
  else:params.update({'generator':'search','gsrsearch':'intitle:"'+seed.get('search',seed.get('wiki',seed['id']))+'"','gsrnamespace':6,'gsrlimit':8})
  raw=api('commons.wikimedia.org',params)
  pages=list(raw.get('query',{}).get('pages',{}).values())
  pages.sort(key=lambda p:p.get('index',0))
  picked=None
  for page in pages:
   if not page.get('imageinfo'):continue
   info=page['imageinfo'][0];valid=candidate(info,page)
   if valid:picked=(info,valid);break
  if not picked:raise ValueError('No place-specific freely licensed photo')
  info,(file,license,meta)=picked
  im=ImageOps.exif_transpose(Image.open(io.BytesIO(get(info.get('thumburl') or info['url'])))).convert('RGB')
  if min(im.size)<300:raise ValueError('Downloaded image too small')
  im.thumbnail((1280,1000),Image.Resampling.LANCZOS)
  path=OUT/(key+'.webp');im.save(path,'WEBP',quality=84,method=6)
  item={'path':str(path.relative_to(ROOT)),'title':seed.get('caption',seed['name']+' · '+file.rsplit('.',1)[0].replace('_',' ')),'author':clean(meta.get('Artist',{}).get('value','Wikimedia Commons contributor')),'source':'https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(file),'license':license,'licenseUrl':meta.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Public_domain'),'changes':'等比例缩小与 WebP 压缩，文件保留全幅；界面封面可能裁切，未重绘或调色，衍生图保留原许可。','placeKey':seed['id'],'providerDescription':clean(meta.get('ImageDescription',{}).get('value','')),'width':im.width,'height':im.height,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
  record.update({'file':file,'license':license,'description':item['providerDescription'][:700]})
  return key,item,record
 except Exception as error:
  record['error']=str(error);return key,None,record
results=list(concurrent.futures.ThreadPoolExecutor(2).map(image,SEEDS))
media={k:m for k,m,r in results if m};records=[r for k,m,r in results]
transform=Transformer.from_crs(2193,4326,always_xy=True)
for seed in SEEDS:
 if seed.get('nztm'):
  lon,lat=transform.transform(*seed['nztm'])
  next(r for r in records if r['id']==seed['id'])['docCoordinates']={'lon':round(lon,6),'lat':round(lat,6),'nztm':seed['nztm']}
# Primary OSM objects are used only to review named trailheads; no route geometry is inferred.
import xml.etree.ElementTree as ET
queries=[
 ('glade',(167.91,-44.95,167.96,-44.91)),
 ('routeburn',(168.26,-44.73,168.29,-44.71)),
 ('divide',(168.11,-44.83,168.13,-44.81)),
 ('iris',(167.49,-45.41,167.53,-45.39)),
 ('torres',(-72.99,-51.01,-72.93,-50.93)),
 ('cuernos',(-73.03,-51.08,-72.99,-51.03)),
 ('moreno',(-73.07,-50.51,-72.98,-50.45)),
 ('chalten',(-73.02,-49.35,-72.87,-49.26))]
for label,box in queries:
 try:
  tree=ET.fromstring(get('https://api.openstreetmap.org/api/0.6/map?bbox='+','.join(map(str,box))))
  nodes={n.attrib['id']:{'lat':float(n.attrib['lat']),'lon':float(n.attrib['lon'])} for n in tree.findall('node')}
  result=[]
  for obj in list(tree.findall('node'))+list(tree.findall('way')):
   tags={t.attrib['k']:t.attrib['v'] for t in obj.findall('tag')};name=tags.get('name','')
   if not name or not re.search('Glade|Sandfly|Routeburn|Divide|Iris|Torres|Chileno|Central|Moreno|Suspiros|Capri|Tres|Torre|Poincenot|Cuernos|Pudeto',name,re.I):continue
   refs=[nodes[x.attrib['ref']] for x in obj.findall('nd') if x.attrib['ref'] in nodes]
   point=nodes.get(obj.attrib['id']) if obj.tag=='node' else ({k:sum(p[k] for p in refs)/len(refs) for k in ['lat','lon']} if refs else None)
   if point:result.append({'id':obj.attrib['id'],'type':obj.tag,'name':name,**point,'tags':{k:v for k,v in tags.items() if k in ['tourism','natural','highway','amenity','shelter_type']}})
  print('GEO_REVIEW '+label+' '+json.dumps(result,ensure_ascii=False),flush=True)
 except Exception as error:print('GEO_REVIEW_ERROR '+label+' '+str(error),flush=True)
print('MINTARO_COORDINATES '+json.dumps(transform.transform(1187277,5025130)),flush=True)
for title in ['Kepler Track','Milford Track']:
 try:print('MEDIA_OPTIONS '+title+' '+json.dumps(api('en.wikipedia.org',{'action':'parse','page':title,'prop':'images'})['parse']['images']),flush=True)
 except Exception as error:print('MEDIA_OPTIONS_ERROR '+str(error),flush=True)
(OUT/'sources.json').write_text(json.dumps(media,ensure_ascii=False,indent=2)+'\n')
(OUT/'review.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
(ROOT/'natural-atlas-media.js').write_text("'use strict';\nconst naturalAtlasMedia="+json.dumps(media,ensure_ascii=False,separators=(',',':'))+";\n")
# Contact sheet is a review artifact, not a substitute for source photographs.
thumbs=[]
for key,item in media.items():
 im=Image.open(ROOT/item['path']);im.thumbnail((300,190))
 tile=Image.new('RGB',(320,230),'white');tile.paste(im,((320-im.width)//2,0));ImageDraw.Draw(tile).text((8,198),key,fill='black');thumbs.append(tile)
sheet=Image.new('RGB',(1280,230*((len(thumbs)+3)//4)),'#ddd')
for i,tile in enumerate(thumbs):sheet.paste(tile,((i%4)*320,(i//4)*230))
buf=io.BytesIO();sheet.save(buf,'JPEG',quality=74);(OUT/'review-contact.jpg').write_bytes(buf.getvalue())
print('MEDIA_REVIEW '+json.dumps(records,ensure_ascii=False),flush=True)
print('NATURAL_MEDIA_CONTACT:'+base64.b64encode(buf.getvalue()).decode(),flush=True)
print('MEDIA_COUNTS '+json.dumps({'seeds':len(SEEDS),'downloaded':len(media),'pending':[r['id'] for r in records if r.get('error')]}),flush=True)

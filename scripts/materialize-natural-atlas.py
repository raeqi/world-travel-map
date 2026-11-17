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
 if any(t in title.lower() for t in ['.svg','.pdf','logo','signature','coat of arms','map of','locator','flag of','painting','lithograph','diagram','map.png','map.jpg']):return None
 if min(info.get('width',0),info.get('height',0))<400:return None
 return title,license,meta
existing=json.loads((OUT/'sources.json').read_text()) if (OUT/'sources.json').exists() else {}
def image(seed):
 key='natural-'+seed['id']
 if seed.get('skipImage'):return key,None,{'id':seed['id'],'skipped':True}
 if key in existing and (ROOT/existing[key]['path']).exists() and not seed.get('file'):
  return key,existing[key],{'id':seed['id'],'cached':True}
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
  item={'path':str(path.relative_to(ROOT)),'title':seed['name']+' · '+file.rsplit('.',1)[0].replace('_',' '),'author':clean(meta.get('Artist',{}).get('value','Wikimedia Commons contributor')),'source':'https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(file),'license':license,'licenseUrl':meta.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Public_domain'),'changes':'等比例缩小与 WebP 压缩，文件保留全幅；界面封面可能裁切，未重绘或调色，衍生图保留原许可。','placeKey':seed['id'],'providerDescription':clean(meta.get('ImageDescription',{}).get('value','')),'width':im.width,'height':im.height,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
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
queries=[
('fiordland','[out:json][timeout:25];nwr["name"~"Glade|Sandfly|Routeburn Shelter|The Divide|Control Gates|Brod Bay|Rainbow Reach|Harris Saddle|Iris Burn Hut|Lake Mackenzie Hut"](-45.6,167.3,-44.4,168.5);out center;'),
('patagonia','[out:json][timeout:25];nwr["name"~"Chileno|Base Torres|Central|Suspiros|Bajo.*Sombras|Poincenot|Laguna Capri|Laguna Torre|Los Tres"](-51.3,-73.3,-49.1,-72.7);out center;')]
for label,query in queries:
 try:
  raw=json.loads(get('https://overpass-api.de/api/interpreter?data='+urllib.parse.quote(query)))
  points=[]
  for obj in raw.get('elements',[]):
   pos=obj.get('center',obj);tags=obj.get('tags',{})
   if 'lat' in pos:points.append({'id':obj['id'],'type':obj['type'],'name':tags.get('name'),'lat':pos['lat'],'lon':pos['lon'],'tags':{k:v for k,v in tags.items() if k in ['tourism','natural','highway','amenity','shelter_type','name:en']}})
  print('GEO_REVIEW '+label+' '+json.dumps(points,ensure_ascii=False),flush=True)
 except Exception as error:print('GEO_REVIEW_ERROR '+label+' '+str(error),flush=True)
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

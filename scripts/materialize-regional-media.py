"""Fetch only place-matched Commons photographs; record individual licences."""
import hashlib, html, io, json, re, time, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image, ImageOps
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'assets/regional-expansion';OUT.mkdir(exist_ok=True)
PACK=json.loads((ROOT/'data/theme-review/regional-expansion.json').read_text())
UA={'User-Agent':'TerraMosaic/1.0 (https://github.com/raeqi/world-travel-map; source-backed geographic atlas)'}
def get(url):
 for attempt in range(3):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=45) as response:return response.read()
  except Exception:
   if attempt==2:raise
   time.sleep(attempt+1)
def api(host,params):return json.loads(get('https://'+host+'/w/api.php?'+urllib.parse.urlencode({'format':'json',**params})))
def clean(text):return html.unescape(re.sub('<[^>]+>','',text)).strip()
existing=json.loads((OUT/'sources.json').read_text()) if (OUT/'sources.json').exists() else {}
media={};pending={}
for row in PACK['points']:
 key=row['id'];wiki=row.get('wiki')
 if row.get('imageRejected'):pending[key]=row['imageRejected'];continue
 if key in existing and (ROOT/existing[key]['path']).exists() and (not row.get('mediaFile') or urllib.parse.unquote(existing[key]['source'].split('File:')[-1]).replace('_',' ')==row['mediaFile'].replace('_',' ')):media[key]=existing[key];continue
 if not wiki:pending[key]='No cleared image; retain sourced text without borrowing another location';continue
 try:
  page=next(iter(api(row.get('wikiLang','en')+'.wikipedia.org',{'action':'query','prop':'pageimages','titles':wiki,'piprop':'name','redirects':1})['query']['pages'].values()));file=row.get('mediaFile') or page.get('pageimage')
  if not row.get('mediaFile') and re.sub(r'[^a-z0-9]','',page.get('title','').lower())!=re.sub(r'[^a-z0-9]','',wiki.lower()):raise ValueError('Article redirected to a different subject; exact-place image required')
  if not file or any(t in file.lower() for t in ['logo','signature','map.svg','coat of arms','flag of','localitzaci','portrait']):raise ValueError('No suitable exact-place lead photograph')
  raw=api('commons.wikimedia.org',{'action':'query','prop':'imageinfo','titles':'File:'+file,'iiprop':'url|size|extmetadata','iiurlwidth':1440})
  info=next(iter(raw['query']['pages'].values()))['imageinfo'][0];meta=info['extmetadata'];license=clean(meta.get('LicenseShortName',{}).get('value',''))
  if not re.match(r'^(Public domain|CC0|CC BY(?:-SA)? (?:[1-4]\.0|2\.5|2\.1)(?: [a-z]{2})?|CC-BY(?:-SA)?-[1-4]\.0)$',license):raise ValueError('Unreviewed licence '+license)
  image=ImageOps.exif_transpose(Image.open(io.BytesIO(get(info.get('thumburl') or info['url'])))).convert('RGB');image.thumbnail((1440,1200),Image.Resampling.LANCZOS)
  if min(image.size)<200:raise ValueError('Image too small')
  path=OUT/(key+'.webp');image.save(path,'WEBP',quality=83,method=6)
  media[key]={'path':str(path.relative_to(ROOT)),'title':row['name']+' · 建筑或园区照片（非所述全部作品）','author':clean(meta.get('Artist',{}).get('value','')),'source':'https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(file),'license':license,'licenseUrl':meta.get('LicenseUrl',{}).get('value','https://commons.wikimedia.org/wiki/Commons:Public_domain'),'changes':'按比例缩小并压缩为WebP，保留全幅和原色；界面可能裁切。衍生版本保留原许可。','placeId':key,'article':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(wiki.replace(' ','_')),'providerDescription':clean(meta.get('ImageDescription',{}).get('value','')),'width':image.width,'height':image.height,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
  print('OK',key,file,license,flush=True)
 except Exception as error:pending[key]=str(error);print('PENDING',key,error,flush=True)
(OUT/'sources.json').write_text(json.dumps(media,ensure_ascii=False,indent=2)+'\n');(OUT/'pending.json').write_text(json.dumps(pending,ensure_ascii=False,indent=2)+'\n')
(ROOT/'regional-theme-expansion-media.js').write_text("'use strict';\nconst regionalExpansionMedia="+json.dumps(media,ensure_ascii=False,separators=(',',':'))+";\n")
# A contact sheet is review evidence, never published as an application image.
thumbs=[]
from PIL import ImageDraw
for key,item in media.items():
 thumb=Image.new('RGB',(360,250),'white');im=Image.open(ROOT/item['path']);im.thumbnail((350,210));thumb.paste(im,((360-im.width)//2,0));ImageDraw.Draw(thumb).text((8,220),key,fill='black');thumbs.append(thumb)
if thumbs:
 sheet=Image.new('RGB',(360*3,250*((len(thumbs)+2)//3)), '#eee')
 for i,thumb in enumerate(thumbs):sheet.paste(thumb,((i%3)*360,(i//3)*250))
 sheet.save(OUT/'review.jpg',quality=88)
print(json.dumps({'images':len(media),'pending':pending}),flush=True)

"""Collect candidate exact-place files for manual review, never bind them to the app."""
import json,urllib.parse,urllib.request,re
from pathlib import Path
from PIL import Image,ImageDraw,ImageOps
import io
O=Path('qa/remaining-media');O.mkdir(parents=True,exist_ok=True)
queries={'ichikawa':'Ichikawa Higashiyama Kaii','shuilu':'Shuilu Temple Lantian','fengxiang':'东湖 凤翔','mizhou':'超然台','huizhou':'东坡祠 惠州','neijiang':'张大千纪念馆','uttarayan':'Uttarayan Santiniketan','hcb':'Fondation Henri Cartier Bresson Archives'}
def get(u):return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'TerraMosaic/1.0 (https://github.com/raeqi/world-travel-map)'}),timeout=30).read()
def api(p):return json.loads(get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(format='json',**p))))
rows=[];tiles=[]
for key,q in queries.items():
 try:
  hits=api(dict(action='query',list='search',srsearch=q,srnamespace=6,srlimit=6))['query']['search']
  for i,h in enumerate(hits):
   info=next(iter(api(dict(action='query',prop='imageinfo',titles=h['title'],iiprop='url|extmetadata',iiurlwidth=420))['query']['pages'].values()))['imageinfo'][0];m=info['extmetadata'];lic=re.sub('<[^>]+>','',m.get('LicenseShortName',{}).get('value',''))
   row=dict(key=key,index=i,file=h['title'][5:],license=lic,description=re.sub('<[^>]+>','',m.get('ImageDescription',{}).get('value',''))[:700]);rows.append(row);print(json.dumps(row,ensure_ascii=False),flush=True)
   if not re.match('^(CC|Public domain)',lic):continue
   try:
    im=ImageOps.exif_transpose(Image.open(io.BytesIO(get(info.get('thumburl') or info['url'])))).convert('RGB');im.thumbnail((350,215));tile=Image.new('RGB',(360,260),'white');tile.paste(im,((360-im.width)//2,0));ImageDraw.Draw(tile).text((5,220),key+' / '+str(i),fill='black');tiles.append(tile)
   except Exception:pass
 except Exception as e:print('CANDIDATE_ERROR',key,str(e),flush=True)
(O/'candidates.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
if tiles:
 sheet=Image.new('RGB',(1080,260*((len(tiles)+2)//3)),'#eee')
 for i,t in enumerate(tiles):sheet.paste(t,((i%3)*360,(i//3)*260))
 sheet.save(O/'review.jpg')

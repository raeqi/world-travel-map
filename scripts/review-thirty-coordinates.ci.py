"""Report public CC0 Wikidata coordinates for manual comparison, never silently relocate a point."""
import json,urllib.parse,urllib.request,math
from pathlib import Path
P=json.loads(Path('data/theme-review/remaining-thirty.json').read_text())['points'];O=Path('qa/remaining-media');O.mkdir(parents=True,exist_ok=True)
def get(u):return json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'TerraMosaic/1.0 (https://github.com/raeqi/world-travel-map)'}),timeout=25).read())
def distance(a,b):
 p,q=map(math.radians,[a['lat'],b['lat']]);dp=q-p;dl=math.radians(b['lon']-a['lon']);return 12742*math.asin(min(1,math.sqrt(math.sin(dp/2)**2+math.cos(p)*math.cos(q)*math.sin(dl/2)**2)))
rows=[]
for p in P:
 if not p.get('wiki'):continue
 try:
  query={'action':'query','format':'json','prop':'coordinates|pageprops','titles':p['wiki'],'redirects':1};page=next(iter(get('https://'+p.get('wikiLang','en')+'.wikipedia.org/w/api.php?'+urllib.parse.urlencode(query))['query']['pages'].values()));coord=(page.get('coordinates')or[None])[0];qid=page.get('pageprops',{}).get('wikibase_item');url='https://'+p.get('wikiLang','en')+'.wikipedia.org/wiki/'+urllib.parse.quote(page.get('title',p['wiki']).replace(' ','_'))
  if not coord and qid:
   entity=get('https://www.wikidata.org/wiki/Special:EntityData/'+qid+'.json')['entities'][qid];value=next((r['mainsnak'].get('datavalue',{}).get('value')for r in entity.get('claims',{}).get('P625',[])if r['mainsnak'].get('datavalue')),None)
   if value:coord={'lat':value['latitude'],'lon':value['longitude']};url='https://www.wikidata.org/wiki/'+qid
  if coord:
   row={'id':p['id'],'title':page.get('title'),'lat':coord['lat'],'lon':coord['lon'],'offsetKm':round(distance(p,coord),3),'source':url};rows.append(row);print('COORD '+json.dumps(row,ensure_ascii=False),flush=True)
 except Exception as e:print('COORD_ERROR',p['id'],str(e),flush=True)
(O/'coordinates.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')

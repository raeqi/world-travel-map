"""Normalize downloaded UNESCO and NPS official snapshots; no runtime API keys."""
import json,re,html
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
read=lambda f:json.loads((ROOT/'data'/f).read_text())
clean=lambda s:html.unescape(re.sub('<[^>]*>','',s or '')).strip()
regions={'Europe and North America':'欧洲与北美','Asia and the Pacific':'亚洲与太平洋','Africa':'非洲','Arab States':'阿拉伯地区','Latin America and the Caribbean':'拉美与加勒比'}
def classify(p):
 s=(p['name_en']+' '+(p['name_zh'] or '')).lower()
 rules=[('自然与文化双遗产','__never__')]
 if p['category']=='Mixed':return '双遗产'
 if p['category']=='Natural':rules=[('山地与冰川',r'mountain|alps|glacier|dolomite|山|冰川'),('海岸与岛屿',r'island|reef|marine|coast|海|岛|礁'),('森林与生态',r'forest|rainforest|habitat|森林|栖息'),('湖泊与湿地',r'lake|wetland|delta|湖|湿地|三角洲'),('火山与地热',r'volcan|yellowstone|火山|地热'),('荒漠与地质',r'desert|fossil|karst|cave|荒漠|化石|洞|岩溶')]
 else:rules=[('城镇与聚落',r'city|town|village|settlement|古城|城市|村|聚落'),('宗教与纪念',r'temple|church|mosque|monastery|mahal|寺|庙|教堂|陵'),('考古与遗址',r'archaeolog|ruin|prehistor|遗址|考古|史前'),('文化景观',r'landscape|garden|景观|园林'),('工业与工程',r'industrial|mine|canal|railway|工厂|矿|运河|铁路')]
 return next((label for label,pattern in rules if re.search(pattern,s)), '自然保护地' if p['category']=='Natural' else '建筑与文化')
places=[]
for p in read('unesco-compact.json'):
 coords=p['coordinates'] or {};
 if str(p['id_no'])=='439':coords={'lon':116.397,'lat':39.916}
 ids=['nature','culture'] if p['category']=='Mixed' else ['nature' if p['category']=='Natural' else 'culture'];kind=classify(p)
 places.append(dict(id='wh-'+str(p['id_no']),name=clean(p['name_zh'] or p['name_en']),en=p['name_en'],country=' / '.join(p['states_names']),region=regions.get(p['region'],p['region']),type=kind,icon='🏛️' if ids==['culture'] else '🌿',lon=coords.get('lon'),lat=coords.get('lat'),themes=ids,desc=clean(p['short_description_zh'] or p['short_description_en']),facts={'名录类别':{'Natural':'自然遗产','Cultural':'文化遗产','Mixed':'自然与文化双遗产'}[p['category']],'列入年份':str(p['date_inscribed']),'遴选标准':p['criteria_txt'],'所在区域':regions.get(p['region'],p['region'])},source='https://whc.unesco.org/en/list/'+str(p['id_no'])+'/',sourceLabel='UNESCO 官方名录',coordinateNote=('以北京故宫组成部分示意定位，沈阳组成部分不在该点；并非完整遗产边界。' if str(p['id_no'])=='439' else '名录代表坐标，并非完整遗产边界。') if coords else '官方数据暂无坐标，仅收录于列表，不参与地图与路线。'))
raw={p['parkCode']:p for p in read('nps.json')['data']}
s=(ROOT/'data/nps-system.html').read_text();s=s[s.index('National Parks ('):];s=s[:s.index('</div>')]
rows=re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>',s,re.S)
cn={'yell':'黄石','yose':'优胜美地','grte':'大提顿','grca':'大峡谷','zion':'锡安','brca':'布莱斯峡谷','arch':'拱门','cany':'峡谷地','care':'圆顶礁','deva':'死亡谷','jotr':'约书亚树','olym':'奥林匹克','mora':'雷尼尔山','noca':'北喀斯喀特','redw':'红杉木','seki':'红杉','kica':'国王峡谷','acad':'阿卡迪亚','ever':'大沼泽地','dena':'德纳里','glac':'冰川','havo':'夏威夷火山'}
for url,name in rows:
 code=re.search(r'/([a-z]{4})/',url)[1];p=raw[code];name=clean(name);key='kica' if name.startswith('Kings Canyon') else code
 region='阿拉斯加' if 'AK' in p['states'] else '夏威夷与海外岛屿' if any(st in p['states'] for st in ['HI','AS','VI']) else '西南与峡谷' if any(st in p['states'] for st in ['UT','AZ','NM','TX','NV']) else '西海岸' if any(st in p['states'] for st in ['CA','WA','OR']) else '落基山与大平原' if any(st in p['states'] for st in ['WY','MT','CO','SD','ND']) else '东部与湖区'
 lon=float(p['longitude']);lat=float(p['latitude']);note='NPS 公园代表坐标，并非入口或导航终点。'
 if code=='seki':lat,lon=(36.8,-118.55) if key=='kica' else (36.49,-118.56);note='合并管理公园的分区示意坐标，并非入口或边界。'
 places.append(dict(id='np-'+key,name=cn[key]+'国家公园' if key in cn else name,en=name,country='美国 · '+p['states'],region=region,type=region,icon='🏞️',lon=lon,lat=lat,themes=['parks'],desc=clean(p['description']),weather=clean(p['weatherInfo']),facts={'所属州':p['states'],'管理类别':'National Park','探索活动':'、'.join(a['name'] for a in p['activities'][:5])},source=p['url'],sourceLabel='NPS 官方公园资料',coordinateNote=note))
towns=[
('dachang','大昌古镇','重庆巫山',109.82,31.25,'迁建古镇','大宁河沿线','古镇迁建与水乡记忆','https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202407/t20240715_13370821.html'),
('xituo','西沱古镇','重庆石柱',108.22,30.4,'沿江古镇','长江库区','云梯街与巴盐古道','https://whlyw.cq.gov.cn/zjwl/yzq/cqwlzy/zqlswhmjmz/201303/t20130312_3706094.html'),
('ningchang','宁厂古镇','重庆巫溪',109.61,31.49,'盐业古镇','大宁河沿线','古盐泉与制盐历史；部分建筑残损，须确认开放范围','https://mzj.cq.gov.cn/sy_218/bmdt/mzyw/202405/t20240514_13203070.html'),
('yunan','云安古镇','重庆云阳',108.88,31.1,'盐业古镇','长江库区','汤溪河盐运与古镇生活','https://www.yunyang.gov.cn/zjyy_257/yyxq/xzjdmp/202210/t20221010_11174937.html'),
('guizhou','归州镇','湖北秭归',110.7,30.99,'历史城镇','西陵峡地区','旧县城迁移与屈原文化','https://zjt.hubei.gov.cn/bmdt/dtyw/mtjj/201910/t20191028_99896.shtml'),
('xintan','新滩旧镇','湖北秭归',110.87,30.97,'旧址记忆','西陵峡地区','旧镇滑坡与迁移史；历史地点，不按完整可游古镇推荐','https://www.hbzx.gov.cn/49/2014-09-15/6196.html')]
for key,name,country,lon,lat,kind,region,story,source in towns:
 places.append(dict(id=key,name=name,en='',country='中国 · '+country,region=region,type=kind,icon='🛶',lon=lon,lat=lat,themes=['gorges'],desc=story,facts={'探索线索':story,'区域关联':region,'地点性质':kind},source=source,sourceLabel='地方官方历史资料',coordinateNote='区域示意坐标；实际入口与现存建筑范围需另行确认。'))
assert len(rows)==63
assert len({p['id'] for p in places})==len(places)
meta={'retrieved':'2026-10-07','unesco':len(read('unesco-compact.json')),'parks':len(rows),'gorges':len(towns),'missingCoordinates':sum(p['lon'] is None or p['lat'] is None for p in places),'sources':['https://data.unesco.org/explore/dataset/whc001/','https://www.nps.gov/aboutus/national-park-system.htm'],'note':'名录快照；双遗产同时计入两个主题。三峡为库区及支流历史聚落策展，不声称完整名录。'}
(ROOT/'catalog.js').write_text('/* Generated by scripts/build_catalog.py; official data snapshot. */\nconst catalogMeta='+json.dumps(meta,ensure_ascii=False)+';\nconst places='+json.dumps(places,ensure_ascii=False,separators=(',',':'))+';\n')
print(meta)

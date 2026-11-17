'use strict';
// Creation associations are explicit for portraits/still lifes; they are not street views.
const vanGoghAddition=[
 {key:'vangogh-selfportrait',title:'戴草帽的自画像',original:'Self-Portrait with a Straw Hat',year:'1887',placeId:'vangogh-paris',locationLabel:'创作关联地',subject:'巴黎阶段的自画像；画面并非巴黎街景',context:'巴黎时期，梵高通过自画像练习人物画，并尝试新印象派的笔触和色彩。本作画在较早农民习作的背面；地图连接巴黎的创作阶段，不把画中人物当作蒙马特某处现场。',record:'https://www.metmuseum.org/art/collection/search/436532'},
 {key:'vangogh-ginoux',title:'阿尔勒女人：吉努夫人',original:'L’Arlésienne: Madame Joseph-Michel Ginoux',year:'1888–1889',placeId:'vangogh-arles',locationLabel:'人物与创作关联地',subject:'阿尔勒；车站咖啡馆经营者玛丽·吉努',context:'吉努夫人身着阿尔勒地方服饰，面前放着书。本主题选用 Met 的版本，与奥赛面前放阳伞和手套的版本区分。人物与阿尔勒的生活交往相关，馆藏则在纽约。',record:'https://www.metmuseum.org/art/collection/search/436529'},
 {key:'vangogh-shoes',title:'鞋',original:'Shoes',year:'1888',placeId:'vangogh-arles',locationLabel:'画中与创作关联地',subject:'阿尔勒黄房子的红砖地面与鞋',context:'梵高在阿尔勒重新画起此前在巴黎探索的鞋履静物。Met 将画中的红砖地面与黄房子联系起来；鞋的主人只有推测，不能当作已确定身份。本图按城市定位，而非宣称黄房子室内尚完整保存。',record:'https://www.metmuseum.org/art/collection/search/436533'},
 {key:'vangogh-irises',title:'鸢尾花',original:'Irises',year:'1890',placeId:'vangogh-saintremy',locationLabel:'创作关联地',subject:'圣雷米，1890年5月的花束静物；非庭院现场',context:'离开圣雷米前，梵高画了两幅鸢尾与两幅玫瑰花束，探索相对照的色彩与构图。本幅原有的红色颜料随时间褪变，今日的花瓣与背景已不同于最初；本图保留馆方图像色彩，不作臆测复原。',record:'https://www.metmuseum.org/art/collection/search/436528'},
 {key:'vangogh-roses',title:'玫瑰',original:'Roses',year:'1890',placeId:'vangogh-saintremy',locationLabel:'创作关联地',subject:'圣雷米，1890年5月的花束静物',context:'这幅玫瑰与本主题的《鸢尾花》属于同一组离开圣雷米前创作的花束。花瓣与桌面的粉色痕迹提示颜料的历史变化。作品关联圣雷米创作阶段，现藏纽约，不是欧韦田野的写生。',record:'https://www.metmuseum.org/art/collection/search/436534'}
].map(w=>({theme:'vangogh',artist:'文森特·梵高',museumId:'impressionism-met',collection:'大都会艺术博物馆，纽约',...w}));
vanGoghWorks.push(...vanGoghAddition);artWorks.push(...vanGoghAddition);
themes.find(t=>t.id==='vangogh').introduction='四座法国城镇，八幅真实作品。巴黎的自画像、阿尔勒的人物与室内静物、圣雷米的田野与花束、欧韦的麦田，分别连接创作阶段与现藏机构。';
places.find(p=>p.id==='vangogh-paris').desc='1886–1888年，梵高在巴黎与弟弟提奥共同生活，并通过人物画与自画像探索色彩。《戴草帽的自画像》属于这一阶段；它关联巴黎的生活和创作，画面并非一处可复原的街景。';
places.find(p=>p.id==='vangogh-arles').desc='1888年梵高来到阿尔勒，南方生活进入人物、静物与风景。《阿尔勒女人》中的吉努夫人和《鞋》中的黄房子红砖地面，分别提供人与居住空间的线索；本图以城市定位，不把黄房子当作完整保存的室内。';
editionStories.vangogh.body='从巴黎自画像到阿尔勒的人物与室内，再到圣雷米的麦田、丝柏与花束和欧韦田野，八幅作品展开法国岁月。画作中的对象、创作关联地与现藏机构分别说明。';
editionStories.vangogh.detail='八幅经官方开放许可核验的作品 / 四座法国城镇。';
Object.assign(editorialPlacePhotos,{
 'canal-beijing':'canal-beijing-photo','canal-tongzhou':'canal-tongzhou-photo','canal-tianjin':'canal-tianjin-photo','canal-linqing':'canal-linqing-photo','canal-jining':'canal-jining-photo','canal-huaian':'canal-huaian-photo','canal-yangzhou':'canal-yangzhou-photo','polo-yangzhou':'canal-yangzhou-photo','canal-zhenjiang':'canal-zhenjiang-photo','canal-suzhou':'canal-suzhou-photo','canal-jiaxing':'canal-jiaxing-photo',
 'wh-637':'jiuzhaigou-photo','wh-911':'wuyi-photo','np-jotr':'joshua-photo','wh-1513':'khangchendzonga-photo'
});

// Existing field guides now open on their own licensed, real landscapes.
themeMedia.xu.photo='huangshan-photo';themeMedia.kumano.photo='takijiri-photo';themeMedia.camino.photo='sarria-photo';

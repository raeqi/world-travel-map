# 文化探索路线扩充 · 第一批

这是用户第六项反馈的独立交付：沿画作、艺术品、音乐和文学地景，扩充可在地图上探索的内容。资料不以“串一个故事”为唯一目标，也可以帮助人观察湖泊、海岸、城市空间、音乐生活和写作环境。

**状态：已整理独立资料，未接入运行界面，未合并 main。** 与图片修复、既有地点补充、大运河与梵高扩充任务分开，不修改它们的代码和素材。基线为 main 的 `32c5e46ab4624635d541729996c4fa0eb4b4de94`，该版本已有21个主题、95条行程。

## 已交付内容

| 新主题 | 地点记录 | 作品关联 | 探索方案 | 独特的阅读方式 |
| --- | ---: | ---: | ---: | --- |
| 北斋 · 富士山的多种看法 | 5 | 5幅版画 | 3 | 从城市、海岸和湖泊比较同一座山的构图 |
| 维米尔 · 代尔夫特的光与日常 | 4 | 2幅油画 | 2 | 城市远景与住宅细节；描绘地和原作馆藏分开 |
| 巴赫 · 中德音乐地景 | 6 | 作品集与肖像 | 2 | 童年、任职、宫廷、教堂与当代收藏 |
| 简·奥斯汀 · 生活与小说地景 | 6 | 2部小说 | 3 | 生活地、写作阶段和小说中的真实空间分层 |

合计 **4个新主题、21个地点记录、11项作品关联、10条探索方案、10项媒体候选**。其中巴赫肖像属于艺术作品关联，不计为音乐录音；奥斯汀的一幅后世插图登记在媒体中，不冒充作者原作。21个地点记录中，日本桥明确标有应复用的既有地点 `nakasendo-tokyo`，不是要求数据库重复建点。

完整数据：[route-pack.v1.json](route-pack.v1.json)。

## 为什么选这四个

现有项目已经有印象派、梵高、莫扎特、中山道和徐霞客等主题。这一批不重新复制那些主题，也不抢另一任务正在处理的点位。北斋虽然同属日本古道文化背景，但按具体画作与富士山视角组织；巴赫虽与莫扎特同为音乐主题，但围绕中德的任职与音乐生产环境，不把人物足迹做成另一张同款城市清单。

同一地理位置允许与不同主题关联。应复用已有地点并增加主题关系，而不是用不同前缀制造重复的东京日本桥或纽约大都会。北斋的所选版本借用已有 `impressionism-met` 作为馆藏地；纽约不插进日本游览线路。

## 第一批：画作与自然、城市

### 北斋 · 富士山的多种看法

- 日本桥：读《江户日本桥》中的人群、桥与城市天际线。
- 江之岛：从相模海岸生活看远山，不只看“富士山打卡点”。
- 诹访湖：湖泊、岸边建筑与远山的尺度。
- 河口湖／御坂视角：比较山体和倒影的差别，理解画家可能把两个季节放进一张画。
- 骏州江尻：看风怎样进入人物、树和纸张，与静止的远山形成对照。

这5幅均选择了Met的明确馆藏版本，逐幅核查作品名、年代、馆藏号和 Public Domain 标记。不能因为另一版本同题就替换图片而不改著录。

依据：[Met 日本桥](https://www.metmuseum.org/art/collection/search/55237)、[江之岛](https://www.metmuseum.org/art/collection/search/56996)、[诹访湖](https://www.metmuseum.org/art/collection/search/39798)、[三坂水面](https://www.metmuseum.org/art/collection/search/36495)、[江尻](https://www.metmuseum.org/art/collection/search/55735)。

**不将《神奈川冲浪里》钉到一个未经证实的精确沙滩；不声称这些地点构成北斋一次旅行。**

### 维米尔 · 代尔夫特的光与日常

两幅画足以形成与此前印象派不同的阅读：不是追求画作数量，而是让人从南侧港池的城市远景，走到Vlamingstraat的普通住宅，再自行选择是否去馆藏机构看原作。

- 《代尔夫特风景》：作品描绘地在代尔夫特南部水域；选用画作现归海牙Mauritshuis收藏。
- 《小街》：按Rijksmuseum研究定位Vlamingstraat 40–42一带；画作现藏阿姆斯特丹。
- 地景探访和原作探访是两组地点。馆藏归属不保证当前在展，尤其应核实借展。

依据：[Mauritshuis作品记录](https://www.mauritshuis.nl/en/our-collection/artworks/92-view-of-delft)、[Rijksmuseum作品记录](https://www.rijksmuseum.nl/en/collection/object/View-of-Houses-in-Delft-Known-as-The-Little-Street--a7dbf937cbd6f7c30f66f8aca4a0207c)。

## 第二批：音乐与文学

### 巴赫 · 中德音乐地景

艾森纳赫、阿恩施塔特、魏玛、科滕和莱比锡连接的是不同人生阶段，不是一次旅行。另将莱比锡巴赫博物馆标作收藏与研究入口。音乐内容先解释作品与工作环境，再考虑合法音频；不随意给城市绑定一首“代表曲”或未证实首演地点。

《勃兰登堡协奏曲》的1721年题献有依据，但各曲形成过程有不确定性。名称不是作曲地点证据。今天圣托马斯教堂的墓于1950年迁入，也不意味着1750年就安葬在当前祭坛。

依据：[图林根生平年表](https://www.bach-thueringen.de/en/biographische-stationen)、[魏玛资料](https://www.bach-thueringen.de/en/w/bach-in-weimar)、[巴赫之家](https://bachhaus.de/en/museum)、[圣托马斯教堂](https://www.thomaskirche.org/)、[巴赫博物馆现官网](https://www.bachinleipzig.de/en/bach-museum/)、[OAE对协奏曲版本的说明](https://oae.co.uk/bachs-brandenburg-concertos/)。

### 简·奥斯汀 · 生活与小说地景

- 斯蒂文顿：成长、早稿与乡村环境。
- 巴斯Assembly Rooms：真实生活经历与小说社交空间。
- 南安普敦：迁居、家庭安排和经济处境。
- 查顿：稳定写作空间、修订和出版；不是旁边的Chawton House。
- 莱姆里吉斯：作者已知到访与《劝导》的真实海岸背景。
- 温彻斯特：求医、去世和墓地；与伦敦诗人角的纪念牌区分。

这部分不把“所有小说都在查顿从零写成”写成结论，也不把影视中的Pemberley豪宅当成确定原型。小说人物的活动和作者旅行是两类关系，数据中分开标注。

依据：[故居机构生平](https://janeaustens.house/jane-austen/jane-austen-a-life/)、[查顿故居](https://janeaustens.house/the-museum/)、[National Trust巴斯资料](https://www.nationaltrust.org.uk/visit/bath-bristol/bath-assembly-rooms/jane-austen-at-bath-assembly-rooms)、[多塞特旅游局莱姆资料](https://www.visit-dorset.com/lyme-regis/explore-discover/history-heritage/jane-austen/)。

## 媒体和可访问性：已核实什么，没完成什么

- Met的5幅北斋：所选页面有 Public Domain 标记，并已解析其具体图像链接。
- 《小街》选用的Rijksmuseum来源Commons文件为CC0，不以“原画古老”代替对数字文件许可的检查。
- 《代尔夫特风景》所选Commons文件为PD-Art，完整来源保留。
- 查顿故居实景由Simon Burchell拍摄，CC BY-SA 4.0；下载处理版本需保留署名、许可和改动说明。
- 巴赫肖像候选仅441×533，奥斯汀插图仅404×579：只适合小幅阅读，不得拉伸为hero，不得拿后世插画冒充现场实景。
- 图像链接经过网页工具解析，**尚未下载文件、生成WebP或哈希，尚未做像素和浏览器渲染检查**。图像状态在JSON逐项标注。
- 没有打包现代录音、有声书或现代译本。音乐作品的公有领域状态不自动覆盖某个现代录音。
- 一个旧巴赫年表链接直接打开404，已弃用；Juan March科滕页面搜索可读但直连403，已记录而非说全都访问成功。

## 接入安排与验收

此资料包不自动注册到线上应用，避免与其他任务的首页、画廊、点位详情和媒体索引冲突。整合时：

1. 以稳定ID注册新主题，复用既有日本桥和Met馆藏节点。
2. 按“绘画／音乐／文学”登记首页筛选和关键词；让用户按国家、自然景观、艺术家或作品找到内容。
3. 地点详情呈现简明背景、具体看点、相关作品、来源；事实和编辑观察分开。
4. 绘画支持“去画中地点”和“去现藏机构”两个动作；作品关联不自动画跨洋旅行连线。
5. 所有素材先本地化、核对身份与许可、压缩并生成哈希，再登记封面。无媒体的主题暂不发布空壳入口。
6. 音乐主题补足高质量真实建筑或可合法用的手稿图后才进入正式主题首页。
7. 运行单元测试、全主题回归，以及桌面与手机浏览器检查；目前不能把JSON检查说成页面验收。

当前可执行的数据检查：`node --test tests/cultural-expansion-data.test.cjs`。这份交付的验证记录在[verification.json](verification.json)。

后续适合继续研究：芭蕉《奥之细道》、苏轼的生活与作品地景、透纳的河流与海岸、塞尚的圣维克多山、文学中的都柏林。它们只是下一批候选，未在此包中虚报为已完成主题。

## GitHub Actions 后续验证

[工作流 44051350746](https://github.com/raeqi/world-travel-map/actions/runs/44051350746) 已在 Node.js 22 完成现有项目和新增数据的检查：10项测试通过、0失败，JavaScript语法检查和站点打包准备通过。PR不会执行部署。该结果仍不等于素材已下载或新主题已接入界面；本地执行器与浏览器验收尚不可用。

## Page integration (2026-11-17)

`cultural-routes.js` now registers four themes, ten plans, twenty new locations (Nihonbashi reuses the existing Tokyo node), seven paintings/prints, and place-level essays. Bach musical work and Austen novels are linked as reading context, not fabricated audio or paintings. Museum and depicted-place links remain distinct.

Sixteen actual WebP images are supplied in `assets/cultural-routes/`; the original Bach/Austen building photo evidence and licences are in `photograph-sources.json`. The Bath Royal Crescent photo is **not** attached to the Assembly Rooms node. Optional low-resolution Bach portrait and Persuasion illustration remain unbundled. The contact sheet was inspected; browser layout must still be checked on the managed cloud preview before merging. Local Chromium is blocked by the execution environment's socket restriction.

Validation: `node --test tests/*.test.cjs` (10 passing); `JSDOM_MODULE=/tmp/atlas-dom-tools/node_modules/jsdom node scripts/check-cultural-dom.cjs` (four themes, plans, next/previous location and artwork navigation). DOM checks do not substitute for browser layout/image decoding QA.

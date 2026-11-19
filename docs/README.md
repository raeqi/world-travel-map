# 文档总览

[项目首页](../README.md) · [线上地图](https://raeqi.github.io/world-travel-map/)

## 从这里开始

| 需要什么 | 文档 |
| --- | --- |
| 了解产品和如何探索 | [使用指南](product-guide.md) |
| 本地运行、检查、构建与发布 | [开发指南](development.md) |
| 了解数据、脚本注册与素材许可 | [数据与素材](data-and-media.md) |
| 查看当前所有地图入口及计数口径 | [主题目录](reference/themes.md) |
| 维护地点内容和可靠来源 | [内容质量](content-quality/README.md) |
| 查看测试范围与已知限制 | [验证说明](validation/README.md) |

## 按工作领域查找

- [内容研究批次](content-quality/batches/README.md)：逐批范围、来源与未完成事项；原机器数据仍在 [data/content-quality/](../data/content-quality/)。
- [主题与目录审查](reviews/README.md)：整合决策、旧链接、原方案保全及自然发现研究。
- [公路与路线资料](maps/README.md)：世界公路、泛美分章与非连续道路边界。
- [设计规范](design/README.md)：品牌、主题版本、真实影像和阅读体验。
- [历史记录](archive/README.md)：整理前 README 与日期限定的迭代叙述。

[本轮整理范围与过时说明核对](repository-organization.md)记录迁移、计数口径和保持不变的范围。

## 文档维护规则

当前产品说明与历史交付记录分开维护。批次中的“本分支”“待核验”和数字描述的是记录当时的状态；实际合并及检查结论看相应 PR、Actions 和当前质量报告，不追改历史叙述冒充当时已完成。

38个原根目录 Markdown 路径保留简短兼容指引，完整内容统一维护在本目录。路径对照在 [legacy-paths.json](legacy-paths.json)。请链接新的标准位置；旧入口继续可打开。

运行 `node scripts/check-docs.cjs` 校验全部仓库 Markdown 的本地引用、Markdown 章节锚点、兼容入口及当前目录统计。主题或方案发生变化时，先运行 `node scripts/check-docs.cjs --write` 更新统计块与主题目录，再重新检查。报告生成器会写入新位置并保持兼容页。

# 验证记录与适用范围

[文档总览](../README.md) · [如何运行检查](../development.md)

当前结果以[GitHub Actions](https://github.com/raeqi/world-travel-map/actions)和对应 PR 的精确提交为准。机器审计、真实浏览器检查、截图抽查、人工史实研究和公开部署核验分别说明，不能相互替代。

[历史验证日志](history.md)保留早期开发、环境限制与后续验证经过。其中“截图未交付”“浏览器不能运行”或12项测试等描述只适用于各自记录，不是当前项目的一次性结论；原始日志不追写成当时已完成。

内容质量的已交付记录见 [qa/content-quality/deliveries.json](../../qa/content-quality/deliveries.json)。它是历史交付账本，不覆盖所有后来的 PR；未列入的批次应查对应 PR 与 Actions。最近内容批次 [#56](https://github.com/raeqi/world-travel-map/pull/56)、[#57](https://github.com/raeqi/world-travel-map/pull/57)、[#58](https://github.com/raeqi/world-travel-map/pull/58)记录了各自的测试、真实桌面/手机CSS视口、截图抽查与公开54资产核验。

## 本轮文档整理的检查边界

检查所有仓库 Markdown 的本地引用与Markdown章节锚点、38篇迁移对照、两份兼容入口与保留的主要章节锚点、当前生产计数、文档生成器重跑、现有单元测试、JavaScript语法与发布构建。应用脚本、样式、数据、路线和图像未迁移；对照基线核实运行时与素材字节不变。

真实浏览器记录中的390×844是CSS视口，不是实体手机测试。历史事实、全部密集地图标签和完整辅助技术可访问性不能仅凭自动检查宣布通过；内容审核余量仍由[质量报告](../content-quality/README.md)说明。

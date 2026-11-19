# 开发、检查与发布

[文档总览](README.md) · [数据与素材](data-and-media.md)

## 环境与本地预览

应用为静态 HTML / CSS / JavaScript，无服务端、地图 API 密钥或生产 npm 依赖。Python 3 用于本地 HTTP；Node.js 22 是 CI 检查版本。仓库没有 `package.json`，下方 npm 安装仅用于可选测试工具。

```sh
python3 -m http.server 8000
```

访问 http://localhost:8000 。直接通过 HTTP 服务源文件即可预览，无需先构建；不要用 `file://` 读取地图数据。

## 常规检查

在仓库根目录执行：

```sh
node scripts/check-docs.cjs
node --test tests/*.test.cjs
for file in *.js scripts/*.cjs tests/*.cjs; do node --check "$file" || exit 1; done
node scripts/build-site.cjs
```

- 文档检查遍历仓库 Markdown 的本地文件引用与章节锚点、迁移对照与两份兼容入口，以及生产数据统计。更新主题/方案后运行 `node scripts/check-docs.cjs --write`，再检查。
- `node --test`运行项目全部单元测试。用例数量随版本变化，以当次结果为准，旧 QA 记录中的12、77、79等数字不是永久保证。
- 构建产生 `_site/`，为脚本和样式生成内容哈希文件名与 `release.json`，同时保留旧文件名供旧缓存页面使用；源码和资源的相对路径仍稳定。

`_site/`和`node_modules/`不提交；审计 JSON / CSV 与内容来源是维护证据，继续按既有规则提交，不统一忽略 `qa/`。

## 浏览器与 DOM 检查

这些检查额外依赖 Playwright / Chromium 或 jsdom，应用本身不依赖它们：

```sh
npm install --no-save --no-package-lock jsdom@26.1.0 playwright@1.56.1 axe-core
npx playwright install --with-deps chromium
node scripts/check-dom.cjs
node scripts/check-carousel.cjs
node scripts/check-sidebar.cjs
```

基础浏览器套件默认依次运行7个脚本，**不是全站所有浏览器脚本的集合**。它自行启动8000端口服务，运行前停止手动预览服务：

```sh
CHROME_PATH="$(node -p 'require("playwright").chromium.executablePath()')" node scripts/run-browser-suite.cjs
```

也可在同一服务进程中运行指定脚本，例如：

```sh
node scripts/run-browser-suite.cjs check-content-quality.cjs
```

部分较早脚本默认使用 `/usr/bin/chromium`，因此基础套件示例明确设置 `CHROME_PATH`。部分脚本支持 `PLAYWRIGHT_MODULE` / `JSDOM_MODULE`；具体环境变量以对应脚本和 CI 为准。不要因为一个默认套件通过就宣称所有浏览器检查都完成。

`qa/preview.html`提供1440×1000与390×844的 iframe CSS 视口。浏览器检查或截图不能代替实体手机、辅助技术或全部历史事实的人工验收。

## 内容与主题维护

```sh
node scripts/build-quality-readings.cjs --check
node scripts/audit-content.cjs
```

编辑已有来源支持的研究包后，才重新生成内容和审计：

```sh
node scripts/build-quality-readings.cjs
node scripts/audit-content.cjs --write
node scripts/write-content-quality-report.cjs
```

最后一条现在写 [docs/content-quality/README.md](content-quality/README.md)，并保持根目录 [CONTENT-QUALITY.md](../CONTENT-QUALITY.md)兼容页。主题审查生成器也写入新的标准位置：

```sh
node scripts/audit-remaining-thirty.cjs --check
node scripts/audit-catalogue-consolidation.cjs --check
```

`--check`只验证当前保全关系，不覆盖历史快照。需要有意更新报告时去掉该参数，分别生成[剩余主题记录](reviews/remaining-thirty.md)与[目录整合记录](reviews/catalogue-consolidation.md)。检查各自的 `data/theme-review/` 与 `qa/theme-review/` 数据，原始保全基线不可重写。

## GitHub Pages 与 CI

[pages.yml](../.github/workflows/pages.yml)对 PR 运行文档、语法、单元测试与构建；`main`推送还会部署 GitHub Pages，随后由 [check-published-release.cjs](../scripts/check-published-release.cjs)核验公网 manifest、首页引用及每份版本化 JS / CSS 的真实字节。当前线上地址为 https://raeqi.github.io/world-travel-map/ 。只改文档时发布资产哈希可以不变，这符合静态内容未改动的结果。

其他工作流按改动路径运行：

| 领域 | 工作流 |
| --- | --- |
| 内容研究、覆盖与来源 | [content-quality.yml](../.github/workflows/content-quality.yml) |
| 品牌、媒体、发现与轮播 | [terra-ui.yml](../.github/workflows/terra-ui.yml) |
| 主题保全、地域图与旧链接 | [theme-review.yml](../.github/workflows/theme-review.yml) |
| 剩余主题扩充 | [remaining-thirty-qa.yml](../.github/workflows/remaining-thirty-qa.yml) |
| 文化地图 | [cultural-atlas-qa.yml](../.github/workflows/cultural-atlas-qa.yml) |
| 特色公路 | [roads-qa.yml](../.github/workflows/roads-qa.yml) |

只执行与改动有关的检查，并在 PR 明确实际运行与未测部分。公开部署目录只含应用和素材，GitHub 上的项目文档不作为 Pages 内容发布。[验证记录说明](validation/README.md)列明历史证据的适用边界。

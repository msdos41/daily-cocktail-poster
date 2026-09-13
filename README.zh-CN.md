<div align="center">

# Just One Sip | 今夜微醺

*一杯特调，一张海报，一段精炼配方。*

[![Astro](https://img.shields.io/badge/Astro-v5.1-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active](https://img.shields.io/badge/Status-Active%20MVP-success)](#status-项目状态)
[![Live Site](https://img.shields.io/badge/Live-justonesip.today-e3b35f)](https://justonesip.today)

[English](README.md) | [简体中文](README.zh-CN.md)

</div>

---

## ## Introduction-项目介绍

### ### Summary-概要
**Just One Sip（今夜微醺）** 是一个基于 Astro 纯静态架构（SSG）构建的双语每日鸡尾酒海报与鉴赏站点。
项目以“午夜吧台 (Midnight Pour)”为品牌美学基调——暗调焦胡桃木底色、微温奶油墨字与苦味朱红点缀，通过全屏沉浸式的视觉海报，让鸡尾酒探索如同一场深夜偶遇，而非翻阅枯燥的数据库列表。

线上体验地址：[https://justonesip.today](https://justonesip.today)

### ### Features-特性
- 🍸 **每日特调 (Daily Pour)**：纯客户端根据访客本地日历计算的确定性伪随机推荐，全球各时区自然日同步更新。
- 🎲 **即时重抽 (Surprise Me)**：提供无需等待翌日的交互式轮换体验，随时换一杯探索灵感。
- 📚 **全库典藏 (The Collection)**：静态预渲染包含 33 款经典鸡尾酒的典藏展厅，支持基酒分类筛选与自适应响应式网格。
- 📜 **配方抽屉 (Recipe Drawer)**：轻量非侵入式底部抽屉，随时拉起查阅标准原料配比、调制步骤、推荐杯型与风味标签。
- 🖼️ **高清下载与分享 (HD Wallpaper & Share)**：自适应设备分辨率的高清海报壁纸一键下载，集成针对 X (Twitter) 与 Reddit 深度定制的一键分享托盘。
- 🌐 **双语原生 (Bilingual First)**：原生支持英语 (`en`) 与简体中文 (`zh-CN`)，排版严格遵循 CJK 与多词断句的美学规范。
- 🚀 **严苛 SEO 与结构化数据**：包含完整的 Canonical、多向 `hreflang` 交织、Open Graph 社交卡片以及 Schema.org `Recipe` / `ItemList` JSON-LD 规范。

---

## ## Requirements-环境依赖

- **Node.js**：`>= 18.17.1`（推荐 20.x LTS）
- **包管理器**：`npm`（`>= 9.x`）

---

## ## Configuration-配置

项目核心配置文件如下：

- **`astro.config.mjs`**：配置站点 Base URL (`https://justonesip.today`) 及静态输出构建配置。
- **`src/i18n/config.ts`**：管理支持的语言 (`supportedLocales`)、预留的未来规划语言 (`plannedLocales`) 以及路由映射。
- **`src/data/cocktails.ts`**：鸡尾酒内容核心数据源（包含双语配方、标签、风味和图片映射）。

---

## ## Installation-安装

克隆仓库并安装项目依赖：

```bash
git clone https://github.com/msdos41/daily-cocktail-poster.git
cd daily-cocktail-poster
npm install
```

---

## ## Usage-用法

### 本地开发
启动本地开发调试服务器：

```bash
npm run dev
```

如需进行移动端或特定局域网设备联调，可绑定本地 IP：

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

### 路由一览

| 路径 | 页面类型 | 说明 |
| :--- | :--- | :--- |
| `/` | 重定向 | 自动跳转至默认语言 `/en/` |
| `/[locale]/` | 每日沉浸页 | 客户端按本地日期计算的当日特调海报及配方 |
| `/[locale]/cocktails` | 典藏展厅 | 完整 33 款鸡尾酒网格展厅（支持基酒筛选） |
| `/[locale]/cocktails/[slug]` | 详情页 | 永久静态配方详情页（内嵌标准 Recipe JSON-LD） |
| `/[locale]/archive` | 重定向 | 301 跳转至 `/[locale]/cocktails` |
| `/sitemap.xml` | 站点地图 | 自动生成的全量静态 XML 站点地图 |

---

## ## Development-开发

### 目录结构

```text
daily-cocktail-poster/
├── DESIGN.md                  # 设计系统规范（色彩、排版、组件哲学）
├── PRODUCT.md                 # 产品目标、受众定位与品牌原则
├── astro.config.mjs           # Astro 静态站点配置
├── scripts/
│   └── verify-static-output.mjs # 自动化静态构建验证测试套件
├── src/
│   ├── components/            # Astro UI 组件 (BrandMark, ImmersiveCocktail 等)
│   ├── data/
│   │   ├── cocktails.ts       # 核心数据源：33款鸡尾酒完整多语言数据
│   │   ├── cocktailCandidates.ts # 候选鸡尾酒规划排期（内部文档）
│   │   └── heroAssets.ts      # 视觉资源映射
│   ├── i18n/                  # 国际化配置与 UI 多语言字典
│   ├── layouts/               # BaseLayout 基础页面骨架与元数据
│   ├── pages/                 # SSG 路由树
│   └── styles/
│       └── global.css         # 全局样式变量与基础类
```

### 静态构建与自动化验证
构建生成静态文件并运行严格的自动化静态检查套件：

```bash
# 类型检查与静态打包 (输出至 dist/)
npm run build

# 启动本地打包产物预览服务
npm run preview

# 运行合规性自动化校验套件
npm run verify
```

> **自动化验证套件 (`verify`) 涵盖：**
> 1. 所有语言版本的页面文件完整性。
> 2. Canonical 与多向 `hreflang` 的严格互洽。
> 3. 详情页 Schema.org `Recipe` JSON-LD 结构有效性。
> 4. 404 页面状态与 `sitemap.xml` 排查。
> 5. 沉浸式分享 `data-share-payload` 有效性。

---

## ## Changelog-更新日志

### v0.1.0 (MVP) - 2026
- ✨ 实现了基于 Astro 5 的纯静态构建体系与双语本地化支持（英文与简体中文）。
- 🍸 推出每日特调 (Daily Pour) 确定性伪随机轮换算法与 "Surprise Me" 随机换一杯功能。
- 📚 上线典藏展厅 (The Collection) 页面，静态预渲染 33 款经典鸡尾酒并提供基酒筛选。
- 📱 实现非侵入式抽屉配方展示、移动端横向溢出防护与设备分辨率自适应壁纸下载。
- 🔍 接入完备的 SEO 规范与 Schema.org 结构化数据体系。

---

## ## FAQ-常见问题

**Q: 为什么选择纯静态网站生成（SSG），而非动态服务端（SSR）或数据库？**  
A: 为了极致的加载性能、零运维成本以及永久的可靠性。每日推荐通过访客本地时区的日历时间计算确定性随机序列完成，既实现了全球用户“每日一杯”的新鲜感，又完全免去了服务端构建和数据库开销。

**Q: 鸡尾酒视觉资源目前是怎样的格式？未来如何升级？**  
A: 目前采用高清晰度、体积轻盈的动态生成 SVG 占位素材。数据层已建立完备的 `heroImageDesktop` / `heroImageMobile` 资产接口，未来可无缝平滑替换为 AI 生成摄影图或实拍高精图片。

---

## ## Support-支持

### ### Doc-文档
- [DESIGN.md](DESIGN.md)：详细记录了“Midnight Pour”色彩规范、排版准则、对比度标准及反模式。
- [PRODUCT.md](PRODUCT.md)：阐述了产品定位、受众画像、核心价值与无障碍原则。

### ### Release planning-版本规划
- 🎨 **高精摄影视觉迭代**：逐步引入实拍或高质量摄影渲染视觉资产。
- 🌍 **更多语种拓展**：扩展西班牙语 (`es`)、日语 (`ja`)、法语 (`fr`) 等预留语言。
- 🔎 **配方风味多维检索**：在典藏展厅中增加风味维度（如草本、果香、烟熏）的组合过滤。

### ### Contact and Join-联系和加入社区
- **官方网址**：[https://justonesip.today](https://justonesip.today)
- **问题反馈与建议**：欢迎通过 [GitHub Issues](https://github.com/msdos41/daily-cocktail-poster/issues) 提交反馈与功能提案。

---

## ## Contributing-贡献

我们非常欢迎社区参与优化配方数据、改进多语言翻译或提升用户体验！

1. Fork 本仓库并新建分支（例如 `git checkout -b feat/add-new-cocktail`）。
2. 在 `src/data/cocktails.ts` 中维护完备的双语数据。
3. 遵循项目的 Git 提交规范（Conventional Commits，如 `feat: ...`, `fix: ...`）。
4. 提交前确保 `npm run build` 和 `npm run verify` 全部通过。
5. 提交 Pull Request 并详细描述改动内容。

### ### Contributors-贡献者
感谢所有为 Just One Sip 带来灵感与贡献的开发者与调酒爱好者！

---

## ## License-版权信息

- 软件代码部分基于 [MIT License](LICENSE) 协议开源。
- 鸡尾酒配方整理、中文翻译与品牌视觉设计保留相关创作署名权益。

---

## ## Status-项目状态

🟢 **Active (活跃运营中)**：MVP 版本已正式部署上线并在 [https://justonesip.today](https://justonesip.today) 持续稳定运行，欢迎持续关注！

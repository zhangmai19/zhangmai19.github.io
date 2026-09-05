---
name: project-journal-2026-07-31-website
description: 网站项目第一天：al-folio 模板清理 + Bookshelf 静态书架 + 每日随机推荐 + 工作目录搭建
metadata:
  type: project
---

# 网站工作日志 — 2026-07-31

> **仓库**: `zhangmai19.github.io` (al-folio Jekyll 主题)
> **起点**: 模板部署后未定制，90%+ 为 demo 内容
> **当前状态**: 模板清理完毕，书架+每日推荐完成，待办清单已建立

---

## 第一阶段：模板清理

### 删除模板内容

- 30 篇 demo blog posts（formatting, math, code, images...）
- 9 个 demo projects（project 1–9）
- 3 条 demo 公告、2 门 demo 课程、1 本 demo 书评
- 15 张模板图片（1.jpg–12.jpg, rhino.png, template_error.png）
- 8 个 demo 资源文件（audio/video/jupyter/plotly/html/pdf）
- **爱因斯坦全部数据**：`citations.yml` (4180 行)、`resume.json`、`cv.yml`、`coauthors.yml`、`venues.yml`
- 总计：**82 files, +326 / -13,763**

### 替换为用户数据

- `_config.yml`：姓名、描述、blog 名、scholar last_name、footer、keywords
- `_data/repositories.yml`：zhangmai19 的真实 repo
- `_data/socials.yml`：真实 email
- `_data/cv.yml`：基本信息占位（教育经历）
- `_bibliography/papers.bib`：清空为注释模板

### 3 次 Deploy 失败修复

1. `%` 注释不是合法 BibTeX → jekyll-scholar parse error → 清空 papers.bib
2. `profiles.md` include 了已删除的 `about_einstein.md` → 修引用 + 隐藏 nav
3. `cv.md` 引用已删除的 `example_pdf.pdf` → 移除死链
4. 8 个文件 Prettier 格式问题 → `npx prettier --write` 全部修复

### 新增

- `_CONTENT_REFERENCE.md`：10 种内容类型的 frontmatter 格式速查

---

## 第二阶段：Bookshelf + 每日推荐

### Books 页面

- 最初尝试 iframe 嵌入 Notion → Notion 返回 `X-Frame-Options: DENY`
- 改为**静态书架**：从 `_data/books.json` 渲染卡片网格
- 功能：搜索（实时过滤）、状态筛选（All / Read / Reading / Want to read）
- 每张卡片：书名（→ Google 搜索）、作者、评分、状态 badge、类型
- 亮色/暗色主题适配

### 每日随机推荐

- 首页 about 页 content 和 news 之间插入 widget
- JavaScript 用当日日期 hash 选书，同一天始终同一本
- 显示：书名、作者、评分、状态 badge、类型
- `_pages/about.md` 增加 `daily_book.enabled` 开关
- `_layouts/about.liquid` 增加条件渲染 block

### 数据来源

- 用户从 Notion 导出 `Mai Reading List260719.csv`
- Python 脚本解析 43 本书 → `_data/books.json`
- CSV 编码问题：BOM (`utf-8-sig`)、`\xa0` non-breaking spaces、`\r\n` 换行

### 同步脚本

- `bin/sync-books.sh`：一键 CSV → JSON → commit → push
- 默认路径 `/mnt/d/hku/readinglist/Mai Reading List.csv`
- 支持自定义路径传参
- `readinglist/README.md`：更新流程说明

---

## 第三阶段：工作目录搭建

- `/mnt/d/hku/website/` 设为 canonical 工作目录
- 从旧 `website` 文件夹恢复原始 prof_pic 高清图片
- 写 `TODO.md`：3 级优先级，9 项待办
- 配置 git identity (`zhangmai19@foxmail.com`)

---

## Commits 记录

| Hash      | Message                                                             |
| --------- | ------------------------------------------------------------------- |
| `21d5bff` | chore: remove al-folio template content, personalize site config    |
| `412b032` | fix: remove invalid BibTeX comments, leave papers.bib empty         |
| `3fba7b3` | fix: remove broken references to deleted template files             |
| `1365e7f` | style: run prettier to fix formatting across all files              |
| `338c24b` | feat: embed Notion bookshelf via iframe on /books/                  |
| `d476fed` | feat: add daily random book recommendation on home page             |
| `a7d3383` | fix: replace broken Notion iframe with static bookshelf page        |
| `25fa9ff` | chore: add sync-books.sh script for one-command reading list update |
| `1d067cb` | chore: add website TODO, restore original profile images            |

---

## 部署状态

全部 9 次 deploy **success** ✅ `https://zhangmai19.github.io`

---

## 待办快照

优先级的 3 项：

1. 🔴 **Publications** — papers.bib 空白，网站第二重要页面
2. 🔴 **CV** — 占位模板，没有真实简历数据
3. 🟡 **About 页扩充** — 只有 4 行字，缺导师、研究方向、social links

详见 `TODO.md`（9 项，3 级优先级）

---

## 发现的问题与教训

1. **BibTeX `%` 注释**：jekyll-scholar 把它当条目解析，必须用 `@Comment{...}` 或留空
2. **Notion iframe**：Notion 设置 `X-Frame-Options: DENY`，无法嵌入。静态数据更好（更快、无外部依赖）
3. **CSV 编码**：Notion 导出带 BOM + `\xa0` + `\r\n`，需要 `utf-8-sig` + 手动清理
4. **Prettier plugin**：al-folio 需要 `@shopify/prettier-plugin-liquid` 才能检查 `.liquid` 文件
5. **Git identity**：WSL 新环境没有全局 git config，每次新 repo 需要 `git config user.name/email`

# Website TODO

> 最后更新：2026-07-31

## 🔴 高优先级

### 1. Publications（论文页）

- [ ] 添加 paper2（randomized reinsurance）到 `_bibliography/papers.bib`
- [ ] 添加其他论文（paper1, paper3 等）
- [ ] 如有 working papers / preprints 也一并加入
- **文件**：`_bibliography/papers.bib`
- **格式参考**：`_CONTENT_REFERENCE.md` §6

### 2. CV（简历页）

- [ ] 填写真实教育经历（HKU PhD, 清华 BS）
- [ ] 填写研究经历、获奖、技能
- [ ] 准备 CV PDF 放到 `assets/pdf/`
- **文件**：`_data/cv.yml` + `assets/json/resume.json`
- **格式参考**：`_CONTENT_REFERENCE.md` §7

### 3. About 页扩充

- [ ] 补充研究方向（目前只有 4 行）
- [ ] 写上导师名字
- [ ] 加上研究兴趣关键词
- [ ] 考虑加上 Google Scholar / GitHub 链接
- **文件**：`_pages/about.md`

---

## 🟡 中优先级

### 4. News（新闻/动态）

- [ ] 添加第一条 news（如：网站上线、论文接收、参加会议等）
- **文件**：`_news/`
- **格式参考**：`_CONTENT_REFERENCE.md` §3

### 5. Blog（博客）

- [ ] 写第一篇技术博客
- [ ] 可以写：研究笔记、读书笔记、工具分享、会议总结
- **文件**：`_posts/YYYY-MM-DD-slug.md`
- **格式参考**：`_CONTENT_REFERENCE.md` §1

### 6. Social Links

- [ ] 配置 Google Scholar ID（`_data/socials.yml` → `scholar_userid`）
- [ ] 配置 ORCID / ResearchGate（如有）
- **文件**：`_data/socials.yml`

---

## 🟢 低优先级

### 7. Projects（项目展示）

- [ ] 添加 cs-major-simulator 项目页
- [ ] 添加 tenhou-bot 项目页
- [ ] 添加 monotone-functional-optimizer 项目页
- **文件**：`_projects/`
- **格式参考**：`_CONTENT_REFERENCE.md` §2

### 8. Teaching（教学）

- [ ] 如有 TA 经历可以添加
- **文件**：`_teachings/`
- **格式参考**：`_CONTENT_REFERENCE.md` §4

### 9. 其他优化

- [ ] 换一个 favicon（当前 `_config.yml` → `icon: ⚛️`）
- [ ] 考虑换主题色（当前紫色，可在 `_config.yml` 的 theme color 调整）
- [ ] 配置 Google Analytics（如有需要）

---

## 📖 书架同步

书架数据来源：`D:\hku\readinglist\Mai Reading List.csv`

更新命令：

```bash
cd /mnt/d/hku/website
./bin/sync-books.sh
```

详见 `D:\hku\readinglist\README.md`

---

---

## ✅ 已完成 (2026-07-31)

- [x] 模板清理：删除 60+ demo 文件 + Einstein 数据，个性化 site config
- [x] Bookshelf 静态书架：43 本书，搜索 + 状态筛选
- [x] 首页每日随机推荐：date-seeded 确定性随机，亮/暗主题 badge
- [x] 书架同步脚本：`bin/sync-books.sh`（CSV → JSON → commit → push）
- [x] 工作目录搭建：`/mnt/d/hku/website/` + `TODO.md` + `_CONTENT_REFERENCE.md`
- [x] Prettier 格式修复：8 个文件通过 `npx prettier --check`
- [x] Deploy 修复：BibTeX parse error + 死链引用 + profiles.md

详见 `journals/project-journal-2026-07-31.md`

---

## 🔗 关键路径

| 内容         | 文件                       |
| ------------ | -------------------------- |
| About 页     | `_pages/about.md`          |
| Publications | `_bibliography/papers.bib` |
| CV 数据      | `_data/cv.yml`             |
| Books 数据   | `_data/books.json`         |
| Blog 文章    | `_posts/`                  |
| 项目         | `_projects/`               |
| 新闻         | `_news/`                   |
| 社交链接     | `_data/socials.yml`        |
| 站点配置     | `_config.yml`              |
| 格式参考     | `_CONTENT_REFERENCE.md`    |

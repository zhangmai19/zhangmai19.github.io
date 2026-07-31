# Content Format Reference

Quick reference for adding content to your al-folio website. Each section shows the exact frontmatter format you need.

## 1. Blog Posts

**Directory:** `_posts/`
**Filename:** `YYYY-MM-DD-slug.md` (date is required by Jekyll)

```yaml
---
layout: post # or: distill (Distill.pub style)
title: Your Post Title
description: A short description for previews
date: 2026-07-31 # publish date
tags: [tag1, tag2] # optional, for related posts & archives
categories: [cat1] # optional
related_posts: true # optional, show related posts at bottom
toc: # optional, table of contents
  beginning: true
sidebar: left # optional, for distill layout
external_redirect: https://... # optional, redirect to external URL
---
```

Distill-style posts use `<d-*>` tags in the body (see `_layouts/distill.liquid`).

## 2. Projects

**Directory:** `_projects/`
**Filename:** any, e.g. `my-project.md`

```yaml
---
layout: page
title: Project Title
description: A one-line description
img: /assets/img/your-image.jpg # optional, background image on card
importance: 1 # display order (lower = first)
category: work # category for grouping (or your own)
giscus_comments: true # optional, enable comments
related_publications: true # optional, auto-link bib entries
---
```

## 3. News (Announcements)

**Directory:** `_news/`
**Filename:** any, e.g. `new-paper-accepted.md`

**Type A: Inline news** (shown directly on the about page)

```yaml
---
layout: post
date: 2026-07-31
inline: true
related_posts: false
---
Your short announcement text here. Markdown works.
```

**Type B: Linked news** (links to a separate page)

```yaml
---
layout: post
title: My New Paper Accepted
date: 2026-07-31
related_posts: false
---
Longer content for the individual news page...
```

## 4. Teaching / Courses

**Directory:** `_teachings/`
**Filename:** any, e.g. `machine-learning.md`

```yaml
---
layout: course
title: Course Name
description: Brief course description
instructor: Your Name
year: 2026
term: Fall # Fall, Spring, Summer
location: Room 301, Main Campus
time: Tuesdays 10:00-11:30 AM
course_id: unique-course-id # required, used for internal linking
schedule: # optional weekly schedule
  - week: 1
    date: Sept 5
    topic: Introduction
    description: Overview and course structure
    materials:
      - name: Syllabus
        url: /assets/pdf/syllabus.pdf
      - name: Slides
        url: https://link-to-slides.com
  - week: 2
    date: Sept 12
    topic: Topic Name
    description: More details
    materials: []
---
## Course Overview
(rest of page in markdown...)
```

## 5. Books (Bookshelf)

**Directory:** `_books/`
**Filename:** any, e.g. `book-title.md`

```yaml
---
layout: book-review
title: Book Title
author: Author Name
cover: /assets/img/book_covers/cover.jpg
olid: OL12345678M # Open Library ID (auto-fetches cover)
isbn: 1234567890 # ISBN (auto-fetches cover)
categories: [fiction, science] # used for grouping
tags: [tag1, tag2]
buy_link: https://amazon.com/...
date: 2026-07-31 # review date
started: 2026-06-01
finished: 2026-07-15
released: 2025 # book publication year
stars: 5 # 1-5
goodreads_review: 1234567890 # Goodreads review ID
status: Finished # Finished, Reading, or To Read
---
```

## 6. Bibliography (Publications)

**Directory:** `_bibliography/`
**File:** `papers.bib`

```bibtex
@article{zhang2025title,
  title     = {Paper Title},
  author    = {Zhang, Mai and Coauthor, Name},
  journal   = {Journal Name},
  volume    = {1},
  number    = {1},
  pages     = {1--10},
  year      = {2025},
  doi       = {10.xxxx/xxxxx},
  url       = {https://doi.org/10.xxxx/xxxxx},
  abstract  = {Abstract text...},
  selected  = {true},                 % {true} = show on about page
  preview   = {preview.png},          % thumbnail image
  pdf       = {/assets/pdf/paper.pdf},
  code      = {https://github.com/...},
  website   = {https://project-site.com},
  bibtex_show = {true},              % show bibtex entry
}
```

## 7. CV Information

**Main CV:** `_data/cv.yml` (YAML format, used by CV page)

```yaml
cv:
  name: Your Name
  label: Your Title
  email: you@example.com
  sections:
    Education:
      - institution: University Name
        area: Field of Study
        studyType: PhD
        start_date: 2023
        end_date: 2027
    Experience:
      - company: Company Name
        position: Your Role
        start_date: 2022
        end_date: 2023
    Publications: []
    Skills: []
    Languages: []
    Interests: []
```

**JSON Resume:** `assets/json/resume.json` (alternative format, follows JSONResume schema)

## 8. Co-authors

**File:** `_data/coauthors.yml`

```yaml
"lastname":
  - firstname: ["First", "F.", "F. M."]
    url: https://their-website.com
```

## 9. Social Links

**File:** `_data/socials.yml`

```yaml
cv_pdf: /assets/pdf/your_cv.pdf
email: you@example.com
scholar_userid: qc6CJjYAAAAJ # Google Scholar ID
github_username: zhangmai19
# Other available: twitter, linkedin, orcid, researchgate, etc.
```

## 10. Repositories Page

**File:** `_data/repositories.yml`

```yaml
github_users:
  - your-username
github_repos:
  - owner/repo-name
  - owner/another-repo
```

---

## Quick Tips

- **Naming:** Blog posts MUST use `YYYY-MM-DD-slug.md` format. Other content types can use any filename.
- **Layout:** The `layout:` field determines the template used. Common layouts: `post`, `page`, `about`, `cv`, `course`, `book-review`, `distill`.
- **Drafts:** Put unpublished posts in `_drafts/` — they won't be built but will be tracked by git.
- **Markdown:** All content is written in standard Markdown with MathJax for math (`$$...$$` for display, `$...$` for inline).

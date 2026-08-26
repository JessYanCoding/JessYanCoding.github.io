# jessyan.me

[JessYan](https://jessyan.me) 的个人博客源码。Jekyll + GitHub Pages，无前端构建步骤。

## 结构

```
_config.yml        站点配置、个人资料（owner）、开源项目列表
_layouts/          default / page / post / archive / tags
_includes/         head、header、footer、icon（内联 SVG）、post-item、social-links
_posts/            文章，纯 Markdown
assets/css/        main.scss —— 全部样式，含亮/暗主题 token
assets/js/site.js  主题切换 + 长文目录 + 宽表格滚动，无依赖
```

## 写文章

在 `_posts/` 新建 `YYYY-MM-DD-slug.md`：

```yaml
---
layout: post
title: 标题
tags: [标签一, 标签二]
modified: 2026-01-01   # 可选
description: 用于摘要和分享卡片  # 可选，不写则自动截取正文
---
```

URL 由 `permalink: /:categories/:title/` 决定，即 `/slug/`。**不要改这个配置**，已发布文章的链接依赖它。

不想发布某篇，加 `published: false`。

## 个人资料

集中在 `_config.yml` 的 `owner`，首页、关于页、文章页作者卡片都从这里读，改一处即可。留空的字段自动不显示。

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```

关键资源（CSS/JS/favicon）用根相对路径，本地预览和线上一致，不需要覆盖 `url`。

## 部署

推到 `master`，GitHub Pages 经典构建自动发布。没有 Actions workflow，也不需要。

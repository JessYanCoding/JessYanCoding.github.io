---
layout: page
title: 关于
subtitle: Android 开发者 · 开源作者
description: "关于 JessYan：Android 开发者，MVPArms、AndroidAutoSize、RetrofitUrlManager 等开源项目作者。"
---

热爱技术，也享受把它落到实处。

写业务代码容易让人停在「熟练」，所以我写开源框架，并且长期维护它们 —— 框架代码的使用者不能直接改，这份约束会逼着你把设计、注释、文档和向后兼容都做对。这是我认为进步最快的方式。

## 开源项目

{% for proj in site.projects %}
- **[{{ proj.name }}]({{ proj.url }})** —— {{ proj.desc }}
{%- endfor %}

完整列表在 [GitHub](https://github.com/{{ site.owner.github }}?tab=repositories)。

## 在这些平台也能找到我

{% if site.owner.github %}- GitHub：<https://github.com/{{ site.owner.github }}>{% endif %}
{% if site.owner.juejin %}- 掘金：<{{ site.owner.juejin }}>{% endif %}
{% if site.owner.jianshu %}- 简书：<{{ site.owner.jianshu }}>{% endif %}
{% if site.owner.weibo %}- 微博：<{{ site.owner.weibo }}>{% endif %}
{% if site.owner.stackexchange %}- Stack Overflow：<{{ site.owner.stackexchange }}>{% endif %}
{% if site.owner.wechat %}- 微信公众号：**{{ site.owner.wechat }}**{% endif %}
{% if site.owner.email %}- 邮箱：<{{ site.owner.email }}>{% endif %}

## 订阅

RSS / Atom：[{{ site.url }}/feed.xml]({{ '/feed.xml' | absolute_url }})

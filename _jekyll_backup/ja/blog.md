---
layout: home
title: "記事"
permalink: /ja/articles/
lang: ja
---

{% assign ja_posts = site.pages | where: "lang", "ja" | where: "layout", "post" | sort: "date" | reverse %}
{% for post in ja_posts %}
- **[{{ post.title }}]({{ post.url }})** — {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

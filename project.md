---
layout: page
title: toy projects
permalink: /project/
---

{% for item in site.project %}
- [{{ item.title }}]({{ item.url }})
{% endfor %}

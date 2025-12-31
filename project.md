---
layout: page
title: Toy Projects
permalink: /project/
---

{% for item in site.project %}
- [{{ item.title }}]({{ item.url }})
{% endfor %}

---
layout: default
title: Study
permalink: /_study/
---

## OS
{% for item in site.study %}
{% if item.path contains "/os/" %}
- [{{ item.title }}]({{ item.url }})
{% endif %}
{% endfor %}

## Network
{% for item in site.study %}
{% if item.path contains "/network/" %}
- [{{ item.title }}]({{ item.url }})
{% endif %}
{% endfor %}

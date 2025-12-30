---
layout: page
title: Study
permalink: /study/
---

## Security
{% for item in site.study %}
{% if item.path contains "/security/" %}
- [{{ item.title }}]({{ item.url }})
{% endif %}
{% endfor %}

## Algorithm
{% for item in site.study %}
{% if item.path contains "/algorithm/" %}
- [{{ item.title }}]({{ item.url }})
{% endif %}
{% endfor %}

## Rust
{% for item in site.study %}
{% if item.path contains "/rust/" %}
- [{{ item.title }}]({{ item.url }})
{% endif %}
{% endfor %}

## Network
{% for item in site.study %}
{% if item.path contains "/network/" %}
- [{{ item.title }}]({{ item.url }})
{% endif %}
{% endfor %}

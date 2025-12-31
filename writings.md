---
layout: page
title: 👀
permalink: /writings/
---

<p style="color:#667; font-size:0.95rem;">
  너그럽게 읽어주세요.
</p>

<hr style="margin: 2rem 0;" />

<ul style="list-style: none; padding-left: 0;">
  {% for post in site.categories.writings %}
  <li style="margin-bottom: 2.2rem;">
    <a href="{{ post.url | relative_url }}"
       style="font-size: 1.2rem; font-weight: 600; color: #222; text-decoration: none;">
      {{ post.title }}
    </a>

    <div style="font-size: 0.8rem; color: #999; margin-top: 4px;">
      {{ post.date | date: "%Y-%m-%d" }}
    </div>

    {% if post.excerpt %}
    <p style="margin-top: 8px; color: #555; font-size: 0.95rem;">
      {{ post.excerpt | strip_html | truncate: 160 }}
    </p>
    {% endif %}
  </li>
  {% endfor %}
</ul>

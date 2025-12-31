---
layout: page
title: 👀
permalink: /writings/
---

<p style="color:#667; font-size:0.95rem;">
    너그럽게 읽어주세요.
</p>

<hr style="margin: 2rem 0;" />

{% assign sorted = site.writings | sort: "date" | reverse %}

<ul style="list-style: none; padding-left: 0;">
  {% for post in sorted %}
  <li style="margin-bottom: 2.2rem;">
    <a href="{{ post.url | relative_url }}"
       style="font-size: 1.2rem; font-weight: 600; color: #222; text-decoration: none;">
      {{ post.title }}
    </a>

    {% if post.date %}
    <div style="font-size: 0.8rem; color: #999; margin-top: 4px;">
      {{ post.date | date: "%Y-%m-%d" }}
    </div>
    {% endif %}

    {% if post.excerpt %}
    <p style="margin-top: 8px; color: #555; font-size: 0.95rem;">
      {{ post.excerpt | strip_html | truncate: 160 }}
    </p>
    {% endif %}

    {% if post.tags %}
    <div style="margin-top: 6px;">
      {% for tag in post.tags %}
        <span style="
          display: inline-block;
          background: #eceff1;
          color: #546e7a;
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 12px;
          margin-right: 4px;
          font-family: monospace;
        ">
          #{{ tag }}
        </span>
      {% endfor %}
    </div>
    {% endif %}
  </li>
  {% endfor %}
</ul>

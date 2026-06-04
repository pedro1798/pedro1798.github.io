---
layout: page
title: Projects
permalink: /project/
---

<ul class="project-list">
  {% for item in site.project %}
  <li class="project-item">
    <a href="{{ item.url | relative_url }}" class="project-title">
      {{ item.title }}
    </a>
    {% if item.description %}
    <p class="project-description">{{ item.description }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>

<style>
  .project-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .project-item {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--link-color);
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
  }
  .project-description {
    font-size: 1rem;
    color: var(--text-color);
    opacity: 0.9;
    line-height: 1.6;
  }
</style>

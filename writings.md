---
layout: page
title: 👀
permalink: /writings/
---

<p class="writings-intro">
  너그럽게 읽어주세요.
</p>

<ul class="writings-list">
  {% for post in site.categories.writings %}
  <li class="writing-item">
    <div class="writing-header">
      <span class="writing-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      <a href="{{ post.url | relative_url }}" class="writing-title">
        {{ post.title }}
      </a>
    </div>

    {% if post.excerpt %}
    <p class="writing-excerpt">
      {{ post.excerpt | strip_html | truncate: 160 }}
    </p>
    {% endif %}
  </li>
  {% endfor %}
</ul>

<style>
  .writings-intro {
    color: var(--meta-color);
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
  .writings-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .writing-item {
    margin-bottom: 2rem;
  }
  .writing-header {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
  }
  .writing-date {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--meta-color);
    min-width: 100px;
  }
  .writing-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--link-color);
    text-decoration: none;
  }
  .writing-excerpt {
    margin-top: 0.5rem;
    margin-left: calc(100px + 1.5rem);
    color: var(--text-color);
    opacity: 0.8;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  @media (max-width: 600px) {
    .writing-header {
      flex-direction: column;
      gap: 0.25rem;
    }
    .writing-excerpt {
      margin-left: 0;
    }
  }
</style>

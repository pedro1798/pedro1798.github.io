---
layout: page
title: Papers I Read
permalink: /paper/
---

<style>
  .paper-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .paper-item {
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
  }

  .paper-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .paper-title-link {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--link-color);
    text-decoration: none;
    line-height: 1.2;
  }

  .new-badge {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    background: var(--link-color);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 700;
  }

  .paper-meta {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--meta-color);
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .paper-summary {
    font-size: 1rem;
    color: var(--text-color);
    opacity: 0.9;
    line-height: 1.6;
    margin-bottom: 1rem;
    padding-left: 1rem;
    border-left: 2px solid var(--border-color);
  }
</style>

<div class="paper-list" id="paperList">
  {% assign sorted_papers = site.paper | sort: "date" | reverse %}
  {% for item in sorted_papers %}
    {% assign post_date = item.date | date: "%s" | plus: 0 %}
    {% assign now_date = "now" | date: "%s" | plus: 0 %}
    {% assign diff = now_date | minus: post_date %}
    
    <div class="paper-item">
      <div class="paper-header">
        <div class="paper-title-container">
          <a href="{{ item.url | relative_url }}" class="paper-title-link">{{ item.title }}</a>
        </div>
        {% if diff < 2592000 %}
          <span class="new-badge">NEW</span>
        {% endif %}
      </div>

      <div class="paper-meta">
        <div class="meta-item">
          <span>📅</span>
          <span>{{ item.date | date: "%B %d, %Y" }}</span>
        </div>
        {% if item.venue %}
        <div class="meta-item">
          <span>📍</span>
          <span style="font-style: italic;">{{ item.venue }}</span>
        </div>
        {% endif %}
      </div>

      {% if item.summary %}
      <div class="paper-summary">
        {{ item.summary }}
      </div>
      {% endif %}
    </div>
  {% endfor %}
</div>

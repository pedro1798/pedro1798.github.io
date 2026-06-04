---
layout: page
title: Papers I Read
permalink: /paper/
---

<style>
  .tag-filter-container {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .tag-label {
    display: block;
    margin-bottom: 1rem;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.8rem;
    color: var(--meta-color);
    text-transform: uppercase;
  }

  .tag-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag-filter-btn {
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    color: var(--text-color);
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    transition: all 0.2s ease;
  }

  .tag-filter-btn:hover {
    background-color: var(--nav-hover);
  }

  .tag-filter-btn.active {
    background: var(--text-color);
    color: var(--bg-color);
    border-color: var(--text-color);
  }

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

  .paper-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .paper-tag {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--meta-color);
    background: var(--nav-hover);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: var(--meta-color);
    font-family: var(--font-mono);
    display: none;
  }
</style>

{% assign all_tags = "" %}
{% for item in site.paper %}
  {% if item.tags %}
    {% for tag in item.tags %}
      {% capture all_tags %}{{ all_tags }}{{ tag | strip }},{% endcapture %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign tag_list = all_tags | split: "," | uniq | sort %}

<!-- Tag Filter -->
<div class="tag-filter-container">
  <span class="tag-label">Filter by Research Area</span>
  <div class="tag-list-wrapper">
    <button class="tag-filter-btn active" onclick="filterPapers('all')" data-tag="all">All papers</button>
    {% for tag in tag_list %}
      {% if tag != "" %}
        <button class="tag-filter-btn" onclick="filterPapers('{{ tag | strip }}')" data-tag="{{ tag | strip }}">#{{ tag | strip }}</button>
      {% endif %}
    {% endfor %}
  </div>
</div>

<div class="paper-list" id="paperList">
  {% assign sorted_papers = site.paper | sort: "date" | reverse %}
  {% for item in sorted_papers %}
    {% assign post_date = item.date | date: "%s" | plus: 0 %}
    {% assign now_date = "now" | date: "%s" | plus: 0 %}
    {% assign diff = now_date | minus: post_date %}
    
    <div class="paper-item" data-tags="{{ item.tags | join: ',' }}">
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

      {% if item.tags %}
      <div class="paper-tags">
        {% for tag in item.tags %}
          <span class="paper-tag">#{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
  {% endfor %}
</div>

<div id="noResults" class="no-results">
  <p style="font-size: 1.2rem; margin-bottom: 8px;">🔬 No papers found</p>
  <p>Try selecting a different research area or tag.</p>
</div>

<script>
function filterPapers(tag) {
  const items = document.querySelectorAll('.paper-item');
  const buttons = document.querySelectorAll('.tag-filter-btn');
  const noResults = document.getElementById('noResults');
  let visibleCount = 0;

  // Update button states
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tag') === tag);
  });

  // Filter items with animation
  items.forEach(item => {
    const tags = item.getAttribute('data-tags').split(',').map(t => t.trim());
    if (tag === 'all' || tags.includes(tag)) {
      item.style.display = 'block';
      item.style.animation = 'none';
      item.offsetHeight; // trigger reflow
      item.style.animation = 'fadeIn 0.4s ease forwards';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Show/hide empty state
  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}
</script>

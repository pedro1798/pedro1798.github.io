---
layout: page
title: Study
permalink: /study/
---

<style>
  /* Use global theme variables */
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

  .study-accordion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .main-category {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .category-summary {
    padding: 1rem 1.5rem;
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bg-color);
    transition: background-color 0.2s ease;
  }

  .category-summary:hover {
    background-color: var(--nav-hover);
  }

  .category-summary h2 {
    margin: 0;
    font-size: 1rem;
    font-family: var(--font-mono);
  }

  .post-count {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--meta-color);
  }

  .category-content {
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
  }

  .sub-title {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--meta-color);
    margin-bottom: 1rem;
    text-transform: lowercase;
  }

  .study-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .study-item {
    margin-bottom: 1rem;
  }

  .study-link {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--link-color);
    text-decoration: none;
    display: block;
  }

  .study-meta {
    display: flex;
    gap: 1rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--meta-color);
    margin-top: 0.25rem;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: var(--meta-color);
    display: none;
    font-family: var(--font-mono);
  }
</style>

{% assign studies = site.study | sort: "date" | reverse %}

<!-- Tag Filter -->
<div class="tag-filter-container">
  <span class="tag-label">Filter by Topics</span>
  <div class="tag-list-wrapper">
    <button class="tag-filter-btn active" onclick="filterStudy('all')" data-tag="all">All posts</button>
    {% assign all_tags = "" %}
    {% for item in studies %}
      {% if item.tags %}
        {% for tag in item.tags %}
          {% capture all_tags %}{{ all_tags }}{{ tag | strip }},{% endcapture %}
        {% endfor %}
      {% endif %}
    {% endfor %}
    {% assign tag_list = all_tags | split: "," | uniq | sort %}
    {% for tag in tag_list %}
      {% if tag != "" %}
        <button class="tag-filter-btn" onclick="filterStudy('{{ tag | strip }}')" data-tag="{{ tag | strip }}">#{{ tag | strip }}</button>
      {% endif %}
    {% endfor %}
  </div>
</div>

<div class="study-accordion" id="studyAccordion">
  {% assign main_groups = studies | group_by_exp: "item", "item.relative_path | split: '/' | slice: 1 | first" %}
  {% for main_group in main_groups %}
    {% if main_group.name == nil or main_group.name contains ".md" %}{% continue %}{% endif %}
    <details class="main-category" id="cat-{{ main_group.name | slugify }}">
      <summary class="category-summary">
        <h2>{{ main_group.name | replace: "_", " " | upcase }}</h2>
        <span class="post-count">{{ main_group.items.size }} posts</span>
      </summary>
      <div class="category-content">
        {% assign sub_groups = main_group.items | group_by_exp: "item", "item.relative_path | split: '/' | slice: 2 | first" %}
        {% for sub_group in sub_groups %}
          <div class="sub-category">
            {% unless sub_group.name == nil or sub_group.name contains ".md" %}
              <h3 class="sub-title">{{ sub_group.name | replace: "_", " " | capitalize }}</h3>
            {% endunless %}
            <ul class="study-list">
              {% for item in sub_group.items %}
                <li class="study-item" data-tags="{{ item.tags | join: ',' }}">
                  <div class="study-link-container">
                    <a href="{{ item.url | relative_url }}" class="study-link">{{ item.title }}</a>
                    <div class="study-meta">
                      <span class="study-date">{{ item.date | date: "%Y-%m-%d" }}</span>
                      {% for tag in item.tags %}
                        <span class="study-tag">#{{ tag }}</span>
                      {% endfor %}
                    </div>
                  </div>
                </li>
              {% endfor %}
            </ul>
          </div>
        {% endfor %}
      </div>
    </details>
  {% endfor %}
</div>

<div id="noResults" class="no-results">
  <p>No posts found for this tag.</p>
</div>

<script>
function filterStudy(tag) {
  const items = document.querySelectorAll('.study-item');
  const buttons = document.querySelectorAll('.tag-filter-btn');
  const mainCats = document.querySelectorAll('.main-category');
  const noResults = document.getElementById('noResults');
  let overallVisibleCount = 0;

  // Update button states
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tag') === tag);
  });

  // Filter items
  items.forEach(item => {
    const tags = item.getAttribute('data-tags').split(',');
    if (tag === 'all' || tags.includes(tag)) {
      item.style.display = 'block';
      item.style.animation = 'none';
      item.offsetHeight; // trigger reflow
      item.style.animation = 'fadeIn 0.4s ease forwards';
      overallVisibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // Filter categories
  mainCats.forEach(main => {
    const visibleItems = main.querySelectorAll('.study-item[style="display: block;"]').length;
    if (visibleItems > 0) {
      main.style.display = 'block';
      if (tag !== 'all') {
        main.open = true;
      }
    } else {
      main.style.display = 'none';
    }
    
    // Update count label inside category
    const countLabel = main.querySelector('.post-count');
    if (countLabel) {
      countLabel.textContent = `${visibleItems} posts`;
    }
  });

  // Show no results message
  noResults.style.display = overallVisibleCount === 0 ? 'block' : 'none';
}
</script>

---
layout: page
title: Study
permalink: /study/
---

<style>
  .study-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .study-stat {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    background: var(--bg-color);
  }

  .study-stat-label {
    display: block;
    margin-bottom: 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--meta-color);
    text-transform: uppercase;
  }

  .study-stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: var(--text-color);
  }

  .study-search-panel {
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .study-search-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0;
  }

  .study-search {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-color);
    color: var(--text-color);
    padding: 0.65rem 0.75rem;
    font: inherit;
  }

  .study-search:focus {
    border-color: var(--link-color);
    outline: 2px solid transparent;
  }

  .study-visible-count {
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--meta-color);
  }

  .study-accordion {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .main-category {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .category-summary {
    padding: 1rem;
    cursor: pointer;
    list-style: none;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.75rem;
    align-items: center;
    background-color: var(--bg-color);
    transition: background-color 0.2s ease;
  }

  .category-summary::-webkit-details-marker {
    display: none;
  }

  .category-summary:hover {
    background-color: var(--nav-hover);
  }

  .category-chevron {
    width: 1.25rem;
    height: 1.25rem;
    display: inline-grid;
    place-items: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--meta-color);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    transition: transform 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .main-category[open] .category-chevron {
    transform: rotate(90deg);
    color: var(--link-color);
    border-color: var(--link-color);
  }

  .category-summary h2 {
    margin: 0;
    font-size: 1rem;
    font-family: var(--font-mono);
    letter-spacing: 0;
  }

  .post-count {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--meta-color);
    background: var(--nav-hover);
    border-radius: 4px;
    padding: 0.2rem 0.45rem;
  }

  .category-content {
    padding: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .sub-category + .sub-category {
    margin-top: 1.25rem;
  }

  .sub-title {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--meta-color);
    margin: 0 0 0.65rem;
    text-transform: lowercase;
  }

  .study-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.65rem;
  }

  .study-item {
    margin: 0;
  }

  .study-link-container {
    display: block;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.9rem;
    background: var(--bg-color);
    transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
  }

  .study-link-container:hover {
    border-color: var(--link-color);
    background: var(--nav-hover);
    transform: translateY(-1px);
  }

  .study-link {
    font-weight: 600;
    font-size: 1rem;
    color: var(--link-color);
    text-decoration: none;
    display: block;
    line-height: 1.35;
  }

  .study-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--meta-color);
    margin-top: 0.6rem;
  }

  .study-date {
    display: inline-flex;
    align-items: center;
    min-height: 1.45rem;
    border-radius: 4px;
    background: var(--nav-hover);
    padding: 0 0.45rem;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: var(--meta-color);
    display: none;
    font-family: var(--font-mono);
  }

  @media (max-width: 600px) {
    .study-search-row {
      grid-template-columns: 1fr;
    }

    .category-summary {
      grid-template-columns: auto 1fr;
    }

    .post-count {
      grid-column: 2;
      justify-self: start;
    }
  }
</style>

{% assign studies = site.study | sort: "date" | reverse %}
{% assign main_groups = studies | group_by_exp: "item", "item.relative_path | split: '/' | slice: 1 | first" %}
{% assign main_category_count = 0 %}
{% for main_group in main_groups %}
  {% unless main_group.name == nil or main_group.name contains ".md" %}
    {% assign main_category_count = main_category_count | plus: 1 %}
  {% endunless %}
{% endfor %}

<div class="study-overview">
  <div class="study-stat">
    <span class="study-stat-label">Posts</span>
    <span class="study-stat-value">{{ studies.size }}</span>
  </div>
  <div class="study-stat">
    <span class="study-stat-label">Categories</span>
    <span class="study-stat-value">{{ main_category_count }}</span>
  </div>
</div>

<div class="study-search-panel">
  <div class="study-search-row">
    <input
      class="study-search"
      id="studySearch"
      type="search"
      placeholder="Search study notes"
      aria-label="Search study notes"
      oninput="filterStudy()"
    >
    <span class="study-visible-count" id="studyVisibleCount">{{ studies.size }} posts</span>
  </div>
</div>

<div class="study-accordion" id="studyAccordion">
  {% assign opened_default_category = false %}
  {% for main_group in main_groups %}
    {% if main_group.name == nil or main_group.name contains ".md" %}{% continue %}{% endif %}
    <details
      class="main-category"
      id="cat-{{ main_group.name | slugify }}"
      {% if main_category_count <= 3 or opened_default_category == false %}open{% endif %}
    >
      {% assign opened_default_category = true %}
      <summary class="category-summary">
        <span class="category-chevron" aria-hidden="true">&gt;</span>
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
                <li
                  class="study-item"
                  data-title="{{ item.title | downcase | escape }}"
                  data-category="{{ main_group.name | downcase | escape }}"
                  data-subcategory="{{ sub_group.name | downcase | escape }}"
                >
                  <div class="study-link-container">
                    <a href="{{ item.url | relative_url }}" class="study-link">{{ item.title }}</a>
                    <div class="study-meta">
                      <span class="study-date">{{ item.date | date: "%Y-%m-%d" }}</span>
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
  <p>No study notes found.</p>
</div>

<script>
function filterStudy() {
  const items = document.querySelectorAll('.study-item');
  const mainCats = document.querySelectorAll('.main-category');
  const noResults = document.getElementById('noResults');
  const visibleCount = document.getElementById('studyVisibleCount');
  const query = (document.getElementById('studySearch')?.value || '').trim().toLowerCase();
  let overallVisibleCount = 0;

  items.forEach(item => {
    const searchableText = [
      item.dataset.title,
      item.dataset.category,
      item.dataset.subcategory
    ].join(' ');
    const queryMatches = query === '' || searchableText.includes(query);

    if (queryMatches) {
      item.hidden = false;
      overallVisibleCount++;
    } else {
      item.hidden = true;
    }
  });

  mainCats.forEach(main => {
    const visibleItems = main.querySelectorAll('.study-item:not([hidden])').length;
    if (visibleItems > 0) {
      main.hidden = false;
      if (query !== '') {
        main.open = true;
      }
    } else {
      main.hidden = true;
    }
    
    const countLabel = main.querySelector('.post-count');
    if (countLabel) {
      countLabel.textContent = `${visibleItems} posts`;
    }
  });

  noResults.style.display = overallVisibleCount === 0 ? 'block' : 'none';
  if (visibleCount) {
    visibleCount.textContent = `${overallVisibleCount} posts`;
  }
}
</script>

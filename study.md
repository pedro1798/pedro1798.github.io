---
layout: page
title: Study
permalink: /study/
---
<style>
  :root {
    --primary-color: #6495ED;      /* DarkSlateGray */
    --primary-light: #f0f2f2;     /* 더 은은한 강조 배경 */
    --bg-filter: #f8f9fa;
    --bg-white: #ffffff;
    --text-main: #333333;
    --text-muted: #666666;        /* 조금 더 진하게 조정 */
    --border-color: #eeeeee;
    --tag-bg: #f1f3f4;
  }

  /* 태그 필터 영역 - 높이 및 간격 축소 */
  .tag-filter-container {
    margin-bottom: 20px;
    padding: 12px;
    background: var(--bg-filter);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }
  .tag-filter-btn {
    border: none;
    background: #e9ecef;
    color: var(--text-muted);
    padding: 4px 10px;      /* 크기 축소 */
    border-radius: 15px;
    margin: 2px;
    cursor: pointer;
    font-size: 0.8rem;      /* 폰트 축소 */
    transition: all 0.2s;
  }
  .tag-filter-btn.active {
    background: var(--primary-color);
    color: white;
  }

  /* 아코디언 대분류 */
  .main-category {
    margin-bottom: 10px;    /* 간격 축소 */
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--bg-white);
  }
  .category-summary {
    padding: 10px 15px;     /* 패딩 축소 */
    background-color: var(--bg-filter);
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .category-summary h2 {
    margin: 0;
    font-size: 1.4rem;        /* 1.2rem -> 1.0rem (크게 축소) */
    font-weight: 700;       /* Bold 대신 600으로 적당한 굵기 */
    color: var(--text-main);
    letter-spacing: -0.02em;
  }
  .post-count {
    font-size: 0.9rem;      /* 0.9rem -> 0.8rem */
    color: var(--text-muted);
  }
  details[open] .category-summary {
    background-color: var(--primary-light);
    border-bottom: 1px solid var(--border-color);
  }

  /* 중분류 및 아이템 */
  .category-content { padding: 15px; } /* 내부 여백 축소 */
  .sub-category { margin-bottom: 20px; }
  .sub-title {
    color: var(--primary-color);
    font-size: 1.2rem !important;      /* 1.05rem -> 0.9rem */
    font-weight: 400;
    border-left: 3px solid var(--primary-color);
    padding-left: 4px;
    margin-bottom: 10px;
  }
  .study-list { list-style: none; padding-left: 0px; }
  .study-item { margin-bottom: 10px; }
  .study-link {
    text-decoration: none;
    color: var(--text-main);
    font-size: 1.0rem;      /* 포스트 제목 크기 지정 */
    font-weight: 400;       /* Normal 대신 400 */
    transition: color 0.2s;
  }
  .study-link:hover { color: var(--primary-color); text-decoration: underline; }
  
  .study-tag {
    display: inline-block;
    background-color: var(--tag-bg);
    color: var(--text-muted);
    font-size: 0.8rem;
    padding: 1px 4px;       /* 태그 크기 미세 축소 */
    border-radius: 3px;
    margin-right: 4px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace; /* 개발자용 폰트 권장 */
  }
</style>

{% assign studies = site.study | sort: "date" | reverse %}

<div class="tag-filter-container">
  <span style="font-weight: bold; margin-right: 10px; color: var(--text-main);">Filter by Tags:</span>
  <button class="tag-filter-btn active" onclick="filterStudy('all')" data-tag="all">All</button>
  {% comment %} 태그 리스트 추출 로직 생략 (기존과 동일) {% endcomment %}
  {% assign all_tags = "" %}{% for item in studies %}{% if item.tags %}{% for tag in item.tags %}{% capture all_tags %}{{ all_tags }}{{ tag | strip }},{% endcapture %}{% endfor %}{% endif %}{% endfor %}{% assign tag_list = all_tags | split: "," | uniq | sort %}
  {% for tag in tag_list %}{% if tag != "" %}
    <button class="tag-filter-btn" onclick="filterStudy('{{ tag | strip }}')" data-tag="{{ tag | strip }}">#{{ tag | strip }}</button>
  {% endif %}{% endfor %}
</div>

<div class="study-accordion">
  {% assign main_groups = studies | group_by_exp: "item", "item.relative_path | split: '/' | slice: 1 | first" %}
  {% for main_group in main_groups %}
    {% if main_group.name == nil or main_group.name contains ".md" %}{% continue %}{% endif %}
    <details class="main-category">
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
                  <a href="{{ item.url | relative_url }}" class="study-link">• {{ item.title }}</a>
                  <div style="margin-left: 15px; margin-top: 5px;">
                    {% for tag in item.tags %}<span class="study-tag">#{{ tag }}</span>{% endfor %}
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

<script>
/* filterStudy 자바스크립트 로직은 이전과 동일 */
function filterStudy(tag) {
  const items = document.querySelectorAll('.study-item');
  const buttons = document.querySelectorAll('.tag-filter-btn');
  const mainCats = document.querySelectorAll('.main-category');

  buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tag') === tag));
  items.forEach(item => {
    const tags = item.getAttribute('data-tags').split(',');
    item.style.display = (tag === 'all' || tags.includes(tag)) ? 'block' : 'none';
  });
  mainCats.forEach(main => {
    const visibleItems = main.querySelectorAll('.study-item[style="display: block;"]').length;
    main.style.display = visibleItems > 0 ? 'block' : 'none';
    if (tag !== 'all' && visibleItems > 0) main.open = true;
  });
}
</script>

---
layout: page
title: Papers I Read
permalink: /paper/
---

<style>
  /* [색상 설정] study.md와 동일하게 유지 */
  :root {
    --primary-color: #6495ED;      /* CornflowerBlue */
    --primary-light: #f0f2f2;
    --bg-filter: #f8f9fa;
    --bg-white: #ffffff;
    --text-main: #333333;
    --text-muted: #666666;
    --border-color: #eeeeee;
    --tag-bg: #f1f3f4;
    --accent-red: #FF5252;        /* NEW 배지용 */
  }

  /* 태그 필터 영역 */
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
    padding: 4px 10px;
    border-radius: 15px;
    margin: 2px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s;
  }
  .tag-filter-btn.active {
    background: var(--primary-color);
    color: white;
  }

  /* 논문 리스트 아이템 */
  .paper-list { margin-top: 25px; }
  .paper-item {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
    transition: transform 0.2s;
  }
  
  .paper-header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .paper-title-link {
    text-decoration: none;
    color: var(--text-main);
    font-size: 1.0rem;      /* 중분류보다 약간 큰 본문 제목 크기 */
    font-weight: 600;
    line-height: 1.4;
  }
  .paper-title-link:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .new-badge {
    background-color: var(--accent-red);
    color: white;
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
    vertical-align: middle;
  }

  .paper-meta {
    margin-top: 6px;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .paper-summary {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #444;
    line-height: 1.6;
    letter-spacing: -0.01em;
  }

  .paper-tags { margin-top: 10px; }
  .paper-tag {
    display: inline-block;
    background-color: var(--tag-bg);
    color: var(--text-muted);
    font-size: 0.7rem;
    padding: 1px 6px;
    border-radius: 3px;
    margin-right: 4px;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }
</style>

{% comment %} 1. 고유 태그 추출 {% endcomment %}
{% assign all_tags = "" %}
{% for item in site.paper %}
  {% if item.tags %}
    {% for tag in item.tags %}
      {% capture all_tags %}{{ all_tags }}{{ tag | strip }},{% endcapture %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign tag_list = all_tags | split: "," | uniq | sort %}

<div class="tag-filter-container">
  <span style="font-weight: bold; margin-right: 10px; color: var(--text-main); font-size: 0.9rem;">Filter by Tags:</span>
  <button class="tag-filter-btn active" onclick="filterPapers('all')" data-tag="all">All</button>
  {% for tag in tag_list %}
    {% if tag != "" %}
    <button class="tag-filter-btn" onclick="filterPapers('{{ tag | strip }}')" data-tag="{{ tag | strip }}">#{{ tag | strip }}</button>
    {% endif %}
  {% endfor %}
</div>

<div class="paper-list">
  {% assign sorted_papers = site.paper | sort: "date" | reverse %}
  {% for item in sorted_papers %}
    {% assign post_date = item.date | date: "%s" | plus: 0 %}
    {% assign now_date = "now" | date: "%s" | plus: 0 %}
    {% assign diff = now_date | minus: post_date %}
    
    <div class="paper-item" data-tags="{{ item.tags | join: ',' }}">
      <div class="paper-header">
        <a href="{{ item.url | relative_url }}" class="paper-title-link">{{ item.title }}</a>
        {% if diff < 2592000 %}
          <span class="new-badge">NEW</span>
        {% endif %}
      </div>

      <div class="paper-meta">
        <span style="margin-right: 12px;">📅 {{ item.date | date: "%B %d, %Y" }}</span>
        {% if item.venue %}
          <span style="font-style: italic;">📍 {{ item.venue }}</span>
        {% endif %}
      </div>

      {% if item.summary %}
      <p class="paper-summary">{{ item.summary }}</p>
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

<script>
function filterPapers(tag) {
  const items = document.querySelectorAll('.paper-item');
  const buttons = document.querySelectorAll('.tag-filter-btn');

  // 버튼 활성화 상태 변경
  buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tag') === tag));

  // 리스트 필터링 (study.md와 동일하게 깔끔한 block/none 처리)
  items.forEach(item => {
    const tags = item.getAttribute('data-tags').split(',').map(t => t.trim());
    if (tag === 'all' || tags.includes(tag)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
</script>

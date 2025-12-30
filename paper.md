---
layout: page
title: Papers I Read
permalink: /paper/
---

{% comment %} 1. 모든 논문에서 고유 태그 추출 {% endcomment %}
{% assign all_tags = "" %}
{% for item in site.paper %}
  {% if item.tags %}
    {% assign tags_str = item.tags | join: "," %}
    {% assign all_tags = all_tags | append: "," | append: tags_str %}
  {% endif %}
{% endfor %}
{% assign tag_list = all_tags | split: "," | uniq | sort %}

<div class="tag-filter-container" style="margin-bottom: 30px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
  <span style="font-weight: bold; margin-right: 10px; color: #555;">Filter by Tags:</span>
  <button class="tag-filter-btn active" onclick="filterPapers('all')" data-tag="all">All</button>
  {% for tag in tag_list %}
    {% if tag != "" %}
    <button class="tag-filter-btn" onclick="filterPapers('{{ tag }}')" data-tag="{{ tag }}">#{{ tag }}</button>
    {% endif %}
  {% endfor %}
</div>

<div class="paper-list">
  {% assign sorted_papers = site.paper | sort: "date" | reverse %}
  {% for item in sorted_papers %}
    {% assign post_date = item.date | date: "%s" | plus: 0 %}
    {% assign now_date = "now" | date: "%s" | plus: 0 %}
    {% assign diff = now_date | minus: post_date %}
    
    <div class="paper-item" data-tags="{{ item.tags | join: ' ' }}" style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
      <div style="display: flex; align-items: baseline; flex-wrap: wrap;">
        <h3 style="margin: 0; font-size: 1.2rem;">
          <a href="{{ item.url }}" target="_blank" style="text-decoration: none; color: #2196F3;">{{ item.title }}</a>
        </h3>
        
        {% if diff < 2592000 %} {% comment %} 논문은 보통 30일(2592000초) 기준 NEW 표시 {% endcomment %}
          <span style="background-color: #FF5252; color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; margin-left: 8px; font-weight: bold;">NEW</span>
        {% endif %}
      </div>

      <div style="margin-top: 8px; font-size: 0.9rem; color: #666;">
        <span style="margin-right: 15px;">📅 {{ item.date | date: "%B %d, %Y" }}</span>
        {% if item.venue %}
          <span style="font-style: italic;">📍 {{ item.venue }}</span>
        {% endif %}
      </div>

      {% if item.tags %}
      <div style="margin-top: 10px;">
        {% for tag in item.tags %}
          <span class="paper-tag">#{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}

      {% if item.summary %}
      <p style="margin-top: 12px; font-size: 0.95rem; color: #444; line-height: 1.6;">
        {{ item.summary }}
      </p>
      {% endif %}
    </div>
  {% endfor %}
</div>

<style>
  .tag-filter-btn {
    border: none;
    background: #e0e0e0;
    color: #666;
    padding: 5px 12px;
    border-radius: 20px;
    margin: 5px 3px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.3s;
  }
  .tag-filter-btn:hover { background: #bdbdbd; }
  .tag-filter-btn.active { background: #2196F3; color: white; }

  .paper-tag {
    display: inline-block;
    background-color: #eceff1;
    color: #546e7a;
    font-size: 0.75rem;
    padding: 2px 10px;
    border-radius: 15px;
    margin-right: 5px;
  }

  .paper-item { transition: all 0.3s ease; }
</style>

<script>
function filterPapers(tag) {
  const items = document.querySelectorAll('.paper-item');
  const buttons = document.querySelectorAll('.tag-filter-btn');

  // 버튼 활성화 상태 변경
  buttons.forEach(btn => {
    if (btn.getAttribute('data-tag') === tag) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // 리스트 필터링
  items.forEach(item => {
    const tags = item.getAttribute('data-tags').split(' ');
    if (tag === 'all' || tags.includes(tag)) {
      item.style.display = 'block';
      setTimeout(() => { item.style.opacity = '1'; }, 10);
    } else {
      item.style.opacity = '0';
      setTimeout(() => { item.style.display = 'none'; }, 300);
    }
  });
}
</script>

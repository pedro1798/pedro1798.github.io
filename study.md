---
layout: page
title: Study
permalink: /study/
---

{% comment %} 1. 모든 study 문서에서 고유 태그 추출 {% endcomment %}
{% assign all_tags = "" %}
{% for item in site.study %}
  {% if item.tags %}
    {% assign tags_str = item.tags | join: "," %}
    {% assign all_tags = all_tags | append: "," | append: tags_str %}
  {% endif %}
{% endfor %}
{% assign tag_list = all_tags | split: "," | uniq | sort %}

<div class="tag-filter-container" style="margin-bottom: 30px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
  <span style="font-weight: bold; margin-right: 10px; color: #555;">Filter by Tags:</span>
  <button class="tag-filter-btn active" onclick="filterStudy('all')" data-tag="all">All</button>
  {% for tag in tag_list %}
    {% if tag != "" %}
    <button class="tag-filter-btn" onclick="filterStudy('{{ tag }}')" data-tag="{{ tag }}">#{{ tag }}</button>
    {% endif %}
  {% endfor %}
</div>

{% comment %} 2. 모든 문서를 최신순으로 정렬 {% endcomment %}
{% assign sorted_studies = site.study | sort: "date" | reverse %}
{% assign main_groups = sorted_studies | group_by_exp: "item", "item.relative_path | split: '/' | slice: 1 | first" %}

<div class="study-accordion">
  {% for main_group in main_groups %}
  <details class="main-category" {% if forloop.first %}open{% endif %} style="margin-bottom: 15px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
    
    <summary style="padding: 15px 20px; background-color: #f8f9fa; cursor: pointer; font-size: 1.3rem; font-weight: bold; color: #2196F3; list-style: none; display: flex; justify-content: space-between; align-items: center;">
      <span>{{ main_group.name | replace: "_", " " | upcase }}</span>
      <span style="font-size: 0.9rem; color: #999; font-weight: normal;" class="post-count">{{ main_group.items.size }} posts</span>
    </summary>

    <div style="padding: 20px; border-top: 1px solid #eee;">
      {% assign sub_groups = main_group.items | group_by_exp: "item", "item.relative_path | split: '/' | slice: 2 | first" %}

      {% for sub_group in sub_groups %}
        <div class="sub-category" style="margin-bottom: 25px;">
          {% unless sub_group.name contains ".md" %}
            <h3 style="color: #666; font-size: 1.1rem; border-left: 4px solid #2196F3; padding-left: 10px; margin-bottom: 15px;">
              # {{ sub_group.name | replace: "_", " " | capitalize }}
            </h3>
          {% endunless %}

          <ul style="list-style-type: none; padding-left: 10px;">
            {% for item in sub_group.items %}
            {% assign post_date = item.date | date: "%s" | plus: 0 %}
            {% assign now_date = "now" | date: "%s" | plus: 0 %}
            {% assign diff = now_date | minus: post_date %}

            <li class="study-item" data-tags="{{ item.tags | join: ' ' }}" style="margin-bottom: 15px;">
              <div style="display: flex; align-items: center; flex-wrap: wrap;">
                <span style="color: #2196F3; margin-right: 8px;">•</span>
                <a href="{{ item.url | relative_url }}" style="text-decoration: none; color: #333; font-weight: 500; font-size: 1.05rem;">{{ item.title }}</a>
                {% if diff < 604800 %}
                  <span style="background-color: #FF5252; color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; margin-left: 8px; font-weight: bold;">NEW</span>
                {% endif %}
              </div>
              
              {% if item.tags %}
              <div style="margin-left: 18px; margin-top: 5px;">
                {% for tag in item.tags %}
                  <span class="study-tag">#{{ tag }}</span>
                {% endfor %}
              </div>
              {% endif %}
            </li>
            {% endfor %}
          </ul>
        </div>
      {% endfor %}
    </div>
  </details>
  {% endfor %}
</div>

<style>
  .tag-filter-btn { border: none; background: #e0e0e0; color: #666; padding: 5px 12px; border-radius: 20px; margin: 5px 3px; cursor: pointer; font-size: 0.85rem; transition: all 0.3s; }
  .tag-filter-btn.active { background: #2196F3; color: white; }
  .study-tag { display: inline-block; background-color: #eceff1; color: #546e7a; font-size: 0.7rem; padding: 2px 10px; border-radius: 15px; margin-right: 5px; font-family: monospace; }
  
  summary::-webkit-details-marker { display: none; }
  details[open] summary { background-color: #e3f2fd; border-bottom: 1px solid #eee; }
  summary:hover { background-color: #f1f1f1; }
</style>

<script>
function filterStudy(tag) {
  const buttons = document.querySelectorAll('.tag-filter-btn');
  const items = document.querySelectorAll('.study-item');
  const subCategories = document.querySelectorAll('.sub-category');
  const mainCategories = document.querySelectorAll('.main-category');

  // 1. 버튼 상태 업데이트
  buttons.forEach(btn => {
    if (btn.getAttribute('data-tag') === tag) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // 2. 글 필터링
  items.forEach(item => {
    const itemTags = item.getAttribute('data-tags').split(' ');
    if (tag === 'all' || itemTags.includes(tag)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // 3. 빈 소분류/대분류 숨기기
  subCategories.forEach(sub => {
    const visibleItems = sub.querySelectorAll('.study-item[style="display: block;"]');
    sub.style.display = visibleItems.length > 0 ? 'block' : 'none';
  });

  mainCategories.forEach(main => {
    const visibleItems = main.querySelectorAll('.study-item[style="display: block;"]');
    if (visibleItems.length > 0) {
      main.style.display = 'block';
      if (tag !== 'all') main.open = true; // 필터링 시 결과가 있는 카테고리는 자동으로 펼침
    } else {
      main.style.display = 'none';
    }
  });
}
</script>

---
layout: page
title: Study
permalink: /study/
---

{% assign studies = site.study | sort: "date" | reverse %}

{% if studies.size == 0 %}
  <p style="text-align: center; color: #999; padding: 50px;">등록된 포스트가 없습니다. _config.yml 설정과 파일 경로를 확인해 주세요.</p>
{% else %}

  {% comment %} 1. 태그 추출 {% endcomment %}
  {% assign all_tags = "" %}
  {% for item in studies %}
    {% if item.tags %}
      {% for tag in item.tags %}
        {% capture all_tags %}{{ all_tags }}{{ tag | strip }},{% endcapture %}
      {% endfor %}
    {% endif %}
  {% endfor %}
  {% assign tag_list = all_tags | split: "," | uniq | sort %}

  <div class="tag-filter-container" style="margin-bottom: 30px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
    <span style="font-weight: bold; margin-right: 10px; color: #555;">Filter by Tags:</span>
    <button class="tag-filter-btn active" onclick="filterStudy('all')" data-tag="all">All</button>
    {% for tag in tag_list %}
      {% if tag != "" %}
      <button class="tag-filter-btn" onclick="filterStudy('{{ tag | strip }}')" data-tag="{{ tag | strip }}">#{{ tag | strip }}</button>
      {% endif %}
    {% endfor %}
  </div>

  <div class="study-accordion">
    {% comment %} 카테고리 그룹화 (안전한 경로 추출) {% endcomment %}
    {% assign main_groups = studies | group_by_exp: "item", "item.relative_path | split: '/' | first" %}
    {% if main_groups.first.name == "_study" %}
       {% assign main_groups = studies | group_by_exp: "item", "item.relative_path | split: '/' | slice: 1 | first" %}
    {% endif %}

    {% for main_group in main_groups %}
      {% if main_group.name == nil or main_group.name contains ".md" %}{% continue %}{% endif %}
      <details class="main-category" style="margin-bottom: 15px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <summary style="padding: 15px 20px; background-color: #f8f9fa; cursor: pointer; font-size: 1.2rem; font-weight: bold; color: #333; list-style: none; display: flex; justify-content: space-between;">
          <span>{{ main_group.name | replace: "_", " " | upcase }}</span>
          <span style="font-size: 0.9rem; color: #999;">{{ main_group.items.size }} posts</span>
        </summary>
        <div style="padding: 20px; border-top: 1px solid #eee;">
          {% assign sub_groups = main_group.items | group_by_exp: "item", "item.relative_path | split: '/' | slice: 2 | first" %}
          {% for sub_group in sub_groups %}
            <div class="sub-category" style="margin-bottom: 20px;">
              {% unless sub_group.name == nil or sub_group.name contains ".md" %}
                <h3 style="font-size: 1rem; color: #2196F3; border-left: 3px solid #2196F3; padding-left: 10px; margin-bottom: 10px;">{{ sub_group.name | capitalize }}</h3>
              {% endunless %}
              <ul style="list-style: none; padding-left: 5px;">
                {% for item in sub_group.items %}
                  <li class="study-item" data-tags="{{ item.tags | join: ',' }}" style="margin-bottom: 10px;">
                    <a href="{{ item.url | relative_url }}" style="text-decoration: none; color: #555;">• {{ item.title }}</a>
                  </li>
                {% endfor %}
              </ul>
            </div>
          {% endfor %}
        </div>
      </details>
    {% endfor %}
  </div>
{% endif %}

<style>
  .tag-filter-btn { border: none; background: #e0e0e0; color: #666; padding: 5px 12px; border-radius: 20px; margin: 3px; cursor: pointer; }
  .tag-filter-btn.active { background: #2196F3; color: white; }
  details[open] summary { background-color: #e3f2fd; }
</style>

<script>
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

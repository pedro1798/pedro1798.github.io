---
layout: page
title: Study
permalink: /study/
---

{% comment %} 1. 고유 태그 추출 (중복 제거 및 정렬) {% endcomment %}
{% assign all_tags = "" %}
{% for item in site.study %}
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

{% comment %} 2. 데이터 준비 및 카테고리 순서 정의 {% endcomment %}
{% assign sorted_studies = site.study | sort: "date" | reverse %}
{% assign main_groups = sorted_studies | group_by_exp: "item", "item.relative_path | split: '/' | slice: 1 | first" %}
{% assign category_order = "algorithm,rust,security,network_programming" | split: "," %}

<div class="study-accordion">
  {% comment %} 3. 우선순위 카테고리 출력 (Algorithm 등) {% endcomment %}
  {% for target in category_order %}
    {% assign current_group = main_groups | where: "name", target | first %}
    {% if current_group %}
      <details class="main-category" style="margin-bottom: 15px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <summary style="padding: 15px 20px; background-color: #f8f9fa; cursor: pointer; font-size: 1.3rem; font-weight: bold; color: #555; list-style: none; display: flex; justify-content: space-between; align-items: center;">
          <span>{{ current_group.name | replace: "_", " " | upcase }}</span>
          <span style="font-size: 0.9rem; color: #999; font-weight: normal;">{{ current_group.items.size }} posts</span>
        </summary>
        <div style="padding: 20px; border-top: 1px solid #eee;">
          {% assign sub_groups = current_group.items | group_by_exp: "item", "item.relative_path | split: '/' | slice: 2 | first" %}
          {% for sub_group in sub_groups %}
            <div class="sub-category" style="margin-bottom: 25px;">
              {% unless sub_group.name contains ".md" %}
                <h3 style="color: #2F4F4F; font-size: 1.1rem; border-left: 4px solid #2196F3; padding-left: 10px; margin-bottom: 15px;"># {{ sub_group.name | replace: "_", " " | capitalize }}</h3>
              {% endunless %}
              <ul style="list-style-type: none; padding-left: 10px;">
                {% for item in sub_group.items %}
                <li class="study-item" data-tags="{{ item.tags | join: ',' }}" style="margin-bottom: 15px;">
                  <div style="display: flex; align-items: center; flex-wrap: wrap;">
                    <span style="color: #2196F3; margin-right: 8px;">•</span>
                    <a href="{{ item.url | relative_url }}" style="text-decoration: none; color: #696969; font-weight: 500;">{{ item.title }}</a>
                  </div>
                  {% if item.tags %}
                  <div style="margin-left: 18px; margin-top: 5px;">
                    {% for tag in item.tags %}<span class="study-tag">#{{ tag }}</span>{% endfor %}
                  </div>
                  {% endif %}
                </li>
                {% endfor %}
              </ul>
            </div>
          {% endfor %}
        </div>
      </details>
    {% endif %}
  {% endfor %}

  {% comment %} 4. 지정되지 않은 나머지 카테고리 자동 출력 {% endcomment %}
  {% for main_group in main_groups %}
    {% unless category_order contains main_group.name %}
      <details class="main-category" style="margin-bottom: 15px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <summary style="padding: 15px 20px; background-color: #f8f9fa; cursor: pointer; font-size: 1.3rem; font-weight: bold; color: #2196F3; list-style: none; display: flex; justify-content: space-between; align-items: center;">
          <span>{{ main_group.name | replace: "_", " " | upcase }}</span>
          <span style="font-size: 0.9rem; color: #999; font-weight: normal;">{{ main_group.items.size }} posts</span>
        </summary>
        <div style="padding: 20px; border-top: 1px solid #eee;">
          {% assign sub_groups = main_group.items | group_by_exp: "item", "item.relative_path | split: '/' | slice: 2 | first" %}
          {% for sub_group in sub_groups %}
            <div class="sub-category" style="margin-bottom: 25px;">
              {% unless sub_group.name contains ".md" %}
                <h3 style="color: #666; font-size: 1.1rem; border-left: 4px solid #2196F3; padding-left: 10px; margin-bottom: 15px;"># {{ sub_group.name | replace: "_", " " | capitalize }}</h3>
              {% endunless %}
              <ul style="list-style-type: none; padding-left: 10px;">
                {% for item in sub_group.items %}
                <li class="study-item" data-tags="{{ item.tags | join: ',' }}" style="margin-bottom: 15px;">
                  <div style="display: flex; align-items: center; flex-wrap: wrap;">
                    <span style="color: #2196F3; margin-right: 8px;">•</span>
                    <a href="{{ item.url | relative_url }}" style="text-decoration: none; color: #333; font-weight: 500;">{{ item.title }}</a>
                  </div>
                  {% if item.tags %}
                  <div style="margin-left: 18px; margin-top: 5px;">
                    {% for tag in item.tags %}<span class="study-tag">#{{ tag }}</span>{% endfor %}
                  </div>
                  {% endif %}
                </li>
                {% endfor %}
              </ul>
            </div>
          {% endfor %}
        </div>
      </details>
    {% endunless %}
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
  const subCats = document.querySelectorAll('.sub-category');
  const mainCats = document.querySelectorAll('.main-category');

  // 1. 버튼 활성화 상태 변경
  buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tag') === tag));

  // 2. 개별 아이템 필터링
  items.forEach(item => {
    const itemTags = item.getAttribute('data-tags').split(',').map(t => t.trim());
    const isVisible = (tag === 'all' || itemTags.includes(tag));
    item.style.display = isVisible ? 'block' : 'none';
  });

  // 3. 중분류(sub-category) 표시 여부 결정
  subCats.forEach(sub => {
    const hasVisibleItem = Array.from(sub.querySelectorAll('.study-item'))
                                .some(item => item.style.display !== 'none');
    sub.style.display = hasVisibleItem ? 'block' : 'none';
  });

  // 4. 대분류(main-category) 표시 및 아코디언 제어
  mainCats.forEach(main => {
    const hasVisibleItemInMain = Array.from(main.querySelectorAll('.study-item'))
                                      .some(item => item.style.display !== 'none');
    
    // 검색 결과가 있으면 대분류를 보여주고, 태그 선택 시에는 아코디언을 자동으로 엽니다.
    main.style.display = hasVisibleItemInMain ? 'block' : 'none';
    if (tag !== 'all' && hasVisibleItemInMain) {
      main.open = true;
    } else if (tag === 'all') {
      // 'All' 클릭 시에는 가독성을 위해 닫아두고 싶다면 false, 유지하고 싶다면 이 줄 삭제
      // main.open = false; 
    }
  });
}
</script>

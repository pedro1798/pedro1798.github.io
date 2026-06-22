---
layout: page
title: Projects
permalink: /project/
---

{% assign projects = site.project | sort: "title" %}

<div class="project-overview">
  <span class="project-count">{{ projects.size }} projects</span>
</div>

<div class="project-grid">
  {% for item in projects %}
  <a href="{{ item.url | relative_url }}" class="project-card">
    <span class="project-card-kicker">Project</span>
    <span class="project-title">{{ item.title }}</span>
    {% if item.description %}
      <span class="project-description">{{ item.description }}</span>
    {% else %}
      <span class="project-description">Open project notes and implementation details.</span>
    {% endif %}
    <span class="project-card-footer">View project <span aria-hidden="true">-&gt;</span></span>
  </a>
  {% endfor %}
</div>

<style>
  .project-overview {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .project-count {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--meta-color);
    background: var(--nav-hover);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .project-card {
    display: flex;
    min-height: 180px;
    flex-direction: column;
    padding: 1.25rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    text-decoration: none;
    transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
  }

  .project-card:hover {
    border-color: var(--link-color);
    background: var(--nav-hover);
    text-decoration: none;
    transform: translateY(-2px);
  }

  .project-card-kicker {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--meta-color);
    letter-spacing: 0;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .project-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--link-color);
    line-height: 1.25;
    margin-bottom: 0.75rem;
  }

  .project-description {
    display: block;
    font-size: 0.95rem;
    color: var(--text-color);
    opacity: 0.82;
    line-height: 1.55;
  }

  .project-card-footer {
    margin-top: auto;
    padding-top: 1.25rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--meta-color);
  }

  .project-card:hover .project-card-footer {
    color: var(--link-color);
  }

  @media (max-width: 600px) {
    .project-overview {
      justify-content: flex-start;
    }

    .project-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

---
layout: home
title: "/* Let there be bit */" 
---

Recently I'm interested in **Linear Algebra**, **Set Theory** and **Bevy**.

<div class="landing-sections">
  <section class="landing-section">
    <h3>Contents</h3>
    <ul class="content-links">
      <li><a href="/study/">Study</a></li>
      <li><a href="/paper/">Papers</a></li>
      <li><a href="/project/">Projects</a></li>
      <li><a href="/books/">Book Archive</a></li>
      <li><a href="/writings/">👀</a></li>
    </ul>
  </section>

  <section class="landing-section">
    <h3>Links</h3>
    <ul class="content-links">
      <li><a href="https://github.com/pedro1798">GitHub</a></li>
      <li><a href="mailto:peter584aa@knu.ac.kr">Email</a></li>
    </ul>
  </section>
</div>

<style>
  .landing-sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 3rem;
  }
  .landing-section h3 {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--meta-color);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  .content-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .content-links li {
    margin-bottom: 0.5rem;
  }
  .content-links a {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--link-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 600px) {
    .landing-sections {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>

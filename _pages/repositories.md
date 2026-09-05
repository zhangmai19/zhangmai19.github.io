---
layout: page
permalink: /repositories/
title: Code
description: Projects and experiments on GitHub.
nav: true
nav_order: 4
---

<div class="code-projects">
  {% for repo in site.data.repositories.github_repos %}
    <a class="code-project" href="https://github.com/{{ repo }}">
      <span class="code-number" aria-hidden="true">0{{ forloop.index }}</span>
      <span class="code-details">
        <span class="code-title">{{ repo | split: '/' | last }}</span>
        <span class="code-source">{{ repo }}</span>
      </span>
      <span class="code-arrow" aria-hidden="true">↗</span>
    </a>
  {% endfor %}
</div>

{% for user in site.data.repositories.github_users %}
<p class="quiet-note">More on <a href="https://github.com/{{ user }}">github.com/{{ user }} <span aria-hidden="true">↗</span></a>.</p>
{% endfor %}

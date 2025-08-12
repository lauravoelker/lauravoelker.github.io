---
layout: single
title: ""
permalink: /cloud-adaption-framework/
category: [cloud-adaption-framework]
taxonomy: cloud-adaption-framework
entries_layout: grid
show_excerpts: false
---
**Cloud adaption framework**<br>
Thinking about Azure and not sure where to begin. The Cloud Adoption Framework offers six clear stages to guide your journey from setting goals through day to day operations in the cloud. 

Here you will find friendly explanations of each phase, the key questions to ask and hands on worksheets to keep you on track.<br>
I will share simple PowerShell examples and customer ready templates so you can take next steps without the guesswork. 

By the end you will have a roadmap and tools to move forward with confidence and ease.

**Featured Articles**

{% assign caf_posts = site.categories['Cloud Adaption Framework'] | sort: 'date' | reverse %}

<div class="grid__wrapper">
  {% for post in caf_posts %}
  <article class="archive__item">
    <a class="archive__item-teaser" href="{{ post.url | relative_url }}">
      <img src="{{ (post.teaser | default: site.teaser) | relative_url }}" alt="{{ post.title }}">
    </a>
    <h2 class="archive__item-title no_toc">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h2>
  </article>
  {% endfor %}
</div>




---
layout: archive
title: ""
permalink: /cloud-adaption-framework/
category: cloud-adaption-framework
taxonomy: cloud-adaption-framework
entries_layout: grid
---
**Cloud adaption framework**<br>
Thinking about Azure and not sure where to begin. The Cloud Adoption Framework offers six clear stages to guide your journey from setting goals through day to day operations in the cloud. 

Here you will find friendly explanations of each phase, the key questions to ask and hands on worksheets to keep you on track.<br>
I will share simple PowerShell examples and customer ready templates so you can take next steps without the guesswork. 

By the end you will have a roadmap and tools to move forward with confidence and ease.

**Featured Articles**<br>
{% assign caf_posts = site.categories['Cloud Adaption Framework'] | sort: 'date' | reverse %}
{% for post in caf_posts %}
  {% include archive-single.html %}
{% endfor %}



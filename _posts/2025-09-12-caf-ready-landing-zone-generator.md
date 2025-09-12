---
layout: single
title: "CAF Ready - From Strategy to a Clickable Landing Zone"
excerpt: "Turn Cloud Adoption Framework choices into reproducible infrastructure. Configure once, get Bicep and Terraform instantly."
permalink: /blog/caf-ready-landing-zone-generator/
categories: [Cloud Adoption Framework]
tags: [Azure, CAF, Governance, Security, Landing Zone, Bicep, Terraform]
author_profile: false
classes: wide
toc: true
toc_label: "On this page"
header:
  overlay_image: /assets/images/lz-generator-hero.webp
  overlay_filter: 0.25
  caption: "CAF Ready - Landing Zone Generator"

feature_row:
  - image_path: /assets/images/strategy-first-hero.webp
    alt: Strategy First
    title: "Strategy First: Why it matters before any VM"
    excerpt: "The business case, risks, and measurable outcomes that guide CAF."
    url: "{% post_url 2025-08-08-strategy-first %}"
    btn_label: "Read post"
    btn_class: "btn--primary"
  - image_path: /assets/images/caf-plan-hero.webp
    alt: Plan Ready
    title: "Plan Ready: Adapting your CAF roadmap"
    excerpt: "Roles, RACI, governance decisions, and the first workloads."
    url: "{% post_url 2025-08-22-caf-plan %}"
    btn_label: "Read post"
    btn_class: "btn--primary"
---

## TL;DR
Planning and strategy set the rules. This post ships a lightweight Landing Zone Generator that turns those rules into Bicep and Terraform starters you can copy, download, and share.

<p><a class="btn btn--primary" href="{{ '/landing-zone-generator/' | relative_url }}">Open the Landing Zone Generator</a></p>

## Previously in this series
{% include feature_row %}

## Who is this for
- MSPs and system integrators who want a repeatable baseline  
- Teams preparing migrations that must not drift from governance and security  
- Readers who prefer simple choices mapped to CAF design areas

## Try the tool
{% include lzgen.html %}

<p><a class="btn" href="{{ '/landing-zone-generator/' | relative_url }}">Open the standalone tool</a></p>

## Roadmap
Next iterations will add Application Landing Zones for AKS, AVD, and AI, plus compliance packs and ALZ compatible exports.

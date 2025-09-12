---
layout: single
title: ""                            # keine automatische H1
permalink: /landing-zone-generator/
author_profile: true
classes: wide
toc: false
lzgen: true                          # sorgt dafür, dass lzgen.js NUR hier geladen wird
---

**Landing Zone Generator** <br>  
Generate a ready-to-use Azure Landing Zone tailored to your org. 

Pick a preset, adjust options, click *Generate*, then download Bicep/Terraform or export ALZ-compatible configs. Everything runs client-side.

**What is this?** <br>
An interactive **CAF-Ready Landing Zone Generator** aligned with Microsoft’s Cloud Adoption Framework guardrails. 
It scaffolds a platform landing zone and app variants (AKS, AVD, SAP, APIM). Your selections are stored only in your browser (localStorage).


{% include lzgen.html %}

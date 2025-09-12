---
layout: single
title: ""                            # keine automatische H1
permalink: /landing-zone-generator/
author_profile: true
toc: false
lzgen: true                          # sorgt dafür, dass lzgen.js NUR hier geladen wird
---

**Landing Zone Generator** <br>
Generate a ready-to-use Azure Landing Zone tailored to your org. 

Pick a preset, adjust options, click *Generate*, then download Bicep/Terraform or export ALZ-compatible configs. Everything runs client-side.

**What is this?** <br>
An interactive **CAF-Ready Landing Zone Generator** aligned with Microsoft’s Cloud Adoption Framework guardrails. 
It scaffolds a platform landing zone and app variants (AKS, AVD, SAP, APIM). Your selections are stored only in your browser (localStorage).

**How to use it:**
  <ol>
    <li><strong>Preset:</strong> Start with <em>Starter</em>, <em>Regulated</em>, or <em>Enterprise</em></li>
    <li><strong>Fill in:</strong> Organization, Identity, Network, Governance, Security, Ops &amp; Cost, Automation</li>
    <li><strong>Pick an archetype:</strong> AKS, AVD, SAP, or APIM</li>
    <li><strong>Click Generate:</strong> And review the Summary</li>
    <li><strong>Export:</strong> Bicep/Terraform, <code>params.json</code> (ALZ) and <code>.tfvars</code>, plus app snippets</li>
    <li><strong>Share link:</strong> to copy a URL with your config encoded</li>
  </ol>

**Next steps:**
  <ul>
    <li>Put files in a repo and run via GitHub Actions or Azure DevOps (as selected)</li>
    <li>Align management groups &amp; subscriptions with the Summary</li>
    <li>For Azure Landing Zone, import <code>params.json</code>/<code>.tfvars</code> and extend modules</li>
    <li>Review policies vs. your compliance pack (MCSB, ISO 27001, NIST, CIS, PCI)</li>
  </ul>

{% include lzgen.html %}

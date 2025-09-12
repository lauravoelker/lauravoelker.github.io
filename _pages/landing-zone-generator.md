---
layout: single
title: ""
permalink: /landing-zone-generator/
author_profile: true
toc: false
classes: wide
lzgen: true
---
{% include lzgen.html %}

**Landing Zone Generator**<br>
Generate a ready-to-use Azure Landing Zone tailored to your organization in minutes. Pick a preset, adjust options, click **Generate**, then download Bicep/Terraform or export ALZ-compatible configs.  
{: .notice--info}

### What is this?
This page hosts an interactive **CAF-Ready Landing Zone Generator**. It follows Microsoft’s Cloud Adoption Framework (CAF) guardrails and accelerators to scaffold a platform landing zone plus app-focused variants (AKS, AVD, SAP, APIM).

**Everything runs client-side.** No data is sent to a server; your choices are stored only in your browser (localStorage).

### How to use it
1. **Preset** – start with *Starter*, *Regulated*, or *Enterprise*.  
2. **Fill in the sections** – Organization, Identity, Network, Governance, Security, Ops & Cost, Automation.  
3. **Pick an archetype** (optional) – *AKS*, *AVD*, *SAP*, or *APIM*; the app section will appear.  
4. Click **Generate** – review the **Summary**.  
5. **Export** what you need:  
   - **Bicep** or **Terraform** starters for the platform  
   - **params.json** (ALZ-compatible) and **tfvars**  
   - Optional app templates (AKS/AVD/SAP/APIM)  
6. **Share link** – copies a URL with your choices encoded (handy for reviews).

### What to do next
- Put the generated files into a repo and run them with **GitHub Actions** or **Azure DevOps** (choose your pipeline in the form).  
- Align **management groups & subscriptions** with the Summary (Connectivity, Identity, Management, Workload).  
- If you use **Azure Landing Zone (ALZ)**, import the exported **params.json**/**tfvars** into your ALZ/Bicep or Terraform workflow and extend modules as needed.  
- Review policies and adjust for your compliance profile (MCSB, ISO 27001, NIST, CIS, PCI).

### Further reading
- Strategy first: {% post_url 2025-08-08-strategy-first %}  
- CAF planning checklist: {% post_url 2025-08-22-caf-plan %}  
- Overview: [Cloud Adaption Framework](/cloud-adaption-framework/)


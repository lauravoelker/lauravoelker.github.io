---
layout: single
title: "Strategy First: Why It Matters Before Any VM"
permalink: /strategy-first/
date: 2025-08-08

# ✅ keep this as a one-item array
categories:
  - Cloud Adaption Framework

tags: ["Azure", "Security", "Governance", "CAF"]

header:
  overlay_image: "/assets/images/posts/Strategy-First-Hero.webp"
  overlay_filter: 0.4
  caption: "Photo: canva"

image: "/assets/images/posts/Strategy-First-Social.webp"
teaser: "/assets/images/posts/Strategy-First-Teaser.webp"

author_profile: true
toc: true
toc_sticky: true
---

## Intro
<i>"Flip the switch on MFA and you think you’re done? Not quite."</i>

Turning on a single security setting won't keep your cloud safe. True protection starts with figuring out why you are in the cloud, who owns the risk and how it will help your business.

Today I will walk you through the first step of Microsoft's Cloud Adaption Framework 'Strategy' and share a ten-question worksheet to get you and your team on the same page before you touch a VM.

## What is the Cloud Adaption Framework?
The Cloud Adaption Framework is Microsoft's guide to doing Azure right. It breaks the journey into six steps:<br>

**1. Strategy**: What to archieve and who needs to be involved<br>
**2. Plan**: Turn those goals into a list of projects and quick wins<br>
**3. Ready**: Build your secure foundation in the cloud<br>
**4. Adopt**: Move and create workloads under those guardrails<br>
**5. Govern**: Keep policies in place and measure compliance<br>
**6. Manage**: Run and improve your enviroment over time<br>

In this post we will focus on Strategy. 
We will define your goals, your appetite for risk and the measures of the success that guide every step that follows. 

![Cloud Adaption Framework Roadmap](/assets/images/CAF-Roadmap.svg)

## Define your strategy
Walk through the heart of strategy in three parts:

**1. Business Goals and Metrics**<br>
Ask your team to name the top three things they expect Azure to deliver.
Then turn each into a simple, measurable goal.

<table>
  <thread>
    <tr>
      <th>Objective</th>
      <th>Matric</th>
      <th>Deadline</th>
    </tr>
  </thread>
  <tbody>
    <tr>
      <td>Cut IT operating costs</td>
      <td>Reduce monthly spend by 20%</td>
      <td>Dec 31, 2025</td>
    </tr>
    <tr>
      <td>Launch new features</td>
      <td>New release every four weeks</td>
      <td>Jun 30, 2025</td> 
    </tr>
      <tr>
      <td>Pass an ISO 27001 audit</td>
      <td>Zero critical findings</td>
      <td>Mar 1, 2026</td> 
    </tr>  
  </tbody>
</table>

*This table is an example.

**2. Risk Appetite**<br>
Decide how much risk you will accept and write a note why you chose that level.

<table>
  <thread>
    <tr>
      <th>Low</th>
      <th>Medium</th>
      <th>High</th>
    </tr>
  </thread>
  <tbody>
    <tr>
      <td>No surprise, even if it costs more</td>
      <td>Balance speed and security</td>
      <td>Move fast and refine</td>
    </tr>
   </tbody>
</table>

**3. Roles and Responsibilities**<br>
Make sure everyone knows who does what. 

<table>
  <thread>
    <tr>
      <th>Role</th>
      <th>Team</th>
      <th>Responsible</th>
      <th>Accountable</th>
      <th>Consulted</th>
      <th>Informed</th>
    </tr>
  </thread>
  <tbody>
    <tr>
      <td>Executive Sponsor</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Security Lead</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Cloud Architect</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Compliance or Legal</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Business Unit Owner</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
   </tbody>
</table>

## Turn Strategy into Action
Tie your strategy answers back to five governance areas. This shows why those questions mattered.

![The five governance areas](/assets/images/governance-area.svg)

When you lock in your goals, risk level, and roles, you have everything you need to drive each governance area. 
Your risk appetite and KPIs set the tone for Security Governance policies. 

Your MFA targets and stakeholder map tell you exactly who needs what access in Identity and Access. 
The regions and network requirements from Strategy guide your Infrastructure and Networking design. 

Data classification and audit dates dictate your encryption and retention rules. 

And your speed versus risk balance defines the security checks in your build and release process. Each area flows straight from the Strategy work you just did.

## Download your Worksheet
Put everything into one simple, fill-in form.

<a href="{{ '/assets/Files/Strategy-Discover-Worksheet.pdf' | relative_url }}" download>PDF download</a>

Open it in your next meeting. Work together to fill in goals, risk appetite, roles and compliance checks. That should take no more than 30 minutes.

## What Comes Next
When you have your strategy in place, move on to planning.

1. Pick your first three “quick wins” for the next 30 days<br>
2. Build a backlog of projects for the next 90 to 180 days<br>
3. Sketch a simple timeline to track progress

In the next post I will show you exactly how to turn these strategy outcomes into a plan you can execute.

## References

<table>
  <thread>
    <tr>
      <th>Tag</th>
      <th>URL</th>
    </tr>
  </thread>
  <tbody>
    <tr>
      <td>Microsoft CAF Overview</td>
      <td>(https://learn.microsoft.com/azure/cloud-adoption-framework)</td>
    </tr>
        <tr>
      <td>Microsoft CAF Strategy</td>
      <td>(https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/)</td>
    </tr>
    <tr>
      <td>Microsoft AI Adaption</td>
      <td>(https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/)</td>
    </tr>
        <tr>
      <td>Secure Score in Defender for Cloud</td>
      <td>(https://learn.microsoft.com/azure/security-center/security-center-secure-score)</td>
    </tr>
   </tbody>
</table>

---
status: in-progress
date: 2026-04-30
---
# 4️⃣ Subscription System for Projects, Backend APIs, Frontend Enhancements, SDKs

## 💡 Purpose
This document outlines the goals and planned outcomes of Milestone 4 of the Catalyst Fund 12 project "Iagon: Statur - Reputation Model for Cardano Ecosystem that encourages positive behavior" (further referenced to as Statur).

It starts with the project ID, project and milestone links, the outputs, acceptance criteria and proposed evidence for the Proof of Achievement in the milestone module. After that follows a results section that tracks the deliverables to be produced, with their evidence, links, explanations, and supporting documentation added as each item is completed.

> **Working document:** This is a live tracker of what still needs to be built and delivered for Milestone 4. Each item under Results is marked with its current status; links are added as evidence is produced. Once all items are complete, this document becomes the Proof of Achievement evidence (as `fund12-milestone-1.md` is for Milestone 1).

## 🆔 Project ID
`1200130`

## 🔗 Important Links

- Catalyst: <https://projectcatalyst.io/funds/12/cardano-use-cases-product/iagon-statur-reputation-model-for-cardano-ecosystem-that-encourages-positive-behavior>
- Milestone Module: <https://milestones.projectcatalyst.io/projects/1200130/milestones/4>
- Change Request: <https://drive.google.com/file/d/1uQVQJVcJIUX_QdEOX0-L4PX6jVvnVtl3/view?usp=drive_link>

## 🧱 Milestone Outputs
- For all individuals and projects, plan a subscription system with a free package for minimum compute necessity, and planning a subscription system according to the usage of compute
- Develop APIs to query quantitative metrics and history for projects\*
- Allow querying data through SDKs\*\*
- Automated DevOps
- Ongoing frontend and backend development
- QA, security and other tests

## 📦 Deliverables
1. Subscription system on frontend
2. APIs published on Iagon API docs
3. Project deployed on staging server
4. Users are able to add projects through APIs and frontend using self-serve cryptographic registration.
5. Users able to query through APIs, and SDK; and view their data of frontend with badges and points
6. On-chain anchoring of cryptographic proofs to verify the authenticity and integrity of off-chain metrics retrieved via the API.
7. Community testing reports

## ✔ Acceptance criteria
- Subscription pricing and tier list documentation and frontend integration.
- Stage server deployment and Stage APP video and screenshots
- Onchain proof of the metrics.
- Multiple options for project addition - SDKs, API and UX and all up-to date with subscription system added
- QA bug reports and fixes.

## 🧾 Evidence of milestone completion
- Link to docs showing subscription tiers and prices; screenshots and video demos showing the integration
- API link showing added API endpoints, link to SDKs, and screenshots of refined frontend UX showing subscriptions of the projects
- Staging server link of the product
- Demo video showing projects additions using APIs, UX or SDKs and the changes in scores and badges
- Demo video of on-chain data cross verified with scoring system
- Community report published on IAGON website and social media.
- Published QA report findings and the resolution status.

## 📝 Traceability Notes (Change Request alignment)
These notes are published on the milestone module to map the updated, Change-Request-approved approach back to the original proposal wording.

- **\* Self-serve cryptographic registration (was PR-based onboarding):** The original proposal referenced a pull-request–based onboarding flow for project participation. Following the approved Change Request, project addition and onboarding are implemented through self-serve cryptographic registration via APIs and frontend interfaces, eliminating repository-based governance dependency while preserving secure authentication.
- **\*\* On-chain anchoring of proofs (was direct on-chain dependency):** While earlier descriptions implied direct on-chain dependency for metric verification, the updated architecture anchors cryptographic proofs on-chain to verify the integrity of off-chain metrics retrieved via APIs and SDKs. This preserves verifiability without requiring full metric computation to occur on-chain.
- **Removed criterion — "Enable CI/CD for project addition":** This previously referenced acceptance criterion has been removed to reflect the transition from a repository-based, CI/CD-driven onboarding mechanism to a self-serve cryptographic registration flow. Project addition is now handled through direct API and frontend interactions, making CI/CD-based enablement unnecessary under the revised architecture approved via the Change Request.

## 🚀 Results
The following sections track each output and the evidence to be produced. Status legend: 🔲 To do · 🟡 In progress · ✅ Done.

### Subscription System
**Status: 🔲 To do**

Plan and implement a subscription system covering all individuals and projects, with a free package for minimum compute necessity and paid tiers scaling with compute usage. Document the tiers and integrate the system into the frontend.

To deliver:
- [ ] Subscription pricing and tier list documentation — _link TBD_
- [ ] Subscription system integrated on the frontend — _link TBD_
- [ ] Screenshots and video demos showing the integration — _link TBD_

### Backend APIs
**Status: 🔲 To do**

Develop and publish APIs to query quantitative metrics and history for projects, documented on the Iagon API docs.

To deliver:
- [ ] APIs to query quantitative metrics and history — _link TBD_
- [ ] APIs published on Iagon API docs — _link TBD (baseline spec: [Iagon Reputation Backend API.yaml](../Iagon%20Reputation%20Backend%20API.yaml))_

### SDK Data Querying
**Status: 🔲 To do**

Allow querying data through the SDKs so users can retrieve their reputation data programmatically.

To deliver:
- [ ] Data querying through SDKs — _link TBD_

### Project Addition (UX, API, SDK) with Subscription
**Status: 🔲 To do**

Ensure projects can be added through multiple options — SDKs, API, and UX — using self-serve cryptographic registration, all up to date with the subscription system. Users can view their data on the frontend with badges and points.

To deliver:
- [ ] Project addition via UX, API, and SDK (self-serve cryptographic registration) — _link TBD_
- [ ] Frontend view of data with badges and points — _link TBD_
- [ ] Demo video showing project additions and the changes in scores and badges — _link TBD_

### On-chain Anchoring of Cryptographic Proofs
**Status: 🔲 To do**

Anchor cryptographic proofs on-chain to verify the authenticity and integrity of off-chain metrics retrieved via the API.

To deliver:
- [ ] On-chain proof of the metrics — _link TBD_
- [ ] Demo video of on-chain data cross-verified with the scoring system — _link TBD_

### Automated DevOps
**Status: 🔲 To do**

Set up automated DevOps for the project, with the project deployed on a staging server.

To deliver:
- [ ] Project deployed on staging server — _staging link TBD (existing M1 staging: https://statur-beta.iagon.com)_
- [ ] Stage app video and screenshots — _link TBD_

### QA, Security and Other Tests
**Status: 🔲 To do**

Run QA, security, and other tests, and publish the findings and resolution status alongside community testing reports.

To deliver:
- [ ] QA bug reports and fixes — _link TBD_
- [ ] Published QA report findings and resolution status — _link TBD_
- [ ] Community testing report published on the Iagon website and social media — _link TBD_

---
status: in-progress
date: 2026-03-31
---
# 3️⃣ Contract Audit/Implementation on a Project and Automate Adding Projects

## 💡 Purpose
This document outlines the goals and planned outcomes of Milestone 3 of the Catalyst Fund 12 project "Iagon: Statur - Reputation Model for Cardano Ecosystem that encourages positive behavior" (further referenced to as Statur).

It starts with the project ID, project and milestone links, the outputs, acceptance criteria and proposed evidence for the Proof of Achievement in the milestone module. After that follows a results section that tracks the deliverables to be produced, with their evidence, links, explanations, and supporting documentation added as each item is completed.

> **Working document:** This is a live tracker of what still needs to be built and delivered for Milestone 3. Each item under Results is marked with its current status; links are added as evidence is produced. Once all items are complete, this document becomes the Proof of Achievement evidence (as `fund12-milestone-1.md` is for Milestone 1).

## 🆔 Project ID
`1200130`

## 🔗 Important Links

- Catalyst: <https://projectcatalyst.io/funds/12/cardano-use-cases-product/iagon-statur-reputation-model-for-cardano-ecosystem-that-encourages-positive-behavior>
- Milestone Module: <https://milestones.projectcatalyst.io/projects/1200130/milestones/3>
- Change Request: <https://drive.google.com/file/d/1uQVQJVcJIUX_QdEOX0-L4PX6jVvnVtl3/view?usp=drive_link>

## 🧱 Milestone Outputs
- Contract audit, implementation of the changes requested by auditors; implementation of contracts
- Test manually adding a project to the system, and tracking reputation score of the project
- Automate adding projects, project metrics and calculate reputation score through UX
- Develop open-source SDKs to support self-serve project registration using cryptographic proofs.\*
- Project-scoped reputation scoring based on project-defined metrics.\*\*
- Algorithm to update and automate reputation scores and badges on a preset schedule.\*\*\*
- Ongoing frontend and backend development
- Community testers onboarding

## 📦 Deliverables
1. Audit report of contracts with contracts published publicly
2. Showcase self-serve project registration using a deployable open-source reference application, demonstrating secure onboarding, private key handling, and frontend display of reputation scores. Added projects will have metrics updated on a preset schedule.
3. Invite projects to test Statur, social media and community interactions.

## ✔ Acceptance criteria
- Contracts audit and revisions report. Changed done on app according to the contract changes.
- Enhancements from test results
- Feature to add projects through UX and APIs\*\*
- SDKs to add projects dynamically\*
- Automated process of score calculation and scheduled updates. On-chain state change based on scheduled reputation updates.\*\*\*
- Community testers' feedbacks
- Demo video showing project additions to the system, with proof of change in badges and karma points

## 🧾 Evidence of milestone completion
- Final audit report after revisions
- Demo videos showing enhanced product, project addition features, project addition feature using APIs, on UX and using SDKs.
- Demo to also show the score and badges update in the UX.
- Community feedback report with status of works done published - video on the same
- Link and video demo to documentation showing how to use SDKs
- Link and video to API docs
- Test results report (features, security testing)

## 📝 Traceability Notes (Change Request alignment)
These notes are published on the milestone module to map the updated, Change-Request-approved approach back to the original proposal wording.

- **\* Self-serve cryptographic registration (was PR-based onboarding):** The original proposal referenced a pull-request–based onboarding mechanism coordinated through repository governance. Following the approved Change Request, onboarding is implemented through a self-serve cryptographic registration flow, enabling projects to authenticate and register directly via signed transactions or cryptographic verification.
- **\*\* Project-defined metrics (was centrally defined logic):** In the initial proposal, reputation logic was described in a more centrally defined structure. The updated architecture allows participating projects to define and configure their own reputation metrics within the Statur framework, while preserving verifiability and transparency of score calculation.
- **\*\*\* Configurable preset update intervals (was fixed epoch/month cycles):** The original description implied reputation updates tied to fixed epoch or month-based cycles. The updated implementation introduces configurable preset update intervals defined at the project level, maintaining predictable update behavior while increasing architectural flexibility.

## 🚀 Results
The following sections track each output and the evidence to be produced. Status legend: 🔲 To do · 🟡 In progress · ✅ Done.

### Contract Audit and Implementation
**Status: 🔲 To do**

Complete the contract audit, implement the changes requested by the auditors, and apply the corresponding changes to the app. Publish the contracts publicly.

To deliver:
- [ ] Final audit report after revisions — _link TBD_
- [ ] Contracts published publicly — _link TBD_
- [ ] App changes made according to the contract changes — _link TBD_

### Manual Project Addition and Reputation Tracking
**Status: 🔲 To do**

Test manually adding a project to the system and tracking that project's reputation score, capturing enhancements from the test results.

To deliver:
- [ ] Enhancements from test results — _link TBD_
- [ ] Test results report (features, security testing) — _link TBD_

### Automated Project Addition through UX and APIs
**Status: 🔲 To do**

Automate adding projects, project metrics, and reputation score calculation through the UX and APIs, with project-scoped scoring based on project-defined metrics.

To deliver:
- [ ] Feature to add projects through UX and APIs — _link TBD_
- [ ] Demo video showing project additions with proof of change in badges and karma points — _link TBD_

### Open-source SDKs for Self-serve Registration
**Status: 🔲 To do**

Develop open-source SDKs that support self-serve project registration using cryptographic proofs, with a deployable open-source reference application demonstrating secure onboarding, private key handling, and frontend display of reputation scores.

To deliver:
- [ ] SDKs to add projects dynamically — _link TBD_
- [ ] Deployable open-source reference application — _link TBD_
- [ ] SDK documentation + video demo showing how to use the SDKs — _link TBD_
- [ ] API documentation link + video — _link TBD_

### Automated/Scheduled Reputation Updates
**Status: 🔲 To do**

Implement the algorithm to update and automate reputation scores and badges on configurable preset intervals defined at the project level, including on-chain state change based on scheduled reputation updates.

To deliver:
- [ ] Automated score calculation with scheduled updates — _link TBD_
- [ ] On-chain state change on scheduled reputation updates — _link TBD_

### Community Testers Onboarding
**Status: 🔲 To do**

Invite projects to test Statur, run social media and community interactions, and collect tester feedback.

To deliver:
- [ ] Community testers' feedback — _link TBD_
- [ ] Community feedback report with status of works done published + video — _link TBD_

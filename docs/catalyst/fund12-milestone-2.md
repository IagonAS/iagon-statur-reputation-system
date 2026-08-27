# 2️⃣ NFT and Reputation Contract Development, and Further Development

## 💡 Purpose
This document outlines the goals and outcomes of Milestone 2 of the Catalyst Fund 12 project "Iagon: Statur - Reputation Model for Cardano Ecosystem that encourages positive behavior" (further referenced to as Statur).

It starts with the project ID, project and milestone links, the outputs, acceptance criteria and proposed evidence for the Proof of Achievement in the milestone module. After that follows a results section with the evidence, links, explanations, and supporting documentation for each output.

## 🆔 Project ID
`1200130`

## 🔗 Important Links

- Catalyst: <https://projectcatalyst.io/funds/12/cardano-use-cases-product/iagon-statur-reputation-model-for-cardano-ecosystem-that-encourages-positive-behavior>
- Milestone Module: <https://milestones.projectcatalyst.io/projects/1200130/milestones/2>
- Live Statur App (Staging): <https://statur-beta.iagon.com>
- Reputation Backend API, Swagger UI: <https://iagonas.github.io/iagon-statur-reputation-system/api/>
- Statur Documentation (metrics + scoring methodology): <https://docs.iagon.com/products/statur>

## 🧱 Milestone Outputs
- Finalize qualitative and quantitative metrics with community feedback
- Reputation calculation algorithm - karma points
- Contracts development for representation of a user's reputation with Karma points and Badges - Soul-bound (non-transferable) NFTs
- Initial frontend and backend development
- Badges Design
- Complete Figma design

## 📦 Deliverables
1. Final qualitative and quantitative metrics
2. Reputation calculation algorithm - karma points
3. Proof of contracts submitted to audit company
4. Complete Figma design
5. App on staging with ongoing frontend and backend development to showcase the progress of the development
6. Infographic regarding qualitative and quantitative metrics

## ✔ Acceptance criteria
- Deployment contract for non-transferrable immutable NFTs.
- Complete Figma designs with prototype.
- Finalized metrics formulas and initiate calculations.
- Contract documentation and audit submission.
- Frontend and backend first stage deployment along with backend swagger documentation.

## 🧾 Evidence of milestone completion
- Demo video.
- Contract audit submission proof.
- Deployed frontend app in current stage of deployment.
- Swagger enabled the backend to query user scores.

## 🚀 Results
The following sections provide all documentation and context and detailed links for each output where applicable:

### Finalized Metrics and Reputation Calculation Algorithm (Karma Points)

Statur has two layers.

The first is the solution itself, which is metric-agnostic. It does not impose a fixed set of metrics or a single scoring formula; each participating project defines its own metrics, value ranges, and weights. What is finalized and published is the scoring methodology: each metric value is multiplied by its weight, the products are summed, and the total is divided by the sum of the weights (a weighted average). An exponential time decay is applied for inactivity. Details and a specific example can be found here: <https://docs.iagon.com/products/statur#reputation-scoring>

The second is Iagon's own instantiation of Statur, which applies that methodology with a concrete set of category-level weights. The reputation score, shown to users as karma points, is the weighted average of the category scores. The category weights sum to `1.0`. Subcategory weights and individual value scales are internal and out of scope at this milestone.

Iagon category weights:

| Category | Weight |
|---|---|
| Token Holder | 0.28 |
| Liquidity Provider | 0.18 |
| Node Operator | 0.13 |
| Token Staker (Operator/Delegator) | 0.11 |
| Token Trader | 0.10 |
| Stake Pool Delegator | 0.08 |
| Badges | 0.07 |
| Storage Subscriber | 0.05 |

Total = **1.00**.

The reputation backend implements the algorithm. Per project and account it computes `score = (Σ(value · weight) / Σ(weight)) · e^(-days_inactive / decay_rate)` and exposes the result through an authenticated score endpoint. Unit tests in the backend codebase cover the calculation.

Links:
- [Statur Metrics & Scoring Methodology](https://docs.iagon.com/products/statur): taxonomy, weighted-average formula, worked example, decay behavior
- [Iagon Statur Score, category weights diagram (PNG)](../diagrams/statur-iagon-score-weights.png)
- [Iagon Statur Score, category weights (Mermaid source)](../diagrams/statur-iagon-score-weights.mmd)
- Live score query endpoint: `GET /api/v1/accounts/{public_key_hash}/score/`, see [Swagger UI](https://iagonas.github.io/iagon-statur-reputation-system/api/)

### Soulbound (Non-transferable) NFT Contracts and Audit Submission

The on-chain layer is a set of soulbound (non-transferable) NFTs implemented as Aiken smart contracts (Plutus v3) on Cardano. The contract codebase has three validators:

- The reputation validator mints a soulbound reputation token per user and anchors the cryptographic hash of the user's reputation state on-chain.
- The fee validator holds ADA used to cover transaction fees for operator-driven batch reputation updates.
- The badge validator issues soulbound badge tokens following the CIP-68 pattern. It is present in the codebase but outside the scope of this milestone's audit, and a candidate for a downstream audit pass.

The reputation and fee validators were submitted to and reviewed by an external auditor, Invariant0 (formerly Vacuumlabs Auditing). The evidence included here is the audit submission: project overview, audit scope, and executive summary. The detailed findings and the finalized report after revisions are reserved for Milestone 3, whose acceptance criteria call for the "Final audit report after revisions". The audited final commit is `c48b02a`; the audit ran June 24 to 30, 2025.

Links:
- [Audit submission proof, Invariant0 executive summary](./assets/statur-audit-submission-invariant0.pdf)
- [Section 6 of the Architecture Document](../Statur%20Architecture%20and%20Design%20Document.pdf), contract design
- [High Level Smart Contract Plan](https://docs.google.com/document/d/1KJeKao4ojMoS8WR_oHc7POLkpwADlIdKHuF_ciY5OPU/edit?tab=t.0)

### Initial Frontend Development and App on Staging

The Statur user-facing application is built with Vue 3 and Vite and runs on staging. It has a node-operator leaderboard ranked by karma, a per-user profile dashboard with the global score and a metrics breakdown, and a karma-calculation view.

Links:
- [Live Statur App (Staging)](https://statur-beta.iagon.com)

### Initial Backend Development and Swagger / OpenAPI Documentation

The reputation backend (Django REST Framework with drf-spectacular) is deployed with live Swagger / OpenAPI documentation. The deployed instance is IP-restricted, so the same spec is published as a Swagger UI on GitHub Pages. The API can be used to query user scores, accounts, badges, metrics, and history. The deployed OpenAPI spec is version `v1.0.0`.

Links:
- [Swagger UI (GitHub Pages)](https://iagonas.github.io/iagon-statur-reputation-system/api/)
- [OpenAPI spec (self-contained copy, v1.0.0)](../Iagon%20Reputation%20Backend%20API%20v1.0.0.yaml)

### Badges Design

The badge mechanism is implemented at the API/backend level.

A project creates a badge definition with `POST /api/v1/projects/{project_id}/badges/`: a `name`, an image URI, and optional `extra` metadata, scoped to the project. No accounts are attached at creation.

To assign a badge, the project requests a short-lived signing nonce (`GET .../badges/{badge_id}/accounts/{public_key_hash}/nonce/`), signs the `{badge_id}:{pkh}:{nonce}` message with its ed25519 key, and submits it with `PUT .../badges/{badge_id}/accounts/{public_key_hash}/`. The badge-to-account relationship is created idempotently.

Projects can list badges per account or per project, update a badge's `name`, `image`, or `extra`, and read per-badge audit logs. The project's subscription tier bounds the number of active badges.

Badge awards are currently recorded in the backend's canonical reputation store (the off-chain L2) and are not yet part of the on-chain reputation hash payload. On-chain soulbound badge tokens exist in the contract layer (`badge.ak`, CIP-68) but are not yet wired into the live update flow, and were outside the audited scope above.

Badges feed the Badges category of Iagon's score instantiation (category weight `0.07`).

The badge design UI is part of the `iagon-statur-public` sample app (see the additional section below). A project operator defines a badge (name, image, metadata) and assigns it to accounts through the flow above. The [demo video](#demo-video) walks through this UI, and the badge configuration screens are part of the Project Launcher Figma prototype linked below.

[Statur Badge Lifecycle](../badge-lifecycle.md) documents the full create, assign, and on-chain flow, including how the `badge.ak` soulbound contract fits in, and includes the [badge lifecycle sequence diagram](../diagrams/sequence-badge-lifecycle.png).

Links:
- [Statur Badge Lifecycle](../badge-lifecycle.md): create, assign, on-chain anchoring, contract roles
- [Badge lifecycle sequence diagram (PNG)](../diagrams/sequence-badge-lifecycle.png)
- [Demo video](#demo-video): badge definition and assignment in the sample app
- [Figma prototype: Statur Project Launcher](https://www.figma.com/proto/0QdbFmZmpiRx0wJIo0G01d/Statur-%7C-Project-Launcher?node-id=2163-24707&p=f&t=6yc0xtGyXABmbubq-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2136%3A30942&show-proto-sidebar=1): badge configuration screens

### Complete Figma Design

Two interactive Figma prototypes cover the key screens of the system: the Statur UI (end-user app) and the Project Launcher (project onboarding and configuration, including badge setup).

Links:
- [Figma prototype: Statur UI](https://www.figma.com/proto/py46aaYPn2iI7EisK8QGmj/Statur-UI-Demo?page-id=0%3A1&node-id=4-443&p=f&viewport=347%2C411%2C0.02&t=tiGbmKNnoNSISncc-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4%3A443&show-proto-sidebar=1)
- [Figma prototype: Statur Project Launcher](https://www.figma.com/proto/0QdbFmZmpiRx0wJIo0G01d/Statur-%7C-Project-Launcher?node-id=2163-24707&p=f&t=6yc0xtGyXABmbubq-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2136%3A30942&show-proto-sidebar=1)

### Infographic (Qualitative and Quantitative Metrics)

The infographic summarizes Iagon's instantiation of Statur: the karma-points formula (weighted average with exponential inactivity decay), the eight category weights as a proportional bar, and the qualitative and quantitative metrics each category is built from.

Links:
- [Infographic: karma points and category weights (SVG)](./assets/statur-category-weights-v2.svg)

### Demo Video

The demo video shows the current stage of development: the Statur app on staging (leaderboard, profile dashboard), the live backend for scores, the badge definition flow, and the project-bootstrap sample app described below, including scoring tracking and sample game.

Links:
- [Milestone 2 demo video](https://youtu.be/RNbqSJuVTCA)

### Additional Progress: Project-bootstrap Sample App

The team is building `iagon-statur-public`, a public sample application that projects can use to bootstrap their own Statur deployment. It consists of an administrative backend, a project-management frontend, and a generated TypeScript SDK (`statur-public-sdk`) for the project, metrics, and badge APIs, including the badge-definition UI. It is the groundwork for the self-serve project onboarding planned for Milestones 3 and 4.

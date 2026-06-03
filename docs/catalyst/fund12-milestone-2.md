---
status: in-progress
date: 2026-02-28
---
# 2️⃣ NFT and Reputation Contract Development, and Further Development

## 💡 Purpose
This document outlines the goals and outcomes of Milestone 2 of the Catalyst Fund 12 project "Iagon: Statur - Reputation Model for Cardano Ecosystem that encourages positive behavior" (further referenced to as Statur).

It starts with the project ID, project and milestone links, the outputs, acceptance criteria and proposed evidence for the Proof of Achievement in the milestone module. After that follows a results section that includes the evidence, links, explanations, and supporting documentation for each output.

> **Working document:** Evidence is being assembled for Milestone 2. Each item under Results is marked with its current status; a few artifacts are still being produced (infographic, demo video, badge visual design) and are marked accordingly. Once all items are complete this becomes the final Proof of Achievement evidence (as `fund12-milestone-1.md` is for Milestone 1).

## 🆔 Project ID
`1200130`

## 🔗 Important Links

- Catalyst: <https://projectcatalyst.io/funds/12/cardano-use-cases-product/iagon-statur-reputation-model-for-cardano-ecosystem-that-encourages-positive-behavior>
- Milestone Module: <https://milestones.projectcatalyst.io/projects/1200130/milestones/2>
- Change Request: <https://drive.google.com/file/d/1uQVQJVcJIUX_QdEOX0-L4PX6jVvnVtl3/view?usp=drive_link>
- Live Statur App (Staging): <https://statur-beta.iagon.com>
- Reputation Backend API + Swagger (live): <https://reputation-backend.cfs1.iagon.com/api/docs/>
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
The following sections provide documentation, context, and links for each output. Status legend: 🔲 To do · 🟡 In progress · ✅ Done.

### Finalized Metrics and Reputation Calculation Algorithm (Karma Points)
**Status: ✅ Methodology + Iagon category-level formula done · subcategory breakdown intentionally deferred**

Statur is presented as a two-fold model:

1. **Statur the solution is metric-agnostic.** It does not impose a fixed set of metrics or a single scoring formula — each participating project defines its own metrics, value ranges, and weights. The scoring *methodology* is finalized and published: each metric value is multiplied by its weight, the products are summed, and the total is divided by the sum of the weights (a weighted average), with an exponential time-decay applied for inactivity. The published methodology, the metric taxonomy, and a worked example are available on the Iagon documentation site.

2. **Iagon's own instantiation of Statur** applies that methodology with a concrete set of **category-level weights**. The reputation score — expressed to users as **karma points** — is the weighted average of the category scores. The category weights sum to `1.0`. Subcategory weights and individual value scales are internal and intentionally out of scope at this milestone.

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

The algorithm is implemented in the reputation backend, which computes, per project and account, `score = (Σ(value · weight) / Σ(weight)) · e^(-days_inactive / decay_rate)` and exposes it through a live, authenticated score endpoint. The calculation is covered by unit tests in the backend codebase.

Links:
- [Statur Metrics & Scoring Methodology](https://docs.iagon.com/products/statur) — taxonomy, weighted-average formula, worked example, decay behavior
- [Iagon Statur Score — Category Weights diagram (PNG)](../diagrams/statur-iagon-score-weights.png)
- [Iagon Statur Score — Category Weights (Mermaid source)](../diagrams/statur-iagon-score-weights.mmd)
- Live score query endpoint: `GET /api/v1/accounts/{public_key_hash}/score/` — see [Swagger](https://reputation-backend.cfs1.iagon.com/api/docs/)

### Soulbound (Non-transferable) NFT Contracts + Audit Submission
**Status: ✅ Contracts developed and submitted to audit (full report reserved for Milestone 3)**

The on-chain layer is implemented as **soulbound (non-transferable) NFTs** using Aiken smart contracts (Plutus v3) on Cardano. The contract codebase contains three validators:

- **Reputation validator** — mints a soulbound reputation token per user and anchors the cryptographic hash of the user's reputation state on-chain.
- **Fee validator** — holds ADA used to cover transaction fees for operator-driven batch reputation updates.
- **Badge validator** — soulbound badge tokens following the CIP-68 pattern; present in the codebase but **outside the scope of this milestone's audit** (a candidate for a downstream audit pass).

The **reputation and fee validators** were submitted to and reviewed by an external auditor, **Invariant0 (formerly Vacuumlabs Auditing)**. The audit submission included here — the project overview, audit scope, and executive summary — is the evidence for this milestone; the detailed findings and finalized report after revisions are reserved for Milestone 3 (whose acceptance criteria explicitly call for the "Final audit report after revisions"). The audited final commit is `c48b02a` (audit conducted June 24–30, 2025).

Links:
- [Audit submission proof — Invariant0, executive summary](./assets/statur-audit-submission-invariant0.pdf)
- [Section 6 of the Architecture Document](../Statur%20Architecture%20and%20Design%20Document.pdf) — contract design
- [High Level Smart Contract Plan](https://docs.google.com/document/d/1KJeKao4ojMoS8WR_oHc7POLkpwADlIdKHuF_ciY5OPU/edit?tab=t.0)

### Initial Frontend Development + App on Staging
**Status: ✅ Deployed on staging**

The Statur user-facing application is built with Vue 3 + Vite and is deployed and reachable on staging. It surfaces the reputation features: a node-operator leaderboard ranked by karma, a per-user profile dashboard showing the global score and a metrics breakdown, and a karma-calculation view.

Links:
- [Live Statur App (Staging)](https://statur-beta.iagon.com)

### Initial Backend Development + Swagger / OpenAPI Documentation
**Status: ✅ Deployed, Swagger live**

The reputation backend (Django REST Framework with drf-spectacular) is deployed to an internet-facing URL with live Swagger / OpenAPI documentation that enables querying user scores, accounts, badges, metrics, and history. The deployed OpenAPI spec is version `v0.11.0`.

Links:
- [Live Swagger UI](https://reputation-backend.cfs1.iagon.com/api/docs/)
- [OpenAPI spec (self-contained copy, v0.11.0)](../Iagon%20Reputation%20Backend%20API%20v0.11.0.yaml)

### Badges Design
**Status: 🟡 Mechanism implemented · visual design in progress**

The **badge mechanism is implemented at the API/backend level**:
- **Create** — `POST /api/v1/projects/{project_id}/badges/` creates a badge *definition* (a `name`, an image URI, and optional `extra` metadata) scoped to a project. No accounts are attached at creation; they are assigned later.
- **Assign** — the project requests a short-lived signing nonce (`GET .../badges/{badge_id}/accounts/{public_key_hash}/nonce/`), signs the `{badge_id}:{pkh}:{nonce}` message with its ed25519 key, and submits it (`PUT .../badges/{badge_id}/accounts/{public_key_hash}/`). The badge↔account relationship is created idempotently.
- **Query / manage** — list badges per account or project, update a badge's `name`/`image`/`extra`, and read per-badge audit logs. The number of active badges per project is bounded by the project's subscription tier.
- **On-chain status** — badge awarding is currently recorded in the backend's canonical reputation store (the off-chain L2); it is **not yet part of the on-chain reputation hash payload**. On-chain soulbound badge tokens are implemented in the contract layer (`badge.ak`, CIP-68) but are not yet wired into the live update flow (and were outside the audited scope above).
- Badges contribute to the **Badges** category of Iagon's score instantiation (category weight `0.07`).
- A **sample badge-definition UI** exists in the `iagon-statur-public` sample app (see the additional section below).

The remaining work is the **badge visual design**. Conceptual design and example badge screenshots from Figma are to be added.

The full create → assign → on-chain flow (and how the `badge.ak` soulbound contract plays into it) is documented in [Statur Badge Lifecycle](../badge-lifecycle.md), which includes the [badge lifecycle sequence diagram](../diagrams/sequence-badge-lifecycle.png).

Links:
- [Statur Badge Lifecycle](../badge-lifecycle.md) — create / assign / on-chain anchoring + contract roles
- [Badge lifecycle sequence diagram (PNG)](../diagrams/sequence-badge-lifecycle.png)
- [Badge design — Figma screenshots](./assets/) — ⏳ _to be added: `badge-design-figma-*.png`_

### Complete Figma Design
**Status: ✅ Done**

The complete Figma design with an interactive prototype covers the key screens of the system.

Links:
- [Figma Prototype](https://www.figma.com/proto/py46aaYPn2iI7EisK8QGmj/Statur-UI-Demo?page-id=0%3A1&node-id=4-443&p=f&viewport=347%2C411%2C0.02&t=tiGbmKNnoNSISncc-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4%3A443&show-proto-sidebar=1)

### Infographic (Qualitative & Quantitative Metrics)
**Status: 🔲 To do**

An infographic summarizing the qualitative and quantitative metrics is to be produced and published.

To deliver:
- [ ] Infographic regarding qualitative and quantitative metrics — _link TBD_

### Demo Video
**Status: 🔲 To do**

A demo video demonstrating the current stage of development is to be recorded. It is expected to showcase the deployed app, score/badge features, and the project-bootstrap sample app below.

To deliver:
- [ ] Milestone 2 demo video — _link TBD_

### Additional Progress — Project-bootstrap Sample App
**Status: 🟡 In progress (beyond the stated milestone outputs)**

Although not explicitly listed in the milestone outputs, the team is building `iagon-statur-public`: a public **sample/reference application that projects can use to bootstrap their own Statur deployment**. It comprises an administrative backend, a project-management frontend, and a generated TypeScript SDK (`statur-public-sdk`) exposing project, metrics, and badge APIs — including a sample badge-definition UI. This lays the groundwork for the self-serve project onboarding targeted in Milestones 3–4. It currently integrates against an earlier version of the reputation backend API; updating it to the latest deployed spec (`v0.11.0`) is in progress.

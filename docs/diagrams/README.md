# Statur Diagrams

This folder contains the diagrams referenced from the Statur Architecture and Design Document and the Catalyst milestone deliverables.

Mermaid sources live as `.mmd` files. To regenerate the rendered PNGs, run from the repo root:

```bash
npm install
npm run render-diagrams
```

Rendered output lands in `docs/diagrams/output/`.

## Statur High-Level Architecture

This architecture diagram provides a system-level overview of Statur and its interaction with participating projects. It highlights the clear separation of responsibilities between project-hosted systems and Iagon-hosted Statur components. Project frontends and backends integrate with Statur using authenticated and signed API calls, while Iagon operates the reputation backend, database, and batcher service. The batcher periodically publishes cryptographic hashes of users' reputation states to the public Cardano blockchain, ensuring on-chain verifiability without relying on Iagon as a trusted party.

- Source: [`architecture.mmd`](./architecture.mmd)
- Rendered: [`architecture.svg`](./architecture.svg) · [`architecture.png`](./architecture.png)

## Statur Detailed Architecture

This diagram complements the high-level architecture and shows the internal structure of each trust boundary in the Statur system. It covers:

- The end user actor and their Cardano wallet, used to authorize on-chain mint and exit transactions.
- Iagon's user-facing Statur product: a frontend that pseudonymous users browse to view their reputation and onboard, paired with a backend that holds Iagon's ed25519 signing key and submits signed metric updates to the Statur Reputation Backend.
- An integrating project's product, structured the same way: a frontend used by the project's users and a backend that holds the project's ed25519 signing key, computes metric values, and submits signed metric updates.
- An analytics consumer that reads reputation data from the Statur Reputation Backend (no on-chain footprint, no signing key) and cross-references on-chain addresses with internal or external datasets to power dashboards and downstream products. This represents the read-side value of having reputation anchored on-chain — pseudonymous reputation can be enriched with other data and consumed inside or outside Iagon's ecosystem.
- The Statur Reputation Backend, shown as REST API layer, auth and signature middleware, service layer (scoring, audit, tier enforcement), ORM, score cache, Postgres database, and the batcher service that publishes reputation hashes on-chain.
- The Cardano public network with the three Aiken validators that make up the Statur on-chain footprint: the reputation validator (soulbound NFT plus reputation hash), the badge validator, and the fee validator.

- Source: [`architecture-detailed.mmd`](./architecture-detailed.mmd)

## Sequence — Metric Definition Creation

This sequence diagram illustrates how a project administrator defines a new reputation metric for a project using Statur. The process begins with the administrator submitting a validated metric definition through the project's administration frontend. The project backend then authenticates with the Statur reputation backend using a JWT derived from its API key and signs the metric definition using its project-owned ed25519 key. The signed payload is verified by the reputation backend, which enforces authentication, signature validity, and authorization before persisting the metric definition in the database. Upon success, confirmation is returned to the project, completing the administrator's action.

- Source: [`sequence-metric-creation.mmd`](./sequence-metric-creation.mmd)
- Rendered: [`sequence-metric-creation.svg`](./sequence-metric-creation.svg) · [`sequence-metric-creation.png`](./sequence-metric-creation.png)

## Sequence — User Metric Update and Reputation Publication

This sequence diagram describes how a project updates the reputation metrics of an already-linked user. Metric values are calculated automatically by the project backend based on project-specific triggers or criteria and are signed using the same cryptographic mechanism as metric definitions. The Statur reputation backend validates authentication, signature integrity, and project–user linkage before applying the update to the user's reputation document and recording the signed update in the user's reputation history. On a scheduled basis, the batcher service aggregates outstanding updates, computes the canonical reputation hash, and publishes the updated hash to the Cardano blockchain, ensuring verifiable and cost-efficient on-chain synchronization.

- Source: [`sequence-metric-account-update.mmd`](./sequence-metric-account-update.mmd)
- Rendered: [`sequence-metric-account-update.svg`](./sequence-metric-account-update.svg) · [`sequence-metric-account-update.png`](./sequence-metric-account-update.png)

## Reputation Database Schema

The reputation database schema is generated from the Django models in `iagon-reputation-backend` (graphviz output, not mermaid). It is included here as a static rendered artifact.

- Rendered: [`reputation-database-schema.svg`](./reputation-database-schema.svg) · [`reputation-database-schema.png`](./reputation-database-schema.png)

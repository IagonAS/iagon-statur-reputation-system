# Response to Second Milestone Reviewer Feedback

Dear reviewer,

Below is our response to your feedback on the Statur Milestone 1 deliverables and what was added to the repository in response.

## Architecture diagram, database design, and backend technical depth

### Architecture diagram (existing)

https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/diagrams/architecture.png is intentionally a system-level overview, titled "Statur High-Level Architecture". Its purpose is to communicate component boundaries between the integrating project, Iagon, and Cardano. Component-internal depth is provided in the deeper artifacts listed below and in the new detailed architecture diagram added in response to your feedback.

### Database design (existing)

https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/diagrams/reputation-database-schema.svg is auto-generated from the production database models and shows every table , every field with its type, and every foreign-key relationship. Aside from index definitions or raw DDL output, this is the lowest-level schema artifact a relational database can produce, and it reflects the schema the system is actually running on.

### Backend technical depth in the existing Milestone 1 evidence

The following artifacts were already part of the Milestone 1 deliverable set and contain concrete backend depth:

- https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/Iagon%20Reputation%20Backend%20API.yaml — OpenAPI 3.0.3 specification covering every backend endpoint, with parameters, request and response schemas, authentication, and error codes.
https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/diagrams/sequence-metric-creation.png — concrete flow for project administrators creating a metric definition: JWT issuance, ed25519 signing of the canonical payload with a validity range, signature verification on the backend, and persistence.
https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/diagrams/sequence-metric-account-update.png — concrete flow for project backends updating user metrics: JWT, ed25519 signing, signature verification, project–user membership lookup, document update, history insert, and the scheduled batcher step that canonicalizes updates, computes the Blake2b-256 hash, and submits the on-chain reputation UTxO update.
https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/diagrams/reputation-database-schema.png — production-detailed schema as described above.

### Scope clarification

Additional specifications, finalized SDK APIs, and finalized integration definitions are explicitly part of the Milestone 2 and Milestone 3 deliverables in the Catalyst proposal. Milestone 1 covers the architecture, requirements documentation, database schema design, contract design at the high level, and the proof-of-concept. All of these are present in the linked evidence.

### Additions made in response to your feedback

The following have been added to the repository:

- https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/diagrams/architecture-detailed.png — a new detailed architecture diagram complementing the high-level overview. It shows each trust boundary's internal structure: the end user and Cardano wallet; Iagon's user-facing Statur product (frontend + backend); an integrating project (frontend + backend, structured the same way); a sample read-only analytics consumer that reads reputation from the Statur Reputation Backend and cross-references on-chain addresses with internal and external datasets; the Statur Reputation Backend broken into REST API layer, auth and signature middleware, service layer (scoring, audit, tier enforcement), ORM, score cache, Postgres database, and batcher; and the Cardano public network with the three Aiken validators (reputation, badge, fee).
- https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/diagrams/README.md — a unified index for all diagrams, with a short description, source link, and rendered-image link for each.


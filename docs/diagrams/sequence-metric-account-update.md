# User Metric Update and Reputation Publication Flow

This sequence diagram describes how a project updates the reputation metrics of an already-linked user. Metric values are calculated automatically by the project backend based on project-specific triggers or criteria and are signed using the same cryptographic mechanism as metric definitions. The Statur reputation backend validates authentication, signature integrity, and project–user linkage before applying the update to the user’s reputation document and recording the signed update in the user’s reputation history. On a scheduled basis, the batcher service aggregates outstanding updates, computes the canonical reputation hash, and publishes the updated hash to the Cardano blockchain, ensuring verifiable and cost-efficient on-chain synchronization.

```mermaid
sequenceDiagram
  autonumber
  participant PB as Project Backend<br>(project-hosted)
  participant RB as Iagon Reputation Backend<br>(Iagon-hosted)
  participant DB as Postgres Database<br>(Statur source data)
  participant BATCH as Batcher / Update Service<br>(Iagon-hosted)
  participant CARDANO as Cardano Blockchain<br>(public network)

  Note over PB: Metric values are computed automatically<br>based on project-specific triggers and criteria

  PB->>PB: Compute new metric values<br>(all or subset of project metrics)
  PB->>RB: Request JWT access token<br>using API key
  RB-->>PB: Return JWT access token<br>(time-limited)

  PB->>PB: Build metric update payload<br>(user public_key_hash + metric entries)
  PB->>PB: Create validity range<br>(invalid_before, invalid_after)
  PB->>PB: Sign payload + validity range<br>with ed25519 private key
  PB->>PB: Assemble signed JSON object<br>1) payload<br>2) signature metadata<br>3) validity range

  PB->>RB: POST Update User Metrics<br>Authorization: Bearer JWT<br>Body: signed JSON

  RB->>RB: Validate JWT<br>(access + tier + rate limits)
  RB->>RB: Validate payload signature<br>using project public key on record
  RB->>RB: Validate validity range<br>(current time within range)

  alt User is NOT linked to project
    RB->>DB: Check project-user membership<br>(project_id + public_key_hash)
    DB-->>RB: Membership not found / inactive
    RB-->>PB: 404 Not found<br>user not linked to project
  else User is linked to project
    RB->>DB: Check project-user membership<br>(project_id + public_key_hash)
    DB-->>RB: Membership OK

    RB->>DB: Update user's reputation document<br>(apply metric changes)
    RB->>DB: Insert history entry<br>(payload + signature + timestamp)
    DB-->>RB: Update OK

    RB-->>PB: 200 OK<br>updated fields + server timestamp
  end

  Note over BATCH: Runs on a schedule to publish updates on-chain<br>using batched transactions

  BATCH->>RB: Fetch outstanding reputation updates<br>(since last run)
  RB->>DB: Query pending updates and current documents
  DB-->>RB: Return updated documents + history refs
  RB-->>BATCH: Return canonical documents<br>ready for hashing

  BATCH->>BATCH: Canonicalize and compute Blake2b-256 hash<br>(per user)
  BATCH->>CARDANO: Submit tx to update reputation UTxO<br>(new hash in datum)
  CARDANO-->>BATCH: Tx accepted and confirmed

```
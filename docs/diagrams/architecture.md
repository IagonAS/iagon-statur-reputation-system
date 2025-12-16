# Statur High-Level Architecture

This architecture diagram provides a system-level overview of Statur and its interaction with participating projects. It highlights the clear separation of responsibilities between project-hosted systems and Iagon-hosted Statur components. Project frontends and backends integrate with Statur using authenticated and signed API calls, while Iagon operates the reputation backend, database, and batcher service. The batcher periodically publishes cryptographic hashes of users’ reputation states to the public Cardano blockchain, ensuring on-chain verifiability without relying on Iagon as a trusted party.

```mermaid
flowchart LR
  %% =========================
  %% Statur Architecture (High Level)
  %% =========================

  %% --- Project-hosted components ---
  subgraph PROJECT["Projects"]
    direction TB
    P_NOTE["Hosted and operated by participating projects<br>Statur provides a sample frontend + backend as reference"]
    PF["Project Frontend / Website<br>End-user UI"]
    PB["Project Backend<br>Business logic + Statur integration"]
    PF -->|User actions and app API calls| PB
  end

  %% --- Iagon-hosted Statur components ---
  subgraph IAGON["Iagon"]
    direction TB
    I_NOTE["Hosted and operated by Iagon"]
    RB["Statur Reputation Backend<br>Python REST API"]
    DB["Postgres Database<br>Reputation data, metrics, badges, history"]
    BATCH["Batcher / Update Service<br>Builds and submits blockchain transactions"]

    RB <--> DB
    RB -->|Canonical state, hashes, update queue| BATCH
  end

  %% --- Public blockchain layer ---
  subgraph CHAIN["Cardano"]
    direction TB
    C_NOTE["Public decentralized network"]
    CARDANO["Cardano Ledger<br>Soulbound tokens, smart contract, and reputation hash anchors"]
  end

  %% --- Integration and authentication flows ---
  PB -->|JWT for API access<br>ed25519 signatures for write authorization| RB
  BATCH -->|Periodic transaction submission| CARDANO
  PF -->|Reputation reads via Project Backend| PB

  %% --- Styling ---
  classDef svc fill:#E8F1FF,stroke:#2B5FD9,stroke-width:1px,color:#0B1B3A;
  classDef note fill:#FFF7E6,stroke:#D28B00,stroke-width:1px,color:#3A2A00,stroke-dasharray: 4 2;
  classDef chain fill:#E9FBEA,stroke:#2A8A3A,stroke-width:1px,color:#0D2A12;
  classDef group fill:transparent,stroke:#777,stroke-width:2px,stroke-dasharray: 6 4,color:#111;

  class PF,PB,RB,DB,BATCH svc;
  class P_NOTE,I_NOTE,C_NOTE note;
  class CARDANO chain;
  class PROJECT,IAGON,CHAIN group;
```
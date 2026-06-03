# Response to Milestone Reviewer Feedback

Dear reviewers,

Below are the changes made to the Statur Architecture and Design Document in response to your feedback.

## a) Soulbound Token Transferability

The wording around the soulbound token's non-transferability has been clarified. The token is held by the reputation contract rather than by the user's wallet, and is bound to the wallet by that wallet's public key hash recorded in the UTxO datum. Statur and external integrators resolve a wallet's reputation by querying the contract for the UTxO whose datum carries that public key hash. Because the user does not hold the token in their wallet, they cannot send it to another wallet, and the validator constrains datum transitions so the bound public key hash cannot be rewritten. The token can only be burned during a user-initiated exit.

### Sections updated in https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/Statur%20Architecture%20and%20Design%20Document.pdf

- Section 1 (Executive Summary) — replaced "non-transferable (soulbound) identity token" with a brief explanation that the token is held by the contract and bound to the wallet by public key hash.
- Section 3.3 (Key Components at a Glance, "Soulbound Identity Token") — clarified the contract-side storage and public-key-hash binding alongside the existing non-transferability statement.
- Section 5.1 (Blockchain Layer, Responsibilities) — extended the "Enforce non-transferability" bullet to describe how non-transferability is actually enforced (contract-held token, public-key-hash binding, validator-constrained datum transitions).
- Section 6.2 (Soulbound Token Design) — rewrote the "Non-transferable" characteristic to reflect the storage and binding model and the validator constraints.
- Section 9 (Glossary, "Soulbound Token") — expanded the one-line definition to describe the storage and binding model and what makes the token non-transferable.

## b) On-Chain Data and Reputation Removal

The wording around what happens when a user leaves Statur has been corrected. On exit, the user's reputation UTxO is spent and the soulbound token is burned, which removes the user's reputation from the active on-chain state and stops Statur from producing any further on-chain reputation updates for that wallet. However, past transactions — including all previously published reputation hashes — remain on the ledger permanently as a property of the underlying blockchain and cannot be removed by Statur. The on-chain payload for each user is a Blake2b-256 hash of the canonical off-chain document, so historical hashes confirm that reputation existed at given points in time but do not reveal the underlying reputation content without the corresponding off-chain document.

### Sections updated in https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/Statur%20Architecture%20and%20Design%20Document.pdf

- Section 4.1 (User) — rewrote the bullet describing what happens when a user leaves so it distinguishes between the active on-chain state (removed) and the historical ledger record (permanent).
- Section 6.5 (Security Considerations) — added an "On-chain payload is hash-only" point clarifying that historical hashes persist on the ledger but do not expose reputation content without the off-chain document.
- Section 8.1, "4. Leaving Statur" — replaced "Reputation ceases to exist on-chain." with an accurate description of what is removed (active UTxO and token), what persists (historical transactions), and what the on-chain record actually contains (hashes, not preimages).

## c) Reputation State Machine — Soulbound Token / UTxO Linkage and CIP Reference

Section 6.3 has been expanded to describe how the soulbound token is linked to the contract UTxO from the moment of mint. The link is established at mint by requiring the freshly minted NFT to be paid to the reputation contract address; the NFT, held by the script, then acts as a state-thread token across the lifetime of the identity. The inline datum carries three fields: `keeper` (the bound wallet's verification key hash), `pointer` (the asset name of the soulbound NFT, derived at mint from the first input's `OutputReference` for guaranteed uniqueness), and `info_hash` (the Blake2b-256 hash of the canonical off-chain reputation document). Storing the asset name as `pointer` in the datum is a denormalization that lets the validator identify the bound token cheaply on every spend without scanning the input's value. On each spend, the validator enforces that the same NFT remains in the same script address, that `keeper` and `pointer` are preserved, and that only `info_hash` may change.

To our knowledge, no ratified Cardano CIP defines a soulbound-token pattern; the design used in Statur is proprietary. The closest standard is CIP-68 (Datum Metadata Standard), which uses a reference NFT held by a script paired with a user token held in the wallet. Statur deliberately omits the user-side token so that no asset associated with the reputation ever sits in the user's wallet, and the design is therefore not an implementation of CIP-68.

### Sections updated in https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/Statur%20Architecture%20and%20Design%20Document.pdf

- Section 6.3 (Reputation State Machine) — rewrote the section to describe the three datum fields, the mint-time linkage between the soulbound token and the contract UTxO, the validator's per-spend continuity rules, and the relationship of the design to CIP-68.

## d) Mathematical Model Transparency

Section 7.3 has been expanded to clarify the per-project scoring formula, including variables and constraints, the decay term and when it applies, and a worked example. Please refer to the updated Section 7.3 for the full specification.

### Sections updated in https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/Statur%20Architecture%20and%20Design%20Document.pdf

- Section 3.3 (Key Components at a Glance, "Metrics and Weights") — replaced the per-metric scoring summary with a one-line description pointing to Section 7.3 for the full formula.
- Section 7.3 (Scoring Model) — expanded with the per-project formula, the decay term, value and weight constraints, and a worked example.

## e) Custom Scoring Integration

The "Custom project scores" subsection in Section 7.3 has been rewritten to document how projects can expose a custom top-level score using the existing metric and weight model. Please refer to the updated Section 7.3 for the full description.

### Sections updated in https://github.com/IagonAS/iagon-statur-reputation-system/blob/main/docs/Statur%20Architecture%20and%20Design%20Document.pdf

- Section 7.3 (Scoring Model, "Custom project scores") — replaced the prior one-line note with a description of the two supported integration patterns: designating a single "score" metric (custom score computed off-Statur, submitted as a signed metric update with weight `1` while other tracked metrics use weight `0`), and tuning weights across multiple metrics for a blended score.

## f) Public Documentation Update (https://docs.iagon.com/products/statur)

The public Statur documentation page has been updated to reflect the same clarifications applied to the architecture and design document.

### Sections updated in the public Statur documentation

- "Non-Transferable (Soulbound) Tokens" — added that the user's wallet is bound to the token via the wallet's public key hash recorded in the UTxO datum, and that because the user never holds the token in their wallet there is no NFT for them to send to another user.
- "Reputation Scoring" — expanded to include the full per-project formula (with the decay multiplier), the explicit rules for when decay applies, the default and meaning of `score_decay`, a worked example, and a "Custom project scores" subsection covering the two supported integration patterns (designate a single "score" metric with weight `1`, or tune weights across multiple metrics for a blended score).

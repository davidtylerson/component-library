---
date: 2026-06-08
topic: affirmation-original-trade-reference
---

# Original Trade Reference for Lifecycle Affirmations

## Problem Frame

Some Float clients use the affirmation flow to affirm **lifecycle trades** — novations, partial terminations, full terminations — rather than brand-new trades. A real example: a Partial Novation for Brevan Howard (`BREVAN ID: 119884356.2 — IR CMS Curve One Look Option`), where the lifecycle-specific data is modeled as groups inside the affirmable trade (`Trade Terms`, `Event Terms`, `Termination Fees`).

The gap: the email shows the new (lifecycle) trade's terms but carries **nothing that points back to the original transaction**. For the recipient (the counterparty) to affirm, they need to locate the original trade in _their own_ books — which means they need **their own trade ID for that original trade**, not a restatement of the counterparty identity (which both sides already know). Without it, reconciliation is a manual lookup.

The system already recognizes lifecycle trades as a concept — `ValuationFileError` sample data references _"Trade 128378 is a novation without the original record"_ — and the lifecycle event type is already visible in the affirmable trade (`Trade Terms → Trade Type: Partial Novation`). What's missing is the original-trade reference block. This adds it.

This is an inherently technical brainstorm (data model + email-template rendering), so model and rendering decisions are in scope.

---

## Requirements

**Data model**

- R1. Each `Trade` gains an optional `originalTrade` reference, present only for lifecycle trades. A trade references at most one original trade (1:1).
- R2. The reference holds only a flexible `rows: TradeField[]` list (reusing the existing `{ field, value }` shape) so the displayed fields can grow without a model or template change. Extensibility is a hard requirement — adding a field must be data-only. No `tradeId`/`productType` on the reference: the block header is a static label, and the meaningful identifier (CP Trade ID) lives in `rows`.
- R3. The initial `rows` field set is exactly two: **Trade Date** and **CP Trade ID** (the counterparty's own identifier for the original trade — the reconciliation key). Counterparty / broker _identity_ is deliberately excluded because both sides already know it.

**Rendering**

- R4. For a trade with an `originalTrade`, render a second block **directly below** that trade's existing detail table, within the Trade Details section.
- R5. The reference block reuses the existing header-block style with the static label **"Original Trade"** (no trade ID or product type in the header) but **without the blue bottom border** (`4px solid #4a49a6`). Absence of the underline is the visual signal that this block is read-only context, not the thing being affirmed.
- R6. The reference block is a **2-column read-only** Field / Value table. It omits the "Counterparty Economics (if disputed)" column — the original trade is context, not an affirmable/disputable record.
- R7. Trades without an `originalTrade` render exactly as today (no empty block, no layout shift).
- R8. The new field/rendering must exist in both the preview-mode (React) and Handlebars (`{{#if originalTrade}}` / `{{#each}}`) branches of the template, matching the existing dual-render pattern.

---

**Dual trade identifiers** (follow-on, same template)

- R9. Each `Trade` supports two identifier fields: `tradeId` (existing, required) and `contractId` (new, optional). Both are named fields on the trade — the single source of truth read by every renderer, so the table and card header cannot drift. They are labeled **"Trade ID"** and **"Contract ID"** in the UI (the first ID column is no longer labeled with the client short name).
- R10. Both the Summary table and the detail card header render whichever IDs are present: both when both exist, just the one when only `tradeId` is set. Existing single-ID emails are unaffected (no `contractId` → no Contract ID column or header line). The summary table shows the optional "Contract ID" column when any trade has a `contractId`; each card header shows "Contract ID" only for trades that carry one. Implemented in both render branches; the Handlebars branch gates the column on `{{#if trades.0.contractId}}` and the card line on `{{#if contractId}}`.

---

## Success Criteria

- A recipient affirming a novation can see, in the same email, which original trade is being modified — without an external lookup — via a clearly secondary reference block beneath the affirmable trade.
- A non-lifecycle trade's email is visually unchanged.
- Adding a future reference field (e.g. original notional) is a data change only, requiring no template edit.
- `ce-plan` can implement directly: the data shape, placement, column treatment, and dual-render requirement are all pinned.

---

## Scope Boundaries

- Only the original-trade **reference** is shown — limited fields, not the original trade's full term set.
- The reference block is not affirmable or disputable; no dispute column, no status, no "Your ID" entry for it.
- Cardinality is fixed at one original trade per lifecycle trade. Many-to-one events (compression, netting) are out of scope.
- The flat Summary table at the top of the email is unchanged — no lifecycle indicator added there in this pass.
- No change to lifecycle event detection or upstream data sourcing; this assumes the renderer is handed an `originalTrade` when one applies.

---

## Key Decisions

- **The reference exists to carry the CP Trade ID, not counterparty identity**: the recipient already knows who the counterparty is; what they lack is their own reference for the original trade. This is the reconciliation key and the reason the feature exists.
- **Reuse `TradeField[]` for the reference rows rather than named fields**: only two fields now (Trade Date, CP Trade ID) but the set must extend cheaply; a flexible row list absorbs additions without model or template churn.
- **No lifecycle event-type tag needed on the header**: the event type is already visible in the affirmable trade's `Trade Terms → Trade Type` (e.g. "Partial Novation"). A header tag would be redundant.
- **Below the affirmed trade, not above**: keeps the affirmable trade as the primary focus; the reference reads as a footnote-style annotation.
- **Distinguish by removing the blue underline rather than adding new chrome**: cheapest possible visual signal that reuses an existing, recognized header block.
- **2-column read-only**: reinforces "not affirmable" and avoids implying the original trade can be disputed.

---

## Dependencies / Assumptions

- **Confirmed via the real example: original-trade data is NOT in the current affirmation payload.** The novation email carries only the lifecycle trade's own terms. Sourcing the original trade's CP Trade ID and Trade Date is an upstream/data-pipeline concern outside this prototype repo — but it is a hard prerequisite for the feature to deliver real value in production. The `119884356.2` ID suffix suggests the original (`119884356`) is derivable, but this must be confirmed with whoever owns the data feed.
- For this prototype-library repo, the renderer only needs the `originalTrade` shape plus sample data; production sourcing is tracked separately.

---

## Outstanding Questions

**Resolved:** Scoped to the `AffirmationMultipleSummary` template only. The sibling `AffirmationMultiple` (AGREED/DISPUTED reply variant) is out of scope for this change.

### Deferred to Planning

- [Affects R2][Needs research — upstream] Where do the original trade's CP Trade ID and Trade Date come from in the data feed, and is the original client-side ID reliably derivable from the lifecycle trade's ID suffix? Owned by the data-pipeline team, not this repo.

---

## Next Steps

-> /ce-plan for implementation planning. The field set and rendering are locked; the only open items are an internal scope question (also apply to `AffirmationMultiple`?) and an upstream data-sourcing question that doesn't block the prototype.

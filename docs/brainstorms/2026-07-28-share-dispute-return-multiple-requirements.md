---
date: 2026-07-28
topic: share-dispute-return-multiple
---

# Share / Dispute / Return — Multiple Documents

## Problem Frame

Float now lets a user share, dispute, and return more than one document in a single action, but the email templates were built for one document at a time. Four templates cover the old world (`DisputeConfirm`, `DisputeMultiple`, `ReturnConfirmSimple`, `ReturnConfirmTable`) and there is no share/send template at all.

An engineer hand-wrote three raw SendGrid HTML files (Shared / Signed / Disputed) to fill the gap. They work, but they sit outside the React component system: hardcoded hex values that aren't in the palette, a 760px fixed width with a seven-column horizontal grid, and an `@media`/`.hide-sm` stylesheet that `EmailLayout` has no equivalent for. They also can't be previewed or exported through Float Mail.

This replaces them with templates in the existing system: previewable in Float Mail, exported as SendGrid-ready inline HTML, and correct for both one document and many.

---

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  [Float Logo]                                            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ▸ DISPUTED ◂  (status pill)                             │
│                                                          │
│  Acme Corp disputed the following trade confirmations    │
│                                                          │
│  Message                                                 │
│  ┌────────────────────────────────────────────────────┐  │
│  │ The notional on both trades is off by 500,000.     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌── Trade Ref: 33102816          FX_FORWARD ────────┐   │
│  ├──────────────────────┬─────────────────────────────┤  │
│  │ Trade Date           │ 15 SEP 2024                 │  │
│  │ Confirmation Date    │ 21 SEP 2024                 │  │
│  │ Counterparty Ref     │ 5678ABC                     │  │
│  │ Counterparty Con Ref │ CONTRACT-1                  │  │
│  │ Document             │ confirmation_abc.pdf        │  │
│  └──────────────────────┴─────────────────────────────┘  │
│                                                          │
│  ┌── Trade Ref: 44556677          FX_OPTION ─────────┐   │
│  │ ...                                                │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [Float Footer]                                          │
└──────────────────────────────────────────────────────────┘
```

One card per document. One document means one card — no separate single-document layout.

---

## Requirements

**Document card grid**

- R1. Each document renders as its own card, reusing the per-trade detail-card pattern from `AffirmationMultipleSummary`: a header row carrying the trade identifier and product type with the 4px `#4A49A6` underline, followed by vertical Field/Value rows.
- R2. Cards are two columns (Field, Value). The affirmation card's third "Counterparty Economics" column is dropped — these emails report a completed action and have nothing for the recipient to fill in.
- R3. Card header shows `<Org> Contract ID: {party2ContractId}` plus `productType` in muted text alongside it.
- R4. Card rows, in order: `<Org>` Trade ID (`party2TradeId`), Trade Date, Trade Type, Confirmation Date, Dealer Reference (`party1TradeId`), Document Link — matching the production return email. `party2ContractId` is promoted into the card header.
- R5. The Document row links to `app.float.tech/documents/{documentId}` using `documentFileName` as the anchor text, falling back to "View document" when the filename is absent.
- R6. Any absent field value renders as an em dash rather than an empty cell.
- R7. Cards render at the standard 600px `EmailLayout` width. No fixed 760px container, no `@media` rules, no `.hide-sm` column hiding — the vertical layout removes the need for all three.

**Per-variant content**

- R8. Three templates: Share, Dispute, Return. Each carries its own headline copy, message heading, and actor.
- R9. No status pill. The pluralized headline distinguishes the three emails, and production carries no pill.
- R10. Share headline names the person (`person_name`); Dispute and Return headlines name the organization (`organization_name`). A human shares documents; an institution disputes or returns a confirmation.
- R11. Share and Dispute render an optional `message` block above the cards, as rich HTML (the payload sends `<p>test message</p>`, not plain text). One message covers the whole batch — there is no per-document comment.
- R12. Return keeps the existing "fully executed trade confirmation attached to this email" line from `ReturnConfirmSimple`, pluralized with the document count.

**One and many**

- R13. Headlines pluralize end to end, not just the trailing noun: "has raised a dispute with your trade confirmation" becomes "has raised disputes with your trade confirmations".
- R14. Pluralization tests for a second array element — `{{#if dynamic_table_data.[1]}}` — using only `{{#if}}`/`{{else}}` and array index access. No count field and no subexpression over `.length`.
- R15. When `dynamic_table_data` is empty, the template renders an explicit empty state rather than a bare heading with nothing under it.

**Preview and export parity**

- R16. Each template is dual-mode in the house style: React branch for the Float Mail preview, raw Handlebars branch for SendGrid export, selected by the existing `isPreviewMode` check.
- R17. Both branches produce the same visual result for the same data. Divergence between the two branches is the defect this pattern is most prone to and the thing to check hardest.
- R18. Each template is registered in `SAMPLE_DATA`, `TEMPLATE_INFO`, `template-renderer.ts`, and `enhanced-template-renderer.ts`, with sample data matching the new payload shape so the preview exercises both a one-document and a multi-document case.

---

## Acceptance Examples

- AE1. **Covers R1, R13, R15.** Given `dynamic_table_data` with one row, when the Dispute template renders, the headline reads "…disputed the following trade confirmation" (singular) and exactly one card appears.
- AE2. **Covers R13, R14.** Given `document_count` of 2, when any of the three templates renders in export mode, the SendGrid output pluralizes the headline without relying on `.length` resolution.
- AE3. **Covers R5, R6.** Given a row with `documentId` present but `documentFileName` absent, when the card renders, the Document row links to the document with anchor text "View document"; a row missing `party2ContractId` shows an em dash.
- AE4. **Covers R16, R17.** Given identical data, when a template is rendered in preview mode and in export mode with that data substituted, the two outputs are visually equivalent.

---

## Success Criteria

- A recipient disputing five documents gets one email that reads as naturally as the current single-document dispute — same field labels, same vertical shape, just repeated per document.
- The three raw HTML files can be deleted with nothing lost.
- Nothing in the three templates introduces a color, width, or CSS mechanism that isn't already in the component system.
- A planner reading this does not have to invent field labels, pluralization strategy, actor naming, or which existing templates get touched.

---

## Scope Boundaries

- The three single-document templates (`DisputeConfirm`, `ReturnConfirmSimple`, `ReturnConfirmTable`) stay in place untouched. The new templates handle 1..N, which makes the singles redundant, but retiring them is a separate change — anything still pointing at them in production keeps working.
- No per-document dispute comments. `DisputeMultiple` can express them today and the rewrite gives that up deliberately; the new payload carries one shared `message`.
- No summary table. The affirmation summary grid exists so a dealer can fill in an ID and a status per trade; these emails require no response.
- No affirmation-style action steps or reply instructions. These are notifications, not requests.
- Not changing `AffirmationMultiple` or `AffirmationMultipleSummary`, even though the card pattern is borrowed from them.

---

## Key Decisions

- **Vertical Field/Value cards, not a horizontal row-per-document grid**: the sloped HTML's seven columns at 760px is what forced the fixed width and the `.hide-sm` media query. Going vertical removes both problems and matches what `DisputeConfirm` already shows recipients today.
- **Field labels follow existing house copy**: `DisputeConfirm` already labels the Float-side identifier "Trade ID" and the other side "Counterparty Ref". Reusing those beats the sloped HTML's "P1 trade ref" / "P2 trade ref", which is internal data-model vocabulary leaking into customer-facing copy.
- **Keep the status pill, repaint it**: the pill is the fastest way to distinguish three structurally identical emails once opened. Worth keeping, not worth six new hex values.
- **Three templates over one variant-driven template**: three sidebar entries and three SendGrid exports are what the product needs. But the dual-mode pattern means each template carries its markup twice (React + Handlebars), so three independent files means six copies of near-identical markup and six places to drift. Recommend three thin templates delegating to one shared card component parameterized by variant.
- **Explicit `document_count` over `document_ids.length`**: see Dependencies below.

---

## Dependencies / Assumptions

- **No new payload fields are required.** An earlier draft called for a `document_count`; testing for `dynamic_table_data.[1]` removes that dependency. `organization_name` must be present on the Share payload to label the client-side IDs (it falls back to "Client").
- **Unverified: SendGrid does not support subexpression helpers.** `{{#if (gt trades.length 1)}}` appears in `AffirmationMultiple` and `AffirmationMultipleSummary` today. SendGrid documents its comparison helpers in block form (`{{#greaterThan a b}}…{{/greaterThan}}`), and the subexpression form is not in that documented set — but this has not been confirmed against a real SendGrid send. If it turns out to be broken, the two affirmation templates have the same latent bug and always render plural.
- **Confirmed against production:** `party2ContractId`/`party2TradeId` are the client-side pair ("BAL Contract ID"/"ROKOS Trade ID") and `party1TradeId` is the "Dealer Reference".
- **Production prefixes these labels with an uppercase short code** (`BAL`, `ROKOS`), not the full organization name. No short-code field exists in the payload, so `organization_name` is used instead and renders e.g. "Rokos Capital Management Trade ID". Matching production exactly would need a new short-code field.
- **Assumes documents are linked, not attached, for Share and Dispute.** Only Return states that a PDF is attached, matching today's `ReturnConfirmSimple` copy.

---

## Outstanding Questions

### Resolved During Implementation

- Field labels, section headings, and headline copy were taken from the production dispute and return emails after they were shared. The older templates in this package had drifted from what ships and were the wrong source to copy.

### Deferred to Planning

- [Affects R4][User decision] Does `tradeType` ("EXECUTION") earn a row, or is it only meaningful for lifecycle events? The sloped HTML carries it in the payload but never displays it.
- [Affects R14][Needs research] Confirm SendGrid's helper support with a real test send before committing to `{{#greaterThan}}`, and check whether the existing affirmation templates are affected.
- [Affects R17] Whether the shared card component can emit both the React and Handlebars branches from one source of truth, or whether the duplication is unavoidable given the dual-mode pattern.

---

## Next Steps

→ `/ce-plan` for structured implementation planning

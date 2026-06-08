---
date: 2026-03-23
topic: affirmation-multiple-summary
---

# Affirmation Multiple + Summary Template

## What We're Building

A new email template `AffirmationMultipleSummary` that extends the existing `AffirmationMultiple` template by adding a summary table at the top. This table gives dealers a structured way to:

- See all trades at a glance (Client ID, Product, Trade Date)
- Enter their own Dealer ID for each trade
- Mark each trade as AFFIRMED or DISPUTED

The detailed per-trade tables (with the Counterparty Economics column for disputes) remain below the summary.

## Layout (ASCII Wireframe)

```
┌─────────────────────────────────────────────────────────────┐
│  [Float Logo]                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Trade Affirmations Required                                │
│                                                             │
│  {org_name} is requesting your affirmation of the           │
│  following trades. Please review the detailed trade         │
│  information provided below.                                │
│                                                             │
│  Action Required:                                           │
│                                                             │
│  1. Review each trade in the summary table below.           │
│  2. Enter your Dealer ID for each trade.                    │
│  3. Set Affirmation Status to AFFIRMED or DISPUTED.         │
│  4. If disputed, use the detailed trade tables below        │
│     to note any discrepancies in the Counterparty           │
│     Economics column.                                       │
│                                                             │
│  Summary                                                    │
│  ┌───────────┬────────────┬────────────┬───────────┬──────┐ │
│  │ Client ID │ Product    │ Trade Date │ Dealer ID │Status│ │
│  ├───────────┼────────────┼────────────┼───────────┼──────┤ │
│  │ EQ-88471  │ EQ Option  │ 19-Nov-24  │           │      │ │
│  ├───────────┼────────────┼────────────┼───────────┼──────┤ │
│  │ IR-33912  │ IR CMS ... │ 19-Nov-24  │           │      │ │
│  └───────────┴────────────┴────────────┴───────────┴──────┘ │
│                                                             │
│  ┌── Client ID: EQ-88471  EQ Option ─────────────────────┐  │
│  │ Field              │ Value        │ Cpty Economics     │  │
│  ├────────────────────┼──────────────┼────────────────────┤  │
│  │ Trade Terms        (group header)                      │  │
│  │ Trade ID           │ EQ-88471     │                    │  │
│  │ ...                │ ...          │                    │  │
│  └────────────────────┴──────────────┴────────────────────┘  │
│                                                             │
│  ┌── Client ID: IR-33912  IR CMS One Look ───────────────┐  │
│  │ ...                                                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  [Float Footer]                                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Decisions

- **No data model changes**: `tradeId` stays as-is in JSON, displayed as "Client ID". `productType` stays as-is, displayed as "Product".
- **Trade Date extraction**: Pulled from each trade's "Trade Terms" group rows at render time (no new top-level field needed).
- **Dealer ID & Affirmation Status**: Blank columns in the summary table for dealers to fill in.
- **Detail table header label**: Changed from "Trade ID:" to "Client ID:" to match the summary table.
- **Summary section header**: Labeled simply "Summary".
- **Updated instructions**: Numbered steps (1-4) guiding dealers through the review workflow — fill in Dealer ID, set status, use detailed tables for disputes.

## Open Questions

- None — ready for planning.

## Next Steps

→ `/plan` for implementation details

---
title: 'feat: Add AffirmationMultipleSummary email template'
type: feat
date: 2026-03-23
---

# Add AffirmationMultipleSummary Email Template

## Overview

Create a new `AffirmationMultipleSummary` template that extends the existing `AffirmationMultiple` template with a summary table at the top. This gives dealers a structured way to mark trades as affirmed/disputed and enter their trade IDs. See `docs/brainstorms/2026-03-23-affirmation-multiple-summary-brainstorm.md` for the full wireframe and design decisions.

## Key Design Decisions (from brainstorm)

- **No data model changes**: `tradeId` displayed as "Client ID", `productType` displayed as "Product"
- **Trade Date**: Extracted from each trade's "Trade Terms" group rows at render time
- **Dealer ID & Affirmation Status**: Blank columns for dealers to fill in
- **Detail table headers**: "Client ID: EQ-88471 EQ Option" (not "Trade ID:")
- **Summary header**: Labeled "Summary"
- **Updated instructions**: 4-step numbered workflow

## Acceptance Criteria

- [x] New file `AffirmationMultipleSummary.tsx` created with summary table and updated layout
- [x] Summary table columns: Client ID, Product, Trade Date, Dealer ID (blank), Affirmation Status (blank)
- [x] Trade Date extracted from "Trade Terms" group → "Trade Date" row for each trade
- [x] Instructions updated to 4-step numbered workflow
- [x] Detail table headers read "Client ID: {tradeId} {productType}"
- [x] Template registered in `enhanced-template-renderer.ts` (component map + source code string)
- [x] Template registered in `template-renderer.ts` (import + component map + subject)
- [x] Sample data added to `sample-data.ts` (`SAMPLE_DATA` + `TEMPLATE_INFO`)
- [x] Template renders correctly in preview with mock data

## Files to Change

| File                                                               | Change                                                                                                 |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `packages/float-mail/src/templates/AffirmationMultipleSummary.tsx` | **NEW** — duplicate AffirmationMultiple, add summary table, update instructions, change detail headers |
| `packages/float-mail/src/utils/sample-data.ts`                     | Add `AffirmationMultipleSummary` to `SAMPLE_DATA` and `TEMPLATE_INFO`                                  |
| `packages/float-mail/src/lib/enhanced-template-renderer.ts`        | Import + register component, add source code string                                                    |
| `packages/float-mail/src/lib/template-renderer.ts`                 | Import + register component, add subject                                                               |

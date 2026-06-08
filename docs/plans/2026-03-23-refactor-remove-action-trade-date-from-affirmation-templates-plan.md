---
title: Remove action and trade_date from Affirmation Templates
type: refactor
date: 2026-03-23
---

# Remove `action` and `trade_date` from Affirmation Templates

## Overview

Remove the top-level `action` and `trade_date` fields from both `Affirmation` and `AffirmationMultiple` email templates, and update the intro body copy to no longer reference the trade date.

## Updated Copy

**Before:**

> **{orgName}** is requesting your affirmation of the following trade executed on **{trade_date}**. Please review the detailed trade information provided below.

**After:**

> **{orgName}** is requesting your affirmation of the following trade. Please review the detailed trade information provided below.

For `AffirmationMultiple`, the pluralized variant follows the same pattern (remove the "executed on **{trade_date}**" clause).

## Acceptance Criteria

- [x] `action` and `trade_date` props removed from `Affirmation.tsx` interface and destructuring
- [x] `trade_date` prop removed from `AffirmationMultiple.tsx` interface and destructuring
- [x] Body text updated in both templates (React preview + Handlebars HTML path)
- [x] Legacy fallback table in `Affirmation.tsx` no longer includes "Action" or "Trade Date" rows
- [x] `sample-data.ts` `SAMPLE_DATA` entries for `Affirmation` and `AffirmationMultiple` no longer include `action` / `trade_date`
- [x] `sample-data.ts` `TEMPLATE_INFO` entries for `Affirmation` and `AffirmationMultiple` no longer list `action` / `trade_date` as variables
- [x] Source code strings in `enhanced-template-renderer.ts` updated to match
- [x] `SENDGRID_AFFIRMATION_MULTIPLE_JSON.md` doc updated to remove `action` / `trade_date`
- [x] App builds and renders correctly with updated mock data

## Files to Change

| File                                                        | Change                                                                                   |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `packages/float-mail/src/templates/Affirmation.tsx`         | Remove `action` + `trade_date` props, update body text, remove legacy fallback rows      |
| `packages/float-mail/src/templates/AffirmationMultiple.tsx` | Remove `trade_date` prop, update body text (React + Handlebars paths)                    |
| `packages/float-mail/src/utils/sample-data.ts`              | Remove `action` + `trade_date` from `SAMPLE_DATA` and `TEMPLATE_INFO` for both templates |
| `packages/float-mail/src/lib/enhanced-template-renderer.ts` | Update inline source code strings for `Affirmation` and `AffirmationMultiple`            |
| `packages/float-mail/SENDGRID_AFFIRMATION_MULTIPLE_JSON.md` | Remove `action` + `trade_date` from JSON example and docs                                |

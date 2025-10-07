# Design Updates Summary

**Date:** October 2025  
**Status:** Ready for Implementation

This document summarizes all design changes made based on user feedback and open questions resolution.

---

## Dashboard 1: Risk Command Center

### Major Changes

**1. Added Notional Column to All Tables**
- Format: Two-row cell with amount (millions, 2 decimals) and currency
- Example: `189.01` over `NZD`
- **Important:** Can show notional per trade, but CANNOT aggregate/sum across currencies
- Screenshot reference provided showing desired format

**2. Added Affirmation & Confirmation Status Columns**
- **Affirmation Status:** Affirmed, Pending Affirm, Not Started
- **Confirmation Status:** In Dispute, Waiting on CP, Escalated, Needs Review, Pending Doc
- Both columns added to Priority Actions: Trades with Breaks table

**3. Updated Risk Distribution Charts**
- **Removed:** Dollar notional amounts (can't aggregate across currencies)
- **Kept:** Break count distribution by severity (High/Med/Low)
- Removed "Click segment to filter" text (users will discover)

**4. Data Refresh Strategy**
- Changed from "real-time/5-min refresh" to "update/refresh latest data on page load"
- Simpler approach, sufficient for daily standup use case

### Resolved Open Questions

1. **Action column:** Buttons OK (may remove in initial buildout)
2. **Sort order:** Critical first (not oldest first)
3. **Resolved items:** Hide entirely (not risk if resolved)
4. **Risk Score:** Keep "Trades at Risk" text (not abstract number)

### Data Structure Updates

```typescript
// Added to all Priority Actions tables
notional: {
  amount: number; // in millions with 2 decimals
  currency: string; // "NZD", "USD", "NOK", etc.
}
affirmationStatus: 'affirmed' | 'pending_affirm' | 'not_started';
confirmationStatus: 'in_dispute' | 'waiting_on_cp' | 'escalated' | 'needs_review' | 'pending_doc';
```

---

## Dashboard 2: Performance Analytics

### Minor Changes

**1. Table Row Defaults**
- Show top 5 counterparties/products by default
- "Show More" button to expand to full list

**2. Export Functionality**
- PDF export (primary)
- CSV export (secondary - TBD later)

**3. Break Analysis Section**
- Will have placeholder initially
- Assume data is available for prototype (not "coming soon")

### Resolved Open Questions

1. **Combined SLA chart:** NO - keep affirmation and confirmation separate
2. **Default rows:** Show 5 with expand option
3. **Break Analysis placeholder:** Show with data (for prototype)
4. **Export:** PDF for now, CSV TBD

### No Changes To

- Overall layout structure
- Metric calculations
- Chart types
- Existing Trade Insights integration

---

## Dashboard 3: Templates & Automation (MAJOR REDESIGN)

### Structural Changes

**1. New Section Order:**
```
OLD:                          NEW:
├─ Template Coverage          ├─ Strategic Impact (NEW - moved from bottom)
├─ Automation Performance     ├─ Template Coverage
└─ Combined Impact            └─ Automation Performance
```

**2. Strategic Impact Section (Top)**
**Purpose:** Show outcomes immediately, not just inputs

**Three metric cards:**
- Break Rate Reduction (e.g., -4.2pp since Apr)
- Avg Confirm Time Reduction (e.g., -1.3 days since Apr)
- Combined Progress (67% coverage + 45% auto-match)

**Key insight text:**
- One sentence connecting initiatives to outcomes
- Example: "As template coverage increased 27pp and automation increased 18pp, break rates decreased 4.2pp..."

**3. Removed Content:**
- ❌ "Combined Impact" section at bottom (duplicative)
- ❌ "Time Saved" metrics (hard to calculate, not tracking)
- ❌ "Bottom Line" text card (feels marketing-y, data speaks for itself)
- ❌ Efficiency hour savings estimates (not reliable)

**Rationale:**
- Original Combined Impact section repeated the numbers from Template/Automation sections
- Strategic Impact at top shows **causation** (coverage → reduced breaks), not just metric duplication
- Focus on measurable business outcomes, not estimated time savings

### Resolved Open Questions

1. **Target line on charts:** NO
2. **Time saved calculation:** Don't calculate (removed entirely)
3. **Confidence intervals:** No (don't have data)
4. **Template drill-down:** Yes - click product type → template page (TBD where)
5. **Template creation queue:** No - click product type to see missing templates by dealer

### User Flow Impact

**Before:**
1. See template coverage (67%)
2. See automation performance (45%)
3. Scroll to bottom for "is this working?" answer

**After:**
1. **Immediately see:** "Break rates down 4.2pp, confirm time down 1.3 days"
2. Decision made in 10 seconds: initiatives are working
3. Scroll for details only if needed

---

## Dashboard 4: Counterparty Scorecard

### Major Removals

**1. Removed Talking Points Section**
- ✓ POSITIVES
- ⚠ CONCERNS  
- 💡 RECOMMENDATIONS
- **Why removed:** Natasha will form her own talking points from the data

**2. Removed Export/Action Buttons**
- Export Full Scorecard (PDF)
- Export Data (CSV)
- Schedule Meeting
- **Why removed:** Premature - will figure out export strategy later

**3. Updated User Flows**
- Changed: "Reads talking points" → "Prepares discussion strategy based on data"
- Changed: "Clicks Export PDF" → "Takes notes and screenshots"

### Resolved Open Questions

1. **Talking points:** Remove (don't generate)
2. **New CPs with insufficient data:** Just calculate, let them handle edge cases
3. **Improvement score:** No (don't create single composite metric)
4. **PDF export format:** Ignore for now (will figure out later)
5. **CP portal access:** Probably yes, but need to design cross-CP view first (pin this)

### Data Structure Updates

```typescript
// Removed from detailed view data structure:
talkingPoints: {
  positives: string[];
  concerns: string[];
  recommendations: string[];
}
```

---

## Cross-Dashboard Changes

### Consistent Design Decisions

**1. Table Row Defaults**
- All dashboards: Show top 5 rows by default
- "Show More" / "Expand" button for full list
- Keeps initial view clean and scannable

**2. Notional Display**
- Where applicable: Show notional amount + currency
- Format: Millions with 2 decimals (e.g., "189.01 NZD")
- **Critical constraint:** Cannot aggregate across currencies

**3. User Discovery Over Instructions**
- Removed "Click to filter" text on charts
- Removed explicit interaction instructions
- Let users discover clickable elements naturally

**4. Data-Driven Over Narrative**
- Removed auto-generated text summaries
- Removed "talking points" sections
- Let data speak for itself
- Users form their own conclusions

---

## Implementation Priorities (Updated)

### Phase 1: Risk Command Center (Sprint 1-2)
**Changes from original plan:**
- Add notional column implementation
- Add affirmation + confirmation status columns
- Implement two-row cell format for notional
- Remove risk distribution dollar amounts

**Complexity increase:** Medium (new cell format)

### Phase 2: Performance Analytics (Sprint 3-4)
**No changes from original plan:**
- Add affirmation metrics
- Enhance existing confirmation metrics
- Same approach as before

**Complexity:** Low (mostly additive)

### Phase 3: Templates & Automation (Sprint 5-6)
**Significant changes:**
- NEW: Strategic Impact section at top
- REMOVE: Combined Impact section at bottom
- NEW: Outcome-focused metrics (break rate reduction, time reduction)
- NEW: Causation insight text generation

**Complexity increase:** Medium (new calculations, new section)

**Data Requirements:**
- Need historical break rate (6 months ago)
- Need historical confirm time (6 months ago)
- Calculate deltas for impact metrics

### Phase 4: Counterparty Scorecard (Sprint 7-8)
**Simplified from original:**
- REMOVE: Talking points generation (no AI needed)
- REMOVE: Export functionality (defer to later)
- Focus on data display only

**Complexity decrease:** Low (less scope)

---

## Technical Considerations

### New Cell Format Required

**Notional Cell Component:**
```tsx
<div className="notional-cell">
  <div className="amount">189.01</div>
  <div className="currency">NZD</div>
</div>
```

**Styling:**
- Amount: Larger font, bold
- Currency: Smaller font, secondary color
- Aligned: Center or right-aligned in table
- Responsive: Stack if needed on mobile

### Status Column Values

**Affirmation Status Enum:**
- `affirmed`
- `pending_affirm`
- `not_started`

**Confirmation Status Enum:**
- `in_dispute`
- `waiting_on_cp`
- `escalated`
- `needs_review`
- `pending_doc`

### Historical Data for Impact Metrics

**Required for Templates & Automation:**
```typescript
{
  historical: {
    breakRate: {
      current: number;
      sixMonthsAgo: number;
    };
    avgConfirmTime: {
      current: number; // days
      sixMonthsAgo: number; // days
    };
  };
}
```

**Calculation:**
- Compare point-in-time values (not rolling averages)
- 6 months ago = same month last period
- Show as delta: current - historical

---

## Design Files Updated

**Updated:**
- ✅ `/dashboard_layouts/01_risk_command_center.md` - Added notional, status columns, removed dollar amounts
- ✅ `/dashboard_layouts/02_performance_analytics.md` - Resolved open questions
- ✅ `/dashboard_layouts/03_templates_automation_REVISED.md` - Complete redesign
- ✅ `/dashboard_layouts/04_counterparty_scorecard.md` - Removed talking points & exports

**No Changes Needed:**
- `dashboard_design_spec.md` - High-level spec still valid
- `prd_risk_metrics.md` - Strategic requirements unchanged
- `README_DASHBOARD_DESIGN.md` - Navigation guide still accurate

---

## Next Steps

1. **Review REVISED Templates & Automation layout**
   - Confirm Strategic Impact section approach
   - Validate metric selection (break rate, confirm time)
   - Approve removal of time-saved metrics

2. **Validate Notional Cell Format**
   - Review screenshot reference
   - Confirm two-row cell design works in tables
   - Test responsive behavior

3. **Confirm Data Availability**
   - Historical break rates (6 months ago)
   - Historical confirmation times (6 months ago)
   - Affirmation/confirmation status fields

4. **Begin Phase 1 Implementation**
   - Risk Command Center
   - Priority: Notional column format
   - Priority: Status columns integration

---

## Questions for Final Review

1. **Templates & Automation:** Does the Strategic Impact section approach work? Show outcomes (break rates down) rather than duplicate inputs (coverage up)?

2. **Notional Format:** Is two-row cell (amount over currency) the right approach, or prefer side-by-side?

3. **Historical Data:** Is 6-month lookback the right timeframe for "impact" metrics, or prefer 3-month/12-month?

4. **Export Strategy:** For Counterparty Scorecard, when we do build export, prefer PDF report or just CSV data?

---

## Changelog

| Date | Change | Reason |
|------|--------|--------|
| Oct 2025 | Added notional columns | User feedback - show dollars at risk per trade |
| Oct 2025 | Added affirmation/confirmation status | User feedback - need process visibility |
| Oct 2025 | Redesigned Templates & Automation | User feedback - Combined Impact was duplicative |
| Oct 2025 | Removed talking points from Scorecard | User feedback - don't need auto-generated narrative |
| Oct 2025 | Resolved all open questions | User provided answers inline in docs |


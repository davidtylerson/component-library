# Performance Analytics - Layout Diagram

**Dashboard Purpose:** Trend analysis - "How are our processes performing over time?"  
**Time Horizon:** 30/90/180 days (user selectable)  
**Primary User:** Natasha (weekly/monthly reviews)

---

## Full Page Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PERFORMANCE ANALYTICS                                                      │
│                                                                             │
│  [Last 90 Days ▼]  [All Counterparties ▼]  [All Products ▼]               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐   │
│  │ Total Trades       │  │ 24hr SLA Rate      │  │ Dispute Rate       │   │
│  │                    │  │                    │  │                    │   │
│  │      148           │  │       93%          │  │       31%          │   │
│  │                    │  │                    │  │                    │   │
│  │  ↑ 12% vs prior    │  │  ↑ 2pp vs prior    │  │  ↓ 3pp vs prior    │   │
│  └────────────────────┘  └────────────────────┘  └────────────────────┘   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ AFFIRMATION METRICS                                                   │ │
│  │                                                                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │ │
│  │  │ Avg Time     │  │ <24hr SLA    │  │ Automation   │              │ │
│  │  │ 1.8 days     │  │ 87%          │  │ 23% Elect    │              │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │ │
│  │                                                                       │ │
│  │  Affirmation Time Trend (Last 90 Days)                               │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │                                                                  │ │ │
│  │  │     ╭─╮                                                          │ │ │
│  │  │    ╱  ╰╮     ╭╮                                                  │ │ │
│  │  │   ╱    ╰─╮  ╱ ╰╮   ╭╮                                            │ │ │
│  │  │  ╱       ╰─╯   ╰──╯ ╰──                                          │ │ │
│  │  │─────────────────────────────────────────────────────────────    │ │ │
│  │  │  Jul 1      Jul 31      Aug 31      Sep 30                      │ │ │
│  │  │                                                                  │ │ │
│  │  │  [SLA Line: 24h] ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                   │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  By Counterparty                                                     │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │ CP   │ Trades │ Avg Time │ <24hr SLA │ Paper │ Electronic │    │ │ │
│  │  ├─────────────────────────────────────────────────────────────────┤ │ │
│  │  │ GS   │   72   │  2.1d    │   78%     │  85%  │    15%     │    │ │ │
│  │  │ JPM  │   61   │  1.9d    │   82%     │  80%  │    20%     │    │ │ │
│  │  │ MS   │   54   │  1.5d    │   93%     │  65%  │    35%     │    │ │ │
│  │  │ BAML │   52   │  1.7d    │   88%     │  72%  │    28%     │    │ │ │
│  │  │ Citi │   38   │  1.6d    │   89%     │  76%  │    24%     │    │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ CONFIRMATION METRICS                                                  │ │
│  │                                                                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │ │
│  │  │ Disputed     │  │ Time to      │  │ Time to      │              │ │
│  │  │ 31%          │  │ Receive      │  │ Confirm      │              │ │
│  │  │ (46 of 148)  │  │ 7.6 days     │  │ 7.6 days     │              │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │ │
│  │                                                                       │ │
│  │  Confirmation Time Trend (Last 90 Days)                              │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │  [Line chart similar to affirmation]                             │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  By Counterparty                                                     │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │ CP   │ Traded │ Confirmed │ Disputed │ Disp% │ Time to Doc │... │ │ │
│  │  ├─────────────────────────────────────────────────────────────────┤ │ │
│  │  │ GS   │   72   │    38     │    18    │ 47%🔴 │   256d 8h   │    │ │ │
│  │  │ MS   │   54   │    31     │    25    │ 46%🔴 │   163d 16h  │    │ │ │
│  │  │ JPM  │   61   │     1     │     0    │  0%✅ │    3d 22h   │    │ │ │
│  │  │ BAML │   52   │     0     │     1    │ 11%🟡 │    75d      │    │ │ │
│  │  │ Citi │   38   │     0     │     0    │  0%✅ │     6d      │    │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ BREAK ANALYSIS (When data available)                                 │ │
│  │                                                                       │ │
│  │  Break Severity Distribution                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │  High: 12 (26.7%)  ███████████                                  │ │ │
│  │  │  Med:  18 (40.0%)  ████████████████████                         │ │ │
│  │  │  Low:  15 (33.3%)  ███████████████                              │ │ │
│  │  │                                                                  │ │ │
│  │  │  [Stacked bar chart showing trend over time]                    │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  Break Ownership                                                     │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │  Counterparty: 68%  █████████████████████████████████           │ │ │
│  │  │  Alta:         32%  ███████████████                             │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  Field-Level Break Frequency                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │ Field      │ Severity │ Break Rate │ Top Counterparties │      │ │ │
│  │  ├─────────────────────────────────────────────────────────────────┤ │ │
│  │  │ Strike     │ 🔴 High  │    8.2%    │ GS(4), JPM(3), Citi(2) │  │ │ │
│  │  │ Notional   │ 🔴 High  │    4.1%    │ BAML(3), MS(2)         │  │ │ │
│  │  │ Spread     │ 🔴 High  │    3.5%    │ GS(2), DB(2)           │  │ │ │
│  │  │ Eff Date   │ 🟡 Med   │    2.9%    │ JPM(2), Citi(1)        │  │ │ │
│  │  │ Term Amt   │ 🟡 Med   │    6.8%    │ GS(5), BAML(3)         │  │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ TRADING ACTIVITY CONTEXT                                              │ │
│  │                                                                       │ │
│  │  Trading Volume Over Time                                            │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │  [Histogram - existing from Trade Insights]                      │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │  By Counterparty │ By Trade Type │ By Product Type                   │ │
│  │  [Existing tables from Trade Insights - no changes]                  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### Top Filters

**Date Range Selector:**
- Preset options: Last 30 Days, Last 90 Days, Last 180 Days, Last Year, Custom
- Default: Last 90 Days
- Affects all charts and tables on the page

**Additional Filters:**
- Counterparty (multi-select dropdown)
- Product (multi-select dropdown)
- These are optional filters that narrow the view

---

### KPI Cards (Top Row)

**Three key metrics:**

1. **Total Trades**
   - Count of all trades in the time period
   - Trend vs. prior period of same length
   
2. **24hr SLA Rate**
   - Percentage of trades achieving affirmation OR confirmation within 24h
   - This is the key risk closure metric
   - Trend in pp (percentage points)

3. **Dispute Rate**
   - Percentage of trades with breaks/disputes
   - Trend in pp
   - Color: Red if >30%, Yellow if 20-30%, Green if <20%

---

### Affirmation Metrics Section (NEW)

**Summary Cards:**
- Avg time to affirm
- <24hr SLA rate
- Paper vs. Electronic split

**Trend Chart:**
- Line chart showing average affirmation time over the selected period
- Reference line at 24h (SLA threshold)
- X-axis: Daily or weekly buckets (depending on date range)
- Y-axis: Hours to affirm

**Counterparty Breakdown Table:**
| Column | Description |
|--------|-------------|
| Counterparty | CP name |
| Trades | Count of trades |
| Avg Time | Average time to affirm (days) |
| <24hr SLA | Percentage meeting SLA |
| Paper | % of affirmations via paper |
| Electronic | % of affirmations via electronic |

**Design Notes:**
- Table sortable by any column
- Highlight rows where SLA <80% in yellow
- Show top 10 counterparties by default, expand for all

---

### Confirmation Metrics Section (EXISTING - Enhanced)

**Keep existing structure from Trade Insights:**
- Summary metrics at top
- Trend chart
- Counterparty breakdown table

**Enhancements:**
- Add time-to-receive trend line
- Add dispute rate trend line
- Color code high dispute rates (>40% red, 20-40% yellow)

---

### Break Analysis Section (FUTURE)

**Shows when data becomes available:**

**Severity Distribution:**
- Visual bar chart showing High/Med/Low counts
- Stacked area chart showing trend over time
- Helps answer: "Are breaks becoming less severe?"

**Ownership:**
- Horizontal bar chart: Counterparty vs. Alta
- Helps answer: "Are these our errors or theirs?"

**Field-Level Frequency:**
- Table showing which fields break most often
- Sorted by break rate (highest first)
- Severity badge for each field
- Top counterparties responsible for each field's breaks

**Design Treatment Until Data Available:**
- Show section header with "(Coming Soon)" badge
- Gray placeholder box with descriptive text
- Or hide section entirely until data is ready

---

### Trading Activity Context (EXISTING)

**Keep unchanged from Trade Insights:**
- Trading volume histogram
- By Counterparty table
- By Trade Type table  
- By Product Type table

**These provide context for all the process metrics above.**

---

## Responsive Behavior

**Desktop (>1200px):**
- 3 KPI cards across
- Full tables with all columns
- Charts at full width

**Tablet (768px - 1200px):**
- 2-3 KPI cards per row
- Tables scroll horizontally
- Charts at full width

**Mobile (<768px):**
- KPI cards stack
- Tables show minimal columns with expand option
- Charts remain readable at smaller size

---

## Key User Flows

### Flow 1: Monthly Performance Review
1. Natasha opens Performance Analytics
2. Sets date range to "Last 90 Days"
3. Reviews top 3 KPIs → Sees SLA rate at 93% (good), Dispute rate at 31% (concerning)
4. Scrolls to Confirmation Metrics → Sees GS has 47% dispute rate
5. Clicks "GS" in table → Opens detailed view or filters to GS trades
6. Reviews GS-specific metrics, prepares talking points for next meeting

### Flow 2: Investigating Affirmation Performance
1. Opens Performance Analytics
2. Looks at Affirmation Metrics section
3. Sees avg time is 1.8 days (missing 24h SLA)
4. Reviews trend chart → Notices spike in August
5. Looks at counterparty table → Sees GS and JPM are slowest
6. Reviews paper vs. electronic split → 77% paper is the problem
7. Decides to prioritize electronic affirmation rollout

### Flow 3: Understanding Break Patterns (when available)
1. Scrolls to Break Analysis section
2. Reviews severity distribution → 26.7% high-severity is concerning
3. Looks at ownership → 68% counterparty errors (not our fault)
4. Reviews field-level table → Strike field breaks 8.2% of the time
5. Sees GS responsible for most strike breaks
6. Cross-references with counterparty table → Plans focused discussion with GS

---

## Data Requirements

### Affirmation Metrics (NEW DATA)
```typescript
{
  summary: {
    avgTimeToAffirm: number; // days
    slaRate: number; // percentage
    paperPct: number;
    electronicPct: number;
  };
  trend: Array<{
    date: string;
    avgTime: number;
    slaRate: number;
  }>;
  byCounterparty: Array<{
    counterparty: string;
    trades: number;
    avgTime: number;
    slaRate: number;
    paperPct: number;
    electronicPct: number;
  }>;
}
```

### Confirmation Metrics (EXISTING DATA)
- Use existing Trade Insights data structure
- No changes needed

### Break Analysis (FUTURE DATA)
```typescript
{
  severity: {
    high: {count: number, pct: number};
    medium: {count: number, pct: number};
    low: {count: number, pct: number};
  };
  ownership: {
    counterparty: number; // percentage
    alta: number; // percentage
  };
  byField: Array<{
    field: string;
    severity: 'high'|'medium'|'low';
    breakRate: number;
    topCounterparties: string; // "GS(4), JPM(3)"
  }>;
  trend: Array<{
    date: string;
    high: number;
    medium: number;
    low: number;
  }>;
}
```

---

## Integration Notes

**With Existing Trade Insights:**
- This dashboard IS Trade Insights with enhancements
- Maintain all existing functionality
- Add Affirmation section (new)
- Add Break Analysis section (future)
- Keep everything else as-is

**Navigation:**
- Update tab name from "Trade Insights" to "Performance Analytics"
- Ensure all deep links and bookmarks continue to work

---

## Design Considerations

**Section Ordering:**
The order matters for narrative flow:
1. **Top KPIs** - Quick snapshot
2. **Affirmation** - First step in the process
3. **Confirmation** - Second step in the process
4. **Break Analysis** - Understanding what went wrong
5. **Activity Context** - Understanding volume/mix effects

**Trend Visualization:**
- All trend lines should use consistent date bucketing
- Show SLA thresholds as reference lines
- Consider dual-axis charts where appropriate (e.g., volume + rate)

**Color Consistency:**
- Use same color palette across all sections
- Red = concerning, Yellow = warning, Green = good
- Match Risk Command Center color scheme

---

## Open Questions

1. Should we show a combined "24hr SLA Achievement" chart (affirmation OR confirmation)? NO
2. How many counterparties to show by default in tables (5, 10, all)? lets say 5 with a more button to expand
3. Should Break Analysis section be hidden until data is available, or show placeholder? will have a placeholder, but for now, assume we have data. 
4. Do we need export functionality on this dashboard (CSV/PDF)? yes, assume csv for now but we will need to figure this out. Just do PDF for now


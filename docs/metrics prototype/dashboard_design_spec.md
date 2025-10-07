# Dashboard Design Specification: Risk Metrics System

**Version:** 1.0  
**Last Updated:** October 2025  
**Owner:** Product Team  
**Status:** Design Phase

**Related Documents:**
- [PRD: Risk-Centric Metrics for Post-Trade Operations](./prd_risk_metrics.md)

---

## Executive Summary

This document defines the specific dashboard structure, layouts, and data requirements for the Risk Metrics system. It translates the strategic requirements from the PRD into concrete design specifications ready for implementation.

**Key Design Decisions:**
- **4 core risk-focused dashboards** (consolidated from 5+ potential views)
- **Two-tier Priority Actions** (trades with breaks vs. awaiting counterparty)
- **Count-based risk scoring** (due to currency normalization constraints)
- **48h/72h SLA thresholds** (simplified from complex time-weighting)

---

## Dashboard Structure Overview

```
1. Risk Command Center (NEW)
   Purpose: Daily operations - immediate action items
   Time Horizon: Real-time + last 7 days
   Users: Operations managers, senior ops

2. Performance Analytics (Enhanced from Trade Insights)
   Purpose: Trend analysis and process performance
   Time Horizon: 30/90/180 days (user selectable)
   Users: Operations managers, process improvement teams

3. Templates & Automation (Merged from Templates + Automation Insights)
   Purpose: Strategic initiative tracking
   Time Horizon: 6-12 months
   Users: Operations managers, senior management

4. Counterparty Scorecard (NEW)
   Purpose: Broker performance reviews
   Time Horizon: Quarterly snapshots
   Users: Operations managers (for external meetings)

5. Tasks (EXISTING - No Changes)
   Purpose: Team task management
   Users: Operations teams
```

---

## Dashboard 1: Risk Command Center

### Purpose
Answer Natasha's daily question: **"What needs my attention today?"**

### Layout Structure

```
┌────────────────────────────────────────────────────────────────┐
│ RISK COMMAND CENTER                                            │
│ [Date] Friday, October 06, 2025                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ [KPI Cards Row]                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │ Trades at    │ │ Outside 24hr │ │ High-Sev     │           │
│ │ Risk         │ │ SLA          │ │ Open Breaks  │           │
│ │              │ │              │ │              │           │
│ │ 23 trades    │ │ 18 / 258     │ │ 3 breaks     │           │
│ │ (8H 12M 3L)  │ │ (7.0%)       │ │ ↓ 2 vs LW    │           │
│ │ ↑ vs LW      │ │ ↑ 1.2% avg   │ │              │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                │
│ [Priority Actions: Trades with Active Breaks]                 │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Trades with Active Breaks (8 trades)                     │  │
│ │                                                          │  │
│ │ [DataTable]                                              │  │
│ │ Priority | Trade | CP | Product | Breaks | Age | Status │  │
│ │ 🔴       | 10234 | GS | CMS Opt | 4 ⓘ    | 3d  | ...    │  │
│ │ 🔴       | 10189 | JPM| FX Opt  | 1 ⓘ    | 2d  | ...    │  │
│ │                                                          │  │
│ │ [View All 8 Items →]                                     │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Priority Actions: Awaiting Counterparty Response]            │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Pending Affirmation (5 trades)                           │  │
│ │ Trade | CP | Product | Age | Status          | Action   │  │
│ │ 10298 | BAML| Equity | 50h🟡| Pending Affirm | Escalate │  │
│ │ 10245 | MS | CMS Opt | 18h | Pending Affirm | Monitor  │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Pending Confirmation Document (5 trades)                 │  │
│ │ Trade | CP | Product | Age | Status      | Action       │  │
│ │ 10321 | JPM | FX Opt | 75h🔴| Pending Doc | Escalate    │  │
│ │ 10278 | Citi| IRS    | 44h | Pending Doc | Follow Up   │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Current Risk Distribution]                                    │
│ ┌─────────────────────────┐ ┌──────────────────────────────┐  │
│ │ Risk by Counterparty    │ │ Risk by Product Type         │  │
│ │ [Stacked Horizontal Bar]│ │ [Stacked Horizontal Bar]     │  │
│ │ GS:  [8H|12M|5L]        │ │ CMS Opt: [9H|14M|6L]         │  │
│ │ JPM: [3H|8M|4L]         │ │ FX Opt:  [5H|10M|8L]         │  │
│ └─────────────────────────┘ └──────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Data Requirements

**Trades at Risk KPI:**
```typescript
{
  totalTrades: number;
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
  trendVsPriorWeek: number; // percentage change
}
```

**Priority Actions - Trades with Breaks:**
```typescript
{
  tradeId: string;
  counterparty: string;
  product: string;
  breaks: {
    high: number;
    medium: number;
    low: number;
    details: Array<{field: string, severity: 'high'|'medium'|'low'}>;
  };
  age: number; // hours since break identified
  status: 'in_dispute' | 'waiting_on_cp' | 'escalated';
  priorityScore: number; // calculated: (high × 100) + (med × 10) + (low × 1) + (age × 0.5)
}
```

**Priority Actions - Awaiting Counterparty:**
```typescript
{
  tradeId: string;
  counterparty: string;
  product: string;
  ageSinceTrade: number; // hours
  status: 'pending_affirmation' | 'pending_confirmation_doc';
  slaIndicator: 'ok' | 'warning' | 'critical'; // <48h | 48-72h | >72h
}
```

### Interaction Patterns

**Click Behaviors:**
- **Trade ID** → Navigate to filtered trade blotter (show specific trade)
- **"View All X Items"** → Navigate to filtered trade blotter (show all matching criteria)
- **Stacked bar segment** → Navigate to filtered trade blotter (show trades with that severity for that CP/Product)
- **Breaks tooltip (ⓘ)** → Show detailed list of fields with severity

**Aging Indicators:**
- No indicator: <48h (OK)
- 🟡 Yellow: 48-72h (Warning - escalate soon)
- 🔴 Red: >72h (Critical - immediate escalation)

**Priority Calculation:**
```
Priority Score = (High breaks × 100) + (Med breaks × 10) + (Low breaks × 1) + (Age in hours × 0.5)
Sort descending by priority score
```

### Design Notes

**Why Two "Priority Actions" Sections:**
- **Different operational responses:** Breaks require dispute resolution, Awaiting CP requires follow-up/escalation
- **Different data availability:** Can't have breaks without matching to CP record
- **Different SLA measurements:** Breaks measure time-in-dispute, Awaiting measures time-from-trade

**Why "Trades at Risk" Not "Open Risk Score":**
- Currency normalization not available (can't calculate notional-weighted score)
- Count-based approach is honest and actionable
- Severity breakdown (8H 12M 3L) provides sufficient context

---

## Dashboard 2: Performance Analytics

### Purpose
Answer: **"How are our processes trending? Are we improving?"**

### Layout Structure

```
┌────────────────────────────────────────────────────────────────┐
│ PERFORMANCE ANALYTICS                                          │
│ [Date Range Selector] Last 90 Days ▼                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ [KPI Cards Row]                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │ Total Trades │ │ 24hr SLA Rate│ │ Dispute Rate │           │
│ │ 148          │ │ 93%          │ │ 31%          │           │
│ │ ↑ 12% vs prior│ │ ↑ 2pp        │ │ ↓ 3pp        │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                │
│ [Process Performance - Affirmation]                            │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Affirmation Metrics                                      │  │
│ │                                                          │  │
│ │ Avg time to affirm: 1.8 days                            │  │
│ │ <24hr SLA rate: 87%                                     │  │
│ │ Paper: 77% | Electronic: 23%                            │  │
│ │                                                          │  │
│ │ [Trend Line Chart - 90 days]                            │  │
│ │ [Breakdown by Counterparty Table]                       │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Process Performance - Confirmation]                           │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Confirmation Metrics                                     │  │
│ │                                                          │  │
│ │ Disputed: 31% (46 of 148)                               │  │
│ │ Avg time to receive doc: 7.6 days                       │  │
│ │ Avg time to review: 0.8 days                            │  │
│ │ Avg time to confirm: 7.6 days                           │  │
│ │                                                          │  │
│ │ [Trend Line Chart - 90 days]                            │  │
│ │ [Breakdown by Counterparty Table - EXISTING]            │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Break Analysis] (When data available)                         │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Break Severity Distribution                              │  │
│ │ High: 12 (26.7%) | Medium: 18 (40%) | Low: 15 (33.3%)  │  │
│ │                                                          │  │
│ │ Break Ownership                                          │  │
│ │ Counterparty: 68% | Alta: 32%                           │  │
│ │                                                          │  │
│ │ Field-Level Break Frequency [Table]                     │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Trading Activity Context]                                     │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Activity Histogram [EXISTING]                            │  │
│ │ By Counterparty Table [EXISTING]                         │  │
│ │ By Product Type Table [EXISTING]                         │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Data Requirements

**Affirmation Metrics:**
```typescript
{
  avgTimeToAffirm: number; // days (decimal)
  slaRate: number; // percentage <24hr
  paperVsElectronic: {
    paper: number; // percentage
    electronic: number; // percentage
  };
  byCounterparty: Array<{
    counterparty: string;
    trades: number;
    avgTime: number;
    slaRate: number;
  }>;
  trend: Array<{date: string, avgTime: number, slaRate: number}>;
}
```

**Confirmation Metrics (EXISTING):**
```typescript
{
  disputeRate: number;
  avgTimeToReceive: number; // days
  avgTimeToReview: number; // days
  avgTimeToConfirm: number; // days
  byCounterparty: Array<{...}>; // existing structure
  trend: Array<{...}>; // for trend line
}
```

**Break Analysis (Future):**
```typescript
{
  bySeverity: {
    high: {count: number, percentage: number};
    medium: {count: number, percentage: number};
    low: {count: number, percentage: number};
  };
  byOwnership: {
    counterparty: number; // percentage
    alta: number; // percentage
  };
  byField: Array<{
    field: string;
    severity: 'high'|'medium'|'low';
    breakRate: number; // percentage
    topCounterparties: string;
  }>;
}
```

### Design Notes

**Integration with Existing Trade Insights:**
- Keep all existing tables and histograms as-is
- Add Affirmation section above Confirmation section
- Add Break Analysis section when severity data is available
- Maintain existing date range selector and filtering

**Time Display:**
- Show days with decimal (e.g., "7.6 days" not "7d 14h")
- Consistent across all time metrics

---

## Dashboard 3: Templates & Automation

### Purpose
Answer: **"Are our strategic initiatives reducing risk and improving efficiency?"**

### Layout Structure

```
┌────────────────────────────────────────────────────────────────┐
│ TEMPLATES & AUTOMATION                                         │
│ [Date Range Selector] Last 6 Months ▼                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ [Section 1: Template Coverage]                                │
│                                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │ Template Cov.│ │ Electronic   │ │ Coverage by  │           │
│ │ 67%          │ │ Affirmation  │ │ Volume       │           │
│ │ of trades    │ │ 23%          │ │ $51B / $76B  │           │
│ │ ↑ 5pp        │ │ ↑ 18pp (6mo) │ │ (67%)        │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Coverage Trend (Last 6 Months)                           │  │
│ │ [Line Chart: Apr 40% → May 48% → ... → Sep 67%]         │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Coverage by Counterparty                                 │  │
│ │ [Table with Coverage %, Trades, Trend columns]           │  │
│ │ GS:  38% 🔴 (72 trades) ↑ 1pp                            │  │
│ │ JPM: 45% 🔴 (61 trades) ↓ 2pp                            │  │
│ │ ...                                                      │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Coverage by Product Type                                 │  │
│ │ [Table with Coverage %, Trades, Trend columns]           │  │
│ │ CMS Option: 42% 🔴 (98 trades) ↑ 8pp                     │  │
│ │ ...                                                      │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Section 2: Automation Performance]                            │
│                                                                │
│ ┌──────────────┐ ┌──────────────┐                             │
│ │ Auto-Match   │ │ Avg Match    │                             │
│ │ Rate         │ │ Score        │                             │
│ │ 45%          │ │ 88.64%       │                             │
│ │ ↑ 12pp       │ │ ↑ 2.3pp      │                             │
│ └──────────────┘ └──────────────┘                             │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Auto-Match & Match Score Trend                           │  │
│ │ [Dual-axis Line Chart]                                   │  │
│ │ - Auto-match rate (bar chart)                            │  │
│ │ - Match score (line overlay)                             │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Match Score by Counterparty [Table]                      │  │
│ │ Match Score by Product Type [Table]                      │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Section 3: Combined Impact]                                  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ 🎯 Strategic Impact (Last 6 Months)                      │  │
│ │                                                          │  │
│ │ [Grid of Impact Metrics]                                │  │
│ │ Template Coverage: +27pp                                │  │
│ │ Auto-Match Rate: +18pp → Time Saved: 120 hrs/month     │  │
│ │ Electronic Affirm: +18pp → Faster by 1.3 days avg      │  │
│ │ Combined Effect → Break Rate: -4.2pp                    │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Data Requirements

**Template Coverage:**
```typescript
{
  overall: {
    coveragePct: number; // % of trades
    coverageByVolume: {covered: number, total: number}; // dollar amounts
    trend: number; // pp change
  };
  electronicAffirmation: {
    adoptionPct: number;
    trend: number;
  };
  history: Array<{month: string, coverage: number}>;
  byCounterparty: Array<{
    counterparty: string;
    trades: number;
    coveragePct: number;
    trend: number;
    indicator: 'good' | 'warning' | 'critical'; // >80% | 50-80% | <50%
  }>;
  byProduct: Array<{...}>; // same structure
}
```

**Automation Metrics:**
```typescript
{
  autoMatchRate: number; // percentage
  avgMatchScore: number; // percentage
  trends: {
    autoMatchRate: number; // pp change
    matchScore: number; // pp change
  };
  history: Array<{
    month: string;
    autoMatchRate: number;
    matchScore: number;
  }>;
  byCounterparty: Array<{
    counterparty: string;
    trades: number;
    matched: number;
    autoMatched: number;
    matchScore: number;
  }>;
  byProduct: Array<{...}>; // same structure
}
```

**Impact Metrics:**
```typescript
{
  templateCoverageGain: number; // pp
  autoMatchGain: number; // pp
  electronicAffirmGain: number; // pp
  timeSaved: number; // hours per month
  avgTimeReduction: number; // days
  breakRateReduction: number; // pp
  riskReduction: number; // estimated dollar amount
}
```

### Design Notes

**Metric Relationships:**
- Template coverage and automation are complementary strategic initiatives
- Show both independently and their combined impact
- Impact section demonstrates ROI to justify continued investment

**Match Score Positioning:**
- Label as "Match Score" (not "AI Accuracy")
- Tooltip: "Average agreement rate between Alta and counterparty records after AI extraction"
- Context: Higher score = better data alignment

---

## Dashboard 4: Counterparty Scorecard

### Purpose
Answer: **"How does this counterparty compare to peers? What should we discuss in our quarterly review?"**

### Layout Structure

```
┌────────────────────────────────────────────────────────────────┐
│ COUNTERPARTY PERFORMANCE - Q3 2025                            │
│ [Filter: Compare to] All Counterparties ▼  [Products] All ▼   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ [Rankings Table]                                               │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Overall Rankings (Volume-Weighted)                       │  │
│ │                                                          │  │
│ │ [DataTable - Click row for detailed view]               │  │
│ │ Rank | CP | Trades | Dispute% | Break% | Time to Doc... │  │
│ │ 1    | MS | 45     | 6.7% ✅  | 4.2% ✅ | 0.8h ✅ ...    │  │
│ │ 5    | GS | 72     | 22.2% 🔴 | 15.3% 🔴| 5.2h 🔴 ...    │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Detailed View - Selected Counterparty]                        │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ GS - Detailed Performance                                │  │
│ │ [Dropdown: Select CP] GS ▼                               │  │
│ │                                                          │  │
│ │ 72 Trades | $7.8B Volume | 15.3% Break Rate             │  │
│ │                                                          │  │
│ │ ┌─────────────────────┬─────────────────────┐           │  │
│ │ │ Timing Metrics      │ Quality Metrics     │           │  │
│ │ │ Time to Doc: 5.2h 🔴│ Dispute Rate: 22.2%│           │  │
│ │ │ Time to Affirm: 18h │ High-Sev Break: 4.2%│          │  │
│ │ │ Time to Confirm: 45h│ Template Compl: 78%│           │  │
│ │ │ Time in Dispute: 4.8d│                    │           │  │
│ │ └─────────────────────┴─────────────────────┘           │  │
│ │                                                          │  │
│ │ [Trend Analysis Table - Last 4 Quarters]                │  │
│ │ [Product Breakdown Table]                               │  │
│ │                                                          │  │
│ │ [Key Talking Points Box]                                │  │
│ │ ✓ POSITIVES: Consistent improvement...                  │  │
│ │ ⚠ CONCERNS: Overall metrics still bottom quartile...    │  │
│ │ 💡 RECOMMENDATIONS: Request FX Options process review...│  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ [Export Actions]                                               │
│ [Export Full Scorecard (PDF)] [Export Data (CSV)]            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Data Requirements

**Rankings:**
```typescript
{
  rank: number;
  counterparty: string;
  trades: number;
  volume: string; // formatted dollar amount
  metrics: {
    disputePct: number;
    disputePercentile: string; // e.g., "P15"
    breakRate: number;
    breakPercentile: string;
    timeToDoc: number;
    docPercentile: string;
    timeToConfirm: number;
    confirmPercentile: string;
    timeInDispute: number;
    disputeTimePercentile: string;
  };
  status: 'top' | 'middle' | 'bottom'; // quartile indicator
}
```

**Detailed View:**
```typescript
{
  counterparty: string;
  trades: number;
  volume: string;
  breakRate: number;
  timing: {
    timeToDoc: {avg: number, median: number, within1hr: number, peerAvg: number};
    timeToAffirm: {avg: number, median: number, sla: number};
    timeToConfirm: {avg: number, median: number, sla: number};
    timeInDispute: {avg: number, median: number, under48hr: number, peerAvg: number};
  };
  quality: {
    disputeRate: number;
    disputeCount: number;
    breakBySeverity: {high: number, medium: number, low: number};
    templateCompliance: number;
  };
  trend: Array<{quarter: string, [metrics]}>;
  products: Array<{name: string, trades: number, disputePct: number, ...}>;
}
```

### Design Notes

**This dashboard remains largely as designed** - it's already well-structured for quarterly reviews.

**Key features:**
- Percentile rankings give context ("bottom quartile" is more meaningful than raw numbers)
- Status indicators (✅ 🔴) provide quick visual scanning
- Talking points section helps prepare for difficult conversations
- Export functionality for sharing with counterparties

---

## Technical Implementation Notes

### Shared Components

**Reusable across dashboards:**
- KPI Card component (with trend indicators)
- DataTable with sorting/filtering
- Stacked horizontal bar charts (for risk distribution)
- Line charts (for trends)
- Badge/indicator components (🔴 🟡 ✅)

### Data Refresh Rates

- **Risk Command Center:** Real-time or every 5 minutes
- **Performance Analytics:** Daily refresh (overnight)
- **Templates & Automation:** Daily refresh
- **Counterparty Scorecard:** Quarterly snapshots (with refresh option)

### SLA Threshold Configuration

**Should be configurable in admin settings:**
```typescript
{
  riskClosure: {
    warning: 48, // hours
    critical: 72 // hours
  },
  documentReceipt: {
    target: 1, // hour
    warning: 6, // hours
  },
  disputeResolution: {
    target: 48, // hours
  }
}
```

### Filtering & Navigation

**Global filters available:**
- Date range (preset options: 7d, 30d, 90d, 180d, custom)
- Counterparty (multi-select)
- Product type (multi-select)
- Product family (Rates/FX/Equity/Credit)

**Navigation paths:**
- Click trade ID → Navigate to trade blotter (filtered to specific trade)
- Click "View All" → Navigate to trade blotter (filtered to criteria)
- Click chart segment → Navigate to trade blotter (filtered to segment)

---

## Data Constraints & Workarounds

### No Notional-Based Risk Score
**Constraint:** Currency normalization not available  
**Workaround:** Use count-based risk score with severity weighting  
**Formula:** `(High × 100) + (Med × 10) + (Low × 1) + (Age × 0.5)`

### Break Severity/Ownership Not Yet Captured
**Constraint:** Templates don't yet define field severity, break ownership not tagged  
**Workaround:** Show placeholder sections in design, implement when data available  
**UI Treatment:** Gray out sections with "(Data coming soon)" or hide until available

### Match Score vs. AI Accuracy
**Constraint:** Current "match score" conflates AI extraction quality with real breaks  
**Workaround:** Label clearly as "Match Score" not "Accuracy"  
**Future enhancement:** Capture "AI error" vs "Counterparty error" tagging to derive true accuracy

---

## Open Design Questions

1. **Priority Actions limit:** Show top 5, 10, or all items by default?
2. **KPI card colors:** Should status colors (red/yellow/green) be based on thresholds or trends?
3. **Trend indicators:** Show percentage change, absolute change, or both?
4. **Mobile responsiveness:** What's the minimum supported screen size?
5. **Export formats:** PDF only, or also CSV/Excel for raw data?

---

## Next Steps

1. **Create detailed mockups/wireframes** for each dashboard
2. **Validate data availability** with engineering team
3. **User testing** with Natasha and ops team
4. **Iterative refinement** based on feedback
5. **Phased rollout:** Risk Command Center first, others follow

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Oct 2025 | Initial design specification | Product Team |


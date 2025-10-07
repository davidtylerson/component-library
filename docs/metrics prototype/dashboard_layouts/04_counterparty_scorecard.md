# Counterparty Scorecard - Layout Diagram

**Dashboard Purpose:** Broker performance reviews - "How do you compare to peers?"  
**Time Horizon:** Quarterly snapshots  
**Primary User:** Natasha (for external meetings with counterparties)

---

## Full Page Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  COUNTERPARTY PERFORMANCE - Q3 2025                                         │
│                                                                             │
│  [Compare: All Counterparties ▼]  [Products: All ▼]  [Export PDF]          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ OVERALL RANKINGS (Volume-Weighted)                                    │ │
│  │                                                                       │ │
│  │ Click any row for detailed view                                      │ │
│  │                                                                       │ │
│  │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │ │Rank│ CP │Trades│ Disp% │ Break%│Time Doc│Time Conf│Time Dispute││ │ │
│  │ ├──────────────────────────────────────────────────────────────────┤ │ │
│  │ │ 1  │ MS │  45  │6.7%✅ │4.2%✅ │0.8h ✅ │ 18h  ✅ │ 1.2d  ✅   ││ │ │
│  │ │    │    │$4.2B │(P80)  │(P75)  │(P90)   │ (P85)   │ (P80)      ││ │ │
│  │ │    │    │      │       │       │        │         │            ││ │ │
│  │ │ 2  │BAML│  52  │9.6%✅ │6.1%✅ │1.2h ✅ │ 22h  ✅ │ 1.8d  ✅   ││ │ │
│  │ │    │    │$5.1B │(P70)  │(P60)  │(P75)   │ (P70)   │ (P65)      ││ │ │
│  │ │    │    │      │       │       │        │         │            ││ │ │
│  │ │ 3  │Citi│  38  │13.2%  │8.9%   │2.1h    │ 28h     │ 2.5d       ││ │ │
│  │ │    │    │$3.8B │(P50)  │(P45)  │(P50)   │ (P50)   │ (P50)      ││ │ │
│  │ │    │    │      │       │       │        │         │            ││ │ │
│  │ │ 4  │JPM │  61  │18.0%🔴│11.2%🔴│3.8h 🔴 │ 38h  🔴 │ 3.9d  🔴   ││ │ │
│  │ │    │    │$6.2B │(P30)  │(P30)  │(P30)   │ (P35)   │ (P30)      ││ │ │
│  │ │    │    │      │       │       │        │         │            ││ │ │
│  │ │ 5  │ GS │  72  │22.2%🔴│15.3%🔴│5.2h 🔴 │ 45h  🔴 │ 4.8d  🔴   ││ │ │
│  │ │    │    │$7.8B │(P15)  │(P15)  │(P15)   │ (P20)   │ (P20)      ││ │ │
│  │ └──────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │ Legend: ✅ Top Quartile  -  Middle  🔴 Bottom Quartile               │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ GS - DETAILED PERFORMANCE                      [Select CP: GS ▼]     │ │
│  │                                                                       │ │
│  │ 72 Trades  |  $7.8B Volume  |  15.3% Break Rate                      │ │
│  │                                                                       │ │
│  │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │ │ SUMMARY METRICS                                                  │ │ │
│  │ │                                                                  │ │ │
│  │ │ ┌───────────────────┐  ┌───────────────────┐  ┌───────────────┐│ │ │
│  │ │ │High-Severity Break│  │Avg Resolution Time│  │Template Compl ││ │ │
│  │ │ │                   │  │                   │  │               ││ │ │
│  │ │ │     4.2% 🔴       │  │    3.2 days 🔴    │  │    78% 🔴     ││ │ │
│  │ │ │                   │  │                   │  │               ││ │ │
│  │ │ │vs 2.1% peer avg   │  │vs 2.1 day avg     │  │vs 92% peer avg││ │ │
│  │ │ └───────────────────┘  └───────────────────┘  └───────────────┘│ │ │
│  │ └──────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │ ┌─────────────────────────────┐  ┌───────────────────────────────┐  │ │
│  │ │ TIMING METRICS              │  │ QUALITY METRICS               │  │ │
│  │ │                             │  │                               │  │ │
│  │ │ Time to Receive Doc         │  │ Confirm Dispute Rate          │  │ │
│  │ │ • Avg: 5.2h 🔴              │  │ • 22.2% 🔴 (16 of 72)         │  │ │
│  │ │ • Median: 4.1h              │  │                               │  │ │
│  │ │ • Within 1hr: 28%           │  │ Break Rate by Severity        │  │ │
│  │ │ • Peer avg: 62%             │  │ • High: 4.2% 🔴               │  │ │
│  │ │                             │  │ • Medium: 6.8%                │  │ │
│  │ │ Time to Affirm              │  │ • Low: 4.3%                   │  │ │
│  │ │ • Avg: 18.3h                │  │                               │  │ │
│  │ │ • Median: 14.2h             │  │ Template Compliance           │  │ │
│  │ │ • <24hr SLA: 78%            │  │ • 78% 🔴                      │  │ │
│  │ │                             │  │ • vs 92% peer avg             │  │ │
│  │ │ Time to Confirm             │  │                               │  │ │
│  │ │ • Avg: 45h 🔴               │  │                               │  │ │
│  │ │ • Median: 38h               │  │                               │  │ │
│  │ │ • <24hr SLA: 31% 🔴         │  │                               │  │ │
│  │ │                             │  │                               │  │ │
│  │ │ Time in Dispute             │  │                               │  │ │
│  │ │ • Avg: 4.8d 🔴              │  │                               │  │ │
│  │ │ • Median: 3.2d              │  │                               │  │ │
│  │ │ • <48hr resolution: 42%     │  │                               │  │ │
│  │ │ • Peer avg: 68%             │  │                               │  │ │
│  │ └─────────────────────────────┘  └───────────────────────────────┘  │ │
│  │                                                                       │ │
│  │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │ │ TREND ANALYSIS (Last 4 Quarters)                                 │ │ │
│  │ │                                                                  │ │ │
│  │ │ ┌──────────────────────────────────────────────────────────────┐│ │ │
│  │ │ │Metric      │ Q4'24│ Q1'25│ Q2'25│ Q3'25│ Trend │           ││ │ │
│  │ │ ├──────────────────────────────────────────────────────────────┤│ │ │
│  │ │ │Break Rate  │18.2% │16.5% │15.8% │15.3% │↓ Better ✅       ││ │ │
│  │ │ │Dispute Rate│25.1% │23.8% │22.9% │22.2% │↓ Better ✅       ││ │ │
│  │ │ │Time to Doc │ 6.1h │ 5.8h │ 5.5h │ 5.2h │↓ Better ✅       ││ │ │
│  │ │ │Time Dispute│ 5.8d │ 5.4d │ 5.1d │ 4.8d │↓ Better ✅       ││ │ │
│  │ │ │<24hr SLA   │  28% │  29% │  30% │  31% │↑ Better ✅       ││ │ │
│  │ │ └──────────────────────────────────────────────────────────────┘│ │ │
│  │ └──────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │ │ PRODUCT BREAKDOWN                                                │ │ │
│  │ │                                                                  │ │ │
│  │ │ ┌────────────────────────────────────────────────────────────┐  │ │ │
│  │ │ │Product    │Trades│Disp%│Avg Time Conf│Key Issues         │  │ │ │
│  │ │ ├────────────────────────────────────────────────────────────┤  │ │ │
│  │ │ │CMS Options│  37  │18.9%│    42h      │Strike (4)         │  │ │ │
│  │ │ │FX Options │  24  │29.2%│    51h 🔴   │Notional (3) 🔴    │  │ │ │
│  │ │ │IRS        │  11  │18.2%│    38h      │Term Fee (2)       │  │ │ │
│  │ │ └────────────────────────────────────────────────────────────┘  │ │ │
│  │ └──────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │ │ 📋 KEY TALKING POINTS FOR QUARTERLY REVIEW                       │ │ │
│  │ │                                                                  │ │ │
│  │ │ ✓ POSITIVES:                                                     │ │ │
│  │ │   • Consistent improvement across all metrics for 4 quarters     │ │ │
│  │ │   • Time to send docs improving (5.2h vs 6.1h a year ago)        │ │ │
│  │ │   • CMS Options performing close to peer average                 │ │ │
│  │ │                                                                  │ │ │
│  │ │ ⚠ CONCERNS:                                                      │ │ │
│  │ │   • Overall metrics still bottom quartile vs peers               │ │ │
│  │ │   • FX Options dispute rate 2.4x peer average                    │ │ │
│  │ │   • Dispute resolution taking 2x longer than top performers      │ │ │
│  │ │   • Only 31% of trades meeting 24-hour SLA vs 85% peer avg       │ │ │
│  │ │                                                                  │ │ │
│  │ │ 💡 RECOMMENDATIONS:                                              │ │ │
│  │ │   • Request process review for FX Options specifically           │ │ │
│  │ │   • Discuss template compliance improvement plan                 │ │ │
│  │ │   • Establish escalation path for disputes over 48 hours         │ │ │
│  │ └──────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                       │ │
│  │ [Export Full Scorecard (PDF)]  [Export Data (CSV)]  [Schedule Mtg]  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### Rankings Table

**Purpose:** Quick comparison of all counterparties

**Columns:**
1. **Rank** - Overall ranking (1-5, etc.)
2. **Counterparty** - CP name
3. **Trades** - Trade count and total volume
4. **Dispute %** - Confirmation dispute rate with percentile
5. **Break %** - Overall break rate with percentile
6. **Time to Doc** - Avg time to receive confirmation doc with percentile
7. **Time to Confirm** - Avg time to confirm with percentile
8. **Time in Dispute** - Avg time to resolve disputes with percentile

**Visual Indicators:**
- ✅ Green checkmark: Top quartile (P75-P100)
- No indicator: Middle quartiles (P25-P75)
- 🔴 Red warning: Bottom quartile (P0-P25)

**Interaction:**
- Click any row → Load detailed view below
- Sort by any column
- Filter by product type
- Search for specific counterparty

**Design Notes:**
- Two-row display per counterparty:
  - Row 1: Metrics with indicators
  - Row 2: Percentiles in gray text
- Volume-weighted ranking (not just raw counts)
- Percentiles provide context for interpretation

---

### Detailed View - Summary Metrics

**Three highlight cards showing worst performers:**

1. **High-Severity Break Rate**
   - This CP's rate vs. peer average
   - Red indicator if significantly above peer
   - Focus on economic breaks, not documentation

2. **Avg Resolution Time**
   - Days to resolve disputes
   - vs. peer average
   - Measures responsiveness

3. **Template Compliance**
   - % of docs following agreed template language
   - vs. peer average
   - Measures attention to standards

**Why these three:**
- High-severity breaks = Risk exposure
- Resolution time = Operational efficiency
- Template compliance = Process adherence

---

### Detailed View - Timing & Quality Metrics

**Two side-by-side cards:**

**Timing Metrics:**
- Time to Receive Doc
  - Avg, Median, Within 1hr %, Peer avg
  - Measures CP responsiveness
  
- Time to Affirm
  - Avg, Median, <24hr SLA %
  - Overall affirmation performance
  
- Time to Confirm
  - Avg, Median, <24hr SLA %
  - Overall confirmation performance
  
- Time in Dispute
  - Avg, Median, <48hr resolution %, Peer avg
  - Dispute resolution efficiency

**Quality Metrics:**
- Confirm Dispute Rate
  - Percentage and count
  - Primary quality indicator
  
- Break Rate by Severity
  - High/Med/Low breakdown
  - Shows composition of quality issues
  
- Template Compliance
  - Adherence to agreed standards
  - vs. peer average

**Design Notes:**
- Show both avg and median (handles outliers)
- SLA metrics show % meeting threshold
- Peer comparisons provide context
- 🔴 indicators for concerning metrics

---

### Trend Analysis

**Table showing last 4 quarters:**

**Metrics tracked:**
- Break Rate
- Dispute Rate
- Time to Doc (hours)
- Time in Dispute (days)
- <24hr SLA Rate

**Trend Column:**
- ↓ Better ✅ (for metrics where lower is better)
- ↑ Better ✅ (for metrics where higher is better)
- → Flat (no significant change)
- ↑ Worse 🔴 (degrading performance)

**Purpose:**
- Show whether CP is improving or degrading
- Provide context for quarterly discussion
- Identify sustained issues vs. one-time problems

---

### Product Breakdown

**Table showing performance by product type:**

**Columns:**
- Product name
- Trade count
- Dispute %
- Avg time to confirm
- Key issues (specific fields with break counts)

**Why this matters:**
- Performance varies by product complexity
- Identifies specific problem areas
- Enables focused discussions

**Design Notes:**
- Highlight rows with significantly worse performance
- "Key Issues" column shows actionable specifics
- Sortable by any column

---

## Data Requirements

### Rankings
```typescript
{
  rank: number;
  counterparty: string;
  trades: number;
  volume: string; // formatted
  metrics: {
    disputePct: number;
    disputePercentile: string; // "P15"
    breakRate: number;
    breakPercentile: string;
    timeToDoc: number; // hours
    docPercentile: string;
    timeToConfirm: number; // hours
    confirmPercentile: string;
    timeInDispute: number; // days
    disputeTimePercentile: string;
  };
  status: 'top' | 'middle' | 'bottom'; // for color coding
}
```

### Detailed View
```typescript
{
  counterparty: string;
  summary: {
    trades: number;
    volume: string;
    breakRate: number;
    highSevBreakRate: number;
    peerAvg: number;
    avgResolutionTime: number;
    resolutionPeerAvg: number;
    templateCompliance: number;
    compliancePeerAvg: number;
  };
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
  trend: Array<{
    quarter: string;
    breakRate: number;
    disputeRate: number;
    timeToDoc: number;
    timeInDispute: number;
    slaRate: number;
  }>;
  products: Array<{
    name: string;
    trades: number;
    disputePct: number;
    avgTimeToConf: number;
    issues: string; // "Strike (4), Notional (3)"
    warning: boolean; // highlight if true
  }>;
}
```

---

## Key User Flows

### Flow 1: Preparing for Quarterly Broker Review
1. Natasha opens Counterparty Scorecard two days before GS meeting
2. Reviews rankings table → Sees GS is rank 5 (bottom)
3. Clicks GS row → Detailed view loads
4. Reviews summary cards → Notes 4.2% high-severity break rate (2x peer avg)
5. Reviews timing metrics → Notes 5.2h avg time to doc (bottom quartile)
6. Reviews trend → Sees improvement over 4 quarters (positive trend)
7. Reviews product breakdown → Identifies FX Options as problem area
8. Prepares discussion strategy based on the data
9. Takes notes and screenshots for meeting with GS

### Flow 2: Comparing Counterparties
1. Opens rankings table
2. Filters to "Rates Products Only" (wants like-for-like comparison)
3. Sorts by "Dispute %" ascending (best first)
4. Compares MS (6.7%) vs GS (22.2%)
5. Notes GS's volume is higher ($7.8B vs $4.2B) but performance is worse
6. Uses this data to justify prioritizing GS relationship work

### Flow 3: Tracking CP Improvement
1. Opens detailed view for JPM
2. Reviews trend table → Sees break rate declining 18% → 11%
3. Checks timing metrics → <24hr SLA improving from 28% → 35%
4. Reviews product breakdown → Sees improvement across all products
5. Prepares positive feedback based on trends
6. Decides to share positive feedback with JPM in next call

---

## Responsive Behavior

**Desktop (>1200px):**
- Full rankings table with all columns
- Timing & Quality metrics side-by-side
- All data visible without scrolling per section

**Tablet (768px - 1200px):**
- Rankings table scrolls horizontally
- Timing & Quality stack vertically
- Trend table scrolls horizontally

**Mobile (<768px):**
- Rankings show minimal columns (Rank, CP, Disp%, Break%)
- Expand rows for full details
- All detailed view sections stack
- Export buttons stack vertically

---

## Design Considerations

**Percentile Rankings:**
- More meaningful than absolute values
- Accounts for volume/complexity differences
- "Bottom quartile" is clear language for stakeholders

**Talking Points Generation:**
- Should be auto-generated based on data patterns
- Future enhancement: AI-generated recommendations
- For now: Template-based with dynamic data insertion

**Peer Comparison:**
- "Peer" = all counterparties by default
- Option to filter to "like peers" (similar volume, similar products)
- Shows relative performance, not just absolute

**Quarterly Snapshot:**
- Data represents full quarter
- Does not update real-time during quarter
- Provides stable basis for review meetings

---

## Open Questions

1. Should talking points be manually edited or fully auto-generated? Dont have them remove
2. How to handle new counterparties with insufficient data for percentiles? just calculate let them worry about that
3. Should we show "improvement score" (single metric combining all trends)? no
4. PDF export format - one page summary or multi-page detailed? ignore for now we will figure out later
5. Should CPs have access to their own scorecard (via portal)? probably, but this would need to be across all counterparties, adn we will ned to figure out what this will look like. keep a pin in this for now. 


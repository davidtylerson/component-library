# Dashboard 2: Risk Deep-Dive (Break Analysis) - Specification

**Dashboard ID:** Dashboard-2  
**Target User:** Middle Office Operations Manager, Operations Analysts  
**Update Frequency:** Real-time (prototype: static)  
**Default View:** Last 90 days, All Products

---

## Purpose

Answer: **"Where are my breaks coming from and how bad are they?"**

This dashboard provides detailed break analysis for operations teams to:
1. Understand break patterns and severity distribution
2. Identify systematic issues vs one-off errors
3. Determine which counterparties/products/fields have the most problems
4. Track dispute resolution performance
5. Assess whether issues are concentrated or widespread

---

## Key Questions Answered

1. **What is my overall break rate and how is it trending?** (Break severity distribution)
2. **How long are trades sitting in dispute?** (Dispute metrics)
3. **Are breaks getting more or less severe over time?** (Severity trend chart)
4. **Who is causing the breaks - counterparties, us, or AI?** (Break ownership)
5. **Which fields break most frequently?** (Field-level table)
6. **Are problems concentrated with specific counterparties?** (Field-level counterparty breakdown)
7. **Should I focus on specific counterparties or is this a systematic issue?** (Concentration analysis)

---

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Risk Analysis - Break Details" + Filters       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 1: Break Severity Distribution + Dispute Box] │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 2: Charts - Severity Trend + Ownership]       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 3: Field-Level Break Frequency Table]         │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 4: Break Concentration Analysis]              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Header Controls

**Component Type:** Filter Bar

**Filters Available:**
- Date Range dropdown: [Last 30 Days, Last 90 Days, Last 180 Days, Last Year]
- Product Filter dropdown: [All Products, Rates, FX, Equity, Credit]
- Export button

**Data Requirements:**
None - these are UI controls that filter data for all sections below

---

## Section 1: Break Overview

**Layout:** Left column (stats) + Right column (dispute metrics box)

### Component 1.1: Break Severity Distribution (Left)

**Component Type:** Metrics Panel

**Data Required:**
- **Raw Data Source:** All trades in date range
- **Aggregations:**
  - Total trade count
  - Total break count
  - Breaks by severity (high, medium, low)
  - Break rate trend vs prior period

**Data Interface:**
```typescript
{
  totalTrades: number,
  totalBreaks: number,
  breakRate: number,          // Percentage
  bySeverity: {
    high: { count: number, percentage: number },
    medium: { count: number, percentage: number },
    low: { count: number, percentage: number }
  },
  trendVsPrior: number        // Percentage change
}
```

**Calculation Logic:**
```
totalTrades = COUNT(*)
totalBreaks = COUNT(*) WHERE hasBreaks = true
breakRate = (totalBreaks / totalTrades) * 100

highSevBreaks = SUM(highSeverityBreakCount)
mediumSevBreaks = SUM(mediumSeverityBreakCount)
lowSevBreaks = SUM(lowSeverityBreakCount)

For each severity:
  percentage = (count / totalBreaks) * 100

trendVsPrior:
  priorPeriodBreakRate = calculate for prior period
  trendVsPrior = currentBreakRate - priorPeriodBreakRate
```

**Visual Display:**
- "258 Total Trades | 45 Breaks (17.4%)"
- Three rows showing severity counts and percentages with emoji indicators (🔴🟡🟢)
- Trend line at bottom: "Break Rate Trend: ↓ 3.2% vs. prior 90 days"

### Component 1.2: Dispute Metrics Box (Right)

**Component Type:** Info Panel (highlighted)

**Data Required:**
- **Raw Data Source:** Trades with `isDisputed = true`
- **Aggregations:**
  - Active dispute count
  - Average time in dispute
  - Longest open dispute details
  - % resolved under 48 hours

**Data Interface:**
```typescript
{
  activeDisputes: number,
  avgTimeInDisputeDays: number,
  longestDispute: {
    tradeId: string,
    counterparty: string,
    days: number
  },
  resolvedUnder48HrsPercent: number,
  trendVsPrior: number        // For resolved % metric
}
```

**Configuration:**
```typescript
{
  backgroundColor: '#eff6ff',  // Light blue
  borderColor: '#3b82f6',
  highlightWarnings: true
}
```

**Calculation Logic:**
```
activeDisputes = COUNT(*) WHERE isDisputed = true AND disputeResolvedTime IS NULL

avgTimeInDispute = AVG(timeInDisputeDays) WHERE timeInDisputeDays IS NOT NULL

longestDispute = SELECT tradeId, counterparty, timeInDisputeDays
  WHERE disputeResolvedTime IS NULL
  ORDER BY timeInDisputeDays DESC
  LIMIT 1

resolvedUnder48Hrs = COUNT(*) WHERE timeInDisputeDays <= 2 AND disputeResolvedTime IS NOT NULL
totalResolved = COUNT(*) WHERE disputeResolvedTime IS NOT NULL
resolvedUnder48HrsPercent = (resolvedUnder48Hrs / totalResolved) * 100
```

---

## Section 2: Analysis Charts

**Layout:** Two charts side by side

### Component 2.1: Breaks by Severity Trend (Left)

**Component Type:** Stacked Area/Bar Chart

**Data Required:**
- **Raw Data Source:** All trades with breaks
- **Aggregation:** Count by severity by month for last 3 months

**Data Interface:**
```typescript
Array<{
  month: string,     // "Jul", "Aug", "Sep"
  high: number,      // Count of high severity breaks
  medium: number,
  low: number
}>
```

**Configuration:**
```typescript
{
  chartType: 'stackedBar',
  xAxisKey: 'month',
  series: [
    { key: 'high', color: '#dc2626', label: 'High' },
    { key: 'medium', color: '#eab308', label: 'Medium' },
    { key: 'low', color: '#16a34a', label: 'Low' }
  ],
  showLegend: true
}
```

**Calculation Logic:**
```
For each month in last 3 months:
  monthStart = startOfMonth(date)
  monthEnd = endOfMonth(date)
  
  high = SUM(highSeverityBreakCount) WHERE tradeDate BETWEEN monthStart AND monthEnd
  medium = SUM(mediumSeverityBreakCount) WHERE tradeDate BETWEEN monthStart AND monthEnd
  low = SUM(lowSeverityBreakCount) WHERE tradeDate BETWEEN monthStart AND monthEnd
```

### Component 2.2: Break Ownership (Right)

**Component Type:** Horizontal Bar Chart

**Data Required:**
- **Raw Data Source:** All trades with breaks
- **Aggregation:** Count by `breakOwner`

**Data Interface:**
```typescript
Array<{
  owner: 'counterparty' | 'client' | 'ai',
  percentage: number
}>
```

**Configuration:**
```typescript
{
  orientation: 'horizontal',
  colors: {
    counterparty: '#ef4444',
    client: '#eab308',
    ai: '#3b82f6'
  },
  showPercentage: true,
  barHeight: 32
}
```

**Calculation Logic:**
```
counterpartyBreaks = COUNT(*) WHERE breakOwner = 'dealer'
clientBreaks = COUNT(*) WHERE breakOwner = 'client'
aiBreaks = COUNT(*) WHERE breakOwner = 'ai'
total = counterpartyBreaks + clientBreaks + aiBreaks

For each owner:
  percentage = (count / total) * 100
```

**Additional Element:**
- "View by Counterparty →" link below chart

---

## Section 3: Field-Level Break Frequency

**Purpose:** Identify which specific fields break most often and with which counterparties

**Component Type:** Data Table (sortable)

**Data Required:**
- **Raw Data Source:** All trades
- **Aggregation:** For each unique field in `breakFields`:
  - Count of breaks for that field
  - Break rate (breaks / trades with that field)
  - Top counterparties where this field breaks
  - Severity level (from field risk config)

**Data Interface:**
```typescript
Array<{
  field: string,              // "Strike", "Notional", etc.
  severity: 1 | 2 | 3 | 4 | 5,
  breakRate: number,          // Percentage
  topCounterparties: string   // "GS (4), JPM (3), Citi (2)"
}>
```

**Configuration:**
```typescript
{
  columns: [
    { key: 'field', label: 'Field', width: '150px', sortable: true },
    { key: 'severity', label: 'Severity', width: '100px', sortable: true },
    { key: 'breakRate', label: 'Break Rate', width: '150px', sortable: true },
    { key: 'topCounterparties', label: 'Top Counterparties', width: 'auto' }
  ],
  defaultSort: { key: 'severity', direction: 'desc' },
  filterBySeverity: [4, 5],  // Show only high/medium severity
  maxRows: 6,
  expandable: true  // "Show All Fields (23) →" link
}
```

**Calculation Logic:**
```
# First, flatten all breakFields from all trades
allFieldBreaks = []
FOR each trade WHERE hasBreaks = true:
  FOR each field in trade.breakFields:
    allFieldBreaks.push({
      field: field,
      counterparty: trade.counterparty,
      severity: lookupFieldSeverity(trade.productType, field)
    })

# Then aggregate by field
fieldStats = GROUP BY field:
  count = COUNT(*)
  
  # Break rate calculation (simplified - assumes all trades could have this field)
  # In reality, would need to know which trades have which fields
  breakRate = (count / totalTrades) * 100
  
  # Top counterparties
  topCPs = GROUP BY counterparty
    ORDER BY COUNT(*) DESC
    LIMIT 3
    FORMAT as "GS (4), JPM (3), Citi (2)"

# Filter to high/medium severity only
FILTER WHERE severity >= 4

# Sort by severity desc, then break rate desc
ORDER BY severity DESC, breakRate DESC
```

**Visual Elements:**
- Severity badges: 🔴 5, 🟡 4, 🟢 3, etc.
- Break rate with mini progress bar
- Clickable counterparty names (future: link to counterparty scorecard)

---

## Section 4: Break Concentration Analysis

**Purpose:** Provide actionable insight on whether to target specific counterparties or address systematic issues

**Component Type:** Info Panel (recommendation)

**Data Required:**
- **Raw Data Source:** All trades with breaks
- **Aggregation:**
  - % of breaks from top 3 counterparties
  - % of breaks from top 2 product types

**Data Interface:**
```typescript
{
  topCounterpartiesPercent: number,  // e.g., 62
  topProductsPercent: number,        // e.g., 71
  recommendation: string
}
```

**Configuration:**
```typescript
{
  backgroundColor: '#fef3c7',  // Light yellow
  borderColor: '#f59e0b',
  showRecommendation: true
}
```

**Calculation Logic:**
```
# Breaks by counterparty
breaksByCP = GROUP BY counterparty:
  SELECT counterparty, COUNT(*) as breakCount
  ORDER BY breakCount DESC

top3CPBreaks = SUM(breakCount) FROM top 3
totalBreaks = SUM(breakCount) FROM all
topCounterpartiesPercent = (top3CPBreaks / totalBreaks) * 100

# Breaks by product
breaksByProduct = GROUP BY productType:
  SELECT productType, COUNT(*) as breakCount
  ORDER BY breakCount DESC

top2ProductBreaks = SUM(breakCount) FROM top 2
topProductsPercent = (top2ProductBreaks / totalBreaks) * 100

# Generate recommendation
IF topCounterpartiesPercent > 60 AND topProductsPercent > 60:
  recommendation = "Focus on [Top CP] ([Top Product]) and [Second CP] ([Second Product])"
ELSE IF topCounterpartiesPercent > 60:
  recommendation = "Focus on specific counterparties: [list top 3]"
ELSE:
  recommendation = "Breaks are distributed - likely systematic issue"
```

**Visual Display:**
```
Break Concentration Analysis

Top 3 Counterparties account for 62% of all breaks
Top 2 Product Types account for 71% of all breaks

⚠️ Recommendation: Focus on GS (CMS Options) and JPM (FX)
```

---

## Data Summary

### Raw Data Requirements

**Primary Data Source:** `mockTrades.json`

**Required Fields:**
- tradeId
- tradeDate
- counterparty
- productType
- hasBreaks
- breakCount
- highSeverityBreakCount
- mediumSeverityBreakCount
- lowSeverityBreakCount
- breakFields (array)
- breakOwner
- isDisputed
- disputeStartTime
- disputeResolvedTime
- timeInDisputeDays

**Reference Data:**
- Field risk configuration (field name → severity mapping by product type)

### Computed Metrics Required

**Pre-computed:**
- Break summary stats (total, by severity, rate)
- Dispute metrics (active, avg time, longest)
- Severity trend by month
- Break ownership distribution
- Field-level break frequency
- Concentration analysis

**Dynamic (if filtering):**
- All of the above filtered by date range and product type

---

## Component Dependencies

### Reusable Components Needed

1. **Metrics Panel** - Used 1 time (Section 1 left)
2. **Info Panel** - Used 2 times (Sections 1 right, 4)
3. **Stacked Bar Chart** - Used 1 time (Section 2 left)
4. **Horizontal Bar Chart** - Used 1 time (Section 2 right)
5. **Data Table** - Used 1 time (Section 3)
6. **Filter Bar** - Used 1 time (Header)

### Shared Utilities Needed

- `groupBy(array, key)` - Group by dimension
- `sumBy(array, key)` - Sum field values
- `countBy(array, key)` - Count by category
- `flatMap(array, fn)` - Flatten break fields
- `percentile(array, value)` - Not used here but related dashboards need it

---

## Interactions

### Filter Changes

**Date Range Dropdown:**
- Updates all sections with filtered data
- Recalculates trends (prior period changes based on selection)

**Product Filter Dropdown:**
- Filters trades by `productFamily`
- Updates all aggregations

**Export Button:**
- Downloads CSV of field-level break data
- Includes all columns from Section 3 table

### Click Actions

1. **"View by Counterparty" link** → Navigate to Counterparty Scorecard
2. **Counterparty names in field table** → Navigate to Counterparty Scorecard filtered to that CP
3. **"Show All Fields" link** → Expand table to show all 23 fields
4. **Field name in table** → (Future) Drill into field-level detail

### Hover States

- Chart segments: Show tooltip with exact count
- Table rows: Highlight row
- Severity badges: Show severity definition

---

## Empty States

### No Breaks Scenario

When filtered data contains no breaks:
```
✓ No breaks found in selected period

Consider this a win! Your process is working well.

[Clear Filters]
```

### No High-Severity Breaks

Field table shows message:
```
No high or medium severity breaks found.
Low severity breaks: [count]

[Show All Severities]
```

---

## Responsive Behavior

- **Desktop (>1200px):** All sections side-by-side as designed
- **Tablet (768-1200px):** 
  - Section 1: Stacks vertically
  - Section 2: Charts stack vertically
  - Section 3: Table scrolls horizontally
- **Mobile (<768px):** 
  - All sections stack
  - Table switches to card view

---

## Performance Considerations

### Expensive Operations

1. **Field-level aggregation:** Requires flattening all break fields from all trades
2. **Counterparty list formatting:** String concatenation for each field

### Optimization Strategy

**Phase 1 (Prototype):**
- Pre-compute field stats in mockMetrics
- Accept O(n²) for small dataset

**Phase 2 (Production):**
- Index breakFields for faster lookups
- Memoize field stats calculation
- Consider server-side aggregation

---

## Testing Scenarios

### Functional Tests

1. Verify break rate calculation matches manual count
2. Verify severity distribution sums to 100%
3. Verify dispute metrics exclude resolved disputes for "active" count
4. Verify field-level table shows only high/medium severity by default
5. Verify concentration analysis recommendation logic

### Edge Cases

1. No breaks in dataset
2. All breaks are same severity
3. Single field breaks on all trades
4. Dispute with null resolution time (still open)
5. Break with unknown owner
6. Field appears in breakFields but not in field config (use default severity)

### Data Integrity

1. `breakCount` = `highSeverityBreakCount + mediumSeverityBreakCount + lowSeverityBreakCount`
2. If `hasBreaks = true`, then `breakCount > 0`
3. If `isDisputed = true`, then `disputeStartTime` is not null

---

## Related Documentation

- **Component-Driven Development Strategy** - Component standards
- **Data Strategy** - Data architecture
- **Data Model Documentation** - Field definitions
- **Dashboard 1 Specification** - Executive Overview
- **Dashboard 3 Specification** - Counterparty Scorecard (next)
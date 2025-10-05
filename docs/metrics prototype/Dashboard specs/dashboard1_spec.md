# Dashboard 1: Executive Risk Overview - Specification

**Dashboard ID:** Dashboard-1  
**Target User:** Middle Office Operations Manager  
**Update Frequency:** Real-time (prototype: static)  
**Default View:** Last 30 days

---

## Purpose

Provide at-a-glance answer to: **"What needs my attention right now?"**

This dashboard is the primary landing page for operations managers starting their day. Within 10 seconds, they should understand:
1. Current risk exposure across all open trades
2. Which trades require immediate action
3. Overall process health (SLA performance)
4. Recent trading activity context

---

## Key Questions Answered

1. **What is my total open risk right now?** (Open Risk Score KPI)
2. **How many trades are outside our 24-hour SLA?** (Trades Outside SLA KPI)
3. **What are the highest-priority items I need to address today?** (Priority Actions table)
4. **Which counterparties or products represent the most risk?** (Risk distribution charts)
5. **Are we improving or degrading on SLA performance?** (SLA trend chart)
6. **What's our overall trading volume and activity?** (Trading Activity section)

---

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Header: "Risk Overview" + Date                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 1: KPI Bar - 4 cards in row]                  │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 2: Priority Actions Table]                     │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 3: Trading Activity - 2 column layout]        │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ [Section 4: Risk Distribution - 2 charts side by side] │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [Section 5: SLA Performance Trend Chart]               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Section 1: KPI Bar

**Purpose:** Show 4 critical metrics at a glance with trend indicators

**Layout:** Horizontal row of 4 equal-width cards

### Component 1.1: Open Risk Score Card

**Component Type:** KPI Card

**Data Required:**
- **Raw Data Source:** All trades with `status = 'disputed'`
- **Aggregation:** Sum of `riskScore` field
- **Comparison:** Previous period (week) sum for trend calculation

**Data Interface:**
```typescript
{
  value: number,           // Sum of riskScore for disputed trades
  change: number,          // Percentage change vs last week
  trend: 'up' | 'down',   // Direction of change
  comparisonPeriod: string // "vs. last week"
}
```

**Configuration:**
```typescript
{
  label: "Open Risk Score",
  status: "warning" | "good" | "danger", // Based on thresholds
  threshold: { warning: 10000, danger: 20000 }
}
```

**Calculation Logic:**
```
openRiskScore = SUM(riskScore) WHERE status = 'disputed'
change = ((current - previous) / previous) * 100
```

### Component 1.2: Trades Outside SLA Card

**Component Type:** KPI Card

**Data Required:**
- **Raw Data Source:** All trades
- **Aggregation:** Count where `metSLA = false` and percentage of total

**Data Interface:**
```typescript
{
  value: string,           // "18 / 258" (outside / total)
  subValue: string,        // "7.0%"
  change: number,          // Percentage point change vs average
  trend: 'up' | 'down',
  comparisonPeriod: string // "vs. avg"
}
```

**Configuration:**
```typescript
{
  label: "Trades Outside SLA",
  status: "danger", // Always danger if count > 0
  showPercentage: true
}
```

**Calculation Logic:**
```
outsideSLA = COUNT(*) WHERE metSLA = false
total = COUNT(*)
percentage = (outsideSLA / total) * 100
```

### Component 1.3: High-Severity Open Breaks Card

**Component Type:** KPI Card

**Data Required:**
- **Raw Data Source:** All trades with `status = 'disputed'`
- **Aggregation:** Sum of `highSeverityBreakCount`

**Data Interface:**
```typescript
{
  value: number,           // Count of high severity breaks
  change: number,          // Change vs last week
  trend: 'up' | 'down',
  comparisonPeriod: string
}
```

**Calculation Logic:**
```
highSevBreaks = SUM(highSeverityBreakCount) WHERE status = 'disputed'
```

### Component 1.4: Template Coverage Card

**Component Type:** KPI Card

**Data Required:**
- **Raw Data Source:** All trades
- **Aggregation:** Percentage with `hasTemplate = true`

**Data Interface:**
```typescript
{
  value: string,           // "67%"
  change: number,          // Percentage point change vs last month
  trend: 'up' | 'down',
  comparisonPeriod: string
}
```

**Configuration:**
```typescript
{
  label: "Template Coverage",
  status: "good" | "warning", // Good if > 80%
  threshold: { good: 80 }
}
```

**Calculation Logic:**
```
withTemplate = COUNT(*) WHERE hasTemplate = true
total = COUNT(*)
coverage = (withTemplate / total) * 100
```

---

## Section 2: Priority Actions Table

**Purpose:** Show top 5-10 highest-risk trades requiring immediate attention

**Component Type:** Data Table (Priority List variant)

**Data Required:**
- **Raw Data Source:** Trades with `status = 'disputed'`
- **Sorting:** By `riskScore` descending
- **Limit:** Top 10 rows

**Data Interface:**
```typescript
Array<{
  rank: 'high' | 'medium',    // Visual indicator
  tradeId: string,
  counterparty: string,
  product: string,
  issue: string,              // First item from breakFields array
  age: string,                // Formatted display "3d 4h"
  ageHours: number,           // For sorting
  score: number               // riskScore
}>
```

**Configuration:**
```typescript
{
  columns: [
    { key: 'rank', label: 'Rank', width: '60px' },
    { key: 'tradeId', label: 'Trade', width: '100px', clickable: true },
    { key: 'counterparty', label: 'Counterparty', width: '120px' },
    { key: 'product', label: 'Product', width: '120px' },
    { key: 'issue', label: 'Issue', width: '120px' },
    { key: 'age', label: 'Age', width: '100px' },
    { key: 'score', label: 'Score', width: '100px' }
  ],
  maxRows: 10,
  sortBy: 'score',
  sortDirection: 'desc',
  rowClickAction: 'navigateToTradeDetail'
}
```

**Calculation Logic:**
```
disputes = SELECT * WHERE status = 'disputed'
sorted = ORDER BY riskScore DESC
top10 = LIMIT 10

For each row:
  rank = riskScore > 5000 ? 'high' : 'medium'
  issue = breakFields[0] // First break field
  age = formatAge(disputeStartTime, now)
```

**Interactions:**
- Click trade ID → Navigate to trade detail
- "View All 18 Items" link → Navigate to filtered risk deep-dive

---

## Section 3: Trading Activity Summary

**Purpose:** Provide volume context for risk metrics

**Layout:** 2-column grid (stats left, chart right)

### Component 3.1: Activity Stats (Left Column)

**Component Type:** Metrics List

**Data Required:**
- **Raw Data Source:** All trades in date range
- **Aggregations:**
  - Total count
  - Count by product family
  - Count by top 3 counterparties

**Data Interface:**
```typescript
{
  totalTrades: number,
  changePercent: number,
  byFamily: Array<{ name: string, count: number, pct: number }>,
  topCounterparties: Array<{ name: string, count: number, pct: number }>
}
```

**Calculation Logic:**
```
totalTrades = COUNT(*)
changePercent = ((current - previous) / previous) * 100

byFamily = GROUP BY productFamily
  SELECT productFamily, COUNT(*), (COUNT(*) / totalTrades * 100) as pct

topCounterparties = GROUP BY counterparty
  ORDER BY COUNT(*) DESC
  LIMIT 3
```

### Component 3.2: Volume Trend (Right Column)

**Component Type:** Bar Chart (mini)

**Data Required:**
- **Raw Data Source:** All trades
- **Aggregation:** Count by week for last 6 weeks

**Data Interface:**
```typescript
Array<{
  period: string,  // "W1", "W2", etc.
  count: number
}>
```

**Configuration:**
```typescript
{
  xAxisKey: 'period',
  yAxisKey: 'count',
  color: '#3b82f6',
  showAxes: false,  // Simplified mini chart
  height: 160
}
```

**Calculation Logic:**
```
For each week in last 6 weeks:
  weekStart = startOfWeek(date)
  count = COUNT(*) WHERE tradeDate BETWEEN weekStart AND weekEnd
  label = "W" + weekNumber
```

---

## Section 4: Risk Distribution

**Purpose:** Show where risk is concentrated by counterparty and product

**Layout:** 2 horizontal bar charts side by side

### Component 4.1: Risk by Counterparty

**Component Type:** Horizontal Bar Chart

**Data Required:**
- **Raw Data Source:** Disputed trades
- **Aggregation:** Sum of `riskScore` grouped by `counterparty`

**Data Interface:**
```typescript
Array<{
  name: string,      // Counterparty short name
  score: number,     // Sum of riskScore
  maxScore: number   // For scaling bars (max across all CPs)
}>
```

**Configuration:**
```typescript
{
  xAxisKey: 'score',
  yAxisKey: 'name',
  color: '#ef4444',
  showValues: true,
  sortBy: 'score',
  sortDirection: 'desc',
  maxBars: 5
}
```

**Calculation Logic:**
```
riskByCP = SELECT counterparty, SUM(riskScore) as score
  FROM trades
  WHERE status = 'disputed'
  GROUP BY counterparty
  ORDER BY score DESC
  LIMIT 5

maxScore = MAX(score) // For bar width scaling
```

### Component 4.2: Risk by Product Type

**Component Type:** Horizontal Bar Chart

**Data Required:**
- **Raw Data Source:** Disputed trades
- **Aggregation:** Sum of `riskScore` grouped by `productType`

**Data Interface:**
```typescript
Array<{
  name: string,      // Product type name
  score: number,
  maxScore: number
}>
```

**Configuration:**
```typescript
{
  xAxisKey: 'score',
  yAxisKey: 'name',
  color: '#3b82f6',
  showValues: true,
  sortBy: 'score',
  sortDirection: 'desc',
  maxBars: 5
}
```

**Calculation Logic:**
```
riskByProduct = SELECT productType, SUM(riskScore) as score
  FROM trades
  WHERE status = 'disputed'
  GROUP BY productType
  ORDER BY score DESC
  LIMIT 5
```

---

## Section 5: SLA Performance Trend

**Purpose:** Show whether SLA performance is improving or degrading over time

**Component Type:** Line Chart

**Data Required:**
- **Raw Data Source:** All trades
- **Aggregation:** Weekly SLA achievement rate for last 30 days

**Data Interface:**
```typescript
Array<{
  date: string,      // Week label
  value: number      // SLA percentage
}>
```

**Configuration:**
```typescript
{
  xAxisKey: 'date',
  yAxisKey: 'value',
  lineColor: '#3b82f6',
  targetLine: {
    value: 95,
    color: '#16a34a',
    style: 'dashed',
    label: 'Target (95%)'
  },
  yAxisRange: [75, 100],
  showGrid: true
}
```

**Calculation Logic:**
```
For each week in last 30 days:
  weekTrades = SELECT * WHERE tradeDate BETWEEN weekStart AND weekEnd
  metSLA = COUNT(*) WHERE metSLA = true
  total = COUNT(*)
  percentage = (metSLA / total) * 100
  
Current display:
  current = latest week percentage
  change = current - previous period
  delta = "+4.2%" or "-2.1%"
```

**Additional Display:**
- Below chart: "Current: 92.8% (↑ 4.2% vs. last month)"

---

## Data Summary

### Raw Data Requirements

**Primary Data Source:** `mockTrades.json` (array of trade records)

**Required Fields:**
- tradeId
- tradeDate
- counterparty
- productType
- productFamily
- status
- metSLA
- riskScore
- highSeverityBreakCount
- hasTemplate
- breakFields (array)
- disputeStartTime

### Computed Metrics Required

**Pre-computed (for performance):**
- Overall stats: openRiskScore, tradesOutsideSLA, highSevBreaks, templateCoverage
- Risk by counterparty (top 5)
- Risk by product (top 5)
- Priority actions (top 10)
- SLA trend (weekly for 30 days)
- Activity stats and trend

**On-demand (if filtering enabled):**
- All of the above, but filtered by user selections

---

## Component Dependencies

### Reusable Components Needed

1. **KPI Card** - Used 4 times (Section 1)
2. **Data Table** - Used 1 time (Section 2)
3. **Metrics List** - Used 1 time (Section 3)
4. **Bar Chart (mini)** - Used 1 time (Section 3)
5. **Horizontal Bar Chart** - Used 2 times (Section 4)
6. **Line Chart** - Used 1 time (Section 5)

### Shared Utilities Needed

- `groupBy(array, key)` - Group trades by dimension
- `sumBy(array, key)` - Sum numeric field
- `countBy(array, key)` - Count by category
- `formatAge(timestamp)` - Convert to "3d 4h" format
- `calculatePercentageChange(current, previous)` - Trend calculation

---

## Interactions

### Click Actions

1. **Trade ID in Priority Table** → Navigate to trade detail page
2. **"View All 18 Items" link** → Navigate to Risk Deep-Dive with disputed filter
3. **"View Details" on Risk Charts** → Navigate to filtered Risk Deep-Dive or Counterparty Scorecard
4. **"View Activity Details" link** → Navigate to Activity & Volume dashboard

### Hover States

- KPI cards: Show tooltip with calculation details
- Chart bars: Show exact value and percentage
- Table rows: Highlight row

### Responsive Behavior

- **Desktop (>1200px):** All sections side-by-side as designed
- **Tablet (768-1200px):** Risk distribution charts stack vertically
- **Mobile (<768px):** All sections stack vertically, KPI cards 2x2 grid

---

## Performance Considerations

### For Prototype (75 trades)

- All calculations can run on every render (< 1ms)
- No memoization required
- No virtualization needed

### For Production

- Memoize aggregations
- Debounce filter updates
- Consider server-side calculation for large datasets

---

## Empty States

### No Data Scenarios

1. **No disputed trades:** Show "No open disputes" message in Priority Actions
2. **All trades meet SLA:** Show "100% SLA achievement" celebration state
3. **Date filter returns no results:** Show "No trades in selected period"

### Error States

1. **Data load failure:** Show error message with retry button
2. **Calculation error:** Log to console, show fallback values

---

## Testing Scenarios

### Functional Tests

1. Verify all KPI calculations match expected values
2. Verify Priority Table sorts correctly by risk score
3. Verify charts render with correct data
4. Verify trend indicators show correct direction

### Edge Cases

1. Single trade in dataset
2. All trades have same risk score
3. No template coverage
4. 100% SLA achievement
5. Empty date range

### Visual Regression

1. Screenshot comparison for layout consistency
2. Verify responsive breakpoints
3. Check color scheme consistency

---

## Related Documentation

- **Component-Driven Development Strategy** - Component interface standards
- **Data Strategy** - Data layer architecture
- **Data Model Documentation** - Field definitions and schemas
- **Dashboard 2 Specification** - Risk Deep-Dive page
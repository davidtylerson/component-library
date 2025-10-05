# Data Strategy for Prototype Dashboards

**Purpose:** Guide for AI coding team on data architecture for prototype  
**Audience:** AI coding agents, future developers  
**Scope:** Prototype only - not production architecture

---

## Core Principles

### 1. Prototype-First Approach
This is a **prototype for demonstrating UX and validating dashboard designs**. The data architecture prioritizes:
- Speed of iteration over scalability
- Visual realism over data accuracy
- Simple implementation over production patterns
- Easy modification over performance optimization

### 2. Static Mock Data
All data is pre-generated and stored as static JSON. No database, no API calls, no real-time updates in Phase 1.

**Why:** Removes backend dependency, allows pure frontend prototyping, enables rapid iteration.

### 3. Separation of Concerns
Keep three layers distinct:
1. **Raw Data** - The mock trade records
2. **Calculation Logic** - Functions that compute metrics
3. **Computed Metrics** - Pre-calculated results ready for display

**Why:** Enables evolution from static to dynamic without rewriting components.

---

## Data Architecture Layers

### Layer 1: Raw Trade Data

**Location:** `src/data/mockTrades.json`

**What it is:** Array of 75 trade records representing 90 days of activity.

**Schema:** Flattened single-table design (see Data Model Documentation for full schema)

**Key characteristics:**
- Each record is self-contained (no foreign keys, no joins)
- Pre-calculated timing metrics included (timeToDocHours, etc.)
- Nullable fields for incomplete workflows
- Realistic distributions by counterparty/product/status

**Sample structure:**
```json
[
  {
    "tradeId": "10234",
    "tradeDate": "2025-09-28",
    "counterparty": "JPM",
    "status": "disputed",
    "riskScore": 7500,
    "timeToDocHours": 8.25,
    ...
  }
]
```

### Layer 2: Calculation Logic

**Location:** `src/utils/metricsCalculator.js` (or similar)

**What it is:** Pure functions that take trade arrays and return computed metrics.

**Core function signature:**
```javascript
function calculateMetrics(trades) {
  return {
    overall: { /* aggregated stats */ },
    byCounterparty: [ /* per-CP metrics */ ],
    byProduct: [ /* per-product metrics */ ],
    timeSeries: [ /* trend data */ ]
  };
}
```

**Key operations:**
- Filtering (by status, date, counterparty)
- Aggregation (sums, averages, counts)
- Grouping (by counterparty, product, time period)
- Percentile calculations (for scorecarding)
- Time series generation (for charts)

**Important:** These functions should be **pure** - same input always produces same output, no side effects.

### Layer 3: Computed Metrics

**Location:** `src/data/mockMetrics.js`

**What it is:** Pre-calculated results from running calculation logic on full dataset.

**Pattern:**
```javascript
import mockTrades from './mockTrades.json';
import { calculateMetrics } from '../utils/metricsCalculator';

export const mockMetrics = calculateMetrics(mockTrades);
export { mockTrades };
```

**Why separate:** Components can import ready-to-use metrics without any computation.

---

## Data Generation

### Overview
Mock data is generated programmatically to ensure:
- Realistic distributions
- Consistent relationships (e.g., timestamps in logical order)
- Counterparty performance profiles (GS = best, JPM = worst)
- Proper statistical properties

### Generation Method

**Tool:** Python script (provided separately)

**Process:**
1. Define counterparty profiles (template usage rates, break rates, timing)
2. Define product distributions (rates 47%, fx 27%, equity 20%, credit 6%)
3. Generate 75 trades with randomized but realistic attributes
4. Ensure timestamp progressions are logical (executed → doc received → reviewed → confirmed)
5. Calculate derived fields (risk scores, timing metrics)
6. Output to JSON

**Regeneration:** Run script anytime to create fresh dataset. Use random seed for reproducibility.

### Key Distribution Targets

| Metric | Target | Purpose |
|--------|--------|---------|
| Confirmed trades | 60% | Majority succeed |
| Disputed trades | 24% | Enough to show patterns |
| Pending trades | 16% | Show incomplete workflows |
| Template coverage | 67% | Room for improvement |
| GS break rate | ~5% | Best performer |
| JPM break rate | ~22% | Worst performer |
| Trades meeting SLA | ~70% | Realistic success rate |

---

## Component Data Access Patterns

### Phase 1: Static Pre-Computed (Initial Prototype)

Components import ready-to-use metrics:

```javascript
import { mockMetrics } from '../data/mockMetrics';

function Dashboard() {
  const { openRiskScore, tradesOutsideSLA } = mockMetrics.overall;
  return <KPICard value={openRiskScore} />;
}
```

**Pros:**
- Simplest implementation
- No computation in render cycle
- No React hooks needed
- Fast initial development

**Cons:**
- No filtering capability
- All dashboards show same date range
- Cannot drill down dynamically

**When to use:** Initial prototype, validating designs, getting feedback on UX.

### Phase 2: Dynamic Calculation (With Filters)

Components compute metrics on filtered data:

```javascript
import { mockTrades } from '../data/mockMetrics';
import { calculateMetrics } from '../utils/metricsCalculator';

function Dashboard() {
  const [filters, setFilters] = useState({ dateRange: '90d', counterparty: 'all' });
  
  const metrics = useMemo(() => {
    const filtered = applyFilters(mockTrades, filters);
    return calculateMetrics(filtered);
  }, [filters]);
  
  return <KPICard value={metrics.overall.openRiskScore} />;
}
```

**Pros:**
- Interactive filtering
- Date range pickers work
- More realistic prototype
- Closer to production behavior

**Cons:**
- More code complexity
- Need to understand React hooks
- Performance considerations (use memoization)

**When to use:** After initial feedback, when stakeholders want interactive features.

### Transition Path

The architecture supports gradual transition:

1. **Week 1-2:** Build dashboards with `mockMetrics` (static)
2. **Get feedback:** Validate designs, adjust layouts
3. **Week 3-4:** Add filters by switching to dynamic calculation
4. **Same calculation logic:** Just different data source

No component rewrite needed - change imports and add state management.

---

## Computed Metrics Specification

### What Needs Pre-Computing

For optimal prototype performance, pre-compute:

1. **Percentile rankings** - Expensive to calculate, rarely change
2. **Grouped aggregations** - By counterparty, product, time period
3. **Time series data** - Weekly/monthly trend arrays
4. **Derived fields** - Complex calculations like risk scores

### What Can Stay Dynamic

Safe to compute on-demand:
- Simple filters (status, counterparty selection)
- Counts and sums
- Basic averages
- Top N lists

### Example Metric Structure

```javascript
{
  overall: {
    totalTrades: 75,
    openRiskScore: 26300,
    tradesOutsideSLA: 23,
    highSevOpenBreaks: 12,
    templateCoverage: 67
  },
  
  byCounterparty: [
    {
      counterparty: 'GS',
      trades: 18,
      breakRate: 5.2,
      breakRatePercentile: 'P90',
      avgTimeToDoc: 0.95,
      timeToDocPercentile: 'P95',
      // ... all scorecard metrics
    }
  ],
  
  timeSeries: {
    slaPerformance: [
      { date: '2025-09-01', value: 80 },
      { date: '2025-09-08', value: 82 },
      // ... weekly data points
    ],
    activityByWeek: [
      { week: 'W1', trades: 52 },
      // ...
    ]
  },
  
  priorityActions: [
    {
      tradeId: '10234',
      counterparty: 'JPM',
      product: 'CMS Option',
      issue: 'Strike',
      riskScore: 7500,
      ageDisplay: '3d 4h'
    }
  ]
}
```

---

## Percentile Calculation Approach

Percentiles are used heavily in counterparty scorecards (P90 = top 10%).

### Calculation Method

```
1. Collect all values for a metric (e.g., all break rates)
2. Sort values ascending
3. For each counterparty's value:
   - Count how many values are below it
   - Percentile = (count below / total) × 100
   - Round to nearest 5 or 10
```

### Percentile Bands

For display simplicity, group into quartiles:
- **Top Quartile (P75-P100):** Green checkmark ✓
- **Middle (P25-P75):** Yellow dash -
- **Bottom Quartile (P0-P25):** Red warning ⚠

### Pre-compute vs Dynamic

**Pre-compute:** Calculate percentiles for full dataset once  
**Dynamic:** If filtering by date/product, percentiles change - recalculate

For Phase 1, pre-compute is sufficient.

---

## Time Series Data Generation

Dashboard charts need time-based data (trend lines, activity over time).

### Aggregation Windows

Common patterns:
- **Daily:** For recent activity (last 30 days)
- **Weekly:** For medium-term trends (last 90 days)
- **Monthly:** For long-term analysis (last 6 months)

### Generation Strategy

```
1. Group trades by time window (day/week/month)
2. For each window:
   - Count trades
   - Calculate metrics (SLA rate, break rate, etc.)
   - Store as { label: 'Sep 15', value: 92 }
3. Sort chronologically
4. Fill gaps (if no trades in a window, include with 0)
```

### Data Shape for Charts

```javascript
{
  label: 'Sep 15',     // X-axis
  value: 92,           // Y-axis
  metadata: {          // Optional tooltip data
    trades: 45,
    breaks: 3
  }
}
```

---

## Edge Cases to Handle

### 1. Null/Missing Timestamps

Some trades are pending and lack timestamps (reviewStartTime = null).

**Pattern:** Filter nulls before calculating averages:
```javascript
const withTimings = trades.filter(t => t.timeToDocHours !== null);
const average = sum(withTimings.map(t => t.timeToDocHours)) / withTimings.length;
```

### 2. Division by Zero

Calculating rates when denominator could be zero.

**Pattern:** Return 0 or null rather than NaN:
```javascript
const rate = total > 0 ? (breaks / total) * 100 : 0;
```

### 3. Empty Groups

Filtering might produce empty arrays.

**Pattern:** Check length before operations:
```javascript
const filtered = trades.filter(/* ... */);
if (filtered.length === 0) return { message: 'No data' };
```

### 4. Date Range Edge Cases

- Start date after end date
- No trades in selected range
- Invalid date formats

**Pattern:** Validate inputs, show empty state in UI.

---

## Performance Considerations

### For 75 Trade Records

- **No optimization needed** - dataset is tiny
- All calculations run in <1ms
- Can recalculate on every render if needed
- Memoization is nice-to-have, not required

### If Scaling Later

Optimizations in order of impact:
1. Memoize expensive calculations (percentiles, grouping)
2. Index commonly filtered fields
3. Paginate large result sets in UI
4. Use web workers for heavy computation
5. Consider virtualization for long lists

For prototype: **Don't optimize prematurely.**

---

## Testing Strategy

### Data Quality Tests

Verify generated data meets requirements:
- Timestamp order is logical
- Status matches workflow state
- Percentages sum correctly
- No impossible values (negative hours, >100% rates)

### Calculation Tests

Test calculation functions:
- Known input → expected output
- Edge cases (empty arrays, all nulls)
- Filtering produces correct subsets
- Aggregations match manual calculation

### Component Integration Tests

Verify components consume data correctly:
- Render with mock data
- Handle missing data gracefully
- Update when data changes (Phase 2)

---

## Migration Path to Production

This prototype data architecture can evolve to production:

### Phase 1: Mock Data (Current)
- Static JSON
- Pre-computed metrics
- No backend

### Phase 2: API Integration
- Replace `import mockTrades` with `fetch('/api/trades')`
- Same calculation functions work
- Add loading states

### Phase 3: Real-time Updates
- WebSocket for live data
- Incremental metric updates
- Optimistic UI updates

### Phase 4: Backend Calculation
- Move heavy computation to server
- API returns computed metrics
- Frontend just displays

**Key insight:** Calculation logic is portable. Functions that work on arrays work regardless of data source.

---

## File Organization

Recommended structure:

```
src/
  data/
    mockTrades.json           # Raw data (75 records)
    mockMetrics.js            # Pre-computed metrics
    generateMockData.py       # Data generation script (outside src)
  
  utils/
    metricsCalculator.js      # Pure calculation functions
    filterHelpers.js          # Filter/sort utilities
    percentileCalculator.js   # Percentile logic
  
  components/
    Dashboard/
      Dashboard.jsx           # Uses data
      KPICard.jsx
      PriorityTable.jsx
      ...
```

---

## Key Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data format | JSON | Simple, portable, no parsing overhead |
| Schema design | Flattened single table | No joins needed, easy to understand |
| Metrics approach | Pre-computed + calculation functions | Fast initial dev, easy to add filters later |
| Generation | Python script | Reproducible, realistic distributions |
| Updates | Static (Phase 1) | Simplest path to working prototype |
| Performance | No optimization | Dataset too small to matter |

---

## Common Pitfalls to Avoid

1. **Don't fetch mock data asynchronously** - it's local, use direct import
2. **Don't normalize data** - denormalized is fine for prototype
3. **Don't optimize prematurely** - 75 records is trivial
4. **Don't couple components to data shape** - pass only what's needed
5. **Don't mix calculation logic into components** - keep in utils

---

## Questions for AI Coding Team

When implementing, consider:

1. Should date filters be part of initial prototype or Phase 2?
2. Do charts need animation/transitions or static is fine?
3. Should percentile bands be fixed (P75, P50, P25) or dynamic?
4. Are there dashboard-specific calculations beyond shared utils?
5. Should we pre-generate multiple date range views (30d, 90d, etc.)?

Adjust architecture based on priorities (speed vs. features vs. realism).

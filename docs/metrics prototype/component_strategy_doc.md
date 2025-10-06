# Component-Driven Development Strategy for Dashboard System

**Purpose:** Establish foundation for future custom dashboarding while building current prototype  
**Audience:** AI coding agents, engineering teams  
**Scope:** Component architecture and interface standards

---

## Executive Summary

This prototype work serves dual purposes:

1. **Immediate:** Build fixed dashboards to validate metrics with customers
2. **Strategic:** Create reusable component library for future custom dashboarding capability

The key insight: Build components with **explicit, documented interfaces** now so they can be:

- Used in fixed layouts today
- Made selectable/configurable later
- Composed into custom dashboards without rebuild

---

## Core Philosophy

### Theming & Tokens (Single Source of Truth)

- Import theme CSS once: `@tydavidson/design-system/src/app/globals-consolidated.css`
- Use Tailwind preset: `presets: [require('@tydavidson/design-system/tailwind-preset')]`
- Use semantic classes: `bg-*`, `text-*`, `border-*`, `fg-*`
- text-_ for copy; fg-_ for icons/indicators
- Avoid raw Tailwind colors (e.g., `text-red-600`, `bg-white`) unless explicitly approved

### Components as Configurable Units

Each dashboard component should be a **self-contained, configurable unit** with three clear interfaces:

1. **Data Interface** - What data shape does it consume?
2. **Configuration Interface** - How can it be customized?
3. **Visual Interface** - What does it render?

### The Component Anatomy

```
┌─────────────────────────────────┐
│      Dashboard Component        │
├─────────────────────────────────┤
│                                 │
│  Input: Data Interface          │
│  ├─ Expected data shape         │
│  ├─ Required fields             │
│  └─ Optional fields             │
│                                 │
│  Config: Configuration          │
│  ├─ Display options             │
│  ├─ Filters                     │
│  ├─ Grouping/slicing            │
│  └─ Thresholds                  │
│                                 │
│  Output: Visual Rendering       │
│  └─ Chart, card, table, etc.    │
│                                 │
└─────────────────────────────────┘
```

---

## The Vision: Evolution Path

### Phase 1: Fixed Dashboards (Current)

Dashboards have hardcoded components with fixed data flows:

```
Executive Dashboard
  ├─ KPI Card: Open Risk Score (hardcoded query)
  ├─ KPI Card: Trades Outside SLA (hardcoded query)
  ├─ Priority Table (hardcoded sort, fixed columns)
  └─ Bar Chart: Risk by Counterparty (hardcoded grouping)
```

**Characteristics:**

- Fast to build
- Purpose-specific
- No configuration UI needed
- Validates metrics with users

### Phase 2: Documented Components (Parallel Work)

Extract reusable patterns and document them:

```
Component Library
  ├─ KPI Card (generic: shows any metric with trend)
  ├─ Priority Table (configurable: sort, columns, filters)
  ├─ Bar Chart (configurable: x-axis, y-axis, grouping)
  └─ ... (15-20 components total)
```

**Characteristics:**

- Clear data contracts
- Configuration schemas defined
- Reusable across dashboards
- Foundation for custom dashboards

### Phase 3: Custom Dashboards (Future)

Users can compose dashboards from component library:

```
User Workflow:
  1. "Add Widget"
  2. Select data source: "Trades"
  3. Apply filters: "Last 90 days, Status = Disputed"
  4. Choose visualization: "Stacked Bar Chart"
  5. Configure:
     - Metric: "Break Count"
     - Group by: "Counterparty"
     - Stack by: "Severity"
  6. Widget appears on dashboard
```

**Characteristics:**

- Drag-and-drop builder
- No-code configuration
- Save/share custom dashboards
- Built on Phase 2 components

---

## Component Interface Standards

### 1. Data Interface (Input Contract)

Every component must document its expected data shape.

#### Standard Data Shapes

Define canonical shapes for common patterns:

**Single Metric:**

```typescript
{
  value: number,
  change?: number,
  trend?: 'up' | 'down' | 'flat',
  comparisonPeriod?: string
}
```

**Time Series:**

```typescript
Array<{
  date: string; // ISO date or label
  value: number;
  metadata?: object; // Optional tooltip data
}>;
```

**Ranked List:**

```typescript
Array<{
  label: string;
  value: number;
  rank?: number;
  metadata?: object;
}>;
```

**Grouped/Categorical:**

```typescript
Array<{
  category: string;
  subcategory?: string;
  value: number;
  metadata?: object;
}>;
```

**Tabular Data:**

```typescript
{
  columns: Array<{ key: string, label: string, type: 'string' | 'number' | 'date' }>,
  rows: Array<Record<string, any>>
}
```

#### Documentation Format

Each component specifies:

```markdown
## Component: KPI Card

### Data Interface

Type: Single Metric
Required: value (number)
Optional: change (number), trend (string), comparisonPeriod (string)

Example:
{
value: 14779,
change: 12,
trend: "up",
comparisonPeriod: "vs. last week"
}
```

### 2. Configuration Interface (Props)

Components should accept configuration as props, with sensible defaults.

#### Configuration Categories

**Visual Options:**

- Colors
- Sizes
- Fonts
- Layout orientation

**Data Options:**

- Sort order
- Grouping dimension
- Metric selection
- Filtering criteria

**Behavioral Options:**

- Click handlers
- Hover behaviors
- Animation preferences

**Threshold Options:**

- Warning levels
- Color coding rules
- Target lines

#### Example: Configurable vs Hardcoded

**Bad (tightly coupled):**

```jsx
<KPICard /> // Reaches into global state, hardcoded metric
```

**Good (explicit interface):**

```jsx
<KPICard
  value={14779}
  label="Open Risk Score"
  change={12}
  trend="up"
  comparisonPeriod="vs. last week"
  status="warning"
  threshold={{ warning: 10000, danger: 20000 }}
  onClick={() => navigateToDetail()}
/>
```

**Future (configuration object):**

```jsx
<KPICard
  data={metricData}
  config={{
    label: 'Open Risk Score',
    thresholds: { warning: 10000, danger: 20000 },
    showTrend: true,
    colors: { good: 'green', warning: 'yellow', danger: 'red' },
  }}
/>
```

### 3. Visual Interface (Output)

Components render consistently across the application.

#### Visual Consistency Requirements

- Use design system tokens (colors, spacing, typography)
- Respond to container size (responsive)
- Support light/dark themes
- Handle loading states
- Show empty states gracefully
- Display error states clearly

---

## Component Catalog Structure

### Component Documentation Template

Each component needs comprehensive documentation:

```markdown
# Component Name

## Purpose

One-sentence description of what this component does.

## Data Interface

- Type: [Single Metric | Time Series | Ranked List | etc.]
- Required fields: [list]
- Optional fields: [list]
- Example data structure

## Configuration Options

- [option name]: [type] - [description] - [default value]

## Visual Variants

- Screenshots/examples of different configurations

## Usage Examples

Code examples showing:

- Basic usage
- With filters
- With custom styling
- Edge cases (empty data, loading)

## Used In

List of dashboards where this component appears

## Future Enhancements

Potential configuration options for custom dashboards
```

### Example Component Documentation

```markdown
# KPI Card

## Purpose

Display a single metric with optional trend indicator and comparison to previous period.

## Data Interface

Type: Single Metric
Required: value (number)
Optional: change (number), trend ('up'|'down'|'flat'), comparisonPeriod (string)

Example:
{
value: 14779,
change: 12,
trend: "up",
comparisonPeriod: "vs. last week"
}

## Configuration Options

- label: string - Display label for the metric - Required
- status: 'good'|'warning'|'danger' - Color coding - Default: null
- showTrend: boolean - Display trend arrow - Default: true
- thresholds: { warning: number, danger: number } - Auto-determine status - Default: null
- onClick: function - Click handler - Default: null

## Visual Variants

[Show screenshots of different configurations]

## Usage Examples

Basic:
<KPICard
  value={14779}
  label="Open Risk Score"
/>

With trend:
<KPICard
  value={14779}
  label="Open Risk Score"
  change={12}
  trend="up"
  comparisonPeriod="vs. last week"
/>

With status thresholds:
<KPICard
value={14779}
label="Open Risk Score"
threshold={{ warning: 10000, danger: 20000 }}
/>

## Used In

- Dashboard 1: Executive Overview (Open Risk Score, Trades Outside SLA, etc.)
- Dashboard 4: Template Progress (Coverage %, Electronic Affirmation %)

## Future Enhancements

- Sparkline visualization of trend
- Drill-down click to filtered view
- Comparative display (vs peer average)
```

---

## Component Categories

Organize components by function:

### 1. Metrics Display

- **KPI Card** - Single metric with trend
- **Metrics Grid** - Multiple KPIs in grid layout
- **Gauge** - Progress toward target
- **Score Card** - Composite score with breakdown

### 2. Data Visualization

- **Line Chart** - Time series trends
- **Bar Chart** - Category comparison
- **Stacked Bar Chart** - Category with subcategories
- **Pie/Donut Chart** - Part-to-whole relationships
- **Scatter Plot** - Correlation analysis
- **Heat Map** - Matrix of values with color coding

### 3. Tables & Lists

- **Data Table** - Sortable, filterable tabular data
- **Priority List** - Ranked items with severity
- **Comparison Table** - Side-by-side comparison
- **Expandable Rows** - Master-detail table

### 4. Filters & Controls

- **Date Range Picker** - Select time window
- **Multi-Select Dropdown** - Choose multiple options
- **Search Box** - Text-based filtering
- **Quick Filters** - Preset filter buttons

### 5. Containers & Layout

- **Dashboard Grid** - Responsive grid layout
- **Card Container** - Consistent card wrapper
- **Collapsible Section** - Expandable content area
- **Tab Container** - Tabbed navigation

---

## Configuration Schema Design

For future custom dashboards, each widget instance stores configuration as JSON:

### Widget Configuration Structure

```typescript
{
  // Widget identity
  widgetId: string,
  componentType: string,  // References component from catalog

  // Data source configuration
  dataSource: {
    entity: string,       // "trades", "breaks", "counterparties"
    filters: {
      dateRange: { start: string, end: string },
      status: string[],
      counterparty: string[],
      productType: string[],
      // ... extensible filters
    },
    aggregation: {
      metric: string,     // "count", "sum", "avg", "breakRate"
      groupBy: string,    // Dimension to group on
      stackBy?: string,   // Secondary grouping for stacked viz
      sortBy?: string,
      limit?: number
    }
  },

  // Visualization configuration
  visualization: {
    type: string,         // Component variant if applicable
    config: {
      // Component-specific config options
      // Matches the component's configuration interface
    }
  },

  // Layout (for dashboard builder)
  layout: {
    x: number,
    y: number,
    width: number,
    height: number
  }
}
```

### Example: Configured Stacked Bar Chart Widget

```json
{
  "widgetId": "widget-123",
  "componentType": "StackedBarChart",
  "dataSource": {
    "entity": "trades",
    "filters": {
      "dateRange": { "start": "2025-07-01", "end": "2025-10-01" },
      "status": ["disputed", "confirmed"]
    },
    "aggregation": {
      "metric": "breakCount",
      "groupBy": "counterparty",
      "stackBy": "severity",
      "sortBy": "value",
      "limit": 10
    }
  },
  "visualization": {
    "type": "vertical",
    "config": {
      "colors": {
        "high": "#dc2626",
        "medium": "#eab308",
        "low": "#16a34a"
      },
      "showLegend": true,
      "showValues": true,
      "orientation": "vertical"
    }
  },
  "layout": {
    "x": 0,
    "y": 0,
    "width": 6,
    "height": 4
  }
}
```

---

## Implementation Guidelines

### For Current Prototype Phase

While building fixed dashboards, apply these principles:

#### 1. Use Explicit Props

Pass data explicitly rather than accessing global state inside components:

```jsx
// Current phase: Use explicit props even if data is hardcoded
<BarChart
  data={riskByCounterparty}
  xAxisKey="counterparty"
  yAxisKey="riskScore"
  title="Risk by Counterparty"
  color="#3b82f6"
/>
```

This makes it easy later to replace hardcoded data with user-selected data.

#### 2. Document Configuration Points

When hardcoding, add comments noting what could be configurable:

```jsx
<BarChart
  data={riskByCounterparty}
  xAxisKey="counterparty" // CONFIG: User could select grouping dimension
  yAxisKey="riskScore" // CONFIG: User could select metric to display
  color="#3b82f6" // CONFIG: User could customize color
  sortBy="value" // CONFIG: User could choose sort order
/>
```

#### 3. Extract Reusable Components

When building the second instance of similar functionality, extract to shared component:

```
First instance: KPI card for "Open Risk Score"
Second instance: KPI card for "Trades Outside SLA"
→ Extract: Generic KPI card component
```

#### 4. Keep Data and Display Separate

Components should not fetch their own data. Data fetching/calculation happens outside, components receive data via props.

```jsx
// Bad: Component owns data fetching
function KPICard() {
  const data = useMetrics(); // Fetches inside component
  return <div>{data.openRiskScore}</div>;
}

// Good: Data passed from parent
function KPICard({ value, label }) {
  return (
    <div>
      {label}: {value}
    </div>
  );
}
```

### Building the Component Catalog

As you build the prototype, maintain a component catalog document:

```markdown
# Component Catalog

## Metrics Display

### KPI Card

- Status: ✓ Built
- File: src/components/KPICard.jsx
- Documentation: docs/components/KPICard.md
- Used in: Dashboard 1, Dashboard 4

### Metrics Grid

- Status: ✓ Built
- File: src/components/MetricsGrid.jsx
- Documentation: docs/components/MetricsGrid.md
- Used in: Dashboard 1

## Data Visualization

### Bar Chart

- Status: ✓ Built
- File: src/components/BarChart.jsx
- Documentation: docs/components/BarChart.md
- Used in: Dashboard 1, Dashboard 2, Dashboard 5

### Stacked Bar Chart

- Status: 🚧 In Progress
- File: src/components/StackedBarChart.jsx
- Documentation: docs/components/StackedBarChart.md
- Used in: Dashboard 2

### Line Chart

- Status: ✓ Built
- File: src/components/LineChart.jsx
- Documentation: docs/components/LineChart.md
- Used in: Dashboard 1, Dashboard 4

...
```

---

## Data Interface Layer

Create an abstraction between raw data and components:

### Data Adapters Pattern

Components consume standard shapes. Adapters transform domain data into these shapes:

```javascript
// Adapter: Transform trades into bar chart data
function adaptTradesForBarChart(trades, groupBy, metric) {
  const grouped = groupBy(trades, groupBy);
  return Object.entries(grouped).map(([category, trades]) => ({
    category,
    value: calculateMetric(trades, metric),
    metadata: { count: trades.length },
  }));
}

// Usage
const chartData = adaptTradesForBarChart(
  mockTrades,
  'counterparty',
  'riskScore'
);
<BarChart data={chartData} xAxisKey="category" yAxisKey="value" />;
```

### Standard Aggregation Functions

Create library of reusable aggregation functions:

```javascript
// src/utils/aggregations.js

export function groupBy(array, key) {
  /* ... */
}
export function sumBy(array, key) {
  /* ... */
}
export function averageBy(array, key) {
  /* ... */
}
export function countBy(array, key) {
  /* ... */
}
export function percentileBy(array, key, percentile) {
  /* ... */
}
```

These become building blocks for custom dashboard data pipelines.

---

## What You're NOT Building Yet

Important: This phase is about **foundation**, not the full custom dashboard system.

### Out of Scope for Current Phase

- Drag-and-drop dashboard builder UI
- Widget configuration modal/wizard
- Dashboard save/load functionality
- Widget marketplace or gallery
- Real-time collaboration
- Permission/sharing system
- Widget versioning
- Data source management UI
- Query builder interface

### Why Not Yet

These features require:

- Backend infrastructure
- Authentication/authorization
- Data persistence layer
- More complex state management
- Mature component library to build upon

**Current phase establishes the vocabulary (components) before building the sentence structure (dashboard builder).**

---

## Deliverables for This Phase

### 1. Working Prototype Dashboards

5 functional dashboards with realistic data and interactions.

### 2. Component Library Documentation

For each reusable component:

- Purpose statement
- Data interface specification (TypeScript types or JSON schema)
- Configuration options with defaults
- Usage examples
- Visual examples (screenshots)
- List of where it's currently used

### 3. Data Interface Standards

Document standard data shapes:

- Single Metric
- Time Series
- Ranked List
- Grouped/Categorical
- Tabular Data

### 4. Configuration Schema Template

JSON schema template showing how widgets will be configured in future custom dashboards.

### 5. Component Catalog Index

Master list of all components with status, location, and metadata.

---

## Success Criteria

You'll know this approach is working when:

### Short-term (Prototype Phase)

1. **Reusability evidence:** Same component appears in multiple dashboards
2. **Clear interfaces:** Components have documented data contracts
3. **Configuration flexibility:** Components accept props for customization
4. **Decoupling:** Components don't know about application state structure

### Long-term (Custom Dashboard Phase)

1. **Rapid composition:** New dashboards built by combining existing components
2. **No code changes:** Custom dashboards created through configuration only
3. **Consistent UX:** All widgets follow same patterns and conventions
4. **Extensibility:** New widget types added without breaking existing ones

---

## Implementation Priorities

### Priority 1: Core Components (Build Now)

Components needed for prototype dashboards:

- KPI Card
- Bar Chart (horizontal/vertical)
- Line Chart
- Data Table
- Stacked Bar Chart
- Priority Actions List

Focus: Get these working in fixed dashboards.

### Priority 2: Documentation (Build In Parallel)

As you build each component, document:

- Data interface
- Configuration options
- Usage examples

Focus: Create reusable reference material.

### Priority 3: Standardization (Refactor As Patterns Emerge)

When you build the second instance of something similar:

- Extract common functionality
- Standardize data shapes
- Document the pattern

Focus: Don't premature abstract, but do capture patterns.

### Priority 4: Configuration Schema (Design, Don't Build)

Think through how components would be configured in custom dashboards:

- What options make sense to expose?
- What should have sensible defaults?
- How granular should configuration be?

Focus: Inform component API design, not build the config UI.

---

## Anti-Patterns to Avoid

### 1. Over-Abstraction Too Early

Don't create generic "Chart" component that does everything. Build specific chart types first, extract commonality later.

### 2. Configuration Explosion

Don't make everything configurable. Choose meaningful configuration points. Default to sensible defaults.

### 3. Tight Coupling to Data Source

Components shouldn't know about "trades" or "counterparties". They should work with generic "categories" and "values".

### 4. Premature Optimization

Don't build the configuration UI before you have working components. Foundation first, builder second.

### 5. Skipping Documentation

"I'll document it later" never works. Document interfaces as you build.

---

## Questions for Implementation Team

Consider these questions as you build:

1. **Component Granularity:** How small should components be? When to compose vs create variants?

2. **Configuration Depth:** How many configuration options are too many? Where to draw the line?

3. **Data Transformation:** Should components accept raw data and transform it, or expect pre-transformed data?

4. **Error Handling:** How should components handle invalid data or missing configuration?

5. **Performance:** When does component complexity warrant memoization or virtualization?

6. **Accessibility:** What ARIA labels, keyboard navigation, and screen reader support is needed?

7. **Theming:** How should color schemes, dark mode, and branding work?

8. **Responsive Design:** How should components adapt to different screen sizes?

Discuss these with product/design before making final decisions.

---

## Related Documentation

- **Data Model Documentation** - Schema and data generation
- **Data Strategy** - How prototype uses data
- **Dashboard Specifications** - Requirements for each dashboard
- **Design System** - Visual design tokens and patterns

This component strategy document should be read in conjunction with these materials.

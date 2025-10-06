# Risk Metrics Dashboard Component Migration Strategy

## Overview

We are systematically rebuilding the risk metrics dashboard pages to use **only** components from our design system package (`@float-vibe-foundry/design-system`). This ensures consistency, maintainability, and proper theming across all pages.

## Core Principles

### ✅ DO

- **Use design system components exclusively** - Import from `@float-vibe-foundry/design-system`
- **Follow design system patterns** - Use established component APIs and props
- **Leverage design system theming** - Use semantic color variables (`text-text-primary`, `border-border-tertiary`, etc.)
- **Maintain consistency** - Follow the same patterns used in other packages
- **Ask before modifying** - If a component needs changes, ask for approval first

### ❌ DON'T

- **Create duplicate components** - Don't recreate components that exist in the design system
- **Write custom CSS** - Don't add custom styles or raw Tailwind colors
- **Modify design system components** - Don't change components without explicit approval
- **Add CSS/Tailwind config files** - Use the design system's configuration
- **Work around the design system** - Use the provided components as intended

## Available Design System Components

### Layout & Structure

- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Heading` (typography)
- `Text` (typography)
- `Separator`

### Data Display

- `MetricCard` - For KPI displays with trends and status
- `MetricsTable` - For structured metric lists with optional icons
- `DataTable` - For sortable, searchable data tables
- `Badge` - For status indicators
- `AgedState` - For priority/age indicators

### Charts & Visualizations

- `LineChart` - For trend data
- `AreaChart` - For filled trend data
- `HorizontalBarChart` - For horizontal bar charts
- `StackedBarChart` - For stacked bar charts
- Use chart components directly. Avoid manual `ChartContainer`/`config` unless required by a component API.

### Interactive Elements

- `Button` - All button variants (primary, secondary, outline, ghost, destructive)
- `Input` - Form inputs
- `Select` - Dropdown selections
- `Checkbox`, `RadioGroup` - Form controls
- `Switch` - Toggle switches
- `Tabs` - Tab navigation

### Navigation & Layout

- `Sidebar`, `SidebarNav` - Navigation components
- `OrgSwitcher` - Organization switching
- `Avatar` - User avatars

## Migration Process

### 1. Component Identification

- Identify existing custom components in each page
- Map them to design system equivalents
- Note any missing functionality

### 2. Data Structure Updates

- Update data structures to match design system component APIs
- Ensure proper TypeScript types
- Add required props (icons, labels, etc.)

### 3. Component Replacement

- Replace custom components with design system imports
- Update props to match design system APIs
- Remove custom styling and CSS

### 4. Theming Integration

- Use semantic classes via the Tailwind preset (bg-_, text-_, border-_, fg-_)
- Text vs Icons: use `text-*` for copy; `fg-*` for icons/indicators
- Dark theme: avoid `bg-white`, `bg-*-50`, and light gradients inside cards
- Maintain consistent visual hierarchy

## Pages to Migrate

### Completed ✅

- `dashboard_executive.tsx` - Executive Risk Dashboard

### Pending 🔄

- `dashboard_activity.tsx` - Trading Activity Dashboard
- `dashboard_counterparty.tsx` - Counterparty Risk Dashboard
- `dashboard_risk_deepdive.tsx` - Risk Deep Dive Dashboard
- `dashboard_template_progress.tsx` - Template Progress Dashboard

## Common Patterns

### KPI Cards

```typescript
import { MetricCard } from '@float-vibe-foundry/design-system';

<MetricCard
  title="Metric Name"
  value="1,234"
  subValue="56%"
  change={12}
  trend="up"
  comparison="vs. last week"
  status="good"
/>
```

### Metrics Tables

```typescript
import { MetricsTable } from '@float-vibe-foundry/design-system';

<MetricsTable
  title="Section Title:"
  items={[
    { name: 'Item 1', value: 100, percentage: 25, icon: <IconName size={16} /> },
    { name: 'Item 2', value: 200, percentage: 50, label: 'units' }
  ]}
  showRanking={true}
/>
```

### Data Tables

```typescript
import { DataTable, SortableColumnHeader, AgedState } from '@float-vibe-foundry/design-system';

<DataTable
  columns={columns}
  data={data}
  searchKey="field"
  searchPlaceholder="Search..."
  showPagination={true}
  showSearch={true}
/>
```

### Charts

```typescript
import { LineChart, HorizontalBarChart } from '@float-vibe-foundry/design-system';

<Card>
  <CardHeader>
    <CardTitle>Chart Title</CardTitle>
    <CardDescription>Chart description</CardDescription>
  </CardHeader>
  <CardContent>
    <LineChart
      data={chartData}
      dataKeys={[{ key: 'value', label: 'Label', color: 'var(--color-brand-600)' }]}
      xAxisKey="label"
      height={300}
    />
  </CardContent>
</Card>
```

## Approval Process

### Before Modifying Design System Components

1. **Identify the need** - What functionality is missing?
2. **Propose the solution** - How should the component be modified?
3. **Wait for approval** - Don't proceed without explicit permission
4. **Implement changes** - Make approved modifications
5. **Update documentation** - Document any new props or features

### Example Approval Request

```
I need to modify the [ComponentName] component because [reason].

Proposed changes:
- Add [new prop] to support [functionality]
- Modify [existing prop] to handle [use case]

Would you like me to proceed with these changes?
```

## Success Criteria

- ✅ All pages use only design system components
- ✅ No custom CSS or styling
- ✅ Consistent theming across all pages
- ✅ Proper TypeScript support
- ✅ All components follow design system patterns
- ✅ No duplicate functionality
- ✅ Maintainable and scalable codebase

## Next Steps

1. **Review this document** - Ensure understanding of approach
2. **Identify next page** - Choose which dashboard to migrate next
3. **Follow the process** - Use the established patterns
4. **Ask for approval** - When modifications are needed
5. **Maintain consistency** - Follow the same patterns throughout

---

_This document serves as the single source of truth for our component migration strategy. Follow these guidelines to ensure successful, consistent implementation across all risk metrics dashboard pages._

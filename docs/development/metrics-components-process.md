# Metrics Components Development Process

## Overview

This document outlines the systematic process for adding new metrics dashboard components to the Float Design System, following our established patterns and leveraging shadcn/ui as the foundation.

## Process Steps

### 1. Identify shadcn Base Component

**Goal**: Find the most appropriate shadcn/ui component that matches our needs.

**Process**:
- Research shadcn/ui component library for the closest match
- Consider functionality, accessibility, and structure
- If unsure, ask the team for guidance on which shadcn component to use

**Examples**:
- KPI Card → shadcn Card component
- Data Table → shadcn Table component  
- Charts → shadcn doesn't have charts, so we'd use a charting library
- Priority Actions List → shadcn List or shadcn Table component

### 2. Apply Design System Styling

**Goal**: Replace shadcn's default styling with our design system tokens.

**Process**:
- Study existing components (Button, Select, Badge, etc.) to understand the pattern
- Follow the design system documentation guidelines
- Use CSS variables for component-specific styling
- Use Tailwind classes for global semantic colors

**Styling Guidelines** (from components.md):

**Use Tailwind classes for global semantic colors:**
```tsx
// ✅ Use Tailwind for global semantic colors
className={cn(
  'bg-bg-primary',           // Instead of bg-[var(--bg-primary)]
  'text-text-secondary',     // Instead of text-[var(--text-secondary)]
  'border-border-error'       // Instead of border-[var(--border-error)]
)}
```

**Keep CSS variables for component-specific styling:**
```tsx
// ✅ Keep CSS variables for component-specific needs
className={cn(
  'bg-[var(--button-bg-primary)]',      // Component-specific
  'shadow-[var(--dropdown-shadow)]',     // Complex shadow value
  'opacity-[var(--input-opacity-disabled)]' // Dynamic opacity
)}
```

**Required Import Pattern**:
```tsx
import { cn } from '../../lib/utils';
```

**Component Implementation Standards**:
- Use `React.forwardRef` for proper ref handling
- Use TypeScript interfaces for props
- Include proper JSDoc comments
- Follow established naming conventions

### 3. Add to Component Showcase

**Goal**: Make the component discoverable and testable in the design system.

**Process**:
- Update `/packages/design-system/src/app/components/page.tsx`
- Follow the existing pattern used for Badge, Button, etc.
- Add examples showing different variants and use cases
- Ensure the component is properly exported from the index files

**Export Requirements**:
1. Export from component file: `export { ComponentName } from './component-name';`
2. Add to `/packages/design-system/src/components/ui/index.ts`
3. Add to main exports in `/packages/design-system/src/index.ts`

## Component Creation Policy

**IMPORTANT**: 
- **DO NOT create new components unless explicitly requested**
- Always ask before implementing new components
- Focus on updating and modifying existing components when possible
- If a component doesn't exist, propose the need and wait for approval

## Quality Checklist

Before considering a component complete:

- [ ] Uses shadcn/ui as the foundation
- [ ] Applies design system tokens correctly
- [ ] Follows established styling patterns
- [ ] Uses `React.forwardRef` for ref handling
- [ ] Includes TypeScript interfaces
- [ ] Has proper JSDoc comments
- [ ] Is added to component showcase page
- [ ] Is properly exported from index files
- [ ] Follows accessibility best practices
- [ ] Is responsive and theme-aware
- [ ] Maintains backward compatibility

## Examples of Success

**Good Examples**:
- Button component: Uses shadcn ButtonPrimitive, applies design system colors
- Select component: Uses shadcn SelectPrimitive, applies design system styling
- Badge component: Uses shadcn patterns, applies design system variants

**What to Avoid**:
- Creating components from scratch without shadcn foundation
- Using hardcoded colors instead of design system tokens
- Skipping the component showcase page
- Not following the established export patterns

## Questions to Ask

When implementing a new component:

1. **Which shadcn component should I use as the base?**
2. **Are there any conflicting patterns in the documentation?**
3. **Should this component have variants (like Button does)?**
4. **What are the expected props and data interface?**
5. **How should this component integrate with the existing showcase page?**

## Specific Component Guidance

### KPI Card Component

**Step 1: Extract Metric Card from shadcn Dashboard**
- Added shadcn dashboard-01 to get the base structure
- Extracted just the metric card pattern (not the entire dashboard)
- Based on shadcn's Card, CardHeader, CardTitle, and CardContent components

**Step 2: Apply Design System Styling**
- ✅ Use Tailwind classes for global semantic colors: `bg-bg-primary`, `text-text-secondary`
- ✅ Use CSS variables for component-specific styling: `bg-[var(--card-bg-default)]`
- Follow the same patterns used in Button, Card, Badge, and other components

**Step 3: Create MetricCard Component**
- Simple props interface: `title`, `value`, `description`, `icon`
- Uses existing Card components from design system
- Applied design system tokens for colors and spacing
- Added to component exports and created example

**Implementation**:
```tsx
// Basic usage
<MetricCard
  title="Total Revenue"
  value="$45,231.89"
  description="+20.1% from last month"
  icon={<DollarSign />}
/>
```

**Design System Integration**:
- Uses existing Card component from design system as base
- Applies design system tokens for colors and spacing
- Follows established patterns from Button, Badge, and other components
- Proper TypeScript interfaces and React.forwardRef

## Resources

- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [shadcn dashboard-01](https://ui.shadcn.com/docs/components/dashboard-01)
- [Design System Components Documentation](../design-system/components.md)
- [Design System Themes Documentation](../design-system/themes.md)
- [Existing Component Examples](../../packages/design-system/src/components/ui/)
- [Current KPI Implementation](../../packages/risk-metrics/src/app/dashboard_executive.tsx)

---

**Last Updated**: December 2024  
**Next Review**: When adding new component types

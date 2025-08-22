# Component Development Guidelines for Float Prototype Library

## 🎯 Overview

This document provides comprehensive guidelines for building, updating, and maintaining components in the Float Prototype Library. These guidelines ensure consistency, maintainability, and adherence to our design system standards.

**IMPORTANT**: This document is designed to be read and followed by LLM coding assistants. Follow these guidelines precisely when working with components.

## 🚫 Critical Rules

### 1. Component Creation Policy

- **DO NOT create new components unless explicitly requested by the user**
- **ALWAYS ask before implementing new components**
- Focus on updating and modifying existing components when possible
- If a component doesn't exist, propose the approach and wait for approval

### 2. Component Modification Policy

- **DO NOT make significant changes to existing components without user approval**
- Small bug fixes and improvements are acceptable
- Major refactoring requires explicit permission

## 🎨 Design System Architecture

### Color System Standards

Our design system uses a **hybrid hex+RGBA approach**:

#### **Solid Colors (Hex)**

```css
/* Use hex codes for solid colors */
--color-brand-700: #4a49a6;
--color-gray-900: #1a1a1e;
--color-error-600: #bd3e1e;
```

#### **Transparent Colors (RGBA)**

```css
/* Use RGBA for colors requiring opacity */
--text-primary: rgba(26, 26, 30, 0.87); /* 87% opacity */
--text-secondary: rgba(26, 26, 30, 0.6); /* 60% opacity */
--border-primary: rgba(228, 228, 231, 0.8); /* 80% opacity */
```

#### **Tailwind Integration**

- **Use semantic Tailwind classes** instead of CSS variables when possible
- **Preferred**: `bg-bg-brand-primary`
- **Avoid**: `bg-[var(--bg-brand-primary)]`
- **Exception**: Use CSS variables only for complex values that can't be Tailwind classes

### Typography System

- **Headings**: Use semantic heading components (`<Heading level={1}>`)
- **Body Text**: Use semantic text components (`<Text variant="body">`)
- **Font Weights**: Use Tailwind font weight classes (`font-normal`, `font-medium`, `font-semibold`)
- **Font Sizes**: Use Tailwind text size classes (`text-sm`, `text-base`, `text-lg`)

### Spacing System

- **Use Tailwind spacing scale**: `p-4`, `m-6`, `gap-8`, etc.
- **Consistent spacing**: 4px base unit (Tailwind's default)
- **Responsive spacing**: Use responsive prefixes (`p-4 md:p-6 lg:p-8`)

## 🧩 Component Structure Standards

### File Organization

**All components are located in the design system package:**

```
packages/design-system/src/components/ui/
├── component-name/
│   ├── component-name.tsx      # Main component
│   ├── component-name.stories.tsx  # Storybook stories (if applicable)
│   └── index.ts               # Export file
```

**Important Notes:**

- **All UI components** are in `packages/design-system/src/components/ui/`
- **Typography components** are in `packages/design-system/src/components/typography/`
- **Theme system** is in `packages/design-system/src/themes/`
- **No components exist outside the packages directory**

### Component Template

```tsx
'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Define component variants using cva
const componentVariants = cva(
  // Base classes - always applied
  'base-classes-here',
  {
    variants: {
      variant: {
        default: 'default-variant-classes',
        secondary: 'secondary-variant-classes',
      },
      size: {
        default: 'default-size-classes',
        sm: 'small-size-classes',
        lg: 'large-size-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Component interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props here
}

// Main component
export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';
```

### Required Imports

```tsx
// Always include these imports
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// For form components, include:
import { forwardRef } from 'react';
```

## 🎨 Styling Standards

### CSS Class Naming

- **Use Tailwind utility classes** for styling
- **Use semantic class names** for custom CSS when needed
- **Follow BEM methodology** for custom CSS: `.component__element--modifier`

### Color Usage

```tsx
// ✅ CORRECT: Use semantic Tailwind classes
className = 'bg-bg-primary text-text-primary border-border-primary';

// ❌ INCORRECT: Use CSS variables directly
className = 'bg-[var(--bg-primary)] text-[var(--text-primary)]';

// ✅ CORRECT: Use Tailwind color utilities
className = 'bg-blue-500 text-white hover:bg-blue-600';

// ✅ CORRECT: Use CSS variables for complex values
className = 'bg-[var(--complex-gradient)]';
```

### Responsive Design

```tsx
// Use Tailwind responsive prefixes
className = 'p-4 md:p-6 lg:p-8';
className = 'text-sm md:text-base lg:text-lg';
className = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
```

### Dark Mode Support

```tsx
// Use semantic color classes that automatically support themes
className = 'bg-bg-primary text-text-primary';

// Avoid hardcoded colors that don't support theme switching
className = 'bg-white text-black'; // ❌ Don't do this
```

## 🔧 Component Development Workflow

### 1. Component Analysis

Before making changes, analyze the existing component:

- [ ] Review current implementation
- [ ] Identify styling patterns
- [ ] Check for existing variants
- [ ] Review accessibility features

### 2. Implementation Steps

1. **Backup**: Ensure you can revert changes if needed
2. **Plan**: Document what changes will be made
3. **Implement**: Make changes incrementally
4. **Test**: Verify functionality and appearance
5. **Document**: Update any relevant documentation

### 3. Testing Requirements

- [ ] Component renders without errors
- [ ] All variants display correctly
- [ ] Responsive behavior works
- [ ] Theme switching functions properly
- [ ] Accessibility features maintained

## 📱 Responsive Design Standards

### Breakpoint Strategy

```tsx
// Use Tailwind's default breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
2xl: 1536px // 2X large devices
```

### Mobile-First Approach

```tsx
// Start with mobile styles, then enhance for larger screens
className = 'p-4 md:p-6 lg:p-8'; // Padding increases with screen size
className = 'text-sm md:text-base'; // Text size increases with screen size
className = 'block md:flex'; // Layout changes with screen size
```

## ♿ Accessibility Standards

### Required Accessibility Features

- [ ] **Semantic HTML**: Use appropriate HTML elements
- [ ] **ARIA Labels**: Provide descriptive labels for interactive elements
- [ ] **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- [ ] **Focus Management**: Maintain visible focus indicators
- [ ] **Color Contrast**: Meet WCAG AA standards (4.5:1 ratio)

### Accessibility Examples

```tsx
// ✅ CORRECT: Proper button with accessibility
<button
  className="btn btn-primary"
  aria-label="Submit form"
  onClick={handleSubmit}
>
  Submit
</button>

// ✅ CORRECT: Proper form input with label
<label htmlFor="email" className="block text-sm font-medium">
  Email Address
</label>
<input
  id="email"
  type="email"
  className="input-field"
  aria-describedby="email-help"
/>
<div id="email-help" className="text-sm text-text-secondary">
  We'll never share your email with anyone else.
</div>
```

## 🧪 Testing Standards

### Component Testing Checklist

- [ ] **Visual Testing**: Component renders correctly in all variants
- [ ] **Functional Testing**: All interactions work as expected
- [ ] **Responsive Testing**: Component works on all screen sizes
- [ ] **Theme Testing**: Component works in light and dark themes
- [ ] **Accessibility Testing**: Meets accessibility standards

### Testing Tools

- **Playwright MCP**: For debugging and validation during development
- **Playwright**: for comprehensive test coverage once components are stable
- **Browser DevTools**: For responsive design testing
- **Accessibility Audits**: For WCAG compliance

## 📚 Documentation Requirements

### Component Documentation

Each component should include:

- [ ] **Purpose**: What the component is for
- [ ] **Props**: All available props with types and descriptions
- [ ] **Variants**: Available variants and their use cases
- [ ] **Examples**: Usage examples in different scenarios
- [ ] **Accessibility**: Accessibility features and considerations

### Code Comments

```tsx
/**
 * Button component with multiple variants and sizes
 *
 * @param variant - Visual style variant (default, secondary, outline)
 * @param size - Size variant (sm, default, lg)
 * @param disabled - Whether the button is disabled
 * @param children - Button content
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'default', size = 'default', disabled, children, ...props },
    ref
  ) => {
    // Component implementation
  }
);
```

## 🚨 Common Pitfalls to Avoid

### 1. Styling Mistakes

- ❌ **Don't use hardcoded colors**: `bg-white`, `text-black`
- ❌ **Don't mix CSS variables and Tailwind inconsistently**
- ❌ **Don't create components without proper variants**

### 2. Implementation Mistakes

- ❌ **Don't forget to forward refs** for form components
- ❌ **Don't ignore responsive design**
- ❌ **Don't skip accessibility features**

### 3. Testing Mistakes

- ❌ **Don't assume components work without testing**
- ❌ **Don't ignore theme switching testing**
- ❌ **Don't skip responsive design testing**

## 🔄 Update Workflow

### When Updating Existing Components

1. **Analyze**: Understand current implementation
2. **Plan**: Document proposed changes
3. **Implement**: Make changes incrementally
4. **Test**: Verify no regressions
5. **Document**: Update relevant documentation

### When Fixing Bugs

1. **Reproduce**: Ensure you can reproduce the issue
2. **Identify**: Find the root cause
3. **Fix**: Implement the fix
4. **Test**: Verify the fix works
5. **Verify**: Ensure no new issues introduced

## 📖 Reference Resources

### Design System Files

- `packages/design-system/src/app/globals-consolidated.css` - Color definitions and theme variables
- `packages/design-system/tailwind.config.js` - Tailwind configuration and custom colors
- `packages/design-system/src/lib/utils.ts` - Utility functions including `cn()`
- `packages/design-system/src/themes/` - Theme system files

### Component Examples

- `packages/design-system/src/components/ui/button.tsx` - Button component implementation
- `packages/design-system/src/components/ui/card.tsx` - Card component implementation
- `packages/design-system/src/components/ui/dropdown-menu.tsx` - Dropdown component implementation

### Testing Examples

- `tests/color-system.spec.ts` - Color system testing examples
- `tests/components/` - Component testing examples

## ✅ Checklist for New Components

Before creating a new component, ensure:

- [ ] **User approval** has been given
- [ ] **Design requirements** are clear
- [ ] **Existing components** don't meet the need
- [ ] **Accessibility requirements** are understood
- [ ] **Testing strategy** is planned

## ✅ Checklist for Component Updates

Before updating an existing component, ensure:

- [ ] **Change scope** is clearly defined
- [ ] **Backup plan** is in place
- [ ] **Testing approach** is planned
- [ ] **Documentation updates** are planned
- [ ] **User approval** is obtained for significant changes

---

## 🎯 Summary for LLM Assistants

**Remember these key points when working with components:**

1. **NEVER create components without explicit user request**
2. **ALWAYS use semantic Tailwind classes for colors** (e.g., `bg-bg-primary`)
3. **Follow the component template structure** exactly
4. **Test thoroughly** before considering work complete
5. **Ask for clarification** if requirements are unclear
6. **Use the established design system patterns** consistently

**This document is your primary reference for all component-related work. Follow it precisely.**

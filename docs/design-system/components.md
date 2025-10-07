# Design System Components

The Float Vibe Foundry design system provides a comprehensive set of React components built with Radix UI primitives and styled with our custom design system tokens.

## 🎯 Overview

Our component library follows these principles:

- **Accessible by default** - Built on Radix UI primitives
- **Customizable** - Theme-aware with our hex+RGBA color system
- **Type-safe** - Full TypeScript support
- **Consistent** - Unified design tokens and patterns

## 📦 Installation

The design system is available as a workspace package:

```bash
# Already included in the monorepo
import { Button, Card, useTheme } from '@float-vibe-foundry/design-system';
```

## 🎨 Component Categories

### Form Components

- **Button** - Primary and variants (primary, gray, outline, ghost, destructive)
- **Input** - Text input with validation states
- **Checkbox** - Checkbox with custom styling
- **Radio Group** - Radio button groups
- **Select** - Dropdown select component
- **Textarea** - Multi-line text input
- **Switch** - Toggle switch component
- **Slider** - Range slider component

### Layout Components

- **Card** - Container with header, content, and footer
- **Aspect Ratio** - Maintain aspect ratio for content
- **Separator** - Visual divider
- **Container** - Responsive container

### Navigation Components

- **Sidebar** - Collapsible sidebar navigation
- **Breadcrumb** - Navigation breadcrumbs
- **Nav** - Navigation menu
- **Tabs** - Tabbed interface

### Feedback Components

- **Alert** - Status and error messages
- **Toast** - Notification system
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders

### Overlay Components

- **Dialog** - Modal dialogs
- **Popover** - Contextual overlays
- **Tooltip** - Hover tooltips
- **Hover Card** - Rich hover cards
- **Sheet** - Slide-out panels

### Data Display

- **Avatar** - User avatars
- **Badge** - Status badges
- **Calendar** - Date picker
- **Data Table** - Tabular data

## 🚀 Quick Start

### Basic Usage

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@float-vibe-foundry/design-system';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Theme Integration

```tsx
import { useTheme } from '@float-vibe-foundry/design-system';

function ThemeAwareComponent() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <Button onClick={() => setTheme('dark')}>Switch to Dark Mode</Button>
    </div>
  );
}
```

## 🎨 Component Examples

### Button Variants

```tsx
import { Button } from '@float-vibe-foundry/design-system';

function ButtonExamples() {
  return (
    <div className="space-x-4">
      <Button variant="primary">Primary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="gray">Gray</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Form Components

```tsx
import {
  Input,
  Label,
  Checkbox,
  Select,
} from '@float-vibe-foundry/design-system';

function FormExample() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>

      <Select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    </form>
  );
}
```

### Layout Components

```tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@float-vibe-foundry/design-system';

function LayoutExample() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the content of card 1.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the content of card 2.</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 🎨 Styling and Theming

### Design System Color Architecture

Our design system uses a **hybrid hex+RGBA approach** organized in semantic layers:

```typescript
// Structure in tailwind.config.js
colors: {
  // Solid colors as hex (when transparency not needed)
  gray: { 25: "#fcfcfc", 50: "#fafafa", ... },
  brand: { 700: "#4a49a6", 800: "#343688", ... },
  error: { 600: "#bd3e1e", 700: "#99371e", ... },

  // Semantic colors with transparency as RGBA
  text: {
    primary: "rgba(26, 26, 30, 0.87)",    // 87% opacity
    secondary: "rgba(26, 26, 30, 0.60)",  // 60% opacity
    tertiary: "rgba(26, 26, 30, 0.32)"    // 32% opacity
  },
  border: {
    primary: "rgba(228, 228, 231, 1.0)",   // Solid
    secondary: "rgba(228, 228, 231, 0.8)", // 80% opacity
    tertiary: "rgba(228, 228, 231, 0.6)"   // 60% opacity
  }
}
```

### CSS Variables

Components use CSS variables for component-specific styling:

```css
:root {
  /* Component-specific variables that need transparency */
  --button-bg-primary: var(--color-brand-700);
  --input-border: var(--border-secondary);
  --dropdown-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.08);
}
```

### Tailwind Classes

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

### Custom Styling

You can customize components using Tailwind classes:

```tsx
// Override default styles
<Button className="bg-bg-brand-solid hover:bg-bg-brand-solid-hover text-fg-white">
  Custom Blue Button
</Button>

// Extend with additional styles
<Card className="border-2 border-dashed border-border-tertiary">
  <CardContent>Custom bordered card</CardContent>
</Card>
```

## 🔧 Component Props

### Common Props

Most components accept these common props:

```tsx
interface CommonProps {
  className?: string; // Additional CSS classes
  children?: React.ReactNode; // Component content
  disabled?: boolean; // Disable the component
  'aria-label'?: string; // Accessibility label
}
```

### Button Props

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gray' | 'ghost' | 'outline' | 'link' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'iconSm' | 'iconMd' | 'iconLg';
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  color?: 'brand' | 'error' | 'warning' | 'success';
  iconOnly?: boolean;
}
```

### Input Props

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Inherits all standard input props
}
```

## 🎯 Best Practices

### Accessibility

- All components are built on Radix UI primitives for accessibility
- Use proper ARIA labels and descriptions
- Ensure keyboard navigation works
- Test with screen readers

### Performance

- Use React.memo for expensive components
- Lazy load components when possible
- Optimize bundle size with tree shaking

### Styling

- **Use Tailwind classes for global semantic colors** (`bg-bg-primary`, `text-text-secondary`)
- **Keep CSS variables for component-specific styling** (`bg-[var(--button-bg-primary)]`)
- Use design tokens instead of hardcoded values
- Keep component styles scoped and modular

## 🔍 Component Development

### Component Creation Policy

**IMPORTANT**:

- **DO NOT create new components unless explicitly requested**
- Always ask before implementing new components
- Focus on updating and modifying existing components when possible
- If a component doesn't exist, propose the need and wait for approval

### Creating New Components

1. **Create the component file:**

   ```tsx
   // packages/design-system/src/components/ui/my-component.tsx
   import React from 'react';
   import { cn } from '../../lib/utils';

   interface MyComponentProps {
     className?: string;
     children?: React.ReactNode;
   }

   function MyComponent({ className, children }: MyComponentProps) {
     return <div className={cn('base-styles', className)}>{children}</div>;
   }

   export { MyComponent };
   ```

2. **Export from index:**

   ```tsx
   // packages/design-system/src/components/ui/index.ts
   export { MyComponent } from './my-component';
   ```

3. **Add to main exports:**
   ```tsx
   // packages/design-system/src/index.ts
   export { MyComponent } from './components/ui';
   ```

### Required Import Pattern

**Always import the `cn` utility for class merging:**

```tsx
import { cn } from '../../lib/utils';
```

**Import theme utilities for consistent color handling:**

```tsx
import { ThemeColor, ComponentVariant } from '../../lib/theme-utils';
```

**Import component-specific constants when available:**

```tsx
import {
  BUTTON_COLORS,
  type ButtonVariant,
} from '../../styles/constants/button-colors';
```

### Component Implementation Standards

**Use `React.forwardRef` for proper ref handling:**

```tsx
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(baseClasses, className)} {...props}>
        {children}
      </div>
    );
  }
);
```

**Use the `cn` utility for combining classes:**

```tsx
const classes = cn(
  baseComponentClasses,
  variantClasses[variant],
  className // Allow custom className override
);
```

### Component Guidelines

- Use TypeScript interfaces for props
- Include proper JSDoc comments
- Follow the established naming conventions
- Test with different themes and states
- Ensure responsive design
- **Maintain backward compatibility** when updating existing components
- **Use established patterns** for variants, colors, and theming

## 📚 Resources

- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

---

**Need help?** Check the [troubleshooting guide](../troubleshooting/common-issues.md) or create an issue in the repository.

# Design System Components

The Float Vibe Foundry design system provides a comprehensive set of React components built with Radix UI primitives and styled with Tailwind CSS.

## 🎯 Overview

Our component library follows these principles:
- **Accessible by default** - Built on Radix UI primitives
- **Customizable** - Theme-aware with CSS variables
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
- **Button** - Primary, secondary, and variant buttons
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
import { Button, Card, CardContent, CardHeader, CardTitle } from '@float-vibe-foundry/design-system';

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
      <Button onClick={() => setTheme('dark')}>
        Switch to Dark Mode
      </Button>
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
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Form Components

```tsx
import { Input, Label, Checkbox, Select } from '@float-vibe-foundry/design-system';

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
import { Card, CardContent, CardHeader, CardTitle } from '@float-vibe-foundry/design-system';

function LayoutExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

### CSS Variables

All components use CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... dark mode overrides */
}
```

### Tailwind Classes

Components use Tailwind CSS utility classes:

```tsx
// Example of component styling
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Custom Button
</Button>
```

### Custom Styling

You can customize components using Tailwind classes:

```tsx
// Override default styles
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Custom Blue Button
</Button>

// Extend with additional styles
<Card className="border-2 border-dashed border-gray-300">
  <CardContent>Custom bordered card</CardContent>
</Card>
```

## 🔧 Component Props

### Common Props

Most components accept these common props:

```tsx
interface CommonProps {
  className?: string;        // Additional CSS classes
  children?: React.ReactNode; // Component content
  disabled?: boolean;        // Disable the component
  'aria-label'?: string;     // Accessibility label
}
```

### Button Props

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
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

- Use design tokens instead of hardcoded values
- Prefer Tailwind utility classes over custom CSS
- Keep component styles scoped and modular

## 🔍 Component Development

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
     return (
       <div className={cn('base-styles', className)}>
         {children}
       </div>
     );
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

### Component Guidelines

- Use TypeScript interfaces for props
- Include proper JSDoc comments
- Follow the established naming conventions
- Test with different themes and states
- Ensure responsive design

## 📚 Resources

- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

---

**Need help?** Check the [troubleshooting guide](../troubleshooting/common-issues.md) or create an issue in the repository. 
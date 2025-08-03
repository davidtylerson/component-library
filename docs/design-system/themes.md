# Theme System

The Float Vibe Foundry theme system provides a flexible and powerful way to manage design tokens, color schemes, and theme switching across your applications.

## 🎯 Overview

Our theme system features:
- **Light and dark mode support** - Automatic theme switching
- **CSS variables** - Dynamic theming with CSS custom properties
- **Design tokens** - Consistent spacing, colors, and typography
- **TypeScript support** - Type-safe theme configuration
- **Next.js integration** - Optimized for App Router and Pages Router

## 🚀 Quick Start

### Basic Theme Usage

```tsx
import { useTheme, ThemeProvider } from '@float-vibe-foundry/design-system';

function App() {
  return (
    <ThemeProvider>
      <MyApp />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, setTheme, isDark } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  );
}
```

### Next.js App Router Setup

```tsx
// app/layout.tsx
import { ThemeProvider } from '@float-vibe-foundry/design-system';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 🎨 Theme Configuration

### CSS Variables

The theme system uses CSS custom properties for dynamic theming:

```css
:root {
  /* Background colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  
  /* Primary colors */
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  
  /* Secondary colors */
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Muted colors */
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  /* Accent colors */
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* Destructive colors */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  
  /* Border colors */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  
  /* Radius */
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

### Using CSS Variables

```tsx
// In your components
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Primary Text</h1>
  <p className="text-muted-foreground">Muted text</p>
</div>
```

## 🔧 Theme Hooks and Components

### useTheme Hook

The main hook for theme management:

```tsx
import { useTheme } from '@float-vibe-foundry/design-system';

function ThemeExample() {
  const { 
    theme,           // Current theme: 'light' | 'dark' | 'system'
    setTheme,        // Function to change theme
    isDark,          // Boolean: true if dark mode is active
    systemTheme,     // System preference: 'light' | 'dark'
    resolvedTheme    // Resolved theme: 'light' | 'dark'
  } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDark ? 'Yes' : 'No'}</p>
      <p>System preference: {systemTheme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### ThemeProvider Component

The provider component that enables theme functionality:

```tsx
import { ThemeProvider } from '@float-vibe-foundry/design-system';

function App() {
  return (
    <ThemeProvider
      attribute="class"           // HTML attribute to apply theme
      defaultTheme="system"       // Default theme
      enableSystem={true}         // Enable system theme detection
      disableTransitionOnChange   // Disable transitions during theme change
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Theme Toggle Component

A pre-built theme toggle component:

```tsx
import { ThemeToggle } from '@float-vibe-foundry/design-system';

function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

## 🎨 Custom Themes

### Creating Custom Themes

You can create custom themes by extending the CSS variables:

```css
/* Custom theme: Ocean */
[data-theme="ocean"] {
  --background: 200 50% 95%;
  --foreground: 200 50% 10%;
  --primary: 200 70% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 200 30% 85%;
  --secondary-foreground: 200 50% 20%;
  /* ... more custom variables */
}

[data-theme="ocean"][data-theme-mode="dark"] {
  --background: 200 50% 10%;
  --foreground: 200 50% 90%;
  --primary: 200 70% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 200 30% 20%;
  --secondary-foreground: 200 50% 80%;
  /* ... dark mode overrides */
}
```

### Using Custom Themes

```tsx
import { useTheme } from '@float-vibe-foundry/design-system';

function CustomThemeExample() {
  const { setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('ocean')}>
        Switch to Ocean Theme
      </button>
      <button onClick={() => setTheme('light')}>
        Switch to Light Theme
      </button>
    </div>
  );
}
```

## 🎯 Theme-Aware Components

### Conditional Styling

```tsx
import { useTheme } from '@float-vibe-foundry/design-system';

function ThemeAwareComponent() {
  const { isDark } = useTheme();
  
  return (
    <div className={cn(
      'p-4 rounded-lg',
      isDark 
        ? 'bg-gray-800 text-white border-gray-700' 
        : 'bg-white text-gray-900 border-gray-200'
    )}>
      <h2>Theme-Aware Component</h2>
      <p>This component adapts to the current theme.</p>
    </div>
  );
}
```

### CSS-in-JS with Theme

```tsx
import { useTheme } from '@float-vibe-foundry/design-system';

function StyledComponent() {
  const { isDark } = useTheme();
  
  const styles = {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    color: isDark ? '#f9fafb' : '#111827',
    border: isDark ? '1px solid #374151' : '1px solid #d1d5db',
  };
  
  return (
    <div style={styles}>
      <p>Styled with CSS-in-JS</p>
    </div>
  );
}
```

## 🔧 Advanced Configuration

### Custom Theme Provider

```tsx
import { createThemeProvider } from '@float-vibe-foundry/design-system';

const CustomThemeProvider = createThemeProvider({
  themes: ['light', 'dark', 'ocean'],
  defaultTheme: 'system',
  storageKey: 'my-app-theme',
  attribute: 'data-theme',
});

function App() {
  return (
    <CustomThemeProvider>
      <YourApp />
    </CustomThemeProvider>
  );
}
```

### Theme Persistence

The theme system automatically persists the user's preference:

```tsx
// Theme is stored in localStorage by default
// You can customize the storage key:
<ThemeProvider storageKey="my-custom-theme-key">
  <YourApp />
</ThemeProvider>
```

### Server-Side Rendering

For Next.js App Router, use the client wrapper:

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from '@float-vibe-foundry/design-system';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## 🎨 Design Tokens

### Color Tokens

```css
/* Brand colors */
--brand-50: 210 40% 98%;
--brand-100: 210 40% 96%;
--brand-500: 222.2 47.4% 11.2%;
--brand-900: 222.2 84% 4.9%;

/* Semantic colors */
--success: 142 76% 36%;
--warning: 38 92% 50%;
--error: 0 84% 60%;
--info: 217 91% 60%;
```

### Spacing Tokens

```css
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-4: 1rem;
--spacing-8: 2rem;
--spacing-16: 4rem;
```

### Typography Tokens

```css
--font-family-sans: ui-sans-serif, system-ui, sans-serif;
--font-family-mono: ui-monospace, SFMono-Regular, monospace;

--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
```

## 🚨 Troubleshooting

### Common Issues

**Theme not switching:**
- Ensure `ThemeProvider` wraps your app
- Check that CSS variables are properly defined
- Verify the `attribute` prop matches your CSS selectors

**Hydration errors:**
- Add `suppressHydrationWarning` to the `<html>` element
- Use the client wrapper pattern for Next.js App Router

**Theme not persisting:**
- Check localStorage permissions
- Verify the `storageKey` is unique
- Ensure the theme provider is mounted before accessing theme

### Debug Mode

Enable debug mode to see theme changes in the console:

```tsx
<ThemeProvider enableDebug={true}>
  <YourApp />
</ThemeProvider>
```

## 📚 Resources

- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens](https://www.designtokens.org/)

---

**Need help?** Check the [troubleshooting guide](../troubleshooting/common-issues.md) or create an issue in the repository. 
# Theme Usage Guide

This guide explains how to use the theme system in the Float Design System.

## Quick Start

### 1. Install the Package

```bash
npm install @tydavidson/design-system
```

### 2. Import CSS

```tsx
// In your main CSS file or layout
import '@tydavidson/design-system/src/themes/theme.css';
```

### 3. Set Up Theme Provider

```tsx
// app/layout.tsx
import { ClientThemeProvider } from '@tydavidson/design-system/themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
```

### 4. Use Theme Toggle

```tsx
// In any component
import { ClientThemeToggle } from '@tydavidson/design-system/themes';

export default function MyPage() {
  return (
    <div>
      <h1>My App</h1>
      <ClientThemeToggle />
    </div>
  );
}
```

## Available Components

### Server Component Safe Components

These components can be used in Server Components without any issues:

- **`ClientThemeProvider`** - Theme provider for Server Components
- **`ClientThemeToggle`** - Theme toggle for Server Components  
- **`useThemeServer`** - Server-safe theme hook

### Client Component Only Components

These components can only be used in Client Components:

- **`ThemeProvider`** - Standard theme provider (use `ClientThemeProvider` instead)
- **`ThemeProviderNoSSR`** - NoSSR theme provider (use `ClientThemeProvider` instead)

## Usage Examples

### Server Components

```tsx
import { ClientThemeToggle, useThemeServer } from '@tydavidson/design-system/themes';

export default function ServerComponent() {
  const { theme, isDark } = useThemeServer();
  
  return (
    <div className={isDark ? 'dark' : 'light'}>
      <h1>Current theme: {theme}</h1>
      <ClientThemeToggle />
    </div>
  );
}
```

### Client Components

```tsx
'use client';
import { ClientThemeToggle } from '@tydavidson/design-system/themes';

export default function ClientComponent() {
  return (
    <div>
      <h1>My Client Component</h1>
      <ClientThemeToggle />
    </div>
  );
}
```

### Layout Setup

```tsx
// app/layout.tsx
import { ClientThemeProvider } from '@tydavidson/design-system/themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
```

## Theme Configuration

### CSS Variables

The theme system uses CSS custom properties for colors:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent-primary: #3b82f6;
}

.dark {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  --accent-primary: #60a5fa;
}
```

### Tailwind Configuration

Configure Tailwind to use the CSS variables:

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tydavidson/design-system/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--accent-primary)",
          foreground: "var(--text-primary)",
        },
      },
    },
  },
};
```

## Theme Utilities

### Server-Safe Theme Detection

```tsx
import { useThemeServer } from '@tydavidson/design-system/themes';

export default function ServerComponent() {
  const { theme, isDark } = useThemeServer();
  
  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'}>
      Current theme: {theme}
    </div>
  );
}
```

### Theme Utilities

```tsx
import { 
  isDarkTheme, 
  mapColorToShadcnVariant, 
  mapVariantToShadcnVariant,
  getColorVariantClasses 
} from '@tydavidson/design-system/themes';

// Check if theme is dark
const isDark = isDarkTheme('dark', 'dark');

// Map design system colors to shadcn variants
const variant = mapColorToShadcnVariant('brand'); // 'default'

// Map design system variants to shadcn variants  
const shadcnVariant = mapVariantToShadcnVariant('primary'); // 'default'

// Get Tailwind classes for color/variant combinations
const classes = getColorVariantClasses('brand', 'primary');
```

## Migration Guide

### From Previous Versions

If you were using the old theme system:

**Before:**
```tsx
import { ThemeToggle, useTheme } from '@tydavidson/design-system/themes';

export default function MyComponent() {
  const { theme, setTheme } = useTheme();
  return <ThemeToggle />;
}
```

**After:**
```tsx
import { ClientThemeToggle, useThemeServer } from '@tydavidson/design-system/themes';

export default function MyComponent() {
  const { theme } = useThemeServer();
  return <ClientThemeToggle />;
}
```

### Key Changes

1. **`ThemeToggle`** → **`ClientThemeToggle`** (Server Component safe)
2. **`useTheme`** → **`useThemeServer`** (Server Component safe)
3. **`ThemeProvider`** → **`ClientThemeProvider`** (Server Component safe)

## Troubleshooting

### Common Issues

1. **Theme not switching**: Ensure `ClientThemeProvider` is wrapping your app
2. **Hydration errors**: Add `suppressHydrationWarning` to your `<html>` element
3. **CSS not loading**: Import the theme CSS file
4. **TypeScript errors**: The package includes types, no additional @types needed

### Server Component Compatibility

All exported components are now Server Component safe. If you encounter any issues:

1. Use `ClientThemeToggle` instead of `ThemeToggle`
2. Use `ClientThemeProvider` instead of `ThemeProvider`
3. Use `useThemeServer` instead of `useTheme`

## API Reference

### ClientThemeProvider

Theme provider component for Server Component compatibility.

```tsx
import { ClientThemeProvider } from '@tydavidson/design-system/themes';

<ClientThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ClientThemeProvider>
```

### ClientThemeToggle

Theme toggle component for Server Component compatibility.

```tsx
import { ClientThemeToggle } from '@tydavidson/design-system/themes';

<ClientThemeToggle 
  variant="icon" 
  size="md" 
  className="custom-class" 
/>
```

### useThemeServer

Server-safe theme hook that returns default theme values.

```tsx
import { useThemeServer } from '@tydavidson/design-system/themes';

const { theme, setTheme, resolvedTheme, isDark } = useThemeServer();
```

## Version Compatibility

| Next.js Version | Design System Version | Notes |
|----------------|----------------------|-------|
| 13+ (App Router) | 1.1.17+ | Full Server Component support |
| 12+ (Pages Router) | 1.1.0+ | Basic compatibility |
| < 12 | Not supported | Use newer Next.js version | 
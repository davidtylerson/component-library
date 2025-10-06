# Theme Usage Guide

This guide explains how to use the modern, simplified theme system in the Float Design System, compatible with the Next.js App Router.

## Quick Start

### 1. Install the Package

```bash
npm install @tydavidson/design-system
```

### 2. Import CSS

In your main CSS file (e.g., `app/globals.css`), import the theme styles:

```css
@import '@tydavidson/design-system/src/app/globals-consolidated.css';
```

### 3. Set Up Theme Provider

The `ThemeProvider` must be used within a Client Component. The recommended approach is to create a dedicated `providers.tsx` file to house all client-side providers.

**Create `app/components/providers.tsx`:**

```tsx
'use client';

import { ThemeProvider } from '@tydavidson/design-system';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
```

**Update your root layout `app/layout.tsx`:**

```tsx
import { Providers } from './components/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 4. Use Theme Toggle

You can now use the `ClientThemeToggle` in any component.

```tsx
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

### `ThemeProvider`

The main provider for the theme system. It is a Client Component that wraps the `next-themes` provider with sensible defaults for the design system.

### `ClientThemeToggle`

A Server Component-safe theme toggle button. This component can be used anywhere in your application.

### `useThemeServer`

A Server Component-safe hook that returns the default theme values. This is useful for accessing theme information in Server Components without causing client-side re-renders.

## Troubleshooting

### Common Issues

1. **Theme not switching**: Ensure `ThemeProvider` is wrapping your app within a Client Component (like the `providers.tsx` file shown above).
2. **Hydration errors**: Add `suppressHydrationWarning` to your `<html>` element in the root layout.
3. **CSS not loading**: Make sure you have imported the `globals-consolidated.css` file in your global stylesheet.

## API Reference

### ThemeProvider

A wrapper around the `next-themes` `ThemeProvider`. It accepts all the same props.

**Example Usage:**

```tsx
// app/components/providers.tsx
'use client';

import { ThemeProvider } from '@tydavidson/design-system';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
```

### ClientThemeToggle

A theme toggle button that is safe to use in both Server and Client Components.

```tsx
import { ClientThemeToggle } from '@tydavidson/design-system/themes';

<ClientThemeToggle variant="icon" size="md" className="custom-class" />;
```

### useThemeServer

A server-safe hook that provides default theme values.

```tsx
import { useThemeServer } from '@tydavidson/design-system/themes';

const { theme, isDark } = useThemeServer();
```

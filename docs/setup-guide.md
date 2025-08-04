# Design System Setup Guide

This guide helps you set up the Float Design System in your project and avoid common integration issues.

## Installation

```bash
npm install @tydavidson/design-system
```

## Required Dependencies

The design system requires these peer dependencies (only Tabler icons are used):

```bash
npm install react react-dom next-themes @tabler/icons-react
```

## CSS Setup

### 1. Import Theme CSS

Import the theme CSS file in your app's root layout or main CSS file:

```css
/* In your global CSS file */
@import '@tydavidson/design-system/themes/theme.css';
```

Or in your Next.js app:

```tsx
// app/layout.tsx or pages/_app.tsx
import '@tydavidson/design-system/themes/theme.css';
```

### 2. Configure Tailwind CSS

Add the design system's color tokens to your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tydavidson/design-system/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          quaternary: 'var(--bg-quaternary)',
          disabled: 'var(--bg-disabled)',
          overlay: 'var(--bg-overlay)',
          'brand-primary': 'var(--bg-brand-primary)',
          'error-primary': 'var(--bg-error-primary)',
          'warning-primary': 'var(--bg-warning-primary)',
          'success-primary': 'var(--bg-success-primary)',
        },
        // Text colors
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          disabled: 'var(--text-disabled)',
          'brand-primary': 'var(--text-brand-primary)',
          'error-primary': 'var(--text-error-primary)',
          'warning-primary': 'var(--text-warning-primary)',
          'success-primary': 'var(--text-success-primary)',
        },
        // Border colors
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          tertiary: 'var(--border-tertiary)',
          disabled: 'var(--border-disabled)',
          brand: 'var(--border-brand)',
          error: 'var(--border-error)',
          warning: 'var(--border-warning)',
          success: 'var(--border-success)',
        },
      },
    },
  },
  plugins: [],
};
```

## Theme Provider Setup

### Next.js App Router

**Option 1: Client Theme Provider (Recommended)**

```tsx
// app/layout.tsx
import { ClientThemeProvider } from '@tydavidson/design-system/themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
```

**Option 2: Regular Theme Provider (Client Components Only)**

```tsx
// app/layout.tsx
import { ThemeProvider } from '@tydavidson/design-system/themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

**Option 3: NoSSR Theme Provider**

```tsx
// app/layout.tsx
import { ThemeProviderNoSSR } from '@tydavidson/design-system/themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviderNoSSR>{children}</ThemeProviderNoSSR>
      </body>
    </html>
  );
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import { ThemeProvider } from '@tydavidson/design-system/themes';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### React (Create React App)

```tsx
// App.tsx
import { ThemeProvider } from '@tydavidson/design-system/themes';

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

## Usage Examples

### Basic Theme Usage

```tsx
import { useTheme, ThemeToggle } from '@tydavidson/design-system/themes';

function MyComponent() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDark ? 'Yes' : 'No'}</p>
      <ThemeToggle />
    </div>
  );
}
```

### Using UI Components

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@tydavidson/design-system';

function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Server Component Compatibility

### Using Theme System in Server Components

The design system provides several options for using theme functionality in Next.js App Router Server Components:

**For Server Components:**

```tsx
// Use the server-safe hook
import { useThemeServer } from '@tydavidson/design-system/themes';

export default function ServerComponent() {
  const { theme, isDark } = useThemeServer();

  return (
    <div className={isDark ? 'dark' : 'light'}>Current theme: {theme}</div>
  );
}
```

**For Client Components:**

```tsx
'use client';
import { useTheme } from '@tydavidson/design-system/themes';

export default function ClientComponent() {
  const { theme, setTheme, isDark } = useTheme();

  return <button onClick={() => setTheme('dark')}>Switch to Dark Mode</button>;
}
```

**Client Theme Toggle in Server Components:**

```tsx
import { ClientThemeToggle } from '@tydavidson/design-system/themes';

export default function ServerComponent() {
  return (
    <div>
      <h1>My Page</h1>
      <ClientThemeToggle />
    </div>
  );
}
```

## Common Issues and Solutions

### 1. React Context Errors in Server Components

**Problem**: Server-side rendering doesn't match client-side rendering.

**Solution**:

- Add `suppressHydrationWarning` to your `<html>` element
- Use the `mounted` pattern for client-only components:

```tsx
function ClientOnlyComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ThemeToggle />;
}
```

### 2. CSS Variables Not Working

**Problem**: Theme colors aren't applying correctly.

**Solution**:

- Ensure you've imported the theme CSS file
- Check that your Tailwind config includes the color tokens
- Verify the CSS variables are being set on the `:root` element

### 3. Icons Not Displaying

**Problem**: Icons appear as empty boxes or don't render.

**Solution**:

- Install required icon library: `npm install @tabler/icons-react`
- Ensure the icon library is available in your bundle

### 4. TypeScript Errors

**Problem**: TypeScript can't find types for the design system.

**Solution**:

- The package includes TypeScript declarations
- Make sure your `tsconfig.json` includes `node_modules` in the module resolution
- If using path aliases, ensure they're configured correctly

### 5. Bundle Size Issues

**Problem**: The design system is making your bundle too large.

**Solution**:

- The package uses tree-shaking, so unused components won't be included
- Icon libraries are external dependencies, so they won't be bundled
- Consider using dynamic imports for large components:

```tsx
const DynamicComponent = dynamic(() =>
  import('@tydavidson/design-system').then(mod => ({
    default: mod.SomeLargeComponent,
  }))
);
```

## Browser Compatibility

The design system supports:

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 18+
- Next.js 13+ (App Router and Pages Router)
- Create React App

## Performance Considerations

1. **Tree Shaking**: Only import what you need
2. **CSS Variables**: Theme changes are handled via CSS variables for optimal performance
3. **Icon Library**: Icons are external dependencies to avoid duplication
4. **Bundle Splitting**: Consider code-splitting for large applications

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure CSS is properly imported
4. Check that the ThemeProvider is wrapping your app
5. Verify Tailwind configuration includes the design system's content paths

For additional help, refer to the [theme usage documentation](./theme-usage.md).

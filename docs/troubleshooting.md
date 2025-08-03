# Troubleshooting Guide

This guide helps you resolve common issues when using the Float Design System.

## Quick Reference

| Issue                                      | Solution                                          | Version |
| ------------------------------------------ | ------------------------------------------------- | ------- |
| React Context errors in Next.js App Router | Use `ClientThemeProvider` and `ClientThemeToggle` | 1.1.9+  |
| Invalid hook call errors                   | Use `ClientThemeToggle` instead of `ThemeToggle`  | 1.1.15+ |
| Server Component compatibility issues      | Use Server Component safe components              | 1.1.15+ |

## Common Issues and Solutions

### 1. React Context Errors in Next.js App Router

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

### 2. Invalid Hook Call Errors

**Problem**: `Error: Invalid hook call. Hooks can only be called inside of the body of a function component.`

**Root Cause**: The design system was trying to use React hooks in invalid contexts.

**Solution**:

- Use `ClientThemeToggle` instead of `ThemeToggle` in Server Components
- Use `ClientThemeProvider` instead of `ThemeProvider` in Server Components
- All components that use hooks are now properly protected

```tsx
// ✅ Correct - Server Component safe
import { ClientThemeToggle } from '@tydavidson/design-system/themes';

export default function ServerComponent() {
  return <ClientThemeToggle />;
}

// ❌ Incorrect - May cause hook errors
import { ThemeToggle } from '@tydavidson/design-system/themes';

export default function ServerComponent() {
  return <ThemeToggle />; // This could cause issues
}
```

### 3. Server Component Compatibility Issues

**Problem**: Components using React hooks in Server Component context.

**Solution**:

- Use Server Component safe components
- All exported components are now properly protected
- Components return safe placeholders during SSR

**Server Component Safe Components:**

- `ClientThemeProvider` - Safe theme provider for Server Components
- `ClientThemeToggle` - Safe theme toggle for Server Components
- `useThemeServer` - Server-safe theme hook

**Client Component Only Components:**

- `ThemeToggle` - Only use in Client Components
- `ThemeProvider` - Only use in Client Components
- `useTheme` - Only use in Client Components

### 4. CSS Variables Not Working

**Problem**: Theme colors aren't applying correctly.

**Solution**:

- Ensure CSS variables are properly imported
- Check that the theme provider is wrapping your app
- Verify Tailwind CSS is configured correctly

```tsx
// Make sure to import the CSS
import '@tydavidson/design-system/src/themes/theme.css';
```

### 5. Hydration Mismatch Errors

**Problem**: Server and client rendering don't match.

**Solution**:

- Use `suppressHydrationWarning` on the `<html>` element
- Use client-only components for theme-dependent UI
- Ensure consistent initial state between server and client

```tsx
// In your root layout
<html suppressHydrationWarning>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

### 6. Module Resolution Issues

**Problem**: Can't import components or themes.

**Solution**:

- Check that you're using the correct import paths
- Ensure the package is properly installed
- Verify TypeScript configuration

```tsx
// Correct import paths
import { Button } from '@tydavidson/design-system';
import { ClientThemeToggle } from '@tydavidson/design-system/themes';
```

## Server Component Best Practices

### Using Theme System in Server Components

**For Server Components:**

```tsx
import {
  useThemeServer,
  ClientThemeToggle,
} from '@tydavidson/design-system/themes';

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

**For Client Components:**

```tsx
'use client';
import { useTheme, ThemeToggle } from '@tydavidson/design-system/themes';

export default function ClientComponent() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('dark')}>Switch to Dark Mode</button>
      <ThemeToggle />
    </div>
  );
}
```

### Component Safety Guidelines

1. **Always use `ClientThemeToggle` in Server Components**
2. **Use `ClientThemeProvider` for Server Component layouts**
3. **Use `useThemeServer` for Server Component theme detection**
4. **Mark components that use hooks with `'use client'`**
5. **Use proper SSR protection for browser APIs**

## Version Compatibility

| Next.js Version    | Design System Version | Notes                         |
| ------------------ | --------------------- | ----------------------------- |
| 13+ (App Router)   | 1.1.15+               | Full Server Component support |
| 12+ (Pages Router) | 1.1.0+                | Basic compatibility           |
| < 12               | Not supported         | Use newer Next.js version     |

## Getting Help

If you're still experiencing issues:

1. Check the [Setup Guide](./setup-guide.md) for proper installation
2. Review the [Theme Usage Guide](./theme-usage.md) for theme system details
3. Ensure you're using the latest version of the design system
4. Check that all dependencies are compatible

For additional support, please check the project documentation or create an issue in the repository.

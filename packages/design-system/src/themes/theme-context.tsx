'use client';

import * as React from 'react';
import { useTheme as useNextTheme } from 'next-themes';

/**
 * Server-safe theme hook that can be used in Server Components
 * Returns default theme values without accessing client-side APIs
 */
export function useThemeServer() {
  return {
    theme: 'system',
    setTheme: () => {},
    resolvedTheme: 'light',
    isDark: false,
  };
}

/**
 * @deprecated Use ThemeProvider from './theme-provider' instead
 * This component is kept for backward compatibility but is no longer needed
 */
export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is now a no-op wrapper for backward compatibility
  return <>{children}</>;
}

/**
 * Theme hook that uses next-themes properly
 * This provides a consistent interface for theme management
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme: mounted ? theme : 'system',
    setTheme,
    resolvedTheme: mounted ? resolvedTheme : 'light',
    isDark: mounted ? resolvedTheme === 'dark' : false,
  };
}

"use client"

import * as React from "react"
import type { ThemeProviderProps } from "next-themes/dist/types"

/**
 * ThemeProvider component for handling theme state
 * 
 * This wraps the next-themes provider with sensible defaults
 * for handling light/dark themes and system preferences
 * 
 * IMPORTANT: This component must be used in a Client Component context.
 * For Server Components, use the NoSSR wrapper or dynamic imports.
 */
export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  const [NextThemesProvider, setNextThemesProvider] = React.useState<any>(undefined);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Only import next-themes on the client side
    import('next-themes').then(({ ThemeProvider: Provider }) => {
      setNextThemesProvider(() => Provider);
      setMounted(true);
    });
  }, []);

  // Return children without theme provider during SSR or before mounting
  if (!mounted || !NextThemesProvider) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

/**
 * NoSSR wrapper for theme provider to prevent SSR issues
 * Use this when you need to ensure the theme provider only renders on the client
 */
export function ThemeProviderNoSSR({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider {...props}>
      {children}
    </ThemeProvider>
  );
}
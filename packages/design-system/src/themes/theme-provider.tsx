'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

/**
 * Re-exports the `ThemeProvider` from `next-themes` with sensible defaults.
 * This component must be used in a Client Component context.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={"class" as any}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children as any}
    </NextThemesProvider>
  );
}

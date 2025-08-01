"use client"

import * as React from "react"
import { ThemeProvider } from "./theme-provider"
import type { ThemeProviderProps } from "next-themes/dist/types"

/**
 * Client-only theme provider wrapper
 * This component ensures theme functionality only runs on the client side
 * without using next/dynamic which causes Server Component issues
 */
export function ClientThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before mounting, render children without theme provider
  if (!mounted) {
    return <>{children}</>;
  }

  // Once mounted, render with theme provider
  return (
    <ThemeProvider {...props}>
      {children}
    </ThemeProvider>
  );
}

/**
 * Client-only theme toggle wrapper
 * This component ensures theme toggle only renders on the client side
 * and provides a safe fallback for Server Components
 */
export function ClientThemeToggle(props: any) {
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Check current theme
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
      setIsDark(currentTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const newTheme = isDark ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      setIsDark(newTheme === 'dark');
    }
  };

  // During SSR or before mounting, render a placeholder
  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-input bg-background h-10 w-10"
        aria-label="Toggle theme"
        {...props}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
} 
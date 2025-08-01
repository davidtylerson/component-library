"use client"

import * as React from "react"

/**
 * Server-safe theme hook that can be used in Server Components
 * Returns default theme values without accessing client-side APIs
 */
export function useThemeServer() {
  return {
    theme: "system",
    setTheme: (theme: string) => {},
    resolvedTheme: "light",
    isDark: false,
  };
}

/**
 * @deprecated Use ThemeProvider from './theme-provider' instead
 * This component is kept for backward compatibility but is no longer needed
 */
export function ThemeContextProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // This is now a no-op wrapper for backward compatibility
  return <>{children}</>;
}

/**
 * @deprecated Use useTheme from next-themes directly or use the ThemeProvider
 * This hook is kept for backward compatibility but is no longer needed
 */
export function useTheme() {
  // Import next-themes dynamically to avoid SSR issues
  const [themeData, setThemeData] = React.useState({
    theme: "system",
    setTheme: (theme: string) => {},
    resolvedTheme: "light",
    isDark: false,
  });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Import next-themes and use it properly
    import('next-themes').then((nextThemes) => {
      // Create a simple theme manager that doesn't violate hook rules
      const themeManager = {
        getTheme: () => {
          // Get theme from localStorage or system preference
          if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            
            // Check system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              return 'dark';
            }
          }
          return 'light';
        },
        setTheme: (theme: string) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
            // Trigger a re-render
            setThemeData(prev => ({
              ...prev,
              theme,
              resolvedTheme: theme,
              isDark: theme === 'dark'
            }));
          }
        }
      };

      const currentTheme = themeManager.getTheme();
      const isDark = currentTheme === 'dark';
      
      setThemeData({
        theme: currentTheme,
        setTheme: themeManager.setTheme,
        resolvedTheme: currentTheme,
        isDark,
      });
      setMounted(true);
    });
  }, []);

  return themeData;
}
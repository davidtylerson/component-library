"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useTheme as useNextTheme } from "next-themes"
import { isDarkTheme } from "@/lib/theme-utils"

/**
 * Theme context type definition
 */
type ThemeContextType = {
  /** Current theme name (light, dark, system) */
  theme: string;
  
  /** Method to change the theme */
  setTheme: (theme: string) => void;
  
  /** Current resolved theme (light or dark) accounting for system preference */
  resolvedTheme: string;
  
  /** Whether the client-side code has been initialized */
  isClient: boolean;
  
  /** Whether the current theme is dark */
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeContextProvider wraps the app and provides theme context
 */
export function ThemeContextProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isClient, setIsClient] = useState(false);
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if the theme is dark
  const isDark = isDarkTheme(theme, systemTheme);

  return (
    <ThemeContext.Provider value={{
      theme: theme || "system",
      setTheme,
      resolvedTheme: resolvedTheme || "light",
      isClient,
      isDark,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme context
 * 
 * @returns Theme context object
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  
  return context;
}
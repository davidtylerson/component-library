"use client"

import * as React from "react"
import { useTheme } from "@/themes/theme-context"
import { cn } from "@/lib/utils"
import { IconMoon, IconSun } from "@tabler/icons-react"

/**
 * Props for the ThemeToggle component
 */
export interface ThemeToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Variant of the toggle
   * @default 'icon'
   */
  variant?: 'icon' | 'switch' | 'button';
  
  /**
   * Size of the toggle
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ThemeToggle component to switch between light and dark themes
 */
export function ThemeToggle({ 
  className, 
  variant = 'icon', 
  size = 'md',
  ...props 
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, isClient } = useTheme()

  // Only render on client to prevent hydration mismatch
  if (!isClient) return null;

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Size mapping for Tabler icons
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  // Size classes for button
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  // Text size classes
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  // Variant specific rendering
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          sizeClasses[size],
          className
        )}
        aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        {...props}
      >
        {resolvedTheme === "dark" ? (
          <IconSun size={iconSize[size]} stroke={1.5} />
        ) : (
          <IconMoon size={iconSize[size]} stroke={1.5} />
        )}
      </button>
    )
  }
  
  // Button variant
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2",
          textSizeClasses[size],
          "hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    )
  }
  
  // Switch variant
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        textSizeClasses[size],
        resolvedTheme === "dark" 
          ? "bg-accent text-accent-foreground hover:bg-accent/80" 
          : "bg-muted text-muted-foreground hover:bg-muted/80",
        className
      )}
      aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      {...props}
    >
      {resolvedTheme === "dark" ? (
        <span className="flex items-center">
          <IconSun size={iconSize[size]} stroke={1.5} className="mr-2" />
          Light
        </span>
      ) : (
        <span className="flex items-center">
          <IconMoon size={iconSize[size]} stroke={1.5} className="mr-2" />
          Dark
        </span>
      )}
    </button>
  )
}
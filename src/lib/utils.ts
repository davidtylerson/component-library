// src/lib/theme-utils.ts
export type ThemeColor = 'brand' | 'error' | 'warning' | 'success';
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Map design system colors to shadcn variants
export const mapColorToShadcnVariant = (color: ThemeColor) => {
  switch (color) {
    case 'brand': return 'default';
    case 'error': return 'destructive';
    case 'warning':
    case 'success':
      return 'secondary'; // Will need additional classes
    default: return 'default';
  }
};

// Map design system variants to shadcn variants
export const mapVariantToShadcnVariant = (variant: ComponentVariant) => {
  switch (variant) {
    case 'primary': return 'default';
    case 'secondary': return 'outline';
    case 'tertiary': return 'ghost';
    default: return 'default';
  }
};

//Combines multiple class values into a single className string with Tailwind-aware merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate tailwind classes for each color/variant combination
export const getColorVariantClasses = (
  color: ThemeColor, 
  variant: ComponentVariant
): string => {
  const colorVariantMap = {
    primary: {
      brand: 'bg-brand-600 hover:bg-brand-700 text-white focus-visible:ring-brand-500',
      error: 'bg-error-600 hover:bg-error-700 text-white focus-visible:ring-error-500',
      warning: 'bg-warning-600 hover:bg-warning-700 text-white focus-visible:ring-warning-500',
      success: 'bg-success-600 hover:bg-success-700 text-white focus-visible:ring-success-500',
    },
    secondary: {
      brand: 'border-brand-300 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500',
      error: 'border-error-300 text-error-700 hover:bg-error-50 focus-visible:ring-error-500',
      warning: 'border-warning-300 text-warning-700 hover:bg-warning-50 focus-visible:ring-warning-500',
      success: 'border-success-300 text-success-700 hover:bg-success-50 focus-visible:ring-success-500',
    },
    tertiary: {
      brand: 'text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500',
      error: 'text-error-700 hover:bg-error-50 focus-visible:ring-error-500',
      warning: 'text-warning-700 hover:bg-warning-50 focus-visible:ring-warning-500',
      success: 'text-success-700 hover:bg-success-50 focus-visible:ring-success-500',
    }
  };

  return colorVariantMap[variant]?.[color] || '';
};
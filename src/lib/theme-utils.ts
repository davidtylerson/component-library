/**
 * Utility functions for theme handling
 */

/**
 * Supported color theme values
 */
export type ThemeColor = 'brand' | 'error' | 'warning' | 'success';

/**
 * Supported component variant types
 */
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary';

/**
 * Map design system colors to shadcn variants
 *
 * @param color - The design system color
 * @returns The corresponding shadcn variant
 */
export const mapColorToShadcnVariant = (color: ThemeColor) => {
  switch (color) {
    case 'brand':
      return 'default';
    case 'error':
      return 'destructive';
    case 'warning':
    case 'success':
      return 'secondary'; // Will need additional classes
    default:
      return 'default';
  }
};

/**
 * Map design system variants to shadcn variants
 *
 * @param variant - The design system variant
 * @returns The corresponding shadcn variant
 */
export const mapVariantToShadcnVariant = (variant: ComponentVariant) => {
  switch (variant) {
    case 'primary':
      return 'default';
    case 'secondary':
      return 'outline';
    case 'tertiary':
      return 'ghost';
    default:
      return 'default';
  }
};

/**
 * Generate Tailwind classes for color/variant combinations
 *
 * @param color - The design system color
 * @param variant - The design system variant
 * @returns String of Tailwind classes
 */
export const getColorVariantClasses = (
  color: ThemeColor,
  variant: ComponentVariant
): string => {
  const colorVariantMap: Record<
    ComponentVariant,
    Record<ThemeColor, string>
  > = {
    primary: {
      brand:
        'bg-brand-600 hover:bg-brand-700 text-white focus-visible:ring-brand-500',
      error:
        'bg-error-600 hover:bg-error-700 text-white focus-visible:ring-error-500',
      warning:
        'bg-warning-600 hover:bg-warning-700 text-white focus-visible:ring-warning-500',
      success:
        'bg-success-600 hover:bg-success-700 text-white focus-visible:ring-success-500',
    },
    secondary: {
      brand:
        'border-brand-300 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500',
      error:
        'border-error-300 text-error-700 hover:bg-error-50 focus-visible:ring-error-500',
      warning:
        'border-warning-300 text-warning-700 hover:bg-warning-50 focus-visible:ring-warning-500',
      success:
        'border-success-300 text-success-700 hover:bg-success-50 focus-visible:ring-success-500',
    },
    tertiary: {
      brand: 'text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500',
      error: 'text-error-700 hover:bg-error-50 focus-visible:ring-error-500',
      warning:
        'text-warning-700 hover:bg-warning-50 focus-visible:ring-warning-500',
      success:
        'text-success-700 hover:bg-success-50 focus-visible:ring-success-500',
    },
  };

  return colorVariantMap[variant]?.[color] || '';
};

/**
 * Determine if the current theme is dark
 *
 * @param theme - The current theme
 * @param systemTheme - The system theme
 * @returns True if the theme is dark
 */
export const isDarkTheme = (
  theme: string | undefined,
  systemTheme: string | undefined
): boolean => {
  if (theme === 'system') {
    return systemTheme === 'dark';
  }
  return theme === 'dark';
};

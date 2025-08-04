import * as React from 'react';
import { cn } from '../../../lib/utils';

// Define the possible element types
type ElementType = React.ElementType;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The level of the heading (1-6)
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The size variant of the heading
   * If not provided, defaults based on the heading level
   */
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

  /**
   * The font weight of the heading
   * @default 'bold'
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';

  /**
   * Whether the heading should be italic
   * @default false
   */
  italic?: boolean;

  /**
   * Whether the heading should be underlined
   * @default false
   */
  underline?: boolean;

  /**
   * The color of the heading
   * @default 'default'
   */
  color?: 'default' | 'muted' | 'brand' | 'error' | 'warning' | 'success';

  /**
   * The HTML element to render
   * If not provided, uses h{level} based on the level prop
   */
  as?: ElementType;
}

/**
 * Heading component that follows the design system guidelines.
 *
 * This component renders headings following the design system's typography
 * scale, with support for different levels, sizes, weights, styles, and colors.
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 1,
      size,
      weight = 'bold',
      italic = false,
      underline = false,
      color = 'default',
      className = '',
      as,
      children,
      ...props
    },
    ref
  ) => {
    // Default heading tag based on level
    const defaultTag = `h${level}` as ElementType;

    // Use provided "as" prop or default based on level
    const Component = as || defaultTag;

    // Default sizes based on heading level if not explicitly provided
    const defaultSizes: Record<number, string> = {
      1: 'md',
      2: 'sm',
      3: 'xs',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-md',
    };

    // Determine the final size
    const finalSize = size || defaultSizes[level];

    // Map to standard Tailwind classes with appropriate sizing
    const sizeClasses: Record<string, string> = {
      '2xl': 'text-5xl leading-tight tracking-tight',
      xl: 'text-4xl leading-tight tracking-tight',
      lg: 'text-3xl leading-tight tracking-tight',
      md: 'text-2xl leading-tight tracking-tight',
      sm: 'text-xl leading-tight tracking-tight',
      xs: 'text-lg leading-tight tracking-tight',
      'text-xl': 'text-xl leading-tight',
      'text-lg': 'text-lg leading-tight',
      'text-md': 'text-base leading-tight',
    };

    // Map to standard Tailwind weight classes
    const weightClasses = {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    // Keep the existing color classes since they're semantic
    const colorClasses = {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      brand: 'text-brand-700 dark:text-brand-400',
      error: 'text-error-700 dark:text-error-400',
      warning: 'text-warning-700 dark:text-warning-400',
      success: 'text-success-700 dark:text-success-400',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          sizeClasses[finalSize],
          weightClasses[weight],
          colorClasses[color],
          italic && 'italic',
          underline && 'underline',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

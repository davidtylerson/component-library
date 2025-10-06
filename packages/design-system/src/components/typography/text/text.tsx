import * as React from 'react';
import { cn } from '../../../lib/utils';

// Define the possible element types
type ElementType = React.ElementType;

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * The size variant of the text
   * @default 'md'
   */
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';

  /**
   * The font weight of the text
   * @default 'regular'
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';

  /**
   * Whether the text should be italic
   * @default false
   */
  italic?: boolean;

  /**
   * Whether the text should be underlined
   * @default false
   */
  underline?: boolean;

  /**
   * The color of the text
   * @default 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'disabled'
    | 'brand-primary'
    | 'brand-secondary'
    | 'brand-tertiary'
    | 'error-primary'
    | 'warning-primary'
    | 'success-primary';

  /**
   * The HTML element to render
   * @default 'p'
   */
  as?: ElementType;
}

/**
 * Text component that follows the design system guidelines.
 *
 * This component renders text following the design system's typography
 * scale, with support for different sizes, weights, styles, and colors.
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      size = 'md',
      weight = 'regular',
      italic = false,
      underline = false,
      color = 'primary',
      className = '',
      as: Component = 'p',
      children,
      ...props
    },
    ref
  ) => {
    // Map to standard Tailwind size classes
    const sizeClasses = {
      xl: 'text-xl leading-relaxed',
      lg: 'text-lg leading-relaxed',
      md: 'text-base leading-relaxed',
      sm: 'text-sm leading-relaxed',
      xs: 'text-xs leading-relaxed',
    };

    // Map to standard Tailwind weight classes
    const weightClasses = {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    // Map to design system semantic color classes
    const colorClasses = {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      tertiary: 'text-text-tertiary',
      disabled: 'text-text-disabled',
      'brand-primary': 'text-text-brand-primary',
      'brand-secondary': 'text-text-brand-secondary',
      'brand-tertiary': 'text-text-brand-tertiary',
      'error-primary': 'text-text-error-primary',
      'warning-primary': 'text-text-warning-primary',
      'success-primary': 'text-text-success-primary',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          sizeClasses[size],
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

Text.displayName = 'Text';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';


const buttonVariants = cva(
  'float-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--button-bg-primary)] text-[var(--button-text-primary)] hover:bg-[var(--button-bg-primary-hover)] hover:text-[var(--button-text-primary-hover)] border-[var(--button-border-primary)] hover:border-[var(--button-border-primary-hover)]',
        secondary:
          'bg-[var(--button-bg-secondary)] text-[var(--button-text-secondary)] hover:bg-[var(--button-bg-secondary-hover)] hover:text-[var(--button-text-secondary-hover)] border-[var(--button-border-secondary)] hover:border-[var(--button-border-secondary-hover)]',
        ghost:
          'text-[var(--button-text-ghost)] hover:bg-[var(--button-bg-ghost-hover)] hover:text-[var(--button-text-ghost-hover)]',
        outline:
          'border  text-[var(--button-text-outline)] hover:bg-[var(--button-bg-outline-hover)] hover:text-[var(--button-text-outline-hover)] border-[var(--button-border-outline)] hover:border-[var(--button-border-outline-hover)]',
        link: 'text-[var(--button-text-link)] hover:text-[var(--button-text-link-hover)] bg-transparent border-transparent',
        destructive:
          'bg-[var(--button-bg-destructive)] text-[var(--button-text-destructive)] hover:bg-[var(--button-bg-destructive-hover)] hover:text-[var(--button-text-destructive-hover)] border-[var(--button-border-destructive)] hover:border-[var(--button-border-destructive-hover)]',
        // Backward compatibility
        default:
          'bg-[var(--button-bg-primary)] text-[var(--button-text-primary)] hover:bg-[var(--button-bg-primary-hover)] hover:text-[var(--button-text-primary-hover)] border-[var(--button-border-primary)] hover:border-[var(--button-border-primary-hover)]',
        tertiary:
          'text-[var(--button-text-ghost)] hover:bg-[var(--button-bg-ghost-hover)] hover:text-[var(--button-text-ghost-hover)]',
        primaryError:
          'bg-[var(--button-bg-destructive)] text-[var(--button-text-destructive)] hover:bg-[var(--button-bg-destructive-hover)] hover:text-[var(--button-text-destructive-hover)] border-[var(--button-border-destructive)] hover:border-[var(--button-border-destructive-hover)]',
      },
      size: {
        sm: 'h-6 px-2 text-xs float-button-sm',
        md: 'h-8 px-3 text-sm float-button-md',
        lg: 'h-10 px-5 text-base float-button-lg',
        iconSm: 'h-6 w-6 p-0 float-button-icon-sm',
        iconMd: 'h-8 w-8 p-0 float-button-icon-md',
        iconLg: 'h-10 w-10 p-0 float-button-icon-lg',
        // For backward compatibility
        icon: 'h-8 w-8 p-0 float-button-icon-md', // Map "icon" to be equivalent to iconMd
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'variant'> {
  asChild?: boolean;
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;

  /**
   * Semantic design system variant - use this instead of variant for design system consistency
   */
  dsVariant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'outline'
    | 'link'
    | 'destructive'
    | 'default'
    | 'tertiary'
    | 'primaryError';
  /**
   * Whether the button should only show an icon
   */
  iconOnly?: boolean;
  /**
   * Button visual style variant
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'outline'
    | 'link'
    | 'destructive'
    | 'default'
    | 'tertiary'
    | 'primaryError';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = 'md',
      asChild = false,
      leftIcon,
      rightIcon,
      isLoading = false,

      dsVariant,
      iconOnly = false,
      children,
      ...props
    },
    ref
  ) => {
    // Map deprecated variants to canonical ones
    let resolvedVariant = dsVariant || variant;
    if (resolvedVariant === 'default') resolvedVariant = 'primary';
    if (resolvedVariant === 'tertiary') resolvedVariant = 'ghost';
    if (resolvedVariant === 'primaryError') resolvedVariant = 'destructive';

    const isDisabled = props.disabled || isLoading;

    // Choose icon size variant for iconOnly buttons
    let sizeVariant = size;
    if (iconOnly) {
      // If already an icon size, keep it; otherwise convert regular size to icon size
      if (typeof size === 'string' && !size.startsWith('icon')) {
        if (size === 'sm') sizeVariant = 'iconSm';
        else if (size === 'lg') sizeVariant = 'iconLg';
        else sizeVariant = 'iconMd';
      }
    }

    const classes = cn(
      buttonVariants({
        variant: resolvedVariant,
        size: sizeVariant,
        className,
      })
    );

    const content = (
      <>
        {leftIcon && !asChild && (
          <span className="flex items-center justify-center">{leftIcon}</span>
        )}
        {isLoading && !asChild ? (
          <span className="flex items-center">
            <svg
              className="-ml-1 mr-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
        {rightIcon && !asChild && (
          <span className="flex items-center justify-center">{rightIcon}</span>
        )}
      </>
    );

    if (asChild) {
      return (
        <Slot className={classes} ref={ref as any} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button className={classes} disabled={isDisabled} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

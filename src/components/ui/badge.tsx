import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-bg-brand-primary text-text-brand-primary border-border-brand hover:bg-bg-brand-secondary hover:text-text-brand-primary hover:border-border-brand-solid',
        gray: 'bg-bg-secondary text-text-secondary border-border-secondary hover:bg-bg-tertiary hover:text-text-primary hover:border-border-tertiary',
        destructive:
          'bg-bg-error-primary text-text-error-primary border-border-error hover:bg-bg-error-secondary hover:text-text-error-primary hover:border-border-error-solid',
        outline:
          'bg-transparent text-text-primary border-border-primary hover:bg-bg-secondary hover:text-text-primary hover:border-border-secondary',
        ghost:
          'text-text-secondary border-transparent hover:bg-bg-secondary hover:text-text-primary hover:border-border-secondary',
      },
      size: {
        sm: 'h-5 px-2 text-[10px] float-badge-sm',
        md: 'h-6 px-2.5 py-0.5 text-xs float-badge-md',
        lg: 'h-7 px-3 text-sm float-badge-lg',
        iconSm: 'h-5 w-5 p-0 float-badge-icon-sm',
        iconMd: 'h-6 w-6 p-0 float-badge-icon-md',
        iconLg: 'h-7 w-7 p-0 float-badge-icon-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size = 'md',
      asChild = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      children,
      ...props
    },
    ref
  ) => {
    let sizeVariant = size;
    if (iconOnly) {
      if (size === 'sm') sizeVariant = 'iconSm';
      else if (size === 'lg') sizeVariant = 'iconLg';
      else sizeVariant = 'iconMd';
    }

    const Comp = asChild ? Slot : 'div';

    const content = iconOnly ? null : children;

    return (
      <Comp
        className={cn(badgeVariants({ variant, size: sizeVariant }), className)}
        ref={ref}
        {...props}
      >
        {leftIcon && (
          <span
            className={cn(
              'flex items-center justify-center',
              !iconOnly && children && 'mr-1'
            )}
          >
            {leftIcon}
          </span>
        )}
        {content}
        {rightIcon && (
          <span
            className={cn(
              'flex items-center justify-center',
              !iconOnly && children && 'ml-1'
            )}
          >
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };

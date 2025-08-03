import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-primary)] [&>svg]:text-[var(--fg-primary)]',
        destructive:
          'bg-[var(--bg-error-primary)] border-[var(--border-error)] text-[var(--color-error-700)] [&>svg]:text-[var(--color-error-700)]',
        warning:
          'bg-[var(--bg-warning-primary)] border-[var(--border-warning)] text-[var(--color-warning-700)] [&>svg]:text-[var(--color-warning-700)]',
        success:
          'bg-[var(--bg-success-primary)] border-[var(--border-success)] text-[var(--color-success-700)] [&>svg]:text-[var(--color-success-700)]',
        brand:
          'bg-[var(--bg-brand-primary)] border-[var(--border-brand)] text-[var(--color-brand-700)] [&>svg]:text-[var(--color-brand-700)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-sm text-[var(--text-tertiary)] [&_p]:leading-relaxed',
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };

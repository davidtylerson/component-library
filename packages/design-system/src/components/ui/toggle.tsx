'use client';
import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cn } from '../../lib/utils';

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md border border-[var(--border-tertiary)] bg-[var(--bg-secondary)] px-3 text-sm font-medium text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--bg-brand-solid)] data-[state=on]:text-[var(--text-brand-primary)]',
      className
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };

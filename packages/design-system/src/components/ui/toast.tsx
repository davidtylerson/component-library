import React from 'react';
import { Toaster as Sonner } from 'sonner';

import { cn } from '../../lib/utils';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ className, ...props }: ToasterProps) {
  return (
    <Sonner
      className={cn('toaster group', className)}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-bg-primary group-[.toaster]:text-text-primary group-[.toaster]:border-border-tertiary group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-text-tertiary',
          actionButton:
            'group-[.toast]:bg-bg-brand-solid group-[.toast]:text-text-brand-primary',
          cancelButton:
            'group-[.toast]:bg-bg-tertiary group-[.toast]:text-text-secondary',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };

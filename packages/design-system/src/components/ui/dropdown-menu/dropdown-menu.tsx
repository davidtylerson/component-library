// src/components/ui/dropdown-menu/dropdown-menu.tsx
'use client';
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  IconCheck,
  IconChevronRight,
  IconPointFilled,
} from '@tabler/icons-react';
import { cn } from '../../../lib/utils';

// Root component
const DropdownMenuRoot = DropdownMenuPrimitive.Root;

// Trigger component
const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn('select-none outline-none', className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Trigger>
));

DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

// Content component
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border px-1 text-sm shadow-md animate-in fade-in-80',
          'border-border-secondary bg-bg-primary text-text-primary',
          'shadow-md',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// Item component
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    color?: 'brand' | 'error' | 'warning' | 'success';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    inset?: boolean;
  }
>(
  (
    { className, color, leftIcon, rightIcon, children, inset, ...props },
    ref
  ) => {
    const baseClasses = cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'text-text-primary',
      'focus:bg-bg-secondary focus:text-text-primary',
      'hover:bg-bg-secondary hover:text-text-primary',
      inset && 'pl-8'
    );

    const colorVariantClasses = {
      brand:
        'focus:bg-bg-brand-focus focus:text-text-brand-focus hover:bg-bg-brand-hover hover:text-text-brand-hover',
      error:
        'focus:bg-bg-error-focus focus:text-text-error-focus hover:bg-bg-error-hover hover:text-text-error-hover',
      warning:
        'focus:bg-bg-warning-focus focus:text-text-warning-focus hover:bg-bg-warning-hover hover:text-text-warning-hover',
      success:
        'focus:bg-bg-success-focus focus:text-text-success-focus hover:bg-bg-success-hover hover:text-text-success-hover',
    };

    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
          baseClasses,
          color && colorVariantClasses[color],
          className
        )}
        {...props}
      >
        {leftIcon && (
          <span
            className={cn(
              'mr-2 flex h-4 w-4 items-center justify-center text-text-tertiary',
              { 'ml-auto': !children && rightIcon }
            )}
          >
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className="ml-auto pl-2 text-text-tertiary group-hover:text-current">
            {rightIcon}
          </span>
        )}
      </DropdownMenuPrimitive.Item>
    );
  }
);

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// Label component (New Wrapper)
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'mb-1 py-1.5 pr-2 text-sm font-normal text-text-tertiary',
      inset ? 'pl-8' : 'pl-2',
      className
    )}
    {...props}
  />
));

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// CheckboxItem component
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'text-text-primary hover:bg-bg-secondary hover:text-text-primary focus:bg-bg-secondary focus:text-text-primary',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <IconCheck className="h-4 w-4 text-text-tertiary" strokeWidth={2} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

// RadioGroup component
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// RadioItem component
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'text-text-primary hover:bg-bg-secondary hover:text-text-primary focus:bg-bg-secondary focus:text-text-primary',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <IconPointFilled className="h-3 w-3 fill-current text-text-tertiary" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// Separator component
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border-secondary', className)}
    {...props}
  />
));

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// Shortcut component
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-text-tertiary opacity-60',
        className
      )}
      {...props}
    />
  );
};

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

// Sub components
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-bg-secondary data-[disabled]:opacity-50',
      'text-text-primary hover:bg-bg-secondary hover:text-text-primary focus:bg-bg-secondary focus:text-text-primary',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <IconChevronRight className="ml-auto h-4 w-4 text-text-tertiary" />
  </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border px-2 py-1 shadow-lg animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
      'border-border-secondary bg-bg-primary text-text-primary shadow-md',
      className
    )}
    {...props}
  />
));

DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

// Export the component with all its parts
export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuPrimitive.Group,
  Portal: DropdownMenuPrimitive.Portal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
};

// src/components/ui/dropdown-menu/dropdown-menu.tsx
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ThemeColor } from "@/lib/theme-utils";

// Root component
const DropdownMenuRoot = DropdownMenuPrimitive.Root;

// Trigger component
const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn("outline-none", className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Trigger>
));

DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

// Content component
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    color?: ThemeColor;
  }
>(({ className, color = "brand", sideOffset = 4, ...props }, ref) => {
  const colorClasses = {
    brand: "border-brand-200 bg-white dark:bg-gray-800",
    error: "border-error-200 bg-white dark:bg-gray-800",
    warning: "border-warning-200 bg-white dark:bg-gray-800",
    success: "border-success-200 bg-white dark:bg-gray-800",
  };

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md animate-in fade-in-80",
          colorClasses[color],
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
    color?: ThemeColor;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  }
>(({ className, color = "brand", leftIcon, rightIcon, children, ...props }, ref) => {
  const colorClasses = {
    brand: "focus:bg-brand-50 focus:text-brand-700 dark:focus:bg-gray-700",
    error: "focus:bg-error-50 focus:text-error-700 dark:focus:bg-gray-700",
    warning: "focus:bg-warning-50 focus:text-warning-700 dark:focus:bg-gray-700",
    success: "focus:bg-success-50 focus:text-success-700 dark:focus:bg-gray-700",
  };

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        colorClasses[color],
        className
      )}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </DropdownMenuPrimitive.Item>
  );
});

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// Other dropdown menu components
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700", className)}
    {...props}
  />
));

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// Export the component with all its parts
export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  Group: DropdownMenuPrimitive.Group,
  Label: DropdownMenuPrimitive.Label,
};
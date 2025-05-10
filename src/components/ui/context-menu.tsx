import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { IconCheck, IconChevronRight, IconPointFilled } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none data-[state=open]:bg-[var(--float-dropdown-item-bg-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--float-dropdown-item-fg)] focus:bg-[var(--float-dropdown-item-bg-focus)] focus:text-[var(--float-dropdown-item-fg-focus)] hover:bg-[var(--float-dropdown-item-bg-hover)] hover:text-[var(--float-dropdown-item-fg-hover)]",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <IconChevronRight className="ml-auto h-4 w-4 text-[var(--text-tertiary)]" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-lg animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 py-1 px-2",
      "bg-[var(--float-dropdown-content-bg)] text-[var(--float-dropdown-content-fg)] border-[var(--float-dropdown-content-border)] shadow-[var(--float-dropdown-shadow)]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md animate-in fade-in-80 px-1",
        "bg-[var(--float-dropdown-content-bg)] text-[var(--float-dropdown-content-fg)] border-[var(--float-dropdown-content-border)]",
        "shadow-[var(--float-dropdown-shadow)]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    color?: 'brand' | 'error' | 'warning' | 'success';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  }
>(({ className, inset, color, leftIcon, rightIcon, children, ...props }, ref) => {
  const baseClasses = cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "text-[var(--float-dropdown-item-fg)]",
    "focus:bg-[var(--float-dropdown-item-bg-focus)] focus:text-[var(--float-dropdown-item-fg-focus)]",
    "hover:bg-[var(--float-dropdown-item-bg-hover)] hover:text-[var(--float-dropdown-item-fg-hover)]",
    inset && "pl-8"
  );

  const colorVariantClasses = {
    brand: "focus:bg-[var(--float-dropdown-item-brand-bg-focus)] focus:text-[var(--float-dropdown-item-brand-fg-focus)] hover:bg-[var(--float-dropdown-item-brand-bg-hover)] hover:text-[var(--float-dropdown-item-brand-fg-hover)]",
    error: "focus:bg-[var(--float-dropdown-item-error-bg-focus)] focus:text-[var(--float-dropdown-item-error-fg-focus)] hover:bg-[var(--float-dropdown-item-error-bg-hover)] hover:text-[var(--float-dropdown-item-error-fg-hover)]",
    warning: "focus:bg-[var(--float-dropdown-item-warning-bg-focus)] focus:text-[var(--float-dropdown-item-warning-fg-focus)] hover:bg-[var(--float-dropdown-item-warning-bg-hover)] hover:text-[var(--float-dropdown-item-warning-fg-hover)]",
    success: "focus:bg-[var(--float-dropdown-item-success-bg-focus)] focus:text-[var(--float-dropdown-item-success-fg-focus)] hover:bg-[var(--float-dropdown-item-success-bg-hover)] hover:text-[var(--float-dropdown-item-success-fg-hover)]",
  };

  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        baseClasses,
        color && colorVariantClasses[color],
        className
      )}
      {...props}
    >
      {leftIcon && <span className={cn("mr-2 h-4 w-4 flex items-center justify-center text-[var(--text-tertiary)]", {"ml-auto": !children && rightIcon})}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-auto pl-2 text-[var(--text-tertiary)] group-hover:text-current">{rightIcon}</span>}
    </ContextMenuPrimitive.Item>
  );
})
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--float-dropdown-item-fg)] focus:bg-[var(--float-dropdown-item-bg-focus)] focus:text-[var(--float-dropdown-item-fg-focus)] hover:bg-[var(--float-dropdown-item-bg-hover)] hover:text-[var(--float-dropdown-item-fg-hover)]",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <IconCheck className="h-4 w-4 text-[var(--text-tertiary)]" strokeWidth={2}/>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--float-dropdown-item-fg)] focus:bg-[var(--float-dropdown-item-bg-focus)] focus:text-[var(--float-dropdown-item-fg-focus)] hover:bg-[var(--float-dropdown-item-bg-hover)] hover:text-[var(--float-dropdown-item-fg-hover)]",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <IconPointFilled className="h-3 w-3 fill-current text-[var(--text-tertiary)]" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 pr-2 text-sm font-normal text-[var(--text-tertiary)] mb-1",
      inset ? "pl-8" : "pl-2",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-[var(--float-dropdown-separator-bg)]", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60 text-[var(--text-tertiary)]", className)}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} 
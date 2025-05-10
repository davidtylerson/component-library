import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[var(--float-badge-primary-bg)] text-[var(--float-badge-primary-fg)] border-[var(--float-badge-primary-border)] hover:bg-[var(--float-badge-primary-bg-hover)] hover:text-[var(--float-badge-primary-fg-hover)] hover:border-[var(--float-badge-primary-border-hover)]",
        gray: "bg-[var(--float-badge-gray-bg)] text-[var(--float-badge-gray-fg)] border-[var(--float-badge-gray-border)] hover:bg-[var(--float-badge-gray-bg-hover)] hover:text-[var(--float-badge-gray-fg-hover)] hover:border-[var(--float-badge-gray-border-hover)]",
        destructive: "bg-[var(--float-badge-destructive-bg)] text-[var(--float-badge-destructive-fg)] border-[var(--float-badge-destructive-border)] hover:bg-[var(--float-badge-destructive-bg-hover)] hover:text-[var(--float-badge-destructive-fg-hover)] hover:border-[var(--float-badge-destructive-border-hover)]",
        outline: "bg-[var(--float-badge-outline-bg)] text-[var(--float-badge-outline-fg)] border-[var(--float-badge-outline-border)] hover:bg-[var(--float-badge-outline-bg-hover)] hover:text-[var(--float-badge-outline-fg-hover)] hover:border-[var(--float-badge-outline-border-hover)]",
        ghost: "text-[var(--float-badge-ghost-fg)] border-[var(--float-badge-ghost-border)] hover:bg-[var(--float-badge-ghost-bg-hover)] hover:text-[var(--float-badge-ghost-fg-hover)] hover:border-[var(--float-badge-ghost-border-hover)]",
      },
      size: {
        sm: "h-5 px-2 text-[10px] float-badge-sm",
        md: "h-6 px-2.5 py-0.5 text-xs float-badge-md",
        lg: "h-7 px-3 text-sm float-badge-lg",
        iconSm: "h-5 w-5 p-0 float-badge-icon-sm",
        iconMd: "h-6 w-6 p-0 float-badge-icon-md",
        iconLg: "h-7 w-7 p-0 float-badge-icon-lg",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size = "md", 
    asChild = false, 
    leftIcon, 
    rightIcon, 
    iconOnly = false, 
    children, 
    ...props 
  }, ref) => {
    
    let sizeVariant = size;
    if (iconOnly) {
      if (size === "sm") sizeVariant = "iconSm";
      else if (size === "lg") sizeVariant = "iconLg";
      else sizeVariant = "iconMd";
    }
    
    const Comp = asChild ? Slot : "div";

    const content = iconOnly ? null : children;

    return (
      <Comp
        className={cn(badgeVariants({ variant, size: sizeVariant }), className)}
        ref={ref}
        {...props}
      >
        {leftIcon && (
          <span className={cn("flex items-center justify-center", !iconOnly && children && "mr-1")}>
            {leftIcon}
          </span>
        )}
        {content}
        {rightIcon && (
          <span className={cn("flex items-center justify-center", !iconOnly && children && "ml-1")}>
            {rightIcon}
          </span>
        )}
      </Comp>
    )
  }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants } 
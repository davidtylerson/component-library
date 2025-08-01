import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[var(--badge-bg-primary)] text-[var(--badge-text-primary)] border-[var(--badge-border-primary)] hover:bg-[var(--badge-bg-primary-hover)] hover:text-[var(--badge-text-primary-hover)] hover:border-[var(--badge-border-primary-hover)]",
        gray: "bg-[var(--badge-bg-gray)] text-[var(--badge-text-gray)] border-[var(--badge-border-gray)] hover:bg-[var(--badge-bg-gray-hover)] hover:text-[var(--badge-text-gray-hover)] hover:border-[var(--badge-border-gray-hover)]",
        destructive: "bg-[var(--badge-bg-destructive)] text-[var(--badge-text-destructive)] border-[var(--badge-border-destructive)] hover:bg-[var(--badge-bg-destructive-hover)] hover:text-[var(--badge-text-destructive-hover)] hover:border-[var(--badge-border-destructive-hover)]",
        outline: "bg-[var(--badge-bg-outline)] text-[var(--badge-text-outline)] border-[var(--badge-border-outline)] hover:bg-[var(--badge-bg-outline-hover)] hover:text-[var(--badge-text-outline-hover)] hover:border-[var(--badge-border-outline-hover)]",
        ghost: "text-[var(--badge-text-ghost)] border-[var(--badge-border-ghost)] hover:bg-[var(--badge-bg-ghost-hover)] hover:text-[var(--badge-text-ghost-hover)] hover:border-[var(--badge-border-ghost-hover)]",
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
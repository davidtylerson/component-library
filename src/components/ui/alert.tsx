import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-primary)] [&>svg]:text-[var(--fg-primary)]",
        destructive: "bg-[var(--color-error-800)] border-none text-[var(--text-primary)] [&>svg]:text-[var(--text-primary)]",
        warning: "bg-[var(--color-warning-700)] border-none text-[var(--text-primary)] [&>svg]:text-[var(--text-primary)]",
        success: "bg-[var(--color-success-700)] border-none text-[var(--text-primary)] [&>svg]:text-[var(--text-primary)]",
        brand: "bg-[var(--color-brand-700)] border-none text-[var(--text-primary)] [&>svg]:text-[var(--text-primary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

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
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-[var(--text-tertiary)] [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription } 
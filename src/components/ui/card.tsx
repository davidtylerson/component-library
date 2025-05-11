import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'border-only'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default: "bg-[var(--float-card-default-bg)] border-[var(--float-card-default-border)]",
      subtle: "bg-[var(--float-card-subtle-bg)] border-[var(--float-card-subtle-border)]",
      'border-only': "bg-[var(--float-card-border-only-bg)] border-[var(--float-card-border-only-border)]"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border shadow-[var(--float-card-shadow)]",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-[var(--float-card-content-gap)] p-[var(--float-card-content-padding)]",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[var(--float-card-title-size)] font-[var(--float-card-title-weight)] leading-none tracking-tight text-[var(--float-card-title-fg)]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[var(--float-card-description-size)] text-[var(--float-card-description-fg)]",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-[var(--float-card-content-padding)] pt-0",
      className
    )}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-[var(--float-card-content-padding)] pt-0",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

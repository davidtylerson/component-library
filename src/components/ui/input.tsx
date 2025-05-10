import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "bg-[var(--float-input-bg)] text-[var(--float-input-fg)] border-[var(--float-input-border)] placeholder:text-[var(--float-input-placeholder-fg)]",
          "hover:border-[var(--float-input-border-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-[var(--float-input-border-focus)]", 
          "disabled:cursor-not-allowed disabled:border-[var(--float-input-disabled-border)] disabled:bg-[var(--float-input-disabled-bg)] disabled:text-[var(--float-input-disabled-fg)] disabled:opacity-[var(--float-input-disabled-opacity)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 
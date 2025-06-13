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
          "bg-[var(--input-bg)] text-[var(--input-text)] border-[var(--input-border)] placeholder:text-[var(--input-text-placeholder)]",
          "hover:border-[var(--input-border-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-[var(--input-border-focus)]", 
          "disabled:cursor-not-allowed disabled:border-[var(--input-border-disabled)] disabled:bg-[var(--input-bg-disabled)] disabled:text-[var(--input-text-disabled)] disabled:opacity-[var(--input-opacity-disabled)]",
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
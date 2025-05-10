import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { IconCheck } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border bg-[var(--float-checkbox-bg)] border-[var(--float-checkbox-border)] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "hover:border-[var(--float-checkbox-hover-border)]",
      "data-[state=checked]:bg-[var(--float-checkbox-checked-bg)] data-[state=checked]:border-[var(--float-checkbox-checked-border)] data-[state=checked]:text-[var(--float-checkbox-checked-indicator)]",
      "data-[state=checked]:hover:bg-[var(--float-checkbox-checked-hover-bg)] data-[state=checked]:hover:border-[var(--float-checkbox-checked-hover-border)]",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-[var(--float-checkbox-disabled-border)] disabled:bg-[var(--float-checkbox-disabled-bg)]",
      "data-[state=checked]:disabled:bg-[var(--float-checkbox-disabled-checked-bg)] data-[state=checked]:disabled:border-[var(--float-checkbox-disabled-checked-border)] data-[state=checked]:disabled:text-[var(--float-checkbox-disabled-checked-indicator)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <IconCheck className="h-4 w-4" strokeWidth={2} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox } 
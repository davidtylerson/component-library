import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { IconCircleFilled } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border bg-[var(--float-radio-bg)] border-[var(--float-radio-border)] text-[var(--float-radio-checked-indicator)] ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "hover:border-[var(--float-radio-hover-border)]",
        "data-[state=checked]:border-[var(--float-radio-checked-border)]",
        "data-[state=checked]:hover:border-[var(--float-radio-checked-hover-border)]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-[var(--float-radio-disabled-border)] disabled:bg-[var(--float-radio-disabled-bg)]",
        "data-[state=checked]:disabled:border-[var(--float-radio-disabled-checked-border)] data-[state=checked]:disabled:text-[var(--float-radio-disabled-checked-indicator)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <IconCircleFilled className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem } 
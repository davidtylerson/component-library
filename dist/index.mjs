import * as React2 from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { IconCheck, IconPointFilled, IconChevronRight, IconX, IconSearch } from '@tabler/icons-react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { Command as Command$1 } from 'cmdk';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

// src/components/ui/button.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function generateId(prefix = "id") {
  const randomId = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${randomId}`;
}
function isNotNullOrUndefined(value) {
  return value !== null && value !== void 0;
}
function filterDOMProps(props, propNames) {
  const result = { ...props };
  propNames.forEach((name) => delete result[name]);
  return result;
}
var buttonVariants = cva(
  "float-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[var(--button-bg-primary)] text-[var(--button-text-primary)] hover:bg-[var(--button-bg-primary-hover)] hover:text-[var(--button-text-primary-hover)] border-[var(--button-border-primary)] hover:border-[var(--button-border-primary-hover)]",
        secondary: "bg-[var(--button-bg-secondary)] text-[var(--button-text-secondary)] hover:bg-[var(--button-bg-secondary-hover)] hover:text-[var(--button-text-secondary-hover)] border-[var(--button-border-secondary)] hover:border-[var(--button-border-secondary-hover)]",
        ghost: "text-[var(--button-text-ghost)] hover:bg-[var(--button-bg-ghost-hover)] hover:text-[var(--button-text-ghost-hover)]",
        outline: "border  text-[var(--button-text-outline)] hover:bg-[var(--button-bg-outline-hover)] hover:text-[var(--button-text-outline-hover)] border-[var(--button-border-outline)] hover:border-[var(--button-border-outline-hover)]",
        link: "text-[var(--button-text-link)] hover:text-[var(--button-text-link-hover)] bg-transparent border-transparent",
        destructive: "bg-[var(--button-bg-destructive)] text-[var(--button-text-destructive)] hover:bg-[var(--button-bg-destructive-hover)] hover:text-[var(--button-text-destructive-hover)] border-[var(--button-border-destructive)] hover:border-[var(--button-border-destructive-hover)]",
        // Backward compatibility
        default: "bg-[var(--button-bg-primary)] text-[var(--button-text-primary)] hover:bg-[var(--button-bg-primary-hover)] hover:text-[var(--button-text-primary-hover)] border-[var(--button-border-primary)] hover:border-[var(--button-border-primary-hover)]",
        tertiary: "text-[var(--button-text-ghost)] hover:bg-[var(--button-bg-ghost-hover)] hover:text-[var(--button-text-ghost-hover)]",
        primaryError: "bg-[var(--button-bg-destructive)] text-[var(--button-text-destructive)] hover:bg-[var(--button-bg-destructive-hover)] hover:text-[var(--button-text-destructive-hover)] border-[var(--button-border-destructive)] hover:border-[var(--button-border-destructive-hover)]"
      },
      size: {
        sm: "h-6 px-2 text-xs float-button-sm",
        md: "h-8 px-3 text-sm float-button-md",
        lg: "h-10 px-5 text-base float-button-lg",
        iconSm: "h-6 w-6 p-0 float-button-icon-sm",
        iconMd: "h-8 w-8 p-0 float-button-icon-md",
        iconLg: "h-10 w-10 p-0 float-button-icon-lg",
        // For backward compatibility
        icon: "h-8 w-8 p-0 float-button-icon-md"
        // Map "icon" to be equivalent to iconMd
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
var Button = React2.forwardRef(
  ({
    className,
    variant,
    size = "md",
    asChild = false,
    leftIcon,
    rightIcon,
    isLoading = false,
    color = "brand",
    dsVariant,
    iconOnly = false,
    children,
    ...props
  }, ref) => {
    let resolvedVariant = dsVariant || variant;
    if (resolvedVariant === "default") resolvedVariant = "primary";
    if (resolvedVariant === "tertiary") resolvedVariant = "ghost";
    if (resolvedVariant === "primaryError") resolvedVariant = "destructive";
    const isDisabled = props.disabled || isLoading;
    let sizeVariant = size;
    if (iconOnly) {
      if (typeof size === "string" && !size.startsWith("icon")) {
        if (size === "sm") sizeVariant = "iconSm";
        else if (size === "lg") sizeVariant = "iconLg";
        else sizeVariant = "iconMd";
      }
    }
    const classes = cn(
      buttonVariants({
        variant: resolvedVariant,
        size: sizeVariant,
        className
      })
    );
    const content = /* @__PURE__ */ jsxs(Fragment, { children: [
      leftIcon && !asChild && /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center", children: leftIcon }),
      isLoading && !asChild ? /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1" }),
          /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "Loading..." })
      ] }) : children,
      rightIcon && !asChild && /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center", children: rightIcon })
    ] });
    if (asChild) {
      return /* @__PURE__ */ jsx(
        Slot,
        {
          className: classes,
          ref,
          ...props,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: classes,
        disabled: isDisabled,
        ref,
        ...props,
        children: content
      }
    );
  }
);
Button.displayName = "Button";
var DropdownMenuRoot = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Trigger,
  {
    ref,
    className: cn("outline-none select-none", className),
    ...props,
    children
  }
));
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;
var DropdownMenuContent = React2.forwardRef(({ className, sideOffset = 4, ...props }, ref) => {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border text-sm shadow-md animate-in fade-in-80 px-1",
        "bg-[var(--dropdown-bg)] text-[var(--dropdown-text)] border-[var(--dropdown-border)]",
        "shadow-[var(--dropdown-shadow)]",
        className
      ),
      ...props
    }
  ) });
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React2.forwardRef(({ className, color, leftIcon, rightIcon, children, inset, ...props }, ref) => {
  const baseClasses = cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "text-[var(--dropdown-item-text)]",
    "focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)]",
    "hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
    inset && "pl-8"
  );
  const colorVariantClasses = {
    brand: "focus:bg-[var(--dropdown-item-bg-brand-focus)] focus:text-[var(--dropdown-item-text-brand-focus)] hover:bg-[var(--dropdown-item-bg-brand-hover)] hover:text-[var(--dropdown-item-text-brand-hover)]",
    error: "focus:bg-[var(--dropdown-item-bg-error-focus)] focus:text-[var(--dropdown-item-text-error-focus)] hover:bg-[var(--dropdown-item-bg-error-hover)] hover:text-[var(--dropdown-item-text-error-hover)]",
    warning: "focus:bg-[var(--dropdown-item-bg-warning-focus)] focus:text-[var(--dropdown-item-text-warning-focus)] hover:bg-[var(--dropdown-item-bg-warning-hover)] hover:text-[var(--dropdown-item-text-warning-hover)]",
    success: "focus:bg-[var(--dropdown-item-bg-success-focus)] focus:text-[var(--dropdown-item-text-success-focus)] hover:bg-[var(--dropdown-item-bg-success-hover)] hover:text-[var(--dropdown-item-text-success-hover)]"
  };
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.Item,
    {
      ref,
      className: cn(
        baseClasses,
        color && colorVariantClasses[color],
        className
      ),
      ...props,
      children: [
        leftIcon && /* @__PURE__ */ jsx("span", { className: cn("mr-2 h-4 w-4 flex items-center justify-center text-[var(--text-tertiary)]", { "ml-auto": !children && rightIcon }), children: leftIcon }),
        children,
        rightIcon && /* @__PURE__ */ jsx("span", { className: "ml-auto pl-2 text-[var(--text-tertiary)] group-hover:text-current", children: rightIcon })
      ]
    }
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuLabel = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "py-1.5 pr-2 text-sm font-normal text-[var(--text-tertiary)] mb-1",
      inset ? "pl-8" : "pl-2",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuCheckboxItem = React2.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--dropdown-item-text)] focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)] hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, { className: "h-4 w-4 text-[var(--text-tertiary)]", strokeWidth: 2 }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuRadioItem = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--dropdown-item-text)] focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)] hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(IconPointFilled, { className: "h-3 w-3 fill-current text-[var(--text-tertiary)]" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuSeparator = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-[var(--dropdown-separator-bg)]", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60 text-[var(--text-tertiary)]", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuSubTrigger = React2.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none data-[state=open]:bg-[var(--dropdown-item-bg-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--dropdown-item-text)] focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)] hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(IconChevronRight, { className: "ml-auto h-4 w-4 text-[var(--text-tertiary)]" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-lg animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 py-1 px-2",
      "bg-[var(--dropdown-bg)] text-[var(--dropdown-text)] border-[var(--dropdown-border)] shadow-[var(--dropdown-shadow)]",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuPrimitive.Group,
  Portal: DropdownMenuPrimitive.Portal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger
};
var Heading = React2.forwardRef(
  ({
    level = 1,
    size,
    weight = "bold",
    italic = false,
    underline = false,
    color = "default",
    className = "",
    as,
    children,
    ...props
  }, ref) => {
    const defaultTag = `h${level}`;
    const Component = as || defaultTag;
    const defaultSizes = {
      1: "md",
      2: "sm",
      3: "xs",
      4: "text-xl",
      5: "text-lg",
      6: "text-md"
    };
    const finalSize = size || defaultSizes[level];
    const sizeClasses = {
      "2xl": "text-5xl leading-tight tracking-tight",
      "xl": "text-4xl leading-tight tracking-tight",
      "lg": "text-3xl leading-tight tracking-tight",
      "md": "text-2xl leading-tight tracking-tight",
      "sm": "text-xl leading-tight tracking-tight",
      "xs": "text-lg leading-tight tracking-tight",
      "text-xl": "text-xl leading-tight",
      "text-lg": "text-lg leading-tight",
      "text-md": "text-base leading-tight"
    };
    const weightClasses = {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    };
    const colorClasses = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-brand-700 dark:text-brand-400",
      error: "text-error-700 dark:text-error-400",
      warning: "text-warning-700 dark:text-warning-400",
      success: "text-success-700 dark:text-success-400"
    };
    return /* @__PURE__ */ jsx(
      Component,
      {
        ref,
        className: cn(
          sizeClasses[finalSize],
          weightClasses[weight],
          colorClasses[color],
          italic && "italic",
          underline && "underline",
          className
        ),
        ...props,
        children
      }
    );
  }
);
Heading.displayName = "Heading";
var Text = React2.forwardRef(
  ({
    size = "md",
    weight = "regular",
    italic = false,
    underline = false,
    color = "default",
    className = "",
    as: Component = "p",
    children,
    ...props
  }, ref) => {
    const sizeClasses = {
      xl: "text-xl leading-relaxed",
      lg: "text-lg leading-relaxed",
      md: "text-base leading-relaxed",
      sm: "text-sm leading-relaxed",
      xs: "text-xs leading-relaxed"
    };
    const weightClasses = {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    };
    const colorClasses = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-brand-700 dark:text-brand-400",
      error: "text-error-700 dark:text-error-400",
      warning: "text-warning-700 dark:text-warning-400",
      success: "text-success-700 dark:text-success-400"
    };
    return /* @__PURE__ */ jsx(
      Component,
      {
        ref,
        className: cn(
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          italic && "italic",
          underline && "underline",
          className
        ),
        ...props,
        children
      }
    );
  }
);
Text.displayName = "Text";
var Toggle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TogglePrimitive.Root,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-3 h-10 border border-[var(--border-tertiary)] bg-[var(--bg-secondary)] text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--bg-brand-solid)] data-[state=on]:text-[var(--text-brand-primary)]",
      className
    ),
    ...props
  }
));
Toggle.displayName = TogglePrimitive.Root.displayName;
var ToggleGroup = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  ToggleGroupPrimitive.Root,
  {
    ref,
    className: cn("flex items-center gap-1", className),
    ...props,
    children
  }
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
var ToggleGroupItem = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToggleGroupPrimitive.Item,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-3 h-10 border border-[var(--border-tertiary)] bg-[var(--bg-secondary)] text-[var(--text-tertiary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-brand)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--bg-brand-solid)] data-[state=on]:text-[var(--text-brand-primary)]",
      className
    ),
    ...props
  }
));
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
var Slider = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex w-full touch-none select-none items-center",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React2.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border border-[var(--border-tertiary)] bg-[var(--bg-tertiary)] p-4 text-[var(--text-tertiary)] shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var HoverCard = HoverCardPrimitive.Root;
var HoverCardTrigger = HoverCardPrimitive.Trigger;
var HoverCardContent = React2.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  HoverCardPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-64 rounded-md border border-[var(--border-tertiary)] bg-[var(--bg-tertiary)] p-4 text-[var(--text-tertiary)] shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetClose = SheetPrimitive.Close;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-[var(--bg-overlay)]/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var SheetContent = React2.forwardRef(({ side = "right", className, children, ...props }, ref) => {
  const sideClasses = {
    top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
    left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
  };
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        ref,
        className: cn(
          "fixed z-50 gap-4 bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-tertiary)] p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          sideClasses[side],
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--bg-primary)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--border-brand)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--bg-secondary)] data-[state=open]:text-[var(--text-tertiary)]", children: [
            /* @__PURE__ */ jsx(IconX, { size: 16, stroke: 1.5 }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
});
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-[var(--text-primary)]", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-[var(--text-tertiary)]", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
var Dialog = SheetPrimitive.Root;
var DialogTrigger = SheetPrimitive.Trigger;
var DialogPortal = SheetPrimitive.Portal;
var DialogClose = SheetPrimitive.Close;
var DialogOverlay = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-[var(--bg-overlay)]/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
var DialogContent = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-tertiary)] shadow-lg p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--bg-primary)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--border-brand)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--bg-secondary)] data-[state=open]:text-[var(--text-tertiary)]", children: [
          /* @__PURE__ */ jsx(IconX, { className: "h-4 w-4", stroke: 1.5 }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight text-[var(--text-primary)]",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = SheetPrimitive.Title.displayName;
var DialogDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-[var(--text-tertiary)]", className),
    ...props
  }
));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
var Command = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
var CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ jsx(Dialog, { ...props, children: /* @__PURE__ */ jsx(DialogContent, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) }) });
};
var CommandInput = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(IconSearch, { size: 16, stroke: 1.5, className: "mr-2 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
var CommandList = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
var CommandEmpty = React2.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
var CommandGroup = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
var CommandSeparator = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
var CommandItem = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
var CommandShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      ...props
    }
  );
};
CommandShortcut.displayName = "CommandShortcut";
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger2 = CollapsiblePrimitive.CollapsibleTrigger;
var CollapsibleContent2 = CollapsiblePrimitive.CollapsibleContent;
var ContextMenu = ContextMenuPrimitive.Root;
var ContextMenuTrigger = ContextMenuPrimitive.Trigger;
var ContextMenuGroup = ContextMenuPrimitive.Group;
var ContextMenuPortal = ContextMenuPrimitive.Portal;
var ContextMenuSub = ContextMenuPrimitive.Sub;
var ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
var ContextMenuSubTrigger = React2.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none data-[state=open]:bg-[var(--dropdown-item-bg-hover)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--dropdown-item-text)] focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)] hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(IconChevronRight, { className: "ml-auto h-4 w-4 text-[var(--text-tertiary)]" })
    ]
  }
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
var ContextMenuSubContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-lg animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 py-1 px-2",
      "bg-[var(--dropdown-bg)] text-[var(--dropdown-text)] border-[var(--dropdown-border)] shadow-[var(--dropdown-shadow)]",
      className
    ),
    ...props
  }
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
var ContextMenuContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Content,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md animate-in fade-in-80 px-1",
      "bg-[var(--dropdown-bg)] text-[var(--dropdown-text)] border-[var(--dropdown-border)]",
      "shadow-[var(--dropdown-shadow)]",
      className
    ),
    ...props
  }
) }));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
var ContextMenuItem = React2.forwardRef(({ className, inset, color, leftIcon, rightIcon, children, ...props }, ref) => {
  const baseClasses = cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "text-[var(--dropdown-item-text)]",
    "focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)]",
    "hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
    inset && "pl-8"
  );
  const colorVariantClasses = {
    brand: "focus:bg-[var(--dropdown-item-bg-brand-focus)] focus:text-[var(--dropdown-item-text-brand-focus)] hover:bg-[var(--dropdown-item-bg-brand-hover)] hover:text-[var(--dropdown-item-text-brand-hover)]",
    error: "focus:bg-[var(--dropdown-item-bg-error-focus)] focus:text-[var(--dropdown-item-text-error-focus)] hover:bg-[var(--dropdown-item-bg-error-hover)] hover:text-[var(--dropdown-item-text-error-hover)]",
    warning: "focus:bg-[var(--dropdown-item-bg-warning-focus)] focus:text-[var(--dropdown-item-text-warning-focus)] hover:bg-[var(--dropdown-item-bg-warning-hover)] hover:text-[var(--dropdown-item-text-warning-hover)]",
    success: "focus:bg-[var(--dropdown-item-bg-success-focus)] focus:text-[var(--dropdown-item-text-success-focus)] hover:bg-[var(--dropdown-item-bg-success-hover)] hover:text-[var(--dropdown-item-text-success-hover)]"
  };
  return /* @__PURE__ */ jsxs(
    ContextMenuPrimitive.Item,
    {
      ref,
      className: cn(
        baseClasses,
        color && colorVariantClasses[color],
        className
      ),
      ...props,
      children: [
        leftIcon && /* @__PURE__ */ jsx("span", { className: cn("mr-2 h-4 w-4 flex items-center justify-center text-[var(--text-tertiary)]", { "ml-auto": !children && rightIcon }), children: leftIcon }),
        children,
        rightIcon && /* @__PURE__ */ jsx("span", { className: "ml-auto pl-2 text-[var(--text-tertiary)] group-hover:text-current", children: rightIcon })
      ]
    }
  );
});
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
var ContextMenuCheckboxItem = React2.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--dropdown-item-text)] focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)] hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, { className: "h-4 w-4 text-[var(--text-tertiary)]", strokeWidth: 2 }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
var ContextMenuRadioItem = React2.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-2.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "text-[var(--dropdown-item-text)] focus:bg-[var(--dropdown-item-bg-focus)] focus:text-[var(--dropdown-item-text-focus)] hover:bg-[var(--dropdown-item-bg-hover)] hover:text-[var(--dropdown-item-text-hover)]",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(IconPointFilled, { className: "h-3 w-3 fill-current text-[var(--text-tertiary)]" }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
var ContextMenuLabel = React2.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "py-1.5 pr-2 text-sm font-normal text-[var(--text-tertiary)] mb-1",
      inset ? "pl-8" : "pl-2",
      className
    ),
    ...props
  }
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
var ContextMenuSeparator = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-[var(--dropdown-separator-bg)]", className),
    ...props
  }
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
var ContextMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60 text-[var(--text-tertiary)]", className),
      ...props
    }
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";
var EmailButton = ({
  variant = "primary",
  size = "md",
  children,
  href,
  style,
  fullWidth = false,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#4A49A6",
          color: "#ffffff",
          border: "1px solid #4A49A6"
        };
      case "secondary":
        return {
          backgroundColor: "#f8f9fa",
          color: "#4A49A6",
          border: "1px solid #dee2e6"
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: "#4A49A6",
          border: "1px solid transparent"
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: "#4A49A6",
          border: "1px solid #4A49A6"
        };
      case "destructive":
        return {
          backgroundColor: "#dc3545",
          color: "#ffffff",
          border: "1px solid #dc3545"
        };
      default:
        return {
          backgroundColor: "#4A49A6",
          color: "#ffffff",
          border: "1px solid #4A49A6"
        };
    }
  };
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          padding: "6px 12px",
          fontSize: "12px",
          borderRadius: "4px"
        };
      case "lg":
        return {
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "6px"
        };
      default:
        return {
          padding: "8px 16px",
          fontSize: "14px",
          borderRadius: "4px"
        };
    }
  };
  const baseStyles = {
    display: "inline-block",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: "500",
    cursor: "pointer",
    width: fullWidth ? "100%" : "auto",
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style
  };
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, style: baseStyles, ...props, children });
  }
  return /* @__PURE__ */ jsx("button", { style: baseStyles, ...props, children });
};
var EmailText = ({
  children,
  variant = "body",
  style
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "heading":
        return {
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1A1A1E",
          margin: "0 0 16px 0",
          lineHeight: "1.2"
        };
      case "lead":
        return {
          fontSize: "16px",
          color: "#1A1A1E",
          margin: "0 0 12px 0",
          lineHeight: "1.5"
        };
      case "caption":
        return {
          fontSize: "12px",
          color: "#6B7280",
          margin: "0 0 8px 0",
          lineHeight: "1.4"
        };
      case "muted":
        return {
          fontSize: "14px",
          color: "#6B7280",
          margin: "0 0 12px 0",
          lineHeight: "1.5"
        };
      default:
        return {
          fontSize: "14px",
          color: "#1A1A1E",
          margin: "0 0 12px 0",
          lineHeight: "1.5"
        };
    }
  };
  return /* @__PURE__ */ jsx("div", { style: { ...getVariantStyles(), ...style }, children });
};
var EmailHeading = (props) => /* @__PURE__ */ jsx(EmailText, { variant: "heading", ...props });
var EmailCaption = (props) => /* @__PURE__ */ jsx(EmailText, { variant: "caption", ...props });
var EmailMuted = (props) => /* @__PURE__ */ jsx(EmailText, { variant: "muted", ...props });
var EmailLayout = ({
  children,
  preheader
}) => /* @__PURE__ */ jsxs(Fragment, { children: [
  preheader && /* @__PURE__ */ jsx("div", { style: {
    color: "transparent",
    display: "none",
    height: "0",
    maxHeight: "0",
    maxWidth: "0",
    opacity: "0",
    overflow: "hidden",
    visibility: "hidden",
    width: "0"
  }, children: preheader }),
  /* @__PURE__ */ jsx("div", { style: {
    backgroundColor: "#F4F4F5",
    fontFamily: "Helvetica-Neue, Helvetica, Arial, sans-serif",
    fontSize: "16px",
    lineHeight: "1.3",
    margin: "0",
    padding: "0"
  }, children })
] });
var EmailContainer = ({
  children,
  style
}) => /* @__PURE__ */ jsx("div", { style: {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "24px",
  backgroundColor: "#ffffff",
  border: "1px solid #eaebed",
  borderRadius: "16px",
  ...style
}, children });
var EmailHeader = ({
  logoUrl = "http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/e4e1b526-0ef3-4511-a7a8-bc94353e9b3b/201x67.png",
  logoAlt = "Float",
  logoWidth = "100px",
  logoHeight = "auto"
}) => {
  return /* @__PURE__ */ jsx("div", { style: {
    width: "100px",
    textAlign: "center",
    marginBottom: "24px"
  }, children: /* @__PURE__ */ jsx("a", { href: "https://float.tech", style: {
    color: "#4A49A6",
    fontWeight: "bold",
    textDecoration: "none"
  }, children: /* @__PURE__ */ jsx(
    "img",
    {
      src: logoUrl,
      alt: logoAlt,
      width: logoWidth,
      height: logoHeight,
      style: {
        display: "block",
        margin: "0 auto",
        border: "0",
        outline: "none",
        textDecoration: "none",
        height: "auto",
        maxWidth: "200px",
        width: "100%"
      }
    }
  ) }) });
};
var EmailFooter = ({ children }) => /* @__PURE__ */ jsx("div", { style: {
  clear: "both",
  paddingTop: "24px",
  textAlign: "center",
  width: "100%"
}, children: children || /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsxs("p", { style: {
    color: "#9a9ea6",
    fontFamily: "Helvetica-Neue, Helvetica, Arial, sans-serif",
    fontSize: "14px",
    fontWeight: "normal",
    margin: "0",
    marginBottom: "16px",
    paddingBottom: "0px",
    textAlign: "center"
  }, children: [
    "Float helps financial institutions interact seamlessly through shared digital workflows and standardized APIs across the transaction lifecycle.",
    " ",
    /* @__PURE__ */ jsx("a", { href: "https://float.tech", style: {
      color: "#4A49A6",
      fontSize: "14px",
      fontWeight: "bold",
      paddingBottom: "0px",
      textAlign: "center",
      textDecoration: "underline"
    }, children: "Learn more" }),
    "."
  ] }),
  /* @__PURE__ */ jsx("a", { href: "https://float.tech", style: {
    color: "#4A49A6",
    fontSize: "14px",
    fontWeight: "bold",
    paddingBottom: "0px",
    textAlign: "center",
    textDecoration: "underline"
  }, children: /* @__PURE__ */ jsx(
    "img",
    {
      src: "http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/6a3db2b3-d35b-423f-8aac-830de81fb114/32x32.png",
      alt: "Float Logo",
      width: "32",
      height: "32",
      style: {
        display: "inline-block",
        marginBottom: "16px"
      }
    }
  ) }),
  /* @__PURE__ */ jsxs("div", { style: {
    color: "#9a9ea6",
    fontFamily: "Helvetica-Neue, Helvetica, Arial, sans-serif",
    fontSize: "14px",
    paddingBottom: "0px"
  }, children: [
    /* @__PURE__ */ jsx("div", { children: "Float Technologies Inc." }),
    /* @__PURE__ */ jsx("div", { children: "SoHo, New York" })
  ] })
] }) });
var Card = React2.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-[var(--card-bg-default)] border-[var(--card-border-default)]",
      subtle: "bg-[var(--card-bg-subtle)] border-[var(--card-border-subtle)]",
      "border-only": "bg-[var(--card-bg-border-only)] border-[var(--card-border-border-only)]"
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "rounded-lg border shadow-[var(--card-shadow)]",
          variantClasses[variant],
          className
        ),
        ...props
      }
    );
  }
);
Card.displayName = "Card";
var CardHeader = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "flex flex-col space-y-[var(--card-content-gap)] p-[var(--card-content-padding)]",
      className
    ),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "text-[var(--card-title-size)] font-[var(--card-title-weight)] leading-none tracking-tight text-[var(--card-title-text)]",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "text-[var(--card-description-size)] text-[var(--card-description-text)]",
      className
    ),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "p-[var(--card-content-padding)] pt-0",
      className
    ),
    ...props
  }
));
CardContent.displayName = "CardContent";
var CardFooter = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "flex items-center p-[var(--card-content-padding)] pt-0",
      className
    ),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
var Input = React2.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "bg-[var(--input-bg)] text-[var(--input-text)] border-[var(--input-border)] placeholder:text-[var(--input-text-placeholder)]",
          "hover:border-[var(--input-border-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-[var(--input-border-focus)]",
          "disabled:cursor-not-allowed disabled:border-[var(--input-border-disabled)] disabled:bg-[var(--input-bg-disabled)] disabled:text-[var(--input-text-disabled)] disabled:opacity-[var(--input-opacity-disabled)]",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/tokens/colors.ts
var colors = {
  // Base colors
  brand: {
    25: "hsl(var(--brand-25))",
    50: "hsl(var(--brand-50))",
    100: "hsl(var(--brand-100))",
    200: "hsl(var(--brand-200))",
    300: "hsl(var(--brand-300))",
    400: "hsl(var(--brand-400))",
    500: "hsl(var(--brand-500))",
    600: "hsl(var(--brand-600))",
    700: "hsl(var(--brand-700))",
    800: "hsl(var(--brand-800))",
    900: "hsl(var(--brand-900))",
    950: "hsl(var(--brand-950))"
  },
  error: {
    25: "hsl(var(--error-25))",
    50: "hsl(var(--error-50))",
    100: "hsl(var(--error-100))",
    200: "hsl(var(--error-200))",
    300: "hsl(var(--error-300))",
    400: "hsl(var(--error-400))",
    500: "hsl(var(--error-500))",
    600: "hsl(var(--error-600))",
    700: "hsl(var(--error-700))",
    800: "hsl(var(--error-800))",
    900: "hsl(var(--error-900))",
    950: "hsl(var(--error-950))"
  },
  warning: {
    25: "hsl(var(--warning-25))",
    50: "hsl(var(--warning-50))",
    100: "hsl(var(--warning-100))",
    200: "hsl(var(--warning-200))",
    300: "hsl(var(--warning-300))",
    400: "hsl(var(--warning-400))",
    500: "hsl(var(--warning-500))",
    600: "hsl(var(--warning-600))",
    700: "hsl(var(--warning-700))",
    800: "hsl(var(--warning-800))",
    900: "hsl(var(--warning-900))",
    950: "hsl(var(--warning-950))"
  },
  success: {
    25: "hsl(var(--success-25))",
    50: "hsl(var(--success-50))",
    100: "hsl(var(--success-100))",
    200: "hsl(var(--success-200))",
    300: "hsl(var(--success-300))",
    400: "hsl(var(--success-400))",
    500: "hsl(var(--success-500))",
    600: "hsl(var(--success-600))",
    700: "hsl(var(--success-700))",
    800: "hsl(var(--success-800))",
    900: "hsl(var(--success-900))",
    950: "hsl(var(--success-950))"
  },
  gray: {
    25: "hsl(var(--gray-25))",
    50: "hsl(var(--gray-50))",
    100: "hsl(var(--gray-100))",
    200: "hsl(var(--gray-200))",
    300: "hsl(var(--gray-300))",
    400: "hsl(var(--gray-400))",
    500: "hsl(var(--gray-500))",
    600: "hsl(var(--gray-600))",
    700: "hsl(var(--gray-700))",
    800: "hsl(var(--gray-800))",
    900: "hsl(var(--gray-900))",
    950: "hsl(var(--gray-950))"
  },
  // Semantic tokens
  text: {
    primary: "hsl(var(--foreground))",
    secondary: "hsl(var(--muted-foreground))",
    tertiary: "hsl(var(--muted-foreground))",
    disabled: "hsl(var(--muted-foreground))",
    brand: "hsl(var(--brand-700))",
    "on-brand": "hsl(var(--brand-50))",
    error: "hsl(var(--error-600))",
    warning: "hsl(var(--warning-600))",
    success: "hsl(var(--success-600))"
  },
  background: {
    primary: "hsl(var(--background))",
    secondary: "hsl(var(--secondary))",
    tertiary: "hsl(var(--muted))",
    brand: "hsl(var(--brand-50))",
    error: "hsl(var(--error-50))",
    warning: "hsl(var(--warning-50))",
    success: "hsl(var(--success-50))",
    card: "hsl(var(--card))"
  },
  border: {
    primary: "hsl(var(--border))",
    secondary: "hsl(var(--input))",
    tertiary: "hsl(var(--accent))",
    brand: "hsl(var(--brand-300))",
    error: "hsl(var(--error-300))",
    warning: "hsl(var(--warning-300))",
    success: "hsl(var(--success-300))"
  },
  focus: {
    ring: "hsl(var(--ring))",
    brand: "hsl(var(--brand-500))",
    error: "hsl(var(--error-500))",
    warning: "hsl(var(--warning-500))",
    success: "hsl(var(--success-500))"
  },
  // Component-specific
  button: {
    primary: {
      bg: "hsl(var(--brand-600))",
      text: "white",
      hover: "hsl(var(--brand-700))",
      focus: "hsl(var(--brand-500))"
    },
    secondary: {
      bg: "transparent",
      text: "hsl(var(--brand-700))",
      border: "hsl(var(--brand-300))",
      hover: "hsl(var(--brand-50))",
      focus: "hsl(var(--brand-500))"
    },
    tertiary: {
      bg: "transparent",
      text: "hsl(var(--brand-700))",
      hover: "hsl(var(--brand-50))",
      focus: "hsl(var(--brand-500))"
    }
  }
};

// src/tokens/typography.ts
var typography = {
  fontFamily: {
    sans: ["var(--font-inter)", "sans-serif"]
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  fontSize: {
    // Display sizes
    "display-2xl": ["4.5rem", { lineHeight: "5.625rem", letterSpacing: "-0.02em" }],
    "display-xl": ["3.75rem", { lineHeight: "4.5rem", letterSpacing: "-0.02em" }],
    "display-lg": ["3rem", { lineHeight: "3.75rem", letterSpacing: "-0.02em" }],
    "display-md": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.02em" }],
    "display-sm": ["1.875rem", { lineHeight: "2.375rem", letterSpacing: "-0.02em" }],
    "display-xs": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
    // Text sizes
    "text-xl": ["1.25rem", { lineHeight: "1.875rem" }],
    "text-lg": ["1.125rem", { lineHeight: "1.75rem" }],
    "text-md": ["1rem", { lineHeight: "1.5rem" }],
    "text-sm": ["0.875rem", { lineHeight: "1.25rem" }],
    "text-xs": ["0.75rem", { lineHeight: "1.125rem" }]
  },
  // Predefined style combinations
  styles: {
    h1: "text-display-md font-bold",
    h2: "text-display-sm font-bold",
    h3: "text-display-xs font-bold",
    h4: "text-text-xl font-semibold",
    h5: "text-text-lg font-semibold",
    h6: "text-text-md font-semibold",
    // Body text
    body: "text-text-md font-regular",
    "body-large": "text-text-lg font-regular",
    "body-small": "text-text-sm font-regular",
    // Special styles
    caption: "text-text-xs font-medium",
    overline: "text-text-xs font-medium uppercase tracking-wider",
    label: "text-text-sm font-medium"
  },
  // For semantic variants
  variants: {
    italic: "italic",
    underline: "underline"
  }
};

// src/tokens/spacing.ts
var spacing = {
  // We don't need to redefine the base spacing scale
  // as we'll use Tailwind's defaults
  // Semantic spacing that maps to Tailwind's scale
  layout: {
    page: "6",
    // maps to Tailwind's spacing-6 (1.5rem, 24px)
    section: "8",
    // maps to Tailwind's spacing-8 (2rem, 32px)
    subsection: "4",
    // maps to Tailwind's spacing-4 (1rem, 16px)
    inline: "2"
    // maps to Tailwind's spacing-2 (0.5rem, 8px)
  },
  // Component-specific spacing that maps to Tailwind's scale
  component: {
    xxs: "1",
    // maps to Tailwind's spacing-1 (0.25rem, 4px)
    xs: "2",
    // maps to Tailwind's spacing-2 (0.5rem, 8px)
    sm: "3",
    // maps to Tailwind's spacing-3 (0.75rem, 12px)
    md: "4",
    // maps to Tailwind's spacing-4 (1rem, 16px)
    lg: "6",
    // maps to Tailwind's spacing-6 (1.5rem, 24px)
    xl: "8",
    // maps to Tailwind's spacing-8 (2rem, 32px)
    xxl: "12"
    // maps to Tailwind's spacing-12 (3rem, 48px)
  },
  // Any custom spacing values not in Tailwind's default scale
  // would be defined here for extending in the Tailwind config
  custom: {
    // Example: '4.5': '1.125rem', // 18px
  }
};

// src/tokens/radius.ts
var radius = {
  // Semantic radius values using CSS variables
  default: "var(--radius)",
  card: "var(--radius)",
  button: "var(--radius)",
  input: "var(--radius)",
  badge: "var(--radius)",
  // Shape variants
  pill: "9999px",
  circle: "50%",
  // Any custom radius values to extend Tailwind's defaults
  // would be defined here
  custom: {
    // Example: 'medium': '0.375rem', // 6px
  }
};

// src/tokens/shadows.ts
var shadows = {
  // Base shadow values
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  // Semantic shadow values
  "elevation-low": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "elevation-medium": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "elevation-high": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  // Component specific
  card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  dropdown: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  modal: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
};

// src/tokens/index.ts
var tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows
};
function ThemeProvider({
  children,
  ...props
}) {
  const [NextThemesProvider, setNextThemesProvider] = React2.useState(void 0);
  const [mounted, setMounted] = React2.useState(false);
  React2.useEffect(() => {
    import('next-themes').then(({ ThemeProvider: Provider }) => {
      setNextThemesProvider(() => Provider);
      setMounted(true);
    });
  }, []);
  if (!mounted || !NextThemesProvider) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(
    NextThemesProvider,
    {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      disableTransitionOnChange: true,
      ...props,
      children
    }
  );
}
function ThemeProviderNoSSR({
  children,
  ...props
}) {
  const [mounted, setMounted] = React2.useState(false);
  React2.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(ThemeProvider, { ...props, children });
}
function ClientThemeProvider({
  children,
  ...props
}) {
  const [mounted, setMounted] = React2.useState(false);
  React2.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(ThemeProvider, { ...props, children });
}
function ClientThemeToggle(props) {
  const [mounted, setMounted] = React2.useState(false);
  const [isDark, setIsDark] = React2.useState(false);
  React2.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
      setIsDark(currentTheme === "dark");
    }
  }, []);
  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      const newTheme = isDark ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      setIsDark(newTheme === "dark");
    }
  };
  if (!mounted) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "inline-flex items-center justify-center rounded-md border border-input bg-background h-10 w-10",
        "aria-label": "Toggle theme",
        ...props,
        children: /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
              /* @__PURE__ */ jsx("path", { d: "M12 2v2" }),
              /* @__PURE__ */ jsx("path", { d: "M12 20v2" }),
              /* @__PURE__ */ jsx("path", { d: "m4.93 4.93 1.41 1.41" }),
              /* @__PURE__ */ jsx("path", { d: "m17.66 17.66 1.41 1.41" }),
              /* @__PURE__ */ jsx("path", { d: "M2 12h2" }),
              /* @__PURE__ */ jsx("path", { d: "M20 12h2" }),
              /* @__PURE__ */ jsx("path", { d: "m6.34 17.66-1.41 1.41" }),
              /* @__PURE__ */ jsx("path", { d: "m19.07 4.93-1.41 1.41" })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: toggleTheme,
      className: "inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10",
      "aria-label": "Toggle theme",
      ...props,
      children: isDark ? /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
            /* @__PURE__ */ jsx("path", { d: "M12 2v2" }),
            /* @__PURE__ */ jsx("path", { d: "M12 20v2" }),
            /* @__PURE__ */ jsx("path", { d: "m4.93 4.93 1.41 1.41" }),
            /* @__PURE__ */ jsx("path", { d: "m17.66 17.66 1.41 1.41" }),
            /* @__PURE__ */ jsx("path", { d: "M2 12h2" }),
            /* @__PURE__ */ jsx("path", { d: "M20 12h2" }),
            /* @__PURE__ */ jsx("path", { d: "m6.34 17.66-1.41 1.41" }),
            /* @__PURE__ */ jsx("path", { d: "m19.07 4.93-1.41 1.41" })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" })
        }
      )
    }
  );
}
function useThemeServer() {
  return {
    theme: "system",
    setTheme: (theme) => {
    },
    resolvedTheme: "light",
    isDark: false
  };
}

// src/lib/theme-utils.ts
var mapColorToShadcnVariant = (color) => {
  switch (color) {
    case "brand":
      return "default";
    case "error":
      return "destructive";
    case "warning":
    case "success":
      return "secondary";
    // Will need additional classes
    default:
      return "default";
  }
};
var mapVariantToShadcnVariant = (variant) => {
  switch (variant) {
    case "primary":
      return "default";
    case "secondary":
      return "outline";
    case "tertiary":
      return "ghost";
    default:
      return "default";
  }
};
var getColorVariantClasses = (color, variant) => {
  const colorVariantMap = {
    primary: {
      brand: "bg-brand-600 hover:bg-brand-700 text-white focus-visible:ring-brand-500",
      error: "bg-error-600 hover:bg-error-700 text-white focus-visible:ring-error-500",
      warning: "bg-warning-600 hover:bg-warning-700 text-white focus-visible:ring-warning-500",
      success: "bg-success-600 hover:bg-success-700 text-white focus-visible:ring-success-500"
    },
    secondary: {
      brand: "border-brand-300 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500",
      error: "border-error-300 text-error-700 hover:bg-error-50 focus-visible:ring-error-500",
      warning: "border-warning-300 text-warning-700 hover:bg-warning-50 focus-visible:ring-warning-500",
      success: "border-success-300 text-success-700 hover:bg-success-50 focus-visible:ring-success-500"
    },
    tertiary: {
      brand: "text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-500",
      error: "text-error-700 hover:bg-error-50 focus-visible:ring-error-500",
      warning: "text-warning-700 hover:bg-warning-50 focus-visible:ring-warning-500",
      success: "text-success-700 hover:bg-success-50 focus-visible:ring-success-500"
    }
  };
  return colorVariantMap[variant]?.[color] || "";
};
var isDarkTheme = (theme, systemTheme) => {
  if (theme === "system") {
    return systemTheme === "dark";
  }
  return theme === "dark";
};

export { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ClientThemeProvider, ClientThemeToggle, Collapsible, CollapsibleContent2 as CollapsibleContent, CollapsibleTrigger2 as CollapsibleTrigger, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, EmailButton, EmailCaption, EmailContainer, EmailFooter, EmailHeader, EmailHeading, EmailLayout, EmailMuted, EmailText, Heading, HoverCard, HoverCardContent, HoverCardTrigger, Input, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Slider, Text, ThemeProvider, ThemeProviderNoSSR, Toggle, ToggleGroup, ToggleGroupItem, buttonVariants, cn, colors, filterDOMProps, generateId, getColorVariantClasses, isDarkTheme, isNotNullOrUndefined, mapColorToShadcnVariant, mapVariantToShadcnVariant, radius, shadows, spacing, tokens, typography, useThemeServer };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map
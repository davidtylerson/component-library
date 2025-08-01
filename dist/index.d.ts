import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React from 'react';
import React__default from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { ClassValue } from 'clsx';
export { ClientThemeProvider, ClientThemeToggle, ThemeProvider, ThemeProviderNoSSR, useThemeServer } from './themes/index.js';
import 'next-themes/dist/types';

/**
 * Utility functions for theme handling
 */
/**
 * Supported color theme values
 */
type ThemeColor = 'brand' | 'error' | 'warning' | 'success';
/**
 * Supported component variant types
 */
type ComponentVariant = 'primary' | 'secondary' | 'tertiary';
/**
 * Map design system colors to shadcn variants
 *
 * @param color - The design system color
 * @returns The corresponding shadcn variant
 */
declare const mapColorToShadcnVariant: (color: ThemeColor) => "secondary" | "default" | "destructive";
/**
 * Map design system variants to shadcn variants
 *
 * @param variant - The design system variant
 * @returns The corresponding shadcn variant
 */
declare const mapVariantToShadcnVariant: (variant: ComponentVariant) => "default" | "outline" | "ghost";
/**
 * Generate Tailwind classes for color/variant combinations
 *
 * @param color - The design system color
 * @param variant - The design system variant
 * @returns String of Tailwind classes
 */
declare const getColorVariantClasses: (color: ThemeColor, variant: ComponentVariant) => string;
/**
 * Determine if the current theme is dark
 *
 * @param theme - The current theme
 * @param systemTheme - The system theme
 * @returns True if the theme is dark
 */
declare const isDarkTheme: (theme: string | undefined, systemTheme: string | undefined) => boolean;

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | "default" | "destructive" | "outline" | "ghost" | "link" | "primaryError" | null | undefined;
    size?: "sm" | "md" | "lg" | "iconSm" | "iconMd" | "iconLg" | "icon" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Omit<VariantProps<typeof buttonVariants>, 'variant'> {
    asChild?: boolean;
    /**
     * Icon to display before the button text
     */
    leftIcon?: React.ReactNode;
    /**
     * Icon to display after the button text
     */
    rightIcon?: React.ReactNode;
    /**
     * Whether the button is in a loading state
     */
    isLoading?: boolean;
    /**
     * Theme color to apply to the button (uses design system colors)
     */
    color?: ThemeColor;
    /**
     * Semantic design system variant - use this instead of variant for design system consistency
     */
    dsVariant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'destructive' | 'default' | 'tertiary' | 'primaryError';
    /**
     * Whether the button should only show an icon
     */
    iconOnly?: boolean;
    /**
     * Button visual style variant
     */
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'destructive' | 'default' | 'tertiary' | 'primaryError';
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const DropdownMenu: {
    Root: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
    Trigger: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
        color?: "brand" | "error" | "warning" | "success";
        leftIcon?: React.ReactNode;
        rightIcon?: React.ReactNode;
        inset?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    CheckboxItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    RadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
    RadioItem: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Label: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
        inset?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
    Separator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Shortcut: {
        ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
        displayName: string;
    };
    Group: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
    Portal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
    Sub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
    SubContent: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    SubTrigger: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
        inset?: boolean;
    } & React.RefAttributes<HTMLDivElement>>;
};

type ElementType$1 = React.ElementType;
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /**
     * The level of the heading (1-6)
     * @default 1
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * The size variant of the heading
     * If not provided, defaults based on the heading level
     */
    size?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
    /**
     * The font weight of the heading
     * @default 'bold'
     */
    weight?: "regular" | "medium" | "semibold" | "bold";
    /**
     * Whether the heading should be italic
     * @default false
     */
    italic?: boolean;
    /**
     * Whether the heading should be underlined
     * @default false
     */
    underline?: boolean;
    /**
     * The color of the heading
     * @default 'default'
     */
    color?: "default" | "muted" | "brand" | "error" | "warning" | "success";
    /**
     * The HTML element to render
     * If not provided, uses h{level} based on the level prop
     */
    as?: ElementType$1;
}
/**
 * Heading component that follows the design system guidelines.
 *
 * This component renders headings following the design system's typography
 * scale, with support for different levels, sizes, weights, styles, and colors.
 */
declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;

type ElementType = React.ElementType;
interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    /**
     * The size variant of the text
     * @default 'md'
     */
    size?: "xl" | "lg" | "md" | "sm" | "xs";
    /**
     * The font weight of the text
     * @default 'regular'
     */
    weight?: "regular" | "medium" | "semibold" | "bold";
    /**
     * Whether the text should be italic
     * @default false
     */
    italic?: boolean;
    /**
     * Whether the text should be underlined
     * @default false
     */
    underline?: boolean;
    /**
     * The color of the text
     * @default 'default'
     */
    color?: "default" | "muted" | "brand" | "error" | "warning" | "success";
    /**
     * The HTML element to render
     * @default 'p'
     */
    as?: ElementType;
}
/**
 * Text component that follows the design system guidelines.
 *
 * This component renders text following the design system's typography
 * scale, with support for different sizes, weights, styles, and colors.
 */
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLParagraphElement>>;

declare const Toggle: React.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const ToggleGroup: React.ForwardRefExoticComponent<(Omit<ToggleGroupPrimitive.ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<ToggleGroupPrimitive.ToggleGroupMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & React.RefAttributes<HTMLDivElement>>;
declare const ToggleGroupItem: React.ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const Slider: React.ForwardRefExoticComponent<Omit<SliderPrimitive.SliderProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const HoverCard: React.FC<HoverCardPrimitive.HoverCardProps>;
declare const HoverCardTrigger: React.ForwardRefExoticComponent<HoverCardPrimitive.HoverCardTriggerProps & React.RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: React.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Sheet: React.FC<SheetPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React.ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: React.FC<SheetPrimitive.DialogPortalProps>;
declare const SheetOverlay: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SheetContent: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    side?: "top" | "bottom" | "left" | "right";
} & React.RefAttributes<HTMLDivElement>>;
declare const SheetHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const SheetFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const SheetTitle: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescription: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

declare const Command: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface CommandDialogProps extends DialogProps {
}
declare const CommandDialog: ({ children, ...props }: CommandDialogProps) => react_jsx_runtime.JSX.Element;
declare const CommandInput: React.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.InputHTMLAttributes<HTMLInputElement>>, "type" | "value" | "onChange"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React.RefAttributes<HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;
declare const CommandList: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandGroup: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>>, "value" | "heading"> & {
    heading?: React.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: React.ForwardRefExoticComponent<Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    alwaysRender?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandItem: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>>, "disabled" | "value" | "onSelect"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const CommandShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const Collapsible: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;

declare const ContextMenu: React.FC<ContextMenuPrimitive.ContextMenuProps>;
declare const ContextMenuTrigger: React.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuTriggerProps & React.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuGroup: React.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuPortal: React.FC<ContextMenuPrimitive.ContextMenuPortalProps>;
declare const ContextMenuSub: React.FC<ContextMenuPrimitive.ContextMenuSubProps>;
declare const ContextMenuRadioGroup: React.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubTrigger: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSubContent: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuContent: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
    color?: "brand" | "error" | "warning" | "success";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuCheckboxItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuRadioItem: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuLabel: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuSeparator: React.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ContextMenuShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

interface EmailButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    children: React__default.ReactNode;
    href?: string;
    style?: React__default.CSSProperties;
    fullWidth?: boolean;
}
declare const EmailButton: React__default.FC<EmailButtonProps>;

interface EmailTextProps {
    children: React__default.ReactNode;
    variant?: 'body' | 'heading' | 'caption' | 'lead' | 'muted';
    style?: React__default.CSSProperties;
}
declare const EmailText: React__default.FC<EmailTextProps>;
declare const EmailHeading: React__default.FC<EmailTextProps>;
declare const EmailCaption: React__default.FC<EmailTextProps>;
declare const EmailMuted: React__default.FC<EmailTextProps>;

interface EmailLayoutProps {
    children: React__default.ReactNode;
    preheader?: string;
}
declare const EmailLayout: React__default.FC<EmailLayoutProps>;
interface EmailContainerProps {
    children: React__default.ReactNode;
    style?: React__default.CSSProperties;
}
declare const EmailContainer: React__default.FC<EmailContainerProps>;
interface EmailHeaderProps {
    logoUrl?: string;
    logoAlt?: string;
    logoWidth?: string;
    logoHeight?: string;
}
declare const EmailHeader: React__default.FC<EmailHeaderProps>;
interface EmailFooterProps {
    children?: React__default.ReactNode;
}
declare const EmailFooter: React__default.FC<EmailFooterProps>;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Whether the card has a border
     * @default false
     */
    bordered?: boolean;
    /**
     * Whether the card has a shadow
     * @default true
     */
    shadowed?: boolean;
    /**
     * The padding size of the card
     * @default 'md'
     */
    padding?: "none" | "sm" | "md" | "lg";
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
}
declare const CardTitle: React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const CardDescription: React.ForwardRefExoticComponent<CardDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardContent: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>;
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;

declare const Dialog: React.FC<SheetPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<SheetPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Combines multiple class values into a single className string
 * with proper Tailwind CSS class merging.
 *
 * @param inputs - Class values to merge
 * @returns Merged className string
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Utility function to generate a unique ID.
 * Useful for ensuring unique IDs for form elements.
 *
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
declare function generateId(prefix?: string): string;
/**
 * Type guard to check if a value is not null or undefined
 *
 * @param value - Value to check
 * @returns True if value is not null or undefined
 */
declare function isNotNullOrUndefined<T>(value: T | null | undefined): value is T;
/**
 * Returns only the props that are safe to spread onto a DOM element
 * by filtering out custom props
 *
 * @param props - The props object
 * @param propNames - Names of custom props to filter out
 * @returns Object with only DOM-safe props
 */
declare function filterDOMProps<T extends Record<string, any>, K extends keyof T>(props: T, propNames: K[]): Omit<T, K>;

/**
 * Color token definitions based on the design system
 */
declare const colors: {
    brand: {
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    error: {
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    warning: {
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    success: {
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    gray: {
        25: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
        brand: string;
        'on-brand': string;
        error: string;
        warning: string;
        success: string;
    };
    background: {
        primary: string;
        secondary: string;
        tertiary: string;
        brand: string;
        error: string;
        warning: string;
        success: string;
        card: string;
    };
    border: {
        primary: string;
        secondary: string;
        tertiary: string;
        brand: string;
        error: string;
        warning: string;
        success: string;
    };
    focus: {
        ring: string;
        brand: string;
        error: string;
        warning: string;
        success: string;
    };
    button: {
        primary: {
            bg: string;
            text: string;
            hover: string;
            focus: string;
        };
        secondary: {
            bg: string;
            text: string;
            border: string;
            hover: string;
            focus: string;
        };
        tertiary: {
            bg: string;
            text: string;
            hover: string;
            focus: string;
        };
    };
};
type Colors = typeof colors;

/**
 * Typography token definitions based on the design system
 */
declare const typography: {
    fontFamily: {
        sans: string[];
    };
    fontWeight: {
        regular: string;
        medium: string;
        semibold: string;
        bold: string;
    };
    fontSize: {
        'display-2xl': (string | {
            lineHeight: string;
            letterSpacing: string;
        })[];
        'display-xl': (string | {
            lineHeight: string;
            letterSpacing: string;
        })[];
        'display-lg': (string | {
            lineHeight: string;
            letterSpacing: string;
        })[];
        'display-md': (string | {
            lineHeight: string;
            letterSpacing: string;
        })[];
        'display-sm': (string | {
            lineHeight: string;
            letterSpacing: string;
        })[];
        'display-xs': (string | {
            lineHeight: string;
            letterSpacing: string;
        })[];
        'text-xl': (string | {
            lineHeight: string;
        })[];
        'text-lg': (string | {
            lineHeight: string;
        })[];
        'text-md': (string | {
            lineHeight: string;
        })[];
        'text-sm': (string | {
            lineHeight: string;
        })[];
        'text-xs': (string | {
            lineHeight: string;
        })[];
    };
    styles: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        body: string;
        'body-large': string;
        'body-small': string;
        caption: string;
        overline: string;
        label: string;
    };
    variants: {
        italic: string;
        underline: string;
    };
};
type Typography = typeof typography;

/**
 * Spacing tokens used throughout the application
 *
 * Note: This extends Tailwind's default spacing values rather than replacing them.
 * We only define semantic values here that map to Tailwind's spacing scale.
 */
declare const spacing: {
    layout: {
        page: string;
        section: string;
        subsection: string;
        inline: string;
    };
    component: {
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    custom: {};
};
type Spacing = typeof spacing;

/**
 * Border radius tokens used throughout the application
 *
 * Note: This uses Tailwind's default radius naming but maps to our semantic values
 * defined by CSS variables. We don't override Tailwind's defaults but use
 * the semantic mappings for component consistency.
 */
declare const radius: {
    default: string;
    card: string;
    button: string;
    input: string;
    badge: string;
    pill: string;
    circle: string;
    custom: {};
};
type Radius = typeof radius;

/**
 * Shadow tokens used throughout the application
 */
declare const shadows: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    'elevation-low': string;
    'elevation-medium': string;
    'elevation-high': string;
    card: string;
    dropdown: string;
    modal: string;
};
type Shadows = typeof shadows;

/**
 * Re-exports all token definitions for easy consumption
 */

declare const tokens: {
    colors: {
        brand: {
            25: string;
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        error: {
            25: string;
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        warning: {
            25: string;
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        success: {
            25: string;
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        gray: {
            25: string;
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            disabled: string;
            brand: string;
            'on-brand': string;
            error: string;
            warning: string;
            success: string;
        };
        background: {
            primary: string;
            secondary: string;
            tertiary: string;
            brand: string;
            error: string;
            warning: string;
            success: string;
            card: string;
        };
        border: {
            primary: string;
            secondary: string;
            tertiary: string;
            brand: string;
            error: string;
            warning: string;
            success: string;
        };
        focus: {
            ring: string;
            brand: string;
            error: string;
            warning: string;
            success: string;
        };
        button: {
            primary: {
                bg: string;
                text: string;
                hover: string;
                focus: string;
            };
            secondary: {
                bg: string;
                text: string;
                border: string;
                hover: string;
                focus: string;
            };
            tertiary: {
                bg: string;
                text: string;
                hover: string;
                focus: string;
            };
        };
    };
    typography: {
        fontFamily: {
            sans: string[];
        };
        fontWeight: {
            regular: string;
            medium: string;
            semibold: string;
            bold: string;
        };
        fontSize: {
            'display-2xl': (string | {
                lineHeight: string;
                letterSpacing: string;
            })[];
            'display-xl': (string | {
                lineHeight: string;
                letterSpacing: string;
            })[];
            'display-lg': (string | {
                lineHeight: string;
                letterSpacing: string;
            })[];
            'display-md': (string | {
                lineHeight: string;
                letterSpacing: string;
            })[];
            'display-sm': (string | {
                lineHeight: string;
                letterSpacing: string;
            })[];
            'display-xs': (string | {
                lineHeight: string;
                letterSpacing: string;
            })[];
            'text-xl': (string | {
                lineHeight: string;
            })[];
            'text-lg': (string | {
                lineHeight: string;
            })[];
            'text-md': (string | {
                lineHeight: string;
            })[];
            'text-sm': (string | {
                lineHeight: string;
            })[];
            'text-xs': (string | {
                lineHeight: string;
            })[];
        };
        styles: {
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            h5: string;
            h6: string;
            body: string;
            'body-large': string;
            'body-small': string;
            caption: string;
            overline: string;
            label: string;
        };
        variants: {
            italic: string;
            underline: string;
        };
    };
    spacing: {
        layout: {
            page: string;
            section: string;
            subsection: string;
            inline: string;
        };
        component: {
            xxs: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
        };
        custom: {};
    };
    radius: {
        default: string;
        card: string;
        button: string;
        input: string;
        badge: string;
        pill: string;
        circle: string;
        custom: {};
    };
    shadows: {
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        inner: string;
        'elevation-low': string;
        'elevation-medium': string;
        'elevation-high': string;
        card: string;
        dropdown: string;
        modal: string;
    };
};
type Tokens = typeof tokens;

export { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Collapsible, CollapsibleContent, CollapsibleTrigger, type Colors, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, type ComponentVariant, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DropdownMenu, EmailButton, type EmailButtonProps, EmailCaption, EmailContainer, type EmailContainerProps, EmailFooter, type EmailFooterProps, EmailHeader, type EmailHeaderProps, EmailHeading, EmailLayout, type EmailLayoutProps, EmailMuted, EmailText, type EmailTextProps, Heading, HoverCard, HoverCardContent, HoverCardTrigger, Input, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, type Radius, type Shadows, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger, Slider, type Spacing, Text, type ThemeColor, Toggle, ToggleGroup, ToggleGroupItem, type Tokens, type Typography, buttonVariants, cn, colors, filterDOMProps, generateId, getColorVariantClasses, isDarkTheme, isNotNullOrUndefined, mapColorToShadcnVariant, mapVariantToShadcnVariant, radius, shadows, spacing, tokens, typography };

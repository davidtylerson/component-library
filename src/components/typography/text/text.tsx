import * as React from "react";
import { cn } from "@/lib/utils";

// Define the possible element types
type ElementType = React.ElementType;

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
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
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
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
      xl: "text-text-xl",
      lg: "text-text-lg",
      md: "text-text-md",
      sm: "text-text-sm",
      xs: "text-text-xs",
    };

    const weightClasses = {
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const colorClasses = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-brand-700 dark:text-brand-400",
      error: "text-error-700 dark:text-error-400",
      warning: "text-warning-700 dark:text-warning-400",
      success: "text-success-700 dark:text-success-400",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          italic && "italic",
          underline && "underline",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
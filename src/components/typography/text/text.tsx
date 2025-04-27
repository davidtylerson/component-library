import React from "react";
import { cn } from "@/lib/utils";

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
   * The content to be rendered
   */
  children: React.ReactNode;
}

/**
 * Text component that follows the design system guidelines
 */
export const Text: React.FC<TextProps> = ({
  size = "md",
  weight = "regular",
  italic = false,
  underline = false,
  className = "",
  children,
  ...props
}) => {
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

  const italicClass = italic ? "italic" : "";
  const underlineClass = underline ? "underline" : "";

  const classes = cn(
    sizeClasses[size],
    weightClasses[weight],
    italicClass,
    underlineClass,
    className
  );

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};
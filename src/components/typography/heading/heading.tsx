import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The level of the heading
   * @default '1'
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The size variant of the heading
   * @default 'md' for h1, 'sm' for h2, 'xs' for h3, and 'text-xl' for the rest
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
   * The content to be rendered
   */
  children: React.ReactNode;
}

/**
 * Heading component that follows the design system guidelines
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  size,
  weight = "bold",
  italic = false,
  underline = false,
  className = "",
  children,
  ...props
}) => {
  // Define possible size values explicitly
  type SizeKey = "2xl" | "xl" | "lg" | "md" | "sm" | "xs" | "text-xl" | "text-lg" | "text-md";

  // Default sizes based on heading level if not explicitly provided
  const defaultSizes: Record<number, SizeKey> = {
    1: "md",
    2: "sm",
    3: "xs",
    4: "text-xl",
    5: "text-lg",
    6: "text-md",
  };

  // Determine the final size, ensuring it's a valid SizeKey
  const finalSize: SizeKey = size || defaultSizes[level];

  const sizeClasses: Record<SizeKey, string> = {
    "2xl": "text-display-2xl",
    xl: "text-display-xl",
    lg: "text-display-lg",
    md: "text-display-md",
    sm: "text-display-sm",
    xs: "text-display-xs",
    "text-xl": "text-text-xl", // Renamed from text-xl to avoid conflict with Tailwind
    "text-lg": "text-text-lg",   // Renamed from text-lg
    "text-md": "text-text-md",   // Renamed from text-md
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
    sizeClasses[finalSize],
    weightClasses[weight],
    italicClass,
    underlineClass,
    className
  );

  // HeadingTag is now just a string like "h1", "h2", etc.
  const HeadingTag = `h${level}`;

  return React.createElement(
    HeadingTag, // Use the string tag name directly
    { className: classes, ...props },
    children
  );
};
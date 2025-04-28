// src/components/ui/button/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { ThemeColor, ComponentVariant, getColorVariantClasses } from "@/lib/theme-utils";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: ComponentVariant;

  /**
   * The color theme of the button
   * @default 'brand'
   */
  color?: ThemeColor;

  /**
   * The size of the button
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional icon to display before the button text
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional icon to display after the button text
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
}

/**
 * Button component that follows the design system guidelines
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    color = "brand",
    isLoading = false, 
    leftIcon, 
    rightIcon,
    disabled,
    children, 
    ...props 
  }, ref) => {
    // Get base size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm h-9",
      md: "px-4 py-2 text-md h-10",
      lg: "px-5 py-2.5 text-lg h-11",
    };
    
    // Get icon size based on button size
    const iconSize = {
      sm: 16,
      md: 18, 
      lg: 20
    };
    
    // Get color+variant specific classes
    const colorClasses = getColorVariantClasses(color, variant);
    
    // Combine all classes
    const buttonClasses = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      sizeClasses[size],
      colorClasses,
      className
    );
    
    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        type="button"
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
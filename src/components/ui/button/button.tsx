import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "tertiary";

  /**
   * The color theme of the button
   * @default 'brand'
   */
  color?: "brand" | "error" | "warning" | "success";

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
    variant = "primary", 
    color = "brand", 
    size = "md", 
    leftIcon, 
    rightIcon, 
    isLoading = false,
    className, 
    children, 
    ...props 
  }, ref) => {
    // Base classes that apply to all buttons
    const baseClasses = "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    // Classes that vary by size
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-md",
      lg: "px-5 py-2.5 text-lg",
    };
    
    // Classes that vary by variant and color
    const variantColorClasses = {
      primary: {
        brand: "bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500",
        error: "bg-error-600 hover:bg-error-700 text-white focus:ring-error-500",
        warning: "bg-warning-600 hover:bg-warning-700 text-white focus:ring-warning-500",
        success: "bg-success-600 hover:bg-success-700 text-white focus:ring-success-500",
      },
      secondary: {
        brand: "bg-transparent border border-brand-300 text-brand-700 hover:bg-brand-50 focus:ring-brand-500",
        error: "bg-transparent border border-error-300 text-error-700 hover:bg-error-50 focus:ring-error-500",
        warning: "bg-transparent border border-warning-300 text-warning-700 hover:bg-warning-50 focus:ring-warning-500",
        success: "bg-transparent border border-success-300 text-success-700 hover:bg-success-50 focus:ring-success-500",
      },
      tertiary: {
        brand: "bg-transparent text-brand-700 hover:bg-brand-50 focus:ring-brand-500",
        error: "bg-transparent text-error-700 hover:bg-error-50 focus:ring-error-500",
        warning: "bg-transparent text-warning-700 hover:bg-warning-50 focus:ring-warning-500",
        success: "bg-transparent text-success-700 hover:bg-success-50 focus:ring-success-500",
      },
    };
    
    // Classes for disabled state
    const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";
    
    // Combine all classes
    const classes = cn(
      baseClasses,
      sizeClasses[size],
      variantColorClasses[variant][color],
      disabledClasses,
      className
    );
    
    return (
      <button
        type="button"
        disabled={props.disabled || isLoading}
        className={classes}
        ref={ref}
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
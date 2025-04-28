/**
 * Spacing tokens used throughout the application
 * 
 * Note: This extends Tailwind's default spacing values rather than replacing them.
 * We only define semantic values here that map to Tailwind's spacing scale.
 */

export const spacing = {
  // We don't need to redefine the base spacing scale
  // as we'll use Tailwind's defaults
  
  // Semantic spacing that maps to Tailwind's scale
  layout: {
    page: '6', // maps to Tailwind's spacing-6 (1.5rem, 24px)
    section: '8', // maps to Tailwind's spacing-8 (2rem, 32px)
    subsection: '4', // maps to Tailwind's spacing-4 (1rem, 16px)
    inline: '2', // maps to Tailwind's spacing-2 (0.5rem, 8px)
  },
  
  // Component-specific spacing that maps to Tailwind's scale
  component: {
    xxs: '1', // maps to Tailwind's spacing-1 (0.25rem, 4px)
    xs: '2',  // maps to Tailwind's spacing-2 (0.5rem, 8px)
    sm: '3',  // maps to Tailwind's spacing-3 (0.75rem, 12px)
    md: '4',  // maps to Tailwind's spacing-4 (1rem, 16px)
    lg: '6',  // maps to Tailwind's spacing-6 (1.5rem, 24px)
    xl: '8',  // maps to Tailwind's spacing-8 (2rem, 32px)
    xxl: '12', // maps to Tailwind's spacing-12 (3rem, 48px)
  },
  
  // Any custom spacing values not in Tailwind's default scale
  // would be defined here for extending in the Tailwind config
  custom: {
    // Example: '4.5': '1.125rem', // 18px
  }
};

export type Spacing = typeof spacing;
/**
 * Border radius tokens used throughout the application
 * 
 * Note: This uses Tailwind's default radius naming but maps to our semantic values
 * defined by CSS variables. We don't override Tailwind's defaults but use
 * the semantic mappings for component consistency.
 */

export const radius = {
  // Semantic radius values using CSS variables
  default: 'var(--radius)',
  card: 'var(--radius)',
  button: 'var(--radius)',
  input: 'var(--radius)',
  badge: 'var(--radius)',
  
  // Shape variants
  pill: '9999px',
  circle: '50%',
  
  // Any custom radius values to extend Tailwind's defaults
  // would be defined here
  custom: {
    // Example: 'medium': '0.375rem', // 6px
  }
};

export type Radius = typeof radius;
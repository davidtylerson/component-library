/**
 * Typography token definitions based on the design system
 */

export const typography = {
  fontFamily: {
    sans: ['var(--font-inter)', 'sans-serif'],
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  fontSize: {
    // Display sizes
    'display-2xl': [
      '4.5rem',
      { lineHeight: '5.625rem', letterSpacing: '-0.02em' },
    ],
    'display-xl': [
      '3.75rem',
      { lineHeight: '4.5rem', letterSpacing: '-0.02em' },
    ],
    'display-lg': ['3rem', { lineHeight: '3.75rem', letterSpacing: '-0.02em' }],
    'display-md': [
      '2.25rem',
      { lineHeight: '2.75rem', letterSpacing: '-0.02em' },
    ],
    'display-sm': [
      '1.875rem',
      { lineHeight: '2.375rem', letterSpacing: '-0.02em' },
    ],
    'display-xs': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],

    // Text sizes
    'text-xl': ['1.25rem', { lineHeight: '1.875rem' }],
    'text-lg': ['1.125rem', { lineHeight: '1.75rem' }],
    'text-md': ['1rem', { lineHeight: '1.5rem' }],
    'text-sm': ['0.875rem', { lineHeight: '1.25rem' }],
    'text-xs': ['0.75rem', { lineHeight: '1.125rem' }],
  },
  // Predefined style combinations
  styles: {
    h1: 'text-display-md font-bold',
    h2: 'text-display-sm font-bold',
    h3: 'text-display-xs font-bold',
    h4: 'text-text-xl font-semibold',
    h5: 'text-text-lg font-semibold',
    h6: 'text-text-md font-semibold',

    // Body text
    body: 'text-text-md font-regular',
    'body-large': 'text-text-lg font-regular',
    'body-small': 'text-text-sm font-regular',

    // Special styles
    caption: 'text-text-xs font-medium',
    overline: 'text-text-xs font-medium uppercase tracking-wider',
    label: 'text-text-sm font-medium',
  },
  // For semantic variants
  variants: {
    italic: 'italic',
    underline: 'underline',
  },
};

export type Typography = typeof typography;

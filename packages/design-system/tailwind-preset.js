/**
 * Float Design System - Tailwind Preset
 * Provides semantic color tokens for consistent theming
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic Background colors
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          quaternary: 'var(--bg-quaternary)',
          disabled: 'var(--bg-disabled)',
          overlay: 'var(--bg-overlay)',
          'brand-primary': 'var(--bg-brand-primary)',
          'error-primary': 'var(--bg-error-primary)',
          'warning-primary': 'var(--bg-warning-primary)',
          'success-primary': 'var(--bg-success-primary)',
        },
        // Semantic Text colors
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          disabled: 'var(--text-disabled)',
          'brand-primary': 'var(--text-brand-primary)',
          'error-primary': 'var(--text-error-primary)',
          'warning-primary': 'var(--text-warning-primary)',
          'success-primary': 'var(--text-success-primary)',
        },
        // Semantic Border colors
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          tertiary: 'var(--border-tertiary)',
          disabled: 'var(--border-disabled)',
          brand: 'var(--border-brand)',
          'brand-solid': 'var(--border-brand-solid)',
          error: 'var(--border-error)',
          'error-solid': 'var(--border-error-solid)',
          warning: 'var(--border-warning)',
          'warning-solid': 'var(--border-warning-solid)',
          success: 'var(--border-success)',
          'success-solid': 'var(--border-success-solid)',
        },
        // Semantic Foreground colors for icons/indicators
        fg: {
          primary: 'var(--fg-primary)',
          secondary: 'var(--fg-secondary)',
          tertiary: 'var(--fg-tertiary)',
          quaternary: 'var(--fg-quaternary)',
          quinary: 'var(--fg-quinary)',
          disabled: 'var(--fg-disabled)',
          'brand-primary': 'var(--fg-brand-primary)',
          'brand-secondary': 'var(--fg-brand-secondary)',
          'error-primary': 'var(--fg-error-primary)',
          'error-secondary': 'var(--fg-error-secondary)',
          'warning-primary': 'var(--fg-warning-primary)',
          'warning-secondary': 'var(--fg-warning-secondary)',
          'success-primary': 'var(--fg-success-primary)',
          'success-secondary': 'var(--fg-success-secondary)',
          white: 'var(--fg-white)',
        },
      },
    },
  },
};

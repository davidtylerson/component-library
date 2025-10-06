/**
 * Color System Overview
 * ====================
 *
 * This design system uses a property-namespace pattern to organize semantic colors.
 * Colors are organized by their purpose (text, background, border, etc.) and then
 * by their semantic role (primary, secondary, error, etc.).
 *
 * Structure:
 * ----------
 * colors: {
 *   // Standard colors (overriding Tailwind defaults)
 *   gray: { 25: "var(--color-gray-25)", 50: "var(--color-gray-50)", ... },
 *   red: { ... }, // maps to error colors
 *   amber: { ... }, // maps to warning colors
 *   green: { ... }, // maps to success colors
 *   indigo: { ... }, // maps to brand colors
 *
 *   // Semantic color groups (in theme.extend.colors)
 *   bg: { primary: "var(--bg-primary)", secondary: "var(--bg-secondary)", ... },
 *   text: { primary: "var(--text-primary)", secondary: "var(--text-secondary)", ... },
 *   border: { primary: "var(--border-primary)", ... },
 *   fg: { primary: "var(--fg-primary)", ... }
 * }
 *
 * How it works:
 * -------------
 * 1. CSS variables are defined in globals.css with light/dark mode variants
 * 2. These variables are referenced in tailwind.config.js
 * 3. Tailwind generates utility classes based on this configuration
 *
 * Usage examples:
 * --------------
 * - bg-bg-primary → applies var(--bg-primary) as background color
 * - text-text-secondary → applies var(--text-secondary) as text color
 * - border-border-error → applies var(--border-error) as border color
 *
 * The property-namespace pattern (e.g., bg-bg-primary) avoids conflicts with
 * other utility classes while maintaining semantic meaning.
 *
 *
 * Visual representation:
 *
 * ┌─ tailwind.config.js ─────────────┐        ┌─ globals.css ─────────────────┐
 * │                                  │        │                                │
 * │ colors: {                        │        │ :root {                        │
 * │   bg: {                          │        │   --bg-primary: #ffffff;       │
 * │     primary: "var(--bg-primary)" │───┐    │   --bg-secondary: #fafafa;     │
 * │   },                             │   │    │   --text-primary: #1a1a1e;     │
 * │   text: {                        │   │    │   ...                          │
 * │     primary: "var(--text-primary)"│──┼────│→ }                             │
 * │   }                              │   │    │                                │
 * │ }                                │   │    │ .dark {                        │
 * └──────────────────────────────────┘   │    │   --bg-primary: #131316;       │
 *                                        │    │   --text-primary: #fcfcfc;     │
 * ┌─ Generated CSS ───────────────────┐  │    │   ...                          │
 * │                                   │  │    │ }                              │
 * │ .bg-bg-primary {                  │←─┘    └────────────────────────────────┘
 * │   background-color: var(--bg-primary);│
 * │ }                                 │      ┌─ HTML Usage ─────────────────┐
 * │ .text-text-primary {              │      │                              │
 * │   color: var(--text-primary);     │      │ <div class="bg-bg-primary    │
 * │ }                                 │      │            text-text-primary">│
 * └───────────────────────────────────┘      │   Hello World                │
 *                                            │ </div>                        │
 *                                            └──────────────────────────────┘
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './packages/design-system/src/**/*.{ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: 'var(--color-black)',
      white: 'var(--color-white)',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: 'hsl(var(--card))',
      'card-foreground': 'hsl(var(--card-foreground))',
      popover: 'hsl(var(--popover))',
      'popover-foreground': 'hsl(var(--popover-foreground))',
      primary: 'hsl(var(--primary))',
      'primary-foreground': 'hsl(var(--primary-foreground))',
      secondary: 'hsl(var(--secondary))',
      'secondary-foreground': 'hsl(var(--secondary-foreground))',
      muted: 'hsl(var(--muted))',
      'muted-foreground': 'hsl(var(--muted-foreground))',
      accent: 'hsl(var(--accent))',
      'accent-foreground': 'hsl(var(--accent-foreground))',
      destructive: 'hsl(var(--destructive))',
      'destructive-foreground': 'hsl(var(--destructive-foreground))',
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      gray: {
        25: 'var(--color-gray-25)',
        50: 'var(--color-gray-50)',
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        800: 'var(--color-gray-800)',
        900: 'var(--color-gray-900)',
        950: 'var(--color-gray-950)',
      },
      red: {
        25: 'var(--color-error-25)',
        50: 'var(--color-error-50)',
        100: 'var(--color-error-100)',
        200: 'var(--color-error-200)',
        300: 'var(--color-error-300)',
        400: 'var(--color-error-400)',
        500: 'var(--color-error-500)',
        600: 'var(--color-error-600)',
        700: 'var(--color-error-700)',
        800: 'var(--color-error-800)',
        900: 'var(--color-error-900)',
        950: 'var(--color-error-950)',
      },
      amber: {
        25: 'var(--color-warning-25)',
        50: 'var(--color-warning-50)',
        100: 'var(--color-warning-100)',
        200: 'var(--color-warning-200)',
        300: 'var(--color-warning-300)',
        400: 'var(--color-warning-400)',
        500: 'var(--color-warning-500)',
        600: 'var(--color-warning-600)',
        700: 'var(--color-warning-700)',
        800: 'var(--color-warning-800)',
        900: 'var(--color-warning-900)',
        950: 'var(--color-warning-950)',
      },
      green: {
        25: 'var(--color-success-25)',
        50: 'var(--color-success-50)',
        100: 'var(--color-success-100)',
        200: 'var(--color-success-200)',
        300: 'var(--color-success-300)',
        400: 'var(--color-success-400)',
        500: 'var(--color-success-500)',
        600: 'var(--color-success-600)',
        700: 'var(--color-success-700)',
        800: 'var(--color-success-800)',
        900: 'var(--color-success-900)',
        950: 'var(--color-success-950)',
      },
      indigo: {
        25: 'var(--color-brand-25)',
        50: 'var(--color-brand-50)',
        100: 'var(--color-brand-100)',
        200: 'var(--color-brand-200)',
        300: 'var(--color-brand-300)',
        400: 'var(--color-brand-400)',
        500: 'var(--color-brand-500)',
        600: 'var(--color-brand-600)',
        700: 'var(--color-brand-700)',
        800: 'var(--color-brand-800)',
        900: 'var(--color-brand-900)',
        950: 'var(--color-brand-950)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          25: 'var(--color-brand-25)',
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },
        error: {
          25: 'var(--color-error-25)',
          50: 'var(--color-error-50)',
          100: 'var(--color-error-100)',
          200: 'var(--color-error-200)',
          300: 'var(--color-error-300)',
          400: 'var(--color-error-400)',
          500: 'var(--color-error-500)',
          600: 'var(--color-error-600)',
          700: 'var(--color-error-700)',
          800: 'var(--color-error-800)',
          900: 'var(--color-error-900)',
          950: 'var(--color-error-950)',
        },
        warning: {
          25: 'var(--color-warning-25)',
          50: 'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          200: 'var(--color-warning-200)',
          300: 'var(--color-warning-300)',
          400: 'var(--color-warning-400)',
          500: 'var(--color-warning-500)',
          600: 'var(--color-warning-600)',
          700: 'var(--color-warning-700)',
          800: 'var(--color-warning-800)',
          900: 'var(--color-warning-900)',
          950: 'var(--color-warning-950)',
        },
        success: {
          25: 'var(--color-success-25)',
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          800: 'var(--color-success-800)',
          900: 'var(--color-success-900)',
          950: 'var(--color-success-950)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          disabled: 'var(--text-disabled)',
          'brand-primary': 'var(--text-brand-primary)',
          'brand-secondary': 'var(--text-brand-secondary)',
          'brand-tertiary': 'var(--text-brand-tertiary)',
          'error-primary': 'var(--text-error-primary)',
          'warning-primary': 'var(--text-warning-primary)',
          'success-primary': 'var(--text-success-primary)',
        },
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          quaternary: 'var(--bg-quaternary)',
          disabled: 'var(--bg-disabled)',
          overlay: 'var(--bg-overlay)',
          'brand-primary': 'var(--bg-brand-primary)',
          'brand-secondary': 'var(--bg-brand-secondary)',
          'brand-solid': 'var(--bg-brand-solid)',
          'error-primary': 'var(--bg-error-primary)',
          'error-secondary': 'var(--bg-error-secondary)',
          'error-solid': 'var(--bg-error-solid)',
          'warning-primary': 'var(--bg-warning-primary)',
          'warning-secondary': 'var(--bg-warning-secondary)',
          'warning-solid': 'var(--bg-warning-solid)',
          'success-primary': 'var(--bg-success-primary)',
          'success-secondary': 'var(--bg-success-secondary)',
          'success-solid': 'var(--bg-success-solid)',
        },
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          tertiary: 'var(--border-tertiary)',
          disabled: 'var(--border-disabled)',
          brand: 'var(--border-brand)',
          'brand-solid': 'var(--border-brand-solid)',
          error: 'var(--border-error)',
          'error-solid': 'var(--border-error-solid)',
        },
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        'ds-bg': {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          quaternary: 'var(--bg-quaternary)',
          disabled: 'var(--bg-disabled)',
          overlay: 'var(--bg-overlay)',
        },
        'ds-text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          disabled: 'var(--text-disabled)',
        },
        'ds-border': {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          tertiary: 'var(--border-tertiary)',
          disabled: 'var(--border-disabled)',
        },
        'ds-fg': {
          primary: 'var(--fg-primary)',
          secondary: 'var(--fg-secondary)',
          tertiary: 'var(--fg-tertiary)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        // Override Tailwind defaults for our type scale
        xs: ['0.75rem', { lineHeight: '1.125rem' }],
        sm: ['0.8125rem', { lineHeight: '1.25rem' }], // 13px - our design system standard
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],

        // Design system specific display sizes
        'display-2xl': [
          '4.5rem',
          {
            lineHeight: '5.625rem',
            letterSpacing: '-0.02em',
          },
        ],
        'display-xl': [
          '3.75rem',
          {
            lineHeight: '4.5rem',
            letterSpacing: '-0.02em',
          },
        ],
        'display-lg': [
          '3rem',
          {
            lineHeight: '3.75rem',
            letterSpacing: '-0.02em',
          },
        ],
        'display-md': [
          '2.25rem',
          {
            lineHeight: '2.75rem',
            letterSpacing: '-0.02em',
          },
        ],
        'display-sm': [
          '1.875rem',
          {
            lineHeight: '2.375rem',
            letterSpacing: '-0.02em',
          },
        ],
        'display-xs': [
          '1.5rem',
          {
            lineHeight: '2rem',
            letterSpacing: '-0.02em',
          },
        ],
        'text-xl': [
          '1.25rem',
          {
            lineHeight: '1.875rem',
          },
        ],
        'text-lg': [
          '1.125rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        'text-md': [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: 0,
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: 0,
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

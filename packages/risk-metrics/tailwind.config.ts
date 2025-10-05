import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Import design system colors
        gray: {
          25: '#fcfcfc',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        brand: {
          50: '#f0f0ff',
          100: '#e6e6ff',
          200: '#d1d1ff',
          300: '#b3b3ff',
          400: '#8a8aff',
          500: '#6666ff',
          600: '#4a49a6',
          700: '#343688',
          800: '#2a2a6b',
          900: '#252556',
          950: '#16163a',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#bd3e1e',
          700: '#99371e',
          800: '#7c2d12',
          900: '#431407',
          950: '#2c0a03',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Semantic colors with transparency
        text: {
          primary: 'rgba(26, 26, 30, 0.87)',
          secondary: 'rgba(26, 26, 30, 0.60)',
          tertiary: 'rgba(26, 26, 30, 0.32)',
        },
        border: {
          primary: 'rgba(228, 228, 231, 1.0)',
          secondary: 'rgba(228, 228, 231, 0.8)',
          tertiary: 'rgba(228, 228, 231, 0.6)',
        },
        bg: {
          primary: '#ffffff',
          secondary: '#fafafa',
          tertiary: '#f4f4f5',
        },
      },
    },
  },
  plugins: [],
}

export default config

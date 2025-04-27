/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                brand: {
                    DEFAULT: "#4a49a6",
                    50: "hsl(var(--brand-50))",
                    100: "hsl(var(--brand-100))",
                    200: "hsl(var(--brand-200))",
                    300: "hsl(var(--brand-300))",
                    400: "hsl(var(--brand-400))",
                    500: "hsl(var(--brand-500))",
                    600: "hsl(var(--brand-600))",
                    700: "hsl(var(--brand-700))",
                    800: "hsl(var(--brand-800))",
                    900: "hsl(var(--brand-900))",
                    950: "hsl(var(--brand-950))",
                },
                error: {
                    DEFAULT: "hsl(var(--error))",
                    foreground: "hsl(var(--error-foreground))",
                    50: "hsl(var(--error-50))",
                    // Other error color variants...
                },
                warning: {
                    DEFAULT: "hsl(var(--warning))",
                    foreground: "hsl(var(--warning-foreground))",
                    50: "hsl(var(--warning-50))",
                    // Other warning color variants...
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                    50: "hsl(var(--success-50))",
                    // Other success color variants...
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
            fontSize: {
                "display-2xl": ["4.5rem", { lineHeight: "5.625rem", letterSpacing: "-0.02em" }],
                "display-xl": ["3.75rem", { lineHeight: "4.5rem", letterSpacing: "-0.02em" }],
                "display-lg": ["3rem", { lineHeight: "3.75rem", letterSpacing: "-0.02em" }],
                "display-md": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.02em" }],
                "display-sm": ["1.875rem", { lineHeight: "2.375rem", letterSpacing: "-0.02em" }],
                "display-xs": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
                "text-xl": ["1.25rem", { lineHeight: "1.875rem" }],
                "text-lg": ["1.125rem", { lineHeight: "1.75rem" }],
                "text-md": ["1rem", { lineHeight: "1.5rem" }],
                "text-sm": ["0.875rem", { lineHeight: "1.25rem" }],
                "text-xs": ["0.75rem", { lineHeight: "1.125rem" }],
                // Other font sizes...
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
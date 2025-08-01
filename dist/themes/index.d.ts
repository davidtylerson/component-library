import * as react_jsx_runtime from 'react/jsx-runtime';
import { ThemeProviderProps } from 'next-themes/dist/types';

/**
 * ThemeProvider component for handling theme state
 *
 * This wraps the next-themes provider with sensible defaults
 * for handling light/dark themes and system preferences
 *
 * IMPORTANT: This component must be used in a Client Component context.
 * For Server Components, use the NoSSR wrapper or dynamic imports.
 */
declare function ThemeProvider({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
/**
 * NoSSR wrapper for theme provider to prevent SSR issues
 * Use this when you need to ensure the theme provider only renders on the client
 */
declare function ThemeProviderNoSSR({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;

/**
 * Client-only theme provider wrapper
 * This component ensures theme functionality only runs on the client side
 * without using next/dynamic which causes Server Component issues
 */
declare function ClientThemeProvider({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
/**
 * Client-only theme toggle wrapper
 * This component ensures theme toggle only renders on the client side
 * and provides a safe fallback for Server Components
 */
declare function ClientThemeToggle(props: any): react_jsx_runtime.JSX.Element;

/**
 * Server-safe theme hook that can be used in Server Components
 * Returns default theme values without accessing client-side APIs
 */
declare function useThemeServer(): {
    theme: string;
    setTheme: (theme: string) => void;
    resolvedTheme: string;
    isDark: boolean;
};

export { ClientThemeProvider, ClientThemeToggle, ThemeProvider, ThemeProviderNoSSR, useThemeServer };

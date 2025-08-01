// Theme system exports
export { ThemeProvider } from './theme-provider';

// Client-only wrappers for Server Component compatibility
export { ClientThemeProvider, ClientThemeToggle } from './client-wrapper';

// Server-safe theme hook
export { useThemeServer } from './theme-context';

// NOTE: ThemeToggle and useTheme are NOT exported to prevent Server Component issues
// Use ClientThemeToggle and useThemeServer instead for Server Component compatibility

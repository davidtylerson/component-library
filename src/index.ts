// Main design system exports
export * from './components/ui';
export * from './components/typography';
export * from './lib/utils';
export * from './tokens';

// Explicitly export theme components
export {
  ThemeProvider,
  ClientThemeProvider,
  ClientThemeToggle,
  useThemeServer,
} from './themes';

// Export theme utilities and types directly
export {
  isDarkTheme,
  mapColorToShadcnVariant,
  mapVariantToShadcnVariant,
  getColorVariantClasses,
} from './lib/theme-utils';
export type { ThemeColor, ComponentVariant } from './lib/theme-utils';

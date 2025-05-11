# Component-Specific Color System

## Overview

The component-specific color system is designed to provide isolated, scoped color variables for individual components while maintaining consistency with our global design system. This approach allows components to have their own semantic color variables without polluting the global namespace or creating conflicts.

## Architecture

The system follows a layered approach:

```
src/
├── styles/
│   ├── components/           # Component-specific CSS files
│   │   └── button.css       # Button-specific variables
│   ├── constants/           # TypeScript constants
│   │   └── button-colors.ts # Button color constants
│   └── index.css           # Main CSS entry point
└── components/
    └── Button.tsx          # Component implementation
```

## Naming Convention

Component-specific variables follow this pattern:
```
--float-{component}-{variant}-{property}-{state}
```

Example:
- `--float-button-primary-bg` (Button component, primary variant, background property)
- `--float-button-secondary-fg-hover` (Button component, secondary variant, foreground property, hover state)

## Implementation Details

### 1. CSS Variables (button.css)

Component-specific variables are defined in a scoped CSS class:

```css
.float-button {
  --float-button-primary-bg: var(--colors-brand-700);
  --float-button-primary-bg-hover: var(--colors-brand-800);
  /* ... other variables ... */
}
```

### 2. TypeScript Constants (button-colors.ts)

For type safety and autocompletion, we define constants:

```typescript
export const BUTTON_COLORS = {
  primary: {
    bg: 'var(--float-button-primary-bg)',
    bgHover: 'var(--float-button-primary-bg-hover)',
    // ... other properties
  },
  // ... other variants
} as const;

export type ButtonVariant = keyof typeof BUTTON_COLORS;
```

### 3. Usage in Components

Components use these variables through Tailwind's arbitrary value syntax:

```tsx
<button 
  className={cn(
    'float-button', // Applies component-specific variables
    'bg-[var(--float-button-primary-bg)]',
    'hover:bg-[var(--float-button-primary-bg-hover)]'
  )}
>
```

## Benefits

1. **Isolation**: Component-specific variables are scoped to their components
2. **Type Safety**: TypeScript constants provide type checking and autocompletion
3. **Maintainability**: Clear organization and naming conventions
4. **Flexibility**: Easy to modify component-specific colors without affecting global system
5. **Consistency**: Still leverages global design tokens for actual color values

## Best Practices

1. **Scoping**: Always scope variables to a component-specific class
2. **Naming**: Follow the established naming convention strictly
3. **Constants**: Use TypeScript constants for type safety
4. **Documentation**: Keep component-specific variables documented
5. **Global Tokens**: Reference global design tokens for actual color values

## Adding New Components

To add component-specific colors for a new component:

1. Create a new CSS file in `styles/components/`
2. Define variables following the naming convention
3. Create corresponding TypeScript constants
4. Import the CSS file in `globals.css`
5. Use the variables in your component

## Example: Adding a New Component

```css
/* styles/components/card.css */
.float-card {
  --float-card-primary-bg: var(--colors-base-white);
  --float-card-primary-border: var(--colors-gray-light-mode-300);
  /* ... other variables ... */
}
```

```typescript
// styles/constants/card-colors.ts
export const CARD_COLORS = {
  primary: {
    bg: 'var(--float-card-primary-bg)',
    border: 'var(--float-card-primary-border)',
  },
} as const;
```

## Migration Guide

When migrating existing components to use component-specific colors:

1. Identify all color variables used by the component
2. Create component-specific CSS file
3. Define variables following the naming convention
4. Create TypeScript constants
5. Update component to use new variables
6. Remove any global color variables that are no longer needed

## Troubleshooting

Common issues and solutions:

1. **Variables not applying**: Ensure the component has the correct class name (e.g., `float-button`)
2. **Type errors**: Check that TypeScript constants are properly exported and imported
3. **Missing variables**: Verify that all needed variables are defined in the component's CSS file
4. **Inconsistent colors**: Ensure variables reference the correct global design tokens 
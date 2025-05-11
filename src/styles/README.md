# Float Design System Styles

This directory contains the styling architecture for the Float Design System. It follows a layered approach to maintain consistency, flexibility, and maintainability.

## Directory Structure

```
styles/
├── components/           # Component-specific styles
│   └── button.css       # Button-specific variables
├── constants/           # TypeScript constants for styles
│   └── button-colors.ts # Button color constants
└── README.md           # This file
```

## Key Concepts

### 1. Global Design Tokens
The foundation of our design system, defined in `globals.css`. These are the raw color values and base design tokens that everything else builds upon.

### 2. Component-Specific Variables
Component-specific color variables that are scoped to individual components. These provide isolated styling while maintaining consistency with the global design system.

For detailed documentation on the component-specific color system, see:
[Component-Specific Color System Documentation](../../docs/component-specific-colors.md)

## Usage

### Adding New Component Styles

1. Create a new CSS file in `components/` for your component
2. Define variables following the naming convention
3. Create corresponding TypeScript constants in `constants/`
4. Import the CSS file in `globals.css`

Example:
```css
/* components/card.css */
.float-card {
  --float-card-primary-bg: var(--colors-base-white);
  --float-card-primary-border: var(--colors-gray-light-mode-300);
}
```

### Using in Components

```tsx
<button 
  className={cn(
    'float-button', // Applies component-specific variables
    'bg-[var(--float-button-primary-bg)]',
    'hover:bg-[var(--float-button-primary-bg-hover)]'
  )}
>
```

## Best Practices

1. Always scope component-specific variables to a component class
2. Follow the established naming convention
3. Use TypeScript constants for type safety
4. Reference global design tokens for actual color values
5. Keep component-specific variables documented

For more detailed best practices and guidelines, refer to the [Component-Specific Color System Documentation](../../docs/component-specific-colors.md). 
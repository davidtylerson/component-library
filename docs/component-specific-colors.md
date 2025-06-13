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

## Naming Convention (Updated)

### **Current Pattern: Component-First Naming**

Component-specific variables follow this pattern:
```
--{component}-{property}-{variant}-{state}
```

**Examples:**
- `--button-bg-primary` (Button component, background property, primary variant)
- `--button-bg-primary-hover` (Button component, background property, primary variant, hover state)
- `--input-border-focus` (Input component, border property, focus state)
- `--dropdown-item-bg-brand-hover` (Dropdown component, item sub-component, background property, brand variant, hover state)

### **Why This Pattern?**

1. **Component Grouping**: All variables for a component are grouped together (e.g., `--button-*`)
2. **Developer Experience**: Autocomplete shows all related variables when typing component name
3. **Third-party Override**: Removes namespace conflicts, allows overriding third-party library variables
4. **Semantic Alignment**: Matches our global semantic pattern (`--bg-primary`, `--text-secondary`)

### **Pattern Breakdown**

| Part | Purpose | Examples |
|------|---------|----------|
| `{component}` | Component name | `button`, `input`, `dropdown`, `sidebar`, `card` |
| `{property}` | CSS property type | `bg`, `text`, `border`, `shadow`, `width` |
| `{variant}` | Semantic or style variant | `primary`, `secondary`, `brand`, `error`, `outline` |
| `{state}` | Interactive state | `hover`, `focus`, `active`, `disabled`, `checked` |

### **Complete Examples by Component**

**Button Variables:**
```css
--button-bg-primary
--button-bg-primary-hover
--button-bg-secondary
--button-bg-destructive
--button-text-primary
--button-text-link
--button-text-link-hover
--button-border-outline
--button-border-outline-hover
--button-icon-size-sm
```

**Input Variables:**
```css
--input-bg
--input-bg-disabled
--input-text
--input-text-placeholder
--input-border
--input-border-hover
--input-border-focus
--input-ring
```

**Dropdown Variables:**
```css
--dropdown-bg
--dropdown-text
--dropdown-border
--dropdown-item-bg-hover
--dropdown-item-text-brand-hover
--dropdown-separator-bg
```

### **Alignment with Global Semantic Variables**

Our component variables perfectly complement the global semantic system:

```css
/* Global Semantic Variables */
--bg-primary, --bg-secondary, --bg-brand-primary
--text-primary, --text-error-primary
--border-primary, --border-brand

/* Component Variables (Same Pattern) */
--button-bg-primary, --button-text-primary, --button-border-primary
--input-bg, --input-text, --input-border-focus
--dropdown-bg, --dropdown-item-bg-hover
```

## Implementation Details

### 1. CSS Variables (button.css)

Component-specific variables are defined at the root level:

```css
:root {
  --button-bg-primary: var(--color-brand-700);
  --button-bg-primary-hover: var(--color-brand-800);
  --button-text-primary: white;
  --button-text-primary-hover: white;
  --button-border-primary: var(--color-brand-700);
  --button-border-primary-hover: var(--color-brand-800);
}

.dark {
  --button-bg-primary: var(--color-brand-700);
  --button-bg-primary-hover: var(--color-brand-800);
  /* Dark theme overrides */
}
```

### 2. TypeScript Constants (button-colors.ts)

For type safety and autocompletion, we define constants:

```typescript
export const BUTTON_COLORS = {
  primary: {
    bg: 'var(--button-bg-primary)',
    bgHover: 'var(--button-bg-primary-hover)',
    text: 'var(--button-text-primary)',
    textHover: 'var(--button-text-primary-hover)',
    border: 'var(--button-border-primary)',
    borderHover: 'var(--button-border-primary-hover)',
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
    'bg-[var(--button-bg-primary)]',
    'text-[var(--button-text-primary)]',
    'border-[var(--button-border-primary)]',
    'hover:bg-[var(--button-bg-primary-hover)]',
    'hover:text-[var(--button-text-primary-hover)]'
  )}
>
```

## Benefits

1. **Component Grouping**: All variables for a component are logically grouped
2. **Autocomplete Friendly**: Type `--button-` to see all button-related variables
3. **Third-party Integration**: Can override third-party library variables with same names
4. **Semantic Consistency**: Aligns with global design system naming patterns
5. **Type Safety**: TypeScript constants provide type checking and autocompletion
6. **Maintainability**: Clear organization and naming conventions
7. **Flexibility**: Easy to modify component-specific colors without affecting global system

## Best Practices

1. **Consistent Naming**: Always follow the `--{component}-{property}-{variant}-{state}` pattern
2. **Property Names**: Use consistent property names (`bg`, `text`, `border`, not `background`, `color`, `border-color`)
3. **Semantic Variants**: Use semantic names (`primary`, `secondary`) over style names (`blue`, `large`)
4. **Global References**: Always reference global design tokens for actual color values
5. **Documentation**: Keep component-specific variables documented
6. **TypeScript**: Create corresponding TypeScript constants for all CSS variables

## Adding New Components

To add component-specific colors for a new component:

1. Create a new CSS file in `styles/components/`
2. Define variables following the naming convention: `--{component}-{property}-{variant}`
3. Create corresponding TypeScript constants
4. Import the CSS file in `globals.css`
5. Use the variables in your component

## Example: Adding a New Component

```css
/* styles/components/card.css */
:root {
  --card-bg-default: var(--bg-secondary);
  --card-bg-subtle: var(--bg-primary);
  --card-border: var(--border-tertiary);
  --card-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  --card-title-text: var(--text-primary);
  --card-description-text: var(--text-tertiary);
}
```

```typescript
// styles/constants/card-colors.ts
export const CARD_COLORS = {
  default: {
    bg: 'var(--card-bg-default)',
    border: 'var(--card-border)',
    shadow: 'var(--card-shadow)',
  },
  subtle: {
    bg: 'var(--card-bg-subtle)',
    border: 'var(--card-border)',
  },
  title: {
    text: 'var(--card-title-text)',
  },
  description: {
    text: 'var(--card-description-text)',
  },
} as const;
```

## Migration Guide

When migrating from the old `--float-*` naming convention:

1. **Identify all existing variables** used by the component
2. **Map to new naming pattern**:
   - `--float-button-primary-bg` → `--button-bg-primary`
   - `--float-input-border-focus` → `--input-border-focus`
   - `--float-dropdown-item-brand-bg-hover` → `--dropdown-item-bg-brand-hover`
3. **Update CSS files** with new variable names
4. **Update TypeScript constants** to reference new variables
5. **Update component usage** to use new variable names
6. **Remove old variables** once migration is complete

## Troubleshooting

Common issues and solutions:

1. **Variables not applying**: Ensure variables are defined in `:root` scope, not component-scoped classes
2. **Type errors**: Check that TypeScript constants are properly exported and imported
3. **Missing variables**: Verify that all needed variables are defined following the naming pattern
4. **Inconsistent colors**: Ensure variables reference the correct global design tokens
5. **Autocomplete not working**: Verify variable names follow the exact pattern `--{component}-{property}-{variant}` 
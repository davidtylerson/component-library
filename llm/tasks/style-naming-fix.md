# CSS Variable Naming Refactor Implementation Plan

## Problem Statement

### Current Issue

Our component library currently uses CSS variables with a `--float-` prefix pattern like:

- `--float-button-primary-bg`
- `--float-input-border-focus`
- `--float-dropdown-item-brand-bg-hover`

### Desired Solution

We want to switch to a **component-first naming pattern** that:

- Removes the `--float-` prefix
- Groups variables by component name
- Follows the pattern: `--{component}-{property}-{variant}-{state}`

**Examples:**

- `--float-button-primary-bg` → `--button-bg-primary`
- `--float-input-border-focus` → `--input-border-focus`
- `--float-dropdown-item-brand-bg-hover` → `--dropdown-item-bg-brand-hover`

### Why This Change?

1. **Better Organization**: All button variables start with `--button-`
2. **Developer Experience**: Autocomplete shows all related variables when typing component name
3. **Third-party Integration**: Can override third-party library variables with same names
4. **Consistency**: Aligns with our global semantic variable patterns

## Key Context for Implementation

### Project Structure

```
src/
├── app/globals.css                    # Main CSS file
├── styles/
│   ├── components/                    # Component-specific CSS files
│   │   ├── button.css
│   │   ├── input-dropdown.css
│   │   └── [other-components].css
│   └── constants/                     # TypeScript constants
│       └── [component]-colors.ts
└── components/
    └── ui/                           # React components
        ├── button.tsx
        └── [other-components].tsx
```

### Current Variable Usage Patterns

CSS variables are used in two ways:

1. **In CSS files**: Defined as `--float-*` variables
2. **In React components**: Used via Tailwind's arbitrary values like `bg-[var(--float-button-primary-bg)]`

### Files That Will Need Updates

- ✅ CSS files in `src/styles/components/`
- ✅ React components in `src/components/ui/`
- ✅ TypeScript constants in `src/styles/constants/`

## Implementation Tasks

### Phase 1: Discovery and Planning

#### Task 1.1: Complete Variable Audit

**Goal**: Create a comprehensive list of all `--float-` prefixed variables currently in use.

**Steps**:

- [ ] Search for all `--float-` variables in CSS files:

  ```bash
  grep -r "--float-" src/styles/
  ```

- [ ] Search for all `var(--float-` usage in components:

  ```bash
  grep -r "var(--float-" src/
  ```

- [ ] Create a mapping document with:
  - Current variable name
  - New variable name
  - Files where it's used
  - Component it belongs to

**Expected Output**: A spreadsheet or markdown table with complete mapping.

#### Task 1.2: Identify Component Groups

**Goal**: Group variables by component to ensure consistent naming.

**Steps**:

- [ ] From the audit, group variables by component (button, input, dropdown, etc.)
- [ ] For each component, identify the property types (bg, text, border, etc.)
- [ ] Identify variants (primary, secondary, brand, etc.)
- [ ] Identify states (hover, focus, disabled, etc.)

**Expected Output**: Organized groups showing the new naming structure for each component.

### Phase 2: CSS Variable Definitions

#### Task 2.1: Update Component CSS Files

**Goal**: Replace all `--float-` variable definitions with new component-first names.

**For each CSS file in `src/styles/components/`**:

- [ ] **Open the file** (e.g., `src/styles/components/button.css`)
- [ ] **Find all variable definitions** with `--float-` prefix
- [ ] **Replace with new names** following the pattern `--{component}-{property}-{variant}-{state}`

**Example transformation**:

```css
/* BEFORE */
:root {
  --float-button-primary-bg: var(--color-brand-700);
  --float-button-primary-bg-hover: var(--color-brand-800);
  --float-button-primary-fg: white;
}

/* AFTER */
:root {
  --button-bg-primary: var(--color-brand-700);
  --button-bg-primary-hover: var(--color-brand-800);
  --button-text-primary: white;
}
```

**Files to update**:

- [x] `src/styles/components/button.css` ✅ COMPLETED
- [x] `src/styles/components/input-dropdown.css` ✅ COMPLETED
- [x] `src/styles/components/input.css` ✅ COMPLETED
- [x] `src/app/globals.css` (checkbox + sidebar variables) ✅ COMPLETED
- [ ] `src/styles/components/sidebar.css` (variable definitions done, usage needs update)

#### Task 2.2: Verify CSS Syntax

**Goal**: Ensure all CSS files are valid after changes.

**Steps**:

- [x] Run the development server: `npm run dev` ✅ COMPLETED - No errors
- [x] Check browser console for CSS errors ✅ COMPLETED - Clean startup
- [x] Verify styles are still loading correctly ✅ COMPLETED - Server running
- [x] Fix any syntax errors found ✅ COMPLETED - No errors found

### Phase 3: Component Usage Updates

#### Task 3.1: Update React Components

**Goal**: Replace `var(--float-*)` usage in React components with new variable names.

**For each React component file**:

- [ ] **Search for** `var(--float-` usage
- [ ] **Replace** with new variable names
- [ ] **Test** component still renders correctly

**Example transformation**:

```tsx
// BEFORE
className =
  'bg-[var(--float-button-primary-bg)] hover:bg-[var(--float-button-primary-bg-hover)]';

// AFTER
className =
  'bg-[var(--button-bg-primary)] hover:bg-[var(--button-bg-primary-hover)]';
```

**Key files to update**:

- [ ] `src/components/ui/button.tsx`
- [ ] Any other component files found in audit

#### Task 3.2: Update TypeScript Constants

**Goal**: Update TypeScript constant files to reference new variable names.

**For each constants file in `src/styles/constants/`**:

- [ ] **Find** references to `--float-` variables
- [ ] **Replace** with new variable names
- [ ] **Verify** TypeScript compilation still works

**Example transformation**:

```typescript
// BEFORE
export const BUTTON_COLORS = {
  primary: {
    bg: 'var(--float-button-primary-bg)',
    bgHover: 'var(--float-button-primary-bg-hover)',
  },
};

// AFTER
export const BUTTON_COLORS = {
  primary: {
    bg: 'var(--button-bg-primary)',
    bgHover: 'var(--button-bg-primary-hover)',
  },
};
```

### Phase 4: Testing and Validation

#### Task 4.1: Visual Regression Testing

**Goal**: Ensure all components look identical before and after changes.

**Steps**:

- [ ] **Before changes**: Take screenshots of all components in Storybook or demo pages
- [ ] **After changes**: Take identical screenshots
- [ ] **Compare** to ensure no visual differences
- [ ] **Fix** any styling issues found

#### Task 4.2: Development Testing

**Goal**: Verify the development experience works correctly.

**Steps**:

- [ ] **Start development server**: `npm run dev`
- [ ] **Test hot reloading**: Make a small CSS change and verify it updates
- [ ] **Test component usage**: Create a new component using the new variable pattern
- [ ] **Verify autocomplete**: Check that IDE autocomplete works for new variable names

#### Task 4.3: Build Testing

**Goal**: Ensure production builds work correctly.

**Steps**:

- [ ] **Run build**: `npm run build`
- [ ] **Check for errors**: Verify build completes without CSS or TypeScript errors
- [ ] **Test production**: Start production server and spot-check key components

### Phase 5: Documentation and Cleanup

#### Task 5.1: Update Documentation

**Goal**: Ensure all documentation reflects the new naming pattern.

**Files to update**:

- [ ] Verify `README.md` is accurate (already updated)
- [ ] Update any component documentation with new variable names
- [ ] Update any development guides or style guides

#### Task 5.2: Final Code Review

**Goal**: Ensure code quality and consistency.

**Steps**:

- [ ] **Review all changed files** for consistency
- [ ] **Check naming patterns** match the established convention exactly
- [ ] **Verify no `--float-` references remain** (except in this task document)
- [ ] **Run linting**: `npm run lint` and fix any issues

## Success Criteria

### ✅ All Tasks Complete When:

- [ ] No `--float-` prefixed variables exist in CSS files
- [ ] No `var(--float-` usage exists in React components
- [ ] All components render identically to before changes
- [ ] Development server starts without errors
- [ ] Production build completes without errors
- [ ] TypeScript compilation works without errors
- [ ] All new variables follow `--{component}-{property}-{variant}-{state}` pattern

### ✅ Developer Experience Improved:

- [ ] Typing `--button-` shows all button-related variables in autocomplete
- [ ] Component variables are logically grouped by component name
- [ ] Variable names are more intuitive and descriptive

## Rollback Plan

If issues are discovered after implementation:

- [ ] **Immediate**: Revert the commit containing the changes
- [ ] **Investigate**: Identify the specific issue causing problems
- [ ] **Fix**: Address the issue and re-apply changes
- [ ] **Test**: Run through validation tasks again

## Estimated Timeline

- **Phase 1 (Discovery)**: 2-3 hours
- **Phase 2 (CSS Updates)**: 3-4 hours
- **Phase 3 (Component Updates)**: 2-3 hours
- **Phase 4 (Testing)**: 2-3 hours
- **Phase 5 (Documentation)**: 1-2 hours

**Total Estimated Time**: 10-15 hours

## Questions for Senior Developer

If you encounter any of these situations, please consult with the senior developer:

1. **Unclear variable purpose**: If you can't determine what a `--float-` variable is used for
2. **Complex component patterns**: If a component has an unusual naming pattern that doesn't fit the convention
3. **Third-party conflicts**: If you discover actual conflicts with third-party library variables
4. **Performance issues**: If the changes cause any performance degradation
5. **Breaking changes**: If any component functionality breaks after the changes

---

**Note**: This is a comprehensive refactor that touches many files. Please work methodically through each phase and test thoroughly at each step.

# Float Variable Mapping Document

## Complete Audit of --float- Variables

This document maps all current `--float-` prefixed variables to their new component-first naming pattern.

## Summary Statistics

- **Total Variables Found**: 89 unique variables
- **Components Affected**: 6 (Button, Input, Dropdown, Sidebar, Checkbox, plus some global)
- **Files to Update**: 8 files

---

## 1. Button Variables

**File**: `src/styles/components/button.css`

| Current Variable                          | New Variable                        | Usage Context                       |
| ----------------------------------------- | ----------------------------------- | ----------------------------------- |
| `--float-button-primary-bg`               | `--button-bg-primary`               | Primary button background           |
| `--float-button-primary-bg-hover`         | `--button-bg-primary-hover`         | Primary button hover background     |
| `--float-button-primary-fg`               | `--button-text-primary`             | Primary button text color           |
| `--float-button-primary-fg-hover`         | `--button-text-primary-hover`       | Primary button hover text           |
| `--float-button-primary-border`           | `--button-border-primary`           | Primary button border               |
| `--float-button-primary-border-hover`     | `--button-border-primary-hover`     | Primary button hover border         |
| `--float-button-secondary-bg`             | `--button-bg-secondary`             | Secondary button background         |
| `--float-button-secondary-bg-hover`       | `--button-bg-secondary-hover`       | Secondary button hover background   |
| `--float-button-secondary-fg`             | `--button-text-secondary`           | Secondary button text               |
| `--float-button-secondary-fg-hover`       | `--button-text-secondary-hover`     | Secondary button hover text         |
| `--float-button-secondary-border`         | `--button-border-secondary`         | Secondary button border             |
| `--float-button-secondary-border-hover`   | `--button-border-secondary-hover`   | Secondary button hover border       |
| `--float-button-ghost-bg-hover`           | `--button-bg-ghost-hover`           | Ghost button hover background       |
| `--float-button-ghost-fg`                 | `--button-text-ghost`               | Ghost button text                   |
| `--float-button-ghost-fg-hover`           | `--button-text-ghost-hover`         | Ghost button hover text             |
| `--float-button-outline-bg`               | `--button-bg-outline`               | Outline button background           |
| `--float-button-outline-bg-hover`         | `--button-bg-outline-hover`         | Outline button hover background     |
| `--float-button-outline-fg`               | `--button-text-outline`             | Outline button text                 |
| `--float-button-outline-fg-hover`         | `--button-text-outline-hover`       | Outline button hover text           |
| `--float-button-outline-border`           | `--button-border-outline`           | Outline button border               |
| `--float-button-outline-border-hover`     | `--button-border-outline-hover`     | Outline button hover border         |
| `--float-button-link-fg`                  | `--button-text-link`                | Link button text                    |
| `--float-button-link-fg-hover`            | `--button-text-link-hover`          | Link button hover text              |
| `--float-button-destructive-bg`           | `--button-bg-destructive`           | Destructive button background       |
| `--float-button-destructive-bg-hover`     | `--button-bg-destructive-hover`     | Destructive button hover background |
| `--float-button-destructive-fg`           | `--button-text-destructive`         | Destructive button text             |
| `--float-button-destructive-fg-hover`     | `--button-text-destructive-hover`   | Destructive button hover text       |
| `--float-button-destructive-border`       | `--button-border-destructive`       | Destructive button border           |
| `--float-button-destructive-border-hover` | `--button-border-destructive-hover` | Destructive button hover border     |
| `--float-button-icon-size-sm`             | `--button-icon-size-sm`             | Small button icon size              |
| `--float-button-icon-size-md`             | `--button-icon-size-md`             | Medium button icon size             |
| `--float-button-icon-size-lg`             | `--button-icon-size-lg`             | Large button icon size              |

**Used in**: `src/components/ui/button.tsx`

---

## 2. Input Variables

**File**: `src/styles/components/input-dropdown.css` and `src/styles/components/input.css`

| Current Variable                 | New Variable               | Usage Context                     |
| -------------------------------- | -------------------------- | --------------------------------- |
| `--float-input-bg`               | `--input-bg`               | Input background                  |
| `--float-input-fg`               | `--input-text`             | Input text color                  |
| `--float-input-border`           | `--input-border`           | Input border                      |
| `--float-input-border-hover`     | `--input-border-hover`     | Input hover border                |
| `--float-input-border-focus`     | `--input-border-focus`     | Input focus border                |
| `--float-input-placeholder-fg`   | `--input-text-placeholder` | Input placeholder text            |
| `--float-input-disabled-bg`      | `--input-bg-disabled`      | Disabled input background         |
| `--float-input-disabled-fg`      | `--input-text-disabled`    | Disabled input text               |
| `--float-input-disabled-border`  | `--input-border-disabled`  | Disabled input border             |
| `--float-input-disabled-opacity` | `--input-opacity-disabled` | Disabled input opacity            |
| `--float-input-border-hsl`       | `--input-border-hsl`       | Input border HSL (for shadcn)     |
| `--float-input-ring-hsl`         | `--input-ring-hsl`         | Input focus ring HSL (for shadcn) |
| `--float-input-ring-color`       | `--input-ring-color`       | Input focus ring color            |
| `--float-input-border-color`     | `--input-border-color`     | Input border color                |

**Used in**: `src/components/ui/input.tsx`, `src/components/ui/select.tsx`

---

## 3. Dropdown Variables

**File**: `src/styles/components/input-dropdown.css`

| Current Variable                         | New Variable                         | Usage Context                          |
| ---------------------------------------- | ------------------------------------ | -------------------------------------- |
| `--float-dropdown-content-bg`            | `--dropdown-bg`                      | Dropdown background                    |
| `--float-dropdown-content-fg`            | `--dropdown-text`                    | Dropdown text color                    |
| `--float-dropdown-content-border`        | `--dropdown-border`                  | Dropdown border                        |
| `--float-dropdown-shadow`                | `--dropdown-shadow`                  | Dropdown shadow                        |
| `--float-dropdown-item-fg`               | `--dropdown-item-text`               | Dropdown item text                     |
| `--float-dropdown-item-bg-hover`         | `--dropdown-item-bg-hover`           | Dropdown item hover background         |
| `--float-dropdown-item-fg-hover`         | `--dropdown-item-text-hover`         | Dropdown item hover text               |
| `--float-dropdown-item-bg-focus`         | `--dropdown-item-bg-focus`           | Dropdown item focus background         |
| `--float-dropdown-item-fg-focus`         | `--dropdown-item-text-focus`         | Dropdown item focus text               |
| `--float-dropdown-item-brand-bg-hover`   | `--dropdown-item-bg-brand-hover`     | Brand dropdown item hover background   |
| `--float-dropdown-item-brand-fg-hover`   | `--dropdown-item-text-brand-hover`   | Brand dropdown item hover text         |
| `--float-dropdown-item-brand-bg-focus`   | `--dropdown-item-bg-brand-focus`     | Brand dropdown item focus background   |
| `--float-dropdown-item-brand-fg-focus`   | `--dropdown-item-text-brand-focus`   | Brand dropdown item focus text         |
| `--float-dropdown-item-error-bg-hover`   | `--dropdown-item-bg-error-hover`     | Error dropdown item hover background   |
| `--float-dropdown-item-error-fg-hover`   | `--dropdown-item-text-error-hover`   | Error dropdown item hover text         |
| `--float-dropdown-item-error-bg-focus`   | `--dropdown-item-bg-error-focus`     | Error dropdown item focus background   |
| `--float-dropdown-item-error-fg-focus`   | `--dropdown-item-text-error-focus`   | Error dropdown item focus text         |
| `--float-dropdown-item-warning-bg-hover` | `--dropdown-item-bg-warning-hover`   | Warning dropdown item hover background |
| `--float-dropdown-item-warning-fg-hover` | `--dropdown-item-text-warning-hover` | Warning dropdown item hover text       |
| `--float-dropdown-item-warning-bg-focus` | `--dropdown-item-bg-warning-focus`   | Warning dropdown item focus background |
| `--float-dropdown-item-warning-fg-focus` | `--dropdown-item-text-warning-focus` | Warning dropdown item focus text       |
| `--float-dropdown-item-success-bg-hover` | `--dropdown-item-bg-success-hover`   | Success dropdown item hover background |
| `--float-dropdown-item-success-fg-hover` | `--dropdown-item-text-success-hover` | Success dropdown item hover text       |
| `--float-dropdown-item-success-bg-focus` | `--dropdown-item-bg-success-focus`   | Success dropdown item focus background |
| `--float-dropdown-item-success-fg-focus` | `--dropdown-item-text-success-focus` | Success dropdown item focus text       |
| `--float-dropdown-separator-bg`          | `--dropdown-separator-bg`            | Dropdown separator background          |

**Used in**: `src/components/ui/context-menu.tsx`, `src/components/ui/select.tsx`

---

## 4. Sidebar Variables

**File**: `src/styles/components/sidebar.css`

| Current Variable                      | New Variable                   | Usage Context                  |
| ------------------------------------- | ------------------------------ | ------------------------------ |
| `--float-sidebar-width`               | `--sidebar-width`              | Sidebar width                  |
| `--float-sidebar-collapsed-width`     | `--sidebar-width-collapsed`    | Collapsed sidebar width        |
| `--float-sidebar-header-height`       | `--sidebar-header-height`      | Sidebar header height          |
| `--float-sidebar-footer-height`       | `--sidebar-footer-height`      | Sidebar footer height          |
| `--float-sidebar-padding`             | `--sidebar-padding`            | Sidebar padding                |
| `--float-sidebar-item-spacing`        | `--sidebar-item-spacing`       | Sidebar item spacing           |
| `--float-sidebar-bg`                  | `--sidebar-bg`                 | Sidebar background             |
| `--float-sidebar-border`              | `--sidebar-border`             | Sidebar border                 |
| `--float-sidebar-fg`                  | `--sidebar-text`               | Sidebar text color             |
| `--float-sidebar-fg-secondary`        | `--sidebar-text-secondary`     | Sidebar secondary text         |
| `--float-sidebar-fg-tertiary`         | `--sidebar-text-tertiary`      | Sidebar tertiary text          |
| `--float-sidebar-item-bg`             | `--sidebar-item-bg`            | Sidebar item background        |
| `--float-sidebar-item-fg`             | `--sidebar-item-text`          | Sidebar item text              |
| `--float-sidebar-item-icon-fg`        | `--sidebar-item-icon`          | Sidebar item icon color        |
| `--float-sidebar-item-border`         | `--sidebar-item-border`        | Sidebar item border            |
| `--float-sidebar-item-bg-hover`       | `--sidebar-item-bg-hover`      | Sidebar item hover background  |
| `--float-sidebar-item-fg-hover`       | `--sidebar-item-text-hover`    | Sidebar item hover text        |
| `--float-sidebar-item-icon-fg-hover`  | `--sidebar-item-icon-hover`    | Sidebar item hover icon        |
| `--float-sidebar-item-border-hover`   | `--sidebar-item-border-hover`  | Sidebar item hover border      |
| `--float-sidebar-item-bg-active`      | `--sidebar-item-bg-active`     | Sidebar item active background |
| `--float-sidebar-item-fg-active`      | `--sidebar-item-text-active`   | Sidebar item active text       |
| `--float-sidebar-item-icon-fg-active` | `--sidebar-item-icon-active`   | Sidebar item active icon       |
| `--float-sidebar-item-border-active`  | `--sidebar-item-border-active` | Sidebar item active border     |
| `--float-sidebar-group-label-fg`      | `--sidebar-group-text`         | Sidebar group label text       |
| `--float-sidebar-group-border`        | `--sidebar-group-border`       | Sidebar group border           |
| `--float-sidebar-separator-bg`        | `--sidebar-separator-bg`       | Sidebar separator background   |

**Used in**: `src/styles/components/sidebar.css` (extensive usage), `src/components/ui/org-switcher.tsx`

---

## 5. Checkbox Variables

**File**: `src/app/globals.css`

| Current Variable                              | New Variable                            | Usage Context                        |
| --------------------------------------------- | --------------------------------------- | ------------------------------------ |
| `--float-checkbox-border`                     | `--checkbox-border`                     | Checkbox border                      |
| `--float-checkbox-bg`                         | `--checkbox-bg`                         | Checkbox background                  |
| `--float-checkbox-checked-bg`                 | `--checkbox-bg-checked`                 | Checked checkbox background          |
| `--float-checkbox-checked-border`             | `--checkbox-border-checked`             | Checked checkbox border              |
| `--float-checkbox-checked-indicator`          | `--checkbox-indicator-checked`          | Checkbox checkmark color             |
| `--float-checkbox-hover-border`               | `--checkbox-border-hover`               | Checkbox hover border                |
| `--float-checkbox-checked-hover-bg`           | `--checkbox-bg-checked-hover`           | Checked checkbox hover background    |
| `--float-checkbox-checked-hover-border`       | `--checkbox-border-checked-hover`       | Checked checkbox hover border        |
| `--float-checkbox-disabled-border`            | `--checkbox-border-disabled`            | Disabled checkbox border             |
| `--float-checkbox-disabled-bg`                | `--checkbox-bg-disabled`                | Disabled checkbox background         |
| `--float-checkbox-disabled-checked-bg`        | `--checkbox-bg-disabled-checked`        | Disabled checked checkbox background |
| `--float-checkbox-disabled-checked-border`    | `--checkbox-border-disabled-checked`    | Disabled checked checkbox border     |
| `--float-checkbox-disabled-checked-indicator` | `--checkbox-indicator-disabled-checked` | Disabled checkbox checkmark color    |

**Used in**: `src/components/ui/checkbox.tsx`

---

## Files That Need Updates

### CSS Files:

1. ✅ `src/styles/components/button.css` - 32 variables
2. ✅ `src/styles/components/input-dropdown.css` - 26 variables
3. ✅ `src/styles/components/input.css` - 8 variables
4. ✅ `src/styles/components/sidebar.css` - 26 variables + extensive usage
5. ✅ `src/app/globals.css` - 13 checkbox variables + 5 sidebar references

### React Component Files:

1. ✅ `src/components/ui/button.tsx` - Button variables
2. ✅ `src/components/ui/input.tsx` - Input variables
3. ✅ `src/components/ui/select.tsx` - Input + dropdown variables
4. ✅ `src/components/ui/context-menu.tsx` - Dropdown variables
5. ✅ `src/components/ui/checkbox.tsx` - Checkbox variables
6. ✅ `src/components/ui/org-switcher.tsx` - Sidebar variables

### Documentation Files (already updated):

- `docs/component-specific-colors.md` - Examples only
- `llm/tasks/style-naming-fix.md` - Task documentation

---

## Component Groups Summary

### Button (32 variables)

- 6 variants: primary, secondary, ghost, outline, link, destructive
- Properties: bg, text, border (+ hover states)
- Icon sizes: sm, md, lg

### Input (14 variables)

- Properties: bg, text, border, placeholder, ring
- States: default, hover, focus, disabled
- Special: HSL values for shadcn integration

### Dropdown (25 variables)

- Content: bg, text, border, shadow
- Items: text, bg (+ hover/focus states)
- Variants: default, brand, error, warning, success
- Separator styling

### Sidebar (26 variables)

- Layout: width, heights, padding, spacing
- Colors: bg, text, border
- Items: bg, text, icon, border (+ hover/active states)
- Groups: text, border
- Separator styling

### Checkbox (13 variables)

- States: default, checked, hover, disabled
- Properties: bg, border, indicator
- All state combinations covered

---

## Next Steps

1. ✅ **Task 1.1 Complete**: Variable audit finished
2. ⏳ **Task 1.2**: Group variables by component (completed above)
3. ⏳ **Task 2.1**: Update CSS variable definitions
4. ⏳ **Task 3.1**: Update React component usage
5. ⏳ **Task 4.1**: Testing and validation

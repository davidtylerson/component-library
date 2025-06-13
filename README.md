# component-library

## Development Commands

This project uses [mise](https://mise.jdx.dev/) for task management. Below are the available commands:

### Build
```bash
mise build
```
Build the project.

### LLM Tasks
The following LLM-powered development tasks are available:

```bash
mise llm_bundle
```
LLM-powered bundling task.

```bash
mise llm_code_review
```
Run an LLM-powered code review.

```bash
mise llm_copy
```
LLM copy task.

```bash
mise llm_github_issues
```
LLM task for GitHub issues management.

```bash
mise llm_missing_tests
```
Identify missing tests using LLM.

```bash
mise llm_readme
```
Generate or update README using LLM.

### Running Tasks
You can run any task using either:
```bash
mise run <task_name>
# or the shorthand:
mise <task_name>
```

To see all available tasks:
```bash
mise tasks
```

## Design System

This project uses a comprehensive design system with semantic CSS variables and component-specific styling patterns.

### CSS Variable Naming Conventions

We use two complementary naming patterns for our CSS variables:

#### 1. Global Semantic Variables
For application-level styling, we use semantic variables organized by property type:

```css
/* Pattern: --{property}-{context}-{hierarchy} */
--bg-primary              /* Primary background */
--bg-secondary            /* Secondary background */
--bg-brand-primary        /* Brand context, primary level */
--text-primary            /* Primary text color */
--text-error-primary      /* Error context, primary level */
--border-primary          /* Primary border color */
--border-brand            /* Brand context border */
```

**Usage in application code:**
```tsx
<div className="bg-bg-primary text-text-primary border-border-secondary">
  Application content
</div>
```

#### 2. Component-Specific Variables
For reusable components, we use component-first naming:

```css
/* Pattern: --{component}-{property}-{variant}-{state} */
--button-bg-primary           /* Button background, primary variant */
--button-bg-primary-hover     /* Button background, primary variant, hover state */
--input-border-focus          /* Input border, focus state */
--dropdown-item-bg-brand-hover /* Dropdown item background, brand variant, hover state */
```

**Usage in component libraries:**
```tsx
<button className="bg-[var(--button-bg-primary)] hover:bg-[var(--button-bg-primary-hover)]">
  Click me
</button>
```

### Key Benefits

- **🎯 Component Grouping**: All variables for a component are grouped together (e.g., `--button-*`)
- **⚡ Developer Experience**: Autocomplete shows all related variables when typing component name
- **🔄 Third-party Override**: Can override third-party library variables with same names
- **📐 Semantic Consistency**: Aligns with global design system patterns
- **🎨 Maintainability**: Clear organization and naming conventions

### Examples by Component

**Button Variables:**
```css
--button-bg-primary, --button-bg-secondary, --button-bg-destructive
--button-text-primary, --button-text-link, --button-text-ghost
--button-border-outline, --button-icon-size-sm
```

**Input Variables:**
```css
--input-bg, --input-bg-disabled
--input-text, --input-text-placeholder
--input-border, --input-border-hover, --input-border-focus
```

**Dropdown Variables:**
```css
--dropdown-bg, --dropdown-text, --dropdown-border
--dropdown-item-bg-hover, --dropdown-item-text-brand-hover
--dropdown-separator-bg
```

### Documentation

For detailed implementation guidelines, migration instructions, and complete variable references, see:
- [`docs/component-specific-colors.md`](docs/component-specific-colors.md) - Component-specific styling system
- [`src/app/globals.css`](src/app/globals.css) - Global semantic variables
- [`src/styles/components/`](src/styles/components/) - Component-specific CSS files

### Quick Start

1. **For application styling**: Use semantic utilities like `bg-bg-primary`, `text-text-secondary`
2. **For component styling**: Use component variables like `--button-bg-primary`, `--input-border-focus`
3. **Adding new components**: Follow the `--{component}-{property}-{variant}` pattern
4. **Dark mode**: All variables automatically support light/dark themes

---

*This design system enables consistent, maintainable, and scalable styling across the entire application while providing excellent developer experience.*
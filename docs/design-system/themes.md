## Theme System

### How semantic colors work in this project

We use a property-namespace semantic color system defined in `packages/design-system/src/app/globals-consolidated.css` and exposed via Tailwind utilities in the design system package. The namespaces correspond to the role of the color:

- `text-*`: text color tokens, e.g. `text-text-primary`, `text-text-secondary`, `text-text-error-primary`
- `bg-*`: background tokens, e.g. `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-brand-solid`
- `border-*`: border tokens, e.g. `border-border-primary`, `border-border-tertiary`, `border-border-error`
- `fg-*`: foreground tokens used for icon fills/strokes and special foreground accents, e.g. `bg-fg-success-primary` or inline `style={{ color: 'var(--fg-success)' }}`

These semantic tokens are implemented as CSS variables in `globals-consolidated.css` with light/dark variants. Tailwind is configured to map these variables into utilities, so you use semantic classes like `text-text-secondary` instead of raw color scales.

### Layers of the color system

1. Foundational scales: `--color-gray-*`, `--color-brand-*`, `--color-error-*`, `--color-warning-*`, `--color-success-*`.
2. Semantic variables: `--text-*`, `--bg-*`, `--border-*`, `--fg-*` map to foundational scales and change per theme.
3. shadcn variables: HSL-only variables like `--background`, `--primary` used with `hsl(var(--...))` for third-party components.
4. Component variables: e.g. `--button-*`, `--card-*`, `--badge-*` defined in terms of semantic variables.

Dark mode overrides live under the `.dark` selector in `globals-consolidated.css` and flip semantic mappings appropriately.

### Tailwind mapping

In Tailwind config, we extend colors to include our semantic namespaces. This generates utilities like:

- Text: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-text-disabled`, brand/error/warning/success primary
- Background: `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-tertiary`, `bg-bg-quaternary`, `bg-bg-disabled`, `bg-bg-overlay`, plus brand/error/warning/success primary/secondary/solid
- Border: `border-border-primary`, `border-border-secondary`, `border-border-tertiary`, `border-border-disabled`, and brand/error solid variants
- Foreground: `bg-fg-*` classes are available for swatches; components often use inline `var(--fg-*)` for icon color

We also keep shadcn’s HSL variables mapped to Tailwind keys like `background`, `foreground`, `primary`, etc., used with `hsl(var(--...))`.

### How components apply semantic colors

- Button (`components/ui/button.tsx`): uses component-level variables that reference semantics, e.g. `bg-[var(--button-bg-primary)]`, `text-[var(--button-text-primary)]`, `border-[var(--button-border-primary)]`. These `--button-*` variables are defined in `globals-consolidated.css` for light/dark.
- Card (`components/ui/card.tsx`): uses `--card-*` variables mapped to semantics: `bg-[var(--card-bg-default)]`, `border-[var(--card-border-default)]`, titles/descriptions use `text-[var(--card-title-text)]`, `text-[var(--card-description-text)]`.
- Dropdown (`components/ui/dropdown-menu/dropdown-menu.tsx`): surface uses `bg-bg-primary` and `border-border-secondary`; items use `text-text-primary` with hover/focus `bg-bg-secondary`. Optional colored item variants map to `bg-{brand|error|warning|success}-*` and `text-*` semantic pairs.
- Input (`components/ui/input.tsx`): uses `--input-*` variables that point at semantic `--bg-*`, `--border-*`, `--text-*` with hover/focus/disabled states.
- Data-display components (e.g. `status-cell.tsx`): icon colors use inline `style={{ color: 'var(--fg-success)' }}` etc., labels use `text-text-secondary`.

### Page-level usage in design system demos

Pages like `src/app/design-system/page.tsx` and `src/app/components/page.tsx` use semantic classes at layout level:

- Container backgrounds and text: `bg-bg-primary text-text-primary`
- Section surfaces: `bg-bg-secondary border-border-primary`
- Labels and muted text: `text-text-secondary` or `text-text-tertiary`
- Swatches and borders demonstrate `bg-bg-*`, `border-border-*`, and `fg-*`

### Using the tokens correctly

- Prefer semantic utilities over raw scales: use `text-text-secondary` instead of `text-gray-600`; `bg-bg-secondary` instead of `bg-gray-50`.
- For icons, prefer `var(--fg-*)`: either via `className="text-[var(--fg-success)]"` or inline `style={{ color: 'var(--fg-success)' }}`.
- For component internals (Button, Card, Badge), rely on provided variants; do not override internals with raw colors.
- Avoid shadcn variables entirely; use semantic classes (`text-*`, `bg-*`, `border-*`, `fg-*`).

### Examples

Semantic utilities:

```tsx
<div className="bg-bg-primary text-text-primary">
  <h2 className="text-text-secondary">Subtitle</h2>
  <div className="rounded-md border border-border-tertiary bg-bg-secondary p-4" />
</div>
```

Icon foreground with `fg-*`:

```tsx
<IconCheck className="h-4 w-4" style={{ color: 'var(--fg-success)' }} />
```

Button variant (uses component variables wired to semantics):

```tsx
<Button dsVariant="primary">Save</Button>
<Button dsVariant="destructive">Delete</Button>
```

### Dark mode

Dark mode is class-based. Adding `dark` to the root flips semantic variable mappings defined under `.dark` in `globals-consolidated.css`. Semantic classes and component variables automatically reflect the correct values; no class changes are required.

### Gotchas

- `fg-*` is intended for iconography and special accents; `text-*` is for text content.
- shadcn variables are HSL fragments; always wrap with `hsl(var(--...))` when used in styles.
- Avoid mixing raw Tailwind palette classes with semantic utilities to maintain theme fidelity.

### Quick start

Wrap your app with the ThemeProvider exported by the design system and use semantic utilities:

```tsx
import { ThemeProvider, Button } from '@float-vibe-foundry/design-system';

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <main className="bg-bg-primary text-text-primary">
            <Button dsVariant="primary">Action</Button>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

For more, see `packages/design-system/src/app/design-system/page.tsx` for live examples of text, background, border, and foreground tokens.
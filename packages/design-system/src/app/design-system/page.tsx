// src/app/design-system/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/themes/theme-context';

import { Input } from '@/components/ui/input';

export default function DesignSystemPage() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Initialize on mount - client-side only
  useEffect(() => {
    setMounted(true);
  }, []);



  // Removed shadcn color demo: we standardize on semantic tokens only

  // Function to render a color swatch with inline styles
  const renderSwatch = (type: string, weight: number) => {
    return (
      <div key={`${type}-${weight}`} className="mb-4">
        <div
          style={{
            backgroundColor: `var(--color-${type}-${weight})`,
            borderRadius: '0.375rem',
            height: '6rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '0.5rem',
          }}
        >
          <div
            style={{
              color:
                weight <= 400
                  ? 'var(--color-gray-900)'
                  : 'var(--color-gray-50)',
              fontSize: '0.75rem',
              fontWeight: '500',
            }}
          >
            {type}-{weight}
          </div>
          <div
            style={{
              color:
                weight <= 400
                  ? 'var(--color-gray-900)'
                  : 'var(--color-gray-50)',
              fontSize: '0.75rem',
              opacity: 0.7,
            }}
          >
            Aa
          </div>
        </div>
      </div>
    );
  };

  // Removed shadcn variable inspection

  // Don't render until client-side to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-bg-primary p-8 text-text-primary">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Float Colors</h1>
      </div>

      {/* Theme Information */}
      <section className="mb-8 rounded-md border border-border-primary bg-bg-secondary p-4">
        <h2 className="mb-2 text-xl font-semibold">
          Current Theme: {isDark ? 'dark' : 'light'}
        </h2>
        <p className="mb-4">
          This design system uses your custom Tailwind semantic color classes.
        </p>

        {/* Test box with direct classes */}
        <div
          className={`rounded border p-2 ${isDark ? 'bg-bg-primary text-text-primary' : 'bg-bg-primary text-text-primary'}`}
        >
          This box uses direct classes based on the isDark state
        </div>

        {/* Test box with Tailwind dark mode */}
        <div className="mt-2 rounded border bg-bg-primary p-2 text-text-primary dark:bg-bg-primary dark:text-text-primary">
          This box uses Tailwind dark: variant
        </div>
      </section>

      {/* Foundational Colors */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Foundational Colors</h2>

        <h3 className="mb-3 text-lg font-medium">Gray Scale</h3>
        <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            weight => renderSwatch('gray', weight)
          )}
        </div>

        <h3 className="mb-3 text-lg font-medium">Brand Colors</h3>
        <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            weight => renderSwatch('brand', weight)
          )}
        </div>

        <h3 className="mb-3 text-lg font-medium">Error Colors</h3>
        <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            weight => renderSwatch('error', weight)
          )}
        </div>

        <h3 className="mb-3 text-lg font-medium">Warning Colors</h3>
        <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            weight => renderSwatch('warning', weight)
          )}
        </div>

        <h3 className="mb-3 text-lg font-medium">Success Colors</h3>
        <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
            weight => renderSwatch('success', weight)
          )}
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Semantic Colors</h2>

        <h3 className="mb-3 text-lg font-medium">Text Colors</h3>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-primary">Text Primary</div>
            <div className="text-sm text-text-secondary">text-text-primary</div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-secondary">
              Text Secondary
            </div>
            <div className="text-sm text-text-secondary">
              text-text-secondary
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-tertiary">Text Tertiary</div>
            <div className="text-sm text-text-secondary">
              text-text-tertiary
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-disabled">Text Disabled</div>
            <div className="text-sm text-text-secondary">
              text-text-disabled
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-brand-primary">
              Text Brand Primary
            </div>
            <div className="text-sm text-text-secondary">
              text-text-brand-primary
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-brand-secondary">
              Text Brand Secondary
            </div>
            <div className="text-sm text-text-secondary">
              text-text-brand-secondary
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-brand-tertiary">
              Text Brand Tertiary
            </div>
            <div className="text-sm text-text-secondary">
              text-text-brand-tertiary
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-error-primary">
              Text Error Primary
            </div>
            <div className="text-sm text-text-secondary">
              text-text-error-primary
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-warning-primary">
              Text Warning Primary
            </div>
            <div className="text-sm text-text-secondary">
              text-text-warning-primary
            </div>
          </div>
          <div className="rounded-md border border-border-primary p-4">
            <div className="font-medium text-text-success-primary">
              Text Success Primary
            </div>
            <div className="text-sm text-text-secondary">
              text-text-success-primary
            </div>
          </div>
        </div>

        <h3 className="mb-3 text-lg font-medium">Background Colors</h3>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md border border-border-primary bg-bg-primary p-4">
            <div className="font-medium">Background Primary</div>
            <div className="text-sm text-text-secondary">bg-bg-primary</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-secondary p-4">
            <div className="font-medium">Background Secondary</div>
            <div className="text-sm text-text-secondary">bg-bg-secondary</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-tertiary p-4">
            <div className="font-medium">Background Tertiary</div>
            <div className="text-sm text-text-secondary">bg-bg-tertiary</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-quaternary p-4">
            <div className="font-medium">Background Quaternary</div>
            <div className="text-sm text-text-secondary">bg-bg-quaternary</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-disabled p-4">
            <div className="font-medium">Background Disabled</div>
            <div className="text-sm text-text-secondary">bg-bg-disabled</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-overlay p-4">
            <div className="font-medium">Background Overlay</div>
            <div className="text-sm text-text-secondary">bg-bg-overlay</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-brand-primary p-4">
            <div className="font-medium">Brand Primary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-brand-primary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-brand-secondary p-4">
            <div className="font-medium">Brand Secondary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-brand-secondary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-brand-solid p-4 text-white">
            <div className="font-medium">Brand Solid</div>
            <div className="text-sm opacity-80">bg-bg-brand-solid</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-error-primary p-4">
            <div className="font-medium">Error Primary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-error-primary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-error-secondary p-4">
            <div className="font-medium">Error Secondary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-error-secondary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-error-solid p-4 text-white">
            <div className="font-medium">Error Solid</div>
            <div className="text-sm opacity-80">bg-bg-error-solid</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-warning-primary p-4">
            <div className="font-medium">Warning Primary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-warning-primary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-warning-secondary p-4">
            <div className="font-medium">Warning Secondary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-warning-secondary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-warning-solid p-4 text-white">
            <div className="font-medium">Warning Solid</div>
            <div className="text-sm opacity-80">bg-bg-warning-solid</div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-success-primary p-4">
            <div className="font-medium">Success Primary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-success-primary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-success-secondary p-4">
            <div className="font-medium">Success Secondary</div>
            <div className="text-sm text-text-secondary">
              bg-bg-success-secondary
            </div>
          </div>
          <div className="rounded-md border border-border-primary bg-bg-success-solid p-4 text-white">
            <div className="font-medium">Success Solid</div>
            <div className="text-sm opacity-80">bg-bg-success-solid</div>
          </div>
        </div>

        <h3 className="mb-3 text-lg font-medium">Border Colors</h3>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-primary)' }}
          >
            <div className="font-medium">Border Primary</div>
            <div className="text-sm text-text-secondary">
              border-border-primary
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-secondary)' }}
          >
            <div className="font-medium">Border Secondary</div>
            <div className="text-sm text-text-secondary">
              border-border-secondary
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-tertiary)' }}
          >
            <div className="font-medium">Border Tertiary</div>
            <div className="text-sm text-text-secondary">
              border-border-tertiary
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-disabled)' }}
          >
            <div className="font-medium">Border Disabled</div>
            <div className="text-sm text-text-secondary">
              border-border-disabled
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-brand)' }}
          >
            <div className="font-medium">Border Brand</div>
            <div className="text-sm text-text-secondary">
              border-border-brand
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-brand-solid)' }}
          >
            <div className="font-medium">Border Brand Solid</div>
            <div className="text-sm text-text-secondary">
              border-border-brand-solid
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-error)' }}
          >
            <div className="font-medium">Border Error</div>
            <div className="text-sm text-text-secondary">
              border-border-error
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-error-solid)' }}
          >
            <div className="font-medium">Border Error Solid</div>
            <div className="text-sm text-text-secondary">
              border-border-error-solid
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-warning)' }}
          >
            <div className="font-medium">Border Warning</div>
            <div className="text-sm text-text-secondary">
              border-border-warning
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-warning-solid)' }}
          >
            <div className="font-medium">Border Warning Solid</div>
            <div className="text-sm text-text-secondary">
              border-border-warning-solid
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-success)' }}
          >
            <div className="font-medium">Border Success</div>
            <div className="text-sm text-text-secondary">
              border-border-success
            </div>
          </div>
          <div
            className="rounded-md p-4"
            style={{ border: '2px solid var(--border-success-solid)' }}
          >
            <div className="font-medium">Border Success Solid</div>
            <div className="text-sm text-text-secondary">
              border-border-success-solid
            </div>
          </div>
        </div>

        {/* Foreground Colors */}
        <h3 className="mb-3 text-lg font-medium">Foreground Colors</h3>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            'primary',
            'secondary',
            'tertiary',
            'quaternary',
            'quinary',
            'disabled',
            'brand-primary',
            'brand-secondary',
            'error-primary',
            'error-secondary',
            'warning-primary',
            'warning-secondary',
            'success-primary',
            'success-secondary',
            'white',
          ].map(color => (
            <div
              key={`fg-${color}`}
              className="rounded-md border border-border-primary p-4"
            >
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: `var(--fg-${color})` }}
                  className="h-8 w-8 rounded-full"
                ></div>
                <div className="font-medium">Foreground {color}</div>
              </div>
              <div className="mt-2 text-sm text-text-secondary">
                fg-fg-{color}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Removed shadcn Components section */}

      {/* Typography - Text Sizes */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Typography - Text Sizes</h2>
        <p className="mb-4 text-sm text-text-secondary">
          Text sizes are defined for common UI elements like paragraphs, labels,
          and captions.
        </p>

        <div className="space-y-6 rounded-md border border-border-primary bg-bg-secondary p-6">
          <div className="border-b border-border-secondary pb-4">
            <div className="text-xl">Text XL</div>
            <div className="mt-1 text-sm text-text-tertiary">
              Font size: 1.25rem (20px) • Line height: 1.875rem (30px) • Class:
              text-xl
            </div>
            <p className="mt-2 text-xl">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className="border-b border-border-secondary pb-4">
            <div className="text-lg">Text LG</div>
            <div className="mt-1 text-sm text-text-tertiary">
              Font size: 1.125rem (18px) • Line height: 1.75rem (28px) • Class:
              text-lg
            </div>
            <p className="mt-2 text-lg">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className="border-b border-border-secondary pb-4">
            <div className="text-base">Text MD (Base)</div>
            <div className="mt-1 text-sm text-text-tertiary">
              Font size: 1rem (16px) • Line height: 1.5rem (24px) • Class:
              text-base or text-md
            </div>
            <p className="mt-2 text-base">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className="border-b border-border-secondary pb-4">
            <div className="text-sm">Text SM</div>
            <div className="mt-1 text-sm text-text-tertiary">
              Font size: 0.875rem (14px) • Line height: 1.25rem (20px) • Class:
              text-sm
            </div>
            <p className="mt-2 text-sm">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div>
            <div className="text-xs">Text XS</div>
            <div className="mt-1 text-sm text-text-tertiary">
              Font size: 0.75rem (12px) • Line height: 1.125rem (18px) • Class:
              text-xs
            </div>
            <p className="mt-2 text-xs">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-bg-tertiary p-4 text-sm">
          <p className="font-medium">
            Weight variations can be combined with size:
          </p>
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-base font-regular">
                Regular (400): The quick brown fox
              </p>
              <p className="text-base font-medium">
                Medium (500): The quick brown fox
              </p>
            </div>
            <div>
              <p className="text-base font-semibold">
                Semibold (600): The quick brown fox
              </p>
              <p className="text-base font-bold">
                Bold (700): The quick brown fox
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography - Display Sizes */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">
          Typography - Display Sizes
        </h2>
        <p className="mb-4 text-sm text-text-secondary">
          Display sizes are used for headlines, page titles, and other prominent
          text elements. All display sizes include a -0.02em letter spacing for
          a more refined look.
        </p>

        <div className="space-y-10 rounded-md border border-border-primary bg-bg-secondary p-6">
          <div className="border-b border-border-secondary pb-6">
            <div className="mb-2 text-sm text-text-tertiary">
              Font size: 4.5rem (72px) • Line height: 5.625rem (90px) • Class:
              text-display-2xl
            </div>
            <h1 className="text-display-2xl font-semibold">Display 2XL</h1>
          </div>

          <div className="border-b border-border-secondary pb-6">
            <div className="mb-2 text-sm text-text-tertiary">
              Font size: 3.75rem (60px) • Line height: 4.5rem (72px) • Class:
              text-display-xl
            </div>
            <h1 className="text-display-xl font-semibold">Display XL</h1>
          </div>

          <div className="border-b border-border-secondary pb-6">
            <div className="mb-2 text-sm text-text-tertiary">
              Font size: 3rem (48px) • Line height: 3.75rem (60px) • Class:
              text-display-lg
            </div>
            <h1 className="text-display-lg font-semibold">Display LG</h1>
          </div>

          <div className="border-b border-border-secondary pb-6">
            <div className="mb-2 text-sm text-text-tertiary">
              Font size: 2.25rem (36px) • Line height: 2.75rem (44px) • Class:
              text-display-md
            </div>
            <h1 className="text-display-md font-semibold">Display MD</h1>
          </div>

          <div className="border-b border-border-secondary pb-6">
            <div className="mb-2 text-sm text-text-tertiary">
              Font size: 1.875rem (30px) • Line height: 2.375rem (38px) • Class:
              text-display-sm
            </div>
            <h1 className="text-display-sm font-semibold">Display SM</h1>
          </div>

          <div>
            <div className="mb-2 text-sm text-text-tertiary">
              Font size: 1.5rem (24px) • Line height: 2rem (32px) • Class:
              text-display-xs
            </div>
            <h1 className="text-display-xs font-semibold">Display XS</h1>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-bg-tertiary p-4 text-sm">
          <p>
            Display sizes work best with semibold or bold weights for maximum
            impact. Each size includes a slight negative letter spacing
            (-0.02em) to improve the visual appearance of headlines.
          </p>
        </div>
      </section>

      {/* Combined Examples */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Combined Examples</h2>

        <h3 className="mb-3 text-lg font-medium">Alert Examples</h3>
        <div className="space-y-4">
          <div
            style={{
              backgroundColor: 'var(--bg-error-primary)',
              borderColor: 'var(--border-error)',
              color: 'var(--text-error-primary)',
              padding: '1rem',
              borderRadius: '0.375rem',
              borderWidth: '1px',
            }}
          >
            Error Alert: Using design system variables
          </div>
          <div
            style={{
              backgroundColor: 'var(--bg-error-primary)',
              color: 'var(--text-error-primary)',
              border: '1px solid var(--border-error)',
              padding: '1rem',
              borderRadius: '0.375rem',
            }}
          >
            Error Alert: Using design system error variables
          </div>
          <div
            style={{
              backgroundColor: 'var(--bg-warning-primary)',
              borderColor: 'var(--border-warning)',
              color: 'var(--text-warning-primary)',
              padding: '1rem',
              borderRadius: '0.375rem',
              borderWidth: '1px',
            }}
          >
            Warning Alert: Using design system variables
          </div>
          <div
            style={{
              backgroundColor: 'var(--bg-success-primary)',
              borderColor: 'var(--border-success)',
              color: 'var(--text-success-primary)',
              padding: '1rem',
              borderRadius: '0.375rem',
              borderWidth: '1px',
            }}
          >
            Success Alert: Using design system variables
          </div>
        </div>
      </section>

      {/* Form Components */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Form Components</h2>

        <h3 className="mb-3 text-lg font-medium">Inputs</h3>
        <div className="grid grid-cols-1 gap-6 rounded-md border border-border-primary p-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="input-default"
              className="text-sm font-medium text-text-secondary"
            >
              Default Input
            </label>
            <Input type="text" id="input-default" />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="input-placeholder"
              className="text-sm font-medium text-text-secondary"
            >
              Input with Placeholder
            </label>
            <Input
              type="text"
              id="input-placeholder"
              placeholder="Enter text here..."
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="input-disabled"
              className="text-sm font-medium text-text-secondary"
            >
              Disabled Input
            </label>
            <Input
              type="text"
              id="input-disabled"
              placeholder="Cannot type here"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="input-filled"
              className="text-sm font-medium text-text-secondary"
            >
              Input with Value
            </label>
            <Input
              type="text"
              id="input-filled"
              defaultValue="This is some text"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

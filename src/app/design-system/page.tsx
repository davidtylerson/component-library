// src/app/design-system/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from "@/themes/theme-context";
import { ThemeToggle } from "@/components/ui/theme-toggle/theme-toggle";

export default function DesignSystemPage() {
  const { isDark, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Initialize on mount - client-side only
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // shadcn colors for swatches with descriptions
  const shadcnColors = [
    { name: 'primary', desc: 'Primary button color' },
    { name: 'primary-foreground', desc: 'Primary button text' },
    { name: 'secondary', desc: 'Secondary button color' },
    { name: 'secondary-foreground', desc: 'Secondary button text' },
    { name: 'accent', desc: 'Accent color' },
    { name: 'accent-foreground', desc: 'Accent text' },
    { name: 'muted', desc: 'Muted background' },
    { name: 'muted-foreground', desc: 'Muted text' },
    { name: 'destructive', desc: 'Destructive action color' },
    { name: 'destructive-foreground', desc: 'Destructive text' },
    { name: 'card', desc: 'Card background' },
    { name: 'card-foreground', desc: 'Card text' },
    { name: 'popover', desc: 'Popover background' },
    { name: 'popover-foreground', desc: 'Popover text' },
    { name: 'border', desc: 'Border color' },
    { name: 'input', desc: 'Input border' },
    { name: 'ring', desc: 'Focus ring' },
    { name: 'background', desc: 'Page background' },
    { name: 'foreground', desc: 'Default text' }
  ];

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
            padding: '0.5rem'
          }}
        >
          <div style={{ 
            color: weight <= 400 ? 'var(--color-gray-900)' : 'var(--color-gray-50)',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            {type}-{weight}
          </div>
          <div style={{ 
            color: weight <= 400 ? 'var(--color-gray-900)' : 'var(--color-gray-50)',
            fontSize: '0.75rem',
            opacity: 0.7
          }}>
            Aa
          </div>
        </div>
      </div>
    );
  };

  // Function to get computed CSS variable value
  const [cssVarValues, setCssVarValues] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (typeof window !== 'undefined' && mounted) {
      const values: Record<string, string> = {};
      
      setTimeout(() => {
        shadcnColors.forEach(color => {
          const styles = getComputedStyle(document.documentElement);
          const value = styles.getPropertyValue(`--${color.name}`);
          values[color.name] = value.trim();
        });
        
        setCssVarValues(values);
      }, 100);
    }
  }, [isDark, mounted, shadcnColors]);

  // Don't render until client-side to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-ds-bg-primary text-ds-text-primary">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Design System</h1>
        <ThemeToggle variant="icon" size="md" />
      </div>
      
      {/* Theme Information */}
      <section className="mb-8 p-4 bg-ds-bg-secondary border border-ds-border-primary rounded-md">
        <h2 className="text-xl font-semibold mb-2">Current Theme: {isDark ? 'dark' : 'light'}</h2>
        <p className="mb-4">
          This design system uses your custom Tailwind ds- prefixed classes.
          Use the button in the top-right to toggle between light and dark mode.
        </p>
        
        {/* Test box with direct classes */}
        <div className={`p-2 border rounded ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          This box uses direct classes based on the isDark state
        </div>
        
        {/* Test box with Tailwind dark mode */}
        <div className="p-2 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white border rounded">
          This box uses Tailwind dark: variant
        </div>
        
        {/* Theme toggle component examples */}
        <div className="mt-4 p-4 bg-ds-bg-tertiary rounded-md">
          <h3 className="text-lg font-medium mb-2">Theme Toggle Variants</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex flex-col items-center gap-2">
              <ThemeToggle variant="icon" size="md" />
              <span className="text-xs">Icon</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ThemeToggle variant="button" size="md" />
              <span className="text-xs">Button</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ThemeToggle variant="switch" size="md" />
              <span className="text-xs">Switch</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Foundational Colors */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Foundational Colors</h2>
        
        <h3 className="text-lg font-medium mb-3">Gray Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => 
            renderSwatch('gray', weight)
          )}
        </div>

        <h3 className="text-lg font-medium mb-3">Brand Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => 
            renderSwatch('brand', weight)
          )}
        </div>
        
        <h3 className="text-lg font-medium mb-3">Error Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => 
            renderSwatch('error', weight)
          )}
        </div>
        
        <h3 className="text-lg font-medium mb-3">Warning Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => 
            renderSwatch('warning', weight)
          )}
        </div>
        
        <h3 className="text-lg font-medium mb-3">Success Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
          {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => 
            renderSwatch('success', weight)
          )}
        </div>
      </section>
      
      {/* Semantic Colors */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Semantic Colors</h2>
        
        <h3 className="text-lg font-medium mb-3">Text Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-primary font-medium">Text Primary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-primary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-secondary font-medium">Text Secondary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-secondary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-tertiary font-medium">Text Tertiary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-tertiary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-disabled font-medium">Text Disabled</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-disabled</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-brand-primary font-medium">Text Brand Primary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-brand-primary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-brand-secondary font-medium">Text Brand Secondary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-brand-secondary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-brand-tertiary font-medium">Text Brand Tertiary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-brand-tertiary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-error-primary font-medium">Text Error Primary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-error-primary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-warning-primary font-medium">Text Warning Primary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-warning-primary</div>
          </div>
          <div className="p-4 border border-ds-border-primary rounded-md">
            <div className="text-ds-text-success-primary font-medium">Text Success Primary</div>
            <div className="text-sm text-ds-text-secondary">text-ds-text-success-primary</div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Background Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-ds-bg-primary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Background Primary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-primary</div>
          </div>
          <div className="bg-ds-bg-secondary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Background Secondary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-secondary</div>
          </div>
          <div className="bg-ds-bg-tertiary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Background Tertiary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-tertiary</div>
          </div>
          <div className="bg-ds-bg-quaternary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Background Quaternary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-quaternary</div>
          </div>
          <div className="bg-ds-bg-disabled p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Background Disabled</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-disabled</div>
          </div>
          <div className="bg-ds-bg-overlay p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Background Overlay</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-overlay</div>
          </div>
          <div className="bg-ds-bg-brand-primary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Brand Primary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-brand-primary</div>
          </div>
          <div className="bg-ds-bg-brand-secondary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Brand Secondary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-brand-secondary</div>
          </div>
          <div className="bg-ds-bg-brand-solid p-4 border border-ds-border-primary rounded-md text-white">
            <div className="font-medium">Brand Solid</div>
            <div className="text-sm opacity-80">bg-ds-bg-brand-solid</div>
          </div>
          <div className="bg-ds-bg-error-primary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Error Primary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-error-primary</div>
          </div>
          <div className="bg-ds-bg-error-secondary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Error Secondary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-error-secondary</div>
          </div>
          <div className="bg-ds-bg-error-solid p-4 border border-ds-border-primary rounded-md text-white">
            <div className="font-medium">Error Solid</div>
            <div className="text-sm opacity-80">bg-ds-bg-error-solid</div>
          </div>
          <div className="bg-ds-bg-warning-primary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Warning Primary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-warning-primary</div>
          </div>
          <div className="bg-ds-bg-warning-secondary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Warning Secondary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-warning-secondary</div>
          </div>
          <div className="bg-ds-bg-warning-solid p-4 border border-ds-border-primary rounded-md text-white">
            <div className="font-medium">Warning Solid</div>
            <div className="text-sm opacity-80">bg-ds-bg-warning-solid</div>
          </div>
          <div className="bg-ds-bg-success-primary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Success Primary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-success-primary</div>
          </div>
          <div className="bg-ds-bg-success-secondary p-4 border border-ds-border-primary rounded-md">
            <div className="font-medium">Success Secondary</div>
            <div className="text-sm text-ds-text-secondary">bg-ds-bg-success-secondary</div>
          </div>
          <div className="bg-ds-bg-success-solid p-4 border border-ds-border-primary rounded-md text-white">
            <div className="font-medium">Success Solid</div>
            <div className="text-sm opacity-80">bg-ds-bg-success-solid</div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Border Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-primary)' }}>
            <div className="font-medium">Border Primary</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-primary</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-secondary)' }}>
            <div className="font-medium">Border Secondary</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-secondary</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-tertiary)' }}>
            <div className="font-medium">Border Tertiary</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-tertiary</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-disabled)' }}>
            <div className="font-medium">Border Disabled</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-disabled</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-brand)' }}>
            <div className="font-medium">Border Brand</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-brand</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-brand-solid)' }}>
            <div className="font-medium">Border Brand Solid</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-brand-solid</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-error)' }}>
            <div className="font-medium">Border Error</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-error</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-error-solid)' }}>
            <div className="font-medium">Border Error Solid</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-error-solid</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-warning)' }}>
            <div className="font-medium">Border Warning</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-warning</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-warning-solid)' }}>
            <div className="font-medium">Border Warning Solid</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-warning-solid</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-success)' }}>
            <div className="font-medium">Border Success</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-success</div>
          </div>
          <div className="p-4 rounded-md" style={{ border: '2px solid var(--border-success-solid)' }}>
            <div className="font-medium">Border Success Solid</div>
            <div className="text-sm text-ds-text-secondary">border-ds-border-success-solid</div>
          </div>
        </div>
        
        {/* Foreground Colors */}
        <h3 className="text-lg font-medium mb-3">Foreground Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            'primary', 'secondary', 'tertiary', 'quaternary', 'quinary', 'disabled',
            'brand-primary', 'brand-secondary',
            'error-primary', 'error-secondary',
            'warning-primary', 'warning-secondary',
            'success-primary', 'success-secondary',
            'white'
          ].map((color) => (
            <div key={`fg-${color}`} className="p-4 border border-ds-border-primary rounded-md">
              <div className="flex items-center gap-2">
                <div style={{ backgroundColor: `var(--fg-${color})` }} className="h-8 w-8 rounded-full"></div>
                <div className="font-medium">Foreground {color}</div>
              </div>
              <div className="text-sm text-ds-text-secondary mt-2">fg-ds-fg-{color}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* shadcn Components */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">shadcn Component Variables</h2>
        <p className="mb-4 text-sm text-ds-text-secondary">
          These are the CSS variables used by shadcn components. They're defined in terms of our semantic design system variables.
        </p>
        
        {/* Debug section - CSS Variable Inspection */}
        <div className="p-4 bg-ds-bg-secondary rounded-md mb-6">
          <h3 className="text-lg font-medium mb-2">CSS Variable Values</h3>
          <p className="text-sm mb-4">
            This section displays the actual HSL values stored in each shadcn CSS variable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {shadcnColors.map(color => (
              <div key={`debug-${color.name}`} className="p-2 border border-ds-border-primary rounded-md">
                <div className="font-medium text-sm">--{color.name}</div>
                <code className="text-xs block mt-1 p-1 bg-ds-bg-tertiary rounded-sm">
                  {cssVarValues[color.name] || 'Not set'}
                </code>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-ds-bg-secondary rounded-md mb-4">
          <h3 className="text-lg font-medium mb-2">How shadcn Variables Work</h3>
          <p className="text-sm mb-2">
            The shadcn UI uses a different approach to CSS variables than our custom design system:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-ds-text-secondary">
            <li>shadcn CSS variables contain only the HSL color values (hue, saturation, lightness), not complete colors</li>
            <li>These values must be used with the <code className="bg-ds-bg-tertiary px-1 rounded">hsl(var(--variable))</code> syntax</li>
            <li>This is different from our design system variables which are complete color values</li>
            <li>In React and CSS, you must remember to wrap them in <code className="bg-ds-bg-tertiary px-1 rounded">hsl()</code></li>
          </ul>
        </div>
        
        <h3 className="text-lg font-medium mb-3">shadcn Color Swatches</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {shadcnColors.map((item) => (
            <div key={item.name} className="p-4 border border-ds-border-primary rounded-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full" style={{ backgroundColor: `hsl(var(--${item.name}))` }}></div>
                <div className="font-medium">{item.name}</div>
              </div>
              <div className="text-sm text-ds-text-secondary mt-2">{item.desc}</div>
              <div className="text-xs text-ds-text-tertiary mt-1">
                Usage in CSS: <code className="bg-ds-bg-tertiary px-1 rounded">hsl(var(--{item.name}))</code>
              </div>
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-medium mb-3">shadcn Component Previews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div style={{ 
            backgroundColor: 'hsl(var(--primary))', 
            color: 'hsl(var(--primary-foreground))',
            padding: '1rem',
            borderRadius: '0.5rem' 
          }}>
            <div className="font-medium">Primary</div>
            <div className="text-sm opacity-80">--primary / --primary-foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--primary))'&#125;&#125;</code></div>
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--secondary))', 
            color: 'hsl(var(--secondary-foreground))',
            padding: '1rem',
            borderRadius: '0.5rem' 
          }}>
            <div className="font-medium">Secondary</div>
            <div className="text-sm opacity-80">--secondary / --secondary-foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--secondary))'&#125;&#125;</code></div>
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--accent))', 
            color: 'hsl(var(--accent-foreground))',
            padding: '1rem',
            borderRadius: '0.5rem' 
          }}>
            <div className="font-medium">Accent</div>
            <div className="text-sm opacity-80">--accent / --accent-foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--accent))'&#125;&#125;</code></div>
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--muted))', 
            color: 'hsl(var(--muted-foreground))',
            padding: '1rem',
            borderRadius: '0.5rem' 
          }}>
            <div className="font-medium">Muted</div>
            <div className="text-sm opacity-80">--muted / --muted-foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--muted))'&#125;&#125;</code></div>
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--destructive))', 
            color: 'hsl(var(--destructive-foreground))',
            padding: '1rem',
            borderRadius: '0.5rem' 
          }}>
            <div className="font-medium">Destructive</div>
            <div className="text-sm opacity-80">--destructive / --destructive-foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--destructive))'&#125;&#125;</code></div>
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--card))', 
            color: 'hsl(var(--card-foreground))',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid hsl(var(--border))' 
          }}>
            <div className="font-medium">Card</div>
            <div className="text-sm opacity-80">--card / --card-foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--card))'&#125;&#125;</code></div>
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--popover))', 
            color: 'hsl(var(--popover-foreground))',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid hsl(var(--border))' 
          }}>
            <div className="font-medium">Popover</div>
            <div className="text-sm opacity-80">--popover / --popover-foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--popover))'&#125;&#125;</code></div>
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--background))', 
            color: 'hsl(var(--foreground))',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid hsl(var(--border))' 
          }}>
            <div className="font-medium">Background/Foreground</div>
            <div className="text-sm opacity-80">--background / --foreground</div>
            <div className="text-xs mt-2">Usage: <code className="bg-ds-bg-tertiary/40 px-1 rounded">style=&#123;&#123;backgroundColor: 'hsl(var(--background))'&#125;&#125;</code></div>
          </div>
        </div>
      </section>
      
      {/* Typography - Text Sizes */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Typography - Text Sizes</h2>
        <p className="mb-4 text-sm text-ds-text-secondary">
          Text sizes are defined for common UI elements like paragraphs, labels, and captions.
        </p>

        <div className="space-y-6 border border-ds-border-primary rounded-md p-6 bg-ds-bg-secondary">
          <div className="border-b border-ds-border-secondary pb-4">
            <div className="text-xl">Text XL</div>
            <div className="text-sm text-ds-text-tertiary mt-1">
              Font size: 1.25rem (20px) • Line height: 1.875rem (30px) • Class: text-xl
            </div>
            <p className="mt-2 text-xl">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className="border-b border-ds-border-secondary pb-4">
            <div className="text-lg">Text LG</div>
            <div className="text-sm text-ds-text-tertiary mt-1">
              Font size: 1.125rem (18px) • Line height: 1.75rem (28px) • Class: text-lg
            </div>
            <p className="mt-2 text-lg">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className="border-b border-ds-border-secondary pb-4">
            <div className="text-base">Text MD (Base)</div>
            <div className="text-sm text-ds-text-tertiary mt-1">
              Font size: 1rem (16px) • Line height: 1.5rem (24px) • Class: text-base or text-md
            </div>
            <p className="mt-2 text-base">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className="border-b border-ds-border-secondary pb-4">
            <div className="text-sm">Text SM</div>
            <div className="text-sm text-ds-text-tertiary mt-1">
              Font size: 0.875rem (14px) • Line height: 1.25rem (20px) • Class: text-sm
            </div>
            <p className="mt-2 text-sm">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div>
            <div className="text-xs">Text XS</div>
            <div className="text-sm text-ds-text-tertiary mt-1">
              Font size: 0.75rem (12px) • Line height: 1.125rem (18px) • Class: text-xs
            </div>
            <p className="mt-2 text-xs">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-ds-bg-tertiary rounded-md text-sm">
          <p className="font-medium">Weight variations can be combined with size:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-regular text-base">Regular (400): The quick brown fox</p>
              <p className="font-medium text-base">Medium (500): The quick brown fox</p>
            </div>
            <div>
              <p className="font-semibold text-base">Semibold (600): The quick brown fox</p>
              <p className="font-bold text-base">Bold (700): The quick brown fox</p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography - Display Sizes */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Typography - Display Sizes</h2>
        <p className="mb-4 text-sm text-ds-text-secondary">
          Display sizes are used for headlines, page titles, and other prominent text elements.
          All display sizes include a -0.02em letter spacing for a more refined look.
        </p>

        <div className="space-y-10 border border-ds-border-primary rounded-md p-6 bg-ds-bg-secondary">
          <div className="border-b border-ds-border-secondary pb-6">
            <div className="text-sm text-ds-text-tertiary mb-2">
              Font size: 4.5rem (72px) • Line height: 5.625rem (90px) • Class: text-display-2xl
            </div>
            <h1 className="text-display-2xl font-semibold">Display 2XL</h1>
          </div>

          <div className="border-b border-ds-border-secondary pb-6">
            <div className="text-sm text-ds-text-tertiary mb-2">
              Font size: 3.75rem (60px) • Line height: 4.5rem (72px) • Class: text-display-xl
            </div>
            <h1 className="text-display-xl font-semibold">Display XL</h1>
          </div>

          <div className="border-b border-ds-border-secondary pb-6">
            <div className="text-sm text-ds-text-tertiary mb-2">
              Font size: 3rem (48px) • Line height: 3.75rem (60px) • Class: text-display-lg
            </div>
            <h1 className="text-display-lg font-semibold">Display LG</h1>
          </div>

          <div className="border-b border-ds-border-secondary pb-6">
            <div className="text-sm text-ds-text-tertiary mb-2">
              Font size: 2.25rem (36px) • Line height: 2.75rem (44px) • Class: text-display-md
            </div>
            <h1 className="text-display-md font-semibold">Display MD</h1>
          </div>

          <div className="border-b border-ds-border-secondary pb-6">
            <div className="text-sm text-ds-text-tertiary mb-2">
              Font size: 1.875rem (30px) • Line height: 2.375rem (38px) • Class: text-display-sm
            </div>
            <h1 className="text-display-sm font-semibold">Display SM</h1>
          </div>

          <div>
            <div className="text-sm text-ds-text-tertiary mb-2">
              Font size: 1.5rem (24px) • Line height: 2rem (32px) • Class: text-display-xs
            </div>
            <h1 className="text-display-xs font-semibold">Display XS</h1>
          </div>
        </div>

        <div className="mt-4 p-4 bg-ds-bg-tertiary rounded-md text-sm">
          <p>Display sizes work best with semibold or bold weights for maximum impact. 
          Each size includes a slight negative letter spacing (-0.02em) to improve the visual appearance of headlines.</p>
        </div>
      </section>
      
      {/* Combined Examples */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Combined Examples</h2>
        
        <h3 className="text-lg font-medium mb-3">Alert Examples</h3>
        <div className="space-y-4">
          <div style={{ 
            backgroundColor: 'var(--bg-error-primary)',
            borderColor: 'var(--border-error)',
            color: 'var(--text-error-primary)',
            padding: '1rem',
            borderRadius: '0.375rem',
            borderWidth: '1px'
          }}>
            Error Alert: Using design system variables (ds- prefix)
          </div>
          <div style={{ 
            backgroundColor: 'hsl(var(--destructive) / 0.1)', 
            color: 'hsl(var(--destructive))',
            border: '1px solid hsl(var(--destructive))',
            padding: '1rem',
            borderRadius: '0.375rem'
          }}>
            Error Alert: Using shadcn destructive variables with HSL syntax
          </div>
          <div style={{ 
            backgroundColor: 'var(--bg-warning-primary)',
            borderColor: 'var(--border-warning)',
            color: 'var(--text-warning-primary)',
            padding: '1rem',
            borderRadius: '0.375rem',
            borderWidth: '1px'
          }}>
            Warning Alert: Using design system variables (ds- prefix)
          </div>
          <div style={{ 
            backgroundColor: 'var(--bg-success-primary)',
            borderColor: 'var(--border-success)',
            color: 'var(--text-success-primary)',
            padding: '1rem',
            borderRadius: '0.375rem',
            borderWidth: '1px'
          }}>
            Success Alert: Using design system variables (ds- prefix)
          </div>
        </div>
      </section>
    </div>
  );
}
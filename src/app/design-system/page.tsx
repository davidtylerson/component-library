// src/app/design-system/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button/button";

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Get initial theme on component mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Update document class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update state
    setTheme(newTheme);
    
    // Store in localStorage
    localStorage.setItem('theme', newTheme);
  };

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

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-ds-bg-primary text-ds-text-primary">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Design System</h1>
        <Button 
          onClick={toggleTheme}
          variant="primary"
        >
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </Button>
      </div>
      
      {/* Theme Information */}
      <section className="mb-8 p-4 bg-ds-bg-secondary border border-ds-border-primary rounded-md">
        <h2 className="text-xl font-semibold mb-2">Current Theme: {theme}</h2>
        <p className="mb-4">
          This design system uses your custom Tailwind ds- prefixed classes.
          Use the button in the top-right to toggle between light and dark mode.
        </p>
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
        </div>
      </section>
      
      {/* shadcn Components */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">shadcn Component Variables</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-primary text-primary-foreground p-4 rounded-md">
            <div className="font-medium">Primary</div>
            <div className="text-sm opacity-80">bg-primary / text-primary-foreground</div>
          </div>
          <div className="bg-secondary text-secondary-foreground p-4 rounded-md">
            <div className="font-medium">Secondary</div>
            <div className="text-sm opacity-80">bg-secondary / text-secondary-foreground</div>
          </div>
          <div className="bg-accent text-accent-foreground p-4 rounded-md">
            <div className="font-medium">Accent</div>
            <div className="text-sm opacity-80">bg-accent / text-accent-foreground</div>
          </div>
          <div className="bg-muted text-muted-foreground p-4 rounded-md">
            <div className="font-medium">Muted</div>
            <div className="text-sm opacity-80">bg-muted / text-muted-foreground</div>
          </div>
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
          <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md">
            Error Alert: Using shadcn destructive with opacity
          </div>
        </div>
      </section>
    </div>
  );
}
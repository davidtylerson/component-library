'use client';

import {
  Button,
  ToggleGroup,
  ToggleGroupItem,
  ClientThemeToggle,
} from '@float-vibe-foundry/design-system';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-bg-primary p-8 text-text-primary">
      <h1 className="mb-8 text-2xl font-bold">Design System Test Page</h1>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Theme Toggle</h2>
          <ClientThemeToggle />
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Toggle Group</h2>
          <ToggleGroup type="single" defaultValue="preview">
            <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
            <ToggleGroupItem value="code">Code</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Buttons</h2>
          <div className="space-x-4">
            <Button dsVariant="primary">Primary Button</Button>
            <Button dsVariant="ghost">Ghost Button</Button>
            <Button dsVariant="outline">Outline Button</Button>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Debug Info</h2>
          <div className="rounded bg-bg-secondary p-4">
            <p>
              Current theme: <span id="theme-info">Loading...</span>
            </p>
            <p>
              CSS Variables loaded: <span id="css-vars">Loading...</span>
            </p>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          // Debug script
          setTimeout(() => {
            const themeInfo = document.getElementById('theme-info');
            const cssVars = document.getElementById('css-vars');
            
            // Check theme
            themeInfo.textContent = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            
            // Check CSS variables
            const computedStyle = getComputedStyle(document.documentElement);
            const bgPrimary = computedStyle.getPropertyValue('--bg-primary');
            const bgSecondary = computedStyle.getPropertyValue('--bg-secondary');
            const textPrimary = computedStyle.getPropertyValue('--text-primary');
            
            cssVars.textContent = bgPrimary && bgSecondary && textPrimary ? 'Yes' : 'No';
            
            console.log('CSS Variables:', {
              '--bg-primary': bgPrimary,
              '--bg-secondary': bgSecondary,
              '--text-primary': textPrimary,
              '--accent-primary': computedStyle.getPropertyValue('--accent-primary'),
              '--button-bg-primary': computedStyle.getPropertyValue('--button-bg-primary')
            });
          }, 100);
        `,
        }}
      />
    </div>
  );
}

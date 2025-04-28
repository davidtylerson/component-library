import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../src/themes/theme-provider';
import { ThemeContextProvider } from '../src/themes/theme-context';
import * as React from 'react';

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const decorators = [
  (Story) => (
    <div style={{ 
      // Apply font variables directly to ensure they're available
      ['--font-inter' as any]: inter.style.fontFamily 
    }} 
    className={`${inter.variable} font-sans antialiased`}>
      <ThemeProvider>
        <ThemeContextProvider>
          <div className="p-4">
            <Story />
          </div>
        </ThemeContextProvider>
      </ThemeProvider>
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: decorators,
};

export default preview;
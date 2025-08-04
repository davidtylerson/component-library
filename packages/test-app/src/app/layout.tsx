import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@float-vibe-foundry/design-system/themes';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Design System Test App',
  description: 'A test application for the design system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-bg-app-base font-sans text-text-primary`}>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 
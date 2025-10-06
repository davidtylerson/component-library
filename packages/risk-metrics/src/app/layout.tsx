import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@float-vibe-foundry/design-system/themes';
import { SidebarProvider } from '@float-vibe-foundry/design-system';
import { AppFrame } from '../components/AppFrame';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Risk Metrics Dashboard',
  description: 'Post-trade operational risk management dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-bg-app-base font-sans text-text-primary`}
      >
        <ThemeProvider defaultTheme="system" enableSystem>
          <SidebarProvider>
            <AppFrame>{children}</AppFrame>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

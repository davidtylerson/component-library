import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@float-vibe-foundry/design-system/themes';
import { SidebarProvider } from '@float-vibe-foundry/design-system';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Float Mail - Email Template Builder',
  description: 'A modern email template builder with design system integration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-bg-app-base font-sans text-text-primary`}
      >
        <ThemeProvider defaultTheme="system" enableSystem>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

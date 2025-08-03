import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../themes/theme-provider';
import { ThemeContextProvider } from '../themes/theme-context';
import { SidebarProvider } from '../components/ui/sidebar';
import React from 'react';
import SidebarNavClient from '../components/SidebarNavClient';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Float UI Library',
  description: 'A component library for fintech applications',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans`}
        style={{ background: 'var(--bg-app-base)' }}
      >
        <ThemeProvider>
          <ThemeContextProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <div
                  className="h-screen flex-none"
                  style={{ background: 'var(--bg-app-base)' }}
                >
                  <SidebarNavClient />
                </div>
                <div className="flex h-screen flex-1 items-start justify-center">
                  <div
                    className="relative my-2 mr-2 flex-1"
                    style={{
                      background: 'var(--bg-primary)',
                      borderRadius: 8,
                      border: '1px solid var(--border-tertiary)',
                      overflow: 'auto',
                      boxSizing: 'border-box',
                      padding: 0,
                      height: 'calc(100vh - 16px)',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: 1000,
                        width: '100%',
                        margin: '0 auto',
                        height: '100%',
                      }}
                    >
                      <main className="h-full w-full">{children}</main>
                    </div>
                  </div>
                </div>
              </div>
            </SidebarProvider>
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals-consolidated.css';
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
        className={`${inter.variable} bg-bg-app-base font-sans text-text-primary`}
      >
        <ThemeProvider>
          <ThemeContextProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <div className="bg-bg-app-base h-screen flex-none">
                  <SidebarNavClient />
                </div>
                <div className="flex h-screen flex-1 items-start justify-center">
                  <div
                    className="relative my-2 mr-2 flex-1 overflow-auto rounded-lg border border-border-tertiary bg-bg-primary"
                    style={{
                      boxSizing: 'border-box',
                      padding: 0,
                      height: 'calc(100vh - 16px)',
                    }}
                  >
                    <div className="mx-auto h-full w-full max-w-6xl">
                      <main className="h-full w-full text-text-primary">
                        {children}
                      </main>
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

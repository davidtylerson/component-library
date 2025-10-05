import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { ThemeProvider } from '@float-vibe-foundry/design-system';
import { AppFrame } from '../components/AppFrame';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AppFrame>{children}</AppFrame>
        </ThemeProvider>
      </body>
    </html>
  );
}

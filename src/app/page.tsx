'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTheme } from '@/themes/theme-context';

export default function HomePage() {
  const { isDark, setTheme } = useTheme();

  return (
    <>
      <style jsx>{`
        .test-red {
          background-color: red !important;
          color: white !important;
          padding: 20px !important;
          margin: 20px !important;
        }
      `}</style>

      <div className="mx-auto min-h-screen max-w-6xl bg-bg-primary p-8 text-text-primary">
        <div className="test-red">
          <h1>CSS TEST - This should have a red background</h1>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome to Float Vibe Foundry</h1>
          <p className="mt-2 text-text-secondary">
            A modern design system and component library built with Next.js,
            Tailwind CSS, and shadcn/ui.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>Explore our component library</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Browse through our collection of reusable UI components.</p>
            </CardContent>
            <CardFooter>
              <Link href="/components">
                <Button>View Components</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design System</CardTitle>
              <CardDescription>Design tokens and themes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore our design tokens, colors, and theme system.</p>
            </CardContent>
            <CardFooter>
              <Link href="/design-system">
                <Button>View Design System</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Toggle</CardTitle>
              <CardDescription>
                Switch between light and dark modes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
                Toggle Theme
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

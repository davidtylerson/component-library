'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/themes/theme-context";

export default function HomePage() {
  const { isDark, setTheme } = useTheme();

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-bg-primary text-text-primary">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome to Float</h1>
        <p className="text-text-secondary mt-2">
          A modern design system and component library built with Next.js, Tailwind CSS, and shadcn/ui.
        </p>
      </div>

      {/* Quick Links */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Design System</CardTitle>
              <CardDescription>
                Explore our design tokens, colors, typography, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                Our design system provides a comprehensive set of design tokens and guidelines
                for building consistent and beautiful user interfaces.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/design-system">
                <Button>View Design System</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>
                Browse our collection of reusable UI components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                A curated set of components built with shadcn/ui and styled with our design system,
                ready to use in your projects.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/components">
                <Button>View Components</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Modern Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                Built with Next.js 14, React, TypeScript, and Tailwind CSS for a modern
                and performant development experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                A comprehensive design system with semantic color tokens, typography,
                spacing, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary">
                A growing collection of accessible and customizable components
                built with shadcn/ui.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Theme Toggle */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Toggle between light and dark mode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary mb-4">
              Current theme: {isDark ? 'Dark' : 'Light'}
            </p>
            <Button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              variant="outline"
            >
              Switch to {isDark ? 'Light' : 'Dark'} Mode
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Getting Started */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>
              Follow these steps to get started with Float
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">1. Clone the repository</h3>
                <pre className="bg-bg-secondary p-2 rounded-md text-sm">
                  git clone https://github.com/yourusername/float.git
                </pre>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">2. Install dependencies</h3>
                <pre className="bg-bg-secondary p-2 rounded-md text-sm">
                  npm install
                </pre>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">3. Start the development server</h3>
                <pre className="bg-bg-secondary p-2 rounded-md text-sm">
                  npm run dev
                </pre>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-text-secondary">
              Visit our GitHub repository for more information and documentation.
            </p>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
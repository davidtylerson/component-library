'use client';

import { Heading } from '@/components/typography/heading';
import { Text } from '@/components/typography/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function TypographyPage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* Page Header */}
      <div className="space-y-2">
        <Heading level={1} size="2xl">
          Typography
        </Heading>
        <Text size="lg" color="secondary">
          The typography system provides consistent text styling across the
          design system.
        </Text>
      </div>

      {/* Type Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Type Scale</CardTitle>
          <CardDescription>
            Our type scale is based on a harmonious progression of font sizes,
            optimized for readability and visual hierarchy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Text size="xs" weight="medium" color="secondary">
                  text-xs (12px)
                </Text>
                <Text size="xs">
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
              <div className="space-y-2">
                <Text size="sm" weight="medium" color="secondary">
                  text-sm (13px)
                </Text>
                <Text size="sm">
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
              <div className="space-y-2">
                <Text size="md" weight="medium" color="secondary">
                  text-base (16px)
                </Text>
                <Text size="md">
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
              <div className="space-y-2">
                <Text size="lg" weight="medium" color="secondary">
                  text-lg (18px)
                </Text>
                <Text size="lg">
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
              <div className="space-y-2">
                <Text size="xl" weight="medium" color="secondary">
                  text-xl (20px)
                </Text>
                <Text size="xl">
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
            </div>

            {/* Design System Display Sizes */}
            <div className="mt-6">
              <Heading level={3} size="sm" className="mb-4">
                Design System Display Sizes
              </Heading>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="secondary">
                    display-xs (24px)
                  </Text>
                  <Text className="text-display-xs">
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="secondary">
                    display-sm (30px)
                  </Text>
                  <Text className="text-display-sm">
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="secondary">
                    display-md (36px)
                  </Text>
                  <Text className="text-display-md">
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="secondary">
                    display-lg (48px)
                  </Text>
                  <Text className="text-display-lg">
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="secondary">
                    display-xl (60px)
                  </Text>
                  <Text className="text-display-xl">
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="secondary">
                    display-2xl (72px)
                  </Text>
                  <Text className="text-display-2xl">
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Headings */}
      <Card>
        <CardHeader>
          <CardTitle>Headings</CardTitle>
          <CardDescription>
            Heading components provide semantic structure and visual hierarchy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Heading Level 1 (h1)
              </Text>
              <Heading level={1}>
                The quick brown fox jumps over the lazy dog
              </Heading>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Heading Level 2 (h2)
              </Text>
              <Heading level={2}>
                The quick brown fox jumps over the lazy dog
              </Heading>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Heading Level 3 (h3)
              </Text>
              <Heading level={3}>
                The quick brown fox jumps over the lazy dog
              </Heading>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Heading Level 4 (h4)
              </Text>
              <Heading level={4}>
                The quick brown fox jumps over the lazy dog
              </Heading>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Heading Level 5 (h5)
              </Text>
              <Heading level={5}>
                The quick brown fox jumps over the lazy dog
              </Heading>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Heading Level 6 (h6)
              </Text>
              <Heading level={6}>
                The quick brown fox jumps over the lazy dog
              </Heading>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Font Weights */}
      <Card>
        <CardHeader>
          <CardTitle>Font Weights</CardTitle>
          <CardDescription>
            Different font weights provide emphasis and hierarchy in text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Regular (400)
              </Text>
              <Text size="lg" weight="regular">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Medium (500)
              </Text>
              <Text size="lg" weight="medium">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Semibold (600)
              </Text>
              <Text size="lg" weight="semibold">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Bold (700)
              </Text>
              <Text size="lg" weight="bold">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Text Colors</CardTitle>
          <CardDescription>
            Semantic text colors provide meaning and context in the interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Primary
              </Text>
              <Text size="lg" color="primary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Secondary
              </Text>
              <Text size="lg" color="secondary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Tertiary
              </Text>
              <Text size="lg" color="tertiary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Disabled
              </Text>
              <Text size="lg" color="disabled">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Brand Primary
              </Text>
              <Text size="lg" color="brand-primary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Brand Secondary
              </Text>
              <Text size="lg" color="brand-secondary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Brand Tertiary
              </Text>
              <Text size="lg" color="brand-tertiary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Error Primary
              </Text>
              <Text size="lg" color="error-primary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Warning Primary
              </Text>
              <Text size="lg" color="warning-primary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Success Primary
              </Text>
              <Text size="lg" color="success-primary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FG Colors (for Icons) */}
      <Card>
        <CardHeader>
          <CardTitle>FG Colors (for Icons & Foreground Elements)</CardTitle>
          <CardDescription>
            FG colors are used for icons and foreground elements. They include
            secondary variants for error/warning/success.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Error Primary
              </Text>
              <div className="flex items-center gap-2">
                <div className="bg-fg-error-primary h-4 w-4 rounded"></div>
                <Text size="sm" color="secondary">
                  fg-error-primary
                </Text>
              </div>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Error Secondary
              </Text>
              <div className="flex items-center gap-2">
                <div className="bg-fg-error-secondary h-4 w-4 rounded"></div>
                <Text size="sm" color="secondary">
                  fg-error-secondary
                </Text>
              </div>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Warning Primary
              </Text>
              <div className="flex items-center gap-2">
                <div className="bg-fg-warning-primary h-4 w-4 rounded"></div>
                <Text size="sm" color="secondary">
                  fg-warning-primary
                </Text>
              </div>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Warning Secondary
              </Text>
              <div className="flex items-center gap-2">
                <div className="bg-fg-warning-secondary h-4 w-4 rounded"></div>
                <Text size="sm" color="secondary">
                  fg-warning-secondary
                </Text>
              </div>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Success Primary
              </Text>
              <div className="flex items-center gap-2">
                <div className="bg-fg-success-primary h-4 w-4 rounded"></div>
                <Text size="sm" color="secondary">
                  fg-success-primary
                </Text>
              </div>
            </div>
            <div className="space-y-2">
              <Text size="sm" weight="medium" color="secondary">
                Success Secondary
              </Text>
              <div className="flex items-center gap-2">
                <div className="bg-fg-success-secondary h-4 w-4 rounded"></div>
                <Text size="sm" color="secondary">
                  fg-success-secondary
                </Text>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for using typography in the design system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Heading level={3} size="sm" className="mb-2">
                Hierarchy
              </Heading>
              <Text size="sm" color="secondary">
                Use heading levels (h1-h6) to create clear information
                hierarchy. Don't skip levels.
              </Text>
            </div>
            <div>
              <Heading level={3} size="sm" className="mb-2">
                Readability
              </Heading>
              <Text size="sm" color="secondary">
                Choose appropriate text sizes for different contexts. Body text
                should be at least 13px (text-sm) for optimal readability.
              </Text>
            </div>
            <div>
              <Heading level={3} size="sm" className="mb-2">
                Consistency
              </Heading>
              <Text size="sm" color="secondary">
                Use the Text and Heading components instead of raw HTML elements
                to maintain consistency across the application.
              </Text>
            </div>
            <div>
              <Heading level={3} size="sm" className="mb-2">
                Semantic Colors
              </Heading>
              <Text size="sm" color="secondary">
                Use semantic color variants (primary, secondary, tertiary,
                brand-primary, error-primary, warning-primary, success-primary)
                to provide meaning and context to text content.
              </Text>
            </div>
            <div>
              <Heading level={3} size="sm" className="mb-2">
                Icon Colors
              </Heading>
              <Text size="sm" color="secondary">
                For icons and foreground elements, use the fg-* color system
                which includes secondary variants: fg-error-secondary,
                fg-warning-secondary, fg-success-secondary.
              </Text>
            </div>
            <div>
              <Heading level={3} size="sm" className="mb-2">
                Missing Secondary Colors
              </Heading>
              <Text size="sm" color="secondary">
                Note: The text-* system only has primary variants for
                error/warning/success. Secondary variants exist in the fg-*
                system for icons and foreground elements.
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

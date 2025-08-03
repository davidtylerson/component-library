import React from 'react';
import { Heading } from './heading';
import { Text } from './text';

/**
 * A component that showcases all typography variants in the design system
 */
export const TypographyShowcase: React.FC = () => {
  return (
    <div className="space-y-12 p-8">
      {/* Heading display sizes */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Display Scale
        </Heading>
        <div className="space-y-4">
          <Heading size="2xl">Display 2XL</Heading>
          <Heading size="xl">Display XL</Heading>
          <Heading size="lg">Display LG</Heading>
          <Heading size="md">Display MD</Heading>
          <Heading size="sm">Display SM</Heading>
          <Heading size="xs">Display XS</Heading>
        </div>
      </section>

      {/* Text sizes */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Text Scale
        </Heading>
        <div className="space-y-4">
          <Text size="xl">Text XL</Text>
          <Text size="lg">Text LG</Text>
          <Text size="md">Text MD (Default)</Text>
          <Text size="sm">Text SM</Text>
          <Text size="xs">Text XS</Text>
        </div>
      </section>

      {/* Font weights */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Font Weights
        </Heading>
        <div className="space-y-4">
          <Text weight="regular">Regular (400) - Default for Text</Text>
          <Text weight="medium">Medium (500)</Text>
          <Text weight="semibold">Semibold (600)</Text>
          <Text weight="bold">Bold (700) - Default for Headings</Text>
        </div>
      </section>

      {/* Text styles */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Text Styles
        </Heading>
        <div className="space-y-4">
          <Text>Normal Text</Text>
          <Text italic>Italic Text</Text>
          <Text underline>Underlined Text</Text>
          <Text italic underline>
            Italic and Underlined Text
          </Text>
        </div>
      </section>

      {/* Text colors */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Text Colors
        </Heading>
        <div className="space-y-4">
          <Text color="default">Default Text Color</Text>
          <Text color="muted">Muted Text Color</Text>
          <Text color="brand">Brand Text Color</Text>
          <Text color="error">Error Text Color</Text>
          <Text color="warning">Warning Text Color</Text>
          <Text color="success">Success Text Color</Text>
        </div>
      </section>

      {/* Heading levels */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Heading Levels (h1-h6)
        </Heading>
        <div className="space-y-4">
          <Heading level={1}>Heading Level 1 (h1)</Heading>
          <Heading level={2}>Heading Level 2 (h2)</Heading>
          <Heading level={3}>Heading Level 3 (h3)</Heading>
          <Heading level={4}>Heading Level 4 (h4)</Heading>
          <Heading level={5}>Heading Level 5 (h5)</Heading>
          <Heading level={6}>Heading Level 6 (h6)</Heading>
        </div>
      </section>

      {/* Examples of different HTML elements */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Custom HTML Elements
        </Heading>
        <div className="space-y-4">
          <Text as="span">Text as span</Text>
          <br />
          <Text as="label">Text as label</Text>
          <br />
          <Text as="div">Text as div</Text>
          <Heading as="legend" size="xs">
            Heading as legend
          </Heading>
        </div>
      </section>

      {/* Combined examples */}
      <section className="space-y-6">
        <Heading level={2} size="md">
          Combined Examples
        </Heading>
        <div className="space-y-4 rounded-md border p-4">
          <Heading size="md" color="brand">
            Product Features
          </Heading>
          <Text size="lg" weight="medium">
            Introducing our new financial platform
          </Text>
          <Text>
            Manage your finances with ease using our intuitive dashboard and
            powerful analytics.
          </Text>
          <Text weight="semibold" color="success">
            Special offer ends soon!
          </Text>
          <Text size="sm" color="muted" italic>
            Terms and conditions apply.
          </Text>
        </div>
      </section>
    </div>
  );
};

export default TypographyShowcase;

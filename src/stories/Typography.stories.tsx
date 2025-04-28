import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../components/typography/heading';
import { Text } from '../components/typography/text';

const meta: Meta = {
  title: 'Core/Typography',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const HeadingShowcase: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Heading Sizes</Text>
        <div className="space-y-4">
          <Heading size="2xl">Display 2XL</Heading>
          <Heading size="xl">Display XL</Heading>
          <Heading size="lg">Display LG</Heading>
          <Heading size="md">Display MD</Heading>
          <Heading size="sm">Display SM</Heading>
          <Heading size="xs">Display XS</Heading>
        </div>
      </div>

      <div>
        <Text size="lg" weight="semibold" className="mb-4">Heading Levels</Text>
        <div className="space-y-4">
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Heading level={5}>Heading 5</Heading>
          <Heading level={6}>Heading 6</Heading>
        </div>
      </div>

      <div>
        <Text size="lg" weight="semibold" className="mb-4">Heading Colors</Text>
        <div className="space-y-4">
          <Heading color="default">Default Color</Heading>
          <Heading color="muted">Muted Color</Heading>
          <Heading color="brand">Brand Color</Heading>
          <Heading color="error">Error Color</Heading>
          <Heading color="warning">Warning Color</Heading>
          <Heading color="success">Success Color</Heading>
        </div>
      </div>
    </div>
  ),
};

export const TextShowcase: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Text size="lg" weight="semibold" className="mb-4">Text Sizes</Text>
        <div className="space-y-4">
          <Text size="xl">Text XL</Text>
          <Text size="lg">Text LG</Text>
          <Text size="md">Text MD (Default)</Text>
          <Text size="sm">Text SM</Text>
          <Text size="xs">Text XS</Text>
        </div>
      </div>

      <div>
        <Text size="lg" weight="semibold" className="mb-4">Text Weights</Text>
        <div className="space-y-4">
          <Text weight="regular">Regular Weight (Default)</Text>
          <Text weight="medium">Medium Weight</Text>
          <Text weight="semibold">Semibold Weight</Text>
          <Text weight="bold">Bold Weight</Text>
        </div>
      </div>

      <div>
        <Text size="lg" weight="semibold" className="mb-4">Text Styles</Text>
        <div className="space-y-4">
          <Text>Normal Text</Text>
          <Text italic>Italic Text</Text>
          <Text underline>Underlined Text</Text>
          <Text italic underline>Italic and Underlined Text</Text>
        </div>
      </div>

      <div>
        <Text size="lg" weight="semibold" className="mb-4">Text Colors</Text>
        <div className="space-y-4">
          <Text color="default">Default Color</Text>
          <Text color="muted">Muted Color</Text>
          <Text color="brand">Brand Color</Text>
          <Text color="error">Error Color</Text>
          <Text color="warning">Warning Color</Text>
          <Text color="success">Success Color</Text>
        </div>
      </div>

      <div>
        <Text size="lg" weight="semibold" className="mb-4">Polymorphic Components</Text>
        <div className="space-y-4">
          <Text as="span" className="mr-2">This is a span</Text>
          <Text as="label" className="mr-2">This is a label</Text>
          <Heading as="legend" size="xs">This is a legend</Heading>
        </div>
      </div>
    </div>
  ),
};

export const RealWorldExample: StoryObj = {
  render: () => (
    <div className="max-w-2xl p-6 border rounded-lg shadow-sm">
      <Heading size="md" color="brand" className="mb-4">Account Overview</Heading>
      
      <div className="mb-8">
        <Text size="sm" color="muted" className="mb-2">Last updated: April 28, 2025</Text>
        <div className="bg-gray-50 p-4 rounded-md">
          <Text weight="medium">Current Balance</Text>
          <Heading size="lg" color="success" className="mt-1">$24,567.89</Heading>
        </div>
      </div>
      
      <div className="mb-6">
        <Heading level={3} size="xs" className="mb-3">Recent Transactions</Heading>
        <div className="space-y-3">
          <div className="p-3 border rounded flex justify-between items-center">
            <div>
              <Text weight="medium">Payment Received</Text>
              <Text size="sm" color="muted">From: Acme Corp</Text>
            </div>
            <Text weight="bold" color="success">+$2,500.00</Text>
          </div>
          <div className="p-3 border rounded flex justify-between items-center">
            <div>
              <Text weight="medium">Transfer Sent</Text>
              <Text size="sm" color="muted">To: Business Account</Text>
            </div>
            <Text weight="bold" color="error">-$1,200.00</Text>
          </div>
        </div>
      </div>
      
      <div>
        {/* @ts-ignore - TypeScript doesn't recognize href on polymorphic component */}
        <Text size="sm" color="brand" underline as="a" href="#" className="mr-3">
          View All Transactions
        </Text>
        {/* @ts-ignore - TypeScript doesn't recognize href on polymorphic component */}
        <Text size="sm" color="brand" underline as="a" href="#">
          Download Statement
        </Text>
      </div>
    </div>
  ),
};
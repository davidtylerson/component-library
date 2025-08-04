import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '.';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    level: {
      control: { type: 'range', min: 1, max: 6 },
      description: 'The heading level (h1-h6)',
      defaultValue: 1,
    },
    size: {
      control: 'select',
      options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'],
      description: 'The size of the heading',
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'The font weight of the heading',
      defaultValue: 'bold',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'brand', 'error', 'warning', 'success'],
      description: 'The color of the heading',
      defaultValue: 'default',
    },
    italic: {
      control: 'boolean',
      description: 'Whether the text should be italic',
      defaultValue: false,
    },
    underline: {
      control: 'boolean',
      description: 'Whether the text should be underlined',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'The content of the heading',
      defaultValue: 'Heading Text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 1,
    children: 'Default Heading (h1)',
  },
};

export const HeadingLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
};

export const HeadingSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading size="2xl">Display 2XL</Heading>
      <Heading size="xl">Display XL</Heading>
      <Heading size="lg">Display LG</Heading>
      <Heading size="md">Display MD</Heading>
      <Heading size="sm">Display SM</Heading>
      <Heading size="xs">Display XS</Heading>
    </div>
  ),
};

export const HeadingWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading weight="regular">Regular Heading</Heading>
      <Heading weight="medium">Medium Heading</Heading>
      <Heading weight="semibold">Semibold Heading</Heading>
      <Heading weight="bold">Bold Heading</Heading>
    </div>
  ),
};

export const HeadingColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading color="default">Default Color</Heading>
      <Heading color="muted">Muted Color</Heading>
      <Heading color="brand">Brand Color</Heading>
      <Heading color="error">Error Color</Heading>
      <Heading color="warning">Warning Color</Heading>
      <Heading color="success">Success Color</Heading>
    </div>
  ),
};

export const CustomElement: Story = {
  args: {
    as: 'div',
    children: 'Heading as a div element',
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xl", "lg", "md", "sm", "xs"],
      description: "The size of the text",
      defaultValue: "md",
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
      description: "The font weight of the text",
      defaultValue: "regular",
    },
    color: {
      control: "select",
      options: ["default", "muted", "brand", "error", "warning", "success"],
      description: "The color of the text",
      defaultValue: "default",
    },
    italic: {
      control: "boolean",
      description: "Whether the text should be italic",
      defaultValue: false,
    },
    underline: {
      control: "boolean",
      description: "Whether the text should be underlined",
      defaultValue: false,
    },
    children: {
      control: "text",
      description: "The content of the text",
      defaultValue: "Sample text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Default Text",
  },
};

export const TextSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xl">Text XL</Text>
      <Text size="lg">Text LG</Text>
      <Text size="md">Text MD</Text>
      <Text size="sm">Text SM</Text>
      <Text size="xs">Text XS</Text>
    </div>
  ),
};

export const TextWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="regular">Regular Text</Text>
      <Text weight="medium">Medium Text</Text>
      <Text weight="semibold">Semibold Text</Text>
      <Text weight="bold">Bold Text</Text>
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default Color</Text>
      <Text color="muted">Muted Color</Text>
      <Text color="brand">Brand Color</Text>
      <Text color="error">Error Color</Text>
      <Text color="warning">Warning Color</Text>
      <Text color="success">Success Color</Text>
    </div>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <div className="space-y-2">
      <Text>Normal Text</Text>
      <Text italic>Italic Text</Text>
      <Text underline>Underlined Text</Text>
      <Text italic underline>Italic and Underlined Text</Text>
    </div>
  ),
};

export const CustomElement: Story = {
  args: {
    as: "span",
    children: "Text as a span element",
  },
};

export const CombinedExample: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="lg" weight="bold" color="brand">
        Large, Bold, Brand-colored Text
      </Text>
      <Text size="sm" weight="medium" color="muted" italic>
        Small, Medium-weight, Muted Italic Text
      </Text>
      <Text size="xs" weight="semibold" color="error" underline>
        Extra Small, Semibold, Error-colored Underlined Text
      </Text>
    </div>
  ),
};
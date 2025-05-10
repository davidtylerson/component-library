'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Import Tabler icons for demonstration
import { 
  IconArrowRight,
  IconPlus,
  IconCheck,
  IconSettings,
  IconDownload,
  IconTrash,
  IconHeart,
  IconStar,
  IconSend,
  IconBell,
  IconMoon,
  IconSun
} from "@tabler/icons-react";

export default function ButtonsShowcasePage() {
  return (
    <div className="container mx-auto py-12 px-4 bg-ds-bg-primary text-ds-text-primary">
      <div className="mb-8">
        <Heading level={1} size="lg">Button Component</Heading>
        <Text className="mt-2">Showcase of our extended Button component based on shadcn/ui</Text>
      </div>

      <section className="mb-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Core Variants</CardTitle>
            <CardDescription>Standard shadcn Button variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Text weight="semibold">Primary</Text>
                <Button variant="primary">Primary Button</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Text weight="semibold">Secondary</Text>
                <Button variant="secondary">Secondary Button</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Text weight="semibold">Ghost</Text>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Text weight="semibold">Outline</Text>
                <Button variant="outline">Outline Button</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Text weight="semibold">Link</Text>
                <Button variant="link">Link Button</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Text weight="semibold">Destructive</Text>
                <Button variant="destructive">Destructive Button</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Design System Variants</CardTitle>
            <CardDescription>Our semantic design system variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div>
                <Heading level={3} size="xs" className="mb-4">Brand Color</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Primary</Text>
                    <Button dsVariant="primary" color="brand">Primary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Secondary</Text>
                    <Button dsVariant="secondary" color="brand">Secondary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Tertiary</Text>
                    <Button dsVariant="tertiary" color="brand">Tertiary Button</Button>
                  </div>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Error Color</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Primary</Text>
                    <Button dsVariant="primary" color="error">Primary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Secondary</Text>
                    <Button dsVariant="secondary" color="error">Secondary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Tertiary</Text>
                    <Button dsVariant="tertiary" color="error">Tertiary Button</Button>
                  </div>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Warning Color</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Primary</Text>
                    <Button dsVariant="primary" color="warning">Primary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Secondary</Text>
                    <Button dsVariant="secondary" color="warning">Secondary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Tertiary</Text>
                    <Button dsVariant="tertiary" color="warning">Tertiary Button</Button>
                  </div>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Success Color</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Primary</Text>
                    <Button dsVariant="primary" color="success">Primary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Secondary</Text>
                    <Button dsVariant="secondary" color="success">Secondary Button</Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text weight="semibold">Tertiary</Text>
                    <Button dsVariant="tertiary" color="success">Tertiary Button</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>Different size variations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-8">
              <div>
                <Heading level={3} size="xs" className="mb-4">Text Buttons</Heading>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm" dsVariant="primary">Small</Button>
                  <Button dsVariant="primary">Default</Button>
                  <Button size="lg" dsVariant="primary">Large</Button>
                </div>
              </div>
              
              <div>
                <Heading level={3} size="xs" className="mb-4">Icon-only Buttons</Heading>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="iconSm" dsVariant="primary" aria-label="Small Icon">
                    <IconSettings size={12} stroke={1.5} />
                  </Button>
                  <Button size="iconMd" dsVariant="primary" aria-label="Medium Icon">
                    <IconSettings size={16} stroke={1.5} />
                  </Button>
                  <Button size="iconLg" dsVariant="primary" aria-label="Large Icon">
                    <IconSettings size={20} stroke={1.5} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buttons with Icons</CardTitle>
            <CardDescription>Various icon placements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div>
                <Heading level={3} size="xs" className="mb-4">Left Icons</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button dsVariant="primary" leftIcon={<IconPlus size={16} stroke={1} />}>
                    Add Item
                  </Button>
                  <Button dsVariant="secondary" leftIcon={<IconDownload size={16} stroke={1} />}>
                    Download
                  </Button>
                  <Button dsVariant="tertiary" leftIcon={<IconSettings size={16} stroke={1} />}>
                    Settings
                  </Button>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Right Icons</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button dsVariant="primary" rightIcon={<IconArrowRight size={16} stroke={1} />}>
                    Continue
                  </Button>
                  <Button dsVariant="secondary" rightIcon={<IconCheck size={16} stroke={1} />}>
                    Confirm
                  </Button>
                  <Button dsVariant="tertiary" rightIcon={<IconTrash size={16} stroke={1} />}>
                    Delete
                  </Button>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Both Sides</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    dsVariant="primary" 
                    leftIcon={<IconDownload size={16} stroke={1} />}
                    rightIcon={<IconArrowRight size={16} stroke={1} />}
                  >
                    Download and Proceed
                  </Button>
                  <Button 
                    dsVariant="secondary" 
                    leftIcon={<IconBell size={16} stroke={1} />}
                    rightIcon={<IconSettings size={16} stroke={1} />}
                  >
                    Configure Notifications
                  </Button>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Icon-only Buttons</Heading>
                <div className="flex flex-wrap gap-4">
                  <Button size="iconSm" dsVariant="primary" aria-label="Settings">
                    <IconSettings size={12} stroke={1} />
                  </Button>
                  <Button size="iconMd" dsVariant="primary" aria-label="Settings">
                    <IconSettings size={16} stroke={1} />
                  </Button>
                  <Button size="iconLg" dsVariant="primary" aria-label="Settings">
                    <IconSettings size={20} stroke={1} />
                  </Button>
                  
                  <Button size="iconMd" dsVariant="secondary" aria-label="Star">
                    <IconStar size={16} stroke={1} />
                  </Button>
                  <Button size="iconMd" dsVariant="tertiary" aria-label="Heart">
                    <IconHeart size={16} stroke={1} />
                  </Button>
                  <Button size="iconMd" variant="destructive" aria-label="Delete">
                    <IconTrash size={16} stroke={1} />
                  </Button>
                  <Button size="iconMd" variant="outline" aria-label="Send">
                    <IconSend size={16} stroke={1} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button States</CardTitle>
            <CardDescription>Interactive states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div>
                <Heading level={3} size="xs" className="mb-4">Loading State</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button dsVariant="primary" isLoading>Loading</Button>
                  <Button dsVariant="secondary" isLoading>Loading</Button>
                  <Button dsVariant="tertiary" isLoading>Loading</Button>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Disabled State</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button dsVariant="primary" disabled>Disabled</Button>
                  <Button dsVariant="secondary" disabled>Disabled</Button>
                  <Button dsVariant="tertiary" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Features</CardTitle>
            <CardDescription>Additional functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div>
                <Heading level={3} size="xs" className="mb-4">asChild Prop (Polymorphic)</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button asChild dsVariant="primary">
                    <a href="#">
                      Button as Link
                      <IconArrowRight className="ml-2" size={16} stroke={1} />
                    </a>
                  </Button>
                  <Button asChild dsVariant="secondary">
                    <a href="#">
                      Another Link
                      <IconArrowRight className="ml-2" size={16} stroke={1} />
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <Heading level={3} size="xs" className="mb-4">Theme-aware Buttons</Heading>
                <div className="flex flex-wrap items-center gap-4">
                  <Button 
                    dsVariant="primary" 
                    leftIcon={<IconSun size={16} stroke={1} />}
                    rightIcon={<IconMoon size={16} stroke={1} />}
                  >
                    Theme-aware Button
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 
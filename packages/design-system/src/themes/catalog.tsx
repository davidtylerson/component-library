'use client';

// src/app/components/catalog.tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui';

// Sample icons from Tabler
import {
  IconPlus,
} from '@tabler/icons-react';

export default function ComponentCatalog() {
  // Component examples with different variants
  const colorOptions: Array<'brand' | 'error' | 'warning' | 'success'> = [
    'brand',
    'error',
    'warning',
    'success',
  ];

  const variantOptions: Array<'primary' | 'secondary' | 'tertiary'> = [
    'primary',
    'secondary',
    'tertiary',
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-display-xl font-bold">Component Catalog</h1>

      <section className="mb-12">
        <h2 className="mb-6 text-display-md font-semibold">Buttons</h2>
        <div className="grid grid-cols-4 gap-6">
          {colorOptions.map(color => (
            <Card key={color}>
              <CardHeader>
                <CardTitle>
                  {color.charAt(0).toUpperCase() + color.slice(1)} Buttons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {variantOptions.map(variant => (
                  <div
                    key={`${color}-${variant}`}
                    className="flex items-center gap-2"
                  >
                    <Button color={color} variant={variant}>
                      {variant}
                    </Button>
                    <Button
                      color={color}
                      variant={variant}
                      leftIcon={<IconPlus className="h-4 w-4" />}
                    >
                      With Icon
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Add more component examples */}
    </div>
  );
}

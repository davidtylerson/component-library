'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Separator,
  ToggleGroup,
  ToggleGroupItem,
} from '@float-vibe-foundry/design-system';

export default function ComponentTestPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [toggleValue, setToggleValue] = useState('option1');

  return (
    <div className="min-h-screen bg-bg-app-base p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Design System Component Test</h1>
          <p className="text-text-secondary">Testing all design system components with dark theme</p>
        </div>

        <Separator />

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive Button</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Controls Section */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="input" className="text-sm font-medium text-text-primary">Input Field</label>
                <Input
                  id="input"
                  placeholder="Enter some text..."
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="select" className="text-sm font-medium text-text-primary">Dropdown</label>
                <Select value={selectedOption} onValueChange={setSelectedOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="toggle" className="text-sm font-medium text-text-primary">Toggle Group</label>
                <ToggleGroup type="single" value={toggleValue} onValueChange={setToggleValue}>
                  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
                  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
                  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge>Default Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Alert Section */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-bg-secondary border border-border-secondary rounded-md">
              <CardDescription>
                This is a default alert message.
              </CardDescription>
            </div>
            <div className="p-4 bg-bg-error-primary border border-border-error rounded-md">
              <CardDescription className="text-text-error-primary">
                This is a destructive alert message.
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        {/* Current Values Display */}
        <Card>
          <CardHeader>
            <CardTitle>Current Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Input Value:</strong> {inputValue || '(empty)'}</p>
              <p><strong>Selected Option:</strong> {selectedOption || '(none)'}</p>
              <p><strong>Toggle Value:</strong> {toggleValue}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
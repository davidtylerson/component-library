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
  Badge,
  Separator,
} from '@float-vibe-foundry/design-system';

export default function TestAppPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="min-h-screen bg-bg-app-base p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Design System Test App</h1>
          <p className="text-text-secondary">Testing design system components in a clean application</p>
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

        {/* Current Values Display */}
        <Card>
          <CardHeader>
            <CardTitle>Current Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Input Value:</strong> {inputValue || '(empty)'}</p>
              <p><strong>Selected Option:</strong> {selectedOption || '(none)'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
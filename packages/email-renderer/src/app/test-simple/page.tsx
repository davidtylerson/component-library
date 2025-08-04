'use client';

import React, { useState } from 'react';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@float-vibe-foundry/design-system';

export default function TestSimplePage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="p-8 space-y-6" style={{ backgroundColor: '#131316', color: 'white' }}>
      <h1 className="text-2xl font-bold mb-6">Design System Test Page</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Field</label>
          <Input
            placeholder="Enter some text..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dropdown</label>
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

        <div>
          <Button onClick={() => alert('Button clicked!')}>
            Click Me
          </Button>
        </div>
      </div>
    </div>
  );
} 
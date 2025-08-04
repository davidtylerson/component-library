'use client';

import React from 'react';
import { Button } from '@float-vibe-foundry/design-system';
import { Input } from '@float-vibe-foundry/design-system';
import { EmailPreviewData } from '../types/template';

interface VariablesEditorProps {
  variables: EmailPreviewData;
  onChange: (variables: EmailPreviewData) => void;
}

export default function VariablesEditor({ variables, onChange }: VariablesEditorProps) {
  const addVariable = () => {
    const newKey = `variable${Object.keys(variables).length + 1}`;
    onChange({
      ...variables,
      [newKey]: ''
    });
  };

  const updateVariable = (key: string, value: string) => {
    onChange({
      ...variables,
      [key]: value
    });
  };

  const removeVariable = (key: string) => {
    const newVariables = { ...variables };
    delete newVariables[key];
    onChange(newVariables);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text-primary">Template Variables</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addVariable}
          className="h-6 px-2 text-xs"
        >
          + Add Variable
        </Button>
      </div>
      
      <div className="space-y-3">
        {Object.entries(variables).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="flex-1">
              <label htmlFor={key} className="text-xs text-text-secondary block mb-1">
                {key}
              </label>
              <Input
                id={key}
                value={value}
                onChange={(e) => updateVariable(key, e.target.value)}
                placeholder="Enter value..."
                className="h-8 text-sm"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeVariable(key)}
              className="h-8 w-8 p-0 text-text-tertiary hover:text-text-primary"
            >
              ×
            </Button>
          </div>
        ))}
        
        {Object.keys(variables).length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-text-tertiary">
              No variables defined. Add variables to customize your template.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
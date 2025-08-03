'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import {
  Button,
  Heading,
  Text,
  Card,
  CardContent,
} from '@float-vibe-foundry/design-system';
import { TemplateData } from '@/types/template-types';
import { TemplateLoader } from '@/lib/template-loader';

interface JsonEditorProps {
  templateName: string;
  data: TemplateData;
  onDataChange: (data: TemplateData) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  templateName,
  data,
  onDataChange,
}) => {
  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;

    try {
      const parsedData = JSON.parse(value);
      onDataChange(parsedData);
    } catch (error) {
      // Invalid JSON - don't update
      console.warn('Invalid JSON:', error);
    }
  };

  const sampleData = TemplateLoader.getSampleData(templateName);

  const handleLoadSample = () => {
    onDataChange(sampleData);
  };

  return (
    <Card className="flex h-full flex-col space-y-4 p-4">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <Heading level={3} size="sm" weight="medium">
            JSON
          </Heading>
          <Button
            onClick={handleLoadSample}
            size="sm"
            dsVariant="ghost"
            className="text-xs"
          >
            Load Sample
          </Button>
        </div>

        <div className="flex-1 overflow-hidden rounded-lg border border-border-primary">
          <Editor
            height="100%"
            defaultLanguage="json"
            value={JSON.stringify(data, null, 2)}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 12,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

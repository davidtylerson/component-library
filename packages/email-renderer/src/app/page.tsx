'use client';

import { useState } from 'react';
import { JsonEditor } from '@/components/JsonEditor';
import { EmailPreview } from '@/components/EmailPreview';
import { SendGridExport } from '@/components/SendGridExport';
import { TemplateLoader } from '@/lib/template-loader';
import {
  Button,
  ToggleGroup,
  ToggleGroupItem,
  ClientThemeToggle,
  Heading,
  Card,
  CardContent,
} from '@float-vibe-foundry/design-system';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Welcome');
  const [templateData, setTemplateData] = useState(
    TemplateLoader.getSampleData('Welcome')
  );
  const [viewMode, setViewMode] = useState<'react' | 'html'>('react');
  const [displayMode, setDisplayMode] = useState<'preview' | 'code'>('preview');

  const templateNames = TemplateLoader.getAvailableTemplates();

  const handleTemplateChange = (templateName: string) => {
    setSelectedTemplate(templateName);
    setTemplateData(TemplateLoader.getSampleData(templateName));
  };

  const handleDataChange = (_data: any) => {
    setTemplateData(_data);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <Card className="rounded-none border-b border-border-primary bg-bg-secondary p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Heading level={1} size="lg" weight="semibold">
                {selectedTemplate}
              </Heading>
              <div className="flex items-center gap-2">
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={value =>
                    value && setViewMode(value as 'react' | 'html')
                  }
                >
                  <ToggleGroupItem value="react">React</ToggleGroupItem>
                  <ToggleGroupItem value="html">HTML</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ToggleGroup
                type="single"
                value={displayMode}
                onValueChange={value =>
                  value && setDisplayMode(value as 'preview' | 'code')
                }
              >
                <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
                <ToggleGroupItem value="code">Code</ToggleGroupItem>
              </ToggleGroup>
              <ClientThemeToggle />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <Card className="w-64 rounded-none border-r border-border-primary bg-bg-secondary p-4">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* Templates Section */}
              <div>
                <Heading level={2} size="md" weight="semibold" className="mb-3">
                  Templates
                </Heading>
                <div className="space-y-2">
                  {templateNames.map(name => (
                    <Button
                      key={name}
                      dsVariant={
                        selectedTemplate === name ? 'primary' : 'ghost'
                      }
                      className="w-full justify-start"
                      onClick={() => handleTemplateChange(name)}
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Components Section */}
              <div>
                <Heading level={2} size="md" weight="semibold" className="mb-3">
                  Components
                </Heading>
                <div className="space-y-2">
                  <Button dsVariant="ghost" className="w-full justify-start">
                    Button
                  </Button>
                  <Button dsVariant="ghost" className="w-full justify-start">
                    Container
                  </Button>
                  <Button dsVariant="ghost" className="w-full justify-start">
                    Header
                  </Button>
                  <Button dsVariant="ghost" className="w-full justify-start">
                    Footer
                  </Button>
                  <Button dsVariant="ghost" className="w-full justify-start">
                    DataTable
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="flex-1 rounded-none bg-bg-primary">
          <CardContent className="p-0">
            <EmailPreview
              templateName={selectedTemplate}
              data={templateData}
              viewMode={viewMode}
              displayMode={displayMode}
            />
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <Card className="w-80 overflow-y-auto rounded-none border-l border-border-primary bg-bg-secondary p-4">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* JSON Editor */}
              <div>
                <Heading level={2} size="md" weight="semibold" className="mb-3">
                  Template Data
                </Heading>
                <JsonEditor
                  data={templateData}
                  onDataChange={handleDataChange}
                  templateName={selectedTemplate}
                />
              </div>

              {/* SendGrid Export */}
              <div className="border-t border-border-primary pt-6">
                <SendGridExport
                  templateName={selectedTemplate}
                  data={templateData}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

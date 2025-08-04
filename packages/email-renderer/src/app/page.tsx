'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Badge,
  ToggleGroup,
  ToggleGroupItem,
  Input,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@float-vibe-foundry/design-system';
import { TemplateLoader } from '@/lib/template-loader';
import { TemplateRenderer } from '@/lib/template-renderer';
import { TemplateData, RenderedTemplate } from '@/types/template-types';
import Editor from '@monaco-editor/react';
import { SendGridExport } from '@/components/SendGridExport';

type ViewMode = 'react' | 'html';
type DisplayMode = 'preview' | 'code';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Welcome');
  const [viewMode, setViewMode] = useState<ViewMode>('react');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('preview');
  const [templateData, setTemplateData] = useState<TemplateData>({});
  const [renderedTemplate, setRenderedTemplate] = useState<RenderedTemplate | null>(null);
  const [jsonData, setJsonData] = useState<string>('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
  const [isLoading, setIsLoading] = useState(false);

  const templates = TemplateLoader.getAvailableTemplates();

  // Load initial template data
  useEffect(() => {
    const sampleData = TemplateLoader.getSampleData(selectedTemplate);
    setTemplateData(sampleData);
    setJsonData(JSON.stringify(sampleData, null, 2));
  }, [selectedTemplate]);

  // Render template when data changes
  useEffect(() => {
    const renderTemplate = async () => {
      if (!templateData || Object.keys(templateData).length === 0) return;
      
      setIsLoading(true);
      try {
        const rendered = await TemplateRenderer.renderTemplate(selectedTemplate, templateData);
        setRenderedTemplate(rendered);
      } catch (error) {
        console.error('Error rendering template:', error);
      } finally {
        setIsLoading(false);
      }
    };

    renderTemplate();
  }, [selectedTemplate, templateData]);

  const handleTemplateChange = (templateName: string) => {
    setSelectedTemplate(templateName);
  };

  const handleJsonDataChange = (value: string | undefined) => {
    if (!value) return;
    
    setJsonData(value);
    try {
      const parsed = JSON.parse(value);
      setTemplateData(parsed);
    } catch (error) {
      console.warn('Invalid JSON:', error);
    }
  };

  const getTemplateComponent = () => {
    const Component = TemplateRenderer.getTemplateComponent(selectedTemplate);
    if (!Component) return null;
    return <Component {...templateData} />;
  };

  const components = [
    'Button',
    'Header',
    'Footer',
    'Typography',
    'Layout',
    'Container',
    'Spacer'
  ];

  return (
    <div className="flex h-screen">
      {/* Left Sidebar using design system Sidebar */}
      <SidebarProvider>
        <Sidebar className="w-64">
        <SidebarHeader>
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Email Templates</h2>
            <Badge variant="gray">Templates</Badge>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          {/* Templates Section */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {templates.map((template) => (
                  <SidebarMenuItem key={template}>
                    <SidebarMenuButton
                      onClick={() => handleTemplateChange(template)}
                      isActive={selectedTemplate === template}
                    >
                      {template}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator />

          {/* Components Section */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {components.map((component) => (
                  <SidebarMenuItem key={component}>
                    <SidebarMenuButton>
                      {component}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <Card className="rounded-none border-b">
          <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CardTitle>{selectedTemplate}</CardTitle>
                <Badge variant="gray">Email Template</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) => value && setViewMode(value as ViewMode)}
                >
                  <ToggleGroupItem value="react">React</ToggleGroupItem>
                  <ToggleGroupItem value="html">HTML</ToggleGroupItem>
                </ToggleGroup>
                
                {/* Display Mode Toggle */}
              <ToggleGroup
                type="single"
                value={displayMode}
                  onValueChange={(value) => value && setDisplayMode(value as DisplayMode)}
              >
                <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
                <ToggleGroupItem value="code">Code</ToggleGroupItem>
              </ToggleGroup>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Email Preview/Code Area */}
          <div className="flex-1 p-6">
            {displayMode === 'preview' ? (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Email Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <p>Loading...</p>
                    </div>
                  ) : viewMode === 'react' ? (
                    <div className="border rounded-lg p-4 bg-white">
                      {getTemplateComponent()}
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-white">
                      {renderedTemplate ? (
                        <div 
                          className="email-preview"
                          dangerouslySetInnerHTML={{ __html: renderedTemplate.html }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-64">
                          <p>No HTML available</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Template Code</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  <div className="h-full border rounded-lg overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage="typescript"
                      value={TemplateRenderer.getTemplateSourceCode(selectedTemplate)}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'on',
                        wordWrap: 'on',
                      }}
                      theme="vs-dark"
                    />
                  </div>
          </CardContent>
        </Card>
            )}
          </div>

          {/* Right Sidebar - JSON Editor and Export */}
          <div className="w-80 border-l p-6 space-y-6">
              {/* JSON Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Template Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 border rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={jsonData}
                    onChange={handleJsonDataChange}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      lineNumbers: 'on',
                      wordWrap: 'on',
                      automaticLayout: true,
                    }}
                    theme="vs-dark"
                />
              </div>
              </CardContent>
            </Card>

              {/* SendGrid Export */}
                <SendGridExport
                  templateName={selectedTemplate}
              renderedTemplate={renderedTemplate}
                />
              </div>
            </div>
      </div>
        </SidebarProvider>
    </div>
  );
}

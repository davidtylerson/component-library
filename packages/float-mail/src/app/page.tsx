'use client';

import { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarProvider,
  ClientThemeToggle,
} from '@float-vibe-foundry/design-system';
import { IconSettings, IconComponents, IconEye } from '@tabler/icons-react';
import { Tabs, TabsList, TabsTrigger } from '@float-vibe-foundry/design-system';
import CodeMirrorEditor from '../components/CodeMirrorEditor';
import EmailPreview from '../components/EmailPreview';
import CodeMirrorViewer from '../components/CodeMirrorViewer';
import { TemplateLoader } from '../lib/template-loader';
import { EnhancedTemplateRenderer } from '../lib/enhanced-template-renderer';
import { TemplateData } from '../types/template-types';

// Custom icons for template and file-invoice
const IconTemplate = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" />
    <path d="M4 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
    <path d="M14 12l6 0" />
    <path d="M14 16l6 0" />
    <path d="M14 20l6 0" />
  </svg>
);

const IconFileInvoice = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    <path d="M9 7l1 0" />
    <path d="M9 13l6 0" />
    <path d="M13 17l2 0" />
  </svg>
);

export default function FloatMailPage() {
  const [previewData, setPreviewData] = useState<TemplateData>({});
  const [templateHtmlWithVariables, setTemplateHtmlWithVariables] =
    useState<string>('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('Welcome');
  const [availableTemplates, setAvailableTemplates] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<'react' | 'html'>('react');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    // Load available templates
    try {
      const templates = TemplateLoader.getAvailableTemplates();
      setAvailableTemplates(templates);

      // Load sample data for default template
      const sampleData = TemplateLoader.getSampleData('Welcome');
      setPreviewData(sampleData);
    } catch {
      setAvailableTemplates(['Error loading templates']);
    }
  }, []);

  // Handle template change
  const handleTemplateChange = (templateName: string) => {
    setSelectedTemplate(templateName);
    const sampleData = TemplateLoader.getSampleData(templateName);
    setPreviewData(sampleData);
    setJsonError(null); // Clear any JSON errors when switching templates
  };

  // Get current code to display
  const getCurrentCode = () => {
    if (editMode === 'react') {
      return EnhancedTemplateRenderer.getTemplateSourceCode(selectedTemplate);
    } else {
      return templateHtmlWithVariables;
    }
  };

  // Note: rendered HTML is computed in real-time by EmailPreview component
  // No need to store it in state since it's used directly in the preview

  // Update template HTML with variables when template changes
  useEffect(() => {
    const updateTemplateHtmlWithVariables = async () => {
      const htmlWithVariables =
        await EnhancedTemplateRenderer.renderTemplateWithVariables(
          selectedTemplate
        );
      if (htmlWithVariables) {
        setTemplateHtmlWithVariables(htmlWithVariables);
      }
    };

    if (selectedTemplate) {
      updateTemplateHtmlWithVariables();
    }
  }, [selectedTemplate]);

  // State for HTML preview with data applied
  const [templateHtmlWithData, setTemplateHtmlWithData] = useState<string>('');

  // Update template HTML with data when template or data changes
  useEffect(() => {
    const updateTemplateHtmlWithData = async () => {
      const result = await EnhancedTemplateRenderer.renderTemplate(
        selectedTemplate,
        previewData
      );
      if (result) {
        setTemplateHtmlWithData(result.html);
      }
    };

    if (selectedTemplate) {
      updateTemplateHtmlWithData();
    }
  }, [selectedTemplate, previewData]);

  return (
    <SidebarProvider>
      <div className="bg-bg-quinary flex h-screen w-full">
        {/* Navigation Sidebar */}
        <Sidebar
          className="bg-bg-app-base flex w-[232px] flex-col"
          data-testid="template-sidebar"
        >
          <SidebarContent className="flex-1">
            <SidebarMenu className="mt-6">
              <SidebarGroup>
                <SidebarGroupLabel className="text-text-tertiary">
                  Templates
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  {availableTemplates.map(templateName => {
                    const templateInfo =
                      TemplateLoader.getTemplateInfo(templateName);
                    return (
                      <SidebarMenuItem key={templateName}>
                        <SidebarMenuButton
                          isActive={selectedTemplate === templateName}
                          onClick={() => handleTemplateChange(templateName)}
                        >
                          <IconTemplate className="h-4 w-4" />
                          <span>
                            {templateInfo?.displayName || templateName}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel className="text-text-tertiary">
                  Tools
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconComponents className="h-4 w-4" />
                      <span>Components</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconSettings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarContent>
          {/* Theme Toggle at bottom right */}
          <div className="flex justify-end p-4">
            <ClientThemeToggle />
          </div>
        </Sidebar>

        {/* Main Container - Fills entire remaining space */}
        <div className="border-border-tertiary bg-bg-primary m-2 flex flex-1 overflow-hidden rounded-md border">
          {/* Central Section - Flexes to fill available space */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Central Section Header */}
            <div className="border-border-tertiary flex h-16 flex-shrink-0 items-center border-b px-6">
              <div className="flex items-center gap-4">
                <IconTemplate className="text-text-primary h-5 w-5" />
                <span className="text-text-primary text-lg font-medium">
                  {TemplateLoader.getTemplateInfo(selectedTemplate)
                    ?.displayName || selectedTemplate}
                </span>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <Tabs
                  value={editMode}
                  onValueChange={value =>
                    setEditMode(value as 'react' | 'html')
                  }
                  className="w-auto"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="react">React</TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Tabs
                  value={viewMode}
                  onValueChange={value =>
                    setViewMode(value as 'preview' | 'code')
                  }
                  className="w-auto"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">
                      <IconEye className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <IconFileInvoice className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Central Canvas */}
            <div className="min-w-0 flex-1 overflow-hidden bg-white">
              {viewMode === 'preview' ? (
                editMode === 'react' ? (
                  <EmailPreview
                    templateName={selectedTemplate}
                    data={previewData}
                    viewMode="desktop"
                  />
                ) : (
                  <div className="h-full overflow-hidden p-4">
                    <iframe
                      srcDoc={
                        templateHtmlWithData || templateHtmlWithVariables || ''
                      }
                      className="h-full w-full border-0"
                      title="HTML Preview"
                    />
                  </div>
                )
              ) : (
                <div className="h-full overflow-hidden p-4">
                  <CodeMirrorViewer
                    code={getCurrentCode()}
                    language={editMode === 'react' ? 'typescript' : 'html'}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Data Sidebar - Fixed width */}
          <div className="bg-bg-app-elevated border-border-tertiary flex w-[450px] flex-shrink-0 flex-col border-l">
            {/* Data Sidebar Header */}
            <div className="border-border-tertiary flex h-16 flex-shrink-0 items-center border-b px-6">
              <div className="flex items-center gap-2">
                <IconFileInvoice className="text-fg-primary h-5 w-5" />
                <span className="text-text-primary text-lg font-medium">
                  Data
                </span>
              </div>
            </div>

            {/* Data Sidebar Content */}
            <div className="flex flex-1 flex-col overflow-y-auto">
              {/* JSON Error Display */}
              {jsonError && (
                <div className="border-border-tertiary border-b p-4">
                  <div className="border-border-error bg-bg-error-subtle rounded-md border p-2">
                    <div className="text-text-error-primary text-xs">
                      <strong>JSON Error:</strong> {jsonError}
                    </div>
                  </div>
                </div>
              )}

              {/* JSON Editor */}
              <div className="min-h-0 flex-1">
                <div className="h-full">
                  <CodeMirrorEditor
                    value={JSON.stringify(previewData, null, 2)}
                    onChange={value => {
                      try {
                        const parsedData = JSON.parse(value);
                        setPreviewData(parsedData);
                        setJsonError(null); // Clear error on successful parse

                        // Validate the data
                        const validation = TemplateLoader.validateData(
                          parsedData,
                          selectedTemplate
                        );
                        if (!validation.valid) {
                          // Validation errors are handled internally by TemplateLoader
                          // No need to log them
                        }
                      } catch (error) {
                        // Handle invalid JSON - show error in UI
                        setJsonError(
                          error instanceof Error
                            ? error.message
                            : 'Invalid JSON format'
                        );
                      }
                    }}
                    language="json"
                    theme="vs-dark"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

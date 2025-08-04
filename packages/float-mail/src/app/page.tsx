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
  SidebarProvider
} from '@float-vibe-foundry/design-system';
import {
  IconFolder,
  IconSettings,
  IconCode,
  IconComponents,
  IconEye,
  IconFileText
} from '@tabler/icons-react';
import { Tabs, TabsList, TabsTrigger } from '@float-vibe-foundry/design-system';
import MonacoEditor from '../components/MonacoEditor';
import { EmailTemplate, EmailPreviewData } from '../types/template';

export default function FloatMailPage() {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [previewData, setPreviewData] = useState<EmailPreviewData>({});
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('Template 2');
  const [editMode, setEditMode] = useState<'react' | 'html'>('react');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    // Load saved template from localStorage
    const savedTemplate = localStorage.getItem('floatMailTemplate');
    if (savedTemplate) {
      try {
        setTemplate(JSON.parse(savedTemplate));
      } catch {
        // Failed to load saved template
      }
    }
  }, []);



  return (
    <SidebarProvider>
      <div className="w-full h-screen bg-bg-quinary flex">
        {/* Navigation Sidebar */}
        <Sidebar className="w-[232px] bg-bg-app-base">
          <SidebarContent>
            <SidebarMenu className="mt-6">
              <SidebarGroup>
                <SidebarGroupLabel className="text-text-tertiary">Templates</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={selectedTemplate === 'Template 1'}
                      onClick={() => setSelectedTemplate('Template 1')}
                    >
                      <IconFolder className="h-4 w-4" />
                      <span>Template 1</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={selectedTemplate === 'Template 2'}
                      onClick={() => setSelectedTemplate('Template 2')}
                    >
                      <IconFolder className="h-4 w-4" />
                      <span>Template 2</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={selectedTemplate === 'Template 3'}
                      onClick={() => setSelectedTemplate('Template 3')}
                    >
                      <IconFolder className="h-4 w-4" />
                      <span>Template 3</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel className="text-text-tertiary">Tools</SidebarGroupLabel>
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
        </Sidebar>

        {/* Main Container - Fills entire remaining space */}
        <div className="flex-1 m-2 bg-bg-primary border border-border-tertiary rounded-md overflow-hidden flex">
          {/* Central Section - Flexes to fill available space */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Central Section Header */}
            <div className="h-16 flex items-center border-b border-border-tertiary px-6 flex-shrink-0">
              <div className="flex items-center gap-4">
                <IconFolder className="h-5 w-5 text-text-primary" />
                <span className="text-lg font-medium text-text-primary">{selectedTemplate}</span>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <Tabs value={editMode} onValueChange={(value) => setEditMode(value as 'react' | 'html')} className="w-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="react">React</TabsTrigger>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'preview' | 'code')} className="w-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">
                      <IconEye className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <IconFileText className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {/* Central Canvas */}
            <div className="flex-1 bg-white min-w-0">
              <div className="h-full flex items-center justify-center text-text-secondary">
                Email Template Canvas
              </div>
            </div>
          </div>

          {/* Data Sidebar - Fixed width */}
          <div className="w-[400px] border-l border-border-tertiary bg-bg-app-elevated flex-shrink-0 flex flex-col">
            {/* Data Sidebar Header */}
            <div className="h-16 flex items-center border-b border-border-tertiary px-6 flex-shrink-0">
              <div className="flex items-center gap-2">
                <IconCode className="h-5 w-5 text-text-primary" />
                <span className="text-lg font-medium text-text-primary">Data</span>
              </div>
            </div>
            
            {/* Data Sidebar Content */}
            <div className="flex-1 p-4">
              <MonacoEditor
                value={JSON.stringify(previewData, null, 2)}
                onChange={(value) => {
                  try {
                    setPreviewData(JSON.parse(value));
                  } catch (error) {
                    // Handle invalid JSON
                  }
                }}
                language="json"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
} 
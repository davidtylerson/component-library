'use client';

import React from 'react';
import { TemplateRenderer } from '@/lib/template-renderer';
import { TemplateData } from '@/types/template-types';
import {
  Button,
  Heading,
  Text,
  Card,
  CardContent,
} from '@float-vibe-foundry/design-system';

interface EmailPreviewProps {
  templateName: string;
  data: TemplateData;
  viewMode: 'react' | 'html';
  displayMode: 'preview' | 'code';
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({
  templateName,
  data,
  viewMode,
  displayMode,
}) => {
  const [rendered, setRendered] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const renderTemplate = async () => {
      setLoading(true);
      try {
        const result = await TemplateRenderer.renderTemplate(
          templateName,
          data
        );
        setRendered(result);
      } catch (error) {
        console.error('Error rendering template:', error);
        setRendered(null);
      } finally {
        setLoading(false);
      }
    };

    renderTemplate();
  }, [templateName, data]);

  if (loading) {
    return (
      <Card className="flex h-full items-center justify-center">
        <CardContent className="text-center">
          <Heading level={3} size="lg" weight="medium" className="mb-2">
            Loading template...
          </Heading>
        </CardContent>
      </Card>
    );
  }

  if (!rendered) {
    return (
      <Card className="flex h-full items-center justify-center">
        <CardContent className="text-center">
          <Heading level={3} size="lg" weight="medium" className="mb-2">
            Template Not Available
          </Heading>
          <Text size="sm" color="muted">
            Unable to render template
          </Text>
        </CardContent>
      </Card>
    );
  }

  // Get the React component for React view mode
  const TemplateComponent = TemplateRenderer.getTemplateComponent(templateName);

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="p-0">
        {/* Preview Header */}
        <div className="border-b border-border-primary bg-bg-secondary p-4">
          <div className="flex items-center justify-between">
            <Heading level={3} size="sm" weight="medium">
              Email Preview - {viewMode.toUpperCase()} ({displayMode})
            </Heading>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(rendered.html);
                }}
                size="sm"
                dsVariant="ghost"
                className="text-xs"
              >
                Copy HTML
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto">
          {displayMode === 'code' ? (
            // Code view - show HTML source
            <div className="p-4">
              <pre className="overflow-auto rounded bg-bg-tertiary p-4 text-xs text-text-secondary">
                {rendered.html}
              </pre>
            </div>
          ) : viewMode === 'react' && TemplateComponent ? (
            // React view - render the actual component
            <div className="h-full p-6">
              <TemplateComponent {...data} />
            </div>
          ) : (
            // HTML view - render compiled HTML
            <div
              className="h-full p-6"
              dangerouslySetInnerHTML={{ __html: rendered.html }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

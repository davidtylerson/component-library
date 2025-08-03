'use client';

import React from 'react';
import {
  Button,
  Heading,
  Text,
  Card,
  CardContent,
} from '@float-vibe-foundry/design-system';
import { TemplateRenderer } from '@/lib/template-renderer';
import { TemplateData } from '@/types/template-types';

interface SendGridExportProps {
  templateName: string;
  data: TemplateData;
}

export const SendGridExport: React.FC<SendGridExportProps> = ({
  templateName,
  data,
}) => {
  const [exporting, setExporting] = React.useState(false);
  const [exportedData, setExportedData] = React.useState<any>(null);

  const handleExport = async () => {
    setExporting(true);
    try {
      const result = await TemplateRenderer.renderTemplate(templateName, data);
      if (result) {
        const sendGridTemplate = {
          name: templateName,
          html_content: result.html,
          plain_content: result.text,
          subject: result.subject,
          // Add any additional SendGrid-specific metadata here
          editor: 'code',
          categories: ['transactional', 'float'],
          variables: Object.keys(data),
        };

        setExportedData(sendGridTemplate);

        // Copy to clipboard
        navigator.clipboard.writeText(
          JSON.stringify(sendGridTemplate, null, 2)
        );
      }
    } catch (error) {
      console.error('Error exporting template:', error);
    } finally {
      setExporting(false);
    }
  };

  const downloadJson = () => {
    if (!exportedData) return;

    const blob = new Blob([JSON.stringify(exportedData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName}-sendgrid-template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="space-y-4">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <Heading level={3} size="sm" weight="medium">
            SendGrid Export
          </Heading>
          <Button
            onClick={handleExport}
            disabled={exporting}
            size="sm"
            dsVariant="primary"
          >
            {exporting ? 'Exporting...' : 'Export for SendGrid'}
          </Button>
        </div>

        {exportedData && (
          <div className="space-y-3">
            <Text size="xs" color="muted">
              Template exported successfully! JSON copied to clipboard.
            </Text>

            <div className="space-y-2">
              <Button onClick={downloadJson} size="sm" dsVariant="outline">
                Download JSON
              </Button>

              <div className="text-text-muted text-xs">
                <div>
                  <strong>Template Name:</strong> {exportedData.name}
                </div>
                <div>
                  <strong>Subject:</strong> {exportedData.subject}
                </div>
                <div>
                  <strong>Variables:</strong>{' '}
                  {exportedData.variables.join(', ')}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

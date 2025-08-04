'use client';

import React, { useState } from 'react';
import { Button } from '@float-vibe-foundry/design-system';
import { Card, CardContent, CardHeader, CardTitle } from '@float-vibe-foundry/design-system';
import { RenderedTemplate } from '@/types/template-types';

interface SendGridExportProps {
  templateName: string;
  renderedTemplate: RenderedTemplate | null;
}

export const SendGridExport: React.FC<SendGridExportProps> = ({
  templateName,
  renderedTemplate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyHTML = async () => {
    if (!renderedTemplate?.html) return;

    try {
      await navigator.clipboard.writeText(renderedTemplate.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy HTML:', error);
    }
  };

  const handleExportSendGrid = () => {
    if (!renderedTemplate?.html) return;

    // Create a SendGrid template object
    const sendGridTemplate = {
      name: `${templateName} Template`,
      html_content: renderedTemplate.html,
      plain_content: renderedTemplate.text,
      subject: renderedTemplate.subject || 'Email from Float',
    };

    // Create and download JSON file
    const blob = new Blob([JSON.stringify(sendGridTemplate, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-sendgrid-template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-bg-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-text-primary">Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyHTML}
            disabled={!renderedTemplate?.html}
            className="w-full"
          >
            {copied ? 'Copied!' : 'Copy HTML'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportSendGrid}
            disabled={!renderedTemplate?.html}
            className="w-full"
          >
            Export for SendGrid
          </Button>
        </div>

        {renderedTemplate && (
          <div className="text-xs text-text-secondary space-y-1">
            <div>Subject: {renderedTemplate.subject}</div>
            <div>HTML Length: {renderedTemplate.html?.length || 0} chars</div>
            <div>Text Length: {renderedTemplate.text?.length || 0} chars</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

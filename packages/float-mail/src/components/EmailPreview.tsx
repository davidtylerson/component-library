'use client';

import React, { useState, useEffect } from 'react';
import { EnhancedTemplateRenderer } from '../lib/enhanced-template-renderer';
import { TemplateData } from '../types/template-types';

interface EmailPreviewProps {
  templateName: string;
  data: TemplateData;
  viewMode?: 'desktop' | 'mobile';
}

export default function EmailPreview({
  templateName,
  data,
  viewMode = 'desktop',
}: EmailPreviewProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderTemplate = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await EnhancedTemplateRenderer.renderTemplate(
          templateName,
          data
        );
        if (result) {
          setHtml(result.html);
        } else {
          setError('Failed to render template');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    renderTemplate();
  }, [templateName, data]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-text-secondary">Loading email preview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-text-error-primary">Error: {error}</div>
      </div>
    );
  }

  return (
    /* Desktop matches the HTML tab: full bleed, no wrapper cap. The old
       max-w-2xl here (not the template) is why the React tab rendered narrower
       than the HTML tab for the same email. */
    <div
      className={`h-full overflow-auto bg-bg-primary ${
        viewMode === 'mobile' ? 'p-4' : ''
      }`}
    >
      <div
        className={`mx-auto h-full overflow-hidden bg-white ${
          viewMode === 'mobile'
            ? 'max-w-sm rounded-lg shadow-lg'
            : 'w-full max-w-none'
        }`}
      >
        <iframe
          srcDoc={html}
          title="Email Preview"
          className="h-full w-full border-0"
          style={{ minHeight: '600px' }}
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}

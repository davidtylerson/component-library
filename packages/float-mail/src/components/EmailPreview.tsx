'use client';

import React, { useState, useEffect } from 'react';
import { EnhancedTemplateRenderer } from '../lib/enhanced-template-renderer';
import { TemplateData } from '../types/template-types';

interface EmailPreviewProps {
  templateName: string;
  data: TemplateData;
  viewMode?: 'desktop' | 'mobile';
}

export default function EmailPreview({ templateName, data, viewMode = 'desktop' }: EmailPreviewProps) {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderTemplate = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await EnhancedTemplateRenderer.renderTemplate(templateName, data);
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
      <div className="h-full flex items-center justify-center">
        <div className="text-text-secondary">Loading email preview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-bg-primary p-4">
      <div 
        className={`mx-auto bg-white shadow-lg h-full rounded-lg overflow-hidden ${
          viewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
        }`}
      >
        <iframe
          srcDoc={html}
          title="Email Preview"
          className="w-full h-full border-0"
          style={{ minHeight: '600px' }}
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
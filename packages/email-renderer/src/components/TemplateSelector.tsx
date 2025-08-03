'use client';

import React from 'react';
import { TemplateLoader } from '@/lib/template-loader';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  const templates = TemplateLoader.getAvailableTemplates();

  return (
    <div className="space-y-2 p-4">
      {templates.map(templateName => {
        const info = TemplateLoader.getTemplateInfo(templateName);
        if (!info) return null;

        const isSelected = selectedTemplate === templateName;

        return (
          <button
            key={templateName}
            className={`w-full rounded-lg p-3 text-left transition-colors ${
              isSelected
                ? 'border border-border-brand bg-bg-brand-primary text-text-brand-primary'
                : 'border border-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
            }`}
            onClick={() => onTemplateSelect(templateName)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs">📄</span>
              <div className="flex-1">
                <div className="text-sm font-medium">{info.displayName}</div>
                <div className="mt-1 text-xs opacity-75">
                  {info.description}
                </div>
                <div className="mt-1 text-xs opacity-60">
                  {info.variables.length} variable
                  {info.variables.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

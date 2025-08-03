import React from 'react';
import { render } from '@react-email/render';
import { TemplateData, RenderedTemplate } from '@/types/template-types';

// Import actual email templates
import { Welcome } from '@/templates/Welcome';
import { PasswordReset } from '@/templates/PasswordReset';
import { DisputeConfirm } from '@/templates/DisputeConfirm';
import { ReturnConfirmSimple } from '@/templates/ReturnConfirmSimple';
import { Affirmation } from '@/templates/Affirmation';
import { DisputeMultiple } from '@/templates/DisputeMultiple';
import { ReturnConfirmTable } from '@/templates/ReturnConfirmTable';

// Map template names to their components
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  Welcome,
  PasswordReset,
  DisputeConfirm,
  ReturnConfirmSimple,
  Affirmation,
  DisputeMultiple,
  ReturnConfirmTable,
};

export class TemplateRenderer {
  static getTemplateComponent(
    templateName: string
  ): React.ComponentType<any> | null {
    return TEMPLATE_COMPONENTS[templateName] || null;
  }

  static async renderTemplate(
    templateName: string,
    data: TemplateData
  ): Promise<RenderedTemplate | null> {
    const Component = this.getTemplateComponent(templateName);
    if (!Component) return null;

    try {
      const element = React.createElement(Component, data);
      const html = await render(element);
      const text = await render(element, { plainText: true });

      return {
        html,
        text,
        subject: this.extractSubject(templateName, data),
      };
    } catch (error) {
      console.error('Error rendering template:', error);
      return null;
    }
  }

  static getTemplateSourceCode(templateName: string): string {
    // This would read the actual source file
    // For now, return a placeholder
    return `// Template: ${templateName}\n// Source code would be loaded here`;
  }

  private static extractSubject(
    templateName: string,
    data: TemplateData
  ): string {
    const subjects: Record<string, string> = {
      Welcome: 'Welcome to Float',
      PasswordReset: 'Reset your Float password',
      DisputeConfirm: 'Dispute confirmed for transaction',
      DisputeMultiple: 'Multiple disputes confirmed',
      ReturnConfirmSimple: 'Return confirmed',
      ReturnConfirmTable: 'Return confirmed with details',
      Affirmation: 'Action confirmed',
    };

    return subjects[templateName] || 'Email from Float';
  }
}

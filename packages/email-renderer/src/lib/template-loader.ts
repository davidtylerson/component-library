import { TemplateInfo, TemplateData } from '@/types/template-types';
import { TEMPLATE_INFO, SAMPLE_DATA } from '@/utils/sample-data';

export class TemplateLoader {
  static getAvailableTemplates(): string[] {
    return Object.keys(TEMPLATE_INFO);
  }

  static getTemplateInfo(templateName: string): TemplateInfo | null {
    const info = TEMPLATE_INFO[templateName];
    if (!info) return null;

    return {
      name: templateName,
      displayName: info.displayName,
      description: info.description,
      variables: info.variables,
      sampleData: SAMPLE_DATA[templateName] || {},
    };
  }

  static getSampleData(templateName: string): TemplateData {
    return SAMPLE_DATA[templateName] || {};
  }

  static validateData(
    data: TemplateData,
    templateName: string
  ): { valid: boolean; errors: string[] } {
    const info = this.getTemplateInfo(templateName);
    if (!info) {
      return { valid: false, errors: ['Template not found'] };
    }

    const errors: string[] = [];

    info.variables.forEach(variable => {
      if (variable.required && !data[variable.name]) {
        errors.push(`Missing required variable: ${variable.name}`);
      }
    });

    return { valid: errors.length === 0, errors };
  }
}

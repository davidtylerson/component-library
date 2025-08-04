export interface TemplateData {
  [key: string]: any;
}

export interface TemplateInfo {
  name: string;
  displayName: string;
  description: string;
  variables: TemplateVariable[];
  sampleData: TemplateData;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
  defaultValue?: any;
}

export interface RenderedTemplate {
  html: string;
  text: string;
  subject?: string;
}

export interface ViewMode {
  type: 'preview' | 'code' | 'compiled';
  label: string;
  icon: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  components: EmailComponent[];
  variables: TemplateVariable[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: EmailComponent[];
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  defaultValue?: any;
  description?: string;
  required?: boolean;
}

export interface EmailPreviewData {
  [key: string]: any;
}

// Sample template data
export const sampleTemplate: EmailTemplate = {
  id: 'welcome-email',
  name: 'Welcome Email',
  description: 'A welcoming email for new users',
  category: 'onboarding',
  components: [
    {
      id: 'header',
      type: 'Header',
      props: {
        title: 'Welcome to Float Mail!',
        subtitle: 'Start building beautiful emails'
      }
    },
    {
      id: 'content',
      type: 'Body',
      props: {
        text: 'Hi {{userName}}, welcome to our platform! We\'re excited to have you on board.'
      }
    },
    {
      id: 'button',
      type: 'Button',
      props: {
        text: 'Get Started',
        href: '{{dashboardUrl}}',
        variant: 'primary'
      }
    },
    {
      id: 'footer',
      type: 'Footer',
      props: {
        text: '© 2024 Float Mail. All rights reserved.',
        links: [
          { text: 'Privacy Policy', href: '{{privacyUrl}}' },
          { text: 'Terms of Service', href: '{{termsUrl}}' }
        ]
      }
    }
  ],
  variables: [
    {
      name: 'userName',
      type: 'string',
      defaultValue: 'John Doe',
      description: 'The name of the user',
      required: true
    },
    {
      name: 'dashboardUrl',
      type: 'string',
      defaultValue: 'https://app.floatmail.com/dashboard',
      description: 'URL to the user dashboard',
      required: true
    },
    {
      name: 'privacyUrl',
      type: 'string',
      defaultValue: 'https://floatmail.com/privacy',
      description: 'Privacy policy URL'
    },
    {
      name: 'termsUrl',
      type: 'string',
      defaultValue: 'https://floatmail.com/terms',
      description: 'Terms of service URL'
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
};

export const samplePreviewData: EmailPreviewData = {
  userName: 'John Doe',
  dashboardUrl: 'https://app.floatmail.com/dashboard',
  privacyUrl: 'https://floatmail.com/privacy',
  termsUrl: 'https://floatmail.com/terms'
}; 
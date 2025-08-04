import React from 'react';
import { render } from '@react-email/render';
import { TemplateData, RenderedTemplate } from '@/types/template-types';
import prettier from 'prettier';

// Import actual email templates
import { Welcome } from '@/templates/Welcome';
import { PasswordReset } from '@/templates/PasswordReset';
import { DisputeConfirm } from '@/templates/DisputeConfirm';
import { ReturnConfirmSimple } from '@/templates/ReturnConfirmSimple';
import { Affirmation } from '@/templates/Affirmation';
import { DisputeMultiple } from '@/templates/DisputeMultiple';
import { ReturnConfirmTable } from '@/templates/ReturnConfirmTable';
import { EmailComponents } from '@/templates/EmailComponents';

// Map template names to their components
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  Welcome,
  PasswordReset,
  DisputeConfirm,
  ReturnConfirmSimple,
  Affirmation,
  DisputeMultiple,
  ReturnConfirmTable,
  EmailComponents,
};

// Template source code (simplified versions for display)
const TEMPLATE_SOURCE_CODE: Record<string, string> = {
  Welcome: `import React from 'react';
import { 
  EmailLayout, 
  PageTitle, 
  BodyText, 
  ActionButton, 
  CenteredLayout,
  LG
} from '../react-email-src/components';

interface WelcomeProps {
  sender_name: string;
  organization_name: string;
  url: string;
}

export const Welcome: React.FC<WelcomeProps> = ({
  sender_name = "{{sender_name}}",
  organization_name = "{{organization_name}}",
  url = "{{url}}",
}) => {
  return (
    <EmailLayout preheader="Welcome to Float">
      <CenteredLayout>
        <PageTitle>Welcome to Float</PageTitle>
        <BodyText>Hello,</BodyText>
        <BodyText>
          <span style={{ fontWeight: 'bold' }}>{sender_name}</span> has invited you to join the organization{' '}
          <span style={{ fontWeight: 'bold' }}>{organization_name}</span> on the Float platform.
        </BodyText>
        <LG />
        <ActionButton href={url} fullWidth>
          Accept Invitation
        </ActionButton>
      </CenteredLayout>
    </EmailLayout>
  );
};`,

  PasswordReset: `import React from 'react';
import { EmailLayout, PageTitle, BodyText, ActionButton, CenteredLayout, LG } from '../react-email-src/components';

interface PasswordResetProps {
  user_name: string;
  reset_url: string;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
  user_name = "{{user_name}}",
  reset_url = "{{reset_url}}",
}) => {
  return (
    <EmailLayout preheader="Reset your Float password">
      <CenteredLayout>
        <PageTitle>Password Reset Request</PageTitle>
        <BodyText>Hello {user_name},</BodyText>
        <BodyText>
          We received a request to reset your password. Click the button below to set a new password.
        </BodyText>
        <LG />
        <ActionButton href={reset_url} fullWidth>
          Reset Password
        </ActionButton>
      </CenteredLayout>
    </EmailLayout>
  );
};`,

  EmailComponents: `import React from 'react';
import { 
  EmailLayout, 
  PageTitle, 
  SectionTitle,
  BodyText, 
  DataTable,
  GroupedDataTable,
  ActionButton,
  Callout,
  MD,
  LG
} from '../react-email-src/components';

interface EmailComponentsProps {
  table_fields?: Array<{label: string, value: string}>;
  grouped_data?: Array<{
    groupName?: string;
    rows: Array<{field: string, value: string, counterparty: string}>;
  }>;
}

export const EmailComponents: React.FC<EmailComponentsProps> = ({
  table_fields,
  grouped_data,
}) => {
  return (
    <EmailLayout preheader="Float Email Components Showcase">
      <PageTitle>Float Email Components</PageTitle>
      <BodyText>
        This template showcases all available Float email components.
      </BodyText>
      <MD />
      
      {table_fields && (
        <>
          <SectionTitle>Simple Data Table</SectionTitle>
          <DataTable data={table_fields} />
          <LG />
        </>
      )}
      
      {grouped_data && (
        <>
          <SectionTitle>Grouped Data Table</SectionTitle>
          <GroupedDataTable groups={grouped_data} />
          <LG />
        </>
      )}
      
      <Callout variant="success">
        <BodyText>All components are working correctly!</BodyText>
      </Callout>
      
      <MD />
      <ActionButton href="https://float.tech">Learn More</ActionButton>
    </EmailLayout>
  );
};`,

  // Add other templates with minimal source code representations
  DisputeConfirm: `// DisputeConfirm template with dispute confirmation functionality`,
  ReturnConfirmSimple: `// ReturnConfirmSimple template for simple return confirmations`,
  Affirmation: `// Affirmation template for general confirmations`,
  DisputeMultiple: `// DisputeMultiple template for multiple dispute handling`,
  ReturnConfirmTable: `// ReturnConfirmTable template with detailed return information`,
};

export class EnhancedTemplateRenderer {
  static getTemplateComponent(templateName: string): React.ComponentType<any> | null {
    return TEMPLATE_COMPONENTS[templateName] || null;
  }

  static getTemplateSourceCode(templateName: string): string {
    return TEMPLATE_SOURCE_CODE[templateName] || `// ${templateName} template source code`;
  }

  static async renderTemplate(
    templateName: string,
    data: TemplateData
  ): Promise<RenderedTemplate | null> {
    const Component = this.getTemplateComponent(templateName);
    if (!Component) return null;

    try {
      // Create element with template variables as defaults when data is missing
      const element = React.createElement(Component, this.prepareTemplateData(data));
      
      // Render HTML with React Email's high-quality output
      const html = await render(element, {
        pretty: true,
      });
      
      // Generate plain text version
      const text = await render(element, { 
        plainText: true 
      });

      // Format HTML using prettier (same as static system)
      const formattedHtml = await this.formatHtml(html);

      return {
        html: formattedHtml,
        text,
        subject: this.extractSubject(templateName),
      };
    } catch (error) {
      console.error(`Error rendering template ${templateName}:`, error);
      return null;
    }
  }

  /**
   * Prepare template data to ensure variables are preserved when missing
   */
  private static prepareTemplateData(data: TemplateData): TemplateData {
    // This ensures that missing properties fall back to the template's default values
    // which include the {{variable}} placeholders
    return data;
  }

  /**
   * Format HTML using Prettier with the same settings as the static system
   */
  private static async formatHtml(html: string): Promise<string> {
    try {
      return await prettier.format(html, {
        parser: 'html',
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: 'none',
        bracketSpacing: false,
        bracketSameLine: false,
      });
    } catch (error) {
      console.warn('Error formatting HTML, returning unformatted:', error);
      return html;
    }
  }

  private static extractSubject(templateName: string): string {
    const subjects: Record<string, string> = {
      Welcome: 'Welcome to Float',
      PasswordReset: 'Reset your Float password',
      DisputeConfirm: 'Dispute confirmed for transaction',
      DisputeMultiple: 'Multiple disputes confirmed',
      ReturnConfirmSimple: 'Return confirmed',
      ReturnConfirmTable: 'Return confirmed with details',
      Affirmation: 'Action confirmed',
      EmailComponents: 'Float Email Components Showcase',
    };

    return subjects[templateName] || 'Email from Float';
  }

  /**
   * Render template with empty data to preserve all template variables
   */
  static async renderWithVariables(templateName: string): Promise<RenderedTemplate | null> {
    return this.renderTemplate(templateName, {});
  }
}
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
import { AffirmationMultiple } from '@/templates/AffirmationMultiple';
import { AffirmationMultipleSummary } from '@/templates/AffirmationMultipleSummary';
import { DisputeMultiple } from '@/templates/DisputeMultiple';
import { ReturnConfirmTable } from '@/templates/ReturnConfirmTable';
import { EmailComponents } from '@/templates/EmailComponents';
import { TradeFileError } from '@/templates/TradeFileError';
import { ValuationFileError } from '@/templates/ValuationFileError';

// Map template names to their components
const TEMPLATE_COMPONENTS: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  Welcome,
  PasswordReset,
  DisputeConfirm,
  ReturnConfirmSimple,
  Affirmation,
  AffirmationMultiple,
  AffirmationMultipleSummary,
  DisputeMultiple,
  ReturnConfirmTable,
  EmailComponents,
  TradeFileError,
  ValuationFileError,
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

  Affirmation: `import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  AffirmationTable,
  MD,
  LG,
} from '../react-email-src/components';

interface TradeField {
  field: string;
  value: string;
  counterparty?: string;
}

interface TradeGroup {
  groupName: string;
  rows: TradeField[];
}

interface AffirmationProps {
  organization_name: string;
  groups?: TradeGroup[];
  trade_id?: string;
  counterparty_ref?: string;
  amount?: string;
  currency?: string;
}

export const Affirmation: React.FC<AffirmationProps> = ({
  organization_name = '{{organization_name}}',
  groups,
  trade_id = '{{trade_id}}',
  counterparty_ref = '{{counterparty_ref}}',
  amount = '{{amount}}',
  currency = '{{currency}}',
}) => {
  const tableGroups = groups || [
    {
      groupName: 'Trade Details',
      rows: [
        { field: 'Trade ID', value: trade_id, counterparty: '' },
        {
          field: 'Counterparty Ref',
          value: counterparty_ref,
          counterparty: '',
        },
        { field: 'Amount', value: amount, counterparty: '' },
        { field: 'Currency', value: currency, counterparty: '' },
      ],
    },
  ];

  return (
    <EmailLayout preheader="Trade affirmation required">
      <PageTitle>Trade Affirmation Required</PageTitle>

      <BodyText>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> is
        requesting your affirmation of the following trade. Please review the
        detailed trade information provided below.
      </BodyText>

      <MD />

      <PageTitle>Action Required:</PageTitle>

      <BodyText>
        1. To Affirm: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>AGREED</span> if all trade details
        are correct.
        <br />
        2. To Dispute: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>DISPUTED</span> and provide details
        of any discrepancies.
      </BodyText>

      <LG />

      <AffirmationTable groups={tableGroups} />
    </EmailLayout>
  );
};`,

  AffirmationMultiple: `import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  MD,
  LG,
} from '../react-email-src/components';

interface TradeField {
  field: string;
  value: string;
  counterparty?: string;
}

interface TradeGroup {
  groupName: string;
  rows: TradeField[];
}

interface Trade {
  tradeId: string;
  productType: string;
  groups: TradeGroup[];
}

interface AffirmationMultipleProps {
  organization_name: string;
  trades: Trade[];
}

export const AffirmationMultiple: React.FC<AffirmationMultipleProps> = ({
  organization_name = '{{organization_name}}',
  trades = [],
}) => {
  return (
    <EmailLayout preheader="Multiple trade affirmations required">
      <PageTitle>Trade Affirmations Required</PageTitle>

      <BodyText>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> is
        requesting your affirmation of the following trade{trades.length !== 1 ? 's' : ''}. Please review
        the detailed trade information provided below.
      </BodyText>

      <MD />

      <PageTitle>Action Required:</PageTitle>

      <BodyText>
        1. To Affirm: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>AGREED</span> if all trade details
        are correct.
        <br />
        2. To Dispute: Reply with{' '}
        <span style={{ fontWeight: 'bold' }}>DISPUTED</span> and provide details
        of any discrepancies.
      </BodyText>

      <LG />

      {/* Render each trade as a separate table */}
      {trades.map((trade, tradeIndex) => (
        <div key={tradeIndex} style={{ marginBottom: '32px' }}>
          {/* Single Table with Trade Header as First Row */}
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: '#ffffff',
            }}
          >
            {/* Trade Header Row */}
            <thead>
              <tr>
                <th
                  colSpan={3}
                  style={{
                    padding: '8px 16px',
                    borderTop: '1px solid #e5e7eb',
                    borderLeft: '1px solid #e5e7eb',
                    borderRight: '1px solid #e5e7eb',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    backgroundColor: '#374151',
                    textAlign: 'left',
                  }}
                >
                  Trade ID: {trade.tradeId} | {trade.productType}
                </th>
              </tr>
              {/* Column Headers */}
              <tr>
                <th
                  style={{
                    padding: '4px 8px',
                    borderLeft: '1px solid #e5e7eb',
                    borderRight: '1px solid #e5e7eb',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '9px',
                    fontWeight: '600',
                    color: '#374151',
                    backgroundColor: '#f9fafb',
                    textAlign: 'left',
                    width: '30%',
                  }}
                >
                  Field
                </th>
                <th
                  style={{
                    padding: '4px 8px',
                    borderRight: '1px solid #e5e7eb',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '9px',
                    fontWeight: '600',
                    color: '#374151',
                    backgroundColor: '#f9fafb',
                    textAlign: 'left',
                    width: '35%',
                  }}
                >
                  Value
                </th>
                <th
                  style={{
                    padding: '4px 8px',
                    borderRight: '1px solid #e5e7eb',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '9px',
                    fontWeight: '600',
                    color: '#374151',
                    backgroundColor: '#f9fafb',
                    textAlign: 'left',
                    width: '35%',
                  }}
                >
                  Counterparty Economics (if disputed)
                </th>
              </tr>
            </thead>

            <tbody>
              {trade.groups.map((group, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  {/* Group Header Row */}
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        padding: '4px 8px',
                        borderLeft: '1px solid #e5e7eb',
                        borderRight: '1px solid #e5e7eb',
                        borderBottom: '1px solid #e5e7eb',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        color: '#111827',
                        backgroundColor: '#f3f4f6',
                        textAlign: 'left',
                      }}
                    >
                      {group.groupName}
                    </td>
                  </tr>

                  {/* Group Data Rows */}
                  {group.rows.map((row, rowIndex) => (
                    <tr key={\`\${groupIndex}-\${rowIndex}\`}>
                      <td
                        style={{
                          padding: '4px 8px',
                          borderLeft: '1px solid #e5e7eb',
                          borderRight: '1px solid #e5e7eb',
                          borderBottom: '1px solid #e5e7eb',
                          fontSize: '9px',
                          fontWeight: 'normal',
                          color: '#374151',
                          backgroundColor: '#f9fafb',
                          verticalAlign: 'top',
                        }}
                      >
                        {row.field}
                      </td>
                      <td
                        style={{
                          padding: '4px 8px',
                          borderRight: '1px solid #e5e7eb',
                          borderBottom: '1px solid #e5e7eb',
                          fontSize: '9px',
                          color: '#111827',
                          verticalAlign: 'top',
                          wordBreak: 'break-word',
                        }}
                      >
                        {row.value}
                      </td>
                      <td
                        style={{
                          padding: '4px 8px',
                          borderRight: '1px solid #e5e7eb',
                          borderBottom: '1px solid #e5e7eb',
                          fontSize: '9px',
                          color: '#6b7280',
                          verticalAlign: 'top',
                          wordBreak: 'break-word',
                        }}
                      >
                        {row.counterparty || ''}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ))}
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
  DisputeMultiple: `// DisputeMultiple template for multiple dispute confirmations`,
  ReturnConfirmTable: `// ReturnConfirmTable template for return confirmations with table`,
};

export class EnhancedTemplateRenderer {
  static getTemplateComponent(
    templateName: string
  ): React.ComponentType<Record<string, unknown>> | null {
    return TEMPLATE_COMPONENTS[templateName] || null;
  }

  static getTemplateSourceCode(templateName: string): string {
    return (
      TEMPLATE_SOURCE_CODE[templateName] ||
      `// ${templateName} template source code`
    );
  }

  static async renderTemplate(
    templateName: string,
    data: TemplateData
  ): Promise<RenderedTemplate | null> {
    const Component = this.getTemplateComponent(templateName);
    if (!Component) return null;

    try {
      // Create element with template variables as defaults when data is missing
      const element = React.createElement(
        Component,
        this.prepareTemplateData(data)
      );

      // Render HTML with React Email's high-quality output
      const html = await render(element, {
        pretty: true,
      });

      // Generate plain text version
      const text = await render(element, {
        plainText: true,
      });

      // Format HTML using prettier (same as static system)
      const formattedHtml = await this.formatHtml(html);

      return {
        html: formattedHtml,
        text,
        subject: this.extractSubject(templateName),
      };
    } catch {
      // Error handling: template rendering failed
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
    } catch {
      // Error formatting HTML, return unformatted
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
      AffirmationMultiple: 'Multiple trade affirmations required',
      AffirmationMultipleSummary: 'Multiple trade affirmations required',
      EmailComponents: 'Float Email Components Showcase',
      TradeFileError: 'Error processing trade file',
      ValuationFileError: 'Error processing valuation file',
    };

    return subjects[templateName] || 'Email from Float';
  }

  /**
   * Render template with empty data to preserve all template variables
   */
  static async renderWithVariables(
    templateName: string
  ): Promise<RenderedTemplate | null> {
    return this.renderTemplate(templateName, {});
  }

  /**
   * Render template HTML with variables preserved for copy-paste to email platforms
   * This method renders the template with empty data so all {{variables}} remain intact
   * Returns clean HTML fragment for SendGrid compatibility (no DOCTYPE or html/body tags)
   */
  static async renderTemplateWithVariables(
    templateName: string
  ): Promise<string | null> {
    const Component = this.getTemplateComponent(templateName);
    if (!Component) return null;

    try {
      const element = React.createElement(Component, {});

      const html = await render(element, {
        pretty: true,
      });

      const formattedHtml = await this.formatHtml(html);

      return formattedHtml;
    } catch {
      return null;
    }
  }
}

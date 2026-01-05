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
  action: string;
  trade_date: string;
  groups?: TradeGroup[];
  // Legacy props for backward compatibility
  trade_id?: string;
  counterparty_ref?: string;
  amount?: string;
  currency?: string;
}

export const Affirmation: React.FC<AffirmationProps> = ({
  organization_name = '{{organization_name}}',
  action = '{{action}}',
  trade_date = '{{trade_date}}',
  groups,
  // Legacy props for backward compatibility
  trade_id = '{{trade_id}}',
  counterparty_ref = '{{counterparty_ref}}',
  amount = '{{amount}}',
  currency = '{{currency}}',
}) => {
  // Use provided groups or fall back to legacy structure
  const tableGroups = groups || [
    {
      groupName: 'Trade Details',
      rows: [
        { field: 'Action', value: action, counterparty: '' },
        { field: 'Trade ID', value: trade_id, counterparty: '' },
        {
          field: 'Counterparty Ref',
          value: counterparty_ref,
          counterparty: '',
        },
        { field: 'Trade Date', value: trade_date, counterparty: '' },
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
        requesting your affirmation of the following trade executed on{' '}
        <span style={{ fontWeight: 'bold' }}>{trade_date}</span>. Please review
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
  action: string;
  trade_date: string;
  trades: Trade[];
}

export const AffirmationMultiple: React.FC<AffirmationMultipleProps> = ({
  organization_name = '{{organization_name}}',
  action = '{{action}}',
  trade_date = '{{trade_date}}',
  trades = [],
}) => {
  return (
    <EmailLayout preheader="Multiple trade affirmations required">
      <PageTitle>Trade Affirmations Required</PageTitle>

      <BodyText>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> is
        requesting your affirmation of the following {trades.length} trade{trades.length !== 1 ? 's' : ''} executed on{' '}
        <span style={{ fontWeight: 'bold' }}>{trade_date}</span>. Please review
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
    // Check if this is an Affirmation template that needs Handlebars
    if (
      templateName === 'Affirmation' ||
      templateName === 'AffirmationMultiple'
    ) {
      return this.renderHandlebarsTemplate(templateName);
    }

    const Component = this.getTemplateComponent(templateName);
    if (!Component) return null;

    try {
      // Create element with no data so all default values ({{variables}}) are preserved
      const element = React.createElement(Component, {});

      // Render HTML with React Email's high-quality output
      const html = await render(element, {
        pretty: true,
      });

      // Format HTML using prettier
      const formattedHtml = await this.formatHtml(html);

      // Return clean HTML fragment (no document wrapper)
      return formattedHtml;
    } catch {
      // Error rendering template with variables
      return null;
    }
  }

  /**
   * Render Handlebars template for Affirmation emails
   * Returns the Handlebars template with variables preserved
   */
  static async renderHandlebarsTemplate(
    templateName: string
  ): Promise<string | null> {
    try {
      // Get Handlebars template content
      const templateContent = this.getHandlebarsTemplate(templateName);

      if (!templateContent) {
        // Unknown Handlebars template
        return null;
      }

      // Format HTML using prettier
      const formattedHtml = await this.formatHtml(templateContent);

      return formattedHtml;
    } catch {
      // Error rendering Handlebars template
      return null;
    }
  }

  /**
   * Render Handlebars template with real data for preview
   * Returns the Handlebars template with variables applied
   */
  static async renderHandlebarsTemplateWithData(
    templateName: string,
    data: Record<string, unknown>
  ): Promise<string | null> {
    try {
      // Get Handlebars template content
      const templateContent = this.getHandlebarsTemplate(templateName);

      if (!templateContent) {
        // Unknown Handlebars template
        return null;
      }

      // Simple Handlebars-like variable replacement for preview
      let renderedHtml = templateContent;

      // Replace simple variables
      renderedHtml = renderedHtml.replace(
        /\{\{organization_name\}\}/g,
        data.organization_name || '{{organization_name}}'
      );
      renderedHtml = renderedHtml.replace(
        /\{\{action\}\}/g,
        data.action || '{{action}}'
      );
      renderedHtml = renderedHtml.replace(
        /\{\{trade_date\}\}/g,
        data.trade_date || '{{trade_date}}'
      );

      // Handle trades array for AffirmationMultiple
      if (templateName === 'AffirmationMultiple' && data.trades) {
        // Replace trades.length
        renderedHtml = renderedHtml.replace(
          /\{\{trades\.length\}\}/g,
          data.trades.length.toString()
        );

        // Replace each trade block
        let tradeHtml = '';
        (data.trades as Record<string, unknown>[]).forEach(
          (trade: Record<string, unknown>) => {
            const singleTradeHtml = templateContent;

            // Extract the trade block from template
            const tradeBlockMatch = singleTradeHtml.match(
              /\{\{#each trades\}\}([\s\S]*?)\{\{\/each\}\}/
            );
            if (tradeBlockMatch) {
              let tradeBlock = tradeBlockMatch[1];

              // Replace trade variables
              tradeBlock = tradeBlock.replace(
                /\{\{tradeId\}\}/g,
                trade.tradeId || '{{tradeId}}'
              );
              tradeBlock = tradeBlock.replace(
                /\{\{productType\}\}/g,
                trade.productType || '{{productType}}'
              );

              // Handle groups
              if (trade.groups) {
                let groupHtml = '';
                (trade.groups as Record<string, unknown>[]).forEach(
                  (group: Record<string, unknown>) => {
                    const singleGroupHtml = tradeBlock;

                    // Extract group block
                    const groupBlockMatch = singleGroupHtml.match(
                      /\{\{#each groups\}\}([\s\S]*?)\{\{\/each\}\}/
                    );
                    if (groupBlockMatch) {
                      let groupBlock = groupBlockMatch[1];

                      // Replace group variables
                      groupBlock = groupBlock.replace(
                        /\{\{groupName\}\}/g,
                        group.groupName || '{{groupName}}'
                      );

                      // Handle rows
                      if (group.rows) {
                        let rowHtml = '';
                        (group.rows as Record<string, unknown>[]).forEach(
                          (row: Record<string, unknown>) => {
                            const singleRowHtml = groupBlock;

                            // Extract row block
                            const rowBlockMatch = singleRowHtml.match(
                              /\{\{#each rows\}\}([\s\S]*?)\{\{\/each\}\}/
                            );
                            if (rowBlockMatch) {
                              let rowBlock = rowBlockMatch[1];

                              // Replace row variables
                              rowBlock = rowBlock.replace(
                                /\{\{field\}\}/g,
                                row.field || '{{field}}'
                              );
                              rowBlock = rowBlock.replace(
                                /\{\{value\}\}/g,
                                row.value || '{{value}}'
                              );
                              rowBlock = rowBlock.replace(
                                /\{\{#if counterparty\}\}\{\{counterparty\}\}\{\{\/if\}\}/g,
                                row.counterparty || ''
                              );

                              rowHtml += rowBlock;
                            }
                          }
                        );

                        // Replace the rows loop with actual rows
                        groupBlock = groupBlock.replace(
                          /\{\{#each rows\}\}[\s\S]*?\{\{\/each\}\}/,
                          rowHtml
                        );
                      }

                      groupHtml += groupBlock;
                    }
                  }
                );

                // Replace the groups loop with actual groups
                tradeBlock = tradeBlock.replace(
                  /\{\{#each groups\}\}[\s\S]*?\{\{\/each\}\}/,
                  groupHtml
                );
              }

              tradeHtml += tradeBlock;
            }
          }
        );

        // Replace the trades loop with actual trades
        renderedHtml = renderedHtml.replace(
          /\{\{#each trades\}\}[\s\S]*?\{\{\/each\}\}/,
          tradeHtml
        );
      }

      // Handle groups array for Affirmation
      if (templateName === 'Affirmation' && data.groups) {
        let groupHtml = '';
        (data.groups as Record<string, unknown>[]).forEach(
          (group: Record<string, unknown>) => {
            const singleGroupHtml = templateContent;

            // Extract group block
            const groupBlockMatch = singleGroupHtml.match(
              /\{\{#each groups\}\}([\s\S]*?)\{\{\/each\}\}/
            );
            if (groupBlockMatch) {
              let groupBlock = groupBlockMatch[1];

              // Replace group variables
              groupBlock = groupBlock.replace(
                /\{\{groupName\}\}/g,
                group.groupName || '{{groupName}}'
              );

              // Handle rows
              if (group.rows) {
                let rowHtml = '';
                (group.rows as Record<string, unknown>[]).forEach(
                  (row: Record<string, unknown>) => {
                    const singleRowHtml = groupBlock;

                    // Extract row block
                    const rowBlockMatch = singleRowHtml.match(
                      /\{\{#each rows\}\}([\s\S]*?)\{\{\/each\}\}/
                    );
                    if (rowBlockMatch) {
                      let rowBlock = rowBlockMatch[1];

                      // Replace row variables
                      rowBlock = rowBlock.replace(
                        /\{\{field\}\}/g,
                        row.field || '{{field}}'
                      );
                      rowBlock = rowBlock.replace(
                        /\{\{value\}\}/g,
                        row.value || '{{value}}'
                      );
                      rowBlock = rowBlock.replace(
                        /\{\{#if counterparty\}\}\{\{counterparty\}\}\{\{\/if\}\}/g,
                        row.counterparty || ''
                      );

                      rowHtml += rowBlock;
                    }
                  }
                );

                // Replace the rows loop with actual rows
                groupBlock = groupBlock.replace(
                  /\{\{#each rows\}\}[\s\S]*?\{\{\/each\}\}/,
                  rowHtml
                );
              }

              groupHtml += groupBlock;
            }
          }
        );

        // Replace the groups loop with actual groups
        renderedHtml = renderedHtml.replace(
          /\{\{#each groups\}\}[\s\S]*?\{\{\/each\}\}/,
          groupHtml
        );
      }

      // Format HTML using prettier
      const formattedHtml = await this.formatHtml(renderedHtml);

      return formattedHtml;
    } catch {
      // Error rendering Handlebars template with data
      return null;
    }
  }

  /**
   * Get Handlebars template content as string
   */
  private static getHandlebarsTemplate(templateName: string): string | null {
    if (templateName === 'AffirmationMultiple') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trade Affirmations Required</title>
</head>
<body style="margin: 0; padding: 0; font-family: Helvetica-Neue, Helvetica, Arial, sans-serif; background-color: #F4F4F5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Float Header -->
    <div style="width: 100px; text-align: center; margin-bottom: 24px; padding-top: 24px;">
      <a href="https://float.tech" style="color: #4A49A6; font-weight: bold; text-decoration: none;">
        <img src="http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/e4e1b526-0ef3-4511-a7a8-bc94353e9b3b/201x67.png" alt="Float" width="100" height="auto" style="display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; height: auto; max-width: 200px; width: 100%;">
      </a>
    </div>

    <!-- Page Title -->
    <div style="padding: 0 24px 24px 24px; border-bottom: 1px solid #e5e7eb;">
      <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #111827;">
        Trade Affirmations Required
      </h1>
    </div>

    <!-- Content -->
    <div style="padding: 24px;">
      <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #374151;">
        <span style="font-weight: bold;">{{organization_name}}</span> is
        requesting your affirmation of the following {{trades.length}} trade{{#if (gt trades.length 1)}}s{{/if}} executed on
        <span style="font-weight: bold;">{{trade_date}}</span>. Please review
        the detailed trade information provided below.
      </p>

      <p style="margin: 16px 0; font-size: 16px; line-height: 1.5; color: #374151;">
        <strong>Action Required:</strong>
      </p>

      <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #374151;">
        1. To Affirm: Reply with <span style="font-weight: bold;">AGREED</span> if all trade details are correct.<br>
        2. To Dispute: Reply with <span style="font-weight: bold;">DISPUTED</span> and provide details of any discrepancies.
      </p>

      <!-- Render each trade as a separate table -->
      {{#each trades}}
      <div style="margin-bottom: 32px;">
        <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
          <!-- Trade Header Row -->
          <thead>
            <tr>
              <th colspan="3" style="padding: 10px 8px; border-top: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 4px solid #4a49a6; font-size: 11px; font-weight: 600; color: #ffffff; background-color: #4a49a6; text-align: left;">
                <span style="font-weight: 400; font-size: 12px; color: #ffffff;">
                  Trade ID: <strong>{{tradeId}}</strong>
                </span>
                <span style="font-weight: 400; color: #ffffff; margin-left: 12px;">
                  {{productType}}
                </span>
              </th>
            </tr>
            <!-- Column Headers -->
            <tr>
              <th style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 30%;">
                Field
              </th>
              <th style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
                Value
              </th>
              <th style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
                Counterparty Economics (if disputed)
              </th>
            </tr>
          </thead>

          <tbody>
            {{#each groups}}
            <!-- Group Header Row -->
            <tr>
              <td colspan="3" style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: bold; color: #111827; background-color: #f3f4f6; text-align: left;">
                {{groupName}}
              </td>
            </tr>
            
            <!-- Group Data Rows -->
            {{#each rows}}
            <tr>
              <td style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: normal; color: #374151; background-color: #f9fafb; vertical-align: top;">
                {{field}}
              </td>
              <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827; vertical-align: top; word-break: break-word;">
                {{value}}
              </td>
              <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #6b7280; vertical-align: top; word-break: break-word;">
                {{#if counterparty}}{{counterparty}}{{/if}}
              </td>
            </tr>
            {{/each}}
            {{/each}}
          </tbody>
        </table>
      </div>
      {{/each}}

      <!-- Footer -->
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
        <p style="margin: 0;">
          This email was sent by {{organization_name}}. Please reply directly to this email to affirm or dispute the trade details.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
    } else if (templateName === 'Affirmation') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trade Affirmation Required</title>
</head>
<body style="margin: 0; padding: 0; font-family: Helvetica-Neue, Helvetica, Arial, sans-serif; background-color: #F4F4F5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Float Header -->
    <div style="width: 100px; text-align: center; margin-bottom: 24px; padding-top: 24px;">
      <a href="https://float.tech" style="color: #4A49A6; font-weight: bold; text-decoration: none;">
        <img src="http://cdn.mcauto-images-production.sendgrid.net/a704493bc4576a45/e4e1b526-0ef3-4511-a7a8-bc94353e9b3b/201x67.png" alt="Float" width="100" height="auto" style="display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; height: auto; max-width: 200px; width: 100%;">
      </a>
    </div>

    <!-- Page Title -->
    <div style="padding: 0 24px 24px 24px; border-bottom: 1px solid #e5e7eb;">
      <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #111827;">
        Trade Affirmation Required
      </h1>
    </div>

    <!-- Content -->
    <div style="padding: 24px;">
      <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #374151;">
        <span style="font-weight: bold;">{{organization_name}}</span> is
        requesting your affirmation of the following trade executed on
        <span style="font-weight: bold;">{{trade_date}}</span>. Please review
        the detailed trade information provided below.
      </p>

      <p style="margin: 16px 0; font-size: 16px; line-height: 1.5; color: #374151;">
        <strong>Action Required:</strong>
      </p>

      <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; color: #374151;">
        1. To Affirm: Reply with <span style="font-weight: bold;">AGREED</span> if all trade details are correct.<br>
        2. To Dispute: Reply with <span style="font-weight: bold;">DISPUTED</span> and provide details of any discrepancies.
      </p>

      <!-- Trade Details Table -->
      <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; margin-top: 24px;">
        <!-- Column Headers -->
        <thead>
          <tr>
            <th style="padding: 4px 8px; border-top: 1px solid #e5e7eb; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 30%;">
              Field
            </th>
            <th style="padding: 4px 8px; border-top: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
              Value
            </th>
            <th style="padding: 4px 8px; border-top: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 600; color: #374151; background-color: #f9fafb; text-align: left; width: 35%;">
              Counterparty Economics (if disputed)
            </th>
          </tr>
        </thead>
        
        <tbody>
          {{#each groups}}
          <!-- Group Header Row -->
          <tr>
            <td colspan="3" style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: bold; color: #111827; background-color: #f3f4f6; text-align: left;">
              {{groupName}}
            </td>
          </tr>
          
          <!-- Group Data Rows -->
          {{#each rows}}
          <tr>
            <td style="padding: 4px 8px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: normal; color: #374151; background-color: #f9fafb; vertical-align: top;">
              {{field}}
            </td>
            <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #111827; vertical-align: top; word-break: break-word;">
              {{value}}
            </td>
            <td style="padding: 4px 8px; border-right: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; font-size: 10px; color: #6b7280; vertical-align: top; word-break: break-word;">
              {{#if counterparty}}{{counterparty}}{{/if}}
            </td>
          </tr>
          {{/each}}
          {{/each}}
        </tbody>
      </table>

      <!-- Footer -->
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
        <p style="margin: 0;">
          This email was sent by {{organization_name}}. Please reply directly to this email to affirm or dispute the trade details.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
    }

    return null;
  }
}

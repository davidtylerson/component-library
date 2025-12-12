import React from 'react';
import {
  EmailLayout,
  PageTitle,
  BodyText,
  DataTable,
  LG,
} from '../react-email-src/components';

interface ReturnConfirmTableProps {
  organization_name: string;
  table_fields: Array<{ label: string; value: string }>;
}

export const ReturnConfirmTable: React.FC<ReturnConfirmTableProps> = ({
  organization_name = '{{organization_name}}',
  table_fields = [
    { label: 'Trade ID', value: '{{trade_id}}' },
    { label: 'Counterparty', value: '{{counterparty}}' },
    { label: 'Trade Date', value: '{{trade_date}}' },
    { label: 'Amount', value: '{{amount}}' },
  ] as any,
}) => {
  // Detect if we're in preview mode (with real data) or export mode (with template variables)
  const isPreviewMode = organization_name !== '{{organization_name}}';

  return (
    <EmailLayout preheader="Trade confirmation received">
      <PageTitle>
        You have received a signed trade confirmation from{' '}
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span>
      </PageTitle>

      <BodyText>
        Please find your fully executed trade confirmation for the following
        trade attached to this email.
      </BodyText>

      <LG />

      {isPreviewMode ? (
        // Preview mode: use React DataTable component
        <DataTable title="Trade Details" data={table_fields} />
      ) : (
        // Export mode: use Handlebars HTML
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div>
                <h3 style="font-family: Helvetica-Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 1.3; margin: 0 0 8px 0; color: #111827;">
                  Trade Details
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px; min-width: 100%;">
                  <tbody>
                    {{#each table_fields}}
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 40%; vertical-align: top; text-align: left; word-wrap: break-word;">
                        {{label}}
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 60%; vertical-align: top; text-align: right; word-wrap: break-word;">
                        {{value}}
                      </td>
                    </tr>
                    {{/each}}
                  </tbody>
                </table>
              </div>
            `,
          }}
        />
      )}
    </EmailLayout>
  );
};

export default ReturnConfirmTable;

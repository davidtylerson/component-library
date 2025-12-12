import React from 'react';
import {
  EmailLayout,
  SectionTitle,
  SubsectionTitle,
  DataTable,
  ActionButton,
  Callout,
  BodyText,
  MD,
  LG,
} from '../react-email-src/components';

interface TradeStatus {
  tradeIdentifier: string;
  success: boolean;
  reason?: string;
}

interface TradeFileErrorProps {
  file: string;
  status: string;
  rowsProcessed: number;
  totalRows: number;
  date: string;
  tradeStatuses?: TradeStatus[];
  url: string;
  errorMessage?: string;
}

export const TradeFileError: React.FC<TradeFileErrorProps> = ({
  file = '{{file}}',
  status = '{{status}}',
  rowsProcessed = '{{rowsProcessed}}' as any,
  totalRows = '{{totalRows}}' as any,
  date = '{{date}}',
  tradeStatuses = [] as any,
  url = '{{url}}',
  errorMessage = '{{errorMessage}}' as any,
}) => {
  // Detect if we're in preview mode (with real data) or export mode (with template variables)
  const isPreviewMode =
    file !== '{{file}}' || typeof rowsProcessed === 'number';

  // Build details data array - preserve Handlebars variables for SendGrid
  const rowsValue =
    typeof rowsProcessed === 'number' && typeof totalRows === 'number'
      ? `${rowsProcessed} of ${totalRows}`
      : `{{rowsProcessed}} of {{totalRows}}`;

  const detailsData = [
    { label: 'File', value: file },
    { label: 'Status', value: status },
    {
      label: 'Rows',
      value: rowsValue,
    },
    { label: 'Date', value: date },
  ];

  // Check if we have actual error message data (not a template string)
  const hasErrorMessage =
    isPreviewMode && errorMessage && errorMessage !== '{{errorMessage}}';

  // Check if we have actual trade statuses data
  const hasTradeStatuses =
    isPreviewMode && Array.isArray(tradeStatuses) && tradeStatuses.length > 0;

  return (
    <EmailLayout preheader="Error processing trade file">
      <SectionTitle>
        The following trade file encountered errors during processing:
      </SectionTitle>

      {/* Render error message - dual mode for preview and SendGrid */}
      {isPreviewMode ? (
        // Preview mode: use React components
        hasErrorMessage && (
          <>
            <MD />
            <Callout variant="error">
              {errorMessage.split('\n').map((line: string, index: number) => (
                <BodyText key={index}>{line}</BodyText>
              ))}
            </Callout>
          </>
        )
      ) : (
        // Export mode: use Handlebars HTML
        <>
          <MD />
          <div
            dangerouslySetInnerHTML={{
              __html: `
                {{#if errorMessage}}
                <div style="background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; padding: 16px; margin-bottom: 16px; width: 100%; box-sizing: border-box;">
                  <p style="font-size: 14px; line-height: 1.5; color: #374151; margin: 0 0 12px 0;">{{errorMessage}}</p>
                </div>
                {{/if}}
              `,
            }}
          />
        </>
      )}

      <MD />

      <SubsectionTitle>Details</SubsectionTitle>

      <DataTable data={detailsData} />

      {/* Render trades table - dual mode for preview and SendGrid */}
      {isPreviewMode ? (
        // Preview mode: use React components
        hasTradeStatuses && (
          <>
            <LG />
            <SubsectionTitle>Trades</SubsectionTitle>

            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                marginBottom: '16px',
                fontSize: '13px',
                minWidth: '100%',
              }}
              border={0}
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: '1px solid #E4E4E7',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '13px',
                      lineHeight: '1.2',
                      padding: '12px 0',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: '#111827',
                    }}
                    valign="top"
                    align="left"
                  >
                    Trade Identifier
                  </th>
                  <th
                    style={{
                      borderBottom: '1px solid #E4E4E7',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '13px',
                      lineHeight: '1.2',
                      padding: '12px 0',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: '#111827',
                    }}
                    valign="top"
                    align="left"
                  >
                    Status
                  </th>
                  <th
                    style={{
                      borderBottom: '1px solid #E4E4E7',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '13px',
                      lineHeight: '1.2',
                      padding: '12px 0',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      color: '#111827',
                    }}
                    valign="top"
                    align="left"
                  >
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {tradeStatuses.map((trade: TradeStatus, index: number) => (
                  <tr key={index}>
                    <td
                      style={{
                        borderBottom: '1px solid #E4E4E7',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontSize: '13px',
                        lineHeight: '1',
                        padding: '12px 0',
                        verticalAlign: 'top',
                        textAlign: 'left',
                        color: '#111827',
                      }}
                      valign="top"
                      align="left"
                    >
                      {trade.tradeIdentifier}
                    </td>
                    <td
                      style={{
                        borderBottom: '1px solid #E4E4E7',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontSize: '13px',
                        lineHeight: '1',
                        padding: '12px 0',
                        verticalAlign: 'top',
                        textAlign: 'left',
                        color: '#111827',
                      }}
                      valign="top"
                      align="left"
                    >
                      {trade.success ? 'Success' : 'Failure'}
                    </td>
                    <td
                      style={{
                        borderBottom: '1px solid #E4E4E7',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontSize: '13px',
                        lineHeight: '1',
                        padding: '12px 0',
                        verticalAlign: 'top',
                        textAlign: 'left',
                        color: '#111827',
                      }}
                      valign="top"
                      align="left"
                    >
                      {trade.reason || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      ) : (
        // Export mode: use Handlebars HTML
        <div
          dangerouslySetInnerHTML={{
            __html: `
              {{#if tradeStatuses}}
              <div style="height: 24px;"></div>
              <h3 style="font-size: 16px; font-weight: bold; line-height: 1.3; margin: 0 0 12px 0; color: #111827;">Trades</h3>
              <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 16px; font-size: 13px; min-width: 100%;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <thead>
                  <tr>
                    <th style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.2; padding: 12px 0; text-align: left; font-weight: bold; color: #111827;" valign="top" align="left">
                      Trade Identifier
                    </th>
                    <th style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.2; padding: 12px 0; text-align: left; font-weight: bold; color: #111827;" valign="top" align="left">
                      Status
                    </th>
                    <th style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.2; padding: 12px 0; text-align: left; font-weight: bold; color: #111827;" valign="top" align="left">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {{#each tradeStatuses}}
                  <tr>
                    <td style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; padding: 12px 0; vertical-align: top; text-align: left; color: #111827;" valign="top" align="left">
                      {{tradeIdentifier}}
                    </td>
                    <td style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; padding: 12px 0; vertical-align: top; text-align: left; color: #111827;" valign="top" align="left">
                      {{#if success}}Success{{else}}Failure{{/if}}
                    </td>
                    <td style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; padding: 12px 0; vertical-align: top; text-align: left; color: #111827;" valign="top" align="left">
                      {{#if reason}}{{reason}}{{else}}-{{/if}}
                    </td>
                  </tr>
                  {{/each}}
                </tbody>
              </table>
              {{/if}}
            `,
          }}
        />
      )}

      <MD />

      <ActionButton href={url} fullWidth>
        View in Float
      </ActionButton>
    </EmailLayout>
  );
};

export default TradeFileError;

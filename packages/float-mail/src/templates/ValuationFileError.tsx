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

interface ValuationStatus {
  tradeIdentifier: string;
  reason?: string;
}

interface ValuationFileErrorProps {
  file: string;
  status: string;
  rowsProcessed: number;
  rowsSkipped: number;
  totalRows: number;
  source: string;
  date: string;
  valuationStatuses?: ValuationStatus[];
  url: string;
  errorMessage?: string;
}

export const ValuationFileError: React.FC<ValuationFileErrorProps> = ({
  file = '{{file}}',
  status = '{{status}}',
  rowsProcessed = '{{rowsProcessed}}' as any,
  rowsSkipped = '{{rowsSkipped}}' as any,
  totalRows = '{{totalRows}}' as any,
  source = '{{source}}',
  date = '{{date}}',
  valuationStatuses = [] as any,
  url = '{{url}}',
  errorMessage = '{{errorMessage}}' as any,
}) => {
  // Detect if we're in preview mode (with real data) or export mode (with template variables)
  const isPreviewMode =
    file !== '{{file}}' || typeof rowsProcessed === 'number';

  // Build details data array - preserve Handlebars variables for SendGrid
  const rowsProcessedValue =
    typeof rowsProcessed === 'number' && typeof totalRows === 'number'
      ? `${rowsProcessed} of ${totalRows}`
      : `{{rowsProcessed}} of {{totalRows}}`;

  const rowsSkippedValue =
    typeof rowsSkipped === 'number' ? `${rowsSkipped}` : `{{rowsSkipped}}`;

  const detailsData = [
    { label: 'File', value: file },
    { label: 'Status', value: status },
    {
      label: 'Rows Processed',
      value: rowsProcessedValue,
    },
    {
      label: 'Rows Skipped',
      value: rowsSkippedValue,
    },
    { label: 'Source', value: source },
    { label: 'Date', value: date },
  ];

  // Check if we have actual error message data (not a template string)
  const hasErrorMessage =
    isPreviewMode && errorMessage && errorMessage !== '{{errorMessage}}';

  // Check if we have actual failed positions data
  const hasValuationStatuss =
    isPreviewMode &&
    Array.isArray(valuationStatuses) &&
    valuationStatuses.length > 0;

  return (
    <EmailLayout preheader="Error processing valuation file">
      <SectionTitle>
        The following valuations file encountered errors during processing:
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

      {/* Render failed positions table - dual mode for preview and SendGrid */}
      {isPreviewMode ? (
        // Preview mode: use React components
        hasValuationStatuss && (
          <>
            <LG />
            <SubsectionTitle>Failed Positions</SubsectionTitle>

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
                    ID
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
                {valuationStatuses.map(
                  (status: ValuationStatus, index: number) => (
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
                        {status.tradeIdentifier}
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
                        {status.reason || '-'}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        )
      ) : (
        // Export mode: use Handlebars HTML
        <div
          dangerouslySetInnerHTML={{
            __html: `
              {{#if valuationStatuses}}
              <div style="height: 24px;"></div>
              <h3 style="font-size: 16px; font-weight: bold; line-height: 1.3; margin: 0 0 12px 0; color: #111827;">Failed Positions</h3>
              <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 16px; font-size: 13px; min-width: 100%;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <thead>
                  <tr>
                    <th style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.2; padding: 12px 0; text-align: left; font-weight: bold; color: #111827;" valign="top" align="left">
                      ID
                    </th>
                    <th style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.2; padding: 12px 0; text-align: left; font-weight: bold; color: #111827;" valign="top" align="left">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {{#each valuationStatuses}}
                  <tr>
                    <td style="border-bottom: 1px solid #E4E4E7; font-family: Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1; padding: 12px 0; vertical-align: top; text-align: left; color: #111827;" valign="top" align="left">
                      {{tradeIdentifier}}
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

export default ValuationFileError;

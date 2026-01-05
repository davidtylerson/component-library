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
} from '../react-email-src/components';

interface ValuationFileErrorProps {
  file: string;
  status: string;
  rowsProcessed: number;
  rowsSkipped: number;
  totalRows: number;
  source: string;
  date: string;
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

      <MD />

      <ActionButton href={url} fullWidth>
        View in Float
      </ActionButton>
    </EmailLayout>
  );
};

export default ValuationFileError;

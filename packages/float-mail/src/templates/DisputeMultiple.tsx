import React from 'react';
import {
  EmailLayout,
  SectionTitle,
  BodyText,
} from '../react-email-src/components';

interface DisputedDocument {
  trade_id: string;
  counterparty_ref: string;
  comment: string;
}

interface DisputeMultipleProps {
  organization_name: string;
  disputedDocuments: DisputedDocument[];
}

export const DisputeMultiple: React.FC<DisputeMultipleProps> = ({
  organization_name = '{{organization_name}}',
  disputedDocuments = [
    {
      trade_id: '{{trade_id_1}}',
      counterparty_ref: '{{counterparty_ref_1}}',
      comment: '{{comment_1}}',
    },
    {
      trade_id: '{{trade_id_2}}',
      counterparty_ref: '{{counterparty_ref_2}}',
      comment: '{{comment_2}}',
    },
  ] as any,
}) => {
  // Detect if we're in preview mode (with real data) or export mode (with template variables)
  const isPreviewMode = organization_name !== '{{organization_name}}';

  return (
    <EmailLayout preheader="Multiple disputes raised">
      <SectionTitle>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> has
        raised a dispute with the following trade confirmations
      </SectionTitle>

      <BodyText>
        Please see comments regarding the attached confirmations.
      </BodyText>

      {isPreviewMode ? (
        // Preview mode: use React components
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '16px',
            fontSize: '12px',
            minWidth: '100%',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th
                style={{
                  padding: '8px 0',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  width: '15%',
                  wordWrap: 'break-word',
                }}
              >
                Trade ID
              </th>
              <th
                style={{
                  padding: '8px 0',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  width: '25%',
                  wordWrap: 'break-word',
                }}
              >
                Counterparty Ref
              </th>
              <th
                style={{
                  padding: '8px 0',
                  textAlign: 'left',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 'bold',
                  width: '60%',
                  wordWrap: 'break-word',
                }}
              >
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {disputedDocuments.map(
              (document: DisputedDocument, index: number) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #dee2e6',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '12px',
                      lineHeight: '1.2',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      verticalAlign: 'top',
                    }}
                  >
                    {document.trade_id}
                  </td>
                  <td
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #dee2e6',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '12px',
                      lineHeight: '1.2',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      verticalAlign: 'top',
                    }}
                  >
                    {document.counterparty_ref}
                  </td>
                  <td
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #dee2e6',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '12px',
                      lineHeight: '1.2',
                      verticalAlign: 'top',
                    }}
                  >
                    {document.comment}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        // Export mode: use Handlebars HTML
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 12px; min-width: 100%;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 8px 0; text-align: left; border-bottom: 2px solid #dee2e6; font-weight: bold; width: 15%; word-wrap: break-word;">
                      Trade ID
                    </th>
                    <th style="padding: 8px 0; text-align: left; border-bottom: 2px solid #dee2e6; font-weight: bold; width: 25%; word-wrap: break-word;">
                      Counterparty Ref
                    </th>
                    <th style="padding: 8px 0; text-align: left; border-bottom: 2px solid #dee2e6; font-weight: bold; width: 60%; word-wrap: break-word;">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {{#each disputedDocuments}}
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; vertical-align: top;">
                      {{trade_id}}
                    </td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; vertical-align: top;">
                      {{counterparty_ref}}
                    </td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.2; vertical-align: top;">
                      {{comment}}
                    </td>
                  </tr>
                  {{/each}}
                </tbody>
              </table>
            `,
          }}
        />
      )}
    </EmailLayout>
  );
};

export default DisputeMultiple;

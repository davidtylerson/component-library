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
  ],
}) => {
  return (
    <EmailLayout preheader="Multiple disputes raised">
      <SectionTitle>
        <span style={{ fontWeight: 'bold' }}>{organization_name}</span> has
        raised a dispute with the following trade confirmations
      </SectionTitle>

      <BodyText>
        Please see comments regarding the attached confirmations.
      </BodyText>

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
          {disputedDocuments.map((document, index) => (
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
          ))}
        </tbody>
      </table>
    </EmailLayout>
  );
};

export default DisputeMultiple;
